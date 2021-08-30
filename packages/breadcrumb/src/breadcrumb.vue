<template>
  <!-- role="navigation" 语义化，方便浏览器对其具体功能进行识别 -->
  <div class="el-breadcrumb" aria-label="Breadcrumb" role="navigation">
    <!-- 插槽 -->
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "ElBreadcrumb",

  props: {
    // 分隔符
    separator: {
      type: String,
      default: "/",
    },
    separatorClass: {
      type: String,
      default: "",
    },
  },

  // provide / inject
  provide() {
    return {
      elBreadcrumb: this,
    };
  },

  mounted() {
    // vm.$el Vue 实例使用的根 DOM 元素
    // Element.querySelectorAll(selectors) 返回一个nodeList
    const items = this.$el.querySelectorAll(".el-breadcrumb__item");
    if (items.length) {
      items[items.length - 1].setAttribute("aria-current", "page");
    }
  },
};
</script>
