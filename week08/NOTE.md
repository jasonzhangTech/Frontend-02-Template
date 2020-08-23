<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [学习笔记](#学习笔记)
  - [重学HTML](#重学html)
    - [1. HTML的定义：XML和SGML](#1-html的定义xml和sgml)
    - [2. HTML标签语义](#2-html标签语义)
    - [3. HTML语法](#3-html语法)
  - [浏览器API](#浏览器api)
    - [1. DOM API](#1-dom-api)
    - [2. 事件API](#2-事件api)
    - [3. Range API](#3-range-api)
    - [4. CSSOM](#4-cssom)
    - [5. CSSOM View](#5-cssom-view)
    - [6. 其他API](#6-其他api)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: zhy
 * @Date: 2020-06-29 05:44:41
 * @LastEditTime: 2020-08-23 21:36:19
 * @LastEditors: Please set LastEditors
-->
# 学习笔记
## 重学HTML
### 1. HTML的定义：XML和SGML
   - DTD与XML namespace
     - http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd
     - http://www.w3.org/1999/xhtml
### 2. HTML标签语义
   - [HTML标签嵌套规则](https://www.softwhy.com/article-33-1.html)
### 3. HTML语法
   - 合法元素
  ```
     - Element:<tagname>...</tagname>
     - Text:text
     - Comment:<!-- comments -->
     - DocumentType:<!Doctype html>
     - ProcessingInstruction:<?a 1?>
     - CDATA:<![CDATA[]]> 
  ```
   - 字符引用
  ```
    - &#161;
    - &amp;
    - &lt;
    - &quot;
  ```
## 浏览器API
### 1. DOM API
   - Node
     - Element:元素型节点，跟标签相对应
       - HTMLElement
         - HTMLAnchorElement
         - HTMLAppleElement
         - HTMLAreaElement
         - HTMLAudioElement
         - HTMLBaseElement
         - HTMLBodyElement
         - ...
       - SVGElement
         - SVGAElement
         - SVGAltElement
         - ...
     - Document:文档型节点
     - CharacterData：字符数据
       - Text:文本节点
       - Comment:注释
       - ProcessingInstruction:处理信息
     - DocumentFragment:文档片段
     - DocumentType:文档类型
   - **导航类操作**
     - 节点导航
       - parentNode
       - childNodes
       - firstChild
       - lastChild
       - nextSibling
       - previousSibling
     - 元素导航
       - parentElement
       - children
       - firstElementChild
       - lastElementChild
       - nextElementSibling
       - previousElementSibling
   - 修改操作
     - appendChild
     - insertBefore
     - removeChild
     - replaceChild
   - 高级操作
     - compareDocumentPosition是一个用于比较两个节点中关系的函数
     - contains检查一个节点是否包含另一个节点的函数
     - isEqualNode检查两个节点是否完全相同
     - isSameNode检查两个节点是否是同一个节点，实际上在javaScript中可以用“===”
     - cloneNode复制一个节点，如果传入参数true，则会连同子元素做深拷贝
  
### 2. 事件API
  - Event：冒泡和捕获（先捕获再冒泡）
### 3. Range API
  - var range = new Range()
  - range.setStart(element,9)
  - range.setEnd(element,4)
  - var range = document.getSelection().getRangeAt(0);
  - range.setStartBefore
  - range.setEndBefore
  - range.setStartAfter
  - range.setEndAfter
  - range.selectNode
  - range.setNodeeContents
  - var fragment = range.extractContents()
  - range.insertNode(document.createTextNode("aaa"))
### 4. CSSOM
  - **document.styleSheets**
    - document.styleSheets
  - Rules
    - document.styleSheets[0].cssRules
    - document.styleSheets[0].insertRule("p{}color:pink;",0)
    - document.styleSheets[0].removeRule(0)
  - CSSStyleRule
    - selectorText String
    - style K-V结构
  - getComputedStyle
    - window.getComputedStyle(elt,pseudoElt);
      - elt想要获取的元素
      - pseudoElt可选，伪元素
### 5. CSSOM View
  - **window**
    - window.innerHeight,window.innerWidth
    - window.outerWidth,window.outerHeight
    - window.devicePixelRatio
    - window.screen
      - window.screen.width
      - window.screen.height
      - window.screen.availWidth
      - window.screen.availHeight
  - Window API
    - window.open("about:blank","blank","width=100,height=100,left=100,right=100")
    - moveTo(x,y)
    - moveBy(x,y)
    - resizeTo(x,y)
    - resizeBy(x,y)
  - scroll
    - scrollTop
    - scrollLeft
    - scrollWidth
    - scrollHeight
    - scroll(x,y)
    - scrollBy(x,y)
    - scrollIntoView()
    - window
      - scrollX
      - scrollY
      - scroll(x,y)
      - scrollBy(x,y)
  - **layout**
    - getClientRects()
    - getBoundingClientRect()
### 6. 其他API
  - 来源：标准化组织
    - khronos
      - WebGL
    - ECMA
      - ECMAScript
    - WHATWG
      - HTML
    - W3C
      - webaudio
      - CG/WG
  - [全部API分类整理](./getAllApis.html)