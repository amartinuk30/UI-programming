import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import RegisterPage from '@/components/RegisterPage.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);

describe('RegisterPage.vue', () => {
  let vuetify;
  let store;
  let actions;
  let mocks;

  beforeEach(() => {
    vuetify = new Vuetify();
    actions = { register: jest.fn() };
    store = new Vuex.Store({ actions });

    mocks = {
      $router: {
        push: jest.fn()
      },
      $toast: {
        success: jest.fn(),
        error: jest.fn()
      }
    };

    // Add target element data-app
    const app = document.createElement('div');
    app.setAttribute('data-app', true);
    document.body.appendChild(app);
  });

  // Test that checks if the registration form is rendered correctly
  it('renders the registration form', () => {
    const wrapper = mount(RegisterPage, {
      localVue,
      vuetify,
      store,
      mocks
    });

    expect(wrapper.find('[data-test="username"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="email"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="gender"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="birthdate"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="about"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="password"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="registerButton"]').exists()).toBe(true);
  });

  // Test that checks if the register action is called on form submit
  it('calls register action on form submit', async () => {
    const wrapper = mount(RegisterPage, {
      localVue,
      vuetify,
      store,
      mocks
    });

    await wrapper.find('[data-test="username"]').setValue('testuser');
    await wrapper.find('[data-test="email"]').setValue('test@example.com');
    await wrapper.find('[data-test="password"]').setValue('password');

    await wrapper.find('form').trigger('submit.prevent');

    expect(actions.register).toHaveBeenCalledTimes(1);
    expect(actions.register.mock.calls[0][1]).toEqual({
      username: 'testuser',
      email: 'test@example.com',
      gender: '',
      birthdate: '',
      about: '',
      password: 'password',
      photo: '',
    });

    expect(mocks.$router.push).toHaveBeenCalledWith('/login');
    expect(mocks.$toast.success).toHaveBeenCalledWith('Registration successful!');
  });
});
