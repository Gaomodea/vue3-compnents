
# 严格模式下的限制

> 以下的所有案例中都是在严格模式下执行

::: danger 不能给未声明的变量赋值
```js{2}
function test() {
  message = "abc" // 抛出 ReferenceError
}
```
:::

``` 
严格模式下不能定义名为eval、arguments的变量
```

```js{3}
// let msg; // 没有声明变量

delete msg; // 严格模式下报错
```
> [!WARNING]
> 严格模式不能使用8进制字面量：`let a = 075; // 8进制字面量`
