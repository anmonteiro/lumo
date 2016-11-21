// Compiled by ClojureScript 1.9.293 {:static-fns true, :optimize-constants false, :target :nodejs}
goog.provide('cljs.compiler');
goog.require('cljs.core');
goog.require('goog.string');
goog.require('cljs.tools.reader');
goog.require('cljs.env');
goog.require('cljs.analyzer');
goog.require('cljs.source_map');
goog.require('goog.string.StringBuffer');
goog.require('clojure.string');
cljs.compiler.js_reserved = cljs.analyzer.js_reserved;
cljs.compiler._STAR_recompiled_STAR_ = null;
cljs.compiler._STAR_inputs_STAR_ = null;
cljs.compiler._STAR_source_map_data_STAR_ = null;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.PersistentArrayMap.EMPTY;
cljs.compiler.cljs_reserved_file_names = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["deps.cljs",null], null), null);
cljs.compiler.ns_first_segments = (function cljs$compiler$ns_first_segments(){
var get_first_ns_segment = (function cljs$compiler$ns_first_segments_$_get_first_ns_segment(ns){
return cljs.core.first(clojure.string.split.cljs$core$IFn$_invoke$arity$2([cljs.core.str(ns)].join(''),/\./));
});
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(get_first_ns_segment,cljs.core.keys(new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927).cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)))));
});
cljs.compiler.shadow_depth = (function cljs$compiler$shadow_depth(s){
var map__19430 = s;
var map__19430__$1 = ((((!((map__19430 == null)))?((((map__19430.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19430.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19430):map__19430);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19430__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19430__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var d = (0);
var G__19436 = info;
var map__19437 = G__19436;
var map__19437__$1 = ((((!((map__19437 == null)))?((((map__19437.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19437.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19437):map__19437);
var shadow = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19437__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
var d__$1 = d;
var G__19436__$1 = G__19436;
while(true){
var d__$2 = d__$1;
var map__19439 = G__19436__$1;
var map__19439__$1 = ((((!((map__19439 == null)))?((((map__19439.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19439.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19439):map__19439);
var shadow__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19439__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
if(cljs.core.truth_(shadow__$1)){
var G__19463 = (d__$2 + (1));
var G__19464 = shadow__$1;
d__$1 = G__19463;
G__19436__$1 = G__19464;
continue;
} else {
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.fromArray([[cljs.core.str(name)].join('')], true),cljs.compiler.ns_first_segments()))){
return (d__$2 + (1));
} else {
return d__$2;

}
}
break;
}
});
cljs.compiler.hash_scope = (function cljs$compiler$hash_scope(s){
return cljs.core.hash_combine(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(s).cljs$core$IHash$_hash$arity$1(null),cljs.compiler.shadow_depth(s));
});
cljs.compiler.fn_self_name = (function cljs$compiler$fn_self_name(p__19475){
var map__19484 = p__19475;
var map__19484__$1 = ((((!((map__19484 == null)))?((((map__19484.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19484.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19484):map__19484);
var name_var = map__19484__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19484__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19484__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var name__$1 = clojure.string.replace([cljs.core.str(name)].join(''),"..","_DOT__DOT_");
var map__19487 = info;
var map__19487__$1 = ((((!((map__19487 == null)))?((((map__19487.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19487.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19487):map__19487);
var ns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19487__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var fn_scope = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19487__$1,new cljs.core.Keyword(null,"fn-scope","fn-scope",-865664859));
var scoped_name = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose.cljs$core$IFn$_invoke$arity$2("_$_",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.str,new cljs.core.Keyword(null,"name","name",1843675177)),fn_scope),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [name__$1], null))));
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((function (){var G__19491 = [cljs.core.str(clojure.string.replace([cljs.core.str(ns)].join(''),".","$")),cljs.core.str("$"),cljs.core.str(scoped_name)].join('');
return (cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(G__19491) : cljs.compiler.munge.call(null,G__19491));
})());
});
cljs.compiler.munge_reserved = (function cljs$compiler$munge_reserved(reserved){
return (function (s){
if(!((cljs.core.get.cljs$core$IFn$_invoke$arity$2(reserved,s) == null))){
return [cljs.core.str(s),cljs.core.str("$")].join('');
} else {
return s;
}
});
});
cljs.compiler.munge = (function cljs$compiler$munge(var_args){
var args19508 = [];
var len__8739__auto___19517 = arguments.length;
var i__8740__auto___19518 = (0);
while(true){
if((i__8740__auto___19518 < len__8739__auto___19517)){
args19508.push((arguments[i__8740__auto___19518]));

var G__19519 = (i__8740__auto___19518 + (1));
i__8740__auto___19518 = G__19519;
continue;
} else {
}
break;
}

var G__19511 = args19508.length;
switch (G__19511) {
case 1:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19508.length)].join('')));

}
});

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 = (function (s){
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(s,cljs.compiler.js_reserved);
});

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2 = (function (s,reserved){
if(cljs.analyzer.cljs_map_QMARK_(s)){
var name_var = s;
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(name_var);
var field = new cljs.core.Keyword(null,"field","field",-1302436500).cljs$core$IFn$_invoke$arity$1(name_var);
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(name_var);
if(!((new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531).cljs$core$IFn$_invoke$arity$1(info) == null))){
return cljs.compiler.fn_self_name(s);
} else {
var depth = cljs.compiler.shadow_depth(s);
var code = cljs.compiler.hash_scope(s);
var renamed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_lexical_renames_STAR_,code);
var name__$1 = ((field === true)?[cljs.core.str("self__."),cljs.core.str(name)].join(''):((!((renamed == null)))?renamed:name
));
var munged_name = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(name__$1,reserved);
if((field === true) || ((depth === (0)))){
return munged_name;
} else {
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(munged_name),cljs.core.str("__$"),cljs.core.str(depth)].join(''));
}
}
} else {
var ss = clojure.string.replace([cljs.core.str(s)].join(''),"..","_DOT__DOT_");
var ss__$1 = clojure.string.replace(ss,(new RegExp("\\/(.)")),".$1");
var rf = cljs.compiler.munge_reserved(reserved);
var ss__$2 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(rf,clojure.string.split.cljs$core$IFn$_invoke$arity$2(ss__$1,/\./));
var ss__$3 = clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",ss__$2);
var ms = cljs.core.munge(ss__$3);
if((s instanceof cljs.core.Symbol)){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(ms);
} else {
return ms;
}
}
});

cljs.compiler.munge.cljs$lang$maxFixedArity = 2;

cljs.compiler.comma_sep = (function cljs$compiler$comma_sep(xs){
return cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(",",xs);
});
cljs.compiler.escape_char = (function cljs$compiler$escape_char(c){
var cp = goog.string.hashCode(c);
var G__19547 = cp;
switch (G__19547) {
case (34):
return "\\\"";

break;
case (92):
return "\\\\";

break;
case (8):
return "\\b";

break;
case (12):
return "\\f";

break;
case (10):
return "\\n";

break;
case (13):
return "\\r";

break;
case (9):
return "\\t";

break;
default:
if((((31) < cp)) && ((cp < (127)))){
return c;
} else {
var unpadded = cp.toString((16));
var pad = cljs.core.subs.cljs$core$IFn$_invoke$arity$2("0000",unpadded.length);
return [cljs.core.str("\\u"),cljs.core.str(pad),cljs.core.str(unpadded)].join('');
}

}
});
cljs.compiler.escape_string = (function cljs$compiler$escape_string(s){
var sb = (new goog.string.StringBuffer());
var seq__19563_19572 = cljs.core.seq(s);
var chunk__19564_19573 = null;
var count__19565_19574 = (0);
var i__19566_19575 = (0);
while(true){
if((i__19566_19575 < count__19565_19574)){
var c_19577 = chunk__19564_19573.cljs$core$IIndexed$_nth$arity$2(null,i__19566_19575);
sb.append(cljs.compiler.escape_char(c_19577));

var G__19578 = seq__19563_19572;
var G__19579 = chunk__19564_19573;
var G__19580 = count__19565_19574;
var G__19581 = (i__19566_19575 + (1));
seq__19563_19572 = G__19578;
chunk__19564_19573 = G__19579;
count__19565_19574 = G__19580;
i__19566_19575 = G__19581;
continue;
} else {
var temp__6753__auto___19582 = cljs.core.seq(seq__19563_19572);
if(temp__6753__auto___19582){
var seq__19563_19583__$1 = temp__6753__auto___19582;
if(cljs.core.chunked_seq_QMARK_(seq__19563_19583__$1)){
var c__8429__auto___19585 = cljs.core.chunk_first(seq__19563_19583__$1);
var G__19586 = cljs.core.chunk_rest(seq__19563_19583__$1);
var G__19587 = c__8429__auto___19585;
var G__19588 = cljs.core.count(c__8429__auto___19585);
var G__19589 = (0);
seq__19563_19572 = G__19586;
chunk__19564_19573 = G__19587;
count__19565_19574 = G__19588;
i__19566_19575 = G__19589;
continue;
} else {
var c_19593 = cljs.core.first(seq__19563_19583__$1);
sb.append(cljs.compiler.escape_char(c_19593));

var G__19596 = cljs.core.next(seq__19563_19583__$1);
var G__19597 = null;
var G__19598 = (0);
var G__19599 = (0);
seq__19563_19572 = G__19596;
chunk__19564_19573 = G__19597;
count__19565_19574 = G__19598;
i__19566_19575 = G__19599;
continue;
}
} else {
}
}
break;
}

return sb.toString();
});
cljs.compiler.wrap_in_double_quotes = (function cljs$compiler$wrap_in_double_quotes(x){
return [cljs.core.str("\""),cljs.core.str(x),cljs.core.str("\"")].join('');
});
if(typeof cljs.compiler.emit_STAR_ !== 'undefined'){
} else {
cljs.compiler.emit_STAR_ = (function (){var method_table__8549__auto__ = (function (){var G__19613 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19613) : cljs.core.atom.call(null,G__19613));
})();
var prefer_table__8550__auto__ = (function (){var G__19614 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19614) : cljs.core.atom.call(null,G__19614));
})();
var method_cache__8551__auto__ = (function (){var G__19615 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19615) : cljs.core.atom.call(null,G__19615));
})();
var cached_hierarchy__8552__auto__ = (function (){var G__19618 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19618) : cljs.core.atom.call(null,G__19618));
})();
var hierarchy__8553__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.compiler","emit*"),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__8553__auto__,method_table__8549__auto__,prefer_table__8550__auto__,method_cache__8551__auto__,cached_hierarchy__8552__auto__));
})();
}
cljs.compiler.emit = (function cljs$compiler$emit(ast){
var val__14678__auto__ = cljs.env._STAR_compiler_STAR_;
if((val__14678__auto__ == null)){
cljs.env._STAR_compiler_STAR_ = cljs.env.default_compiler_env.cljs$core$IFn$_invoke$arity$0();
} else {
}

try{if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
var map__19639_19649 = ast;
var map__19639_19650__$1 = ((((!((map__19639_19649 == null)))?((((map__19639_19649.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19639_19649.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19639_19649):map__19639_19649);
var env_19651 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19639_19650__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core.truth_(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(env_19651))){
var map__19643_19653 = env_19651;
var map__19643_19654__$1 = ((((!((map__19643_19653 == null)))?((((map__19643_19653.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19643_19653.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19643_19653):map__19643_19653);
var line_19655 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19643_19654__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_19656 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19643_19654__$1,new cljs.core.Keyword(null,"column","column",2078222095));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_source_map_data_STAR_,((function (map__19643_19653,map__19643_19654__$1,line_19655,column_19656,map__19639_19649,map__19639_19650__$1,env_19651,val__14678__auto__){
return (function (m){
var minfo = (function (){var G__19646 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gcol","gcol",309250807),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"gline","gline",-1086242431),new cljs.core.Keyword(null,"gen-line","gen-line",589592125).cljs$core$IFn$_invoke$arity$1(m)], null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(ast),new cljs.core.Keyword(null,"var","var",-769682797))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__19646,new cljs.core.Keyword(null,"name","name",1843675177),[cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(ast)))].join(''));
} else {
return G__19646;
}
})();
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"source-map","source-map",1706252311),(line_19655 - (1))], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (minfo,map__19643_19653,map__19643_19654__$1,line_19655,column_19656,map__19639_19649,map__19639_19650__$1,env_19651,val__14678__auto__){
return (function (line__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(line__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(column_19656)?(column_19656 - (1)):(0))], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (minfo,map__19643_19653,map__19643_19654__$1,line_19655,column_19656,map__19639_19649,map__19639_19650__$1,env_19651,val__14678__auto__){
return (function (column__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(column__$1,minfo);
});})(minfo,map__19643_19653,map__19643_19654__$1,line_19655,column_19656,map__19639_19649,map__19639_19650__$1,env_19651,val__14678__auto__))
,cljs.core.PersistentVector.EMPTY));
});})(minfo,map__19643_19653,map__19643_19654__$1,line_19655,column_19656,map__19639_19649,map__19639_19650__$1,env_19651,val__14678__auto__))
,cljs.core.sorted_map()));
});})(map__19643_19653,map__19643_19654__$1,line_19655,column_19656,map__19639_19649,map__19639_19650__$1,env_19651,val__14678__auto__))
);
} else {
}
} else {
}

return (cljs.compiler.emit_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_STAR_.cljs$core$IFn$_invoke$arity$1(ast) : cljs.compiler.emit_STAR_.call(null,ast));
}finally {if((val__14678__auto__ == null)){
cljs.env._STAR_compiler_STAR_ = null;
} else {
}
}});
cljs.compiler.emits = (function cljs$compiler$emits(var_args){
var args__8746__auto__ = [];
var len__8739__auto___19676 = arguments.length;
var i__8740__auto___19679 = (0);
while(true){
if((i__8740__auto___19679 < len__8739__auto___19676)){
args__8746__auto__.push((arguments[i__8740__auto___19679]));

var G__19680 = (i__8740__auto___19679 + (1));
i__8740__auto___19679 = G__19680;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
var seq__19667_19684 = cljs.core.seq(xs);
var chunk__19668_19685 = null;
var count__19669_19686 = (0);
var i__19670_19687 = (0);
while(true){
if((i__19670_19687 < count__19669_19686)){
var x_19688 = chunk__19668_19685.cljs$core$IIndexed$_nth$arity$2(null,i__19670_19687);
if((x_19688 == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_(x_19688)){
cljs.compiler.emit(x_19688);
} else {
if(cljs.analyzer.cljs_seq_QMARK_(x_19688)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.compiler.emits,x_19688);
} else {
if(goog.isFunction(x_19688)){
(x_19688.cljs$core$IFn$_invoke$arity$0 ? x_19688.cljs$core$IFn$_invoke$arity$0() : x_19688.call(null));
} else {
var s_19693 = cljs.core.print_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([x_19688], 0));
if((cljs.compiler._STAR_source_map_data_STAR_ == null)){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.compiler._STAR_source_map_data_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gen-col","gen-col",1901918303)], null),((function (seq__19667_19684,chunk__19668_19685,count__19669_19686,i__19670_19687,s_19693,x_19688){
return (function (p1__19665_SHARP_){
return (p1__19665_SHARP_ + cljs.core.count(s_19693));
});})(seq__19667_19684,chunk__19668_19685,count__19669_19686,i__19670_19687,s_19693,x_19688))
);
}

cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([s_19693], 0));

}
}
}
}

var G__19696 = seq__19667_19684;
var G__19697 = chunk__19668_19685;
var G__19698 = count__19669_19686;
var G__19699 = (i__19670_19687 + (1));
seq__19667_19684 = G__19696;
chunk__19668_19685 = G__19697;
count__19669_19686 = G__19698;
i__19670_19687 = G__19699;
continue;
} else {
var temp__6753__auto___19700 = cljs.core.seq(seq__19667_19684);
if(temp__6753__auto___19700){
var seq__19667_19701__$1 = temp__6753__auto___19700;
if(cljs.core.chunked_seq_QMARK_(seq__19667_19701__$1)){
var c__8429__auto___19702 = cljs.core.chunk_first(seq__19667_19701__$1);
var G__19703 = cljs.core.chunk_rest(seq__19667_19701__$1);
var G__19704 = c__8429__auto___19702;
var G__19705 = cljs.core.count(c__8429__auto___19702);
var G__19706 = (0);
seq__19667_19684 = G__19703;
chunk__19668_19685 = G__19704;
count__19669_19686 = G__19705;
i__19670_19687 = G__19706;
continue;
} else {
var x_19709 = cljs.core.first(seq__19667_19701__$1);
if((x_19709 == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_(x_19709)){
cljs.compiler.emit(x_19709);
} else {
if(cljs.analyzer.cljs_seq_QMARK_(x_19709)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.compiler.emits,x_19709);
} else {
if(goog.isFunction(x_19709)){
(x_19709.cljs$core$IFn$_invoke$arity$0 ? x_19709.cljs$core$IFn$_invoke$arity$0() : x_19709.call(null));
} else {
var s_19712 = cljs.core.print_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([x_19709], 0));
if((cljs.compiler._STAR_source_map_data_STAR_ == null)){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.compiler._STAR_source_map_data_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gen-col","gen-col",1901918303)], null),((function (seq__19667_19684,chunk__19668_19685,count__19669_19686,i__19670_19687,s_19712,x_19709,seq__19667_19701__$1,temp__6753__auto___19700){
return (function (p1__19665_SHARP_){
return (p1__19665_SHARP_ + cljs.core.count(s_19712));
});})(seq__19667_19684,chunk__19668_19685,count__19669_19686,i__19670_19687,s_19712,x_19709,seq__19667_19701__$1,temp__6753__auto___19700))
);
}

cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([s_19712], 0));

}
}
}
}

var G__19715 = cljs.core.next(seq__19667_19701__$1);
var G__19716 = null;
var G__19717 = (0);
var G__19718 = (0);
seq__19667_19684 = G__19715;
chunk__19668_19685 = G__19716;
count__19669_19686 = G__19717;
i__19670_19687 = G__19718;
continue;
}
} else {
}
}
break;
}

return null;
});

cljs.compiler.emits.cljs$lang$maxFixedArity = (0);

cljs.compiler.emits.cljs$lang$applyTo = (function (seq19666){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq19666));
});

cljs.compiler.emitln = (function cljs$compiler$emitln(var_args){
var args__8746__auto__ = [];
var len__8739__auto___19728 = arguments.length;
var i__8740__auto___19729 = (0);
while(true){
if((i__8740__auto___19729 < len__8739__auto___19728)){
args__8746__auto__.push((arguments[i__8740__auto___19729]));

var G__19730 = (i__8740__auto___19729 + (1));
i__8740__auto___19729 = G__19730;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.compiler.emits,xs);

cljs.core.println();

if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_source_map_data_STAR_,(function (p__19723){
var map__19724 = p__19723;
var map__19724__$1 = ((((!((map__19724 == null)))?((((map__19724.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19724.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19724):map__19724);
var m = map__19724__$1;
var gen_line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19724__$1,new cljs.core.Keyword(null,"gen-line","gen-line",589592125));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(m,new cljs.core.Keyword(null,"gen-line","gen-line",589592125),(gen_line + (1)),cljs.core.array_seq([new cljs.core.Keyword(null,"gen-col","gen-col",1901918303),(0)], 0));
}));
} else {
}

return null;
});

cljs.compiler.emitln.cljs$lang$maxFixedArity = (0);

cljs.compiler.emitln.cljs$lang$applyTo = (function (seq19721){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq19721));
});

cljs.compiler.emit_str = (function cljs$compiler$emit_str(expr){
var sb__8610__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_19738_19740 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_19739_19741 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_19738_19740,_STAR_print_fn_STAR_19739_19741,sb__8610__auto__){
return (function (x__8611__auto__){
return sb__8610__auto__.append(x__8611__auto__);
});})(_STAR_print_newline_STAR_19738_19740,_STAR_print_fn_STAR_19739_19741,sb__8610__auto__))
;

try{cljs.compiler.emit(expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_19739_19741;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_19738_19740;
}
return [cljs.core.str(sb__8610__auto__)].join('');
});
if(typeof cljs.compiler.emit_constant !== 'undefined'){
} else {
cljs.compiler.emit_constant = (function (){var method_table__8549__auto__ = (function (){var G__19745 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19745) : cljs.core.atom.call(null,G__19745));
})();
var prefer_table__8550__auto__ = (function (){var G__19746 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19746) : cljs.core.atom.call(null,G__19746));
})();
var method_cache__8551__auto__ = (function (){var G__19748 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19748) : cljs.core.atom.call(null,G__19748));
})();
var cached_hierarchy__8552__auto__ = (function (){var G__19751 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19751) : cljs.core.atom.call(null,G__19751));
})();
var hierarchy__8553__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.compiler","emit-constant"),cljs.core.type,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__8553__auto__,method_table__8549__auto__,prefer_table__8550__auto__,method_cache__8551__auto__,cached_hierarchy__8552__auto__));
})();
}
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,null,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["null"], 0));
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,Number,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(",x,")"], 0));
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,String,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.wrap_in_double_quotes(cljs.compiler.escape_string(x))], 0));
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,Boolean,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(cljs.core.truth_(x)?"true":"false")], 0));
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,RegExp,(function (x){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("",[cljs.core.str(x)].join(''))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(new RegExp(\"\"))"], 0));
} else {
var vec__19763 = cljs.core.re_find(/^(?:\(\?([idmsux]*)\))?(.*)/,[cljs.core.str(x)].join(''));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19763,(0),null);
var flags = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19763,(1),null);
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19763,(2),null);
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([pattern], 0));
}
}));
cljs.compiler.emits_keyword = (function cljs$compiler$emits_keyword(kw){
var ns = cljs.core.namespace(kw);
var name = cljs.core.name(kw);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.Keyword("], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(ns) : cljs.compiler.emit_constant.call(null,ns));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(name) : cljs.compiler.emit_constant.call(null,name));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

var G__19772_19777 = (cljs.core.truth_(ns)?[cljs.core.str(ns),cljs.core.str("/"),cljs.core.str(name)].join(''):name);
(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(G__19772_19777) : cljs.compiler.emit_constant.call(null,G__19772_19777));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

var G__19773_19780 = cljs.core.hash(kw);
(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(G__19773_19780) : cljs.compiler.emit_constant.call(null,G__19773_19780));

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([")"], 0));
});
cljs.compiler.emits_symbol = (function cljs$compiler$emits_symbol(sym){
var ns = cljs.core.namespace(sym);
var name = cljs.core.name(sym);
var symstr = ((!((ns == null)))?[cljs.core.str(ns),cljs.core.str("/"),cljs.core.str(name)].join(''):name);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.Symbol("], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(ns) : cljs.compiler.emit_constant.call(null,ns));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(name) : cljs.compiler.emit_constant.call(null,name));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(symstr) : cljs.compiler.emit_constant.call(null,symstr));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

var G__19785_19789 = cljs.core.hash(sym);
(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(G__19785_19789) : cljs.compiler.emit_constant.call(null,G__19785_19789));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(null) : cljs.compiler.emit_constant.call(null,null));

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([")"], 0));
});
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.Keyword,(function (x){
if(cljs.core.truth_(new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)))))){
var value = (function (){var G__19794 = new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
return (x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(G__19794) : x.call(null,G__19794));
})();
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.",value], 0));
} else {
return cljs.compiler.emits_keyword(x);
}
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.Symbol,(function (x){
if(cljs.core.truth_(new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)))))){
var value = (function (){var G__19797 = new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
return (x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(G__19797) : x.call(null,G__19797));
})();
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.",value], 0));
} else {
return cljs.compiler.emits_symbol(x);
}
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,Date,(function (date){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new Date(",date.getTime(),")"], 0));
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.UUID,(function (uuid){
var uuid_str = uuid.toString();
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.UUID(\"",uuid_str,"\", ",cljs.core.hash(uuid_str),")"], 0));
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"no-op","no-op",-93046065),(function (m){
return null;
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"var","var",-769682797),(function (p__19805){
var map__19806 = p__19805;
var map__19806__$1 = ((((!((map__19806 == null)))?((((map__19806.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19806.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19806):map__19806);
var arg = map__19806__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19806__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19806__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19806__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var var_name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
var info__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(var_name),"js"))?(function (){var js_module_name = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"js-module-index","js-module-index",2072061931),cljs.core.name(var_name)], null));
var or__7523__auto__ = js_module_name;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.core.name(var_name);
}
})():info);
if(cljs.core.truth_(new cljs.core.Keyword(null,"binding-form?","binding-form?",1728940169).cljs$core$IFn$_invoke$arity$1(arg))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(arg)], 0));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__19395__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(function (){var G__19810 = info__$1;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(form,new cljs.core.Symbol("js","-Infinity","js/-Infinity",958706333,null))){
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(G__19810);
} else {
return G__19810;
}
})()], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"var-special","var-special",1131576802),(function (p__19834){
var map__19835 = p__19834;
var map__19835__$1 = ((((!((map__19835 == null)))?((((map__19835.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19835.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19835):map__19835);
var arg = map__19835__$1;
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19835__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19835__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var sym = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19835__$1,new cljs.core.Keyword(null,"sym","sym",-1444860305));
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19835__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
if(cljs.analyzer.ast_QMARK_(sym)){
} else {
throw (new Error("Assert failed: (ana/ast? sym)"));
}

if(cljs.analyzer.ast_QMARK_(meta)){
} else {
throw (new Error("Assert failed: (ana/ast? meta)"));
}

var map__19839 = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(var$);
var map__19839__$1 = ((((!((map__19839 == null)))?((((map__19839.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19839.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19839):map__19839);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19839__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env__19395__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.Var(function(){return ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),";},",sym,",",meta,")"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"meta","meta",1499536964),(function (p__19849){
var map__19850 = p__19849;
var map__19850__$1 = ((((!((map__19850 == null)))?((((map__19850.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19850.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19850):map__19850);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19850__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19850__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19850__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__19395__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.with_meta(",expr,",",meta,")"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.array_map_threshold = (8);
cljs.compiler.distinct_keys_QMARK_ = (function cljs$compiler$distinct_keys_QMARK_(keys){
return (cljs.core.every_QMARK_((function (p1__19854_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__19854_SHARP_),new cljs.core.Keyword(null,"constant","constant",-379609303));
}),keys)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,keys)),cljs.core.count(keys)));
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"map","map",1371690461),(function (p__19855){
var map__19856 = p__19855;
var map__19856__$1 = ((((!((map__19856 == null)))?((((map__19856.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19856.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19856):map__19856);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19856__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19856__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var vals = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19856__$1,new cljs.core.Keyword(null,"vals","vals",768058733));
var env__19395__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if((cljs.core.count(keys) === (0))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentArrayMap.EMPTY"], 0));
} else {
if((cljs.core.count(keys) <= cljs.compiler.array_map_threshold)){
if(cljs.core.truth_(cljs.compiler.distinct_keys_QMARK_(keys))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.PersistentArrayMap(null, ",cljs.core.count(keys),", [",cljs.compiler.comma_sep(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(keys,vals)),"], null)"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentArrayMap.fromArray([",cljs.compiler.comma_sep(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(keys,vals)),"], true, false)"], 0));
}
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentHashMap.fromArrays([",cljs.compiler.comma_sep(keys),"],[",cljs.compiler.comma_sep(vals),"])"], 0));

}
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"list","list",765357683),(function (p__19862){
var map__19863 = p__19862;
var map__19863__$1 = ((((!((map__19863 == null)))?((((map__19863.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19863.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19863):map__19863);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19863__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19863__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__19395__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.empty_QMARK_(items)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.List.EMPTY"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.list(",cljs.compiler.comma_sep(items),")"], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"vector","vector",1902966158),(function (p__19865){
var map__19866 = p__19865;
var map__19866__$1 = ((((!((map__19866 == null)))?((((map__19866.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19866.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19866):map__19866);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19866__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19866__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__19395__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.empty_QMARK_(items)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentVector.EMPTY"], 0));
} else {
var cnt_19872 = cljs.core.count(items);
if((cnt_19872 < (32))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.PersistentVector(null, ",cnt_19872,", 5, cljs.core.PersistentVector.EMPTY_NODE, [",cljs.compiler.comma_sep(items),"], null)"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentVector.fromArray([",cljs.compiler.comma_sep(items),"], true)"], 0));
}
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.distinct_constants_QMARK_ = (function cljs$compiler$distinct_constants_QMARK_(items){
return (cljs.core.every_QMARK_((function (p1__19875_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__19875_SHARP_),new cljs.core.Keyword(null,"constant","constant",-379609303));
}),items)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,items)),cljs.core.count(items)));
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"set","set",304602554),(function (p__19884){
var map__19885 = p__19884;
var map__19885__$1 = ((((!((map__19885 == null)))?((((map__19885.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19885.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19885):map__19885);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19885__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19885__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__19395__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.empty_QMARK_(items)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentHashSet.EMPTY"], 0));
} else {
if(cljs.core.truth_(cljs.compiler.distinct_constants_QMARK_(items))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, ",cljs.core.count(items),", [",cljs.compiler.comma_sep(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(items,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1("null"))),"], null), null)"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentHashSet.fromArray([",cljs.compiler.comma_sep(items),"], true)"], 0));

}
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"js-value","js-value",-758336661),(function (p__19904){
var map__19905 = p__19904;
var map__19905__$1 = ((((!((map__19905 == null)))?((((map__19905.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19905.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19905):map__19905);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19905__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var js_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19905__$1,new cljs.core.Keyword(null,"js-type","js-type",539386702));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19905__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__19395__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(js_type,new cljs.core.Keyword(null,"object","object",1474613949))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["({"], 0));

var temp__6753__auto___19925 = cljs.core.seq(items);
if(temp__6753__auto___19925){
var items_19926__$1 = temp__6753__auto___19925;
var vec__19909_19927 = items_19926__$1;
var seq__19910_19928 = cljs.core.seq(vec__19909_19927);
var first__19911_19929 = cljs.core.first(seq__19910_19928);
var seq__19910_19930__$1 = cljs.core.next(seq__19910_19928);
var vec__19912_19931 = first__19911_19929;
var k_19932 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19912_19931,(0),null);
var v_19933 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19912_19931,(1),null);
var r_19934 = seq__19910_19930__$1;
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["\"",cljs.core.name(k_19932),"\": ",v_19933], 0));

var seq__19915_19935 = cljs.core.seq(r_19934);
var chunk__19916_19936 = null;
var count__19917_19937 = (0);
var i__19918_19938 = (0);
while(true){
if((i__19918_19938 < count__19917_19937)){
var vec__19919_19939 = chunk__19916_19936.cljs$core$IIndexed$_nth$arity$2(null,i__19918_19938);
var k_19940__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19919_19939,(0),null);
var v_19941__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19919_19939,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([", \"",cljs.core.name(k_19940__$1),"\": ",v_19941__$1], 0));

var G__19942 = seq__19915_19935;
var G__19943 = chunk__19916_19936;
var G__19944 = count__19917_19937;
var G__19945 = (i__19918_19938 + (1));
seq__19915_19935 = G__19942;
chunk__19916_19936 = G__19943;
count__19917_19937 = G__19944;
i__19918_19938 = G__19945;
continue;
} else {
var temp__6753__auto___19946__$1 = cljs.core.seq(seq__19915_19935);
if(temp__6753__auto___19946__$1){
var seq__19915_19947__$1 = temp__6753__auto___19946__$1;
if(cljs.core.chunked_seq_QMARK_(seq__19915_19947__$1)){
var c__8429__auto___19948 = cljs.core.chunk_first(seq__19915_19947__$1);
var G__19949 = cljs.core.chunk_rest(seq__19915_19947__$1);
var G__19950 = c__8429__auto___19948;
var G__19951 = cljs.core.count(c__8429__auto___19948);
var G__19952 = (0);
seq__19915_19935 = G__19949;
chunk__19916_19936 = G__19950;
count__19917_19937 = G__19951;
i__19918_19938 = G__19952;
continue;
} else {
var vec__19922_19953 = cljs.core.first(seq__19915_19947__$1);
var k_19954__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19922_19953,(0),null);
var v_19955__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19922_19953,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([", \"",cljs.core.name(k_19954__$1),"\": ",v_19955__$1], 0));

var G__19957 = cljs.core.next(seq__19915_19947__$1);
var G__19958 = null;
var G__19959 = (0);
var G__19960 = (0);
seq__19915_19935 = G__19957;
chunk__19916_19936 = G__19958;
count__19917_19937 = G__19959;
i__19918_19938 = G__19960;
continue;
}
} else {
}
}
break;
}
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["[",cljs.compiler.comma_sep(items),"]"], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"constant","constant",-379609303),(function (p__19961){
var map__19962 = p__19961;
var map__19962__$1 = ((((!((map__19962 == null)))?((((map__19962.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19962.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19962):map__19962);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19962__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19962__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__19395__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(form) : cljs.compiler.emit_constant.call(null,form));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}
}));
cljs.compiler.truthy_constant_QMARK_ = (function cljs$compiler$truthy_constant_QMARK_(p__19964){
var map__19971 = p__19964;
var map__19971__$1 = ((((!((map__19971 == null)))?((((map__19971.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19971.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19971):map__19971);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19971__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19971__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var and__7511__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,new cljs.core.Keyword(null,"constant","constant",-379609303));
if(and__7511__auto__){
var and__7511__auto____$1 = form;
if(cljs.core.truth_(and__7511__auto____$1)){
return !(((typeof form === 'string') && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(form,""))) || ((typeof form === 'number') && ((form === (0)))));
} else {
return and__7511__auto____$1;
}
} else {
return and__7511__auto__;
}
});
cljs.compiler.falsey_constant_QMARK_ = (function cljs$compiler$falsey_constant_QMARK_(p__19981){
var map__19984 = p__19981;
var map__19984__$1 = ((((!((map__19984 == null)))?((((map__19984.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19984.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19984):map__19984);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19984__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19984__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
return (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,new cljs.core.Keyword(null,"constant","constant",-379609303))) && ((form === false) || ((form == null)));
});
cljs.compiler.safe_test_QMARK_ = (function cljs$compiler$safe_test_QMARK_(env,e){
var tag = cljs.analyzer.infer_tag(env,e);
var or__7523__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"seq","seq",-177272256,null),null,new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),null], null), null).call(null,tag);
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.compiler.truthy_constant_QMARK_(e);
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"if","if",-458814265),(function (p__19986){
var map__19987 = p__19986;
var map__19987__$1 = ((((!((map__19987 == null)))?((((map__19987.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19987.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19987):map__19987);
var test = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19987__$1,new cljs.core.Keyword(null,"test","test",577538877));
var then = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19987__$1,new cljs.core.Keyword(null,"then","then",460598070));
var else$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19987__$1,new cljs.core.Keyword(null,"else","else",-1508377146));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19987__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var unchecked = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19987__$1,new cljs.core.Keyword(null,"unchecked","unchecked",924418378));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
var checked = cljs.core.not((function (){var or__7523__auto__ = unchecked;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.compiler.safe_test_QMARK_(env,test);
}
})());
if(cljs.core.truth_(cljs.compiler.truthy_constant_QMARK_(test))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([then], 0));
} else {
if(cljs.core.truth_(cljs.compiler.falsey_constant_QMARK_(test))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([else$], 0));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(",((checked)?"cljs.core.truth_":null),"(",test,")?",then,":",else$,")"], 0));
} else {
if(checked){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if(cljs.core.truth_(",test,")){"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if(",test,"){"], 0));
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([then,"} else {"], 0));

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([else$,"}"], 0));
}

}
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"case*","case*",716180697),(function (p__19989){
var map__19990 = p__19989;
var map__19990__$1 = ((((!((map__19990 == null)))?((((map__19990.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19990.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19990):map__19990);
var v = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19990__$1,new cljs.core.Keyword(null,"v","v",21465059));
var tests = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19990__$1,new cljs.core.Keyword(null,"tests","tests",-1041085625));
var thens = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19990__$1,new cljs.core.Keyword(null,"thens","thens",226631442));
var default$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19990__$1,new cljs.core.Keyword(null,"default","default",-1987822328));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19990__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"expr","expr",745722291))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function(){"], 0));
} else {
}

var gs = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("caseval__");
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",gs,";"], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["switch (",v,") {"], 0));

var seq__19992_20010 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(tests,thens)));
var chunk__19993_20011 = null;
var count__19994_20012 = (0);
var i__19995_20013 = (0);
while(true){
if((i__19995_20013 < count__19994_20012)){
var vec__19996_20014 = chunk__19993_20011.cljs$core$IIndexed$_nth$arity$2(null,i__19995_20013);
var ts_20015 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19996_20014,(0),null);
var then_20016 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19996_20014,(1),null);
var seq__19999_20017 = cljs.core.seq(ts_20015);
var chunk__20000_20018 = null;
var count__20001_20019 = (0);
var i__20002_20020 = (0);
while(true){
if((i__20002_20020 < count__20001_20019)){
var test_20021 = chunk__20000_20018.cljs$core$IIndexed$_nth$arity$2(null,i__20002_20020);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",test_20021,":"], 0));

var G__20022 = seq__19999_20017;
var G__20023 = chunk__20000_20018;
var G__20024 = count__20001_20019;
var G__20025 = (i__20002_20020 + (1));
seq__19999_20017 = G__20022;
chunk__20000_20018 = G__20023;
count__20001_20019 = G__20024;
i__20002_20020 = G__20025;
continue;
} else {
var temp__6753__auto___20026 = cljs.core.seq(seq__19999_20017);
if(temp__6753__auto___20026){
var seq__19999_20027__$1 = temp__6753__auto___20026;
if(cljs.core.chunked_seq_QMARK_(seq__19999_20027__$1)){
var c__8429__auto___20028 = cljs.core.chunk_first(seq__19999_20027__$1);
var G__20029 = cljs.core.chunk_rest(seq__19999_20027__$1);
var G__20030 = c__8429__auto___20028;
var G__20031 = cljs.core.count(c__8429__auto___20028);
var G__20032 = (0);
seq__19999_20017 = G__20029;
chunk__20000_20018 = G__20030;
count__20001_20019 = G__20031;
i__20002_20020 = G__20032;
continue;
} else {
var test_20033 = cljs.core.first(seq__19999_20027__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",test_20033,":"], 0));

var G__20034 = cljs.core.next(seq__19999_20027__$1);
var G__20035 = null;
var G__20036 = (0);
var G__20037 = (0);
seq__19999_20017 = G__20034;
chunk__20000_20018 = G__20035;
count__20001_20019 = G__20036;
i__20002_20020 = G__20037;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([gs,"=",then_20016], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([then_20016], 0));
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["break;"], 0));

var G__20038 = seq__19992_20010;
var G__20039 = chunk__19993_20011;
var G__20040 = count__19994_20012;
var G__20041 = (i__19995_20013 + (1));
seq__19992_20010 = G__20038;
chunk__19993_20011 = G__20039;
count__19994_20012 = G__20040;
i__19995_20013 = G__20041;
continue;
} else {
var temp__6753__auto___20042 = cljs.core.seq(seq__19992_20010);
if(temp__6753__auto___20042){
var seq__19992_20043__$1 = temp__6753__auto___20042;
if(cljs.core.chunked_seq_QMARK_(seq__19992_20043__$1)){
var c__8429__auto___20044 = cljs.core.chunk_first(seq__19992_20043__$1);
var G__20045 = cljs.core.chunk_rest(seq__19992_20043__$1);
var G__20046 = c__8429__auto___20044;
var G__20047 = cljs.core.count(c__8429__auto___20044);
var G__20048 = (0);
seq__19992_20010 = G__20045;
chunk__19993_20011 = G__20046;
count__19994_20012 = G__20047;
i__19995_20013 = G__20048;
continue;
} else {
var vec__20003_20049 = cljs.core.first(seq__19992_20043__$1);
var ts_20050 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20003_20049,(0),null);
var then_20051 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20003_20049,(1),null);
var seq__20006_20052 = cljs.core.seq(ts_20050);
var chunk__20007_20053 = null;
var count__20008_20054 = (0);
var i__20009_20055 = (0);
while(true){
if((i__20009_20055 < count__20008_20054)){
var test_20056 = chunk__20007_20053.cljs$core$IIndexed$_nth$arity$2(null,i__20009_20055);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",test_20056,":"], 0));

var G__20057 = seq__20006_20052;
var G__20058 = chunk__20007_20053;
var G__20059 = count__20008_20054;
var G__20060 = (i__20009_20055 + (1));
seq__20006_20052 = G__20057;
chunk__20007_20053 = G__20058;
count__20008_20054 = G__20059;
i__20009_20055 = G__20060;
continue;
} else {
var temp__6753__auto___20061__$1 = cljs.core.seq(seq__20006_20052);
if(temp__6753__auto___20061__$1){
var seq__20006_20062__$1 = temp__6753__auto___20061__$1;
if(cljs.core.chunked_seq_QMARK_(seq__20006_20062__$1)){
var c__8429__auto___20063 = cljs.core.chunk_first(seq__20006_20062__$1);
var G__20064 = cljs.core.chunk_rest(seq__20006_20062__$1);
var G__20065 = c__8429__auto___20063;
var G__20066 = cljs.core.count(c__8429__auto___20063);
var G__20067 = (0);
seq__20006_20052 = G__20064;
chunk__20007_20053 = G__20065;
count__20008_20054 = G__20066;
i__20009_20055 = G__20067;
continue;
} else {
var test_20068 = cljs.core.first(seq__20006_20062__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",test_20068,":"], 0));

var G__20069 = cljs.core.next(seq__20006_20062__$1);
var G__20070 = null;
var G__20071 = (0);
var G__20072 = (0);
seq__20006_20052 = G__20069;
chunk__20007_20053 = G__20070;
count__20008_20054 = G__20071;
i__20009_20055 = G__20072;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([gs,"=",then_20051], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([then_20051], 0));
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["break;"], 0));

var G__20073 = cljs.core.next(seq__19992_20043__$1);
var G__20074 = null;
var G__20075 = (0);
var G__20076 = (0);
seq__19992_20010 = G__20073;
chunk__19993_20011 = G__20074;
count__19994_20012 = G__20075;
i__19995_20013 = G__20076;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(default$)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["default:"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([gs,"=",default$], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([default$], 0));
}
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",gs,";})()"], 0));
} else {
return null;
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"throw","throw",-1044625833),(function (p__20077){
var map__20078 = p__20077;
var map__20078__$1 = ((((!((map__20078 == null)))?((((map__20078.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20078.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20078):map__20078);
var throw$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20078__$1,new cljs.core.Keyword(null,"throw","throw",-1044625833));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20078__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function(){throw ",throw$,"})()"], 0));
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["throw ",throw$,";"], 0));
}
}));
cljs.compiler.base_types = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 15, ["boolean",null,"object",null,"*",null,"string",null,"Object",null,"Number",null,"null",null,"Date",null,"number",null,"String",null,"RegExp",null,"...*",null,"Array",null,"array",null,"Boolean",null], null), null);
cljs.compiler.mapped_types = new cljs.core.PersistentArrayMap(null, 1, ["nil","null"], null);
cljs.compiler.resolve_type = (function cljs$compiler$resolve_type(env,t){
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler.base_types,t))){
return t;
} else {
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler.mapped_types,t))){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler.mapped_types,t);
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"!"))){
return [cljs.core.str("!"),cljs.core.str((function (){var G__20089 = env;
var G__20090 = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(t,(1));
return (cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(G__20089,G__20090) : cljs.compiler.resolve_type.call(null,G__20089,G__20090));
})())].join('');
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"{"))){
return t;
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"function"))){
var idx = t.lastIndexOf(":");
var vec__20091 = ((!(((-1) === idx)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(0),idx),cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(idx + (1)),cljs.core.count(t))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,null], null));
var fstr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20091,(0),null);
var rstr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20091,(1),null);
var ret_t = (cljs.core.truth_(rstr)?(cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(env,rstr) : cljs.compiler.resolve_type.call(null,env,rstr)):null);
var axstr = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(fstr,(9),(cljs.core.count(fstr) - (1)));
var args_ts = ((clojure.string.blank_QMARK_(axstr))?null:cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((function (idx,vec__20091,fstr,rstr,ret_t,axstr){
return (function (p1__20080_SHARP_){
return (cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(env,p1__20080_SHARP_) : cljs.compiler.resolve_type.call(null,env,p1__20080_SHARP_));
});})(idx,vec__20091,fstr,rstr,ret_t,axstr))
,clojure.string.trim),clojure.string.split.cljs$core$IFn$_invoke$arity$2(axstr,/,/)));
var G__20094 = [cljs.core.str("function("),cljs.core.str(clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",args_ts)),cljs.core.str(")")].join('');
if(cljs.core.truth_(ret_t)){
return [cljs.core.str(G__20094),cljs.core.str(":"),cljs.core.str(ret_t)].join('');
} else {
return G__20094;
}
} else {
if(cljs.core.truth_(goog.string.endsWith(t,"="))){
return [cljs.core.str((function (){var G__20095 = env;
var G__20096 = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(0),(cljs.core.count(t) - (1)));
return (cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(G__20095,G__20096) : cljs.compiler.resolve_type.call(null,G__20095,G__20096));
})()),cljs.core.str("=")].join('');
} else {
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(env,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(t))))].join(''));

}
}
}
}
}
}
});
cljs.compiler.resolve_types = (function cljs$compiler$resolve_types(env,ts){
var ts__$1 = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(clojure.string.trim(ts),(1),(cljs.core.count(ts) - (1)));
var xs = clojure.string.split.cljs$core$IFn$_invoke$arity$2(ts__$1,/\|/);
return [cljs.core.str("{"),cljs.core.str(clojure.string.join.cljs$core$IFn$_invoke$arity$2("|",cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (ts__$1,xs){
return (function (p1__20097_SHARP_){
return cljs.compiler.resolve_type(env,p1__20097_SHARP_);
});})(ts__$1,xs))
,xs))),cljs.core.str("}")].join('');
});
cljs.compiler.munge_param_return = (function cljs$compiler$munge_param_return(env,line){
if(cljs.core.truth_(cljs.core.re_find(/@param/,line))){
var vec__20104 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.trim,clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(line),/ /));
var seq__20105 = cljs.core.seq(vec__20104);
var first__20106 = cljs.core.first(seq__20105);
var seq__20105__$1 = cljs.core.next(seq__20105);
var p = first__20106;
var first__20106__$1 = cljs.core.first(seq__20105__$1);
var seq__20105__$2 = cljs.core.next(seq__20105__$1);
var ts = first__20106__$1;
var first__20106__$2 = cljs.core.first(seq__20105__$2);
var seq__20105__$3 = cljs.core.next(seq__20105__$2);
var n = first__20106__$2;
var xs = seq__20105__$3;
if(cljs.core.truth_((function (){var and__7511__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("@param",p);
if(and__7511__auto__){
var and__7511__auto____$1 = ts;
if(cljs.core.truth_(and__7511__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__7511__auto____$1;
}
} else {
return and__7511__auto__;
}
})())){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types(env,ts),cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(n)], null),xs));
} else {
return line;
}
} else {
if(cljs.core.truth_(cljs.core.re_find(/@return/,line))){
var vec__20107 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.trim,clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(line),/ /));
var seq__20108 = cljs.core.seq(vec__20107);
var first__20109 = cljs.core.first(seq__20108);
var seq__20108__$1 = cljs.core.next(seq__20108);
var p = first__20109;
var first__20109__$1 = cljs.core.first(seq__20108__$1);
var seq__20108__$2 = cljs.core.next(seq__20108__$1);
var ts = first__20109__$1;
var xs = seq__20108__$2;
if(cljs.core.truth_((function (){var and__7511__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("@return",p);
if(and__7511__auto__){
var and__7511__auto____$1 = ts;
if(cljs.core.truth_(and__7511__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__7511__auto____$1;
}
} else {
return and__7511__auto__;
}
})())){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types(env,ts)], null),xs));
} else {
return line;
}
} else {
return line;

}
}
});
cljs.compiler.checking_types_QMARK_ = (function cljs$compiler$checking_types_QMARK_(){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"warn","warn",-436710552),null,new cljs.core.Keyword(null,"error","error",-978969032),null], null), null).call(null,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"options","options",99638489),new cljs.core.Keyword(null,"closure-warnings","closure-warnings",1362834211),new cljs.core.Keyword(null,"check-types","check-types",-833794607)], null)));
});
/**
 * Emit a nicely formatted comment string.
 */
cljs.compiler.emit_comment = (function cljs$compiler$emit_comment(var_args){
var args20111 = [];
var len__8739__auto___20146 = arguments.length;
var i__8740__auto___20147 = (0);
while(true){
if((i__8740__auto___20147 < len__8739__auto___20146)){
args20111.push((arguments[i__8740__auto___20147]));

var G__20148 = (i__8740__auto___20147 + (1));
i__8740__auto___20147 = G__20148;
continue;
} else {
}
break;
}

var G__20113 = args20111.length;
switch (G__20113) {
case 2:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args20111.length)].join('')));

}
});

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2 = (function (doc,jsdoc){
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3(null,doc,jsdoc);
});

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3 = (function (env,doc,jsdoc){
var docs = (cljs.core.truth_(doc)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [doc], null):null);
var docs__$1 = (cljs.core.truth_(jsdoc)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(docs,jsdoc):docs);
var docs__$2 = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,docs__$1);
var print_comment_lines = ((function (docs,docs__$1,docs__$2){
return (function cljs$compiler$print_comment_lines(e){
var vec__20135 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (docs,docs__$1,docs__$2){
return (function (p1__20110_SHARP_){
if(cljs.core.truth_(cljs.compiler.checking_types_QMARK_())){
return cljs.compiler.munge_param_return(env,p1__20110_SHARP_);
} else {
return p1__20110_SHARP_;
}
});})(docs,docs__$1,docs__$2))
,clojure.string.split_lines(e));
var seq__20136 = cljs.core.seq(vec__20135);
var first__20137 = cljs.core.first(seq__20136);
var seq__20136__$1 = cljs.core.next(seq__20136);
var x = first__20137;
var ys = seq__20136__$1;
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * ",clojure.string.replace(x,"*/","* /")], 0));

var seq__20138 = cljs.core.seq(ys);
var chunk__20139 = null;
var count__20140 = (0);
var i__20141 = (0);
while(true){
if((i__20141 < count__20140)){
var next_line = chunk__20139.cljs$core$IIndexed$_nth$arity$2(null,i__20141);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * ",clojure.string.replace(clojure.string.replace(next_line,/^   /,""),"*/","* /")], 0));

var G__20150 = seq__20138;
var G__20151 = chunk__20139;
var G__20152 = count__20140;
var G__20153 = (i__20141 + (1));
seq__20138 = G__20150;
chunk__20139 = G__20151;
count__20140 = G__20152;
i__20141 = G__20153;
continue;
} else {
var temp__6753__auto__ = cljs.core.seq(seq__20138);
if(temp__6753__auto__){
var seq__20138__$1 = temp__6753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20138__$1)){
var c__8429__auto__ = cljs.core.chunk_first(seq__20138__$1);
var G__20154 = cljs.core.chunk_rest(seq__20138__$1);
var G__20155 = c__8429__auto__;
var G__20156 = cljs.core.count(c__8429__auto__);
var G__20157 = (0);
seq__20138 = G__20154;
chunk__20139 = G__20155;
count__20140 = G__20156;
i__20141 = G__20157;
continue;
} else {
var next_line = cljs.core.first(seq__20138__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * ",clojure.string.replace(clojure.string.replace(next_line,/^   /,""),"*/","* /")], 0));

var G__20158 = cljs.core.next(seq__20138__$1);
var G__20159 = null;
var G__20160 = (0);
var G__20161 = (0);
seq__20138 = G__20158;
chunk__20139 = G__20159;
count__20140 = G__20160;
i__20141 = G__20161;
continue;
}
} else {
return null;
}
}
break;
}
});})(docs,docs__$1,docs__$2))
;
if(cljs.core.seq(docs__$2)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["/**"], 0));

var seq__20142_20162 = cljs.core.seq(docs__$2);
var chunk__20143_20163 = null;
var count__20144_20164 = (0);
var i__20145_20165 = (0);
while(true){
if((i__20145_20165 < count__20144_20164)){
var e_20166 = chunk__20143_20163.cljs$core$IIndexed$_nth$arity$2(null,i__20145_20165);
if(cljs.core.truth_(e_20166)){
print_comment_lines(e_20166);
} else {
}

var G__20167 = seq__20142_20162;
var G__20168 = chunk__20143_20163;
var G__20169 = count__20144_20164;
var G__20170 = (i__20145_20165 + (1));
seq__20142_20162 = G__20167;
chunk__20143_20163 = G__20168;
count__20144_20164 = G__20169;
i__20145_20165 = G__20170;
continue;
} else {
var temp__6753__auto___20171 = cljs.core.seq(seq__20142_20162);
if(temp__6753__auto___20171){
var seq__20142_20172__$1 = temp__6753__auto___20171;
if(cljs.core.chunked_seq_QMARK_(seq__20142_20172__$1)){
var c__8429__auto___20173 = cljs.core.chunk_first(seq__20142_20172__$1);
var G__20174 = cljs.core.chunk_rest(seq__20142_20172__$1);
var G__20175 = c__8429__auto___20173;
var G__20176 = cljs.core.count(c__8429__auto___20173);
var G__20177 = (0);
seq__20142_20162 = G__20174;
chunk__20143_20163 = G__20175;
count__20144_20164 = G__20176;
i__20145_20165 = G__20177;
continue;
} else {
var e_20178 = cljs.core.first(seq__20142_20172__$1);
if(cljs.core.truth_(e_20178)){
print_comment_lines(e_20178);
} else {
}

var G__20179 = cljs.core.next(seq__20142_20172__$1);
var G__20180 = null;
var G__20181 = (0);
var G__20182 = (0);
seq__20142_20162 = G__20179;
chunk__20143_20163 = G__20180;
count__20144_20164 = G__20181;
i__20145_20165 = G__20182;
continue;
}
} else {
}
}
break;
}

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" */"], 0));
} else {
return null;
}
});

cljs.compiler.emit_comment.cljs$lang$maxFixedArity = 3;

cljs.compiler.valid_define_value_QMARK_ = (function cljs$compiler$valid_define_value_QMARK_(x){
return (typeof x === 'string') || (x === true) || (x === false) || (typeof x === 'number');
});
cljs.compiler.get_define = (function cljs$compiler$get_define(mname,jsdoc){
var opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)),new cljs.core.Keyword(null,"options","options",99638489));
var and__7511__auto__ = cljs.core.some(((function (opts){
return (function (p1__20184_SHARP_){
return goog.string.startsWith(p1__20184_SHARP_,"@define");
});})(opts))
,jsdoc);
if(cljs.core.truth_(and__7511__auto__)){
var and__7511__auto____$1 = opts;
if(cljs.core.truth_(and__7511__auto____$1)){
var and__7511__auto____$2 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"optimizations","optimizations",-2047476854).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"none","none",1333468478));
if(and__7511__auto____$2){
var define = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(opts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"closure-defines","closure-defines",-1213856476),[cljs.core.str(mname)].join('')], null));
if(cljs.core.truth_(cljs.compiler.valid_define_value_QMARK_(define))){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([define], 0));
} else {
return null;
}
} else {
return and__7511__auto____$2;
}
} else {
return and__7511__auto____$1;
}
} else {
return and__7511__auto__;
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"def","def",-1043430536),(function (p__20185){
var map__20186 = p__20185;
var map__20186__$1 = ((((!((map__20186 == null)))?((((map__20186.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20186.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20186):map__20186);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20186__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20186__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var init = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20186__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20186__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20186__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var jsdoc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20186__$1,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516));
var export$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20186__$1,new cljs.core.Keyword(null,"export","export",214356590));
var test = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20186__$1,new cljs.core.Keyword(null,"test","test",577538877));
var var_ast = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20186__$1,new cljs.core.Keyword(null,"var-ast","var-ast",1200379319));
if(cljs.core.truth_((function (){var or__7523__auto__ = init;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env);
}
})())){
var mname = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name);
cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3(env,doc,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(jsdoc,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516).cljs$core$IFn$_invoke$arity$1(init)));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ("], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (){"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([var$], 0));

if(cljs.core.truth_(init)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = ",(function (){var temp__6751__auto__ = cljs.compiler.get_define(mname,jsdoc);
if(cljs.core.truth_(temp__6751__auto__)){
var define = temp__6751__auto__;
return define;
} else {
return init;
}
})()], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["; return ("], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"var-special","var-special",1131576802),new cljs.core.Keyword(null,"env","env",-1815813235),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"expr","expr",745722291))], null),var_ast], 0))], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([");})()"], 0));
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([")"], 0));
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}

if(cljs.core.truth_(export$)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.exportSymbol('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(export$),"', ",mname,");"], 0));
} else {
}

if(cljs.core.truth_((function (){var and__7511__auto__ = cljs.analyzer._STAR_load_tests_STAR_;
if(cljs.core.truth_(and__7511__auto__)){
return test;
} else {
return and__7511__auto__;
}
})())){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
} else {
}

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([var$,".cljs$lang$test = ",test,";"], 0));
} else {
return null;
}
} else {
return null;
}
}));
cljs.compiler.emit_apply_to = (function cljs$compiler$emit_apply_to(p__20188){
var map__20209 = p__20188;
var map__20209__$1 = ((((!((map__20209 == null)))?((((map__20209.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20209.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20209):map__20209);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20209__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20209__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20209__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var arglist = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("arglist__");
var delegate_name = [cljs.core.str(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name)),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (",arglist,"){"], 0));

var seq__20211_20229 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,cljs.core.drop_last.cljs$core$IFn$_invoke$arity$2((2),params)));
var chunk__20212_20230 = null;
var count__20213_20231 = (0);
var i__20214_20232 = (0);
while(true){
if((i__20214_20232 < count__20213_20231)){
var vec__20215_20233 = chunk__20212_20230.cljs$core$IIndexed$_nth$arity$2(null,i__20214_20232);
var i_20234 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20215_20233,(0),null);
var param_20235 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20215_20233,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(param_20235);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = cljs.core.first("], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglist,");"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglist," = cljs.core.next(",arglist,");"], 0));

var G__20236 = seq__20211_20229;
var G__20237 = chunk__20212_20230;
var G__20238 = count__20213_20231;
var G__20239 = (i__20214_20232 + (1));
seq__20211_20229 = G__20236;
chunk__20212_20230 = G__20237;
count__20213_20231 = G__20238;
i__20214_20232 = G__20239;
continue;
} else {
var temp__6753__auto___20240 = cljs.core.seq(seq__20211_20229);
if(temp__6753__auto___20240){
var seq__20211_20241__$1 = temp__6753__auto___20240;
if(cljs.core.chunked_seq_QMARK_(seq__20211_20241__$1)){
var c__8429__auto___20242 = cljs.core.chunk_first(seq__20211_20241__$1);
var G__20243 = cljs.core.chunk_rest(seq__20211_20241__$1);
var G__20244 = c__8429__auto___20242;
var G__20245 = cljs.core.count(c__8429__auto___20242);
var G__20246 = (0);
seq__20211_20229 = G__20243;
chunk__20212_20230 = G__20244;
count__20213_20231 = G__20245;
i__20214_20232 = G__20246;
continue;
} else {
var vec__20218_20247 = cljs.core.first(seq__20211_20241__$1);
var i_20248 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20218_20247,(0),null);
var param_20249 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20218_20247,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(param_20249);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = cljs.core.first("], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglist,");"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglist," = cljs.core.next(",arglist,");"], 0));

var G__20250 = cljs.core.next(seq__20211_20241__$1);
var G__20251 = null;
var G__20252 = (0);
var G__20253 = (0);
seq__20211_20229 = G__20250;
chunk__20212_20230 = G__20251;
count__20213_20231 = G__20252;
i__20214_20232 = G__20253;
continue;
}
} else {
}
}
break;
}

if(((1) < cljs.core.count(params))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(cljs.core.last(cljs.core.butlast(params)));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = cljs.core.first(",arglist,");"], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(cljs.core.last(params));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = cljs.core.rest(",arglist,");"], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",delegate_name,"("], 0));

var seq__20221_20254 = cljs.core.seq(params);
var chunk__20222_20255 = null;
var count__20223_20256 = (0);
var i__20224_20257 = (0);
while(true){
if((i__20224_20257 < count__20223_20256)){
var param_20258 = chunk__20222_20255.cljs$core$IIndexed$_nth$arity$2(null,i__20224_20257);
cljs.compiler.emit(param_20258);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_20258,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20259 = seq__20221_20254;
var G__20260 = chunk__20222_20255;
var G__20261 = count__20223_20256;
var G__20262 = (i__20224_20257 + (1));
seq__20221_20254 = G__20259;
chunk__20222_20255 = G__20260;
count__20223_20256 = G__20261;
i__20224_20257 = G__20262;
continue;
} else {
var temp__6753__auto___20263 = cljs.core.seq(seq__20221_20254);
if(temp__6753__auto___20263){
var seq__20221_20264__$1 = temp__6753__auto___20263;
if(cljs.core.chunked_seq_QMARK_(seq__20221_20264__$1)){
var c__8429__auto___20265 = cljs.core.chunk_first(seq__20221_20264__$1);
var G__20266 = cljs.core.chunk_rest(seq__20221_20264__$1);
var G__20267 = c__8429__auto___20265;
var G__20268 = cljs.core.count(c__8429__auto___20265);
var G__20269 = (0);
seq__20221_20254 = G__20266;
chunk__20222_20255 = G__20267;
count__20223_20256 = G__20268;
i__20224_20257 = G__20269;
continue;
} else {
var param_20270 = cljs.core.first(seq__20221_20264__$1);
cljs.compiler.emit(param_20270);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_20270,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20271 = cljs.core.next(seq__20221_20264__$1);
var G__20272 = null;
var G__20273 = (0);
var G__20274 = (0);
seq__20221_20254 = G__20271;
chunk__20222_20255 = G__20272;
count__20223_20256 = G__20273;
i__20224_20257 = G__20274;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([");"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(cljs.core.last(params));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = cljs.core.seq(",arglist,");"], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",delegate_name,"("], 0));

var seq__20225_20275 = cljs.core.seq(params);
var chunk__20226_20276 = null;
var count__20227_20277 = (0);
var i__20228_20278 = (0);
while(true){
if((i__20228_20278 < count__20227_20277)){
var param_20279 = chunk__20226_20276.cljs$core$IIndexed$_nth$arity$2(null,i__20228_20278);
cljs.compiler.emit(param_20279);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_20279,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20280 = seq__20225_20275;
var G__20281 = chunk__20226_20276;
var G__20282 = count__20227_20277;
var G__20283 = (i__20228_20278 + (1));
seq__20225_20275 = G__20280;
chunk__20226_20276 = G__20281;
count__20227_20277 = G__20282;
i__20228_20278 = G__20283;
continue;
} else {
var temp__6753__auto___20284 = cljs.core.seq(seq__20225_20275);
if(temp__6753__auto___20284){
var seq__20225_20285__$1 = temp__6753__auto___20284;
if(cljs.core.chunked_seq_QMARK_(seq__20225_20285__$1)){
var c__8429__auto___20286 = cljs.core.chunk_first(seq__20225_20285__$1);
var G__20287 = cljs.core.chunk_rest(seq__20225_20285__$1);
var G__20288 = c__8429__auto___20286;
var G__20289 = cljs.core.count(c__8429__auto___20286);
var G__20290 = (0);
seq__20225_20275 = G__20287;
chunk__20226_20276 = G__20288;
count__20227_20277 = G__20289;
i__20228_20278 = G__20290;
continue;
} else {
var param_20291 = cljs.core.first(seq__20225_20285__$1);
cljs.compiler.emit(param_20291);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_20291,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20292 = cljs.core.next(seq__20225_20285__$1);
var G__20293 = null;
var G__20294 = (0);
var G__20295 = (0);
seq__20225_20275 = G__20292;
chunk__20226_20276 = G__20293;
count__20227_20277 = G__20294;
i__20228_20278 = G__20295;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([");"], 0));
}

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})"], 0));
});
cljs.compiler.emit_fn_params = (function cljs$compiler$emit_fn_params(params){
var seq__20300 = cljs.core.seq(params);
var chunk__20301 = null;
var count__20302 = (0);
var i__20303 = (0);
while(true){
if((i__20303 < count__20302)){
var param = chunk__20301.cljs$core$IIndexed$_nth$arity$2(null,i__20303);
cljs.compiler.emit(param);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20304 = seq__20300;
var G__20305 = chunk__20301;
var G__20306 = count__20302;
var G__20307 = (i__20303 + (1));
seq__20300 = G__20304;
chunk__20301 = G__20305;
count__20302 = G__20306;
i__20303 = G__20307;
continue;
} else {
var temp__6753__auto__ = cljs.core.seq(seq__20300);
if(temp__6753__auto__){
var seq__20300__$1 = temp__6753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20300__$1)){
var c__8429__auto__ = cljs.core.chunk_first(seq__20300__$1);
var G__20308 = cljs.core.chunk_rest(seq__20300__$1);
var G__20309 = c__8429__auto__;
var G__20310 = cljs.core.count(c__8429__auto__);
var G__20311 = (0);
seq__20300 = G__20308;
chunk__20301 = G__20309;
count__20302 = G__20310;
i__20303 = G__20311;
continue;
} else {
var param = cljs.core.first(seq__20300__$1);
cljs.compiler.emit(param);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20312 = cljs.core.next(seq__20300__$1);
var G__20313 = null;
var G__20314 = (0);
var G__20315 = (0);
seq__20300 = G__20312;
chunk__20301 = G__20313;
count__20302 = G__20314;
i__20303 = G__20315;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_fn_method = (function cljs$compiler$emit_fn_method(p__20316){
var map__20319 = p__20316;
var map__20319__$1 = ((((!((map__20319 == null)))?((((map__20319.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20319.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20319):map__20319);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20319__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20319__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20319__$1,new cljs.core.Keyword(null,"variadic","variadic",882626057));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20319__$1,new cljs.core.Keyword(null,"params","params",710516235));
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20319__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20319__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20319__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20319__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var env__19395__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),"("], 0));

cljs.compiler.emit_fn_params(params);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["){"], 0));

if(cljs.core.truth_(type)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var self__ = this;"], 0));
} else {
}

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["while(true){"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([expr], 0));

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["break;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
});
/**
 * Emit code that copies function arguments into an array starting at an index.
 *   Returns name of var holding the array.
 */
cljs.compiler.emit_arguments_to_array = (function cljs$compiler$emit_arguments_to_array(startslice){
if(((startslice >= (0))) && (cljs.core.integer_QMARK_(startslice))){
} else {
throw (new Error("Assert failed: (and (>= startslice 0) (integer? startslice))"));
}

var mname = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
var i = [cljs.core.str(mname),cljs.core.str("__i")].join('');
var a = [cljs.core.str(mname),cljs.core.str("__a")].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",i," = 0, ",a," = new Array(arguments.length -  ",startslice,");"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["while (",i," < ",a,".length) {",a,"[",i,"] = arguments[",i," + ",startslice,"]; ++",i,";}"], 0));

return a;
});
cljs.compiler.emit_variadic_fn_method = (function cljs$compiler$emit_variadic_fn_method(p__20321){
var map__20332 = p__20321;
var map__20332__$1 = ((((!((map__20332 == null)))?((((map__20332.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20332.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20332):map__20332);
var f = map__20332__$1;
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20332__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20332__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20332__$1,new cljs.core.Keyword(null,"variadic","variadic",882626057));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20332__$1,new cljs.core.Keyword(null,"params","params",710516235));
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20332__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20332__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20332__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20332__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var env__19395__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

var name_20342__$1 = (function (){var or__7523__auto__ = name;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
}
})();
var mname_20343 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name_20342__$1);
var delegate_name_20344 = [cljs.core.str(mname_20343),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function() { "], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",delegate_name_20344," = function ("], 0));

var seq__20334_20345 = cljs.core.seq(params);
var chunk__20335_20346 = null;
var count__20336_20347 = (0);
var i__20337_20348 = (0);
while(true){
if((i__20337_20348 < count__20336_20347)){
var param_20349 = chunk__20335_20346.cljs$core$IIndexed$_nth$arity$2(null,i__20337_20348);
cljs.compiler.emit(param_20349);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_20349,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20350 = seq__20334_20345;
var G__20351 = chunk__20335_20346;
var G__20352 = count__20336_20347;
var G__20353 = (i__20337_20348 + (1));
seq__20334_20345 = G__20350;
chunk__20335_20346 = G__20351;
count__20336_20347 = G__20352;
i__20337_20348 = G__20353;
continue;
} else {
var temp__6753__auto___20354 = cljs.core.seq(seq__20334_20345);
if(temp__6753__auto___20354){
var seq__20334_20355__$1 = temp__6753__auto___20354;
if(cljs.core.chunked_seq_QMARK_(seq__20334_20355__$1)){
var c__8429__auto___20356 = cljs.core.chunk_first(seq__20334_20355__$1);
var G__20357 = cljs.core.chunk_rest(seq__20334_20355__$1);
var G__20358 = c__8429__auto___20356;
var G__20359 = cljs.core.count(c__8429__auto___20356);
var G__20360 = (0);
seq__20334_20345 = G__20357;
chunk__20335_20346 = G__20358;
count__20336_20347 = G__20359;
i__20337_20348 = G__20360;
continue;
} else {
var param_20361 = cljs.core.first(seq__20334_20355__$1);
cljs.compiler.emit(param_20361);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_20361,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20362 = cljs.core.next(seq__20334_20355__$1);
var G__20363 = null;
var G__20364 = (0);
var G__20365 = (0);
seq__20334_20345 = G__20362;
chunk__20335_20346 = G__20363;
count__20336_20347 = G__20364;
i__20337_20348 = G__20365;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["){"], 0));

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["while(true){"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([expr], 0));

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["break;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["};"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",mname_20343," = function (",cljs.compiler.comma_sep((cljs.core.truth_(variadic)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.butlast(params),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):params)),"){"], 0));

if(cljs.core.truth_(type)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var self__ = this;"], 0));
} else {
}

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(cljs.core.last(params));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = null;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if (arguments.length > ",(cljs.core.count(params) - (1)),") {"], 0));

var a_20366 = cljs.compiler.emit_arguments_to_array((cljs.core.count(params) - (1)));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",cljs.core.last(params)," = new cljs.core.IndexedSeq(",a_20366,",0);"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["} "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",delegate_name_20344,".call(this,"], 0));

var seq__20338_20367 = cljs.core.seq(params);
var chunk__20339_20368 = null;
var count__20340_20369 = (0);
var i__20341_20370 = (0);
while(true){
if((i__20341_20370 < count__20340_20369)){
var param_20371 = chunk__20339_20368.cljs$core$IIndexed$_nth$arity$2(null,i__20341_20370);
cljs.compiler.emit(param_20371);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_20371,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20372 = seq__20338_20367;
var G__20373 = chunk__20339_20368;
var G__20374 = count__20340_20369;
var G__20375 = (i__20341_20370 + (1));
seq__20338_20367 = G__20372;
chunk__20339_20368 = G__20373;
count__20340_20369 = G__20374;
i__20341_20370 = G__20375;
continue;
} else {
var temp__6753__auto___20376 = cljs.core.seq(seq__20338_20367);
if(temp__6753__auto___20376){
var seq__20338_20377__$1 = temp__6753__auto___20376;
if(cljs.core.chunked_seq_QMARK_(seq__20338_20377__$1)){
var c__8429__auto___20378 = cljs.core.chunk_first(seq__20338_20377__$1);
var G__20379 = cljs.core.chunk_rest(seq__20338_20377__$1);
var G__20380 = c__8429__auto___20378;
var G__20381 = cljs.core.count(c__8429__auto___20378);
var G__20382 = (0);
seq__20338_20367 = G__20379;
chunk__20339_20368 = G__20380;
count__20340_20369 = G__20381;
i__20341_20370 = G__20382;
continue;
} else {
var param_20383 = cljs.core.first(seq__20338_20377__$1);
cljs.compiler.emit(param_20383);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_20383,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__20384 = cljs.core.next(seq__20338_20377__$1);
var G__20385 = null;
var G__20386 = (0);
var G__20387 = (0);
seq__20338_20367 = G__20384;
chunk__20339_20368 = G__20385;
count__20340_20369 = G__20386;
i__20341_20370 = G__20387;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([");"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["};"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20343,".cljs$lang$maxFixedArity = ",max_fixed_arity,";"], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20343,".cljs$lang$applyTo = "], 0));

cljs.compiler.emit_apply_to(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(f,new cljs.core.Keyword(null,"name","name",1843675177),name_20342__$1));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20343,".cljs$core$IFn$_invoke$arity$variadic = ",delegate_name_20344,";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",mname_20343,";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"fn","fn",-1175266204),(function (p__20391){
var map__20392 = p__20391;
var map__20392__$1 = ((((!((map__20392 == null)))?((((map__20392.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20392.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20392):map__20392);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20392__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20392__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var methods$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20392__$1,new cljs.core.Keyword(null,"methods","methods",453930866));
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20392__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20392__$1,new cljs.core.Keyword(null,"variadic","variadic",882626057));
var recur_frames = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20392__$1,new cljs.core.Keyword(null,"recur-frames","recur-frames",-307205196));
var loop_lets = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20392__$1,new cljs.core.Keyword(null,"loop-lets","loop-lets",2036794185));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var loop_locals = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"params","params",710516235),cljs.core.array_seq([cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (map__20392,map__20392__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__20388_SHARP_){
var and__7511__auto__ = p1__20388_SHARP_;
if(cljs.core.truth_(and__7511__auto__)){
var G__20394 = new cljs.core.Keyword(null,"flag","flag",1088647881).cljs$core$IFn$_invoke$arity$1(p1__20388_SHARP_);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__20394) : cljs.core.deref.call(null,G__20394));
} else {
return and__7511__auto__;
}
});})(map__20392,map__20392__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,recur_frames)], 0)),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"params","params",710516235),cljs.core.array_seq([loop_lets], 0)))));
if(loop_locals){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["((function (",cljs.compiler.comma_sep(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,loop_locals)),"){"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
}
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(methods$))){
if(cljs.core.truth_(variadic)){
cljs.compiler.emit_variadic_fn_method(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.first(methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
} else {
cljs.compiler.emit_fn_method(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.first(methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
}
} else {
var name_20428__$1 = (function (){var or__7523__auto__ = name;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
}
})();
var mname_20429 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name_20428__$1);
var maxparams_20430 = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max_key,cljs.core.count,cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"params","params",710516235),methods$));
var mmap_20431 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (name_20428__$1,mname_20429,maxparams_20430,loop_locals,map__20392,map__20392__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (method){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(mname_20429),cljs.core.str("__"),cljs.core.str(cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(method)))].join(''))),method], null);
});})(name_20428__$1,mname_20429,maxparams_20430,loop_locals,map__20392,map__20392__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,methods$));
var ms_20432 = cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(((function (name_20428__$1,mname_20429,maxparams_20430,mmap_20431,loop_locals,map__20392,map__20392__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__20389_SHARP_){
return cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(cljs.core.second(p1__20389_SHARP_)));
});})(name_20428__$1,mname_20429,maxparams_20430,mmap_20431,loop_locals,map__20392,map__20392__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,cljs.core.seq(mmap_20431));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function() {"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",mname_20429," = null;"], 0));

var seq__20395_20433 = cljs.core.seq(ms_20432);
var chunk__20396_20434 = null;
var count__20397_20435 = (0);
var i__20398_20436 = (0);
while(true){
if((i__20398_20436 < count__20397_20435)){
var vec__20399_20437 = chunk__20396_20434.cljs$core$IIndexed$_nth$arity$2(null,i__20398_20436);
var n_20438 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20399_20437,(0),null);
var meth_20439 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20399_20437,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",n_20438," = "], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_20439))){
cljs.compiler.emit_variadic_fn_method(meth_20439);
} else {
cljs.compiler.emit_fn_method(meth_20439);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));

var G__20440 = seq__20395_20433;
var G__20441 = chunk__20396_20434;
var G__20442 = count__20397_20435;
var G__20443 = (i__20398_20436 + (1));
seq__20395_20433 = G__20440;
chunk__20396_20434 = G__20441;
count__20397_20435 = G__20442;
i__20398_20436 = G__20443;
continue;
} else {
var temp__6753__auto___20444 = cljs.core.seq(seq__20395_20433);
if(temp__6753__auto___20444){
var seq__20395_20445__$1 = temp__6753__auto___20444;
if(cljs.core.chunked_seq_QMARK_(seq__20395_20445__$1)){
var c__8429__auto___20446 = cljs.core.chunk_first(seq__20395_20445__$1);
var G__20447 = cljs.core.chunk_rest(seq__20395_20445__$1);
var G__20448 = c__8429__auto___20446;
var G__20449 = cljs.core.count(c__8429__auto___20446);
var G__20450 = (0);
seq__20395_20433 = G__20447;
chunk__20396_20434 = G__20448;
count__20397_20435 = G__20449;
i__20398_20436 = G__20450;
continue;
} else {
var vec__20402_20451 = cljs.core.first(seq__20395_20445__$1);
var n_20452 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20402_20451,(0),null);
var meth_20453 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20402_20451,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",n_20452," = "], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_20453))){
cljs.compiler.emit_variadic_fn_method(meth_20453);
} else {
cljs.compiler.emit_fn_method(meth_20453);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));

var G__20454 = cljs.core.next(seq__20395_20445__$1);
var G__20455 = null;
var G__20456 = (0);
var G__20457 = (0);
seq__20395_20433 = G__20454;
chunk__20396_20434 = G__20455;
count__20397_20435 = G__20456;
i__20398_20436 = G__20457;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20429," = function(",cljs.compiler.comma_sep((cljs.core.truth_(variadic)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.butlast(maxparams_20430),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):maxparams_20430)),"){"], 0));

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(cljs.core.last(maxparams_20430));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = var_args;"], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["switch(arguments.length){"], 0));

var seq__20405_20458 = cljs.core.seq(ms_20432);
var chunk__20406_20459 = null;
var count__20407_20460 = (0);
var i__20408_20461 = (0);
while(true){
if((i__20408_20461 < count__20407_20460)){
var vec__20409_20462 = chunk__20406_20459.cljs$core$IIndexed$_nth$arity$2(null,i__20408_20461);
var n_20463 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20409_20462,(0),null);
var meth_20464 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20409_20462,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_20464))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["default:"], 0));

var restarg_20465 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",restarg_20465," = null;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if (arguments.length > ",max_fixed_arity,") {"], 0));

var a_20466 = cljs.compiler.emit_arguments_to_array(max_fixed_arity);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([restarg_20465," = new cljs.core.IndexedSeq(",a_20466,",0);"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",n_20463,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep(cljs.core.butlast(maxparams_20430)),(((cljs.core.count(maxparams_20430) > (1)))?", ":null),restarg_20465,");"], 0));
} else {
var pcnt_20467 = cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_20464));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",pcnt_20467,":"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",n_20463,".call(this",(((pcnt_20467 === (0)))?null:cljs.core._conj((function (){var x__8452__auto__ = cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(pcnt_20467,maxparams_20430));
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})(),",")),");"], 0));
}

var G__20468 = seq__20405_20458;
var G__20469 = chunk__20406_20459;
var G__20470 = count__20407_20460;
var G__20471 = (i__20408_20461 + (1));
seq__20405_20458 = G__20468;
chunk__20406_20459 = G__20469;
count__20407_20460 = G__20470;
i__20408_20461 = G__20471;
continue;
} else {
var temp__6753__auto___20472 = cljs.core.seq(seq__20405_20458);
if(temp__6753__auto___20472){
var seq__20405_20473__$1 = temp__6753__auto___20472;
if(cljs.core.chunked_seq_QMARK_(seq__20405_20473__$1)){
var c__8429__auto___20474 = cljs.core.chunk_first(seq__20405_20473__$1);
var G__20475 = cljs.core.chunk_rest(seq__20405_20473__$1);
var G__20476 = c__8429__auto___20474;
var G__20477 = cljs.core.count(c__8429__auto___20474);
var G__20478 = (0);
seq__20405_20458 = G__20475;
chunk__20406_20459 = G__20476;
count__20407_20460 = G__20477;
i__20408_20461 = G__20478;
continue;
} else {
var vec__20412_20481 = cljs.core.first(seq__20405_20473__$1);
var n_20482 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20412_20481,(0),null);
var meth_20483 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20412_20481,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_20483))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["default:"], 0));

var restarg_20486 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",restarg_20486," = null;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if (arguments.length > ",max_fixed_arity,") {"], 0));

var a_20489 = cljs.compiler.emit_arguments_to_array(max_fixed_arity);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([restarg_20486," = new cljs.core.IndexedSeq(",a_20489,",0);"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",n_20482,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep(cljs.core.butlast(maxparams_20430)),(((cljs.core.count(maxparams_20430) > (1)))?", ":null),restarg_20486,");"], 0));
} else {
var pcnt_20490 = cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_20483));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",pcnt_20490,":"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",n_20482,".call(this",(((pcnt_20490 === (0)))?null:cljs.core._conj((function (){var x__8452__auto__ = cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(pcnt_20490,maxparams_20430));
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})(),",")),");"], 0));
}

var G__20495 = cljs.core.next(seq__20405_20473__$1);
var G__20496 = null;
var G__20497 = (0);
var G__20498 = (0);
seq__20405_20458 = G__20495;
chunk__20406_20459 = G__20496;
count__20407_20460 = G__20497;
i__20408_20461 = G__20498;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["throw(new Error('Invalid arity: ' + arguments.length));"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["};"], 0));

if(cljs.core.truth_(variadic)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20429,".cljs$lang$maxFixedArity = ",max_fixed_arity,";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20429,".cljs$lang$applyTo = ",cljs.core.some(((function (name_20428__$1,mname_20429,maxparams_20430,mmap_20431,ms_20432,loop_locals,map__20392,map__20392__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__20390_SHARP_){
var vec__20415 = p1__20390_SHARP_;
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20415,(0),null);
var m = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20415,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(m))){
return n;
} else {
return null;
}
});})(name_20428__$1,mname_20429,maxparams_20430,mmap_20431,ms_20432,loop_locals,map__20392,map__20392__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,ms_20432),".cljs$lang$applyTo;"], 0));
} else {
}

var seq__20418_20504 = cljs.core.seq(ms_20432);
var chunk__20419_20505 = null;
var count__20420_20506 = (0);
var i__20421_20507 = (0);
while(true){
if((i__20421_20507 < count__20420_20506)){
var vec__20422_20508 = chunk__20419_20505.cljs$core$IIndexed$_nth$arity$2(null,i__20421_20507);
var n_20509 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20422_20508,(0),null);
var meth_20510 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20422_20508,(1),null);
var c_20512 = cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_20510));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_20510))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20429,".cljs$core$IFn$_invoke$arity$variadic = ",n_20509,".cljs$core$IFn$_invoke$arity$variadic;"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20429,".cljs$core$IFn$_invoke$arity$",c_20512," = ",n_20509,";"], 0));
}

var G__20514 = seq__20418_20504;
var G__20515 = chunk__20419_20505;
var G__20516 = count__20420_20506;
var G__20517 = (i__20421_20507 + (1));
seq__20418_20504 = G__20514;
chunk__20419_20505 = G__20515;
count__20420_20506 = G__20516;
i__20421_20507 = G__20517;
continue;
} else {
var temp__6753__auto___20518 = cljs.core.seq(seq__20418_20504);
if(temp__6753__auto___20518){
var seq__20418_20519__$1 = temp__6753__auto___20518;
if(cljs.core.chunked_seq_QMARK_(seq__20418_20519__$1)){
var c__8429__auto___20521 = cljs.core.chunk_first(seq__20418_20519__$1);
var G__20522 = cljs.core.chunk_rest(seq__20418_20519__$1);
var G__20523 = c__8429__auto___20521;
var G__20524 = cljs.core.count(c__8429__auto___20521);
var G__20525 = (0);
seq__20418_20504 = G__20522;
chunk__20419_20505 = G__20523;
count__20420_20506 = G__20524;
i__20421_20507 = G__20525;
continue;
} else {
var vec__20425_20528 = cljs.core.first(seq__20418_20519__$1);
var n_20529 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20425_20528,(0),null);
var meth_20530 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20425_20528,(1),null);
var c_20534 = cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_20530));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_20530))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20429,".cljs$core$IFn$_invoke$arity$variadic = ",n_20529,".cljs$core$IFn$_invoke$arity$variadic;"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_20429,".cljs$core$IFn$_invoke$arity$",c_20534," = ",n_20529,";"], 0));
}

var G__20536 = cljs.core.next(seq__20418_20519__$1);
var G__20537 = null;
var G__20538 = (0);
var G__20539 = (0);
seq__20418_20504 = G__20536;
chunk__20419_20505 = G__20537;
count__20420_20506 = G__20538;
i__20421_20507 = G__20539;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",mname_20429,";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));
}

if(loop_locals){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";})(",cljs.compiler.comma_sep(loop_locals),"))"], 0));
} else {
return null;
}
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"do","do",46310725),(function (p__20543){
var map__20544 = p__20543;
var map__20544__$1 = ((((!((map__20544 == null)))?((((map__20544.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20544.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20544):map__20544);
var statements = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20544__$1,new cljs.core.Keyword(null,"statements","statements",600349855));
var ret = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20544__$1,new cljs.core.Keyword(null,"ret","ret",-468222814));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20544__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_((function (){var and__7511__auto__ = statements;
if(cljs.core.truth_(and__7511__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context);
} else {
return and__7511__auto__;
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (){"], 0));
} else {
}

var seq__20547_20561 = cljs.core.seq(statements);
var chunk__20548_20562 = null;
var count__20549_20563 = (0);
var i__20550_20564 = (0);
while(true){
if((i__20550_20564 < count__20549_20563)){
var s_20566 = chunk__20548_20562.cljs$core$IIndexed$_nth$arity$2(null,i__20550_20564);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([s_20566], 0));

var G__20567 = seq__20547_20561;
var G__20568 = chunk__20548_20562;
var G__20569 = count__20549_20563;
var G__20570 = (i__20550_20564 + (1));
seq__20547_20561 = G__20567;
chunk__20548_20562 = G__20568;
count__20549_20563 = G__20569;
i__20550_20564 = G__20570;
continue;
} else {
var temp__6753__auto___20573 = cljs.core.seq(seq__20547_20561);
if(temp__6753__auto___20573){
var seq__20547_20574__$1 = temp__6753__auto___20573;
if(cljs.core.chunked_seq_QMARK_(seq__20547_20574__$1)){
var c__8429__auto___20575 = cljs.core.chunk_first(seq__20547_20574__$1);
var G__20576 = cljs.core.chunk_rest(seq__20547_20574__$1);
var G__20577 = c__8429__auto___20575;
var G__20578 = cljs.core.count(c__8429__auto___20575);
var G__20579 = (0);
seq__20547_20561 = G__20576;
chunk__20548_20562 = G__20577;
count__20549_20563 = G__20578;
i__20550_20564 = G__20579;
continue;
} else {
var s_20581 = cljs.core.first(seq__20547_20574__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([s_20581], 0));

var G__20583 = cljs.core.next(seq__20547_20574__$1);
var G__20584 = null;
var G__20585 = (0);
var G__20586 = (0);
seq__20547_20561 = G__20583;
chunk__20548_20562 = G__20584;
count__20549_20563 = G__20585;
i__20550_20564 = G__20586;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emit(ret);

if(cljs.core.truth_((function (){var and__7511__auto__ = statements;
if(cljs.core.truth_(and__7511__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context);
} else {
return and__7511__auto__;
}
})())){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));
} else {
return null;
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"try","try",1380742522),(function (p__20591){
var map__20592 = p__20591;
var map__20592__$1 = ((((!((map__20592 == null)))?((((map__20592.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20592.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20592):map__20592);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20592__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var try$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20592__$1,new cljs.core.Keyword(null,"try","try",1380742522));
var catch$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20592__$1,new cljs.core.Keyword(null,"catch","catch",1038065524));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20592__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var finally$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20592__$1,new cljs.core.Keyword(null,"finally","finally",1589088705));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_((function (){var or__7523__auto__ = name;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return finally$;
}
})())){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (){"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["try{",try$,"}"], 0));

if(cljs.core.truth_(name)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["catch (",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),"){",catch$,"}"], 0));
} else {
}

if(cljs.core.truth_(finally$)){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"constant","constant",-379609303),new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(finally$))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("finally block cannot contain constant"),cljs.core.str("\n"),cljs.core.str("(not= :constant (:op finally))")].join('')));
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["finally {",finally$,"}"], 0));
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));
} else {
return null;
}
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([try$], 0));
}
}));
cljs.compiler.emit_let = (function cljs$compiler$emit_let(p__20604,is_loop){
var map__20627 = p__20604;
var map__20627__$1 = ((((!((map__20627 == null)))?((((map__20627.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20627.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20627):map__20627);
var bindings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20627__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20627__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20627__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (){"], 0));
} else {
}

var _STAR_lexical_renames_STAR_20631_20656 = cljs.compiler._STAR_lexical_renames_STAR_;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"statement","statement",-32780863),context))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (_STAR_lexical_renames_STAR_20631_20656,context,map__20627,map__20627__$1,bindings,expr,env){
return (function (binding){
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(binding);
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.compiler.hash_scope(binding),cljs.core.gensym.cljs$core$IFn$_invoke$arity$1([cljs.core.str(name),cljs.core.str("-")].join(''))],null));
});})(_STAR_lexical_renames_STAR_20631_20656,context,map__20627,map__20627__$1,bindings,expr,env))
,bindings):null));

try{var seq__20633_20664 = cljs.core.seq(bindings);
var chunk__20634_20665 = null;
var count__20635_20666 = (0);
var i__20636_20667 = (0);
while(true){
if((i__20636_20667 < count__20635_20666)){
var map__20637_20670 = chunk__20634_20665.cljs$core$IIndexed$_nth$arity$2(null,i__20636_20667);
var map__20637_20671__$1 = ((((!((map__20637_20670 == null)))?((((map__20637_20670.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20637_20670.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20637_20670):map__20637_20670);
var binding_20672 = map__20637_20671__$1;
var init_20673 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20637_20671__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(binding_20672);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = ",init_20673,";"], 0));

var G__20677 = seq__20633_20664;
var G__20678 = chunk__20634_20665;
var G__20679 = count__20635_20666;
var G__20680 = (i__20636_20667 + (1));
seq__20633_20664 = G__20677;
chunk__20634_20665 = G__20678;
count__20635_20666 = G__20679;
i__20636_20667 = G__20680;
continue;
} else {
var temp__6753__auto___20681 = cljs.core.seq(seq__20633_20664);
if(temp__6753__auto___20681){
var seq__20633_20682__$1 = temp__6753__auto___20681;
if(cljs.core.chunked_seq_QMARK_(seq__20633_20682__$1)){
var c__8429__auto___20683 = cljs.core.chunk_first(seq__20633_20682__$1);
var G__20684 = cljs.core.chunk_rest(seq__20633_20682__$1);
var G__20685 = c__8429__auto___20683;
var G__20686 = cljs.core.count(c__8429__auto___20683);
var G__20687 = (0);
seq__20633_20664 = G__20684;
chunk__20634_20665 = G__20685;
count__20635_20666 = G__20686;
i__20636_20667 = G__20687;
continue;
} else {
var map__20643_20689 = cljs.core.first(seq__20633_20682__$1);
var map__20643_20690__$1 = ((((!((map__20643_20689 == null)))?((((map__20643_20689.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20643_20689.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20643_20689):map__20643_20689);
var binding_20691 = map__20643_20690__$1;
var init_20692 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20643_20690__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(binding_20691);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = ",init_20692,";"], 0));

var G__20696 = cljs.core.next(seq__20633_20682__$1);
var G__20697 = null;
var G__20698 = (0);
var G__20699 = (0);
seq__20633_20664 = G__20696;
chunk__20634_20665 = G__20697;
count__20635_20666 = G__20698;
i__20636_20667 = G__20699;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["while(true){"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([expr], 0));

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["break;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));
} else {
}
}finally {cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR_20631_20656;
}
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));
} else {
return null;
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"let","let",-1282412701),(function (ast){
return cljs.compiler.emit_let(ast,false);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"loop","loop",-395552849),(function (ast){
return cljs.compiler.emit_let(ast,true);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"recur","recur",-437573268),(function (p__20706){
var map__20707 = p__20706;
var map__20707__$1 = ((((!((map__20707 == null)))?((((map__20707.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20707.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20707):map__20707);
var frame = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20707__$1,new cljs.core.Keyword(null,"frame","frame",-1711082588));
var exprs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20707__$1,new cljs.core.Keyword(null,"exprs","exprs",1795829094));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20707__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var temps = cljs.core.vec(cljs.core.take.cljs$core$IFn$_invoke$arity$2(cljs.core.count(exprs),cljs.core.repeatedly.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym)));
var params = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(frame);
var n__8539__auto___20743 = cljs.core.count(exprs);
var i_20744 = (0);
while(true){
if((i_20744 < n__8539__auto___20743)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",(temps.cljs$core$IFn$_invoke$arity$1 ? temps.cljs$core$IFn$_invoke$arity$1(i_20744) : temps.call(null,i_20744))," = ",(exprs.cljs$core$IFn$_invoke$arity$1 ? exprs.cljs$core$IFn$_invoke$arity$1(i_20744) : exprs.call(null,i_20744)),";"], 0));

var G__20745 = (i_20744 + (1));
i_20744 = G__20745;
continue;
} else {
}
break;
}

var n__8539__auto___20748 = cljs.core.count(exprs);
var i_20749 = (0);
while(true){
if((i_20749 < n__8539__auto___20748)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((params.cljs$core$IFn$_invoke$arity$1 ? params.cljs$core$IFn$_invoke$arity$1(i_20749) : params.call(null,i_20749)))," = ",(temps.cljs$core$IFn$_invoke$arity$1 ? temps.cljs$core$IFn$_invoke$arity$1(i_20749) : temps.call(null,i_20749)),";"], 0));

var G__20752 = (i_20749 + (1));
i_20749 = G__20752;
continue;
} else {
}
break;
}

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["continue;"], 0));
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"letfn","letfn",-2121022354),(function (p__20758){
var map__20759 = p__20758;
var map__20759__$1 = ((((!((map__20759 == null)))?((((map__20759.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20759.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20759):map__20759);
var bindings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20759__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20759__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20759__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (){"], 0));
} else {
}

var seq__20762_20780 = cljs.core.seq(bindings);
var chunk__20763_20781 = null;
var count__20764_20782 = (0);
var i__20765_20783 = (0);
while(true){
if((i__20765_20783 < count__20764_20782)){
var map__20767_20788 = chunk__20763_20781.cljs$core$IIndexed$_nth$arity$2(null,i__20765_20783);
var map__20767_20789__$1 = ((((!((map__20767_20788 == null)))?((((map__20767_20788.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20767_20788.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20767_20788):map__20767_20788);
var binding_20790 = map__20767_20789__$1;
var init_20791 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20767_20789__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(binding_20790)," = ",init_20791,";"], 0));

var G__20797 = seq__20762_20780;
var G__20798 = chunk__20763_20781;
var G__20799 = count__20764_20782;
var G__20800 = (i__20765_20783 + (1));
seq__20762_20780 = G__20797;
chunk__20763_20781 = G__20798;
count__20764_20782 = G__20799;
i__20765_20783 = G__20800;
continue;
} else {
var temp__6753__auto___20801 = cljs.core.seq(seq__20762_20780);
if(temp__6753__auto___20801){
var seq__20762_20802__$1 = temp__6753__auto___20801;
if(cljs.core.chunked_seq_QMARK_(seq__20762_20802__$1)){
var c__8429__auto___20805 = cljs.core.chunk_first(seq__20762_20802__$1);
var G__20806 = cljs.core.chunk_rest(seq__20762_20802__$1);
var G__20807 = c__8429__auto___20805;
var G__20808 = cljs.core.count(c__8429__auto___20805);
var G__20809 = (0);
seq__20762_20780 = G__20806;
chunk__20763_20781 = G__20807;
count__20764_20782 = G__20808;
i__20765_20783 = G__20809;
continue;
} else {
var map__20771_20812 = cljs.core.first(seq__20762_20802__$1);
var map__20771_20813__$1 = ((((!((map__20771_20812 == null)))?((((map__20771_20812.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20771_20812.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20771_20812):map__20771_20812);
var binding_20814 = map__20771_20813__$1;
var init_20815 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20771_20813__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(binding_20814)," = ",init_20815,";"], 0));

var G__20818 = cljs.core.next(seq__20762_20802__$1);
var G__20819 = null;
var G__20820 = (0);
var G__20821 = (0);
seq__20762_20780 = G__20818;
chunk__20763_20781 = G__20819;
count__20764_20782 = G__20820;
i__20765_20783 = G__20821;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([expr], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));
} else {
return null;
}
}));
cljs.compiler.protocol_prefix = (function cljs$compiler$protocol_prefix(psym){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str([cljs.core.str(psym)].join('').replace((new RegExp("\\.","g")),"$").replace("/","$")),cljs.core.str("$")].join(''));
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"invoke","invoke",1145927159),(function (p__20829){
var map__20830 = p__20829;
var map__20830__$1 = ((((!((map__20830 == null)))?((((map__20830.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20830.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20830):map__20830);
var expr = map__20830__$1;
var f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20830__$1,new cljs.core.Keyword(null,"f","f",-1597136552));
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20830__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20830__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(f);
var fn_QMARK_ = (function (){var and__7511__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__7511__auto__)){
var and__7511__auto____$1 = cljs.core.not(new cljs.core.Keyword(null,"dynamic","dynamic",704819571).cljs$core$IFn$_invoke$arity$1(info));
if(and__7511__auto____$1){
return new cljs.core.Keyword(null,"fn-var","fn-var",1086204730).cljs$core$IFn$_invoke$arity$1(info);
} else {
return and__7511__auto____$1;
}
} else {
return and__7511__auto__;
}
})();
var protocol = new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(info);
var tag = cljs.analyzer.infer_tag(env,cljs.core.first(new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr)));
var proto_QMARK_ = (function (){var and__7511__auto__ = protocol;
if(cljs.core.truth_(and__7511__auto__)){
var and__7511__auto____$1 = tag;
if(cljs.core.truth_(and__7511__auto____$1)){
var or__7523__auto__ = (function (){var and__7511__auto____$2 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__7511__auto____$2)){
var and__7511__auto____$3 = protocol;
if(cljs.core.truth_(and__7511__auto____$3)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(tag,new cljs.core.Symbol(null,"not-native","not-native",-236392494,null));
} else {
return and__7511__auto____$3;
}
} else {
return and__7511__auto____$2;
}
})();
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
var and__7511__auto____$2 = (function (){var or__7523__auto____$1 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(or__7523__auto____$1)){
return or__7523__auto____$1;
} else {
return new cljs.core.Keyword(null,"protocol-inline","protocol-inline",1550487556).cljs$core$IFn$_invoke$arity$1(env);
}
})();
if(cljs.core.truth_(and__7511__auto____$2)){
var or__7523__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(protocol,tag);
if(or__7523__auto____$1){
return or__7523__auto____$1;
} else {
var and__7511__auto____$3 = !(cljs.core.set_QMARK_(tag));
if(and__7511__auto____$3){
var and__7511__auto____$4 = cljs.core.not(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 10, [new cljs.core.Symbol(null,"clj","clj",980036099,null),null,new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),null,new cljs.core.Symbol(null,"object","object",-1179821820,null),null,new cljs.core.Symbol(null,"any","any",-948528346,null),null,new cljs.core.Symbol(null,"number","number",-1084057331,null),null,new cljs.core.Symbol(null,"clj-or-nil","clj-or-nil",-2008798668,null),null,new cljs.core.Symbol(null,"array","array",-440182315,null),null,new cljs.core.Symbol(null,"string","string",-349010059,null),null,new cljs.core.Symbol(null,"function","function",-486723946,null),null,new cljs.core.Symbol(null,"clj-nil","clj-nil",1321798654,null),null], null), null).call(null,tag));
if(and__7511__auto____$4){
var temp__6753__auto__ = new cljs.core.Keyword(null,"protocols","protocols",-5615896).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_existing_var(env,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(tag))));
if(cljs.core.truth_(temp__6753__auto__)){
var ps = temp__6753__auto__;
return (ps.cljs$core$IFn$_invoke$arity$1 ? ps.cljs$core$IFn$_invoke$arity$1(protocol) : ps.call(null,protocol));
} else {
return null;
}
} else {
return and__7511__auto____$4;
}
} else {
return and__7511__auto____$3;
}
}
} else {
return and__7511__auto____$2;
}
}
} else {
return and__7511__auto____$1;
}
} else {
return and__7511__auto__;
}
})();
var opt_not_QMARK_ = (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Symbol("cljs.core","not","cljs.core/not",100665144,null))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.infer_tag(env,cljs.core.first(new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr))),new cljs.core.Symbol(null,"boolean","boolean",-278886877,null)));
var ns = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(info);
var js_QMARK_ = (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,new cljs.core.Symbol(null,"js","js",-886355190,null))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,new cljs.core.Symbol(null,"Math","Math",2033287572,null)));
var goog_QMARK_ = (cljs.core.truth_(ns)?(function (){var or__7523__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,new cljs.core.Symbol(null,"goog","goog",-70603925,null));
if(or__7523__auto__){
return or__7523__auto__;
} else {
var temp__6753__auto__ = [cljs.core.str(ns)].join('');
if(cljs.core.truth_(temp__6753__auto__)){
var ns_str = temp__6753__auto__;
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(clojure.string.split.cljs$core$IFn$_invoke$arity$2(ns_str,/\./),(0),null),"goog");
} else {
return null;
}
}
})():null);
var keyword_QMARK_ = (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f),new cljs.core.Keyword(null,"constant","constant",-379609303))) && ((new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(f) instanceof cljs.core.Keyword));
var vec__20833 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count(args);
var variadic_QMARK_ = new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(info);
var mps = new cljs.core.Keyword(null,"method-params","method-params",-980792179).cljs$core$IFn$_invoke$arity$1(info);
var mfa = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(info);
if((cljs.core.not(variadic_QMARK_)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(mps),(1)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
} else {
if(cljs.core.truth_((function (){var and__7511__auto__ = variadic_QMARK_;
if(cljs.core.truth_(and__7511__auto__)){
return (arity > mfa);
} else {
return and__7511__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__20830,map__20830__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(info__$1)),cljs.core.str(".cljs$core$IFn$_invoke$arity$variadic")].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__20830,map__20830__$1,expr,f,args,env){
return (function (p1__20827_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__20827_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__20830,map__20830__$1,expr,f,args,env))
);
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__20830,map__20830__$1,expr,f,args,env))
),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543),mfa], null)], null);
} else {
var arities = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,mps);
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.fromArray([arity], true),arities))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__20830,map__20830__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(info__$1)),cljs.core.str(".cljs$core$IFn$_invoke$arity$"),cljs.core.str(arity)].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__20830,map__20830__$1,expr,f,args,env){
return (function (p1__20828_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__20828_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__20830,map__20830__$1,expr,f,args,env))
);
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__20830,map__20830__$1,expr,f,args,env))
),null], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
}

}
}
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null));
var f__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20833,(0),null);
var variadic_invoke = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20833,(1),null);
var env__19395__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(opt_not_QMARK_){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["!(",cljs.core.first(args),")"], 0));
} else {
if(cljs.core.truth_(proto_QMARK_)){
var pimpl_20868 = [cljs.core.str(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.compiler.protocol_prefix(protocol))),cljs.core.str(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.name(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info)))),cljs.core.str("$arity$"),cljs.core.str(cljs.core.count(args))].join('');
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.first(args),".",pimpl_20868,"(",cljs.compiler.comma_sep(cljs.core.cons("null",cljs.core.rest(args))),")"], 0));
} else {
if(keyword_QMARK_){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([f__$1,".cljs$core$IFn$_invoke$arity$",cljs.core.count(args),"(",cljs.compiler.comma_sep(args),")"], 0));
} else {
if(cljs.core.truth_(variadic_invoke)){
var mfa_20869 = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(variadic_invoke);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([f__$1,"(",cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(mfa_20869,args)),(((mfa_20869 === (0)))?null:","),"cljs.core.array_seq([",cljs.compiler.comma_sep(cljs.core.drop.cljs$core$IFn$_invoke$arity$2(mfa_20869,args)),"], 0))"], 0));
} else {
if(cljs.core.truth_((function (){var or__7523__auto__ = fn_QMARK_;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
var or__7523__auto____$1 = js_QMARK_;
if(or__7523__auto____$1){
return or__7523__auto____$1;
} else {
return goog_QMARK_;
}
}
})())){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([f__$1,"(",cljs.compiler.comma_sep(args),")"], 0));
} else {
if(cljs.core.truth_((function (){var and__7511__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__7511__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f__$1),new cljs.core.Keyword(null,"var","var",-769682797));
} else {
return and__7511__auto__;
}
})())){
var fprop_20878 = [cljs.core.str(".cljs$core$IFn$_invoke$arity$"),cljs.core.str(cljs.core.count(args))].join('');
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(",f__$1,fprop_20878," ? ",f__$1,fprop_20878,"(",cljs.compiler.comma_sep(args),") : ",f__$1,".call(",cljs.compiler.comma_sep(cljs.core.cons("null",args)),"))"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([f__$1,".call(",cljs.compiler.comma_sep(cljs.core.cons("null",args)),")"], 0));
}

}
}
}
}
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"new","new",-2085437848),(function (p__20879){
var map__20880 = p__20879;
var map__20880__$1 = ((((!((map__20880 == null)))?((((map__20880.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20880.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20880):map__20880);
var ctor = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20880__$1,new cljs.core.Keyword(null,"ctor","ctor",1750864802));
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20880__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20880__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__19395__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(new ",ctor,"(",cljs.compiler.comma_sep(args),"))"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"set!","set!",-1389817006),(function (p__20890){
var map__20891 = p__20890;
var map__20891__$1 = ((((!((map__20891 == null)))?((((map__20891.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20891.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20891):map__20891);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20891__$1,new cljs.core.Keyword(null,"target","target",253001721));
var val = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20891__$1,new cljs.core.Keyword(null,"val","val",128701612));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20891__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__19395__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([target," = ",val], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.load_libs = (function cljs$compiler$load_libs(libs,seen,reloads){
var loaded_libs = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null));
var loaded_libs_temp = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null)));
if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs)))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if(!COMPILED) ",loaded_libs_temp," = ",loaded_libs," || cljs.core.set();"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if(!COMPILED) ",loaded_libs," = cljs.core.set();"], 0));
} else {
}

var seq__20906_20912 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.vals(seen)),cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.vals(libs))));
var chunk__20907_20913 = null;
var count__20908_20914 = (0);
var i__20909_20915 = (0);
while(true){
if((i__20909_20915 < count__20908_20914)){
var lib_20916 = chunk__20907_20913.cljs$core$IIndexed$_nth$arity$2(null,i__20909_20915);
if(cljs.core.truth_((function (){var or__7523__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_20916),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_20916),"', 'reload');"], 0));
} else {
if(cljs.core.truth_((function (){var or__7523__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_20916),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_20916),"', 'reload-all');"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_20916),"');"], 0));

}
}

var G__20919 = seq__20906_20912;
var G__20920 = chunk__20907_20913;
var G__20921 = count__20908_20914;
var G__20922 = (i__20909_20915 + (1));
seq__20906_20912 = G__20919;
chunk__20907_20913 = G__20920;
count__20908_20914 = G__20921;
i__20909_20915 = G__20922;
continue;
} else {
var temp__6753__auto___20923 = cljs.core.seq(seq__20906_20912);
if(temp__6753__auto___20923){
var seq__20906_20924__$1 = temp__6753__auto___20923;
if(cljs.core.chunked_seq_QMARK_(seq__20906_20924__$1)){
var c__8429__auto___20925 = cljs.core.chunk_first(seq__20906_20924__$1);
var G__20926 = cljs.core.chunk_rest(seq__20906_20924__$1);
var G__20927 = c__8429__auto___20925;
var G__20928 = cljs.core.count(c__8429__auto___20925);
var G__20929 = (0);
seq__20906_20912 = G__20926;
chunk__20907_20913 = G__20927;
count__20908_20914 = G__20928;
i__20909_20915 = G__20929;
continue;
} else {
var lib_20930 = cljs.core.first(seq__20906_20924__$1);
if(cljs.core.truth_((function (){var or__7523__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_20930),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_20930),"', 'reload');"], 0));
} else {
if(cljs.core.truth_((function (){var or__7523__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_20930),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_20930),"', 'reload-all');"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_20930),"');"], 0));

}
}

var G__20935 = cljs.core.next(seq__20906_20924__$1);
var G__20936 = null;
var G__20937 = (0);
var G__20938 = (0);
seq__20906_20912 = G__20935;
chunk__20907_20913 = G__20936;
count__20908_20914 = G__20937;
i__20909_20915 = G__20938;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs)))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if(!COMPILED) ",loaded_libs," = cljs.core.into(",loaded_libs_temp,", ",loaded_libs,");"], 0));
} else {
return null;
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"ns*","ns*",200417856),(function (p__20941){
var map__20942 = p__20941;
var map__20942__$1 = ((((!((map__20942 == null)))?((((map__20942.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20942.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20942):map__20942);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20942__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20942__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var uses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20942__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var require_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20942__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var reloads = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20942__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20942__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
cljs.compiler.load_libs(requires,null,new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reloads));

return cljs.compiler.load_libs(uses,requires,new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reloads));
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"ns","ns",441598760),(function (p__20944){
var map__20945 = p__20944;
var map__20945__$1 = ((((!((map__20945 == null)))?((((map__20945.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20945.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20945):map__20945);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20945__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20945__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var uses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20945__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var require_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20945__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var reloads = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20945__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20945__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.provide('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),"');"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(name,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null))){
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('cljs.core');"], 0));
}

cljs.compiler.load_libs(requires,null,new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reloads));

return cljs.compiler.load_libs(uses,requires,new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reloads));
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"deftype*","deftype*",-677871637),(function (p__20950){
var map__20951 = p__20950;
var map__20951__$1 = ((((!((map__20951 == null)))?((((map__20951.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20951.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20951):map__20951);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20951__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20951__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20951__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20951__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20951__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,fields);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([""], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["/**"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["* @constructor"], 0));

var seq__20953_20976 = cljs.core.seq(protocols);
var chunk__20954_20977 = null;
var count__20955_20978 = (0);
var i__20956_20979 = (0);
while(true){
if((i__20956_20979 < count__20955_20978)){
var protocol_20980 = chunk__20954_20977.cljs$core$IIndexed$_nth$arity$2(null,i__20956_20979);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str(protocol_20980)].join('')),"}"], 0));

var G__20981 = seq__20953_20976;
var G__20982 = chunk__20954_20977;
var G__20983 = count__20955_20978;
var G__20984 = (i__20956_20979 + (1));
seq__20953_20976 = G__20981;
chunk__20954_20977 = G__20982;
count__20955_20978 = G__20983;
i__20956_20979 = G__20984;
continue;
} else {
var temp__6753__auto___20985 = cljs.core.seq(seq__20953_20976);
if(temp__6753__auto___20985){
var seq__20953_20986__$1 = temp__6753__auto___20985;
if(cljs.core.chunked_seq_QMARK_(seq__20953_20986__$1)){
var c__8429__auto___20987 = cljs.core.chunk_first(seq__20953_20986__$1);
var G__20988 = cljs.core.chunk_rest(seq__20953_20986__$1);
var G__20989 = c__8429__auto___20987;
var G__20990 = cljs.core.count(c__8429__auto___20987);
var G__20991 = (0);
seq__20953_20976 = G__20988;
chunk__20954_20977 = G__20989;
count__20955_20978 = G__20990;
i__20956_20979 = G__20991;
continue;
} else {
var protocol_20992 = cljs.core.first(seq__20953_20986__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str(protocol_20992)].join('')),"}"], 0));

var G__20993 = cljs.core.next(seq__20953_20986__$1);
var G__20994 = null;
var G__20995 = (0);
var G__20996 = (0);
seq__20953_20976 = G__20993;
chunk__20954_20977 = G__20994;
count__20955_20978 = G__20995;
i__20956_20979 = G__20996;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["*/"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(t)," = (function (",cljs.compiler.comma_sep(fields__$1),"){"], 0));

var seq__20959_20997 = cljs.core.seq(fields__$1);
var chunk__20960_20998 = null;
var count__20961_20999 = (0);
var i__20962_21000 = (0);
while(true){
if((i__20962_21000 < count__20961_20999)){
var fld_21001 = chunk__20960_20998.cljs$core$IIndexed$_nth$arity$2(null,i__20962_21000);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.",fld_21001," = ",fld_21001,";"], 0));

var G__21002 = seq__20959_20997;
var G__21003 = chunk__20960_20998;
var G__21004 = count__20961_20999;
var G__21005 = (i__20962_21000 + (1));
seq__20959_20997 = G__21002;
chunk__20960_20998 = G__21003;
count__20961_20999 = G__21004;
i__20962_21000 = G__21005;
continue;
} else {
var temp__6753__auto___21006 = cljs.core.seq(seq__20959_20997);
if(temp__6753__auto___21006){
var seq__20959_21007__$1 = temp__6753__auto___21006;
if(cljs.core.chunked_seq_QMARK_(seq__20959_21007__$1)){
var c__8429__auto___21008 = cljs.core.chunk_first(seq__20959_21007__$1);
var G__21010 = cljs.core.chunk_rest(seq__20959_21007__$1);
var G__21011 = c__8429__auto___21008;
var G__21012 = cljs.core.count(c__8429__auto___21008);
var G__21013 = (0);
seq__20959_20997 = G__21010;
chunk__20960_20998 = G__21011;
count__20961_20999 = G__21012;
i__20962_21000 = G__21013;
continue;
} else {
var fld_21015 = cljs.core.first(seq__20959_21007__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.",fld_21015," = ",fld_21015,";"], 0));

var G__21016 = cljs.core.next(seq__20959_21007__$1);
var G__21017 = null;
var G__21018 = (0);
var G__21019 = (0);
seq__20959_20997 = G__21016;
chunk__20960_20998 = G__21017;
count__20961_20999 = G__21018;
i__20962_21000 = G__21019;
continue;
}
} else {
}
}
break;
}

var seq__20963_21020 = cljs.core.seq(pmasks);
var chunk__20964_21021 = null;
var count__20965_21022 = (0);
var i__20966_21023 = (0);
while(true){
if((i__20966_21023 < count__20965_21022)){
var vec__20969_21024 = chunk__20964_21021.cljs$core$IIndexed$_nth$arity$2(null,i__20966_21023);
var pno_21025 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20969_21024,(0),null);
var pmask_21026 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20969_21024,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.cljs$lang$protocol_mask$partition",pno_21025,"$ = ",pmask_21026,";"], 0));

var G__21027 = seq__20963_21020;
var G__21028 = chunk__20964_21021;
var G__21029 = count__20965_21022;
var G__21030 = (i__20966_21023 + (1));
seq__20963_21020 = G__21027;
chunk__20964_21021 = G__21028;
count__20965_21022 = G__21029;
i__20966_21023 = G__21030;
continue;
} else {
var temp__6753__auto___21031 = cljs.core.seq(seq__20963_21020);
if(temp__6753__auto___21031){
var seq__20963_21032__$1 = temp__6753__auto___21031;
if(cljs.core.chunked_seq_QMARK_(seq__20963_21032__$1)){
var c__8429__auto___21033 = cljs.core.chunk_first(seq__20963_21032__$1);
var G__21034 = cljs.core.chunk_rest(seq__20963_21032__$1);
var G__21035 = c__8429__auto___21033;
var G__21036 = cljs.core.count(c__8429__auto___21033);
var G__21037 = (0);
seq__20963_21020 = G__21034;
chunk__20964_21021 = G__21035;
count__20965_21022 = G__21036;
i__20966_21023 = G__21037;
continue;
} else {
var vec__20972_21038 = cljs.core.first(seq__20963_21032__$1);
var pno_21039 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20972_21038,(0),null);
var pmask_21040 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20972_21038,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.cljs$lang$protocol_mask$partition",pno_21039,"$ = ",pmask_21040,";"], 0));

var G__21041 = cljs.core.next(seq__20963_21032__$1);
var G__21042 = null;
var G__21043 = (0);
var G__21044 = (0);
seq__20963_21020 = G__21041;
chunk__20964_21021 = G__21042;
count__20965_21022 = G__21043;
i__20966_21023 = G__21044;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})"], 0));

return cljs.compiler.emit(body);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"defrecord*","defrecord*",718069562),(function (p__21048){
var map__21049 = p__21048;
var map__21049__$1 = ((((!((map__21049 == null)))?((((map__21049.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__21049.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__21049):map__21049);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21049__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21049__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21049__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21049__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21049__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,fields),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"__meta","__meta",-946752628,null),new cljs.core.Symbol(null,"__extmap","__extmap",-1435580931,null),new cljs.core.Symbol(null,"__hash","__hash",-1328796629,null)], null));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([""], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["/**"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["* @constructor"], 0));

var seq__21051_21072 = cljs.core.seq(protocols);
var chunk__21052_21073 = null;
var count__21053_21074 = (0);
var i__21054_21075 = (0);
while(true){
if((i__21054_21075 < count__21053_21074)){
var protocol_21076 = chunk__21052_21073.cljs$core$IIndexed$_nth$arity$2(null,i__21054_21075);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str(protocol_21076)].join('')),"}"], 0));

var G__21081 = seq__21051_21072;
var G__21082 = chunk__21052_21073;
var G__21083 = count__21053_21074;
var G__21084 = (i__21054_21075 + (1));
seq__21051_21072 = G__21081;
chunk__21052_21073 = G__21082;
count__21053_21074 = G__21083;
i__21054_21075 = G__21084;
continue;
} else {
var temp__6753__auto___21086 = cljs.core.seq(seq__21051_21072);
if(temp__6753__auto___21086){
var seq__21051_21091__$1 = temp__6753__auto___21086;
if(cljs.core.chunked_seq_QMARK_(seq__21051_21091__$1)){
var c__8429__auto___21092 = cljs.core.chunk_first(seq__21051_21091__$1);
var G__21094 = cljs.core.chunk_rest(seq__21051_21091__$1);
var G__21095 = c__8429__auto___21092;
var G__21096 = cljs.core.count(c__8429__auto___21092);
var G__21097 = (0);
seq__21051_21072 = G__21094;
chunk__21052_21073 = G__21095;
count__21053_21074 = G__21096;
i__21054_21075 = G__21097;
continue;
} else {
var protocol_21098 = cljs.core.first(seq__21051_21091__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str(protocol_21098)].join('')),"}"], 0));

var G__21100 = cljs.core.next(seq__21051_21091__$1);
var G__21101 = null;
var G__21102 = (0);
var G__21103 = (0);
seq__21051_21072 = G__21100;
chunk__21052_21073 = G__21101;
count__21053_21074 = G__21102;
i__21054_21075 = G__21103;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["*/"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(t)," = (function (",cljs.compiler.comma_sep(fields__$1),"){"], 0));

var seq__21058_21113 = cljs.core.seq(fields__$1);
var chunk__21059_21114 = null;
var count__21060_21115 = (0);
var i__21061_21116 = (0);
while(true){
if((i__21061_21116 < count__21060_21115)){
var fld_21118 = chunk__21059_21114.cljs$core$IIndexed$_nth$arity$2(null,i__21061_21116);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.",fld_21118," = ",fld_21118,";"], 0));

var G__21119 = seq__21058_21113;
var G__21120 = chunk__21059_21114;
var G__21121 = count__21060_21115;
var G__21122 = (i__21061_21116 + (1));
seq__21058_21113 = G__21119;
chunk__21059_21114 = G__21120;
count__21060_21115 = G__21121;
i__21061_21116 = G__21122;
continue;
} else {
var temp__6753__auto___21124 = cljs.core.seq(seq__21058_21113);
if(temp__6753__auto___21124){
var seq__21058_21125__$1 = temp__6753__auto___21124;
if(cljs.core.chunked_seq_QMARK_(seq__21058_21125__$1)){
var c__8429__auto___21126 = cljs.core.chunk_first(seq__21058_21125__$1);
var G__21127 = cljs.core.chunk_rest(seq__21058_21125__$1);
var G__21128 = c__8429__auto___21126;
var G__21129 = cljs.core.count(c__8429__auto___21126);
var G__21130 = (0);
seq__21058_21113 = G__21127;
chunk__21059_21114 = G__21128;
count__21060_21115 = G__21129;
i__21061_21116 = G__21130;
continue;
} else {
var fld_21131 = cljs.core.first(seq__21058_21125__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.",fld_21131," = ",fld_21131,";"], 0));

var G__21132 = cljs.core.next(seq__21058_21125__$1);
var G__21133 = null;
var G__21134 = (0);
var G__21135 = (0);
seq__21058_21113 = G__21132;
chunk__21059_21114 = G__21133;
count__21060_21115 = G__21134;
i__21061_21116 = G__21135;
continue;
}
} else {
}
}
break;
}

var seq__21062_21136 = cljs.core.seq(pmasks);
var chunk__21063_21137 = null;
var count__21064_21138 = (0);
var i__21065_21139 = (0);
while(true){
if((i__21065_21139 < count__21064_21138)){
var vec__21066_21141 = chunk__21063_21137.cljs$core$IIndexed$_nth$arity$2(null,i__21065_21139);
var pno_21142 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21066_21141,(0),null);
var pmask_21143 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21066_21141,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.cljs$lang$protocol_mask$partition",pno_21142,"$ = ",pmask_21143,";"], 0));

var G__21144 = seq__21062_21136;
var G__21145 = chunk__21063_21137;
var G__21146 = count__21064_21138;
var G__21147 = (i__21065_21139 + (1));
seq__21062_21136 = G__21144;
chunk__21063_21137 = G__21145;
count__21064_21138 = G__21146;
i__21065_21139 = G__21147;
continue;
} else {
var temp__6753__auto___21148 = cljs.core.seq(seq__21062_21136);
if(temp__6753__auto___21148){
var seq__21062_21149__$1 = temp__6753__auto___21148;
if(cljs.core.chunked_seq_QMARK_(seq__21062_21149__$1)){
var c__8429__auto___21150 = cljs.core.chunk_first(seq__21062_21149__$1);
var G__21151 = cljs.core.chunk_rest(seq__21062_21149__$1);
var G__21152 = c__8429__auto___21150;
var G__21153 = cljs.core.count(c__8429__auto___21150);
var G__21154 = (0);
seq__21062_21136 = G__21151;
chunk__21063_21137 = G__21152;
count__21064_21138 = G__21153;
i__21065_21139 = G__21154;
continue;
} else {
var vec__21069_21157 = cljs.core.first(seq__21062_21149__$1);
var pno_21158 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21069_21157,(0),null);
var pmask_21159 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21069_21157,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.cljs$lang$protocol_mask$partition",pno_21158,"$ = ",pmask_21159,";"], 0));

var G__21161 = cljs.core.next(seq__21062_21149__$1);
var G__21162 = null;
var G__21163 = (0);
var G__21164 = (0);
seq__21062_21136 = G__21161;
chunk__21063_21137 = G__21162;
count__21064_21138 = G__21163;
i__21065_21139 = G__21164;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})"], 0));

return cljs.compiler.emit(body);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"dot","dot",1442709401),(function (p__21169){
var map__21170 = p__21169;
var map__21170__$1 = ((((!((map__21170 == null)))?((((map__21170.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__21170.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__21170):map__21170);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21170__$1,new cljs.core.Keyword(null,"target","target",253001721));
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21170__$1,new cljs.core.Keyword(null,"field","field",-1302436500));
var method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21170__$1,new cljs.core.Keyword(null,"method","method",55703592));
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21170__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21170__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__19395__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.truth_(field)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([target,".",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(field,cljs.core.PersistentHashSet.EMPTY)], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([target,".",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep(args),")"], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"js","js",1768080579),(function (p__21185){
var map__21186 = p__21185;
var map__21186__$1 = ((((!((map__21186 == null)))?((((map__21186.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__21186.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__21186):map__21186);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21186__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21186__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var code = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21186__$1,new cljs.core.Keyword(null,"code","code",1586293142));
var segs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21186__$1,new cljs.core.Keyword(null,"segs","segs",-1940299576));
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21186__$1,new cljs.core.Keyword(null,"args","args",1315556576));
if(cljs.core.truth_((function (){var and__7511__auto__ = code;
if(cljs.core.truth_(and__7511__auto__)){
var G__21188 = clojure.string.trim(code);
var G__21189 = "/*";
return goog.string.startsWith(G__21188,G__21189);
} else {
return and__7511__auto__;
}
})())){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([code], 0));
} else {
var env__19395__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.truth_(code)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([code], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(segs,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null)),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(args,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [null], null)))], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__19395__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}
}));
cljs.compiler.build_affecting_options = (function cljs$compiler$build_affecting_options(opts){
return cljs.core.select_keys(opts,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"static-fns","static-fns",-501950748),new cljs.core.Keyword(null,"optimize-constants","optimize-constants",232704518),new cljs.core.Keyword(null,"elide-asserts","elide-asserts",537063272),new cljs.core.Keyword(null,"target","target",253001721)], null));
});
cljs.compiler.emit_constants_table = (function cljs$compiler$emit_constants_table(table){
var seq__21202 = cljs.core.seq(table);
var chunk__21203 = null;
var count__21204 = (0);
var i__21205 = (0);
while(true){
if((i__21205 < count__21204)){
var vec__21206 = chunk__21203.cljs$core$IIndexed$_nth$arity$2(null,i__21205);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21206,(0),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21206,(1),null);
var ns_21212 = cljs.core.namespace(sym);
var name_21213 = cljs.core.name(sym);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.",value," = "], 0));

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword(sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol(sym);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("Cannot emit constant for type "),cljs.core.str(cljs.core.type(sym))].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471)], null));

}
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";\n"], 0));

var G__21214 = seq__21202;
var G__21215 = chunk__21203;
var G__21216 = count__21204;
var G__21217 = (i__21205 + (1));
seq__21202 = G__21214;
chunk__21203 = G__21215;
count__21204 = G__21216;
i__21205 = G__21217;
continue;
} else {
var temp__6753__auto__ = cljs.core.seq(seq__21202);
if(temp__6753__auto__){
var seq__21202__$1 = temp__6753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21202__$1)){
var c__8429__auto__ = cljs.core.chunk_first(seq__21202__$1);
var G__21218 = cljs.core.chunk_rest(seq__21202__$1);
var G__21219 = c__8429__auto__;
var G__21220 = cljs.core.count(c__8429__auto__);
var G__21221 = (0);
seq__21202 = G__21218;
chunk__21203 = G__21219;
count__21204 = G__21220;
i__21205 = G__21221;
continue;
} else {
var vec__21209 = cljs.core.first(seq__21202__$1);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21209,(0),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21209,(1),null);
var ns_21222 = cljs.core.namespace(sym);
var name_21223 = cljs.core.name(sym);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.",value," = "], 0));

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword(sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol(sym);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("Cannot emit constant for type "),cljs.core.str(cljs.core.type(sym))].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471)], null));

}
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";\n"], 0));

var G__21224 = cljs.core.next(seq__21202__$1);
var G__21225 = null;
var G__21226 = (0);
var G__21227 = (0);
seq__21202 = G__21224;
chunk__21203 = G__21225;
count__21204 = G__21226;
i__21205 = G__21227;
continue;
}
} else {
return null;
}
}
break;
}
});
