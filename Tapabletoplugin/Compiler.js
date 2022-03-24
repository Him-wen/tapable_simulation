const {
    SyncHook,
    AsyncParallelHook
} = require('tapable');

/**
把Class Car类名改成webpack的核心Compiler
接受options里传入的plugins
将Compiler作为参数传给plugin（Myplugin.js文件）
执行run函数，在编译的每个阶段，都触发执行相对应的钩子函数。
 */
//webpack核心
class Compiler {
    constructor(options) {
        this.hooks = {
            accelerate: new SyncHook(["newSpeed"]),
            break: new SyncHook(),
            calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
        };
        /**
         * this 为Compiler的实例，将实例传给了每一个自定义的插件plugin
         */

        let plugins = options.plugins;
        if (plugins && plugins.length > 0) {
            plugins.forEach(plugin => plugin.apply(this));//调用 插件Myplugin.js文件 定义的相关的插件apply方法
        }
    }
    //主要的执行函数 --对应tapable模拟里面的calls或者call函数，里面包裹了每个钩子上的call原始方法
    run(){
        //webpack内部 消费相关的事件（系统）
        console.time('cost');
        this.accelerate('hello')
        this.break()
        this.calculateRoutes('i', 'like', 'tapable')
    }
    accelerate(param){
        this.hooks.accelerate.call(param);
    }
    break(){
        this.hooks.break.call();
    }
    calculateRoutes(){
        const args = Array.from(arguments)
        this.hooks.calculateRoutes.callAsync(...args, err => {
            console.timeEnd('cost');
            if (err) console.log(err)
        });
    }
}

module.exports = Compiler
