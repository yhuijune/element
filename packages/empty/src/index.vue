<template>
  <div class="el-empty">
    <div class="el-empty__image" :style="imageStyle">
      <!-- !LEARN:img标签 ondragstart事件 -->
      <!-- return false来取消默认事件 -->
      <img v-if="image" :src="image" ondragstart="return false" />
      <slot v-else name="image">
        <img-empty />
      </slot>
    </div>
    <div class="el-empty__description">
      <slot v-if="$slots.description" name="description"></slot>
      <p v-else>{{ emptyDescription }}</p>
    </div>
    <div v-if="$slots.default" class="el-empty__bottom">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ImgEmpty from "./img-empty.vue";

/** !LEARN: locale*/
import { t } from "element-ui/src/locale";

export default {
  name: "ElEmpty",
  components: {
    // TODO: ??? [ImgEmpty.name]: ImgEmpty
    [ImgEmpty.name]: ImgEmpty,
  },
  props: {
    image: {
      type: String,
      default: "",
    },
    imageSize: Number,
    description: {
      type: String,
      default: "",
    },
  },
  computed: {
    /** 计算属性也是响应式数据 */
    emptyDescription() {
      /** 依赖于别的响应式数据 */
      return this.description || t("el.empty.description");
    },
    imageStyle() {
      return {
        width: this.imageSize ? `${this.imageSize}px` : "",
      };
    },
  },
};
</script>
