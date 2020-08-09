<!--
 * @Author: zhy
 * @Date: 2020-06-29 05:44:41
 * @LastEditTime: 2020-08-09 12:55:59
-->
#学习笔记

## CSS总论
1. CSS语法的研究
   > **2.1标准**——CSS总体结构：@charset,@import,rules(@media,@page,rule)
   - https://www.w3.org/TR/CSS21/grammar.html#q25.0
   - https://www.w3.org/TR/css-syntax-3/
2. CSS @规则的研究
   **At-rules**
   - @charset:https://www.w3.org/TR/css-syntax-3/ *声明CSS的字符集*
   - @import:https://www.w3.org/TR/css-cascade-4/ *级联规则*
   - **@media**:https://www.w3.org/TR/css3-conditional/ *查询媒体*
   - @page:https://www.w3.org/TR/css-page-3/ *分页媒体，打印机*
   - @counter-style:https://www.w3.org/TR/css-counter-styles-3/ *列表*
   - **@keyframes**:https://www.w3.org/TR/css-animations-1/ *定义动画*
   - **@fontface**:https://www.w3.org/TR/css-fonts-3/ *定义字体*
   - @supports:https://www.w3.org/TR/css3-conditional/ *兼容性检查*
   - @namespace:https://www.w3.org/TR/css-namespaces-3/
3. CSS规则的结构
   - 选择器(Selector:*level3:*https://www.w3.org/TR/selectors-3/ *level4:*https://www.w3.org/TR/selectors-4/)
   -     selector_group
   -     selector
   -         >
         -     <sp>
         -     +
         -     ~
   -     simple_selector
         -     type
         -     *
         -     .
         -     #
         -     []
         -     :
         -     ::
         -     :not()
   - 声明
   -     key
         -     Variables:https://www.w3.org/TR/css-variables/
         -     properties
   -     Value(https://www.w3.org/TR/css-values-4/)
         -     calc
         -     number
         -     length
         -     ……
4. 收集标准
   > https://www.w3.org/TR
   - **小实验：** JSON.stringify(Array.prototype.slice.call(document.querySelector('#container').children).filter(e => e.getAttribute('data-tag').match(/css/)).map(e => ({name:e.children[1].innerText, url:e.children[1].children[0].href})))
   - 爬虫工具：
   [css-crawler.js](./css-crawler.js)
5. CSS总论总结
   - CSS语法
   - at-rule
   - selector
   - variables
   - value
   - 实验
## CSS选择器
1. 选择器语法
2. 选择器的优先级
3. 伪类
4. 伪元素