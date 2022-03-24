const {AsyncParallelHook} = require('tapable');
// AsyncParallelHook是异步并行的钩子
class Hook {
    constructor() {
        this.hooks = new AsyncParallelHook(['name']);
    }
    tap() {
        this.hooks.tapAsync('vue', (name, cb)=>{// 第一个参数没啥意义，给开发者方便阅读
            setTimeout(()=>{
                console.log('vue', name); 
                cb(null, '1');
            },1000)
        }),
        this.hooks.tapAsync('react', (name, cb)=>{
            setTimeout(()=>{
                console.log('react', name); 
                cb(null, '1');
            },1000)
        })
    }
    /** 异步的触发方法是callAsync() 
     * 多了一个最终的回调函数 fn.
     * 发布事件的函数，里面的第二个参数回调函数 传给tapAsync函数的cb参数
    */
    calls() {
        this.hooks.callAsync('call end.', ()=>{
            console.log('最终的回调函数');
        })
    }
}
/**
 * 1.绑定钩子
 * this.hooks = new AsyncParallelHook(['name']);
 * 
 * 2.注册一些事件，在tap方法里面注册，在this.hooks钩子上挂上一些函数（相当于生产模式）
 * this.hooks上面绑定了new AsyncParallelHook的实例，实例上面有一个注册方法tap（参考_AsyncParallelHook.js实现的_AsyncParallelHook类）
 * tap参数:名字（没有啥实际意义）， 回调
 * tap() {
        this.hooks.tapAsync('vue', (name, cb)=>{
            setTimeout(()=>{
                console.log('vue', name); 
                cb(null, '1');
            },1000)
        }),
 * 执行注册事件的方法：hook.tap()，也就是绑定事件

 * 3.hook.calls();启动钩子（启动触发calls函数）让tap上注册的函数依次执行（回调为calls传递的参数）
 * hook.tap(),hook.calls()都是包装了一层，实际上执行的是Tapable类的tapAsync()和callAsync()方法，callAsync里面的参数就是给tapAsync的
 * 
 */

let hook = new Hook();
// 等待1s后，分别执行了node call end和react callend 最后执行了最终的回调fn.
hook.tap();/** 类似订阅 */
hook.calls();/** 类似发布 */