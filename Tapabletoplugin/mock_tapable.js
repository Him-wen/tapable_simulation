//引入tapable
const {
    SyncHook,
    AsyncParallelHook
} = require('tapable');

//创建类
class Car {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(["newSpeed"]),
            break: new SyncHook(),
            calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
        };
    }
}
/*
Tapable -- Webpack
类Car -- Compiler  实例car -- compiler
*/
/**
 * 绑定钩子，启动钩子
 */

const myCar = new Car();

// 用户生产者操作
//绑定同步钩子
myCar.hooks.break.tap("WarningLampPlugin", () => console.log('WarningLampPlugin'));

//绑定同步钩子 并传参
myCar.hooks.accelerate.tap("LoggerPlugin", newSpeed => console.log(`Accelerating to ${newSpeed}`));

//绑定一个异步Promise钩子
myCar.hooks.calculateRoutes.tapPromise("calculateRoutes tapPromise", (source, target, routesList, callback) => {
    // return a promise
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(`tapPromise to ${source}${target}${routesList}`)
            resolve();
        },1000)
    })
});

//消费事件（系统）执行同步钩子
myCar.hooks.break.call();
myCar.hooks.accelerate.call('hello');

console.time('cost');

//执行异步钩子
myCar.hooks.calculateRoutes.promise('i', 'love', 'tapable').then(() => {
    console.timeEnd('cost');
}, err => {
    console.error(err);
    console.timeEnd('cost');
})
