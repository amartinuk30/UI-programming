<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="navbar-title">
        <v-img
          src="@/assets/logo.png"
          alt="Ukrainian Premier League Logo"
          contain
          max-height="40"
          class="mr-2"
        ></v-img>
        <span class="title-text">Ukrainian Premier League</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="nav-buttons">
        <v-btn to="/" text>Home</v-btn>
        <v-btn to="/about" text>About</v-btn>
        <v-btn to="/profile" text>Profile</v-btn>
        <v-btn to="/login" text>Login</v-btn>
        <v-btn to="/register" text>Register</v-btn>
      </div>
      <div class="menu-button">
        <v-menu left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item link to="/">
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/about">
              <v-list-item-title>About</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/profile">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/login">
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/register">
              <v-list-item-title>Register</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main class="main-content">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.navbar-title {
  display: flex;
  align-items: center;
  margin-right: auto;
}

.title-text {
  font-size: 20px;
  font-weight: bold;
}

.main-content {
  background-image: url("@/assets/back.png");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.nav-buttons {
  display: flex;
}

.menu-button {
  display: none;
}

@media (max-width: 992px) {
  .nav-buttons {
    display: none;
  }
  .menu-button {
    display: block;
  }
}
@media (max-width: 600px) {
  .title-text {
    display: none;
  }
}
</style>
