/**
 * 封装一个Hook
 */
const { AsyncParallelHook } = require("tapable");

class Model {
    constructor() {
        this.hooks = {
            asyncHook: new AsyncParallelHook(['name']),//这里是new的实例
            promiseHook: new AsyncParallelHook(['age'])
        };
    }

    //消费者方法触发（钩子）
    callAsyncHook(name, callback) {
        this.hooks.asyncHook.callAsync(name, err => {
            if (err) return callback(err);
            callback(null);
        });
    }
    callPromiseHook(age) {//钩子
        // 本身就是返回promise
        return this.hooks.promiseHook.promise(age).then(res => console.log(res));
    }
}

const model = new Model();

//注册事件（需要钩子干的事）用户可以在这里注册，Vue参考生命周期钩子
// Async 方式监听事件，拿到异步并行的钩子asyncHook，注册AsyncPluginName事件，传入回调函数
// model.hooks.asyncHook 钩子
model.hooks.asyncHook.tapAsync('AsyncPluginName', (name, callback) => {
    const pluginName = 'AsyncPluginName'; 
    setTimeout( () => {
        console.log(pluginName, name);
    }, 2000);
});

//触发方法，消费注册的这些事件（系统）
// 这里是将参数传给model.hooks.asyncHook定义的tapAsync的回调函数
model.callAsyncHook('jk');
// 2秒后输出：AsyncPluginName jk

// Promise 方式监听事件
model.hooks.promiseHook.tapPromise('PromisePluginName', (age) => {
    const pluginName = 'PromisePluginName';
    return new Promise((resolve, reject) => {        
        setTimeout(() => {
            console.log(pluginName, age);
            resolve(pluginName);
        }, 4000);
    });
});
model.callPromiseHook(26);
// 4秒后输出：PromisePluginName 26
