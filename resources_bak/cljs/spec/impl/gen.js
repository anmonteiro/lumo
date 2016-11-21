// Compiled by ClojureScript 1.9.293 {:static-fns true, :optimize-constants false, :target :nodejs}
goog.provide('cljs.spec.impl.gen');
goog.require('cljs.core');
goog.require('cljs.core');

/**
* @constructor
 * @implements {cljs.core.IDeref}
*/
cljs.spec.impl.gen.LazyVar = (function (f,cached){
this.f = f;
this.cached = cached;
this.cljs$lang$protocol_mask$partition0$ = 32768;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.spec.impl.gen.LazyVar.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if(!((self__.cached == null))){
return self__.cached;
} else {
var x = (self__.f.cljs$core$IFn$_invoke$arity$0 ? self__.f.cljs$core$IFn$_invoke$arity$0() : self__.f.call(null));
if((x == null)){
} else {
self__.cached = x;
}

return x;
}
});

cljs.spec.impl.gen.LazyVar.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),cljs.core.with_meta(new cljs.core.Symbol(null,"cached","cached",-1216707864,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
});

cljs.spec.impl.gen.LazyVar.cljs$lang$type = true;

cljs.spec.impl.gen.LazyVar.cljs$lang$ctorStr = "cljs.spec.impl.gen/LazyVar";

cljs.spec.impl.gen.LazyVar.cljs$lang$ctorPrWriter = (function (this__8175__auto__,writer__8176__auto__,opt__8177__auto__){
return cljs.core._write(writer__8176__auto__,"cljs.spec.impl.gen/LazyVar");
});

cljs.spec.impl.gen.__GT_LazyVar = (function cljs$spec$impl$gen$__GT_LazyVar(f,cached){
return (new cljs.spec.impl.gen.LazyVar(f,cached));
});

cljs.spec.impl.gen.quick_check_ref = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check.quick_check !== 'undefined')){
return clojure.test.check.quick_check;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check","quick-check","clojure.test.check/quick-check",-810344251,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check","quick-check","clojure.test.check/quick-check",-810344251,null))),cljs.core.str(" never required")].join('')));
}
}),null));
cljs.spec.impl.gen.quick_check = (function cljs$spec$impl$gen$quick_check(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13607 = arguments.length;
var i__8740__auto___13609 = (0);
while(true){
if((i__8740__auto___13609 < len__8739__auto___13607)){
args__8746__auto__.push((arguments[i__8740__auto___13609]));

var G__13611 = (i__8740__auto___13609 + (1));
i__8740__auto___13609 = G__13611;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.quick_check.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});

cljs.spec.impl.gen.quick_check.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.spec.impl.gen.quick_check_ref) : cljs.core.deref.call(null,cljs.spec.impl.gen.quick_check_ref)),args);
});

cljs.spec.impl.gen.quick_check.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.quick_check.cljs$lang$applyTo = (function (seq13603){
return cljs.spec.impl.gen.quick_check.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13603));
});

cljs.spec.impl.gen.for_all_STAR__ref = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.properties.for_all_STAR_ !== 'undefined')){
return clojure.test.check.properties.for_all_STAR_;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.properties","for-all*","clojure.test.check.properties/for-all*",67088845,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.properties","for-all*","clojure.test.check.properties/for-all*",67088845,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Dynamically loaded clojure.test.check.properties/for-all*.
 */
cljs.spec.impl.gen.for_all_STAR_ = (function cljs$spec$impl$gen$for_all_STAR_(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13619 = arguments.length;
var i__8740__auto___13620 = (0);
while(true){
if((i__8740__auto___13620 < len__8739__auto___13619)){
args__8746__auto__.push((arguments[i__8740__auto___13620]));

var G__13621 = (i__8740__auto___13620 + (1));
i__8740__auto___13620 = G__13621;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.for_all_STAR_.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});

cljs.spec.impl.gen.for_all_STAR_.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.spec.impl.gen.for_all_STAR__ref) : cljs.core.deref.call(null,cljs.spec.impl.gen.for_all_STAR__ref)),args);
});

cljs.spec.impl.gen.for_all_STAR_.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.for_all_STAR_.cljs$lang$applyTo = (function (seq13617){
return cljs.spec.impl.gen.for_all_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13617));
});

var g_QMARK__13628 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.generator_QMARK_ !== 'undefined')){
return clojure.test.check.generators.generator_QMARK_;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","generator?","clojure.test.check.generators/generator?",-1378210460,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","generator?","clojure.test.check.generators/generator?",-1378210460,null))),cljs.core.str(" never required")].join('')));
}
}),null));
var g_13629 = (new cljs.spec.impl.gen.LazyVar(((function (g_QMARK__13628){
return (function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.generate !== 'undefined')){
return clojure.test.check.generators.generate;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","generate","clojure.test.check.generators/generate",-690390711,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","generate","clojure.test.check.generators/generate",-690390711,null))),cljs.core.str(" never required")].join('')));
}
});})(g_QMARK__13628))
,null));
var mkg_13630 = (new cljs.spec.impl.gen.LazyVar(((function (g_QMARK__13628,g_13629){
return (function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.__GT_Generator !== 'undefined')){
return clojure.test.check.generators.__GT_Generator;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","->Generator","clojure.test.check.generators/->Generator",-1179475051,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","->Generator","clojure.test.check.generators/->Generator",-1179475051,null))),cljs.core.str(" never required")].join('')));
}
});})(g_QMARK__13628,g_13629))
,null));
cljs.spec.impl.gen.generator_QMARK_ = ((function (g_QMARK__13628,g_13629,mkg_13630){
return (function cljs$spec$impl$gen$generator_QMARK_(x){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g_QMARK__13628) : cljs.core.deref.call(null,g_QMARK__13628)).call(null,x);
});})(g_QMARK__13628,g_13629,mkg_13630))
;

cljs.spec.impl.gen.generator = ((function (g_QMARK__13628,g_13629,mkg_13630){
return (function cljs$spec$impl$gen$generator(gfn){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mkg_13630) : cljs.core.deref.call(null,mkg_13630)).call(null,gfn);
});})(g_QMARK__13628,g_13629,mkg_13630))
;

/**
 * Generate a single value using generator.
 */
cljs.spec.impl.gen.generate = ((function (g_QMARK__13628,g_13629,mkg_13630){
return (function cljs$spec$impl$gen$generate(generator){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g_13629) : cljs.core.deref.call(null,g_13629)).call(null,generator);
});})(g_QMARK__13628,g_13629,mkg_13630))
;
cljs.spec.impl.gen.delay_impl = (function cljs$spec$impl$gen$delay_impl(gfnd){
return cljs.spec.impl.gen.generator((function (rnd,size){
return new cljs.core.Keyword(null,"gen","gen",142575302).cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(gfnd) : cljs.core.deref.call(null,gfnd))).call(null,rnd,size);
}));
});
var g__13575__auto___13706 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.hash_map !== 'undefined')){
return clojure.test.check.generators.hash_map;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","hash-map","clojure.test.check.generators/hash-map",1961346626,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","hash-map","clojure.test.check.generators/hash-map",1961346626,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/hash-map
 */
cljs.spec.impl.gen.hash_map = ((function (g__13575__auto___13706){
return (function cljs$spec$impl$gen$hash_map(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13710 = arguments.length;
var i__8740__auto___13711 = (0);
while(true){
if((i__8740__auto___13711 < len__8739__auto___13710)){
args__8746__auto__.push((arguments[i__8740__auto___13711]));

var G__13712 = (i__8740__auto___13711 + (1));
i__8740__auto___13711 = G__13712;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.hash_map.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13706))
;

cljs.spec.impl.gen.hash_map.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13706){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13706) : cljs.core.deref.call(null,g__13575__auto___13706)),args);
});})(g__13575__auto___13706))
;

cljs.spec.impl.gen.hash_map.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.hash_map.cljs$lang$applyTo = ((function (g__13575__auto___13706){
return (function (seq13634){
return cljs.spec.impl.gen.hash_map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13634));
});})(g__13575__auto___13706))
;


var g__13575__auto___13717 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.list !== 'undefined')){
return clojure.test.check.generators.list;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","list","clojure.test.check.generators/list",506971058,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","list","clojure.test.check.generators/list",506971058,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/list
 */
cljs.spec.impl.gen.list = ((function (g__13575__auto___13717){
return (function cljs$spec$impl$gen$list(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13721 = arguments.length;
var i__8740__auto___13722 = (0);
while(true){
if((i__8740__auto___13722 < len__8739__auto___13721)){
args__8746__auto__.push((arguments[i__8740__auto___13722]));

var G__13727 = (i__8740__auto___13722 + (1));
i__8740__auto___13722 = G__13727;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13717))
;

cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13717){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13717) : cljs.core.deref.call(null,g__13575__auto___13717)),args);
});})(g__13575__auto___13717))
;

cljs.spec.impl.gen.list.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.list.cljs$lang$applyTo = ((function (g__13575__auto___13717){
return (function (seq13641){
return cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13641));
});})(g__13575__auto___13717))
;


var g__13575__auto___13732 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.map !== 'undefined')){
return clojure.test.check.generators.map;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","map","clojure.test.check.generators/map",45738796,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","map","clojure.test.check.generators/map",45738796,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/map
 */
cljs.spec.impl.gen.map = ((function (g__13575__auto___13732){
return (function cljs$spec$impl$gen$map(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13740 = arguments.length;
var i__8740__auto___13741 = (0);
while(true){
if((i__8740__auto___13741 < len__8739__auto___13740)){
args__8746__auto__.push((arguments[i__8740__auto___13741]));

var G__13745 = (i__8740__auto___13741 + (1));
i__8740__auto___13741 = G__13745;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13732))
;

cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13732){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13732) : cljs.core.deref.call(null,g__13575__auto___13732)),args);
});})(g__13575__auto___13732))
;

cljs.spec.impl.gen.map.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.map.cljs$lang$applyTo = ((function (g__13575__auto___13732){
return (function (seq13647){
return cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13647));
});})(g__13575__auto___13732))
;


var g__13575__auto___13751 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.not_empty !== 'undefined')){
return clojure.test.check.generators.not_empty;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","not-empty","clojure.test.check.generators/not-empty",-876211682,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","not-empty","clojure.test.check.generators/not-empty",-876211682,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/not-empty
 */
cljs.spec.impl.gen.not_empty = ((function (g__13575__auto___13751){
return (function cljs$spec$impl$gen$not_empty(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13758 = arguments.length;
var i__8740__auto___13763 = (0);
while(true){
if((i__8740__auto___13763 < len__8739__auto___13758)){
args__8746__auto__.push((arguments[i__8740__auto___13763]));

var G__13764 = (i__8740__auto___13763 + (1));
i__8740__auto___13763 = G__13764;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.not_empty.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13751))
;

cljs.spec.impl.gen.not_empty.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13751){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13751) : cljs.core.deref.call(null,g__13575__auto___13751)),args);
});})(g__13575__auto___13751))
;

cljs.spec.impl.gen.not_empty.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.not_empty.cljs$lang$applyTo = ((function (g__13575__auto___13751){
return (function (seq13648){
return cljs.spec.impl.gen.not_empty.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13648));
});})(g__13575__auto___13751))
;


var g__13575__auto___13773 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.set !== 'undefined')){
return clojure.test.check.generators.set;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","set","clojure.test.check.generators/set",-1027639543,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","set","clojure.test.check.generators/set",-1027639543,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/set
 */
cljs.spec.impl.gen.set = ((function (g__13575__auto___13773){
return (function cljs$spec$impl$gen$set(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13780 = arguments.length;
var i__8740__auto___13781 = (0);
while(true){
if((i__8740__auto___13781 < len__8739__auto___13780)){
args__8746__auto__.push((arguments[i__8740__auto___13781]));

var G__13782 = (i__8740__auto___13781 + (1));
i__8740__auto___13781 = G__13782;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13773))
;

cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13773){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13773) : cljs.core.deref.call(null,g__13575__auto___13773)),args);
});})(g__13575__auto___13773))
;

cljs.spec.impl.gen.set.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.set.cljs$lang$applyTo = ((function (g__13575__auto___13773){
return (function (seq13652){
return cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13652));
});})(g__13575__auto___13773))
;


var g__13575__auto___13795 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.vector !== 'undefined')){
return clojure.test.check.generators.vector;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","vector","clojure.test.check.generators/vector",1081775325,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","vector","clojure.test.check.generators/vector",1081775325,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/vector
 */
cljs.spec.impl.gen.vector = ((function (g__13575__auto___13795){
return (function cljs$spec$impl$gen$vector(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13799 = arguments.length;
var i__8740__auto___13800 = (0);
while(true){
if((i__8740__auto___13800 < len__8739__auto___13799)){
args__8746__auto__.push((arguments[i__8740__auto___13800]));

var G__13804 = (i__8740__auto___13800 + (1));
i__8740__auto___13800 = G__13804;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13795))
;

cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13795){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13795) : cljs.core.deref.call(null,g__13575__auto___13795)),args);
});})(g__13575__auto___13795))
;

cljs.spec.impl.gen.vector.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.vector.cljs$lang$applyTo = ((function (g__13575__auto___13795){
return (function (seq13655){
return cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13655));
});})(g__13575__auto___13795))
;


var g__13575__auto___13816 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.vector_distinct !== 'undefined')){
return clojure.test.check.generators.vector_distinct;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","vector-distinct","clojure.test.check.generators/vector-distinct",1656877834,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","vector-distinct","clojure.test.check.generators/vector-distinct",1656877834,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/vector-distinct
 */
cljs.spec.impl.gen.vector_distinct = ((function (g__13575__auto___13816){
return (function cljs$spec$impl$gen$vector_distinct(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13824 = arguments.length;
var i__8740__auto___13825 = (0);
while(true){
if((i__8740__auto___13825 < len__8739__auto___13824)){
args__8746__auto__.push((arguments[i__8740__auto___13825]));

var G__13830 = (i__8740__auto___13825 + (1));
i__8740__auto___13825 = G__13830;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.vector_distinct.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13816))
;

cljs.spec.impl.gen.vector_distinct.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13816){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13816) : cljs.core.deref.call(null,g__13575__auto___13816)),args);
});})(g__13575__auto___13816))
;

cljs.spec.impl.gen.vector_distinct.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.vector_distinct.cljs$lang$applyTo = ((function (g__13575__auto___13816){
return (function (seq13660){
return cljs.spec.impl.gen.vector_distinct.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13660));
});})(g__13575__auto___13816))
;


var g__13575__auto___13842 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.fmap !== 'undefined')){
return clojure.test.check.generators.fmap;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","fmap","clojure.test.check.generators/fmap",1957997092,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","fmap","clojure.test.check.generators/fmap",1957997092,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/fmap
 */
cljs.spec.impl.gen.fmap = ((function (g__13575__auto___13842){
return (function cljs$spec$impl$gen$fmap(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13850 = arguments.length;
var i__8740__auto___13851 = (0);
while(true){
if((i__8740__auto___13851 < len__8739__auto___13850)){
args__8746__auto__.push((arguments[i__8740__auto___13851]));

var G__13852 = (i__8740__auto___13851 + (1));
i__8740__auto___13851 = G__13852;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13842))
;

cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13842){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13842) : cljs.core.deref.call(null,g__13575__auto___13842)),args);
});})(g__13575__auto___13842))
;

cljs.spec.impl.gen.fmap.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.fmap.cljs$lang$applyTo = ((function (g__13575__auto___13842){
return (function (seq13663){
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13663));
});})(g__13575__auto___13842))
;


var g__13575__auto___13861 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.elements !== 'undefined')){
return clojure.test.check.generators.elements;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","elements","clojure.test.check.generators/elements",438991326,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","elements","clojure.test.check.generators/elements",438991326,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/elements
 */
cljs.spec.impl.gen.elements = ((function (g__13575__auto___13861){
return (function cljs$spec$impl$gen$elements(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13868 = arguments.length;
var i__8740__auto___13869 = (0);
while(true){
if((i__8740__auto___13869 < len__8739__auto___13868)){
args__8746__auto__.push((arguments[i__8740__auto___13869]));

var G__13874 = (i__8740__auto___13869 + (1));
i__8740__auto___13869 = G__13874;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.elements.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13861))
;

cljs.spec.impl.gen.elements.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13861){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13861) : cljs.core.deref.call(null,g__13575__auto___13861)),args);
});})(g__13575__auto___13861))
;

cljs.spec.impl.gen.elements.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.elements.cljs$lang$applyTo = ((function (g__13575__auto___13861){
return (function (seq13666){
return cljs.spec.impl.gen.elements.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13666));
});})(g__13575__auto___13861))
;


var g__13575__auto___13883 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.bind !== 'undefined')){
return clojure.test.check.generators.bind;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","bind","clojure.test.check.generators/bind",-361313906,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","bind","clojure.test.check.generators/bind",-361313906,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/bind
 */
cljs.spec.impl.gen.bind = ((function (g__13575__auto___13883){
return (function cljs$spec$impl$gen$bind(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13887 = arguments.length;
var i__8740__auto___13888 = (0);
while(true){
if((i__8740__auto___13888 < len__8739__auto___13887)){
args__8746__auto__.push((arguments[i__8740__auto___13888]));

var G__13892 = (i__8740__auto___13888 + (1));
i__8740__auto___13888 = G__13892;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.bind.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13883))
;

cljs.spec.impl.gen.bind.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13883){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13883) : cljs.core.deref.call(null,g__13575__auto___13883)),args);
});})(g__13575__auto___13883))
;

cljs.spec.impl.gen.bind.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.bind.cljs$lang$applyTo = ((function (g__13575__auto___13883){
return (function (seq13667){
return cljs.spec.impl.gen.bind.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13667));
});})(g__13575__auto___13883))
;


var g__13575__auto___13893 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.choose !== 'undefined')){
return clojure.test.check.generators.choose;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","choose","clojure.test.check.generators/choose",909997832,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","choose","clojure.test.check.generators/choose",909997832,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/choose
 */
cljs.spec.impl.gen.choose = ((function (g__13575__auto___13893){
return (function cljs$spec$impl$gen$choose(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13894 = arguments.length;
var i__8740__auto___13895 = (0);
while(true){
if((i__8740__auto___13895 < len__8739__auto___13894)){
args__8746__auto__.push((arguments[i__8740__auto___13895]));

var G__13898 = (i__8740__auto___13895 + (1));
i__8740__auto___13895 = G__13898;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.choose.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13893))
;

cljs.spec.impl.gen.choose.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13893){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13893) : cljs.core.deref.call(null,g__13575__auto___13893)),args);
});})(g__13575__auto___13893))
;

cljs.spec.impl.gen.choose.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.choose.cljs$lang$applyTo = ((function (g__13575__auto___13893){
return (function (seq13668){
return cljs.spec.impl.gen.choose.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13668));
});})(g__13575__auto___13893))
;


var g__13575__auto___13899 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.one_of !== 'undefined')){
return clojure.test.check.generators.one_of;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","one-of","clojure.test.check.generators/one-of",-183339191,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","one-of","clojure.test.check.generators/one-of",-183339191,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/one-of
 */
cljs.spec.impl.gen.one_of = ((function (g__13575__auto___13899){
return (function cljs$spec$impl$gen$one_of(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13901 = arguments.length;
var i__8740__auto___13902 = (0);
while(true){
if((i__8740__auto___13902 < len__8739__auto___13901)){
args__8746__auto__.push((arguments[i__8740__auto___13902]));

var G__13903 = (i__8740__auto___13902 + (1));
i__8740__auto___13902 = G__13903;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13899))
;

cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13899){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13899) : cljs.core.deref.call(null,g__13575__auto___13899)),args);
});})(g__13575__auto___13899))
;

cljs.spec.impl.gen.one_of.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.one_of.cljs$lang$applyTo = ((function (g__13575__auto___13899){
return (function (seq13669){
return cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13669));
});})(g__13575__auto___13899))
;


var g__13575__auto___13904 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.such_that !== 'undefined')){
return clojure.test.check.generators.such_that;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","such-that","clojure.test.check.generators/such-that",-1754178732,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","such-that","clojure.test.check.generators/such-that",-1754178732,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/such-that
 */
cljs.spec.impl.gen.such_that = ((function (g__13575__auto___13904){
return (function cljs$spec$impl$gen$such_that(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13911 = arguments.length;
var i__8740__auto___13912 = (0);
while(true){
if((i__8740__auto___13912 < len__8739__auto___13911)){
args__8746__auto__.push((arguments[i__8740__auto___13912]));

var G__13913 = (i__8740__auto___13912 + (1));
i__8740__auto___13912 = G__13913;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13904))
;

cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13904){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13904) : cljs.core.deref.call(null,g__13575__auto___13904)),args);
});})(g__13575__auto___13904))
;

cljs.spec.impl.gen.such_that.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.such_that.cljs$lang$applyTo = ((function (g__13575__auto___13904){
return (function (seq13670){
return cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13670));
});})(g__13575__auto___13904))
;


var g__13575__auto___13920 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.tuple !== 'undefined')){
return clojure.test.check.generators.tuple;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","tuple","clojure.test.check.generators/tuple",-143711557,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","tuple","clojure.test.check.generators/tuple",-143711557,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/tuple
 */
cljs.spec.impl.gen.tuple = ((function (g__13575__auto___13920){
return (function cljs$spec$impl$gen$tuple(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13921 = arguments.length;
var i__8740__auto___13922 = (0);
while(true){
if((i__8740__auto___13922 < len__8739__auto___13921)){
args__8746__auto__.push((arguments[i__8740__auto___13922]));

var G__13923 = (i__8740__auto___13922 + (1));
i__8740__auto___13922 = G__13923;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.tuple.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13920))
;

cljs.spec.impl.gen.tuple.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13920){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13920) : cljs.core.deref.call(null,g__13575__auto___13920)),args);
});})(g__13575__auto___13920))
;

cljs.spec.impl.gen.tuple.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.tuple.cljs$lang$applyTo = ((function (g__13575__auto___13920){
return (function (seq13671){
return cljs.spec.impl.gen.tuple.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13671));
});})(g__13575__auto___13920))
;


var g__13575__auto___13924 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.sample !== 'undefined')){
return clojure.test.check.generators.sample;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","sample","clojure.test.check.generators/sample",-382944992,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","sample","clojure.test.check.generators/sample",-382944992,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/sample
 */
cljs.spec.impl.gen.sample = ((function (g__13575__auto___13924){
return (function cljs$spec$impl$gen$sample(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13925 = arguments.length;
var i__8740__auto___13926 = (0);
while(true){
if((i__8740__auto___13926 < len__8739__auto___13925)){
args__8746__auto__.push((arguments[i__8740__auto___13926]));

var G__13927 = (i__8740__auto___13926 + (1));
i__8740__auto___13926 = G__13927;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.sample.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13924))
;

cljs.spec.impl.gen.sample.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13924){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13924) : cljs.core.deref.call(null,g__13575__auto___13924)),args);
});})(g__13575__auto___13924))
;

cljs.spec.impl.gen.sample.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.sample.cljs$lang$applyTo = ((function (g__13575__auto___13924){
return (function (seq13675){
return cljs.spec.impl.gen.sample.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13675));
});})(g__13575__auto___13924))
;


var g__13575__auto___13928 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.return$ !== 'undefined')){
return clojure.test.check.generators.return$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","return","clojure.test.check.generators/return",1744522038,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","return","clojure.test.check.generators/return",1744522038,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/return
 */
cljs.spec.impl.gen.return$ = ((function (g__13575__auto___13928){
return (function cljs$spec$impl$gen$return(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13929 = arguments.length;
var i__8740__auto___13930 = (0);
while(true){
if((i__8740__auto___13930 < len__8739__auto___13929)){
args__8746__auto__.push((arguments[i__8740__auto___13930]));

var G__13931 = (i__8740__auto___13930 + (1));
i__8740__auto___13930 = G__13931;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13928))
;

cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13928){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13928) : cljs.core.deref.call(null,g__13575__auto___13928)),args);
});})(g__13575__auto___13928))
;

cljs.spec.impl.gen.return$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.return$.cljs$lang$applyTo = ((function (g__13575__auto___13928){
return (function (seq13679){
return cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13679));
});})(g__13575__auto___13928))
;


var g__13575__auto___13933 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.large_integer_STAR_ !== 'undefined')){
return clojure.test.check.generators.large_integer_STAR_;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","large-integer*","clojure.test.check.generators/large-integer*",-437830670,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","large-integer*","clojure.test.check.generators/large-integer*",-437830670,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/large-integer*
 */
cljs.spec.impl.gen.large_integer_STAR_ = ((function (g__13575__auto___13933){
return (function cljs$spec$impl$gen$large_integer_STAR_(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13934 = arguments.length;
var i__8740__auto___13936 = (0);
while(true){
if((i__8740__auto___13936 < len__8739__auto___13934)){
args__8746__auto__.push((arguments[i__8740__auto___13936]));

var G__13938 = (i__8740__auto___13936 + (1));
i__8740__auto___13936 = G__13938;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13933))
;

cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13933){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13933) : cljs.core.deref.call(null,g__13575__auto___13933)),args);
});})(g__13575__auto___13933))
;

cljs.spec.impl.gen.large_integer_STAR_.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.large_integer_STAR_.cljs$lang$applyTo = ((function (g__13575__auto___13933){
return (function (seq13689){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13689));
});})(g__13575__auto___13933))
;


var g__13575__auto___13940 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.double_STAR_ !== 'undefined')){
return clojure.test.check.generators.double_STAR_;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","double*","clojure.test.check.generators/double*",841542265,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","double*","clojure.test.check.generators/double*",841542265,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/double*
 */
cljs.spec.impl.gen.double_STAR_ = ((function (g__13575__auto___13940){
return (function cljs$spec$impl$gen$double_STAR_(var_args){
var args__8746__auto__ = [];
var len__8739__auto___13941 = arguments.length;
var i__8740__auto___13942 = (0);
while(true){
if((i__8740__auto___13942 < len__8739__auto___13941)){
args__8746__auto__.push((arguments[i__8740__auto___13942]));

var G__13943 = (i__8740__auto___13942 + (1));
i__8740__auto___13942 = G__13943;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.double_STAR_.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13575__auto___13940))
;

cljs.spec.impl.gen.double_STAR_.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13575__auto___13940){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13575__auto___13940) : cljs.core.deref.call(null,g__13575__auto___13940)),args);
});})(g__13575__auto___13940))
;

cljs.spec.impl.gen.double_STAR_.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.double_STAR_.cljs$lang$applyTo = ((function (g__13575__auto___13940){
return (function (seq13696){
return cljs.spec.impl.gen.double_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13696));
});})(g__13575__auto___13940))
;

var g__13588__auto___14013 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.any !== 'undefined')){
return clojure.test.check.generators.any;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","any","clojure.test.check.generators/any",1883743710,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","any","clojure.test.check.generators/any",1883743710,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/any
 */
cljs.spec.impl.gen.any = ((function (g__13588__auto___14013){
return (function cljs$spec$impl$gen$any(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14016 = arguments.length;
var i__8740__auto___14017 = (0);
while(true){
if((i__8740__auto___14017 < len__8739__auto___14016)){
args__8746__auto__.push((arguments[i__8740__auto___14017]));

var G__14021 = (i__8740__auto___14017 + (1));
i__8740__auto___14017 = G__14021;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.any.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14013))
;

cljs.spec.impl.gen.any.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14013){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14013) : cljs.core.deref.call(null,g__13588__auto___14013));
});})(g__13588__auto___14013))
;

cljs.spec.impl.gen.any.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.any.cljs$lang$applyTo = ((function (g__13588__auto___14013){
return (function (seq13946){
return cljs.spec.impl.gen.any.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13946));
});})(g__13588__auto___14013))
;


var g__13588__auto___14024 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.any_printable !== 'undefined')){
return clojure.test.check.generators.any_printable;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","any-printable","clojure.test.check.generators/any-printable",-1570493991,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","any-printable","clojure.test.check.generators/any-printable",-1570493991,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/any-printable
 */
cljs.spec.impl.gen.any_printable = ((function (g__13588__auto___14024){
return (function cljs$spec$impl$gen$any_printable(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14025 = arguments.length;
var i__8740__auto___14026 = (0);
while(true){
if((i__8740__auto___14026 < len__8739__auto___14025)){
args__8746__auto__.push((arguments[i__8740__auto___14026]));

var G__14027 = (i__8740__auto___14026 + (1));
i__8740__auto___14026 = G__14027;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.any_printable.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14024))
;

cljs.spec.impl.gen.any_printable.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14024){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14024) : cljs.core.deref.call(null,g__13588__auto___14024));
});})(g__13588__auto___14024))
;

cljs.spec.impl.gen.any_printable.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.any_printable.cljs$lang$applyTo = ((function (g__13588__auto___14024){
return (function (seq13953){
return cljs.spec.impl.gen.any_printable.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13953));
});})(g__13588__auto___14024))
;


var g__13588__auto___14028 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.boolean$ !== 'undefined')){
return clojure.test.check.generators.boolean$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","boolean","clojure.test.check.generators/boolean",1586992347,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","boolean","clojure.test.check.generators/boolean",1586992347,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/boolean
 */
cljs.spec.impl.gen.boolean$ = ((function (g__13588__auto___14028){
return (function cljs$spec$impl$gen$boolean(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14029 = arguments.length;
var i__8740__auto___14030 = (0);
while(true){
if((i__8740__auto___14030 < len__8739__auto___14029)){
args__8746__auto__.push((arguments[i__8740__auto___14030]));

var G__14031 = (i__8740__auto___14030 + (1));
i__8740__auto___14030 = G__14031;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.boolean$.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14028))
;

cljs.spec.impl.gen.boolean$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14028){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14028) : cljs.core.deref.call(null,g__13588__auto___14028));
});})(g__13588__auto___14028))
;

cljs.spec.impl.gen.boolean$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.boolean$.cljs$lang$applyTo = ((function (g__13588__auto___14028){
return (function (seq13955){
return cljs.spec.impl.gen.boolean$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13955));
});})(g__13588__auto___14028))
;


var g__13588__auto___14032 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char$ !== 'undefined')){
return clojure.test.check.generators.char$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","char","clojure.test.check.generators/char",-1426343459,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","char","clojure.test.check.generators/char",-1426343459,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char
 */
cljs.spec.impl.gen.char$ = ((function (g__13588__auto___14032){
return (function cljs$spec$impl$gen$char(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14039 = arguments.length;
var i__8740__auto___14040 = (0);
while(true){
if((i__8740__auto___14040 < len__8739__auto___14039)){
args__8746__auto__.push((arguments[i__8740__auto___14040]));

var G__14041 = (i__8740__auto___14040 + (1));
i__8740__auto___14040 = G__14041;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.char$.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14032))
;

cljs.spec.impl.gen.char$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14032){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14032) : cljs.core.deref.call(null,g__13588__auto___14032));
});})(g__13588__auto___14032))
;

cljs.spec.impl.gen.char$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.char$.cljs$lang$applyTo = ((function (g__13588__auto___14032){
return (function (seq13956){
return cljs.spec.impl.gen.char$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13956));
});})(g__13588__auto___14032))
;


var g__13588__auto___14048 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char_alpha !== 'undefined')){
return clojure.test.check.generators.char_alpha;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","char-alpha","clojure.test.check.generators/char-alpha",615785796,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","char-alpha","clojure.test.check.generators/char-alpha",615785796,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char-alpha
 */
cljs.spec.impl.gen.char_alpha = ((function (g__13588__auto___14048){
return (function cljs$spec$impl$gen$char_alpha(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14049 = arguments.length;
var i__8740__auto___14050 = (0);
while(true){
if((i__8740__auto___14050 < len__8739__auto___14049)){
args__8746__auto__.push((arguments[i__8740__auto___14050]));

var G__14051 = (i__8740__auto___14050 + (1));
i__8740__auto___14050 = G__14051;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.char_alpha.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14048))
;

cljs.spec.impl.gen.char_alpha.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14048){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14048) : cljs.core.deref.call(null,g__13588__auto___14048));
});})(g__13588__auto___14048))
;

cljs.spec.impl.gen.char_alpha.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.char_alpha.cljs$lang$applyTo = ((function (g__13588__auto___14048){
return (function (seq13962){
return cljs.spec.impl.gen.char_alpha.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13962));
});})(g__13588__auto___14048))
;


var g__13588__auto___14054 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char_alphanumeric !== 'undefined')){
return clojure.test.check.generators.char_alphanumeric;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","char-alphanumeric","clojure.test.check.generators/char-alphanumeric",1383091431,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","char-alphanumeric","clojure.test.check.generators/char-alphanumeric",1383091431,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char-alphanumeric
 */
cljs.spec.impl.gen.char_alphanumeric = ((function (g__13588__auto___14054){
return (function cljs$spec$impl$gen$char_alphanumeric(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14055 = arguments.length;
var i__8740__auto___14056 = (0);
while(true){
if((i__8740__auto___14056 < len__8739__auto___14055)){
args__8746__auto__.push((arguments[i__8740__auto___14056]));

var G__14057 = (i__8740__auto___14056 + (1));
i__8740__auto___14056 = G__14057;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.char_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14054))
;

cljs.spec.impl.gen.char_alphanumeric.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14054){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14054) : cljs.core.deref.call(null,g__13588__auto___14054));
});})(g__13588__auto___14054))
;

cljs.spec.impl.gen.char_alphanumeric.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.char_alphanumeric.cljs$lang$applyTo = ((function (g__13588__auto___14054){
return (function (seq13967){
return cljs.spec.impl.gen.char_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13967));
});})(g__13588__auto___14054))
;


var g__13588__auto___14058 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char_ascii !== 'undefined')){
return clojure.test.check.generators.char_ascii;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","char-ascii","clojure.test.check.generators/char-ascii",-899908538,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","char-ascii","clojure.test.check.generators/char-ascii",-899908538,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char-ascii
 */
cljs.spec.impl.gen.char_ascii = ((function (g__13588__auto___14058){
return (function cljs$spec$impl$gen$char_ascii(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14059 = arguments.length;
var i__8740__auto___14060 = (0);
while(true){
if((i__8740__auto___14060 < len__8739__auto___14059)){
args__8746__auto__.push((arguments[i__8740__auto___14060]));

var G__14061 = (i__8740__auto___14060 + (1));
i__8740__auto___14060 = G__14061;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.char_ascii.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14058))
;

cljs.spec.impl.gen.char_ascii.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14058){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14058) : cljs.core.deref.call(null,g__13588__auto___14058));
});})(g__13588__auto___14058))
;

cljs.spec.impl.gen.char_ascii.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.char_ascii.cljs$lang$applyTo = ((function (g__13588__auto___14058){
return (function (seq13973){
return cljs.spec.impl.gen.char_ascii.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13973));
});})(g__13588__auto___14058))
;


var g__13588__auto___14062 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.double$ !== 'undefined')){
return clojure.test.check.generators.double$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","double","clojure.test.check.generators/double",668331090,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","double","clojure.test.check.generators/double",668331090,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/double
 */
cljs.spec.impl.gen.double$ = ((function (g__13588__auto___14062){
return (function cljs$spec$impl$gen$double(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14063 = arguments.length;
var i__8740__auto___14064 = (0);
while(true){
if((i__8740__auto___14064 < len__8739__auto___14063)){
args__8746__auto__.push((arguments[i__8740__auto___14064]));

var G__14065 = (i__8740__auto___14064 + (1));
i__8740__auto___14064 = G__14065;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.double$.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14062))
;

cljs.spec.impl.gen.double$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14062){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14062) : cljs.core.deref.call(null,g__13588__auto___14062));
});})(g__13588__auto___14062))
;

cljs.spec.impl.gen.double$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.double$.cljs$lang$applyTo = ((function (g__13588__auto___14062){
return (function (seq13977){
return cljs.spec.impl.gen.double$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13977));
});})(g__13588__auto___14062))
;


var g__13588__auto___14073 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.int$ !== 'undefined')){
return clojure.test.check.generators.int$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","int","clojure.test.check.generators/int",1756228469,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","int","clojure.test.check.generators/int",1756228469,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/int
 */
cljs.spec.impl.gen.int$ = ((function (g__13588__auto___14073){
return (function cljs$spec$impl$gen$int(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14081 = arguments.length;
var i__8740__auto___14082 = (0);
while(true){
if((i__8740__auto___14082 < len__8739__auto___14081)){
args__8746__auto__.push((arguments[i__8740__auto___14082]));

var G__14083 = (i__8740__auto___14082 + (1));
i__8740__auto___14082 = G__14083;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.int$.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14073))
;

cljs.spec.impl.gen.int$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14073){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14073) : cljs.core.deref.call(null,g__13588__auto___14073));
});})(g__13588__auto___14073))
;

cljs.spec.impl.gen.int$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.int$.cljs$lang$applyTo = ((function (g__13588__auto___14073){
return (function (seq13978){
return cljs.spec.impl.gen.int$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13978));
});})(g__13588__auto___14073))
;


var g__13588__auto___14084 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.keyword !== 'undefined')){
return clojure.test.check.generators.keyword;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","keyword","clojure.test.check.generators/keyword",24530530,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","keyword","clojure.test.check.generators/keyword",24530530,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/keyword
 */
cljs.spec.impl.gen.keyword = ((function (g__13588__auto___14084){
return (function cljs$spec$impl$gen$keyword(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14091 = arguments.length;
var i__8740__auto___14092 = (0);
while(true){
if((i__8740__auto___14092 < len__8739__auto___14091)){
args__8746__auto__.push((arguments[i__8740__auto___14092]));

var G__14100 = (i__8740__auto___14092 + (1));
i__8740__auto___14092 = G__14100;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.keyword.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14084))
;

cljs.spec.impl.gen.keyword.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14084){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14084) : cljs.core.deref.call(null,g__13588__auto___14084));
});})(g__13588__auto___14084))
;

cljs.spec.impl.gen.keyword.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.keyword.cljs$lang$applyTo = ((function (g__13588__auto___14084){
return (function (seq13983){
return cljs.spec.impl.gen.keyword.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13983));
});})(g__13588__auto___14084))
;


var g__13588__auto___14114 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.keyword_ns !== 'undefined')){
return clojure.test.check.generators.keyword_ns;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","keyword-ns","clojure.test.check.generators/keyword-ns",-1492628482,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","keyword-ns","clojure.test.check.generators/keyword-ns",-1492628482,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/keyword-ns
 */
cljs.spec.impl.gen.keyword_ns = ((function (g__13588__auto___14114){
return (function cljs$spec$impl$gen$keyword_ns(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14115 = arguments.length;
var i__8740__auto___14116 = (0);
while(true){
if((i__8740__auto___14116 < len__8739__auto___14115)){
args__8746__auto__.push((arguments[i__8740__auto___14116]));

var G__14117 = (i__8740__auto___14116 + (1));
i__8740__auto___14116 = G__14117;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.keyword_ns.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14114))
;

cljs.spec.impl.gen.keyword_ns.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14114){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14114) : cljs.core.deref.call(null,g__13588__auto___14114));
});})(g__13588__auto___14114))
;

cljs.spec.impl.gen.keyword_ns.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.keyword_ns.cljs$lang$applyTo = ((function (g__13588__auto___14114){
return (function (seq13988){
return cljs.spec.impl.gen.keyword_ns.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13988));
});})(g__13588__auto___14114))
;


var g__13588__auto___14118 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.large_integer !== 'undefined')){
return clojure.test.check.generators.large_integer;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","large-integer","clojure.test.check.generators/large-integer",-865967138,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","large-integer","clojure.test.check.generators/large-integer",-865967138,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/large-integer
 */
cljs.spec.impl.gen.large_integer = ((function (g__13588__auto___14118){
return (function cljs$spec$impl$gen$large_integer(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14119 = arguments.length;
var i__8740__auto___14120 = (0);
while(true){
if((i__8740__auto___14120 < len__8739__auto___14119)){
args__8746__auto__.push((arguments[i__8740__auto___14120]));

var G__14121 = (i__8740__auto___14120 + (1));
i__8740__auto___14120 = G__14121;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.large_integer.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14118))
;

cljs.spec.impl.gen.large_integer.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14118){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14118) : cljs.core.deref.call(null,g__13588__auto___14118));
});})(g__13588__auto___14118))
;

cljs.spec.impl.gen.large_integer.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.large_integer.cljs$lang$applyTo = ((function (g__13588__auto___14118){
return (function (seq13990){
return cljs.spec.impl.gen.large_integer.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13990));
});})(g__13588__auto___14118))
;


var g__13588__auto___14126 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.ratio !== 'undefined')){
return clojure.test.check.generators.ratio;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","ratio","clojure.test.check.generators/ratio",1540966915,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","ratio","clojure.test.check.generators/ratio",1540966915,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/ratio
 */
cljs.spec.impl.gen.ratio = ((function (g__13588__auto___14126){
return (function cljs$spec$impl$gen$ratio(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14130 = arguments.length;
var i__8740__auto___14132 = (0);
while(true){
if((i__8740__auto___14132 < len__8739__auto___14130)){
args__8746__auto__.push((arguments[i__8740__auto___14132]));

var G__14133 = (i__8740__auto___14132 + (1));
i__8740__auto___14132 = G__14133;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.ratio.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14126))
;

cljs.spec.impl.gen.ratio.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14126){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14126) : cljs.core.deref.call(null,g__13588__auto___14126));
});})(g__13588__auto___14126))
;

cljs.spec.impl.gen.ratio.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.ratio.cljs$lang$applyTo = ((function (g__13588__auto___14126){
return (function (seq13991){
return cljs.spec.impl.gen.ratio.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13991));
});})(g__13588__auto___14126))
;


var g__13588__auto___14136 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.simple_type !== 'undefined')){
return clojure.test.check.generators.simple_type;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","simple-type","clojure.test.check.generators/simple-type",892572284,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","simple-type","clojure.test.check.generators/simple-type",892572284,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/simple-type
 */
cljs.spec.impl.gen.simple_type = ((function (g__13588__auto___14136){
return (function cljs$spec$impl$gen$simple_type(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14139 = arguments.length;
var i__8740__auto___14143 = (0);
while(true){
if((i__8740__auto___14143 < len__8739__auto___14139)){
args__8746__auto__.push((arguments[i__8740__auto___14143]));

var G__14144 = (i__8740__auto___14143 + (1));
i__8740__auto___14143 = G__14144;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.simple_type.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14136))
;

cljs.spec.impl.gen.simple_type.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14136){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14136) : cljs.core.deref.call(null,g__13588__auto___14136));
});})(g__13588__auto___14136))
;

cljs.spec.impl.gen.simple_type.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.simple_type.cljs$lang$applyTo = ((function (g__13588__auto___14136){
return (function (seq13992){
return cljs.spec.impl.gen.simple_type.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13992));
});})(g__13588__auto___14136))
;


var g__13588__auto___14145 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.simple_type_printable !== 'undefined')){
return clojure.test.check.generators.simple_type_printable;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","simple-type-printable","clojure.test.check.generators/simple-type-printable",-58489962,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","simple-type-printable","clojure.test.check.generators/simple-type-printable",-58489962,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/simple-type-printable
 */
cljs.spec.impl.gen.simple_type_printable = ((function (g__13588__auto___14145){
return (function cljs$spec$impl$gen$simple_type_printable(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14146 = arguments.length;
var i__8740__auto___14148 = (0);
while(true){
if((i__8740__auto___14148 < len__8739__auto___14146)){
args__8746__auto__.push((arguments[i__8740__auto___14148]));

var G__14149 = (i__8740__auto___14148 + (1));
i__8740__auto___14148 = G__14149;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.simple_type_printable.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14145))
;

cljs.spec.impl.gen.simple_type_printable.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14145){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14145) : cljs.core.deref.call(null,g__13588__auto___14145));
});})(g__13588__auto___14145))
;

cljs.spec.impl.gen.simple_type_printable.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.simple_type_printable.cljs$lang$applyTo = ((function (g__13588__auto___14145){
return (function (seq13993){
return cljs.spec.impl.gen.simple_type_printable.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13993));
});})(g__13588__auto___14145))
;


var g__13588__auto___14151 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.string !== 'undefined')){
return clojure.test.check.generators.string;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","string","clojure.test.check.generators/string",-1704750979,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","string","clojure.test.check.generators/string",-1704750979,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/string
 */
cljs.spec.impl.gen.string = ((function (g__13588__auto___14151){
return (function cljs$spec$impl$gen$string(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14152 = arguments.length;
var i__8740__auto___14153 = (0);
while(true){
if((i__8740__auto___14153 < len__8739__auto___14152)){
args__8746__auto__.push((arguments[i__8740__auto___14153]));

var G__14154 = (i__8740__auto___14153 + (1));
i__8740__auto___14153 = G__14154;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.string.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14151))
;

cljs.spec.impl.gen.string.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14151){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14151) : cljs.core.deref.call(null,g__13588__auto___14151));
});})(g__13588__auto___14151))
;

cljs.spec.impl.gen.string.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.string.cljs$lang$applyTo = ((function (g__13588__auto___14151){
return (function (seq13994){
return cljs.spec.impl.gen.string.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13994));
});})(g__13588__auto___14151))
;


var g__13588__auto___14155 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.string_ascii !== 'undefined')){
return clojure.test.check.generators.string_ascii;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","string-ascii","clojure.test.check.generators/string-ascii",-2009877640,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","string-ascii","clojure.test.check.generators/string-ascii",-2009877640,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/string-ascii
 */
cljs.spec.impl.gen.string_ascii = ((function (g__13588__auto___14155){
return (function cljs$spec$impl$gen$string_ascii(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14156 = arguments.length;
var i__8740__auto___14157 = (0);
while(true){
if((i__8740__auto___14157 < len__8739__auto___14156)){
args__8746__auto__.push((arguments[i__8740__auto___14157]));

var G__14158 = (i__8740__auto___14157 + (1));
i__8740__auto___14157 = G__14158;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.string_ascii.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14155))
;

cljs.spec.impl.gen.string_ascii.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14155){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14155) : cljs.core.deref.call(null,g__13588__auto___14155));
});})(g__13588__auto___14155))
;

cljs.spec.impl.gen.string_ascii.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.string_ascii.cljs$lang$applyTo = ((function (g__13588__auto___14155){
return (function (seq13995){
return cljs.spec.impl.gen.string_ascii.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13995));
});})(g__13588__auto___14155))
;


var g__13588__auto___14159 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.string_alphanumeric !== 'undefined')){
return clojure.test.check.generators.string_alphanumeric;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","string-alphanumeric","clojure.test.check.generators/string-alphanumeric",836374939,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","string-alphanumeric","clojure.test.check.generators/string-alphanumeric",836374939,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/string-alphanumeric
 */
cljs.spec.impl.gen.string_alphanumeric = ((function (g__13588__auto___14159){
return (function cljs$spec$impl$gen$string_alphanumeric(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14160 = arguments.length;
var i__8740__auto___14161 = (0);
while(true){
if((i__8740__auto___14161 < len__8739__auto___14160)){
args__8746__auto__.push((arguments[i__8740__auto___14161]));

var G__14162 = (i__8740__auto___14161 + (1));
i__8740__auto___14161 = G__14162;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.string_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14159))
;

cljs.spec.impl.gen.string_alphanumeric.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14159){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14159) : cljs.core.deref.call(null,g__13588__auto___14159));
});})(g__13588__auto___14159))
;

cljs.spec.impl.gen.string_alphanumeric.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.string_alphanumeric.cljs$lang$applyTo = ((function (g__13588__auto___14159){
return (function (seq13996){
return cljs.spec.impl.gen.string_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13996));
});})(g__13588__auto___14159))
;


var g__13588__auto___14163 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.symbol !== 'undefined')){
return clojure.test.check.generators.symbol;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","symbol","clojure.test.check.generators/symbol",-1305461065,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","symbol","clojure.test.check.generators/symbol",-1305461065,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/symbol
 */
cljs.spec.impl.gen.symbol = ((function (g__13588__auto___14163){
return (function cljs$spec$impl$gen$symbol(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14165 = arguments.length;
var i__8740__auto___14166 = (0);
while(true){
if((i__8740__auto___14166 < len__8739__auto___14165)){
args__8746__auto__.push((arguments[i__8740__auto___14166]));

var G__14173 = (i__8740__auto___14166 + (1));
i__8740__auto___14166 = G__14173;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.symbol.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14163))
;

cljs.spec.impl.gen.symbol.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14163){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14163) : cljs.core.deref.call(null,g__13588__auto___14163));
});})(g__13588__auto___14163))
;

cljs.spec.impl.gen.symbol.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.symbol.cljs$lang$applyTo = ((function (g__13588__auto___14163){
return (function (seq13997){
return cljs.spec.impl.gen.symbol.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13997));
});})(g__13588__auto___14163))
;


var g__13588__auto___14174 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.symbol_ns !== 'undefined')){
return clojure.test.check.generators.symbol_ns;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","symbol-ns","clojure.test.check.generators/symbol-ns",-862629490,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","symbol-ns","clojure.test.check.generators/symbol-ns",-862629490,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/symbol-ns
 */
cljs.spec.impl.gen.symbol_ns = ((function (g__13588__auto___14174){
return (function cljs$spec$impl$gen$symbol_ns(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14182 = arguments.length;
var i__8740__auto___14183 = (0);
while(true){
if((i__8740__auto___14183 < len__8739__auto___14182)){
args__8746__auto__.push((arguments[i__8740__auto___14183]));

var G__14184 = (i__8740__auto___14183 + (1));
i__8740__auto___14183 = G__14184;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.symbol_ns.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14174))
;

cljs.spec.impl.gen.symbol_ns.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14174){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14174) : cljs.core.deref.call(null,g__13588__auto___14174));
});})(g__13588__auto___14174))
;

cljs.spec.impl.gen.symbol_ns.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.symbol_ns.cljs$lang$applyTo = ((function (g__13588__auto___14174){
return (function (seq13998){
return cljs.spec.impl.gen.symbol_ns.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13998));
});})(g__13588__auto___14174))
;


var g__13588__auto___14185 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.uuid !== 'undefined')){
return clojure.test.check.generators.uuid;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","uuid","clojure.test.check.generators/uuid",1589373144,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(new cljs.core.Symbol("clojure.test.check.generators","uuid","clojure.test.check.generators/uuid",1589373144,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/uuid
 */
cljs.spec.impl.gen.uuid = ((function (g__13588__auto___14185){
return (function cljs$spec$impl$gen$uuid(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14186 = arguments.length;
var i__8740__auto___14187 = (0);
while(true){
if((i__8740__auto___14187 < len__8739__auto___14186)){
args__8746__auto__.push((arguments[i__8740__auto___14187]));

var G__14188 = (i__8740__auto___14187 + (1));
i__8740__auto___14187 = G__14188;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.uuid.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});})(g__13588__auto___14185))
;

cljs.spec.impl.gen.uuid.cljs$core$IFn$_invoke$arity$variadic = ((function (g__13588__auto___14185){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__13588__auto___14185) : cljs.core.deref.call(null,g__13588__auto___14185));
});})(g__13588__auto___14185))
;

cljs.spec.impl.gen.uuid.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.uuid.cljs$lang$applyTo = ((function (g__13588__auto___14185){
return (function (seq14007){
return cljs.spec.impl.gen.uuid.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq14007));
});})(g__13588__auto___14185))
;

/**
 * Returns a generator of a sequence catenated from results of
 * gens, each of which should generate something sequential.
 */
cljs.spec.impl.gen.cat = (function cljs$spec$impl$gen$cat(var_args){
var args__8746__auto__ = [];
var len__8739__auto___14193 = arguments.length;
var i__8740__auto___14194 = (0);
while(true){
if((i__8740__auto___14194 < len__8739__auto___14193)){
args__8746__auto__.push((arguments[i__8740__auto___14194]));

var G__14195 = (i__8740__auto___14194 + (1));
i__8740__auto___14194 = G__14195;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.cat.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});

cljs.spec.impl.gen.cat.cljs$core$IFn$_invoke$arity$variadic = (function (gens){
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(function (p1__14191_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,p1__14191_SHARP_);
}),cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.spec.impl.gen.tuple,gens)], 0));
});

cljs.spec.impl.gen.cat.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.cat.cljs$lang$applyTo = (function (seq14192){
return cljs.spec.impl.gen.cat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq14192));
});

cljs.spec.impl.gen.qualified_QMARK_ = (function cljs$spec$impl$gen$qualified_QMARK_(ident){
return !((cljs.core.namespace(ident) == null));
});
cljs.spec.impl.gen.gen_builtins = (new cljs.core.Delay((function (){
var simple = cljs.spec.impl.gen.simple_type_printable();
return cljs.core.PersistentHashMap.fromArrays([cljs.core.qualified_keyword_QMARK_,cljs.core.seq_QMARK_,cljs.core.vector_QMARK_,cljs.core.any_QMARK_,cljs.core.boolean_QMARK_,cljs.core.char_QMARK_,cljs.core.inst_QMARK_,cljs.core.simple_symbol_QMARK_,cljs.core.sequential_QMARK_,cljs.core.float_QMARK_,cljs.core.set_QMARK_,cljs.core.map_QMARK_,cljs.core.empty_QMARK_,cljs.core.string_QMARK_,cljs.core.double_QMARK_,cljs.core.int_QMARK_,cljs.core.associative_QMARK_,cljs.core.keyword_QMARK_,cljs.core.indexed_QMARK_,cljs.core.zero_QMARK_,cljs.core.simple_keyword_QMARK_,cljs.core.neg_int_QMARK_,cljs.core.nil_QMARK_,cljs.core.ident_QMARK_,cljs.core.qualified_ident_QMARK_,cljs.core.true_QMARK_,cljs.core.integer_QMARK_,cljs.core.nat_int_QMARK_,cljs.core.pos_int_QMARK_,cljs.core.uuid_QMARK_,cljs.core.false_QMARK_,cljs.core.list_QMARK_,cljs.core.simple_ident_QMARK_,cljs.core.number_QMARK_,cljs.core.qualified_symbol_QMARK_,cljs.core.seqable_QMARK_,cljs.core.symbol_QMARK_,cljs.core.coll_QMARK_],[cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.spec.impl.gen.qualified_QMARK_,cljs.spec.impl.gen.keyword_ns()], 0)),cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([null], 0)),cljs.spec.impl.gen.any_printable()], null)], 0)),cljs.spec.impl.gen.boolean$(),cljs.spec.impl.gen.char$(),cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((function (simple){
return (function (p1__14196_SHARP_){
return (new Date(p1__14196_SHARP_));
});})(simple))
,cljs.spec.impl.gen.large_integer()], 0)),cljs.spec.impl.gen.symbol(),cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0))], null)], 0)),cljs.spec.impl.gen.double$(),cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple,simple], 0)),cljs.spec.impl.gen.elements.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,cljs.core.List.EMPTY,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentHashSet.EMPTY], null)], 0)),cljs.spec.impl.gen.string_alphanumeric(),cljs.spec.impl.gen.double$(),cljs.spec.impl.gen.large_integer(),cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple,simple], 0)),cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0))], null)], 0)),cljs.spec.impl.gen.keyword_ns(),cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(0)], 0)),cljs.spec.impl.gen.keyword(),cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max","max",61366548),(-1)], null)], 0)),cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([null], 0)),cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.keyword_ns(),cljs.spec.impl.gen.symbol_ns()], null)], 0)),cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.spec.impl.gen.qualified_QMARK_,cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.keyword_ns(),cljs.spec.impl.gen.symbol_ns()], null)], 0))], 0)),cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([true], 0)),cljs.spec.impl.gen.large_integer(),cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"min","min",444991522),(0)], null)], 0)),cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"min","min",444991522),(1)], null)], 0)),cljs.spec.impl.gen.uuid(),cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([false], 0)),cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.keyword(),cljs.spec.impl.gen.symbol()], null)], 0)),cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.large_integer(),cljs.spec.impl.gen.double$()], null)], 0)),cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.spec.impl.gen.qualified_QMARK_,cljs.spec.impl.gen.symbol_ns()], 0)),cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([null], 0)),cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple,simple], 0)),cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.string_alphanumeric()], null)], 0)),cljs.spec.impl.gen.symbol_ns(),cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple,simple], 0)),cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0))], null)], 0))]);
}),null));
/**
 * Given a predicate, returns a built-in generator if one exists.
 */
cljs.spec.impl.gen.gen_for_pred = (function cljs$spec$impl$gen$gen_for_pred(pred){
if(cljs.core.set_QMARK_(pred)){
return cljs.spec.impl.gen.elements.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([pred], 0));
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.spec.impl.gen.gen_builtins) : cljs.core.deref.call(null,cljs.spec.impl.gen.gen_builtins)),pred);
}
});
