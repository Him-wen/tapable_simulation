# tapable_simulation
Simple simulation of tapable hook function workflow
手写Tapable钩子

SyncHook,✅同步  
SyncBailHook,✅同步  
SyncWaterfallHook,✅同步  
SyncLoopHook,  
AsyncParallelHook,异步✅  
AsyncParallelBailHook,  
AsyncSeriesHook,异步✅  
AsyncSeriesBailHook,  
AsyncSeriesWaterfallHook  

注释：AsyncParallelHook.js 与 _AsyncParallelHook.js


## Hook

### SyncHook,
同步串行任务执行，任务间彼此没有联系。当前任务执行完，再执行下一个任务。
```js
//SyncHook必须接受一个数组作为参数。
const hooks = new SyncHook(['name']);

//使用tap方法订阅消息
hooks.tap('tap',(name)=> {
    console.log(name); //tapable
})

//使用call方法广播消息，这里的参数传递的个数取决于构造函数参数数组的长度。
hooks.call("tapable");
```
### SyncBailHook,
同步串行任务执行，一些列任务中，如果让前任务的返回值可转换为false(undefine 不算) ，则终止任务进行。
### SyncLoopHook,
同步串行循环任务执行，一系列任务中，当任务的监听函数的返回值不为undefined，则循环执行，如果为返回值为undefined则终止循环。
### SyncWaterfallHook,
同步串行任务执行，一系列任务中，当前任务监听函数的返回值，作为下一个任务监听函数的参数。
### AsyncParallelBailHook,
异步并行任务执行，一系列任务监听函数并行执行，只有当任务的callback函数返回值为true的时候,触发callAsync，并且不会终止后续任务的进行。
### AsyncParallelHook,
异步并行任务执行。任务间没有联系，所有任务执行完之后，执行callAsync的回调函数。
### AsyncSeriesBailHook,
异步串行任务执行，一系列任务监听函数中，当哪个监听函数callback抛出错误，则终止任务执行.
### AsyncSeriesHook,
异步串行任务执行，一系列监听函数间没有联系，只有执行完当前任务才会执行下一个任务。
### AsyncSeriesWaterfallHook
异步串行任务执行，一系列监听函数中，当前监听函数的返回值可作为下一个监听函数的参数，如果执行过程中哪个监听函数的callback返回了err，则任务终止并且执行callAsync绑定的callback。
