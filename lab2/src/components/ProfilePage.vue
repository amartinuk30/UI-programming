<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card v-if="isAuthenticated">
          <v-card-title>
            <v-row align="center">
              <v-col cols="12" sm="4">
                <v-avatar size="120">
                  <img :src="user.photo || 'https://via.placeholder.com/120'" alt="User Photo">
                </v-avatar>
                <v-btn data-testid="upload-btn" @click="$refs.fileInput.click()">Upload Photo</v-btn>
                <input ref="fileInput" type="file" @change="onFileChange" style="display: none;">
              </v-col>
              <v-col cols="12" sm="8">
                <h2>{{ user.username }}</h2>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" class="profile-info">
                <div class="info-item"><strong>Email:</strong> {{ user.email }}</div>
                <div class="info-item"><strong>Gender:</strong> {{ user.gender }}</div>
                <div class="info-item"><strong>Birthdate:</strong> {{ user.birthdate }}</div>
              </v-col>
              <v-col cols="12" sm="6">
                <strong>About Me:</strong>
                <p>{{ user.about }}</p>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn data-testid="logout-btn" color="primary" @click="logout" block>Logout</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else>
          <v-card-title>
            <h2>Please register and login to view your profile.</h2>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const photo = e.target.result;
          this.$store.dispatch('setUserPhoto', photo);
          this.$toast.success('Photo updated successfully!');
        };
        reader.readAsDataURL(file);
      }
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
      this.$toast.success('Logout successful!');
    }
  }
};
</script>

<style scoped>
.v-card-title {
  display: flex;
  align-items: center;
}
.v-btn {
  margin-top: 10px;
}
</style>
