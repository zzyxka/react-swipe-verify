---
title: React 移动端滑动验证组件
---

# 🌰 示例

![44_800_11b3e22cb2119dc051bd7360174f15bd_f41afbaa4e34e911a77bdd957198ccde](https://gitee.com/zhangzeyi//images/raw/master/20210401161028.png)

- 示例：http://blog.xbr.pub/react-swipe-verify/dist/
- 使用移动端设备打开示例页，或使用浏览器调试工具（打开后刷新页面，否则会出现宽度获取错误，无法滑动到成功状态的问题）。

# 📖 API

| props | 类型 | 描述 |
| - | - | - |
| onSuccess | func | 滑动成功的回调函数：<br />有返回值时会在1秒后重置滑动组件状态；<br />无返回值则滑动成功后组件保持成功状态。 |
| loading | bool | 控制组件 loading 状态 |
| loadingNode | ReactNode | 组件 loading 状态元素/文案展示 |
| disabled | bool | 控制组件是否可用 |
| text | string | 组件正常状态先展示的文案 |
| containerStyle | object | 最外层容器的样式 `style`，建议只传入布局相关属性 |
| swipeNode | ReactNode | 滑块内部元素 |
| successSwipeNode | ReactNode | 校验成功状态下滑块内部元素 |
| customClass | object | 自定义样式 `className`，详见下表 |

## customClass

| 属性               | 描述                              | 不建议覆盖属性                   | 建议                                                         |
| ------------------ | --------------------------------- | -------------------------------- | ------------------------------------------------------------ |
| containerBar       | 滑动条容器                        | `position` `display`             | 覆盖 `height` 时，请设置相同的 `line-height` 值              |
| containerBarUnable | `disabled`/`loading` 状态下的容器 |                                  |                                                              |
| swipedPart         | 滑动过的部分                      | `position` `dispaly` `width`     | 🔥 覆盖 `width` 将导致组件无法正常渲染                        |
| swiperBlock        | 滑块                              | `position` `dispaly` `transform` | 覆盖 `height` 时，请设置相同的 `line-height` 值，建议与 `containerBar` 高度保持一致<br />🔥 覆盖 `transform` 将导致组件无法正常渲染 |

> 🔥 注意：
>
> 1. 覆盖不建议的属性可能导致组件异常！！！请按建议规范自定义样式。
> 2. 建议使用 `css modules`。

