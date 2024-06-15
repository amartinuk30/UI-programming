import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Home from '@/components/HomePage.vue';

// Create a local Vue instance
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

// Mock for router-link
localVue.component('router-link', {
  props: ['to'],
  render(h) {
    return h('a', this.$slots.default);
  }
});

describe('HomePage.vue', () => {
  let vuetify;
  let store;
  let getters;

  // Initialize Vuetify and Vuex store before each test
  beforeEach(() => {
    vuetify = new Vuetify();
    getters = {
      getNews: () => [
        { id: 1, title: "News 1", summary: "Summary 1", image: "image1.jpg" },
        { id: 2, title: "News 2", summary: "Summary 2", image: "image2.jpg" }
      ]
    };
    store = new Vuex.Store({
      getters
    });
  });

  // Test to check if the news list is rendered
  it('should render a list of news', () => {
    const wrapper = mount(Home, { store, localVue, vuetify });
    const newsItems = wrapper.findAll('.news-card');
    expect(newsItems.length).toBe(2);
  });

  // Test to check if each news item has a title
  it('should render the title for each news item', () => {
    const wrapper = mount(Home, { store, localVue, vuetify });
    const titles = wrapper.findAll('.headline');
    expect(titles.length).toBe(2);
    expect(titles.at(0).text()).toBe('News 1');
    expect(titles.at(1).text()).toBe('News 2');
  });

  // Test to check if each news item has a summary
  it('should render the summary for each news item', () => {
    const wrapper = mount(Home, { store, localVue, vuetify });
    const summaries = wrapper.findAll('.summary');
    expect(summaries.length).toBe(2);
    expect(summaries.at(0).text()).toBe('Summary 1');
    expect(summaries.at(1).text()).toBe('Summary 2');
  });

  // Test to check if each news item has a "Read more" button
  it('should render a "Read more" button for each news item', () => {
    const wrapper = mount(Home, { store, localVue, vuetify });
    const buttons = wrapper.findAll('.v-btn');
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).text()).toBe('Read more');
    expect(buttons.at(1).text()).toBe('Read more');
  });
});
