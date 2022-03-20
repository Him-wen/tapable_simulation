const {AsyncParallelHook} = require('tapable');
// AsyncParallelHook是异步并行的钩子
class Hook {
    constructor() {
        this.hooks = new AsyncParallelHook(['name']);
    }
    tap() {
        /** 这里是Promsie写法 
         * 注册事件的方法为tapPromise 
        */
        this.hooks.tapPromise('vue', (name)=>{
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    console.log('vue', name);
                    resolve();
                },1000);
            })
        }),
        this.hooks.tapPromise('react', (name)=>{
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    console.log('react', name);
                    resolve();
                },1000);
            })
        })
    }
    /** 
     * promsie最终返回一个prosise 成功resolve时
     * .then即为最终回调
    */
    calls() {
        this.hooks.promise('call end.').then(()=>{
            console.log('最终的回调函数');
        })
    }
}

let hook = new Hook();
// 等待1s后，分别执行了node call end和react callend 最后执行了最终的回调fn.
hook.tap();/** 类似订阅 */
hook.calls();/** 类似发布 */