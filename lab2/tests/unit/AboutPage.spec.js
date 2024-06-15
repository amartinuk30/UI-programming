import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import AboutPage from '@/components/AboutPage.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('AboutPage.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  // Test that checks if the AboutPage renders with the title "About us"
  it('renders with the title "About us"', () => {
    const wrapper = mount(AboutPage, { localVue, vuetify });
    const title = wrapper.find('.about-title');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('About us');
  });

  // Test that checks if the AboutPage has the logo image
  it('renders with the logo image', () => {
    const wrapper = mount(AboutPage, { localVue, vuetify });
    const image = wrapper.find('.about-image');
    expect(image.exists()).toBe(true);
    expect(image.props('src')).toBe('@/assets/logo2.png');
  });

  // Test that checks if the AboutPage contains the description text
  it('renders with the application description text', () => {
    const wrapper = mount(AboutPage, { localVue, vuetify });
    const description = wrapper.find('.about-text');
    expect(description.exists()).toBe(true);
    expect(description.text()).toContain('This web application is developed using the Vuetify framework');
  });
});
