// Compiled by ClojureScript 1.9.293 {:static-fns true, :optimize-constants false, :target :nodejs}
goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__17997__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(args));
};
var G__17997 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__17998__i = 0, G__17998__a = new Array(arguments.length -  0);
while (G__17998__i < G__17998__a.length) {G__17998__a[G__17998__i] = arguments[G__17998__i + 0]; ++G__17998__i;}
  args = new cljs.core.IndexedSeq(G__17998__a,0);
} 
return G__17997__delegate.call(this,args);};
G__17997.cljs$lang$maxFixedArity = 0;
G__17997.cljs$lang$applyTo = (function (arglist__18011){
var args = cljs.core.seq(arglist__18011);
return G__17997__delegate(args);
});
G__17997.cljs$core$IFn$_invoke$arity$variadic = G__17997__delegate;
return G__17997;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__18012__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(args));
};
var G__18012 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__18013__i = 0, G__18013__a = new Array(arguments.length -  0);
while (G__18013__i < G__18013__a.length) {G__18013__a[G__18013__i] = arguments[G__18013__i + 0]; ++G__18013__i;}
  args = new cljs.core.IndexedSeq(G__18013__a,0);
} 
return G__18012__delegate.call(this,args);};
G__18012.cljs$lang$maxFixedArity = 0;
G__18012.cljs$lang$applyTo = (function (arglist__18014){
var args = cljs.core.seq(arglist__18014);
return G__18012__delegate(args);
});
G__18012.cljs$core$IFn$_invoke$arity$variadic = G__18012__delegate;
return G__18012;
})()
;

return null;
});
