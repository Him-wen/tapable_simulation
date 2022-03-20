const {SyncWaterfallHook} = require('tapable');

class Hook {
     /** 1 生成SyncHook实例 */
    constructor() {
        this.hooks = new SyncWaterfallHook(['name']);
    }
     /** 2 注册监听函数 */
    tap() {
        this.hooks.tap('vue', (name)=>{
            console.log('vue' + name);
             /** 此处返回的值作为第二步的结果 */
            return '第一个tap传过来的eact';
        });
        this.hooks.tap('react', (data)=>{
            console.log('react' + data);
        })
    }
    /** 3出发监听函数 */
    start() {
        this.hooks.call('call');
    }
}

let hook = new Hook();

/** 类似订阅 */ 
hook.tap();
/** 类似发布 */
hook.start();

/*
log
vuecall
reactcall
*/