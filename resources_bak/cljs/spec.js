// Compiled by ClojureScript 1.9.293 {:static-fns true, :optimize-constants false, :target :nodejs}
goog.provide('cljs.spec');
goog.require('cljs.core');
goog.require('cljs.core');
goog.require('goog.object');
goog.require('clojure.walk');
goog.require('cljs.spec.impl.gen');
goog.require('clojure.string');
cljs.spec.MAX_INT = (9007199254740991);
/**
 * A soft limit on how many times a branching spec (or/alt/* /opt-keys/multi-spec)
 *   can be recursed through during generation. After this a
 *   non-recursive branch will be chosen.
 */
cljs.spec._STAR_recursion_limit_STAR_ = (4);
/**
 * The number of times an anonymous fn specified by fspec will be (generatively) tested during conform
 */
cljs.spec._STAR_fspec_iterations_STAR_ = (21);
/**
 * The number of items validated in a collection spec'ed with 'every'
 */
cljs.spec._STAR_coll_check_limit_STAR_ = (101);
/**
 * The number of errors reported by explain in a collection spec'ed with 'every'
 */
cljs.spec._STAR_coll_error_limit_STAR_ = (20);

/**
 * @interface
 */
cljs.spec.Spec = function(){};

cljs.spec.conform_STAR_ = (function cljs$spec$conform_STAR_(spec,x){
if((!((spec == null))) && (!((spec.cljs$spec$Spec$conform_STAR_$arity$2 == null)))){
return spec.cljs$spec$Spec$conform_STAR_$arity$2(spec,x);
} else {
var x__8236__auto__ = (((spec == null))?null:spec);
var m__8237__auto__ = (cljs.spec.conform_STAR_[goog.typeOf(x__8236__auto__)]);
if(!((m__8237__auto__ == null))){
return (m__8237__auto__.cljs$core$IFn$_invoke$arity$2 ? m__8237__auto__.cljs$core$IFn$_invoke$arity$2(spec,x) : m__8237__auto__.call(null,spec,x));
} else {
var m__8237__auto____$1 = (cljs.spec.conform_STAR_["_"]);
if(!((m__8237__auto____$1 == null))){
return (m__8237__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__8237__auto____$1.cljs$core$IFn$_invoke$arity$2(spec,x) : m__8237__auto____$1.call(null,spec,x));
} else {
throw cljs.core.missing_protocol("Spec.conform*",spec);
}
}
}
});

cljs.spec.unform_STAR_ = (function cljs$spec$unform_STAR_(spec,y){
if((!((spec == null))) && (!((spec.cljs$spec$Spec$unform_STAR_$arity$2 == null)))){
return spec.cljs$spec$Spec$unform_STAR_$arity$2(spec,y);
} else {
var x__8236__auto__ = (((spec == null))?null:spec);
var m__8237__auto__ = (cljs.spec.unform_STAR_[goog.typeOf(x__8236__auto__)]);
if(!((m__8237__auto__ == null))){
return (m__8237__auto__.cljs$core$IFn$_invoke$arity$2 ? m__8237__auto__.cljs$core$IFn$_invoke$arity$2(spec,y) : m__8237__auto__.call(null,spec,y));
} else {
var m__8237__auto____$1 = (cljs.spec.unform_STAR_["_"]);
if(!((m__8237__auto____$1 == null))){
return (m__8237__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__8237__auto____$1.cljs$core$IFn$_invoke$arity$2(spec,y) : m__8237__auto____$1.call(null,spec,y));
} else {
throw cljs.core.missing_protocol("Spec.unform*",spec);
}
}
}
});

cljs.spec.explain_STAR_ = (function cljs$spec$explain_STAR_(spec,path,via,in$,x){
if((!((spec == null))) && (!((spec.cljs$spec$Spec$explain_STAR_$arity$5 == null)))){
return spec.cljs$spec$Spec$explain_STAR_$arity$5(spec,path,via,in$,x);
} else {
var x__8236__auto__ = (((spec == null))?null:spec);
var m__8237__auto__ = (cljs.spec.explain_STAR_[goog.typeOf(x__8236__auto__)]);
if(!((m__8237__auto__ == null))){
return (m__8237__auto__.cljs$core$IFn$_invoke$arity$5 ? m__8237__auto__.cljs$core$IFn$_invoke$arity$5(spec,path,via,in$,x) : m__8237__auto__.call(null,spec,path,via,in$,x));
} else {
var m__8237__auto____$1 = (cljs.spec.explain_STAR_["_"]);
if(!((m__8237__auto____$1 == null))){
return (m__8237__auto____$1.cljs$core$IFn$_invoke$arity$5 ? m__8237__auto____$1.cljs$core$IFn$_invoke$arity$5(spec,path,via,in$,x) : m__8237__auto____$1.call(null,spec,path,via,in$,x));
} else {
throw cljs.core.missing_protocol("Spec.explain*",spec);
}
}
}
});

cljs.spec.gen_STAR_ = (function cljs$spec$gen_STAR_(spec,overrides,path,rmap){
if((!((spec == null))) && (!((spec.cljs$spec$Spec$gen_STAR_$arity$4 == null)))){
return spec.cljs$spec$Spec$gen_STAR_$arity$4(spec,overrides,path,rmap);
} else {
var x__8236__auto__ = (((spec == null))?null:spec);
var m__8237__auto__ = (cljs.spec.gen_STAR_[goog.typeOf(x__8236__auto__)]);
if(!((m__8237__auto__ == null))){
return (m__8237__auto__.cljs$core$IFn$_invoke$arity$4 ? m__8237__auto__.cljs$core$IFn$_invoke$arity$4(spec,overrides,path,rmap) : m__8237__auto__.call(null,spec,overrides,path,rmap));
} else {
var m__8237__auto____$1 = (cljs.spec.gen_STAR_["_"]);
if(!((m__8237__auto____$1 == null))){
return (m__8237__auto____$1.cljs$core$IFn$_invoke$arity$4 ? m__8237__auto____$1.cljs$core$IFn$_invoke$arity$4(spec,overrides,path,rmap) : m__8237__auto____$1.call(null,spec,overrides,path,rmap));
} else {
throw cljs.core.missing_protocol("Spec.gen*",spec);
}
}
}
});

cljs.spec.with_gen_STAR_ = (function cljs$spec$with_gen_STAR_(spec,gfn){
if((!((spec == null))) && (!((spec.cljs$spec$Spec$with_gen_STAR_$arity$2 == null)))){
return spec.cljs$spec$Spec$with_gen_STAR_$arity$2(spec,gfn);
} else {
var x__8236__auto__ = (((spec == null))?null:spec);
var m__8237__auto__ = (cljs.spec.with_gen_STAR_[goog.typeOf(x__8236__auto__)]);
if(!((m__8237__auto__ == null))){
return (m__8237__auto__.cljs$core$IFn$_invoke$arity$2 ? m__8237__auto__.cljs$core$IFn$_invoke$arity$2(spec,gfn) : m__8237__auto__.call(null,spec,gfn));
} else {
var m__8237__auto____$1 = (cljs.spec.with_gen_STAR_["_"]);
if(!((m__8237__auto____$1 == null))){
return (m__8237__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__8237__auto____$1.cljs$core$IFn$_invoke$arity$2(spec,gfn) : m__8237__auto____$1.call(null,spec,gfn));
} else {
throw cljs.core.missing_protocol("Spec.with-gen*",spec);
}
}
}
});

cljs.spec.describe_STAR_ = (function cljs$spec$describe_STAR_(spec){
if((!((spec == null))) && (!((spec.cljs$spec$Spec$describe_STAR_$arity$1 == null)))){
return spec.cljs$spec$Spec$describe_STAR_$arity$1(spec);
} else {
var x__8236__auto__ = (((spec == null))?null:spec);
var m__8237__auto__ = (cljs.spec.describe_STAR_[goog.typeOf(x__8236__auto__)]);
if(!((m__8237__auto__ == null))){
return (m__8237__auto__.cljs$core$IFn$_invoke$arity$1 ? m__8237__auto__.cljs$core$IFn$_invoke$arity$1(spec) : m__8237__auto__.call(null,spec));
} else {
var m__8237__auto____$1 = (cljs.spec.describe_STAR_["_"]);
if(!((m__8237__auto____$1 == null))){
return (m__8237__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__8237__auto____$1.cljs$core$IFn$_invoke$arity$1(spec) : m__8237__auto____$1.call(null,spec));
} else {
throw cljs.core.missing_protocol("Spec.describe*",spec);
}
}
}
});

if(typeof cljs.spec.registry_ref !== 'undefined'){
} else {
cljs.spec.registry_ref = (function (){var G__14938 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__14938) : cljs.core.atom.call(null,G__14938));
})();
}
cljs.spec.named_QMARK_ = (function cljs$spec$named_QMARK_(x){
if(!((x == null))){
if(((x.cljs$lang$protocol_mask$partition1$ & (4096))) || ((cljs.core.PROTOCOL_SENTINEL === x.cljs$core$INamed$))){
return true;
} else {
return false;
}
} else {
return false;
}
});
cljs.spec.with_name = (function cljs$spec$with_name(spec,name){
return cljs.core.with_meta(spec,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.meta(spec),new cljs.core.Keyword("cljs.spec","name","cljs.spec/name",-1902005006),name));
});
cljs.spec.spec_name = (function cljs$spec$spec_name(spec){
if((spec instanceof cljs.core.Keyword)){
return spec;
} else {
if(((!((spec == null)))?((((spec.cljs$lang$protocol_mask$partition0$ & (131072))) || ((cljs.core.PROTOCOL_SENTINEL === spec.cljs$core$IMeta$)))?true:false):false)){
return new cljs.core.Keyword("cljs.spec","name","cljs.spec/name",-1902005006).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(spec));
} else {
return null;
}
}
});
/**
 * returns the spec/regex at end of alias chain starting with k, nil if not found, k if k not Named
 */
cljs.spec.reg_resolve = (function cljs$spec$reg_resolve(k){
if(cljs.core.truth_(cljs.spec.named_QMARK_(k))){
var reg = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.spec.registry_ref) : cljs.core.deref.call(null,cljs.spec.registry_ref));
var spec = k;
while(true){
if(cljs.core.truth_(cljs.spec.named_QMARK_(spec))){
var G__15015 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(reg,spec);
spec = G__15015;
continue;
} else {
if(cljs.core.truth_(spec)){
return cljs.spec.with_name(spec,k);
} else {
return null;
}
}
break;
}
} else {
return k;
}
});
/**
 * returns the spec/regex at end of alias chain starting with k, throws if not found, k if k not ident
 */
cljs.spec.reg_resolve_BANG_ = (function cljs$spec$reg_resolve_BANG_(k){
if(cljs.core.ident_QMARK_(k)){
var or__7523__auto__ = cljs.spec.reg_resolve(k);
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
throw (new Error([cljs.core.str("Unable to resolve spec: "),cljs.core.str(k)].join('')));
}
} else {
return k;
}
});
/**
 * returns x if x is a spec object, else logical false
 */
cljs.spec.spec_QMARK_ = (function cljs$spec$spec_QMARK_(x){
var and__7511__auto__ = ((!((x == null)))?(((false) || ((cljs.core.PROTOCOL_SENTINEL === x.cljs$spec$Spec$)))?true:false):false);
if(and__7511__auto__){
return x;
} else {
return and__7511__auto__;
}
});
/**
 * returns x if x is a (clojure.spec) regex op, else logical false
 */
cljs.spec.regex_QMARK_ = (function cljs$spec$regex_QMARK_(x){
var and__7511__auto__ = new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204).cljs$core$IFn$_invoke$arity$1(x);
if(cljs.core.truth_(and__7511__auto__)){
return x;
} else {
return and__7511__auto__;
}
});
/**
 * spec-or-k must be a spec, regex or resolvable kw/sym, else returns nil.
 */
cljs.spec.maybe_spec = (function cljs$spec$maybe_spec(spec_or_k){
var s = (function (){var or__7523__auto__ = cljs.spec.spec_QMARK_(spec_or_k);
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
var or__7523__auto____$1 = cljs.spec.regex_QMARK_(spec_or_k);
if(cljs.core.truth_(or__7523__auto____$1)){
return or__7523__auto____$1;
} else {
var or__7523__auto____$2 = (function (){var and__7511__auto__ = cljs.spec.named_QMARK_(spec_or_k);
if(cljs.core.truth_(and__7511__auto__)){
return cljs.spec.reg_resolve(spec_or_k);
} else {
return and__7511__auto__;
}
})();
if(cljs.core.truth_(or__7523__auto____$2)){
return or__7523__auto____$2;
} else {
return null;
}
}
}
})();
if(cljs.core.truth_(cljs.spec.regex_QMARK_(s))){
return cljs.spec.with_name((cljs.spec.regex_spec_impl.cljs$core$IFn$_invoke$arity$2 ? cljs.spec.regex_spec_impl.cljs$core$IFn$_invoke$arity$2(s,null) : cljs.spec.regex_spec_impl.call(null,s,null)),cljs.spec.spec_name(s));
} else {
return s;
}
});
/**
 * spec-or-k must be a spec, regex or kw/sym, else returns nil. Throws if unresolvable kw/sym
 */
cljs.spec.the_spec = (function cljs$spec$the_spec(spec_or_k){
var or__7523__auto__ = cljs.spec.maybe_spec(spec_or_k);
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
if(cljs.core.truth_(cljs.spec.named_QMARK_(spec_or_k))){
throw (new Error([cljs.core.str("Unable to resolve spec: "),cljs.core.str(spec_or_k)].join('')));
} else {
return null;
}
}
});
cljs.spec.specize = (function cljs$spec$specize(s){
var or__7523__auto__ = cljs.spec.the_spec(s);
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
var G__15148 = new cljs.core.Keyword("cljs.spec","unknown","cljs.spec/unknown",-1620309582);
var G__15149 = s;
var G__15150 = null;
var G__15151 = null;
return (cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4 ? cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(G__15148,G__15149,G__15150,G__15151) : cljs.spec.spec_impl.call(null,G__15148,G__15149,G__15150,G__15151));
}
});
/**
 * Given a spec and a value, returns :clojure.spec/invalid if value does not match spec,
 *   else the (possibly destructured) value.
 */
cljs.spec.conform = (function cljs$spec$conform(spec,x){
return cljs.spec.conform_STAR_(cljs.spec.specize(spec),x);
});
/**
 * Given a spec and a value created by or compliant with a call to
 *   'conform' with the same spec, returns a value with all conform
 * destructuring undone.
 */
cljs.spec.unform = (function cljs$spec$unform(spec,x){
return cljs.spec.unform_STAR_(cljs.spec.specize(spec),x);
});
/**
 * returns the spec as data
 */
cljs.spec.form = (function cljs$spec$form(spec){
return cljs.spec.describe_STAR_(cljs.spec.specize(spec));
});
cljs.spec.abbrev = (function cljs$spec$abbrev(form){
if(cljs.core.seq_QMARK_(form)){
return clojure.walk.postwalk((function (form__$1){
if(cljs.core.truth_((function (){var and__7511__auto__ = (form__$1 instanceof cljs.core.Symbol);
if(and__7511__auto__){
return cljs.core.namespace(form__$1);
} else {
return and__7511__auto__;
}
})())){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(form__$1));
} else {
if((cljs.core.seq_QMARK_(form__$1)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"fn","fn",465265323,null),cljs.core.first(form__$1))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.second(form__$1)))){
return cljs.core.last(form__$1);
} else {
return form__$1;

}
}
}),form);
} else {
if(cljs.core.truth_((function (){var and__7511__auto__ = (form instanceof cljs.core.Symbol);
if(and__7511__auto__){
return cljs.core.namespace(form);
} else {
return and__7511__auto__;
}
})())){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(form));
} else {
return form;

}
}
});
/**
 * returns an abbreviated description of the spec as data
 */
cljs.spec.describe = (function cljs$spec$describe(spec){
return cljs.spec.abbrev(cljs.spec.form(spec));
});
/**
 * Takes a spec and a no-arg, generator-returning fn and returns a version of that spec that uses that generator
 */
cljs.spec.with_gen = (function cljs$spec$with_gen(spec,gen_fn){
var spec__$1 = cljs.spec.reg_resolve(spec);
if(cljs.core.truth_(cljs.spec.regex_QMARK_(spec__$1))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(spec__$1,new cljs.core.Keyword("cljs.spec","gfn","cljs.spec/gfn",-432034727),gen_fn);
} else {
return cljs.spec.with_gen_STAR_(cljs.spec.specize(spec__$1),gen_fn);
}
});
cljs.spec.explain_data_STAR_ = (function cljs$spec$explain_data_STAR_(spec,path,via,in$,x){
var temp__6753__auto__ = cljs.spec.explain_STAR_(cljs.spec.specize(spec),path,via,in$,x);
if(cljs.core.truth_(temp__6753__auto__)){
var probs = temp__6753__auto__;
if(cljs.core.empty_QMARK_(probs)){
return null;
} else {
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("cljs.spec","problems","cljs.spec/problems",608491678),probs], null);
}
} else {
return null;
}
});
/**
 * Given a spec and a value x which ought to conform, returns nil if x
 *   conforms, else a map with at least the key ::problems whose value is
 *   a collection of problem-maps, where problem-map has at least :path :pred and :val
 *   keys describing the predicate and the value that failed at that
 *   path.
 */
cljs.spec.explain_data = (function cljs$spec$explain_data(spec,x){
return cljs.spec.explain_data_STAR_(spec,cljs.core.PersistentVector.EMPTY,(function (){var temp__6751__auto__ = cljs.spec.spec_name(spec);
if(cljs.core.truth_(temp__6751__auto__)){
var name = temp__6751__auto__;
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [name], null);
} else {
return cljs.core.PersistentVector.EMPTY;
}
})(),cljs.core.PersistentVector.EMPTY,x);
});
/**
 * Default printer for explain-data. nil indicates a successful validation.
 */
cljs.spec.explain_printer = (function cljs$spec$explain_printer(ed){
if(cljs.core.truth_(ed)){
return cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(function (){var sb__8610__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_15254_15305 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_15255_15306 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_15254_15305,_STAR_print_fn_STAR_15255_15306,sb__8610__auto__){
return (function (x__8611__auto__){
return sb__8610__auto__.append(x__8611__auto__);
});})(_STAR_print_newline_STAR_15254_15305,_STAR_print_fn_STAR_15255_15306,sb__8610__auto__))
;

try{var seq__15256_15308 = cljs.core.seq(new cljs.core.Keyword("cljs.spec","problems","cljs.spec/problems",608491678).cljs$core$IFn$_invoke$arity$1(ed));
var chunk__15257_15309 = null;
var count__15258_15310 = (0);
var i__15259_15311 = (0);
while(true){
if((i__15259_15311 < count__15258_15310)){
var map__15260_15312 = chunk__15257_15309.cljs$core$IIndexed$_nth$arity$2(null,i__15259_15311);
var map__15260_15313__$1 = ((((!((map__15260_15312 == null)))?((((map__15260_15312.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15260_15312.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15260_15312):map__15260_15312);
var prob_15314 = map__15260_15313__$1;
var path_15315 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15260_15313__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var pred_15316 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15260_15313__$1,new cljs.core.Keyword(null,"pred","pred",1927423397));
var val_15317 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15260_15313__$1,new cljs.core.Keyword(null,"val","val",128701612));
var reason_15318 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15260_15313__$1,new cljs.core.Keyword(null,"reason","reason",-2070751759));
var via_15319 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15260_15313__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var in_15320 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15260_15313__$1,new cljs.core.Keyword(null,"in","in",-1531184865));
if(cljs.core.empty_QMARK_(in_15320)){
} else {
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["In:",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([in_15320], 0)),""], 0));
}

cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["val: "], 0));

cljs.core.pr.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([val_15317], 0));

cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" fails"], 0));

if(cljs.core.empty_QMARK_(via_15319)){
} else {
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" spec:",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.last(via_15319)], 0))], 0));
}

if(cljs.core.empty_QMARK_(path_15315)){
} else {
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" at:",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([path_15315], 0))], 0));
}

cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" predicate: "], 0));

cljs.core.pr.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.spec.abbrev(pred_15316)], 0));

if(cljs.core.truth_(reason_15318)){
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([", ",reason_15318], 0));
} else {
}

var seq__15262_15324 = cljs.core.seq(prob_15314);
var chunk__15263_15325 = null;
var count__15264_15326 = (0);
var i__15265_15327 = (0);
while(true){
if((i__15265_15327 < count__15264_15326)){
var vec__15266_15328 = chunk__15263_15325.cljs$core$IIndexed$_nth$arity$2(null,i__15265_15327);
var k_15329 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15266_15328,(0),null);
var v_15330 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15266_15328,(1),null);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"path","path",-188191168),null,new cljs.core.Keyword(null,"pred","pred",1927423397),null,new cljs.core.Keyword(null,"via","via",-1904457336),null,new cljs.core.Keyword(null,"val","val",128701612),null,new cljs.core.Keyword(null,"reason","reason",-2070751759),null,new cljs.core.Keyword(null,"in","in",-1531184865),null], null), null).call(null,k_15329))){
} else {
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["\n\t",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([k_15329], 0))," "], 0));

cljs.core.pr.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([v_15330], 0));
}

var G__15334 = seq__15262_15324;
var G__15335 = chunk__15263_15325;
var G__15336 = count__15264_15326;
var G__15337 = (i__15265_15327 + (1));
seq__15262_15324 = G__15334;
chunk__15263_15325 = G__15335;
count__15264_15326 = G__15336;
i__15265_15327 = G__15337;
continue;
} else {
var temp__6753__auto___15338 = cljs.core.seq(seq__15262_15324);
if(temp__6753__auto___15338){
var seq__15262_15341__$1 = temp__6753__auto___15338;
if(cljs.core.chunked_seq_QMARK_(seq__15262_15341__$1)){
var c__8429__auto___15342 = cljs.core.chunk_first(seq__15262_15341__$1);
var G__15345 = cljs.core.chunk_rest(seq__15262_15341__$1);
var G__15346 = c__8429__auto___15342;
var G__15347 = cljs.core.count(c__8429__auto___15342);
var G__15348 = (0);
seq__15262_15324 = G__15345;
chunk__15263_15325 = G__15346;
count__15264_15326 = G__15347;
i__15265_15327 = G__15348;
continue;
} else {
var vec__15269_15349 = cljs.core.first(seq__15262_15341__$1);
var k_15350 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15269_15349,(0),null);
var v_15351 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15269_15349,(1),null);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"path","path",-188191168),null,new cljs.core.Keyword(null,"pred","pred",1927423397),null,new cljs.core.Keyword(null,"via","via",-1904457336),null,new cljs.core.Keyword(null,"val","val",128701612),null,new cljs.core.Keyword(null,"reason","reason",-2070751759),null,new cljs.core.Keyword(null,"in","in",-1531184865),null], null), null).call(null,k_15350))){
} else {
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["\n\t",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([k_15350], 0))," "], 0));

cljs.core.pr.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([v_15351], 0));
}

var G__15352 = cljs.core.next(seq__15262_15341__$1);
var G__15353 = null;
var G__15354 = (0);
var G__15355 = (0);
seq__15262_15324 = G__15352;
chunk__15263_15325 = G__15353;
count__15264_15326 = G__15354;
i__15265_15327 = G__15355;
continue;
}
} else {
}
}
break;
}

cljs.core.newline.cljs$core$IFn$_invoke$arity$0();

var G__15357 = seq__15256_15308;
var G__15358 = chunk__15257_15309;
var G__15359 = count__15258_15310;
var G__15360 = (i__15259_15311 + (1));
seq__15256_15308 = G__15357;
chunk__15257_15309 = G__15358;
count__15258_15310 = G__15359;
i__15259_15311 = G__15360;
continue;
} else {
var temp__6753__auto___15363 = cljs.core.seq(seq__15256_15308);
if(temp__6753__auto___15363){
var seq__15256_15364__$1 = temp__6753__auto___15363;
if(cljs.core.chunked_seq_QMARK_(seq__15256_15364__$1)){
var c__8429__auto___15365 = cljs.core.chunk_first(seq__15256_15364__$1);
var G__15367 = cljs.core.chunk_rest(seq__15256_15364__$1);
var G__15368 = c__8429__auto___15365;
var G__15369 = cljs.core.count(c__8429__auto___15365);
var G__15370 = (0);
seq__15256_15308 = G__15367;
chunk__15257_15309 = G__15368;
count__15258_15310 = G__15369;
i__15259_15311 = G__15370;
continue;
} else {
var map__15275_15373 = cljs.core.first(seq__15256_15364__$1);
var map__15275_15374__$1 = ((((!((map__15275_15373 == null)))?((((map__15275_15373.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15275_15373.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15275_15373):map__15275_15373);
var prob_15375 = map__15275_15374__$1;
var path_15376 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15275_15374__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var pred_15377 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15275_15374__$1,new cljs.core.Keyword(null,"pred","pred",1927423397));
var val_15378 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15275_15374__$1,new cljs.core.Keyword(null,"val","val",128701612));
var reason_15379 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15275_15374__$1,new cljs.core.Keyword(null,"reason","reason",-2070751759));
var via_15380 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15275_15374__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var in_15381 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15275_15374__$1,new cljs.core.Keyword(null,"in","in",-1531184865));
if(cljs.core.empty_QMARK_(in_15381)){
} else {
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["In:",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([in_15381], 0)),""], 0));
}

cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["val: "], 0));

cljs.core.pr.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([val_15378], 0));

cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" fails"], 0));

if(cljs.core.empty_QMARK_(via_15380)){
} else {
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" spec:",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.last(via_15380)], 0))], 0));
}

if(cljs.core.empty_QMARK_(path_15376)){
} else {
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" at:",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([path_15376], 0))], 0));
}

cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" predicate: "], 0));

cljs.core.pr.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.spec.abbrev(pred_15377)], 0));

if(cljs.core.truth_(reason_15379)){
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([", ",reason_15379], 0));
} else {
}

var seq__15279_15382 = cljs.core.seq(prob_15375);
var chunk__15280_15383 = null;
var count__15281_15384 = (0);
var i__15282_15385 = (0);
while(true){
if((i__15282_15385 < count__15281_15384)){
var vec__15283_15386 = chunk__15280_15383.cljs$core$IIndexed$_nth$arity$2(null,i__15282_15385);
var k_15387 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15283_15386,(0),null);
var v_15388 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15283_15386,(1),null);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"path","path",-188191168),null,new cljs.core.Keyword(null,"pred","pred",1927423397),null,new cljs.core.Keyword(null,"via","via",-1904457336),null,new cljs.core.Keyword(null,"val","val",128701612),null,new cljs.core.Keyword(null,"reason","reason",-2070751759),null,new cljs.core.Keyword(null,"in","in",-1531184865),null], null), null).call(null,k_15387))){
} else {
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["\n\t",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([k_15387], 0))," "], 0));

cljs.core.pr.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([v_15388], 0));
}

var G__15389 = seq__15279_15382;
var G__15390 = chunk__15280_15383;
var G__15391 = count__15281_15384;
var G__15392 = (i__15282_15385 + (1));
seq__15279_15382 = G__15389;
chunk__15280_15383 = G__15390;
count__15281_15384 = G__15391;
i__15282_15385 = G__15392;
continue;
} else {
var temp__6753__auto___15395__$1 = cljs.core.seq(seq__15279_15382);
if(temp__6753__auto___15395__$1){
var seq__15279_15396__$1 = temp__6753__auto___15395__$1;
if(cljs.core.chunked_seq_QMARK_(seq__15279_15396__$1)){
var c__8429__auto___15397 = cljs.core.chunk_first(seq__15279_15396__$1);
var G__15398 = cljs.core.chunk_rest(seq__15279_15396__$1);
var G__15399 = c__8429__auto___15397;
var G__15400 = cljs.core.count(c__8429__auto___15397);
var G__15401 = (0);
seq__15279_15382 = G__15398;
chunk__15280_15383 = G__15399;
count__15281_15384 = G__15400;
i__15282_15385 = G__15401;
continue;
} else {
var vec__15287_15402 = cljs.core.first(seq__15279_15396__$1);
var k_15403 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15287_15402,(0),null);
var v_15404 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15287_15402,(1),null);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"path","path",-188191168),null,new cljs.core.Keyword(null,"pred","pred",1927423397),null,new cljs.core.Keyword(null,"via","via",-1904457336),null,new cljs.core.Keyword(null,"val","val",128701612),null,new cljs.core.Keyword(null,"reason","reason",-2070751759),null,new cljs.core.Keyword(null,"in","in",-1531184865),null], null), null).call(null,k_15403))){
} else {
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["\n\t",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([k_15403], 0))," "], 0));

cljs.core.pr.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([v_15404], 0));
}

var G__15405 = cljs.core.next(seq__15279_15396__$1);
var G__15406 = null;
var G__15407 = (0);
var G__15408 = (0);
seq__15279_15382 = G__15405;
chunk__15280_15383 = G__15406;
count__15281_15384 = G__15407;
i__15282_15385 = G__15408;
continue;
}
} else {
}
}
break;
}

cljs.core.newline.cljs$core$IFn$_invoke$arity$0();

var G__15411 = cljs.core.next(seq__15256_15364__$1);
var G__15412 = null;
var G__15413 = (0);
var G__15414 = (0);
seq__15256_15308 = G__15411;
chunk__15257_15309 = G__15412;
count__15258_15310 = G__15413;
i__15259_15311 = G__15414;
continue;
}
} else {
}
}
break;
}

var seq__15291_15416 = cljs.core.seq(ed);
var chunk__15292_15417 = null;
var count__15293_15418 = (0);
var i__15294_15419 = (0);
while(true){
if((i__15294_15419 < count__15293_15418)){
var vec__15296_15421 = chunk__15292_15417.cljs$core$IIndexed$_nth$arity$2(null,i__15294_15419);
var k_15422 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15296_15421,(0),null);
var v_15423 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15296_15421,(1),null);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("cljs.spec","problems","cljs.spec/problems",608491678),null], null), null).call(null,k_15422))){
} else {
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([k_15422], 0))," "], 0));

cljs.core.pr.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([v_15423], 0));

cljs.core.newline.cljs$core$IFn$_invoke$arity$0();
}

var G__15425 = seq__15291_15416;
var G__15426 = chunk__15292_15417;
var G__15427 = count__15293_15418;
var G__15428 = (i__15294_15419 + (1));
seq__15291_15416 = G__15425;
chunk__15292_15417 = G__15426;
count__15293_15418 = G__15427;
i__15294_15419 = G__15428;
continue;
} else {
var temp__6753__auto___15429 = cljs.core.seq(seq__15291_15416);
if(temp__6753__auto___15429){
var seq__15291_15431__$1 = temp__6753__auto___15429;
if(cljs.core.chunked_seq_QMARK_(seq__15291_15431__$1)){
var c__8429__auto___15432 = cljs.core.chunk_first(seq__15291_15431__$1);
var G__15436 = cljs.core.chunk_rest(seq__15291_15431__$1);
var G__15437 = c__8429__auto___15432;
var G__15438 = cljs.core.count(c__8429__auto___15432);
var G__15439 = (0);
seq__15291_15416 = G__15436;
chunk__15292_15417 = G__15437;
count__15293_15418 = G__15438;
i__15294_15419 = G__15439;
continue;
} else {
var vec__15299_15440 = cljs.core.first(seq__15291_15431__$1);
var k_15441 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15299_15440,(0),null);
var v_15442 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15299_15440,(1),null);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("cljs.spec","problems","cljs.spec/problems",608491678),null], null), null).call(null,k_15441))){
} else {
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([k_15441], 0))," "], 0));

cljs.core.pr.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([v_15442], 0));

cljs.core.newline.cljs$core$IFn$_invoke$arity$0();
}

var G__15443 = cljs.core.next(seq__15291_15431__$1);
var G__15444 = null;
var G__15445 = (0);
var G__15446 = (0);
seq__15291_15416 = G__15443;
chunk__15292_15417 = G__15444;
count__15293_15418 = G__15445;
i__15294_15419 = G__15446;
continue;
}
} else {
}
}
break;
}
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_15255_15306;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_15254_15305;
}
return [cljs.core.str(sb__8610__auto__)].join('');
})()], 0));
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Success!"], 0));
}
});
cljs.spec._STAR_explain_out_STAR_ = cljs.spec.explain_printer;
/**
 * Prints explanation data (per 'explain-data') to *out* using the printer in *explain-out*,
 *  by default explain-printer.
 */
cljs.spec.explain_out = (function cljs$spec$explain_out(ed){
return (cljs.spec._STAR_explain_out_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.spec._STAR_explain_out_STAR_.cljs$core$IFn$_invoke$arity$1(ed) : cljs.spec._STAR_explain_out_STAR_.call(null,ed));
});
/**
 * Given a spec and a value that fails to conform, prints an explanation to *out*.
 */
cljs.spec.explain = (function cljs$spec$explain(spec,x){
return cljs.spec.explain_out(cljs.spec.explain_data(spec,x));
});
/**
 * Given a spec and a value that fails to conform, returns an explanation as a string.
 */
cljs.spec.explain_str = (function cljs$spec$explain_str(spec,x){
var sb__8610__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_15459_15464 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_15460_15465 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_15459_15464,_STAR_print_fn_STAR_15460_15465,sb__8610__auto__){
return (function (x__8611__auto__){
return sb__8610__auto__.append(x__8611__auto__);
});})(_STAR_print_newline_STAR_15459_15464,_STAR_print_fn_STAR_15460_15465,sb__8610__auto__))
;

try{cljs.spec.explain(spec,x);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_15460_15465;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_15459_15464;
}
return [cljs.core.str(sb__8610__auto__)].join('');
});
cljs.spec.gensub = (function cljs$spec$gensub(spec,overrides,path,rmap,form){
var spec__$1 = cljs.spec.specize(spec);
var temp__6751__auto__ = (function (){var or__7523__auto__ = (function (){var temp__6753__auto__ = (function (){var or__7523__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(overrides,(function (){var or__7523__auto__ = cljs.spec.spec_name(spec__$1);
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return spec__$1;
}
})());
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(overrides,path);
}
})();
if(cljs.core.truth_(temp__6753__auto__)){
var gfn = temp__6753__auto__;
return (gfn.cljs$core$IFn$_invoke$arity$0 ? gfn.cljs$core$IFn$_invoke$arity$0() : gfn.call(null));
} else {
return null;
}
})();
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.spec.gen_STAR_(spec__$1,overrides,path,rmap);
}
})();
if(cljs.core.truth_(temp__6751__auto__)){
var g = temp__6751__auto__;
return cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((function (g,temp__6751__auto__,spec__$1){
return (function (p1__15472_SHARP_){
return (cljs.spec.valid_QMARK_.cljs$core$IFn$_invoke$arity$2 ? cljs.spec.valid_QMARK_.cljs$core$IFn$_invoke$arity$2(spec__$1,p1__15472_SHARP_) : cljs.spec.valid_QMARK_.call(null,spec__$1,p1__15472_SHARP_));
});})(g,temp__6751__auto__,spec__$1))
,g,(100)], 0));
} else {
throw (new Error([cljs.core.str("Unable to construct gen at: "),cljs.core.str(path),cljs.core.str(" for: "),cljs.core.str(cljs.spec.abbrev(form))].join('')));
}
});
/**
 * Given a spec, returns the generator for it, or throws if none can
 *   be constructed. Optionally an overrides map can be provided which
 *   should map spec names or paths (vectors of keywords) to no-arg
 *   generator-creating fns. These will be used instead of the generators at those
 *   names/paths. Note that parent generator (in the spec or overrides
 *   map) will supersede those of any subtrees. A generator for a regex
 *   op must always return a sequential collection (i.e. a generator for
 *   s/? should return either an empty sequence/vector or a
 *   sequence/vector with one item in it)
 */
cljs.spec.gen = (function cljs$spec$gen(var_args){
var args15476 = [];
var len__8739__auto___15480 = arguments.length;
var i__8740__auto___15482 = (0);
while(true){
if((i__8740__auto___15482 < len__8739__auto___15480)){
args15476.push((arguments[i__8740__auto___15482]));

var G__15483 = (i__8740__auto___15482 + (1));
i__8740__auto___15482 = G__15483;
continue;
} else {
}
break;
}

var G__15478 = args15476.length;
switch (G__15478) {
case 1:
return cljs.spec.gen.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.spec.gen.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15476.length)].join('')));

}
});

cljs.spec.gen.cljs$core$IFn$_invoke$arity$1 = (function (spec){
return cljs.spec.gen.cljs$core$IFn$_invoke$arity$2(spec,null);
});

cljs.spec.gen.cljs$core$IFn$_invoke$arity$2 = (function (spec,overrides){
return cljs.spec.gensub(spec,overrides,cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("cljs.spec","recursion-limit","cljs.spec/recursion-limit",-630131086),cljs.spec._STAR_recursion_limit_STAR_], null),spec);
});

cljs.spec.gen.cljs$lang$maxFixedArity = 2;

/**
 * Do not call this directly, use 'def'
 */
cljs.spec.def_impl = (function cljs$spec$def_impl(k,form,spec){
if(cljs.core.truth_((function (){var and__7511__auto__ = cljs.spec.named_QMARK_(k);
if(cljs.core.truth_(and__7511__auto__)){
return cljs.core.namespace(k);
} else {
return and__7511__auto__;
}
})())){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("k must be namespaced keyword or resolveable symbol"),cljs.core.str("\n"),cljs.core.str("(c/and (named? k) (namespace k))")].join('')));
}

var spec__$1 = (cljs.core.truth_((function (){var or__7523__auto__ = cljs.spec.spec_QMARK_(spec);
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
var or__7523__auto____$1 = cljs.spec.regex_QMARK_(spec);
if(cljs.core.truth_(or__7523__auto____$1)){
return or__7523__auto____$1;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.spec.registry_ref) : cljs.core.deref.call(null,cljs.spec.registry_ref)),spec);
}
}
})())?spec:(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4 ? cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(form,spec,null,null) : cljs.spec.spec_impl.call(null,form,spec,null,null)));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.spec.registry_ref,cljs.core.assoc,k,spec__$1);

return k;
});
/**
 * returns the registry map, prefer 'get-spec' to lookup a spec by name
 */
cljs.spec.registry = (function cljs$spec$registry(){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.spec.registry_ref) : cljs.core.deref.call(null,cljs.spec.registry_ref));
});
/**
 * Returns a symbol from a symbol or var
 */
cljs.spec.__GT_sym = (function cljs$spec$__GT_sym(x){
if(cljs.core.var_QMARK_(x)){
return x.sym;
} else {
return x;
}
});
/**
 * Returns spec registered for keyword/symbol/var k, or nil.
 */
cljs.spec.get_spec = (function cljs$spec$get_spec(k){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.spec.registry(),(((k instanceof cljs.core.Keyword))?k:cljs.spec.__GT_sym(k)));
});
cljs.spec.macroexpand_check = (function cljs$spec$macroexpand_check(v,args){
var specs = cljs.spec.get_spec(v);
var temp__6753__auto__ = new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(specs);
if(cljs.core.truth_(temp__6753__auto__)){
var arg_spec = temp__6753__auto__;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537),cljs.spec.conform(arg_spec,args))){
var ed = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.spec.explain_data_STAR_(arg_spec,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576)], null),(function (){var temp__6751__auto__ = cljs.spec.spec_name(arg_spec);
if(cljs.core.truth_(temp__6751__auto__)){
var name = temp__6751__auto__;
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [name], null);
} else {
return cljs.core.PersistentVector.EMPTY;
}
})(),cljs.core.PersistentVector.EMPTY,args),new cljs.core.Keyword("cljs.spec","args","cljs.spec/args",-367019609),args);
throw (new Error([cljs.core.str("Call to "),cljs.core.str(cljs.spec.__GT_sym(v)),cljs.core.str(" did not conform to spec:\n"),cljs.core.str((function (){var sb__8610__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_15534_15536 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_15535_15537 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_15534_15536,_STAR_print_fn_STAR_15535_15537,sb__8610__auto__,ed,arg_spec,temp__6753__auto__,specs){
return (function (x__8611__auto__){
return sb__8610__auto__.append(x__8611__auto__);
});})(_STAR_print_newline_STAR_15534_15536,_STAR_print_fn_STAR_15535_15537,sb__8610__auto__,ed,arg_spec,temp__6753__auto__,specs))
;

try{cljs.spec.explain_out(ed);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_15535_15537;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_15534_15536;
}
return [cljs.core.str(sb__8610__auto__)].join('');
})())].join('')));
} else {
return null;
}
} else {
return null;
}
});
cljs.spec.recur_limit_QMARK_ = (function cljs$spec$recur_limit_QMARK_(rmap,id,path,k){
return ((cljs.core.get.cljs$core$IFn$_invoke$arity$2(rmap,id) > new cljs.core.Keyword("cljs.spec","recursion-limit","cljs.spec/recursion-limit",-630131086).cljs$core$IFn$_invoke$arity$1(rmap))) && (cljs.core.contains_QMARK_(cljs.core.set(path),k));
});
cljs.spec.inck = (function cljs$spec$inck(m,k){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,k,((function (){var or__7523__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,k);
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return (0);
}
})() + (1)));
});
cljs.spec.dt = (function cljs$spec$dt(var_args){
var args15540 = [];
var len__8739__auto___15546 = arguments.length;
var i__8740__auto___15547 = (0);
while(true){
if((i__8740__auto___15547 < len__8739__auto___15546)){
args15540.push((arguments[i__8740__auto___15547]));

var G__15548 = (i__8740__auto___15547 + (1));
i__8740__auto___15547 = G__15548;
continue;
} else {
}
break;
}

var G__15542 = args15540.length;
switch (G__15542) {
case 3:
return cljs.spec.dt.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.spec.dt.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15540.length)].join('')));

}
});

cljs.spec.dt.cljs$core$IFn$_invoke$arity$3 = (function (pred,x,form){
return cljs.spec.dt.cljs$core$IFn$_invoke$arity$4(pred,x,form,null);
});

cljs.spec.dt.cljs$core$IFn$_invoke$arity$4 = (function (pred,x,form,cpred_QMARK_){
if(cljs.core.truth_(pred)){
var temp__6751__auto__ = cljs.spec.the_spec(pred);
if(cljs.core.truth_(temp__6751__auto__)){
var spec = temp__6751__auto__;
return cljs.spec.conform(spec,x);
} else {
if(cljs.core.ifn_QMARK_(pred)){
if(cljs.core.truth_(cpred_QMARK_)){
return (pred.cljs$core$IFn$_invoke$arity$1 ? pred.cljs$core$IFn$_invoke$arity$1(x) : pred.call(null,x));
} else {
if(cljs.core.truth_((pred.cljs$core$IFn$_invoke$arity$1 ? pred.cljs$core$IFn$_invoke$arity$1(x) : pred.call(null,x)))){
return x;
} else {
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
}
}
} else {
throw (new Error([cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([form], 0))),cljs.core.str(" is not a fn, expected predicate fn")].join('')));
}
}
} else {
return x;
}
});

cljs.spec.dt.cljs$lang$maxFixedArity = 4;

/**
 * Helper function that returns true when x is valid for spec.
 */
cljs.spec.valid_QMARK_ = (function cljs$spec$valid_QMARK_(var_args){
var args15555 = [];
var len__8739__auto___15562 = arguments.length;
var i__8740__auto___15563 = (0);
while(true){
if((i__8740__auto___15563 < len__8739__auto___15562)){
args15555.push((arguments[i__8740__auto___15563]));

var G__15564 = (i__8740__auto___15563 + (1));
i__8740__auto___15563 = G__15564;
continue;
} else {
}
break;
}

var G__15557 = args15555.length;
switch (G__15557) {
case 2:
return cljs.spec.valid_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.spec.valid_QMARK_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15555.length)].join('')));

}
});

cljs.spec.valid_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (spec,x){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537),cljs.spec.dt.cljs$core$IFn$_invoke$arity$3(spec,x,new cljs.core.Keyword("cljs.spec","unknown","cljs.spec/unknown",-1620309582)));
});

cljs.spec.valid_QMARK_.cljs$core$IFn$_invoke$arity$3 = (function (spec,x,form){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537),cljs.spec.dt.cljs$core$IFn$_invoke$arity$3(spec,x,form));
});

cljs.spec.valid_QMARK_.cljs$lang$maxFixedArity = 3;

cljs.spec.explain_1 = (function cljs$spec$explain_1(form,pred,path,via,in$,v){
var pred__$1 = cljs.spec.maybe_spec(pred);
if(cljs.core.truth_(cljs.spec.spec_QMARK_(pred__$1))){
return cljs.spec.explain_STAR_(pred__$1,path,(function (){var temp__6751__auto__ = cljs.spec.spec_name(pred__$1);
if(cljs.core.truth_(temp__6751__auto__)){
var name = temp__6751__auto__;
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(via,name);
} else {
return via;
}
})(),in$,v);
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"pred","pred",1927423397),cljs.spec.abbrev(form),new cljs.core.Keyword(null,"val","val",128701612),v,new cljs.core.Keyword(null,"via","via",-1904457336),via,new cljs.core.Keyword(null,"in","in",-1531184865),in$], null)], null);
}
});
/**
 * Do not call this directly, use 'spec' with a map argument
 */
cljs.spec.map_spec_impl = (function cljs$spec$map_spec_impl(p__15586){
var map__15629 = p__15586;
var map__15629__$1 = ((((!((map__15629 == null)))?((((map__15629.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15629.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__15629):map__15629);
var argm = map__15629__$1;
var opt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15629__$1,new cljs.core.Keyword(null,"opt","opt",-794706369));
var req_un = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15629__$1,new cljs.core.Keyword(null,"req-un","req-un",1074571008));
var opt_un = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15629__$1,new cljs.core.Keyword(null,"opt-un","opt-un",883442496));
var gfn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15629__$1,new cljs.core.Keyword(null,"gfn","gfn",791517474));
var pred_exprs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15629__$1,new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395));
var opt_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15629__$1,new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261));
var req_specs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15629__$1,new cljs.core.Keyword(null,"req-specs","req-specs",553962313));
var req = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15629__$1,new cljs.core.Keyword(null,"req","req",-326448303));
var req_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15629__$1,new cljs.core.Keyword(null,"req-keys","req-keys",514319221));
var opt_specs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15629__$1,new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450));
var pred_forms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15629__$1,new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832));
var keys_pred = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.every_pred,pred_exprs);
var k__GT_s = cljs.core.zipmap(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(req_keys,opt_keys),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(req_specs,opt_specs));
var keys__GT_specs = ((function (keys_pred,k__GT_s,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (p1__15578_SHARP_){
var or__7523__auto__ = (k__GT_s.cljs$core$IFn$_invoke$arity$1 ? k__GT_s.cljs$core$IFn$_invoke$arity$1(p1__15578_SHARP_) : k__GT_s.call(null,p1__15578_SHARP_));
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return p1__15578_SHARP_;
}
});})(keys_pred,k__GT_s,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
;
var id = cljs.core.random_uuid();
if(typeof cljs.spec.t_cljs$spec15631 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.spec.Spec}
 * @implements {cljs.core.IWithMeta}
*/
cljs.spec.t_cljs$spec15631 = (function (opt,req_un,opt_un,gfn,pred_exprs,map__15629,keys_pred,argm,opt_keys,req_specs,p__15586,keys__GT_specs,req,id,req_keys,opt_specs,k__GT_s,pred_forms,meta15632){
this.opt = opt;
this.req_un = req_un;
this.opt_un = opt_un;
this.gfn = gfn;
this.pred_exprs = pred_exprs;
this.map__15629 = map__15629;
this.keys_pred = keys_pred;
this.argm = argm;
this.opt_keys = opt_keys;
this.req_specs = req_specs;
this.p__15586 = p__15586;
this.keys__GT_specs = keys__GT_specs;
this.req = req;
this.id = id;
this.req_keys = req_keys;
this.opt_specs = opt_specs;
this.k__GT_s = k__GT_s;
this.pred_forms = pred_forms;
this.meta15632 = meta15632;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.spec.t_cljs$spec15631.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (_15633,meta15632__$1){
var self__ = this;
var _15633__$1 = this;
return (new cljs.spec.t_cljs$spec15631(self__.opt,self__.req_un,self__.opt_un,self__.gfn,self__.pred_exprs,self__.map__15629,self__.keys_pred,self__.argm,self__.opt_keys,self__.req_specs,self__.p__15586,self__.keys__GT_specs,self__.req,self__.id,self__.req_keys,self__.opt_specs,self__.k__GT_s,self__.pred_forms,meta15632__$1));
});})(keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
;

cljs.spec.t_cljs$spec15631.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (_15633){
var self__ = this;
var _15633__$1 = this;
return self__.meta15632;
});})(keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
;

cljs.spec.t_cljs$spec15631.prototype.cljs$spec$Spec$ = cljs.core.PROTOCOL_SENTINEL;

cljs.spec.t_cljs$spec15631.prototype.cljs$spec$Spec$conform_STAR_$arity$2 = ((function (keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (_,m){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.keys_pred.cljs$core$IFn$_invoke$arity$1 ? self__.keys_pred.cljs$core$IFn$_invoke$arity$1(m) : self__.keys_pred.call(null,m)))){
var reg = cljs.spec.registry();
var ret = m;
var G__15637 = cljs.core.keys(m);
var vec__15638 = G__15637;
var seq__15639 = cljs.core.seq(vec__15638);
var first__15640 = cljs.core.first(seq__15639);
var seq__15639__$1 = cljs.core.next(seq__15639);
var k = first__15640;
var ks = seq__15639__$1;
var keys = vec__15638;
var ret__$1 = ret;
var G__15637__$1 = G__15637;
while(true){
var ret__$2 = ret__$1;
var vec__15641 = G__15637__$1;
var seq__15642 = cljs.core.seq(vec__15641);
var first__15643 = cljs.core.first(seq__15642);
var seq__15642__$1 = cljs.core.next(seq__15642);
var k__$1 = first__15643;
var ks__$1 = seq__15642__$1;
var keys__$1 = vec__15641;
if(cljs.core.truth_(keys__$1)){
if(cljs.core.contains_QMARK_(reg,(self__.keys__GT_specs.cljs$core$IFn$_invoke$arity$1 ? self__.keys__GT_specs.cljs$core$IFn$_invoke$arity$1(k__$1) : self__.keys__GT_specs.call(null,k__$1)))){
var v = cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,k__$1);
var cv = cljs.spec.conform((self__.keys__GT_specs.cljs$core$IFn$_invoke$arity$1 ? self__.keys__GT_specs.cljs$core$IFn$_invoke$arity$1(k__$1) : self__.keys__GT_specs.call(null,k__$1)),v);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cv,new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537))){
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
} else {
var G__15695 = (((cv === v))?ret__$2:cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret__$2,k__$1,cv));
var G__15696 = ks__$1;
ret__$1 = G__15695;
G__15637__$1 = G__15696;
continue;
}
} else {
var G__15698 = ret__$2;
var G__15699 = ks__$1;
ret__$1 = G__15698;
G__15637__$1 = G__15699;
continue;
}
} else {
return ret__$2;
}
break;
}
} else {
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
}
});})(keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
;

cljs.spec.t_cljs$spec15631.prototype.cljs$spec$Spec$unform_STAR_$arity$2 = ((function (keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (_,m){
var self__ = this;
var ___$1 = this;
var reg = cljs.spec.registry();
var ret = m;
var G__15647 = cljs.core.keys(m);
var vec__15648 = G__15647;
var seq__15649 = cljs.core.seq(vec__15648);
var first__15650 = cljs.core.first(seq__15649);
var seq__15649__$1 = cljs.core.next(seq__15649);
var k = first__15650;
var ks = seq__15649__$1;
var keys = vec__15648;
var ret__$1 = ret;
var G__15647__$1 = G__15647;
while(true){
var ret__$2 = ret__$1;
var vec__15651 = G__15647__$1;
var seq__15652 = cljs.core.seq(vec__15651);
var first__15653 = cljs.core.first(seq__15652);
var seq__15652__$1 = cljs.core.next(seq__15652);
var k__$1 = first__15653;
var ks__$1 = seq__15652__$1;
var keys__$1 = vec__15651;
if(cljs.core.truth_(keys__$1)){
if(cljs.core.contains_QMARK_(reg,(self__.keys__GT_specs.cljs$core$IFn$_invoke$arity$1 ? self__.keys__GT_specs.cljs$core$IFn$_invoke$arity$1(k__$1) : self__.keys__GT_specs.call(null,k__$1)))){
var cv = cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,k__$1);
var v = cljs.spec.unform((self__.keys__GT_specs.cljs$core$IFn$_invoke$arity$1 ? self__.keys__GT_specs.cljs$core$IFn$_invoke$arity$1(k__$1) : self__.keys__GT_specs.call(null,k__$1)),cv);
var G__15704 = (((cv === v))?ret__$2:cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret__$2,k__$1,v));
var G__15705 = ks__$1;
ret__$1 = G__15704;
G__15647__$1 = G__15705;
continue;
} else {
var G__15706 = ret__$2;
var G__15707 = ks__$1;
ret__$1 = G__15706;
G__15647__$1 = G__15707;
continue;
}
} else {
return ret__$2;
}
break;
}
});})(keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
;

cljs.spec.t_cljs$spec15631.prototype.cljs$spec$Spec$explain_STAR_$arity$5 = ((function (keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (_,path,via,in$,x){
var self__ = this;
var ___$1 = this;
if(!(cljs.core.map_QMARK_(x))){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"pred","pred",1927423397),new cljs.core.Symbol(null,"map?","map?",-1780568534,null),new cljs.core.Keyword(null,"val","val",128701612),x,new cljs.core.Keyword(null,"via","via",-1904457336),via,new cljs.core.Keyword(null,"in","in",-1531184865),in$], null)], null);
} else {
var reg = cljs.spec.registry();
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.concat,(function (){var temp__6753__auto__ = cljs.core.seq(cljs.core.keep.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,cljs.core.map.cljs$core$IFn$_invoke$arity$3(((function (reg,___$1,keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (pred,form){
if(cljs.core.truth_((pred.cljs$core$IFn$_invoke$arity$1 ? pred.cljs$core$IFn$_invoke$arity$1(x) : pred.call(null,x)))){
return null;
} else {
return cljs.spec.abbrev(form);
}
});})(reg,___$1,keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
,self__.pred_exprs,self__.pred_forms)));
if(temp__6753__auto__){
var probs = temp__6753__auto__;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (probs,temp__6753__auto__,reg,___$1,keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (p1__15583_SHARP_){
return cljs.core.identity(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"pred","pred",1927423397),p1__15583_SHARP_,new cljs.core.Keyword(null,"val","val",128701612),x,new cljs.core.Keyword(null,"via","via",-1904457336),via,new cljs.core.Keyword(null,"in","in",-1531184865),in$], null));
});})(probs,temp__6753__auto__,reg,___$1,keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
,probs);
} else {
return null;
}
})(),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (reg,___$1,keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (p__15656){
var vec__15657 = p__15656;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15657,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15657,(1),null);
if(cljs.core.truth_((function (){var or__7523__auto__ = !(cljs.core.contains_QMARK_(reg,(self__.keys__GT_specs.cljs$core$IFn$_invoke$arity$1 ? self__.keys__GT_specs.cljs$core$IFn$_invoke$arity$1(k) : self__.keys__GT_specs.call(null,k))));
if(or__7523__auto__){
return or__7523__auto__;
} else {
return cljs.spec.valid_QMARK_.cljs$core$IFn$_invoke$arity$3((self__.keys__GT_specs.cljs$core$IFn$_invoke$arity$1 ? self__.keys__GT_specs.cljs$core$IFn$_invoke$arity$1(k) : self__.keys__GT_specs.call(null,k)),v,k);
}
})())){
return null;
} else {
return cljs.spec.explain_1((self__.keys__GT_specs.cljs$core$IFn$_invoke$arity$1 ? self__.keys__GT_specs.cljs$core$IFn$_invoke$arity$1(k) : self__.keys__GT_specs.call(null,k)),(self__.keys__GT_specs.cljs$core$IFn$_invoke$arity$1 ? self__.keys__GT_specs.cljs$core$IFn$_invoke$arity$1(k) : self__.keys__GT_specs.call(null,k)),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,k),via,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(in$,k),v);
}
});})(reg,___$1,keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
,cljs.core.seq(x)));
}
});})(keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
;

cljs.spec.t_cljs$spec15631.prototype.cljs$spec$Spec$gen_STAR_$arity$4 = ((function (keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (_,overrides,path,rmap){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.gfn)){
return (self__.gfn.cljs$core$IFn$_invoke$arity$0 ? self__.gfn.cljs$core$IFn$_invoke$arity$0() : self__.gfn.call(null));
} else {
var rmap__$1 = cljs.spec.inck(rmap,self__.id);
var gen = ((function (rmap__$1,___$1,keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (k,s){
return cljs.spec.gensub(s,overrides,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,k),rmap__$1,k);
});})(rmap__$1,___$1,keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
;
var ogen = ((function (rmap__$1,gen,___$1,keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (k,s){
if(cljs.core.truth_(cljs.spec.recur_limit_QMARK_(rmap__$1,self__.id,path,k))){
return null;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.spec.impl.gen.delay_impl((new cljs.core.Delay(((function (rmap__$1,gen,___$1,keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (){
return cljs.spec.gensub(s,overrides,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,k),rmap__$1,k);
});})(rmap__$1,gen,___$1,keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
,null)))], null);
}
});})(rmap__$1,gen,___$1,keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
;
var req_gens = cljs.core.map.cljs$core$IFn$_invoke$arity$3(gen,self__.req_keys,self__.req_specs);
var opt_gens = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,cljs.core.map.cljs$core$IFn$_invoke$arity$3(ogen,self__.opt_keys,self__.opt_specs));
if(cljs.core.every_QMARK_(cljs.core.identity,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(req_gens,opt_gens))){
var reqs = cljs.core.zipmap(self__.req_keys,req_gens);
var opts = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,opt_gens);
return cljs.spec.impl.gen.bind.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.spec.impl.gen.choose.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(0),cljs.core.count(opts)], 0)),((function (reqs,opts,rmap__$1,gen,ogen,req_gens,opt_gens,___$1,keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (p1__15584_SHARP_){
var args = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.seq(reqs),((cljs.core.seq(opts))?cljs.core.shuffle(cljs.core.seq(opts)):null));
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.spec.impl.gen.hash_map,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,cljs.core.take.cljs$core$IFn$_invoke$arity$2((p1__15584_SHARP_ + cljs.core.count(reqs)),args)));
});})(reqs,opts,rmap__$1,gen,ogen,req_gens,opt_gens,___$1,keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
], 0));
} else {
return null;
}
}
});})(keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
;

cljs.spec.t_cljs$spec15631.prototype.cljs$spec$Spec$with_gen_STAR_$arity$2 = ((function (keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (_,gfn__$1){
var self__ = this;
var ___$1 = this;
var G__15664 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.argm,new cljs.core.Keyword(null,"gfn","gfn",791517474),gfn__$1);
return (cljs.spec.map_spec_impl.cljs$core$IFn$_invoke$arity$1 ? cljs.spec.map_spec_impl.cljs$core$IFn$_invoke$arity$1(G__15664) : cljs.spec.map_spec_impl.call(null,G__15664));
});})(keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
;

cljs.spec.t_cljs$spec15631.prototype.cljs$spec$Spec$describe_STAR_$arity$1 = ((function (keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.cons(new cljs.core.Symbol("cljs.spec","keys","cljs.spec/keys",-927379584,null),(function (){var G__15665 = cljs.core.PersistentVector.EMPTY;
var G__15665__$1 = (cljs.core.truth_(self__.req)?cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(G__15665,new cljs.core.Keyword(null,"req","req",-326448303),cljs.core.array_seq([self__.req], 0)):G__15665);
var G__15665__$2 = (cljs.core.truth_(self__.opt)?cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(G__15665__$1,new cljs.core.Keyword(null,"opt","opt",-794706369),cljs.core.array_seq([self__.opt], 0)):G__15665__$1);
var G__15665__$3 = (cljs.core.truth_(self__.req_un)?cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(G__15665__$2,new cljs.core.Keyword(null,"req-un","req-un",1074571008),cljs.core.array_seq([self__.req_un], 0)):G__15665__$2);
if(cljs.core.truth_(self__.opt_un)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(G__15665__$3,new cljs.core.Keyword(null,"opt-un","opt-un",883442496),cljs.core.array_seq([self__.opt_un], 0));
} else {
return G__15665__$3;
}
})());
});})(keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
;

cljs.spec.t_cljs$spec15631.getBasis = ((function (keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (){
return new cljs.core.PersistentVector(null, 19, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"opt","opt",845825158,null),new cljs.core.Symbol(null,"req-un","req-un",-1579864761,null),new cljs.core.Symbol(null,"opt-un","opt-un",-1770993273,null),new cljs.core.Symbol(null,"gfn","gfn",-1862918295,null),new cljs.core.Symbol(null,"pred-exprs","pred-exprs",-862164374,null),new cljs.core.Symbol(null,"map__15629","map__15629",1889826442,null),new cljs.core.Symbol(null,"keys-pred","keys-pred",-1795451030,null),new cljs.core.Symbol(null,"argm","argm",-181546357,null),new cljs.core.Symbol(null,"opt-keys","opt-keys",-1391747508,null),new cljs.core.Symbol(null,"req-specs","req-specs",-2100473456,null),new cljs.core.Symbol(null,"p__15586","p__15586",1278621810,null),new cljs.core.Symbol(null,"keys->specs","keys->specs",-97897643,null),new cljs.core.Symbol(null,"req","req",1314083224,null),new cljs.core.Symbol(null,"id","id",252129435,null),new cljs.core.Symbol(null,"req-keys","req-keys",-2140116548,null),new cljs.core.Symbol(null,"opt-specs","opt-specs",1255626077,null),new cljs.core.Symbol(null,"k->s","k->s",-1685112801,null),new cljs.core.Symbol(null,"pred-forms","pred-forms",1813143359,null),new cljs.core.Symbol(null,"meta15632","meta15632",-1439571970,null)], null);
});})(keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
;

cljs.spec.t_cljs$spec15631.cljs$lang$type = true;

cljs.spec.t_cljs$spec15631.cljs$lang$ctorStr = "cljs.spec/t_cljs$spec15631";

cljs.spec.t_cljs$spec15631.cljs$lang$ctorPrWriter = ((function (keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function (this__8175__auto__,writer__8176__auto__,opt__8177__auto__){
return cljs.core._write(writer__8176__auto__,"cljs.spec/t_cljs$spec15631");
});})(keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
;

cljs.spec.__GT_t_cljs$spec15631 = ((function (keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms){
return (function cljs$spec$map_spec_impl_$___GT_t_cljs$spec15631(opt__$1,req_un__$1,opt_un__$1,gfn__$1,pred_exprs__$1,map__15629__$2,keys_pred__$1,argm__$1,opt_keys__$1,req_specs__$1,p__15586__$1,keys__GT_specs__$1,req__$1,id__$1,req_keys__$1,opt_specs__$1,k__GT_s__$1,pred_forms__$1,meta15632){
return (new cljs.spec.t_cljs$spec15631(opt__$1,req_un__$1,opt_un__$1,gfn__$1,pred_exprs__$1,map__15629__$2,keys_pred__$1,argm__$1,opt_keys__$1,req_specs__$1,p__15586__$1,keys__GT_specs__$1,req__$1,id__$1,req_keys__$1,opt_specs__$1,k__GT_s__$1,pred_forms__$1,meta15632));
});})(keys_pred,k__GT_s,keys__GT_specs,id,map__15629,map__15629__$1,argm,opt,req_un,opt_un,gfn,pred_exprs,opt_keys,req_specs,req,req_keys,opt_specs,pred_forms))
;

}

return (new cljs.spec.t_cljs$spec15631(opt,req_un,opt_un,gfn,pred_exprs,map__15629__$1,keys_pred,argm,opt_keys,req_specs,p__15586,keys__GT_specs,req,id,req_keys,opt_specs,k__GT_s,pred_forms,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Do not call this directly, use 'spec'
 */
cljs.spec.spec_impl = (function cljs$spec$spec_impl(var_args){
var args15739 = [];
var len__8739__auto___15747 = arguments.length;
var i__8740__auto___15748 = (0);
while(true){
if((i__8740__auto___15748 < len__8739__auto___15747)){
args15739.push((arguments[i__8740__auto___15748]));

var G__15749 = (i__8740__auto___15748 + (1));
i__8740__auto___15748 = G__15749;
continue;
} else {
}
break;
}

var G__15741 = args15739.length;
switch (G__15741) {
case 4:
return cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15739.length)].join('')));

}
});

cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4 = (function (form,pred,gfn,cpred_QMARK_){
return cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$5(form,pred,gfn,cpred_QMARK_,null);
});

cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$5 = (function (form,pred,gfn,cpred_QMARK_,unc){
if(cljs.core.truth_(cljs.spec.spec_QMARK_(pred))){
var G__15742 = pred;
if(cljs.core.truth_(gfn)){
return cljs.spec.with_gen(G__15742,gfn);
} else {
return G__15742;
}
} else {
if(cljs.core.truth_(cljs.spec.regex_QMARK_(pred))){
return (cljs.spec.regex_spec_impl.cljs$core$IFn$_invoke$arity$2 ? cljs.spec.regex_spec_impl.cljs$core$IFn$_invoke$arity$2(pred,gfn) : cljs.spec.regex_spec_impl.call(null,pred,gfn));
} else {
if(cljs.core.truth_(cljs.spec.named_QMARK_(pred))){
var G__15743 = cljs.spec.the_spec(pred);
if(cljs.core.truth_(gfn)){
return cljs.spec.with_gen(G__15743,gfn);
} else {
return G__15743;
}
} else {
if(typeof cljs.spec.t_cljs$spec15744 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.spec.Spec}
 * @implements {cljs.core.IWithMeta}
*/
cljs.spec.t_cljs$spec15744 = (function (form,pred,gfn,cpred_QMARK_,unc,meta15745){
this.form = form;
this.pred = pred;
this.gfn = gfn;
this.cpred_QMARK_ = cpred_QMARK_;
this.unc = unc;
this.meta15745 = meta15745;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.spec.t_cljs$spec15744.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15746,meta15745__$1){
var self__ = this;
var _15746__$1 = this;
return (new cljs.spec.t_cljs$spec15744(self__.form,self__.pred,self__.gfn,self__.cpred_QMARK_,self__.unc,meta15745__$1));
});

cljs.spec.t_cljs$spec15744.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15746){
var self__ = this;
var _15746__$1 = this;
return self__.meta15745;
});

cljs.spec.t_cljs$spec15744.prototype.cljs$spec$Spec$ = cljs.core.PROTOCOL_SENTINEL;

cljs.spec.t_cljs$spec15744.prototype.cljs$spec$Spec$conform_STAR_$arity$2 = (function (_,x){
var self__ = this;
var ___$1 = this;
return cljs.spec.dt.cljs$core$IFn$_invoke$arity$4(self__.pred,x,self__.form,self__.cpred_QMARK_);
});

cljs.spec.t_cljs$spec15744.prototype.cljs$spec$Spec$unform_STAR_$arity$2 = (function (_,x){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.cpred_QMARK_)){
if(cljs.core.truth_(self__.unc)){
return (self__.unc.cljs$core$IFn$_invoke$arity$1 ? self__.unc.cljs$core$IFn$_invoke$arity$1(x) : self__.unc.call(null,x));
} else {
throw (new Error("no unform fn for conformer"));
}
} else {
return x;
}
});

cljs.spec.t_cljs$spec15744.prototype.cljs$spec$Spec$explain_STAR_$arity$5 = (function (_,path,via,in$,x){
var self__ = this;
var ___$1 = this;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537),cljs.spec.dt.cljs$core$IFn$_invoke$arity$4(self__.pred,x,self__.form,self__.cpred_QMARK_))){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"pred","pred",1927423397),cljs.spec.abbrev(self__.form),new cljs.core.Keyword(null,"val","val",128701612),x,new cljs.core.Keyword(null,"via","via",-1904457336),via,new cljs.core.Keyword(null,"in","in",-1531184865),in$], null)], null);
} else {
return null;
}
});

cljs.spec.t_cljs$spec15744.prototype.cljs$spec$Spec$gen_STAR_$arity$4 = (function (_,___$1,___$2,___$3){
var self__ = this;
var ___$4 = this;
if(cljs.core.truth_(self__.gfn)){
return (self__.gfn.cljs$core$IFn$_invoke$arity$0 ? self__.gfn.cljs$core$IFn$_invoke$arity$0() : self__.gfn.call(null));
} else {
return cljs.spec.impl.gen.gen_for_pred(self__.pred);
}
});

cljs.spec.t_cljs$spec15744.prototype.cljs$spec$Spec$with_gen_STAR_$arity$2 = (function (_,gfn__$1){
var self__ = this;
var ___$1 = this;
return cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$5(self__.form,self__.pred,gfn__$1,self__.cpred_QMARK_,self__.unc);
});

cljs.spec.t_cljs$spec15744.prototype.cljs$spec$Spec$describe_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.form;
});

cljs.spec.t_cljs$spec15744.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"form","form",16469056,null),new cljs.core.Symbol(null,"pred","pred",-727012372,null),new cljs.core.Symbol(null,"gfn","gfn",-1862918295,null),new cljs.core.Symbol(null,"cpred?","cpred?",35589515,null),new cljs.core.Symbol(null,"unc","unc",-465250751,null),new cljs.core.Symbol(null,"meta15745","meta15745",-986837827,null)], null);
});

cljs.spec.t_cljs$spec15744.cljs$lang$type = true;

cljs.spec.t_cljs$spec15744.cljs$lang$ctorStr = "cljs.spec/t_cljs$spec15744";

cljs.spec.t_cljs$spec15744.cljs$lang$ctorPrWriter = (function (this__8175__auto__,writer__8176__auto__,opt__8177__auto__){
return cljs.core._write(writer__8176__auto__,"cljs.spec/t_cljs$spec15744");
});

cljs.spec.__GT_t_cljs$spec15744 = (function cljs$spec$__GT_t_cljs$spec15744(form__$1,pred__$1,gfn__$1,cpred_QMARK___$1,unc__$1,meta15745){
return (new cljs.spec.t_cljs$spec15744(form__$1,pred__$1,gfn__$1,cpred_QMARK___$1,unc__$1,meta15745));
});

}

return (new cljs.spec.t_cljs$spec15744(form,pred,gfn,cpred_QMARK_,unc,cljs.core.PersistentArrayMap.EMPTY));

}
}
}
});

cljs.spec.spec_impl.cljs$lang$maxFixedArity = 5;

/**
 * Do not call this directly, use 'multi-spec'
 */
cljs.spec.multi_spec_impl = (function cljs$spec$multi_spec_impl(var_args){
var args15773 = [];
var len__8739__auto___15813 = arguments.length;
var i__8740__auto___15814 = (0);
while(true){
if((i__8740__auto___15814 < len__8739__auto___15813)){
args15773.push((arguments[i__8740__auto___15814]));

var G__15815 = (i__8740__auto___15814 + (1));
i__8740__auto___15814 = G__15815;
continue;
} else {
}
break;
}

var G__15779 = args15773.length;
switch (G__15779) {
case 3:
return cljs.spec.multi_spec_impl.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.spec.multi_spec_impl.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15773.length)].join('')));

}
});

cljs.spec.multi_spec_impl.cljs$core$IFn$_invoke$arity$3 = (function (form,mmvar,retag){
return cljs.spec.multi_spec_impl.cljs$core$IFn$_invoke$arity$4(form,mmvar,retag,null);
});

cljs.spec.multi_spec_impl.cljs$core$IFn$_invoke$arity$4 = (function (form,mmvar,retag,gfn){
var id = cljs.core.random_uuid();
var predx = ((function (id){
return (function (p1__15766_SHARP_){
var mm = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mmvar) : cljs.core.deref.call(null,mmvar));
var and__7511__auto__ = cljs.core._get_method(mm,cljs.core._dispatch_fn(mm).call(null,p1__15766_SHARP_));
if(cljs.core.truth_(and__7511__auto__)){
return (mm.cljs$core$IFn$_invoke$arity$1 ? mm.cljs$core$IFn$_invoke$arity$1(p1__15766_SHARP_) : mm.call(null,p1__15766_SHARP_));
} else {
return and__7511__auto__;
}
});})(id))
;
var dval = ((function (id,predx){
return (function (p1__15767_SHARP_){
return cljs.core._dispatch_fn((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mmvar) : cljs.core.deref.call(null,mmvar))).call(null,p1__15767_SHARP_);
});})(id,predx))
;
var tag = (((retag instanceof cljs.core.Keyword))?((function (id,predx,dval){
return (function (p1__15770_SHARP_,p2__15771_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__15770_SHARP_,retag,p2__15771_SHARP_);
});})(id,predx,dval))
:retag);
if(typeof cljs.spec.t_cljs$spec15797 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.spec.Spec}
 * @implements {cljs.core.IWithMeta}
*/
cljs.spec.t_cljs$spec15797 = (function (form,mmvar,retag,gfn,id,predx,dval,tag,meta15798){
this.form = form;
this.mmvar = mmvar;
this.retag = retag;
this.gfn = gfn;
this.id = id;
this.predx = predx;
this.dval = dval;
this.tag = tag;
this.meta15798 = meta15798;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.spec.t_cljs$spec15797.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (id,predx,dval,tag){
return (function (_15799,meta15798__$1){
var self__ = this;
var _15799__$1 = this;
return (new cljs.spec.t_cljs$spec15797(self__.form,self__.mmvar,self__.retag,self__.gfn,self__.id,self__.predx,self__.dval,self__.tag,meta15798__$1));
});})(id,predx,dval,tag))
;

cljs.spec.t_cljs$spec15797.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (id,predx,dval,tag){
return (function (_15799){
var self__ = this;
var _15799__$1 = this;
return self__.meta15798;
});})(id,predx,dval,tag))
;

cljs.spec.t_cljs$spec15797.prototype.cljs$spec$Spec$ = cljs.core.PROTOCOL_SENTINEL;

cljs.spec.t_cljs$spec15797.prototype.cljs$spec$Spec$conform_STAR_$arity$2 = ((function (id,predx,dval,tag){
return (function (_,x){
var self__ = this;
var ___$1 = this;
var temp__6751__auto__ = (self__.predx.cljs$core$IFn$_invoke$arity$1 ? self__.predx.cljs$core$IFn$_invoke$arity$1(x) : self__.predx.call(null,x));
if(cljs.core.truth_(temp__6751__auto__)){
var pred = temp__6751__auto__;
return cljs.spec.dt.cljs$core$IFn$_invoke$arity$3(pred,x,self__.form);
} else {
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
}
});})(id,predx,dval,tag))
;

cljs.spec.t_cljs$spec15797.prototype.cljs$spec$Spec$unform_STAR_$arity$2 = ((function (id,predx,dval,tag){
return (function (_,x){
var self__ = this;
var ___$1 = this;
var temp__6751__auto__ = (self__.predx.cljs$core$IFn$_invoke$arity$1 ? self__.predx.cljs$core$IFn$_invoke$arity$1(x) : self__.predx.call(null,x));
if(cljs.core.truth_(temp__6751__auto__)){
var pred = temp__6751__auto__;
return cljs.spec.unform(pred,x);
} else {
throw (new Error([cljs.core.str("No method of: "),cljs.core.str(self__.form),cljs.core.str(" for dispatch value: "),cljs.core.str((self__.dval.cljs$core$IFn$_invoke$arity$1 ? self__.dval.cljs$core$IFn$_invoke$arity$1(x) : self__.dval.call(null,x)))].join('')));
}
});})(id,predx,dval,tag))
;

cljs.spec.t_cljs$spec15797.prototype.cljs$spec$Spec$explain_STAR_$arity$5 = ((function (id,predx,dval,tag){
return (function (_,path,via,in$,x){
var self__ = this;
var ___$1 = this;
var dv = (self__.dval.cljs$core$IFn$_invoke$arity$1 ? self__.dval.cljs$core$IFn$_invoke$arity$1(x) : self__.dval.call(null,x));
var path__$1 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,dv);
var temp__6751__auto__ = (self__.predx.cljs$core$IFn$_invoke$arity$1 ? self__.predx.cljs$core$IFn$_invoke$arity$1(x) : self__.predx.call(null,x));
if(cljs.core.truth_(temp__6751__auto__)){
var pred = temp__6751__auto__;
return cljs.spec.explain_1(self__.form,pred,path__$1,via,in$,x);
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"path","path",-188191168),path__$1,new cljs.core.Keyword(null,"pred","pred",1927423397),cljs.spec.abbrev(self__.form),new cljs.core.Keyword(null,"val","val",128701612),x,new cljs.core.Keyword(null,"reason","reason",-2070751759),"no method",new cljs.core.Keyword(null,"via","via",-1904457336),via,new cljs.core.Keyword(null,"in","in",-1531184865),in$], null)], null);
}
});})(id,predx,dval,tag))
;

cljs.spec.t_cljs$spec15797.prototype.cljs$spec$Spec$gen_STAR_$arity$4 = ((function (id,predx,dval,tag){
return (function (_,overrides,path,rmap){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.gfn)){
return (self__.gfn.cljs$core$IFn$_invoke$arity$0 ? self__.gfn.cljs$core$IFn$_invoke$arity$0() : self__.gfn.call(null));
} else {
var gen = ((function (___$1,id,predx,dval,tag){
return (function (p__15804){
var vec__15805 = p__15804;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15805,(0),null);
var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15805,(1),null);
var p = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(null) : f.call(null,null));
var rmap__$1 = cljs.spec.inck(rmap,self__.id);
if(cljs.core.truth_(cljs.spec.recur_limit_QMARK_(rmap__$1,self__.id,path,k))){
return null;
} else {
return cljs.spec.impl.gen.delay_impl((new cljs.core.Delay(((function (rmap__$1,p,vec__15805,k,f,___$1,id,predx,dval,tag){
return (function (){
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((function (rmap__$1,p,vec__15805,k,f,___$1,id,predx,dval,tag){
return (function (p1__15772_SHARP_){
return (self__.tag.cljs$core$IFn$_invoke$arity$2 ? self__.tag.cljs$core$IFn$_invoke$arity$2(p1__15772_SHARP_,k) : self__.tag.call(null,p1__15772_SHARP_,k));
});})(rmap__$1,p,vec__15805,k,f,___$1,id,predx,dval,tag))
,cljs.spec.gensub(p,overrides,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,k),rmap__$1,cljs.core._conj((function (){var x__8452__auto__ = self__.form;
return cljs.core._conj((function (){var x__8452__auto____$1 = k;
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto____$1);
})(),x__8452__auto__);
})(),new cljs.core.Symbol(null,"method","method",1696235119,null)))], 0));
});})(rmap__$1,p,vec__15805,k,f,___$1,id,predx,dval,tag))
,null)));
}
});})(___$1,id,predx,dval,tag))
;
var gs = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,cljs.core.map.cljs$core$IFn$_invoke$arity$2(gen,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(((function (gen,___$1,id,predx,dval,tag){
return (function (p__15808){
var vec__15809 = p__15808;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15809,(0),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537));
});})(gen,___$1,id,predx,dval,tag))
,cljs.core.methods$((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.mmvar) : cljs.core.deref.call(null,self__.mmvar))))));
if(cljs.core.every_QMARK_(cljs.core.identity,gs)){
return cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([gs], 0));
} else {
return null;
}
}
});})(id,predx,dval,tag))
;

cljs.spec.t_cljs$spec15797.prototype.cljs$spec$Spec$with_gen_STAR_$arity$2 = ((function (id,predx,dval,tag){
return (function (_,gfn__$1){
var self__ = this;
var ___$1 = this;
return cljs.spec.multi_spec_impl.cljs$core$IFn$_invoke$arity$4(self__.form,self__.mmvar,self__.retag,gfn__$1);
});})(id,predx,dval,tag))
;

cljs.spec.t_cljs$spec15797.prototype.cljs$spec$Spec$describe_STAR_$arity$1 = ((function (id,predx,dval,tag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","multi-spec","cljs.spec/multi-spec",-2053297814,null)),(function (){var x__8452__auto__ = self__.form;
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})(),cljs.core.array_seq([(function (){var x__8452__auto__ = self__.retag;
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})()], 0))));
});})(id,predx,dval,tag))
;

cljs.spec.t_cljs$spec15797.getBasis = ((function (id,predx,dval,tag){
return (function (){
return new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"form","form",16469056,null),new cljs.core.Symbol(null,"mmvar","mmvar",-1714325675,null),new cljs.core.Symbol(null,"retag","retag",528972725,null),new cljs.core.Symbol(null,"gfn","gfn",-1862918295,null),new cljs.core.Symbol(null,"id","id",252129435,null),new cljs.core.Symbol(null,"predx","predx",2063470948,null),new cljs.core.Symbol(null,"dval","dval",835211877,null),new cljs.core.Symbol(null,"tag","tag",350170304,null),new cljs.core.Symbol(null,"meta15798","meta15798",1460026750,null)], null);
});})(id,predx,dval,tag))
;

cljs.spec.t_cljs$spec15797.cljs$lang$type = true;

cljs.spec.t_cljs$spec15797.cljs$lang$ctorStr = "cljs.spec/t_cljs$spec15797";

cljs.spec.t_cljs$spec15797.cljs$lang$ctorPrWriter = ((function (id,predx,dval,tag){
return (function (this__8175__auto__,writer__8176__auto__,opt__8177__auto__){
return cljs.core._write(writer__8176__auto__,"cljs.spec/t_cljs$spec15797");
});})(id,predx,dval,tag))
;

cljs.spec.__GT_t_cljs$spec15797 = ((function (id,predx,dval,tag){
return (function cljs$spec$__GT_t_cljs$spec15797(form__$1,mmvar__$1,retag__$1,gfn__$1,id__$1,predx__$1,dval__$1,tag__$1,meta15798){
return (new cljs.spec.t_cljs$spec15797(form__$1,mmvar__$1,retag__$1,gfn__$1,id__$1,predx__$1,dval__$1,tag__$1,meta15798));
});})(id,predx,dval,tag))
;

}

return (new cljs.spec.t_cljs$spec15797(form,mmvar,retag,gfn,id,predx,dval,tag,cljs.core.PersistentArrayMap.EMPTY));
});

cljs.spec.multi_spec_impl.cljs$lang$maxFixedArity = 4;

/**
 * Do not call this directly, use 'tuple'
 */
cljs.spec.tuple_impl = (function cljs$spec$tuple_impl(var_args){
var args15821 = [];
var len__8739__auto___15854 = arguments.length;
var i__8740__auto___15855 = (0);
while(true){
if((i__8740__auto___15855 < len__8739__auto___15854)){
args15821.push((arguments[i__8740__auto___15855]));

var G__15856 = (i__8740__auto___15855 + (1));
i__8740__auto___15855 = G__15856;
continue;
} else {
}
break;
}

var G__15826 = args15821.length;
switch (G__15826) {
case 2:
return cljs.spec.tuple_impl.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.spec.tuple_impl.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15821.length)].join('')));

}
});

cljs.spec.tuple_impl.cljs$core$IFn$_invoke$arity$2 = (function (forms,preds){
return cljs.spec.tuple_impl.cljs$core$IFn$_invoke$arity$3(forms,preds,null);
});

cljs.spec.tuple_impl.cljs$core$IFn$_invoke$arity$3 = (function (forms,preds,gfn){
if(typeof cljs.spec.t_cljs$spec15828 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.spec.Spec}
 * @implements {cljs.core.IWithMeta}
*/
cljs.spec.t_cljs$spec15828 = (function (forms,preds,gfn,meta15829){
this.forms = forms;
this.preds = preds;
this.gfn = gfn;
this.meta15829 = meta15829;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.spec.t_cljs$spec15828.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15830,meta15829__$1){
var self__ = this;
var _15830__$1 = this;
return (new cljs.spec.t_cljs$spec15828(self__.forms,self__.preds,self__.gfn,meta15829__$1));
});

cljs.spec.t_cljs$spec15828.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15830){
var self__ = this;
var _15830__$1 = this;
return self__.meta15829;
});

cljs.spec.t_cljs$spec15828.prototype.cljs$spec$Spec$ = cljs.core.PROTOCOL_SENTINEL;

cljs.spec.t_cljs$spec15828.prototype.cljs$spec$Spec$conform_STAR_$arity$2 = (function (_,x){
var self__ = this;
var ___$1 = this;
if(!((cljs.core.vector_QMARK_(x)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(x),cljs.core.count(self__.preds))))){
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
} else {
var ret = x;
var i = (0);
while(true){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,cljs.core.count(x))){
return ret;
} else {
var v = (x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(i) : x.call(null,i));
var cv = cljs.spec.dt.cljs$core$IFn$_invoke$arity$3((self__.preds.cljs$core$IFn$_invoke$arity$1 ? self__.preds.cljs$core$IFn$_invoke$arity$1(i) : self__.preds.call(null,i)),v,(self__.forms.cljs$core$IFn$_invoke$arity$1 ? self__.forms.cljs$core$IFn$_invoke$arity$1(i) : self__.forms.call(null,i)));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537),cv)){
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
} else {
var G__15859 = (((cv === v))?ret:cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,i,cv));
var G__15860 = (i + (1));
ret = G__15859;
i = G__15860;
continue;
}
}
break;
}
}
});

cljs.spec.t_cljs$spec15828.prototype.cljs$spec$Spec$unform_STAR_$arity$2 = (function (_,x){
var self__ = this;
var ___$1 = this;
if((cljs.core.vector_QMARK_(x)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(x),cljs.core.count(self__.preds)))){
} else {
throw (new Error("Assert failed: (c/and (vector? x) (= (count x) (count preds)))"));
}

var ret = x;
var i = (0);
while(true){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,cljs.core.count(x))){
return ret;
} else {
var cv = (x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(i) : x.call(null,i));
var v = cljs.spec.unform((self__.preds.cljs$core$IFn$_invoke$arity$1 ? self__.preds.cljs$core$IFn$_invoke$arity$1(i) : self__.preds.call(null,i)),cv);
var G__15863 = (((cv === v))?ret:cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,i,v));
var G__15864 = (i + (1));
ret = G__15863;
i = G__15864;
continue;
}
break;
}
});

cljs.spec.t_cljs$spec15828.prototype.cljs$spec$Spec$explain_STAR_$arity$5 = (function (_,path,via,in$,x){
var self__ = this;
var ___$1 = this;
if(!(cljs.core.vector_QMARK_(x))){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"pred","pred",1927423397),new cljs.core.Symbol(null,"vector?","vector?",-61367869,null),new cljs.core.Keyword(null,"val","val",128701612),x,new cljs.core.Keyword(null,"via","via",-1904457336),via,new cljs.core.Keyword(null,"in","in",-1531184865),in$], null)], null);
} else {
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(x),cljs.core.count(self__.preds))){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"pred","pred",1927423397),cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","=","cljs.core/=",-1891498332,null)),(function (){var x__8452__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","count","cljs.core/count",-921270233,null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"%","%",-950237169,null)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})(),cljs.core.array_seq([(function (){var x__8452__auto__ = cljs.core.count(self__.preds);
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})()], 0)))),new cljs.core.Keyword(null,"val","val",128701612),x,new cljs.core.Keyword(null,"via","via",-1904457336),via,new cljs.core.Keyword(null,"in","in",-1531184865),in$], null)], null);
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,cljs.core.map.cljs$core$IFn$_invoke$arity$4(((function (___$1){
return (function (i,form,pred){
var v = (x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(i) : x.call(null,i));
if(cljs.core.truth_(cljs.spec.valid_QMARK_.cljs$core$IFn$_invoke$arity$2(pred,v))){
return null;
} else {
return cljs.spec.explain_1(form,pred,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,i),via,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(in$,i),v);
}
});})(___$1))
,cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(self__.preds)),self__.forms,self__.preds));

}
}
});

cljs.spec.t_cljs$spec15828.prototype.cljs$spec$Spec$gen_STAR_$arity$4 = (function (_,overrides,path,rmap){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.gfn)){
return (self__.gfn.cljs$core$IFn$_invoke$arity$0 ? self__.gfn.cljs$core$IFn$_invoke$arity$0() : self__.gfn.call(null));
} else {
var gen = ((function (___$1){
return (function (i,p,f){
return cljs.spec.gensub(p,overrides,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,i),rmap,f);
});})(___$1))
;
var gs = cljs.core.map.cljs$core$IFn$_invoke$arity$4(gen,cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(self__.preds)),self__.preds,self__.forms);
if(cljs.core.every_QMARK_(cljs.core.identity,gs)){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.spec.impl.gen.tuple,gs);
} else {
return null;
}
}
});

cljs.spec.t_cljs$spec15828.prototype.cljs$spec$Spec$with_gen_STAR_$arity$2 = (function (_,gfn__$1){
var self__ = this;
var ___$1 = this;
return cljs.spec.tuple_impl.cljs$core$IFn$_invoke$arity$3(self__.forms,self__.preds,gfn__$1);
});

cljs.spec.t_cljs$spec15828.prototype.cljs$spec$Spec$describe_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","tuple","cljs.spec/tuple",500419708,null)),self__.forms)));
});

cljs.spec.t_cljs$spec15828.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"forms","forms",-608443419,null),new cljs.core.Symbol(null,"preds","preds",150921777,null),new cljs.core.Symbol(null,"gfn","gfn",-1862918295,null),new cljs.core.Symbol(null,"meta15829","meta15829",-1922895238,null)], null);
});

cljs.spec.t_cljs$spec15828.cljs$lang$type = true;

cljs.spec.t_cljs$spec15828.cljs$lang$ctorStr = "cljs.spec/t_cljs$spec15828";

cljs.spec.t_cljs$spec15828.cljs$lang$ctorPrWriter = (function (this__8175__auto__,writer__8176__auto__,opt__8177__auto__){
return cljs.core._write(writer__8176__auto__,"cljs.spec/t_cljs$spec15828");
});

cljs.spec.__GT_t_cljs$spec15828 = (function cljs$spec$__GT_t_cljs$spec15828(forms__$1,preds__$1,gfn__$1,meta15829){
return (new cljs.spec.t_cljs$spec15828(forms__$1,preds__$1,gfn__$1,meta15829));
});

}

return (new cljs.spec.t_cljs$spec15828(forms,preds,gfn,cljs.core.PersistentArrayMap.EMPTY));
});

cljs.spec.tuple_impl.cljs$lang$maxFixedArity = 3;

cljs.spec.tagged_ret = (function cljs$spec$tagged_ret(v){
var x15880 = v;
x15880.cljs$core$IMapEntry$ = cljs.core.PROTOCOL_SENTINEL;

x15880.cljs$core$IMapEntry$_key$arity$1 = ((function (x15880){
return (function (_){
var ___$1 = this;
return cljs.core._nth.cljs$core$IFn$_invoke$arity$2(v,(0));
});})(x15880))
;

x15880.cljs$core$IMapEntry$_val$arity$1 = ((function (x15880){
return (function (_){
var ___$1 = this;
return cljs.core._nth.cljs$core$IFn$_invoke$arity$2(v,(1));
});})(x15880))
;

return x15880;
});
/**
 * Do not call this directly, use 'or'
 */
cljs.spec.or_spec_impl = (function cljs$spec$or_spec_impl(keys,forms,preds,gfn){
var id = cljs.core.random_uuid();
var kps = cljs.core.zipmap(keys,preds);
var cform = ((function (id,kps){
return (function (x){
var i = (0);
while(true){
if((i < cljs.core.count(preds))){
var pred = (preds.cljs$core$IFn$_invoke$arity$1 ? preds.cljs$core$IFn$_invoke$arity$1(i) : preds.call(null,i));
var ret = cljs.spec.dt.cljs$core$IFn$_invoke$arity$3(pred,x,cljs.core.nth.cljs$core$IFn$_invoke$arity$2(forms,i));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537),ret)){
var G__15942 = (i + (1));
i = G__15942;
continue;
} else {
return cljs.spec.tagged_ret(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(keys.cljs$core$IFn$_invoke$arity$1 ? keys.cljs$core$IFn$_invoke$arity$1(i) : keys.call(null,i)),ret], null));
}
} else {
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
}
break;
}
});})(id,kps))
;
if(typeof cljs.spec.t_cljs$spec15913 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.spec.Spec}
 * @implements {cljs.core.IWithMeta}
*/
cljs.spec.t_cljs$spec15913 = (function (keys,forms,preds,gfn,id,kps,cform,meta15914){
this.keys = keys;
this.forms = forms;
this.preds = preds;
this.gfn = gfn;
this.id = id;
this.kps = kps;
this.cform = cform;
this.meta15914 = meta15914;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.spec.t_cljs$spec15913.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (id,kps,cform){
return (function (_15915,meta15914__$1){
var self__ = this;
var _15915__$1 = this;
return (new cljs.spec.t_cljs$spec15913(self__.keys,self__.forms,self__.preds,self__.gfn,self__.id,self__.kps,self__.cform,meta15914__$1));
});})(id,kps,cform))
;

cljs.spec.t_cljs$spec15913.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (id,kps,cform){
return (function (_15915){
var self__ = this;
var _15915__$1 = this;
return self__.meta15914;
});})(id,kps,cform))
;

cljs.spec.t_cljs$spec15913.prototype.cljs$spec$Spec$ = cljs.core.PROTOCOL_SENTINEL;

cljs.spec.t_cljs$spec15913.prototype.cljs$spec$Spec$conform_STAR_$arity$2 = ((function (id,kps,cform){
return (function (_,x){
var self__ = this;
var ___$1 = this;
return (self__.cform.cljs$core$IFn$_invoke$arity$1 ? self__.cform.cljs$core$IFn$_invoke$arity$1(x) : self__.cform.call(null,x));
});})(id,kps,cform))
;

cljs.spec.t_cljs$spec15913.prototype.cljs$spec$Spec$unform_STAR_$arity$2 = ((function (id,kps,cform){
return (function (_,p__15916){
var self__ = this;
var vec__15917 = p__15916;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15917,(0),null);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15917,(1),null);
var ___$1 = this;
return cljs.spec.unform((self__.kps.cljs$core$IFn$_invoke$arity$1 ? self__.kps.cljs$core$IFn$_invoke$arity$1(k) : self__.kps.call(null,k)),x);
});})(id,kps,cform))
;

cljs.spec.t_cljs$spec15913.prototype.cljs$spec$Spec$explain_STAR_$arity$5 = ((function (id,kps,cform){
return (function (this$,path,via,in$,x){
var self__ = this;
var this$__$1 = this;
if(cljs.core.truth_(cljs.spec.valid_QMARK_.cljs$core$IFn$_invoke$arity$2(this$__$1,x))){
return null;
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,cljs.core.map.cljs$core$IFn$_invoke$arity$4(((function (this$__$1,id,kps,cform){
return (function (k,form,pred){
if(cljs.core.truth_(cljs.spec.valid_QMARK_.cljs$core$IFn$_invoke$arity$2(pred,x))){
return null;
} else {
return cljs.spec.explain_1(form,pred,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,k),via,in$,x);
}
});})(this$__$1,id,kps,cform))
,self__.keys,self__.forms,self__.preds));
}
});})(id,kps,cform))
;

cljs.spec.t_cljs$spec15913.prototype.cljs$spec$Spec$gen_STAR_$arity$4 = ((function (id,kps,cform){
return (function (_,overrides,path,rmap){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.gfn)){
return (self__.gfn.cljs$core$IFn$_invoke$arity$0 ? self__.gfn.cljs$core$IFn$_invoke$arity$0() : self__.gfn.call(null));
} else {
var gen = ((function (___$1,id,kps,cform){
return (function (k,p,f){
var rmap__$1 = cljs.spec.inck(rmap,self__.id);
if(cljs.core.truth_(cljs.spec.recur_limit_QMARK_(rmap__$1,self__.id,path,k))){
return null;
} else {
return cljs.spec.impl.gen.delay_impl((new cljs.core.Delay(((function (rmap__$1,___$1,id,kps,cform){
return (function (){
return cljs.spec.gensub(p,overrides,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,k),rmap__$1,f);
});})(rmap__$1,___$1,id,kps,cform))
,null)));
}
});})(___$1,id,kps,cform))
;
var gs = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,cljs.core.map.cljs$core$IFn$_invoke$arity$4(gen,self__.keys,self__.preds,self__.forms));
if(cljs.core.empty_QMARK_(gs)){
return null;
} else {
return cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([gs], 0));
}
}
});})(id,kps,cform))
;

cljs.spec.t_cljs$spec15913.prototype.cljs$spec$Spec$with_gen_STAR_$arity$2 = ((function (id,kps,cform){
return (function (_,gfn__$1){
var self__ = this;
var ___$1 = this;
return (cljs.spec.or_spec_impl.cljs$core$IFn$_invoke$arity$4 ? cljs.spec.or_spec_impl.cljs$core$IFn$_invoke$arity$4(self__.keys,self__.forms,self__.preds,gfn__$1) : cljs.spec.or_spec_impl.call(null,self__.keys,self__.forms,self__.preds,gfn__$1));
});})(id,kps,cform))
;

cljs.spec.t_cljs$spec15913.prototype.cljs$spec$Spec$describe_STAR_$arity$1 = ((function (id,kps,cform){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","or","cljs.spec/or",1200597689,null)),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.vector,cljs.core.array_seq([self__.keys,self__.forms], 0)))));
});})(id,kps,cform))
;

cljs.spec.t_cljs$spec15913.getBasis = ((function (id,kps,cform){
return (function (){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"keys","keys",-1586012071,null),new cljs.core.Symbol(null,"forms","forms",-608443419,null),new cljs.core.Symbol(null,"preds","preds",150921777,null),new cljs.core.Symbol(null,"gfn","gfn",-1862918295,null),new cljs.core.Symbol(null,"id","id",252129435,null),new cljs.core.Symbol(null,"kps","kps",-1157342767,null),new cljs.core.Symbol(null,"cform","cform",1319506748,null),new cljs.core.Symbol(null,"meta15914","meta15914",-615725226,null)], null);
});})(id,kps,cform))
;

cljs.spec.t_cljs$spec15913.cljs$lang$type = true;

cljs.spec.t_cljs$spec15913.cljs$lang$ctorStr = "cljs.spec/t_cljs$spec15913";

cljs.spec.t_cljs$spec15913.cljs$lang$ctorPrWriter = ((function (id,kps,cform){
return (function (this__8175__auto__,writer__8176__auto__,opt__8177__auto__){
return cljs.core._write(writer__8176__auto__,"cljs.spec/t_cljs$spec15913");
});})(id,kps,cform))
;

cljs.spec.__GT_t_cljs$spec15913 = ((function (id,kps,cform){
return (function cljs$spec$or_spec_impl_$___GT_t_cljs$spec15913(keys__$1,forms__$1,preds__$1,gfn__$1,id__$1,kps__$1,cform__$1,meta15914){
return (new cljs.spec.t_cljs$spec15913(keys__$1,forms__$1,preds__$1,gfn__$1,id__$1,kps__$1,cform__$1,meta15914));
});})(id,kps,cform))
;

}

return (new cljs.spec.t_cljs$spec15913(keys,forms,preds,gfn,id,kps,cform,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.spec.and_preds = (function cljs$spec$and_preds(x,preds,forms){
var ret = x;
var G__15976 = preds;
var vec__15978 = G__15976;
var seq__15979 = cljs.core.seq(vec__15978);
var first__15980 = cljs.core.first(seq__15979);
var seq__15979__$1 = cljs.core.next(seq__15979);
var pred = first__15980;
var preds__$1 = seq__15979__$1;
var G__15977 = forms;
var vec__15981 = G__15977;
var seq__15982 = cljs.core.seq(vec__15981);
var first__15983 = cljs.core.first(seq__15982);
var seq__15982__$1 = cljs.core.next(seq__15982);
var form = first__15983;
var forms__$1 = seq__15982__$1;
var ret__$1 = ret;
var G__15976__$1 = G__15976;
var G__15977__$1 = G__15977;
while(true){
var ret__$2 = ret__$1;
var vec__15984 = G__15976__$1;
var seq__15985 = cljs.core.seq(vec__15984);
var first__15986 = cljs.core.first(seq__15985);
var seq__15985__$1 = cljs.core.next(seq__15985);
var pred__$1 = first__15986;
var preds__$2 = seq__15985__$1;
var vec__15987 = G__15977__$1;
var seq__15988 = cljs.core.seq(vec__15987);
var first__15989 = cljs.core.first(seq__15988);
var seq__15988__$1 = cljs.core.next(seq__15988);
var form__$1 = first__15989;
var forms__$2 = seq__15988__$1;
if(cljs.core.truth_(pred__$1)){
var nret = cljs.spec.dt.cljs$core$IFn$_invoke$arity$3(pred__$1,ret__$2,form__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537),nret)){
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
} else {
var G__16003 = nret;
var G__16004 = preds__$2;
var G__16005 = forms__$2;
ret__$1 = G__16003;
G__15976__$1 = G__16004;
G__15977__$1 = G__16005;
continue;
}
} else {
return ret__$2;
}
break;
}
});
cljs.spec.explain_pred_list = (function cljs$spec$explain_pred_list(forms,preds,path,via,in$,x){
var ret = x;
var G__16032 = forms;
var vec__16034 = G__16032;
var seq__16035 = cljs.core.seq(vec__16034);
var first__16036 = cljs.core.first(seq__16035);
var seq__16035__$1 = cljs.core.next(seq__16035);
var form = first__16036;
var forms__$1 = seq__16035__$1;
var G__16033 = preds;
var vec__16037 = G__16033;
var seq__16038 = cljs.core.seq(vec__16037);
var first__16039 = cljs.core.first(seq__16038);
var seq__16038__$1 = cljs.core.next(seq__16038);
var pred = first__16039;
var preds__$1 = seq__16038__$1;
var ret__$1 = ret;
var G__16032__$1 = G__16032;
var G__16033__$1 = G__16033;
while(true){
var ret__$2 = ret__$1;
var vec__16040 = G__16032__$1;
var seq__16041 = cljs.core.seq(vec__16040);
var first__16042 = cljs.core.first(seq__16041);
var seq__16041__$1 = cljs.core.next(seq__16041);
var form__$1 = first__16042;
var forms__$2 = seq__16041__$1;
var vec__16043 = G__16033__$1;
var seq__16044 = cljs.core.seq(vec__16043);
var first__16045 = cljs.core.first(seq__16044);
var seq__16044__$1 = cljs.core.next(seq__16044);
var pred__$1 = first__16045;
var preds__$2 = seq__16044__$1;
if(cljs.core.truth_(pred__$1)){
var nret = cljs.spec.dt.cljs$core$IFn$_invoke$arity$3(pred__$1,ret__$2,form__$1);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537),nret)){
var G__16053 = nret;
var G__16054 = forms__$2;
var G__16055 = preds__$2;
ret__$1 = G__16053;
G__16032__$1 = G__16054;
G__16033__$1 = G__16055;
continue;
} else {
return cljs.spec.explain_1(form__$1,pred__$1,path,via,in$,ret__$2);
}
} else {
return null;
}
break;
}
});
/**
 * Do not call this directly, use 'and'
 */
cljs.spec.and_spec_impl = (function cljs$spec$and_spec_impl(forms,preds,gfn){
if(typeof cljs.spec.t_cljs$spec16067 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.spec.Spec}
 * @implements {cljs.core.IWithMeta}
*/
cljs.spec.t_cljs$spec16067 = (function (forms,preds,gfn,meta16068){
this.forms = forms;
this.preds = preds;
this.gfn = gfn;
this.meta16068 = meta16068;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.spec.t_cljs$spec16067.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_16069,meta16068__$1){
var self__ = this;
var _16069__$1 = this;
return (new cljs.spec.t_cljs$spec16067(self__.forms,self__.preds,self__.gfn,meta16068__$1));
});

cljs.spec.t_cljs$spec16067.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_16069){
var self__ = this;
var _16069__$1 = this;
return self__.meta16068;
});

cljs.spec.t_cljs$spec16067.prototype.cljs$spec$Spec$ = cljs.core.PROTOCOL_SENTINEL;

cljs.spec.t_cljs$spec16067.prototype.cljs$spec$Spec$conform_STAR_$arity$2 = (function (_,x){
var self__ = this;
var ___$1 = this;
return cljs.spec.and_preds(x,self__.preds,self__.forms);
});

cljs.spec.t_cljs$spec16067.prototype.cljs$spec$Spec$unform_STAR_$arity$2 = (function (_,x){
var self__ = this;
var ___$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (___$1){
return (function (p1__16057_SHARP_,p2__16056_SHARP_){
return cljs.spec.unform(p2__16056_SHARP_,p1__16057_SHARP_);
});})(___$1))
,x,cljs.core.reverse(self__.preds));
});

cljs.spec.t_cljs$spec16067.prototype.cljs$spec$Spec$explain_STAR_$arity$5 = (function (_,path,via,in$,x){
var self__ = this;
var ___$1 = this;
return cljs.spec.explain_pred_list(self__.forms,self__.preds,path,via,in$,x);
});

cljs.spec.t_cljs$spec16067.prototype.cljs$spec$Spec$gen_STAR_$arity$4 = (function (_,overrides,path,rmap){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.gfn)){
return (self__.gfn.cljs$core$IFn$_invoke$arity$0 ? self__.gfn.cljs$core$IFn$_invoke$arity$0() : self__.gfn.call(null));
} else {
return cljs.spec.gensub(cljs.core.first(self__.preds),overrides,path,rmap,cljs.core.first(self__.forms));
}
});

cljs.spec.t_cljs$spec16067.prototype.cljs$spec$Spec$with_gen_STAR_$arity$2 = (function (_,gfn__$1){
var self__ = this;
var ___$1 = this;
return (cljs.spec.and_spec_impl.cljs$core$IFn$_invoke$arity$3 ? cljs.spec.and_spec_impl.cljs$core$IFn$_invoke$arity$3(self__.forms,self__.preds,gfn__$1) : cljs.spec.and_spec_impl.call(null,self__.forms,self__.preds,gfn__$1));
});

cljs.spec.t_cljs$spec16067.prototype.cljs$spec$Spec$describe_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","and","cljs.spec/and",-7296553,null)),self__.forms)));
});

cljs.spec.t_cljs$spec16067.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"forms","forms",-608443419,null),new cljs.core.Symbol(null,"preds","preds",150921777,null),new cljs.core.Symbol(null,"gfn","gfn",-1862918295,null),new cljs.core.Symbol(null,"meta16068","meta16068",-1199449575,null)], null);
});

cljs.spec.t_cljs$spec16067.cljs$lang$type = true;

cljs.spec.t_cljs$spec16067.cljs$lang$ctorStr = "cljs.spec/t_cljs$spec16067";

cljs.spec.t_cljs$spec16067.cljs$lang$ctorPrWriter = (function (this__8175__auto__,writer__8176__auto__,opt__8177__auto__){
return cljs.core._write(writer__8176__auto__,"cljs.spec/t_cljs$spec16067");
});

cljs.spec.__GT_t_cljs$spec16067 = (function cljs$spec$and_spec_impl_$___GT_t_cljs$spec16067(forms__$1,preds__$1,gfn__$1,meta16068){
return (new cljs.spec.t_cljs$spec16067(forms__$1,preds__$1,gfn__$1,meta16068));
});

}

return (new cljs.spec.t_cljs$spec16067(forms,preds,gfn,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.spec.coll_prob = (function cljs$spec$coll_prob(x,kfn,kform,distinct,count,min_count,max_count,path,via,in$){
var pred = (function (){var or__7523__auto__ = kfn;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.core.coll_QMARK_;
}
})();
var kform__$1 = (function (){var or__7523__auto__ = kform;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return new cljs.core.Symbol("cljs.core","coll?","cljs.core/coll?",1208130522,null);
}
})();
if(cljs.core.not(cljs.spec.valid_QMARK_.cljs$core$IFn$_invoke$arity$2(pred,x))){
return cljs.spec.explain_1(kform__$1,pred,path,via,in$,x);
} else {
if(cljs.core.truth_((function (){var and__7511__auto__ = distinct;
if(cljs.core.truth_(and__7511__auto__)){
return (!(cljs.core.empty_QMARK_(x))) && (cljs.core.not(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.distinct_QMARK_,x)));
} else {
return and__7511__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"pred","pred",1927423397),new cljs.core.Symbol(null,"distinct?","distinct?",-1684357959,null),new cljs.core.Keyword(null,"val","val",128701612),x,new cljs.core.Keyword(null,"via","via",-1904457336),via,new cljs.core.Keyword(null,"in","in",-1531184865),in$], null)], null);
} else {
if(cljs.core.truth_((function (){var and__7511__auto__ = count;
if(cljs.core.truth_(and__7511__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(count,cljs.core.bounded_count(count,x));
} else {
return and__7511__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"pred","pred",1927423397),cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","=","cljs.core/=",-1891498332,null)),(function (){var x__8452__auto__ = count;
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})(),cljs.core.array_seq([(function (){var x__8452__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","count","cljs.core/count",-921270233,null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol(null,"%","%",-950237169,null)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})()], 0)))),new cljs.core.Keyword(null,"val","val",128701612),x,new cljs.core.Keyword(null,"via","via",-1904457336),via,new cljs.core.Keyword(null,"in","in",-1531184865),in$], null)], null);
} else {
if(cljs.core.truth_((function (){var and__7511__auto__ = (function (){var or__7523__auto__ = min_count;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return max_count;
}
})();
if(cljs.core.truth_(and__7511__auto__)){
return !((((function (){var or__7523__auto__ = min_count;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return (0);
}
})() <= cljs.core.bounded_count((cljs.core.truth_(max_count)?(max_count + (1)):min_count),x))) && ((cljs.core.bounded_count((cljs.core.truth_(max_count)?(max_count + (1)):min_count),x) <= (function (){var or__7523__auto__ = max_count;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.spec.MAX_INT;
}
})())));
} else {
return and__7511__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"pred","pred",1927423397),cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","<=","cljs.core/<=",1677001748,null)),(function (){var x__8452__auto__ = (function (){var or__7523__auto__ = min_count;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return (0);
}
})();
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})(),cljs.core.array_seq([(function (){var x__8452__auto__ = cljs.core.count((function (){var G__16144 = new cljs.core.Symbol(null,"%","%",-950237169,null);
return (cljs.core.unquote.cljs$core$IFn$_invoke$arity$1 ? cljs.core.unquote.cljs$core$IFn$_invoke$arity$1(G__16144) : cljs.core.unquote.call(null,G__16144));
})());
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})(),(function (){var x__8452__auto__ = (function (){var or__7523__auto__ = max_count;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return new cljs.core.Symbol("js","Number.MAX_SAFE_INTEGER","js/Number.MAX_SAFE_INTEGER",-1535627560,null);
}
})();
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})()], 0)))),new cljs.core.Keyword(null,"val","val",128701612),x,new cljs.core.Keyword(null,"via","via",-1904457336),via,new cljs.core.Keyword(null,"in","in",-1531184865),in$], null)], null);
} else {
return null;
}
}
}
}
});
/**
 * Do not call this directly, use 'merge'
 */
cljs.spec.merge_spec_impl = (function cljs$spec$merge_spec_impl(forms,preds,gfn){
if(typeof cljs.spec.t_cljs$spec16216 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.spec.Spec}
 * @implements {cljs.core.IWithMeta}
*/
cljs.spec.t_cljs$spec16216 = (function (forms,preds,gfn,meta16217){
this.forms = forms;
this.preds = preds;
this.gfn = gfn;
this.meta16217 = meta16217;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.spec.t_cljs$spec16216.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_16218,meta16217__$1){
var self__ = this;
var _16218__$1 = this;
return (new cljs.spec.t_cljs$spec16216(self__.forms,self__.preds,self__.gfn,meta16217__$1));
});

cljs.spec.t_cljs$spec16216.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_16218){
var self__ = this;
var _16218__$1 = this;
return self__.meta16217;
});

cljs.spec.t_cljs$spec16216.prototype.cljs$spec$Spec$ = cljs.core.PROTOCOL_SENTINEL;

cljs.spec.t_cljs$spec16216.prototype.cljs$spec$Spec$conform_STAR_$arity$2 = (function (_,x){
var self__ = this;
var ___$1 = this;
var ms = cljs.core.map.cljs$core$IFn$_invoke$arity$3(((function (___$1){
return (function (p1__16188_SHARP_,p2__16189_SHARP_){
return cljs.spec.dt.cljs$core$IFn$_invoke$arity$3(p1__16188_SHARP_,x,p2__16189_SHARP_);
});})(___$1))
,self__.preds,self__.forms);
if(cljs.core.truth_(cljs.core.some(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537),null], null), null),ms))){
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.merge,ms);
}
});

cljs.spec.t_cljs$spec16216.prototype.cljs$spec$Spec$unform_STAR_$arity$2 = (function (_,x){
var self__ = this;
var ___$1 = this;
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.merge,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (___$1){
return (function (p1__16194_SHARP_){
return cljs.spec.unform(p1__16194_SHARP_,x);
});})(___$1))
,cljs.core.reverse(self__.preds)));
});

cljs.spec.t_cljs$spec16216.prototype.cljs$spec$Spec$explain_STAR_$arity$5 = (function (_,path,via,in$,x){
var self__ = this;
var ___$1 = this;
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,cljs.core.map.cljs$core$IFn$_invoke$arity$3(((function (___$1){
return (function (p1__16195_SHARP_,p2__16196_SHARP_){
return cljs.spec.explain_1(p1__16195_SHARP_,p2__16196_SHARP_,path,via,in$,x);
});})(___$1))
,self__.forms,self__.preds));
});

cljs.spec.t_cljs$spec16216.prototype.cljs$spec$Spec$gen_STAR_$arity$4 = (function (_,overrides,path,rmap){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.gfn)){
return (self__.gfn.cljs$core$IFn$_invoke$arity$0 ? self__.gfn.cljs$core$IFn$_invoke$arity$0() : self__.gfn.call(null));
} else {
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((function (___$1){
return (function (p1__16197_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.merge,p1__16197_SHARP_);
});})(___$1))
,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.spec.impl.gen.tuple,cljs.core.map.cljs$core$IFn$_invoke$arity$3(((function (___$1){
return (function (p1__16198_SHARP_,p2__16199_SHARP_){
return cljs.spec.gensub(p1__16198_SHARP_,overrides,path,rmap,p2__16199_SHARP_);
});})(___$1))
,self__.preds,self__.forms))], 0));
}
});

cljs.spec.t_cljs$spec16216.prototype.cljs$spec$Spec$with_gen_STAR_$arity$2 = (function (_,gfn__$1){
var self__ = this;
var ___$1 = this;
return (cljs.spec.merge_spec_impl.cljs$core$IFn$_invoke$arity$3 ? cljs.spec.merge_spec_impl.cljs$core$IFn$_invoke$arity$3(self__.forms,self__.preds,gfn__$1) : cljs.spec.merge_spec_impl.call(null,self__.forms,self__.preds,gfn__$1));
});

cljs.spec.t_cljs$spec16216.prototype.cljs$spec$Spec$describe_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","merge","cljs.spec/merge",-838422687,null)),self__.forms)));
});

cljs.spec.t_cljs$spec16216.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"forms","forms",-608443419,null),new cljs.core.Symbol(null,"preds","preds",150921777,null),new cljs.core.Symbol(null,"gfn","gfn",-1862918295,null),new cljs.core.Symbol(null,"meta16217","meta16217",-728126013,null)], null);
});

cljs.spec.t_cljs$spec16216.cljs$lang$type = true;

cljs.spec.t_cljs$spec16216.cljs$lang$ctorStr = "cljs.spec/t_cljs$spec16216";

cljs.spec.t_cljs$spec16216.cljs$lang$ctorPrWriter = (function (this__8175__auto__,writer__8176__auto__,opt__8177__auto__){
return cljs.core._write(writer__8176__auto__,"cljs.spec/t_cljs$spec16216");
});

cljs.spec.__GT_t_cljs$spec16216 = (function cljs$spec$merge_spec_impl_$___GT_t_cljs$spec16216(forms__$1,preds__$1,gfn__$1,meta16217){
return (new cljs.spec.t_cljs$spec16216(forms__$1,preds__$1,gfn__$1,meta16217));
});

}

return (new cljs.spec.t_cljs$spec16216(forms,preds,gfn,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Do not call this directly, use 'every', 'every-kv', 'coll-of' or 'map-of'
 */
cljs.spec.every_impl = (function cljs$spec$every_impl(var_args){
var args16253 = [];
var len__8739__auto___16318 = arguments.length;
var i__8740__auto___16319 = (0);
while(true){
if((i__8740__auto___16319 < len__8739__auto___16318)){
args16253.push((arguments[i__8740__auto___16319]));

var G__16323 = (i__8740__auto___16319 + (1));
i__8740__auto___16319 = G__16323;
continue;
} else {
}
break;
}

var G__16255 = args16253.length;
switch (G__16255) {
case 3:
return cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16253.length)].join('')));

}
});

cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$3 = (function (form,pred,opts){
return cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(form,pred,opts,null);
});

cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4 = (function (form,pred,p__16256,gfn){
var map__16257 = p__16256;
var map__16257__$1 = ((((!((map__16257 == null)))?((((map__16257.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16257.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16257):map__16257);
var opts = map__16257__$1;
var max_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16257__$1,new cljs.core.Keyword(null,"max-count","max-count",1539185305));
var kfn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16257__$1,new cljs.core.Keyword("cljs.spec","kfn","cljs.spec/kfn",293196937));
var gen_max = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__16257__$1,new cljs.core.Keyword(null,"gen-max","gen-max",-793680445),(20));
var conform_all = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16257__$1,new cljs.core.Keyword("cljs.spec","conform-all","cljs.spec/conform-all",-1945029907));
var conform_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16257__$1,new cljs.core.Keyword(null,"conform-keys","conform-keys",-1800041814));
var distinct = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16257__$1,new cljs.core.Keyword(null,"distinct","distinct",-1788879121));
var kind_form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16257__$1,new cljs.core.Keyword("cljs.spec","kind-form","cljs.spec/kind-form",997489303));
var gen_into = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__16257__$1,new cljs.core.Keyword(null,"into","into",-150836029),cljs.core.PersistentVector.EMPTY);
var count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16257__$1,new cljs.core.Keyword(null,"count","count",2139924085));
var min_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16257__$1,new cljs.core.Keyword(null,"min-count","min-count",1594709013));
var kind = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16257__$1,new cljs.core.Keyword(null,"kind","kind",-717265803));
var conform_into = gen_into;
var check_QMARK_ = ((function (conform_into,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (p1__16249_SHARP_){
return cljs.spec.valid_QMARK_.cljs$core$IFn$_invoke$arity$2(pred,p1__16249_SHARP_);
});})(conform_into,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
;
var kfn__$1 = (function (){var or__7523__auto__ = kfn;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return ((function (or__7523__auto__,conform_into,check_QMARK_,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (i,v){
return i;
});
;})(or__7523__auto__,conform_into,check_QMARK_,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
}
})();
var addcv = ((function (conform_into,check_QMARK_,kfn__$1,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (ret,i,v,cv){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,cv);
});})(conform_into,check_QMARK_,kfn__$1,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
;
var vec__16269 = ((cljs.core.map_QMARK_(kind))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.map_QMARK_,new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null)], null):((cljs.core.vector_QMARK_(kind))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.vector_QMARK_,new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null)], null):((cljs.core.list_QMARK_(kind))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list_QMARK_,new cljs.core.Symbol("cljs.core","list?","cljs.core/list?",-684796618,null)], null):((cljs.core.set_QMARK_(kind))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.set_QMARK_,new cljs.core.Symbol("cljs.core","set?","cljs.core/set?",-1176684971,null)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.seqable_QMARK_,new cljs.core.Symbol("cljs.core","seqable?","cljs.core/seqable?",-745394886,null)], null)
))));
var kindfn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16269,(0),null);
var kindform = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16269,(1),null);
var cfns = ((function (conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (x){
if((cljs.core.vector_QMARK_(x)) && ((cljs.core.not(conform_into)) || (cljs.core.vector_QMARK_(conform_into)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.identity,((function (conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (ret,i,v,cv){
if((v === cv)){
return ret;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,i,cv);
}
});})(conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
,cljs.core.identity], null);
} else {
if(cljs.core.truth_((function (){var and__7511__auto__ = cljs.core.map_QMARK_(x);
if(and__7511__auto__){
var or__7523__auto__ = (function (){var and__7511__auto____$1 = kind;
if(cljs.core.truth_(and__7511__auto____$1)){
return cljs.core.not(conform_into);
} else {
return and__7511__auto____$1;
}
})();
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.core.map_QMARK_(conform_into);
}
} else {
return and__7511__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(conform_keys)?cljs.core.empty:cljs.core.identity),((function (conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (ret,i,v,cv){
if(((v === cv)) && (cljs.core.not(conform_keys))){
return ret;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,cljs.core.nth.cljs$core$IFn$_invoke$arity$2((cljs.core.truth_(conform_keys)?cv:v),(0)),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cv,(1)));
}
});})(conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
,cljs.core.identity], null);
} else {
if((cljs.core.list_QMARK_(conform_into)) || (cljs.core.seq_QMARK_(conform_into)) || ((cljs.core.not(conform_into)) && ((cljs.core.list_QMARK_(x)) || (cljs.core.seq_QMARK_(x))))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.empty,addcv,cljs.core.reverse], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((function (conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (p1__16250_SHARP_){
return cljs.core.empty((function (){var or__7523__auto__ = conform_into;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return p1__16250_SHARP_;
}
})());
});})(conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
,addcv,cljs.core.identity], null);

}
}
}
});})(conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
;
if(typeof cljs.spec.t_cljs$spec16290 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.spec.Spec}
 * @implements {cljs.core.IWithMeta}
*/
cljs.spec.t_cljs$spec16290 = (function (form,max_count,check_QMARK_,gfn,gen_max,vec__16269,pred,kindform,conform_keys,kind_form,addcv,cfns,distinct,kindfn,p__16256,kfn,gen_into,map__16257,count,min_count,opts,kind,conform_all,conform_into,meta16291){
this.form = form;
this.max_count = max_count;
this.check_QMARK_ = check_QMARK_;
this.gfn = gfn;
this.gen_max = gen_max;
this.vec__16269 = vec__16269;
this.pred = pred;
this.kindform = kindform;
this.conform_keys = conform_keys;
this.kind_form = kind_form;
this.addcv = addcv;
this.cfns = cfns;
this.distinct = distinct;
this.kindfn = kindfn;
this.p__16256 = p__16256;
this.kfn = kfn;
this.gen_into = gen_into;
this.map__16257 = map__16257;
this.count = count;
this.min_count = min_count;
this.opts = opts;
this.kind = kind;
this.conform_all = conform_all;
this.conform_into = conform_into;
this.meta16291 = meta16291;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.spec.t_cljs$spec16290.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (_16292,meta16291__$1){
var self__ = this;
var _16292__$1 = this;
return (new cljs.spec.t_cljs$spec16290(self__.form,self__.max_count,self__.check_QMARK_,self__.gfn,self__.gen_max,self__.vec__16269,self__.pred,self__.kindform,self__.conform_keys,self__.kind_form,self__.addcv,self__.cfns,self__.distinct,self__.kindfn,self__.p__16256,self__.kfn,self__.gen_into,self__.map__16257,self__.count,self__.min_count,self__.opts,self__.kind,self__.conform_all,self__.conform_into,meta16291__$1));
});})(conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
;

cljs.spec.t_cljs$spec16290.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (_16292){
var self__ = this;
var _16292__$1 = this;
return self__.meta16291;
});})(conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
;

cljs.spec.t_cljs$spec16290.prototype.cljs$spec$Spec$ = cljs.core.PROTOCOL_SENTINEL;

cljs.spec.t_cljs$spec16290.prototype.cljs$spec$Spec$conform_STAR_$arity$2 = ((function (conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (_,x){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(cljs.spec.coll_prob(x,self__.kind,self__.kind_form,self__.distinct,self__.count,self__.min_count,self__.max_count,null,null,null))){
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
} else {
if(cljs.core.truth_(self__.conform_all)){
var vec__16299 = (self__.cfns.cljs$core$IFn$_invoke$arity$1 ? self__.cfns.cljs$core$IFn$_invoke$arity$1(x) : self__.cfns.call(null,x));
var init = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16299,(0),null);
var add = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16299,(1),null);
var complete = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16299,(2),null);
var ret = (init.cljs$core$IFn$_invoke$arity$1 ? init.cljs$core$IFn$_invoke$arity$1(x) : init.call(null,x));
var i = (0);
var G__16306 = cljs.core.seq(x);
var vec__16307 = G__16306;
var seq__16308 = cljs.core.seq(vec__16307);
var first__16309 = cljs.core.first(seq__16308);
var seq__16308__$1 = cljs.core.next(seq__16308);
var v = first__16309;
var vs = seq__16308__$1;
var vseq = vec__16307;
var ret__$1 = ret;
var i__$1 = i;
var G__16306__$1 = G__16306;
while(true){
var ret__$2 = ret__$1;
var i__$2 = i__$1;
var vec__16311 = G__16306__$1;
var seq__16312 = cljs.core.seq(vec__16311);
var first__16313 = cljs.core.first(seq__16312);
var seq__16312__$1 = cljs.core.next(seq__16312);
var v__$1 = first__16313;
var vs__$1 = seq__16312__$1;
var vseq__$1 = vec__16311;
if(vseq__$1){
var cv = cljs.spec.dt.cljs$core$IFn$_invoke$arity$3(self__.pred,v__$1,null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537),cv)){
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
} else {
var G__16365 = (add.cljs$core$IFn$_invoke$arity$4 ? add.cljs$core$IFn$_invoke$arity$4(ret__$2,i__$2,v__$1,cv) : add.call(null,ret__$2,i__$2,v__$1,cv));
var G__16366 = (i__$2 + (1));
var G__16367 = vs__$1;
ret__$1 = G__16365;
i__$1 = G__16366;
G__16306__$1 = G__16367;
continue;
}
} else {
return (complete.cljs$core$IFn$_invoke$arity$1 ? complete.cljs$core$IFn$_invoke$arity$1(ret__$2) : complete.call(null,ret__$2));
}
break;
}
} else {
if(cljs.core.indexed_QMARK_(x)){
var step = (function (){var x__7856__auto__ = (1);
var y__7857__auto__ = cljs.core.long$((cljs.core.count(x) / cljs.spec._STAR_coll_check_limit_STAR_));
return ((x__7856__auto__ > y__7857__auto__) ? x__7856__auto__ : y__7857__auto__);
})();
var i = (0);
while(true){
if((i >= cljs.core.count(x))){
return x;
} else {
if(cljs.core.truth_((function (){var G__16315 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(x,i);
return (self__.check_QMARK_.cljs$core$IFn$_invoke$arity$1 ? self__.check_QMARK_.cljs$core$IFn$_invoke$arity$1(G__16315) : self__.check_QMARK_.call(null,G__16315));
})())){
var G__16380 = (i + step);
i = G__16380;
continue;
} else {
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
}
}
break;
}
} else {
var or__7523__auto__ = (function (){var and__7511__auto__ = cljs.core.every_QMARK_(self__.check_QMARK_,cljs.core.take.cljs$core$IFn$_invoke$arity$2(cljs.spec._STAR_coll_check_limit_STAR_,x));
if(and__7511__auto__){
return x;
} else {
return and__7511__auto__;
}
})();
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
}
}

}
}
});})(conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
;

cljs.spec.t_cljs$spec16290.prototype.cljs$spec$Spec$unform_STAR_$arity$2 = ((function (conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (_,x){
var self__ = this;
var ___$1 = this;
return x;
});})(conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
;

cljs.spec.t_cljs$spec16290.prototype.cljs$spec$Spec$explain_STAR_$arity$5 = ((function (conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (_,path,via,in$,x){
var self__ = this;
var ___$1 = this;
var or__7523__auto__ = cljs.spec.coll_prob(x,self__.kind,self__.kind_form,self__.distinct,self__.count,self__.min_count,self__.max_count,path,via,in$);
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,(cljs.core.truth_(self__.conform_all)?cljs.core.identity:cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.take,cljs.spec._STAR_coll_error_limit_STAR_)).call(null,cljs.core.keep.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,cljs.core.map.cljs$core$IFn$_invoke$arity$3(((function (or__7523__auto__,___$1,conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (i,v){
var k = (self__.kfn.cljs$core$IFn$_invoke$arity$2 ? self__.kfn.cljs$core$IFn$_invoke$arity$2(i,v) : self__.kfn.call(null,i,v));
if(cljs.core.truth_((self__.check_QMARK_.cljs$core$IFn$_invoke$arity$1 ? self__.check_QMARK_.cljs$core$IFn$_invoke$arity$1(v) : self__.check_QMARK_.call(null,v)))){
return null;
} else {
var prob = cljs.spec.explain_1(self__.form,self__.pred,path,via,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(in$,k),v);
return prob;
}
});})(or__7523__auto__,___$1,conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
,cljs.core.range.cljs$core$IFn$_invoke$arity$0(),x))));
}
});})(conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
;

cljs.spec.t_cljs$spec16290.prototype.cljs$spec$Spec$gen_STAR_$arity$4 = ((function (conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (_,overrides,path,rmap){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.gfn)){
return (self__.gfn.cljs$core$IFn$_invoke$arity$0 ? self__.gfn.cljs$core$IFn$_invoke$arity$0() : self__.gfn.call(null));
} else {
var pgen = cljs.spec.gensub(self__.pred,overrides,path,rmap,self__.form);
return cljs.spec.impl.gen.bind.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(cljs.core.truth_(self__.gen_into)?cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.empty(self__.gen_into)], 0)):(cljs.core.truth_(self__.kind)?cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((function (pgen,___$1,conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (p1__16251_SHARP_){
if(cljs.core.empty_QMARK_(p1__16251_SHARP_)){
return p1__16251_SHARP_;
} else {
return cljs.core.empty(p1__16251_SHARP_);
}
});})(pgen,___$1,conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
,cljs.spec.gensub(self__.kind,overrides,path,rmap,self__.form)], 0)):cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.PersistentVector.EMPTY], 0))
)),((function (pgen,___$1,conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (init){
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((function (pgen,___$1,conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (p1__16252_SHARP_){
if(cljs.core.vector_QMARK_(init)){
return p1__16252_SHARP_;
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(init,p1__16252_SHARP_);
}
});})(pgen,___$1,conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
,(cljs.core.truth_(self__.distinct)?(cljs.core.truth_(self__.count)?cljs.spec.impl.gen.vector_distinct.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([pgen,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"num-elements","num-elements",1960422107),self__.count,new cljs.core.Keyword(null,"max-tries","max-tries",-1824441792),(100)], null)], 0)):cljs.spec.impl.gen.vector_distinct.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([pgen,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"min-elements","min-elements",949370780),(function (){var or__7523__auto__ = self__.min_count;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"max-elements","max-elements",433034073),(function (){var or__7523__auto__ = self__.max_count;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
var x__7856__auto__ = self__.gen_max;
var y__7857__auto__ = ((2) * (function (){var or__7523__auto____$1 = self__.min_count;
if(cljs.core.truth_(or__7523__auto____$1)){
return or__7523__auto____$1;
} else {
return (0);
}
})());
return ((x__7856__auto__ > y__7857__auto__) ? x__7856__auto__ : y__7857__auto__);
}
})(),new cljs.core.Keyword(null,"max-tries","max-tries",-1824441792),(100)], null)], 0))):(cljs.core.truth_(self__.count)?cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([pgen,self__.count], 0)):(cljs.core.truth_((function (){var or__7523__auto__ = self__.min_count;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return self__.max_count;
}
})())?cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([pgen,(function (){var or__7523__auto__ = self__.min_count;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return (0);
}
})(),(function (){var or__7523__auto__ = self__.max_count;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
var x__7856__auto__ = self__.gen_max;
var y__7857__auto__ = ((2) * (function (){var or__7523__auto____$1 = self__.min_count;
if(cljs.core.truth_(or__7523__auto____$1)){
return or__7523__auto____$1;
} else {
return (0);
}
})());
return ((x__7856__auto__ > y__7857__auto__) ? x__7856__auto__ : y__7857__auto__);
}
})()], 0)):cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([pgen,(0),self__.gen_max], 0))
)))], 0));
});})(pgen,___$1,conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
], 0));
}
});})(conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
;

cljs.spec.t_cljs$spec16290.prototype.cljs$spec$Spec$with_gen_STAR_$arity$2 = ((function (conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (_,gfn__$1){
var self__ = this;
var ___$1 = this;
return cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(self__.form,self__.pred,self__.opts,gfn__$1);
});})(conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
;

cljs.spec.t_cljs$spec16290.prototype.cljs$spec$Spec$describe_STAR_$arity$1 = ((function (conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","every","cljs.spec/every",-1899705480,null)),(function (){var x__8452__auto__ = self__.form;
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})(),cljs.core.array_seq([cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.identity,cljs.core.array_seq([self__.opts], 0))], 0))));
});})(conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
;

cljs.spec.t_cljs$spec16290.getBasis = ((function (conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (){
return new cljs.core.PersistentVector(null, 25, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"form","form",16469056,null),new cljs.core.Symbol(null,"max-count","max-count",-1115250464,null),new cljs.core.Symbol(null,"check?","check?",409539557,null),new cljs.core.Symbol(null,"gfn","gfn",-1862918295,null),new cljs.core.Symbol(null,"gen-max","gen-max",846851082,null),new cljs.core.Symbol(null,"vec__16269","vec__16269",-2134089014,null),new cljs.core.Symbol(null,"pred","pred",-727012372,null),new cljs.core.Symbol(null,"kindform","kindform",839835536,null),new cljs.core.Symbol(null,"conform-keys","conform-keys",-159510287,null),new cljs.core.Symbol(null,"kind-form","kind-form",1155997457,null),new cljs.core.Symbol(null,"addcv","addcv",-1552991247,null),new cljs.core.Symbol(null,"cfns","cfns",1335482066,null),new cljs.core.Symbol(null,"distinct","distinct",-148347594,null),new cljs.core.Symbol(null,"kindfn","kindfn",1062796440,null),new cljs.core.Symbol(null,"p__16256","p__16256",-440195687,null),new cljs.core.Symbol(null,"kfn","kfn",729311001,null),new cljs.core.Symbol(null,"gen-into","gen-into",592640985,null),new cljs.core.Symbol(null,"map__16257","map__16257",3428027,null),new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Symbol(null,"min-count","min-count",-1059726756,null),new cljs.core.Symbol(null,"opts","opts",1795607228,null),new cljs.core.Symbol(null,"kind","kind",923265724,null),new cljs.core.Symbol(null,"conform-all","conform-all",-980179459,null),new cljs.core.Symbol(null,"conform-into","conform-into",-1039113729,null),new cljs.core.Symbol(null,"meta16291","meta16291",-337054540,null)], null);
});})(conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
;

cljs.spec.t_cljs$spec16290.cljs$lang$type = true;

cljs.spec.t_cljs$spec16290.cljs$lang$ctorStr = "cljs.spec/t_cljs$spec16290";

cljs.spec.t_cljs$spec16290.cljs$lang$ctorPrWriter = ((function (conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function (this__8175__auto__,writer__8176__auto__,opt__8177__auto__){
return cljs.core._write(writer__8176__auto__,"cljs.spec/t_cljs$spec16290");
});})(conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
;

cljs.spec.__GT_t_cljs$spec16290 = ((function (conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind){
return (function cljs$spec$__GT_t_cljs$spec16290(form__$1,max_count__$1,check_QMARK___$1,gfn__$1,gen_max__$1,vec__16269__$1,pred__$1,kindform__$1,conform_keys__$1,kind_form__$1,addcv__$1,cfns__$1,distinct__$1,kindfn__$1,p__16256__$1,kfn__$2,gen_into__$1,map__16257__$2,count__$1,min_count__$1,opts__$1,kind__$1,conform_all__$1,conform_into__$1,meta16291){
return (new cljs.spec.t_cljs$spec16290(form__$1,max_count__$1,check_QMARK___$1,gfn__$1,gen_max__$1,vec__16269__$1,pred__$1,kindform__$1,conform_keys__$1,kind_form__$1,addcv__$1,cfns__$1,distinct__$1,kindfn__$1,p__16256__$1,kfn__$2,gen_into__$1,map__16257__$2,count__$1,min_count__$1,opts__$1,kind__$1,conform_all__$1,conform_into__$1,meta16291));
});})(conform_into,check_QMARK_,kfn__$1,addcv,vec__16269,kindfn,kindform,cfns,map__16257,map__16257__$1,opts,max_count,kfn,gen_max,conform_all,conform_keys,distinct,kind_form,gen_into,count,min_count,kind))
;

}

return (new cljs.spec.t_cljs$spec16290(form,max_count,check_QMARK_,gfn,gen_max,vec__16269,pred,kindform,conform_keys,kind_form,addcv,cfns,distinct,kindfn,p__16256,kfn__$1,gen_into,map__16257__$1,count,min_count,opts,kind,conform_all,conform_into,cljs.core.PersistentArrayMap.EMPTY));
});

cljs.spec.every_impl.cljs$lang$maxFixedArity = 4;

cljs.spec.accept = (function cljs$spec$accept(x){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204),new cljs.core.Keyword("cljs.spec","accept","cljs.spec/accept",-1753298186),new cljs.core.Keyword(null,"ret","ret",-468222814),x], null);
});
cljs.spec.accept_QMARK_ = (function cljs$spec$accept_QMARK_(p__16461){
var map__16467 = p__16461;
var map__16467__$1 = ((((!((map__16467 == null)))?((((map__16467.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16467.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16467):map__16467);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16467__$1,new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204));
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","accept","cljs.spec/accept",-1753298186),op);
});
cljs.spec.pcat_STAR_ = (function cljs$spec$pcat_STAR_(p__16479){
var map__16495 = p__16479;
var map__16495__$1 = ((((!((map__16495 == null)))?((((map__16495.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16495.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16495):map__16495);
var vec__16496 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16495__$1,new cljs.core.Keyword(null,"ps","ps",292358046));
var seq__16497 = cljs.core.seq(vec__16496);
var first__16498 = cljs.core.first(seq__16497);
var seq__16497__$1 = cljs.core.next(seq__16497);
var p1 = first__16498;
var pr = seq__16497__$1;
var ps = vec__16496;
var vec__16499 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16495__$1,new cljs.core.Keyword(null,"ks","ks",1900203942));
var seq__16500 = cljs.core.seq(vec__16499);
var first__16501 = cljs.core.first(seq__16500);
var seq__16500__$1 = cljs.core.next(seq__16500);
var k1 = first__16501;
var kr = seq__16500__$1;
var ks = vec__16499;
var vec__16502 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16495__$1,new cljs.core.Keyword(null,"forms","forms",2045992350));
var seq__16503 = cljs.core.seq(vec__16502);
var first__16504 = cljs.core.first(seq__16503);
var seq__16503__$1 = cljs.core.next(seq__16503);
var f1 = first__16504;
var fr = seq__16503__$1;
var forms = vec__16502;
var ret = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16495__$1,new cljs.core.Keyword(null,"ret","ret",-468222814));
var rep_PLUS_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16495__$1,new cljs.core.Keyword(null,"rep+","rep+",-281382396));
if(cljs.core.every_QMARK_(cljs.core.identity,ps)){
if(cljs.core.truth_(cljs.spec.accept_QMARK_(p1))){
var rp = new cljs.core.Keyword(null,"ret","ret",-468222814).cljs$core$IFn$_invoke$arity$1(p1);
var ret__$1 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(cljs.core.truth_(ks)?cljs.core.PersistentArrayMap.fromArray([k1,rp], true, false):rp));
if(pr){
var G__16506 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ps","ps",292358046),pr,new cljs.core.Keyword(null,"ks","ks",1900203942),kr,new cljs.core.Keyword(null,"forms","forms",2045992350),fr,new cljs.core.Keyword(null,"ret","ret",-468222814),ret__$1], null);
return (cljs.spec.pcat_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.spec.pcat_STAR_.cljs$core$IFn$_invoke$arity$1(G__16506) : cljs.spec.pcat_STAR_.call(null,G__16506));
} else {
return cljs.spec.accept(ret__$1);
}
} else {
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204),new cljs.core.Keyword("cljs.spec","pcat","cljs.spec/pcat",-1959753649),new cljs.core.Keyword(null,"ps","ps",292358046),ps,new cljs.core.Keyword(null,"ret","ret",-468222814),ret,new cljs.core.Keyword(null,"ks","ks",1900203942),ks,new cljs.core.Keyword(null,"forms","forms",2045992350),forms,new cljs.core.Keyword(null,"rep+","rep+",-281382396),rep_PLUS_], null);
}
} else {
return null;
}
});
cljs.spec.pcat = (function cljs$spec$pcat(var_args){
var args__8746__auto__ = [];
var len__8739__auto___16536 = arguments.length;
var i__8740__auto___16539 = (0);
while(true){
if((i__8740__auto___16539 < len__8739__auto___16536)){
args__8746__auto__.push((arguments[i__8740__auto___16539]));

var G__16544 = (i__8740__auto___16539 + (1));
i__8740__auto___16539 = G__16544;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.pcat.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});

cljs.spec.pcat.cljs$core$IFn$_invoke$arity$variadic = (function (ps){
return cljs.spec.pcat_STAR_(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ps","ps",292358046),ps,new cljs.core.Keyword(null,"ret","ret",-468222814),cljs.core.PersistentVector.EMPTY], null));
});

cljs.spec.pcat.cljs$lang$maxFixedArity = (0);

cljs.spec.pcat.cljs$lang$applyTo = (function (seq16510){
return cljs.spec.pcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq16510));
});

/**
 * Do not call this directly, use 'cat'
 */
cljs.spec.cat_impl = (function cljs$spec$cat_impl(ks,ps,forms){
return cljs.spec.pcat_STAR_(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ks","ks",1900203942),ks,new cljs.core.Keyword(null,"ps","ps",292358046),ps,new cljs.core.Keyword(null,"forms","forms",2045992350),forms,new cljs.core.Keyword(null,"ret","ret",-468222814),cljs.core.PersistentArrayMap.EMPTY], null));
});
cljs.spec.rep_STAR_ = (function cljs$spec$rep_STAR_(p1,p2,ret,splice,form){
if(cljs.core.truth_(p1)){
var r = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204),new cljs.core.Keyword("cljs.spec","rep","cljs.spec/rep",-556916491),new cljs.core.Keyword(null,"p2","p2",905500641),p2,new cljs.core.Keyword(null,"splice","splice",449588165),splice,new cljs.core.Keyword(null,"forms","forms",2045992350),form,new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.random_uuid()], null);
if(cljs.core.truth_(cljs.spec.accept_QMARK_(p1))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(r,new cljs.core.Keyword(null,"p1","p1",-936759954),p2,cljs.core.array_seq([new cljs.core.Keyword(null,"ret","ret",-468222814),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,new cljs.core.Keyword(null,"ret","ret",-468222814).cljs$core$IFn$_invoke$arity$1(p1))], 0));
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(r,new cljs.core.Keyword(null,"p1","p1",-936759954),p1,cljs.core.array_seq([new cljs.core.Keyword(null,"ret","ret",-468222814),ret], 0));
}
} else {
return null;
}
});
/**
 * Do not call this directly, use '*'
 */
cljs.spec.rep_impl = (function cljs$spec$rep_impl(form,p){
return cljs.spec.rep_STAR_(p,p,cljs.core.PersistentVector.EMPTY,false,form);
});
/**
 * Do not call this directly, use '+'
 */
cljs.spec.rep_PLUS_impl = (function cljs$spec$rep_PLUS_impl(form,p){
return cljs.spec.pcat_STAR_(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ps","ps",292358046),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.spec.rep_STAR_(p,p,cljs.core.PersistentVector.EMPTY,true,form)], null),new cljs.core.Keyword(null,"forms","forms",2045992350),cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__8452__auto__ = form;
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})(),(function (){var x__8452__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","*","cljs.spec/*",-858366320,null)),(function (){var x__8452__auto__ = form;
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})())))),new cljs.core.Keyword(null,"ret","ret",-468222814),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"rep+","rep+",-281382396),form], null));
});
/**
 * Do not call this directly, use '&'
 */
cljs.spec.amp_impl = (function cljs$spec$amp_impl(re,preds,pred_forms){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204),new cljs.core.Keyword("cljs.spec","amp","cljs.spec/amp",-1217943932),new cljs.core.Keyword(null,"p1","p1",-936759954),re,new cljs.core.Keyword(null,"ps","ps",292358046),preds,new cljs.core.Keyword(null,"forms","forms",2045992350),pred_forms], null);
});
cljs.spec.filter_alt = (function cljs$spec$filter_alt(ps,ks,forms,f){
if(cljs.core.truth_((function (){var or__7523__auto__ = ks;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return forms;
}
})())){
var pks = cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__16575_SHARP_){
var G__16583 = cljs.core.first(p1__16575_SHARP_);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__16583) : f.call(null,G__16583));
}),cljs.core.map.cljs$core$IFn$_invoke$arity$4(cljs.core.vector,ps,(function (){var or__7523__auto__ = cljs.core.seq(ks);
if(or__7523__auto__){
return or__7523__auto__;
} else {
return cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null);
}
})(),(function (){var or__7523__auto__ = cljs.core.seq(forms);
if(or__7523__auto__){
return or__7523__auto__;
} else {
return cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null);
}
})()));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,pks)),(cljs.core.truth_(ks)?cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,pks)):null),(cljs.core.truth_(forms)?cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (pks){
return (function (p1__16577_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(p1__16577_SHARP_,(2));
});})(pks))
,pks)):null)], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.seq(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(f,ps)),ks,forms], null);
}
});
cljs.spec.alt_STAR_ = (function cljs$spec$alt_STAR_(ps,ks,forms){
var vec__16600 = cljs.spec.filter_alt(ps,ks,forms,cljs.core.identity);
var vec__16603 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16600,(0),null);
var seq__16604 = cljs.core.seq(vec__16603);
var first__16605 = cljs.core.first(seq__16604);
var seq__16604__$1 = cljs.core.next(seq__16604);
var p1 = first__16605;
var pr = seq__16604__$1;
var ps__$1 = vec__16603;
var vec__16606 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16600,(1),null);
var k1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16606,(0),null);
var ks__$1 = vec__16606;
var forms__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16600,(2),null);
if(cljs.core.truth_(ps__$1)){
var ret = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204),new cljs.core.Keyword("cljs.spec","alt","cljs.spec/alt",-1483418131),new cljs.core.Keyword(null,"ps","ps",292358046),ps__$1,new cljs.core.Keyword(null,"ks","ks",1900203942),ks__$1,new cljs.core.Keyword(null,"forms","forms",2045992350),forms__$1], null);
if((pr == null)){
if(cljs.core.truth_(k1)){
if(cljs.core.truth_(cljs.spec.accept_QMARK_(p1))){
return cljs.spec.accept(cljs.spec.tagged_ret(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k1,new cljs.core.Keyword(null,"ret","ret",-468222814).cljs$core$IFn$_invoke$arity$1(p1)], null)));
} else {
return ret;
}
} else {
return p1;
}
} else {
return ret;
}
} else {
return null;
}
});
cljs.spec.alts = (function cljs$spec$alts(var_args){
var args__8746__auto__ = [];
var len__8739__auto___16623 = arguments.length;
var i__8740__auto___16626 = (0);
while(true){
if((i__8740__auto___16626 < len__8739__auto___16623)){
args__8746__auto__.push((arguments[i__8740__auto___16626]));

var G__16635 = (i__8740__auto___16626 + (1));
i__8740__auto___16626 = G__16635;
continue;
} else {
}
break;
}

var argseq__8747__auto__ = ((((0) < args__8746__auto__.length))?(new cljs.core.IndexedSeq(args__8746__auto__.slice((0)),(0),null)):null);
return cljs.spec.alts.cljs$core$IFn$_invoke$arity$variadic(argseq__8747__auto__);
});

cljs.spec.alts.cljs$core$IFn$_invoke$arity$variadic = (function (ps){
return cljs.spec.alt_STAR_(ps,null,null);
});

cljs.spec.alts.cljs$lang$maxFixedArity = (0);

cljs.spec.alts.cljs$lang$applyTo = (function (seq16615){
return cljs.spec.alts.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq16615));
});

cljs.spec.alt2 = (function cljs$spec$alt2(p1,p2){
if(cljs.core.truth_((function (){var and__7511__auto__ = p1;
if(cljs.core.truth_(and__7511__auto__)){
return p2;
} else {
return and__7511__auto__;
}
})())){
return cljs.spec.alts.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([p1,p2], 0));
} else {
var or__7523__auto__ = p1;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return p2;
}
}
});
/**
 * Do not call this directly, use 'alt'
 */
cljs.spec.alt_impl = (function cljs$spec$alt_impl(ks,ps,forms){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.spec.alt_STAR_(ps,ks,forms),new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.random_uuid());
});
/**
 * Do not call this directly, use '?'
 */
cljs.spec.maybe_impl = (function cljs$spec$maybe_impl(p,form){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.spec.alt_STAR_(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.spec.accept(new cljs.core.Keyword("cljs.spec","nil","cljs.spec/nil",1576652718))], null),null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [form,new cljs.core.Keyword("cljs.spec","nil","cljs.spec/nil",1576652718)], null)),new cljs.core.Keyword(null,"maybe","maybe",-314397560),form);
});
cljs.spec.noret_QMARK_ = (function cljs$spec$noret_QMARK_(p1,pret){
var or__7523__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(pret,new cljs.core.Keyword("cljs.spec","nil","cljs.spec/nil",1576652718));
if(or__7523__auto__){
return or__7523__auto__;
} else {
var or__7523__auto____$1 = (function (){var and__7511__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("cljs.spec","pcat","cljs.spec/pcat",-1959753649),null,new cljs.core.Keyword("cljs.spec","rep","cljs.spec/rep",-556916491),null], null), null).call(null,new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204).cljs$core$IFn$_invoke$arity$1(cljs.spec.reg_resolve_BANG_(p1)));
if(cljs.core.truth_(and__7511__auto__)){
return cljs.core.empty_QMARK_(pret);
} else {
return and__7511__auto__;
}
})();
if(cljs.core.truth_(or__7523__auto____$1)){
return or__7523__auto____$1;
} else {
return null;
}
}
});
cljs.spec.accept_nil_QMARK_ = (function cljs$spec$accept_nil_QMARK_(p){
var map__16672 = cljs.spec.reg_resolve_BANG_(p);
var map__16672__$1 = ((((!((map__16672 == null)))?((((map__16672.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16672.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16672):map__16672);
var p__$1 = map__16672__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16672__$1,new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204));
var ps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16672__$1,new cljs.core.Keyword(null,"ps","ps",292358046));
var p1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16672__$1,new cljs.core.Keyword(null,"p1","p1",-936759954));
var p2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16672__$1,new cljs.core.Keyword(null,"p2","p2",905500641));
var forms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16672__$1,new cljs.core.Keyword(null,"forms","forms",2045992350));
var G__16680 = op;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","accept","cljs.spec/accept",-1753298186),G__16680)){
return true;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__16680)){
return null;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","amp","cljs.spec/amp",-1217943932),G__16680)){
var and__7511__auto__ = (cljs.spec.accept_nil_QMARK_.cljs$core$IFn$_invoke$arity$1 ? cljs.spec.accept_nil_QMARK_.cljs$core$IFn$_invoke$arity$1(p1) : cljs.spec.accept_nil_QMARK_.call(null,p1));
if(cljs.core.truth_(and__7511__auto__)){
var or__7523__auto__ = cljs.spec.noret_QMARK_(p1,(cljs.spec.preturn.cljs$core$IFn$_invoke$arity$1 ? cljs.spec.preturn.cljs$core$IFn$_invoke$arity$1(p1) : cljs.spec.preturn.call(null,p1)));
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
var ret = cljs.spec.and_preds((cljs.spec.preturn.cljs$core$IFn$_invoke$arity$1 ? cljs.spec.preturn.cljs$core$IFn$_invoke$arity$1(p1) : cljs.spec.preturn.call(null,p1)),ps,cljs.core.next(forms));
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(ret,new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537));
}
} else {
return and__7511__auto__;
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","rep","cljs.spec/rep",-556916491),G__16680)){
var or__7523__auto__ = (p1 === p2);
if(or__7523__auto__){
return or__7523__auto__;
} else {
return (cljs.spec.accept_nil_QMARK_.cljs$core$IFn$_invoke$arity$1 ? cljs.spec.accept_nil_QMARK_.cljs$core$IFn$_invoke$arity$1(p1) : cljs.spec.accept_nil_QMARK_.call(null,p1));
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","pcat","cljs.spec/pcat",-1959753649),G__16680)){
return cljs.core.every_QMARK_(cljs.spec.accept_nil_QMARK_,ps);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","alt","cljs.spec/alt",-1483418131),G__16680)){
return cljs.core.some(cljs.spec.accept_nil_QMARK_,ps);
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(op)].join('')));

}
}
}
}
}
}
});
cljs.spec.preturn = (function cljs$spec$preturn(p){
var map__16712 = cljs.spec.reg_resolve_BANG_(p);
var map__16712__$1 = ((((!((map__16712 == null)))?((((map__16712.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16712.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16712):map__16712);
var p__$1 = map__16712__$1;
var vec__16714 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16712__$1,new cljs.core.Keyword(null,"ps","ps",292358046));
var seq__16715 = cljs.core.seq(vec__16714);
var first__16716 = cljs.core.first(seq__16715);
var seq__16715__$1 = cljs.core.next(seq__16715);
var p0 = first__16716;
var pr = seq__16715__$1;
var ps = vec__16714;
var vec__16717 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16712__$1,new cljs.core.Keyword(null,"ks","ks",1900203942));
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16717,(0),null);
var ks = vec__16717;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16712__$1,new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204));
var p1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16712__$1,new cljs.core.Keyword(null,"p1","p1",-936759954));
var ret = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16712__$1,new cljs.core.Keyword(null,"ret","ret",-468222814));
var forms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16712__$1,new cljs.core.Keyword(null,"forms","forms",2045992350));
var G__16721 = op;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","accept","cljs.spec/accept",-1753298186),G__16721)){
return ret;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__16721)){
return null;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","amp","cljs.spec/amp",-1217943932),G__16721)){
var pret = (cljs.spec.preturn.cljs$core$IFn$_invoke$arity$1 ? cljs.spec.preturn.cljs$core$IFn$_invoke$arity$1(p1) : cljs.spec.preturn.call(null,p1));
if(cljs.core.truth_(cljs.spec.noret_QMARK_(p1,pret))){
return new cljs.core.Keyword("cljs.spec","nil","cljs.spec/nil",1576652718);
} else {
return cljs.spec.and_preds(pret,ps,forms);
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","rep","cljs.spec/rep",-556916491),G__16721)){
return (cljs.spec.add_ret.cljs$core$IFn$_invoke$arity$3 ? cljs.spec.add_ret.cljs$core$IFn$_invoke$arity$3(p1,ret,k) : cljs.spec.add_ret.call(null,p1,ret,k));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","pcat","cljs.spec/pcat",-1959753649),G__16721)){
return (cljs.spec.add_ret.cljs$core$IFn$_invoke$arity$3 ? cljs.spec.add_ret.cljs$core$IFn$_invoke$arity$3(p0,ret,k) : cljs.spec.add_ret.call(null,p0,ret,k));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","alt","cljs.spec/alt",-1483418131),G__16721)){
var vec__16724 = cljs.spec.filter_alt(ps,ks,forms,cljs.spec.accept_nil_QMARK_);
var vec__16727 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16724,(0),null);
var p0__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16727,(0),null);
var vec__16730 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16724,(1),null);
var k0 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16730,(0),null);
var r = (((p0__$1 == null))?new cljs.core.Keyword("cljs.spec","nil","cljs.spec/nil",1576652718):(cljs.spec.preturn.cljs$core$IFn$_invoke$arity$1 ? cljs.spec.preturn.cljs$core$IFn$_invoke$arity$1(p0__$1) : cljs.spec.preturn.call(null,p0__$1)));
if(cljs.core.truth_(k0)){
return cljs.spec.tagged_ret(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k0,r], null));
} else {
return r;
}
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(op)].join('')));

}
}
}
}
}
}
});
cljs.spec.op_unform = (function cljs$spec$op_unform(p,x){
var map__16779 = cljs.spec.reg_resolve_BANG_(p);
var map__16779__$1 = ((((!((map__16779 == null)))?((((map__16779.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16779.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16779):map__16779);
var p__$1 = map__16779__$1;
var vec__16780 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16779__$1,new cljs.core.Keyword(null,"ps","ps",292358046));
var seq__16781 = cljs.core.seq(vec__16780);
var first__16782 = cljs.core.first(seq__16781);
var seq__16781__$1 = cljs.core.next(seq__16781);
var p0 = first__16782;
var pr = seq__16781__$1;
var ps = vec__16780;
var vec__16783 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16779__$1,new cljs.core.Keyword(null,"ks","ks",1900203942));
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16783,(0),null);
var ks = vec__16783;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16779__$1,new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204));
var p1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16779__$1,new cljs.core.Keyword(null,"p1","p1",-936759954));
var ret = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16779__$1,new cljs.core.Keyword(null,"ret","ret",-468222814));
var forms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16779__$1,new cljs.core.Keyword(null,"forms","forms",2045992350));
var rep_PLUS_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16779__$1,new cljs.core.Keyword(null,"rep+","rep+",-281382396));
var maybe = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16779__$1,new cljs.core.Keyword(null,"maybe","maybe",-314397560));
var kps = cljs.core.zipmap(ks,ps);
var G__16787 = op;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","accept","cljs.spec/accept",-1753298186),G__16787)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ret], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__16787)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.unform(p__$1,x)], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","amp","cljs.spec/amp",-1217943932),G__16787)){
var px = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (G__16787,map__16779,map__16779__$1,p__$1,vec__16780,seq__16781,first__16782,seq__16781__$1,p0,pr,ps,vec__16783,k,ks,op,p1,ret,forms,rep_PLUS_,maybe,kps){
return (function (p1__16754_SHARP_,p2__16753_SHARP_){
return cljs.spec.unform(p2__16753_SHARP_,p1__16754_SHARP_);
});})(G__16787,map__16779,map__16779__$1,p__$1,vec__16780,seq__16781,first__16782,seq__16781__$1,p0,pr,ps,vec__16783,k,ks,op,p1,ret,forms,rep_PLUS_,maybe,kps))
,x,cljs.core.reverse(ps));
return (cljs.spec.op_unform.cljs$core$IFn$_invoke$arity$2 ? cljs.spec.op_unform.cljs$core$IFn$_invoke$arity$2(p1,px) : cljs.spec.op_unform.call(null,p1,px));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","rep","cljs.spec/rep",-556916491),G__16787)){
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (G__16787,map__16779,map__16779__$1,p__$1,vec__16780,seq__16781,first__16782,seq__16781__$1,p0,pr,ps,vec__16783,k,ks,op,p1,ret,forms,rep_PLUS_,maybe,kps){
return (function (p1__16755_SHARP_){
return (cljs.spec.op_unform.cljs$core$IFn$_invoke$arity$2 ? cljs.spec.op_unform.cljs$core$IFn$_invoke$arity$2(p1,p1__16755_SHARP_) : cljs.spec.op_unform.call(null,p1,p1__16755_SHARP_));
});})(G__16787,map__16779,map__16779__$1,p__$1,vec__16780,seq__16781,first__16782,seq__16781__$1,p0,pr,ps,vec__16783,k,ks,op,p1,ret,forms,rep_PLUS_,maybe,kps))
,cljs.core.array_seq([x], 0));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","pcat","cljs.spec/pcat",-1959753649),G__16787)){
if(cljs.core.truth_(rep_PLUS_)){
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (G__16787,map__16779,map__16779__$1,p__$1,vec__16780,seq__16781,first__16782,seq__16781__$1,p0,pr,ps,vec__16783,k,ks,op,p1,ret,forms,rep_PLUS_,maybe,kps){
return (function (p1__16756_SHARP_){
return (cljs.spec.op_unform.cljs$core$IFn$_invoke$arity$2 ? cljs.spec.op_unform.cljs$core$IFn$_invoke$arity$2(p0,p1__16756_SHARP_) : cljs.spec.op_unform.call(null,p0,p1__16756_SHARP_));
});})(G__16787,map__16779,map__16779__$1,p__$1,vec__16780,seq__16781,first__16782,seq__16781__$1,p0,pr,ps,vec__16783,k,ks,op,p1,ret,forms,rep_PLUS_,maybe,kps))
,cljs.core.array_seq([x], 0));
} else {
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (G__16787,map__16779,map__16779__$1,p__$1,vec__16780,seq__16781,first__16782,seq__16781__$1,p0,pr,ps,vec__16783,k,ks,op,p1,ret,forms,rep_PLUS_,maybe,kps){
return (function (k__$1){
if(cljs.core.contains_QMARK_(x,k__$1)){
var G__16788 = (kps.cljs$core$IFn$_invoke$arity$1 ? kps.cljs$core$IFn$_invoke$arity$1(k__$1) : kps.call(null,k__$1));
var G__16789 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(x,k__$1);
return (cljs.spec.op_unform.cljs$core$IFn$_invoke$arity$2 ? cljs.spec.op_unform.cljs$core$IFn$_invoke$arity$2(G__16788,G__16789) : cljs.spec.op_unform.call(null,G__16788,G__16789));
} else {
return null;
}
});})(G__16787,map__16779,map__16779__$1,p__$1,vec__16780,seq__16781,first__16782,seq__16781__$1,p0,pr,ps,vec__16783,k,ks,op,p1,ret,forms,rep_PLUS_,maybe,kps))
,cljs.core.array_seq([ks], 0));
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","alt","cljs.spec/alt",-1483418131),G__16787)){
if(cljs.core.truth_(maybe)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.unform(p0,x)], null);
} else {
var vec__16790 = x;
var k__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16790,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16790,(1),null);
var G__16793 = (kps.cljs$core$IFn$_invoke$arity$1 ? kps.cljs$core$IFn$_invoke$arity$1(k__$1) : kps.call(null,k__$1));
var G__16794 = v;
return (cljs.spec.op_unform.cljs$core$IFn$_invoke$arity$2 ? cljs.spec.op_unform.cljs$core$IFn$_invoke$arity$2(G__16793,G__16794) : cljs.spec.op_unform.call(null,G__16793,G__16794));
}
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(op)].join('')));

}
}
}
}
}
}
});
cljs.spec.add_ret = (function cljs$spec$add_ret(p,r,k){
var map__16845 = cljs.spec.reg_resolve_BANG_(p);
var map__16845__$1 = ((((!((map__16845 == null)))?((((map__16845.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16845.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16845):map__16845);
var p__$1 = map__16845__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16845__$1,new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204));
var ps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16845__$1,new cljs.core.Keyword(null,"ps","ps",292358046));
var splice = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16845__$1,new cljs.core.Keyword(null,"splice","splice",449588165));
var prop = ((function (map__16845,map__16845__$1,p__$1,op,ps,splice){
return (function (){
var ret = cljs.spec.preturn(p__$1);
if(cljs.core.empty_QMARK_(ret)){
return r;
} else {
return (cljs.core.truth_(splice)?cljs.core.into:cljs.core.conj).call(null,r,(cljs.core.truth_(k)?cljs.core.PersistentArrayMap.fromArray([k,ret], true, false):ret));
}
});})(map__16845,map__16845__$1,p__$1,op,ps,splice))
;
var G__16849 = op;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__16849)){
return r;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","alt","cljs.spec/alt",-1483418131),G__16849)){
var ret = cljs.spec.preturn(p__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ret,new cljs.core.Keyword("cljs.spec","nil","cljs.spec/nil",1576652718))){
return r;
} else {
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(r,(cljs.core.truth_(k)?cljs.core.PersistentArrayMap.fromArray([k,ret], true, false):ret));
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","accept","cljs.spec/accept",-1753298186),G__16849)){
var ret = cljs.spec.preturn(p__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ret,new cljs.core.Keyword("cljs.spec","nil","cljs.spec/nil",1576652718))){
return r;
} else {
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(r,(cljs.core.truth_(k)?cljs.core.PersistentArrayMap.fromArray([k,ret], true, false):ret));
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","amp","cljs.spec/amp",-1217943932),G__16849)){
var ret = cljs.spec.preturn(p__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ret,new cljs.core.Keyword("cljs.spec","nil","cljs.spec/nil",1576652718))){
return r;
} else {
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(r,(cljs.core.truth_(k)?cljs.core.PersistentArrayMap.fromArray([k,ret], true, false):ret));
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","rep","cljs.spec/rep",-556916491),G__16849)){
return prop();
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","pcat","cljs.spec/pcat",-1959753649),G__16849)){
return prop();
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(op)].join('')));

}
}
}
}
}
}
});
cljs.spec.deriv = (function cljs$spec$deriv(p,x){
var map__16886 = cljs.spec.reg_resolve_BANG_(p);
var map__16886__$1 = ((((!((map__16886 == null)))?((((map__16886.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16886.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16886):map__16886);
var p__$1 = map__16886__$1;
var vec__16887 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16886__$1,new cljs.core.Keyword(null,"ps","ps",292358046));
var seq__16888 = cljs.core.seq(vec__16887);
var first__16889 = cljs.core.first(seq__16888);
var seq__16888__$1 = cljs.core.next(seq__16888);
var p0 = first__16889;
var pr = seq__16888__$1;
var ps = vec__16887;
var vec__16890 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16886__$1,new cljs.core.Keyword(null,"ks","ks",1900203942));
var seq__16891 = cljs.core.seq(vec__16890);
var first__16892 = cljs.core.first(seq__16891);
var seq__16891__$1 = cljs.core.next(seq__16891);
var k0 = first__16892;
var kr = seq__16891__$1;
var ks = vec__16890;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16886__$1,new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204));
var p1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16886__$1,new cljs.core.Keyword(null,"p1","p1",-936759954));
var p2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16886__$1,new cljs.core.Keyword(null,"p2","p2",905500641));
var ret = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16886__$1,new cljs.core.Keyword(null,"ret","ret",-468222814));
var splice = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16886__$1,new cljs.core.Keyword(null,"splice","splice",449588165));
var forms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16886__$1,new cljs.core.Keyword(null,"forms","forms",2045992350));
if(cljs.core.truth_(p__$1)){
var G__16894 = op;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","accept","cljs.spec/accept",-1753298186),G__16894)){
return null;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__16894)){
var ret__$1 = cljs.spec.dt.cljs$core$IFn$_invoke$arity$3(p__$1,x,p__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537),ret__$1)){
return null;
} else {
return cljs.spec.accept(ret__$1);
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","amp","cljs.spec/amp",-1217943932),G__16894)){
var temp__6753__auto__ = (cljs.spec.deriv.cljs$core$IFn$_invoke$arity$2 ? cljs.spec.deriv.cljs$core$IFn$_invoke$arity$2(p1,x) : cljs.spec.deriv.call(null,p1,x));
if(cljs.core.truth_(temp__6753__auto__)){
var p1__$1 = temp__6753__auto__;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","accept","cljs.spec/accept",-1753298186),new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204).cljs$core$IFn$_invoke$arity$1(p1__$1))){
var ret__$1 = cljs.spec.and_preds(cljs.spec.preturn(p1__$1),ps,cljs.core.next(forms));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ret__$1,new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537))){
return null;
} else {
return cljs.spec.accept(ret__$1);
}
} else {
return cljs.spec.amp_impl(p1__$1,ps,forms);
}
} else {
return null;
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","pcat","cljs.spec/pcat",-1959753649),G__16894)){
return cljs.spec.alt2(cljs.spec.pcat_STAR_(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ps","ps",292358046),cljs.core.cons((cljs.spec.deriv.cljs$core$IFn$_invoke$arity$2 ? cljs.spec.deriv.cljs$core$IFn$_invoke$arity$2(p0,x) : cljs.spec.deriv.call(null,p0,x)),pr),new cljs.core.Keyword(null,"ks","ks",1900203942),ks,new cljs.core.Keyword(null,"forms","forms",2045992350),forms,new cljs.core.Keyword(null,"ret","ret",-468222814),ret], null)),(cljs.core.truth_(cljs.spec.accept_nil_QMARK_(p0))?(function (){var G__16898 = cljs.spec.pcat_STAR_(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ps","ps",292358046),pr,new cljs.core.Keyword(null,"ks","ks",1900203942),kr,new cljs.core.Keyword(null,"forms","forms",2045992350),cljs.core.next(forms),new cljs.core.Keyword(null,"ret","ret",-468222814),cljs.spec.add_ret(p0,ret,k0)], null));
var G__16899 = x;
return (cljs.spec.deriv.cljs$core$IFn$_invoke$arity$2 ? cljs.spec.deriv.cljs$core$IFn$_invoke$arity$2(G__16898,G__16899) : cljs.spec.deriv.call(null,G__16898,G__16899));
})():null));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","alt","cljs.spec/alt",-1483418131),G__16894)){
return cljs.spec.alt_STAR_(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__16894,map__16886,map__16886__$1,p__$1,vec__16887,seq__16888,first__16889,seq__16888__$1,p0,pr,ps,vec__16890,seq__16891,first__16892,seq__16891__$1,k0,kr,ks,op,p1,p2,ret,splice,forms){
return (function (p1__16868_SHARP_){
return (cljs.spec.deriv.cljs$core$IFn$_invoke$arity$2 ? cljs.spec.deriv.cljs$core$IFn$_invoke$arity$2(p1__16868_SHARP_,x) : cljs.spec.deriv.call(null,p1__16868_SHARP_,x));
});})(G__16894,map__16886,map__16886__$1,p__$1,vec__16887,seq__16888,first__16889,seq__16888__$1,p0,pr,ps,vec__16890,seq__16891,first__16892,seq__16891__$1,k0,kr,ks,op,p1,p2,ret,splice,forms))
,ps),ks,forms);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","rep","cljs.spec/rep",-556916491),G__16894)){
return cljs.spec.alt2(cljs.spec.rep_STAR_((cljs.spec.deriv.cljs$core$IFn$_invoke$arity$2 ? cljs.spec.deriv.cljs$core$IFn$_invoke$arity$2(p1,x) : cljs.spec.deriv.call(null,p1,x)),p2,ret,splice,forms),(cljs.core.truth_(cljs.spec.accept_nil_QMARK_(p1))?(function (){var G__16900 = cljs.spec.rep_STAR_(p2,p2,cljs.spec.add_ret(p1,ret,null),splice,forms);
var G__16901 = x;
return (cljs.spec.deriv.cljs$core$IFn$_invoke$arity$2 ? cljs.spec.deriv.cljs$core$IFn$_invoke$arity$2(G__16900,G__16901) : cljs.spec.deriv.call(null,G__16900,G__16901));
})():null));
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(op)].join('')));

}
}
}
}
}
}
} else {
return null;
}
});
cljs.spec.op_describe = (function cljs$spec$op_describe(p){
var map__16945 = cljs.spec.reg_resolve_BANG_(p);
var map__16945__$1 = ((((!((map__16945 == null)))?((((map__16945.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16945.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16945):map__16945);
var p__$1 = map__16945__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16945__$1,new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204));
var ps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16945__$1,new cljs.core.Keyword(null,"ps","ps",292358046));
var ks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16945__$1,new cljs.core.Keyword(null,"ks","ks",1900203942));
var forms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16945__$1,new cljs.core.Keyword(null,"forms","forms",2045992350));
var splice = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16945__$1,new cljs.core.Keyword(null,"splice","splice",449588165));
var p1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16945__$1,new cljs.core.Keyword(null,"p1","p1",-936759954));
var rep_PLUS_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16945__$1,new cljs.core.Keyword(null,"rep+","rep+",-281382396));
var maybe = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16945__$1,new cljs.core.Keyword(null,"maybe","maybe",-314397560));
if(cljs.core.truth_(p__$1)){
var G__16947 = op;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","accept","cljs.spec/accept",-1753298186),G__16947)){
return null;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__16947)){
return p__$1;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","amp","cljs.spec/amp",-1217943932),G__16947)){
return cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$3(new cljs.core.Symbol("clojure.spec","&","clojure.spec/&",-770935491,null),(cljs.spec.op_describe.cljs$core$IFn$_invoke$arity$1 ? cljs.spec.op_describe.cljs$core$IFn$_invoke$arity$1(p1) : cljs.spec.op_describe.call(null,p1)),forms);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","pcat","cljs.spec/pcat",-1959753649),G__16947)){
if(cljs.core.truth_(rep_PLUS_)){
return cljs.core._conj((function (){var x__8452__auto__ = rep_PLUS_;
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})(),new cljs.core.Symbol("cljs.spec","+","cljs.spec/+",-342318319,null));
} else {
return cljs.core.cons(new cljs.core.Symbol("cljs.spec","cat","cljs.spec/cat",850003863,null),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.vector,cljs.core.array_seq([(function (){var or__7523__auto__ = cljs.core.seq(ks);
if(or__7523__auto__){
return or__7523__auto__;
} else {
return cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"_","_",1453416199));
}
})(),forms], 0)));
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","alt","cljs.spec/alt",-1483418131),G__16947)){
if(cljs.core.truth_(maybe)){
return cljs.core._conj((function (){var x__8452__auto__ = maybe;
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})(),new cljs.core.Symbol("cljs.spec","?","cljs.spec/?",-1542560017,null));
} else {
return cljs.core.cons(new cljs.core.Symbol("cljs.spec","alt","cljs.spec/alt",157113396,null),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.vector,cljs.core.array_seq([ks,forms], 0)));
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","rep","cljs.spec/rep",-556916491),G__16947)){
var x__8452__auto__ = (cljs.core.truth_(splice)?new cljs.core.Symbol("cljs.spec","+","cljs.spec/+",-342318319,null):new cljs.core.Symbol("cljs.spec","*","cljs.spec/*",-858366320,null));
return cljs.core._conj((function (){var x__8452__auto____$1 = forms;
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto____$1);
})(),x__8452__auto__);
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(op)].join('')));

}
}
}
}
}
}
} else {
return null;
}
});
cljs.spec.op_explain = (function cljs$spec$op_explain(form,p,path,via,in$,input){
var vec__16992 = input;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16992,(0),null);
var input__$1 = vec__16992;
var map__16995 = cljs.spec.reg_resolve_BANG_(p);
var map__16995__$1 = ((((!((map__16995 == null)))?((((map__16995.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16995.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16995):map__16995);
var p__$1 = map__16995__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16995__$1,new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204));
var ps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16995__$1,new cljs.core.Keyword(null,"ps","ps",292358046));
var ks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16995__$1,new cljs.core.Keyword(null,"ks","ks",1900203942));
var forms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16995__$1,new cljs.core.Keyword(null,"forms","forms",2045992350));
var splice = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16995__$1,new cljs.core.Keyword(null,"splice","splice",449588165));
var p1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16995__$1,new cljs.core.Keyword(null,"p1","p1",-936759954));
var p2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16995__$1,new cljs.core.Keyword(null,"p2","p2",905500641));
var via__$1 = (function (){var temp__6751__auto__ = cljs.spec.spec_name(p__$1);
if(cljs.core.truth_(temp__6751__auto__)){
var name = temp__6751__auto__;
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(via,name);
} else {
return via;
}
})();
var insufficient = ((function (vec__16992,x,input__$1,map__16995,map__16995__$1,p__$1,op,ps,ks,forms,splice,p1,p2,via__$1){
return (function (path__$1,form__$1){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"path","path",-188191168),path__$1,new cljs.core.Keyword(null,"reason","reason",-2070751759),"Insufficient input",new cljs.core.Keyword(null,"pred","pred",1927423397),cljs.spec.abbrev(form__$1),new cljs.core.Keyword(null,"val","val",128701612),cljs.core.List.EMPTY,new cljs.core.Keyword(null,"via","via",-1904457336),via__$1,new cljs.core.Keyword(null,"in","in",-1531184865),in$], null)], null);
});})(vec__16992,x,input__$1,map__16995,map__16995__$1,p__$1,op,ps,ks,forms,splice,p1,p2,via__$1))
;
if(cljs.core.truth_(p__$1)){
var G__16997 = op;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","accept","cljs.spec/accept",-1753298186),G__16997)){
return null;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__16997)){
if(cljs.core.empty_QMARK_(input__$1)){
return insufficient(path,form);
} else {
return cljs.spec.explain_1(form,p__$1,path,via__$1,in$,x);
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","amp","cljs.spec/amp",-1217943932),G__16997)){
if(cljs.core.empty_QMARK_(input__$1)){
if(cljs.core.truth_(cljs.spec.accept_nil_QMARK_(p1))){
return cljs.spec.explain_pred_list(forms,ps,path,via__$1,in$,cljs.spec.preturn(p1));
} else {
return insufficient(path,cljs.spec.op_describe(p1));
}
} else {
var temp__6751__auto__ = cljs.spec.deriv(p1,x);
if(cljs.core.truth_(temp__6751__auto__)){
var p1__$1 = temp__6751__auto__;
return cljs.spec.explain_pred_list(forms,ps,path,via__$1,in$,cljs.spec.preturn(p1__$1));
} else {
var G__16998 = cljs.spec.op_describe(p1);
var G__16999 = p1;
var G__17000 = path;
var G__17001 = via__$1;
var G__17002 = in$;
var G__17003 = input__$1;
return (cljs.spec.op_explain.cljs$core$IFn$_invoke$arity$6 ? cljs.spec.op_explain.cljs$core$IFn$_invoke$arity$6(G__16998,G__16999,G__17000,G__17001,G__17002,G__17003) : cljs.spec.op_explain.call(null,G__16998,G__16999,G__17000,G__17001,G__17002,G__17003));
}
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","pcat","cljs.spec/pcat",-1959753649),G__16997)){
var pkfs = cljs.core.map.cljs$core$IFn$_invoke$arity$4(cljs.core.vector,ps,(function (){var or__7523__auto__ = cljs.core.seq(ks);
if(or__7523__auto__){
return or__7523__auto__;
} else {
return cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null);
}
})(),(function (){var or__7523__auto__ = cljs.core.seq(forms);
if(or__7523__auto__){
return or__7523__auto__;
} else {
return cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null);
}
})());
var vec__17004 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(pkfs)))?cljs.core.first(pkfs):cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(((function (pkfs,G__16997,vec__16992,x,input__$1,map__16995,map__16995__$1,p__$1,op,ps,ks,forms,splice,p1,p2,via__$1,insufficient){
return (function (p__17007){
var vec__17008 = p__17007;
var p__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17008,(0),null);
return cljs.spec.accept_nil_QMARK_(p__$2);
});})(pkfs,G__16997,vec__16992,x,input__$1,map__16995,map__16995__$1,p__$1,op,ps,ks,forms,splice,p1,p2,via__$1,insufficient))
,pkfs)));
var pred = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17004,(0),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17004,(1),null);
var form__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17004,(2),null);
var path__$1 = (cljs.core.truth_(k)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,k):path);
var form__$2 = (function (){var or__7523__auto__ = form__$1;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.spec.op_describe(pred);
}
})();
if((cljs.core.empty_QMARK_(input__$1)) && (cljs.core.not(pred))){
return insufficient(path__$1,form__$2);
} else {
return (cljs.spec.op_explain.cljs$core$IFn$_invoke$arity$6 ? cljs.spec.op_explain.cljs$core$IFn$_invoke$arity$6(form__$2,pred,path__$1,via__$1,in$,input__$1) : cljs.spec.op_explain.call(null,form__$2,pred,path__$1,via__$1,in$,input__$1));
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","alt","cljs.spec/alt",-1483418131),G__16997)){
if(cljs.core.empty_QMARK_(input__$1)){
return insufficient(path,cljs.spec.op_describe(p__$1));
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,cljs.core.map.cljs$core$IFn$_invoke$arity$4(((function (G__16997,vec__16992,x,input__$1,map__16995,map__16995__$1,p__$1,op,ps,ks,forms,splice,p1,p2,via__$1,insufficient){
return (function (k,form__$1,pred){
var G__17011 = (function (){var or__7523__auto__ = form__$1;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return cljs.spec.op_describe(pred);
}
})();
var G__17012 = pred;
var G__17013 = (cljs.core.truth_(k)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,k):path);
var G__17014 = via__$1;
var G__17015 = in$;
var G__17016 = input__$1;
return (cljs.spec.op_explain.cljs$core$IFn$_invoke$arity$6 ? cljs.spec.op_explain.cljs$core$IFn$_invoke$arity$6(G__17011,G__17012,G__17013,G__17014,G__17015,G__17016) : cljs.spec.op_explain.call(null,G__17011,G__17012,G__17013,G__17014,G__17015,G__17016));
});})(G__16997,vec__16992,x,input__$1,map__16995,map__16995__$1,p__$1,op,ps,ks,forms,splice,p1,p2,via__$1,insufficient))
,(function (){var or__7523__auto__ = cljs.core.seq(ks);
if(or__7523__auto__){
return or__7523__auto__;
} else {
return cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null);
}
})(),(function (){var or__7523__auto__ = cljs.core.seq(forms);
if(or__7523__auto__){
return or__7523__auto__;
} else {
return cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null);
}
})(),ps));
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","rep","cljs.spec/rep",-556916491),G__16997)){
var G__17021 = (((p1 === p2))?forms:cljs.spec.op_describe(p1));
var G__17022 = p1;
var G__17023 = path;
var G__17024 = via__$1;
var G__17025 = in$;
var G__17026 = input__$1;
return (cljs.spec.op_explain.cljs$core$IFn$_invoke$arity$6 ? cljs.spec.op_explain.cljs$core$IFn$_invoke$arity$6(G__17021,G__17022,G__17023,G__17024,G__17025,G__17026) : cljs.spec.op_explain.call(null,G__17021,G__17022,G__17023,G__17024,G__17025,G__17026));
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(op)].join('')));

}
}
}
}
}
}
} else {
return null;
}
});
cljs.spec.re_gen = (function cljs$spec$re_gen(p,overrides,path,rmap,f){
var map__17146 = cljs.spec.reg_resolve_BANG_(p);
var map__17146__$1 = ((((!((map__17146 == null)))?((((map__17146.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17146.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__17146):map__17146);
var p__$1 = map__17146__$1;
var ps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17146__$1,new cljs.core.Keyword(null,"ps","ps",292358046));
var forms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17146__$1,new cljs.core.Keyword(null,"forms","forms",2045992350));
var p2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17146__$1,new cljs.core.Keyword(null,"p2","p2",905500641));
var ret = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17146__$1,new cljs.core.Keyword(null,"ret","ret",-468222814));
var splice = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17146__$1,new cljs.core.Keyword(null,"splice","splice",449588165));
var ks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17146__$1,new cljs.core.Keyword(null,"ks","ks",1900203942));
var p1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17146__$1,new cljs.core.Keyword(null,"p1","p1",-936759954));
var gfn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17146__$1,new cljs.core.Keyword("cljs.spec","gfn","cljs.spec/gfn",-432034727));
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17146__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17146__$1,new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204));
var rmap__$1 = (cljs.core.truth_(id)?cljs.spec.inck(rmap,id):rmap);
var ggens = ((function (map__17146,map__17146__$1,p__$1,ps,forms,p2,ret,splice,ks,p1,gfn,id,op,rmap__$1){
return (function (ps__$1,ks__$1,forms__$1){
var gen = ((function (map__17146,map__17146__$1,p__$1,ps,forms,p2,ret,splice,ks,p1,gfn,id,op,rmap__$1){
return (function (p__$2,k,f__$1){
if(cljs.core.truth_((function (){var and__7511__auto__ = rmap__$1;
if(cljs.core.truth_(and__7511__auto__)){
var and__7511__auto____$1 = id;
if(cljs.core.truth_(and__7511__auto____$1)){
var and__7511__auto____$2 = k;
if(cljs.core.truth_(and__7511__auto____$2)){
return cljs.spec.recur_limit_QMARK_(rmap__$1,id,path,k);
} else {
return and__7511__auto____$2;
}
} else {
return and__7511__auto____$1;
}
} else {
return and__7511__auto__;
}
})())){
return null;
} else {
if(cljs.core.truth_(id)){
return cljs.spec.impl.gen.delay_impl((new cljs.core.Delay(((function (map__17146,map__17146__$1,p__$1,ps,forms,p2,ret,splice,ks,p1,gfn,id,op,rmap__$1){
return (function (){
var G__17154 = p__$2;
var G__17155 = overrides;
var G__17156 = (cljs.core.truth_(k)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,k):path);
var G__17157 = rmap__$1;
var G__17158 = (function (){var or__7523__auto__ = f__$1;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return p__$2;
}
})();
return (cljs.spec.re_gen.cljs$core$IFn$_invoke$arity$5 ? cljs.spec.re_gen.cljs$core$IFn$_invoke$arity$5(G__17154,G__17155,G__17156,G__17157,G__17158) : cljs.spec.re_gen.call(null,G__17154,G__17155,G__17156,G__17157,G__17158));
});})(map__17146,map__17146__$1,p__$1,ps,forms,p2,ret,splice,ks,p1,gfn,id,op,rmap__$1))
,null)));
} else {
var G__17159 = p__$2;
var G__17160 = overrides;
var G__17161 = (cljs.core.truth_(k)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,k):path);
var G__17162 = rmap__$1;
var G__17163 = (function (){var or__7523__auto__ = f__$1;
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return p__$2;
}
})();
return (cljs.spec.re_gen.cljs$core$IFn$_invoke$arity$5 ? cljs.spec.re_gen.cljs$core$IFn$_invoke$arity$5(G__17159,G__17160,G__17161,G__17162,G__17163) : cljs.spec.re_gen.call(null,G__17159,G__17160,G__17161,G__17162,G__17163));
}
}
});})(map__17146,map__17146__$1,p__$1,ps,forms,p2,ret,splice,ks,p1,gfn,id,op,rmap__$1))
;
return cljs.core.map.cljs$core$IFn$_invoke$arity$4(gen,ps__$1,(function (){var or__7523__auto__ = cljs.core.seq(ks__$1);
if(or__7523__auto__){
return or__7523__auto__;
} else {
return cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null);
}
})(),(function (){var or__7523__auto__ = cljs.core.seq(forms__$1);
if(or__7523__auto__){
return or__7523__auto__;
} else {
return cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null);
}
})());
});})(map__17146,map__17146__$1,p__$1,ps,forms,p2,ret,splice,ks,p1,gfn,id,op,rmap__$1))
;
var or__7523__auto__ = (function (){var temp__6753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(overrides,path);
if(cljs.core.truth_(temp__6753__auto__)){
var g = temp__6753__auto__;
var G__17175 = op;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"accept","accept",1874130431),G__17175)){
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.vector,g], 0));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__17175)){
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.vector,g], 0));
} else {
return g;

}
}
} else {
return null;
}
})();
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
var or__7523__auto____$1 = (cljs.core.truth_(gfn)?(gfn.cljs$core$IFn$_invoke$arity$0 ? gfn.cljs$core$IFn$_invoke$arity$0() : gfn.call(null)):null);
if(cljs.core.truth_(or__7523__auto____$1)){
return or__7523__auto____$1;
} else {
if(cljs.core.truth_(p__$1)){
var G__17179 = op;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","accept","cljs.spec/accept",-1753298186),G__17179)){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ret,new cljs.core.Keyword("cljs.spec","nil","cljs.spec/nil",1576652718))){
return cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.PersistentVector.EMPTY], 0));
} else {
return cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ret], null)], 0));
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__17179)){
var temp__6753__auto__ = cljs.spec.gensub(p__$1,overrides,path,rmap__$1,f);
if(cljs.core.truth_(temp__6753__auto__)){
var g = temp__6753__auto__;
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.vector,g], 0));
} else {
return null;
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","amp","cljs.spec/amp",-1217943932),G__17179)){
var G__17182 = p1;
var G__17183 = overrides;
var G__17184 = path;
var G__17185 = rmap__$1;
var G__17186 = cljs.spec.op_describe(p1);
return (cljs.spec.re_gen.cljs$core$IFn$_invoke$arity$5 ? cljs.spec.re_gen.cljs$core$IFn$_invoke$arity$5(G__17182,G__17183,G__17184,G__17185,G__17186) : cljs.spec.re_gen.call(null,G__17182,G__17183,G__17184,G__17185,G__17186));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","pcat","cljs.spec/pcat",-1959753649),G__17179)){
var gens = ggens(ps,ks,forms);
if(cljs.core.every_QMARK_(cljs.core.identity,gens)){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.spec.impl.gen.cat,gens);
} else {
return null;
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","alt","cljs.spec/alt",-1483418131),G__17179)){
var gens = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,ggens(ps,ks,forms));
if(cljs.core.empty_QMARK_(gens)){
return null;
} else {
return cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([gens], 0));
}
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","rep","cljs.spec/rep",-556916491),G__17179)){
if(cljs.core.truth_(cljs.spec.recur_limit_QMARK_(rmap__$1,id,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [id], null),id))){
return cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.PersistentVector.EMPTY], 0));
} else {
var temp__6753__auto__ = (cljs.spec.re_gen.cljs$core$IFn$_invoke$arity$5 ? cljs.spec.re_gen.cljs$core$IFn$_invoke$arity$5(p2,overrides,path,rmap__$1,forms) : cljs.spec.re_gen.call(null,p2,overrides,path,rmap__$1,forms));
if(cljs.core.truth_(temp__6753__auto__)){
var g = temp__6753__auto__;
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((function (g,temp__6753__auto__,G__17179,or__7523__auto____$1,or__7523__auto__,map__17146,map__17146__$1,p__$1,ps,forms,p2,ret,splice,ks,p1,gfn,id,op,rmap__$1,ggens){
return (function (p1__17109_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,p1__17109_SHARP_);
});})(g,temp__6753__auto__,G__17179,or__7523__auto____$1,or__7523__auto__,map__17146,map__17146__$1,p__$1,ps,forms,p2,ret,splice,ks,p1,gfn,id,op,rmap__$1,ggens))
,cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([g], 0))], 0));
} else {
return null;
}
}
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(op)].join('')));

}
}
}
}
}
}
} else {
return null;
}
}
}
});
cljs.spec.re_conform = (function cljs$spec$re_conform(p,p__17249){
while(true){
var vec__17255 = p__17249;
var seq__17256 = cljs.core.seq(vec__17255);
var first__17257 = cljs.core.first(seq__17256);
var seq__17256__$1 = cljs.core.next(seq__17256);
var x = first__17257;
var xs = seq__17256__$1;
var data = vec__17255;
if(cljs.core.empty_QMARK_(data)){
if(cljs.core.truth_(cljs.spec.accept_nil_QMARK_(p))){
var ret = cljs.spec.preturn(p);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ret,new cljs.core.Keyword("cljs.spec","nil","cljs.spec/nil",1576652718))){
return null;
} else {
return ret;
}
} else {
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
}
} else {
var temp__6751__auto__ = cljs.spec.deriv(p,x);
if(cljs.core.truth_(temp__6751__auto__)){
var dp = temp__6751__auto__;
var G__17258 = dp;
var G__17259 = xs;
p = G__17258;
p__17249 = G__17259;
continue;
} else {
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
}
}
break;
}
});
cljs.spec.re_explain = (function cljs$spec$re_explain(path,via,in$,re,input){
var p = re;
var G__17279 = input;
var vec__17280 = G__17279;
var seq__17281 = cljs.core.seq(vec__17280);
var first__17282 = cljs.core.first(seq__17281);
var seq__17281__$1 = cljs.core.next(seq__17281);
var x = first__17282;
var xs = seq__17281__$1;
var data = vec__17280;
var i = (0);
var p__$1 = p;
var G__17279__$1 = G__17279;
var i__$1 = i;
while(true){
var p__$2 = p__$1;
var vec__17283 = G__17279__$1;
var seq__17284 = cljs.core.seq(vec__17283);
var first__17285 = cljs.core.first(seq__17284);
var seq__17284__$1 = cljs.core.next(seq__17284);
var x__$1 = first__17285;
var xs__$1 = seq__17284__$1;
var data__$1 = vec__17283;
var i__$2 = i__$1;
if(cljs.core.empty_QMARK_(data__$1)){
if(cljs.core.truth_(cljs.spec.accept_nil_QMARK_(p__$2))){
return null;
} else {
return cljs.spec.op_explain(cljs.spec.op_describe(p__$2),p__$2,path,via,in$,null);
}
} else {
var temp__6751__auto__ = cljs.spec.deriv(p__$2,x__$1);
if(cljs.core.truth_(temp__6751__auto__)){
var dp = temp__6751__auto__;
var G__17308 = dp;
var G__17309 = xs__$1;
var G__17310 = (i__$2 + (1));
p__$1 = G__17308;
G__17279__$1 = G__17309;
i__$1 = G__17310;
continue;
} else {
if(cljs.core.truth_(cljs.spec.accept_QMARK_(p__$2))){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","op","cljs.spec/op",939378204).cljs$core$IFn$_invoke$arity$1(p__$2),new cljs.core.Keyword("cljs.spec","pcat","cljs.spec/pcat",-1959753649))){
return cljs.spec.op_explain(cljs.spec.op_describe(p__$2),p__$2,path,via,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(in$,i__$2),cljs.core.seq(data__$1));
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"reason","reason",-2070751759),"Extra input",new cljs.core.Keyword(null,"pred","pred",1927423397),cljs.spec.abbrev(cljs.spec.op_describe(re)),new cljs.core.Keyword(null,"val","val",128701612),data__$1,new cljs.core.Keyword(null,"via","via",-1904457336),via,new cljs.core.Keyword(null,"in","in",-1531184865),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(in$,i__$2)], null)], null);
}
} else {
var or__7523__auto__ = cljs.spec.op_explain(cljs.spec.op_describe(p__$2),p__$2,path,via,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(in$,i__$2),cljs.core.seq(data__$1));
if(cljs.core.truth_(or__7523__auto__)){
return or__7523__auto__;
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"reason","reason",-2070751759),"Extra input",new cljs.core.Keyword(null,"pred","pred",1927423397),cljs.spec.abbrev(cljs.spec.op_describe(p__$2)),new cljs.core.Keyword(null,"val","val",128701612),data__$1,new cljs.core.Keyword(null,"via","via",-1904457336),via,new cljs.core.Keyword(null,"in","in",-1531184865),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(in$,i__$2)], null)], null);
}
}
}
}
break;
}
});
/**
 * Do not call this directly, use 'spec' with a regex op argument
 */
cljs.spec.regex_spec_impl = (function cljs$spec$regex_spec_impl(re,gfn){
if(typeof cljs.spec.t_cljs$spec17324 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.spec.Spec}
 * @implements {cljs.core.IWithMeta}
*/
cljs.spec.t_cljs$spec17324 = (function (re,gfn,meta17325){
this.re = re;
this.gfn = gfn;
this.meta17325 = meta17325;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.spec.t_cljs$spec17324.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_17326,meta17325__$1){
var self__ = this;
var _17326__$1 = this;
return (new cljs.spec.t_cljs$spec17324(self__.re,self__.gfn,meta17325__$1));
});

cljs.spec.t_cljs$spec17324.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_17326){
var self__ = this;
var _17326__$1 = this;
return self__.meta17325;
});

cljs.spec.t_cljs$spec17324.prototype.cljs$spec$Spec$ = cljs.core.PROTOCOL_SENTINEL;

cljs.spec.t_cljs$spec17324.prototype.cljs$spec$Spec$conform_STAR_$arity$2 = (function (_,x){
var self__ = this;
var ___$1 = this;
if(((x == null)) || (cljs.core.coll_QMARK_(x))){
return cljs.spec.re_conform(self__.re,cljs.core.seq(x));
} else {
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
}
});

cljs.spec.t_cljs$spec17324.prototype.cljs$spec$Spec$unform_STAR_$arity$2 = (function (_,x){
var self__ = this;
var ___$1 = this;
return cljs.spec.op_unform(self__.re,x);
});

cljs.spec.t_cljs$spec17324.prototype.cljs$spec$Spec$explain_STAR_$arity$5 = (function (_,path,via,in$,x){
var self__ = this;
var ___$1 = this;
if(((x == null)) || (cljs.core.coll_QMARK_(x))){
return cljs.spec.re_explain(path,via,in$,self__.re,cljs.core.seq(x));
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"pred","pred",1927423397),cljs.spec.abbrev(cljs.spec.op_describe(self__.re)),new cljs.core.Keyword(null,"val","val",128701612),x,new cljs.core.Keyword(null,"via","via",-1904457336),via,new cljs.core.Keyword(null,"in","in",-1531184865),in$], null)], null);
}
});

cljs.spec.t_cljs$spec17324.prototype.cljs$spec$Spec$gen_STAR_$arity$4 = (function (_,overrides,path,rmap){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.gfn)){
return (self__.gfn.cljs$core$IFn$_invoke$arity$0 ? self__.gfn.cljs$core$IFn$_invoke$arity$0() : self__.gfn.call(null));
} else {
return cljs.spec.re_gen(self__.re,overrides,path,rmap,cljs.spec.op_describe(self__.re));
}
});

cljs.spec.t_cljs$spec17324.prototype.cljs$spec$Spec$with_gen_STAR_$arity$2 = (function (_,gfn__$1){
var self__ = this;
var ___$1 = this;
return (cljs.spec.regex_spec_impl.cljs$core$IFn$_invoke$arity$2 ? cljs.spec.regex_spec_impl.cljs$core$IFn$_invoke$arity$2(self__.re,gfn__$1) : cljs.spec.regex_spec_impl.call(null,self__.re,gfn__$1));
});

cljs.spec.t_cljs$spec17324.prototype.cljs$spec$Spec$describe_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.spec.op_describe(self__.re);
});

cljs.spec.t_cljs$spec17324.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"re","re",1869207729,null),new cljs.core.Symbol(null,"gfn","gfn",-1862918295,null),new cljs.core.Symbol(null,"meta17325","meta17325",-1801823428,null)], null);
});

cljs.spec.t_cljs$spec17324.cljs$lang$type = true;

cljs.spec.t_cljs$spec17324.cljs$lang$ctorStr = "cljs.spec/t_cljs$spec17324";

cljs.spec.t_cljs$spec17324.cljs$lang$ctorPrWriter = (function (this__8175__auto__,writer__8176__auto__,opt__8177__auto__){
return cljs.core._write(writer__8176__auto__,"cljs.spec/t_cljs$spec17324");
});

cljs.spec.__GT_t_cljs$spec17324 = (function cljs$spec$regex_spec_impl_$___GT_t_cljs$spec17324(re__$1,gfn__$1,meta17325){
return (new cljs.spec.t_cljs$spec17324(re__$1,gfn__$1,meta17325));
});

}

return (new cljs.spec.t_cljs$spec17324(re,gfn,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.spec.call_valid_QMARK_ = (function cljs$spec$call_valid_QMARK_(f,specs,args){
var cargs = cljs.spec.conform(new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(specs),args);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cargs,new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537))){
return null;
} else {
var ret = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,args);
var cret = cljs.spec.conform(new cljs.core.Keyword(null,"ret","ret",-468222814).cljs$core$IFn$_invoke$arity$1(specs),ret);
var and__7511__auto__ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cret,new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537));
if(and__7511__auto__){
if(cljs.core.truth_(new cljs.core.Keyword(null,"fn","fn",-1175266204).cljs$core$IFn$_invoke$arity$1(specs))){
return cljs.spec.valid_QMARK_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"fn","fn",-1175266204).cljs$core$IFn$_invoke$arity$1(specs),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"args","args",1315556576),cargs,new cljs.core.Keyword(null,"ret","ret",-468222814),cret], null));
} else {
return true;
}
} else {
return and__7511__auto__;
}
}
});
/**
 * returns f if valid, else smallest
 */
cljs.spec.validate_fn = (function cljs$spec$validate_fn(f,specs,iters){
var g = cljs.spec.gen.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(specs));
var prop = cljs.spec.impl.gen.for_all_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [g], null),((function (g){
return (function (p1__17361_SHARP_){
return cljs.spec.call_valid_QMARK_(f,specs,p1__17361_SHARP_);
});})(g))
], 0));
var ret = cljs.spec.impl.gen.quick_check.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([iters,prop], 0));
var temp__6751__auto__ = new cljs.core.Keyword(null,"smallest","smallest",-152623883).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"shrunk","shrunk",-2041664412).cljs$core$IFn$_invoke$arity$1(ret));
if(cljs.core.truth_(temp__6751__auto__)){
var vec__17365 = temp__6751__auto__;
var smallest = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17365,(0),null);
return smallest;
} else {
return f;
}
});
/**
 * Do not call this directly, use 'fspec'
 */
cljs.spec.fspec_impl = (function cljs$spec$fspec_impl(argspec,aform,retspec,rform,fnspec,fform,gfn){
var specs = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"args","args",1315556576),argspec,new cljs.core.Keyword(null,"ret","ret",-468222814),retspec,new cljs.core.Keyword(null,"fn","fn",-1175266204),fnspec], null);
if(typeof cljs.spec.t_cljs$spec17395 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.spec.Spec}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.ILookup}
*/
cljs.spec.t_cljs$spec17395 = (function (argspec,aform,retspec,rform,fnspec,fform,gfn,specs,meta17396){
this.argspec = argspec;
this.aform = aform;
this.retspec = retspec;
this.rform = rform;
this.fnspec = fnspec;
this.fform = fform;
this.gfn = gfn;
this.specs = specs;
this.meta17396 = meta17396;
this.cljs$lang$protocol_mask$partition0$ = 393472;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.spec.t_cljs$spec17395.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (specs){
return (function (_17397,meta17396__$1){
var self__ = this;
var _17397__$1 = this;
return (new cljs.spec.t_cljs$spec17395(self__.argspec,self__.aform,self__.retspec,self__.rform,self__.fnspec,self__.fform,self__.gfn,self__.specs,meta17396__$1));
});})(specs))
;

cljs.spec.t_cljs$spec17395.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (specs){
return (function (_17397){
var self__ = this;
var _17397__$1 = this;
return self__.meta17396;
});})(specs))
;

cljs.spec.t_cljs$spec17395.prototype.cljs$core$ILookup$_lookup$arity$2 = ((function (specs){
return (function (this$,k){
var self__ = this;
var this$__$1 = this;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.specs,k);
});})(specs))
;

cljs.spec.t_cljs$spec17395.prototype.cljs$core$ILookup$_lookup$arity$3 = ((function (specs){
return (function (_,k,not_found){
var self__ = this;
var ___$1 = this;
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.specs,k,not_found);
});})(specs))
;

cljs.spec.t_cljs$spec17395.prototype.cljs$spec$Spec$ = cljs.core.PROTOCOL_SENTINEL;

cljs.spec.t_cljs$spec17395.prototype.cljs$spec$Spec$conform_STAR_$arity$2 = ((function (specs){
return (function (_,f){
var self__ = this;
var ___$1 = this;
if(cljs.core.ifn_QMARK_(f)){
if((f === cljs.spec.validate_fn(f,self__.specs,cljs.spec._STAR_fspec_iterations_STAR_))){
return f;
} else {
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
}
} else {
return new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537);
}
});})(specs))
;

cljs.spec.t_cljs$spec17395.prototype.cljs$spec$Spec$unform_STAR_$arity$2 = ((function (specs){
return (function (_,f){
var self__ = this;
var ___$1 = this;
return f;
});})(specs))
;

cljs.spec.t_cljs$spec17395.prototype.cljs$spec$Spec$explain_STAR_$arity$5 = ((function (specs){
return (function (_,path,via,in$,f){
var self__ = this;
var ___$1 = this;
if(cljs.core.ifn_QMARK_(f)){
var args = cljs.spec.validate_fn(f,self__.specs,(100));
if((f === args)){
return null;
} else {
var ret = (function (){try{return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,args);
}catch (e17411){if((e17411 instanceof Error)){
var t = e17411;
return t;
} else {
throw e17411;

}
}})();
if((ret instanceof Error)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"pred","pred",1927423397),cljs.core.list(new cljs.core.Symbol(null,"apply","apply",-1334050276,null),new cljs.core.Symbol(null,"fn","fn",465265323,null)),new cljs.core.Keyword(null,"val","val",128701612),args,new cljs.core.Keyword(null,"reason","reason",-2070751759),ret.message,new cljs.core.Keyword(null,"via","via",-1904457336),via,new cljs.core.Keyword(null,"in","in",-1531184865),in$], null)], null);
} else {
var cret = cljs.spec.dt.cljs$core$IFn$_invoke$arity$3(self__.retspec,ret,self__.rform);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","invalid","cljs.spec/invalid",551677537),cret)){
return cljs.spec.explain_1(self__.rform,self__.retspec,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,new cljs.core.Keyword(null,"ret","ret",-468222814)),via,in$,ret);
} else {
if(cljs.core.truth_(self__.fnspec)){
var cargs = cljs.spec.conform(self__.argspec,args);
return cljs.spec.explain_1(self__.fform,self__.fnspec,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,new cljs.core.Keyword(null,"fn","fn",-1175266204)),via,in$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"args","args",1315556576),cargs,new cljs.core.Keyword(null,"ret","ret",-468222814),cret], null));
} else {
return null;
}
}
}
}
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"pred","pred",1927423397),new cljs.core.Symbol(null,"ifn?","ifn?",-2106461064,null),new cljs.core.Keyword(null,"val","val",128701612),f,new cljs.core.Keyword(null,"via","via",-1904457336),via,new cljs.core.Keyword(null,"in","in",-1531184865),in$], null)], null);
}
});})(specs))
;

cljs.spec.t_cljs$spec17395.prototype.cljs$spec$Spec$gen_STAR_$arity$4 = ((function (specs){
return (function (_,overrides,___$1,___$2){
var self__ = this;
var ___$3 = this;
if(cljs.core.truth_(self__.gfn)){
return (self__.gfn.cljs$core$IFn$_invoke$arity$0 ? self__.gfn.cljs$core$IFn$_invoke$arity$0() : self__.gfn.call(null));
} else {
return cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((function (___$3,specs){
return (function() { 
var G__17478__delegate = function (args){
if(cljs.core.truth_(cljs.spec.valid_QMARK_.cljs$core$IFn$_invoke$arity$2(self__.argspec,args))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str((function (){var sb__8610__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_17421_17482 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_17422_17483 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_17421_17482,_STAR_print_fn_STAR_17422_17483,sb__8610__auto__,___$3,specs){
return (function (x__8611__auto__){
return sb__8610__auto__.append(x__8611__auto__);
});})(_STAR_print_newline_STAR_17421_17482,_STAR_print_fn_STAR_17422_17483,sb__8610__auto__,___$3,specs))
;

try{cljs.spec.explain(self__.argspec,args);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_17422_17483;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_17421_17482;
}
return [cljs.core.str(sb__8610__auto__)].join('');
})()),cljs.core.str("\n"),cljs.core.str("(valid? argspec args)")].join('')));
}

return cljs.spec.impl.gen.generate(cljs.spec.gen.cljs$core$IFn$_invoke$arity$2(self__.retspec,overrides));
};
var G__17478 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__17493__i = 0, G__17493__a = new Array(arguments.length -  0);
while (G__17493__i < G__17493__a.length) {G__17493__a[G__17493__i] = arguments[G__17493__i + 0]; ++G__17493__i;}
  args = new cljs.core.IndexedSeq(G__17493__a,0);
} 
return G__17478__delegate.call(this,args);};
G__17478.cljs$lang$maxFixedArity = 0;
G__17478.cljs$lang$applyTo = (function (arglist__17494){
var args = cljs.core.seq(arglist__17494);
return G__17478__delegate(args);
});
G__17478.cljs$core$IFn$_invoke$arity$variadic = G__17478__delegate;
return G__17478;
})()
;})(___$3,specs))
], 0));
}
});})(specs))
;

cljs.spec.t_cljs$spec17395.prototype.cljs$spec$Spec$with_gen_STAR_$arity$2 = ((function (specs){
return (function (_,gfn__$1){
var self__ = this;
var ___$1 = this;
return (cljs.spec.fspec_impl.cljs$core$IFn$_invoke$arity$7 ? cljs.spec.fspec_impl.cljs$core$IFn$_invoke$arity$7(self__.argspec,self__.aform,self__.retspec,self__.rform,self__.fnspec,self__.fform,gfn__$1) : cljs.spec.fspec_impl.call(null,self__.argspec,self__.aform,self__.retspec,self__.rform,self__.fnspec,self__.fform,gfn__$1));
});})(specs))
;

cljs.spec.t_cljs$spec17395.prototype.cljs$spec$Spec$describe_STAR_$arity$1 = ((function (specs){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.spec","fspec","cljs.spec/fspec",982220571,null)),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Keyword(null,"args","args",1315556576)),cljs.core.array_seq([(function (){var x__8452__auto__ = self__.aform;
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Keyword(null,"ret","ret",-468222814)),(function (){var x__8452__auto__ = self__.rform;
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.Keyword(null,"fn","fn",-1175266204)),(function (){var x__8452__auto__ = self__.fform;
return cljs.core._conj(cljs.core.List.EMPTY,x__8452__auto__);
})()], 0))));
});})(specs))
;

cljs.spec.t_cljs$spec17395.getBasis = ((function (specs){
return (function (){
return new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"argspec","argspec",-1207762746,null),new cljs.core.Symbol(null,"aform","aform",531303525,null),new cljs.core.Symbol(null,"retspec","retspec",-920025354,null),new cljs.core.Symbol(null,"rform","rform",-1420499912,null),new cljs.core.Symbol(null,"fnspec","fnspec",-1865712406,null),new cljs.core.Symbol(null,"fform","fform",-176049972,null),new cljs.core.Symbol(null,"gfn","gfn",-1862918295,null),new cljs.core.Symbol(null,"specs","specs",-1227865028,null),new cljs.core.Symbol(null,"meta17396","meta17396",-144765119,null)], null);
});})(specs))
;

cljs.spec.t_cljs$spec17395.cljs$lang$type = true;

cljs.spec.t_cljs$spec17395.cljs$lang$ctorStr = "cljs.spec/t_cljs$spec17395";

cljs.spec.t_cljs$spec17395.cljs$lang$ctorPrWriter = ((function (specs){
return (function (this__8175__auto__,writer__8176__auto__,opt__8177__auto__){
return cljs.core._write(writer__8176__auto__,"cljs.spec/t_cljs$spec17395");
});})(specs))
;

cljs.spec.__GT_t_cljs$spec17395 = ((function (specs){
return (function cljs$spec$fspec_impl_$___GT_t_cljs$spec17395(argspec__$1,aform__$1,retspec__$1,rform__$1,fnspec__$1,fform__$1,gfn__$1,specs__$1,meta17396){
return (new cljs.spec.t_cljs$spec17395(argspec__$1,aform__$1,retspec__$1,rform__$1,fnspec__$1,fform__$1,gfn__$1,specs__$1,meta17396));
});})(specs))
;

}

return (new cljs.spec.t_cljs$spec17395(argspec,aform,retspec,rform,fnspec,fform,gfn,specs,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.spec.def_impl(new cljs.core.Keyword("cljs.spec","kvs->map","cljs.spec/kvs->map",-1189105441),cljs.core.list(new cljs.core.Symbol("cljs.spec","conformer","cljs.spec/conformer",-236330417,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__17505#","p1__17505#",-1675630964,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","zipmap","cljs.core/zipmap",-1902130674,null),cljs.core.list(new cljs.core.Symbol("cljs.core","map","cljs.core/map",-338988913,null),new cljs.core.Keyword("cljs.spec","k","cljs.spec/k",668466950),new cljs.core.Symbol(null,"p1__17505#","p1__17505#",-1675630964,null)),cljs.core.list(new cljs.core.Symbol("cljs.core","map","cljs.core/map",-338988913,null),new cljs.core.Keyword("cljs.spec","v","cljs.spec/v",-1491964132),new cljs.core.Symbol(null,"p1__17505#","p1__17505#",-1675630964,null)))),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__17506#","p1__17506#",-26766041,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map","cljs.core/map",-338988913,null),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"k","k",-505765866,null),new cljs.core.Symbol(null,"v","v",1661996586,null)], null)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("cljs.spec","k","cljs.spec/k",668466950),new cljs.core.Symbol(null,"k","k",-505765866,null),new cljs.core.Keyword("cljs.spec","v","cljs.spec/v",-1491964132),new cljs.core.Symbol(null,"v","v",1661996586,null)], null)),new cljs.core.Symbol(null,"p1__17506#","p1__17506#",-26766041,null)))),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$5(cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__17505#","p1__17505#",-1675630964,null)], null),cljs.core.list(new cljs.core.Symbol(null,"zipmap","zipmap",-690049687,null),cljs.core.list(new cljs.core.Symbol(null,"map","map",-1282745308,null),new cljs.core.Keyword("cljs.spec","k","cljs.spec/k",668466950),new cljs.core.Symbol(null,"p1__17505#","p1__17505#",-1675630964,null)),cljs.core.list(new cljs.core.Symbol(null,"map","map",-1282745308,null),new cljs.core.Keyword("cljs.spec","v","cljs.spec/v",-1491964132),new cljs.core.Symbol(null,"p1__17505#","p1__17505#",-1675630964,null)))),(function (p1__17505_SHARP_){
return cljs.core.zipmap(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","k","cljs.spec/k",668466950),p1__17505_SHARP_),cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("cljs.spec","v","cljs.spec/v",-1491964132),p1__17505_SHARP_));
}),null,true,(function (p1__17506_SHARP_){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__17520){
var vec__17521 = p__17520;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17521,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17521,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("cljs.spec","k","cljs.spec/k",668466950),k,new cljs.core.Keyword("cljs.spec","v","cljs.spec/v",-1491964132),v], null);
}),p1__17506_SHARP_);
})));
/**
 * generates a number (default 10) of values compatible with spec and maps conform over them,
 *   returning a sequence of [val conformed-val] tuples. Optionally takes
 *   a generator overrides map as per gen
 */
cljs.spec.exercise = (function cljs$spec$exercise(var_args){
var args17551 = [];
var len__8739__auto___17557 = arguments.length;
var i__8740__auto___17558 = (0);
while(true){
if((i__8740__auto___17558 < len__8739__auto___17557)){
args17551.push((arguments[i__8740__auto___17558]));

var G__17559 = (i__8740__auto___17558 + (1));
i__8740__auto___17558 = G__17559;
continue;
} else {
}
break;
}

var G__17556 = args17551.length;
switch (G__17556) {
case 1:
return cljs.spec.exercise.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.spec.exercise.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.spec.exercise.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args17551.length)].join('')));

}
});

cljs.spec.exercise.cljs$core$IFn$_invoke$arity$1 = (function (spec){
return cljs.spec.exercise.cljs$core$IFn$_invoke$arity$2(spec,(10));
});

cljs.spec.exercise.cljs$core$IFn$_invoke$arity$2 = (function (spec,n){
return cljs.spec.exercise.cljs$core$IFn$_invoke$arity$3(spec,n,null);
});

cljs.spec.exercise.cljs$core$IFn$_invoke$arity$3 = (function (spec,n,overrides){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__17550_SHARP_){
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[p1__17550_SHARP_,cljs.spec.conform(spec,p1__17550_SHARP_)],null));
}),cljs.spec.impl.gen.sample.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.spec.gen.cljs$core$IFn$_invoke$arity$2(spec,overrides),n], 0)));
});

cljs.spec.exercise.cljs$lang$maxFixedArity = 3;

/**
 * Return true if inst at or after start and before end
 */
cljs.spec.inst_in_range_QMARK_ = (function cljs$spec$inst_in_range_QMARK_(start,end,inst){
var and__7511__auto__ = cljs.core.inst_QMARK_(inst);
if(and__7511__auto__){
var t = cljs.core.inst_ms(inst);
return ((cljs.core.inst_ms(start) <= t)) && ((t < cljs.core.inst_ms(end)));
} else {
return and__7511__auto__;
}
});
/**
 * Return true if start <= val and val < end
 */
cljs.spec.int_in_range_QMARK_ = (function cljs$spec$int_in_range_QMARK_(start,end,val){
if(cljs.core.integer_QMARK_(val)){
return ((start <= val)) && ((val < end));
} else {
if((val instanceof goog.math.Long)){
var and__7511__auto__ = start.lessThanOrEqual(val);
if(cljs.core.truth_(and__7511__auto__)){
return val.lessThan(end);
} else {
return and__7511__auto__;
}
} else {
if((val instanceof goog.math.Integer)){
var and__7511__auto__ = start.lessThanOrEqual(val);
if(cljs.core.truth_(and__7511__auto__)){
return val.lessThan(end);
} else {
return and__7511__auto__;
}
} else {
return false;

}
}
}
});
if(typeof cljs.spec._STAR_compile_asserts_STAR_ !== 'undefined'){
} else {
/**
 * If true, compiler will enable spec asserts, which are then
 * subject to runtime control via check-asserts? If false, compiler
 * will eliminate all spec assert overhead. See 'assert'.
 * Initially set to the negation of the ':elide-asserts' compiler option.
 * Defaults to true.
 */
cljs.spec._STAR_compile_asserts_STAR_ = true;
}
if(typeof cljs.spec._STAR_runtime_asserts_STAR_ !== 'undefined'){
} else {
cljs.spec._STAR_runtime_asserts_STAR_ = false;
}
/**
 * Returns the value set by check-asserts.
 */
cljs.spec.check_asserts_QMARK_ = (function cljs$spec$check_asserts_QMARK_(){
return cljs.spec._STAR_runtime_asserts_STAR_;
});
/**
 * Enable or disable spec asserts that have been compiled
 * with '*compile-asserts*' true.  See 'assert'.
 * Initially set to boolean value of cljs.spec/*runtime-asserts*.
 * Defaults to false.
 */
cljs.spec.check_asserts = (function cljs$spec$check_asserts(flag){
return cljs.spec._STAR_runtime_asserts_STAR_ = flag;
});
/**
 * Do not call this directly, use 'assert'.
 */
cljs.spec.assert_STAR_ = (function cljs$spec$assert_STAR_(spec,x){
if(cljs.core.truth_(cljs.spec.valid_QMARK_.cljs$core$IFn$_invoke$arity$2(spec,x))){
return x;
} else {
var ed = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.spec.explain_data_STAR_(spec,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentVector.EMPTY,x),new cljs.core.Keyword("cljs.spec","failure","cljs.spec/failure",1931120592),new cljs.core.Keyword(null,"assertion-failed","assertion-failed",-970534477))], 0));
throw (new Error([cljs.core.str("Spec assertion failed\n"),cljs.core.str((function (){var sb__8610__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_17619_17621 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_17620_17622 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_17619_17621,_STAR_print_fn_STAR_17620_17622,sb__8610__auto__,ed){
return (function (x__8611__auto__){
return sb__8610__auto__.append(x__8611__auto__);
});})(_STAR_print_newline_STAR_17619_17621,_STAR_print_fn_STAR_17620_17622,sb__8610__auto__,ed))
;

try{cljs.spec.explain_out(ed);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_17620_17622;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_17619_17621;
}
return [cljs.core.str(sb__8610__auto__)].join('');
})())].join('')));
}
});
