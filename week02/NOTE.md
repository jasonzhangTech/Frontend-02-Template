<!--
 * @Author: your name
 * @Date: 2020-06-29 05:44:41
 * @LastEditTime: 2020-07-19 22:25:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Frontend-02-Template/week02/NOTE.md
--> 
# 学习笔记
## 笔记-JS语言通识
<week02/第一周:JS语言通识.pdf>
## 笔记-JS类型
<week02/第一周:JS类型.pdf>
## 笔记-JS对象
<week02/第一周：JS对象.pdf>

# 总结
> 1. 对BNF理解不够深入
- 巩固：
- https://zh.wikipedia.org/wiki/%E5%B7%B4%E7%A7%91%E6%96%AF%E8%8C%83%E5%BC%8F
- https://www.coursera.org/lecture/dmathgen/86-bnffan-shi-I1oLz


> 2. 关于ECMAScript Specification Types
- 参考：
- http://www.ecma-international.org/ecma-262/6.0/#sec-list-and-record-specification-type


> 3. 其他
- 所有的可计算的问题都可用来描述的语言具备图灵完备性；
- 对象的行为改变状态
- 一般，数据属性用于描述状态，访问器属性用于描述行为，数据属性中如果存储函数，也可用于描述行为

> 4. 助教补充
- BNF
1. BNF 的问题，是在四则表达式的基础上来增加括号。
首先，我们应该考虑 括号再四则运算中事什么样的运算。
其实，括号应该属于一个单元运算，不应该混合在四则运算中间的。
所以情况因该是：括号包裹者四则运算表达式并与四则运算表达式进行四则运算。

因此，解法应该是 括号包裹四则运算表达式，并且是四则运算表达式的一员 这样的思路


对于四则运算表达式 <AddtiveExpression> 的表述如下：

<AddtiveExpression>::=<MultiplicativeExpression>|
    <AddtiveExpression>"+"<MultiplicativeExpression>|
    <AddtiveExpression>"-"<MultiplicativeExpression>

<MultiplicativeExpression>::= <Number>|
    <MultiplicativeExpression>"*"<Number>|
    <MultiplicativeExpression>"/"<Number>

那么我们可以把括号放在更高的层级上：
如下 （解法1）

<Expression>::= <Parenthese>|
    <Parenthese>"+"<Parenthese>|
    <Parenthese>"-"<Parenthese>|
    <Parenthese>"*"<Parenthese>|
    <Parenthese>"/"<Parenthese>

<Parenthese>::= <AddtiveExpression> | "("<Parenthese>")"

<AddtiveExpression>::=<MultiplicativeExpression>|
    <AddtiveExpression>"+"<MultiplicativeExpression>|
    <AddtiveExpression>"-"<MultiplicativeExpression>

<MultiplicativeExpression>::= <Number>|
    <MultiplicativeExpression>"*"<Number>|
    <MultiplicativeExpression>"/"<Number>

当然也可以把括号放在更低的层级下：
如下 （解法2）

<AddtiveExpression>::=<MultiplicativeExpression>|
    <AddtiveExpression>"+"<MultiplicativeExpression>|
    <AddtiveExpression>"-"<MultiplicativeExpression>

<MultiplicativeExpression>::= <Factor>|
    <MultiplicativeExpression>"*"<Factor>|
    <MultiplicativeExpression>"/"<Factor>

<Factor> ::= <Number> | "("<AddtiveExpression>")"

解法不唯一，理解就好。

- 2. UTF8 的问题
UTF8 的问题本质是一个编码题，就是把一个数字按照一定的规则进行编码。
UTF8 理论上可以编码为 6 字节（限行标准为 4 字节，感谢同学提示）
既然是编码作业，肯定是要使用位运算的。UTF 编码方式很有规律，
所以推荐使用 if - else 来判断码点来进行计算。
UTF8 编码本质上是一个二段分段函数。 在码点 127 的时候分段。

码点大于 127 的时候 实际上是 在编码 6 位的基础上 码点每增加 5 位
（最高位有效编码位会少 1 位，增加一个字节有效编码增加 6 位 6 - 1 = 5）。最终编码字节数就加 1。

因此很容易估算出结果的字长。剩下的就可以按照位运算去运算了。

以下是我自己写的一个例子：

function UTF_Encoding(string) {
    let result = [];
    for(let index = 0; index < string.length; index++) {
        let codePoint = string.codePointAt(index);
        if (codePoint < 128) {
            result.push(codePoint);
            continue;
        }
        let tmpArray = [];
        while (codePoint > 0) {
            let bitLength = Math.ceil(Math.log2(codePoint - 1));
            if (bitLength + tmpArray.length + 1 > 8) {
                tmpArray.unshift((codePoint & 0b00111111) | 0b10000000);
            } else {
               tmpArray.unshift(codePoint | ((0b11111111 << (7 - tmpArray.length)) & 0b11111111))
            }
            codePoint = codePoint >> 6;
        }
        result = [...result, ...tmpArray];
    }

    return result;
}


