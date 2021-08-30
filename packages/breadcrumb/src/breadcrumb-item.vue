<template>
  <span class="el-breadcrumb__item">
    <span
      :class="['el-breadcrumb__inner', to ? 'is-link' : '']"
      ref="link"
      role="link"
    >
      <!-- 默认插槽 -->
      <slot></slot>
    </span>
    <i
      v-if="separatorClass"
      class="el-breadcrumb__separator"
      :class="separatorClass"
    ></i>
    <span v-else class="el-breadcrumb__separator" role="presentation">{{
      separator
    }}</span>
  </span>
</template>
<script>
export default {
  name: "ElBreadcrumbItem",
  props: {
    to: {},
    replace: Boolean,
  },
  data() {
    return {
      separator: "",
      separatorClass: "",
    };
  },
  // provide / inject
  inject: ["elBreadcrumb"],

  mounted() {
    this.separator = this.elBreadcrumb.separator;
    this.separatorClass = this.elBreadcrumb.separatorClass;

    // vm.$refs 一个对象，持有注册过 ref attribute 的所有 DOM 元素和组件实例
    const link = this.$refs.link;
    // element.setAttribute(name, value)
    link.setAttribute("role", "link");
    // target.addEventListener(type, listener, options)
    link.addEventListener("click", (_) => {
      const { to, $router } = this;
      // vm.$router.replace() vm.$router.push()
      if (!to || !$router) return;
      this.replace ? $router.replace(to) : $router.push(to);
    });
  },
};
</script>
