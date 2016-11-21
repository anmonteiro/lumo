// Compiled by ClojureScript 1.9.293 {:static-fns true, :optimize-constants false, :target :nodejs}
goog.provide('clojure.core.reducers');
goog.require('cljs.core');
goog.require('cljs.core');
clojure.core.reducers.fjtask = (function clojure$core$reducers$fjtask(f){
return f;
});
clojure.core.reducers.fjinvoke = (function clojure$core$reducers$fjinvoke(f){
return (f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));
});
clojure.core.reducers.fjfork = (function clojure$core$reducers$fjfork(task){
return task;
});
clojure.core.reducers.fjjoin = (function clojure$core$reducers$fjjoin(task){
return (task.cljs$core$IFn$_invoke$arity$0 ? task.cljs$core$IFn$_invoke$arity$0() : task.call(null));
});
/**
 * Like core/reduce except:
 *   When init is not provided, (f) is used.
 *   Maps are reduced with reduce-kv
 */
clojure.core.reducers.reduce = (function clojure$core$reducers$reduce(var_args){
var args14269 = [];
var len__8739__auto___14273 = arguments.length;
var i__8740__auto___14274 = (0);
while(true){
if((i__8740__auto___14274 < len__8739__auto___14273)){
args14269.push((arguments[i__8740__auto___14274]));

var G__14276 = (i__8740__auto___14274 + (1));
i__8740__auto___14274 = G__14276;
continue;
} else {
}
break;
}

var G__14271 = args14269.length;
switch (G__14271) {
case 2:
return clojure.core.reducers.reduce.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return clojure.core.reducers.reduce.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14269.length)].join('')));

}
});

clojure.core.reducers.reduce.cljs$core$IFn$_invoke$arity$2 = (function (f,coll){
return clojure.core.reducers.reduce.cljs$core$IFn$_invoke$arity$3(f,(f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null)),coll);
});

clojure.core.reducers.reduce.cljs$core$IFn$_invoke$arity$3 = (function (f,init,coll){
if(cljs.core.map_QMARK_(coll)){
return cljs.core._kv_reduce(coll,f,init);
} else {
if((coll == null)){
return init;
} else {
if(cljs.core.array_QMARK_(coll)){
return cljs.core.array_reduce.cljs$core$IFn$_invoke$arity$3(coll,f,init);
} else {
return cljs.core._reduce.cljs$core$IFn$_invoke$arity$3(coll,f,init);

}
}
}
});

clojure.core.reducers.reduce.cljs$lang$maxFixedArity = 3;


/**
 * @interface
 */
clojure.core.reducers.CollFold = function(){};

clojure.core.reducers.coll_fold = (function clojure$core$reducers$coll_fold(coll,n,combinef,reducef){
if((!((coll == null))) && (!((coll.clojure$core$reducers$CollFold$coll_fold$arity$4 == null)))){
return coll.clojure$core$reducers$CollFold$coll_fold$arity$4(coll,n,combinef,reducef);
} else {
var x__8236__auto__ = (((coll == null))?null:coll);
var m__8237__auto__ = (clojure.core.reducers.coll_fold[goog.typeOf(x__8236__auto__)]);
if(!((m__8237__auto__ == null))){
return (m__8237__auto__.cljs$core$IFn$_invoke$arity$4 ? m__8237__auto__.cljs$core$IFn$_invoke$arity$4(coll,n,combinef,reducef) : m__8237__auto__.call(null,coll,n,combinef,reducef));
} else {
var m__8237__auto____$1 = (clojure.core.reducers.coll_fold["_"]);
if(!((m__8237__auto____$1 == null))){
return (m__8237__auto____$1.cljs$core$IFn$_invoke$arity$4 ? m__8237__auto____$1.cljs$core$IFn$_invoke$arity$4(coll,n,combinef,reducef) : m__8237__auto____$1.call(null,coll,n,combinef,reducef));
} else {
throw cljs.core.missing_protocol("CollFold.coll-fold",coll);
}
}
}
});

/**
 * Reduces a collection using a (potentially parallel) reduce-combine
 *   strategy. The collection is partitioned into groups of approximately
 *   n (default 512), each of which is reduced with reducef (with a seed
 *   value obtained by calling (combinef) with no arguments). The results
 *   of these reductions are then reduced with combinef (default
 *   reducef). combinef must be associative, and, when called with no
 *   arguments, (combinef) must produce its identity element. These
 *   operations may be performed in parallel, but the results will
 *   preserve order.
 * 
 *   Note: Performing operations in parallel is currently not implemented.
 */
clojure.core.reducers.fold = (function clojure$core$reducers$fold(var_args){
var args14288 = [];
var len__8739__auto___14296 = arguments.length;
var i__8740__auto___14297 = (0);
while(true){
if((i__8740__auto___14297 < len__8739__auto___14296)){
args14288.push((arguments[i__8740__auto___14297]));

var G__14298 = (i__8740__auto___14297 + (1));
i__8740__auto___14297 = G__14298;
continue;
} else {
}
break;
}

var G__14291 = args14288.length;
switch (G__14291) {
case 2:
return clojure.core.reducers.fold.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return clojure.core.reducers.fold.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return clojure.core.reducers.fold.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14288.length)].join('')));

}
});

clojure.core.reducers.fold.cljs$core$IFn$_invoke$arity$2 = (function (reducef,coll){
return clojure.core.reducers.fold.cljs$core$IFn$_invoke$arity$3(reducef,reducef,coll);
});

clojure.core.reducers.fold.cljs$core$IFn$_invoke$arity$3 = (function (combinef,reducef,coll){
return clojure.core.reducers.fold.cljs$core$IFn$_invoke$arity$4((512),combinef,reducef,coll);
});

clojure.core.reducers.fold.cljs$core$IFn$_invoke$arity$4 = (function (n,combinef,reducef,coll){
return clojure.core.reducers.coll_fold(coll,n,combinef,reducef);
});

clojure.core.reducers.fold.cljs$lang$maxFixedArity = 4;

/**
 * Given a reducible collection, and a transformation function xf,
 *   returns a reducible collection, where any supplied reducing
 *   fn will be transformed by xf. xf is a function of reducing fn to
 *   reducing fn.
 */
clojure.core.reducers.reducer = (function clojure$core$reducers$reducer(coll,xf){
if(typeof clojure.core.reducers.t_clojure$core$reducers14317 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IReduce}
*/
clojure.core.reducers.t_clojure$core$reducers14317 = (function (coll,xf,meta14318){
this.coll = coll;
this.xf = xf;
this.meta14318 = meta14318;
this.cljs$lang$protocol_mask$partition0$ = 917504;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
clojure.core.reducers.t_clojure$core$reducers14317.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14319,meta14318__$1){
var self__ = this;
var _14319__$1 = this;
return (new clojure.core.reducers.t_clojure$core$reducers14317(self__.coll,self__.xf,meta14318__$1));
});

clojure.core.reducers.t_clojure$core$reducers14317.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14319){
var self__ = this;
var _14319__$1 = this;
return self__.meta14318;
});

clojure.core.reducers.t_clojure$core$reducers14317.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (this$,f1){
var self__ = this;
var this$__$1 = this;
return cljs.core._reduce.cljs$core$IFn$_invoke$arity$3(this$__$1,f1,(f1.cljs$core$IFn$_invoke$arity$0 ? f1.cljs$core$IFn$_invoke$arity$0() : f1.call(null)));
});

clojure.core.reducers.t_clojure$core$reducers14317.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (_,f1,init){
var self__ = this;
var ___$1 = this;
return cljs.core._reduce.cljs$core$IFn$_invoke$arity$3(self__.coll,(self__.xf.cljs$core$IFn$_invoke$arity$1 ? self__.xf.cljs$core$IFn$_invoke$arity$1(f1) : self__.xf.call(null,f1)),init);
});

clojure.core.reducers.t_clojure$core$reducers14317.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"coll","coll",-1006698606,null),new cljs.core.Symbol(null,"xf","xf",2042434515,null),new cljs.core.Symbol(null,"meta14318","meta14318",-574490539,null)], null);
});

clojure.core.reducers.t_clojure$core$reducers14317.cljs$lang$type = true;

clojure.core.reducers.t_clojure$core$reducers14317.cljs$lang$ctorStr = "clojure.core.reducers/t_clojure$core$reducers14317";

clojure.core.reducers.t_clojure$core$reducers14317.cljs$lang$ctorPrWriter = (function (this__8175__auto__,writer__8176__auto__,opt__8177__auto__){
return cljs.core._write(writer__8176__auto__,"clojure.core.reducers/t_clojure$core$reducers14317");
});

clojure.core.reducers.__GT_t_clojure$core$reducers14317 = (function clojure$core$reducers$reducer_$___GT_t_clojure$core$reducers14317(coll__$1,xf__$1,meta14318){
return (new clojure.core.reducers.t_clojure$core$reducers14317(coll__$1,xf__$1,meta14318));
});

}

return (new clojure.core.reducers.t_clojure$core$reducers14317(coll,xf,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Given a foldable collection, and a transformation function xf,
 *   returns a foldable collection, where any supplied reducing
 *   fn will be transformed by xf. xf is a function of reducing fn to
 *   reducing fn.
 */
clojure.core.reducers.folder = (function clojure$core$reducers$folder(coll,xf){
if(typeof clojure.core.reducers.t_clojure$core$reducers14343 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {clojure.core.reducers.CollFold}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IReduce}
*/
clojure.core.reducers.t_clojure$core$reducers14343 = (function (coll,xf,meta14344){
this.coll = coll;
this.xf = xf;
this.meta14344 = meta14344;
this.cljs$lang$protocol_mask$partition0$ = 917504;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
clojure.core.reducers.t_clojure$core$reducers14343.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14345,meta14344__$1){
var self__ = this;
var _14345__$1 = this;
return (new clojure.core.reducers.t_clojure$core$reducers14343(self__.coll,self__.xf,meta14344__$1));
});

clojure.core.reducers.t_clojure$core$reducers14343.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14345){
var self__ = this;
var _14345__$1 = this;
return self__.meta14344;
});

clojure.core.reducers.t_clojure$core$reducers14343.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (_,f1){
var self__ = this;
var ___$1 = this;
return cljs.core._reduce.cljs$core$IFn$_invoke$arity$3(self__.coll,(self__.xf.cljs$core$IFn$_invoke$arity$1 ? self__.xf.cljs$core$IFn$_invoke$arity$1(f1) : self__.xf.call(null,f1)),(f1.cljs$core$IFn$_invoke$arity$0 ? f1.cljs$core$IFn$_invoke$arity$0() : f1.call(null)));
});

clojure.core.reducers.t_clojure$core$reducers14343.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (_,f1,init){
var self__ = this;
var ___$1 = this;
return cljs.core._reduce.cljs$core$IFn$_invoke$arity$3(self__.coll,(self__.xf.cljs$core$IFn$_invoke$arity$1 ? self__.xf.cljs$core$IFn$_invoke$arity$1(f1) : self__.xf.call(null,f1)),init);
});

clojure.core.reducers.t_clojure$core$reducers14343.prototype.clojure$core$reducers$CollFold$ = cljs.core.PROTOCOL_SENTINEL;

clojure.core.reducers.t_clojure$core$reducers14343.prototype.clojure$core$reducers$CollFold$coll_fold$arity$4 = (function (_,n,combinef,reducef){
var self__ = this;
var ___$1 = this;
return clojure.core.reducers.coll_fold(self__.coll,n,combinef,(self__.xf.cljs$core$IFn$_invoke$arity$1 ? self__.xf.cljs$core$IFn$_invoke$arity$1(reducef) : self__.xf.call(null,reducef)));
});

clojure.core.reducers.t_clojure$core$reducers14343.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"coll","coll",-1006698606,null),new cljs.core.Symbol(null,"xf","xf",2042434515,null),new cljs.core.Symbol(null,"meta14344","meta14344",877861736,null)], null);
});

clojure.core.reducers.t_clojure$core$reducers14343.cljs$lang$type = true;

clojure.core.reducers.t_clojure$core$reducers14343.cljs$lang$ctorStr = "clojure.core.reducers/t_clojure$core$reducers14343";

clojure.core.reducers.t_clojure$core$reducers14343.cljs$lang$ctorPrWriter = (function (this__8175__auto__,writer__8176__auto__,opt__8177__auto__){
return cljs.core._write(writer__8176__auto__,"clojure.core.reducers/t_clojure$core$reducers14343");
});

clojure.core.reducers.__GT_t_clojure$core$reducers14343 = (function clojure$core$reducers$folder_$___GT_t_clojure$core$reducers14343(coll__$1,xf__$1,meta14344){
return (new clojure.core.reducers.t_clojure$core$reducers14343(coll__$1,xf__$1,meta14344));
});

}

return (new clojure.core.reducers.t_clojure$core$reducers14343(coll,xf,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Applies f to every value in the reduction of coll. Foldable.
 */
clojure.core.reducers.map = (function clojure$core$reducers$map(var_args){
var args14374 = [];
var len__8739__auto___14393 = arguments.length;
var i__8740__auto___14394 = (0);
while(true){
if((i__8740__auto___14394 < len__8739__auto___14393)){
args14374.push((arguments[i__8740__auto___14394]));

var G__14395 = (i__8740__auto___14394 + (1));
i__8740__auto___14394 = G__14395;
continue;
} else {
}
break;
}

var G__14380 = args14374.length;
switch (G__14380) {
case 1:
return clojure.core.reducers.map.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return clojure.core.reducers.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14374.length)].join('')));

}
});

clojure.core.reducers.map.cljs$core$IFn$_invoke$arity$1 = (function (f){
return (function (x__7966__auto__){
return clojure.core.reducers.map.cljs$core$IFn$_invoke$arity$2(f,x__7966__auto__);
});
});

clojure.core.reducers.map.cljs$core$IFn$_invoke$arity$2 = (function (f,coll){
return clojure.core.reducers.folder(coll,(function (f1){
return (function() {
var G__14402 = null;
var G__14402__0 = (function (){
return (f1.cljs$core$IFn$_invoke$arity$0 ? f1.cljs$core$IFn$_invoke$arity$0() : f1.call(null));
});
var G__14402__2 = (function (ret,v){
var G__14385 = ret;
var G__14386 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(v) : f.call(null,v));
return (f1.cljs$core$IFn$_invoke$arity$2 ? f1.cljs$core$IFn$_invoke$arity$2(G__14385,G__14386) : f1.call(null,G__14385,G__14386));
});
var G__14402__3 = (function (ret,k,v){
var G__14388 = ret;
var G__14389 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(k,v) : f.call(null,k,v));
return (f1.cljs$core$IFn$_invoke$arity$2 ? f1.cljs$core$IFn$_invoke$arity$2(G__14388,G__14389) : f1.call(null,G__14388,G__14389));
});
G__14402 = function(ret,k,v){
switch(arguments.length){
case 0:
return G__14402__0.call(this);
case 2:
return G__14402__2.call(this,ret,k);
case 3:
return G__14402__3.call(this,ret,k,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__14402.cljs$core$IFn$_invoke$arity$0 = G__14402__0;
G__14402.cljs$core$IFn$_invoke$arity$2 = G__14402__2;
G__14402.cljs$core$IFn$_invoke$arity$3 = G__14402__3;
return G__14402;
})()
}));
});

clojure.core.reducers.map.cljs$lang$maxFixedArity = 2;

/**
 * Applies f to every value in the reduction of coll, concatenating the result
 *   colls of (f val). Foldable.
 */
clojure.core.reducers.mapcat = (function clojure$core$reducers$mapcat(var_args){
var args14408 = [];
var len__8739__auto___14422 = arguments.length;
var i__8740__auto___14423 = (0);
while(true){
if((i__8740__auto___14423 < len__8739__auto___14422)){
args14408.push((arguments[i__8740__auto___14423]));

var G__14426 = (i__8740__auto___14423 + (1));
i__8740__auto___14423 = G__14426;
continue;
} else {
}
break;
}

var G__14414 = args14408.length;
switch (G__14414) {
case 1:
return clojure.core.reducers.mapcat.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return clojure.core.reducers.mapcat.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14408.length)].join('')));

}
});

clojure.core.reducers.mapcat.cljs$core$IFn$_invoke$arity$1 = (function (f){
return (function (x__7966__auto__){
return clojure.core.reducers.mapcat.cljs$core$IFn$_invoke$arity$2(f,x__7966__auto__);
});
});

clojure.core.reducers.mapcat.cljs$core$IFn$_invoke$arity$2 = (function (f,coll){
return clojure.core.reducers.folder(coll,(function (f1){
return (function() {
var G__14433 = null;
var G__14433__0 = (function (){
return (f1.cljs$core$IFn$_invoke$arity$0 ? f1.cljs$core$IFn$_invoke$arity$0() : f1.call(null));
});
var G__14433__2 = (function (ret,v){
return clojure.core.reducers.reduce.cljs$core$IFn$_invoke$arity$3(f1,ret,(f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(v) : f.call(null,v)));
});
var G__14433__3 = (function (ret,k,v){
return clojure.core.reducers.reduce.cljs$core$IFn$_invoke$arity$3(f1,ret,(f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(k,v) : f.call(null,k,v)));
});
G__14433 = function(ret,k,v){
switch(arguments.length){
case 0:
return G__14433__0.call(this);
case 2:
return G__14433__2.call(this,ret,k);
case 3:
return G__14433__3.call(this,ret,k,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__14433.cljs$core$IFn$_invoke$arity$0 = G__14433__0;
G__14433.cljs$core$IFn$_invoke$arity$2 = G__14433__2;
G__14433.cljs$core$IFn$_invoke$arity$3 = G__14433__3;
return G__14433;
})()
}));
});

clojure.core.reducers.mapcat.cljs$lang$maxFixedArity = 2;

/**
 * Retains values in the reduction of coll for which (pred val)
 *   returns logical true. Foldable.
 */
clojure.core.reducers.filter = (function clojure$core$reducers$filter(var_args){
var args14440 = [];
var len__8739__auto___14455 = arguments.length;
var i__8740__auto___14457 = (0);
while(true){
if((i__8740__auto___14457 < len__8739__auto___14455)){
args14440.push((arguments[i__8740__auto___14457]));

var G__14459 = (i__8740__auto___14457 + (1));
i__8740__auto___14457 = G__14459;
continue;
} else {
}
break;
}

var G__14448 = args14440.length;
switch (G__14448) {
case 1:
return clojure.core.reducers.filter.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return clojure.core.reducers.filter.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14440.length)].join('')));

}
});

clojure.core.reducers.filter.cljs$core$IFn$_invoke$arity$1 = (function (pred){
return (function (x__7966__auto__){
return clojure.core.reducers.filter.cljs$core$IFn$_invoke$arity$2(pred,x__7966__auto__);
});
});

clojure.core.reducers.filter.cljs$core$IFn$_invoke$arity$2 = (function (pred,coll){
return clojure.core.reducers.folder(coll,(function (f1){
return (function() {
var G__14466 = null;
var G__14466__0 = (function (){
return (f1.cljs$core$IFn$_invoke$arity$0 ? f1.cljs$core$IFn$_invoke$arity$0() : f1.call(null));
});
var G__14466__2 = (function (ret,v){
if(cljs.core.truth_((pred.cljs$core$IFn$_invoke$arity$1 ? pred.cljs$core$IFn$_invoke$arity$1(v) : pred.call(null,v)))){
return (f1.cljs$core$IFn$_invoke$arity$2 ? f1.cljs$core$IFn$_invoke$arity$2(ret,v) : f1.call(null,ret,v));
} else {
return ret;
}
});
var G__14466__3 = (function (ret,k,v){
if(cljs.core.truth_((pred.cljs$core$IFn$_invoke$arity$2 ? pred.cljs$core$IFn$_invoke$arity$2(k,v) : pred.call(null,k,v)))){
return (f1.cljs$core$IFn$_invoke$arity$3 ? f1.cljs$core$IFn$_invoke$arity$3(ret,k,v) : f1.call(null,ret,k,v));
} else {
return ret;
}
});
G__14466 = function(ret,k,v){
switch(arguments.length){
case 0:
return G__14466__0.call(this);
case 2:
return G__14466__2.call(this,ret,k);
case 3:
return G__14466__3.call(this,ret,k,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__14466.cljs$core$IFn$_invoke$arity$0 = G__14466__0;
G__14466.cljs$core$IFn$_invoke$arity$2 = G__14466__2;
G__14466.cljs$core$IFn$_invoke$arity$3 = G__14466__3;
return G__14466;
})()
}));
});

clojure.core.reducers.filter.cljs$lang$maxFixedArity = 2;

/**
 * Takes any nested combination of sequential things (lists, vectors,
 *   etc.) and returns their contents as a single, flat foldable
 *   collection.
 */
clojure.core.reducers.flatten = (function clojure$core$reducers$flatten(var_args){
var args14479 = [];
var len__8739__auto___14538 = arguments.length;
var i__8740__auto___14539 = (0);
while(true){
if((i__8740__auto___14539 < len__8739__auto___14538)){
args14479.push((arguments[i__8740__auto___14539]));

var G__14540 = (i__8740__auto___14539 + (1));
i__8740__auto___14539 = G__14540;
continue;
} else {
}
break;
}

var G__14481 = args14479.length;
switch (G__14481) {
case 0:
return clojure.core.reducers.flatten.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return clojure.core.reducers.flatten.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14479.length)].join('')));

}
});

clojure.core.reducers.flatten.cljs$core$IFn$_invoke$arity$0 = (function (){
return (function (x__7966__auto__){
return clojure.core.reducers.flatten.cljs$core$IFn$_invoke$arity$1(x__7966__auto__);
});
});

clojure.core.reducers.flatten.cljs$core$IFn$_invoke$arity$1 = (function (coll){
return clojure.core.reducers.folder(coll,(function (f1){
return (function() {
var G__14553 = null;
var G__14553__0 = (function (){
return (f1.cljs$core$IFn$_invoke$arity$0 ? f1.cljs$core$IFn$_invoke$arity$0() : f1.call(null));
});
var G__14553__2 = (function (ret,v){
if(cljs.core.sequential_QMARK_(v)){
return cljs.core._reduce.cljs$core$IFn$_invoke$arity$3(clojure.core.reducers.flatten.cljs$core$IFn$_invoke$arity$1(v),f1,ret);
} else {
return (f1.cljs$core$IFn$_invoke$arity$2 ? f1.cljs$core$IFn$_invoke$arity$2(ret,v) : f1.call(null,ret,v));
}
});
G__14553 = function(ret,v){
switch(arguments.length){
case 0:
return G__14553__0.call(this);
case 2:
return G__14553__2.call(this,ret,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__14553.cljs$core$IFn$_invoke$arity$0 = G__14553__0;
G__14553.cljs$core$IFn$_invoke$arity$2 = G__14553__2;
return G__14553;
})()
}));
});

clojure.core.reducers.flatten.cljs$lang$maxFixedArity = 1;

/**
 * Removes values in the reduction of coll for which (pred val)
 *   returns logical true. Foldable.
 */
clojure.core.reducers.remove = (function clojure$core$reducers$remove(var_args){
var args14576 = [];
var len__8739__auto___14587 = arguments.length;
var i__8740__auto___14589 = (0);
while(true){
if((i__8740__auto___14589 < len__8739__auto___14587)){
args14576.push((arguments[i__8740__auto___14589]));

var G__14590 = (i__8740__auto___14589 + (1));
i__8740__auto___14589 = G__14590;
continue;
} else {
}
break;
}

var G__14579 = args14576.length;
switch (G__14579) {
case 1:
return clojure.core.reducers.remove.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return clojure.core.reducers.remove.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14576.length)].join('')));

}
});

clojure.core.reducers.remove.cljs$core$IFn$_invoke$arity$1 = (function (pred){
return (function (x__7966__auto__){
return clojure.core.reducers.remove.cljs$core$IFn$_invoke$arity$2(pred,x__7966__auto__);
});
});

clojure.core.reducers.remove.cljs$core$IFn$_invoke$arity$2 = (function (pred,coll){
return clojure.core.reducers.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.complement(pred),coll);
});

clojure.core.reducers.remove.cljs$lang$maxFixedArity = 2;

/**
 * Ends the reduction of coll when (pred val) returns logical false.
 */
clojure.core.reducers.take_while = (function clojure$core$reducers$take_while(var_args){
var args14597 = [];
var len__8739__auto___14611 = arguments.length;
var i__8740__auto___14612 = (0);
while(true){
if((i__8740__auto___14612 < len__8739__auto___14611)){
args14597.push((arguments[i__8740__auto___14612]));

var G__14616 = (i__8740__auto___14612 + (1));
i__8740__auto___14612 = G__14616;
continue;
} else {
}
break;
}

var G__14607 = args14597.length;
switch (G__14607) {
case 1:
return clojure.core.reducers.take_while.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return clojure.core.reducers.take_while.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14597.length)].join('')));

}
});

clojure.core.reducers.take_while.cljs$core$IFn$_invoke$arity$1 = (function (pred){
return (function (x__7966__auto__){
return clojure.core.reducers.take_while.cljs$core$IFn$_invoke$arity$2(pred,x__7966__auto__);
});
});

clojure.core.reducers.take_while.cljs$core$IFn$_invoke$arity$2 = (function (pred,coll){
return clojure.core.reducers.reducer(coll,(function (f1){
return (function() {
var G__14623 = null;
var G__14623__0 = (function (){
return (f1.cljs$core$IFn$_invoke$arity$0 ? f1.cljs$core$IFn$_invoke$arity$0() : f1.call(null));
});
var G__14623__2 = (function (ret,v){
if(cljs.core.truth_((pred.cljs$core$IFn$_invoke$arity$1 ? pred.cljs$core$IFn$_invoke$arity$1(v) : pred.call(null,v)))){
return (f1.cljs$core$IFn$_invoke$arity$2 ? f1.cljs$core$IFn$_invoke$arity$2(ret,v) : f1.call(null,ret,v));
} else {
return cljs.core.reduced(ret);
}
});
var G__14623__3 = (function (ret,k,v){
if(cljs.core.truth_((pred.cljs$core$IFn$_invoke$arity$2 ? pred.cljs$core$IFn$_invoke$arity$2(k,v) : pred.call(null,k,v)))){
return (f1.cljs$core$IFn$_invoke$arity$3 ? f1.cljs$core$IFn$_invoke$arity$3(ret,k,v) : f1.call(null,ret,k,v));
} else {
return cljs.core.reduced(ret);
}
});
G__14623 = function(ret,k,v){
switch(arguments.length){
case 0:
return G__14623__0.call(this);
case 2:
return G__14623__2.call(this,ret,k);
case 3:
return G__14623__3.call(this,ret,k,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__14623.cljs$core$IFn$_invoke$arity$0 = G__14623__0;
G__14623.cljs$core$IFn$_invoke$arity$2 = G__14623__2;
G__14623.cljs$core$IFn$_invoke$arity$3 = G__14623__3;
return G__14623;
})()
}));
});

clojure.core.reducers.take_while.cljs$lang$maxFixedArity = 2;

/**
 * Ends the reduction of coll after consuming n values.
 */
clojure.core.reducers.take = (function clojure$core$reducers$take(var_args){
var args14632 = [];
var len__8739__auto___14645 = arguments.length;
var i__8740__auto___14646 = (0);
while(true){
if((i__8740__auto___14646 < len__8739__auto___14645)){
args14632.push((arguments[i__8740__auto___14646]));

var G__14647 = (i__8740__auto___14646 + (1));
i__8740__auto___14646 = G__14647;
continue;
} else {
}
break;
}

var G__14639 = args14632.length;
switch (G__14639) {
case 1:
return clojure.core.reducers.take.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return clojure.core.reducers.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14632.length)].join('')));

}
});

clojure.core.reducers.take.cljs$core$IFn$_invoke$arity$1 = (function (n){
return (function (x__7966__auto__){
return clojure.core.reducers.take.cljs$core$IFn$_invoke$arity$2(n,x__7966__auto__);
});
});

clojure.core.reducers.take.cljs$core$IFn$_invoke$arity$2 = (function (n,coll){
return clojure.core.reducers.reducer(coll,(function (f1){
var cnt = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(n) : cljs.core.atom.call(null,n));
return ((function (cnt){
return (function() {
var G__14653 = null;
var G__14653__0 = (function (){
return (f1.cljs$core$IFn$_invoke$arity$0 ? f1.cljs$core$IFn$_invoke$arity$0() : f1.call(null));
});
var G__14653__2 = (function (ret,v){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cnt,cljs.core.dec);

if(((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cnt) : cljs.core.deref.call(null,cnt)) < (0))){
return cljs.core.reduced(ret);
} else {
return (f1.cljs$core$IFn$_invoke$arity$2 ? f1.cljs$core$IFn$_invoke$arity$2(ret,v) : f1.call(null,ret,v));
}
});
var G__14653__3 = (function (ret,k,v){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cnt,cljs.core.dec);

if(((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cnt) : cljs.core.deref.call(null,cnt)) < (0))){
return cljs.core.reduced(ret);
} else {
return (f1.cljs$core$IFn$_invoke$arity$3 ? f1.cljs$core$IFn$_invoke$arity$3(ret,k,v) : f1.call(null,ret,k,v));
}
});
G__14653 = function(ret,k,v){
switch(arguments.length){
case 0:
return G__14653__0.call(this);
case 2:
return G__14653__2.call(this,ret,k);
case 3:
return G__14653__3.call(this,ret,k,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__14653.cljs$core$IFn$_invoke$arity$0 = G__14653__0;
G__14653.cljs$core$IFn$_invoke$arity$2 = G__14653__2;
G__14653.cljs$core$IFn$_invoke$arity$3 = G__14653__3;
return G__14653;
})()
;})(cnt))
}));
});

clojure.core.reducers.take.cljs$lang$maxFixedArity = 2;

/**
 * Elides the first n values from the reduction of coll.
 */
clojure.core.reducers.drop = (function clojure$core$reducers$drop(var_args){
var args14660 = [];
var len__8739__auto___14668 = arguments.length;
var i__8740__auto___14669 = (0);
while(true){
if((i__8740__auto___14669 < len__8739__auto___14668)){
args14660.push((arguments[i__8740__auto___14669]));

var G__14670 = (i__8740__auto___14669 + (1));
i__8740__auto___14669 = G__14670;
continue;
} else {
}
break;
}

var G__14662 = args14660.length;
switch (G__14662) {
case 1:
return clojure.core.reducers.drop.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return clojure.core.reducers.drop.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14660.length)].join('')));

}
});

clojure.core.reducers.drop.cljs$core$IFn$_invoke$arity$1 = (function (n){
return (function (x__7966__auto__){
return clojure.core.reducers.drop.cljs$core$IFn$_invoke$arity$2(n,x__7966__auto__);
});
});

clojure.core.reducers.drop.cljs$core$IFn$_invoke$arity$2 = (function (n,coll){
return clojure.core.reducers.reducer(coll,(function (f1){
var cnt = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(n) : cljs.core.atom.call(null,n));
return ((function (cnt){
return (function() {
var G__14675 = null;
var G__14675__0 = (function (){
return (f1.cljs$core$IFn$_invoke$arity$0 ? f1.cljs$core$IFn$_invoke$arity$0() : f1.call(null));
});
var G__14675__2 = (function (ret,v){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cnt,cljs.core.dec);

if(((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cnt) : cljs.core.deref.call(null,cnt)) < (0))){
return (f1.cljs$core$IFn$_invoke$arity$2 ? f1.cljs$core$IFn$_invoke$arity$2(ret,v) : f1.call(null,ret,v));
} else {
return ret;
}
});
var G__14675__3 = (function (ret,k,v){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cnt,cljs.core.dec);

if(((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cnt) : cljs.core.deref.call(null,cnt)) < (0))){
return (f1.cljs$core$IFn$_invoke$arity$3 ? f1.cljs$core$IFn$_invoke$arity$3(ret,k,v) : f1.call(null,ret,k,v));
} else {
return ret;
}
});
G__14675 = function(ret,k,v){
switch(arguments.length){
case 0:
return G__14675__0.call(this);
case 2:
return G__14675__2.call(this,ret,k);
case 3:
return G__14675__3.call(this,ret,k,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__14675.cljs$core$IFn$_invoke$arity$0 = G__14675__0;
G__14675.cljs$core$IFn$_invoke$arity$2 = G__14675__2;
G__14675.cljs$core$IFn$_invoke$arity$3 = G__14675__3;
return G__14675;
})()
;})(cnt))
}));
});

clojure.core.reducers.drop.cljs$lang$maxFixedArity = 2;


/**
* @constructor
 * @implements {clojure.core.reducers.CollFold}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IReduce}
*/
clojure.core.reducers.Cat = (function (cnt,left,right){
this.cnt = cnt;
this.left = left;
this.right = right;
this.cljs$lang$protocol_mask$partition0$ = 8912898;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
clojure.core.reducers.Cat.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.cnt;
});

clojure.core.reducers.Cat.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.seq(self__.left),cljs.core.seq(self__.right));
});

clojure.core.reducers.Cat.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (this$,f1){
var self__ = this;
var this$__$1 = this;
return cljs.core._reduce.cljs$core$IFn$_invoke$arity$3(this$__$1,f1,(f1.cljs$core$IFn$_invoke$arity$0 ? f1.cljs$core$IFn$_invoke$arity$0() : f1.call(null)));
});

clojure.core.reducers.Cat.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (_,f1,init){
var self__ = this;
var ___$1 = this;
return cljs.core._reduce.cljs$core$IFn$_invoke$arity$3(self__.right,f1,cljs.core._reduce.cljs$core$IFn$_invoke$arity$3(self__.left,f1,init));
});

clojure.core.reducers.Cat.prototype.clojure$core$reducers$CollFold$ = cljs.core.PROTOCOL_SENTINEL;

clojure.core.reducers.Cat.prototype.clojure$core$reducers$CollFold$coll_fold$arity$4 = (function (this$,n,combinef,reducef){
var self__ = this;
var this$__$1 = this;
return cljs.core._reduce.cljs$core$IFn$_invoke$arity$2(this$__$1,reducef);
});

clojure.core.reducers.Cat.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"cnt","cnt",1924510325,null),new cljs.core.Symbol(null,"left","left",1241415590,null),new cljs.core.Symbol(null,"right","right",1187949694,null)], null);
});

clojure.core.reducers.Cat.cljs$lang$type = true;

clojure.core.reducers.Cat.cljs$lang$ctorStr = "clojure.core.reducers/Cat";

clojure.core.reducers.Cat.cljs$lang$ctorPrWriter = (function (this__8175__auto__,writer__8176__auto__,opt__8177__auto__){
return cljs.core._write(writer__8176__auto__,"clojure.core.reducers/Cat");
});

clojure.core.reducers.__GT_Cat = (function clojure$core$reducers$__GT_Cat(cnt,left,right){
return (new clojure.core.reducers.Cat(cnt,left,right));
});

/**
 * A high-performance combining fn that yields the catenation of the
 *   reduced values. The result is reducible, foldable, seqable and
 *   counted, providing the identity collections are reducible, seqable
 *   and counted. The single argument version will build a combining fn
 *   with the supplied identity constructor. Tests for identity
 *   with (zero? (count x)). See also foldcat.
 */
clojure.core.reducers.cat = (function clojure$core$reducers$cat(var_args){
var args14694 = [];
var len__8739__auto___14705 = arguments.length;
var i__8740__auto___14706 = (0);
while(true){
if((i__8740__auto___14706 < len__8739__auto___14705)){
args14694.push((arguments[i__8740__auto___14706]));

var G__14709 = (i__8740__auto___14706 + (1));
i__8740__auto___14706 = G__14709;
continue;
} else {
}
break;
}

var G__14699 = args14694.length;
switch (G__14699) {
case 0:
return clojure.core.reducers.cat.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return clojure.core.reducers.cat.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return clojure.core.reducers.cat.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14694.length)].join('')));

}
});

clojure.core.reducers.cat.cljs$core$IFn$_invoke$arity$0 = (function (){
return [];
});

clojure.core.reducers.cat.cljs$core$IFn$_invoke$arity$1 = (function (ctor){
return (function() {
var G__14714 = null;
var G__14714__0 = (function (){
return (ctor.cljs$core$IFn$_invoke$arity$0 ? ctor.cljs$core$IFn$_invoke$arity$0() : ctor.call(null));
});
var G__14714__2 = (function (left,right){
return clojure.core.reducers.cat.cljs$core$IFn$_invoke$arity$2(left,right);
});
G__14714 = function(left,right){
switch(arguments.length){
case 0:
return G__14714__0.call(this);
case 2:
return G__14714__2.call(this,left,right);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__14714.cljs$core$IFn$_invoke$arity$0 = G__14714__0;
G__14714.cljs$core$IFn$_invoke$arity$2 = G__14714__2;
return G__14714;
})()
});

clojure.core.reducers.cat.cljs$core$IFn$_invoke$arity$2 = (function (left,right){
if((cljs.core.count(left) === (0))){
return right;
} else {
if((cljs.core.count(right) === (0))){
return left;
} else {
return (new clojure.core.reducers.Cat((cljs.core.count(left) + cljs.core.count(right)),left,right));

}
}
});

clojure.core.reducers.cat.cljs$lang$maxFixedArity = 2;

/**
 * .adds x to acc and returns acc
 */
clojure.core.reducers.append_BANG_ = (function clojure$core$reducers$append_BANG_(acc,x){
var G__14722 = acc;
G__14722.push(x);

return G__14722;
});
/**
 * Equivalent to (fold cat append! coll)
 */
clojure.core.reducers.foldcat = (function clojure$core$reducers$foldcat(coll){
return clojure.core.reducers.fold.cljs$core$IFn$_invoke$arity$3(clojure.core.reducers.cat,clojure.core.reducers.append_BANG_,coll);
});
/**
 * Builds a combining fn out of the supplied operator and identity
 *   constructor. op must be associative and ctor called with no args
 *   must return an identity value for it.
 */
clojure.core.reducers.monoid = (function clojure$core$reducers$monoid(op,ctor){
return (function() {
var clojure$core$reducers$monoid_$_m = null;
var clojure$core$reducers$monoid_$_m__0 = (function (){
return (ctor.cljs$core$IFn$_invoke$arity$0 ? ctor.cljs$core$IFn$_invoke$arity$0() : ctor.call(null));
});
var clojure$core$reducers$monoid_$_m__2 = (function (a,b){
return (op.cljs$core$IFn$_invoke$arity$2 ? op.cljs$core$IFn$_invoke$arity$2(a,b) : op.call(null,a,b));
});
clojure$core$reducers$monoid_$_m = function(a,b){
switch(arguments.length){
case 0:
return clojure$core$reducers$monoid_$_m__0.call(this);
case 2:
return clojure$core$reducers$monoid_$_m__2.call(this,a,b);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
clojure$core$reducers$monoid_$_m.cljs$core$IFn$_invoke$arity$0 = clojure$core$reducers$monoid_$_m__0;
clojure$core$reducers$monoid_$_m.cljs$core$IFn$_invoke$arity$2 = clojure$core$reducers$monoid_$_m__2;
return clojure$core$reducers$monoid_$_m;
})()
});
clojure.core.reducers.foldvec = (function clojure$core$reducers$foldvec(v,n,combinef,reducef){
if(cljs.core.empty_QMARK_(v)){
return (combinef.cljs$core$IFn$_invoke$arity$0 ? combinef.cljs$core$IFn$_invoke$arity$0() : combinef.call(null));
} else {
if((cljs.core.count(v) <= n)){
return clojure.core.reducers.reduce.cljs$core$IFn$_invoke$arity$3(reducef,(combinef.cljs$core$IFn$_invoke$arity$0 ? combinef.cljs$core$IFn$_invoke$arity$0() : combinef.call(null)),v);
} else {
var split = cljs.core.quot(cljs.core.count(v),(2));
var v1 = cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(v,(0),split);
var v2 = cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(v,split,cljs.core.count(v));
var fc = ((function (split,v1,v2){
return (function (child){
return ((function (split,v1,v2){
return (function (){
return (clojure.core.reducers.foldvec.cljs$core$IFn$_invoke$arity$4 ? clojure.core.reducers.foldvec.cljs$core$IFn$_invoke$arity$4(child,n,combinef,reducef) : clojure.core.reducers.foldvec.call(null,child,n,combinef,reducef));
});
;})(split,v1,v2))
});})(split,v1,v2))
;
return clojure.core.reducers.fjinvoke(((function (split,v1,v2,fc){
return (function (){
var f1 = fc(v1);
var t2 = clojure.core.reducers.fjtask(fc(v2));
clojure.core.reducers.fjfork(t2);

var G__14742 = (f1.cljs$core$IFn$_invoke$arity$0 ? f1.cljs$core$IFn$_invoke$arity$0() : f1.call(null));
var G__14743 = clojure.core.reducers.fjjoin(t2);
return (combinef.cljs$core$IFn$_invoke$arity$2 ? combinef.cljs$core$IFn$_invoke$arity$2(G__14742,G__14743) : combinef.call(null,G__14742,G__14743));
});})(split,v1,v2,fc))
);

}
}
});
(clojure.core.reducers.CollFold["null"] = true);

(clojure.core.reducers.coll_fold["null"] = (function (coll,n,combinef,reducef){
return (combinef.cljs$core$IFn$_invoke$arity$0 ? combinef.cljs$core$IFn$_invoke$arity$0() : combinef.call(null));
}));

(clojure.core.reducers.CollFold["object"] = true);

(clojure.core.reducers.coll_fold["object"] = (function (coll,n,combinef,reducef){
return clojure.core.reducers.reduce.cljs$core$IFn$_invoke$arity$3(reducef,(combinef.cljs$core$IFn$_invoke$arity$0 ? combinef.cljs$core$IFn$_invoke$arity$0() : combinef.call(null)),coll);
}));

cljs.core.PersistentVector.prototype.clojure$core$reducers$CollFold$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.PersistentVector.prototype.clojure$core$reducers$CollFold$coll_fold$arity$4 = (function (v,n,combinef,reducef){
var v__$1 = this;
return clojure.core.reducers.foldvec(v__$1,n,combinef,reducef);
});
