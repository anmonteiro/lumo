// Compiled by ClojureScript 1.9.293 {:static-fns true, :optimize-constants false, :target :nodejs}
goog.provide('lumo.classpath');
goog.require('cljs.core');
goog.require('clojure.string');
lumo.classpath.directory_QMARK_ = (function lumo$classpath$directory_QMARK_(path){
return LUMO_STAT(path).isDirectory();
});
lumo.classpath.file_QMARK_ = (function lumo$classpath$file_QMARK_(path){
var and__7511__auto__ = LUMO_STAT(path).isFile();
if(cljs.core.truth_(and__7511__auto__)){
return (clojure.string.ends_with_QMARK_(path,".cljs")) || (clojure.string.ends_with_QMARK_(path,".cljc"));
} else {
return and__7511__auto__;
}
});
lumo.classpath.jarfile_QMARK_ = (function lumo$classpath$jarfile_QMARK_(path){
return clojure.string.ends_with_QMARK_(path,".jar");
});
lumo.classpath.filenames = (function lumo$classpath$filenames(path){
if(cljs.core.truth_(lumo.classpath.jarfile_QMARK_(path))){
return path;
} else {
var root = cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(LUMO_READDIR(path));
var root_files = cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (root){
return (function (p1__12201_SHARP_){
return lumo.classpath.file_QMARK_([cljs.core.str(path),cljs.core.str("/"),cljs.core.str(p1__12201_SHARP_)].join(''));
});})(root))
,root);
var sub_dirs = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (root,root_files){
return (function (p1__12202_SHARP_){
return [cljs.core.str(path),cljs.core.str("/"),cljs.core.str(p1__12202_SHARP_)].join('');
});})(root,root_files))
,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (root,root_files){
return (function (p1__12207_SHARP_){
return lumo.classpath.directory_QMARK_([cljs.core.str(path),cljs.core.str("/"),cljs.core.str(p1__12207_SHARP_)].join(''));
});})(root,root_files))
,root));
var sub_files = cljs.core.map.cljs$core$IFn$_invoke$arity$2(lumo.classpath.filenames,sub_dirs);
return cljs.core.flatten(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [root_files,sub_files], null));
}
});
lumo.classpath.classpath = (function lumo$classpath$classpath(){
return LUMO_READ_SOURCES();
});
goog.exportSymbol('lumo.classpath.classpath', lumo.classpath.classpath);
lumo.classpath.classpath_files = (function lumo$classpath$classpath_files(){
return cljs.core.flatten(cljs.core.map.cljs$core$IFn$_invoke$arity$2(lumo.classpath.filenames,lumo.classpath.classpath()));
});
goog.exportSymbol('lumo.classpath.classpath_files', lumo.classpath.classpath_files);
lumo.classpath.classpath_jarfiles = (function lumo$classpath$classpath_jarfiles(){
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2(lumo.classpath.jarfile_QMARK_,lumo.classpath.classpath());
});
goog.exportSymbol('lumo.classpath.classpath_jarfiles', lumo.classpath.classpath_jarfiles);
lumo.classpath.add_source_BANG_ = (function lumo$classpath$add_source_BANG_(path){
var G__12261 = [path];
return LUMO_ADD_SOURCES(G__12261);
});
goog.exportSymbol('lumo.classpath.add_source_BANG_', lumo.classpath.add_source_BANG_);
lumo.classpath.remove_source_BANG_ = (function lumo$classpath$remove_source_BANG_(path){
return LUMO_REMOVE_SOURCE(path);
});
goog.exportSymbol('lumo.classpath.remove_source_BANG_', lumo.classpath.remove_source_BANG_);
