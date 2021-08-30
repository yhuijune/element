<template>
  <a
    :class="[
      'el-link',
      type ? `el-link--${type}` : '',
      disabled && 'is-disabled',
      underline && !disabled && 'is-underline',
    ]"
    :href="disabled ? null : href"
    v-bind="$attrs"
    @click="handleClick"
  >
    <i :class="icon" v-if="icon"></i>
    <!-- 默认插槽 -->
    <span v-if="$slots.default" class="el-link--inner">
      <slot></slot>
    </span>
    <!-- 具名插槽 -->
    <template v-if="$slots.icon">
      <slot name="icon"></slot>
    </template>
  </a>
</template>

<script>
export default {
  name: "ElLink",

  props: {
    type: {
      type: String,
      default: "default",
    },
    underline: {
      type: Boolean,
      default: true,
    },
    disabled: Boolean,
    href: String,
    icon: String,
  },

  methods: {
    handleClick(event) {
      // if (!this.disabled) {
      //   if (!this.href) {
      //     this.$emit("click", event);
      //   }
      // }
      if (!this.disabled && !this.href) {
        this.$emit("click", event);
      }
    },
  },
};

/**
 * !LEARN
 * v-bind="$attrs"
 * :class=[]
 */
</script>
