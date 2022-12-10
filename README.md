# Vue for Valve's Panorama UI（已弃用，不再更新，推荐[solid-panorama](https://github.com/RobinCodeX/solid-panorama)）

Vue 项目编译范例: [panorama-vue-example](https://github.com/RobinCodeX/panorama-vue-example)

目前已经适配完成，不过有些事项需要说明:

### 不支持 Fragment

根节点必须只能存在一个，如果不存在根节点就会被渲染成 Fragment，此时 vue 会创建两个空的文本节点，导致出现两个 Label，目前除非改 vue 的 core 代码，否则没法避免。

例如

```vue
<template>
    <Panel class="A"></Panel>
    <Panel class="B"></Panel>
    <Panel class="C"></Panel>
</template>
```
