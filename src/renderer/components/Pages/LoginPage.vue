<template>
  <div id="login-page" class="bg">
    <div class="login-page--wrapper">
      <div class="login-header-container mb-4">
        <a class="va--super pr-3" @click="$store.dispatch('hideLoginPage');"><v-icon>arrow_back</v-icon></a>
        <h1 v-if="mode==='register'" class="inline">Register</h1>
        <h1 v-else-if="mode==='login'" class="inline">Login</h1>
        <h1 v-else class="inline">Tough luck</h1>
      </div>
      
      <v-form ref="form" v-model="valid" lazy-validation @submit="submit" v-if="mode!=='forgotPassword'">
        <v-text-field 
          ref="input-username"
          label="Username" 
          :rules="mode===''?usernameRules:requiredRule" 
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

<script>
import * as ServerUtil from "$root/ServerUtil.js";
import debounce from "lodash/debounce";

export default {
  name: "LoginPage",
  data: function() {
    return {
      valid: true,
      loading: false,
      mode: "login",
      username: "",
      usernameLoading: false,
      usernameRules: [
        v => !!v || "Username is required",
        v => (v && v.length >= 2) || "Username must at least 2 characters"
      ],
      password: "",
      passwordRules: [
        v => (v && v.length > 8) || "Password must be more than 8 characters" // TODO use zxcvbn
      ],
      confirmPassword: "",
      confirmPasswordRules: [
        v => v === this.password || "Passwords don't match"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /\S+@\S+\.\S+/.test(v) || "E-mail must be valid"
      ],
      requiredRule: [v => !!v || "This field is required"]
    };
  },
  watch: {
    username(v) {
      this.$refs["input-username"].valid = true;
      let userNameInput = this.$refs["input-username"];
      // .length=0 not reactive
      userNameInput.errorMessages.splice(0, userNameInput.errorMessages.length);
      this.$refs["input-username"].validate();
      if (this.mode === "register" && !!this.username) {
        this.checkUsernameAvailableDebounced();
      }
    },
    password(v) {
      this.$refs["input-password"].validate();
      if (this.mode === "register")
        this.$refs["input-confirmPassword"].validate();
    },
    confirmPassword(v) {
      this.$refs["input-confirmPassword"].validate();
    },
    confirmPassword(v) {
      this.$refs["input-confirmPassword"].validate();
    },
    email(v) {
      this.$refs["input-email"].validate();
    },
    mode(v) {
      //this.$refs.form.reset();
      this.usernameLoading = false;
      this.checkUsernameAvailableDebounced.cancel();
    }
  },
  methods: {
    async submit() {
      if (this.$refs["form"].validate()) {
        if (this.mode === "login") {
          this.loading = true;
          const res = await ServerUtil.login(this.username, this.password);
          this.$store.dispatch("signIn", res.data);
          this.$store.dispatch("hideLoginPage");
        } else if (this.mode === "register") {
          this.loading = true;
          const res = await ServerUtil.register(
            this.username,
            this.password,
            this.email
          );
          this.$store.dispatch("signIn", res.data);
          this.$store.dispatch("hideLoginPage");
        }
      }
    },
    async checkUsernameAvailable() {
      if (!this.username) return;
      this.usernameLoading = true;
      const b = await ServerUtil.isUsernameAvailable(this.username);
      if (!b) {
        this.$refs["input-username"].errorMessages.push(
          "This username is already in use"
        );
      }
      this.usernameLoading = false;
    }
  },
  computed: {
    checkUsernameAvailableDebounced() {
      return debounce(this.checkUsernameAvailable, 500);
    }
  }
};
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
