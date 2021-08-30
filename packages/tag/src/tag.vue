<script>
export default {
  name: "ElTag",
  props: {
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: Boolean,
    color: String,
    size: String,
    effect: {
      type: String,
      default: "light",
      /** validator函数 */
      // 自定义验证函数
      validator(val) {
        return ["dark", "light", "plain"].indexOf(val) !== -1;
      },
    },
  },
  methods: {
    handleClose(event) {
      /** 因为外层的span也有click事件，所以需要阻止冒泡 */
      event.stopPropagation();
      /** this.$emit */
      this.$emit("close", event);
    },
    handleClick(event) {
      this.$emit("click", event);
    },
  },
  computed: {
    tagSize() {
      // TODO: this.$ELEMENT???
      return this.size || (this.$ELEMENT || {}).size;
    },
  },
  /** !LEARN render函数 */
  render(h) {
    {
      /** render函数内部的this指向的是该组件 */
    }
    const { type, tagSize, hit, effect } = this;
    const classes = [
      "el-tag",
      type ? `el-tag--${type}` : "",
      tagSize ? `el-tag--${tagSize}` : "",
      effect ? `el-tag--${effect}` : "",
      hit && "is-hit",
    ];
    const tagEl = (
      <span
        class={classes}
        style={{ backgroundColor: this.color }}
        on-click={this.handleClick}
      >
        {this.$slots.default}
        {this.closable && (
          <i
            class="el-tag__close el-icon-close"
            on-click={this.handleClose}
          ></i>
        )}
      </span>
    );

    return this.disableTransitions ? (
      tagEl
    ) : (
      <transition name="el-zoom-in-center">{tagEl}</transition>
    );
  },
};
/**
 * render(h){ ... return component }
 * 有一个 Babel 插件，用于在 Vue 中使用 JSX 语法，它可以让我们回到更接近于模板的语法上
 * 将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的。
 */
/**
 * 内置组件 <transiton></transiton>
 */
</script>
