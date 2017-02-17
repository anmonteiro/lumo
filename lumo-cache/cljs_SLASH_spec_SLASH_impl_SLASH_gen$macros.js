goog.provide("cljs.spec.impl.gen$macros");
(function (){
cljs.spec.impl.gen$macros.dynaload = (function cljs$spec$impl$gen$macros$dynaload(_AMPERSAND_form,_AMPERSAND_env,p__22){
var vec__26 = p__22;
var quote = cljs.core.nth.call(null,vec__26,(0),null);
var s = cljs.core.nth.call(null,vec__26,(1),null);
var xs = clojure.string.split.call(null,cljs.core.namespace.call(null,s),/\./);
var cnt = cljs.core.count.call(null,xs);
var checks = cljs.core.map.call(null,((function (xs,cnt,vec__26,quote,s){
return (function (n,xs__$1){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","exists?","cljs.core/exists?",(1852387968),null)),(function (){var x__23406__auto__ = cljs.core.symbol.call(null,clojure.string.join.call(null,".",cljs.core.take.call(null,n,xs__$1)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
});})(xs,cnt,vec__26,quote,s))
,cljs.core.range.call(null,(2),cnt),cljs.core.repeat.call(null,xs));
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec.impl.gen","LazyVar.","cljs.spec.impl.gen/LazyVar.",(2097500660),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",(-1065745098),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"if","if",(1181717262),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","and","cljs.core/and",(-6692549),null)),checks,(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","exists?","cljs.core/exists?",(1852387968),null)),(function (){var x__23406__auto__ = s;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.vary_meta.call(null,s,cljs.core.assoc,new cljs.core.Keyword("cljs.analyzer","no-resolve","cljs.analyzer/no-resolve",(-1872351017)),true);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"throw","throw",(595905694),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("js","Error.","js/Error.",(750655924),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","str","cljs.core/str",(-1971828991),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,"Var "),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = s;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY," does not exist, "),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","namespace","cljs.core/namespace",(1653264270),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = s;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY," never required")));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,null)));
}); return (
new cljs.core.Var(function(){return cljs.spec.impl.gen$macros.dynaload;},new cljs.core.Symbol("cljs.spec.impl.gen$macros","dynaload","cljs.spec.impl.gen$macros/dynaload",(1324081149),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec.impl.gen$macros","cljs.spec.impl.gen$macros",(1769246924),null),new cljs.core.Symbol(null,"dynaload","dynaload",(1762342571),null),"cljs/spec/impl/gen.cljc",(19),(1),(14),true,(14),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"quote","quote",(1377916282),null),new cljs.core.Symbol(null,"s","s",(-948495851),null)], null)], null)),null,(cljs.core.truth_(cljs.spec.impl.gen$macros.dynaload)?cljs.spec.impl.gen$macros.dynaload.cljs$lang$test:null)])));})()
;

cljs.spec.impl.gen$macros.dynaload.cljs$lang$macro = true;
/**
 * given body that returns a generator, returns a
 *   generator that delegates to that, but delays
 *   creation until used.
 */
(function (){
cljs.spec.impl.gen$macros.delay = (function cljs$spec$impl$gen$macros$delay(var_args){
var args__23665__auto__ = [];
var len__23663__auto___32 = arguments.length;
var i__23664__auto___33 = (0);
while(true){
if((i__23664__auto___33 < len__23663__auto___32)){
args__23665__auto__.push((arguments[i__23664__auto___33]));

var G__34 = (i__23664__auto___33 + (1));
i__23664__auto___33 = G__34;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((2) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((2)),(0),null)):null);
return cljs.spec.impl.gen$macros.delay.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec.impl.gen$macros.delay;},new cljs.core.Symbol("cljs.spec.impl.gen$macros","delay","cljs.spec.impl.gen$macros/delay",(330162258),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec.impl.gen$macros","cljs.spec.impl.gen$macros",(1769246924),null),new cljs.core.Symbol(null,"delay","delay",(1066306308),null),"cljs/spec/impl/gen.cljc",(16),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"body","body",(-408674142),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(32),true,(32),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),"given body that returns a generator, returns a\n  generator that delegates to that, but delays\n  creation until used.",(cljs.core.truth_(cljs.spec.impl.gen$macros.delay)?cljs.spec.impl.gen$macros.delay.cljs$lang$test:null)])));})()
;

cljs.spec.impl.gen$macros.delay.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,body){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec.impl.gen","delay-impl","cljs.spec.impl.gen/delay-impl",(1328847128),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","delay","cljs.core/delay",(-406049125),null)),body));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
});

cljs.spec.impl.gen$macros.delay.cljs$lang$maxFixedArity = (2);

cljs.spec.impl.gen$macros.delay.cljs$lang$applyTo = (function (seq29){
var G__30 = cljs.core.first.call(null,seq29);
var seq29__$1 = cljs.core.next.call(null,seq29);
var G__31 = cljs.core.first.call(null,seq29__$1);
var seq29__$2 = cljs.core.next.call(null,seq29__$1);
return cljs.spec.impl.gen$macros.delay.cljs$core$IFn$_invoke$arity$variadic(G__30,G__31,seq29__$2);
});

new cljs.core.Var(function(){return cljs.spec.impl.gen$macros.delay;},new cljs.core.Symbol("cljs.spec.impl.gen$macros","delay","cljs.spec.impl.gen$macros/delay",(330162258),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec.impl.gen$macros","cljs.spec.impl.gen$macros",(1769246924),null),new cljs.core.Symbol(null,"delay","delay",(1066306308),null),"cljs/spec/impl/gen.cljc",(16),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"body","body",(-408674142),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),(1),(32),true,(32),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"body","body",(-408674142),null)], null)),"given body that returns a generator, returns a\n  generator that delegates to that, but delays\n  creation until used.",(cljs.core.truth_(cljs.spec.impl.gen$macros.delay)?cljs.spec.impl.gen$macros.delay.cljs$lang$test:null)]));

cljs.spec.impl.gen$macros.delay.cljs$lang$macro = true;
/**
 * Implementation macro, do not call directly.
 */
(function (){
cljs.spec.impl.gen$macros.lazy_combinator = (function cljs$spec$impl$gen$macros$lazy_combinator(_AMPERSAND_form,_AMPERSAND_env,s){
var fqn = cljs.core.symbol.call(null,"clojure.test.check.generators",cljs.core.name.call(null,s));
var doc = [cljs.core.str("Lazy loaded version of "),cljs.core.str(fqn)].join('');
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",(-308701135),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"g__1__auto__","g__1__auto__",(-1645419228),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec.impl.gen","dynaload","cljs.spec.impl.gen/dynaload",(-1019543436),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = fqn;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","defn","cljs.core/defn",(-1606493717),null)),(function (){var x__23406__auto__ = s;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = doc;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"&","&",(-2144855648),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"args","args",(-1338879193),null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","apply","cljs.core/apply",(1757277831),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","deref","cljs.core/deref",(1901963335),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"g__1__auto__","g__1__auto__",(-1645419228),null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"args","args",(-1338879193),null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
}); return (
new cljs.core.Var(function(){return cljs.spec.impl.gen$macros.lazy_combinator;},new cljs.core.Symbol("cljs.spec.impl.gen$macros","lazy-combinator","cljs.spec.impl.gen$macros/lazy-combinator",(90707437),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"skip-wiki","skip-wiki",(-2018833298)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec.impl.gen$macros","cljs.spec.impl.gen$macros",(1769246924),null),new cljs.core.Symbol(null,"lazy-combinator","lazy-combinator",(-519533249),null),"cljs/spec/impl/gen.cljc",(38),true,(1),(39),true,(39),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"s","s",(-948495851),null)], null)),"Implementation macro, do not call directly.",(cljs.core.truth_(cljs.spec.impl.gen$macros.lazy_combinator)?cljs.spec.impl.gen$macros.lazy_combinator.cljs$lang$test:null)])));})()
;

cljs.spec.impl.gen$macros.lazy_combinator.cljs$lang$macro = true;
/**
 * Implementation macro, do not call directly.
 */
(function (){
cljs.spec.impl.gen$macros.lazy_combinators = (function cljs$spec$impl$gen$macros$lazy_combinators(var_args){
var args__23665__auto__ = [];
var len__23663__auto___38 = arguments.length;
var i__23664__auto___39 = (0);
while(true){
if((i__23664__auto___39 < len__23663__auto___38)){
args__23665__auto__.push((arguments[i__23664__auto___39]));

var G__40 = (i__23664__auto___39 + (1));
i__23664__auto___39 = G__40;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((2) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((2)),(0),null)):null);
return cljs.spec.impl.gen$macros.lazy_combinators.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec.impl.gen$macros.lazy_combinators;},new cljs.core.Symbol("cljs.spec.impl.gen$macros","lazy-combinators","cljs.spec.impl.gen$macros/lazy-combinators",(-1378464383),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"skip-wiki","skip-wiki",(-2018833298)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec.impl.gen$macros","cljs.spec.impl.gen$macros",(1769246924),null),new cljs.core.Symbol(null,"lazy-combinators","lazy-combinators",(-906562317),null),"cljs/spec/impl/gen.cljc",(39),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"syms","syms",(64639765),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"syms","syms",(64639765),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),true,(1),(50),true,(50),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"syms","syms",(64639765),null)], null)),"Implementation macro, do not call directly.",(cljs.core.truth_(cljs.spec.impl.gen$macros.lazy_combinators)?cljs.spec.impl.gen$macros.lazy_combinators.cljs$lang$test:null)])));})()
;

cljs.spec.impl.gen$macros.lazy_combinators.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,syms){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"do","do",(1686842252),null)),cljs.core.map.call(null,(function (s){
return cljs.core._conj.call(null,(function (){var x__23406__auto__ = s;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),new cljs.core.Symbol("cljs.spec.impl.gen","lazy-combinator","cljs.spec.impl.gen/lazy-combinator",(-1623668972),null));
}),syms)));
});

cljs.spec.impl.gen$macros.lazy_combinators.cljs$lang$maxFixedArity = (2);

cljs.spec.impl.gen$macros.lazy_combinators.cljs$lang$applyTo = (function (seq35){
var G__36 = cljs.core.first.call(null,seq35);
var seq35__$1 = cljs.core.next.call(null,seq35);
var G__37 = cljs.core.first.call(null,seq35__$1);
var seq35__$2 = cljs.core.next.call(null,seq35__$1);
return cljs.spec.impl.gen$macros.lazy_combinators.cljs$core$IFn$_invoke$arity$variadic(G__36,G__37,seq35__$2);
});

new cljs.core.Var(function(){return cljs.spec.impl.gen$macros.lazy_combinators;},new cljs.core.Symbol("cljs.spec.impl.gen$macros","lazy-combinators","cljs.spec.impl.gen$macros/lazy-combinators",(-1378464383),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"skip-wiki","skip-wiki",(-2018833298)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec.impl.gen$macros","cljs.spec.impl.gen$macros",(1769246924),null),new cljs.core.Symbol(null,"lazy-combinators","lazy-combinators",(-906562317),null),"cljs/spec/impl/gen.cljc",(39),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"syms","syms",(64639765),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"syms","syms",(64639765),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),true,(1),(50),true,(50),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"syms","syms",(64639765),null)], null)),"Implementation macro, do not call directly.",(cljs.core.truth_(cljs.spec.impl.gen$macros.lazy_combinators)?cljs.spec.impl.gen$macros.lazy_combinators.cljs$lang$test:null)]));

cljs.spec.impl.gen$macros.lazy_combinators.cljs$lang$macro = true;
/**
 * Implementation macro, do not call directly.
 */
(function (){
cljs.spec.impl.gen$macros.lazy_prim = (function cljs$spec$impl$gen$macros$lazy_prim(_AMPERSAND_form,_AMPERSAND_env,s){
var fqn = cljs.core.symbol.call(null,"clojure.test.check.generators",cljs.core.name.call(null,s));
var doc = [cljs.core.str("Fn returning "),cljs.core.str(fqn)].join('');
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",(-308701135),null)),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"g__2__auto__","g__2__auto__",(2093461362),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec.impl.gen","dynaload","cljs.spec.impl.gen/dynaload",(-1019543436),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = fqn;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","defn","cljs.core/defn",(-1606493717),null)),(function (){var x__23406__auto__ = s;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = doc;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"&","&",(-2144855648),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"args","args",(-1338879193),null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","deref","cljs.core/deref",(1901963335),null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"g__2__auto__","g__2__auto__",(2093461362),null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
}); return (
new cljs.core.Var(function(){return cljs.spec.impl.gen$macros.lazy_prim;},new cljs.core.Symbol("cljs.spec.impl.gen$macros","lazy-prim","cljs.spec.impl.gen$macros/lazy-prim",(-584672462),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"skip-wiki","skip-wiki",(-2018833298)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec.impl.gen$macros","cljs.spec.impl.gen$macros",(1769246924),null),new cljs.core.Symbol(null,"lazy-prim","lazy-prim",(-116980768),null),"cljs/spec/impl/gen.cljc",(32),true,(1),(58),true,(58),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"s","s",(-948495851),null)], null)),"Implementation macro, do not call directly.",(cljs.core.truth_(cljs.spec.impl.gen$macros.lazy_prim)?cljs.spec.impl.gen$macros.lazy_prim.cljs$lang$test:null)])));})()
;

cljs.spec.impl.gen$macros.lazy_prim.cljs$lang$macro = true;
/**
 * Implementation macro, do not call directly.
 */
(function (){
cljs.spec.impl.gen$macros.lazy_prims = (function cljs$spec$impl$gen$macros$lazy_prims(var_args){
var args__23665__auto__ = [];
var len__23663__auto___44 = arguments.length;
var i__23664__auto___45 = (0);
while(true){
if((i__23664__auto___45 < len__23663__auto___44)){
args__23665__auto__.push((arguments[i__23664__auto___45]));

var G__46 = (i__23664__auto___45 + (1));
i__23664__auto___45 = G__46;
continue;
} else {
}
break;
}

var argseq__23666__auto__ = ((((2) < args__23665__auto__.length))?(new cljs.core.IndexedSeq(args__23665__auto__.slice((2)),(0),null)):null);
return cljs.spec.impl.gen$macros.lazy_prims.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__23666__auto__);
}); return (
new cljs.core.Var(function(){return cljs.spec.impl.gen$macros.lazy_prims;},new cljs.core.Symbol("cljs.spec.impl.gen$macros","lazy-prims","cljs.spec.impl.gen$macros/lazy-prims",(-1296042618),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"skip-wiki","skip-wiki",(-2018833298)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec.impl.gen$macros","cljs.spec.impl.gen$macros",(1769246924),null),new cljs.core.Symbol(null,"lazy-prims","lazy-prims",(-681697752),null),"cljs/spec/impl/gen.cljc",(33),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"syms","syms",(64639765),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"syms","syms",(64639765),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),true,(1),(69),true,(69),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"syms","syms",(64639765),null)], null)),"Implementation macro, do not call directly.",(cljs.core.truth_(cljs.spec.impl.gen$macros.lazy_prims)?cljs.spec.impl.gen$macros.lazy_prims.cljs$lang$test:null)])));})()
;

cljs.spec.impl.gen$macros.lazy_prims.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,syms){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"do","do",(1686842252),null)),cljs.core.map.call(null,(function (s){
return cljs.core._conj.call(null,(function (){var x__23406__auto__ = s;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})(),new cljs.core.Symbol("cljs.spec.impl.gen","lazy-prim","cljs.spec.impl.gen/lazy-prim",(1461179835),null));
}),syms)));
});

cljs.spec.impl.gen$macros.lazy_prims.cljs$lang$maxFixedArity = (2);

cljs.spec.impl.gen$macros.lazy_prims.cljs$lang$applyTo = (function (seq41){
var G__42 = cljs.core.first.call(null,seq41);
var seq41__$1 = cljs.core.next.call(null,seq41);
var G__43 = cljs.core.first.call(null,seq41__$1);
var seq41__$2 = cljs.core.next.call(null,seq41__$1);
return cljs.spec.impl.gen$macros.lazy_prims.cljs$core$IFn$_invoke$arity$variadic(G__42,G__43,seq41__$2);
});

new cljs.core.Var(function(){return cljs.spec.impl.gen$macros.lazy_prims;},new cljs.core.Symbol("cljs.spec.impl.gen$macros","lazy-prims","cljs.spec.impl.gen$macros/lazy-prims",(-1296042618),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"top-fn","top-fn",(-2056129173)),new cljs.core.Keyword(null,"skip-wiki","skip-wiki",(-2018833298)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.spec.impl.gen$macros","cljs.spec.impl.gen$macros",(1769246924),null),new cljs.core.Symbol(null,"lazy-prims","lazy-prims",(-681697752),null),"cljs/spec/impl/gen.cljc",(33),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"variadic","variadic",(882626057)),true,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",(-690205543)),(2),new cljs.core.Keyword(null,"method-params","method-params",(-980792179)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"syms","syms",(64639765),null))], null),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"syms","syms",(64639765),null)], null)),new cljs.core.Keyword(null,"arglists-meta","arglists-meta",(1944829838)),cljs.core.list(null)], null),true,(1),(69),true,(69),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"&form","&form",(1482799337),null),new cljs.core.Symbol(null,"&env","&env",(-919163083),null),new cljs.core.Symbol(null,"&","&",(-2144855648),null),new cljs.core.Symbol(null,"syms","syms",(64639765),null)], null)),"Implementation macro, do not call directly.",(cljs.core.truth_(cljs.spec.impl.gen$macros.lazy_prims)?cljs.spec.impl.gen$macros.lazy_prims.cljs$lang$test:null)]));

cljs.spec.impl.gen$macros.lazy_prims.cljs$lang$macro = true;
