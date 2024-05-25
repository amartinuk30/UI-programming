<template>
  <v-container>
    <v-row>
      <v-col
        v-for="news in newsList"
        :key="news.id"
        cols="12"
      >
        <v-card
          :style="{ backgroundImage: 'url(' + news.image + ')' }"
          class="news-card"
        >
          <v-card-title class="headline">{{ news.title }}</v-card-title>
          <v-card-text class="summary">{{ news.summary }}</v-card-text>
          <v-card-actions>
            <v-btn :to="{ name: 'NewsDetail', params: { id: news.id } }" color="primary" class="white--text">Read more</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    newsList() {
      return this.$store.getters.getNews;
    }
  }
};
</script>

<style scoped>
.news-card {
  background-size: cover;
  background-position: center;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: white;
  padding: 20px;
  margin-bottom: 20px;
}
.headline {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px;
}
.summary {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px;
  margin-bottom: 10px;
  color: #f0f0f0 !important;
}
</style>
