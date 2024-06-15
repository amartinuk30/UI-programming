import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import NewsDetailPage from '@/components/NewsDetailPage.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('NewsDetailPage.vue', () => {
  let vuetify;
  let store;
  let getters;
  let actions;
  let mocks;

  beforeEach(() => {
    vuetify = new Vuetify();

    getters = {
      getNews: () => [
        { id: 1, title: "News 1", summary: "Summary 1", description: "Description 1" },
        { id: 2, title: "News 2", summary: "Summary 2", description: "Description 2" },
      ],
      getComments: () => jest.fn().mockImplementation(newsId => {
        if (newsId === 1) {
          return [
            { id: 1, text: "Comment 1" },
            { id: 2, text: "Comment 2" },
          ];
        }
        return [];
      })
    };

    actions = {
      addComment: jest.fn(),
      deleteComment: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
    });

    mocks = {
      $route: {
        params: { id: '1' }
      }
    };
  });

  // Test that checks if the news details are displayed correctly
  it('renders news details', () => {
    const wrapper = mount(NewsDetailPage, { localVue, vuetify, store, mocks });
    const title = wrapper.find('.news-title');
    const summary = wrapper.find('.news-summary');
    const description = wrapper.find('.news-description');

    expect(title.text()).toBe('News 1');
    expect(summary.text()).toBe('Summary 1');
    expect(description.text()).toBe('Description 1');
  });

  // Test that checks if the comments list is displayed correctly
  it('renders comments list', () => {
    const wrapper = mount(NewsDetailPage, { localVue, vuetify, store, mocks });
    const comments = wrapper.findAll('.v-list-item');

    expect(comments.length).toBe(2);
    expect(comments.at(0).text()).toContain('Comment 1');
    expect(comments.at(1).text()).toContain('Comment 2');
  });

  // Test that checks if a comment is added correctly
  it('adds a comment', async () => {
    const wrapper = mount(NewsDetailPage, { localVue, vuetify, store, mocks });
    const commentInput = wrapper.find('.comment-input input');
    const addCommentButton = wrapper.find('.add-comment-btn');

    await commentInput.setValue('New Comment');
    await addCommentButton.trigger('click');

    expect(actions.addComment).toHaveBeenCalled();
    expect(actions.addComment.mock.calls[0][1]).toEqual({
      newsId: 1,
      comment: { id: expect.any(Number), text: 'New Comment' }
    });
  });

  // Test that checks if a comment is deleted correctly
  it('deletes a comment', async () => {
    const wrapper = mount(NewsDetailPage, { localVue, vuetify, store, mocks });
    const deleteButtons = wrapper.findAll('.v-btn');

    await deleteButtons.at(0).trigger('click');

    expect(actions.deleteComment).toHaveBeenCalled();
    expect(actions.deleteComment.mock.calls[0][1]).toEqual({
      newsId: 1,
      commentId: 1
    });
  });
});
