import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import LoginPage from '@/components/LoginPage.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('LoginPage.vue', () => {
  let vuetify;
  let store;
  let actions;

  beforeEach(() => {
    vuetify = new Vuetify();
    actions = { login: jest.fn(() => Promise.resolve(true)) };
    store = new Vuex.Store({ actions });
  });

  // Test that checks if the login form is rendered correctly
  it('renders the login form', () => {
    const wrapper = mount(LoginPage, { localVue, vuetify, store });

    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
  });

  // Test that checks if the login action is called on button click
  it('calls login action on button click', async () => {
    const wrapper = mount(LoginPage, { localVue, vuetify, store });
    const emailField = wrapper.find('input[type="text"]');
    const passwordField = wrapper.find('input[type="password"]');
    const loginButton = wrapper.find('button');

    emailField.setValue('test@example.com');
    passwordField.setValue('password');

    // Trigger the login button click
    await loginButton.trigger('click');
    await wrapper.vm.$store.dispatch('login', { email: 'test@example.com', password: 'password' });

    expect(actions.login).toHaveBeenCalled();
    expect(actions.login.mock.calls[0][1]).toEqual({ email: 'test@example.com', password: 'password' });
  });

  // Test for form validation
  it('shows validation error if fields are empty', async () => {
    const wrapper = mount(LoginPage, { localVue, vuetify, store });
    const loginButton = wrapper.find('button');

    // Trigger the login button click without entering any data
    await loginButton.trigger('click');

    // Check for validation errors
    expect(wrapper.text()).toContain('Email is required');
    expect(wrapper.text()).toContain('Password is required');
  });

  // Test for error handling
  it('shows error message if login fails', async () => {
    actions.login = jest.fn(() => Promise.reject(new Error('Invalid credentials')));
    store = new Vuex.Store({ actions });

    const wrapper = mount(LoginPage, { localVue, vuetify, store });
    const emailField = wrapper.find('input[type="text"]');
    const passwordField = wrapper.find('input[type="password"]');
    const loginButton = wrapper.find('button');

    emailField.setValue('test@example.com');
    passwordField.setValue('wrongpassword');

    await loginButton.trigger('click');

    // Wait for the promise to be rejected
    await wrapper.vm.$nextTick();

    // Check for error message
    expect(wrapper.text()).toContain('Invalid credentials');
  });

  // Test for successful login
  it('redirects to home page on successful login', async () => {
    mocks.$router = {
      push: jest.fn()
    };
    const wrapper = mount(LoginPage, { localVue, vuetify, store, mocks });
    const emailField = wrapper.find('input[type="text"]');
    const passwordField = wrapper.find('input[type="password"]');
    const loginButton = wrapper.find('button');

    emailField.setValue('test@example.com');
    passwordField.setValue('password');

    await loginButton.trigger('click');

    // Wait for the promise to be resolved
    await wrapper.vm.$nextTick();

    // Check for successful login and redirection
    expect(mocks.$router.push).toHaveBeenCalledWith('/');
  });
});
