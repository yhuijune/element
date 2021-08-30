<template>
  <transition name="el-alert-fade">
    <div
      class="el-alert"
      :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]"
      v-show="visible"
      role="alert"
    >
      <!-- icon -->
      <i
        class="el-alert__icon"
        :class="[iconClass, isBigIcon]"
        v-if="showIcon"
      ></i>
      <!-- content -->
      <div class="el-alert__content">
        <!-- title插槽:vm.$slots.title-->
        <span
          class="el-alert__title"
          :class="[isBoldTitle]"
          v-if="title || $slots.title"
        >
          <!-- 插槽有默认的内容 -->
          <slot name="title">{{ title }}</slot>
        </span>
        <!-- 默认(description)插槽:vm.$slots.default -->
        <p class="el-alert__description" v-if="$slots.default && !description">
          <slot></slot>
        </p>
        <p class="el-alert__description" v-if="description && !$slots.default">
          {{ description }}
        </p>
        <!-- 关闭图标 -->
        <i
          class="el-alert__closebtn"
          :class="{
            'is-customed': closeText !== '',
            'el-icon-close': closeText === '',
          }"
          v-show="closable"
          @click="close()"
          >{{ closeText }}</i
        >
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
/** 定义常量 */
const TYPE_CLASSES_MAP = {
  success: "el-icon-success",
  warning: "el-icon-warning",
  error: "el-icon-error",
};
export default {
  name: "ElAlert",

  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "info",
    },
    closable: {
      type: Boolean,
      default: true,
    },
    closeText: {
      type: String,
      default: "",
    },
    showIcon: Boolean,
    center: Boolean,
    /** props的对象写法 */
    effect: {
      type: String,
      default: "light",
      validator: function (value) {
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },

  data() {
    return {
      visible: true,
    };
  },

  methods: {
    /** 关闭alert时触发的事件 */
    close() {
      this.visible = false;
      /** 触发当前实例的事件，附加的参数都会传给监听器回调 */
      /** vm.$emit(eventName[,arg]) */
      this.$emit("close");
    },
  },

  computed: {
    typeClass() {
      return `el-alert--${this.type}`;
    },

    iconClass() {
      return TYPE_CLASSES_MAP[this.type] || "el-icon-info";
    },

    isBigIcon() {
      return this.description || this.$slots.default ? "is-big" : "";
    },

    isBoldTitle() {
      return this.description || this.$slots.default ? "is-bold" : "";
    },
  },
};

/**
 * !LEARN:Array.prototype indexOf 和 includes 区别：
 * indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
 * includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
 * arr.indexOf(item) === -1  等价于 arr.includes(item) === false
 */
</script>
