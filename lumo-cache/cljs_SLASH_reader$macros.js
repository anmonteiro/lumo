goog.provide("cljs.reader$macros");
(function (){
cljs.reader$macros.add_data_readers = (function cljs$reader$macros$add_data_readers(_AMPERSAND_form,_AMPERSAND_env,default_readers){
var data_readers = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,(function (p__26){
var vec__27 = p__26;
var k = cljs.core.nth.call(null,vec__27,(0),null);
var v = cljs.core.nth.call(null,vec__27,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",(-1065745098),null)),(function (){var x__25696__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"x__1__auto__","x__1__auto__",(-2136603537),null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__25696__auto__);
})(),(function (){var x__25696__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,(function (){var x__25696__auto__ = cljs.core.vary_meta.call(null,v,cljs.core.assoc,new cljs.core.Keyword("cljs.analyzer","no-resolve","cljs.analyzer/no-resolve",(-1872351017)),true);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__25696__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"x__1__auto__","x__1__auto__",(-2136603537),null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__25696__auto__);
})()))], null);
}),cljs.core.get.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.Keyword("cljs.analyzer","data-readers","cljs.analyzer/data-readers",(1778544933)))));
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"do","do",(1686842252),null)),(function (){var x__25696__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","merge","cljs.core/merge",(-822184067),null)),(function (){var x__25696__auto__ = default_readers;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__25696__auto__);
})(),(function (){var x__25696__auto__ = data_readers;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__25696__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__25696__auto__);
})()));
}); return (
new cljs.core.Var(function(){return cljs.reader$macros.add_data_readers;},new cljs.core.Symbol("cljs.reader$macros","add-data-readers","cljs.reader$macros/add-data-readers",(-326822204),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"cljs.reader$macros","cljs.reader$macros",(1318746896),null),new cljs.core.Symbol(null,"add-data-readers","add-data-readers",(1097670512),null),"cljs/reader.clj",(27),(1),(12),true,(12),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"default-readers","default-readers",(-1869121248),null)], null)),null,(cljs.core.truth_(cljs.reader$macros.add_data_readers)?cljs.reader$macros.add_data_readers.cljs$lang$test:null)])));})()
;

cljs.reader$macros.add_data_readers.cljs$lang$macro = true;
