import directive from './src/directive';
import service from './src/index';

/** Element 提供了两种调用 Loading 的方法：指令和服务。 */
export default {
  /** 向外暴露一个install方法 */
  /** 这个方法的第一个参数是Vue构造器 */
  /** 当 install 方法被同一个插件多次调用，插件将只会被安装一次。 */
  install(Vue) {
    /** Vue.use() */
    Vue.use(directive);
    /** 挂载到原型上 */
    Vue.prototype.$loading = service;
  },
  directive,
  service
};
