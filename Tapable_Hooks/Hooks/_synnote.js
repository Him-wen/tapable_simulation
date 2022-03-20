/**
do...while
reduce
 */
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
 } = require("tapable");

 /**
  * 这些钩子可分为同步的钩子和异步的钩子，Sync开头的都是同步的钩子，Async开头的都是异步的钩子。
  * 而异步的钩子又可分为并行和串行，其实同步的钩子也可以理解为串行的钩子。
  */