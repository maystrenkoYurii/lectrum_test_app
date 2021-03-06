const { configure, render, shallow, mount } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });

global.React = require('react');
global.shallow = shallow;
global.mount = mount;
global.render = render;
