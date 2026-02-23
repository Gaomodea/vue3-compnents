---
outline: deep
---

# JS 语言

## 语法

::: warning 
区分大小写
:::

### 标识符

1. 第一个字符必须是以下划线、字母或美元符号开始
2. 剩下的其他字符可以是：下划线、字母、美元符号、数字

::: warning
标识符不能以数字开头 
:::

### 严格模式

[详细规则](./strict-mode)

::: code-group

```js{1} [file.js]
// 在js文件开头标明整个文件以严格模式执行
"use strict";

// do something

```
```js{2} [function.js]
function some() {
  // 在函数体标明函数以严格模式执行
  "use strict";
}
```
:::

### 变量

::: info
const、let只能在ES6及更晚的版本中使用，var可以在所有版本中使用
:::

#### var关键字
::: warning var声明提升
var声明变量，会将变量的声明提升到函数作用域顶部
:::

::: code-group
```js{3} [code]
function some() {
  console.log(message)
  var message = 'abc';
}
```
```js{2} [实际运行流程]
function some() {
  var message;
  console.log(message)
  message = 'abc'
}
```
:::

#### let关键字

::: warning let
let是块作用域，var是函数作用域

let重复声明变量会报语法错误，和var混用同样会报错

let和var不是声明不同类型的变量，而是说明该变量在相关作用域中如何存在

```js{2,5,8}
let msg = 1;
let msg = 2; // SyntaxError

let msg2 = 1;
var msg2 = 2; // SyntaxError

var msg3 = 1;
let msg3 = 2; // SyntaxError
```
:::

##### let 特点

1. 暂时性死区，let声明的变量不会声明提升
2. 全局声明的let变量不会成为window对象的属性（var声明的会），该变量仍然处于全局作用域，可以全局访问。
window作用域大于let顶层作用域（script作用域）
3. 不支持条件声明

::: tip for循环中的let
for循环会在每一个代码块中创建独立的let变量
:::

#### const

::: warning const关键字
1. const规则和let基本一致
2. 但是const在声明变量时必须给变量初始化值，并且后续不能修改该变量的值
3. 如果const变量指向的是引用类型时，修改对象的属性值不违反const规则
:::

```js{1,5,9}
for (const i = 0; i < 10; i++) { // 报错，i会被修改，不能使用const
  console.log(i)
}

for (const key in {a: 1, b: 2}) { // 有效
  console.log(key)
}

for (const value of [1, 2]) { // 有效
  console.log(value)
}
```

### 数据类型

::: warning 7种原始数据类型
```js
undefined、null、Boolean、Number、String、Symbol(ES6)、BigInt

```
:::

::: warning 复杂数据类型
```js
Object

```
:::

#### typeof操作符

::: warning typeof
```js
typeof undefined === 'undefined'
typeof '' === 'string'
typeof 0 === 'number'
typeof true === 'boolean'
typeof null === 'object'
typeof {} === 'object'
typeof Math.min === 'function'
typeof Symbol() === 'symbol'
typeof BigInt === 'bigint'

```
:::

#### Undefined

> [!WARNING] Undefined
> 未初始化的变量

#### Null

> [!WARNING] Null
> - 空指针对象,无对象的空引用，所以和undefined有本质区别
> - 在底层内存中通常表示的是全零的机器码，所以会出现`Number(null) === 0`
> - `typeof null === 'object'`
> - undefined派生与null，所以`undefined == null`

#### Boolean

> [!WARNING] Boolean
> - 转型函数，将其他类型值转换为boolean类型：`Boolean()`
> - if判断会自动执行其他类型到boolean类型的转换
> - Boolean转型不会调用valueOf和toString,它内部通过硬编码执行转型隐射

#### Number

> [!INFO]
> - js中通过双精度表示整数和浮点值
> - 八进制：`076`
> - 十六进制：`0xAa`, `0x`区分大小写
> - `无论八进制还是十六进制，在进行数学操作时都被当作十进制数值`
> - 科学计数法：`3.1415926e10`,`3.1415926e-10`
> - js会尽可能的将小数转换为整数，比如：`1.0 -> 1`，`1. -> 1`
> - 最大最小值：`Number.MIN_VALUE, Number.MAX_VALUE`,无法表示的值：`Infinity, -Infinity`
> - 判断值是否有效：`isFinite()`
> - 所有数值都可以通过`_`来增进可读性
> - `Number.MAX_SAFE_INTEGER`,JS能精确表示的最大值，超过这个值就可能不精确

```js
let a = 0_01 // 报错
let a = _01 // 报错
let a = 0._1 // 报错
let a = 10_ // 报错

Number.MAX_SAFE_INTEGER + 100 === Number.MAX_SAFE_INTEGER + 101 // true
```

##### NaN

> [!INFO]
> - 用来表示要返回数值的操作失败了
> - `typeof NaN === 'number'` 
> - NaN不等于任何值，`NaN == NaN // false`
> - `isNaN()`, 判断参数是否`不是数值`，它会将传递的任意数据转换为数值，任何不能转换为数值的参数都会返回true

##### 数值转换

::: info 转型函数 Number()
```js{3}
Number(true) // 1
Number(1) // 1
Number(null) // 0
Number(undefined) // NaN
Number('') // 0
Number('-1') // -1
Number('1.0') // 1
Number('-') // NaN
Number('1a') // NaN
Number('076') // 76
Number('0076') // 76
Number('01.1') // 1.1
Number('0xf') // 15
Number([]) // valueOf() -> 如果为NaN -> toString() -> NaN
```

一元加操作符和Number()执行相同的转换规则
:::

::: info parsetInt()

parseInt能识别是否是十六进制字符串

```js
parseInt('-1') // -1
parseInt('-1.1') // -1
parseInt('--') // NaN
parseInt('') // NaN
parseInt('  1') // 1
parseInt('12abc') // 12
parseInt('0xf') // 15
parseInt('F', 16) // 15
parseInt('F') // NaN
parseInt(null) // NaN
parseInt(undefined) // NaN
```
:::

::: info parseFloat()

parseFloat只能解析十进制

```js
parseFloat('1.2ab') // 1.2
parseFloat('1.2.2') // 1.2
parseFloat('') // NaN
parseFloat('0xf') // 0
parseFloat('001.2') // 1.2
parseFloat('abc') // NaN
parseFloat('1.0') // 1
parseFloat(null) // NaN
parseFloat(undefined) // NaN
```
:::

> - parseInt和parseFloat用于将字符串转换为数值
> - 对于非字符串参数，parseInt和parseFloat都会先调用toString()

#### BigInt

> [!danger] 有符号大整数
> - 大整数，一般在数值超过`Number.MAX_SAFE_INTEGER`使用
> - `120n`、`BigInt(120)`
> - BingInt支持数值字面量、二进制、八进制、十进制、十六进制
> - BigInt和Number可以相互比较、转换，但会丢失精度，在操作符中不能同时存在BigInt和Number
> - BigInt几乎支持所有的Number操作，除了`>>>`、`一元 + 操作符`

```js
10 === BigInt(10n) // true
BigInt(10) / 3n // 3n
+3n // 报错，不支持
-3n // 2n

// 将大整数截取，保留指定位数，BigInt在内存中是以补数存储的，所以有符号和无符号有区别
BigInt.asIntN(4, 0b10001000n) // 1000n -> -8n
BigInt.asUintN(4, 0b10001000n) // 01000n -> 8n
```

::: danger
BigInt不支持JSON序列化，但可以通过replacer和reciver参数实现序列化
```js
const data = {
  bigNumber: 12n
}
JSON.stringify(data) // 报错

const replacer = (k, v) => typeof v === 'bigint' ? v.toString() : v
JSON.stringify(data, replacer) // "{bigNumber: '12n'}"

const reciver = (k, v) => k === 'bigNumber' ? BigInt(v) : v
JSON.parse("{bigNumber: '12n'}", reciver)
```
:::

> 因为BigInt和Number精度不同，所以它们不能自动的进行类型转换，所以它们不能同时应用操作符
> 在比较运算时，不进行类型转换，直接比较实际的数学大小



#### 字符串

> [!danger]
> JS中使用16位unicode编码表示一个字符

```js{8,9}
console.log('a')
console.log("a")
console.log(`a`)
console.log('\x41') // A
console.log('\'\"\`') // '"`
console.log('\\') // \
console.log('\n') // 换行
console.log('\r') // 回车
console.log('\t') // 制表符
console.log('\b') // 退格
console.log('\u0030') // 0
console.log('\x4') // 报错
console.log('\u003') // 报错
```

> [!WARNING]
> - str.length 获取字符长度，如果字符串包含双字节字符，则length返回的可能不是准确的字符数
> - 字符串是不可变的

##### 转换为字符串
::: warning toString
```js
(true).toString() // 'true'
(0).toString() // '0'
(10).toString() // '10'
('10').toString() // '10'
(10.0).toString() // 10
(10).toString(16) // 'a'
({}).toString() // '[object Object]'
([]).toString() // ''  [].join()
(Symbol('foo')).toString() // 'Symbol(foo)'
(null).toString() // 报错
(undefined).toString() // 报错
```
数值调用toString方法可以传递额外的参数，表示数值的底数
:::

::: warning 转型函数 String()
```js{7}
String({}) // 如果有toString方法，则调用toString
String(null) // 'null'
String(undefined) // 'undefined'

const a = {}
a.toString = null
String(a) // 报错
```
:::

##### 标签函数

::: danger 通过标签函数自定义模板字符串的行为
```js
function customTemplate(strings, ...expressions) {
  // strings ["\n", "11,", "22"]
  // expressions [1, 2]
  // 自定义模板拼接
  return 'abc'
}

console.log(customTemplate`\n${1}11,${2}22`) // 'abc'
```

获取原始字符串内容
```js{5}
console.log('\n') // 打印换行
console.log(String.raw`\n`) // '\n'

// 获取标签函数中strings的原始字符串内容
strings.raw // ['\\n', '11,', '22']
```
:::

#### Symbol 符号

> [!warning] Symbol
> - 符号用来创建唯一个标识符，确保不会和其他属性有冲突
> - 通过 `Symbol()` 和 `Symbol.for(key)` 创建符号
> - 不能调用`new Symbol()`
> - 通过Symbol.for()在全局注册表中创建符号，来达到共享的目的，任何传递给Symbol.for的参数都会调用toString转换为String

```js
let a = Symbol()
let b = Symbol('foo')
let c = Symbol('foo')
a == c // false

let e = Symbol.for('foo')
let d = Symbol.for('foo')
e === d // true
c == d // false

let u = Symbol.for() // Symbol(undefined)
let n = Symbol.for(null) // Symbol(null)

// 在全局注册表中通过Symbol获取key
let k = Symbol.keyFor(e) // 'foo'
let u = Symbol.keyFor(b) // undefined 必须是全局注册表中的Symbol
let error = Symbol.keyFor(1) // 报错 任意非Symbol参数都会报错，包括undefined

// 将Symbol包装为对象
Object(e)
```

```js Symbol作为属性
let a = Symbol('foo')
let b = {
  [a]: 1,
  b: 2
}

Object.getOwnPropertyNames(b) // ['b']
Object.getOwnPropertySymbols(b) // [Symbol(foo)]
Object.getOwnPropertyDescriptors(b) // [{b}, {Symbol(foo)}] 获取所有属性的描述符
Reflect.ownKeys(b) // ['b', 'Symbol(foo)'] 获取所有key
```

##### 内置Symbol

> [!danger]
> 详细见《JavaScript高级程序设计第五版》

#### Object 对象

::: warning Object
- 对象其实就是一组数据和行为的集合
- 通过`new Object()`或`new Object`创建对象
- Object是所有对象的（基类），所以Object对象上的属性和方法，其他派生对象都有
- Object.create(null)对象没有原型，不是Object的实例

```js
// js中的装箱

let a = new Object(1) // Number
let a = new Object(null) // {}
let a = new Object(undefined) // {}
let b = new Object(a) // a

Object.create(null) instanceof Object // false

```

```js
let a = {}
Object // 构造函数
Object.prototype // 原型
a.constructor // 构造函数
a.hasOwnProperty(name) 
a.isPrototypeOf(obj) // 判断当前对象是否是另一个对象的原型
a.propertyIsEnumerable(name) // 判断属性名是否可以枚举，以便在for-in中使用
a.toLocalString()
a.toString()

// 返回对象的字符串、数值、布尔值表示。通常与toString的返回值相同
// 自定义对象如果没重写valueOf，通过返回的就是对象本身
// typeof a.valueOf() === 'object'
a.valueOf() 
```
:::

### 操作符

> JS中的操作符是独特的，可以应用于任意数据类型，在遇到对象时，会调用valueOf和toString进行类型转换

#### 一元操作符

::: warning 递增递减操作符
- 递增递减操作符(++a, --a, a++, a--)可以应用于`任意数据类型，包括对象`
- 如果是字符串，先转换为数字或者NaN
- 如果是Boolean，转换为0、1
- 如果是对象，则依次调用`valueOf()、toString()` 并且将结果应用于上述规则，如果toString返回对象则报错
- NaN也是有效的数字类型
- 对拿到的原始值调用Number()得到数值类型
:::

::: warning 一元加、一元减
```js{7}
// 通常用于类型转换和取反
let a = 10
a = +a
a = -1

let b = {}
b = +b // 应用和Number()一样的转型规则
b = -b // 先转型，再应用负值
```
:::

#### 按位操作

> 先用Number()转为数值，在将64为转为有符号32位，再执行操作，再转为64位
> NaN、0、-0、Infinity、-Infinity当作0处理

::: danger 按位非 ~，求数值的一补码（反码）
- 公式：`~a = -(a + 1)`
- ~-Infinity = -1

**按位与 &**

**按位异或 ^**

- 两位相同返回 0, 相异返回 1
:::

#### 乘性操作符 * / %

> 对于操作符两边不是数值类型的值，会应用Number()进行转型

```js
Infinity * 0 // NaN
11 * NaN // NaN
Infinity * 11 // Infinity
Infinity * -11 // -Infinity
Infinity * Infinity // Infinity
Infinity * -Infinity // -Infinity

11 / NaN // NaN
Infinity / Infinity // NaN
Infinity / -Infinity // NaN
0 / 0 // NaN
11 / 0 // Infinity
-11 / 0 // -Infinity
Infinity / 0 // Infinity
Infinity / -0 // -Infinity
Infinity / any // Infinity
Infinity / -any // -Infinity
```

#### 操作符原理和相等操作符
::: danger 操作符
- 操作符的原理：`先转为基本数据类型（valueOf,toString），再根据优先级统一为字符串或者数字，再进行操作`
- 比较操作符数字优先
- 加法操作符字符串优先
- 乘性操作符数字优先
- NaN和任何数比较都会返回false
:::

::: danger 相等操作符
- `==`时，会进行类型转换，数字优先级大于字符串，boolean会先转为数字
- 对象会先转换为基本数据类型（valueOf,toString），再按数字或字符串进行比较
- null == undefined
- null和undefined不能转为其他类型和其他类型进行比较
- NaN != any
- 如果两个操作数都是对象，则判断它们是不是同一个对象
- `===`时，不会进行类型转换，严格按照类型和值进行比较
- null和undefined不是同一类型，`typeof null === 'object'`
- 在比较两个对象时，`==`和`===`没有区别
:::

#### 条件操作符

::: warning a ? b : c
条件运算符和if判断都会触发Boolean类型转换
:::

#### 空值合并操作符 ??

```js
// 仅当第一个值为null或undefined时，返回第二个值
null ?? 1 // 1
undefined ?? 1 // 1
0 ?? 1 // 0
'' ?? 1 // ''
a ??= 1 // 1

// 和||的区别
0 || 1 // 1
```

#### 赋值操作符

> 分号`;`表示语句和语句结束，用来区分表达式

```js:line-numbers{2-3,5}
let a = 0; // 变量声明语句，返回undefined
a = 0 // 0 赋值表达式，返回所赋的值
a = 0; // undefined 后面带分号，是语句，返回的结果被丢弃

let a = (1, 2, 3, 0) // 0, 逗号操作符返回最后一个值
```

### 语句

#### 控制语句

```js

// if 语句  condition可以是任何表达式，对结果自动执行Boolean()转换
if (condition) {

} else {

}

// for-in 迭代对象中可枚举的非符号属性
// 如果obj为null、undefined，则不执行循环体
// for-in 本质会将基本数据类型装箱Object()为对象，所以数字、boolean、Symbol不会报错
for (const key in obj) {
}

for (const key in 'abc') {
  console.log(key) // 0, 1, 2
}

// for-of 遍历可迭代对象的元素，如果对象不支持迭代则报错
// 基于可迭代协议
for (const value of [1, 2]) {
  console.log(value) // 1, 2
}
```

#### 标签语句

> 语法：`label: statement`

```js{1,5,10,14}
start: 
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (i > 5) {
      break start; // 退出嵌套循环
    }
  }
}

out:
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (i > 5) {
      continue out; // 退出嵌套循环
    }
  }
}
```

#### with语句

> 严格模式不支持with语句，Vue编译后的render函数中使用的with语句，能够在模板中省略this

#### swith语句

> swith语句中使用全等进行比较，不会强制转换类型

### 函数

> 严格模式下，函数不能以eval，arguments作为名词；不能以eval，arguments作为参数名；禁止同名参数