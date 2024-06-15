import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: JSON.parse(localStorage.getItem('users')) || [],
    user: JSON.parse(localStorage.getItem('user')) || null,
    news: JSON.parse(localStorage.getItem('news')) || [
      {
        id: 1, title: 'Football Club Signs New Star for Three Footballs', summary: 'A renowned Ukrainian football club has announced a sensational signing of a new player. The terms of the deal included three footballs and a pair of old boots.',
        description: `A Ukrainian football club, recently struggling to stay in the top league, has made an
        unbelievable transfer. The new player, known for his impressive skills on the field, was 
        signed for... three footballs. "We consider this a profitable deal," commented the club president. 
        Additionally, the deal included a pair of old boots, which allegedly belonged to a legendary player 
        from the '90s. "This is the star we've been waiting for," the club added. Fans are ecstatic, as the 
        team might finally become a championship contender... unless new bureaucratic hurdles and a shortage 
        of balls for training get in the way.`, image: require('@/assets/image1.jpg'),
        comments: []
      },
      {
        id: 2, title: 'Match Canceled Because Referee Forgot Whistle at Home', summary: 'A major Premier League match was postponed when the referee suddenly realized he had left his whistle at home, leading to an unprecedented game disruption.',
        description: `Last Sunday, football fans gathered at the stadium to watch an important Premier League match. 
        However, the game had to be postponed when the referee discovered he had left his whistle at home. 
        "We started the match without it, but quickly realized it was a bad idea," said the team captain. 
        Players tried to mimic the whistle using their own methods, but this only led to confusion and laughter 
        in the stands. After a few minutes of unsuccessful attempts, the match was officially postponed. 
        "We need to learn from this and check our gear before heading to the field," said the disappointed referee. 
        Fans, although disappointed, acknowledged this as one of the funniest incidents in the history of Ukrainian football.`, image: require('@/assets/image2.jpg'),
        comments: []
      },
    ],
  },
  mutations: {
    addUser(state, user) {
      state.users.push(user);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
    setUserPhoto(state, photo) {
      if (state.user) {
        state.user.photo = photo;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    addNews(state, newsItem) {
      state.news.push(newsItem);
      localStorage.setItem('news', JSON.stringify(state.news));
    },
    addComment(state, { newsId, comment }) {
      const newsItem = state.news.find(news => news.id === newsId);
      if (newsItem) {
        newsItem.comments.push(comment);
        localStorage.setItem('news', JSON.stringify(state.news));
      }
    },
    deleteComment(state, { newsId, commentId }) {
      const newsItem = state.news.find(news => news.id === newsId);
      if (newsItem) {
        newsItem.comments = newsItem.comments.filter(comment => comment.id !== commentId);
        localStorage.setItem('news', JSON.stringify(state.news));
      }
    },
  },
  getters: {
    isAuthenticated: state => !!state.user,
    user: state => state.user,
    getNews: state => state.news,
    getComments: state => (newsId) => {
      const newsItem = state.news.find(news => news.id === newsId);
      return newsItem ? newsItem.comments : [];
    },
  },
  actions: {
    register({ commit }, user) {
      commit('addUser', user);
    },
    login({ commit, state }, { email, password }) {
      const user = state.users.find(user => user.email === email && user.password === password);
      if (user) {
        commit('setUser', user);
        return true;
      }
      return false;
    },
    logout({ commit }) {
      commit('logout');
    },
    setUserPhoto({ commit }, photo) {
      commit('setUserPhoto', photo);
    },
    addNews({ commit }, newsItem) {
      commit('addNews', newsItem);
    },
    addComment({ commit }, payload) {
      commit('addComment', payload);
    },
    deleteComment({ commit }, payload) {
      commit('deleteComment', payload);
    },
  },
});

export default store;

