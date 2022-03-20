const {SyncHook} = require('tapable');

// 初始化时传入参数名称
const myHook = new SyncHook(['name', 'age']);

// 添加事件
myHook.tap('pluginanme1', (name, age)=>{
    console.log('pluginname1打印的内容：' + name + age);
})

// 触发
myHook.tap('pluginanme2', (name, age)=>{
    console.log('pluginname2打印的内容：' + name + age);
})

// 输出测试
myHook.call('a','01');
// 输出pluginname1打印的内容：a01, pluginname1打印的内容：a01

/* addEventListener 添加事件的相似
 同步钩子：声明 xxxHook 时，传入预置的参数名称，然后用 tap(还有其他几种)监听事件，用 call(还有其他几种)传入参数触发事件

 异步钩子：
tapAsync监听，callAsync 触发
tapPromise监听，promise 触发
 */

