<template>
  <div class="el-badge">
    <!-- 默认插槽 -->
    <slot></slot>
    <transition name="el-zoom-in-center">
      <!-- 标记 -->
      <!-- ！LEARN： sup标签 -->
      <!-- v-text -->
      <sup
        v-show="!hidden && (content || content === 0 || isDot)"
        v-text="content"
        class="el-badge__content"
        :class="[
          'el-badge__content--' + type,
          {
            'is-fixed': $slots.default,
            'is-dot': isDot,
          },
        ]"
      >
      </sup>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ElBadge",

  props: {
    value: [String, Number],
    max: Number,
    /** !LEARN: 在template中全小写，js中驼峰写法 */
    isDot: Boolean,
    hidden: Boolean,
    type: {
      type: String,
      validator(val) {
        return (
          ["primary", "success", "warning", "info", "danger"].indexOf(val) > -1
        );
      },
    },
  },

  computed: {
    /** content是个计算属性=>它的值依赖于value prop 和 max prop */
    /** function -> getter ,return 值 */
    content() {
      if (this.isDot) return;

      const value = this.value;
      const max = this.max;

      if (typeof value === "number" && typeof max === "number") {
        return max < value ? `${max}+` : value;
      }

      return value;
    },
  },
};
</script>
