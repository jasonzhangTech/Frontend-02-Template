<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [学习笔记](#学习笔记)
  - [重学HTML](#重学html)
    - [1. HTML的定义：XML和SGML](#1-html的定义xml和sgml)
    - [2. HTML标签语义](#2-html标签语义)
    - [3. HTML语法](#3-html语法)
  - [浏览器API](#浏览器api)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: zhy
 * @Date: 2020-06-29 05:44:41
 * @LastEditTime: 2020-08-23 13:09:19
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
1. DOM API
2. 事件API
3. Range API
4. CSSOM
5. CSSOM View
6. 其他API