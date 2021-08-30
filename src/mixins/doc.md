# mixin(混入)

混入 (mixin) 提供了一种非常灵活的方式，来<b>分发 Vue 组件中的可复用功能</b>。

一个混入对象<b>可以包含任意组件选项</b>。

当组件使用混入对象时，<u>所有混入对象的选项将被“混合”进入该组件本身的选项</u>。

例子：
```js
// 定义一个混入对象
const myMixin = {
    methods:{
        greet(){
            console.log("Hello")
        }
    },
    create(){
        this.greet()
    }
}
// 定义一个混入对象的组件
const Component = Vue.extends({
    mixin:[myMixin]
})
const component = new Component(); // Hello
```

## 选项合并

当组件和混入对象含有<b>同名选项</b>时，这些选项将以恰当的方式进行“合并”。比如，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。

值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

<b>同名钩子函数</b>将合并为一个数组，因此都将被调用。<u>另外，混入对象的钩子将在组件自身钩子之前调用。</u>

> 注意：`Vue.extend()` 也使用同样的策略进行合并。


## 全局混入

## 自定义选项合并策略