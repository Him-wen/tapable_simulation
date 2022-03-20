/*
定义一个SyncBailHook类
SyncBailHook 从字面意思上理解为带有保险的同步的钩子，带有保险意思是 根据每一步返回的值来决定要不要继续往下走，
如果return了一个非undefined的值 那就不会往下走，注意 如果什么都不return 也相当于return了一个undefined。
*/
class _SyncBailHook {
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
        let index = 0;
        let result;
         /** 利用do while先执行一次的特性 */
        do{
            /** 拿到每一次函数的返回值 result */
            result = this.tasks[index](...args);
            index++
            /** 如果返回值不为undefined或者执行完毕所有task -> 中断循环 */
        }while(result === undefined && index < this.tasks.length);
    }
}

let hook = new _SyncBailHook(['name']);

hook.tap('vue', (name)=>{
    console.log('vue:' + name);
    return 1;
    // 不返回值就一直执行
});
hook.tap('react', (name)=>{
    console.log('react:' + name);
});
/**
 * 发布事件call传的参数,直接丢给tap订阅里面的函数，当作参数去执行
 */
hook.calls('calls');

