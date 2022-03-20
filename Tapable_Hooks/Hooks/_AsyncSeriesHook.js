//异步函数钩子并行的实现
class _AsyncSeriesHook {
    constructor() {
        this.tasks = [];
    }
    /** tap接收两个参数 name和fn */
    tap(name, fn) {
        /** 订阅:将fn放入到this.tasks中 */
        this.tasks.push(fn);
    }
    calls(...args) {
        let index = 0;
        /** 通过pop()获取到最后一个参数 
         * finalCallBack() 最终的回调
         */
        /** 递归执行next()方法 直到执行所有task
         * 最后执行最终的回调finalCallBack()
         */
        let finalCallBack = args.pop();
        let done = () =>{
            /** 执行done() 每次index+1 */
            /** 执行最终的回调 */
            if(index == this.tasks.length) {
                return finalCallBack();
            }
            /** index++ 执行每一个task 并传入递归函数next
             * 执行完每个task后继续递归执行下一个task
             * next === cb，next就是每一步的cb回调
            */
            this.tasks[index](...args, done);//串行执行该任务
            index++;
        }
        done();
    }
}

let hook = new _AsyncSeriesHook(['name']);

hook.tap('vue', (name, cb)=>{
    setTimeout(()=>{
        console.log('vue', name); 
        cb();
    },1000);
});
hook.tap('react',(name, cb)=>{
    setTimeout(()=>{
        console.log('react', name); 
        cb();
    },2000);
});
/**
 * 发布事件call传的回调函数,直接丢给tap订阅里面的cb，当作回调去执行
 */
 hook.calls('call end.', ()=>{
    console.log('最终的回调函数');
    setTimeout(()=>{
        console.log('模拟异步的函数');
    },1000)
});