<template>
  <div id="login-page" class="bg">
    <div class="login-page--wrapper">
      <div class="login-header-container mb-4">
        <a class="va--super pr-3" @click="generalState.hideLoginPage();"><v-icon>arrow_back</v-icon></a>
        <h1 v-if="mode==='register'" class="inline">Register</h1>
        <h1 v-else-if="mode==='login'" class="inline">Login</h1>
        <h1 v-else class="inline">Tough luck</h1>
      </div>
      
      <v-form ref="form" v-model="valid" lazy-validation @submit="submit" v-if="mode!=='forgotPassword'" v-on:submit.prevent>
        <v-text-field 
          ref="input-username"
          label="Username" 
          :rules="mode==='register'?usernameRules:requiredRule" 
          v-model="username"
          validate-on-blur
          :loading="usernameLoading"
        ></v-text-field>
        <v-text-field
          ref="input-password"
          v-model="password"
          :rules="mode==='register'?passwordRules:requiredRule"
          label="Password"
          :hint="mode==='register'?'At least 8 characters':null"
          validate-on-blur
          type=password
        ></v-text-field>
        <v-text-field v-if="mode==='register'"
          ref="input-confirmPassword"
          v-model="confirmPassword"
          :rules="confirmPasswordRules"
          label="Confirm password"
          validate-on-blur
          type=password
        ></v-text-field>
        <v-text-field v-if="mode==='register'"
          v-model="email"
          ref="input-email"
          :rules="emailRules"
          label="Enter your email"
          validate-on-blur 
        ></v-text-field>
        <div v-if="mode==='login'" class="flexbox vertical-align" style="height: 48px;">
          <a @click="mode='forgotPassword'">Forgot password?</a>
        </div>
        <div class="flexbox vertical-align">
          <a v-if="mode==='register'" @click="mode='login'">Already registered?</a>
          <a v-else @click="mode='register'">Not registered yet?</a>
          <v-spacer></v-spacer>
          <v-btn :disabled="loading" color="primary" type="submit" :loading="loading">
            <span v-if="mode==='login'">Login</span>
            <span v-else>Register</span>
          </v-btn>
        </div>

      </v-form>
    </div>
  </div>
</template>

<script lang="ts">
import * as ServerUtil from '@/networking/ServerUtil';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import debounce from '@/helpers/debounce';
import generalState from '@/store/general';
import userState from '@/store/user';

@Component
export default class LoginPage extends Vue {
  valid: boolean = false;
  loading: boolean = false;
  mode: string = 'login';
  username: string = '';
  usernameLoading: boolean = false;
  password: string = '';
  confirmPassword: string = '';
  email: string = '';

  checkUsernameAvailableDebounced = debounce(this.checkUsernameAvailable, 500);

  generalState = generalState;

  passwordRules = [
    (v: any) => (v && v.length >= 8) || 'Password must be more than 7 characters', // TODO: use zxcvbn?
  ];
  usernameRules = [
    (v: any) => !!v || 'Username is required',
    (v: any) => (v && v.length >= 2) || 'Username must at least 2 characters',
  ];
  emailRules = [
    (v: any) => !!v || 'E-mail is required', //
    (v: any) => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid',
  ];
  requiredRule = [(v: any) => !!v || 'This field is required'];

  get confirmPasswordRules() {
    return [
      (v: any) => {
        return v === this.password || "Passwords don't match";
      },
    ];
  }

  @Watch('username')
  onUsernameChanged() {
    let userNameInput: any = this.$refs['input-username'];
    userNameInput.valid = true;
    // .length=0 not reactive
    userNameInput.errorMessages.splice(0, userNameInput.errorMessages.length);
    userNameInput.validate();
    if (this.mode === 'register' && !!this.username) {
      this.checkUsernameAvailableDebounced();
    }
  }

  @Watch('password')
  onPasswordChanged() {
    let passwordInput: any = this.$refs['input-password'];
    (<any>this.$refs['input-password']).validate();

    if (this.mode === 'register') {
      (<any>this.$refs['input-confirmPassword']).validate();
    }
  }

  @Watch('confirmPassword')
  onConfirmPasswordChanged() {
    (<any>this.$refs['input-confirmPassword']).validate();
  }

  @Watch('mode')
  onModeChanged() {
    //this.$refs.form.reset();
    this.usernameLoading = false;
    this.checkUsernameAvailableDebounced.cancel();
  }

  async submit() {
    if ((<any>this.$refs['form']).validate()) {
      if (this.mode === 'login') {
        this.loading = true;
        const res = await ServerUtil.login(this.username, this.password);
        userState.dispatchSignIn(res.data);
        generalState.hideLoginPage();
      } else if (this.mode === 'register') {
        this.loading = true;
        const res = await ServerUtil.register(this.username, this.password, this.email);
        userState.dispatchSignIn(res.data);
        generalState.hideLoginPage();
      }
    }
  }

  async checkUsernameAvailable() {
    if (!this.username) return;
    this.usernameLoading = true;
    const b = await ServerUtil.isUsernameAvailable(this.username);
    if (!b) {
      (<any>this.$refs['input-username']).errorMessages.push('This username is already in use');
    }

    this.usernameLoading = false;
  }
}
</script>

<style>
#login-page {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
}

#login-page h1 {
  margin-bottom: 1em;
}

#login-page button {
  margin-right: 0;
  margin-left: 0;
}

.login-page--wrapper {
  width: 300px;
  padding: 0 10px;
  position: relative;
  margin: auto;
}

.login-header-container {
  margin-left: -45px;
}
</style>
