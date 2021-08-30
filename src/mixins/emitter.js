function broadcast(componentName, eventName, params) {
  /** 遍历子组件 */
  this.$children.forEach(child => {
    var name = child.$options.componentName;
    /** 找到子组件并触发相应的事件 */
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      /** 递归寻找某一子组件 */
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      /** 父组件 */
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
