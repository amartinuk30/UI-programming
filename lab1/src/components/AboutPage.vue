<template>
  <v-container>
    <v-card>
      <v-card-title class="about-title">About us</v-card-title>
      <v-img src="@/assets/logo2.png" alt="Ukrainian Premier League Logo" contain max-height="400" class="about-image"></v-img>
      <v-card-text class="about-text">
        This web application is developed using the Vuetify framework, incorporating Vue.js for dynamic functionality and a seamless user experience. 
        It serves as a comprehensive platform for the Ukrainian Premier League, providing users with up-to-date football news and interactive features. 
        Users can register, log in, and create profiles to comment on news articles and engage with other football enthusiasts. The site includes a home page with news blocks, 
        a registration page, a login page, a user profile page, and an information page about the resource. Each news article can be commented on, mimicking a blog-like experience. 
        The application leverages Vuex for state management and utilizes local storage to persist user data and comments.
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'AboutPage',
};
</script>

<style scoped>
.about-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.about-image {
  margin-bottom: 20px;
  width: 100%;
}

.about-text {
  font-size: 16px;
  line-height: 1.5;
}
</style>
