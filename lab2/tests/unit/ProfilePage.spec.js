import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import ProfilePage from '@/components/ProfilePage.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);
localVue.use(VueRouter);

describe('ProfilePage.vue', () => {
  let vuetify;
  let store;
  let getters;
  let actions;
  let state;
  let router;
  let mocks;

  beforeEach(() => {
    vuetify = new Vuetify();

    state = {
      user: {
        username: 'testuser',
        email: 'test@example.com',
        gender: 'Male',
        birthdate: '1990-01-01',
        about: 'This is a test user.',
        photo: 'https://via.placeholder.com/120'
      }
    };

    getters = {
      isAuthenticated: () => true,
    };

    actions = {
      logout: jest.fn(),
    };

    store = new Vuex.Store({
      state,
      getters,
      actions
    });

    router = new VueRouter();
    jest.spyOn(router, 'push').mockImplementation(() => {});  // Mocking router.push

    // Add target element data-app
    const app = document.createElement('div');
    app.setAttribute('data-app', true);
    document.body.appendChild(app);

    mocks = {
      $toast: {
        success: jest.fn(),
        error: jest.fn()
      }
    };
  });

  // Test that checks if user information is rendered correctly when authenticated
  it('renders user information if authenticated', () => {
    const wrapper = mount(ProfilePage, { localVue, vuetify, store, router, mocks });

    expect(wrapper.find('h2').text()).toBe('testuser');
    expect(wrapper.find('.info-item').text()).toContain('test@example.com');
  });

  // Test that checks if logout action is called on button click
  it('calls logout action on button click', async () => {
    const wrapper = mount(ProfilePage, { localVue, vuetify, store, router, mocks });
    await wrapper.find('[data-testid="logout-btn"]').trigger('click');

    expect(actions.logout).toHaveBeenCalled();
    expect(mocks.$toast.success).toHaveBeenCalledWith('Logout successful!');
    expect(router.push).toHaveBeenCalledWith('/');  // Verify router.push call
  });

  // Test that checks if prompt to login is shown when not authenticated
  it('shows prompt to login if not authenticated', () => {
    getters.isAuthenticated = () => false;
    store = new Vuex.Store({
      state,
      getters,
      actions
    });

    const wrapper = mount(ProfilePage, { localVue, vuetify, store, router, mocks });

    expect(wrapper.find('h2').text()).toBe('Please register and login to view your profile.');
  });

  // Test that checks if the correct user photo is rendered if provided
  it('renders the correct user photo if provided', () => {
    const wrapper = mount(ProfilePage, { localVue, vuetify, store, router, mocks });
    const img = wrapper.find('img');
    
    expect(img.attributes().src).toBe('https://via.placeholder.com/120');
  });
});
