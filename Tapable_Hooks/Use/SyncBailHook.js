const {SyncBailHook} = require('tapable');

class Hook {
     /** 1 生成SyncHook实例 */
    constructor() {
        this.hooks = new SyncBailHook(['name']);
    }
     /** 2 注册监听函数 */
    tap() {
        this.hooks.tap('vue', (name)=>{
            console.log('vue' + name);
            /** 此处return了一个非undefined
             *  代码到这里就不会继续执行余下的钩子,返回undefined或者不返回就执行后面的语句
             */
            return 1;
        });
        this.hooks.tap('react', (name)=>{
            console.log('react' + name);
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