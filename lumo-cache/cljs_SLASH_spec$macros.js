goog.provide("cljs.spec$macros");
if(typeof cljs.spec$macros.registry_ref !== 'undefined'){
} else {
(function (){
cljs.spec$macros.registry_ref = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY); return (
new cljs.core.Var(function(){return cljs.spec$macros.registry_ref;},new cljs.core.Symbol("cljs.spec$macros","registry-ref","cljs.spec$macros/registry-ref",(1131105177),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"registry-ref","registry-ref",(1975823941),null),"cljs/spec.cljc",(22),(1),(19),(19),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.spec$macros.registry_ref)?cljs.spec$macros.registry_ref.cljs$lang$test:null)])));})()
;
}
/**
 * Returns a symbol from a symbol or var
 */
(function (){
cljs.spec$macros.__GT_sym = (function cljs$spec$macros$__GT_sym(x){
if(cljs.core.map_QMARK_.call(null,x)){
return new cljs.core.Keyword(null,"name","name",(1843675177)).cljs$core$IFn$_invoke$arity$1(x);
} else {
return x;
}
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.__GT_sym;},new cljs.core.Symbol("cljs.spec$macros","->sym","cljs.spec$macros/->sym",(-132758142),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"->sym","->sym",(696606926),null),"cljs/spec.cljc",(13),(1),(21),(21),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",(-555367584),null)], null)),"Returns a symbol from a symbol or var",(cljs.core.truth_(cljs.spec$macros.__GT_sym)?cljs.spec$macros.__GT_sym.cljs$lang$test:null)])));})()
;
(function (){
cljs.spec$macros.unfn = (function cljs$spec$macros$unfn(expr){
if((cljs.core.seq_QMARK_.call(null,expr)) && ((cljs.core.first.call(null,expr) instanceof cljs.core.Symbol)) && (cljs.core._EQ_.call(null,"fn*",cljs.core.name.call(null,cljs.core.first.call(null,expr))))){
var vec__53 = cljs.core.rest.call(null,expr);
var seq__54 = cljs.core.seq.call(null,vec__53);
var first__55 = cljs.core.first.call(null,seq__54);
var seq__54__$1 = cljs.core.next.call(null,seq__54);
var vec__56 = first__55;
var s = cljs.core.nth.call(null,vec__56,(0),null);
var form = seq__54__$1;
return cljs.core.conj.call(null,clojure.walk.postwalk_replace.call(null,cljs.core.PersistentArrayMap.fromArray([s,new cljs.core.Symbol(null,"%","%",(-950237169),null)], true, false),form),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",(-950237169),null)], null),new cljs.core.Symbol(null,"fn","fn",(465265323),null));
} else {
return expr;
}
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.unfn;},new cljs.core.Symbol("cljs.spec$macros","unfn","cljs.spec$macros/unfn",(365324210),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"unfn","unfn",(-464043674),null),"cljs/spec.cljc",(12),(1),(28),(28),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"expr","expr",(-1908713478),null)], null)),null,(cljs.core.truth_(cljs.spec$macros.unfn)?cljs.spec$macros.unfn.cljs$lang$test:null)])));})()
;
(function (){
cljs.spec$macros.res = (function cljs$spec$macros$res(env,form){
if((form instanceof cljs.core.Keyword)){
return form;
} else {
if((form instanceof cljs.core.Symbol)){
var or__21647__auto__ = cljs.spec$macros.__GT_sym.call(null,cljs.analyzer.api.resolve.call(null,env,form));
if(cljs.core.truth_(or__21647__auto__)){
return or__21647__auto__;
} else {
return form;
}
} else {
if(cljs.core.sequential_QMARK_.call(null,form)){
return clojure.walk.postwalk.call(null,(function (p1__3_SHARP_){
if((p1__3_SHARP_ instanceof cljs.core.Symbol)){
return cljs.spec$macros.res.call(null,env,p1__3_SHARP_);
} else {
return p1__3_SHARP_;
}
}),cljs.spec$macros.unfn.call(null,form));
} else {
return form;

}
}
}
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.res;},new cljs.core.Symbol("cljs.spec$macros","res","cljs.spec$macros/res",(-599959284),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"res","res",(245523648),null),"cljs/spec.cljc",(11),(1),(36),(36),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"env","env",(-175281708),null),new cljs.core.Symbol(null,"form","form",(16469056),null)], null)),null,(cljs.core.truth_(cljs.spec$macros.res)?cljs.spec$macros.res.cljs$lang$test:null)])));})()
;
/**
 * Qualify symbol s by resolving it or using the current *ns*.
 */
(function (){
cljs.spec$macros.ns_qualify = (function cljs$spec$macros$ns_qualify(env,s){
if(cljs.core.truth_(cljs.core.namespace.call(null,s))){
var v = cljs.analyzer.api.resolve.call(null,env,s);
if(cljs.core.truth_(v)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("Unable to resolve: "),cljs.core.str(s)].join('')),cljs.core.str("\n"),cljs.core.str("v")].join('')));
}

return cljs.spec$macros.__GT_sym.call(null,v);
} else {
return cljs.core.symbol.call(null,[cljs.core.str(cljs.analyzer._STAR_cljs_ns_STAR_)].join(''),[cljs.core.str(s)].join(''));
}
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.ns_qualify;},new cljs.core.Symbol("cljs.spec$macros","ns-qualify","cljs.spec$macros/ns-qualify",(880985498),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"ns-qualify","ns-qualify",(1165093718),null),"cljs/spec.cljc",(18),(1),(43),(43),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"env","env",(-175281708),null),new cljs.core.Symbol(null,"s","s",(-948495851),null)], null)),"Qualify symbol s by resolving it or using the current *ns*.",(cljs.core.truth_(cljs.spec$macros.ns_qualify)?cljs.spec$macros.ns_qualify.cljs$lang$test:null)])));})()
;
/**
 * Given a namespace-qualified keyword or resolveable symbol k, and a spec,
 * spec-name, predicate or regex-op makes an entry in the registry mapping k to
 * the spec
 */
(function (){
cljs.spec$macros.def = (function cljs$spec$macros$def(_AMPERSAND_form,_AMPERSAND_env,k,spec_form){
var k__$1 = (((k instanceof cljs.core.Symbol))?cljs.spec$macros.ns_qualify.call(null,_AMPERSAND_env,k):k);
var form = cljs.spec$macros.res.call(null,_AMPERSAND_env,spec_form);
cljs.core.swap_BANG_.call(null,cljs.spec$macros.registry_ref,cljs.core.assoc,k__$1,form);

return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","def-impl","cljs.spec/def-impl",(2098881912),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = k__$1;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = form;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = spec_form;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.def;},new cljs.core.Symbol("cljs.spec$macros","def","cljs.spec$macros/def",(-773577109),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"def","def",(597100991),null),"cljs/spec.cljc",(14),(1),(52),true,(52),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"k","k",(-505765866),null),new cljs.core.Symbol(null,"spec-form","spec-form",(-871386429),null)], null)),"Given a namespace-qualified keyword or resolveable symbol k, and a spec,\n   spec-name, predicate or regex-op makes an entry in the registry mapping k to\n   the spec",(cljs.core.truth_(cljs.spec$macros.def)?cljs.spec$macros.def.cljs$lang$test:null)])));})()
;

cljs.spec$macros.def.cljs$lang$macro = true;
/**
 * Takes a single predicate form, e.g. can be the name of a predicate,
 *   like even?, or a fn literal like #(< % 42). Note that it is not
 *   generally necessary to wrap predicates in spec when using the rest
 *   of the spec macros, only to attach a unique generator
 * 
 *   Can also be passed the result of one of the regex ops -
 *   cat, alt, *, +, ?, in which case it will return a regex-conforming
 *   spec, useful when nesting an independent regex.
 *   ---
 * 
 *   Optionally takes :gen generator-fn, which must be a fn of no args that
 *   returns a test.check generator.
 * 
 *   Returns a spec.
 */
(function (){
cljs.spec$macros.spec = (function cljs$spec$macros$spec(var_args){
var args__23665__auto__ = [];
var len__23663__auto___66 = arguments.length;
var i__23664__auto___67 = (0);
while(true){
if((i__23664__auto___67 < len__23663__auto___66)){
args__23665__auto__.push((arguments[i__23664__auto___67]));

var G__68 = (i__23664__auto___67 + (1));
i__23664__auto___67 = G__68;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((3) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((3)),(0),null)):null);
return cljs.spec$macros.spec.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.spec;},new cljs.core.Symbol("cljs.spec$macros","spec","cljs.spec$macros/spec",(552362252),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"spec","spec",(1988051928),null),"cljs/spec.cljc",(15),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"form","form",(16469056),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"form","form",(16469056),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(62),true,(62),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"form","form",(16469056),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null)], null)),"Takes a single predicate form, e.g. can be the name of a predicate,\n  like even?, or a fn literal like #(< % 42). Note that it is not\n  generally necessary to wrap predicates in spec when using the rest\n  of the spec macros, only to attach a unique generator\n\n  Can also be passed the result of one of the regex ops -\n  cat, alt, *, +, ?, in which case it will return a regex-conforming\n  spec, useful when nesting an independent regex.\n  ---\n\n  Optionally takes :gen generator-fn, which must be a fn of no args that\n  returns a test.check generator.\n\n  Returns a spec.",(cljs.core.truth_(cljs.spec$macros.spec)?cljs.spec$macros.spec.cljs$lang$test:null)])));})()
;

cljs.spec$macros.spec.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,form,p__63){
var map__64 = p__63;
var map__64__$1 = ((((!((map__64 == null)))?((((map__64.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__64.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__64):map__64);
var gen = cljs.core.get.call(null,map__64__$1,new cljs.core.Keyword(null,"gen","gen",(142575302)));
if(cljs.core.truth_(form)){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","spec-impl","cljs.spec/spec-impl",(-1647407472),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = cljs.spec$macros.res.call(null,_AMPERSAND_env,form);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = form;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = gen;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,null)));
} else {
return null;
}
});

cljs.spec$macros.spec.cljs$lang$maxFixedArity = (3);

cljs.spec$macros.spec.cljs$lang$applyTo = (function (seq59){
var G__60 = cljs.core.first.call(null,seq59);
var seq59__$1 = cljs.core.next.call(null,seq59);
var G__61 = cljs.core.first.call(null,seq59__$1);
var seq59__$2 = cljs.core.next.call(null,seq59__$1);
var G__62 = cljs.core.first.call(null,seq59__$2);
var seq59__$3 = cljs.core.next.call(null,seq59__$2);
return cljs.spec$macros.spec.cljs$core$IFn$_invoke$arity$variadic(G__60,G__61,G__62,seq59__$3);
});

new cljs.core.Var(function(){return cljs.spec$macros.spec;},new cljs.core.Symbol("cljs.spec$macros","spec","cljs.spec$macros/spec",(552362252),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"spec","spec",(1988051928),null),"cljs/spec.cljc",(15),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"form","form",(16469056),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"form","form",(16469056),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(62),true,(62),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"form","form",(16469056),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null)], null)),"Takes a single predicate form, e.g. can be the name of a predicate,\n  like even?, or a fn literal like #(< % 42). Note that it is not\n  generally necessary to wrap predicates in spec when using the rest\n  of the spec macros, only to attach a unique generator\n\n  Can also be passed the result of one of the regex ops -\n  cat, alt, *, +, ?, in which case it will return a regex-conforming\n  spec, useful when nesting an independent regex.\n  ---\n\n  Optionally takes :gen generator-fn, which must be a fn of no args that\n  returns a test.check generator.\n\n  Returns a spec.",(cljs.core.truth_(cljs.spec$macros.spec)?cljs.spec$macros.spec.cljs$lang$test:null)]));

cljs.spec$macros.spec.cljs$lang$macro = true;
/**
 * Takes the name of a spec/predicate-returning multimethod and a
 *   tag-restoring keyword or fn (retag).  Returns a spec that when
 *   conforming or explaining data will pass it to the multimethod to get
 *   an appropriate spec. You can e.g. use multi-spec to dynamically and
 *   extensibly associate specs with 'tagged' data (i.e. data where one
 *   of the fields indicates the shape of the rest of the structure).
 * 
 *   (defmulti mspec :tag)
 * 
 *   The methods should ignore their argument and return a predicate/spec:
 *   (defmethod mspec :int [_] (s/keys :req-un [::tag ::i]))
 * 
 *   retag is used during generation to retag generated values with
 *   matching tags. retag can either be a keyword, at which key the
 *   dispatch-tag will be assoc'ed, or a fn of generated value and
 *   dispatch-tag that should return an appropriately retagged value.
 * 
 *   Note that because the tags themselves comprise an open set,
 *   the tag key spec cannot enumerate the values, but can e.g.
 *   test for keyword?.
 * 
 *   Note also that the dispatch values of the multimethod will be
 *   included in the path, i.e. in reporting and gen overrides, even
 *   though those values are not evident in the spec.
 */
(function (){
cljs.spec$macros.multi_spec = (function cljs$spec$macros$multi_spec(_AMPERSAND_form,_AMPERSAND_env,mm,retag){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","multi-spec-impl","cljs.spec/multi-spec-impl",(1001154684),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = cljs.spec$macros.res.call(null,_AMPERSAND_env,mm);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"var","var",(870848730),null)),(function (){var x__23406__auto__ = mm;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = retag;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.multi_spec;},new cljs.core.Symbol("cljs.spec$macros","multi-spec","cljs.spec$macros/multi-spec",(2138429287),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"multi-spec","multi-spec",(-1379716045),null),"cljs/spec.cljc",(21),(1),(81),true,(81),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"mm","mm",(-12319033),null),new cljs.core.Symbol(null,"retag","retag",(528972725),null)], null)),"Takes the name of a spec/predicate-returning multimethod and a\n  tag-restoring keyword or fn (retag).  Returns a spec that when\n  conforming or explaining data will pass it to the multimethod to get\n  an appropriate spec. You can e.g. use multi-spec to dynamically and\n  extensibly associate specs with 'tagged' data (i.e. data where one\n  of the fields indicates the shape of the rest of the structure).\n\n  (defmulti mspec :tag)\n\n  The methods should ignore their argument and return a predicate/spec:\n  (defmethod mspec :int [_] (s/keys :req-un [::tag ::i]))\n\n  retag is used during generation to retag generated values with\n  matching tags. retag can either be a keyword, at which key the\n  dispatch-tag will be assoc'ed, or a fn of generated value and\n  dispatch-tag that should return an appropriately retagged value.\n\n  Note that because the tags themselves comprise an open set,\n  the tag key spec cannot enumerate the values, but can e.g.\n  test for keyword?.\n\n  Note also that the dispatch values of the multimethod will be\n  included in the path, i.e. in reporting and gen overrides, even\n  though those values are not evident in the spec.\n",(cljs.core.truth_(cljs.spec$macros.multi_spec)?cljs.spec$macros.multi_spec.cljs$lang$test:null)])));})()
;

cljs.spec$macros.multi_spec.cljs$lang$macro = true;
/**
 * Creates and returns a map validating spec. :req and :opt are both
 *   vectors of namespaced-qualified keywords. The validator will ensure
 *   the :req keys are present. The :opt keys serve as documentation and
 *   may be used by the generator.
 * 
 *   The :req key vector supports 'and' and 'or' for key groups:
 * 
 *   (s/keys :req [::x ::y (or ::secret (and ::user ::pwd))] :opt [::z])
 * 
 *   There are also -un versions of :req and :opt. These allow
 *   you to connect unqualified keys to specs.  In each case, fully
 *   qualfied keywords are passed, which name the specs, but unqualified
 *   keys (with the same name component) are expected and checked at
 *   conform-time, and generated during gen:
 * 
 *   (s/keys :req-un [:my.ns/x :my.ns/y])
 * 
 *   The above says keys :x and :y are required, and will be validated
 *   and generated by specs (if they exist) named :my.ns/x :my.ns/y
 *   respectively.
 * 
 *   In addition, the values of *all* namespace-qualified keys will be validated
 *   (and possibly destructured) by any registered specs. Note: there is
 *   no support for inline value specification, by design.
 * 
 *   Optionally takes :gen generator-fn, which must be a fn of no args that
 *   returns a test.check generator.
 */
(function (){
cljs.spec$macros.keys = (function cljs$spec$macros$keys(var_args){
var args__23665__auto__ = [];
var len__23663__auto___75 = arguments.length;
var i__23664__auto___76 = (0);
while(true){
if((i__23664__auto___76 < len__23663__auto___75)){
args__23665__auto__.push((arguments[i__23664__auto___76]));

var G__77 = (i__23664__auto___76 + (1));
i__23664__auto___76 = G__77;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((2) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((2)),(0),null)):null);
return cljs.spec$macros.keys.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.keys;},new cljs.core.Symbol("cljs.spec$macros","keys","cljs.spec$macros/keys",(-553235059),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"keys","keys",(-1586012071),null),"cljs/spec.cljc",(15),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"req","req",(1314083224),null),new cljs.core.Symbol(null,"req-un","req-un",(-1579864761),null),new cljs.core.Symbol(null,"opt","opt",(845825158),null),new cljs.core.Symbol(null,"opt-un","opt-un",(-1770993273),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"req","req",(1314083224),null),new cljs.core.Symbol(null,"req-un","req-un",(-1579864761),null),new cljs.core.Symbol(null,"opt","opt",(845825158),null),new cljs.core.Symbol(null,"opt-un","opt-un",(-1770993273),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(110),true,(110),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"req","req",(1314083224),null),new cljs.core.Symbol(null,"req-un","req-un",(-1579864761),null),new cljs.core.Symbol(null,"opt","opt",(845825158),null),new cljs.core.Symbol(null,"opt-un","opt-un",(-1770993273),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null)], null)),"Creates and returns a map validating spec. :req and :opt are both\n  vectors of namespaced-qualified keywords. The validator will ensure\n  the :req keys are present. The :opt keys serve as documentation and\n  may be used by the generator.\n\n  The :req key vector supports 'and' and 'or' for key groups:\n\n  (s/keys :req [::x ::y (or ::secret (and ::user ::pwd))] :opt [::z])\n\n  There are also -un versions of :req and :opt. These allow\n  you to connect unqualified keys to specs.  In each case, fully\n  qualfied keywords are passed, which name the specs, but unqualified\n  keys (with the same name component) are expected and checked at\n  conform-time, and generated during gen:\n\n  (s/keys :req-un [:my.ns/x :my.ns/y])\n\n  The above says keys :x and :y are required, and will be validated\n  and generated by specs (if they exist) named :my.ns/x :my.ns/y\n  respectively.\n\n  In addition, the values of *all* namespace-qualified keys will be validated\n  (and possibly destructured) by any registered specs. Note: there is\n  no support for inline value specification, by design.\n\n  Optionally takes :gen generator-fn, which must be a fn of no args that\n  returns a test.check generator.",(cljs.core.truth_(cljs.spec$macros.keys)?cljs.spec$macros.keys.cljs$lang$test:null)])));})()
;

cljs.spec$macros.keys.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,p__72){
var map__73 = p__72;
var map__73__$1 = ((((!((map__73 == null)))?((((map__73.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__73.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__73):map__73);
var opt = cljs.core.get.call(null,map__73__$1,new cljs.core.Keyword(null,"opt","opt",(-794706369)));
var req_un = cljs.core.get.call(null,map__73__$1,new cljs.core.Keyword(null,"req-un","req-un",(1074571008)));
var opt_un = cljs.core.get.call(null,map__73__$1,new cljs.core.Keyword(null,"opt-un","opt-un",(883442496)));
var gen = cljs.core.get.call(null,map__73__$1,new cljs.core.Keyword(null,"gen","gen",(142575302)));
var req = cljs.core.get.call(null,map__73__$1,new cljs.core.Keyword(null,"req","req",(-326448303)));
var unk = ((function (map__73,map__73__$1,opt,req_un,opt_un,gen,req){
return (function (p1__4_SHARP_){
return cljs.core.keyword.call(null,cljs.core.name.call(null,p1__4_SHARP_));
});})(map__73,map__73__$1,opt,req_un,opt_un,gen,req))
;
var req_keys = cljs.core.filterv.call(null,cljs.core.keyword_QMARK_,cljs.core.flatten.call(null,req));
var req_un_specs = cljs.core.filterv.call(null,cljs.core.keyword_QMARK_,cljs.core.flatten.call(null,req_un));
var _ = ((cljs.core.every_QMARK_.call(null,((function (unk,req_keys,req_un_specs,map__73,map__73__$1,opt,req_un,opt_un,gen,req){
return (function (p1__5_SHARP_){
var and__21620__auto__ = (p1__5_SHARP_ instanceof cljs.core.Keyword);
if(and__21620__auto__){
return cljs.core.namespace.call(null,p1__5_SHARP_);
} else {
return and__21620__auto__;
}
});})(unk,req_keys,req_un_specs,map__73,map__73__$1,opt,req_un,opt_un,gen,req))
,cljs.core.concat.call(null,req_keys,req_un_specs,opt,opt_un)))?null:(function(){throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("all keys must be namespace-qualified keywords"),cljs.core.str("\n"),cljs.core.str("(every? (fn* [p1__5#] (clojure.core/and (keyword? p1__5#) (namespace p1__5#))) (concat req-keys req-un-specs opt opt-un))")].join('')))})());
var req_specs = cljs.core.into.call(null,req_keys,req_un_specs);
var req_keys__$1 = cljs.core.into.call(null,req_keys,cljs.core.map.call(null,unk,req_un_specs));
var opt_keys = cljs.core.into.call(null,cljs.core.vec.call(null,opt),cljs.core.map.call(null,unk,opt_un));
var opt_specs = cljs.core.into.call(null,cljs.core.vec.call(null,opt),opt_un);
var parse_req = ((function (unk,req_keys,req_un_specs,_,req_specs,req_keys__$1,opt_keys,opt_specs,map__73,map__73__$1,opt,req_un,opt_un,gen,req){
return (function (rk,f){
return cljs.core.map.call(null,((function (unk,req_keys,req_un_specs,_,req_specs,req_keys__$1,opt_keys,opt_specs,map__73,map__73__$1,opt,req_un,opt_un,gen,req){
return (function (x){
if((x instanceof cljs.core.Keyword)){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"fn*","fn*",(-752876845),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"p1__6__7__auto__","p1__6__7__auto__",(-1120872060),null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",(-976526835),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"p1__6__7__auto__","p1__6__7__auto__",(-1120872060),null)),(function (){var x__23406__auto__ = f.call(null,x);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
} else {
var gx = cljs.core.gensym.call(null);
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"fn*","fn*",(-752876845),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(function (){var x__23406__auto__ = gx;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = clojure.walk.postwalk.call(null,((function (gx,unk,req_keys,req_un_specs,_,req_specs,req_keys__$1,opt_keys,opt_specs,map__73,map__73__$1,opt,req_un,opt_un,gen,req){
return (function (y){
if((y instanceof cljs.core.Keyword)){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",(-976526835),null)),(function (){var x__23406__auto__ = gx;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = f.call(null,y);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
} else {
return y;
}
});})(gx,unk,req_keys,req_un_specs,_,req_specs,req_keys__$1,opt_keys,opt_specs,map__73,map__73__$1,opt,req_un,opt_un,gen,req))
,x);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
}
});})(unk,req_keys,req_un_specs,_,req_specs,req_keys__$1,opt_keys,opt_specs,map__73,map__73__$1,opt,req_un,opt_un,gen,req))
,rk);
});})(unk,req_keys,req_un_specs,_,req_specs,req_keys__$1,opt_keys,opt_specs,map__73,map__73__$1,opt,req_un,opt_un,gen,req))
;
var pred_exprs = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",(-1390345523),null)], null);
var pred_exprs__$1 = cljs.core.into.call(null,pred_exprs,parse_req.call(null,req,cljs.core.identity));
var pred_exprs__$2 = cljs.core.into.call(null,pred_exprs__$1,parse_req.call(null,req_un,unk));
var pred_forms = clojure.walk.postwalk.call(null,((function (unk,req_keys,req_un_specs,_,req_specs,req_keys__$1,opt_keys,opt_specs,parse_req,pred_exprs,pred_exprs__$1,pred_exprs__$2,map__73,map__73__$1,opt,req_un,opt_un,gen,req){
return (function (p1__8_SHARP_){
return cljs.spec$macros.res.call(null,_AMPERSAND_env,p1__8_SHARP_);
});})(unk,req_keys,req_un_specs,_,req_specs,req_keys__$1,opt_keys,opt_specs,parse_req,pred_exprs,pred_exprs__$1,pred_exprs__$2,map__73,map__73__$1,opt,req_un,opt_un,gen,req))
,pred_exprs__$2);
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","map-spec-impl","cljs.spec/map-spec-impl",(-1014292963),null)),(function (){var x__23406__auto__ = cljs.core.apply.call(null,cljs.core.array_map,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"req-un","req-un",(1074571008))),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = req_un;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"opt-un","opt-un",(883442496))),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = opt_un;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"gfn","gfn",(791517474))),(function (){var x__23406__auto__ = gen;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"pred-exprs","pred-exprs",(1792271395))),(function (){var x__23406__auto__ = pred_exprs__$2;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"opt-keys","opt-keys",(1262688261))),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = opt_keys;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"req-specs","req-specs",(553962313))),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = req_specs;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"req","req",(-326448303))),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = req;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"req-keys","req-keys",(514319221))),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = req_keys__$1;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"opt-specs","opt-specs",(-384905450))),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = opt_specs;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"pred-forms","pred-forms",(172611832))),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = pred_forms;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"opt","opt",(-794706369))),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = opt;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
});

cljs.spec$macros.keys.cljs$lang$maxFixedArity = (2);

cljs.spec$macros.keys.cljs$lang$applyTo = (function (seq69){
var G__70 = cljs.core.first.call(null,seq69);
var seq69__$1 = cljs.core.next.call(null,seq69);
var G__71 = cljs.core.first.call(null,seq69__$1);
var seq69__$2 = cljs.core.next.call(null,seq69__$1);
return cljs.spec$macros.keys.cljs$core$IFn$_invoke$arity$variadic(G__70,G__71,seq69__$2);
});

new cljs.core.Var(function(){return cljs.spec$macros.keys;},new cljs.core.Symbol("cljs.spec$macros","keys","cljs.spec$macros/keys",(-553235059),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"keys","keys",(-1586012071),null),"cljs/spec.cljc",(15),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"req","req",(1314083224),null),new cljs.core.Symbol(null,"req-un","req-un",(-1579864761),null),new cljs.core.Symbol(null,"opt","opt",(845825158),null),new cljs.core.Symbol(null,"opt-un","opt-un",(-1770993273),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"req","req",(1314083224),null),new cljs.core.Symbol(null,"req-un","req-un",(-1579864761),null),new cljs.core.Symbol(null,"opt","opt",(845825158),null),new cljs.core.Symbol(null,"opt-un","opt-un",(-1770993273),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(110),true,(110),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"req","req",(1314083224),null),new cljs.core.Symbol(null,"req-un","req-un",(-1579864761),null),new cljs.core.Symbol(null,"opt","opt",(845825158),null),new cljs.core.Symbol(null,"opt-un","opt-un",(-1770993273),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null)], null)),"Creates and returns a map validating spec. :req and :opt are both\n  vectors of namespaced-qualified keywords. The validator will ensure\n  the :req keys are present. The :opt keys serve as documentation and\n  may be used by the generator.\n\n  The :req key vector supports 'and' and 'or' for key groups:\n\n  (s/keys :req [::x ::y (or ::secret (and ::user ::pwd))] :opt [::z])\n\n  There are also -un versions of :req and :opt. These allow\n  you to connect unqualified keys to specs.  In each case, fully\n  qualfied keywords are passed, which name the specs, but unqualified\n  keys (with the same name component) are expected and checked at\n  conform-time, and generated during gen:\n\n  (s/keys :req-un [:my.ns/x :my.ns/y])\n\n  The above says keys :x and :y are required, and will be validated\n  and generated by specs (if they exist) named :my.ns/x :my.ns/y\n  respectively.\n\n  In addition, the values of *all* namespace-qualified keys will be validated\n  (and possibly destructured) by any registered specs. Note: there is\n  no support for inline value specification, by design.\n\n  Optionally takes :gen generator-fn, which must be a fn of no args that\n  returns a test.check generator.",(cljs.core.truth_(cljs.spec$macros.keys)?cljs.spec$macros.keys.cljs$lang$test:null)]));

cljs.spec$macros.keys.cljs$lang$macro = true;
/**
 * Takes key+pred pairs, e.g.
 * 
 *   (s/or :even even? :small #(< % 42))
 * 
 *   Returns a destructuring spec that returns a map entry containing the
 *   key of the first matching pred and the corresponding value. Thus the
 *   'key' and 'val' functions can be used to refer generically to the
 *   components of the tagged return.
 */
(function (){
cljs.spec$macros.or = (function cljs$spec$macros$or(var_args){
var args__23665__auto__ = [];
var len__23663__auto___81 = arguments.length;
var i__23664__auto___82 = (0);
while(true){
if((i__23664__auto___82 < len__23663__auto___81)){
args__23665__auto__.push((arguments[i__23664__auto___82]));

var G__83 = (i__23664__auto___82 + (1));
i__23664__auto___82 = G__83;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((2) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((2)),(0),null)):null);
return cljs.spec$macros.or.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.or;},new cljs.core.Symbol("cljs.spec$macros","or","cljs.spec$macros/or",(1030139044),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"or","or",(1876275696),null),"cljs/spec.cljc",(13),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(170),true,(170),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null)], null)),"Takes key+pred pairs, e.g.\n\n  (s/or :even even? :small #(< % 42))\n\n  Returns a destructuring spec that returns a map entry containing the\n  key of the first matching pred and the corresponding value. Thus the\n  'key' and 'val' functions can be used to refer generically to the\n  components of the tagged return.",(cljs.core.truth_(cljs.spec$macros.or)?cljs.spec$macros.or.cljs$lang$test:null)])));})()
;

cljs.spec$macros.or.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,key_pred_forms){
var pairs = cljs.core.partition.call(null,(2),key_pred_forms);
var keys = cljs.core.mapv.call(null,cljs.core.first,pairs);
var pred_forms = cljs.core.mapv.call(null,cljs.core.second,pairs);
var pf = cljs.core.mapv.call(null,((function (pairs,keys,pred_forms){
return (function (p1__9_SHARP_){
return cljs.spec$macros.res.call(null,_AMPERSAND_env,p1__9_SHARP_);
});})(pairs,keys,pred_forms))
,pred_forms);
if((cljs.core.even_QMARK_.call(null,cljs.core.count.call(null,key_pred_forms))) && (cljs.core.every_QMARK_.call(null,cljs.core.keyword_QMARK_,keys))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("spec/or expects k1 p1 k2 p2..., where ks are keywords"),cljs.core.str("\n"),cljs.core.str("(clojure.core/and (even? (count key-pred-forms)) (every? keyword? keys))")].join('')));
}

return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","or-spec-impl","cljs.spec/or-spec-impl",(2080519296),null)),(function (){var x__23406__auto__ = keys;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = pf;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = pred_forms;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,null)));
});

cljs.spec$macros.or.cljs$lang$maxFixedArity = (2);

cljs.spec$macros.or.cljs$lang$applyTo = (function (seq78){
var G__79 = cljs.core.first.call(null,seq78);
var seq78__$1 = cljs.core.next.call(null,seq78);
var G__80 = cljs.core.first.call(null,seq78__$1);
var seq78__$2 = cljs.core.next.call(null,seq78__$1);
return cljs.spec$macros.or.cljs$core$IFn$_invoke$arity$variadic(G__79,G__80,seq78__$2);
});

new cljs.core.Var(function(){return cljs.spec$macros.or;},new cljs.core.Symbol("cljs.spec$macros","or","cljs.spec$macros/or",(1030139044),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"or","or",(1876275696),null),"cljs/spec.cljc",(13),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(170),true,(170),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null)], null)),"Takes key+pred pairs, e.g.\n\n  (s/or :even even? :small #(< % 42))\n\n  Returns a destructuring spec that returns a map entry containing the\n  key of the first matching pred and the corresponding value. Thus the\n  'key' and 'val' functions can be used to refer generically to the\n  components of the tagged return.",(cljs.core.truth_(cljs.spec$macros.or)?cljs.spec$macros.or.cljs$lang$test:null)]));

cljs.spec$macros.or.cljs$lang$macro = true;
/**
 * Takes predicate/spec-forms, e.g.
 * 
 *   (s/and even? #(< % 42))
 * 
 *   Returns a spec that returns the conformed value. Successive
 *   conformed values propagate through rest of predicates.
 */
(function (){
cljs.spec$macros.and = (function cljs$spec$macros$and(var_args){
var args__23665__auto__ = [];
var len__23663__auto___87 = arguments.length;
var i__23664__auto___88 = (0);
while(true){
if((i__23664__auto___88 < len__23663__auto___87)){
args__23665__auto__.push((arguments[i__23664__auto___88]));

var G__89 = (i__23664__auto___88 + (1));
i__23664__auto___88 = G__89;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((2) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((2)),(0),null)):null);
return cljs.spec$macros.and.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.and;},new cljs.core.Symbol("cljs.spec$macros","and","cljs.spec$macros/and",(-162943022),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"and","and",(668631710),null),"cljs/spec.cljc",(14),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"pred-forms","pred-forms",(1813143359),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"pred-forms","pred-forms",(1813143359),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(187),true,(187),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"pred-forms","pred-forms",(1813143359),null)], null)),"Takes predicate/spec-forms, e.g.\n\n  (s/and even? #(< % 42))\n\n  Returns a spec that returns the conformed value. Successive\n  conformed values propagate through rest of predicates.",(cljs.core.truth_(cljs.spec$macros.and)?cljs.spec$macros.and.cljs$lang$test:null)])));})()
;

cljs.spec$macros.and.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,pred_forms){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","and-spec-impl","cljs.spec/and-spec-impl",(1959775372),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = cljs.core.mapv.call(null,(function (p1__10_SHARP_){
return cljs.spec$macros.res.call(null,_AMPERSAND_env,p1__10_SHARP_);
}),pred_forms);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.vec.call(null,pred_forms);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,null)));
});

cljs.spec$macros.and.cljs$lang$maxFixedArity = (2);

cljs.spec$macros.and.cljs$lang$applyTo = (function (seq84){
var G__85 = cljs.core.first.call(null,seq84);
var seq84__$1 = cljs.core.next.call(null,seq84);
var G__86 = cljs.core.first.call(null,seq84__$1);
var seq84__$2 = cljs.core.next.call(null,seq84__$1);
return cljs.spec$macros.and.cljs$core$IFn$_invoke$arity$variadic(G__85,G__86,seq84__$2);
});

new cljs.core.Var(function(){return cljs.spec$macros.and;},new cljs.core.Symbol("cljs.spec$macros","and","cljs.spec$macros/and",(-162943022),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"and","and",(668631710),null),"cljs/spec.cljc",(14),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"pred-forms","pred-forms",(1813143359),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"pred-forms","pred-forms",(1813143359),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(187),true,(187),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"pred-forms","pred-forms",(1813143359),null)], null)),"Takes predicate/spec-forms, e.g.\n\n  (s/and even? #(< % 42))\n\n  Returns a spec that returns the conformed value. Successive\n  conformed values propagate through rest of predicates.",(cljs.core.truth_(cljs.spec$macros.and)?cljs.spec$macros.and.cljs$lang$test:null)]));

cljs.spec$macros.and.cljs$lang$macro = true;
/**
 * takes a pred and validates collection elements against that pred.
 * 
 *   Note that 'every' does not do exhaustive checking, rather it samples
 *   *coll-check-limit* elements. Nor (as a result) does it do any
 *   conforming of elements. 'explain' will report at most *coll-error-limit*
 *   problems.  Thus 'every' should be suitable for potentially large
 *   collections.
 * 
 *   Takes several kwargs options that further constrain the collection:
 * 
 *   :kind - a pred/spec that the collection type must satisfy, e.g. vector?
 *        (default nil) Note that if :kind is specified and :into is
 *        not, this pred must generate in order for every to generate.
 *   :count - specifies coll has exactly this count (default nil)
 *   :min-count, :max-count - coll has count (<= min-count count max-count) (defaults nil)
 *   :distinct - all the elements are distinct (default nil)
 * 
 *   And additional args that control gen
 * 
 *   :gen-max - the maximum coll size to generate (default 20)
 *   :into - one of [], (), {}, #{} - the default collection to generate into
 *    (default same as :kind if supplied, else []
 * 
 *   Optionally takes :gen generator-fn, which must be a fn of no args that
 *   returns a test.check generator
 * 
 *   See also - coll-of, every-kv
 */
(function (){
cljs.spec$macros.every = (function cljs$spec$macros$every(var_args){
var args__23665__auto__ = [];
var len__23663__auto___97 = arguments.length;
var i__23664__auto___98 = (0);
while(true){
if((i__23664__auto___98 < len__23663__auto___97)){
args__23665__auto__.push((arguments[i__23664__auto___98]));

var G__99 = (i__23664__auto___98 + (1));
i__23664__auto___98 = G__99;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((3) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((3)),(0),null)):null);
return cljs.spec$macros.every.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.every;},new cljs.core.Symbol("cljs.spec$macros","every","cljs.spec$macros/every",(-1804875403),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"every","every",(-419764351),null),"cljs/spec.cljc",(16),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"pred","pred",(-727012372),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"as","as",(1148689641)),new cljs.core.Symbol(null,"opts","opts",(1795607228),null),new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"into","into",(1489695498),null),new cljs.core.Symbol(null,"kind","kind",(923265724),null),new cljs.core.Symbol(null,"count","count",(-514511684),null),new cljs.core.Symbol(null,"max-count","max-count",(-1115250464),null),new cljs.core.Symbol(null,"min-count","min-count",(-1059726756),null),new cljs.core.Symbol(null,"distinct","distinct",(-148347594),null),new cljs.core.Symbol(null,"gen-max","gen-max",(846851082),null),new cljs.core.Symbol(null,"gen-into","gen-into",(592640985),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"pred","pred",(-727012372),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"as","as",(1148689641)),new cljs.core.Symbol(null,"opts","opts",(1795607228),null),new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"into","into",(1489695498),null),new cljs.core.Symbol(null,"kind","kind",(923265724),null),new cljs.core.Symbol(null,"count","count",(-514511684),null),new cljs.core.Symbol(null,"max-count","max-count",(-1115250464),null),new cljs.core.Symbol(null,"min-count","min-count",(-1059726756),null),new cljs.core.Symbol(null,"distinct","distinct",(-148347594),null),new cljs.core.Symbol(null,"gen-max","gen-max",(846851082),null),new cljs.core.Symbol(null,"gen-into","gen-into",(592640985),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(197),true,(197),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"pred","pred",(-727012372),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"as","as",(1148689641)),new cljs.core.Symbol(null,"opts","opts",(1795607228),null),new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"into","into",(1489695498),null),new cljs.core.Symbol(null,"kind","kind",(923265724),null),new cljs.core.Symbol(null,"count","count",(-514511684),null),new cljs.core.Symbol(null,"max-count","max-count",(-1115250464),null),new cljs.core.Symbol(null,"min-count","min-count",(-1059726756),null),new cljs.core.Symbol(null,"distinct","distinct",(-148347594),null),new cljs.core.Symbol(null,"gen-max","gen-max",(846851082),null),new cljs.core.Symbol(null,"gen-into","gen-into",(592640985),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null)], null)),"takes a pred and validates collection elements against that pred.\n\n  Note that 'every' does not do exhaustive checking, rather it samples\n  *coll-check-limit* elements. Nor (as a result) does it do any\n  conforming of elements. 'explain' will report at most *coll-error-limit*\n  problems.  Thus 'every' should be suitable for potentially large\n  collections.\n\n  Takes several kwargs options that further constrain the collection:\n\n  :kind - a pred/spec that the collection type must satisfy, e.g. vector?\n          (default nil) Note that if :kind is specified and :into is\n          not, this pred must generate in order for every to generate.\n  :count - specifies coll has exactly this count (default nil)\n  :min-count, :max-count - coll has count (<= min-count count max-count) (defaults nil)\n  :distinct - all the elements are distinct (default nil)\n\n  And additional args that control gen\n\n  :gen-max - the maximum coll size to generate (default 20)\n  :into - one of [], (), {}, #{} - the default collection to generate into\n      (default same as :kind if supplied, else []\n\n  Optionally takes :gen generator-fn, which must be a fn of no args that\n  returns a test.check generator\n\n  See also - coll-of, every-kv\n",(cljs.core.truth_(cljs.spec$macros.every)?cljs.spec$macros.every.cljs$lang$test:null)])));})()
;

cljs.spec$macros.every.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,pred,p__94){
var map__95 = p__94;
var map__95__$1 = ((((!((map__95 == null)))?((((map__95.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__95.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__95):map__95);
var opts = map__95__$1;
var max_count = cljs.core.get.call(null,map__95__$1,new cljs.core.Keyword(null,"max-count","max-count",(1539185305)));
var gen_max = cljs.core.get.call(null,map__95__$1,new cljs.core.Keyword(null,"gen-max","gen-max",(-793680445)));
var into = cljs.core.get.call(null,map__95__$1,new cljs.core.Keyword(null,"into","into",(-150836029)));
var gen = cljs.core.get.call(null,map__95__$1,new cljs.core.Keyword(null,"gen","gen",(142575302)));
var distinct = cljs.core.get.call(null,map__95__$1,new cljs.core.Keyword(null,"distinct","distinct",(-1788879121)));
var gen_into = cljs.core.get.call(null,map__95__$1,new cljs.core.Keyword(null,"gen-into","gen-into",(-1047890542)));
var count = cljs.core.get.call(null,map__95__$1,new cljs.core.Keyword(null,"count","count",(2139924085)));
var min_count = cljs.core.get.call(null,map__95__$1,new cljs.core.Keyword(null,"min-count","min-count",(1594709013)));
var kind = cljs.core.get.call(null,map__95__$1,new cljs.core.Keyword(null,"kind","kind",(-717265803)));
var nopts = cljs.core.assoc.call(null,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"gen","gen",(142575302))),new cljs.core.Keyword("cljs.spec","kind-form","cljs.spec/kind-form",(997489303)),cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = cljs.spec$macros.res.call(null,_AMPERSAND_env,new cljs.core.Keyword(null,"kind","kind",(-717265803)).cljs$core$IFn$_invoke$arity$1(opts));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})())));
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","every-impl","cljs.spec/every-impl",(-1150144333),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = pred;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = pred;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = nopts;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = gen;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
});

cljs.spec$macros.every.cljs$lang$maxFixedArity = (3);

cljs.spec$macros.every.cljs$lang$applyTo = (function (seq90){
var G__91 = cljs.core.first.call(null,seq90);
var seq90__$1 = cljs.core.next.call(null,seq90);
var G__92 = cljs.core.first.call(null,seq90__$1);
var seq90__$2 = cljs.core.next.call(null,seq90__$1);
var G__93 = cljs.core.first.call(null,seq90__$2);
var seq90__$3 = cljs.core.next.call(null,seq90__$2);
return cljs.spec$macros.every.cljs$core$IFn$_invoke$arity$variadic(G__91,G__92,G__93,seq90__$3);
});

new cljs.core.Var(function(){return cljs.spec$macros.every;},new cljs.core.Symbol("cljs.spec$macros","every","cljs.spec$macros/every",(-1804875403),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"every","every",(-419764351),null),"cljs/spec.cljc",(16),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"pred","pred",(-727012372),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"as","as",(1148689641)),new cljs.core.Symbol(null,"opts","opts",(1795607228),null),new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"into","into",(1489695498),null),new cljs.core.Symbol(null,"kind","kind",(923265724),null),new cljs.core.Symbol(null,"count","count",(-514511684),null),new cljs.core.Symbol(null,"max-count","max-count",(-1115250464),null),new cljs.core.Symbol(null,"min-count","min-count",(-1059726756),null),new cljs.core.Symbol(null,"distinct","distinct",(-148347594),null),new cljs.core.Symbol(null,"gen-max","gen-max",(846851082),null),new cljs.core.Symbol(null,"gen-into","gen-into",(592640985),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"pred","pred",(-727012372),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"as","as",(1148689641)),new cljs.core.Symbol(null,"opts","opts",(1795607228),null),new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"into","into",(1489695498),null),new cljs.core.Symbol(null,"kind","kind",(923265724),null),new cljs.core.Symbol(null,"count","count",(-514511684),null),new cljs.core.Symbol(null,"max-count","max-count",(-1115250464),null),new cljs.core.Symbol(null,"min-count","min-count",(-1059726756),null),new cljs.core.Symbol(null,"distinct","distinct",(-148347594),null),new cljs.core.Symbol(null,"gen-max","gen-max",(846851082),null),new cljs.core.Symbol(null,"gen-into","gen-into",(592640985),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(197),true,(197),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"pred","pred",(-727012372),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"as","as",(1148689641)),new cljs.core.Symbol(null,"opts","opts",(1795607228),null),new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"into","into",(1489695498),null),new cljs.core.Symbol(null,"kind","kind",(923265724),null),new cljs.core.Symbol(null,"count","count",(-514511684),null),new cljs.core.Symbol(null,"max-count","max-count",(-1115250464),null),new cljs.core.Symbol(null,"min-count","min-count",(-1059726756),null),new cljs.core.Symbol(null,"distinct","distinct",(-148347594),null),new cljs.core.Symbol(null,"gen-max","gen-max",(846851082),null),new cljs.core.Symbol(null,"gen-into","gen-into",(592640985),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null)], null)),"takes a pred and validates collection elements against that pred.\n\n  Note that 'every' does not do exhaustive checking, rather it samples\n  *coll-check-limit* elements. Nor (as a result) does it do any\n  conforming of elements. 'explain' will report at most *coll-error-limit*\n  problems.  Thus 'every' should be suitable for potentially large\n  collections.\n\n  Takes several kwargs options that further constrain the collection:\n\n  :kind - a pred/spec that the collection type must satisfy, e.g. vector?\n          (default nil) Note that if :kind is specified and :into is\n          not, this pred must generate in order for every to generate.\n  :count - specifies coll has exactly this count (default nil)\n  :min-count, :max-count - coll has count (<= min-count count max-count) (defaults nil)\n  :distinct - all the elements are distinct (default nil)\n\n  And additional args that control gen\n\n  :gen-max - the maximum coll size to generate (default 20)\n  :into - one of [], (), {}, #{} - the default collection to generate into\n      (default same as :kind if supplied, else []\n\n  Optionally takes :gen generator-fn, which must be a fn of no args that\n  returns a test.check generator\n\n  See also - coll-of, every-kv\n",(cljs.core.truth_(cljs.spec$macros.every)?cljs.spec$macros.every.cljs$lang$test:null)]));

cljs.spec$macros.every.cljs$lang$macro = true;
/**
 * like 'every' but takes separate key and val preds and works on associative collections.
 * 
 *   Same options as 'every', :into defaults to {}
 * 
 *   See also - map-of
 */
(function (){
cljs.spec$macros.every_kv = (function cljs$spec$macros$every_kv(var_args){
var args__23665__auto__ = [];
var len__23663__auto___105 = arguments.length;
var i__23664__auto___106 = (0);
while(true){
if((i__23664__auto___106 < len__23663__auto___105)){
args__23665__auto__.push((arguments[i__23664__auto___106]));

var G__107 = (i__23664__auto___106 + (1));
i__23664__auto___106 = G__107;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((4) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((4)),(0),null)):null);
return cljs.spec$macros.every_kv.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.every_kv;},new cljs.core.Symbol("cljs.spec$macros","every-kv","cljs.spec$macros/every-kv",(1829467865),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"every-kv","every-kv",(-1701549683),null),"cljs/spec.cljc",(19),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(4),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"kpred","kpred",(-1781125167),null),new cljs.core.Symbol(null,"vpred","vpred",(1944119183),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"kpred","kpred",(-1781125167),null),new cljs.core.Symbol(null,"vpred","vpred",(1944119183),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(230),true,(230),cljs.core.list(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"kpred","kpred",(-1781125167),null),new cljs.core.Symbol(null,"vpred","vpred",(1944119183),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null)], null)),"like 'every' but takes separate key and val preds and works on associative collections.\n\n  Same options as 'every', :into defaults to {}\n\n  See also - map-of",(cljs.core.truth_(cljs.spec$macros.every_kv)?cljs.spec$macros.every_kv.cljs$lang$test:null)])));})()
;

cljs.spec$macros.every_kv.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,kpred,vpred,opts){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","every","cljs.spec/every",(-1899705480),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","tuple","cljs.spec/tuple",(500419708),null)),(function (){var x__23406__auto__ = kpred;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = vpred;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword("cljs.spec","kfn","cljs.spec/kfn",(293196937))),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",(-1065745098),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"i__11__auto__","i__11__auto__",(466569123),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"v__12__auto__","v__12__auto__",(1449211077),null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","nth","cljs.core/nth",(1961052085),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"v__12__auto__","v__12__auto__",(1449211077),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,(0))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"into","into",(-150836029))),(function (){var x__23406__auto__ = cljs.core.apply.call(null,cljs.core.array_map,cljs.core.sequence.call(null,cljs.core.concat.call(null)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),opts));
});

cljs.spec$macros.every_kv.cljs$lang$maxFixedArity = (4);

cljs.spec$macros.every_kv.cljs$lang$applyTo = (function (seq100){
var G__101 = cljs.core.first.call(null,seq100);
var seq100__$1 = cljs.core.next.call(null,seq100);
var G__102 = cljs.core.first.call(null,seq100__$1);
var seq100__$2 = cljs.core.next.call(null,seq100__$1);
var G__103 = cljs.core.first.call(null,seq100__$2);
var seq100__$3 = cljs.core.next.call(null,seq100__$2);
var G__104 = cljs.core.first.call(null,seq100__$3);
var seq100__$4 = cljs.core.next.call(null,seq100__$3);
return cljs.spec$macros.every_kv.cljs$core$IFn$_invoke$arity$variadic(G__101,G__102,G__103,G__104,seq100__$4);
});

new cljs.core.Var(function(){return cljs.spec$macros.every_kv;},new cljs.core.Symbol("cljs.spec$macros","every-kv","cljs.spec$macros/every-kv",(1829467865),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"every-kv","every-kv",(-1701549683),null),"cljs/spec.cljc",(19),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(4),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"kpred","kpred",(-1781125167),null),new cljs.core.Symbol(null,"vpred","vpred",(1944119183),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"kpred","kpred",(-1781125167),null),new cljs.core.Symbol(null,"vpred","vpred",(1944119183),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(230),true,(230),cljs.core.list(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"kpred","kpred",(-1781125167),null),new cljs.core.Symbol(null,"vpred","vpred",(1944119183),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null)], null)),"like 'every' but takes separate key and val preds and works on associative collections.\n\n  Same options as 'every', :into defaults to {}\n\n  See also - map-of",(cljs.core.truth_(cljs.spec$macros.every_kv)?cljs.spec$macros.every_kv.cljs$lang$test:null)]));

cljs.spec$macros.every_kv.cljs$lang$macro = true;
/**
 * Returns a spec for a collection of items satisfying pred. Unlike
 *   generator will fill an empty init-coll.
 * 
 *   Same options as 'every'. conform will produce a collection
 *   corresponding to :into if supplied, else will match the input collection,
 *   avoiding rebuilding when possible.
 * 
 *   Same options as 'every'.
 * 
 *   See also - every, map-of
 */
(function (){
cljs.spec$macros.coll_of = (function cljs$spec$macros$coll_of(var_args){
var args__23665__auto__ = [];
var len__23663__auto___112 = arguments.length;
var i__23664__auto___113 = (0);
while(true){
if((i__23664__auto___113 < len__23663__auto___112)){
args__23665__auto__.push((arguments[i__23664__auto___113]));

var G__114 = (i__23664__auto___113 + (1));
i__23664__auto___113 = G__114;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((3) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((3)),(0),null)):null);
return cljs.spec$macros.coll_of.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.coll_of;},new cljs.core.Symbol("cljs.spec$macros","coll-of","cljs.spec$macros/coll-of",(-909489324),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"coll-of","coll-of",(-1705285400),null),"cljs/spec.cljc",(18),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"pred","pred",(-727012372),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"pred","pred",(-727012372),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(240),true,(240),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"pred","pred",(-727012372),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null)], null)),"Returns a spec for a collection of items satisfying pred. Unlike\n  generator will fill an empty init-coll.\n\n  Same options as 'every'. conform will produce a collection\n  corresponding to :into if supplied, else will match the input collection,\n  avoiding rebuilding when possible.\n\n  Same options as 'every'.\n\n  See also - every, map-of",(cljs.core.truth_(cljs.spec$macros.coll_of)?cljs.spec$macros.coll_of.cljs$lang$test:null)])));})()
;

cljs.spec$macros.coll_of.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,pred,opts){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","every","cljs.spec/every",(-1899705480),null)),(function (){var x__23406__auto__ = pred;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword("cljs.spec","conform-all","cljs.spec/conform-all",(-1945029907))),cljs.core._conj.call(null,cljs.core.List.EMPTY,true),opts));
});

cljs.spec$macros.coll_of.cljs$lang$maxFixedArity = (3);

cljs.spec$macros.coll_of.cljs$lang$applyTo = (function (seq108){
var G__109 = cljs.core.first.call(null,seq108);
var seq108__$1 = cljs.core.next.call(null,seq108);
var G__110 = cljs.core.first.call(null,seq108__$1);
var seq108__$2 = cljs.core.next.call(null,seq108__$1);
var G__111 = cljs.core.first.call(null,seq108__$2);
var seq108__$3 = cljs.core.next.call(null,seq108__$2);
return cljs.spec$macros.coll_of.cljs$core$IFn$_invoke$arity$variadic(G__109,G__110,G__111,seq108__$3);
});

new cljs.core.Var(function(){return cljs.spec$macros.coll_of;},new cljs.core.Symbol("cljs.spec$macros","coll-of","cljs.spec$macros/coll-of",(-909489324),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"coll-of","coll-of",(-1705285400),null),"cljs/spec.cljc",(18),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"pred","pred",(-727012372),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"pred","pred",(-727012372),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(240),true,(240),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"pred","pred",(-727012372),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null)], null)),"Returns a spec for a collection of items satisfying pred. Unlike\n  generator will fill an empty init-coll.\n\n  Same options as 'every'. conform will produce a collection\n  corresponding to :into if supplied, else will match the input collection,\n  avoiding rebuilding when possible.\n\n  Same options as 'every'.\n\n  See also - every, map-of",(cljs.core.truth_(cljs.spec$macros.coll_of)?cljs.spec$macros.coll_of.cljs$lang$test:null)]));

cljs.spec$macros.coll_of.cljs$lang$macro = true;
/**
 * Returns a spec for a map whose keys satisfy kpred and vals satisfy
 *   vpred. Unlike 'every-kv', map-of will exhaustively conform every
 *   value.
 * 
 *   Same options as 'every', :kind defaults to map?, with the addition of:
 * 
 *   :conform-keys - conform keys as well as values (default false)
 * 
 *   See also - every-kv
 */
(function (){
cljs.spec$macros.map_of = (function cljs$spec$macros$map_of(var_args){
var args__23665__auto__ = [];
var len__23663__auto___120 = arguments.length;
var i__23664__auto___121 = (0);
while(true){
if((i__23664__auto___121 < len__23663__auto___120)){
args__23665__auto__.push((arguments[i__23664__auto___121]));

var G__122 = (i__23664__auto___121 + (1));
i__23664__auto___121 = G__122;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((4) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((4)),(0),null)):null);
return cljs.spec$macros.map_of.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.map_of;},new cljs.core.Symbol("cljs.spec$macros","map-of","cljs.spec$macros/map-of",(-1708226778),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"map-of","map-of",(-1464753414),null),"cljs/spec.cljc",(17),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(4),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"kpred","kpred",(-1781125167),null),new cljs.core.Symbol(null,"vpred","vpred",(1944119183),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"kpred","kpred",(-1781125167),null),new cljs.core.Symbol(null,"vpred","vpred",(1944119183),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(254),true,(254),cljs.core.list(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"kpred","kpred",(-1781125167),null),new cljs.core.Symbol(null,"vpred","vpred",(1944119183),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null)], null)),"Returns a spec for a map whose keys satisfy kpred and vals satisfy\n  vpred. Unlike 'every-kv', map-of will exhaustively conform every\n  value.\n\n  Same options as 'every', :kind defaults to map?, with the addition of:\n\n  :conform-keys - conform keys as well as values (default false)\n\n  See also - every-kv",(cljs.core.truth_(cljs.spec$macros.map_of)?cljs.spec$macros.map_of.cljs$lang$test:null)])));})()
;

cljs.spec$macros.map_of.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,kpred,vpred,opts){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","every-kv","cljs.spec/every-kv",(1657959642),null)),(function (){var x__23406__auto__ = kpred;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = vpred;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword("cljs.spec","conform-all","cljs.spec/conform-all",(-1945029907))),cljs.core._conj.call(null,cljs.core.List.EMPTY,true),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"kind","kind",(-717265803))),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",(-1390345523),null)),opts));
});

cljs.spec$macros.map_of.cljs$lang$maxFixedArity = (4);

cljs.spec$macros.map_of.cljs$lang$applyTo = (function (seq115){
var G__116 = cljs.core.first.call(null,seq115);
var seq115__$1 = cljs.core.next.call(null,seq115);
var G__117 = cljs.core.first.call(null,seq115__$1);
var seq115__$2 = cljs.core.next.call(null,seq115__$1);
var G__118 = cljs.core.first.call(null,seq115__$2);
var seq115__$3 = cljs.core.next.call(null,seq115__$2);
var G__119 = cljs.core.first.call(null,seq115__$3);
var seq115__$4 = cljs.core.next.call(null,seq115__$3);
return cljs.spec$macros.map_of.cljs$core$IFn$_invoke$arity$variadic(G__116,G__117,G__118,G__119,seq115__$4);
});

new cljs.core.Var(function(){return cljs.spec$macros.map_of;},new cljs.core.Symbol("cljs.spec$macros","map-of","cljs.spec$macros/map-of",(-1708226778),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"map-of","map-of",(-1464753414),null),"cljs/spec.cljc",(17),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(4),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"kpred","kpred",(-1781125167),null),new cljs.core.Symbol(null,"vpred","vpred",(1944119183),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"kpred","kpred",(-1781125167),null),new cljs.core.Symbol(null,"vpred","vpred",(1944119183),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(254),true,(254),cljs.core.list(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"kpred","kpred",(-1781125167),null),new cljs.core.Symbol(null,"vpred","vpred",(1944119183),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"opts","opts",(1795607228),null)], null)),"Returns a spec for a map whose keys satisfy kpred and vals satisfy\n  vpred. Unlike 'every-kv', map-of will exhaustively conform every\n  value.\n\n  Same options as 'every', :kind defaults to map?, with the addition of:\n\n  :conform-keys - conform keys as well as values (default false)\n\n  See also - every-kv",(cljs.core.truth_(cljs.spec$macros.map_of)?cljs.spec$macros.map_of.cljs$lang$test:null)]));

cljs.spec$macros.map_of.cljs$lang$macro = true;
/**
 * Returns a regex op that matches zero or more values matching
 *   pred. Produces a vector of matches iff there is at least one match
 */
(function (){
cljs.spec$macros._STAR_ = (function cljs$spec$macros$_STAR_(_AMPERSAND_form,_AMPERSAND_env,pred_form){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","rep-impl","cljs.spec/rep-impl",(-1679724299),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = cljs.spec$macros.res.call(null,_AMPERSAND_env,pred_form);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = pred_form;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
}); return (
new cljs.core.Var(function(){return cljs.spec$macros._STAR_;},new cljs.core.Symbol("cljs.spec$macros","*","cljs.spec$macros/*",(-1022404451),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"*","*",(345799209),null),"cljs/spec.cljc",(12),(1),(267),true,(267),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"pred-form","pred-form",(1189696240),null)], null)),"Returns a regex op that matches zero or more values matching\n  pred. Produces a vector of matches iff there is at least one match",(cljs.core.truth_(cljs.spec$macros._STAR_)?cljs.spec$macros._STAR_.cljs$lang$test:null)])));})()
;

cljs.spec$macros._STAR_.cljs$lang$macro = true;
/**
 * Returns a regex op that matches one or more values matching
 *   pred. Produces a vector of matches
 */
(function (){
cljs.spec$macros._PLUS_ = (function cljs$spec$macros$_PLUS_(_AMPERSAND_form,_AMPERSAND_env,pred_form){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","rep+impl","cljs.spec/rep+impl",(-903423170),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = cljs.spec$macros.res.call(null,_AMPERSAND_env,pred_form);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = pred_form;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
}); return (
new cljs.core.Var(function(){return cljs.spec$macros._PLUS_;},new cljs.core.Symbol("cljs.spec$macros","+","cljs.spec$macros/+",(-499008234),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"+","+",(-740910886),null),"cljs/spec.cljc",(12),(1),(273),true,(273),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"pred-form","pred-form",(1189696240),null)], null)),"Returns a regex op that matches one or more values matching\n  pred. Produces a vector of matches",(cljs.core.truth_(cljs.spec$macros._PLUS_)?cljs.spec$macros._PLUS_.cljs$lang$test:null)])));})()
;

cljs.spec$macros._PLUS_.cljs$lang$macro = true;
/**
 * Returns a regex op that matches zero or one value matching
 *   pred. Produces a single value (not a collection) if matched.
 */
(function (){
cljs.spec$macros._QMARK_ = (function cljs$spec$macros$_QMARK_(_AMPERSAND_form,_AMPERSAND_env,pred_form){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","maybe-impl","cljs.spec/maybe-impl",(-2372652),null)),(function (){var x__23406__auto__ = pred_form;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = pred_form;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
}); return (
new cljs.core.Var(function(){return cljs.spec$macros._QMARK_;},new cljs.core.Symbol("cljs.spec$macros","?","cljs.spec$macros/?",(-1430952726),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"?","?",(-62633706),null),"cljs/spec.cljc",(12),(1),(279),true,(279),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"pred-form","pred-form",(1189696240),null)], null)),"Returns a regex op that matches zero or one value matching\n  pred. Produces a single value (not a collection) if matched.",(cljs.core.truth_(cljs.spec$macros._QMARK_)?cljs.spec$macros._QMARK_.cljs$lang$test:null)])));})()
;

cljs.spec$macros._QMARK_.cljs$lang$macro = true;
/**
 * Takes key+pred pairs, e.g.
 * 
 *   (s/alt :even even? :small #(< % 42))
 * 
 *   Returns a regex op that returns a map entry containing the key of the
 *   first matching pred and the corresponding value. Thus the
 *   'key' and 'val' functions can be used to refer generically to the
 *   components of the tagged return.
 */
(function (){
cljs.spec$macros.alt = (function cljs$spec$macros$alt(var_args){
var args__23665__auto__ = [];
var len__23663__auto___126 = arguments.length;
var i__23664__auto___127 = (0);
while(true){
if((i__23664__auto___127 < len__23663__auto___126)){
args__23665__auto__.push((arguments[i__23664__auto___127]));

var G__128 = (i__23664__auto___127 + (1));
i__23664__auto___127 = G__128;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((2) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((2)),(0),null)):null);
return cljs.spec$macros.alt.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.alt;},new cljs.core.Symbol("cljs.spec$macros","alt","cljs.spec$macros/alt",(1040603697),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"alt","alt",(1637317101),null),"cljs/spec.cljc",(14),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(285),true,(285),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null)], null)),"Takes key+pred pairs, e.g.\n\n  (s/alt :even even? :small #(< % 42))\n\n  Returns a regex op that returns a map entry containing the key of the\n  first matching pred and the corresponding value. Thus the\n  'key' and 'val' functions can be used to refer generically to the\n  components of the tagged return.",(cljs.core.truth_(cljs.spec$macros.alt)?cljs.spec$macros.alt.cljs$lang$test:null)])));})()
;

cljs.spec$macros.alt.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,key_pred_forms){
var pairs = cljs.core.partition.call(null,(2),key_pred_forms);
var keys = cljs.core.mapv.call(null,cljs.core.first,pairs);
var pred_forms = cljs.core.mapv.call(null,cljs.core.second,pairs);
var pf = cljs.core.mapv.call(null,((function (pairs,keys,pred_forms){
return (function (p1__13_SHARP_){
return cljs.spec$macros.res.call(null,_AMPERSAND_env,p1__13_SHARP_);
});})(pairs,keys,pred_forms))
,pred_forms);
if((cljs.core.even_QMARK_.call(null,cljs.core.count.call(null,key_pred_forms))) && (cljs.core.every_QMARK_.call(null,cljs.core.keyword_QMARK_,keys))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("alt expects k1 p1 k2 p2..., where ks are keywords"),cljs.core.str("\n"),cljs.core.str("(clojure.core/and (even? (count key-pred-forms)) (every? keyword? keys))")].join('')));
}

return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","alt-impl","cljs.spec/alt-impl",(-536047463),null)),(function (){var x__23406__auto__ = keys;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = pred_forms;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = pf;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
});

cljs.spec$macros.alt.cljs$lang$maxFixedArity = (2);

cljs.spec$macros.alt.cljs$lang$applyTo = (function (seq123){
var G__124 = cljs.core.first.call(null,seq123);
var seq123__$1 = cljs.core.next.call(null,seq123);
var G__125 = cljs.core.first.call(null,seq123__$1);
var seq123__$2 = cljs.core.next.call(null,seq123__$1);
return cljs.spec$macros.alt.cljs$core$IFn$_invoke$arity$variadic(G__124,G__125,seq123__$2);
});

new cljs.core.Var(function(){return cljs.spec$macros.alt;},new cljs.core.Symbol("cljs.spec$macros","alt","cljs.spec$macros/alt",(1040603697),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"alt","alt",(1637317101),null),"cljs/spec.cljc",(14),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(285),true,(285),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null)], null)),"Takes key+pred pairs, e.g.\n\n  (s/alt :even even? :small #(< % 42))\n\n  Returns a regex op that returns a map entry containing the key of the\n  first matching pred and the corresponding value. Thus the\n  'key' and 'val' functions can be used to refer generically to the\n  components of the tagged return.",(cljs.core.truth_(cljs.spec$macros.alt)?cljs.spec$macros.alt.cljs$lang$test:null)]));

cljs.spec$macros.alt.cljs$lang$macro = true;
/**
 * Takes key+pred pairs, e.g.
 * 
 *   (s/cat :e even? :o odd?)
 * 
 *   Returns a regex op that matches (all) values in sequence, returning a map
 *   containing the keys of each pred and the corresponding value.
 */
(function (){
cljs.spec$macros.cat = (function cljs$spec$macros$cat(var_args){
var args__23665__auto__ = [];
var len__23663__auto___132 = arguments.length;
var i__23664__auto___133 = (0);
while(true){
if((i__23664__auto___133 < len__23663__auto___132)){
args__23665__auto__.push((arguments[i__23664__auto___133]));

var G__134 = (i__23664__auto___133 + (1));
i__23664__auto___133 = G__134;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((2) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((2)),(0),null)):null);
return cljs.spec$macros.cat.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.cat;},new cljs.core.Symbol("cljs.spec$macros","cat","cljs.spec$macros/cat",(-982317676),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"cat","cat",(182721320),null),"cljs/spec.cljc",(14),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(302),true,(302),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null)], null)),"Takes key+pred pairs, e.g.\n\n  (s/cat :e even? :o odd?)\n\n  Returns a regex op that matches (all) values in sequence, returning a map\n  containing the keys of each pred and the corresponding value.",(cljs.core.truth_(cljs.spec$macros.cat)?cljs.spec$macros.cat.cljs$lang$test:null)])));})()
;

cljs.spec$macros.cat.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,key_pred_forms){
var pairs = cljs.core.partition.call(null,(2),key_pred_forms);
var keys = cljs.core.mapv.call(null,cljs.core.first,pairs);
var pred_forms = cljs.core.mapv.call(null,cljs.core.second,pairs);
var pf = cljs.core.mapv.call(null,((function (pairs,keys,pred_forms){
return (function (p1__14_SHARP_){
return cljs.spec$macros.res.call(null,_AMPERSAND_env,p1__14_SHARP_);
});})(pairs,keys,pred_forms))
,pred_forms);
if((cljs.core.even_QMARK_.call(null,cljs.core.count.call(null,key_pred_forms))) && (cljs.core.every_QMARK_.call(null,cljs.core.keyword_QMARK_,keys))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("cat expects k1 p1 k2 p2..., where ks are keywords"),cljs.core.str("\n"),cljs.core.str("(clojure.core/and (even? (count key-pred-forms)) (every? keyword? keys))")].join('')));
}

return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","cat-impl","cljs.spec/cat-impl",(-595301341),null)),(function (){var x__23406__auto__ = keys;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = pred_forms;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = pf;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
});

cljs.spec$macros.cat.cljs$lang$maxFixedArity = (2);

cljs.spec$macros.cat.cljs$lang$applyTo = (function (seq129){
var G__130 = cljs.core.first.call(null,seq129);
var seq129__$1 = cljs.core.next.call(null,seq129);
var G__131 = cljs.core.first.call(null,seq129__$1);
var seq129__$2 = cljs.core.next.call(null,seq129__$1);
return cljs.spec$macros.cat.cljs$core$IFn$_invoke$arity$variadic(G__130,G__131,seq129__$2);
});

new cljs.core.Var(function(){return cljs.spec$macros.cat;},new cljs.core.Symbol("cljs.spec$macros","cat","cljs.spec$macros/cat",(-982317676),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"cat","cat",(182721320),null),"cljs/spec.cljc",(14),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(302),true,(302),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"key-pred-forms","key-pred-forms",(2102716187),null)], null)),"Takes key+pred pairs, e.g.\n\n  (s/cat :e even? :o odd?)\n\n  Returns a regex op that matches (all) values in sequence, returning a map\n  containing the keys of each pred and the corresponding value.",(cljs.core.truth_(cljs.spec$macros.cat)?cljs.spec$macros.cat.cljs$lang$test:null)]));

cljs.spec$macros.cat.cljs$lang$macro = true;
/**
 * takes a regex op re, and predicates. Returns a regex-op that consumes
 *   input as per re but subjects the resulting value to the
 *   conjunction of the predicates, and any conforming they might perform.
 */
(function (){
cljs.spec$macros._AMPERSAND_ = (function cljs$spec$macros$_AMPERSAND_(var_args){
var args__23665__auto__ = [];
var len__23663__auto___139 = arguments.length;
var i__23664__auto___140 = (0);
while(true){
if((i__23664__auto___140 < len__23663__auto___139)){
args__23665__auto__.push((arguments[i__23664__auto___140]));

var G__141 = (i__23664__auto___140 + (1));
i__23664__auto___140 = G__141;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((3) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((3)),(0),null)):null);
return cljs.spec$macros._AMPERSAND_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros._AMPERSAND_;},new cljs.core.Symbol("cljs.spec$macros","&","cljs.spec$macros/&",(-829981460),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),"cljs/spec.cljc",(12),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"re","re",(1869207729),null),new cljs.core.Symbol(null,"preds","preds",(150921777),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"re","re",(1869207729),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"preds","preds",(150921777),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(318),true,(318),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"re","re",(1869207729),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"preds","preds",(150921777),null)], null)),"takes a regex op re, and predicates. Returns a regex-op that consumes\n  input as per re but subjects the resulting value to the\n  conjunction of the predicates, and any conforming they might perform.",(cljs.core.truth_(cljs.spec$macros._AMPERSAND_)?cljs.spec$macros._AMPERSAND_.cljs$lang$test:null)])));})()
;

cljs.spec$macros._AMPERSAND_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,re,preds){
var pv = cljs.core.vec.call(null,preds);
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","amp-impl","cljs.spec/amp-impl",(796856145),null)),(function (){var x__23406__auto__ = re;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = pv;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = cljs.core.mapv.call(null,((function (pv){
return (function (p1__15_SHARP_){
return cljs.spec$macros.res.call(null,_AMPERSAND_env,p1__15_SHARP_);
});})(pv))
,pv);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
});

cljs.spec$macros._AMPERSAND_.cljs$lang$maxFixedArity = (3);

cljs.spec$macros._AMPERSAND_.cljs$lang$applyTo = (function (seq135){
var G__136 = cljs.core.first.call(null,seq135);
var seq135__$1 = cljs.core.next.call(null,seq135);
var G__137 = cljs.core.first.call(null,seq135__$1);
var seq135__$2 = cljs.core.next.call(null,seq135__$1);
var G__138 = cljs.core.first.call(null,seq135__$2);
var seq135__$3 = cljs.core.next.call(null,seq135__$2);
return cljs.spec$macros._AMPERSAND_.cljs$core$IFn$_invoke$arity$variadic(G__136,G__137,G__138,seq135__$3);
});

new cljs.core.Var(function(){return cljs.spec$macros._AMPERSAND_;},new cljs.core.Symbol("cljs.spec$macros","&","cljs.spec$macros/&",(-829981460),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),"cljs/spec.cljc",(12),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"re","re",(1869207729),null),new cljs.core.Symbol(null,"preds","preds",(150921777),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"re","re",(1869207729),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"preds","preds",(150921777),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(318),true,(318),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"re","re",(1869207729),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"preds","preds",(150921777),null)], null)),"takes a regex op re, and predicates. Returns a regex-op that consumes\n  input as per re but subjects the resulting value to the\n  conjunction of the predicates, and any conforming they might perform.",(cljs.core.truth_(cljs.spec$macros._AMPERSAND_)?cljs.spec$macros._AMPERSAND_.cljs$lang$test:null)]));

cljs.spec$macros._AMPERSAND_.cljs$lang$macro = true;
/**
 * takes a predicate function with the semantics of conform i.e. it should return either a
 *   (possibly converted) value or :cljs.spec/invalid, and returns a
 *   spec that uses it as a predicate/conformer. Optionally takes a
 *   second fn that does unform of result of first
 */
(function (){
cljs.spec$macros.conformer = (function cljs$spec$macros$conformer(var_args){
var args142 = [];
var len__23663__auto___145 = arguments.length;
var i__23664__auto___146 = (0);
while(true){
if((i__23664__auto___146 < len__23663__auto___145)){
args142.push((arguments[i__23664__auto___146]));

var G__147 = (i__23664__auto___146 + (1));
i__23664__auto___146 = G__147;
continue;
} else {
}
break;
}

var G__144 = args142.length;
switch (G__144) {
case (3):
return cljs.spec$macros.conformer.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case (4):
return cljs.spec$macros.conformer.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str((args142.length - (2)))].join('')));

}
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.conformer;},new cljs.core.Symbol("cljs.spec$macros","conformer","cljs.spec$macros/conformer",(-391061430),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"conformer","conformer",(-651689994),null),"cljs/spec.cljc",(20),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),false,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(4),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"f","f",(43394975),null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"f","f",(43394975),null),new cljs.core.Symbol(null,"unf","unf",(-1663126605),null)], null)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"f","f",(43394975),null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"f","f",(43394975),null),new cljs.core.Symbol(null,"unf","unf",(-1663126605),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null,null)], null),(1),(326),true,(326),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"f","f",(43394975),null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"f","f",(43394975),null),new cljs.core.Symbol(null,"unf","unf",(-1663126605),null)], null)),"takes a predicate function with the semantics of conform i.e. it should return either a\n  (possibly converted) value or :cljs.spec/invalid, and returns a\n  spec that uses it as a predicate/conformer. Optionally takes a\n  second fn that does unform of result of first",(cljs.core.truth_(cljs.spec$macros.conformer)?cljs.spec$macros.conformer.cljs$lang$test:null)])));})()
;

cljs.spec$macros.conformer.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,f){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","spec-impl","cljs.spec/spec-impl",(-1647407472),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = f;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = f;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,null),cljs.core._conj.call(null,cljs.core.List.EMPTY,true)));
});

cljs.spec$macros.conformer.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,f,unf){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","spec-impl","cljs.spec/spec-impl",(-1647407472),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = f;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = f;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,null),cljs.core._conj.call(null,cljs.core.List.EMPTY,true),(function (){var x__23406__auto__ = unf;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
});

cljs.spec$macros.conformer.cljs$lang$maxFixedArity = (4);

new cljs.core.Var(function(){return cljs.spec$macros.conformer;},new cljs.core.Symbol("cljs.spec$macros","conformer","cljs.spec$macros/conformer",(-391061430),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"conformer","conformer",(-651689994),null),"cljs/spec.cljc",(20),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),false,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(4),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"f","f",(43394975),null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"f","f",(43394975),null),new cljs.core.Symbol(null,"unf","unf",(-1663126605),null)], null)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"f","f",(43394975),null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"f","f",(43394975),null),new cljs.core.Symbol(null,"unf","unf",(-1663126605),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null,null)], null),(1),(326),true,(326),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"f","f",(43394975),null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"f","f",(43394975),null),new cljs.core.Symbol(null,"unf","unf",(-1663126605),null)], null)),"takes a predicate function with the semantics of conform i.e. it should return either a\n  (possibly converted) value or :cljs.spec/invalid, and returns a\n  spec that uses it as a predicate/conformer. Optionally takes a\n  second fn that does unform of result of first",(cljs.core.truth_(cljs.spec$macros.conformer)?cljs.spec$macros.conformer.cljs$lang$test:null)]));

cljs.spec$macros.conformer.cljs$lang$macro = true;
/**
 * takes :args :ret and (optional) :fn kwargs whose values are preds
 *   and returns a spec whose conform/explain take a fn and validates it
 *   using generative testing. The conformed value is always the fn itself.
 * 
 *   See 'fdef' for a single operation that creates an fspec and
 *   registers it, as well as a full description of :args, :ret and :fn
 * 
 *   fspecs can generate functions that validate the arguments and
 *   fabricate a return value compliant with the :ret spec, ignoring
 *   the :fn spec if present.
 * 
 *   Optionally takes :gen generator-fn, which must be a fn of no args
 *   that returns a test.check generator.
 */
(function (){
cljs.spec$macros.fspec = (function cljs$spec$macros$fspec(var_args){
var args__23665__auto__ = [];
var len__23663__auto___155 = arguments.length;
var i__23664__auto___156 = (0);
while(true){
if((i__23664__auto___156 < len__23663__auto___155)){
args__23665__auto__.push((arguments[i__23664__auto___156]));

var G__157 = (i__23664__auto___156 + (1));
i__23664__auto___156 = G__157;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((2) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((2)),(0),null)):null);
return cljs.spec$macros.fspec.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.fspec;},new cljs.core.Symbol("cljs.spec$macros","fspec","cljs.spec$macros/fspec",(740325660),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"fspec","fspec",(1380883392),null),"cljs/spec.cljc",(16),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"args","args",(-1338879193),null),new cljs.core.Symbol(null,"ret","ret",(1172308713),null),new cljs.core.Symbol(null,"fn","fn",(465265323),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"args","args",(-1338879193),null),new cljs.core.Symbol(null,"ret","ret",(1172308713),null),new cljs.core.Symbol(null,"fn","fn",(465265323),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(334),true,(334),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"args","args",(-1338879193),null),new cljs.core.Symbol(null,"ret","ret",(1172308713),null),new cljs.core.Symbol(null,"fn","fn",(465265323),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null)], null)),"takes :args :ret and (optional) :fn kwargs whose values are preds\n  and returns a spec whose conform/explain take a fn and validates it\n  using generative testing. The conformed value is always the fn itself.\n\n  See 'fdef' for a single operation that creates an fspec and\n  registers it, as well as a full description of :args, :ret and :fn\n\n  fspecs can generate functions that validate the arguments and\n  fabricate a return value compliant with the :ret spec, ignoring\n  the :fn spec if present.\n\n  Optionally takes :gen generator-fn, which must be a fn of no args\n  that returns a test.check generator.",(cljs.core.truth_(cljs.spec$macros.fspec)?cljs.spec$macros.fspec.cljs$lang$test:null)])));})()
;

cljs.spec$macros.fspec.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,p__152){
var map__153 = p__152;
var map__153__$1 = ((((!((map__153 == null)))?((((map__153.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__153.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__153):map__153);
var args = cljs.core.get.call(null,map__153__$1,new cljs.core.Keyword(null,"args","args",(1315556576)));
var ret = cljs.core.get.call(null,map__153__$1,new cljs.core.Keyword(null,"ret","ret",(-468222814)));
var fn = cljs.core.get.call(null,map__153__$1,new cljs.core.Keyword(null,"fn","fn",(-1175266204)));
var gen = cljs.core.get.call(null,map__153__$1,new cljs.core.Keyword(null,"gen","gen",(142575302)));
var env = _AMPERSAND_env;
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","fspec-impl","cljs.spec/fspec-impl",(221076141),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","spec","cljs.spec/spec",(775251713),null)),(function (){var x__23406__auto__ = args;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = cljs.spec$macros.res.call(null,env,args);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","spec","cljs.spec/spec",(775251713),null)),(function (){var x__23406__auto__ = ret;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = cljs.spec$macros.res.call(null,env,ret);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","spec","cljs.spec/spec",(775251713),null)),(function (){var x__23406__auto__ = fn;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = cljs.spec$macros.res.call(null,env,fn);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = gen;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
});

cljs.spec$macros.fspec.cljs$lang$maxFixedArity = (2);

cljs.spec$macros.fspec.cljs$lang$applyTo = (function (seq149){
var G__150 = cljs.core.first.call(null,seq149);
var seq149__$1 = cljs.core.next.call(null,seq149);
var G__151 = cljs.core.first.call(null,seq149__$1);
var seq149__$2 = cljs.core.next.call(null,seq149__$1);
return cljs.spec$macros.fspec.cljs$core$IFn$_invoke$arity$variadic(G__150,G__151,seq149__$2);
});

new cljs.core.Var(function(){return cljs.spec$macros.fspec;},new cljs.core.Symbol("cljs.spec$macros","fspec","cljs.spec$macros/fspec",(740325660),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"fspec","fspec",(1380883392),null),"cljs/spec.cljc",(16),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"args","args",(-1338879193),null),new cljs.core.Symbol(null,"ret","ret",(1172308713),null),new cljs.core.Symbol(null,"fn","fn",(465265323),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"args","args",(-1338879193),null),new cljs.core.Symbol(null,"ret","ret",(1172308713),null),new cljs.core.Symbol(null,"fn","fn",(465265323),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(334),true,(334),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"args","args",(-1338879193),null),new cljs.core.Symbol(null,"ret","ret",(1172308713),null),new cljs.core.Symbol(null,"fn","fn",(465265323),null),new cljs.core.Symbol(null,"gen","gen",(1783106829),null)], null)], null)], null)),"takes :args :ret and (optional) :fn kwargs whose values are preds\n  and returns a spec whose conform/explain take a fn and validates it\n  using generative testing. The conformed value is always the fn itself.\n\n  See 'fdef' for a single operation that creates an fspec and\n  registers it, as well as a full description of :args, :ret and :fn\n\n  fspecs can generate functions that validate the arguments and\n  fabricate a return value compliant with the :ret spec, ignoring\n  the :fn spec if present.\n\n  Optionally takes :gen generator-fn, which must be a fn of no args\n  that returns a test.check generator.",(cljs.core.truth_(cljs.spec$macros.fspec)?cljs.spec$macros.fspec.cljs$lang$test:null)]));

cljs.spec$macros.fspec.cljs$lang$macro = true;
/**
 * takes one or more preds and returns a spec for a tuple, a vector
 *   where each element conforms to the corresponding pred. Each element
 *   will be referred to in paths using its ordinal.
 */
(function (){
cljs.spec$macros.tuple = (function cljs$spec$macros$tuple(var_args){
var args__23665__auto__ = [];
var len__23663__auto___161 = arguments.length;
var i__23664__auto___162 = (0);
while(true){
if((i__23664__auto___162 < len__23663__auto___161)){
args__23665__auto__.push((arguments[i__23664__auto___162]));

var G__163 = (i__23664__auto___162 + (1));
i__23664__auto___162 = G__163;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((2) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((2)),(0),null)):null);
return cljs.spec$macros.tuple.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.tuple;},new cljs.core.Symbol("cljs.spec$macros","tuple","cljs.spec$macros/tuple",(304796287),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"tuple","tuple",(1167864243),null),"cljs/spec.cljc",(16),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"preds","preds",(150921777),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"preds","preds",(150921777),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(354),true,(354),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"preds","preds",(150921777),null)], null)),"takes one or more preds and returns a spec for a tuple, a vector\n  where each element conforms to the corresponding pred. Each element\n  will be referred to in paths using its ordinal.",(cljs.core.truth_(cljs.spec$macros.tuple)?cljs.spec$macros.tuple.cljs$lang$test:null)])));})()
;

cljs.spec$macros.tuple.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,preds){
if(!(cljs.core.empty_QMARK_.call(null,preds))){
} else {
throw (new Error("Assert failed: (not (empty? preds))"));
}

return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","tuple-impl","cljs.spec/tuple-impl",(-1888860774),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = cljs.core.mapv.call(null,(function (p1__16_SHARP_){
return cljs.spec$macros.res.call(null,_AMPERSAND_env,p1__16_SHARP_);
}),preds);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.vec.call(null,preds);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
});

cljs.spec$macros.tuple.cljs$lang$maxFixedArity = (2);

cljs.spec$macros.tuple.cljs$lang$applyTo = (function (seq158){
var G__159 = cljs.core.first.call(null,seq158);
var seq158__$1 = cljs.core.next.call(null,seq158);
var G__160 = cljs.core.first.call(null,seq158__$1);
var seq158__$2 = cljs.core.next.call(null,seq158__$1);
return cljs.spec$macros.tuple.cljs$core$IFn$_invoke$arity$variadic(G__159,G__160,seq158__$2);
});

new cljs.core.Var(function(){return cljs.spec$macros.tuple;},new cljs.core.Symbol("cljs.spec$macros","tuple","cljs.spec$macros/tuple",(304796287),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"tuple","tuple",(1167864243),null),"cljs/spec.cljc",(16),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"preds","preds",(150921777),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"preds","preds",(150921777),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(354),true,(354),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"preds","preds",(150921777),null)], null)),"takes one or more preds and returns a spec for a tuple, a vector\n  where each element conforms to the corresponding pred. Each element\n  will be referred to in paths using its ordinal.",(cljs.core.truth_(cljs.spec$macros.tuple)?cljs.spec$macros.tuple.cljs$lang$test:null)]));

cljs.spec$macros.tuple.cljs$lang$macro = true;
(function (){
cljs.spec$macros._speced_vars = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY); return (
new cljs.core.Var(function(){return cljs.spec$macros._speced_vars;},new cljs.core.Symbol("cljs.spec$macros","_speced_vars","cljs.spec$macros/_speced_vars",(-580093468),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"_speced_vars","_speced_vars",(-1946182864),null),"cljs/spec.cljc",(28),(1),(362),(362),cljs.core.List.EMPTY,null,(cljs.core.truth_(cljs.spec$macros._speced_vars)?cljs.spec$macros._speced_vars.cljs$lang$test:null)])));})()
;
(function (){
cljs.spec$macros.speced_vars = (function cljs$spec$macros$speced_vars(){
return cljs.core.deref.call(null,cljs.spec$macros._speced_vars);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.speced_vars;},new cljs.core.Symbol("cljs.spec$macros","speced-vars","cljs.spec$macros/speced-vars",(-1488516777),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"speced-vars","speced-vars",(-172594461),null),"cljs/spec.cljc",(18),(1),(364),(364),cljs.core.list(cljs.core.PersistentVector.EMPTY),null,(cljs.core.truth_(cljs.spec$macros.speced_vars)?cljs.spec$macros.speced_vars.cljs$lang$test:null)])));})()
;
/**
 * Takes a symbol naming a function, and one or more of the following:
 * 
 *   :args A regex spec for the function arguments as they were a list to be
 *  passed to apply - in this way, a single spec can handle functions with
 *  multiple arities
 *   :ret A spec for the function's return value
 *   :fn A spec of the relationship between args and ret - the
 *  value passed is {:args conformed-args :ret conformed-ret} and is
 *  expected to contain predicates that relate those values
 * 
 *   Qualifies fn-sym with resolve, or using *ns* if no resolution found.
 *   Registers an fspec in the global registry, where it can be retrieved
 *   by calling get-spec with the var or full-qualified symbol.
 * 
 *   Once registered, function specs are included in doc, checked by
 *   instrument, tested by the runner clojure.spec.test/run-tests, and (if
 *   a macro) used to explain errors during macroexpansion.
 * 
 *   Note that :fn specs require the presence of :args and :ret specs to
 *   conform values, and so :fn specs will be ignored if :args or :ret
 *   are missing.
 * 
 *   Returns the qualified fn-sym.
 * 
 *   For example, to register function specs for the symbol function:
 * 
 *   (s/fdef clojure.core/symbol
 *  :args (s/alt :separate (s/cat :ns string? :n string?)
 *               :str string?
 *               :sym symbol?)
 *  :ret symbol?)
 */
(function (){
cljs.spec$macros.fdef = (function cljs$spec$macros$fdef(var_args){
var args__23665__auto__ = [];
var len__23663__auto___168 = arguments.length;
var i__23664__auto___169 = (0);
while(true){
if((i__23664__auto___169 < len__23663__auto___168)){
args__23665__auto__.push((arguments[i__23664__auto___169]));

var G__170 = (i__23664__auto___169 + (1));
i__23664__auto___169 = G__170;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((3) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((3)),(0),null)):null);
return cljs.spec$macros.fdef.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.fdef;},new cljs.core.Symbol("cljs.spec$macros","fdef","cljs.spec$macros/fdef",(1257250891),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"fdef","fdef",(459719359),null),"cljs/spec.cljc",(15),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"fn-sym","fn-sym",(-1230447259),null),new cljs.core.Symbol(null,"specs","specs",(-1227865028),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"fn-sym","fn-sym",(-1230447259),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"specs","specs",(-1227865028),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(367),true,(367),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"fn-sym","fn-sym",(-1230447259),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"specs","specs",(-1227865028),null)], null)),"Takes a symbol naming a function, and one or more of the following:\n\n  :args A regex spec for the function arguments as they were a list to be\n    passed to apply - in this way, a single spec can handle functions with\n    multiple arities\n  :ret A spec for the function's return value\n  :fn A spec of the relationship between args and ret - the\n    value passed is {:args conformed-args :ret conformed-ret} and is\n    expected to contain predicates that relate those values\n\n  Qualifies fn-sym with resolve, or using *ns* if no resolution found.\n  Registers an fspec in the global registry, where it can be retrieved\n  by calling get-spec with the var or full-qualified symbol.\n\n  Once registered, function specs are included in doc, checked by\n  instrument, tested by the runner clojure.spec.test/run-tests, and (if\n  a macro) used to explain errors during macroexpansion.\n\n  Note that :fn specs require the presence of :args and :ret specs to\n  conform values, and so :fn specs will be ignored if :args or :ret\n  are missing.\n\n  Returns the qualified fn-sym.\n\n  For example, to register function specs for the symbol function:\n\n  (s/fdef clojure.core/symbol\n    :args (s/alt :separate (s/cat :ns string? :n string?)\n                 :str string?\n                 :sym symbol?)\n    :ret symbol?)",(cljs.core.truth_(cljs.spec$macros.fdef)?cljs.spec$macros.fdef.cljs$lang$test:null)])));})()
;

cljs.spec$macros.fdef.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,fn_sym,specs){
cljs.core.swap_BANG_.call(null,cljs.spec$macros._speced_vars,cljs.core.conj,cljs.spec$macros.ns_qualify.call(null,_AMPERSAND_env,fn_sym));

return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","def","cljs.spec/def",(-666033036),null)),(function (){var x__23406__auto__ = fn_sym;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","fspec","cljs.spec/fspec",(982220571),null)),specs));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
});

cljs.spec$macros.fdef.cljs$lang$maxFixedArity = (3);

cljs.spec$macros.fdef.cljs$lang$applyTo = (function (seq164){
var G__165 = cljs.core.first.call(null,seq164);
var seq164__$1 = cljs.core.next.call(null,seq164);
var G__166 = cljs.core.first.call(null,seq164__$1);
var seq164__$2 = cljs.core.next.call(null,seq164__$1);
var G__167 = cljs.core.first.call(null,seq164__$2);
var seq164__$3 = cljs.core.next.call(null,seq164__$2);
return cljs.spec$macros.fdef.cljs$core$IFn$_invoke$arity$variadic(G__165,G__166,G__167,seq164__$3);
});

new cljs.core.Var(function(){return cljs.spec$macros.fdef;},new cljs.core.Symbol("cljs.spec$macros","fdef","cljs.spec$macros/fdef",(1257250891),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"fdef","fdef",(459719359),null),"cljs/spec.cljc",(15),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(3),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"fn-sym","fn-sym",(-1230447259),null),new cljs.core.Symbol(null,"specs","specs",(-1227865028),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"fn-sym","fn-sym",(-1230447259),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"specs","specs",(-1227865028),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(367),true,(367),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"fn-sym","fn-sym",(-1230447259),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"specs","specs",(-1227865028),null)], null)),"Takes a symbol naming a function, and one or more of the following:\n\n  :args A regex spec for the function arguments as they were a list to be\n    passed to apply - in this way, a single spec can handle functions with\n    multiple arities\n  :ret A spec for the function's return value\n  :fn A spec of the relationship between args and ret - the\n    value passed is {:args conformed-args :ret conformed-ret} and is\n    expected to contain predicates that relate those values\n\n  Qualifies fn-sym with resolve, or using *ns* if no resolution found.\n  Registers an fspec in the global registry, where it can be retrieved\n  by calling get-spec with the var or full-qualified symbol.\n\n  Once registered, function specs are included in doc, checked by\n  instrument, tested by the runner clojure.spec.test/run-tests, and (if\n  a macro) used to explain errors during macroexpansion.\n\n  Note that :fn specs require the presence of :args and :ret specs to\n  conform values, and so :fn specs will be ignored if :args or :ret\n  are missing.\n\n  Returns the qualified fn-sym.\n\n  For example, to register function specs for the symbol function:\n\n  (s/fdef clojure.core/symbol\n    :args (s/alt :separate (s/cat :ns string? :n string?)\n                 :str string?\n                 :sym symbol?)\n    :ret symbol?)",(cljs.core.truth_(cljs.spec$macros.fdef)?cljs.spec$macros.fdef.cljs$lang$test:null)]));

cljs.spec$macros.fdef.cljs$lang$macro = true;
/**
 * takes the same arguments as spec/keys and returns a regex op that matches sequences of key/values,
 *   converts them into a map, and conforms that map with a corresponding
 *   spec/keys call:
 * 
 *   user=> (s/conform (s/keys :req-un [::a ::c]) {:a 1 :c 2})
 *   {:a 1, :c 2}
 *   user=> (s/conform (s/keys* :req-un [::a ::c]) [:a 1 :c 2])
 *   {:a 1, :c 2}
 * 
 *   the resulting regex op can be composed into a larger regex:
 * 
 *   user=> (s/conform (s/cat :i1 integer? :m (s/keys* :req-un [::a ::c]) :i2 integer?) [42 :a 1 :c 2 :d 4 99])
 *   {:i1 42, :m {:a 1, :c 2, :d 4}, :i2 99}
 */
(function (){
cljs.spec$macros.keys_STAR_ = (function cljs$spec$macros$keys_STAR_(var_args){
var args__23665__auto__ = [];
var len__23663__auto___174 = arguments.length;
var i__23664__auto___175 = (0);
while(true){
if((i__23664__auto___175 < len__23663__auto___174)){
args__23665__auto__.push((arguments[i__23664__auto___175]));

var G__176 = (i__23664__auto___175 + (1));
i__23664__auto___175 = G__176;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((2) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((2)),(0),null)):null);
return cljs.spec$macros.keys_STAR_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.keys_STAR_;},new cljs.core.Symbol("cljs.spec$macros","keys*","cljs.spec$macros/keys*",(-1177553610),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"keys*","keys*",(-816260990),null),"cljs/spec.cljc",(16),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"kspecs","kspecs",(564840629),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"kspecs","kspecs",(564840629),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(403),true,(403),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"kspecs","kspecs",(564840629),null)], null)),"takes the same arguments as spec/keys and returns a regex op that matches sequences of key/values,\n  converts them into a map, and conforms that map with a corresponding\n  spec/keys call:\n\n  user=> (s/conform (s/keys :req-un [::a ::c]) {:a 1 :c 2})\n  {:a 1, :c 2}\n  user=> (s/conform (s/keys* :req-un [::a ::c]) [:a 1 :c 2])\n  {:a 1, :c 2}\n\n  the resulting regex op can be composed into a larger regex:\n\n  user=> (s/conform (s/cat :i1 integer? :m (s/keys* :req-un [::a ::c]) :i2 integer?) [42 :a 1 :c 2 :d 4 99])\n  {:i1 42, :m {:a 1, :c 2, :d 4}, :i2 99}",(cljs.core.truth_(cljs.spec$macros.keys_STAR_)?cljs.spec$macros.keys_STAR_.cljs$lang$test:null)])));})()
;

cljs.spec$macros.keys_STAR_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,kspecs){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",(-308701135),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"mspec__17__auto__","mspec__17__auto__",(-643111901),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","keys","cljs.spec/keys",(-927379584),null)),kspecs));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","with-gen","cljs.spec/with-gen",(-53488124),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"&","&",(-2144855648),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","*","cljs.spec/*",(-858366320),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","cat","cljs.spec/cat",(850003863),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword("cljs.spec","k","cljs.spec/k",(668466950))),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",(713156450),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword("cljs.spec","v","cljs.spec/v",(-1491964132))),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",(-2068111842),null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword("cljs.spec","kvs->map","cljs.spec/kvs->map",(-1189105441))),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"mspec__17__auto__","mspec__17__auto__",(-643111901),null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",(-1065745098),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec.impl.gen","fmap","cljs.spec.impl.gen/fmap",(-1115961083),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",(-1065745098),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"m__18__auto__","m__18__auto__",(-1623035992),null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","apply","cljs.core/apply",(1757277831),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","concat","cljs.core/concat",(-1133584918),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"m__18__auto__","m__18__auto__",(-1623035992),null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","gen","cljs.spec/gen",(-2101972796),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"mspec__17__auto__","mspec__17__auto__",(-643111901),null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
});

cljs.spec$macros.keys_STAR_.cljs$lang$maxFixedArity = (2);

cljs.spec$macros.keys_STAR_.cljs$lang$applyTo = (function (seq171){
var G__172 = cljs.core.first.call(null,seq171);
var seq171__$1 = cljs.core.next.call(null,seq171);
var G__173 = cljs.core.first.call(null,seq171__$1);
var seq171__$2 = cljs.core.next.call(null,seq171__$1);
return cljs.spec$macros.keys_STAR_.cljs$core$IFn$_invoke$arity$variadic(G__172,G__173,seq171__$2);
});

new cljs.core.Var(function(){return cljs.spec$macros.keys_STAR_;},new cljs.core.Symbol("cljs.spec$macros","keys*","cljs.spec$macros/keys*",(-1177553610),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"keys*","keys*",(-816260990),null),"cljs/spec.cljc",(16),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"kspecs","kspecs",(564840629),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"kspecs","kspecs",(564840629),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(403),true,(403),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"kspecs","kspecs",(564840629),null)], null)),"takes the same arguments as spec/keys and returns a regex op that matches sequences of key/values,\n  converts them into a map, and conforms that map with a corresponding\n  spec/keys call:\n\n  user=> (s/conform (s/keys :req-un [::a ::c]) {:a 1 :c 2})\n  {:a 1, :c 2}\n  user=> (s/conform (s/keys* :req-un [::a ::c]) [:a 1 :c 2])\n  {:a 1, :c 2}\n\n  the resulting regex op can be composed into a larger regex:\n\n  user=> (s/conform (s/cat :i1 integer? :m (s/keys* :req-un [::a ::c]) :i2 integer?) [42 :a 1 :c 2 :d 4 99])\n  {:i1 42, :m {:a 1, :c 2, :d 4}, :i2 99}",(cljs.core.truth_(cljs.spec$macros.keys_STAR_)?cljs.spec$macros.keys_STAR_.cljs$lang$test:null)]));

cljs.spec$macros.keys_STAR_.cljs$lang$macro = true;
/**
 * returns a spec that accepts nil and values satisfiying pred
 */
(function (){
cljs.spec$macros.nilable = (function cljs$spec$macros$nilable(_AMPERSAND_form,_AMPERSAND_env,pred){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","and","cljs.spec/and",(-7296553),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","or","cljs.spec/or",(1200597689),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword("cljs.spec","nil","cljs.spec/nil",(1576652718))),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","nil?","cljs.core/nil?",(945071861),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword("cljs.spec","pred","cljs.spec/pred",(1523333614))),(function (){var x__23406__auto__ = pred;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","conformer","cljs.spec/conformer",(-236330417),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","second","cljs.core/second",(520555958),null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.nilable;},new cljs.core.Symbol("cljs.spec$macros","nilable","cljs.spec$macros/nilable",(-66780999),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"nilable","nilable",(-812128667),null),"cljs/spec.cljc",(18),(1),(422),true,(422),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"pred","pred",(-727012372),null)], null)),"returns a spec that accepts nil and values satisfiying pred",(cljs.core.truth_(cljs.spec$macros.nilable)?cljs.spec$macros.nilable.cljs$lang$test:null)])));})()
;

cljs.spec$macros.nilable.cljs$lang$macro = true;
/**
 * Returns a spec that validates insts in the range from start
 *   (inclusive) to end (exclusive).
 */
(function (){
cljs.spec$macros.inst_in = (function cljs$spec$macros$inst_in(_AMPERSAND_form,_AMPERSAND_env,start,end){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",(-308701135),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"st__20__auto__","st__20__auto__",(-843410432),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","inst-ms","cljs.core/inst-ms",(-515575156),null)),(function (){var x__23406__auto__ = start;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"et__21__auto__","et__21__auto__",(1385884389),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","inst-ms","cljs.core/inst-ms",(-515575156),null)),(function (){var x__23406__auto__ = end;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"mkdate__22__auto__","mkdate__22__auto__",(-1789968832),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",(-1065745098),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"d__23__auto__","d__23__auto__",(1119613587),null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("js","Date.","js/Date.",(384205255),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"d__23__auto__","d__23__auto__",(1119613587),null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","spec","cljs.spec/spec",(775251713),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","and","cljs.spec/and",(-7296553),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","inst?","cljs.core/inst?",(1216133710),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"fn*","fn*",(-752876845),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"p1__19__24__auto__","p1__19__24__auto__",(42236604),null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","inst-in-range?","cljs.spec/inst-in-range?",(827763250),null)),(function (){var x__23406__auto__ = start;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = end;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"p1__19__24__auto__","p1__19__24__auto__",(42236604),null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"gen","gen",(142575302))),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",(-1065745098),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec.impl.gen","fmap","cljs.spec.impl.gen/fmap",(-1115961083),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"mkdate__22__auto__","mkdate__22__auto__",(-1789968832),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec.impl.gen","large-integer*","cljs.spec.impl.gen/large-integer*",(749084369),null)),(function (){var x__23406__auto__ = cljs.core.apply.call(null,cljs.core.array_map,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"min","min",(444991522))),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"st__20__auto__","st__20__auto__",(-843410432),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"max","max",(61366548))),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"et__21__auto__","et__21__auto__",(1385884389),null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.inst_in;},new cljs.core.Symbol("cljs.spec$macros","inst-in","cljs.spec$macros/inst-in",(-1964569087),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"inst-in","inst-in",(1164979645),null),"cljs/spec.cljc",(18),(1),(427),true,(427),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"start","start",(1285322546),null),new cljs.core.Symbol(null,"end","end",(1372345569),null)], null)),"Returns a spec that validates insts in the range from start\n  (inclusive) to end (exclusive).",(cljs.core.truth_(cljs.spec$macros.inst_in)?cljs.spec$macros.inst_in.cljs$lang$test:null)])));})()
;

cljs.spec$macros.inst_in.cljs$lang$macro = true;
/**
 * Returns a spec that validates longs in the range from start
 *   (inclusive) to end (exclusive).
 */
(function (){
cljs.spec$macros.int_in = (function cljs$spec$macros$int_in(_AMPERSAND_form,_AMPERSAND_env,start,end){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","spec","cljs.spec/spec",(775251713),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","and","cljs.spec/and",(-7296553),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","int?","cljs.core/int?",(50730120),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"fn*","fn*",(-752876845),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"p1__25__26__auto__","p1__25__26__auto__",(461983337),null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","int-in-range?","cljs.spec/int-in-range?",(-1880930716),null)),(function (){var x__23406__auto__ = start;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = end;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"p1__25__26__auto__","p1__25__26__auto__",(461983337),null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"gen","gen",(142575302))),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"fn*","fn*",(-752876845),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec.impl.gen","large-integer*","cljs.spec.impl.gen/large-integer*",(749084369),null)),(function (){var x__23406__auto__ = cljs.core.apply.call(null,cljs.core.array_map,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"min","min",(444991522))),(function (){var x__23406__auto__ = start;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"max","max",(61366548))),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","dec","cljs.core/dec",(-443230268),null)),(function (){var x__23406__auto__ = end;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.int_in;},new cljs.core.Symbol("cljs.spec$macros","int-in","cljs.spec$macros/int-in",(-196058407),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"int-in","int-in",(664882605),null),"cljs/spec.cljc",(17),(1),(439),true,(439),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"start","start",(1285322546),null),new cljs.core.Symbol(null,"end","end",(1372345569),null)], null)),"Returns a spec that validates longs in the range from start\n  (inclusive) to end (exclusive).",(cljs.core.truth_(cljs.spec$macros.int_in)?cljs.spec$macros.int_in.cljs$lang$test:null)])));})()
;

cljs.spec$macros.int_in.cljs$lang$macro = true;
/**
 * Specs a 64-bit floating point number. Options:
 * 
 *  :infinite? - whether +/- infinity allowed (default true)
 *  :NaN?      - whether NaN allowed (default true)
 *  :min       - minimum value (inclusive, default none)
 *  :max       - maximum value (inclusive, default none)
 */
(function (){
cljs.spec$macros.double_in = (function cljs$spec$macros$double_in(var_args){
var args__23665__auto__ = [];
var len__23663__auto___183 = arguments.length;
var i__23664__auto___184 = (0);
while(true){
if((i__23664__auto___184 < len__23663__auto___183)){
args__23665__auto__.push((arguments[i__23664__auto___184]));

var G__185 = (i__23664__auto___184 + (1));
i__23664__auto___184 = G__185;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((2) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((2)),(0),null)):null);
return cljs.spec$macros.double_in.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.double_in;},new cljs.core.Symbol("cljs.spec$macros","double-in","cljs.spec$macros/double-in",(-1638120543),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"double-in","double-in",(-303226659),null),"cljs/spec.cljc",(20),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"as","as",(1148689641)),new cljs.core.Symbol(null,"m","m",(-1021758608),null),new cljs.core.Keyword(null,"or","or",(235744169)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"NaN?","NaN?",(-277236124),null),true,new cljs.core.Symbol(null,"infinite?","infinite?",(-377355081),null),true], null),new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"infinite?","infinite?",(-377355081),null),new cljs.core.Symbol(null,"NaN?","NaN?",(-277236124),null),new cljs.core.Symbol(null,"min","min",(2085523049),null),new cljs.core.Symbol(null,"max","max",(1701898075),null)], null)], null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"as","as",(1148689641)),new cljs.core.Symbol(null,"m","m",(-1021758608),null),new cljs.core.Keyword(null,"or","or",(235744169)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"NaN?","NaN?",(-277236124),null),true,new cljs.core.Symbol(null,"infinite?","infinite?",(-377355081),null),true], null),new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"infinite?","infinite?",(-377355081),null),new cljs.core.Symbol(null,"NaN?","NaN?",(-277236124),null),new cljs.core.Symbol(null,"min","min",(2085523049),null),new cljs.core.Symbol(null,"max","max",(1701898075),null)], null)], null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(446),true,(446),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"as","as",(1148689641)),new cljs.core.Symbol(null,"m","m",(-1021758608),null),new cljs.core.Keyword(null,"or","or",(235744169)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"NaN?","NaN?",(-277236124),null),true,new cljs.core.Symbol(null,"infinite?","infinite?",(-377355081),null),true], null),new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"infinite?","infinite?",(-377355081),null),new cljs.core.Symbol(null,"NaN?","NaN?",(-277236124),null),new cljs.core.Symbol(null,"min","min",(2085523049),null),new cljs.core.Symbol(null,"max","max",(1701898075),null)], null)], null)], null)),"Specs a 64-bit floating point number. Options:\n\n    :infinite? - whether +/- infinity allowed (default true)\n    :NaN?      - whether NaN allowed (default true)\n    :min       - minimum value (inclusive, default none)\n    :max       - maximum value (inclusive, default none)",(cljs.core.truth_(cljs.spec$macros.double_in)?cljs.spec$macros.double_in.cljs$lang$test:null)])));})()
;

cljs.spec$macros.double_in.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,p__180){
var map__181 = p__180;
var map__181__$1 = ((((!((map__181 == null)))?((((map__181.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__181.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__181):map__181);
var m = map__181__$1;
var NaN_QMARK_ = cljs.core.get.call(null,map__181__$1,new cljs.core.Keyword(null,"NaN?","NaN?",(-1917767651)),true);
var min = cljs.core.get.call(null,map__181__$1,new cljs.core.Keyword(null,"min","min",(444991522)));
var infinite_QMARK_ = cljs.core.get.call(null,map__181__$1,new cljs.core.Keyword(null,"infinite?","infinite?",(-2017886608)),true);
var max = cljs.core.get.call(null,map__181__$1,new cljs.core.Keyword(null,"max","max",(61366548)));
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","spec","cljs.spec/spec",(775251713),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","and","cljs.spec/and",(-7296553),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","double?","cljs.core/double?",(1757455529),null)),(cljs.core.truth_(infinite_QMARK_)?null:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",(-752876845),null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__27#","p1__27#",(-2093396159),null)], null),cljs.core.list(new cljs.core.Symbol(null,"not","not",(1044554643),null),cljs.core.list(new cljs.core.Symbol(null,"infinite?","infinite?",(-377355081),null),new cljs.core.Symbol(null,"p1__27#","p1__27#",(-2093396159),null))))], null)),(cljs.core.truth_(NaN_QMARK_)?null:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",(-752876845),null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__28#","p1__28#",(1244196902),null)], null),cljs.core.list(new cljs.core.Symbol(null,"not","not",(1044554643),null),cljs.core.list(new cljs.core.Symbol("js","isNaN","js/isNaN",(74901299),null),new cljs.core.Symbol(null,"p1__28#","p1__28#",(1244196902),null))))], null)),(cljs.core.truth_(max)?cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"fn*","fn*",(-752876845),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"p1__29__30__auto__","p1__29__30__auto__",(-1548410461),null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","<=","cljs.core/<=",(1677001748),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"p1__29__30__auto__","p1__29__30__auto__",(-1548410461),null)),(function (){var x__23406__auto__ = max;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()))):null),(cljs.core.truth_(min)?cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"fn*","fn*",(-752876845),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"p1__31__32__auto__","p1__31__32__auto__",(-1746188242),null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","<=","cljs.core/<=",(1677001748),null)),(function (){var x__23406__auto__ = min;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"p1__31__32__auto__","p1__31__32__auto__",(-1746188242),null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()))):null)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"gen","gen",(142575302))),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"fn*","fn*",(-752876845),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec.impl.gen","double*","cljs.spec.impl.gen/double*",(1793576798),null)),(function (){var x__23406__auto__ = m;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
});

cljs.spec$macros.double_in.cljs$lang$maxFixedArity = (2);

cljs.spec$macros.double_in.cljs$lang$applyTo = (function (seq177){
var G__178 = cljs.core.first.call(null,seq177);
var seq177__$1 = cljs.core.next.call(null,seq177);
var G__179 = cljs.core.first.call(null,seq177__$1);
var seq177__$2 = cljs.core.next.call(null,seq177__$1);
return cljs.spec$macros.double_in.cljs$core$IFn$_invoke$arity$variadic(G__178,G__179,seq177__$2);
});

new cljs.core.Var(function(){return cljs.spec$macros.double_in;},new cljs.core.Symbol("cljs.spec$macros","double-in","cljs.spec$macros/double-in",(-1638120543),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"double-in","double-in",(-303226659),null),"cljs/spec.cljc",(20),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"as","as",(1148689641)),new cljs.core.Symbol(null,"m","m",(-1021758608),null),new cljs.core.Keyword(null,"or","or",(235744169)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"NaN?","NaN?",(-277236124),null),true,new cljs.core.Symbol(null,"infinite?","infinite?",(-377355081),null),true], null),new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"infinite?","infinite?",(-377355081),null),new cljs.core.Symbol(null,"NaN?","NaN?",(-277236124),null),new cljs.core.Symbol(null,"min","min",(2085523049),null),new cljs.core.Symbol(null,"max","max",(1701898075),null)], null)], null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"as","as",(1148689641)),new cljs.core.Symbol(null,"m","m",(-1021758608),null),new cljs.core.Keyword(null,"or","or",(235744169)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"NaN?","NaN?",(-277236124),null),true,new cljs.core.Symbol(null,"infinite?","infinite?",(-377355081),null),true], null),new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"infinite?","infinite?",(-377355081),null),new cljs.core.Symbol(null,"NaN?","NaN?",(-277236124),null),new cljs.core.Symbol(null,"min","min",(2085523049),null),new cljs.core.Symbol(null,"max","max",(1701898075),null)], null)], null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(446),true,(446),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"as","as",(1148689641)),new cljs.core.Symbol(null,"m","m",(-1021758608),null),new cljs.core.Keyword(null,"or","or",(235744169)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"NaN?","NaN?",(-277236124),null),true,new cljs.core.Symbol(null,"infinite?","infinite?",(-377355081),null),true], null),new cljs.core.Keyword(null,"keys","keys",(1068423698)),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"infinite?","infinite?",(-377355081),null),new cljs.core.Symbol(null,"NaN?","NaN?",(-277236124),null),new cljs.core.Symbol(null,"min","min",(2085523049),null),new cljs.core.Symbol(null,"max","max",(1701898075),null)], null)], null)], null)),"Specs a 64-bit floating point number. Options:\n\n    :infinite? - whether +/- infinity allowed (default true)\n    :NaN?      - whether NaN allowed (default true)\n    :min       - minimum value (inclusive, default none)\n    :max       - maximum value (inclusive, default none)",(cljs.core.truth_(cljs.spec$macros.double_in)?cljs.spec$macros.double_in.cljs$lang$test:null)]));

cljs.spec$macros.double_in.cljs$lang$macro = true;
/**
 * Takes map-validating specs (e.g. 'keys' specs) and
 *   returns a spec that returns a conformed map satisfying all of the
 *   specs.  Successive conformed values propagate through rest of
 *   predicates. Unlike 'and', merge can generate maps satisfying the
 *   union of the predicates.
 */
(function (){
cljs.spec$macros.merge = (function cljs$spec$macros$merge(var_args){
var args__23665__auto__ = [];
var len__23663__auto___189 = arguments.length;
var i__23664__auto___190 = (0);
while(true){
if((i__23664__auto___190 < len__23663__auto___189)){
args__23665__auto__.push((arguments[i__23664__auto___190]));

var G__191 = (i__23664__auto___190 + (1));
i__23664__auto___190 = G__191;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((2) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((2)),(0),null)):null);
return cljs.spec$macros.merge.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.merge;},new cljs.core.Symbol("cljs.spec$macros","merge","cljs.spec$macros/merge",(967682402),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"merge","merge",(-163787882),null),"cljs/spec.cljc",(16),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"pred-forms","pred-forms",(1813143359),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"pred-forms","pred-forms",(1813143359),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(463),true,(463),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"pred-forms","pred-forms",(1813143359),null)], null)),"Takes map-validating specs (e.g. 'keys' specs) and\n  returns a spec that returns a conformed map satisfying all of the\n  specs.  Successive conformed values propagate through rest of\n  predicates. Unlike 'and', merge can generate maps satisfying the\n  union of the predicates.",(cljs.core.truth_(cljs.spec$macros.merge)?cljs.spec$macros.merge.cljs$lang$test:null)])));})()
;

cljs.spec$macros.merge.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,pred_forms){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","merge-spec-impl","cljs.spec/merge-spec-impl",(1066531443),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = cljs.core.mapv.call(null,(function (p1__33_SHARP_){
return cljs.spec$macros.res.call(null,_AMPERSAND_env,p1__33_SHARP_);
}),pred_forms);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.vec.call(null,pred_forms);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,null)));
});

cljs.spec$macros.merge.cljs$lang$maxFixedArity = (2);

cljs.spec$macros.merge.cljs$lang$applyTo = (function (seq186){
var G__187 = cljs.core.first.call(null,seq186);
var seq186__$1 = cljs.core.next.call(null,seq186);
var G__188 = cljs.core.first.call(null,seq186__$1);
var seq186__$2 = cljs.core.next.call(null,seq186__$1);
return cljs.spec$macros.merge.cljs$core$IFn$_invoke$arity$variadic(G__187,G__188,seq186__$2);
});

new cljs.core.Var(function(){return cljs.spec$macros.merge;},new cljs.core.Symbol("cljs.spec$macros","merge","cljs.spec$macros/merge",(967682402),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"merge","merge",(-163787882),null),"cljs/spec.cljc",(16),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"pred-forms","pred-forms",(1813143359),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"pred-forms","pred-forms",(1813143359),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(463),true,(463),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"pred-forms","pred-forms",(1813143359),null)], null)),"Takes map-validating specs (e.g. 'keys' specs) and\n  returns a spec that returns a conformed map satisfying all of the\n  specs.  Successive conformed values propagate through rest of\n  predicates. Unlike 'and', merge can generate maps satisfying the\n  union of the predicates.",(cljs.core.truth_(cljs.spec$macros.merge)?cljs.spec$macros.merge.cljs$lang$test:null)]));

cljs.spec$macros.merge.cljs$lang$macro = true;
/**
 * exercises the fn named by sym (a symbol) by applying it to
 *   n (default 10) generated samples of its args spec. When fspec is
 *   supplied its arg spec is used, and sym-or-f can be a fn.  Returns a
 *   sequence of tuples of [args ret]. 
 */
(function (){
cljs.spec$macros.exercise_fn = (function cljs$spec$macros$exercise_fn(var_args){
var args192 = [];
var len__23663__auto___196 = arguments.length;
var i__23664__auto___197 = (0);
while(true){
if((i__23664__auto___197 < len__23663__auto___196)){
args192.push((arguments[i__23664__auto___197]));

var G__198 = (i__23664__auto___197 + (1));
i__23664__auto___197 = G__198;
continue;
} else {
}
break;
}

var G__194 = args192.length;
switch (G__194) {
case (3):
return cljs.spec$macros.exercise_fn.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case (4):
return cljs.spec$macros.exercise_fn.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case (5):
return cljs.spec$macros.exercise_fn.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str((args192.length - (2)))].join('')));

}
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.exercise_fn;},new cljs.core.Symbol("cljs.spec$macros","exercise-fn","cljs.spec$macros/exercise-fn",(-1129470210),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"exercise-fn","exercise-fn",(1933214770),null),"cljs/spec.cljc",(22),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),false,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(5),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null),new cljs.core.Symbol(null,"n","n",(-2092305744),null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null),new cljs.core.Symbol(null,"n","n",(-2092305744),null),new cljs.core.Symbol(null,"fspec","fspec",(1380883392),null)], null)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null),new cljs.core.Symbol(null,"n","n",(-2092305744),null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null),new cljs.core.Symbol(null,"n","n",(-2092305744),null),new cljs.core.Symbol(null,"fspec","fspec",(1380883392),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null,null,null)], null),(1),(472),true,(472),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null),new cljs.core.Symbol(null,"n","n",(-2092305744),null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null),new cljs.core.Symbol(null,"n","n",(-2092305744),null),new cljs.core.Symbol(null,"fspec","fspec",(1380883392),null)], null)),"exercises the fn named by sym (a symbol) by applying it to\n  n (default 10) generated samples of its args spec. When fspec is\n  supplied its arg spec is used, and sym-or-f can be a fn.  Returns a\n  sequence of tuples of [args ret]. ",(cljs.core.truth_(cljs.spec$macros.exercise_fn)?cljs.spec$macros.exercise_fn.cljs$lang$test:null)])));})()
;

cljs.spec$macros.exercise_fn.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,sym){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","exercise-fn","cljs.spec/exercise-fn",(-1958436611),null)),(function (){var x__23406__auto__ = sym;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,(10))));
});

cljs.spec$macros.exercise_fn.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,sym,n){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","exercise-fn","cljs.spec/exercise-fn",(-1958436611),null)),(function (){var x__23406__auto__ = sym;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = n;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,null)));
});

cljs.spec$macros.exercise_fn.cljs$core$IFn$_invoke$arity$5 = (function (_AMPERSAND_form,_AMPERSAND_env,sym,n,fspec){
var sym__$1 = (function (){var G__195 = sym;
var G__195__$1 = (((cljs.core.sequential_QMARK_.call(null,sym)) && (cljs.core._EQ_.call(null,cljs.core.first.call(null,sym),new cljs.core.Symbol(null,"quote","quote",(1377916282),null))))?cljs.core.second.call(null,G__195):G__195);
return G__195__$1;
})();
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",(-308701135),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"fspec__34__auto__","fspec__34__auto__",(786846362),null)),(function (){var x__23406__auto__ = ((cljs.core.not.call(null,fspec))?cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","get-spec","cljs.spec/get-spec",(-1254734335),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = new cljs.core.Keyword(null,"name","name",(1843675177)).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.api.resolve.call(null,_AMPERSAND_env,sym__$1));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})())):fspec);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"f__35__auto__","f__35__auto__",(1038834408),null)),(function (){var x__23406__auto__ = sym__$1;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","for","cljs.core/for",(-89947499),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"args__36__auto__","args__36__auto__",(581984960),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec.impl.gen","sample","cljs.spec.impl.gen/sample",(812621383),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","gen","cljs.spec/gen",(-2101972796),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"args","args",(1315556576))),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"fspec__34__auto__","fspec__34__auto__",(786846362),null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = n;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"args__36__auto__","args__36__auto__",(581984960),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","apply","cljs.core/apply",(1757277831),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"f__35__auto__","f__35__auto__",(1038834408),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"args__36__auto__","args__36__auto__",(581984960),null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
});

cljs.spec$macros.exercise_fn.cljs$lang$maxFixedArity = (5);

new cljs.core.Var(function(){return cljs.spec$macros.exercise_fn;},new cljs.core.Symbol("cljs.spec$macros","exercise-fn","cljs.spec$macros/exercise-fn",(-1129470210),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"exercise-fn","exercise-fn",(1933214770),null),"cljs/spec.cljc",(22),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),false,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(5),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null),new cljs.core.Symbol(null,"n","n",(-2092305744),null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null),new cljs.core.Symbol(null,"n","n",(-2092305744),null),new cljs.core.Symbol(null,"fspec","fspec",(1380883392),null)], null)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null),new cljs.core.Symbol(null,"n","n",(-2092305744),null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null),new cljs.core.Symbol(null,"n","n",(-2092305744),null),new cljs.core.Symbol(null,"fspec","fspec",(1380883392),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null,null,null)], null),(1),(472),true,(472),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null),new cljs.core.Symbol(null,"n","n",(-2092305744),null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"sym","sym",(195671222),null),new cljs.core.Symbol(null,"n","n",(-2092305744),null),new cljs.core.Symbol(null,"fspec","fspec",(1380883392),null)], null)),"exercises the fn named by sym (a symbol) by applying it to\n  n (default 10) generated samples of its args spec. When fspec is\n  supplied its arg spec is used, and sym-or-f can be a fn.  Returns a\n  sequence of tuples of [args ret]. ",(cljs.core.truth_(cljs.spec$macros.exercise_fn)?cljs.spec$macros.exercise_fn.cljs$lang$test:null)]));

cljs.spec$macros.exercise_fn.cljs$lang$macro = true;
(function (){
cljs.spec$macros.init_compile_asserts = (function cljs$spec$macros$init_compile_asserts(_AMPERSAND_form,_AMPERSAND_env){
var compile_asserts = cljs.core.not.call(null,new cljs.core.Keyword(null,"elide-asserts","elide-asserts",(537063272)).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",(99638489)).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_))));
return compile_asserts;
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.init_compile_asserts;},new cljs.core.Symbol("cljs.spec$macros","init-compile-asserts","cljs.spec$macros/init-compile-asserts",(-387939603),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",(-558947994)),new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[true,new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"init-compile-asserts","init-compile-asserts",(-682378183),null),"cljs/spec.cljc",(41),(1),(493),true,(493),cljs.core.list(cljs.core.PersistentVector.EMPTY),null,(cljs.core.truth_(cljs.spec$macros.init_compile_asserts)?cljs.spec$macros.init_compile_asserts.cljs$lang$test:null)])));})()
;

cljs.spec$macros.init_compile_asserts.cljs$lang$macro = true;
/**
 * spec-checking assert expression. Returns x if x is valid? according
 * to spec, else throws an error with explain-data plus ::failure of
 * :assertion-failed.
 * Can be disabled at either compile time or runtime:
 * If *compile-asserts* is false at compile time, compiles to x. Defaults
 * to the negation value of the ':elide-asserts' compiler option, or true if
 * not set.
 * If (check-asserts?) is false at runtime, always returns x. Defaults to
 * value of 'cljs.spec/*runtime-asserts*', or false if not set. You can
 * toggle check-asserts? with (check-asserts bool).
 */
(function (){
cljs.spec$macros.assert = (function cljs$spec$macros$assert(_AMPERSAND_form,_AMPERSAND_env,spec,x){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"if","if",(1181717262),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","*compile-asserts*","cljs.spec/*compile-asserts*",(244913392),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"if","if",(1181717262),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","*runtime-asserts*","cljs.spec/*runtime-asserts*",(1521021805),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","assert*","cljs.spec/assert*",(-1844453922),null)),(function (){var x__23406__auto__ = spec;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = x;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = x;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = x;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
}); return (
new cljs.core.Var(function(){return cljs.spec$macros.assert;},new cljs.core.Symbol("cljs.spec$macros","assert","cljs.spec$macros/assert",(1540315225),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec$macros","cljs.spec$macros",(1176748366),null),new cljs.core.Symbol(null,"assert","assert",(677428501),null),"cljs/spec.cljc",(17),(1),(497),true,(497),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"spec","spec",(1988051928),null),new cljs.core.Symbol(null,"x","x",(-555367584),null)], null)),"spec-checking assert expression. Returns x if x is valid? according\nto spec, else throws an error with explain-data plus ::failure of\n:assertion-failed.\nCan be disabled at either compile time or runtime:\nIf *compile-asserts* is false at compile time, compiles to x. Defaults\nto the negation value of the ':elide-asserts' compiler option, or true if\nnot set.\nIf (check-asserts?) is false at runtime, always returns x. Defaults to\nvalue of 'cljs.spec/*runtime-asserts*', or false if not set. You can\ntoggle check-asserts? with (check-asserts bool).",(cljs.core.truth_(cljs.spec$macros.assert)?cljs.spec$macros.assert.cljs$lang$test:null)])));})()
;

cljs.spec$macros.assert.cljs$lang$macro = true;
