<!--
 * @Author: zhy
 * @Date: 2020-06-29 05:44:41
 * @LastEditTime: 2020-07-26 22:04:44
 * @LastEditors: Please set LastEditors
--> 
# 学习笔记
## 浏览器工作原理
### 浏览器总论 ｜ 浏览器的工作原理总论
1. 关于浏览器
> URL => (HTTP) => HTML => (parse) => DOM => (css computing) => DOM with CSS => (layout) => DOM with position => (render) => Bitmap 

### 状态机
1. **有限状态机**
> 浏览器贯穿始终的处理字符串

**有限状态机：**
- 每一个状态机都是一个机器
-    在每一个机器里，我们都可以做计算、存储、输出……
-    所有的这些机器*接受的输入是一致的*
-    状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数（无副作用）
- 每一个机器知道下一个状态
-    每个机器都有确定的下一个状态（Moore）
-    每个机器根据输入决定下一个状态（Mealy）

**JS中的有限状态机（Mealy）**
(```) 
    // 每个函数是一个状态
    function state(input) // 函数参数就是输入
    {
        // 在函数中，可以自由地编写代码，处理每个状态的逻辑
        return next; // 返回值作为下一个状态
    }

    //以下是调用
    while(input) {
        // 获取输入
        state = state(input); // 把状态机的返回值作为下一个状态
    }
(```)

2. **不使用有限状态机处理字符串**
> 思考：在一个字符串中，找到字符“a”

(```)
    function match(string) {
        for(let c of string) {
            if(c == 'a') {
                return true
            }
            return false
        }
    }

    match('I am Groot.')
(```)

> 思考：在一个字符串中，找到字符“ab”

(```)
    function match(string) {
        let foundA = false
        for let( c of string) {
            if( c == 'a') {
                foundA = true
            }else if ( foundA && c == 'b') {
                return true
            }else {
                foundA = false
            }
        }
        return false
    }

    console.log(match('I am abcGroot.'))
(```)

> 思考：在一个字符串中，找到字符'abcdef'

(```)
    function match(string) {
        let foundA = false
        let foundB = false
        let foundC = false
        let foundD = false
        let foundE = false
        
        for let( c of string) {
            if( c == 'a') {
                foundA = true
            }else if ( foundA && c == 'b') {
                foundB = true
            }else if ( foundB && c == 'c') {
                foundC = true
            }else if ( foundC && c == 'd') {
                foundD = true
            }else if ( foundD && c == 'e') {
                foundE = true
            }else if ( foundE && c == 'f') {
                return true
            }else {
                foundA = false
                foundB = false
                foundC = false
                foundD = false
                foundE = false
            }
        }
        return false
    }

    console.log(match('I am abcefGroot.'))
(```)

3. **使用状态机处理字符串**
(```)
    function match(string) {
        let state = start
        for(let c of string) {
            state = state(c)
        }
        return state === end
    }

    function start(c) {
        if(c === 'a'){
            return foundA
        }else {
            return start
        }
    }

    function end(c) {
        return end
    }

    function foundA(c) {
        if(c === 'b'){
            return foundB
        }else {
            return start(c)
        }
    }

    function foundB(c) {
        if(c === 'c'){
            return foundC
        }else {
            return start(c)
        }
    }

    function foundC(c) {
        if(c === 'd'){
            return foundD
        }else {
            return start(c)
        }
    }

    function foundD(c) {
        if(c === 'e'){
            return foundE
        }else {
            return start(c)
        }
    }

    function foundE(c) {
        if(c === 'f'){
            return end
        }else {
            return start(c)
        }
    }

    console.log('I am ababcdefGroot.')
(```)

> 思考：我们如何用状态机处理诸如“abcabx”这样的字符串

```
    function match(string) {
        let state = start
        for(let c of string) {
            state = state(c)
        }
        return state === end
    }

    function start(c) {
        if(c === 'a') {
            return foundA
        }else {
            return start
        }
    }

    function end(c) {
        return end
    }

    function foundA(c) {
        if(c === 'b') {
            return foundB
        }else {
            return start(c)
        }
    }

    function foundB(c) {
        if(c === 'c') {
            return foundC
        }else {
            return start(c)
        }
    }

    function foundC(c) {
        if(c === 'a') {
            return foundA2
        }else {
            return start(c)
        }
    }

    function foundA2(c) {
        if(c === 'b') {
            return foundB2
        }else {
            return start(c)
        }
    }

    function foundB2(c) {
        if(c === 'x') {
            return end
        }else {
            return foundB(c)
        }
    }

    console.log(match('abcabcabx'))
```

> 思考：使用状态机完成“abababx”的处理？
> 进阶：我们如何使用状态机处理完全未知的pattern？
> - 参考资料：字符串KMP算法


### HTTP请求
> URL ===> HTML

1. **HTTP的协议解析**
   - **ISO-OSI七层网络模型**
   -    应用、表示、会话 ——> HTTP *require('http')*
   -    传输 ——> TCP *require('net')
   -    网络 ——> Internet 
   -    数据链路、物理层 ——> 4G/5G/Wi-Fi *完成点对点的 准确数据传输*
   - **TCP与IP的基础知识**
   -    流 *传输数据 分割单位*
   -    端口 
   -    require('net')
   -    包 *IP根据地址找对应的包*
   -    libnet *构造IP包并发送* / libpcap *从网卡抓所有流经的包*
   - **HTTP**
   -    *相对TCP的全双工通道，HTTP必须先由客户端发起request，对应回应一个response*
   -    Request 
   -    Response 
      
2. **服务端环境准备**
   - 代码参见server.js
   - **关于http协议**
   -    文本型的协议，即一般来说，是与二进制协议相对的一种，所有内容都是字符串
   -    request line (method:POST/path:'/'/HTTP版本)
   -    headers (Host:127.0.0.1 Content-Type:application/x-www-form-urlencoded)
   -    *空白行*
   -    body
3. **实现一个HTTP的请求**
   - 设计一个HTTP请求的类
   - content type是一个必要的字段，要有默认值
   - body是KV格式
   - 不同的content-type影响body的格式
4. **send函数的编写，了解response格式**
   - *send函数的编写步骤*
   - 在Request的构造器中收集必要的信息
   - 设计一个send函数，把请求真实发送到服务器
   - send函数应该是异步的，所有返回Promise
   - *response格式*
   - status line (HTTP/1.1 200 OK)
   - headers (与request一致)
   - *空白行*
   - body(chunked body,node默认返回的)
5. **发送请求**  
   - 设计支持已有的connection或者自己新建connection
   - 收到数据传给parser
   - 根据parser的状态resolve Promise
6. **response解析**
   - Response必须分段构造，所以我们要用一个ResponseParser来“装配”
   - ResponseParser分段处理ResponseText， 我们用状态机来分析文本的结构
7. **response body的解析**
   - Response的body可能根据Content-Type有不同的结构，因此我们回采用子Parser的结构来解决问题
   - 以TrunkedBodyParser为例，我们同样用状态机来处理body的格式
### HTML解析

1. **HTML parse模式的文件拆分**
   - 为了方便文件管理，我们把parser单独拆到文件中
   - parser接受HTML文本作为参数，返回一棵DOM树
2. **用FSM实现HTML的分析**
   - 我们用FSM(有限状态机)来实现HTML的分析
   - 在HTML标准中，已经规定来HTML的状态
   - Toy-Browser只挑选其中一部分状态，完成一个最简版本
3. **解析标签**
   - 主要的标签有：开始标签、结束标签、自封闭标签
4. **创建元素**
   - 在状态机中，除来状态迁移，我们还会加入业务逻辑
   - 我们在标签结束状态提交标签token
5. **处理属性**
   - 属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理
   - 处理属性的方式跟标签类似
   - 属性结束时，我们把属性加到标签Token上
6. **用token构建DOM树**
   - 从标签构建DOM树的基本技巧时使用栈
   - 遇到开始标签时创建元素并入栈，遇到结束标签出栈
   - 自封闭节点可视为入栈后立刻出栈
   - 任何元素的父元素是它入栈前的栈顶
7. **将文本节点加到DOM树**
   - 文本节点与自封闭标签处理类似
   - 多个文本节点需要合并

