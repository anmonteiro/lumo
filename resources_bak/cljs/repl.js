// Compiled by ClojureScript 1.9.293 {:static-fns true, :optimize-constants false, :target :nodejs}
goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.spec');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__18985){
var map__19018 = p__18985;
var map__19018__$1 = ((((!((map__19018 == null)))?((((map__19018.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19018.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19018):map__19018);
var m = map__19018__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19018__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19018__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str((function (){var temp__6753__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__6753__auto__)){
var ns = temp__6753__auto__;
return [cljs.core.str(ns),cljs.core.str("/")].join('');
} else {
return null;
}
})()),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__19020_19047 = cljs.core.seq(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__19021_19048 = null;
var count__19022_19049 = (0);
var i__19023_19050 = (0);
while(true){
if((i__19023_19050 < count__19022_19049)){
var f_19051 = chunk__19021_19048.cljs$core$IIndexed$_nth$arity$2(null,i__19023_19050);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_19051], 0));

var G__19056 = seq__19020_19047;
var G__19057 = chunk__19021_19048;
var G__19058 = count__19022_19049;
var G__19059 = (i__19023_19050 + (1));
seq__19020_19047 = G__19056;
chunk__19021_19048 = G__19057;
count__19022_19049 = G__19058;
i__19023_19050 = G__19059;
continue;
} else {
var temp__6753__auto___19066 = cljs.core.seq(seq__19020_19047);
if(temp__6753__auto___19066){
var seq__19020_19067__$1 = temp__6753__auto___19066;
if(cljs.core.chunked_seq_QMARK_(seq__19020_19067__$1)){
var c__8429__auto___19069 = cljs.core.chunk_first(seq__19020_19067__$1);
var G__19076 = cljs.core.chunk_rest(seq__19020_19067__$1);
var G__19077 = c__8429__auto___19069;
var G__19078 = cljs.core.count(c__8429__auto___19069);
var G__19079 = (0);
seq__19020_19047 = G__19076;
chunk__19021_19048 = G__19077;
count__19022_19049 = G__19078;
i__19023_19050 = G__19079;
continue;
} else {
var f_19081 = cljs.core.first(seq__19020_19067__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_19081], 0));

var G__19085 = cljs.core.next(seq__19020_19067__$1);
var G__19086 = null;
var G__19087 = (0);
var G__19088 = (0);
seq__19020_19047 = G__19085;
chunk__19021_19048 = G__19086;
count__19022_19049 = G__19087;
i__19023_19050 = G__19088;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_19098 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__7523__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglists_19098], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_19098)))?cljs.core.second(arglists_19098):arglists_19098)], 0));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("\n  Please see http://clojure.org/"),cljs.core.str(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("\n  Please see http://clojure.org/special_forms#"),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Macro"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__19024_19126 = cljs.core.seq(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__19025_19127 = null;
var count__19026_19128 = (0);
var i__19027_19132 = (0);
while(true){
if((i__19027_19132 < count__19026_19128)){
var vec__19028_19133 = chunk__19025_19127.cljs$core$IIndexed$_nth$arity$2(null,i__19027_19132);
var name_19134 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19028_19133,(0),null);
var map__19031_19135 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19028_19133,(1),null);
var map__19031_19136__$1 = ((((!((map__19031_19135 == null)))?((((map__19031_19135.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19031_19135.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19031_19135):map__19031_19135);
var doc_19137 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19031_19136__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_19138 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19031_19136__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name_19134], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists_19138], 0));

if(cljs.core.truth_(doc_19137)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc_19137], 0));
} else {
}

var G__19139 = seq__19024_19126;
var G__19140 = chunk__19025_19127;
var G__19141 = count__19026_19128;
var G__19142 = (i__19027_19132 + (1));
seq__19024_19126 = G__19139;
chunk__19025_19127 = G__19140;
count__19026_19128 = G__19141;
i__19027_19132 = G__19142;
continue;
} else {
var temp__6753__auto___19143 = cljs.core.seq(seq__19024_19126);
if(temp__6753__auto___19143){
var seq__19024_19144__$1 = temp__6753__auto___19143;
if(cljs.core.chunked_seq_QMARK_(seq__19024_19144__$1)){
var c__8429__auto___19145 = cljs.core.chunk_first(seq__19024_19144__$1);
var G__19146 = cljs.core.chunk_rest(seq__19024_19144__$1);
var G__19147 = c__8429__auto___19145;
var G__19148 = cljs.core.count(c__8429__auto___19145);
var G__19149 = (0);
seq__19024_19126 = G__19146;
chunk__19025_19127 = G__19147;
count__19026_19128 = G__19148;
i__19027_19132 = G__19149;
continue;
} else {
var vec__19033_19151 = cljs.core.first(seq__19024_19144__$1);
var name_19152 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19033_19151,(0),null);
var map__19036_19153 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19033_19151,(1),null);
var map__19036_19154__$1 = ((((!((map__19036_19153 == null)))?((((map__19036_19153.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19036_19153.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19036_19153):map__19036_19153);
var doc_19155 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19036_19154__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_19156 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19036_19154__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name_19152], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists_19156], 0));

if(cljs.core.truth_(doc_19155)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc_19155], 0));
} else {
}

var G__19157 = cljs.core.next(seq__19024_19144__$1);
var G__19158 = null;
var G__19159 = (0);
var G__19160 = (0);
seq__19024_19126 = G__19157;
chunk__19025_19127 = G__19158;
count__19026_19128 = G__19159;
i__19027_19132 = G__19160;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__6753__auto__ = cljs.spec.get_spec(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2([cljs.core.str(cljs.core.ns_name(n))].join(''),cljs.core.name(nm)));
if(cljs.core.truth_(temp__6753__auto__)){
var fnspec = temp__6753__auto__;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Spec"], 0));

var seq__19038 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__19039 = null;
var count__19040 = (0);
var i__19041 = (0);
while(true){
if((i__19041 < count__19040)){
var role = chunk__19039.cljs$core$IIndexed$_nth$arity$2(null,i__19041);
var temp__6753__auto___19173__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__6753__auto___19173__$1)){
var spec_19174 = temp__6753__auto___19173__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("\n "),cljs.core.str(cljs.core.name(role)),cljs.core.str(":")].join(''),cljs.spec.describe(spec_19174)], 0));
} else {
}

var G__19175 = seq__19038;
var G__19176 = chunk__19039;
var G__19177 = count__19040;
var G__19178 = (i__19041 + (1));
seq__19038 = G__19175;
chunk__19039 = G__19176;
count__19040 = G__19177;
i__19041 = G__19178;
continue;
} else {
var temp__6753__auto____$1 = cljs.core.seq(seq__19038);
if(temp__6753__auto____$1){
var seq__19038__$1 = temp__6753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__19038__$1)){
var c__8429__auto__ = cljs.core.chunk_first(seq__19038__$1);
var G__19191 = cljs.core.chunk_rest(seq__19038__$1);
var G__19192 = c__8429__auto__;
var G__19193 = cljs.core.count(c__8429__auto__);
var G__19194 = (0);
seq__19038 = G__19191;
chunk__19039 = G__19192;
count__19040 = G__19193;
i__19041 = G__19194;
continue;
} else {
var role = cljs.core.first(seq__19038__$1);
var temp__6753__auto___19195__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__6753__auto___19195__$2)){
var spec_19196 = temp__6753__auto___19195__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("\n "),cljs.core.str(cljs.core.name(role)),cljs.core.str(":")].join(''),cljs.spec.describe(spec_19196)], 0));
} else {
}

var G__19197 = cljs.core.next(seq__19038__$1);
var G__19198 = null;
var G__19199 = (0);
var G__19200 = (0);
seq__19038 = G__19197;
chunk__19039 = G__19198;
count__19040 = G__19199;
i__19041 = G__19200;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});
