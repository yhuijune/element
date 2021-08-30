<script>
import TabNav from "./tab-nav";

export default {
  name: "ElTabs",

  components: {
    TabNav,
  },

  props: {
    /** 风格类型 */
    type: String,
    type: {
      typeof: String,
      default: "card",
      validate: (value) => ["card", "border-card	"].includes(value),
    },
    activeName: String,
    /** 标签是否可关闭 */
    closable: Boolean,
    /** 标签是否可增加 */
    addable: Boolean,
    /** 绑定值，选中选项卡的 name */
    value: {},
    /** 标签是否同时可增加和关闭 */
    editable: Boolean,
    tabPosition: {
      type: String,
      default: "top",
    },
    /** 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。 */
    beforeLeave: Function,
    /** 标签的宽度是否自撑开 */
    stretch: Boolean,
  },

  /** !LEARN:provide函数，返回一个对象 */
  provide() {
    return {
      rootTabs: this,
    };
  },

  data() {
    return {
      currentName: this.value || this.activeName,
      panes: [],
    };
  },

  watch: {
    activeName(value) {
      this.setCurrentName(value);
    },
    value(value) {
      this.setCurrentName(value);
    },
    currentName(value) {
      if (this.$refs.nav) {
        this.$nextTick(() => {
          this.$refs.nav.$nextTick((_) => {
            this.$refs.nav.scrollToActiveTab();
          });
        });
      }
    },
  },

  methods: {
    calcPaneInstances(isForceUpdate = false) {
      if (this.$slots.default) {
        const paneSlots = this.$slots.default.filter(
          (vnode) =>
            vnode.tag &&
            vnode.componentOptions &&
            vnode.componentOptions.Ctor.options.name === "ElTabPane"
        );
        // update indeed
        const panes = paneSlots.map(
          ({ componentInstance }) => componentInstance
        );
        const panesChanged = !(
          panes.length === this.panes.length &&
          panes.every((pane, index) => pane === this.panes[index])
        );
        if (isForceUpdate || panesChanged) {
          this.panes = panes;
        }
      } else if (this.panes.length !== 0) {
        this.panes = [];
      }
    },
    /** 点击tab */
    handleTabClick(tab, tabName, event) {
      if (tab.disabled) return;
      this.setCurrentName(tabName);
      this.$emit("tab-click", tab, event);
    },
    handleTabRemove(pane, ev) {
      if (pane.disabled) return;
      ev.stopPropagation();
      this.$emit("edit", pane.name, "remove");
      this.$emit("tab-remove", pane.name);
    },
    handleTabAdd() {
      this.$emit("edit", null, "add");
      this.$emit("tab-add");
    },
    /** 设置当前 */
    setCurrentName(value) {
      const changeCurrentName = () => {
        this.currentName = value;
        this.$emit("input", value);
      };
      /** 切换标签之前的钩子 */
      if (this.currentName !== value && this.beforeLeave) {
        const before = this.beforeLeave(value, this.currentName);
        if (before && before.then) {
          before.then(
            () => {
              changeCurrentName();
              this.$refs.nav && this.$refs.nav.removeFocus();
            },
            () => {
              // https://github.com/ElemeFE/element/pull/14816
              // ignore promise rejection in `before-leave` hook
            }
          );
        } else if (before !== false) {
          changeCurrentName();
        }
      } else {
        changeCurrentName();
      }
    },
  },

  created() {
    if (!this.currentName) {
      this.setCurrentName("0");
    }

    this.$on("tab-nav-update", this.calcPaneInstances.bind(null, true));
  },

  mounted() {
    this.calcPaneInstances();
  },

  updated() {
    this.calcPaneInstances();
  },

  render(h) {
    let {
      type,
      handleTabClick,
      handleTabRemove,
      handleTabAdd,
      currentName,
      panes,
      editable,
      addable,
      tabPosition,
      stretch,
    } = this;

    const newButton =
      editable || addable ? (
        <span
          class="el-tabs__new-tab"
          on-click={handleTabAdd}
          tabindex="0"
          on-keydown={(ev) => {
            /** 事件属性 keyCode */
            if (ev.keyCode === 13) {
              handleTabAdd();
            }
          }}
        >
          <i class="el-icon-plus"></i>
        </span>
      ) : null;

    const navData = {
      props: {
        currentName,
        onTabClick: handleTabClick,
        onTabRemove: handleTabRemove,
        editable,
        type,
        panes,
        stretch,
      },
      ref: "nav",
    };

    /** header头部 */
    const header = (
      <div class={["el-tabs__header", `is-${tabPosition}`]}>
        {newButton}
        {/** jsx写法 - 解构属性 */}
        <tab-nav {...navData}></tab-nav>
      </div>
    );
    /** panels面板 */
    /** this.$slots.default 默认插槽 */
    const panels = <div class="el-tabs__content">{this.$slots.default}</div>;

    return (
      <div
        class={{
          "el-tabs": true,
          "el-tabs--card": type === "card",
          [`el-tabs--${tabPosition}`]: true,
          "el-tabs--border-card": type === "border-card",
        }}
      >
        {tabPosition !== "bottom" ? [header, panels] : [panels, header]}
      </div>
    );
  },
};

/**
 * Tabs Events
 * tab-click	tab 被选中时触发
 * tab-remove	点击 tab 移除按钮后触发
 * tab-add	  点击 tabs 的新增按钮后触发
 * edit	      点击 tabs 的新增按钮或 tab 被关闭后触发
 */
</script>
