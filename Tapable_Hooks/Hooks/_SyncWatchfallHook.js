/*
定义一个SyncWatchfallHook类
SyncWaterfallHook是同步的瀑布钩子，瀑布怎么理解呢? 其实就是说它的每一步都依赖上一步的执行结果，也就是上一步return的值就是下一步的参数。
*/
class _SyncWatchfallHook {
    constructor() { //args  -> ["name"]
        this.tasks = [];
    }
    /** 订阅事件tap接收两个参数 name和fn */
    tap(name, fn) {
        /** 订阅:将fn放入到this.tasks中 */
        this.tasks.push(fn);
    }
    /** 发布事件接受参数 */
    calls(...args) {
        /** 解构 拿到tasks中的第一个task -> first */
        let [first, ...others] = this.tasks;
        /** 利用reduce() 累计执行 
         * 首先传入第一个 first 并执行
         * pre是上一个task cur是当前task
         * 这样满足了 下一个函数依赖上一个函数的执行结果
        */
       others.reduce((pre, cur)=>{
           return cur(pre);
       }, first(...args));
    }
}

let hook = new _SyncWatchfallHook(['name']);

hook.tap('vue', (name)=>{
    console.log('vue:' + name);
    return '这是第一步返回的值';
});
hook.tap('react', (data)=>{
    console.log('react:' + data);
});
/**
 * 发布事件call传的参数,直接丢给tap订阅里面的函数，当作参数去执行
 */
hook.calls('calls');

