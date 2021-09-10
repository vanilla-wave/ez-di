import { mount } from 'enzyme';
import * as React from 'react';
import { DiProvider, diBlock } from '../src';

const ButtonBase = () => <button className="base"></button>;
const ButtonBase2 = () => <button className="base2"></button>;

const RedButton = () => <button className="red"></button>;
const BlueButton = () => <button className="blue"></button>;
const Button = diBlock('Button')(ButtonBase);
const Button2 = diBlock('Button2')(ButtonBase2);

describe('basic usage', () => {
  it('component found in registry -> render from registry', () => {
    const App = () => (
      <DiProvider registry={{ Button: RedButton }}>
        <Button />
      </DiProvider>
    );
    const wrapper = mount(<App />);

    expect(wrapper.find('.red').exists()).toBeTruthy();
  });

  it('component not found in registry -> render base', () => {
    const App = () => (
      <DiProvider registry={{ Button2: RedButton }}>
        <Button />
      </DiProvider>
    );
    const wrapper = mount(<App />);

    expect(wrapper.find('.base').exists()).toBeTruthy();
  });
});

describe('nesting', () => {
  it('nested providers -> overrride value', () => {
    const App = () => (
      <DiProvider registry={{ Button: RedButton }}>
        <DiProvider registry={{ Button: BlueButton }}>
          <Button />
        </DiProvider>
      </DiProvider>
    );
    const wrapper = mount(<App />);

    expect(wrapper.find('.base').exists()).toBeFalsy();
    expect(wrapper.find('.red').exists()).toBeFalsy();
    expect(wrapper.find('.blue').exists()).toBeTruthy();
  });

  it('nested providers -> extends registry', () => {
    const App = () => (
      <DiProvider registry={{ Button: RedButton }}>
        <DiProvider registry={{ Button2: BlueButton }}>
          <Button />
          <Button2 />
        </DiProvider>
      </DiProvider>
    );
    const wrapper = mount(<App />);

    expect(wrapper.find('.base').exists()).toBeFalsy();
    expect(wrapper.find('.red').exists()).toBeTruthy();

    expect(wrapper.find('.base2').exists()).toBeFalsy();
    expect(wrapper.find('.blue').exists()).toBeTruthy();
  });
});
