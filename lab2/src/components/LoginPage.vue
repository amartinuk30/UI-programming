<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="email" label="Email" required></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
              <v-btn type="submit" color="primary" block>Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const success = await this.$store.dispatch('login', { email: this.email, password: this.password });
      if (success) {
        this.$router.push('/profile');
        this.$toast.success('Login successful!');
      } else {
        this.$toast.error('Invalid email or password!');
      }
    }
  }
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
.v-card {
  opacity: 1;
}
</style>
