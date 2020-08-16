<!--
 * @Author: zhy
-->
# 学习笔记
## CSS排版
1. 盒（Box）
   
   |  源代码   | 语义  | 表现  |
   |  ----  | ------ | ----  |
   | 标签Tag | 元素Element | 盒Box |

   > - HTML代码中可以书写开始 *标签*，结束 *标签*和自封闭 *标签*
   > - 一对起止 *标签*，表示一个 *元素*
   > - DOM树中存储的是 *元素*和其他类型的节点（Node）
   > - CSS选择器选中的是 *元素*
   > - CSS选择器选中的 *元素*，在排版时可能产生多个 *盒*
   > - 排版和渲染的基本单位是 *盒*

   **盒模型**
   ![盒模型](./box.png)

2. 正常流
   **IFC:inline-level-formatting-context行内级格式化上下文 & BFC:block-level-formatting-context块级格式化上下文**
3. 正常流的行级排布
   **行模型**
   - line-top
   - text-top
   - base-line
   - text-bottom
   - line-bottom
  **行内盒inline-block它的基线是随着自己里面的文字去变化的**
4. 正常流的块级排布
   - float与clear
   - Margin Collapse边距折叠
5. BFC合并
   - Block Container: 里面有BFC的 **（block,inline-block,table-cell,flex item, grid cell,table-caption）**
     - 能容纳正常流的盒，里面就有BFC 
   - Block-level Box: 外面有BFC的 
     - **(Block level: display:block,display:flex,display:table,display:grid...)**
     - **(Inline level: display:inline-block,display:inline-flex,display:inline-table,display:inline-grid...)**
     - display:run-in
   - Block Box = Block Container + Block-level Box: 里外都有BFC
     - > **设立BFC**
       > floats
       > absolutely positioned elements
       > block containers (such as inline-blocks, table-cells, and table-captions)
        that are not block boxes,
       > flex items
       > grid cell
       >  ......
       > and block boxes with 'overflow' other than 'visible'
       > **BFC合并**
       > block box && overflow:visible
       > BFC合并与float
       > BFC合并与边距折叠
6. Flex排版
   > **计算主轴**
   > - 计算主轴方向：找出所有flex元素；把主轴方向剩余尺寸按比例分配给这些元素；若剩余空间为负数，所有flex元素为0，等比压缩剩余元素
   > **计算交叉轴**
   > - 计算交叉轴方向：根据每一行中最大元素尺寸计算行高；根据行高flex-align和item-align，确定元素具体位置

## CSS动画与绘制
1. 动画
   - Animation
     - @keyframes 定义 （可以使用from to，也可以使用百分比）
     - animation: 使用
     - animation-name 时间曲线
     - animation-duration 动画的时长
     - animation-timing-function 动画的时间曲线
     - animation-delay 动画开始前的延迟
     - animation-iteration-count 动画的播放次数
     - animation-direction 动画的方向
   - Transition
     - transition-property 要变换的属性
     - transition-duration 变换的时长
     - transition-timing-function 时间曲线
     - transition-delay 延迟
   - cubic-bezier
   > https://www.cubic-bezier.com

2. 颜色
   - CMYK与RGB
   - HSL与HSV（Hue：色相，S：纯度，L：亮度Lightness/V：色值，明度Brightness）
3. 绘制
   - 几何图形
    > border
    > box-shadow
    > border-radius
   - 文字
    > font
    > text-decoration
   - 位图
    > background-image
   - 应用技巧：data uri + svg
   