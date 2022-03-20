/*
定义一个SyncHook类
*/
class _SyncBail Hook {
    constructor() { //args  -> ["name"]
        this.tasks = [];
    }
    /** tap接收两个参数 name和fn */
    tap(name, fn) {
        /** 订阅:将fn放入到this.tasks中 */
        this.tasks.push(fn);
    }
    /** 接受参数 */
    calls(...args) {
        /** 发布:将this.taks中的fn依次执行，接收参数 */
        this.tasks.forEach((item)=>{
            item(...args);
        });
    }
}

let hook = new _SyncHook(['name']);

hook.tap('vue', (name)=>{
    console.log('vue:' + name);
});
hook.tap('react', (name)=>{
    console.log('react:' + name);
});
/**
 * 发布事件call传的参数,直接丢给tap订阅里面的函数，当作参数去执行
 */
hook.calls('calls');

