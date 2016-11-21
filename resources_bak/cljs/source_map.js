// Compiled by ClojureScript 1.9.293 {:static-fns true, :optimize-constants false, :target :nodejs}
goog.provide('cljs.source_map');
goog.require('cljs.core');
goog.require('goog.object');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.source_map.base64_vlq');
/**
 * Take a seq of source file names and return a map from
 * file number to integer index. For reverse source maps.
 */
cljs.source_map.indexed_sources = (function cljs$source_map$indexed_sources(sources){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,p__12289){
var vec__12290 = p__12289;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12290,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12290,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,v,i);
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (a,b){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b], null);
}),sources));
});
/**
 * Take a seq of source file names and return a comparator
 * that can be used to construct a sorted map. For reverse
 * source maps.
 */
cljs.source_map.source_compare = (function cljs$source_map$source_compare(sources){
var sources__$1 = cljs.source_map.indexed_sources(sources);
return ((function (sources__$1){
return (function (a,b){
return cljs.core.compare((sources__$1.cljs$core$IFn$_invoke$arity$1 ? sources__$1.cljs$core$IFn$_invoke$arity$1(a) : sources__$1.call(null,a)),(sources__$1.cljs$core$IFn$_invoke$arity$1 ? sources__$1.cljs$core$IFn$_invoke$arity$1(b) : sources__$1.call(null,b)));
});
;})(sources__$1))
});
/**
 * Take a source map segment represented as a vector
 * and return a map.
 */
cljs.source_map.seg__GT_map = (function cljs$source_map$seg__GT_map(seg,source_map){
var vec__12296 = seg;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12296,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12296,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12296,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12296,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12296,(4),null);
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol,new cljs.core.Keyword(null,"source","source",-433931539),(goog.object.get(source_map,"sources")[source]),new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"name","name",1843675177),(function (){var temp__6753__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(seg));
if(cljs.core.truth_(temp__6753__auto__)){
var name__$1 = temp__6753__auto__;
return (goog.object.get(source_map,"names")[name__$1]);
} else {
return null;
}
})()], null);
});
/**
 * Combine a source map segment vector and a relative
 * source map segment vector and combine them to get
 * an absolute segment posititon information as a vector.
 */
cljs.source_map.seg_combine = (function cljs$source_map$seg_combine(seg,relseg){
var vec__12305 = seg;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12305,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12305,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12305,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12305,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12305,(4),null);
var vec__12308 = relseg;
var rgcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12308,(0),null);
var rsource = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12308,(1),null);
var rline = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12308,(2),null);
var rcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12308,(3),null);
var rname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12308,(4),null);
var nseg = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(gcol + rgcol),((function (){var or__7523__auto__ = source;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return (0);
}
})() + rsource),((function (){var or__7523__auto__ = line;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return (0);
}
})() + rline),((function (){var or__7523__auto__ = col;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return (0);
}
})() + rcol),((function (){var or__7523__auto__ = name;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return (0);
}
})() + rname)], null);
if(cljs.core.truth_(name)){
return cljs.core.with_meta(nseg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),(name + rname)], null));
} else {
return nseg;
}
});
/**
 * Helper for decode-reverse. Take a reverse source map and
 *   update it with a segment map.
 */
cljs.source_map.update_reverse_result = (function cljs$source_map$update_reverse_result(result,segmap,gline){
var map__12315 = segmap;
var map__12315__$1 = ((((!((map__12315 == null)))?((((map__12315.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__12315.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12315):map__12315);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12315__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12315__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12315__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12315__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12315__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gline","gline",-1086242431),gline,new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [source], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__12315,map__12315__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [line], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__12315,map__12315__$1,gcol,source,line,col,name,d,d__$1){
return (function (m__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [col], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__12315,map__12315__$1,gcol,source,line,col,name,d,d__$1){
return (function (v){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(v,d__$1);
});})(map__12315,map__12315__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__12315,map__12315__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map()));
});})(map__12315,map__12315__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map()));
});
/**
 * Convert a v3 source map JSON object into a reverse source map
 *   mapping original ClojureScript source locations to the generated
 *   JavaScript.
 */
cljs.source_map.decode_reverse = (function cljs$source_map$decode_reverse(var_args){
var args12317 = [];
var len__8739__auto___12329 = arguments.length;
var i__8740__auto___12330 = (0);
while(true){
if((i__8740__auto___12330 < len__8739__auto___12329)){
args12317.push((arguments[i__8740__auto___12330]));

var G__12331 = (i__8740__auto___12330 + (1));
i__8740__auto___12330 = G__12331;
continue;
} else {
}
break;
}

var G__12319 = args12317.length;
switch (G__12319) {
case 1:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12317.length)].join('')));

}
});

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2(goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.sorted_map_by(cljs.source_map.source_compare(sources));
while(true){
if(lines__$1){
var line = cljs.core.first(lines__$1);
var vec__12320 = ((clojure.string.blank_QMARK_(line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first(segs__$1);
var nrelseg = cljs.source_map.seg_combine(cljs.source_map.base64_vlq.decode(seg),relseg__$1);
var G__12339 = cljs.core.next(segs__$1);
var G__12340 = nrelseg;
var G__12341 = cljs.source_map.update_reverse_result(result__$1,cljs.source_map.seg__GT_map(nrelseg,source_map),gline);
segs__$1 = G__12339;
relseg__$1 = G__12340;
result__$1 = G__12341;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12320,(0),null);
var relseg__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12320,(1),null);
var G__12347 = (gline + (1));
var G__12348 = cljs.core.next(lines__$1);
var G__12349 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(relseg__$1,(0),(0));
var G__12350 = result__$1;
gline = G__12347;
lines__$1 = G__12348;
relseg = G__12349;
result = G__12350;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode_reverse.cljs$lang$maxFixedArity = 2;

/**
 * Helper for decode. Take a source map and update it based on a
 *   segment map.
 */
cljs.source_map.update_result = (function cljs$source_map$update_result(result,segmap,gline){
var map__12359 = segmap;
var map__12359__$1 = ((((!((map__12359 == null)))?((((map__12359.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__12359.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12359):map__12359);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12359__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12359__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12359__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12359__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12359__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"source","source",-433931539),source], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__12359,map__12359__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__12359,map__12359__$1,gcol,source,line,col,name,d,d__$1){
return (function (p1__12355_SHARP_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__12355_SHARP_,d__$1);
});})(map__12359,map__12359__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__12359,map__12359__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map()));
});
/**
 * Convert a v3 source map JSON object into a source map mapping
 *   generated JavaScript source locations to the original
 *   ClojureScript.
 */
cljs.source_map.decode = (function cljs$source_map$decode(var_args){
var args12378 = [];
var len__8739__auto___12396 = arguments.length;
var i__8740__auto___12398 = (0);
while(true){
if((i__8740__auto___12398 < len__8739__auto___12396)){
args12378.push((arguments[i__8740__auto___12398]));

var G__12401 = (i__8740__auto___12398 + (1));
i__8740__auto___12398 = G__12401;
continue;
} else {
}
break;
}

var G__12380 = args12378.length;
switch (G__12380) {
case 1:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12378.length)].join('')));

}
});

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2(goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if(lines__$1){
var line = cljs.core.first(lines__$1);
var vec__12384 = ((clojure.string.blank_QMARK_(line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first(segs__$1);
var nrelseg = cljs.source_map.seg_combine(cljs.source_map.base64_vlq.decode(seg),relseg__$1);
var G__12408 = cljs.core.next(segs__$1);
var G__12409 = nrelseg;
var G__12410 = cljs.source_map.update_result(result__$1,cljs.source_map.seg__GT_map(nrelseg,source_map),gline);
segs__$1 = G__12408;
relseg__$1 = G__12409;
result__$1 = G__12410;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12384,(0),null);
var relseg__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12384,(1),null);
var G__12411 = (gline + (1));
var G__12412 = cljs.core.next(lines__$1);
var G__12413 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(relseg__$1,(0),(0));
var G__12414 = result__$1;
gline = G__12411;
lines__$1 = G__12412;
relseg = G__12413;
result = G__12414;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode.cljs$lang$maxFixedArity = 2;

/**
 * Take a nested sorted map encoding line and column information
 * for a file and return a vector of vectors of encoded segments.
 * Each vector represents a line, and the internal vectors are segments
 * representing the contents of the line.
 */
cljs.source_map.lines__GT_segs = (function cljs$source_map$lines__GT_segs(lines){
var relseg = (function (){var G__12446 = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__12446) : cljs.core.atom.call(null,G__12446));
})();
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (relseg){
return (function (segs,cols){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(relseg,((function (relseg){
return (function (p__12447){
var vec__12448 = p__12447;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12448,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12448,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12448,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12448,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12448,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),source,line,col,name], null);
});})(relseg))
);

return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(segs,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (relseg){
return (function (cols__$1,p__12451){
var vec__12452 = p__12451;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12452,(0),null);
var sidx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12452,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12452,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12452,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12452,(4),null);
var seg = vec__12452;
var offset = cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core._,seg,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(relseg) : cljs.core.deref.call(null,relseg)));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(relseg,((function (offset,vec__12452,gcol,sidx,line,col,name,seg,relseg){
return (function (p__12455){
var vec__12456 = p__12455;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12456,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12456,(1),null);
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12456,(2),null);
var ___$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12456,(3),null);
var lname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12456,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol,sidx,line,col,(function (){var or__7523__auto__ = name;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return lname;
}
})()], null);
});})(offset,vec__12452,gcol,sidx,line,col,name,seg,relseg))
);

return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cols__$1,cljs.source_map.base64_vlq.encode(offset));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,cols));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,lines);
});
/**
 * Take an internal source map representation represented as nested
 * sorted maps of file, line, column and return a source map v3 JSON
 * string.
 */
cljs.source_map.encode = (function cljs$source_map$encode(m,opts){
var lines = (function (){var G__12609 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__12609) : cljs.core.atom.call(null,G__12609));
})();
var names__GT_idx = (function (){var G__12610 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__12610) : cljs.core.atom.call(null,G__12610));
})();
var name_idx = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0)) : cljs.core.atom.call(null,(0)));
var preamble_lines = cljs.core.take.cljs$core$IFn$_invoke$arity$2((function (){var or__7523__auto__ = new cljs.core.Keyword(null,"preamble-line-count","preamble-line-count",-659949744).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return (0);
}
})(),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY));
var info__GT_segv = ((function (lines,names__GT_idx,name_idx,preamble_lines){
return (function (info,source_idx,line,col){
var segv = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gcol","gcol",309250807).cljs$core$IFn$_invoke$arity$1(info),source_idx,line,col], null);
var temp__6751__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
if(cljs.core.truth_(temp__6751__auto__)){
var name = temp__6751__auto__;
var idx = (function (){var temp__6751__auto____$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(names__GT_idx) : cljs.core.deref.call(null,names__GT_idx)),name);
if(cljs.core.truth_(temp__6751__auto____$1)){
var idx = temp__6751__auto____$1;
return idx;
} else {
var cidx = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(name_idx) : cljs.core.deref.call(null,name_idx));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(names__GT_idx,cljs.core.assoc,name,cidx);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(name_idx,cljs.core.inc);

return cidx;
}
})();
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(segv,idx);
} else {
return segv;
}
});})(lines,names__GT_idx,name_idx,preamble_lines))
;
var encode_cols = ((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (infos,source_idx,line,col){
var seq__12611 = cljs.core.seq(infos);
var chunk__12612 = null;
var count__12613 = (0);
var i__12614 = (0);
while(true){
if((i__12614 < count__12613)){
var info = chunk__12612.cljs$core$IIndexed$_nth$arity$2(null,i__12614);
var segv_12707 = info__GT_segv(info,source_idx,line,col);
var gline_12708 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_12709 = cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lines) : cljs.core.deref.call(null,lines)));
if((gline_12708 > (lc_12709 - (1)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__12611,chunk__12612,count__12613,i__12614,segv_12707,gline_12708,lc_12709,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(lines__$1,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((gline_12708 - (lc_12709 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_12707], null));
});})(seq__12611,chunk__12612,count__12613,i__12614,segv_12707,gline_12708,lc_12709,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__12611,chunk__12612,count__12613,i__12614,segv_12707,gline_12708,lc_12709,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_12708], null),cljs.core.conj,segv_12707);
});})(seq__12611,chunk__12612,count__12613,i__12614,segv_12707,gline_12708,lc_12709,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}

var G__12710 = seq__12611;
var G__12711 = chunk__12612;
var G__12712 = count__12613;
var G__12713 = (i__12614 + (1));
seq__12611 = G__12710;
chunk__12612 = G__12711;
count__12613 = G__12712;
i__12614 = G__12713;
continue;
} else {
var temp__6753__auto__ = cljs.core.seq(seq__12611);
if(temp__6753__auto__){
var seq__12611__$1 = temp__6753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__12611__$1)){
var c__8429__auto__ = cljs.core.chunk_first(seq__12611__$1);
var G__12714 = cljs.core.chunk_rest(seq__12611__$1);
var G__12715 = c__8429__auto__;
var G__12716 = cljs.core.count(c__8429__auto__);
var G__12717 = (0);
seq__12611 = G__12714;
chunk__12612 = G__12715;
count__12613 = G__12716;
i__12614 = G__12717;
continue;
} else {
var info = cljs.core.first(seq__12611__$1);
var segv_12718 = info__GT_segv(info,source_idx,line,col);
var gline_12719 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_12720 = cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lines) : cljs.core.deref.call(null,lines)));
if((gline_12719 > (lc_12720 - (1)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__12611,chunk__12612,count__12613,i__12614,segv_12718,gline_12719,lc_12720,info,seq__12611__$1,temp__6753__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(lines__$1,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((gline_12719 - (lc_12720 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_12718], null));
});})(seq__12611,chunk__12612,count__12613,i__12614,segv_12718,gline_12719,lc_12720,info,seq__12611__$1,temp__6753__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__12611,chunk__12612,count__12613,i__12614,segv_12718,gline_12719,lc_12720,info,seq__12611__$1,temp__6753__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_12719], null),cljs.core.conj,segv_12718);
});})(seq__12611,chunk__12612,count__12613,i__12614,segv_12718,gline_12719,lc_12720,info,seq__12611__$1,temp__6753__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}

var G__12721 = cljs.core.next(seq__12611__$1);
var G__12722 = null;
var G__12723 = (0);
var G__12724 = (0);
seq__12611 = G__12721;
chunk__12612 = G__12722;
count__12613 = G__12723;
i__12614 = G__12724;
continue;
}
} else {
return null;
}
}
break;
}
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
;
var seq__12624_12725 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (i,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,v], null);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,m));
var chunk__12625_12726 = null;
var count__12626_12727 = (0);
var i__12627_12728 = (0);
while(true){
if((i__12627_12728 < count__12626_12727)){
var vec__12629_12729 = chunk__12625_12726.cljs$core$IIndexed$_nth$arity$2(null,i__12627_12728);
var source_idx_12730 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12629_12729,(0),null);
var vec__12632_12731 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12629_12729,(1),null);
var __12732 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12632_12731,(0),null);
var lines_12733__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12632_12731,(1),null);
var seq__12635_12734 = cljs.core.seq(lines_12733__$1);
var chunk__12636_12735 = null;
var count__12637_12736 = (0);
var i__12638_12737 = (0);
while(true){
if((i__12638_12737 < count__12637_12736)){
var vec__12639_12738 = chunk__12636_12735.cljs$core$IIndexed$_nth$arity$2(null,i__12638_12737);
var line_12739 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12639_12738,(0),null);
var cols_12740 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12639_12738,(1),null);
var seq__12642_12741 = cljs.core.seq(cols_12740);
var chunk__12643_12742 = null;
var count__12644_12743 = (0);
var i__12645_12744 = (0);
while(true){
if((i__12645_12744 < count__12644_12743)){
var vec__12646_12745 = chunk__12643_12742.cljs$core$IIndexed$_nth$arity$2(null,i__12645_12744);
var col_12746 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12646_12745,(0),null);
var infos_12747 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12646_12745,(1),null);
encode_cols(infos_12747,source_idx_12730,line_12739,col_12746);

var G__12748 = seq__12642_12741;
var G__12749 = chunk__12643_12742;
var G__12750 = count__12644_12743;
var G__12751 = (i__12645_12744 + (1));
seq__12642_12741 = G__12748;
chunk__12643_12742 = G__12749;
count__12644_12743 = G__12750;
i__12645_12744 = G__12751;
continue;
} else {
var temp__6753__auto___12752 = cljs.core.seq(seq__12642_12741);
if(temp__6753__auto___12752){
var seq__12642_12753__$1 = temp__6753__auto___12752;
if(cljs.core.chunked_seq_QMARK_(seq__12642_12753__$1)){
var c__8429__auto___12754 = cljs.core.chunk_first(seq__12642_12753__$1);
var G__12755 = cljs.core.chunk_rest(seq__12642_12753__$1);
var G__12756 = c__8429__auto___12754;
var G__12757 = cljs.core.count(c__8429__auto___12754);
var G__12758 = (0);
seq__12642_12741 = G__12755;
chunk__12643_12742 = G__12756;
count__12644_12743 = G__12757;
i__12645_12744 = G__12758;
continue;
} else {
var vec__12649_12759 = cljs.core.first(seq__12642_12753__$1);
var col_12760 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12649_12759,(0),null);
var infos_12761 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12649_12759,(1),null);
encode_cols(infos_12761,source_idx_12730,line_12739,col_12760);

var G__12762 = cljs.core.next(seq__12642_12753__$1);
var G__12763 = null;
var G__12764 = (0);
var G__12765 = (0);
seq__12642_12741 = G__12762;
chunk__12643_12742 = G__12763;
count__12644_12743 = G__12764;
i__12645_12744 = G__12765;
continue;
}
} else {
}
}
break;
}

var G__12766 = seq__12635_12734;
var G__12767 = chunk__12636_12735;
var G__12768 = count__12637_12736;
var G__12769 = (i__12638_12737 + (1));
seq__12635_12734 = G__12766;
chunk__12636_12735 = G__12767;
count__12637_12736 = G__12768;
i__12638_12737 = G__12769;
continue;
} else {
var temp__6753__auto___12770 = cljs.core.seq(seq__12635_12734);
if(temp__6753__auto___12770){
var seq__12635_12771__$1 = temp__6753__auto___12770;
if(cljs.core.chunked_seq_QMARK_(seq__12635_12771__$1)){
var c__8429__auto___12772 = cljs.core.chunk_first(seq__12635_12771__$1);
var G__12773 = cljs.core.chunk_rest(seq__12635_12771__$1);
var G__12774 = c__8429__auto___12772;
var G__12775 = cljs.core.count(c__8429__auto___12772);
var G__12776 = (0);
seq__12635_12734 = G__12773;
chunk__12636_12735 = G__12774;
count__12637_12736 = G__12775;
i__12638_12737 = G__12776;
continue;
} else {
var vec__12652_12777 = cljs.core.first(seq__12635_12771__$1);
var line_12778 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12652_12777,(0),null);
var cols_12779 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12652_12777,(1),null);
var seq__12655_12780 = cljs.core.seq(cols_12779);
var chunk__12656_12781 = null;
var count__12657_12782 = (0);
var i__12658_12783 = (0);
while(true){
if((i__12658_12783 < count__12657_12782)){
var vec__12659_12784 = chunk__12656_12781.cljs$core$IIndexed$_nth$arity$2(null,i__12658_12783);
var col_12785 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12659_12784,(0),null);
var infos_12786 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12659_12784,(1),null);
encode_cols(infos_12786,source_idx_12730,line_12778,col_12785);

var G__12787 = seq__12655_12780;
var G__12788 = chunk__12656_12781;
var G__12789 = count__12657_12782;
var G__12790 = (i__12658_12783 + (1));
seq__12655_12780 = G__12787;
chunk__12656_12781 = G__12788;
count__12657_12782 = G__12789;
i__12658_12783 = G__12790;
continue;
} else {
var temp__6753__auto___12791__$1 = cljs.core.seq(seq__12655_12780);
if(temp__6753__auto___12791__$1){
var seq__12655_12792__$1 = temp__6753__auto___12791__$1;
if(cljs.core.chunked_seq_QMARK_(seq__12655_12792__$1)){
var c__8429__auto___12793 = cljs.core.chunk_first(seq__12655_12792__$1);
var G__12794 = cljs.core.chunk_rest(seq__12655_12792__$1);
var G__12795 = c__8429__auto___12793;
var G__12796 = cljs.core.count(c__8429__auto___12793);
var G__12797 = (0);
seq__12655_12780 = G__12794;
chunk__12656_12781 = G__12795;
count__12657_12782 = G__12796;
i__12658_12783 = G__12797;
continue;
} else {
var vec__12662_12798 = cljs.core.first(seq__12655_12792__$1);
var col_12799 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12662_12798,(0),null);
var infos_12800 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12662_12798,(1),null);
encode_cols(infos_12800,source_idx_12730,line_12778,col_12799);

var G__12801 = cljs.core.next(seq__12655_12792__$1);
var G__12802 = null;
var G__12803 = (0);
var G__12804 = (0);
seq__12655_12780 = G__12801;
chunk__12656_12781 = G__12802;
count__12657_12782 = G__12803;
i__12658_12783 = G__12804;
continue;
}
} else {
}
}
break;
}

var G__12805 = cljs.core.next(seq__12635_12771__$1);
var G__12806 = null;
var G__12807 = (0);
var G__12808 = (0);
seq__12635_12734 = G__12805;
chunk__12636_12735 = G__12806;
count__12637_12736 = G__12807;
i__12638_12737 = G__12808;
continue;
}
} else {
}
}
break;
}

var G__12809 = seq__12624_12725;
var G__12810 = chunk__12625_12726;
var G__12811 = count__12626_12727;
var G__12812 = (i__12627_12728 + (1));
seq__12624_12725 = G__12809;
chunk__12625_12726 = G__12810;
count__12626_12727 = G__12811;
i__12627_12728 = G__12812;
continue;
} else {
var temp__6753__auto___12813 = cljs.core.seq(seq__12624_12725);
if(temp__6753__auto___12813){
var seq__12624_12814__$1 = temp__6753__auto___12813;
if(cljs.core.chunked_seq_QMARK_(seq__12624_12814__$1)){
var c__8429__auto___12815 = cljs.core.chunk_first(seq__12624_12814__$1);
var G__12816 = cljs.core.chunk_rest(seq__12624_12814__$1);
var G__12817 = c__8429__auto___12815;
var G__12818 = cljs.core.count(c__8429__auto___12815);
var G__12819 = (0);
seq__12624_12725 = G__12816;
chunk__12625_12726 = G__12817;
count__12626_12727 = G__12818;
i__12627_12728 = G__12819;
continue;
} else {
var vec__12665_12820 = cljs.core.first(seq__12624_12814__$1);
var source_idx_12821 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12665_12820,(0),null);
var vec__12668_12822 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12665_12820,(1),null);
var __12823 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12668_12822,(0),null);
var lines_12824__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12668_12822,(1),null);
var seq__12671_12825 = cljs.core.seq(lines_12824__$1);
var chunk__12672_12826 = null;
var count__12673_12827 = (0);
var i__12674_12828 = (0);
while(true){
if((i__12674_12828 < count__12673_12827)){
var vec__12675_12829 = chunk__12672_12826.cljs$core$IIndexed$_nth$arity$2(null,i__12674_12828);
var line_12830 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12675_12829,(0),null);
var cols_12831 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12675_12829,(1),null);
var seq__12678_12832 = cljs.core.seq(cols_12831);
var chunk__12679_12833 = null;
var count__12680_12834 = (0);
var i__12681_12835 = (0);
while(true){
if((i__12681_12835 < count__12680_12834)){
var vec__12682_12836 = chunk__12679_12833.cljs$core$IIndexed$_nth$arity$2(null,i__12681_12835);
var col_12837 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12682_12836,(0),null);
var infos_12838 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12682_12836,(1),null);
encode_cols(infos_12838,source_idx_12821,line_12830,col_12837);

var G__12839 = seq__12678_12832;
var G__12840 = chunk__12679_12833;
var G__12841 = count__12680_12834;
var G__12842 = (i__12681_12835 + (1));
seq__12678_12832 = G__12839;
chunk__12679_12833 = G__12840;
count__12680_12834 = G__12841;
i__12681_12835 = G__12842;
continue;
} else {
var temp__6753__auto___12843__$1 = cljs.core.seq(seq__12678_12832);
if(temp__6753__auto___12843__$1){
var seq__12678_12844__$1 = temp__6753__auto___12843__$1;
if(cljs.core.chunked_seq_QMARK_(seq__12678_12844__$1)){
var c__8429__auto___12845 = cljs.core.chunk_first(seq__12678_12844__$1);
var G__12846 = cljs.core.chunk_rest(seq__12678_12844__$1);
var G__12847 = c__8429__auto___12845;
var G__12848 = cljs.core.count(c__8429__auto___12845);
var G__12849 = (0);
seq__12678_12832 = G__12846;
chunk__12679_12833 = G__12847;
count__12680_12834 = G__12848;
i__12681_12835 = G__12849;
continue;
} else {
var vec__12686_12850 = cljs.core.first(seq__12678_12844__$1);
var col_12851 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12686_12850,(0),null);
var infos_12852 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12686_12850,(1),null);
encode_cols(infos_12852,source_idx_12821,line_12830,col_12851);

var G__12853 = cljs.core.next(seq__12678_12844__$1);
var G__12854 = null;
var G__12855 = (0);
var G__12856 = (0);
seq__12678_12832 = G__12853;
chunk__12679_12833 = G__12854;
count__12680_12834 = G__12855;
i__12681_12835 = G__12856;
continue;
}
} else {
}
}
break;
}

var G__12857 = seq__12671_12825;
var G__12858 = chunk__12672_12826;
var G__12859 = count__12673_12827;
var G__12860 = (i__12674_12828 + (1));
seq__12671_12825 = G__12857;
chunk__12672_12826 = G__12858;
count__12673_12827 = G__12859;
i__12674_12828 = G__12860;
continue;
} else {
var temp__6753__auto___12861__$1 = cljs.core.seq(seq__12671_12825);
if(temp__6753__auto___12861__$1){
var seq__12671_12862__$1 = temp__6753__auto___12861__$1;
if(cljs.core.chunked_seq_QMARK_(seq__12671_12862__$1)){
var c__8429__auto___12863 = cljs.core.chunk_first(seq__12671_12862__$1);
var G__12864 = cljs.core.chunk_rest(seq__12671_12862__$1);
var G__12865 = c__8429__auto___12863;
var G__12866 = cljs.core.count(c__8429__auto___12863);
var G__12867 = (0);
seq__12671_12825 = G__12864;
chunk__12672_12826 = G__12865;
count__12673_12827 = G__12866;
i__12674_12828 = G__12867;
continue;
} else {
var vec__12689_12868 = cljs.core.first(seq__12671_12862__$1);
var line_12869 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12689_12868,(0),null);
var cols_12870 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12689_12868,(1),null);
var seq__12692_12871 = cljs.core.seq(cols_12870);
var chunk__12693_12872 = null;
var count__12694_12873 = (0);
var i__12695_12874 = (0);
while(true){
if((i__12695_12874 < count__12694_12873)){
var vec__12696_12875 = chunk__12693_12872.cljs$core$IIndexed$_nth$arity$2(null,i__12695_12874);
var col_12876 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12696_12875,(0),null);
var infos_12877 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12696_12875,(1),null);
encode_cols(infos_12877,source_idx_12821,line_12869,col_12876);

var G__12879 = seq__12692_12871;
var G__12880 = chunk__12693_12872;
var G__12881 = count__12694_12873;
var G__12882 = (i__12695_12874 + (1));
seq__12692_12871 = G__12879;
chunk__12693_12872 = G__12880;
count__12694_12873 = G__12881;
i__12695_12874 = G__12882;
continue;
} else {
var temp__6753__auto___12884__$2 = cljs.core.seq(seq__12692_12871);
if(temp__6753__auto___12884__$2){
var seq__12692_12885__$1 = temp__6753__auto___12884__$2;
if(cljs.core.chunked_seq_QMARK_(seq__12692_12885__$1)){
var c__8429__auto___12886 = cljs.core.chunk_first(seq__12692_12885__$1);
var G__12887 = cljs.core.chunk_rest(seq__12692_12885__$1);
var G__12888 = c__8429__auto___12886;
var G__12889 = cljs.core.count(c__8429__auto___12886);
var G__12890 = (0);
seq__12692_12871 = G__12887;
chunk__12693_12872 = G__12888;
count__12694_12873 = G__12889;
i__12695_12874 = G__12890;
continue;
} else {
var vec__12699_12891 = cljs.core.first(seq__12692_12885__$1);
var col_12892 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12699_12891,(0),null);
var infos_12893 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12699_12891,(1),null);
encode_cols(infos_12893,source_idx_12821,line_12869,col_12892);

var G__12895 = cljs.core.next(seq__12692_12885__$1);
var G__12896 = null;
var G__12897 = (0);
var G__12898 = (0);
seq__12692_12871 = G__12895;
chunk__12693_12872 = G__12896;
count__12694_12873 = G__12897;
i__12695_12874 = G__12898;
continue;
}
} else {
}
}
break;
}

var G__12899 = cljs.core.next(seq__12671_12862__$1);
var G__12900 = null;
var G__12901 = (0);
var G__12902 = (0);
seq__12671_12825 = G__12899;
chunk__12672_12826 = G__12900;
count__12673_12827 = G__12901;
i__12674_12828 = G__12902;
continue;
}
} else {
}
}
break;
}

var G__12904 = cljs.core.next(seq__12624_12814__$1);
var G__12905 = null;
var G__12906 = (0);
var G__12907 = (0);
seq__12624_12725 = G__12904;
chunk__12625_12726 = G__12905;
count__12626_12727 = G__12906;
i__12627_12728 = G__12907;
continue;
}
} else {
}
}
break;
}

var source_map_file_contents = (function (){var G__12702 = ({"version": (3), "file": new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(opts), "sources": (function (){var paths = cljs.core.keys(m);
var f = cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((new cljs.core.Keyword(null,"source-map-timestamp","source-map-timestamp",1973015633).cljs$core$IFn$_invoke$arity$1(opts) === true)?((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__12484_SHARP_){
return [cljs.core.str(p1__12484_SHARP_),cljs.core.str("?rel="),cljs.core.str((new Date()).valueOf())].join('');
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
:cljs.core.identity),((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__12485_SHARP_){
return cljs.core.last(clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__12485_SHARP_,/\//));
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
);
return cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(f,paths));
})(), "lineCount": new cljs.core.Keyword(null,"lines","lines",-700165781).cljs$core$IFn$_invoke$arity$1(opts), "mappings": clojure.string.join.cljs$core$IFn$_invoke$arity$2(";",cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__12486_SHARP_){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",p1__12486_SHARP_);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,cljs.source_map.lines__GT_segs(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(preamble_lines,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lines) : cljs.core.deref.call(null,lines)))))), "names": cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.set.map_invert((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(names__GT_idx) : cljs.core.deref.call(null,names__GT_idx))),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(names__GT_idx) : cljs.core.deref.call(null,names__GT_idx))))))});
if(cljs.core.truth_(new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts))){
var G__12703 = G__12702;
var G__12704_12915 = G__12703;
var G__12705_12916 = "sourcesContent";
var G__12706_12917 = cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts));
goog.object.set(G__12704_12915,G__12705_12916,G__12706_12917);

return G__12703;
} else {
return G__12702;
}
})();
return JSON.stringify(source_map_file_contents);
});
/**
 * Merge an internal source map representation of a single
 * ClojureScript file mapping original to generated with a
 * second source map mapping original JS to generated JS.
 * The is to support source maps that work through multiple
 * compilation steps like Google Closure optimization passes.
 */
cljs.source_map.merge_source_maps = (function cljs$source_map$merge_source_maps(cljs_map,js_map){
var line_map_seq = cljs.core.seq(cljs_map);
var new_lines = cljs.core.sorted_map();
while(true){
if(line_map_seq){
var vec__12930 = cljs.core.first(line_map_seq);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12930,(0),null);
var col_map = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12930,(1),null);
var new_cols = (function (){var col_map_seq = cljs.core.seq(col_map);
var new_cols = cljs.core.sorted_map();
while(true){
if(col_map_seq){
var vec__12933 = cljs.core.first(col_map_seq);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12933,(0),null);
var infos = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12933,(1),null);
var G__12943 = cljs.core.next(col_map_seq);
var G__12944 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new_cols,col,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (col_map_seq,new_cols,line_map_seq,new_lines,vec__12933,col,infos,vec__12930,line,col_map){
return (function (v,p__12936){
var map__12937 = p__12936;
var map__12937__$1 = ((((!((map__12937 == null)))?((((map__12937.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__12937.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12937):map__12937);
var gline = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12937__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12937__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(js_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline,gcol], null)));
});})(col_map_seq,new_cols,line_map_seq,new_lines,vec__12933,col,infos,vec__12930,line,col_map))
,cljs.core.PersistentVector.EMPTY,infos));
col_map_seq = G__12943;
new_cols = G__12944;
continue;
} else {
return new_cols;
}
break;
}
})();
var G__12947 = cljs.core.next(line_map_seq);
var G__12948 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new_lines,line,new_cols);
line_map_seq = G__12947;
new_lines = G__12948;
continue;
} else {
return new_lines;
}
break;
}
});
/**
 * Given a ClojureScript to JavaScript source map, invert it. Useful when
 * mapping JavaScript stack traces when environment support is unavailable.
 */
cljs.source_map.invert_reverse_map = (function cljs$source_map$invert_reverse_map(reverse_map){
var inverted = (function (){var G__13058 = cljs.core.sorted_map();
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13058) : cljs.core.atom.call(null,G__13058));
})();
var seq__13060_13136 = cljs.core.seq(reverse_map);
var chunk__13061_13137 = null;
var count__13062_13138 = (0);
var i__13063_13139 = (0);
while(true){
if((i__13063_13139 < count__13062_13138)){
var vec__13065_13140 = chunk__13061_13137.cljs$core$IIndexed$_nth$arity$2(null,i__13063_13139);
var line_13141 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13065_13140,(0),null);
var columns_13142 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13065_13140,(1),null);
var seq__13068_13143 = cljs.core.seq(columns_13142);
var chunk__13069_13144 = null;
var count__13070_13145 = (0);
var i__13071_13146 = (0);
while(true){
if((i__13071_13146 < count__13070_13145)){
var vec__13073_13147 = chunk__13069_13144.cljs$core$IIndexed$_nth$arity$2(null,i__13071_13146);
var column_13148 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13073_13147,(0),null);
var column_info_13149 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13073_13147,(1),null);
var seq__13076_13150 = cljs.core.seq(column_info_13149);
var chunk__13077_13151 = null;
var count__13078_13152 = (0);
var i__13079_13153 = (0);
while(true){
if((i__13079_13153 < count__13078_13152)){
var map__13080_13154 = chunk__13077_13151.cljs$core$IIndexed$_nth$arity$2(null,i__13079_13153);
var map__13080_13155__$1 = ((((!((map__13080_13154 == null)))?((((map__13080_13154.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13080_13154.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13080_13154):map__13080_13154);
var gline_13156 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13080_13155__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13157 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13080_13155__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13158 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13080_13155__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13156], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13076_13150,chunk__13077_13151,count__13078_13152,i__13079_13153,seq__13068_13143,chunk__13069_13144,count__13070_13145,i__13071_13146,seq__13060_13136,chunk__13061_13137,count__13062_13138,i__13063_13139,map__13080_13154,map__13080_13155__$1,gline_13156,gcol_13157,name_13158,vec__13073_13147,column_13148,column_info_13149,vec__13065_13140,line_13141,columns_13142,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13157], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13141,new cljs.core.Keyword(null,"col","col",-1959363084),column_13148,new cljs.core.Keyword(null,"name","name",1843675177),name_13158], null));
});})(seq__13076_13150,chunk__13077_13151,count__13078_13152,i__13079_13153,seq__13068_13143,chunk__13069_13144,count__13070_13145,i__13071_13146,seq__13060_13136,chunk__13061_13137,count__13062_13138,i__13063_13139,map__13080_13154,map__13080_13155__$1,gline_13156,gcol_13157,name_13158,vec__13073_13147,column_13148,column_info_13149,vec__13065_13140,line_13141,columns_13142,inverted))
,cljs.core.sorted_map()));

var G__13159 = seq__13076_13150;
var G__13160 = chunk__13077_13151;
var G__13161 = count__13078_13152;
var G__13162 = (i__13079_13153 + (1));
seq__13076_13150 = G__13159;
chunk__13077_13151 = G__13160;
count__13078_13152 = G__13161;
i__13079_13153 = G__13162;
continue;
} else {
var temp__6753__auto___13163 = cljs.core.seq(seq__13076_13150);
if(temp__6753__auto___13163){
var seq__13076_13164__$1 = temp__6753__auto___13163;
if(cljs.core.chunked_seq_QMARK_(seq__13076_13164__$1)){
var c__8429__auto___13165 = cljs.core.chunk_first(seq__13076_13164__$1);
var G__13166 = cljs.core.chunk_rest(seq__13076_13164__$1);
var G__13167 = c__8429__auto___13165;
var G__13168 = cljs.core.count(c__8429__auto___13165);
var G__13169 = (0);
seq__13076_13150 = G__13166;
chunk__13077_13151 = G__13167;
count__13078_13152 = G__13168;
i__13079_13153 = G__13169;
continue;
} else {
var map__13083_13170 = cljs.core.first(seq__13076_13164__$1);
var map__13083_13171__$1 = ((((!((map__13083_13170 == null)))?((((map__13083_13170.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13083_13170.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13083_13170):map__13083_13170);
var gline_13172 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13083_13171__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13173 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13083_13171__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13174 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13083_13171__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13172], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13076_13150,chunk__13077_13151,count__13078_13152,i__13079_13153,seq__13068_13143,chunk__13069_13144,count__13070_13145,i__13071_13146,seq__13060_13136,chunk__13061_13137,count__13062_13138,i__13063_13139,map__13083_13170,map__13083_13171__$1,gline_13172,gcol_13173,name_13174,seq__13076_13164__$1,temp__6753__auto___13163,vec__13073_13147,column_13148,column_info_13149,vec__13065_13140,line_13141,columns_13142,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13173], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13141,new cljs.core.Keyword(null,"col","col",-1959363084),column_13148,new cljs.core.Keyword(null,"name","name",1843675177),name_13174], null));
});})(seq__13076_13150,chunk__13077_13151,count__13078_13152,i__13079_13153,seq__13068_13143,chunk__13069_13144,count__13070_13145,i__13071_13146,seq__13060_13136,chunk__13061_13137,count__13062_13138,i__13063_13139,map__13083_13170,map__13083_13171__$1,gline_13172,gcol_13173,name_13174,seq__13076_13164__$1,temp__6753__auto___13163,vec__13073_13147,column_13148,column_info_13149,vec__13065_13140,line_13141,columns_13142,inverted))
,cljs.core.sorted_map()));

var G__13175 = cljs.core.next(seq__13076_13164__$1);
var G__13176 = null;
var G__13177 = (0);
var G__13178 = (0);
seq__13076_13150 = G__13175;
chunk__13077_13151 = G__13176;
count__13078_13152 = G__13177;
i__13079_13153 = G__13178;
continue;
}
} else {
}
}
break;
}

var G__13183 = seq__13068_13143;
var G__13184 = chunk__13069_13144;
var G__13185 = count__13070_13145;
var G__13186 = (i__13071_13146 + (1));
seq__13068_13143 = G__13183;
chunk__13069_13144 = G__13184;
count__13070_13145 = G__13185;
i__13071_13146 = G__13186;
continue;
} else {
var temp__6753__auto___13187 = cljs.core.seq(seq__13068_13143);
if(temp__6753__auto___13187){
var seq__13068_13188__$1 = temp__6753__auto___13187;
if(cljs.core.chunked_seq_QMARK_(seq__13068_13188__$1)){
var c__8429__auto___13189 = cljs.core.chunk_first(seq__13068_13188__$1);
var G__13190 = cljs.core.chunk_rest(seq__13068_13188__$1);
var G__13191 = c__8429__auto___13189;
var G__13192 = cljs.core.count(c__8429__auto___13189);
var G__13193 = (0);
seq__13068_13143 = G__13190;
chunk__13069_13144 = G__13191;
count__13070_13145 = G__13192;
i__13071_13146 = G__13193;
continue;
} else {
var vec__13085_13194 = cljs.core.first(seq__13068_13188__$1);
var column_13195 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13085_13194,(0),null);
var column_info_13196 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13085_13194,(1),null);
var seq__13088_13197 = cljs.core.seq(column_info_13196);
var chunk__13089_13198 = null;
var count__13090_13199 = (0);
var i__13091_13200 = (0);
while(true){
if((i__13091_13200 < count__13090_13199)){
var map__13092_13201 = chunk__13089_13198.cljs$core$IIndexed$_nth$arity$2(null,i__13091_13200);
var map__13092_13202__$1 = ((((!((map__13092_13201 == null)))?((((map__13092_13201.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13092_13201.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13092_13201):map__13092_13201);
var gline_13203 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13092_13202__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13204 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13092_13202__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13205 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13092_13202__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13203], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13088_13197,chunk__13089_13198,count__13090_13199,i__13091_13200,seq__13068_13143,chunk__13069_13144,count__13070_13145,i__13071_13146,seq__13060_13136,chunk__13061_13137,count__13062_13138,i__13063_13139,map__13092_13201,map__13092_13202__$1,gline_13203,gcol_13204,name_13205,vec__13085_13194,column_13195,column_info_13196,seq__13068_13188__$1,temp__6753__auto___13187,vec__13065_13140,line_13141,columns_13142,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13204], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13141,new cljs.core.Keyword(null,"col","col",-1959363084),column_13195,new cljs.core.Keyword(null,"name","name",1843675177),name_13205], null));
});})(seq__13088_13197,chunk__13089_13198,count__13090_13199,i__13091_13200,seq__13068_13143,chunk__13069_13144,count__13070_13145,i__13071_13146,seq__13060_13136,chunk__13061_13137,count__13062_13138,i__13063_13139,map__13092_13201,map__13092_13202__$1,gline_13203,gcol_13204,name_13205,vec__13085_13194,column_13195,column_info_13196,seq__13068_13188__$1,temp__6753__auto___13187,vec__13065_13140,line_13141,columns_13142,inverted))
,cljs.core.sorted_map()));

var G__13227 = seq__13088_13197;
var G__13228 = chunk__13089_13198;
var G__13229 = count__13090_13199;
var G__13230 = (i__13091_13200 + (1));
seq__13088_13197 = G__13227;
chunk__13089_13198 = G__13228;
count__13090_13199 = G__13229;
i__13091_13200 = G__13230;
continue;
} else {
var temp__6753__auto___13231__$1 = cljs.core.seq(seq__13088_13197);
if(temp__6753__auto___13231__$1){
var seq__13088_13232__$1 = temp__6753__auto___13231__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13088_13232__$1)){
var c__8429__auto___13233 = cljs.core.chunk_first(seq__13088_13232__$1);
var G__13234 = cljs.core.chunk_rest(seq__13088_13232__$1);
var G__13235 = c__8429__auto___13233;
var G__13236 = cljs.core.count(c__8429__auto___13233);
var G__13237 = (0);
seq__13088_13197 = G__13234;
chunk__13089_13198 = G__13235;
count__13090_13199 = G__13236;
i__13091_13200 = G__13237;
continue;
} else {
var map__13094_13238 = cljs.core.first(seq__13088_13232__$1);
var map__13094_13239__$1 = ((((!((map__13094_13238 == null)))?((((map__13094_13238.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13094_13238.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13094_13238):map__13094_13238);
var gline_13240 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13094_13239__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13241 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13094_13239__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13242 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13094_13239__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13240], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13088_13197,chunk__13089_13198,count__13090_13199,i__13091_13200,seq__13068_13143,chunk__13069_13144,count__13070_13145,i__13071_13146,seq__13060_13136,chunk__13061_13137,count__13062_13138,i__13063_13139,map__13094_13238,map__13094_13239__$1,gline_13240,gcol_13241,name_13242,seq__13088_13232__$1,temp__6753__auto___13231__$1,vec__13085_13194,column_13195,column_info_13196,seq__13068_13188__$1,temp__6753__auto___13187,vec__13065_13140,line_13141,columns_13142,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13241], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13141,new cljs.core.Keyword(null,"col","col",-1959363084),column_13195,new cljs.core.Keyword(null,"name","name",1843675177),name_13242], null));
});})(seq__13088_13197,chunk__13089_13198,count__13090_13199,i__13091_13200,seq__13068_13143,chunk__13069_13144,count__13070_13145,i__13071_13146,seq__13060_13136,chunk__13061_13137,count__13062_13138,i__13063_13139,map__13094_13238,map__13094_13239__$1,gline_13240,gcol_13241,name_13242,seq__13088_13232__$1,temp__6753__auto___13231__$1,vec__13085_13194,column_13195,column_info_13196,seq__13068_13188__$1,temp__6753__auto___13187,vec__13065_13140,line_13141,columns_13142,inverted))
,cljs.core.sorted_map()));

var G__13243 = cljs.core.next(seq__13088_13232__$1);
var G__13244 = null;
var G__13245 = (0);
var G__13246 = (0);
seq__13088_13197 = G__13243;
chunk__13089_13198 = G__13244;
count__13090_13199 = G__13245;
i__13091_13200 = G__13246;
continue;
}
} else {
}
}
break;
}

var G__13247 = cljs.core.next(seq__13068_13188__$1);
var G__13248 = null;
var G__13249 = (0);
var G__13250 = (0);
seq__13068_13143 = G__13247;
chunk__13069_13144 = G__13248;
count__13070_13145 = G__13249;
i__13071_13146 = G__13250;
continue;
}
} else {
}
}
break;
}

var G__13255 = seq__13060_13136;
var G__13256 = chunk__13061_13137;
var G__13257 = count__13062_13138;
var G__13258 = (i__13063_13139 + (1));
seq__13060_13136 = G__13255;
chunk__13061_13137 = G__13256;
count__13062_13138 = G__13257;
i__13063_13139 = G__13258;
continue;
} else {
var temp__6753__auto___13259 = cljs.core.seq(seq__13060_13136);
if(temp__6753__auto___13259){
var seq__13060_13260__$1 = temp__6753__auto___13259;
if(cljs.core.chunked_seq_QMARK_(seq__13060_13260__$1)){
var c__8429__auto___13261 = cljs.core.chunk_first(seq__13060_13260__$1);
var G__13262 = cljs.core.chunk_rest(seq__13060_13260__$1);
var G__13263 = c__8429__auto___13261;
var G__13264 = cljs.core.count(c__8429__auto___13261);
var G__13265 = (0);
seq__13060_13136 = G__13262;
chunk__13061_13137 = G__13263;
count__13062_13138 = G__13264;
i__13063_13139 = G__13265;
continue;
} else {
var vec__13097_13266 = cljs.core.first(seq__13060_13260__$1);
var line_13267 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13097_13266,(0),null);
var columns_13268 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13097_13266,(1),null);
var seq__13100_13269 = cljs.core.seq(columns_13268);
var chunk__13101_13270 = null;
var count__13102_13271 = (0);
var i__13103_13272 = (0);
while(true){
if((i__13103_13272 < count__13102_13271)){
var vec__13105_13273 = chunk__13101_13270.cljs$core$IIndexed$_nth$arity$2(null,i__13103_13272);
var column_13274 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13105_13273,(0),null);
var column_info_13275 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13105_13273,(1),null);
var seq__13108_13280 = cljs.core.seq(column_info_13275);
var chunk__13109_13281 = null;
var count__13110_13282 = (0);
var i__13111_13283 = (0);
while(true){
if((i__13111_13283 < count__13110_13282)){
var map__13112_13289 = chunk__13109_13281.cljs$core$IIndexed$_nth$arity$2(null,i__13111_13283);
var map__13112_13290__$1 = ((((!((map__13112_13289 == null)))?((((map__13112_13289.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13112_13289.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13112_13289):map__13112_13289);
var gline_13291 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13112_13290__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13292 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13112_13290__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13293 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13112_13290__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13291], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13108_13280,chunk__13109_13281,count__13110_13282,i__13111_13283,seq__13100_13269,chunk__13101_13270,count__13102_13271,i__13103_13272,seq__13060_13136,chunk__13061_13137,count__13062_13138,i__13063_13139,map__13112_13289,map__13112_13290__$1,gline_13291,gcol_13292,name_13293,vec__13105_13273,column_13274,column_info_13275,vec__13097_13266,line_13267,columns_13268,seq__13060_13260__$1,temp__6753__auto___13259,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13292], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13267,new cljs.core.Keyword(null,"col","col",-1959363084),column_13274,new cljs.core.Keyword(null,"name","name",1843675177),name_13293], null));
});})(seq__13108_13280,chunk__13109_13281,count__13110_13282,i__13111_13283,seq__13100_13269,chunk__13101_13270,count__13102_13271,i__13103_13272,seq__13060_13136,chunk__13061_13137,count__13062_13138,i__13063_13139,map__13112_13289,map__13112_13290__$1,gline_13291,gcol_13292,name_13293,vec__13105_13273,column_13274,column_info_13275,vec__13097_13266,line_13267,columns_13268,seq__13060_13260__$1,temp__6753__auto___13259,inverted))
,cljs.core.sorted_map()));

var G__13306 = seq__13108_13280;
var G__13307 = chunk__13109_13281;
var G__13308 = count__13110_13282;
var G__13309 = (i__13111_13283 + (1));
seq__13108_13280 = G__13306;
chunk__13109_13281 = G__13307;
count__13110_13282 = G__13308;
i__13111_13283 = G__13309;
continue;
} else {
var temp__6753__auto___13310__$1 = cljs.core.seq(seq__13108_13280);
if(temp__6753__auto___13310__$1){
var seq__13108_13311__$1 = temp__6753__auto___13310__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13108_13311__$1)){
var c__8429__auto___13312 = cljs.core.chunk_first(seq__13108_13311__$1);
var G__13313 = cljs.core.chunk_rest(seq__13108_13311__$1);
var G__13314 = c__8429__auto___13312;
var G__13315 = cljs.core.count(c__8429__auto___13312);
var G__13316 = (0);
seq__13108_13280 = G__13313;
chunk__13109_13281 = G__13314;
count__13110_13282 = G__13315;
i__13111_13283 = G__13316;
continue;
} else {
var map__13117_13321 = cljs.core.first(seq__13108_13311__$1);
var map__13117_13322__$1 = ((((!((map__13117_13321 == null)))?((((map__13117_13321.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13117_13321.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13117_13321):map__13117_13321);
var gline_13323 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13117_13322__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13324 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13117_13322__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13325 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13117_13322__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13323], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13108_13280,chunk__13109_13281,count__13110_13282,i__13111_13283,seq__13100_13269,chunk__13101_13270,count__13102_13271,i__13103_13272,seq__13060_13136,chunk__13061_13137,count__13062_13138,i__13063_13139,map__13117_13321,map__13117_13322__$1,gline_13323,gcol_13324,name_13325,seq__13108_13311__$1,temp__6753__auto___13310__$1,vec__13105_13273,column_13274,column_info_13275,vec__13097_13266,line_13267,columns_13268,seq__13060_13260__$1,temp__6753__auto___13259,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13324], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13267,new cljs.core.Keyword(null,"col","col",-1959363084),column_13274,new cljs.core.Keyword(null,"name","name",1843675177),name_13325], null));
});})(seq__13108_13280,chunk__13109_13281,count__13110_13282,i__13111_13283,seq__13100_13269,chunk__13101_13270,count__13102_13271,i__13103_13272,seq__13060_13136,chunk__13061_13137,count__13062_13138,i__13063_13139,map__13117_13321,map__13117_13322__$1,gline_13323,gcol_13324,name_13325,seq__13108_13311__$1,temp__6753__auto___13310__$1,vec__13105_13273,column_13274,column_info_13275,vec__13097_13266,line_13267,columns_13268,seq__13060_13260__$1,temp__6753__auto___13259,inverted))
,cljs.core.sorted_map()));

var G__13335 = cljs.core.next(seq__13108_13311__$1);
var G__13336 = null;
var G__13337 = (0);
var G__13338 = (0);
seq__13108_13280 = G__13335;
chunk__13109_13281 = G__13336;
count__13110_13282 = G__13337;
i__13111_13283 = G__13338;
continue;
}
} else {
}
}
break;
}

var G__13342 = seq__13100_13269;
var G__13343 = chunk__13101_13270;
var G__13344 = count__13102_13271;
var G__13345 = (i__13103_13272 + (1));
seq__13100_13269 = G__13342;
chunk__13101_13270 = G__13343;
count__13102_13271 = G__13344;
i__13103_13272 = G__13345;
continue;
} else {
var temp__6753__auto___13350__$1 = cljs.core.seq(seq__13100_13269);
if(temp__6753__auto___13350__$1){
var seq__13100_13351__$1 = temp__6753__auto___13350__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13100_13351__$1)){
var c__8429__auto___13353 = cljs.core.chunk_first(seq__13100_13351__$1);
var G__13358 = cljs.core.chunk_rest(seq__13100_13351__$1);
var G__13359 = c__8429__auto___13353;
var G__13360 = cljs.core.count(c__8429__auto___13353);
var G__13361 = (0);
seq__13100_13269 = G__13358;
chunk__13101_13270 = G__13359;
count__13102_13271 = G__13360;
i__13103_13272 = G__13361;
continue;
} else {
var vec__13121_13362 = cljs.core.first(seq__13100_13351__$1);
var column_13363 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13121_13362,(0),null);
var column_info_13364 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13121_13362,(1),null);
var seq__13125_13365 = cljs.core.seq(column_info_13364);
var chunk__13126_13366 = null;
var count__13127_13367 = (0);
var i__13128_13368 = (0);
while(true){
if((i__13128_13368 < count__13127_13367)){
var map__13130_13369 = chunk__13126_13366.cljs$core$IIndexed$_nth$arity$2(null,i__13128_13368);
var map__13130_13370__$1 = ((((!((map__13130_13369 == null)))?((((map__13130_13369.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13130_13369.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13130_13369):map__13130_13369);
var gline_13371 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13130_13370__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13372 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13130_13370__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13373 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13130_13370__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13371], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13125_13365,chunk__13126_13366,count__13127_13367,i__13128_13368,seq__13100_13269,chunk__13101_13270,count__13102_13271,i__13103_13272,seq__13060_13136,chunk__13061_13137,count__13062_13138,i__13063_13139,map__13130_13369,map__13130_13370__$1,gline_13371,gcol_13372,name_13373,vec__13121_13362,column_13363,column_info_13364,seq__13100_13351__$1,temp__6753__auto___13350__$1,vec__13097_13266,line_13267,columns_13268,seq__13060_13260__$1,temp__6753__auto___13259,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13372], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13267,new cljs.core.Keyword(null,"col","col",-1959363084),column_13363,new cljs.core.Keyword(null,"name","name",1843675177),name_13373], null));
});})(seq__13125_13365,chunk__13126_13366,count__13127_13367,i__13128_13368,seq__13100_13269,chunk__13101_13270,count__13102_13271,i__13103_13272,seq__13060_13136,chunk__13061_13137,count__13062_13138,i__13063_13139,map__13130_13369,map__13130_13370__$1,gline_13371,gcol_13372,name_13373,vec__13121_13362,column_13363,column_info_13364,seq__13100_13351__$1,temp__6753__auto___13350__$1,vec__13097_13266,line_13267,columns_13268,seq__13060_13260__$1,temp__6753__auto___13259,inverted))
,cljs.core.sorted_map()));

var G__13374 = seq__13125_13365;
var G__13375 = chunk__13126_13366;
var G__13376 = count__13127_13367;
var G__13377 = (i__13128_13368 + (1));
seq__13125_13365 = G__13374;
chunk__13126_13366 = G__13375;
count__13127_13367 = G__13376;
i__13128_13368 = G__13377;
continue;
} else {
var temp__6753__auto___13378__$2 = cljs.core.seq(seq__13125_13365);
if(temp__6753__auto___13378__$2){
var seq__13125_13379__$1 = temp__6753__auto___13378__$2;
if(cljs.core.chunked_seq_QMARK_(seq__13125_13379__$1)){
var c__8429__auto___13380 = cljs.core.chunk_first(seq__13125_13379__$1);
var G__13381 = cljs.core.chunk_rest(seq__13125_13379__$1);
var G__13382 = c__8429__auto___13380;
var G__13383 = cljs.core.count(c__8429__auto___13380);
var G__13384 = (0);
seq__13125_13365 = G__13381;
chunk__13126_13366 = G__13382;
count__13127_13367 = G__13383;
i__13128_13368 = G__13384;
continue;
} else {
var map__13132_13386 = cljs.core.first(seq__13125_13379__$1);
var map__13132_13387__$1 = ((((!((map__13132_13386 == null)))?((((map__13132_13386.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13132_13386.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13132_13386):map__13132_13386);
var gline_13388 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13132_13387__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13389 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13132_13387__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13390 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13132_13387__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13388], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13125_13365,chunk__13126_13366,count__13127_13367,i__13128_13368,seq__13100_13269,chunk__13101_13270,count__13102_13271,i__13103_13272,seq__13060_13136,chunk__13061_13137,count__13062_13138,i__13063_13139,map__13132_13386,map__13132_13387__$1,gline_13388,gcol_13389,name_13390,seq__13125_13379__$1,temp__6753__auto___13378__$2,vec__13121_13362,column_13363,column_info_13364,seq__13100_13351__$1,temp__6753__auto___13350__$1,vec__13097_13266,line_13267,columns_13268,seq__13060_13260__$1,temp__6753__auto___13259,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13389], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13267,new cljs.core.Keyword(null,"col","col",-1959363084),column_13363,new cljs.core.Keyword(null,"name","name",1843675177),name_13390], null));
});})(seq__13125_13365,chunk__13126_13366,count__13127_13367,i__13128_13368,seq__13100_13269,chunk__13101_13270,count__13102_13271,i__13103_13272,seq__13060_13136,chunk__13061_13137,count__13062_13138,i__13063_13139,map__13132_13386,map__13132_13387__$1,gline_13388,gcol_13389,name_13390,seq__13125_13379__$1,temp__6753__auto___13378__$2,vec__13121_13362,column_13363,column_info_13364,seq__13100_13351__$1,temp__6753__auto___13350__$1,vec__13097_13266,line_13267,columns_13268,seq__13060_13260__$1,temp__6753__auto___13259,inverted))
,cljs.core.sorted_map()));

var G__13393 = cljs.core.next(seq__13125_13379__$1);
var G__13394 = null;
var G__13395 = (0);
var G__13396 = (0);
seq__13125_13365 = G__13393;
chunk__13126_13366 = G__13394;
count__13127_13367 = G__13395;
i__13128_13368 = G__13396;
continue;
}
} else {
}
}
break;
}

var G__13400 = cljs.core.next(seq__13100_13351__$1);
var G__13401 = null;
var G__13402 = (0);
var G__13403 = (0);
seq__13100_13269 = G__13400;
chunk__13101_13270 = G__13401;
count__13102_13271 = G__13402;
i__13103_13272 = G__13403;
continue;
}
} else {
}
}
break;
}

var G__13412 = cljs.core.next(seq__13060_13260__$1);
var G__13413 = null;
var G__13414 = (0);
var G__13415 = (0);
seq__13060_13136 = G__13412;
chunk__13061_13137 = G__13413;
count__13062_13138 = G__13414;
i__13063_13139 = G__13415;
continue;
}
} else {
}
}
break;
}

return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inverted) : cljs.core.deref.call(null,inverted));
});
