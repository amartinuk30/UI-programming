<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="6">
        <v-card class="registration-card">
          <v-card-title class="headline">Register</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field v-model="username" label="Username" required></v-text-field>
              <v-text-field v-model="email" label="Email" required></v-text-field>
              <v-select v-model="gender" :items="['Male', 'Female']" label="Gender" required></v-select>
              <v-text-field v-model="birthdate" label="Birthdate" type="date" required></v-text-field>
              <v-textarea v-model="about" label="About Me"></v-textarea>
              <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
              <v-btn type="submit" color="primary" block>Register</v-btn>
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
      username: '',
      email: '',
      gender: '',
      birthdate: '',
      about: '',
      password: '',
    };
  },
  methods: {
    register() {
      const user = {
        username: this.username,
        email: this.email,
        gender: this.gender,
        birthdate: this.birthdate,
        about: this.about,
        password: this.password,
        photo: '',
      };
      this.$store.dispatch('register', user);
      this.$router.push('/login');
      this.$toast.success('Registration successful!');
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
.registration-card {
  width: 600x;
  margin: auto;
}
</style>
