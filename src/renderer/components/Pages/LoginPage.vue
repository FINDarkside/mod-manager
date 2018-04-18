<template>
  <div id="login-page" class="bg">
    <div class="login-page--wrapper">
      <div class="login-header-container mb-4">
        <a class="va--super pr-3" @click="$store.dispatch('hideLoginPage');"><v-icon>arrow_back</v-icon></a>
        <h1 v-if="mode==='registering'" class="inline">Register</h1>
        <h1 v-else class="inline">Login</h1>
      </div>
      
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field label="Username" 
          :rules="usernameRules" 
          v-model="username"
          key="input-username"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          hint="At least 8 characters"
          key="input-password"
        ></v-text-field>
        <v-text-field
          ref="input-confirmPassword"
          v-model="confirmPassword"
          :rules="confirmPasswordRules"
          label="Confirm password"
          v-if="mode==='registering'"
        ></v-text-field>
        <v-text-field
          :rules="emailRules"
          label="Enter your email"
          key="input-email"
          v-if="mode==='registering'"
        ></v-text-field>
        <div v-if="mode!=='registering'" class="flexbox vertical-align" style="height: 48px;">
          <a @click="registering=false">Forgot password?</a>
        </div>
        <div class="flexbox vertical-align">
          <a v-if="mode==='registering'"  @click="mode='login'">Already registered?</a>
          <a v-else @click="mode='registering'">Not registered yet?</a>
          <v-spacer></v-spacer>
          <v-btn v-if="mode==='registering'" :disabled="!valid" center color="primary"  @click="submit">Register</v-btn>
          <v-btn v-else :disabled="!valid || loading" color="primary" @click="submit"
            :loading="loading"
          >Login</v-btn>
        </div>

      </v-form>
    </div>
  </div>
</template>

<script>
import * as ServerUtil from "$root/ServerUtil.js";

export default {
  name: "LoginPage",
  data: function() {
    return {
      valid: true,
      loading: false,
      mode: "login",
      username: "",
      usernameRules: [
        v => !!v || "Username is required",
        v => (v && v.length >= 2) || "Username must at least 2 characters"
      ],
      password: "",
      passwordRules: [
        v => (v && v.length > 8) || "Password must be more than 8 characters" // TODO use zxcvbn
      ],
      confirmPassword: "",
      confirmPasswordRules:
        [v => v === this.password] || "Passwords don't match",
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /\S+@\S+\.\S+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  watch: {
    password: function(v) {
      if (this.mode === "registering")
        this.$refs["input-confirmPassword"].validate();
    }
  },
  methods: {
    async submit() {
      if (this.$refs["form"].validate()) {
        if (this.mode === "login") {
          this.loading = true;
          const res = await ServerUtil.login(this.username, this.password);
          this.loading = false;
          console.log(res.data.sessionID);
          this.$store.dispatch('hideLoginPage');
        }
      }
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
