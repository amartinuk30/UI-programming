<template>
  <v-container>
    <v-card>
      <v-card-title class="news-title">{{ news.title }}</v-card-title>
      <v-card-text class="news-summary">{{ news.summary }}</v-card-text>
      <v-card-text class="news-description">{{ news.description }}</v-card-text>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="comment in comments" :key="comment.id">
          <v-list-item-content>{{ comment.text }}</v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="deleteComment(comment.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-text-field
        v-model="newComment"
        label="Add a comment"
        class="comment-input"
        outlined
      ></v-text-field>
      <v-btn @click="addComment" class="add-comment-btn">Add Comment</v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      newComment: '',
    };
  },
  computed: {
    news() {
      return this.$store.getters.getNews.find(news => news.id === parseInt(this.$route.params.id));
    },
    comments() {
      return this.$store.getters.getComments(parseInt(this.$route.params.id));
    },
  },
  methods: {
    addComment() {
      if (this.newComment.trim()) {
        this.$store.dispatch('addComment', {
          newsId: parseInt(this.$route.params.id),
          comment: { id: Date.now(), text: this.newComment.trim() },
        });
        this.newComment = '';
      }
    },
    deleteComment(commentId) {
      this.$store.dispatch('deleteComment', {
        newsId: parseInt(this.$route.params.id),
        commentId,
      });
    },
  },
};
</script>

<style scoped>
.news-title {
  font-size: 24px;
  color: #333;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
}
.news-summary {
  font-size: 18px;
  color: #666;
  font-family: 'Verdana', sans-serif;
  margin-bottom: 10px;
}
.news-description {
  font-size: 16px;
  color: #444;
  font-family: 'Georgia', serif;
  line-height: 1.5;
}
.comment-input {
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 10px;
  width: calc(100% - 20px);
}
.add-comment-btn {
  background-color: #007bff;
  color: rgb(0, 0, 0);
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 10px;
  display: block;
  margin-left: 10px;
  width: fit-content;
}
.add-comment-btn:hover {
  background-color: #0056b3;
}
</style>
