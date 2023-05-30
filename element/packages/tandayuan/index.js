import Tandayuan from './src/main';

/* istanbul ignore next */
Tandayuan.install = function(Vue) {
  Vue.component(Tandayuan.name, Tandayuan);
};

export default Tandayuan;
