// Compiled by ClojureScript 1.9.293 {:static-fns true, :optimize-constants false, :target :nodejs}
goog.provide('lumo.repl');
goog.require('cljs.core');
goog.require('cljs.js');
goog.require('lumo.repl_resources');
goog.require('lumo.js_deps');
goog.require('cljs.tools.reader');
goog.require('cljs.tagged_literals');
goog.require('cljs.tools.reader.reader_types');
goog.require('cljs.env');
goog.require('cljs.analyzer');
goog.require('cognitect.transit');
goog.require('goog.string.StringBuffer');
goog.require('clojure.string');
goog.require('lazy_map.core');
goog.require('cljs.repl');
goog.require('cljs.reader');
lumo.repl._STAR_loading_foreign_STAR_ = false;
if(typeof lumo.repl.st !== 'undefined'){
} else {
lumo.repl.st = cljs.js.empty_state.cljs$core$IFn$_invoke$arity$0();
}
if(typeof lumo.repl.current_ns !== 'undefined'){
} else {
lumo.repl.current_ns = cljs.core.volatile_BANG_(new cljs.core.Symbol(null,"cljs.user","cljs.user",877795071,null));
}
if(typeof lumo.repl.app_opts !== 'undefined'){
} else {
lumo.repl.app_opts = cljs.core.volatile_BANG_(null);
}
lumo.repl.could_not_eval_regex = /Could not eval/;
lumo.repl.MACROS_SUFFIX = "$macros";
lumo.repl.JS_EXT = ".js";
lumo.repl.JSON_EXT = ".json";
lumo.repl.transit_json__GT_cljs = (function lumo$repl$transit_json__GT_cljs(json){
var rdr = cognitect.transit.reader.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"json","json",1279968570));
return cognitect.transit.read(rdr,json);
});
lumo.repl.cljs__GT_transit_json = (function lumo$repl$cljs__GT_transit_json(x){
var wtr = cognitect.transit.writer.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"json","json",1279968570));
return cognitect.transit.write(wtr,x);
});
lumo.repl.load_core_analysis_cache = (function lumo$repl$load_core_analysis_cache(eager_QMARK_,ns_sym,file_prefix){
var keys = new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"rename-macros","rename-macros",1076432512),new cljs.core.Keyword(null,"renames","renames",343278368),new cljs.core.Keyword(null,"use-macros","use-macros",-905638393),new cljs.core.Keyword(null,"excludes","excludes",-1791725945),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"imports","imports",-1249933394),new cljs.core.Keyword(null,"requires","requires",-1201390927),new cljs.core.Keyword(null,"uses","uses",232664692),new cljs.core.Keyword(null,"defs","defs",1398449717),new cljs.core.Keyword(null,"require-macros","require-macros",707947416),new cljs.core.Keyword("cljs.analyzer","constants","cljs.analyzer/constants",1697083770),new cljs.core.Keyword(null,"doc","doc",1913296891)], null);
var load_key = ((function (keys){
return (function lumo$repl$load_core_analysis_cache_$_load_key(key){
var resource = (function (){var G__22113 = [cljs.core.str(file_prefix),cljs.core.str(cljs.core.munge(key)),cljs.core.str(lumo.repl.JSON_EXT)].join('');
return LUMO_LOAD(G__22113);
})();
return lumo.repl.transit_json__GT_cljs(resource);
});})(keys))
;
var lazy_load_key = ((function (keys){
return (function lumo$repl$load_core_analysis_cache_$_lazy_load_key(key){
return load_key(key);
});})(keys))
;
return cljs.js.load_analysis_cache_BANG_(lumo.repl.st,ns_sym,(cljs.core.truth_(eager_QMARK_)?cljs.core.zipmap(keys,cljs.core.map.cljs$core$IFn$_invoke$arity$2(load_key,keys)):(new lazy_map.core.LazyMap(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"rename-macros","rename-macros",1076432512),new cljs.core.Keyword(null,"renames","renames",343278368),new cljs.core.Keyword(null,"use-macros","use-macros",-905638393),new cljs.core.Keyword(null,"excludes","excludes",-1791725945),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"imports","imports",-1249933394),new cljs.core.Keyword(null,"requires","requires",-1201390927),new cljs.core.Keyword(null,"uses","uses",232664692),new cljs.core.Keyword(null,"defs","defs",1398449717),new cljs.core.Keyword(null,"require-macros","require-macros",707947416),new cljs.core.Keyword("cljs.analyzer","constants","cljs.analyzer/constants",1697083770),new cljs.core.Keyword(null,"doc","doc",1913296891)],[(new cljs.core.Delay(((function (keys){
return (function (){
return lazy_load_key(new cljs.core.Keyword(null,"rename-macros","rename-macros",1076432512));
});})(keys))
,null)),(new cljs.core.Delay(((function (keys){
return (function (){
return lazy_load_key(new cljs.core.Keyword(null,"renames","renames",343278368));
});})(keys))
,null)),(new cljs.core.Delay(((function (keys){
return (function (){
return lazy_load_key(new cljs.core.Keyword(null,"use-macros","use-macros",-905638393));
});})(keys))
,null)),(new cljs.core.Delay(((function (keys){
return (function (){
return lazy_load_key(new cljs.core.Keyword(null,"excludes","excludes",-1791725945));
});})(keys))
,null)),(new cljs.core.Delay(((function (keys){
return (function (){
return lazy_load_key(new cljs.core.Keyword(null,"name","name",1843675177));
});})(keys))
,null)),(new cljs.core.Delay(((function (keys){
return (function (){
return lazy_load_key(new cljs.core.Keyword(null,"imports","imports",-1249933394));
});})(keys))
,null)),(new cljs.core.Delay(((function (keys){
return (function (){
return lazy_load_key(new cljs.core.Keyword(null,"requires","requires",-1201390927));
});})(keys))
,null)),(new cljs.core.Delay(((function (keys){
return (function (){
return lazy_load_key(new cljs.core.Keyword(null,"uses","uses",232664692));
});})(keys))
,null)),(new cljs.core.Delay(((function (keys){
return (function (){
return lazy_load_key(new cljs.core.Keyword(null,"defs","defs",1398449717));
});})(keys))
,null)),(new cljs.core.Delay(((function (keys){
return (function (){
return lazy_load_key(new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
});})(keys))
,null)),(new cljs.core.Delay(((function (keys){
return (function (){
return lazy_load_key(new cljs.core.Keyword("cljs.analyzer","constants","cljs.analyzer/constants",1697083770));
});})(keys))
,null)),(new cljs.core.Delay(((function (keys){
return (function (){
return lazy_load_key(new cljs.core.Keyword(null,"doc","doc",1913296891));
});})(keys))
,null))])))));
});
lumo.repl.load_core_analysis_caches = (function lumo$repl$load_core_analysis_caches(eager_QMARK_){
lumo.repl.load_core_analysis_cache(eager_QMARK_,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null),"cljs/core.cljs.cache.aot.");

return lumo.repl.load_core_analysis_cache(eager_QMARK_,new cljs.core.Symbol(null,"cljs.core$macros","cljs.core$macros",-2057787548,null),"cljs/core$macros.cljc.cache.");
});
/**
 * Converts a filename to a lang keyword by inspecting the file
 *   extension.
 */
lumo.repl.filename__GT_lang = (function lumo$repl$filename__GT_lang(filename){
if(clojure.string.ends_with_QMARK_(filename,lumo.repl.JS_EXT)){
return new cljs.core.Keyword(null,"js","js",1768080579);
} else {
return new cljs.core.Keyword(null,"clj","clj",-660495428);
}
});
/**
 * Replaces the extension on a file.
 */
lumo.repl.replace_extension = (function lumo$repl$replace_extension(filename,new_extension){
return clojure.string.replace(filename,/.clj[sc]?$/,new_extension);
});
/**
 * Parses edn source to Clojure data.
 */
lumo.repl.parse_edn = (function lumo$repl$parse_edn(edn_source){
return cljs.reader.read_string(edn_source);
});
/**
 * Produces a sequence of filenames to try reading, in the
 *   order they should be tried.
 */
lumo.repl.filenames_to_try = (function lumo$repl$filenames_to_try(macros,path){
var extensions = (cljs.core.truth_(macros)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".clj",".cljc"], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [".cljs",".cljc",".js"], null));
var iter__8380__auto__ = ((function (extensions){
return (function lumo$repl$filenames_to_try_$_iter__22127(s__22128){
return (new cljs.core.LazySeq(null,((function (extensions){
return (function (){
var s__22128__$1 = s__22128;
while(true){
var temp__6753__auto__ = cljs.core.seq(s__22128__$1);
if(temp__6753__auto__){
var s__22128__$2 = temp__6753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22128__$2)){
var c__8378__auto__ = cljs.core.chunk_first(s__22128__$2);
var size__8379__auto__ = cljs.core.count(c__8378__auto__);
var b__22130 = cljs.core.chunk_buffer(size__8379__auto__);
if((function (){var i__22129 = (0);
while(true){
if((i__22129 < size__8379__auto__)){
var extension = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__8378__auto__,i__22129);
cljs.core.chunk_append(b__22130,[cljs.core.str(path),cljs.core.str(extension)].join(''));

var G__22135 = (i__22129 + (1));
i__22129 = G__22135;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22130),lumo$repl$filenames_to_try_$_iter__22127(cljs.core.chunk_rest(s__22128__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22130),null);
}
} else {
var extension = cljs.core.first(s__22128__$2);
return cljs.core.cons([cljs.core.str(path),cljs.core.str(extension)].join(''),lumo$repl$filenames_to_try_$_iter__22127(cljs.core.rest(s__22128__$2)));
}
} else {
return null;
}
break;
}
});})(extensions))
,null,null));
});})(extensions))
;
return iter__8380__auto__(extensions);
});
/**
 * Loads a Google Closure implementation source file. `goog` namespaces are
 * actually already included in the bundle because we compile with simple
 * optimizations.
 */
lumo.repl.load_goog = (function lumo$repl$load_goog(name,cb){
var G__22137 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"source","source",-433931539),"",new cljs.core.Keyword(null,"lang","lang",-1819677104),new cljs.core.Keyword(null,"js","js",1768080579)], null);
return (cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(G__22137) : cb.call(null,G__22137));
});
/**
 * Indicates namespaces for which JS code is already loaded, but for which
 * we might need to load the corresponding analysis cache.
 */
lumo.repl.skip_load_js_QMARK_ = (function lumo$repl$skip_load_js_QMARK_(name,macros){
var and__7511__auto__ = cljs.core.not(macros);
if(and__7511__auto__){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 33, [new cljs.core.Symbol(null,"cljs.compiler","cljs.compiler",-77239712,null),null,new cljs.core.Symbol(null,"cljs.source-map.base64","cljs.source-map.base64",-1764326399,null),null,new cljs.core.Symbol(null,"lumo.classpath","lumo.classpath",-1798590814,null),null,new cljs.core.Symbol(null,"cljs.tools.reader.impl.commons","cljs.tools.reader.impl.commons",1569241026,null),null,new cljs.core.Symbol(null,"cljs.source-map.base64-vlq","cljs.source-map.base64-vlq",-397707708,null),null,new cljs.core.Symbol(null,"clojure.zip","clojure.zip",1232047716,null),null,new cljs.core.Symbol(null,"lumo.repl-resources","lumo.repl-resources",1414495908,null),null,new cljs.core.Symbol(null,"lumo.repl","lumo.repl",955582054,null),null,new cljs.core.Symbol(null,"cljs.tools.reader","cljs.tools.reader",-831293977,null),null,new cljs.core.Symbol(null,"clojure.core.reducers","clojure.core.reducers",2120855305,null),null,new cljs.core.Symbol(null,"cljs.js","cljs.js",474485962,null),null,new cljs.core.Symbol(null,"cljs.test","cljs.test",884805483,null),null,new cljs.core.Symbol(null,"cljs.tools.reader.reader-types","cljs.tools.reader.reader-types",-346100821,null),null,new cljs.core.Symbol(null,"cljs.analyzer.api","cljs.analyzer.api",1016020812,null),null,new cljs.core.Symbol(null,"cljs.env","cljs.env",-1810013139,null),null,new cljs.core.Symbol(null,"cognitect.transit","cognitect.transit",-750660177,null),null,new cljs.core.Symbol(null,"clojure.set","clojure.set",-630955632,null),null,new cljs.core.Symbol(null,"cljs.nodejs","cljs.nodejs",1856951313,null),null,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",-966900911,null),null,new cljs.core.Symbol(null,"cljs.tools.reader.impl.utils","cljs.tools.reader.impl.utils",1797659699,null),null,new cljs.core.Symbol(null,"cljs.tagged-literals","cljs.tagged-literals",387033363,null),null,new cljs.core.Symbol(null,"lumo.core","lumo.core",630198293,null),null,new cljs.core.Symbol(null,"cljs.spec.impl.gen","cljs.spec.impl.gen",-1804355371,null),null,new cljs.core.Symbol(null,"lumo.js-deps","lumo.js-deps",-1966439979,null),null,new cljs.core.Symbol(null,"cljs.analyzer","cljs.analyzer",1897881911,null),null,new cljs.core.Symbol(null,"lazy-map.core","lazy-map.core",462322712,null),null,new cljs.core.Symbol(null,"cljs.source-map","cljs.source-map",2108014936,null),null,new cljs.core.Symbol(null,"cljs.repl","cljs.repl",1767065658,null),null,new cljs.core.Symbol(null,"clojure.string","clojure.string",-1415552165,null),null,new cljs.core.Symbol(null,"clojure.data","clojure.data",-2083828516,null),null,new cljs.core.Symbol(null,"cljs.reader","cljs.reader",1327473948,null),null,new cljs.core.Symbol(null,"clojure.walk","clojure.walk",1625897340,null),null,new cljs.core.Symbol(null,"cljs.spec","cljs.spec",-1965249603,null),null], null), null).call(null,name);
} else {
return and__7511__auto__;
}
});
lumo.repl.skip_load_QMARK_ = (function lumo$repl$skip_load_QMARK_(name,macros_QMARK_){
return (cljs.core.truth_(macros_QMARK_)?new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 9, [new cljs.core.Symbol(null,"cljs.env.macros","cljs.env.macros",1542748640,null),null,new cljs.core.Symbol(null,"cljs.analyzer.macros","cljs.analyzer.macros",298494182,null),null,new cljs.core.Symbol(null,"cljs.js","cljs.js",474485962,null),null,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null),null,new cljs.core.Symbol(null,"cljs.tools.reader.reader-types","cljs.tools.reader.reader-types",-346100821,null),null,new cljs.core.Symbol(null,"cljs.compiler.macros","cljs.compiler.macros",750996207,null),null,new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",-966900911,null),null,new cljs.core.Symbol(null,"lazy-map.core","lazy-map.core",462322712,null),null,new cljs.core.Symbol(null,"cljs.repl","cljs.repl",1767065658,null),null], null), null):new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, [new cljs.core.Symbol(null,"com.cognitect.transit.util","com.cognitect.transit.util",1904904517,null),null,new cljs.core.Symbol(null,"com.cognitect.transit.impl.reader","com.cognitect.transit.impl.reader",1766776582,null),null,new cljs.core.Symbol(null,"com.cognitect.transit.eq","com.cognitect.transit.eq",-1287663417,null),null,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null),null,new cljs.core.Symbol(null,"com.cognitect.transit.types","com.cognitect.transit.types",-696098260,null),null,new cljs.core.Symbol(null,"com.cognitect.transit.delimiters","com.cognitect.transit.delimiters",1417763597,null),null,new cljs.core.Symbol(null,"com.cognitect.transit.impl.decoder","com.cognitect.transit.impl.decoder",-1549501619,null),null,new cljs.core.Symbol(null,"com.cognitect.transit.handlers","com.cognitect.transit.handlers",38735120,null),null,new cljs.core.Symbol(null,"com.cognitect.transit","com.cognitect.transit",-1293839816,null),null,new cljs.core.Symbol(null,"com.cognitect.transit.caching","com.cognitect.transit.caching",-2079242149,null),null,new cljs.core.Symbol(null,"com.cognitect.transit.impl.writer","com.cognitect.transit.impl.writer",-898356674,null),null], null), null)).call(null,name);
});
lumo.repl.load_bundled = (function lumo$repl$load_bundled(path,source,cb){
var temp__6753__auto__ = (function (){var G__22140 = [cljs.core.str(path),cljs.core.str(".cache.json")].join('');
return LUMO_LOAD(G__22140);
})();
if(cljs.core.truth_(temp__6753__auto__)){
var cache_json = temp__6753__auto__;
var G__22142_22150 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"source","source",-433931539),source,new cljs.core.Keyword(null,"lang","lang",-1819677104),new cljs.core.Keyword(null,"js","js",1768080579),new cljs.core.Keyword(null,"cache","cache",-1237023054),lumo.repl.transit_json__GT_cljs(cache_json)], null);
(cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(G__22142_22150) : cb.call(null,G__22142_22150));

return new cljs.core.Keyword(null,"loaded","loaded",-1246482293);
} else {
return null;
}
});
lumo.repl.load_foreign_lib = (function lumo$repl$load_foreign_lib(name,cb){
var files = lumo.js_deps.files_to_load(name);
var sources = cljs.core.map.cljs$core$IFn$_invoke$arity$2(LUMO_READ_SOURCE,files);
var _STAR_loading_foreign_STAR_22156 = lumo.repl._STAR_loading_foreign_STAR_;
lumo.repl._STAR_loading_foreign_STAR_ = true;

try{var G__22157_22159 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lang","lang",-1819677104),new cljs.core.Keyword(null,"js","js",1768080579),new cljs.core.Keyword(null,"source","source",-433931539),clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",sources)], null);
(cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(G__22157_22159) : cb.call(null,G__22157_22159));

return new cljs.core.Keyword(null,"loaded","loaded",-1246482293);
}finally {lumo.repl._STAR_loading_foreign_STAR_ = _STAR_loading_foreign_STAR_22156;
}});
lumo.repl.load_external = (function lumo$repl$load_external(path,file_path,macros_QMARK_,cb){
var cache_dir = new cljs.core.Keyword(null,"cache-path","cache-path",1799646239).cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.app_opts) : cljs.core.deref.call(null,lumo.repl.app_opts)));
var cache_prefix = [cljs.core.str(cache_dir),cljs.core.str("/"),cljs.core.str(cljs.core.munge(path)),cljs.core.str((cljs.core.truth_(macros_QMARK_)?lumo.repl.MACROS_SUFFIX:null))].join('');
var temp__6751__auto__ = (function (){var and__7511__auto__ = cache_dir;
if(cljs.core.truth_(and__7511__auto__)){
var G__22176 = [cljs.core.str(cache_prefix),cljs.core.str(lumo.repl.JS_EXT)].join('');
return LUMO_READ_CACHE(G__22176);
} else {
return and__7511__auto__;
}
})();
if(cljs.core.truth_(temp__6751__auto__)){
var cached_source = temp__6751__auto__;
var cache_json = (function (){var G__22178 = [cljs.core.str(cache_prefix),cljs.core.str(".cache.json")].join('');
return LUMO_READ_CACHE(G__22178);
})();
var G__22179_22189 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"lang","lang",-1819677104),new cljs.core.Keyword(null,"js","js",1768080579),new cljs.core.Keyword(null,"source","source",-433931539),cached_source,new cljs.core.Keyword(null,"filename","filename",-1428840783),[cljs.core.str(cache_prefix),cljs.core.str(lumo.repl.JS_EXT)].join(''),new cljs.core.Keyword(null,"cache","cache",-1237023054),lumo.repl.transit_json__GT_cljs(cache_json)], null);
(cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(G__22179_22189) : cb.call(null,G__22179_22189));

return new cljs.core.Keyword(null,"loaded","loaded",-1246482293);
} else {
var filename = file_path;
var temp__6753__auto__ = LUMO_READ_SOURCE(filename);
if(cljs.core.truth_(temp__6753__auto__)){
var source = temp__6753__auto__;
var ret_22190 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"lang","lang",-1819677104),lumo.repl.filename__GT_lang(filename),new cljs.core.Keyword(null,"file","file",-1269645878),filename,new cljs.core.Keyword(null,"source","source",-433931539),source], null);
if((clojure.string.ends_with_QMARK_(filename,".cljs")) || (clojure.string.ends_with_QMARK_(filename,".cljc"))){
var temp__6751__auto___22191__$1 = (function (){var G__22180 = lumo.repl.replace_extension(filename,lumo.repl.JS_EXT);
return LUMO_READ_SOURCE(G__22180);
})();
if(cljs.core.truth_(temp__6751__auto___22191__$1)){
var javascript_source_22192 = temp__6751__auto___22191__$1;
var temp__6751__auto___22193__$2 = (function (){var G__22181 = [cljs.core.str(filename),cljs.core.str(".cache.edn")].join('');
return LUMO_READ_SOURCE(G__22181);
})();
if(cljs.core.truth_(temp__6751__auto___22193__$2)){
var cache_edn_22200 = temp__6751__auto___22193__$2;
var G__22182_22201 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"lang","lang",-1819677104),new cljs.core.Keyword(null,"js","js",1768080579),new cljs.core.Keyword(null,"source","source",-433931539),javascript_source_22192,new cljs.core.Keyword(null,"cache","cache",-1237023054),lumo.repl.parse_edn(cache_edn_22200)], null);
(cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(G__22182_22201) : cb.call(null,G__22182_22201));
} else {
var temp__6751__auto___22203__$3 = (function (){var G__22183 = [cljs.core.str(filename),cljs.core.str(".cache.json")].join('');
return LUMO_READ_SOURCE(G__22183);
})();
if(cljs.core.truth_(temp__6751__auto___22203__$3)){
var cache_json_22205 = temp__6751__auto___22203__$3;
var G__22184_22206 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"lang","lang",-1819677104),new cljs.core.Keyword(null,"js","js",1768080579),new cljs.core.Keyword(null,"source","source",-433931539),javascript_source_22192,new cljs.core.Keyword(null,"cache","cache",-1237023054),lumo.repl.transit_json__GT_cljs(cache_json_22205)], null);
(cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(G__22184_22206) : cb.call(null,G__22184_22206));
} else {
(cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(ret_22190) : cb.call(null,ret_22190));
}
}
} else {
(cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(ret_22190) : cb.call(null,ret_22190));
}
} else {
(cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(ret_22190) : cb.call(null,ret_22190));
}

return new cljs.core.Keyword(null,"loaded","loaded",-1246482293);
} else {
return null;
}
}
});
lumo.repl.load_and_cb_BANG_ = (function lumo$repl$load_and_cb_BANG_(name,path,file_path,macros_QMARK_,cb){
var bundled_src_prefix = (function (){var G__22213 = path;
if(cljs.core.truth_(macros_QMARK_)){
return [cljs.core.str(G__22213),cljs.core.str(lumo.repl.MACROS_SUFFIX)].join('');
} else {
return G__22213;
}
})();
var bundled_source = (function (){var G__22214 = [cljs.core.str(bundled_src_prefix),cljs.core.str(lumo.repl.JS_EXT)].join('');
return LUMO_LOAD(G__22214);
})();
if(cljs.core.truth_(lumo.repl.skip_load_js_QMARK_(name,macros_QMARK_))){
return lumo.repl.load_bundled(file_path,"",cb);
} else {
if(cljs.core.truth_(bundled_source)){
return lumo.repl.load_bundled(bundled_src_prefix,bundled_source,cb);
} else {
if(cljs.core.truth_(lumo.js_deps.foreign_lib_QMARK_(name))){
return lumo.repl.load_foreign_lib(name,cb);
} else {
return lumo.repl.load_external(path,file_path,macros_QMARK_,cb);

}
}
}
});
lumo.repl.load_other = (function lumo$repl$load_other(p__22215,cb){
var map__22218 = p__22215;
var map__22218__$1 = ((((!((map__22218 == null)))?((((map__22218.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22218.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__22218):map__22218);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22218__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22218__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22218__$1,new cljs.core.Keyword(null,"macros","macros",811339431));
var file = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22218__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var paths = lumo.repl.filenames_to_try(macros,path);
while(true){
var temp__6751__auto__ = cljs.core.first(paths);
if(cljs.core.truth_(temp__6751__auto__)){
var file_path = temp__6751__auto__;
if(cljs.core.truth_(lumo.repl.load_and_cb_BANG_(name,path,file_path,macros,cb))){
return null;
} else {
var G__22220 = cljs.core.next(paths);
paths = G__22220;
continue;
}
} else {
return (cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(null) : cb.call(null,null));
}
break;
}
});
lumo.repl.load_file_STAR_ = (function lumo$repl$load_file_STAR_(filename,cb){
if(cljs.core.truth_(lumo.repl.load_and_cb_BANG_(null,filename,filename,false,cb))){
return null;
} else {
return (cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(null) : cb.call(null,null));
}
});
lumo.repl.load = (function lumo$repl$load(p__22224,cb){
var map__22230 = p__22224;
var map__22230__$1 = ((((!((map__22230 == null)))?((((map__22230.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22230.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__22230):map__22230);
var m = map__22230__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22230__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22230__$1,new cljs.core.Keyword(null,"macros","macros",811339431));
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22230__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var file = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22230__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_(file)){
return lumo.repl.load_file_STAR_(file,cb);
} else {
if(cljs.core.truth_(lumo.repl.skip_load_QMARK_(name,macros))){
var G__22233 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"source","source",-433931539),"",new cljs.core.Keyword(null,"lang","lang",-1819677104),new cljs.core.Keyword(null,"js","js",1768080579)], null);
return (cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(G__22233) : cb.call(null,G__22233));
} else {
if(cljs.core.truth_(cljs.core.re_matches(/^goog\/.*/,path))){
return lumo.repl.load_goog(name,cb);
} else {
return lumo.repl.load_other(m,cb);

}
}
}
});
lumo.repl.macros_cache_QMARK_ = (function lumo$repl$macros_cache_QMARK_(cache){
return [cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cache))].join('').endsWith(lumo.repl.MACROS_SUFFIX);
});
lumo.repl.handle_caching_error = (function lumo$repl$handle_caching_error(error){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("Failed writing cache to "),cljs.core.str(error.path)].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"js-error","js-error",-313073083),error], null));
});
lumo.repl.write_cache = (function lumo$repl$write_cache(name,path,source,cache,prefix_path){
var wrap_error = (function lumo$repl$write_cache_$_wrap_error(err){
if(cljs.core.truth_(err)){
return lumo.repl.handle_caching_error(err);
} else {
return null;
}
});
var macros_QMARK_ = lumo.repl.macros_cache_QMARK_(cache);
var filename_prefix = [cljs.core.str(prefix_path),cljs.core.str("/"),cljs.core.str(cljs.core.munge(path)),cljs.core.str((cljs.core.truth_(macros_QMARK_)?lumo.repl.MACROS_SUFFIX:null))].join('');
var cache_json = lumo.repl.cljs__GT_transit_json(cache);
wrap_error((function (){var G__22244 = [cljs.core.str(filename_prefix),cljs.core.str(lumo.repl.JS_EXT)].join('');
var G__22245 = source;
return LUMO_WRITE_CACHE(G__22244,G__22245);
})());

return wrap_error((function (){var G__22246 = [cljs.core.str(filename_prefix),cljs.core.str(".cache.json")].join('');
var G__22247 = cache_json;
return LUMO_WRITE_CACHE(G__22246,G__22247);
})());
});
/**
 * Evaluates JavaScript in node, writing source and analysis cache to disk
 * when desired.
 */
lumo.repl.caching_node_eval = (function lumo$repl$caching_node_eval(p__22254){
var map__22259 = p__22254;
var map__22259__$1 = ((((!((map__22259 == null)))?((((map__22259.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22259.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__22259):map__22259);
var m = map__22259__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22259__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22259__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var cache = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22259__$1,new cljs.core.Keyword(null,"cache","cache",-1237023054));
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22259__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var temp__6753__auto___22266 = (function (){var and__7511__auto__ = source;
if(cljs.core.truth_(and__7511__auto__)){
var and__7511__auto____$1 = cache;
if(cljs.core.truth_(and__7511__auto____$1)){
var and__7511__auto____$2 = path;
if(cljs.core.truth_(and__7511__auto____$2)){
return new cljs.core.Keyword(null,"cache-path","cache-path",1799646239).cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.app_opts) : cljs.core.deref.call(null,lumo.repl.app_opts)));
} else {
return and__7511__auto____$2;
}
} else {
return and__7511__auto____$1;
}
} else {
return and__7511__auto__;
}
})();
if(cljs.core.truth_(temp__6753__auto___22266)){
var cache_path_22270 = temp__6753__auto___22266;
lumo.repl.write_cache(name,path,source,cache,cache_path_22270);
} else {
}

if(cljs.core.truth_(lumo.repl._STAR_loading_foreign_STAR_)){
var module22261 = module;
var exports22262 = exports;
module = undefined;

exports = undefined;

try{lumo.repl._STAR_loading_foreign_STAR_ = false;

return LUMO_EVAL(source);
}finally {exports = exports22262;

module = module22261;
}} else {
return LUMO_EVAL(source);
}
});
lumo.repl.calc_parinfer_opts = (function lumo$repl$calc_parinfer_opts(text,pos){
var x = text.lastIndexOf("\n");
return ({"cursorX": (pos - (x + (1))), "cursorLine": (cljs.core.count(text.split("\n")) - (1))});
});
/**
 * Based on a partially entered form, returns the number of spaces with which
 * to indent the next line. Returns 0 on failure to calculate.
 */
lumo.repl.indent_space_count = (function lumo$repl$indent_space_count(text){
var pos = cljs.core.count(text);
var balanced = (function (){var G__22281 = text;
var G__22282 = lumo.repl.calc_parinfer_opts(text,pos);
return parinfer.indentMode(G__22281,G__22282);
})();
if(cljs.core.truth_(balanced.success)){
var new_text = [cljs.core.str(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(balanced.text,(0),pos)),cljs.core.str("\n"),cljs.core.str(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(balanced.text,pos))].join('');
var indented = (function (){var G__22283 = new_text;
var G__22284 = lumo.repl.calc_parinfer_opts(new_text,(pos + (1)));
return parinfer.parenMode(G__22283,G__22284);
})();
if(cljs.core.truth_(indented.success)){
return indented.cursorX;
} else {
return (0);
}
} else {
return (0);
}
});
goog.exportSymbol('lumo.repl.indent_space_count', lumo.repl.indent_space_count);
lumo.repl.is_completely_readable_QMARK_ = (function lumo$repl$is_completely_readable_QMARK_(source){
try{var vec__22290 = (lumo.repl.repl_read_string.cljs$core$IFn$_invoke$arity$1 ? lumo.repl.repl_read_string.cljs$core$IFn$_invoke$arity$1(source) : lumo.repl.repl_read_string.call(null,source));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22290,(0),null);
var chars = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22290,(1),null);
return clojure.string.blank_QMARK_(chars);
}catch (e22289){var _ = e22289;
return false;
}});
lumo.repl.matches = new cljs.core.PersistentArrayMap(null, 3, [")","(","}","{","]","["], null);
lumo.repl.form_start = (function lumo$repl$form_start(source,pos){
var source__$1 = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(source,(0),(pos + (1)));
var match = cljs.core.get.cljs$core$IFn$_invoke$arity$2(lumo.repl.matches,(source__$1[pos]));
var searchable_source = source__$1;
while(true){
var match_idx = searchable_source.lastIndexOf(match);
var idx = (function (){var G__22297 = match_idx;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((source__$1[(match_idx - (1))]),"#")){
return (G__22297 - (1));
} else {
return G__22297;
}
})();
var candidate_form = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(source__$1,idx,(pos + (1)));
if((idx < (0))){
return null;
} else {
if(cljs.core.truth_(lumo.repl.is_completely_readable_QMARK_(candidate_form))){
return match_idx;
} else {
var G__22301 = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(source__$1,(0),match_idx);
searchable_source = G__22301;
continue;
}
}
break;
}
});
lumo.repl.calc_highlight_coords = (function lumo$repl$calc_highlight_coords(lines,start_idx,pos){
if(cljs.core.truth_(start_idx)){
var line_count = lines.length;
if((line_count === (1))){
return [start_idx,(0)];
} else {
var start_idx__$1 = start_idx;
var line_ndx = line_count;
var lines__$1 = lines;
while(true){
var line_char_count = cljs.core.count(cljs.core.first(lines__$1));
if((start_idx__$1 < line_char_count)){
return [start_idx__$1,(line_ndx - (1))];
} else {
lines__$1.shift();

var G__22308 = (start_idx__$1 - (line_char_count + (1)));
var G__22309 = (line_ndx - (1));
var G__22310 = lines__$1;
start_idx__$1 = G__22308;
line_ndx = G__22309;
lines__$1 = G__22310;
continue;
}
break;
}
}
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(-1),(-1)], null);
}
});
/**
 * Returns the highlight coordinates [cursorX dy] for the matching brace of the
 * one at pos. cursorX is the horizontal position of the cursor starting from
 * the beginning of the line. dy is the number of lines above the current
 * cursor where the matching brace is located.
 */
lumo.repl.get_highlight_coordinates = (function lumo$repl$get_highlight_coordinates(lines,pos){
var source = clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",lines);
var pos__$1 = (pos + (source.lastIndexOf("\n") + (1)));
var start_idx = lumo.repl.form_start(source,pos__$1);
return lumo.repl.calc_highlight_coords(lines,start_idx,pos__$1);
});
goog.exportSymbol('lumo.repl.get_highlight_coordinates', lumo.repl.get_highlight_coordinates);
lumo.repl.could_not_eval_QMARK_ = (function lumo$repl$could_not_eval_QMARK_(msg){
return cljs.core.boolean$(cljs.core.re_find(lumo.repl.could_not_eval_regex,msg));
});
lumo.repl.handle_repl_error = (function lumo$repl$handle_repl_error(error){
var message = cljs.core.ex_message(error);
var cause = cljs.core.ex_cause(error);
if(cljs.core.truth_(lumo.repl.could_not_eval_QMARK_(message))){
var message__$1 = cljs.core.ex_message(cause);
var map__22325 = cljs.core.ex_data(cause);
var map__22325__$1 = ((((!((map__22325 == null)))?((((map__22325.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22325.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__22325):map__22325);
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22325__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var column_indicator_str = [cljs.core.str(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((cljs.core.count(cljs.core.name((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.current_ns) : cljs.core.deref.call(null,lumo.repl.current_ns)))) + (3)) + column)," "))),cljs.core.str("\u2B06")].join('');
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([column_indicator_str], 0));

return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([message__$1], 0));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(message,"ERROR")){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str(cause)].join('')], 0));
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([error], 0));

}
}
});
lumo.repl.drop_macros_suffix = (function lumo$repl$drop_macros_suffix(ns_name){
if(clojure.string.ends_with_QMARK_(ns_name,"$macros")){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.drop_last.cljs$core$IFn$_invoke$arity$2((7),ns_name));
} else {
return ns_name;
}
});
lumo.repl.add_macros_suffix = (function lumo$repl$add_macros_suffix(sym){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(cljs.core.name(sym)),cljs.core.str("$macros")].join(''));
});
/**
 * Returns a sequence of all namespaces.
 */
lumo.repl.all_ns = (function lumo$repl$all_ns(){
return cljs.core.keys(new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927).cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.st) : cljs.core.deref.call(null,lumo.repl.st))));
});
lumo.repl.all_macros_ns = (function lumo$repl$all_macros_ns(){
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__22335_SHARP_){
return clojure.string.ends_with_QMARK_([cljs.core.str(p1__22335_SHARP_)].join(''),"$macros");
}),lumo.repl.all_ns());
});
/**
 * Gets the AST for a given namespace.
 */
lumo.repl.get_namespace = (function lumo$repl$get_namespace(ns){
if((ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? ns)"));
}

return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.st) : cljs.core.deref.call(null,lumo.repl.st)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),ns], null));
});
/**
 * Given an analysis environment resolve a var. Analogous to
 * clojure.core/resolve
 */
lumo.repl.resolve_var = (function lumo$repl$resolve_var(env,sym){
if(cljs.core.map_QMARK_(env)){
} else {
throw (new Error("Assert failed: (map? env)"));
}

if((sym instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? sym)"));
}

try{return cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$3(env,sym,cljs.analyzer.confirm_var_exists_throw());
}catch (e22341){var _ = e22341;
return cljs.analyzer.resolve_macro_var(env,sym);
}});
lumo.repl.get_macro_var = (function lumo$repl$get_macro_var(env,sym,macros_ns){
if((macros_ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? macros-ns)"));
}

var temp__6753__auto__ = (function (){var env__14667__auto__ = lumo.repl.st;
var env__14667__auto____$1 = ((cljs.core.map_QMARK_(env__14667__auto__))?(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(env__14667__auto__) : cljs.core.atom.call(null,env__14667__auto__)):((((env__14667__auto__ instanceof cljs.core.Atom)) && (cljs.core.map_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(env__14667__auto__) : cljs.core.deref.call(null,env__14667__auto__)))))?env__14667__auto__:(function(){throw (new Error([cljs.core.str("Compiler environment must be a map or atom containing a map, not "),cljs.core.str(cljs.core.type(env__14667__auto__))].join('')))})()
));
var _STAR_compiler_STAR_22343 = cljs.env._STAR_compiler_STAR_;
cljs.env._STAR_compiler_STAR_ = env__14667__auto____$1;

try{return lumo.repl.resolve_var(env,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(macros_ns,cljs.core.name(sym)));
}finally {cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_22343;
}})();
if(cljs.core.truth_(temp__6753__auto__)){
var macro_var = temp__6753__auto__;
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(macro_var,new cljs.core.Keyword(null,"ns","ns",441598760),macros_ns);
} else {
return null;
}
});
lumo.repl.get_var = (function lumo$repl$get_var(env,sym){
var _STAR_cljs_warning_handlers_STAR_22358 = cljs.analyzer._STAR_cljs_warning_handlers_STAR_;
cljs.analyzer._STAR_cljs_warning_handlers_STAR_ = null;

try{var var$ = (function (){var or__7523__auto__ = (function (){var env__14667__auto__ = lumo.repl.st;
var env__14667__auto____$1 = ((cljs.core.map_QMARK_(env__14667__auto__))?(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(env__14667__auto__) : cljs.core.atom.call(null,env__14667__auto__)):((((env__14667__auto__ instanceof cljs.core.Atom)) && (cljs.core.map_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(env__14667__auto__) : cljs.core.deref.call(null,env__14667__auto__)))))?env__14667__auto__:(function(){throw (new Error([cljs.core.str("Compiler environment must be a map or atom containing a map, not "),cljs.core.str(cljs.core.type(env__14667__auto__))].join('')))})()
));
var _STAR_compiler_STAR_22364 = cljs.env._STAR_compiler_STAR_;
cljs.env._STAR_compiler_STAR_ = env__14667__auto____$1;

try{return lumo.repl.resolve_var(env,sym);
}finally {cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_22364;
}})();
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.core.some(((function (or__7523__auto__,_STAR_cljs_warning_handlers_STAR_22358){
return (function (p1__22352_SHARP_){
return lumo.repl.get_macro_var(env,sym,p1__22352_SHARP_);
});})(or__7523__auto__,_STAR_cljs_warning_handlers_STAR_22358))
,lumo.repl.all_macros_ns());
}
})();
if(cljs.core.truth_(var$)){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3((function (){var G__22365 = var$;
var G__22365__$1 = ((cljs.core.not(new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(var$)))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__22365,new cljs.core.Keyword(null,"ns","ns",441598760),cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(var$)))):G__22365);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(var$)),[cljs.core.str(new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(var$))].join(''))){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(G__22365__$1,new cljs.core.Keyword(null,"name","name",1843675177),((function (G__22365,G__22365__$1,var$,_STAR_cljs_warning_handlers_STAR_22358){
return (function (p1__22353_SHARP_){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(p1__22353_SHARP_));
});})(G__22365,G__22365__$1,var$,_STAR_cljs_warning_handlers_STAR_22358))
);
} else {
return G__22365__$1;
}
})(),new cljs.core.Keyword(null,"ns","ns",441598760),cljs.core.comp.cljs$core$IFn$_invoke$arity$3(cljs.core.symbol,lumo.repl.drop_macros_suffix,cljs.core.str));
} else {
return null;
}
}finally {cljs.analyzer._STAR_cljs_warning_handlers_STAR_ = _STAR_cljs_warning_handlers_STAR_22358;
}});
lumo.repl.get_aenv = (function lumo$repl$get_aenv(){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(cljs.analyzer.empty_env(),new cljs.core.Keyword(null,"ns","ns",441598760),lumo.repl.get_namespace((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.current_ns) : cljs.core.deref.call(null,lumo.repl.current_ns))),cljs.core.array_seq([new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"expr","expr",745722291)], 0));
});
lumo.repl.compiler_state_backup = (function lumo$repl$compiler_state_backup(){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"st","st",1455255828),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.st) : cljs.core.deref.call(null,lumo.repl.st)),new cljs.core.Keyword(null,"loaded","loaded",-1246482293),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.js._STAR_loaded_STAR_) : cljs.core.deref.call(null,cljs.js._STAR_loaded_STAR_))], null);
});
lumo.repl.restore_compiler_state_BANG_ = (function lumo$repl$restore_compiler_state_BANG_(backup){
var G__22378_22382 = lumo.repl.st;
var G__22379_22383 = new cljs.core.Keyword(null,"st","st",1455255828).cljs$core$IFn$_invoke$arity$1(backup);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__22378_22382,G__22379_22383) : cljs.core.reset_BANG_.call(null,G__22378_22382,G__22379_22383));

var G__22380 = cljs.js._STAR_loaded_STAR_;
var G__22381 = new cljs.core.Keyword(null,"loaded","loaded",-1246482293).cljs$core$IFn$_invoke$arity$1(backup);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__22380,G__22381) : cljs.core.reset_BANG_.call(null,G__22380,G__22381));
});
/**
 * Takes a self-ish fn and returns it wrapped with exception handling.
 *   Compiler state is restored if self-ish fn fails.
 */
lumo.repl.wrap_self = (function lumo$repl$wrap_self(f){
return (function lumo$repl$wrap_self_$_g(a,b){
var backup = lumo.repl.compiler_state_backup();
try{return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(a,b) : f.call(null,a,b));
}catch (e22391){var e = e22391;
lumo.repl.restore_compiler_state_BANG_(backup);

throw e;
}});
});
/**
 * Returns the root directory path for a lib
 */
lumo.repl.root_resource = (function lumo$repl$root_resource(lib){
return [cljs.core.str("/"),cljs.core.str(cljs.core.name(lib).replace("-","_").replace(".","/"))].join('');
});
/**
 * Returns the root resource path for a lib
 */
lumo.repl.root_directory = (function lumo$repl$root_directory(lib){
var d = lumo.repl.root_resource(lib);
return cljs.core.subs.cljs$core$IFn$_invoke$arity$3(d,(0),d.lastIndexOf("/"));
});
lumo.repl.load_path__GT_cp_path = (function lumo$repl$load_path__GT_cp_path(path){
var src = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("/",cljs.core.first(path)))?path:[cljs.core.str(lumo.repl.root_directory((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.current_ns) : cljs.core.deref.call(null,lumo.repl.current_ns)))),cljs.core.str("/"),cljs.core.str(path)].join(''));
var src__$1 = src.substring((1));
var or__7523__auto__ = (function (){var and__7511__auto__ = (function (){var G__22399 = [cljs.core.str(src__$1),cljs.core.str(".cljs")].join('');
return LUMO_EXISTS(G__22399);
})();
if(cljs.core.truth_(and__7511__auto__)){
return [cljs.core.str(src__$1),cljs.core.str(".cljs")].join('');
} else {
return and__7511__auto__;
}
})();
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return [cljs.core.str(src__$1),cljs.core.str(".cljc")].join('');
}
});
lumo.repl.wrap_special_fns = (function lumo$repl$wrap_special_fns(wfn,fns){

return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__8380__auto__ = (function lumo$repl$wrap_special_fns_$_iter__22426(s__22427){
return (new cljs.core.LazySeq(null,(function (){
var s__22427__$1 = s__22427;
while(true){
var temp__6753__auto__ = cljs.core.seq(s__22427__$1);
if(temp__6753__auto__){
var s__22427__$2 = temp__6753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22427__$2)){
var c__8378__auto__ = cljs.core.chunk_first(s__22427__$2);
var size__8379__auto__ = cljs.core.count(c__8378__auto__);
var b__22429 = cljs.core.chunk_buffer(size__8379__auto__);
if((function (){var i__22428 = (0);
while(true){
if((i__22428 < size__8379__auto__)){
var vec__22441 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__8378__auto__,i__22428);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22441,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22441,(1),null);
cljs.core.chunk_append(b__22429,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(wfn.cljs$core$IFn$_invoke$arity$1 ? wfn.cljs$core$IFn$_invoke$arity$1(v) : wfn.call(null,v))], null));

var G__22448 = (i__22428 + (1));
i__22428 = G__22448;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22429),lumo$repl$wrap_special_fns_$_iter__22426(cljs.core.chunk_rest(s__22427__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22429),null);
}
} else {
var vec__22445 = cljs.core.first(s__22427__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22445,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22445,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(wfn.cljs$core$IFn$_invoke$arity$1 ? wfn.cljs$core$IFn$_invoke$arity$1(v) : wfn.call(null,v))], null),lumo$repl$wrap_special_fns_$_iter__22426(cljs.core.rest(s__22427__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__8380__auto__(fns);
})());
});
lumo.repl.repl_special_fns = (function (){var load_file_fn = (function lumo$repl$self(p__22450,opts){
var vec__22454 = p__22450;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22454,(0),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22454,(1),null);
var form = vec__22454;
return (lumo.repl.execute_path.cljs$core$IFn$_invoke$arity$2 ? lumo.repl.execute_path.cljs$core$IFn$_invoke$arity$2(file,opts) : lumo.repl.execute_path.call(null,file,opts));
});
var in_ns_fn = ((function (load_file_fn){
return (function lumo$repl$self(p__22457,opts){
var vec__22476 = p__22457;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22476,(0),null);
var maybe_quoted = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22476,(1),null);
var form = vec__22476;
return cljs.js.eval.cljs$core$IFn$_invoke$arity$4(lumo.repl.st,maybe_quoted,opts,((function (vec__22476,_,maybe_quoted,form,load_file_fn){
return (function (p__22479){
var map__22480 = p__22479;
var map__22480__$1 = ((((!((map__22480 == null)))?((((map__22480.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22480.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__22480):map__22480);
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22480__$1,new cljs.core.Keyword(null,"error","error",-978969032));
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22480__$1,new cljs.core.Keyword(null,"value","value",305978217));
if(cljs.core.truth_(error)){
return lumo.repl.handle_repl_error(error);
} else {
var ns_name = value;
if(!((ns_name instanceof cljs.core.Symbol))){
var _STAR_print_fn_STAR_22482 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_fn_STAR_ = cljs.core._STAR_print_err_fn_STAR_;

try{return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Argument to in-ns must be a symbol."], 0));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_22482;
}} else {
if(cljs.core.truth_(cljs.analyzer.get_namespace.cljs$core$IFn$_invoke$arity$1(ns_name))){
return cljs.core.vreset_BANG_(lumo.repl.current_ns,ns_name);
} else {
var ns_form = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"ns","ns",2082130287,null)),(function (){var x__8452__auto__ = ns_name;
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})())));
return cljs.js.eval.cljs$core$IFn$_invoke$arity$4(lumo.repl.st,ns_form,opts,((function (ns_form,ns_name,map__22480,map__22480__$1,error,value,vec__22476,_,maybe_quoted,form,load_file_fn){
return (function (p__22483){
var map__22484 = p__22483;
var map__22484__$1 = ((((!((map__22484 == null)))?((((map__22484.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22484.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__22484):map__22484);
var error__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22484__$1,new cljs.core.Keyword(null,"error","error",-978969032));
if(cljs.core.truth_(error__$1)){
return lumo.repl.handle_repl_error(error__$1);
} else {
return cljs.core.vreset_BANG_(lumo.repl.current_ns,ns_name);
}
});})(ns_form,ns_name,map__22480,map__22480__$1,error,value,vec__22476,_,maybe_quoted,form,load_file_fn))
);
}
}
}
});})(vec__22476,_,maybe_quoted,form,load_file_fn))
);
});})(load_file_fn))
;
return lumo.repl.wrap_special_fns(lumo.repl.wrap_self,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Symbol(null,"in-ns","in-ns",-2089468466,null),in_ns_fn,new cljs.core.Symbol("clojure.core","in-ns","clojure.core/in-ns",1901189465,null),in_ns_fn,new cljs.core.Symbol(null,"load-file","load-file",1215944857,null),load_file_fn,new cljs.core.Symbol("clojure.core","load-file","clojure.core/load-file",2040822838,null),load_file_fn,new cljs.core.Symbol(null,"load","load",321890343,null),((function (load_file_fn,in_ns_fn){
return (function lumo$repl$self(p__22486,opts){
var vec__22492 = p__22486;
var seq__22493 = cljs.core.seq(vec__22492);
var first__22494 = cljs.core.first(seq__22493);
var seq__22493__$1 = cljs.core.next(seq__22493);
var _ = first__22494;
var paths = seq__22493__$1;
var form = vec__22492;
var cp_paths = cljs.core.map.cljs$core$IFn$_invoke$arity$2(lumo.repl.load_path__GT_cp_path,paths);
return cljs.core.run_BANG_(((function (cp_paths,vec__22492,seq__22493,first__22494,seq__22493__$1,_,paths,form,load_file_fn,in_ns_fn){
return (function (p1__22449_SHARP_){
return (lumo.repl.execute_path.cljs$core$IFn$_invoke$arity$2 ? lumo.repl.execute_path.cljs$core$IFn$_invoke$arity$2(p1__22449_SHARP_,opts) : lumo.repl.execute_path.call(null,p1__22449_SHARP_,opts));
});})(cp_paths,vec__22492,seq__22493,first__22494,seq__22493__$1,_,paths,form,load_file_fn,in_ns_fn))
,cp_paths);
});})(load_file_fn,in_ns_fn))
], null));
})();
lumo.repl.repl_special_QMARK_ = (function lumo$repl$repl_special_QMARK_(form){
return (cljs.core.seq_QMARK_(form)) && (cljs.core.contains_QMARK_(lumo.repl.repl_special_fns,cljs.core.first(form)));
});
lumo.repl.special_doc = (function lumo$repl$special_doc(name_symbol){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic((lumo.repl_resources.special_doc_map.cljs$core$IFn$_invoke$arity$1 ? lumo.repl_resources.special_doc_map.cljs$core$IFn$_invoke$arity$1(name_symbol) : lumo.repl_resources.special_doc_map.call(null,name_symbol)),new cljs.core.Keyword(null,"name","name",1843675177),name_symbol,cljs.core.array_seq([new cljs.core.Keyword(null,"special-form","special-form",-1326536374),true], 0));
});
lumo.repl.repl_special_doc = (function lumo$repl$repl_special_doc(name_symbol){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic((lumo.repl_resources.repl_special_doc_map.cljs$core$IFn$_invoke$arity$1 ? lumo.repl_resources.repl_special_doc_map.cljs$core$IFn$_invoke$arity$1(name_symbol) : lumo.repl_resources.repl_special_doc_map.call(null,name_symbol)),new cljs.core.Keyword(null,"name","name",1843675177),name_symbol,cljs.core.array_seq([new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725),true], 0));
});
/**
 * Undoes the effect that wrapping a reader conditional around
 * a defn has on a docstring.
 */
lumo.repl.undo_reader_conditional_spacing = (function lumo$repl$undo_reader_conditional_spacing(s){
if((s == null)){
return null;
} else {
if(cljs.core.truth_(cljs.core.re_find(/[^\n]*\n\n?\s{5,6}\S.*/,s))){
return clojure.string.replace_all(s,/\n      ?/,"\n  ");
} else {
return s;
}
}
});
lumo.repl.doc_STAR_ = (function lumo$repl$doc_STAR_(name){
var temp__6751__auto__ = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Symbol(null,"&","&",-2144855648,null),new cljs.core.Symbol(null,"fn","fn",465265323,null),new cljs.core.Symbol(null,"catch","catch",-1616370245,null),new cljs.core.Symbol(null,"try","try",-1273693247,null),new cljs.core.Symbol(null,"finally","finally",-1065347064,null),new cljs.core.Symbol(null,"try","try",-1273693247,null)], null).call(null,name);
if(cljs.core.truth_(temp__6751__auto__)){
var special_name = temp__6751__auto__;
return (lumo.repl.doc_STAR_.cljs$core$IFn$_invoke$arity$1 ? lumo.repl.doc_STAR_.cljs$core$IFn$_invoke$arity$1(special_name) : lumo.repl.doc_STAR_.call(null,special_name));
} else {
if(cljs.core.truth_((lumo.repl_resources.special_doc_map.cljs$core$IFn$_invoke$arity$1 ? lumo.repl_resources.special_doc_map.cljs$core$IFn$_invoke$arity$1(name) : lumo.repl_resources.special_doc_map.call(null,name)))){
return cljs.repl.print_doc((lumo.repl_resources.special_doc_map.cljs$core$IFn$_invoke$arity$1 ? lumo.repl_resources.special_doc_map.cljs$core$IFn$_invoke$arity$1(name) : lumo.repl_resources.special_doc_map.call(null,name)));
} else {
if(cljs.core.truth_((lumo.repl_resources.repl_special_doc_map.cljs$core$IFn$_invoke$arity$1 ? lumo.repl_resources.repl_special_doc_map.cljs$core$IFn$_invoke$arity$1(name) : lumo.repl_resources.repl_special_doc_map.call(null,name)))){
return cljs.repl.print_doc(lumo.repl.repl_special_doc(name));
} else {
if(cljs.core.truth_(lumo.repl.get_namespace(name))){
return cljs.repl.print_doc(cljs.core.select_keys(lumo.repl.get_namespace(name),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"doc","doc",1913296891)], null)));
} else {
if(cljs.core.truth_(lumo.repl.get_var(lumo.repl.get_aenv(),name))){
return cljs.repl.print_doc((function (){var aenv = lumo.repl.get_aenv();
var var$ = lumo.repl.get_var(aenv,name);
var m = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.select_keys(var$,new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"forms","forms",2045992350),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"macro","macro",-867863404),new cljs.core.Keyword(null,"url","url",276297046)], null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"doc","doc",1913296891)], null),lumo.repl.undo_reader_conditional_spacing),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"forms","forms",2045992350),cljs.core.second(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1499536964).cljs$core$IFn$_invoke$arity$1(var$))),new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.second(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1499536964).cljs$core$IFn$_invoke$arity$1(var$)))], null)], 0));
var G__22514 = cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177)], null),cljs.core.name);
if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol-symbol","protocol-symbol",1279552198).cljs$core$IFn$_invoke$arity$1(var$))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(G__22514,new cljs.core.Keyword(null,"protocol","protocol",652470118),true,cljs.core.array_seq([new cljs.core.Keyword(null,"methods","methods",453930866),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__22514,aenv,var$,m,temp__6751__auto__){
return (function (p__22517){
var vec__22522 = p__22517;
var fname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22522,(0),null);
var sigs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22522,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [fname,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(lumo.repl.get_var(aenv,cljs.core.symbol.cljs$core$IFn$_invoke$arity$2([cljs.core.str(new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(var$))].join(''),[cljs.core.str(fname)].join('')))),new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.seq(sigs)], null)], null);
});})(G__22514,aenv,var$,m,temp__6751__auto__))
,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(var$,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"protocol-info","protocol-info",1471745843),new cljs.core.Keyword(null,"methods","methods",453930866)], null))))], 0));
} else {
return G__22514;
}
})());
} else {
return null;
}
}
}
}
}
});
lumo.repl.make_eval_opts = (function lumo$repl$make_eval_opts(){
var map__22533 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.app_opts) : cljs.core.deref.call(null,lumo.repl.app_opts));
var map__22533__$1 = ((((!((map__22533 == null)))?((((map__22533.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22533.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__22533):map__22533);
var verbose = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22533__$1,new cljs.core.Keyword(null,"verbose","verbose",1694226060));
var static_fns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22533__$1,new cljs.core.Keyword(null,"static-fns","static-fns",-501950748));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ns","ns",441598760),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.current_ns) : cljs.core.deref.call(null,lumo.repl.current_ns)),new cljs.core.Keyword(null,"verbose","verbose",1694226060),verbose,new cljs.core.Keyword(null,"static-fns","static-fns",-501950748),static_fns], null);
});
lumo.repl.current_alias_map = (function lumo$repl$current_alias_map(){
var cur_ns = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.current_ns) : cljs.core.deref.call(null,lumo.repl.current_ns));
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$1(((function (cur_ns){
return (function (p__22539){
var vec__22540 = p__22539;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22540,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22540,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,v);
});})(cur_ns))
),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.st) : cljs.core.deref.call(null,lumo.repl.st)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),cur_ns,new cljs.core.Keyword(null,"requires","requires",-1201390927)], null)),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.st) : cljs.core.deref.call(null,lumo.repl.st)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),cur_ns,new cljs.core.Keyword(null,"require-macros","require-macros",707947416)], null))], 0)));
});
lumo.repl.reader_eof_QMARK_ = (function lumo$repl$reader_eof_QMARK_(msg){
return (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("EOF while reading",msg)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("EOF while reading string",msg));
});
lumo.repl.read_chars = (function lumo$repl$read_chars(reader){
var sb = (new goog.string.StringBuffer());
var c = cljs.tools.reader.reader_types.read_char(reader);
while(true){
if(!((c == null))){
sb.append(c);

var G__22555 = cljs.tools.reader.reader_types.read_char(reader);
c = G__22555;
continue;
} else {
return [cljs.core.str(sb)].join('');
}
break;
}
});
/**
 * Returns a vector of the first read form, and any balance text.
 */
lumo.repl.repl_read_string = (function lumo$repl$repl_read_string(source){
var reader = cljs.tools.reader.reader_types.string_push_back_reader.cljs$core$IFn$_invoke$arity$1(source);
var cur_ns = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.current_ns) : cljs.core.deref.call(null,lumo.repl.current_ns));
var _STAR_cljs_ns_STAR_22562 = cljs.analyzer._STAR_cljs_ns_STAR_;
var _STAR_ns_STAR_22563 = cljs.core._STAR_ns_STAR_;
var _STAR_compiler_STAR_22564 = cljs.env._STAR_compiler_STAR_;
var _STAR_data_readers_STAR_22565 = cljs.tools.reader._STAR_data_readers_STAR_;
var resolve_symbol22566 = cljs.tools.reader.resolve_symbol;
var _STAR_alias_map_STAR_22567 = cljs.tools.reader._STAR_alias_map_STAR_;
cljs.analyzer._STAR_cljs_ns_STAR_ = cur_ns;

cljs.core._STAR_ns_STAR_ = cljs.core.create_ns.cljs$core$IFn$_invoke$arity$1(cur_ns);

cljs.env._STAR_compiler_STAR_ = lumo.repl.st;

cljs.tools.reader._STAR_data_readers_STAR_ = cljs.tagged_literals._STAR_cljs_data_readers_STAR_;

cljs.tools.reader.resolve_symbol = cljs.analyzer.resolve_symbol;

cljs.tools.reader._STAR_alias_map_STAR_ = lumo.repl.current_alias_map();

try{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.tools.reader.read.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"read-cond","read-cond",1056899244),new cljs.core.Keyword(null,"allow","allow",-1857325745),new cljs.core.Keyword(null,"features","features",-1146962336),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs","cljs",1492417629),null], null), null)], null),reader),lumo.repl.read_chars(reader)], null);
}finally {cljs.tools.reader._STAR_alias_map_STAR_ = _STAR_alias_map_STAR_22567;

cljs.tools.reader.resolve_symbol = resolve_symbol22566;

cljs.tools.reader._STAR_data_readers_STAR_ = _STAR_data_readers_STAR_22565;

cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_22564;

cljs.core._STAR_ns_STAR_ = _STAR_ns_STAR_22563;

cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR_22562;
}});
lumo.repl.execute_path = (function lumo$repl$execute_path(filename,opts){
return lumo.repl.load(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"file","file",-1269645878),filename], null),(function (p__22573){
var map__22574 = p__22573;
var map__22574__$1 = ((((!((map__22574 == null)))?((((map__22574.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22574.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__22574):map__22574);
var lang = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22574__$1,new cljs.core.Keyword(null,"lang","lang",-1819677104));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22574__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var cache = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22574__$1,new cljs.core.Keyword(null,"cache","cache",-1237023054));
if(cljs.core.truth_(source)){
var G__22576 = source;
var G__22577 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([opts,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"filename","filename",-1428840783),filename,new cljs.core.Keyword(null,"expression?","expression?",274148889),false], null)], 0));
return (lumo.repl.execute_source.cljs$core$IFn$_invoke$arity$2 ? lumo.repl.execute_source.cljs$core$IFn$_invoke$arity$2(G__22576,G__22577) : lumo.repl.execute_source.call(null,G__22576,G__22577));
} else {
return lumo.repl.handle_repl_error(cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("Could not load file "),cljs.core.str(filename)].join(''),cljs.core.PersistentArrayMap.EMPTY));
}
}));
});
lumo.repl.execute_text = (function lumo$repl$execute_text(source,p__22578){
var map__22593 = p__22578;
var map__22593__$1 = ((((!((map__22593 == null)))?((((map__22593.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22593.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__22593):map__22593);
var opts = map__22593__$1;
var expression_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22593__$1,new cljs.core.Keyword(null,"expression?","expression?",274148889));
var print_nil_result_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22593__$1,new cljs.core.Keyword(null,"print-nil-result?","print-nil-result?",471441589));
var filename = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22593__$1,new cljs.core.Keyword(null,"filename","filename",-1428840783));
try{var _STAR_eval_fn_STAR_22596_22617 = cljs.js._STAR_eval_fn_STAR_;
var _STAR_load_fn_STAR_22597_22618 = cljs.js._STAR_load_fn_STAR_;
var _STAR_cljs_ns_STAR_22598_22619 = cljs.analyzer._STAR_cljs_ns_STAR_;
var _STAR_ns_STAR_22599_22620 = cljs.core._STAR_ns_STAR_;
var _STAR_compiler_STAR_22600_22621 = cljs.env._STAR_compiler_STAR_;
var resolve_symbol22601_22622 = cljs.tools.reader.resolve_symbol;
var _STAR_data_readers_STAR_22602_22623 = cljs.tools.reader._STAR_data_readers_STAR_;
var _STAR_alias_map_STAR_22603_22624 = cljs.tools.reader._STAR_alias_map_STAR_;
cljs.js._STAR_eval_fn_STAR_ = lumo.repl.caching_node_eval;

cljs.js._STAR_load_fn_STAR_ = lumo.repl.load;

cljs.analyzer._STAR_cljs_ns_STAR_ = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.current_ns) : cljs.core.deref.call(null,lumo.repl.current_ns));

cljs.core._STAR_ns_STAR_ = cljs.core.create_ns.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.current_ns) : cljs.core.deref.call(null,lumo.repl.current_ns)));

cljs.env._STAR_compiler_STAR_ = lumo.repl.st;

cljs.tools.reader.resolve_symbol = cljs.analyzer.resolve_symbol;

cljs.tools.reader._STAR_data_readers_STAR_ = cljs.tagged_literals._STAR_cljs_data_readers_STAR_;

cljs.tools.reader._STAR_alias_map_STAR_ = lumo.repl.current_alias_map();

try{var form_22625 = (function (){var and__7511__auto__ = expression_QMARK_;
if(cljs.core.truth_(and__7511__auto__)){
return cljs.core.first(lumo.repl.repl_read_string(source));
} else {
return and__7511__auto__;
}
})();
var eval_opts_22626 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([lumo.repl.make_eval_opts(),(cljs.core.truth_(expression_QMARK_)?new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320),true], null):null)], 0));
if(cljs.core.truth_(lumo.repl.repl_special_QMARK_(form_22625))){
cljs.core.get.cljs$core$IFn$_invoke$arity$2(lumo.repl.repl_special_fns,cljs.core.first(form_22625)).call(null,form_22625,eval_opts_22626);
} else {
cljs.js.eval_str.cljs$core$IFn$_invoke$arity$5(lumo.repl.st,source,(cljs.core.truth_(expression_QMARK_)?source:(cljs.core.truth_(filename)?filename:"source"
)),eval_opts_22626,((function (form_22625,eval_opts_22626,_STAR_eval_fn_STAR_22596_22617,_STAR_load_fn_STAR_22597_22618,_STAR_cljs_ns_STAR_22598_22619,_STAR_ns_STAR_22599_22620,_STAR_compiler_STAR_22600_22621,resolve_symbol22601_22622,_STAR_data_readers_STAR_22602_22623,_STAR_alias_map_STAR_22603_22624,map__22593,map__22593__$1,opts,expression_QMARK_,print_nil_result_QMARK_,filename){
return (function (p__22604){
var map__22605 = p__22604;
var map__22605__$1 = ((((!((map__22605 == null)))?((((map__22605.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22605.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__22605):map__22605);
var ret = map__22605__$1;
var ns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22605__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22605__$1,new cljs.core.Keyword(null,"value","value",305978217));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22605__$1,new cljs.core.Keyword(null,"error","error",-978969032));
if(cljs.core.not(error)){
if(cljs.core.truth_(expression_QMARK_)){
if(cljs.core.truth_((function (){var or__7523__auto__ = print_nil_result_QMARK_;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return !((value == null));
}
})())){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([value], 0))], 0));
} else {
}

return cljs.core.vreset_BANG_(lumo.repl.current_ns,ns);
} else {
return null;
}
} else {
return lumo.repl.handle_repl_error(error);
}
});})(form_22625,eval_opts_22626,_STAR_eval_fn_STAR_22596_22617,_STAR_load_fn_STAR_22597_22618,_STAR_cljs_ns_STAR_22598_22619,_STAR_ns_STAR_22599_22620,_STAR_compiler_STAR_22600_22621,resolve_symbol22601_22622,_STAR_data_readers_STAR_22602_22623,_STAR_alias_map_STAR_22603_22624,map__22593,map__22593__$1,opts,expression_QMARK_,print_nil_result_QMARK_,filename))
);
}
}finally {cljs.tools.reader._STAR_alias_map_STAR_ = _STAR_alias_map_STAR_22603_22624;

cljs.tools.reader._STAR_data_readers_STAR_ = _STAR_data_readers_STAR_22602_22623;

cljs.tools.reader.resolve_symbol = resolve_symbol22601_22622;

cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_22600_22621;

cljs.core._STAR_ns_STAR_ = _STAR_ns_STAR_22599_22620;

cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR_22598_22619;

cljs.js._STAR_load_fn_STAR_ = _STAR_load_fn_STAR_22597_22618;

cljs.js._STAR_eval_fn_STAR_ = _STAR_eval_fn_STAR_22596_22617;
}}catch (e22595){var e_22631 = e22595;
lumo.repl.handle_repl_error(e_22631);
}
return null;
});
lumo.repl.execute_source = (function lumo$repl$execute_source(source_or_path,p__22632){
var map__22635 = p__22632;
var map__22635__$1 = ((((!((map__22635 == null)))?((((map__22635.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22635.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__22635):map__22635);
var opts = map__22635__$1;
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22635__$1,new cljs.core.Keyword(null,"type","type",1174270348));
if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(type,"text"))){
return lumo.repl.execute_path(source_or_path,opts);
} else {
return lumo.repl.execute_text(source_or_path,opts);
}
});
lumo.repl.execute = (function lumo$repl$execute(type,source_or_path,expression_QMARK_,print_nil_result_QMARK_,setNS){
if(cljs.core.truth_(setNS)){
cljs.core.vreset_BANG_(lumo.repl.current_ns,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(setNS));
} else {
}

return lumo.repl.execute_source(source_or_path,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),type,new cljs.core.Keyword(null,"expression?","expression?",274148889),expression_QMARK_,new cljs.core.Keyword(null,"print-nil-result?","print-nil-result?",471441589),print_nil_result_QMARK_], null));
});
goog.exportSymbol('lumo.repl.execute', lumo.repl.execute);
lumo.repl.is_readable_QMARK_ = (function lumo$repl$is_readable_QMARK_(form){
try{return cljs.core.second(lumo.repl.repl_read_string(form));
}catch (e22648){var e = e22648;
var msg = e.message;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("EOF",msg)){
return "";
} else {
if(cljs.core.truth_(lumo.repl.reader_eof_QMARK_(msg))){
return false;
} else {
return "";

}
}
}});
goog.exportSymbol('lumo.repl.is_readable_QMARK_', lumo.repl.is_readable_QMARK_);
lumo.repl.run_main = (function lumo$repl$run_main(var_args){
var args__8746__auto__ = [];
var len__8739__auto___22664 = arguments.length;
var i__8740__auto___22665 = (0);
while(true){
if((i__8740__auto___22665 < len__8739__auto___22664)){
args__8746__auto__.push((arguments[i__8740__auto___22665]));

var G__22666 = (i__8740__auto___22665 + (1));
i__8740__auto___22665 = G__22666;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((1) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((1)),(0),null)):null);
return lumo.repl.run_main.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__8747__auto__);
});
goog.exportSymbol('lumo.repl.run_main', lumo.repl.run_main);

lumo.repl.run_main.cljs$core$IFn$_invoke$arity$variadic = (function (main_ns,args){
var main_args = cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(args);
var opts = lumo.repl.make_eval_opts();
var _STAR_load_fn_STAR_22654_22667 = cljs.js._STAR_load_fn_STAR_;
var _STAR_eval_fn_STAR_22655_22668 = cljs.js._STAR_eval_fn_STAR_;
cljs.js._STAR_load_fn_STAR_ = lumo.repl.load;

cljs.js._STAR_eval_fn_STAR_ = lumo.repl.caching_node_eval;

try{cljs.js.eval.cljs$core$IFn$_invoke$arity$4(lumo.repl.st,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"require","require",1172530194,null)),(function (){var x__8452__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",1377916282,null)),(function (){var x__8452__auto__ = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(main_ns);
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})()))),opts,((function (_STAR_load_fn_STAR_22654_22667,_STAR_eval_fn_STAR_22655_22668,main_args,opts){
return (function (p__22657){
var map__22658 = p__22657;
var map__22658__$1 = ((((!((map__22658 == null)))?((((map__22658.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22658.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__22658):map__22658);
var ret = map__22658__$1;
var ns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22658__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22658__$1,new cljs.core.Keyword(null,"value","value",305978217));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22658__$1,new cljs.core.Keyword(null,"error","error",-978969032));
if(cljs.core.truth_(error)){
return lumo.repl.handle_repl_error(error);
} else {
return cljs.js.eval_str.cljs$core$IFn$_invoke$arity$5(lumo.repl.st,[cljs.core.str("(var -main)")].join(''),null,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([opts,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ns","ns",441598760),cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(main_ns)], null)], 0)),((function (map__22658,map__22658__$1,ret,ns,value,error,_STAR_load_fn_STAR_22654_22667,_STAR_eval_fn_STAR_22655_22668,main_args,opts){
return (function (p__22660){
var map__22661 = p__22660;
var map__22661__$1 = ((((!((map__22661 == null)))?((((map__22661.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22661.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__22661):map__22661);
var ret__$1 = map__22661__$1;
var ns__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22661__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var value__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22661__$1,new cljs.core.Keyword(null,"value","value",305978217));
var error__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22661__$1,new cljs.core.Keyword(null,"error","error",-978969032));
try{return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(value__$1,main_args);
}catch (e22663){var e = e22663;
return lumo.repl.handle_repl_error(e);
}});})(map__22658,map__22658__$1,ret,ns,value,error,_STAR_load_fn_STAR_22654_22667,_STAR_eval_fn_STAR_22655_22668,main_args,opts))
);
}
});})(_STAR_load_fn_STAR_22654_22667,_STAR_eval_fn_STAR_22655_22668,main_args,opts))
);
}finally {cljs.js._STAR_eval_fn_STAR_ = _STAR_eval_fn_STAR_22655_22668;

cljs.js._STAR_load_fn_STAR_ = _STAR_load_fn_STAR_22654_22667;
}
return null;
});

lumo.repl.run_main.cljs$lang$maxFixedArity = (1);

lumo.repl.run_main.cljs$lang$applyTo = (function (seq22649){
var G__22650 = cljs.core.first(seq22649);
var seq22649__$1 = cljs.core.next(seq22649);
return lumo.repl.run_main.cljs$core$IFn$_invoke$arity$variadic(G__22650,seq22649__$1);
});

lumo.repl.get_current_ns = (function lumo$repl$get_current_ns(){
return [cljs.core.str((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.current_ns) : cljs.core.deref.call(null,lumo.repl.current_ns)))].join('');
});
goog.exportSymbol('lumo.repl.get_current_ns', lumo.repl.get_current_ns);
lumo.repl.set_ns = (function lumo$repl$set_ns(ns_str){
return cljs.core.vreset_BANG_(lumo.repl.current_ns,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(ns_str));
});
goog.exportSymbol('lumo.repl.set_ns', lumo.repl.set_ns);
lumo.repl.setup_assert_BANG_ = (function lumo$repl$setup_assert_BANG_(elide_asserts){
return cljs.core._STAR_assert_STAR_ = cljs.core.not(elide_asserts);
});
lumo.repl.init = (function lumo$repl$init(repl_QMARK_,verbose,cache_path,static_fns,elide_asserts){
cljs.core.vreset_BANG_(lumo.repl.app_opts,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"verbose","verbose",1694226060),verbose,new cljs.core.Keyword(null,"cache-path","cache-path",1799646239),cache_path,new cljs.core.Keyword(null,"static-fns","static-fns",-501950748),static_fns,new cljs.core.Keyword(null,"elide-asserts","elide-asserts",537063272),elide_asserts], null));

lumo.repl.setup_assert_BANG_(elide_asserts);

lumo.repl.load_core_analysis_caches(repl_QMARK_);

return lumo.js_deps.index_upstream_foreign_libs();
});
goog.exportSymbol('lumo.repl.init', lumo.repl.init);
lumo.repl.completion_candidates_for_ns = (function lumo$repl$completion_candidates_for_ns(ns_sym,allow_private_QMARK_){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.key),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.filter.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(allow_private_QMARK_)?cljs.core.identity:(function (p1__22681_SHARP_){
return cljs.core.not(new cljs.core.Keyword(null,"private","private",-558947994).cljs$core$IFn$_invoke$arity$1(cljs.core.val(p1__22681_SHARP_)));
}))),cljs.core.remove.cljs$core$IFn$_invoke$arity$1((function (p1__22682_SHARP_){
return new cljs.core.Keyword(null,"anonymous","anonymous",447897231).cljs$core$IFn$_invoke$arity$1(cljs.core.val(p1__22682_SHARP_));
}))),cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.merge,cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"defs","defs",1398449717),new cljs.core.Keyword(null,"macros","macros",811339431)).call(null,lumo.repl.get_namespace(ns_sym)))));
});
lumo.repl.completion_candidates_for_current_ns = (function lumo$repl$completion_candidates_for_current_ns(){
var cur_ns = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lumo.repl.current_ns) : cljs.core.deref.call(null,lumo.repl.current_ns));
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(lumo.repl.completion_candidates_for_ns(cur_ns,true),cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1(cljs.core.keys),cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.str)),cljs.core.juxt.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"renames","renames",343278368),new cljs.core.Keyword(null,"rename-macros","rename-macros",1076432512),new cljs.core.Keyword(null,"uses","uses",232664692),cljs.core.array_seq([new cljs.core.Keyword(null,"use-macros","use-macros",-905638393)], 0)).call(null,lumo.repl.get_namespace(cur_ns)));
});
lumo.repl.is_completion_QMARK_ = (function lumo$repl$is_completion_QMARK_(match_suffix,candidate){
return cljs.core.re_find((new RegExp([cljs.core.str("^"),cljs.core.str(match_suffix)].join(''))),candidate);
});
lumo.repl.keyword_completions = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.str),new cljs.core.PersistentVector(null, 31, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"require","require",-468001333),new cljs.core.Keyword(null,"require-macros","require-macros",707947416),new cljs.core.Keyword(null,"import","import",-1399500709),new cljs.core.Keyword(null,"refer","refer",-964295553),new cljs.core.Keyword(null,"refer-macros","refer-macros",-1906841953),new cljs.core.Keyword(null,"include-macros","include-macros",1228110289),new cljs.core.Keyword(null,"refer-clojure","refer-clojure",813784440),new cljs.core.Keyword(null,"exclude","exclude",-1230250334),new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.Keyword(null,"strs","strs",1175537277),new cljs.core.Keyword(null,"syms","syms",-1575891762),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"pre","pre",2118456869),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"let","let",-1282412701),new cljs.core.Keyword(null,"when","when",-576417306),new cljs.core.Keyword(null,"while","while",963117786),new cljs.core.Keyword(null,"clj","clj",-660495428),new cljs.core.Keyword(null,"cljs","cljs",1492417629),new cljs.core.Keyword(null,"default","default",-1987822328),new cljs.core.Keyword(null,"else","else",-1508377146),new cljs.core.Keyword(null,"gen-class","gen-class",-426712454),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt","opt",-794706369),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
lumo.repl.namespace_completion_exclusions = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.str),new cljs.core.PersistentVector(null, 22, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lumo.core","lumo.core",630198293,null),new cljs.core.Symbol(null,"lumo.bundle","lumo.bundle",-250212332,null),new cljs.core.Symbol(null,"lumo.js-deps","lumo.js-deps",-1966439979,null),new cljs.core.Symbol(null,"lumo.repl","lumo.repl",955582054,null),new cljs.core.Symbol(null,"lumo.repl-resources","lumo.repl-resources",1414495908,null),new cljs.core.Symbol(null,"cognitect.transit","cognitect.transit",-750660177,null),new cljs.core.Symbol(null,"lazy-map.core","lazy-map.core",462322712,null),new cljs.core.Symbol(null,"cljs.source-map","cljs.source-map",2108014936,null),new cljs.core.Symbol(null,"cljs.source-map.base64","cljs.source-map.base64",-1764326399,null),new cljs.core.Symbol(null,"cljs.source-map.base64-vlq","cljs.source-map.base64-vlq",-397707708,null),new cljs.core.Symbol(null,"cljs.tools.reader.impl.commons","cljs.tools.reader.impl.commons",1569241026,null),new cljs.core.Symbol(null,"cljs.tools.reader.impl.utils","cljs.tools.reader.impl.utils",1797659699,null),new cljs.core.Symbol(null,"cljs.stacktrace","cljs.stacktrace",880035689,null),new cljs.core.Symbol(null,"com.cognitect.transit.delimiters","com.cognitect.transit.delimiters",1417763597,null),new cljs.core.Symbol(null,"com.cognitect.transit.handlers","com.cognitect.transit.handlers",38735120,null),new cljs.core.Symbol(null,"com.cognitect.transit.util","com.cognitect.transit.util",1904904517,null),new cljs.core.Symbol(null,"com.cognitect.transit.caching","com.cognitect.transit.caching",-2079242149,null),new cljs.core.Symbol(null,"com.cognitect.transit.types","com.cognitect.transit.types",-696098260,null),new cljs.core.Symbol(null,"com.cognitect.transit.eq","com.cognitect.transit.eq",-1287663417,null),new cljs.core.Symbol(null,"com.cognitect.transit.impl.decoder","com.cognitect.transit.impl.decoder",-1549501619,null),new cljs.core.Symbol(null,"com.cognitect.transit.impl.reader","com.cognitect.transit.impl.reader",1766776582,null),new cljs.core.Symbol(null,"com.cognitect.transit.impl.writer","com.cognitect.transit.impl.writer",-898356674,null)], null));
lumo.repl.namespace_completion_additons = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.str),new cljs.core.PersistentVector(null, 27, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"clojure.test","clojure.test",-699730006,null),new cljs.core.Symbol(null,"clojure.spec","clojure.spec",316750185,null),new cljs.core.Symbol(null,"clojure.pprint","clojure.pprint",-547379114,null),new cljs.core.Symbol(null,"cljs.analyzer","cljs.analyzer",1897881911,null),new cljs.core.Symbol(null,"cljs.analyzer.api","cljs.analyzer.api",1016020812,null),new cljs.core.Symbol(null,"cljs.compiler","cljs.compiler",-77239712,null),new cljs.core.Symbol(null,"cljs.env","cljs.env",-1810013139,null),new cljs.core.Symbol(null,"cljs.js","cljs.js",474485962,null),new cljs.core.Symbol(null,"cljs.nodejs","cljs.nodejs",1856951313,null),new cljs.core.Symbol(null,"cljs.pprint","cljs.pprint",-966900911,null),new cljs.core.Symbol(null,"cljs.reader","cljs.reader",1327473948,null),new cljs.core.Symbol(null,"cljs.spec","cljs.spec",-1965249603,null),new cljs.core.Symbol(null,"cljs.spec.impl.gen","cljs.spec.impl.gen",-1804355371,null),new cljs.core.Symbol(null,"cljs.tagged-literals","cljs.tagged-literals",387033363,null),new cljs.core.Symbol(null,"cljs.test","cljs.test",884805483,null),new cljs.core.Symbol(null,"cljs.tools.reader","cljs.tools.reader",-831293977,null),new cljs.core.Symbol(null,"cljs.tools.reader.reader-types","cljs.tools.reader.reader-types",-346100821,null),new cljs.core.Symbol(null,"clojure.core.reducers","clojure.core.reducers",2120855305,null),new cljs.core.Symbol(null,"clojure.data","clojure.data",-2083828516,null),new cljs.core.Symbol(null,"clojure.string","clojure.string",-1415552165,null),new cljs.core.Symbol(null,"clojure.set","clojure.set",-630955632,null),new cljs.core.Symbol(null,"clojure.zip","clojure.zip",1232047716,null),new cljs.core.Symbol(null,"clojure.walk","clojure.walk",1625897340,null),new cljs.core.Symbol(null,"cognitect.transit","cognitect.transit",-750660177,null),new cljs.core.Symbol(null,"lazy-map.core","lazy-map.core",462322712,null),new cljs.core.Symbol(null,"com.cognitect.transit","com.cognitect.transit",-1293839816,null),new cljs.core.Symbol(null,"com.cognitect.transit","com.cognitect.transit",-1293839816,null)], null));
lumo.repl.namespace_completions = (function lumo$repl$namespace_completions(){
return cljs.core.transduce.cljs$core$IFn$_invoke$arity$4(cljs.core.comp.cljs$core$IFn$_invoke$arity$3(cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.str),cljs.core.map.cljs$core$IFn$_invoke$arity$1(lumo.repl.drop_macros_suffix),cljs.core.remove.cljs$core$IFn$_invoke$arity$1(lumo.repl.namespace_completion_exclusions)),cljs.core.conj,lumo.repl.namespace_completion_additons,lumo.repl.all_ns());
});
/**
 * Expand a namespace alias symbol to a known namespace, consulting
 * current namespace aliases if necessary.
 */
lumo.repl.expand_ns_alias = (function lumo$repl$expand_ns_alias(alias){
var or__7523__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lumo.repl.st,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),alias,new cljs.core.Keyword(null,"name","name",1843675177)], null));
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
var or__7523__auto____$1 = (function (){var G__22698 = lumo.repl.current_alias_map();
return (alias.cljs$core$IFn$_invoke$arity$1 ? alias.cljs$core$IFn$_invoke$arity$1(G__22698) : alias.call(null,G__22698));
})();
if(cljs.core.truth_(or__7523__auto____$1)){
return or__7523__auto____$1;
} else {
return alias;
}
}
});
lumo.repl.completion_candidates = (function lumo$repl$completion_candidates(top_level_QMARK_,ns_alias){
if(cljs.core.truth_(ns_alias)){
var full_ns = lumo.repl.expand_ns_alias(cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(ns_alias));
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1(cljs.core.identity),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lumo.repl.completion_candidates_for_ns(full_ns,false),lumo.repl.completion_candidates_for_ns(lumo.repl.add_macros_suffix(full_ns),false)], null));
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1(cljs.core.identity),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [lumo.repl.keyword_completions,lumo.repl.namespace_completions(),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__22706_SHARP_){
return [cljs.core.str(p1__22706_SHARP_),cljs.core.str("/")].join('');
}),cljs.core.keys(lumo.repl.current_alias_map())),lumo.repl.completion_candidates_for_ns(new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null),false),lumo.repl.completion_candidates_for_ns(new cljs.core.Symbol(null,"cljs.core$macros","cljs.core$macros",-2057787548,null),false),lumo.repl.completion_candidates_for_current_ns(),(cljs.core.truth_(top_level_QMARK_)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.keys(lumo.repl_resources.special_doc_map)),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.keys(lumo.repl_resources.repl_special_doc_map))):null)], null));
}
});
lumo.repl.get_completions = (function lumo$repl$get_completions(line){
var top_level_QMARK_ = cljs.core.boolean$(cljs.core.re_find(/^\s*\(\s*[^()\s]*$/,line));
var ns_alias = cljs.core.second(cljs.core.re_find(/\(*(\b[a-zA-Z-.]+)\/[a-zA-Z-]+$/,line));
var line_match_suffix = cljs.core.re_find(/:?[a-zA-Z-.]*$/,line);
var line_prefix = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(line,(0),(cljs.core.count(line) - cljs.core.count(line_match_suffix)));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("",line_match_suffix)){
return [];
} else {
var completions = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (line_match_suffix,line_prefix,top_level_QMARK_,ns_alias){
return (function (ret,item){
var G__22715 = ret;
G__22715.push([cljs.core.str(line_prefix),cljs.core.str(item)].join(''));

return G__22715;
});})(line_match_suffix,line_prefix,top_level_QMARK_,ns_alias))
,[],cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (line_match_suffix,line_prefix,top_level_QMARK_,ns_alias){
return (function (p1__22712_SHARP_){
return lumo.repl.is_completion_QMARK_(line_match_suffix,p1__22712_SHARP_);
});})(line_match_suffix,line_prefix,top_level_QMARK_,ns_alias))
,lumo.repl.completion_candidates(top_level_QMARK_,ns_alias)));
var G__22716 = completions;
G__22716.sort();

return G__22716;
}
});
goog.exportSymbol('lumo.repl.get_completions', lumo.repl.get_completions);
