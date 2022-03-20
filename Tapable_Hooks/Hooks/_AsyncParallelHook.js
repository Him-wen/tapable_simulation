//异步函数钩子的实现
class _AsyncParallelHook {
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
        let finalCallBack = args.pop();
        /** 箭头函数绑定this */
        let done = () =>{
            /** 执行done() 每次index+1 */
            index++;
            /** 执行最终的回调 */
            if(index == this.tasks.length) {
                finalCallBack();
            }
        }
        this.tasks.forEach((task)=>{
            /** 执行每个task，传入我们给定的done回调函数 */
            task(...args, done);
        })
    }
}

let hook = new _AsyncParallelHook(['name']);

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