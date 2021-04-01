---
title: React 移动端滑动验证组件
---

# API

| props | 类型 | 描述 |
| - | - | - |
| onSuccess | func | 滑动成功的回调函数：有返回值时会在1秒后重置滑动组件状态；无返回值则滑动成功后组件保持成功状态。 |
| loading | bool | 控制组件 loading 状态 |
| disabled | bool | 控制组件是否可用 |
| text | string | 组件正常状态先展示的文案 |
| containerStyle | object | 最外层容器的样式，建议只传入布局相关属性 |


- 示例：http://blog.xbr.pub/react-swipe-verify/dist/
- 使用移动端设备打开示例页，或使用浏览器调试工具（打开后刷新页面，否则会出现宽度获取错误，无法滑动到成功的问题）。


# 场景一：登录验证

仅单次滑动校验

# 场景二：类似按钮动作

需要重复使用，滑动后需要重置状态