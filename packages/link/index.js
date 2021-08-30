import Link from './src/main';

/** !LEARN */
/* istanbul ignore next */
Link.install = function (Vue) {
  Vue.component(Link.name, Link);
};

export default Link;
/**
 * Vue.js的插件应该暴露一个install方法：
 * 这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
 */

/**
 * Vue.component(id,[definition])
 * 注册或获取全局组件。注册还会自动使用给定的 id 设置组件的名称
 */

/**
 * 通过全局方法 Vue.use() 使用插件。
 * 它需要在你调用 new Vue() 启动应用之前完成。
 */