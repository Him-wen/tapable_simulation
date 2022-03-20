const {SyncHook} = require('tapable');

class Hook {
     /** 1 生成SyncHook实例 */
    constructor() {
        this.hooks = new SyncHook(['name']);
    }
     /** 2 注册监听函数 */
    tap() {
        this.hooks.tap('vue', (name)=>{
            let ans = name + 'start传过来的参数';
            console.log('vue' + ans);
        });
        this.hooks.tap('react', (name)=>{
            let ans = name + 'start传过来的参数';
            console.log('react' + ans);
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
hook.start('可以接受的start参数');

/*
log
vuecall
reactcall
*/