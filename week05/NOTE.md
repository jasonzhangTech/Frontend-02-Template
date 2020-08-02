# 学习笔记
## CSS计算（CSS Computing）
1. 收集CSS规则
   - 遇到style标签时，我们把CSS规则保存起来
   - 这里我们调用CSS Parser来分析CSS规则
   - **这里我们必须要仔细研究ast分析CSS规则的格式**
2. 添加调用
   - 当我们创建一个元素后，立即计算CSS
   - 理论上，当我们分析一个元素时，所有CSS规则已经收集完毕
   - 在真实浏览器中，可能遇到写在body的style标签，需要重新CSS计算的情况，*这里我们忽略*
3. 获取父元素序列
   - 在computeCSS函数中，我们必须知道元素的所有父元素才能判断元素与规则是否匹配
   - 我们从上一步骤的stack，可以获取本元素所有的父元素
   - 因为我们首先获取的是“当前元素”，所以我们获得和计算父元素匹配的顺序是**从内向外**
4. 选择器与元素的匹配
   - 选择器也要从当前元素向外排列
   - 复杂选择起拆成针对单个元素的选择器，用循环匹配父元素队列
5. 计算选择器与元素匹配
   - 根据选择器的类型和元素的属性，计算是否与当前元素匹配
   - 这里仅仅实现来三种基本的选择器，实际的浏览器中要处理复合选择器
> 思考：实现复合选择器，实现支持空格的Class选择器
6. 生成computed属性
   - 一旦选择匹配，就应用选择器到元素上，形成computedStyle
7. specificity的计算逻辑
   > 四元组[0,0,0,0] ——> [inline, id, class, tagName]
   - CSS规则根据specificity和后来优先规则覆盖
   - specificity是个四元组，越左边权重越高
   - 一个CSS规则的specificity根据包含的简单选择器相加而成
   
## 排版
1. 根据浏览器属性进行排版
   - flex-direction:row, Main: width x left right, Cross: height y top bottom
   - flex-direction:column, Main: height y top bottom, Cross: width x left right
2. 收集元素进行
   - 分行：根据主轴尺寸，把元素分进行；若设置了no-wrap，则强行分配进第一行
3. 计算主轴
   - 计算主轴方向：找出所有flex元素；把主轴方向剩余尺寸按比例分配给这些元素；若剩余空间为负数，所有flex元素为0，等比压缩剩余元素
4. 计算交叉轴
   - 计算交叉轴方向：根据每一行中最大元素尺寸计算行高；根据行高flex-align和item-align，确定元素具体位置
5. 绘制单个元素
   > 环境准备：安装images包，npm install images
   - 绘制需要依赖一个图形环境
   - 绘制在viewport上进行
   - 与绘制相关的属性：background-color、border、background-image等
6. 绘制DOM树
   - 递归调用子元素的绘制方法完成DOM树的绘制
   - 忽略一些不需要绘制的节点
   - 实际浏览器中，文字绘制是难点，需要依赖字体库，这里忽略
   

