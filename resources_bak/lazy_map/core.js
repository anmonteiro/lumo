// Compiled by ClojureScript 1.9.293 {:static-fns true, :optimize-constants false, :target :nodejs}
goog.provide('lazy_map.core');
goog.require('cljs.core');
goog.require('cljs.core');

/**
 * Hold a value.
 * @interface
 */
lazy_map.core.Holder = function(){};

/**
 * Return object, resolving it if delayed.
 */
lazy_map.core.getv = (function lazy_map$core$getv(a){
if((!((a == null))) && (!((a.lazy_map$core$Holder$getv$arity$1 == null)))){
return a.lazy_map$core$Holder$getv$arity$1(a);
} else {
var x__8236__auto__ = (((a == null))?null:a);
var m__8237__auto__ = (lazy_map.core.getv[goog.typeOf(x__8236__auto__)]);
if(!((m__8237__auto__ == null))){
return (m__8237__auto__.cljs$core$IFn$_invoke$arity$1 ? m__8237__auto__.cljs$core$IFn$_invoke$arity$1(a) : m__8237__auto__.call(null,a));
} else {
var m__8237__auto____$1 = (lazy_map.core.getv["_"]);
if(!((m__8237__auto____$1 == null))){
return (m__8237__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__8237__auto____$1.cljs$core$IFn$_invoke$arity$1(a) : m__8237__auto____$1.call(null,a));
} else {
throw cljs.core.missing_protocol("Holder.getv",a);
}
}
}
});

(lazy_map.core.Holder["object"] = true);

(lazy_map.core.getv["object"] = (function (a){
return a;
}));

(lazy_map.core.Holder["number"] = true);

(lazy_map.core.getv["number"] = (function (a){
return a;
}));

(lazy_map.core.Holder["boolean"] = true);

(lazy_map.core.getv["boolean"] = (function (a){
return a;
}));

(lazy_map.core.Holder["string"] = true);

(lazy_map.core.getv["string"] = (function (a){
return a;
}));

(lazy_map.core.Holder["null"] = true);

(lazy_map.core.getv["null"] = (function (a){
return a;
}));

cljs.core.Delay.prototype.lazy_map$core$Holder$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.Delay.prototype.lazy_map$core$Holder$getv$arity$1 = (function (a){
var a__$1 = this;
return cljs.core.force(a__$1);
});

/**
* @constructor
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.IEmptyableCollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
lazy_map.core.LazyMap = (function (contents){
this.contents = contents;
this.cljs$lang$protocol_mask$partition0$ = 2157971214;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
lazy_map.core.LazyMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (_,k){
var self__ = this;
var ___$1 = this;
return lazy_map.core.getv(cljs.core._lookup.cljs$core$IFn$_invoke$arity$2(self__.contents,k));
});

lazy_map.core.LazyMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (_,k,not_found){
var self__ = this;
var ___$1 = this;
return lazy_map.core.getv(cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(self__.contents,k,not_found));
});

lazy_map.core.LazyMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (_,writer,opts){
var self__ = this;
var ___$1 = this;
return cljs.core._pr_writer(self__.contents,writer,opts);
});

lazy_map.core.LazyMap.prototype.cljs$core$IIterable$ = cljs.core.PROTOCOL_SENTINEL;

lazy_map.core.LazyMap.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core._iterator(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (this$__$1){
return (function (p__13543){
var vec__13544 = p__13543;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13544,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13544,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,lazy_map.core.getv(v)], null);
});})(this$__$1))
,self__.contents)));
});

lazy_map.core.LazyMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core._count(self__.contents);
});

lazy_map.core.LazyMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (_,other){
var self__ = this;
var ___$1 = this;
return cljs.core._equiv(self__.contents,other);
});

lazy_map.core.LazyMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core._empty(self__.contents);
});

lazy_map.core.LazyMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (_,k){
var self__ = this;
var ___$1 = this;
return (new lazy_map.core.LazyMap(cljs.core._dissoc(self__.contents,k)));
});

lazy_map.core.LazyMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (_,k,v){
var self__ = this;
var ___$1 = this;
return (new lazy_map.core.LazyMap(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.contents,k,v)));
});

lazy_map.core.LazyMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (_,k){
var self__ = this;
var ___$1 = this;
return cljs.core._contains_key_QMARK_(self__.contents,k);
});

lazy_map.core.LazyMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core._seq(self__.contents);
});

lazy_map.core.LazyMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (_,o){
var self__ = this;
var ___$1 = this;
return cljs.core._conj(self__.contents,o);
});

lazy_map.core.LazyMap.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"contents","contents",73357504,null)], null);
});

lazy_map.core.LazyMap.cljs$lang$type = true;

lazy_map.core.LazyMap.cljs$lang$ctorStr = "lazy-map.core/LazyMap";

lazy_map.core.LazyMap.cljs$lang$ctorPrWriter = (function (this__8175__auto__,writer__8176__auto__,opt__8177__auto__){
return cljs.core._write(writer__8176__auto__,"lazy-map.core/LazyMap");
});

lazy_map.core.__GT_LazyMap = (function lazy_map$core$__GT_LazyMap(contents){
return (new lazy_map.core.LazyMap(contents));
});

