const {AsyncSeriesHook} = require('tapable');
// AsyncParallelHook是异步串行的钩子
class Hook {
    constructor() {
        this.hooks = new AsyncSeriesHook(['name']);
    }
    tap() {
        this.hooks.tapAsync('vue', (name, cb)=>{
            setTimeout(()=>{
                console.log('vue', name); 
                cb();
            },1000)
        }),
        this.hooks.tapAsync('react', (name, cb)=>{
            setTimeout(()=>{
                console.log('react', name); 
                cb();
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

let hook = new Hook();
hook.tap();/** 类似订阅 */
hook.calls();/** 类似发布 */
/* 打印顺序：
    node call end.
    react call end. -> 1s后打印
    最终的回调 -> 1s后打印
*/