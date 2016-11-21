// Compiled by ClojureScript 1.9.293 {:static-fns true, :optimize-constants false, :target :nodejs}
goog.provide('lumo.js_deps');
goog.require('cljs.core');
goog.require('cljs.tools.reader');
if(typeof lumo.js_deps.foreign_libs_index !== 'undefined'){
} else {
lumo.js_deps.foreign_libs_index = cljs.core.volatile_BANG_(cljs.core.PersistentArrayMap.EMPTY);
}
lumo.js_deps.foreign_lib_QMARK_ = (function lumo$js_deps$foreign_lib_QMARK_(dep){
return cljs.core.contains_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.js_deps.foreign_libs_index) : cljs.core.deref.call(null,lumo.js_deps.foreign_libs_index)),dep);
});
lumo.js_deps.add_foreign_lib = (function lumo$js_deps$add_foreign_lib(index,p__14494){
var map__14499 = p__14494;
var map__14499__$1 = ((((!((map__14499 == null)))?((((map__14499.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14499.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14499):map__14499);
var foreign_lib = map__14499__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14499__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (map__14499,map__14499__$1,foreign_lib,provides){
return (function (index__$1,lib){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(index__$1,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(lib),foreign_lib);
});})(map__14499,map__14499__$1,foreign_lib,provides))
,index,provides);
});
lumo.js_deps.index_foreign_libs = (function lumo$js_deps$index_foreign_libs(index,libs){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (index__$1,lib){
return lumo.js_deps.add_foreign_lib(index__$1,lib);
}),index,libs);
});
lumo.js_deps.index_upstream_foreign_libs = (function lumo$js_deps$index_upstream_foreign_libs(){
var seq__14525 = cljs.core.seq(LUMO_LOAD_UPS_DEPS_CLJS());
var chunk__14526 = null;
var count__14527 = (0);
var i__14528 = (0);
while(true){
if((i__14528 < count__14527)){
var deps_cljs_str = chunk__14526.cljs$core$IIndexed$_nth$arity$2(null,i__14528);
var map__14529_14541 = cljs.tools.reader.read_string.cljs$core$IFn$_invoke$arity$1(deps_cljs_str);
var map__14529_14542__$1 = ((((!((map__14529_14541 == null)))?((((map__14529_14541.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14529_14541.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14529_14541):map__14529_14541);
var foreign_libs_14543 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14529_14542__$1,new cljs.core.Keyword(null,"foreign-libs","foreign-libs",805847831));
cljs.core._vreset_BANG_(lumo.js_deps.foreign_libs_index,lumo.js_deps.index_foreign_libs(cljs.core._deref(lumo.js_deps.foreign_libs_index),foreign_libs_14543));

var G__14547 = seq__14525;
var G__14548 = chunk__14526;
var G__14549 = count__14527;
var G__14550 = (i__14528 + (1));
seq__14525 = G__14547;
chunk__14526 = G__14548;
count__14527 = G__14549;
i__14528 = G__14550;
continue;
} else {
var temp__6753__auto__ = cljs.core.seq(seq__14525);
if(temp__6753__auto__){
var seq__14525__$1 = temp__6753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__14525__$1)){
var c__8429__auto__ = cljs.core.chunk_first(seq__14525__$1);
var G__14554 = cljs.core.chunk_rest(seq__14525__$1);
var G__14555 = c__8429__auto__;
var G__14556 = cljs.core.count(c__8429__auto__);
var G__14557 = (0);
seq__14525 = G__14554;
chunk__14526 = G__14555;
count__14527 = G__14556;
i__14528 = G__14557;
continue;
} else {
var deps_cljs_str = cljs.core.first(seq__14525__$1);
var map__14535_14559 = cljs.tools.reader.read_string.cljs$core$IFn$_invoke$arity$1(deps_cljs_str);
var map__14535_14560__$1 = ((((!((map__14535_14559 == null)))?((((map__14535_14559.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14535_14559.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14535_14559):map__14535_14559);
var foreign_libs_14561 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14535_14560__$1,new cljs.core.Keyword(null,"foreign-libs","foreign-libs",805847831));
cljs.core._vreset_BANG_(lumo.js_deps.foreign_libs_index,lumo.js_deps.index_foreign_libs(cljs.core._deref(lumo.js_deps.foreign_libs_index),foreign_libs_14561));

var G__14564 = cljs.core.next(seq__14525__$1);
var G__14565 = null;
var G__14566 = (0);
var G__14567 = (0);
seq__14525 = G__14564;
chunk__14526 = G__14565;
count__14527 = G__14566;
i__14528 = G__14567;
continue;
}
} else {
return null;
}
}
break;
}
});
lumo.js_deps.topo_sort = (function lumo$js_deps$topo_sort(index,dep){
var ret = cljs.core.List.EMPTY;
var s = cljs.core.PersistentHashSet.fromArray([dep], true);
while(true){
if(cljs.core.empty_QMARK_(s)){
return cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(ret);
} else {
var dep__$1 = cljs.core.first(s);
var requires = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.symbol,new cljs.core.Keyword(null,"requires","requires",-1201390927).cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(index,dep__$1)));
var G__14582 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,dep__$1);
var G__14583 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.rest(s)),requires);
ret = G__14582;
s = G__14583;
continue;
}
break;
}
});
lumo.js_deps.files_to_load = (function lumo$js_deps$files_to_load(dep){
var index = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.js_deps.foreign_libs_index) : cljs.core.deref.call(null,lumo.js_deps.foreign_libs_index));
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"file","file",-1269645878),index),lumo.js_deps.topo_sort(index,dep));
});
