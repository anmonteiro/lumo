goog.provide("lumo.repl$macros");
/**
 * Prints documentation for a var or special form given its name
 */
(function (){
lumo.repl$macros.doc = (function lumo$repl$macros$doc(_AMPERSAND_form,_AMPERSAND_env,name){
return cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lumo.repl","doc*","lumo.repl/doc*",(-813213249),null)),(function (){var x__23406__auto__ = cljs.core.sequence.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",(1377916282),null)),(function (){var x__23406__auto__ = name;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__23406__auto__);
})()));
}); return (
new cljs.core.Var(function(){return lumo.repl$macros.doc;},new cljs.core.Symbol("lumo.repl$macros","doc","lumo.repl$macros/doc",(510759417),null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",(441598760)),new cljs.core.Keyword(null,"name","name",(1843675177)),new cljs.core.Keyword(null,"file","file",(-1269645878)),new cljs.core.Keyword(null,"end-column","end-column",(1425389514)),new cljs.core.Keyword(null,"column","column",(2078222095)),new cljs.core.Keyword(null,"line","line",(212345235)),new cljs.core.Keyword(null,"macro","macro",(-867863404)),new cljs.core.Keyword(null,"end-line","end-line",(1837326455)),new cljs.core.Keyword(null,"arglists","arglists",(1661989754)),new cljs.core.Keyword(null,"doc","doc",(1913296891)),new cljs.core.Keyword(null,"test","test",(577538877))],[new cljs.core.Symbol(null,"lumo.repl$macros","lumo.repl$macros",(1252662503),null),new cljs.core.Symbol(null,"doc","doc",(-741138878),null),"lumo/repl.clj",(14),(1),(3),true,(3),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"name","name",(-810760592),null)], null)),"Prints documentation for a var or special form given its name",(cljs.core.truth_(lumo.repl$macros.doc)?lumo.repl$macros.doc.cljs$lang$test:null)])));})()
;

lumo.repl$macros.doc.cljs$lang$macro = true;
