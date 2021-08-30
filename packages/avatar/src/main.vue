<script>
export default {
  name: "ElAvatar",

  /** !LEARN:属性 */
  props: {
    size: {
      /** prop的类型数组写法 */
      type: [Number, String],
      /** 可以是number或string 但如果是string类型的，必须是"large", "medium", "small"其中之一 */
      validator(val) {
        if (typeof val === "string") {
          return ["large", "medium", "small"].includes(val);
        }
        return typeof val === "number";
      },
    },
    shape: {
      type: String,
      default: "circle",
      validator(val) {
        return ["circle", "square"].includes(val);
      },
    },
    icon: String,
    src: String,
    alt: String,
    srcSet: String,
    error: Function,
    fit: {
      type: String,
      default: "cover",
    },
  },

  data() {
    return {
      isImageExist: true,
    };
  },

  computed: {
    avatarClass() {
      const { size, icon, shape } = this;
      let classList = ["el-avatar"];

      if (size && typeof size === "string") {
        classList.push(`el-avatar--${size}`);
      }

      if (icon) {
        classList.push("el-avatar--icon");
      }

      if (shape) {
        classList.push(`el-avatar--${shape}`);
      }

      return classList.join(" ");
    },
  },

  methods: {
    handleError() {
      /** error:当展示类型为图片的时候，图片加载失败的 fallback 行为 */
      const { error } = this;
      const errorFlag = error ? error() : undefined;
      if (errorFlag !== false) {
        this.isImageExist = false;
      }
    },
    /** 渲染组件的方法 */
    renderAvatar() {
      const { icon, src, alt, isImageExist, srcSet, fit } = this;

      /** 如果图片存在且有src */
      if (isImageExist && src) {
        return (
          /** !LEARN:img标签的onerror事件 */
          // 如果在加载或渲染图像时发生错误，且设置了至少一个 onerror 事件处理器来处理 error 事件
          <img
            src={src}
            onError={this.handleError}
            alt={alt}
            // srcset 以逗号分隔的一个或多个字符串列表表明一系列用户代理使用的可能的图像。
            srcSet={srcSet}
            // object-fit
            style={{ "object-fit": fit }}
          />
        );
      }
      /** 如果有icon */
      if (icon) {
        return <i class={icon} />;
      }

      return this.$slots.default;
    },
  },

  render() {
    const { avatarClass, size } = this;

    const sizeStyle =
      typeof size === "number"
        ? {
            height: `${size}px`,
            width: `${size}px`,
            lineHeight: `${size}px`,
          }
        : {};

    return (
      <span class={avatarClass} style={sizeStyle}>
        {this.renderAvatar()}
      </span>
    );
  },
};
</script>
