// SIGNET_MANAGED_PI_EXTENSION
// Managed by Signet (@signet/pi-extension)
// Source: dist/signet-pi.mjs
// DO NOT EDIT - this file is overwritten by Signet setup/sync.

const __signetRuntimeProcess = Reflect.get(globalThis, "process");
if (__signetRuntimeProcess && typeof __signetRuntimeProcess === "object") {
	const __signetRuntimeEnv = Reflect.get(__signetRuntimeProcess, "env");
	const __signetReadEnv = (key) => {
		if (!__signetRuntimeEnv || typeof __signetRuntimeEnv !== "object") return undefined;
		const value = Reflect.get(__signetRuntimeEnv, key);
		return typeof value === "string" && value.trim().length > 0 ? value : undefined;
	};
	if (__signetRuntimeEnv && typeof __signetRuntimeEnv === "object") {
		if (!__signetReadEnv("SIGNET_PATH")) {
			Reflect.set(__signetRuntimeEnv, "SIGNET_PATH", "/home/nicholai/.agents");
		}
		if (!__signetReadEnv("SIGNET_DAEMON_URL")) {
			Reflect.set(__signetRuntimeEnv, "SIGNET_DAEMON_URL", "http://127.0.0.1:3850");
		}
		if (!__signetReadEnv("SIGNET_AGENT_ID")) {
			Reflect.set(__signetRuntimeEnv, "SIGNET_AGENT_ID", "default");
		}
	}
}

var _4=Object.defineProperty;var B4=(Z)=>Z;function U4(Z,X){this[Z]=B4.bind(null,X)}var k6=(Z,X)=>{for(var z in X)_4(Z,z,{get:X[z],enumerable:!0,configurable:!0,set:U4.bind(X,z)})};import{existsSync as $J,readFileSync as QJ}from"node:fs";import{join as WJ}from"node:path";import{createRequire as G4}from"node:module";import{dirname as p4,join as KJ}from"node:path";import{fileURLToPath as l4}from"node:url";import{createRequire as gz}from"node:module";import{homedir as g6,platform as iz}from"node:os";import{basename as wJ,dirname as kJ,resolve as qZ}from"node:path";import{existsSync as v6,readFileSync as M7,readdirSync as gJ,realpathSync as hJ,statSync as vJ}from"node:fs";import{dirname as mJ,join as D7}from"node:path";import{existsSync as az,mkdirSync as dJ,readFileSync as rz,rmSync as cJ,writeFileSync as pJ}from"node:fs";import{homedir as AZ}from"node:os";import{dirname as iJ,join as MZ,resolve as tz}from"node:path";import{homedir as _$}from"node:os";var{create:q4,getPrototypeOf:A4,defineProperty:w5,getOwnPropertyNames:M4}=Object,D4=Object.prototype.hasOwnProperty;function L4(Z){return this[Z]}var O4,F4,d5=(Z,X,z)=>{var W=Z!=null&&typeof Z==="object";if(W){var _=X?O4??=new WeakMap:F4??=new WeakMap,q=_.get(Z);if(q)return q}z=Z!=null?q4(A4(Z)):{};let B=X||!Z||!Z.__esModule?w5(z,"default",{value:Z,enumerable:!0}):z;for(let U of M4(Z))if(!D4.call(B,U))w5(B,U,{get:L4.bind(Z,U),enumerable:!0});if(W)_.set(Z,B);return B},w=(Z,X)=>()=>(X||Z((X={exports:{}}).exports,X),X.exports),cZ=G4(import.meta.url),m=w((Z)=>{var X=Symbol.for("yaml.alias"),z=Symbol.for("yaml.document"),W=Symbol.for("yaml.map"),_=Symbol.for("yaml.pair"),q=Symbol.for("yaml.scalar"),B=Symbol.for("yaml.seq"),U=Symbol.for("yaml.node.type"),G=(D)=>!!D&&typeof D==="object"&&D[U]===X,H=(D)=>!!D&&typeof D==="object"&&D[U]===z,V=(D)=>!!D&&typeof D==="object"&&D[U]===W,$=(D)=>!!D&&typeof D==="object"&&D[U]===_,Q=(D)=>!!D&&typeof D==="object"&&D[U]===q,J=(D)=>!!D&&typeof D==="object"&&D[U]===B;function Y(D){if(D&&typeof D==="object")switch(D[U]){case W:case B:return!0}return!1}function A(D){if(D&&typeof D==="object")switch(D[U]){case X:case W:case q:case B:return!0}return!1}var M=(D)=>(Q(D)||Y(D))&&!!D.anchor;Z.ALIAS=X,Z.DOC=z,Z.MAP=W,Z.NODE_TYPE=U,Z.PAIR=_,Z.SCALAR=q,Z.SEQ=B,Z.hasAnchor=M,Z.isAlias=G,Z.isCollection=Y,Z.isDocument=H,Z.isMap=V,Z.isNode=A,Z.isPair=$,Z.isScalar=Q,Z.isSeq=J}),pZ=w((Z)=>{var X=m(),z=Symbol("break visit"),W=Symbol("skip children"),_=Symbol("remove node");function q(Q,J){let Y=H(J);if(X.isDocument(Q)){if(B(null,Q.contents,Y,Object.freeze([Q]))===_)Q.contents=null}else B(null,Q,Y,Object.freeze([]))}q.BREAK=z,q.SKIP=W,q.REMOVE=_;function B(Q,J,Y,A){let M=V(Q,J,Y,A);if(X.isNode(M)||X.isPair(M))return $(Q,A,M),B(Q,M,Y,A);if(typeof M!=="symbol"){if(X.isCollection(J)){A=Object.freeze(A.concat(J));for(let D=0;D<J.items.length;++D){let L=B(D,J.items[D],Y,A);if(typeof L==="number")D=L-1;else if(L===z)return z;else if(L===_)J.items.splice(D,1),D-=1}}else if(X.isPair(J)){A=Object.freeze(A.concat(J));let D=B("key",J.key,Y,A);if(D===z)return z;else if(D===_)J.key=null;let L=B("value",J.value,Y,A);if(L===z)return z;else if(L===_)J.value=null}}return M}async function U(Q,J){let Y=H(J);if(X.isDocument(Q)){if(await G(null,Q.contents,Y,Object.freeze([Q]))===_)Q.contents=null}else await G(null,Q,Y,Object.freeze([]))}U.BREAK=z,U.SKIP=W,U.REMOVE=_;async function G(Q,J,Y,A){let M=await V(Q,J,Y,A);if(X.isNode(M)||X.isPair(M))return $(Q,A,M),G(Q,M,Y,A);if(typeof M!=="symbol"){if(X.isCollection(J)){A=Object.freeze(A.concat(J));for(let D=0;D<J.items.length;++D){let L=await G(D,J.items[D],Y,A);if(typeof L==="number")D=L-1;else if(L===z)return z;else if(L===_)J.items.splice(D,1),D-=1}}else if(X.isPair(J)){A=Object.freeze(A.concat(J));let D=await G("key",J.key,Y,A);if(D===z)return z;else if(D===_)J.key=null;let L=await G("value",J.value,Y,A);if(L===z)return z;else if(L===_)J.value=null}}return M}function H(Q){if(typeof Q==="object"&&(Q.Collection||Q.Node||Q.Value))return Object.assign({Alias:Q.Node,Map:Q.Node,Scalar:Q.Node,Seq:Q.Node},Q.Value&&{Map:Q.Value,Scalar:Q.Value,Seq:Q.Value},Q.Collection&&{Map:Q.Collection,Seq:Q.Collection},Q);return Q}function V(Q,J,Y,A){if(typeof Y==="function")return Y(Q,J,A);if(X.isMap(J))return Y.Map?.(Q,J,A);if(X.isSeq(J))return Y.Seq?.(Q,J,A);if(X.isPair(J))return Y.Pair?.(Q,J,A);if(X.isScalar(J))return Y.Scalar?.(Q,J,A);if(X.isAlias(J))return Y.Alias?.(Q,J,A);return}function $(Q,J,Y){let A=J[J.length-1];if(X.isCollection(A))A.items[Q]=Y;else if(X.isPair(A))if(Q==="key")A.key=Y;else A.value=Y;else if(X.isDocument(A))A.contents=Y;else{let M=X.isAlias(A)?"alias":"scalar";throw Error(`Cannot replace node with ${M} parent`)}}Z.visit=q,Z.visitAsync=U}),c5=w((Z)=>{var X=m(),z=pZ(),W={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},_=(B)=>B.replace(/[!,[\]{}]/g,(U)=>W[U]);class q{constructor(B,U){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},q.defaultYaml,B),this.tags=Object.assign({},q.defaultTags,U)}clone(){let B=new q(this.yaml,this.tags);return B.docStart=this.docStart,B}atDocument(){let B=new q(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:q.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},q.defaultTags);break}return B}add(B,U){if(this.atNextDocument)this.yaml={explicit:q.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},q.defaultTags),this.atNextDocument=!1;let G=B.trim().split(/[ \t]+/),H=G.shift();switch(H){case"%TAG":{if(G.length!==2){if(U(0,"%TAG directive should contain exactly two parts"),G.length<2)return!1}let[V,$]=G;return this.tags[V]=$,!0}case"%YAML":{if(this.yaml.explicit=!0,G.length!==1)return U(0,"%YAML directive should contain exactly one part"),!1;let[V]=G;if(V==="1.1"||V==="1.2")return this.yaml.version=V,!0;else{let $=/^\d+\.\d+$/.test(V);return U(6,`Unsupported YAML version ${V}`,$),!1}}default:return U(0,`Unknown directive ${H}`,!0),!1}}tagName(B,U){if(B==="!")return"!";if(B[0]!=="!")return U(`Not a valid tag: ${B}`),null;if(B[1]==="<"){let $=B.slice(2,-1);if($==="!"||$==="!!")return U(`Verbatim tags aren't resolved, so ${B} is invalid.`),null;if(B[B.length-1]!==">")U("Verbatim tags must end with a >");return $}let[,G,H]=B.match(/^(.*!)([^!]*)$/s);if(!H)U(`The ${B} tag has no suffix`);let V=this.tags[G];if(V)try{return V+decodeURIComponent(H)}catch($){return U(String($)),null}if(G==="!")return B;return U(`Could not resolve tag: ${B}`),null}tagString(B){for(let[U,G]of Object.entries(this.tags))if(B.startsWith(G))return U+_(B.substring(G.length));return B[0]==="!"?B:`!<${B}>`}toString(B){let U=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],G=Object.entries(this.tags),H;if(B&&G.length>0&&X.isNode(B.contents)){let V={};z.visit(B.contents,($,Q)=>{if(X.isNode(Q)&&Q.tag)V[Q.tag]=!0}),H=Object.keys(V)}else H=[];for(let[V,$]of G){if(V==="!!"&&$==="tag:yaml.org,2002:")continue;if(!B||H.some((Q)=>Q.startsWith($)))U.push(`%TAG ${V} ${$}`)}return U.join(`
`)}}q.defaultYaml={explicit:!1,version:"1.2"},q.defaultTags={"!!":"tag:yaml.org,2002:"},Z.Directives=q}),u6=w((Z)=>{var X=m(),z=pZ();function W(U){if(/[\x00-\x19\s,[\]{}]/.test(U)){let H=`Anchor must not contain whitespace or control characters: ${JSON.stringify(U)}`;throw Error(H)}return!0}function _(U){let G=new Set;return z.visit(U,{Value(H,V){if(V.anchor)G.add(V.anchor)}}),G}function q(U,G){for(let H=1;;++H){let V=`${U}${H}`;if(!G.has(V))return V}}function B(U,G){let H=[],V=new Map,$=null;return{onAnchor:(Q)=>{H.push(Q),$??($=_(U));let J=q(G,$);return $.add(J),J},setAnchors:()=>{for(let Q of H){let J=V.get(Q);if(typeof J==="object"&&J.anchor&&(X.isScalar(J.node)||X.isCollection(J.node)))J.node.anchor=J.anchor;else{let Y=Error("Failed to resolve repeated object (this should not happen)");throw Y.source=Q,Y}}},sourceObjects:V}}Z.anchorIsValid=W,Z.anchorNames=_,Z.createNodeAnchors=B,Z.findNewAnchor=q}),p5=w((Z)=>{function X(z,W,_,q){if(q&&typeof q==="object")if(Array.isArray(q))for(let B=0,U=q.length;B<U;++B){let G=q[B],H=X(z,q,String(B),G);if(H===void 0)delete q[B];else if(H!==G)q[B]=H}else if(q instanceof Map)for(let B of Array.from(q.keys())){let U=q.get(B),G=X(z,q,B,U);if(G===void 0)q.delete(B);else if(G!==U)q.set(B,G)}else if(q instanceof Set)for(let B of Array.from(q)){let U=X(z,q,B,B);if(U===void 0)q.delete(B);else if(U!==B)q.delete(B),q.add(U)}else for(let[B,U]of Object.entries(q)){let G=X(z,q,B,U);if(G===void 0)delete q[B];else if(G!==U)q[B]=G}return z.call(W,_,q)}Z.applyReviver=X}),I8=w((Z)=>{var X=m();function z(W,_,q){if(Array.isArray(W))return W.map((B,U)=>z(B,String(U),q));if(W&&typeof W.toJSON==="function"){if(!q||!X.hasAnchor(W))return W.toJSON(_,q);let B={aliasCount:0,count:1,res:void 0};q.anchors.set(W,B),q.onCreate=(G)=>{B.res=G,delete q.onCreate};let U=W.toJSON(_,q);if(q.onCreate)q.onCreate(U);return U}if(typeof W==="bigint"&&!q?.keep)return Number(W);return W}Z.toJS=z}),d6=w((Z)=>{var X=p5(),z=m(),W=I8();class _{constructor(q){Object.defineProperty(this,z.NODE_TYPE,{value:q})}clone(){let q=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));if(this.range)q.range=this.range.slice();return q}toJS(q,{mapAsMap:B,maxAliasCount:U,onAnchor:G,reviver:H}={}){if(!z.isDocument(q))throw TypeError("A document argument is required");let V={anchors:new Map,doc:q,keep:!0,mapAsMap:B===!0,mapKeyWarned:!1,maxAliasCount:typeof U==="number"?U:100},$=W.toJS(this,"",V);if(typeof G==="function")for(let{count:Q,res:J}of V.anchors.values())G(J,Q);return typeof H==="function"?X.applyReviver(H,{"":$},"",$):$}}Z.NodeBase=_}),lZ=w((Z)=>{var X=u6(),z=pZ(),W=m(),_=d6(),q=I8();class B extends _.NodeBase{constructor(G){super(W.ALIAS);this.source=G,Object.defineProperty(this,"tag",{set(){throw Error("Alias nodes cannot have tags")}})}resolve(G,H){let V;if(H?.aliasResolveCache)V=H.aliasResolveCache;else if(V=[],z.visit(G,{Node:(Q,J)=>{if(W.isAlias(J)||W.hasAnchor(J))V.push(J)}}),H)H.aliasResolveCache=V;let $=void 0;for(let Q of V){if(Q===this)break;if(Q.anchor===this.source)$=Q}return $}toJSON(G,H){if(!H)return{source:this.source};let{anchors:V,doc:$,maxAliasCount:Q}=H,J=this.resolve($,H);if(!J){let A=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw ReferenceError(A)}let Y=V.get(J);if(!Y)q.toJS(J,null,H),Y=V.get(J);if(Y?.res===void 0)throw ReferenceError("This should not happen: Alias anchor was not resolved?");if(Q>=0){if(Y.count+=1,Y.aliasCount===0)Y.aliasCount=U($,J,V);if(Y.count*Y.aliasCount>Q)throw ReferenceError("Excessive alias count indicates a resource exhaustion attack")}return Y.res}toString(G,H,V){let $=`*${this.source}`;if(G){if(X.anchorIsValid(this.source),G.options.verifyAliasOrder&&!G.anchors.has(this.source)){let Q=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw Error(Q)}if(G.implicitKey)return`${$} `}return $}}function U(G,H,V){if(W.isAlias(H)){let $=H.resolve(G),Q=V&&$&&V.get($);return Q?Q.count*Q.aliasCount:0}else if(W.isCollection(H)){let $=0;for(let Q of H.items){let J=U(G,Q,V);if(J>$)$=J}return $}else if(W.isPair(H)){let $=U(G,H.key,V),Q=U(G,H.value,V);return Math.max($,Q)}return 1}Z.Alias=B}),G0=w((Z)=>{var X=m(),z=d6(),W=I8(),_=(B)=>!B||typeof B!=="function"&&typeof B!=="object";class q extends z.NodeBase{constructor(B){super(X.SCALAR);this.value=B}toJSON(B,U){return U?.keep?this.value:W.toJS(this.value,B,U)}toString(){return String(this.value)}}q.BLOCK_FOLDED="BLOCK_FOLDED",q.BLOCK_LITERAL="BLOCK_LITERAL",q.PLAIN="PLAIN",q.QUOTE_DOUBLE="QUOTE_DOUBLE",q.QUOTE_SINGLE="QUOTE_SINGLE",Z.Scalar=q,Z.isScalarValue=_}),nZ=w((Z)=>{var X=lZ(),z=m(),W=G0(),_="tag:yaml.org,2002:";function q(U,G,H){if(G){let V=H.filter((Q)=>Q.tag===G),$=V.find((Q)=>!Q.format)??V[0];if(!$)throw Error(`Tag ${G} not found`);return $}return H.find((V)=>V.identify?.(U)&&!V.format)}function B(U,G,H){if(z.isDocument(U))U=U.contents;if(z.isNode(U))return U;if(z.isPair(U)){let L=H.schema[z.MAP].createNode?.(H.schema,null,H);return L.items.push(U),L}if(U instanceof String||U instanceof Number||U instanceof Boolean||typeof BigInt<"u"&&U instanceof BigInt)U=U.valueOf();let{aliasDuplicateObjects:V,onAnchor:$,onTagObj:Q,schema:J,sourceObjects:Y}=H,A=void 0;if(V&&U&&typeof U==="object")if(A=Y.get(U),A)return A.anchor??(A.anchor=$(U)),new X.Alias(A.anchor);else A={anchor:null,node:null},Y.set(U,A);if(G?.startsWith("!!"))G=_+G.slice(2);let M=q(U,G,J.tags);if(!M){if(U&&typeof U.toJSON==="function")U=U.toJSON();if(!U||typeof U!=="object"){let L=new W.Scalar(U);if(A)A.node=L;return L}M=U instanceof Map?J[z.MAP]:(Symbol.iterator in Object(U))?J[z.SEQ]:J[z.MAP]}if(Q)Q(M),delete H.onTagObj;let D=M?.createNode?M.createNode(H.schema,U,H):typeof M?.nodeClass?.from==="function"?M.nodeClass.from(H.schema,U,H):new W.Scalar(U);if(G)D.tag=G;else if(!M.default)D.tag=M.tag;if(A)A.node=D;return D}Z.createNode=B}),c6=w((Z)=>{var X=nZ(),z=m(),W=d6();function _(U,G,H){let V=H;for(let $=G.length-1;$>=0;--$){let Q=G[$];if(typeof Q==="number"&&Number.isInteger(Q)&&Q>=0){let J=[];J[Q]=V,V=J}else V=new Map([[Q,V]])}return X.createNode(V,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw Error("This should not happen, please report a bug.")},schema:U,sourceObjects:new Map})}var q=(U)=>U==null||typeof U==="object"&&!!U[Symbol.iterator]().next().done;class B extends W.NodeBase{constructor(U,G){super(U);Object.defineProperty(this,"schema",{value:G,configurable:!0,enumerable:!1,writable:!0})}clone(U){let G=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));if(U)G.schema=U;if(G.items=G.items.map((H)=>z.isNode(H)||z.isPair(H)?H.clone(U):H),this.range)G.range=this.range.slice();return G}addIn(U,G){if(q(U))this.add(G);else{let[H,...V]=U,$=this.get(H,!0);if(z.isCollection($))$.addIn(V,G);else if($===void 0&&this.schema)this.set(H,_(this.schema,V,G));else throw Error(`Expected YAML collection at ${H}. Remaining path: ${V}`)}}deleteIn(U){let[G,...H]=U;if(H.length===0)return this.delete(G);let V=this.get(G,!0);if(z.isCollection(V))return V.deleteIn(H);else throw Error(`Expected YAML collection at ${G}. Remaining path: ${H}`)}getIn(U,G){let[H,...V]=U,$=this.get(H,!0);if(V.length===0)return!G&&z.isScalar($)?$.value:$;else return z.isCollection($)?$.getIn(V,G):void 0}hasAllNullValues(U){return this.items.every((G)=>{if(!z.isPair(G))return!1;let H=G.value;return H==null||U&&z.isScalar(H)&&H.value==null&&!H.commentBefore&&!H.comment&&!H.tag})}hasIn(U){let[G,...H]=U;if(H.length===0)return this.has(G);let V=this.get(G,!0);return z.isCollection(V)?V.hasIn(H):!1}setIn(U,G){let[H,...V]=U;if(V.length===0)this.set(H,G);else{let $=this.get(H,!0);if(z.isCollection($))$.setIn(V,G);else if($===void 0&&this.schema)this.set(H,_(this.schema,V,G));else throw Error(`Expected YAML collection at ${H}. Remaining path: ${V}`)}}}Z.Collection=B,Z.collectionFromPath=_,Z.isEmptyPath=q}),iZ=w((Z)=>{var X=(_)=>_.replace(/^(?!$)(?: $)?/gm,"#");function z(_,q){if(/^\n+$/.test(_))return _.substring(1);return q?_.replace(/^(?! *$)/gm,q):_}var W=(_,q,B)=>_.endsWith(`
`)?z(B,q):B.includes(`
`)?`
`+z(B,q):(_.endsWith(" ")?"":" ")+B;Z.indentComment=z,Z.lineComment=W,Z.stringifyComment=X}),N4=w((Z)=>{var X="flow",z="block",W="quoted";function _(B,U,G="flow",{indentAtStart:H,lineWidth:V=80,minContentWidth:$=20,onFold:Q,onOverflow:J}={}){if(!V||V<0)return B;if(V<$)$=0;let Y=Math.max(1+$,1+V-U.length);if(B.length<=Y)return B;let A=[],M={},D=V-U.length;if(typeof H==="number")if(H>V-Math.max(2,$))A.push(0);else D=V-H;let L=void 0,F=void 0,R=!1,N=-1,K=-1,E=-1;if(G===z){if(N=q(B,N,U.length),N!==-1)D=N+Y}for(let P;P=B[N+=1];){if(G===W&&P==="\\"){switch(K=N,B[N+1]){case"x":N+=3;break;case"u":N+=5;break;case"U":N+=9;break;default:N+=1}E=N}if(P===`
`){if(G===z)N=q(B,N,U.length);D=N+U.length+Y,L=void 0}else{if(P===" "&&F&&F!==" "&&F!==`
`&&F!=="\t"){let C=B[N+1];if(C&&C!==" "&&C!==`
`&&C!=="\t")L=N}if(N>=D)if(L)A.push(L),D=L+Y,L=void 0;else if(G===W){while(F===" "||F==="\t")F=P,P=B[N+=1],R=!0;let C=N>E+1?N-2:K-1;if(M[C])return B;A.push(C),M[C]=!0,D=C+Y,L=void 0}else R=!0}F=P}if(R&&J)J();if(A.length===0)return B;if(Q)Q();let T=B.slice(0,A[0]);for(let P=0;P<A.length;++P){let C=A[P],k=A[P+1]||B.length;if(C===0)T=`
${U}${B.slice(0,k)}`;else{if(G===W&&M[C])T+=`${B[C]}\\`;T+=`
${U}${B.slice(C+1,k)}`}}return T}function q(B,U,G){let H=U,V=U+1,$=B[V];while($===" "||$==="\t")if(U<V+G)$=B[++U];else{do $=B[++U];while($&&$!==`
`);H=U,V=U+1,$=B[V]}return H}Z.FOLD_BLOCK=z,Z.FOLD_FLOW=X,Z.FOLD_QUOTED=W,Z.foldFlowLines=_}),oZ=w((Z)=>{var X=G0(),z=N4(),W=(J,Y)=>({indentAtStart:Y?J.indent.length:J.indentAtStart,lineWidth:J.options.lineWidth,minContentWidth:J.options.minContentWidth}),_=(J)=>/^(%|---|\.\.\.)/m.test(J);function q(J,Y,A){if(!Y||Y<0)return!1;let M=Y-A,D=J.length;if(D<=M)return!1;for(let L=0,F=0;L<D;++L)if(J[L]===`
`){if(L-F>M)return!0;if(F=L+1,D-F<=M)return!1}return!0}function B(J,Y){let A=JSON.stringify(J);if(Y.options.doubleQuotedAsJSON)return A;let{implicitKey:M}=Y,D=Y.options.doubleQuotedMinMultiLineLength,L=Y.indent||(_(J)?"  ":""),F="",R=0;for(let N=0,K=A[N];K;K=A[++N]){if(K===" "&&A[N+1]==="\\"&&A[N+2]==="n")F+=A.slice(R,N)+"\\ ",N+=1,R=N,K="\\";if(K==="\\")switch(A[N+1]){case"u":{F+=A.slice(R,N);let E=A.substr(N+2,4);switch(E){case"0000":F+="\\0";break;case"0007":F+="\\a";break;case"000b":F+="\\v";break;case"001b":F+="\\e";break;case"0085":F+="\\N";break;case"00a0":F+="\\_";break;case"2028":F+="\\L";break;case"2029":F+="\\P";break;default:if(E.substr(0,2)==="00")F+="\\x"+E.substr(2);else F+=A.substr(N,6)}N+=5,R=N+1}break;case"n":if(M||A[N+2]==='"'||A.length<D)N+=1;else{F+=A.slice(R,N)+`

`;while(A[N+2]==="\\"&&A[N+3]==="n"&&A[N+4]!=='"')F+=`
`,N+=2;if(F+=L,A[N+2]===" ")F+="\\";N+=1,R=N+1}break;default:N+=1}}return F=R?F+A.slice(R):A,M?F:z.foldFlowLines(F,L,z.FOLD_QUOTED,W(Y,!1))}function U(J,Y){if(Y.options.singleQuote===!1||Y.implicitKey&&J.includes(`
`)||/[ \t]\n|\n[ \t]/.test(J))return B(J,Y);let A=Y.indent||(_(J)?"  ":""),M="'"+J.replace(/'/g,"''").replace(/\n+/g,`$&
${A}`)+"'";return Y.implicitKey?M:z.foldFlowLines(M,A,z.FOLD_FLOW,W(Y,!1))}function G(J,Y){let{singleQuote:A}=Y.options,M;if(A===!1)M=B;else{let D=J.includes('"'),L=J.includes("'");if(D&&!L)M=U;else if(L&&!D)M=B;else M=A?U:B}return M(J,Y)}var H;try{H=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{H=/\n+(?!\n|$)/g}function V({comment:J,type:Y,value:A},M,D,L){let{blockQuote:F,commentString:R,lineWidth:N}=M.options;if(!F||/\n[\t ]+$/.test(A))return G(A,M);let K=M.indent||(M.forceBlockIndent||_(A)?"  ":""),E=F==="literal"?!0:F==="folded"||Y===X.Scalar.BLOCK_FOLDED?!1:Y===X.Scalar.BLOCK_LITERAL?!0:!q(A,N,K.length);if(!A)return E?`|
`:`>
`;let T,P;for(P=A.length;P>0;--P){let f=A[P-1];if(f!==`
`&&f!=="\t"&&f!==" ")break}let C=A.substring(P),k=C.indexOf(`
`);if(k===-1)T="-";else if(A===C||k!==C.length-1){if(T="+",L)L()}else T="";if(C){if(A=A.slice(0,-C.length),C[C.length-1]===`
`)C=C.slice(0,-1);C=C.replace(H,`$&${K}`)}let b=!1,p,B0=-1;for(p=0;p<A.length;++p){let f=A[p];if(f===" ")b=!0;else if(f===`
`)B0=p;else break}let $0=A.substring(0,B0<p?B0+1:p);if($0)A=A.substring($0.length),$0=$0.replace(/\n+/g,`$&${K}`);let U0=(b?K?"2":"1":"")+T;if(J){if(U0+=" "+R(J.replace(/ ?[\r\n]+/g," ")),D)D()}if(!E){let f=A.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${K}`),K0=!1,Z0=W(M,!0);if(F!=="folded"&&Y!==X.Scalar.BLOCK_FOLDED)Z0.onOverflow=()=>{K0=!0};let R0=z.foldFlowLines(`${$0}${f}${C}`,K,z.FOLD_BLOCK,Z0);if(!K0)return`>${U0}
${K}${R0}`}return A=A.replace(/\n+/g,`$&${K}`),`|${U0}
${K}${$0}${A}${C}`}function $(J,Y,A,M){let{type:D,value:L}=J,{actualString:F,implicitKey:R,indent:N,indentStep:K,inFlow:E}=Y;if(R&&L.includes(`
`)||E&&/[[\]{},]/.test(L))return G(L,Y);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(L))return R||E||!L.includes(`
`)?G(L,Y):V(J,Y,A,M);if(!R&&!E&&D!==X.Scalar.PLAIN&&L.includes(`
`))return V(J,Y,A,M);if(_(L)){if(N==="")return Y.forceBlockIndent=!0,V(J,Y,A,M);else if(R&&N===K)return G(L,Y)}let T=L.replace(/\n+/g,`$&
${N}`);if(F){let P=(b)=>b.default&&b.tag!=="tag:yaml.org,2002:str"&&b.test?.test(T),{compat:C,tags:k}=Y.doc.schema;if(k.some(P)||C?.some(P))return G(L,Y)}return R?T:z.foldFlowLines(T,N,z.FOLD_FLOW,W(Y,!1))}function Q(J,Y,A,M){let{implicitKey:D,inFlow:L}=Y,F=typeof J.value==="string"?J:Object.assign({},J,{value:String(J.value)}),{type:R}=J;if(R!==X.Scalar.QUOTE_DOUBLE){if(/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(F.value))R=X.Scalar.QUOTE_DOUBLE}let N=(E)=>{switch(E){case X.Scalar.BLOCK_FOLDED:case X.Scalar.BLOCK_LITERAL:return D||L?G(F.value,Y):V(F,Y,A,M);case X.Scalar.QUOTE_DOUBLE:return B(F.value,Y);case X.Scalar.QUOTE_SINGLE:return U(F.value,Y);case X.Scalar.PLAIN:return $(F,Y,A,M);default:return null}},K=N(R);if(K===null){let{defaultKeyType:E,defaultStringType:T}=Y.options,P=D&&E||T;if(K=N(P),K===null)throw Error(`Unsupported default string type ${P}`)}return K}Z.stringifyString=Q}),sZ=w((Z)=>{var X=u6(),z=m(),W=iZ(),_=oZ();function q(H,V){let $=Object.assign({blockQuote:!0,commentString:W.stringifyComment,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},H.schema.toStringOptions,V),Q;switch($.collectionStyle){case"block":Q=!1;break;case"flow":Q=!0;break;default:Q=null}return{anchors:new Set,doc:H,flowCollectionPadding:$.flowCollectionPadding?" ":"",indent:"",indentStep:typeof $.indent==="number"?" ".repeat($.indent):"  ",inFlow:Q,options:$}}function B(H,V){if(V.tag){let J=H.filter((Y)=>Y.tag===V.tag);if(J.length>0)return J.find((Y)=>Y.format===V.format)??J[0]}let $=void 0,Q;if(z.isScalar(V)){Q=V.value;let J=H.filter((Y)=>Y.identify?.(Q));if(J.length>1){let Y=J.filter((A)=>A.test);if(Y.length>0)J=Y}$=J.find((Y)=>Y.format===V.format)??J.find((Y)=>!Y.format)}else Q=V,$=H.find((J)=>J.nodeClass&&Q instanceof J.nodeClass);if(!$){let J=Q?.constructor?.name??(Q===null?"null":typeof Q);throw Error(`Tag not resolved for ${J} value`)}return $}function U(H,V,{anchors:$,doc:Q}){if(!Q.directives)return"";let J=[],Y=(z.isScalar(H)||z.isCollection(H))&&H.anchor;if(Y&&X.anchorIsValid(Y))$.add(Y),J.push(`&${Y}`);let A=H.tag??(V.default?null:V.tag);if(A)J.push(Q.directives.tagString(A));return J.join(" ")}function G(H,V,$,Q){if(z.isPair(H))return H.toString(V,$,Q);if(z.isAlias(H)){if(V.doc.directives)return H.toString(V);if(V.resolvedAliases?.has(H))throw TypeError("Cannot stringify circular structure without alias nodes");else{if(V.resolvedAliases)V.resolvedAliases.add(H);else V.resolvedAliases=new Set([H]);H=H.resolve(V.doc)}}let J=void 0,Y=z.isNode(H)?H:V.doc.createNode(H,{onTagObj:(D)=>J=D});J??(J=B(V.doc.schema.tags,Y));let A=U(Y,J,V);if(A.length>0)V.indentAtStart=(V.indentAtStart??0)+A.length+1;let M=typeof J.stringify==="function"?J.stringify(Y,V,$,Q):z.isScalar(Y)?_.stringifyString(Y,V,$,Q):Y.toString(V,$,Q);if(!A)return M;return z.isScalar(Y)||M[0]==="{"||M[0]==="["?`${A} ${M}`:`${A}
${V.indent}${M}`}Z.createStringifyContext=q,Z.stringify=G}),K4=w((Z)=>{var X=m(),z=G0(),W=sZ(),_=iZ();function q({key:B,value:U},G,H,V){let{allNullValues:$,doc:Q,indent:J,indentStep:Y,options:{commentString:A,indentSeq:M,simpleKeys:D}}=G,L=X.isNode(B)&&B.comment||null;if(D){if(L)throw Error("With simple keys, key nodes cannot have comments");if(X.isCollection(B)||!X.isNode(B)&&typeof B==="object")throw Error("With simple keys, collection cannot be used as a key value")}let F=!D&&(!B||L&&U==null&&!G.inFlow||X.isCollection(B)||(X.isScalar(B)?B.type===z.Scalar.BLOCK_FOLDED||B.type===z.Scalar.BLOCK_LITERAL:typeof B==="object"));G=Object.assign({},G,{allNullValues:!1,implicitKey:!F&&(D||!$),indent:J+Y});let R=!1,N=!1,K=W.stringify(B,G,()=>R=!0,()=>N=!0);if(!F&&!G.inFlow&&K.length>1024){if(D)throw Error("With simple keys, single line scalar must not span more than 1024 characters");F=!0}if(G.inFlow){if($||U==null){if(R&&H)H();return K===""?"?":F?`? ${K}`:K}}else if($&&!D||U==null&&F){if(K=`? ${K}`,L&&!R)K+=_.lineComment(K,G.indent,A(L));else if(N&&V)V();return K}if(R)L=null;if(F){if(L)K+=_.lineComment(K,G.indent,A(L));K=`? ${K}
${J}:`}else if(K=`${K}:`,L)K+=_.lineComment(K,G.indent,A(L));let E,T,P;if(X.isNode(U))E=!!U.spaceBefore,T=U.commentBefore,P=U.comment;else if(E=!1,T=null,P=null,U&&typeof U==="object")U=Q.createNode(U);if(G.implicitKey=!1,!F&&!L&&X.isScalar(U))G.indentAtStart=K.length+1;if(N=!1,!M&&Y.length>=2&&!G.inFlow&&!F&&X.isSeq(U)&&!U.flow&&!U.tag&&!U.anchor)G.indent=G.indent.substring(2);let C=!1,k=W.stringify(U,G,()=>C=!0,()=>N=!0),b=" ";if(L||E||T){if(b=E?`
`:"",T){let p=A(T);b+=`
${_.indentComment(p,G.indent)}`}if(k===""&&!G.inFlow){if(b===`
`&&P)b=`

`}else b+=`
${G.indent}`}else if(!F&&X.isCollection(U)){let p=k[0],B0=k.indexOf(`
`),$0=B0!==-1,p0=G.inFlow??U.flow??U.items.length===0;if($0||!p0){let U0=!1;if($0&&(p==="&"||p==="!")){let f=k.indexOf(" ");if(p==="&"&&f!==-1&&f<B0&&k[f+1]==="!")f=k.indexOf(" ",f+1);if(f===-1||B0<f)U0=!0}if(!U0)b=`
${G.indent}`}}else if(k===""||k[0]===`
`)b="";if(K+=b+k,G.inFlow){if(C&&H)H()}else if(P&&!C)K+=_.lineComment(K,G.indent,A(P));else if(N&&V)V();return K}Z.stringifyPair=q}),l5=w((Z)=>{var X=cZ("process");function z(_,...q){if(_==="debug")console.log(...q)}function W(_,q){if(_==="debug"||_==="warn")if(typeof X.emitWarning==="function")X.emitWarning(q);else console.warn(q)}Z.debug=z,Z.warn=W}),p6=w((Z)=>{var X=m(),z=G0(),W="<<",_={identify:(G)=>G===W||typeof G==="symbol"&&G.description===W,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new z.Scalar(Symbol(W)),{addToJSMap:B}),stringify:()=>W},q=(G,H)=>(_.identify(H)||X.isScalar(H)&&(!H.type||H.type===z.Scalar.PLAIN)&&_.identify(H.value))&&G?.doc.schema.tags.some((V)=>V.tag===_.tag&&V.default);function B(G,H,V){if(V=G&&X.isAlias(V)?V.resolve(G.doc):V,X.isSeq(V))for(let $ of V.items)U(G,H,$);else if(Array.isArray(V))for(let $ of V)U(G,H,$);else U(G,H,V)}function U(G,H,V){let $=G&&X.isAlias(V)?V.resolve(G.doc):V;if(!X.isMap($))throw Error("Merge sources must be maps or map aliases");let Q=$.toJSON(null,G,Map);for(let[J,Y]of Q)if(H instanceof Map){if(!H.has(J))H.set(J,Y)}else if(H instanceof Set)H.add(J);else if(!Object.prototype.hasOwnProperty.call(H,J))Object.defineProperty(H,J,{value:Y,writable:!0,enumerable:!0,configurable:!0});return H}Z.addMergeToJSMap=B,Z.isMergeKey=q,Z.merge=_}),n5=w((Z)=>{var X=l5(),z=p6(),W=sZ(),_=m(),q=I8();function B(G,H,{key:V,value:$}){if(_.isNode(V)&&V.addToJSMap)V.addToJSMap(G,H,$);else if(z.isMergeKey(G,V))z.addMergeToJSMap(G,H,$);else{let Q=q.toJS(V,"",G);if(H instanceof Map)H.set(Q,q.toJS($,Q,G));else if(H instanceof Set)H.add(Q);else{let J=U(V,Q,G),Y=q.toJS($,J,G);if(J in H)Object.defineProperty(H,J,{value:Y,writable:!0,enumerable:!0,configurable:!0});else H[J]=Y}}return H}function U(G,H,V){if(H===null)return"";if(typeof H!=="object")return String(H);if(_.isNode(G)&&V?.doc){let $=W.createStringifyContext(V.doc,{});$.anchors=new Set;for(let J of V.anchors.keys())$.anchors.add(J.anchor);$.inFlow=!0,$.inStringifyKey=!0;let Q=G.toString($);if(!V.mapKeyWarned){let J=JSON.stringify(Q);if(J.length>40)J=J.substring(0,36)+'..."';X.warn(V.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${J}. Set mapAsMap: true to use object keys.`),V.mapKeyWarned=!0}return Q}return JSON.stringify(H)}Z.addPairToJSMap=B}),T8=w((Z)=>{var X=nZ(),z=K4(),W=n5(),_=m();function q(U,G,H){let V=X.createNode(U,void 0,H),$=X.createNode(G,void 0,H);return new B(V,$)}class B{constructor(U,G=null){Object.defineProperty(this,_.NODE_TYPE,{value:_.PAIR}),this.key=U,this.value=G}clone(U){let{key:G,value:H}=this;if(_.isNode(G))G=G.clone(U);if(_.isNode(H))H=H.clone(U);return new B(G,H)}toJSON(U,G){let H=G?.mapAsMap?new Map:{};return W.addPairToJSMap(G,H,this)}toString(U,G,H){return U?.doc?z.stringifyPair(this,U,G,H):JSON.stringify(this)}}Z.Pair=B,Z.createPair=q}),i5=w((Z)=>{var X=m(),z=sZ(),W=iZ();function _(G,H,V){return(H.inFlow??G.flow?B:q)(G,H,V)}function q({comment:G,items:H},V,{blockItemPrefix:$,flowChars:Q,itemIndent:J,onChompKeep:Y,onComment:A}){let{indent:M,options:{commentString:D}}=V,L=Object.assign({},V,{indent:J,type:null}),F=!1,R=[];for(let K=0;K<H.length;++K){let E=H[K],T=null;if(X.isNode(E)){if(!F&&E.spaceBefore)R.push("");if(U(V,R,E.commentBefore,F),E.comment)T=E.comment}else if(X.isPair(E)){let C=X.isNode(E.key)?E.key:null;if(C){if(!F&&C.spaceBefore)R.push("");U(V,R,C.commentBefore,F)}}F=!1;let P=z.stringify(E,L,()=>T=null,()=>F=!0);if(T)P+=W.lineComment(P,J,D(T));if(F&&T)F=!1;R.push($+P)}let N;if(R.length===0)N=Q.start+Q.end;else{N=R[0];for(let K=1;K<R.length;++K){let E=R[K];N+=E?`
${M}${E}`:`
`}}if(G){if(N+=`
`+W.indentComment(D(G),M),A)A()}else if(F&&Y)Y();return N}function B({items:G},H,{flowChars:V,itemIndent:$}){let{indent:Q,indentStep:J,flowCollectionPadding:Y,options:{commentString:A}}=H;$+=J;let M=Object.assign({},H,{indent:$,inFlow:!0,type:null}),D=!1,L=0,F=[];for(let K=0;K<G.length;++K){let E=G[K],T=null;if(X.isNode(E)){if(E.spaceBefore)F.push("");if(U(H,F,E.commentBefore,!1),E.comment)T=E.comment}else if(X.isPair(E)){let C=X.isNode(E.key)?E.key:null;if(C){if(C.spaceBefore)F.push("");if(U(H,F,C.commentBefore,!1),C.comment)D=!0}let k=X.isNode(E.value)?E.value:null;if(k){if(k.comment)T=k.comment;if(k.commentBefore)D=!0}else if(E.value==null&&C?.comment)T=C.comment}if(T)D=!0;let P=z.stringify(E,M,()=>T=null);if(D||(D=F.length>L||P.includes(`
`)),K<G.length-1)P+=",";else if(H.options.trailingComma){if(H.options.lineWidth>0)D||(D=F.reduce((C,k)=>C+k.length+2,2)+(P.length+2)>H.options.lineWidth);if(D)P+=","}if(T)P+=W.lineComment(P,$,A(T));F.push(P),L=F.length}let{start:R,end:N}=V;if(F.length===0)return R+N;else{if(!D){let K=F.reduce((E,T)=>E+T.length+2,2);D=H.options.lineWidth>0&&K>H.options.lineWidth}if(D){let K=R;for(let E of F)K+=E?`
${J}${Q}${E}`:`
`;return`${K}
${Q}${N}`}else return`${R}${Y}${F.join(" ")}${Y}${N}`}}function U({indent:G,options:{commentString:H}},V,$,Q){if($&&Q)$=$.replace(/^\n+/,"");if($){let J=W.indentComment(H($),G);V.push(J.trimStart())}}Z.stringifyCollection=_}),P8=w((Z)=>{var X=i5(),z=n5(),W=c6(),_=m(),q=T8(),B=G0();function U(H,V){let $=_.isScalar(V)?V.value:V;for(let Q of H)if(_.isPair(Q)){if(Q.key===V||Q.key===$)return Q;if(_.isScalar(Q.key)&&Q.key.value===$)return Q}return}class G extends W.Collection{static get tagName(){return"tag:yaml.org,2002:map"}constructor(H){super(_.MAP,H);this.items=[]}static from(H,V,$){let{keepUndefined:Q,replacer:J}=$,Y=new this(H),A=(M,D)=>{if(typeof J==="function")D=J.call(V,M,D);else if(Array.isArray(J)&&!J.includes(M))return;if(D!==void 0||Q)Y.items.push(q.createPair(M,D,$))};if(V instanceof Map)for(let[M,D]of V)A(M,D);else if(V&&typeof V==="object")for(let M of Object.keys(V))A(M,V[M]);if(typeof H.sortMapEntries==="function")Y.items.sort(H.sortMapEntries);return Y}add(H,V){let $;if(_.isPair(H))$=H;else if(!H||typeof H!=="object"||!("key"in H))$=new q.Pair(H,H?.value);else $=new q.Pair(H.key,H.value);let Q=U(this.items,$.key),J=this.schema?.sortMapEntries;if(Q){if(!V)throw Error(`Key ${$.key} already set`);if(_.isScalar(Q.value)&&B.isScalarValue($.value))Q.value.value=$.value;else Q.value=$.value}else if(J){let Y=this.items.findIndex((A)=>J($,A)<0);if(Y===-1)this.items.push($);else this.items.splice(Y,0,$)}else this.items.push($)}delete(H){let V=U(this.items,H);if(!V)return!1;return this.items.splice(this.items.indexOf(V),1).length>0}get(H,V){let Q=U(this.items,H)?.value;return(!V&&_.isScalar(Q)?Q.value:Q)??void 0}has(H){return!!U(this.items,H)}set(H,V){this.add(new q.Pair(H,V),!0)}toJSON(H,V,$){let Q=$?new $:V?.mapAsMap?new Map:{};if(V?.onCreate)V.onCreate(Q);for(let J of this.items)z.addPairToJSMap(V,Q,J);return Q}toString(H,V,$){if(!H)return JSON.stringify(this);for(let Q of this.items)if(!_.isPair(Q))throw Error(`Map items must all be pairs; found ${JSON.stringify(Q)} instead`);if(!H.allNullValues&&this.hasAllNullValues(!1))H=Object.assign({},H,{allNullValues:!0});return X.stringifyCollection(this,H,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:H.indent||"",onChompKeep:$,onComment:V})}}Z.YAMLMap=G,Z.findPair=U}),DZ=w((Z)=>{var X=m(),z=P8(),W={collection:"map",default:!0,nodeClass:z.YAMLMap,tag:"tag:yaml.org,2002:map",resolve(_,q){if(!X.isMap(_))q("Expected a mapping for this tag");return _},createNode:(_,q,B)=>z.YAMLMap.from(_,q,B)};Z.map=W}),w8=w((Z)=>{var X=nZ(),z=i5(),W=c6(),_=m(),q=G0(),B=I8();class U extends W.Collection{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(H){super(_.SEQ,H);this.items=[]}add(H){this.items.push(H)}delete(H){let V=G(H);if(typeof V!=="number")return!1;return this.items.splice(V,1).length>0}get(H,V){let $=G(H);if(typeof $!=="number")return;let Q=this.items[$];return!V&&_.isScalar(Q)?Q.value:Q}has(H){let V=G(H);return typeof V==="number"&&V<this.items.length}set(H,V){let $=G(H);if(typeof $!=="number")throw Error(`Expected a valid index, not ${H}.`);let Q=this.items[$];if(_.isScalar(Q)&&q.isScalarValue(V))Q.value=V;else this.items[$]=V}toJSON(H,V){let $=[];if(V?.onCreate)V.onCreate($);let Q=0;for(let J of this.items)$.push(B.toJS(J,String(Q++),V));return $}toString(H,V,$){if(!H)return JSON.stringify(this);return z.stringifyCollection(this,H,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(H.indent||"")+"  ",onChompKeep:$,onComment:V})}static from(H,V,$){let{replacer:Q}=$,J=new this(H);if(V&&Symbol.iterator in Object(V)){let Y=0;for(let A of V){if(typeof Q==="function"){let M=V instanceof Set?A:String(Y++);A=Q.call(V,M,A)}J.items.push(X.createNode(A,void 0,$))}}return J}}function G(H){let V=_.isScalar(H)?H.value:H;if(V&&typeof V==="string")V=Number(V);return typeof V==="number"&&Number.isInteger(V)&&V>=0?V:null}Z.YAMLSeq=U}),LZ=w((Z)=>{var X=m(),z=w8(),W={collection:"seq",default:!0,nodeClass:z.YAMLSeq,tag:"tag:yaml.org,2002:seq",resolve(_,q){if(!X.isSeq(_))q("Expected a sequence for this tag");return _},createNode:(_,q,B)=>z.YAMLSeq.from(_,q,B)};Z.seq=W}),aZ=w((Z)=>{var X=oZ(),z={identify:(W)=>typeof W==="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:(W)=>W,stringify(W,_,q,B){return _=Object.assign({actualString:!0},_),X.stringifyString(W,_,q,B)}};Z.string=z}),l6=w((Z)=>{var X=G0(),z={identify:(W)=>W==null,createNode:()=>new X.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new X.Scalar(null),stringify:({source:W},_)=>typeof W==="string"&&z.test.test(W)?W:_.options.nullStr};Z.nullTag=z}),o5=w((Z)=>{var X=G0(),z={identify:(W)=>typeof W==="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:(W)=>new X.Scalar(W[0]==="t"||W[0]==="T"),stringify({source:W,value:_},q){if(W&&z.test.test(W)){let B=W[0]==="t"||W[0]==="T";if(_===B)return W}return _?q.options.trueStr:q.options.falseStr}};Z.boolTag=z}),OZ=w((Z)=>{function X({format:z,minFractionDigits:W,tag:_,value:q}){if(typeof q==="bigint")return String(q);let B=typeof q==="number"?q:Number(q);if(!isFinite(B))return isNaN(B)?".nan":B<0?"-.inf":".inf";let U=Object.is(q,-0)?"-0":JSON.stringify(q);if(!z&&W&&(!_||_==="tag:yaml.org,2002:float")&&/^\d/.test(U)){let G=U.indexOf(".");if(G<0)G=U.length,U+=".";let H=W-(U.length-G-1);while(H-- >0)U+="0"}return U}Z.stringifyNumber=X}),s5=w((Z)=>{var X=G0(),z=OZ(),W={identify:(B)=>typeof B==="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:(B)=>B.slice(-3).toLowerCase()==="nan"?NaN:B[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:z.stringifyNumber},_={identify:(B)=>typeof B==="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:(B)=>parseFloat(B),stringify(B){let U=Number(B.value);return isFinite(U)?U.toExponential():z.stringifyNumber(B)}},q={identify:(B)=>typeof B==="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(B){let U=new X.Scalar(parseFloat(B)),G=B.indexOf(".");if(G!==-1&&B[B.length-1]==="0")U.minFractionDigits=B.length-G-1;return U},stringify:z.stringifyNumber};Z.float=q,Z.floatExp=_,Z.floatNaN=W}),a5=w((Z)=>{var X=OZ(),z=(G)=>typeof G==="bigint"||Number.isInteger(G),W=(G,H,V,{intAsBigInt:$})=>$?BigInt(G):parseInt(G.substring(H),V);function _(G,H,V){let{value:$}=G;if(z($)&&$>=0)return V+$.toString(H);return X.stringifyNumber(G)}var q={identify:(G)=>z(G)&&G>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(G,H,V)=>W(G,2,8,V),stringify:(G)=>_(G,8,"0o")},B={identify:z,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(G,H,V)=>W(G,0,10,V),stringify:X.stringifyNumber},U={identify:(G)=>z(G)&&G>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(G,H,V)=>W(G,2,16,V),stringify:(G)=>_(G,16,"0x")};Z.int=B,Z.intHex=U,Z.intOct=q}),R4=w((Z)=>{var X=DZ(),z=l6(),W=LZ(),_=aZ(),q=o5(),B=s5(),U=a5(),G=[X.map,W.seq,_.string,z.nullTag,q.boolTag,U.intOct,U.int,U.intHex,B.floatNaN,B.floatExp,B.float];Z.schema=G}),j4=w((Z)=>{var X=G0(),z=DZ(),W=LZ();function _(H){return typeof H==="bigint"||Number.isInteger(H)}var q=({value:H})=>JSON.stringify(H),B=[{identify:(H)=>typeof H==="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:(H)=>H,stringify:q},{identify:(H)=>H==null,createNode:()=>new X.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:q},{identify:(H)=>typeof H==="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:(H)=>H==="true",stringify:q},{identify:_,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(H,V,{intAsBigInt:$})=>$?BigInt(H):parseInt(H,10),stringify:({value:H})=>_(H)?H.toString():JSON.stringify(H)},{identify:(H)=>typeof H==="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:(H)=>parseFloat(H),stringify:q}],U={default:!0,tag:"",test:/^/,resolve(H,V){return V(`Unresolved plain scalar ${JSON.stringify(H)}`),H}},G=[z.map,W.seq].concat(B,U);Z.schema=G}),r5=w((Z)=>{var X=cZ("buffer"),z=G0(),W=oZ(),_={identify:(q)=>q instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(q,B){if(typeof X.Buffer==="function")return X.Buffer.from(q,"base64");else if(typeof atob==="function"){let U=atob(q.replace(/[\n\r]/g,"")),G=new Uint8Array(U.length);for(let H=0;H<U.length;++H)G[H]=U.charCodeAt(H);return G}else return B("This environment does not support reading binary tags; either Buffer or atob is required"),q},stringify({comment:q,type:B,value:U},G,H,V){if(!U)return"";let $=U,Q;if(typeof X.Buffer==="function")Q=$ instanceof X.Buffer?$.toString("base64"):X.Buffer.from($.buffer).toString("base64");else if(typeof btoa==="function"){let J="";for(let Y=0;Y<$.length;++Y)J+=String.fromCharCode($[Y]);Q=btoa(J)}else throw Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(B??(B=z.Scalar.BLOCK_LITERAL),B!==z.Scalar.QUOTE_DOUBLE){let J=Math.max(G.options.lineWidth-G.indent.length,G.options.minContentWidth),Y=Math.ceil(Q.length/J),A=Array(Y);for(let M=0,D=0;M<Y;++M,D+=J)A[M]=Q.substr(D,J);Q=A.join(B===z.Scalar.BLOCK_LITERAL?`
`:" ")}return W.stringifyString({comment:q,type:B,value:Q},G,H,V)}};Z.binary=_}),n6=w((Z)=>{var X=m(),z=T8(),W=G0(),_=w8();function q(G,H){if(X.isSeq(G))for(let V=0;V<G.items.length;++V){let $=G.items[V];if(X.isPair($))continue;else if(X.isMap($)){if($.items.length>1)H("Each pair must have its own sequence indicator");let Q=$.items[0]||new z.Pair(new W.Scalar(null));if($.commentBefore)Q.key.commentBefore=Q.key.commentBefore?`${$.commentBefore}
${Q.key.commentBefore}`:$.commentBefore;if($.comment){let J=Q.value??Q.key;J.comment=J.comment?`${$.comment}
${J.comment}`:$.comment}$=Q}G.items[V]=X.isPair($)?$:new z.Pair($)}else H("Expected a sequence for this tag");return G}function B(G,H,V){let{replacer:$}=V,Q=new _.YAMLSeq(G);Q.tag="tag:yaml.org,2002:pairs";let J=0;if(H&&Symbol.iterator in Object(H))for(let Y of H){if(typeof $==="function")Y=$.call(H,String(J++),Y);let A,M;if(Array.isArray(Y))if(Y.length===2)A=Y[0],M=Y[1];else throw TypeError(`Expected [key, value] tuple: ${Y}`);else if(Y&&Y instanceof Object){let D=Object.keys(Y);if(D.length===1)A=D[0],M=Y[A];else throw TypeError(`Expected tuple with one key, not ${D.length} keys`)}else A=Y;Q.items.push(z.createPair(A,M,V))}return Q}var U={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:q,createNode:B};Z.createPairs=B,Z.pairs=U,Z.resolvePairs=q}),t5=w((Z)=>{var X=m(),z=I8(),W=P8(),_=w8(),q=n6();class B extends _.YAMLSeq{constructor(){super();this.add=W.YAMLMap.prototype.add.bind(this),this.delete=W.YAMLMap.prototype.delete.bind(this),this.get=W.YAMLMap.prototype.get.bind(this),this.has=W.YAMLMap.prototype.has.bind(this),this.set=W.YAMLMap.prototype.set.bind(this),this.tag=B.tag}toJSON(G,H){if(!H)return super.toJSON(G);let V=new Map;if(H?.onCreate)H.onCreate(V);for(let $ of this.items){let Q,J;if(X.isPair($))Q=z.toJS($.key,"",H),J=z.toJS($.value,Q,H);else Q=z.toJS($,"",H);if(V.has(Q))throw Error("Ordered maps must not include duplicate keys");V.set(Q,J)}return V}static from(G,H,V){let $=q.createPairs(G,H,V),Q=new this;return Q.items=$.items,Q}}B.tag="tag:yaml.org,2002:omap";var U={collection:"seq",identify:(G)=>G instanceof Map,nodeClass:B,default:!1,tag:"tag:yaml.org,2002:omap",resolve(G,H){let V=q.resolvePairs(G,H),$=[];for(let{key:Q}of V.items)if(X.isScalar(Q))if($.includes(Q.value))H(`Ordered maps must not include duplicate keys: ${Q.value}`);else $.push(Q.value);return Object.assign(new B,V)},createNode:(G,H,V)=>B.from(G,H,V)};Z.YAMLOMap=B,Z.omap=U}),S4=w((Z)=>{var X=G0();function z({value:q,source:B},U){if(B&&(q?W:_).test.test(B))return B;return q?U.options.trueStr:U.options.falseStr}var W={identify:(q)=>q===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new X.Scalar(!0),stringify:z},_={identify:(q)=>q===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new X.Scalar(!1),stringify:z};Z.falseTag=_,Z.trueTag=W}),C4=w((Z)=>{var X=G0(),z=OZ(),W={identify:(B)=>typeof B==="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:(B)=>B.slice(-3).toLowerCase()==="nan"?NaN:B[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:z.stringifyNumber},_={identify:(B)=>typeof B==="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:(B)=>parseFloat(B.replace(/_/g,"")),stringify(B){let U=Number(B.value);return isFinite(U)?U.toExponential():z.stringifyNumber(B)}},q={identify:(B)=>typeof B==="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(B){let U=new X.Scalar(parseFloat(B.replace(/_/g,""))),G=B.indexOf(".");if(G!==-1){let H=B.substring(G+1).replace(/_/g,"");if(H[H.length-1]==="0")U.minFractionDigits=H.length}return U},stringify:z.stringifyNumber};Z.float=q,Z.floatExp=_,Z.floatNaN=W}),E4=w((Z)=>{var X=OZ(),z=(H)=>typeof H==="bigint"||Number.isInteger(H);function W(H,V,$,{intAsBigInt:Q}){let J=H[0];if(J==="-"||J==="+")V+=1;if(H=H.substring(V).replace(/_/g,""),Q){switch($){case 2:H=`0b${H}`;break;case 8:H=`0o${H}`;break;case 16:H=`0x${H}`;break}let A=BigInt(H);return J==="-"?BigInt(-1)*A:A}let Y=parseInt(H,$);return J==="-"?-1*Y:Y}function _(H,V,$){let{value:Q}=H;if(z(Q)){let J=Q.toString(V);return Q<0?"-"+$+J.substr(1):$+J}return X.stringifyNumber(H)}var q={identify:z,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(H,V,$)=>W(H,2,2,$),stringify:(H)=>_(H,2,"0b")},B={identify:z,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(H,V,$)=>W(H,1,8,$),stringify:(H)=>_(H,8,"0")},U={identify:z,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(H,V,$)=>W(H,0,10,$),stringify:X.stringifyNumber},G={identify:z,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(H,V,$)=>W(H,2,16,$),stringify:(H)=>_(H,16,"0x")};Z.int=U,Z.intBin=q,Z.intHex=G,Z.intOct=B}),e5=w((Z)=>{var X=m(),z=T8(),W=P8();class _ extends W.YAMLMap{constructor(B){super(B);this.tag=_.tag}add(B){let U;if(X.isPair(B))U=B;else if(B&&typeof B==="object"&&"key"in B&&"value"in B&&B.value===null)U=new z.Pair(B.key,null);else U=new z.Pair(B,null);if(!W.findPair(this.items,U.key))this.items.push(U)}get(B,U){let G=W.findPair(this.items,B);return!U&&X.isPair(G)?X.isScalar(G.key)?G.key.value:G.key:G}set(B,U){if(typeof U!=="boolean")throw Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof U}`);let G=W.findPair(this.items,B);if(G&&!U)this.items.splice(this.items.indexOf(G),1);else if(!G&&U)this.items.push(new z.Pair(B))}toJSON(B,U){return super.toJSON(B,U,Set)}toString(B,U,G){if(!B)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},B,{allNullValues:!0}),U,G);else throw Error("Set items must all have null values")}static from(B,U,G){let{replacer:H}=G,V=new this(B);if(U&&Symbol.iterator in Object(U))for(let $ of U){if(typeof H==="function")$=H.call(U,$,$);V.items.push(z.createPair($,null,G))}return V}}_.tag="tag:yaml.org,2002:set";var q={collection:"map",identify:(B)=>B instanceof Set,nodeClass:_,default:!1,tag:"tag:yaml.org,2002:set",createNode:(B,U,G)=>_.from(B,U,G),resolve(B,U){if(X.isMap(B))if(B.hasAllNullValues(!0))return Object.assign(new _,B);else U("Set items must all have null values");else U("Expected a mapping for this tag");return B}};Z.YAMLSet=_,Z.set=q}),Z7=w((Z)=>{var X=OZ();function z(U,G){let H=U[0],V=H==="-"||H==="+"?U.substring(1):U,$=(J)=>G?BigInt(J):Number(J),Q=V.replace(/_/g,"").split(":").reduce((J,Y)=>J*$(60)+$(Y),$(0));return H==="-"?$(-1)*Q:Q}function W(U){let{value:G}=U,H=(J)=>J;if(typeof G==="bigint")H=(J)=>BigInt(J);else if(isNaN(G)||!isFinite(G))return X.stringifyNumber(U);let V="";if(G<0)V="-",G*=H(-1);let $=H(60),Q=[G%$];if(G<60)Q.unshift(0);else if(G=(G-Q[0])/$,Q.unshift(G%$),G>=60)G=(G-Q[0])/$,Q.unshift(G);return V+Q.map((J)=>String(J).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}var _={identify:(U)=>typeof U==="bigint"||Number.isInteger(U),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(U,G,{intAsBigInt:H})=>z(U,H),stringify:W},q={identify:(U)=>typeof U==="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:(U)=>z(U,!1),stringify:W},B={identify:(U)=>U instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(U){let G=U.match(B.test);if(!G)throw Error("!!timestamp expects a date, starting with yyyy-mm-dd");let[,H,V,$,Q,J,Y]=G.map(Number),A=G[7]?Number((G[7]+"00").substr(1,3)):0,M=Date.UTC(H,V-1,$,Q||0,J||0,Y||0,A),D=G[8];if(D&&D!=="Z"){let L=z(D,!1);if(Math.abs(L)<30)L*=60;M-=60000*L}return new Date(M)},stringify:({value:U})=>U?.toISOString().replace(/(T00:00:00)?\.000Z$/,"")??""};Z.floatTime=q,Z.intTime=_,Z.timestamp=B}),I4=w((Z)=>{var X=DZ(),z=l6(),W=LZ(),_=aZ(),q=r5(),B=S4(),U=C4(),G=E4(),H=p6(),V=t5(),$=n6(),Q=e5(),J=Z7(),Y=[X.map,W.seq,_.string,z.nullTag,B.trueTag,B.falseTag,G.intBin,G.intOct,G.int,G.intHex,U.floatNaN,U.floatExp,U.float,q.binary,H.merge,V.omap,$.pairs,Q.set,J.intTime,J.floatTime,J.timestamp];Z.schema=Y}),T4=w((Z)=>{var X=DZ(),z=l6(),W=LZ(),_=aZ(),q=o5(),B=s5(),U=a5(),G=R4(),H=j4(),V=r5(),$=p6(),Q=t5(),J=n6(),Y=I4(),A=e5(),M=Z7(),D=new Map([["core",G.schema],["failsafe",[X.map,W.seq,_.string]],["json",H.schema],["yaml11",Y.schema],["yaml-1.1",Y.schema]]),L={binary:V.binary,bool:q.boolTag,float:B.float,floatExp:B.floatExp,floatNaN:B.floatNaN,floatTime:M.floatTime,int:U.int,intHex:U.intHex,intOct:U.intOct,intTime:M.intTime,map:X.map,merge:$.merge,null:z.nullTag,omap:Q.omap,pairs:J.pairs,seq:W.seq,set:A.set,timestamp:M.timestamp},F={"tag:yaml.org,2002:binary":V.binary,"tag:yaml.org,2002:merge":$.merge,"tag:yaml.org,2002:omap":Q.omap,"tag:yaml.org,2002:pairs":J.pairs,"tag:yaml.org,2002:set":A.set,"tag:yaml.org,2002:timestamp":M.timestamp};function R(N,K,E){let T=D.get(K);if(T&&!N)return E&&!T.includes($.merge)?T.concat($.merge):T.slice();let P=T;if(!P)if(Array.isArray(N))P=[];else{let C=Array.from(D.keys()).filter((k)=>k!=="yaml11").map((k)=>JSON.stringify(k)).join(", ");throw Error(`Unknown schema "${K}"; use one of ${C} or define customTags array`)}if(Array.isArray(N))for(let C of N)P=P.concat(C);else if(typeof N==="function")P=N(P.slice());if(E)P=P.concat($.merge);return P.reduce((C,k)=>{let b=typeof k==="string"?L[k]:k;if(!b){let p=JSON.stringify(k),B0=Object.keys(L).map(($0)=>JSON.stringify($0)).join(", ");throw Error(`Unknown custom tag ${p}; use one of ${B0}`)}if(!C.includes(b))C.push(b);return C},[])}Z.coreKnownTags=F,Z.getTags=R}),X7=w((Z)=>{var X=m(),z=DZ(),W=LZ(),_=aZ(),q=T4(),B=(G,H)=>G.key<H.key?-1:G.key>H.key?1:0;class U{constructor({compat:G,customTags:H,merge:V,resolveKnownTags:$,schema:Q,sortMapEntries:J,toStringDefaults:Y}){this.compat=Array.isArray(G)?q.getTags(G,"compat"):G?q.getTags(null,G):null,this.name=typeof Q==="string"&&Q||"core",this.knownTags=$?q.coreKnownTags:{},this.tags=q.getTags(H,this.name,V),this.toStringOptions=Y??null,Object.defineProperty(this,X.MAP,{value:z.map}),Object.defineProperty(this,X.SCALAR,{value:_.string}),Object.defineProperty(this,X.SEQ,{value:W.seq}),this.sortMapEntries=typeof J==="function"?J:J===!0?B:null}clone(){let G=Object.create(U.prototype,Object.getOwnPropertyDescriptors(this));return G.tags=this.tags.slice(),G}}Z.Schema=U}),P4=w((Z)=>{var X=m(),z=sZ(),W=iZ();function _(q,B){let U=[],G=B.directives===!0;if(B.directives!==!1&&q.directives){let J=q.directives.toString(q);if(J)U.push(J),G=!0;else if(q.directives.docStart)G=!0}if(G)U.push("---");let H=z.createStringifyContext(q,B),{commentString:V}=H.options;if(q.commentBefore){if(U.length!==1)U.unshift("");let J=V(q.commentBefore);U.unshift(W.indentComment(J,""))}let $=!1,Q=null;if(q.contents){if(X.isNode(q.contents)){if(q.contents.spaceBefore&&G)U.push("");if(q.contents.commentBefore){let A=V(q.contents.commentBefore);U.push(W.indentComment(A,""))}H.forceBlockIndent=!!q.comment,Q=q.contents.comment}let J=Q?void 0:()=>$=!0,Y=z.stringify(q.contents,H,()=>Q=null,J);if(Q)Y+=W.lineComment(Y,"",V(Q));if((Y[0]==="|"||Y[0]===">")&&U[U.length-1]==="---")U[U.length-1]=`--- ${Y}`;else U.push(Y)}else U.push(z.stringify(q.contents,H));if(q.directives?.docEnd)if(q.comment){let J=V(q.comment);if(J.includes(`
`))U.push("..."),U.push(W.indentComment(J,""));else U.push(`... ${J}`)}else U.push("...");else{let J=q.comment;if(J&&$)J=J.replace(/^\n+/,"");if(J){if((!$||Q)&&U[U.length-1]!=="")U.push("");U.push(W.indentComment(V(J),""))}}return U.join(`
`)+`
`}Z.stringifyDocument=_}),rZ=w((Z)=>{var X=lZ(),z=c6(),W=m(),_=T8(),q=I8(),B=X7(),U=P4(),G=u6(),H=p5(),V=nZ(),$=c5();class Q{constructor(Y,A,M){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,W.NODE_TYPE,{value:W.DOC});let D=null;if(typeof A==="function"||Array.isArray(A))D=A;else if(M===void 0&&A)M=A,A=void 0;let L=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},M);this.options=L;let{version:F}=L;if(M?._directives){if(this.directives=M._directives.atDocument(),this.directives.yaml.explicit)F=this.directives.yaml.version}else this.directives=new $.Directives({version:F});this.setSchema(F,M),this.contents=Y===void 0?null:this.createNode(Y,D,M)}clone(){let Y=Object.create(Q.prototype,{[W.NODE_TYPE]:{value:W.DOC}});if(Y.commentBefore=this.commentBefore,Y.comment=this.comment,Y.errors=this.errors.slice(),Y.warnings=this.warnings.slice(),Y.options=Object.assign({},this.options),this.directives)Y.directives=this.directives.clone();if(Y.schema=this.schema.clone(),Y.contents=W.isNode(this.contents)?this.contents.clone(Y.schema):this.contents,this.range)Y.range=this.range.slice();return Y}add(Y){if(J(this.contents))this.contents.add(Y)}addIn(Y,A){if(J(this.contents))this.contents.addIn(Y,A)}createAlias(Y,A){if(!Y.anchor){let M=G.anchorNames(this);Y.anchor=!A||M.has(A)?G.findNewAnchor(A||"a",M):A}return new X.Alias(Y.anchor)}createNode(Y,A,M){let D=void 0;if(typeof A==="function")Y=A.call({"":Y},"",Y),D=A;else if(Array.isArray(A)){let p=($0)=>typeof $0==="number"||$0 instanceof String||$0 instanceof Number,B0=A.filter(p).map(String);if(B0.length>0)A=A.concat(B0);D=A}else if(M===void 0&&A)M=A,A=void 0;let{aliasDuplicateObjects:L,anchorPrefix:F,flow:R,keepUndefined:N,onTagObj:K,tag:E}=M??{},{onAnchor:T,setAnchors:P,sourceObjects:C}=G.createNodeAnchors(this,F||"a"),k={aliasDuplicateObjects:L??!0,keepUndefined:N??!1,onAnchor:T,onTagObj:K,replacer:D,schema:this.schema,sourceObjects:C},b=V.createNode(Y,E,k);if(R&&W.isCollection(b))b.flow=!0;return P(),b}createPair(Y,A,M={}){let D=this.createNode(Y,null,M),L=this.createNode(A,null,M);return new _.Pair(D,L)}delete(Y){return J(this.contents)?this.contents.delete(Y):!1}deleteIn(Y){if(z.isEmptyPath(Y)){if(this.contents==null)return!1;return this.contents=null,!0}return J(this.contents)?this.contents.deleteIn(Y):!1}get(Y,A){return W.isCollection(this.contents)?this.contents.get(Y,A):void 0}getIn(Y,A){if(z.isEmptyPath(Y))return!A&&W.isScalar(this.contents)?this.contents.value:this.contents;return W.isCollection(this.contents)?this.contents.getIn(Y,A):void 0}has(Y){return W.isCollection(this.contents)?this.contents.has(Y):!1}hasIn(Y){if(z.isEmptyPath(Y))return this.contents!==void 0;return W.isCollection(this.contents)?this.contents.hasIn(Y):!1}set(Y,A){if(this.contents==null)this.contents=z.collectionFromPath(this.schema,[Y],A);else if(J(this.contents))this.contents.set(Y,A)}setIn(Y,A){if(z.isEmptyPath(Y))this.contents=A;else if(this.contents==null)this.contents=z.collectionFromPath(this.schema,Array.from(Y),A);else if(J(this.contents))this.contents.setIn(Y,A)}setSchema(Y,A={}){if(typeof Y==="number")Y=String(Y);let M;switch(Y){case"1.1":if(this.directives)this.directives.yaml.version="1.1";else this.directives=new $.Directives({version:"1.1"});M={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":if(this.directives)this.directives.yaml.version=Y;else this.directives=new $.Directives({version:Y});M={resolveKnownTags:!0,schema:"core"};break;case null:if(this.directives)delete this.directives;M=null;break;default:{let D=JSON.stringify(Y);throw Error(`Expected '1.1', '1.2' or null as first argument, but found: ${D}`)}}if(A.schema instanceof Object)this.schema=A.schema;else if(M)this.schema=new B.Schema(Object.assign(M,A));else throw Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:Y,jsonArg:A,mapAsMap:M,maxAliasCount:D,onAnchor:L,reviver:F}={}){let R={anchors:new Map,doc:this,keep:!Y,mapAsMap:M===!0,mapKeyWarned:!1,maxAliasCount:typeof D==="number"?D:100},N=q.toJS(this.contents,A??"",R);if(typeof L==="function")for(let{count:K,res:E}of R.anchors.values())L(E,K);return typeof F==="function"?H.applyReviver(F,{"":N},"",N):N}toJSON(Y,A){return this.toJS({json:!0,jsonArg:Y,mapAsMap:!1,onAnchor:A})}toString(Y={}){if(this.errors.length>0)throw Error("Document with errors cannot be stringified");if("indent"in Y&&(!Number.isInteger(Y.indent)||Number(Y.indent)<=0)){let A=JSON.stringify(Y.indent);throw Error(`"indent" option must be a positive integer, not ${A}`)}return U.stringifyDocument(this,Y)}}function J(Y){if(W.isCollection(Y))return!0;throw Error("Expected a YAML collection as document contents")}Z.Document=Q}),tZ=w((Z)=>{class X extends Error{constructor(q,B,U,G){super();this.name=q,this.code=U,this.message=G,this.pos=B}}class z extends X{constructor(q,B,U){super("YAMLParseError",q,B,U)}}class W extends X{constructor(q,B,U){super("YAMLWarning",q,B,U)}}var _=(q,B)=>(U)=>{if(U.pos[0]===-1)return;U.linePos=U.pos.map((Q)=>B.linePos(Q));let{line:G,col:H}=U.linePos[0];U.message+=` at line ${G}, column ${H}`;let V=H-1,$=q.substring(B.lineStarts[G-1],B.lineStarts[G]).replace(/[\n\r]+$/,"");if(V>=60&&$.length>80){let Q=Math.min(V-39,$.length-79);$="…"+$.substring(Q),V-=Q-1}if($.length>80)$=$.substring(0,79)+"…";if(G>1&&/^ *$/.test($.substring(0,V))){let Q=q.substring(B.lineStarts[G-2],B.lineStarts[G-1]);if(Q.length>80)Q=Q.substring(0,79)+`…
`;$=Q+$}if(/[^ ]/.test($)){let Q=1,J=U.linePos[1];if(J?.line===G&&J.col>H)Q=Math.max(1,Math.min(J.col-H,80-V));let Y=" ".repeat(V)+"^".repeat(Q);U.message+=`:

${$}
${Y}
`}};Z.YAMLError=X,Z.YAMLParseError=z,Z.YAMLWarning=W,Z.prettifyError=_}),eZ=w((Z)=>{function X(z,{flow:W,indicator:_,next:q,offset:B,onError:U,parentIndent:G,startOnNewline:H}){let V=!1,$=H,Q=H,J="",Y="",A=!1,M=!1,D=null,L=null,F=null,R=null,N=null,K=null,E=null;for(let C of z){if(M){if(C.type!=="space"&&C.type!=="newline"&&C.type!=="comma")U(C.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space");M=!1}if(D){if($&&C.type!=="comment"&&C.type!=="newline")U(D,"TAB_AS_INDENT","Tabs are not allowed as indentation");D=null}switch(C.type){case"space":if(!W&&(_!=="doc-start"||q?.type!=="flow-collection")&&C.source.includes("\t"))D=C;Q=!0;break;case"comment":{if(!Q)U(C,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let k=C.source.substring(1)||" ";if(!J)J=k;else J+=Y+k;Y="",$=!1;break}case"newline":if($){if(J)J+=C.source;else if(!K||_!=="seq-item-ind")V=!0}else Y+=C.source;if($=!0,A=!0,L||F)R=C;Q=!0;break;case"anchor":if(L)U(C,"MULTIPLE_ANCHORS","A node can have at most one anchor");if(C.source.endsWith(":"))U(C.offset+C.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0);L=C,E??(E=C.offset),$=!1,Q=!1,M=!0;break;case"tag":{if(F)U(C,"MULTIPLE_TAGS","A node can have at most one tag");F=C,E??(E=C.offset),$=!1,Q=!1,M=!0;break}case _:if(L||F)U(C,"BAD_PROP_ORDER",`Anchors and tags must be after the ${C.source} indicator`);if(K)U(C,"UNEXPECTED_TOKEN",`Unexpected ${C.source} in ${W??"collection"}`);K=C,$=_==="seq-item-ind"||_==="explicit-key-ind",Q=!1;break;case"comma":if(W){if(N)U(C,"UNEXPECTED_TOKEN",`Unexpected , in ${W}`);N=C,$=!1,Q=!1;break}default:U(C,"UNEXPECTED_TOKEN",`Unexpected ${C.type} token`),$=!1,Q=!1}}let T=z[z.length-1],P=T?T.offset+T.source.length:B;if(M&&q&&q.type!=="space"&&q.type!=="newline"&&q.type!=="comma"&&(q.type!=="scalar"||q.source!==""))U(q.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space");if(D&&($&&D.indent<=G||q?.type==="block-map"||q?.type==="block-seq"))U(D,"TAB_AS_INDENT","Tabs are not allowed as indentation");return{comma:N,found:K,spaceBefore:V,comment:J,hasNewline:A,anchor:L,tag:F,newlineAfterProp:R,end:P,start:E??P}}Z.resolveProps=X}),i6=w((Z)=>{function X(z){if(!z)return null;switch(z.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(z.source.includes(`
`))return!0;if(z.end){for(let W of z.end)if(W.type==="newline")return!0}return!1;case"flow-collection":for(let W of z.items){for(let _ of W.start)if(_.type==="newline")return!0;if(W.sep){for(let _ of W.sep)if(_.type==="newline")return!0}if(X(W.key)||X(W.value))return!0}return!1;default:return!0}}Z.containsNewline=X}),z7=w((Z)=>{var X=i6();function z(W,_,q){if(_?.type==="flow-collection"){let B=_.end[0];if(B.indent===W&&(B.source==="]"||B.source==="}")&&X.containsNewline(_))q(B,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}Z.flowIndentCheck=z}),$7=w((Z)=>{var X=m();function z(W,_,q){let{uniqueKeys:B}=W.options;if(B===!1)return!1;let U=typeof B==="function"?B:(G,H)=>G===H||X.isScalar(G)&&X.isScalar(H)&&G.value===H.value;return _.some((G)=>U(G.key,q))}Z.mapIncludes=z}),w4=w((Z)=>{var X=T8(),z=P8(),W=eZ(),_=i6(),q=z7(),B=$7(),U="All mapping items must start at the same column";function G({composeNode:H,composeEmptyNode:V},$,Q,J,Y){let M=new(Y?.nodeClass??z.YAMLMap)($.schema);if($.atRoot)$.atRoot=!1;let D=Q.offset,L=null;for(let F of Q.items){let{start:R,key:N,sep:K,value:E}=F,T=W.resolveProps(R,{indicator:"explicit-key-ind",next:N??K?.[0],offset:D,onError:J,parentIndent:Q.indent,startOnNewline:!0}),P=!T.found;if(P){if(N){if(N.type==="block-seq")J(D,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key");else if("indent"in N&&N.indent!==Q.indent)J(D,"BAD_INDENT",U)}if(!T.anchor&&!T.tag&&!K){if(L=T.end,T.comment)if(M.comment)M.comment+=`
`+T.comment;else M.comment=T.comment;continue}if(T.newlineAfterProp||_.containsNewline(N))J(N??R[R.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else if(T.found?.indent!==Q.indent)J(D,"BAD_INDENT",U);$.atKey=!0;let C=T.end,k=N?H($,N,T,J):V($,C,R,null,T,J);if($.schema.compat)q.flowIndentCheck(Q.indent,N,J);if($.atKey=!1,B.mapIncludes($,M.items,k))J(C,"DUPLICATE_KEY","Map keys must be unique");let b=W.resolveProps(K??[],{indicator:"map-value-ind",next:E,offset:k.range[2],onError:J,parentIndent:Q.indent,startOnNewline:!N||N.type==="block-scalar"});if(D=b.end,b.found){if(P){if(E?.type==="block-map"&&!b.hasNewline)J(D,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings");if($.options.strict&&T.start<b.found.offset-1024)J(k.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key")}let p=E?H($,E,b,J):V($,D,K,null,b,J);if($.schema.compat)q.flowIndentCheck(Q.indent,E,J);D=p.range[2];let B0=new X.Pair(k,p);if($.options.keepSourceTokens)B0.srcToken=F;M.items.push(B0)}else{if(P)J(k.range,"MISSING_CHAR","Implicit map keys need to be followed by map values");if(b.comment)if(k.comment)k.comment+=`
`+b.comment;else k.comment=b.comment;let p=new X.Pair(k);if($.options.keepSourceTokens)p.srcToken=F;M.items.push(p)}}if(L&&L<D)J(L,"IMPOSSIBLE","Map comment with trailing content");return M.range=[Q.offset,D,L??D],M}Z.resolveBlockMap=G}),k4=w((Z)=>{var X=w8(),z=eZ(),W=z7();function _({composeNode:q,composeEmptyNode:B},U,G,H,V){let Q=new(V?.nodeClass??X.YAMLSeq)(U.schema);if(U.atRoot)U.atRoot=!1;if(U.atKey)U.atKey=!1;let J=G.offset,Y=null;for(let{start:A,value:M}of G.items){let D=z.resolveProps(A,{indicator:"seq-item-ind",next:M,offset:J,onError:H,parentIndent:G.indent,startOnNewline:!0});if(!D.found)if(D.anchor||D.tag||M)if(M?.type==="block-seq")H(D.end,"BAD_INDENT","All sequence items must start at the same column");else H(J,"MISSING_CHAR","Sequence item without - indicator");else{if(Y=D.end,D.comment)Q.comment=D.comment;continue}let L=M?q(U,M,D,H):B(U,D.end,A,null,D,H);if(U.schema.compat)W.flowIndentCheck(G.indent,M,H);J=L.range[2],Q.items.push(L)}return Q.range=[G.offset,J,Y??J],Q}Z.resolveBlockSeq=_}),FZ=w((Z)=>{function X(z,W,_,q){let B="";if(z){let U=!1,G="";for(let H of z){let{source:V,type:$}=H;switch($){case"space":U=!0;break;case"comment":{if(_&&!U)q(H,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let Q=V.substring(1)||" ";if(!B)B=Q;else B+=G+Q;G="";break}case"newline":if(B)G+=V;U=!0;break;default:q(H,"UNEXPECTED_TOKEN",`Unexpected ${$} at node end`)}W+=V.length}}return{comment:B,offset:W}}Z.resolveEnd=X}),b4=w((Z)=>{var X=m(),z=T8(),W=P8(),_=w8(),q=FZ(),B=eZ(),U=i6(),G=$7(),H="Block collections are not allowed within flow collections",V=(Q)=>Q&&(Q.type==="block-map"||Q.type==="block-seq");function $({composeNode:Q,composeEmptyNode:J},Y,A,M,D){let L=A.start.source==="{",F=L?"flow map":"flow sequence",N=new(D?.nodeClass??(L?W.YAMLMap:_.YAMLSeq))(Y.schema);N.flow=!0;let K=Y.atRoot;if(K)Y.atRoot=!1;if(Y.atKey)Y.atKey=!1;let E=A.offset+A.start.source.length;for(let b=0;b<A.items.length;++b){let p=A.items[b],{start:B0,key:$0,sep:p0,value:U0}=p,f=B.resolveProps(B0,{flow:F,indicator:"explicit-key-ind",next:$0??p0?.[0],offset:E,onError:M,parentIndent:A.indent,startOnNewline:!1});if(!f.found){if(!f.anchor&&!f.tag&&!p0&&!U0){if(b===0&&f.comma)M(f.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${F}`);else if(b<A.items.length-1)M(f.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${F}`);if(f.comment)if(N.comment)N.comment+=`
`+f.comment;else N.comment=f.comment;E=f.end;continue}if(!L&&Y.options.strict&&U.containsNewline($0))M($0,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(b===0){if(f.comma)M(f.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${F}`)}else{if(!f.comma)M(f.start,"MISSING_CHAR",`Missing , between ${F} items`);if(f.comment){let K0="";Z:for(let Z0 of B0)switch(Z0.type){case"comma":case"space":break;case"comment":K0=Z0.source.substring(1);break Z;default:break Z}if(K0){let Z0=N.items[N.items.length-1];if(X.isPair(Z0))Z0=Z0.value??Z0.key;if(Z0.comment)Z0.comment+=`
`+K0;else Z0.comment=K0;f.comment=f.comment.substring(K0.length+1)}}}if(!L&&!p0&&!f.found){let K0=U0?Q(Y,U0,f,M):J(Y,f.end,p0,null,f,M);if(N.items.push(K0),E=K0.range[2],V(U0))M(K0.range,"BLOCK_IN_FLOW",H)}else{Y.atKey=!0;let K0=f.end,Z0=$0?Q(Y,$0,f,M):J(Y,K0,B0,null,f,M);if(V($0))M(Z0.range,"BLOCK_IN_FLOW",H);Y.atKey=!1;let R0=B.resolveProps(p0??[],{flow:F,indicator:"map-value-ind",next:U0,offset:Z0.range[2],onError:M,parentIndent:A.indent,startOnNewline:!1});if(R0.found){if(!L&&!f.found&&Y.options.strict){if(p0)for(let l0 of p0){if(l0===R0.found)break;if(l0.type==="newline"){M(l0,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}if(f.start<R0.found.offset-1024)M(R0.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else if(U0)if("source"in U0&&U0.source?.[0]===":")M(U0,"MISSING_CHAR",`Missing space after : in ${F}`);else M(R0.start,"MISSING_CHAR",`Missing , or : between ${F} items`);let d8=U0?Q(Y,U0,R0,M):R0.found?J(Y,R0.end,p0,null,R0,M):null;if(d8){if(V(U0))M(d8.range,"BLOCK_IN_FLOW",H)}else if(R0.comment)if(Z0.comment)Z0.comment+=`
`+R0.comment;else Z0.comment=R0.comment;let w6=new z.Pair(Z0,d8);if(Y.options.keepSourceTokens)w6.srcToken=p;if(L){let l0=N;if(G.mapIncludes(Y,l0.items,Z0))M(K0,"DUPLICATE_KEY","Map keys must be unique");l0.items.push(w6)}else{let l0=new W.YAMLMap(Y.schema);l0.flow=!0,l0.items.push(w6);let P5=(d8??Z0).range;l0.range=[Z0.range[0],P5[1],P5[2]],N.items.push(l0)}E=d8?d8.range[2]:R0.end}}let T=L?"}":"]",[P,...C]=A.end,k=E;if(P?.source===T)k=P.offset+P.source.length;else{let b=F[0].toUpperCase()+F.substring(1),p=K?`${b} must end with a ${T}`:`${b} in block collection must be sufficiently indented and end with a ${T}`;if(M(E,K?"MISSING_CHAR":"BAD_INDENT",p),P&&P.source.length!==1)C.unshift(P)}if(C.length>0){let b=q.resolveEnd(C,k,Y.options.strict,M);if(b.comment)if(N.comment)N.comment+=`
`+b.comment;else N.comment=b.comment;N.range=[A.offset,k,b.offset]}else N.range=[A.offset,k,k];return N}Z.resolveFlowCollection=$}),f4=w((Z)=>{var X=m(),z=G0(),W=P8(),_=w8(),q=w4(),B=k4(),U=b4();function G(V,$,Q,J,Y,A){let M=Q.type==="block-map"?q.resolveBlockMap(V,$,Q,J,A):Q.type==="block-seq"?B.resolveBlockSeq(V,$,Q,J,A):U.resolveFlowCollection(V,$,Q,J,A),D=M.constructor;if(Y==="!"||Y===D.tagName)return M.tag=D.tagName,M;if(Y)M.tag=Y;return M}function H(V,$,Q,J,Y){let A=J.tag,M=!A?null:$.directives.tagName(A.source,(K)=>Y(A,"TAG_RESOLVE_FAILED",K));if(Q.type==="block-seq"){let{anchor:K,newlineAfterProp:E}=J,T=K&&A?K.offset>A.offset?K:A:K??A;if(T&&(!E||E.offset<T.offset))Y(T,"MISSING_CHAR","Missing newline after block sequence props")}let D=Q.type==="block-map"?"map":Q.type==="block-seq"?"seq":Q.start.source==="{"?"map":"seq";if(!A||!M||M==="!"||M===W.YAMLMap.tagName&&D==="map"||M===_.YAMLSeq.tagName&&D==="seq")return G(V,$,Q,Y,M);let L=$.schema.tags.find((K)=>K.tag===M&&K.collection===D);if(!L){let K=$.schema.knownTags[M];if(K?.collection===D)$.schema.tags.push(Object.assign({},K,{default:!1})),L=K;else{if(K)Y(A,"BAD_COLLECTION_TYPE",`${K.tag} used for ${D} collection, but expects ${K.collection??"scalar"}`,!0);else Y(A,"TAG_RESOLVE_FAILED",`Unresolved tag: ${M}`,!0);return G(V,$,Q,Y,M)}}let F=G(V,$,Q,Y,M,L),R=L.resolve?.(F,(K)=>Y(A,"TAG_RESOLVE_FAILED",K),$.options)??F,N=X.isNode(R)?R:new z.Scalar(R);if(N.range=F.range,N.tag=M,L?.format)N.format=L.format;return N}Z.composeCollection=H}),Q7=w((Z)=>{var X=G0();function z(q,B,U){let G=B.offset,H=W(B,q.options.strict,U);if(!H)return{value:"",type:null,comment:"",range:[G,G,G]};let V=H.mode===">"?X.Scalar.BLOCK_FOLDED:X.Scalar.BLOCK_LITERAL,$=B.source?_(B.source):[],Q=$.length;for(let R=$.length-1;R>=0;--R){let N=$[R][1];if(N===""||N==="\r")Q=R;else break}if(Q===0){let R=H.chomp==="+"&&$.length>0?`
`.repeat(Math.max(1,$.length-1)):"",N=G+H.length;if(B.source)N+=B.source.length;return{value:R,type:V,comment:H.comment,range:[G,N,N]}}let J=B.indent+H.indent,Y=B.offset+H.length,A=0;for(let R=0;R<Q;++R){let[N,K]=$[R];if(K===""||K==="\r"){if(H.indent===0&&N.length>J)J=N.length}else{if(N.length<J)U(Y+N.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator");if(H.indent===0)J=N.length;if(A=R,J===0&&!q.atRoot)U(Y,"BAD_INDENT","Block scalar values in collections must be indented");break}Y+=N.length+K.length+1}for(let R=$.length-1;R>=Q;--R)if($[R][0].length>J)Q=R+1;let M="",D="",L=!1;for(let R=0;R<A;++R)M+=$[R][0].slice(J)+`
`;for(let R=A;R<Q;++R){let[N,K]=$[R];Y+=N.length+K.length+1;let E=K[K.length-1]==="\r";if(E)K=K.slice(0,-1);if(K&&N.length<J){let P=`Block scalar lines must not be less indented than their ${H.indent?"explicit indentation indicator":"first line"}`;U(Y-K.length-(E?2:1),"BAD_INDENT",P),N=""}if(V===X.Scalar.BLOCK_LITERAL)M+=D+N.slice(J)+K,D=`
`;else if(N.length>J||K[0]==="\t"){if(D===" ")D=`
`;else if(!L&&D===`
`)D=`

`;M+=D+N.slice(J)+K,D=`
`,L=!0}else if(K==="")if(D===`
`)M+=`
`;else D=`
`;else M+=D+K,D=" ",L=!1}switch(H.chomp){case"-":break;case"+":for(let R=Q;R<$.length;++R)M+=`
`+$[R][0].slice(J);if(M[M.length-1]!==`
`)M+=`
`;break;default:M+=`
`}let F=G+H.length+B.source.length;return{value:M,type:V,comment:H.comment,range:[G,F,F]}}function W({offset:q,props:B},U,G){if(B[0].type!=="block-scalar-header")return G(B[0],"IMPOSSIBLE","Block scalar header not found"),null;let{source:H}=B[0],V=H[0],$=0,Q="",J=-1;for(let D=1;D<H.length;++D){let L=H[D];if(!Q&&(L==="-"||L==="+"))Q=L;else{let F=Number(L);if(!$&&F)$=F;else if(J===-1)J=q+D}}if(J!==-1)G(J,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${H}`);let Y=!1,A="",M=H.length;for(let D=1;D<B.length;++D){let L=B[D];switch(L.type){case"space":Y=!0;case"newline":M+=L.source.length;break;case"comment":if(U&&!Y)G(L,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");M+=L.source.length,A=L.source.substring(1);break;case"error":G(L,"UNEXPECTED_TOKEN",L.message),M+=L.source.length;break;default:{let F=`Unexpected token in block scalar header: ${L.type}`;G(L,"UNEXPECTED_TOKEN",F);let R=L.source;if(R&&typeof R==="string")M+=R.length}}}return{mode:V,indent:$,chomp:Q,comment:A,length:M}}function _(q){let B=q.split(/\n( *)/),U=B[0],G=U.match(/^( *)/),V=[G?.[1]?[G[1],U.slice(G[1].length)]:["",U]];for(let $=1;$<B.length;$+=2)V.push([B[$],B[$+1]]);return V}Z.resolveBlockScalar=z}),W7=w((Z)=>{var X=G0(),z=FZ();function W($,Q,J){let{offset:Y,type:A,source:M,end:D}=$,L,F,R=(E,T,P)=>J(Y+E,T,P);switch(A){case"scalar":L=X.Scalar.PLAIN,F=_(M,R);break;case"single-quoted-scalar":L=X.Scalar.QUOTE_SINGLE,F=q(M,R);break;case"double-quoted-scalar":L=X.Scalar.QUOTE_DOUBLE,F=U(M,R);break;default:return J($,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${A}`),{value:"",type:null,comment:"",range:[Y,Y+M.length,Y+M.length]}}let N=Y+M.length,K=z.resolveEnd(D,N,Q,J);return{value:F,type:L,comment:K.comment,range:[Y,N,K.offset]}}function _($,Q){let J="";switch($[0]){case"\t":J="a tab character";break;case",":J="flow indicator character ,";break;case"%":J="directive indicator character %";break;case"|":case">":{J=`block scalar indicator ${$[0]}`;break}case"@":case"`":{J=`reserved character ${$[0]}`;break}}if(J)Q(0,"BAD_SCALAR_START",`Plain value cannot start with ${J}`);return B($)}function q($,Q){if($[$.length-1]!=="'"||$.length===1)Q($.length,"MISSING_CHAR","Missing closing 'quote");return B($.slice(1,-1)).replace(/''/g,"'")}function B($){let Q,J;try{Q=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),J=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{Q=/(.*?)[ \t]*\r?\n/sy,J=/[ \t]*(.*?)[ \t]*\r?\n/sy}let Y=Q.exec($);if(!Y)return $;let A=Y[1],M=" ",D=Q.lastIndex;J.lastIndex=D;while(Y=J.exec($)){if(Y[1]==="")if(M===`
`)A+=M;else M=`
`;else A+=M+Y[1],M=" ";D=J.lastIndex}let L=/[ \t]*(.*)/sy;return L.lastIndex=D,Y=L.exec($),A+M+(Y?.[1]??"")}function U($,Q){let J="";for(let Y=1;Y<$.length-1;++Y){let A=$[Y];if(A==="\r"&&$[Y+1]===`
`)continue;if(A===`
`){let{fold:M,offset:D}=G($,Y);J+=M,Y=D}else if(A==="\\"){let M=$[++Y],D=H[M];if(D)J+=D;else if(M===`
`){M=$[Y+1];while(M===" "||M==="\t")M=$[++Y+1]}else if(M==="\r"&&$[Y+1]===`
`){M=$[++Y+1];while(M===" "||M==="\t")M=$[++Y+1]}else if(M==="x"||M==="u"||M==="U"){let L={x:2,u:4,U:8}[M];J+=V($,Y+1,L,Q),Y+=L}else{let L=$.substr(Y-1,2);Q(Y-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${L}`),J+=L}}else if(A===" "||A==="\t"){let M=Y,D=$[Y+1];while(D===" "||D==="\t")D=$[++Y+1];if(D!==`
`&&!(D==="\r"&&$[Y+2]===`
`))J+=Y>M?$.slice(M,Y+1):A}else J+=A}if($[$.length-1]!=='"'||$.length===1)Q($.length,"MISSING_CHAR",'Missing closing "quote');return J}function G($,Q){let J="",Y=$[Q+1];while(Y===" "||Y==="\t"||Y===`
`||Y==="\r"){if(Y==="\r"&&$[Q+2]!==`
`)break;if(Y===`
`)J+=`
`;Q+=1,Y=$[Q+1]}if(!J)J=" ";return{fold:J,offset:Q}}var H={"0":"\x00",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"\t",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","\t":"\t"};function V($,Q,J,Y){let A=$.substr(Q,J),D=A.length===J&&/^[0-9a-fA-F]+$/.test(A)?parseInt(A,16):NaN;if(isNaN(D)){let L=$.substr(Q-2,J+2);return Y(Q-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${L}`),L}return String.fromCodePoint(D)}Z.resolveFlowScalar=W}),x4=w((Z)=>{var X=m(),z=G0(),W=Q7(),_=W7();function q(G,H,V,$){let{value:Q,type:J,comment:Y,range:A}=H.type==="block-scalar"?W.resolveBlockScalar(G,H,$):_.resolveFlowScalar(H,G.options.strict,$),M=V?G.directives.tagName(V.source,(F)=>$(V,"TAG_RESOLVE_FAILED",F)):null,D;if(G.options.stringKeys&&G.atKey)D=G.schema[X.SCALAR];else if(M)D=B(G.schema,Q,M,V,$);else if(H.type==="scalar")D=U(G,Q,H,$);else D=G.schema[X.SCALAR];let L;try{let F=D.resolve(Q,(R)=>$(V??H,"TAG_RESOLVE_FAILED",R),G.options);L=X.isScalar(F)?F:new z.Scalar(F)}catch(F){let R=F instanceof Error?F.message:String(F);$(V??H,"TAG_RESOLVE_FAILED",R),L=new z.Scalar(Q)}if(L.range=A,L.source=Q,J)L.type=J;if(M)L.tag=M;if(D.format)L.format=D.format;if(Y)L.comment=Y;return L}function B(G,H,V,$,Q){if(V==="!")return G[X.SCALAR];let J=[];for(let A of G.tags)if(!A.collection&&A.tag===V)if(A.default&&A.test)J.push(A);else return A;for(let A of J)if(A.test?.test(H))return A;let Y=G.knownTags[V];if(Y&&!Y.collection)return G.tags.push(Object.assign({},Y,{default:!1,test:void 0})),Y;return Q($,"TAG_RESOLVE_FAILED",`Unresolved tag: ${V}`,V!=="tag:yaml.org,2002:str"),G[X.SCALAR]}function U({atKey:G,directives:H,schema:V},$,Q,J){let Y=V.tags.find((A)=>(A.default===!0||G&&A.default==="key")&&A.test?.test($))||V[X.SCALAR];if(V.compat){let A=V.compat.find((M)=>M.default&&M.test?.test($))??V[X.SCALAR];if(Y.tag!==A.tag){let M=H.tagString(Y.tag),D=H.tagString(A.tag),L=`Value may be parsed as either ${M} or ${D}`;J(Q,"TAG_RESOLVE_FAILED",L,!0)}}return Y}Z.composeScalar=q}),g4=w((Z)=>{function X(z,W,_){if(W){_??(_=W.length);for(let q=_-1;q>=0;--q){let B=W[q];switch(B.type){case"space":case"comment":case"newline":z-=B.source.length;continue}B=W[++q];while(B?.type==="space")z+=B.source.length,B=W[++q];break}}return z}Z.emptyScalarPosition=X}),h4=w((Z)=>{var X=lZ(),z=m(),W=f4(),_=x4(),q=FZ(),B=g4(),U={composeNode:G,composeEmptyNode:H};function G($,Q,J,Y){let A=$.atKey,{spaceBefore:M,comment:D,anchor:L,tag:F}=J,R,N=!0;switch(Q.type){case"alias":if(R=V($,Q,Y),L||F)Y(Q,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":if(R=_.composeScalar($,Q,F,Y),L)R.anchor=L.source.substring(1);break;case"block-map":case"block-seq":case"flow-collection":try{if(R=W.composeCollection(U,$,Q,J,Y),L)R.anchor=L.source.substring(1)}catch(K){let E=K instanceof Error?K.message:String(K);Y(Q,"RESOURCE_EXHAUSTION",E)}break;default:{let K=Q.type==="error"?Q.message:`Unsupported token (type: ${Q.type})`;Y(Q,"UNEXPECTED_TOKEN",K),N=!1}}if(R??(R=H($,Q.offset,void 0,null,J,Y)),L&&R.anchor==="")Y(L,"BAD_ALIAS","Anchor cannot be an empty string");if(A&&$.options.stringKeys&&(!z.isScalar(R)||typeof R.value!=="string"||R.tag&&R.tag!=="tag:yaml.org,2002:str"))Y(F??Q,"NON_STRING_KEY","With stringKeys, all keys must be strings");if(M)R.spaceBefore=!0;if(D)if(Q.type==="scalar"&&Q.source==="")R.comment=D;else R.commentBefore=D;if($.options.keepSourceTokens&&N)R.srcToken=Q;return R}function H($,Q,J,Y,{spaceBefore:A,comment:M,anchor:D,tag:L,end:F},R){let N={type:"scalar",offset:B.emptyScalarPosition(Q,J,Y),indent:-1,source:""},K=_.composeScalar($,N,L,R);if(D){if(K.anchor=D.source.substring(1),K.anchor==="")R(D,"BAD_ALIAS","Anchor cannot be an empty string")}if(A)K.spaceBefore=!0;if(M)K.comment=M,K.range[2]=F;return K}function V({options:$},{offset:Q,source:J,end:Y},A){let M=new X.Alias(J.substring(1));if(M.source==="")A(Q,"BAD_ALIAS","Alias cannot be an empty string");if(M.source.endsWith(":"))A(Q+J.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);let D=Q+J.length,L=q.resolveEnd(Y,D,$.strict,A);if(M.range=[Q,D,L.offset],L.comment)M.comment=L.comment;return M}Z.composeEmptyNode=H,Z.composeNode=G}),v4=w((Z)=>{var X=rZ(),z=h4(),W=FZ(),_=eZ();function q(B,U,{offset:G,start:H,value:V,end:$},Q){let J=Object.assign({_directives:U},B),Y=new X.Document(void 0,J),A={atKey:!1,atRoot:!0,directives:Y.directives,options:Y.options,schema:Y.schema},M=_.resolveProps(H,{indicator:"doc-start",next:V??$?.[0],offset:G,onError:Q,parentIndent:0,startOnNewline:!0});if(M.found){if(Y.directives.docStart=!0,V&&(V.type==="block-map"||V.type==="block-seq")&&!M.hasNewline)Q(M.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")}Y.contents=V?z.composeNode(A,V,M,Q):z.composeEmptyNode(A,M.end,H,null,M,Q);let D=Y.contents.range[2],L=W.resolveEnd($,D,!1,Q);if(L.comment)Y.comment=L.comment;return Y.range=[G,D,L.offset],Y}Z.composeDoc=q}),H7=w((Z)=>{var X=cZ("process"),z=c5(),W=rZ(),_=tZ(),q=m(),B=v4(),U=FZ();function G($){if(typeof $==="number")return[$,$+1];if(Array.isArray($))return $.length===2?$:[$[0],$[1]];let{offset:Q,source:J}=$;return[Q,Q+(typeof J==="string"?J.length:1)]}function H($){let Q="",J=!1,Y=!1;for(let A=0;A<$.length;++A){let M=$[A];switch(M[0]){case"#":Q+=(Q===""?"":Y?`

`:`
`)+(M.substring(1)||" "),J=!0,Y=!1;break;case"%":if($[A+1]?.[0]!=="#")A+=1;J=!1;break;default:if(!J)Y=!0;J=!1}}return{comment:Q,afterEmptyLine:Y}}class V{constructor($={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(Q,J,Y,A)=>{let M=G(Q);if(A)this.warnings.push(new _.YAMLWarning(M,J,Y));else this.errors.push(new _.YAMLParseError(M,J,Y))},this.directives=new z.Directives({version:$.version||"1.2"}),this.options=$}decorate($,Q){let{comment:J,afterEmptyLine:Y}=H(this.prelude);if(J){let A=$.contents;if(Q)$.comment=$.comment?`${$.comment}
${J}`:J;else if(Y||$.directives.docStart||!A)$.commentBefore=J;else if(q.isCollection(A)&&!A.flow&&A.items.length>0){let M=A.items[0];if(q.isPair(M))M=M.key;let D=M.commentBefore;M.commentBefore=D?`${J}
${D}`:J}else{let M=A.commentBefore;A.commentBefore=M?`${J}
${M}`:J}}if(Q)Array.prototype.push.apply($.errors,this.errors),Array.prototype.push.apply($.warnings,this.warnings);else $.errors=this.errors,$.warnings=this.warnings;this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:H(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose($,Q=!1,J=-1){for(let Y of $)yield*this.next(Y);yield*this.end(Q,J)}*next($){if(X.env.LOG_STREAM)console.dir($,{depth:null});switch($.type){case"directive":this.directives.add($.source,(Q,J,Y)=>{let A=G($);A[0]+=Q,this.onError(A,"BAD_DIRECTIVE",J,Y)}),this.prelude.push($.source),this.atDirectives=!0;break;case"document":{let Q=B.composeDoc(this.options,this.directives,$,this.onError);if(this.atDirectives&&!Q.directives.docStart)this.onError($,"MISSING_CHAR","Missing directives-end/doc-start indicator line");if(this.decorate(Q,!1),this.doc)yield this.doc;this.doc=Q,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push($.source);break;case"error":{let Q=$.source?`${$.message}: ${JSON.stringify($.source)}`:$.message,J=new _.YAMLParseError(G($),"UNEXPECTED_TOKEN",Q);if(this.atDirectives||!this.doc)this.errors.push(J);else this.doc.errors.push(J);break}case"doc-end":{if(!this.doc){this.errors.push(new _.YAMLParseError(G($),"UNEXPECTED_TOKEN","Unexpected doc-end without preceding document"));break}this.doc.directives.docEnd=!0;let Q=U.resolveEnd($.end,$.offset+$.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),Q.comment){let J=this.doc.comment;this.doc.comment=J?`${J}
${Q.comment}`:Q.comment}this.doc.range[2]=Q.offset;break}default:this.errors.push(new _.YAMLParseError(G($),"UNEXPECTED_TOKEN",`Unsupported token ${$.type}`))}}*end($=!1,Q=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if($){let J=Object.assign({_directives:this.directives},this.options),Y=new W.Document(void 0,J);if(this.atDirectives)this.onError(Q,"MISSING_CHAR","Missing directives-end indicator line");Y.range=[0,Q,Q],this.decorate(Y,!1),yield Y}}}Z.Composer=V}),y4=w((Z)=>{var X=Q7(),z=W7(),W=tZ(),_=oZ();function q($,Q=!0,J){if($){let Y=(A,M,D)=>{let L=typeof A==="number"?A:Array.isArray(A)?A[0]:A.offset;if(J)J(L,M,D);else throw new W.YAMLParseError([L,L+1],M,D)};switch($.type){case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return z.resolveFlowScalar($,Q,Y);case"block-scalar":return X.resolveBlockScalar({options:{strict:Q}},$,Y)}}return null}function B($,Q){let{implicitKey:J=!1,indent:Y,inFlow:A=!1,offset:M=-1,type:D="PLAIN"}=Q,L=_.stringifyString({type:D,value:$},{implicitKey:J,indent:Y>0?" ".repeat(Y):"",inFlow:A,options:{blockQuote:!0,lineWidth:-1}}),F=Q.end??[{type:"newline",offset:-1,indent:Y,source:`
`}];switch(L[0]){case"|":case">":{let R=L.indexOf(`
`),N=L.substring(0,R),K=L.substring(R+1)+`
`,E=[{type:"block-scalar-header",offset:M,indent:Y,source:N}];if(!H(E,F))E.push({type:"newline",offset:-1,indent:Y,source:`
`});return{type:"block-scalar",offset:M,indent:Y,props:E,source:K}}case'"':return{type:"double-quoted-scalar",offset:M,indent:Y,source:L,end:F};case"'":return{type:"single-quoted-scalar",offset:M,indent:Y,source:L,end:F};default:return{type:"scalar",offset:M,indent:Y,source:L,end:F}}}function U($,Q,J={}){let{afterKey:Y=!1,implicitKey:A=!1,inFlow:M=!1,type:D}=J,L="indent"in $?$.indent:null;if(Y&&typeof L==="number")L+=2;if(!D)switch($.type){case"single-quoted-scalar":D="QUOTE_SINGLE";break;case"double-quoted-scalar":D="QUOTE_DOUBLE";break;case"block-scalar":{let R=$.props[0];if(R.type!=="block-scalar-header")throw Error("Invalid block scalar header");D=R.source[0]===">"?"BLOCK_FOLDED":"BLOCK_LITERAL";break}default:D="PLAIN"}let F=_.stringifyString({type:D,value:Q},{implicitKey:A||L===null,indent:L!==null&&L>0?" ".repeat(L):"",inFlow:M,options:{blockQuote:!0,lineWidth:-1}});switch(F[0]){case"|":case">":G($,F);break;case'"':V($,F,"double-quoted-scalar");break;case"'":V($,F,"single-quoted-scalar");break;default:V($,F,"scalar")}}function G($,Q){let J=Q.indexOf(`
`),Y=Q.substring(0,J),A=Q.substring(J+1)+`
`;if($.type==="block-scalar"){let M=$.props[0];if(M.type!=="block-scalar-header")throw Error("Invalid block scalar header");M.source=Y,$.source=A}else{let{offset:M}=$,D="indent"in $?$.indent:-1,L=[{type:"block-scalar-header",offset:M,indent:D,source:Y}];if(!H(L,"end"in $?$.end:void 0))L.push({type:"newline",offset:-1,indent:D,source:`
`});for(let F of Object.keys($))if(F!=="type"&&F!=="offset")delete $[F];Object.assign($,{type:"block-scalar",indent:D,props:L,source:A})}}function H($,Q){if(Q)for(let J of Q)switch(J.type){case"space":case"comment":$.push(J);break;case"newline":return $.push(J),!0}return!1}function V($,Q,J){switch($.type){case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":$.type=J,$.source=Q;break;case"block-scalar":{let Y=$.props.slice(1),A=Q.length;if($.props[0].type==="block-scalar-header")A-=$.props[0].source.length;for(let M of Y)M.offset+=A;delete $.props,Object.assign($,{type:J,source:Q,end:Y});break}case"block-map":case"block-seq":{let A={type:"newline",offset:$.offset+Q.length,indent:$.indent,source:`
`};delete $.items,Object.assign($,{type:J,source:Q,end:[A]});break}default:{let Y="indent"in $?$.indent:-1,A="end"in $&&Array.isArray($.end)?$.end.filter((M)=>M.type==="space"||M.type==="comment"||M.type==="newline"):[];for(let M of Object.keys($))if(M!=="type"&&M!=="offset")delete $[M];Object.assign($,{type:J,indent:Y,source:Q,end:A})}}}Z.createScalarToken=B,Z.resolveAsScalar=q,Z.setScalarValue=U}),m4=w((Z)=>{var X=(_)=>("type"in _)?z(_):W(_);function z(_){switch(_.type){case"block-scalar":{let q="";for(let B of _.props)q+=z(B);return q+_.source}case"block-map":case"block-seq":{let q="";for(let B of _.items)q+=W(B);return q}case"flow-collection":{let q=_.start.source;for(let B of _.items)q+=W(B);for(let B of _.end)q+=B.source;return q}case"document":{let q=W(_);if(_.end)for(let B of _.end)q+=B.source;return q}default:{let q=_.source;if("end"in _&&_.end)for(let B of _.end)q+=B.source;return q}}}function W({start:_,key:q,sep:B,value:U}){let G="";for(let H of _)G+=H.source;if(q)G+=z(q);if(B)for(let H of B)G+=H.source;if(U)G+=z(U);return G}Z.stringify=X}),u4=w((Z)=>{var X=Symbol("break visit"),z=Symbol("skip children"),W=Symbol("remove item");function _(B,U){if("type"in B&&B.type==="document")B={start:B.start,value:B.value};q(Object.freeze([]),B,U)}_.BREAK=X,_.SKIP=z,_.REMOVE=W,_.itemAtPath=(B,U)=>{let G=B;for(let[H,V]of U){let $=G?.[H];if($&&"items"in $)G=$.items[V];else return}return G},_.parentCollection=(B,U)=>{let G=_.itemAtPath(B,U.slice(0,-1)),H=U[U.length-1][0],V=G?.[H];if(V&&"items"in V)return V;throw Error("Parent collection not found")};function q(B,U,G){let H=G(U,B);if(typeof H==="symbol")return H;for(let V of["key","value"]){let $=U[V];if($&&"items"in $){for(let Q=0;Q<$.items.length;++Q){let J=q(Object.freeze(B.concat([[V,Q]])),$.items[Q],G);if(typeof J==="number")Q=J-1;else if(J===X)return X;else if(J===W)$.items.splice(Q,1),Q-=1}if(typeof H==="function"&&V==="key")H=H(U,B)}}return typeof H==="function"?H(U,B):H}Z.visit=_}),o6=w((Z)=>{var X=y4(),z=m4(),W=u4(),_="\uFEFF",q="\x02",B="\x18",U="\x1F",G=(Q)=>!!Q&&("items"in Q),H=(Q)=>!!Q&&(Q.type==="scalar"||Q.type==="single-quoted-scalar"||Q.type==="double-quoted-scalar"||Q.type==="block-scalar");function V(Q){switch(Q){case _:return"<BOM>";case q:return"<DOC>";case B:return"<FLOW_END>";case U:return"<SCALAR>";default:return JSON.stringify(Q)}}function $(Q){switch(Q){case _:return"byte-order-mark";case q:return"doc-mode";case B:return"flow-error-end";case U:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(Q[0]){case" ":case"\t":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}Z.createScalarToken=X.createScalarToken,Z.resolveAsScalar=X.resolveAsScalar,Z.setScalarValue=X.setScalarValue,Z.stringify=z.stringify,Z.visit=W.visit,Z.BOM=_,Z.DOCUMENT=q,Z.FLOW_END=B,Z.SCALAR=U,Z.isCollection=G,Z.isScalar=H,Z.prettyToken=V,Z.tokenType=$}),J7=w((Z)=>{var X=o6();function z(H){switch(H){case void 0:case" ":case`
`:case"\r":case"\t":return!0;default:return!1}}var W=new Set("0123456789ABCDEFabcdef"),_=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),q=new Set(",[]{}"),B=new Set(` ,[]{}
\r	`),U=(H)=>!H||B.has(H);class G{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(H,V=!1){if(H){if(typeof H!=="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+H:H,this.lineEndPos=null}this.atEnd=!V;let $=this.next??"stream";while($&&(V||this.hasChars(1)))$=yield*this.parseNext($)}atLineEnd(){let H=this.pos,V=this.buffer[H];while(V===" "||V==="\t")V=this.buffer[++H];if(!V||V==="#"||V===`
`)return!0;if(V==="\r")return this.buffer[H+1]===`
`;return!1}charAt(H){return this.buffer[this.pos+H]}continueScalar(H){let V=this.buffer[H];if(this.indentNext>0){let $=0;while(V===" ")V=this.buffer[++$+H];if(V==="\r"){let Q=this.buffer[$+H+1];if(Q===`
`||!Q&&!this.atEnd)return H+$+1}return V===`
`||$>=this.indentNext||!V&&!this.atEnd?H+$:-1}if(V==="-"||V==="."){let $=this.buffer.substr(H,3);if(($==="---"||$==="...")&&z(this.buffer[H+3]))return-1}return H}getLine(){let H=this.lineEndPos;if(typeof H!=="number"||H!==-1&&H<this.pos)H=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=H;if(H===-1)return this.atEnd?this.buffer.substring(this.pos):null;if(this.buffer[H-1]==="\r")H-=1;return this.buffer.substring(this.pos,H)}hasChars(H){return this.pos+H<=this.buffer.length}setNext(H){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=H,null}peek(H){return this.buffer.substr(this.pos,H)}*parseNext(H){switch(H){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let H=this.getLine();if(H===null)return this.setNext("stream");if(H[0]===X.BOM)yield*this.pushCount(1),H=H.substring(1);if(H[0]==="%"){let V=H.length,$=H.indexOf("#");while($!==-1){let J=H[$-1];if(J===" "||J==="\t"){V=$-1;break}else $=H.indexOf("#",$+1)}while(!0){let J=H[V-1];if(J===" "||J==="\t")V-=1;else break}let Q=(yield*this.pushCount(V))+(yield*this.pushSpaces(!0));return yield*this.pushCount(H.length-Q),this.pushNewline(),"stream"}if(this.atLineEnd()){let V=yield*this.pushSpaces(!0);return yield*this.pushCount(H.length-V),yield*this.pushNewline(),"stream"}return yield X.DOCUMENT,yield*this.parseLineStart()}*parseLineStart(){let H=this.charAt(0);if(!H&&!this.atEnd)return this.setNext("line-start");if(H==="-"||H==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");let V=this.peek(3);if((V==="---"||V==="...")&&z(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,V==="---"?"doc":"stream"}if(this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!z(this.charAt(1)))this.indentNext=this.indentValue;return yield*this.parseBlockStart()}*parseBlockStart(){let[H,V]=this.peek(2);if(!V&&!this.atEnd)return this.setNext("block-start");if((H==="-"||H==="?"||H===":")&&z(V)){let $=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=$,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);let H=this.getLine();if(H===null)return this.setNext("doc");let V=yield*this.pushIndicators();switch(H[V]){case"#":yield*this.pushCount(H.length-V);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(U),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return V+=yield*this.parseBlockScalarHeader(),V+=yield*this.pushSpaces(!0),yield*this.pushCount(H.length-V),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let H,V,$=-1;do{if(H=yield*this.pushNewline(),H>0)V=yield*this.pushSpaces(!1),this.indentValue=$=V;else V=0;V+=yield*this.pushSpaces(!0)}while(H+V>0);let Q=this.getLine();if(Q===null)return this.setNext("flow");if($!==-1&&$<this.indentNext&&Q[0]!=="#"||$===0&&(Q.startsWith("---")||Q.startsWith("..."))&&z(Q[3])){if(!($===this.indentNext-1&&this.flowLevel===1&&(Q[0]==="]"||Q[0]==="}")))return this.flowLevel=0,yield X.FLOW_END,yield*this.parseLineStart()}let J=0;while(Q[J]===",")J+=yield*this.pushCount(1),J+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(J+=yield*this.pushIndicators(),Q[J]){case void 0:return"flow";case"#":return yield*this.pushCount(Q.length-J),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(U),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{let Y=this.charAt(1);if(this.flowKey||z(Y)||Y===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){let H=this.charAt(0),V=this.buffer.indexOf(H,this.pos+1);if(H==="'")while(V!==-1&&this.buffer[V+1]==="'")V=this.buffer.indexOf("'",V+2);else while(V!==-1){let J=0;while(this.buffer[V-1-J]==="\\")J+=1;if(J%2===0)break;V=this.buffer.indexOf('"',V+1)}let $=this.buffer.substring(0,V),Q=$.indexOf(`
`,this.pos);if(Q!==-1){while(Q!==-1){let J=this.continueScalar(Q+1);if(J===-1)break;Q=$.indexOf(`
`,J)}if(Q!==-1)V=Q-($[Q-1]==="\r"?2:1)}if(V===-1){if(!this.atEnd)return this.setNext("quoted-scalar");V=this.buffer.length}return yield*this.pushToIndex(V+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let H=this.pos;while(!0){let V=this.buffer[++H];if(V==="+")this.blockScalarKeep=!0;else if(V>"0"&&V<="9")this.blockScalarIndent=Number(V)-1;else if(V!=="-")break}return yield*this.pushUntil((V)=>z(V)||V==="#")}*parseBlockScalar(){let H=this.pos-1,V=0,$;Z:for(let J=this.pos;$=this.buffer[J];++J)switch($){case" ":V+=1;break;case`
`:H=J,V=0;break;case"\r":{let Y=this.buffer[J+1];if(!Y&&!this.atEnd)return this.setNext("block-scalar");if(Y===`
`)break}default:break Z}if(!$&&!this.atEnd)return this.setNext("block-scalar");if(V>=this.indentNext){if(this.blockScalarIndent===-1)this.indentNext=V;else this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{let J=this.continueScalar(H+1);if(J===-1)break;H=this.buffer.indexOf(`
`,J)}while(H!==-1);if(H===-1){if(!this.atEnd)return this.setNext("block-scalar");H=this.buffer.length}}let Q=H+1;$=this.buffer[Q];while($===" ")$=this.buffer[++Q];if($==="\t"){while($==="\t"||$===" "||$==="\r"||$===`
`)$=this.buffer[++Q];H=Q-1}else if(!this.blockScalarKeep)do{let J=H-1,Y=this.buffer[J];if(Y==="\r")Y=this.buffer[--J];let A=J;while(Y===" ")Y=this.buffer[--J];if(Y===`
`&&J>=this.pos&&J+1+V>A)H=J;else break}while(!0);return yield X.SCALAR,yield*this.pushToIndex(H+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){let H=this.flowLevel>0,V=this.pos-1,$=this.pos-1,Q;while(Q=this.buffer[++$])if(Q===":"){let J=this.buffer[$+1];if(z(J)||H&&q.has(J))break;V=$}else if(z(Q)){let J=this.buffer[$+1];if(Q==="\r")if(J===`
`)$+=1,Q=`
`,J=this.buffer[$+1];else V=$;if(J==="#"||H&&q.has(J))break;if(Q===`
`){let Y=this.continueScalar($+1);if(Y===-1)break;$=Math.max($,Y-2)}}else{if(H&&q.has(Q))break;V=$}if(!Q&&!this.atEnd)return this.setNext("plain-scalar");return yield X.SCALAR,yield*this.pushToIndex(V+1,!0),H?"flow":"doc"}*pushCount(H){if(H>0)return yield this.buffer.substr(this.pos,H),this.pos+=H,H;return 0}*pushToIndex(H,V){let $=this.buffer.slice(this.pos,H);if($)return yield $,this.pos+=$.length,$.length;else if(V)yield"";return 0}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(U))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{let H=this.flowLevel>0,V=this.charAt(1);if(z(V)||H&&q.has(V)){if(!H)this.indentNext=this.indentValue+1;else if(this.flowKey)this.flowKey=!1;return(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}}return 0}*pushTag(){if(this.charAt(1)==="<"){let H=this.pos+2,V=this.buffer[H];while(!z(V)&&V!==">")V=this.buffer[++H];return yield*this.pushToIndex(V===">"?H+1:H,!1)}else{let H=this.pos+1,V=this.buffer[H];while(V)if(_.has(V))V=this.buffer[++H];else if(V==="%"&&W.has(this.buffer[H+1])&&W.has(this.buffer[H+2]))V=this.buffer[H+=3];else break;return yield*this.pushToIndex(H,!1)}}*pushNewline(){let H=this.buffer[this.pos];if(H===`
`)return yield*this.pushCount(1);else if(H==="\r"&&this.charAt(1)===`
`)return yield*this.pushCount(2);else return 0}*pushSpaces(H){let V=this.pos-1,$;do $=this.buffer[++V];while($===" "||H&&$==="\t");let Q=V-this.pos;if(Q>0)yield this.buffer.substr(this.pos,Q),this.pos=V;return Q}*pushUntil(H){let V=this.pos,$=this.buffer[V];while(!H($))$=this.buffer[++V];return yield*this.pushToIndex(V,!1)}}Z.Lexer=G}),Y7=w((Z)=>{class X{constructor(){this.lineStarts=[],this.addNewLine=(z)=>this.lineStarts.push(z),this.linePos=(z)=>{let W=0,_=this.lineStarts.length;while(W<_){let B=W+_>>1;if(this.lineStarts[B]<z)W=B+1;else _=B}if(this.lineStarts[W]===z)return{line:W+1,col:1};if(W===0)return{line:0,col:z};let q=this.lineStarts[W-1];return{line:W,col:z-q+1}}}}Z.LineCounter=X}),V7=w((Z)=>{var X=cZ("process"),z=o6(),W=J7();function _($,Q){for(let J=0;J<$.length;++J)if($[J].type===Q)return!0;return!1}function q($){for(let Q=0;Q<$.length;++Q)switch($[Q].type){case"space":case"comment":case"newline":break;default:return Q}return-1}function B($){switch($?.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function U($){switch($.type){case"document":return $.start;case"block-map":{let Q=$.items[$.items.length-1];return Q.sep??Q.start}case"block-seq":return $.items[$.items.length-1].start;default:return[]}}function G($){if($.length===0)return[];let Q=$.length;Z:while(--Q>=0)switch($[Q].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break Z}while($[++Q]?.type==="space");return $.splice(Q,$.length)}function H($){if($.start.type==="flow-seq-start"){for(let Q of $.items)if(Q.sep&&!Q.value&&!_(Q.start,"explicit-key-ind")&&!_(Q.sep,"map-value-ind")){if(Q.key)Q.value=Q.key;if(delete Q.key,B(Q.value))if(Q.value.end)Array.prototype.push.apply(Q.value.end,Q.sep);else Q.value.end=Q.sep;else Array.prototype.push.apply(Q.start,Q.sep);delete Q.sep}}}class V{constructor($){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new W.Lexer,this.onNewLine=$}*parse($,Q=!1){if(this.onNewLine&&this.offset===0)this.onNewLine(0);for(let J of this.lexer.lex($,Q))yield*this.next(J);if(!Q)yield*this.end()}*next($){if(this.source=$,X.env.LOG_TOKENS)console.log("|",z.prettyToken($));if(this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=$.length;return}let Q=z.tokenType($);if(!Q){let J=`Not a YAML token: ${$}`;yield*this.pop({type:"error",offset:this.offset,message:J,source:$}),this.offset+=$.length}else if(Q==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=Q,yield*this.step(),Q){case"newline":if(this.atNewLine=!0,this.indent=0,this.onNewLine)this.onNewLine(this.offset+$.length);break;case"space":if(this.atNewLine&&$[0]===" ")this.indent+=$.length;break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":if(this.atNewLine)this.indent+=$.length;break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=$.length}}*end(){while(this.stack.length>0)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){let $=this.peek(1);if(this.type==="doc-end"&&$?.type!=="doc-end"){while(this.stack.length>0)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!$)return yield*this.stream();switch($.type){case"document":return yield*this.document($);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar($);case"block-scalar":return yield*this.blockScalar($);case"block-map":return yield*this.blockMap($);case"block-seq":return yield*this.blockSequence($);case"flow-collection":return yield*this.flowCollection($);case"doc-end":return yield*this.documentEnd($)}yield*this.pop()}peek($){return this.stack[this.stack.length-$]}*pop($){let Q=$??this.stack.pop();if(!Q)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield Q;else{let J=this.peek(1);if(Q.type==="block-scalar")Q.indent="indent"in J?J.indent:0;else if(Q.type==="flow-collection"&&J.type==="document")Q.indent=0;if(Q.type==="flow-collection")H(Q);switch(J.type){case"document":J.value=Q;break;case"block-scalar":J.props.push(Q);break;case"block-map":{let Y=J.items[J.items.length-1];if(Y.value){J.items.push({start:[],key:Q,sep:[]}),this.onKeyLine=!0;return}else if(Y.sep)Y.value=Q;else{Object.assign(Y,{key:Q,sep:[]}),this.onKeyLine=!Y.explicitKey;return}break}case"block-seq":{let Y=J.items[J.items.length-1];if(Y.value)J.items.push({start:[],value:Q});else Y.value=Q;break}case"flow-collection":{let Y=J.items[J.items.length-1];if(!Y||Y.value)J.items.push({start:[],key:Q,sep:[]});else if(Y.sep)Y.value=Q;else Object.assign(Y,{key:Q,sep:[]});return}default:yield*this.pop(),yield*this.pop(Q)}if((J.type==="document"||J.type==="block-map"||J.type==="block-seq")&&(Q.type==="block-map"||Q.type==="block-seq")){let Y=Q.items[Q.items.length-1];if(Y&&!Y.sep&&!Y.value&&Y.start.length>0&&q(Y.start)===-1&&(Q.indent===0||Y.start.every((A)=>A.type!=="comment"||A.indent<Q.indent))){if(J.type==="document")J.end=Y.start;else J.items.push({start:Y.start});Q.items.splice(-1,1)}}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{let $={type:"document",offset:this.offset,start:[]};if(this.type==="doc-start")$.start.push(this.sourceToken);this.stack.push($);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document($){if($.value)return yield*this.lineEnd($);switch(this.type){case"doc-start":{if(q($.start)!==-1)yield*this.pop(),yield*this.step();else $.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":$.start.push(this.sourceToken);return}let Q=this.startBlockValue($);if(Q)this.stack.push(Q);else yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar($){if(this.type==="map-value-ind"){let Q=U(this.peek(2)),J=G(Q),Y;if($.end)Y=$.end,Y.push(this.sourceToken),delete $.end;else Y=[this.sourceToken];let A={type:"block-map",offset:$.offset,indent:$.indent,items:[{start:J,key:$,sep:Y}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=A}else yield*this.lineEnd($)}*blockScalar($){switch(this.type){case"space":case"comment":case"newline":$.props.push(this.sourceToken);return;case"scalar":if($.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let Q=this.source.indexOf(`
`)+1;while(Q!==0)this.onNewLine(this.offset+Q),Q=this.source.indexOf(`
`,Q)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap($){let Q=$.items[$.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,Q.value){let J="end"in Q.value?Q.value.end:void 0;if((Array.isArray(J)?J[J.length-1]:void 0)?.type==="comment")J?.push(this.sourceToken);else $.items.push({start:[this.sourceToken]})}else if(Q.sep)Q.sep.push(this.sourceToken);else Q.start.push(this.sourceToken);return;case"space":case"comment":if(Q.value)$.items.push({start:[this.sourceToken]});else if(Q.sep)Q.sep.push(this.sourceToken);else{if(this.atIndentedComment(Q.start,$.indent)){let Y=$.items[$.items.length-2]?.value?.end;if(Array.isArray(Y)){Array.prototype.push.apply(Y,Q.start),Y.push(this.sourceToken),$.items.pop();return}}Q.start.push(this.sourceToken)}return}if(this.indent>=$.indent){let J=!this.onKeyLine&&this.indent===$.indent,Y=J&&(Q.sep||Q.explicitKey)&&this.type!=="seq-item-ind",A=[];if(Y&&Q.sep&&!Q.value){let M=[];for(let D=0;D<Q.sep.length;++D){let L=Q.sep[D];switch(L.type){case"newline":M.push(D);break;case"space":break;case"comment":if(L.indent>$.indent)M.length=0;break;default:M.length=0}}if(M.length>=2)A=Q.sep.splice(M[1])}switch(this.type){case"anchor":case"tag":if(Y||Q.value)A.push(this.sourceToken),$.items.push({start:A}),this.onKeyLine=!0;else if(Q.sep)Q.sep.push(this.sourceToken);else Q.start.push(this.sourceToken);return;case"explicit-key-ind":if(!Q.sep&&!Q.explicitKey)Q.start.push(this.sourceToken),Q.explicitKey=!0;else if(Y||Q.value)A.push(this.sourceToken),$.items.push({start:A,explicitKey:!0});else this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]});this.onKeyLine=!0;return;case"map-value-ind":if(Q.explicitKey)if(!Q.sep)if(_(Q.start,"newline"))Object.assign(Q,{key:null,sep:[this.sourceToken]});else{let M=G(Q.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:M,key:null,sep:[this.sourceToken]}]})}else if(Q.value)$.items.push({start:[],key:null,sep:[this.sourceToken]});else if(_(Q.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:A,key:null,sep:[this.sourceToken]}]});else if(B(Q.key)&&!_(Q.sep,"newline")){let M=G(Q.start),D=Q.key,L=Q.sep;L.push(this.sourceToken),delete Q.key,delete Q.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:M,key:D,sep:L}]})}else if(A.length>0)Q.sep=Q.sep.concat(A,this.sourceToken);else Q.sep.push(this.sourceToken);else if(!Q.sep)Object.assign(Q,{key:null,sep:[this.sourceToken]});else if(Q.value||Y)$.items.push({start:A,key:null,sep:[this.sourceToken]});else if(_(Q.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]});else Q.sep.push(this.sourceToken);this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let M=this.flowScalar(this.type);if(Y||Q.value)$.items.push({start:A,key:M,sep:[]}),this.onKeyLine=!0;else if(Q.sep)this.stack.push(M);else Object.assign(Q,{key:M,sep:[]}),this.onKeyLine=!0;return}default:{let M=this.startBlockValue($);if(M){if(M.type==="block-seq"){if(!Q.explicitKey&&Q.sep&&!_(Q.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else if(J)$.items.push({start:A});this.stack.push(M);return}}}}yield*this.pop(),yield*this.step()}*blockSequence($){let Q=$.items[$.items.length-1];switch(this.type){case"newline":if(Q.value){let J="end"in Q.value?Q.value.end:void 0;if((Array.isArray(J)?J[J.length-1]:void 0)?.type==="comment")J?.push(this.sourceToken);else $.items.push({start:[this.sourceToken]})}else Q.start.push(this.sourceToken);return;case"space":case"comment":if(Q.value)$.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(Q.start,$.indent)){let Y=$.items[$.items.length-2]?.value?.end;if(Array.isArray(Y)){Array.prototype.push.apply(Y,Q.start),Y.push(this.sourceToken),$.items.pop();return}}Q.start.push(this.sourceToken)}return;case"anchor":case"tag":if(Q.value||this.indent<=$.indent)break;Q.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==$.indent)break;if(Q.value||_(Q.start,"seq-item-ind"))$.items.push({start:[this.sourceToken]});else Q.start.push(this.sourceToken);return}if(this.indent>$.indent){let J=this.startBlockValue($);if(J){this.stack.push(J);return}}yield*this.pop(),yield*this.step()}*flowCollection($){let Q=$.items[$.items.length-1];if(this.type==="flow-error-end"){let J;do yield*this.pop(),J=this.peek(1);while(J?.type==="flow-collection")}else if($.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":if(!Q||Q.sep)$.items.push({start:[this.sourceToken]});else Q.start.push(this.sourceToken);return;case"map-value-ind":if(!Q||Q.value)$.items.push({start:[],key:null,sep:[this.sourceToken]});else if(Q.sep)Q.sep.push(this.sourceToken);else Object.assign(Q,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":if(!Q||Q.value)$.items.push({start:[this.sourceToken]});else if(Q.sep)Q.sep.push(this.sourceToken);else Q.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let Y=this.flowScalar(this.type);if(!Q||Q.value)$.items.push({start:[],key:Y,sep:[]});else if(Q.sep)this.stack.push(Y);else Object.assign(Q,{key:Y,sep:[]});return}case"flow-map-end":case"flow-seq-end":$.end.push(this.sourceToken);return}let J=this.startBlockValue($);if(J)this.stack.push(J);else yield*this.pop(),yield*this.step()}else{let J=this.peek(2);if(J.type==="block-map"&&(this.type==="map-value-ind"&&J.indent===$.indent||this.type==="newline"&&!J.items[J.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&J.type!=="flow-collection"){let Y=U(J),A=G(Y);H($);let M=$.end.splice(1,$.end.length);M.push(this.sourceToken);let D={type:"block-map",offset:$.offset,indent:$.indent,items:[{start:A,key:$,sep:M}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=D}else yield*this.lineEnd($)}}flowScalar($){if(this.onNewLine){let Q=this.source.indexOf(`
`)+1;while(Q!==0)this.onNewLine(this.offset+Q),Q=this.source.indexOf(`
`,Q)+1}return{type:$,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue($){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;let Q=U($),J=G(Q);return J.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:J,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;let Q=U($),J=G(Q);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:J,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment($,Q){if(this.type!=="comment")return!1;if(this.indent<=Q)return!1;return $.every((J)=>J.type==="newline"||J.type==="space")}*documentEnd($){if(this.type!=="doc-mode"){if($.end)$.end.push(this.sourceToken);else $.end=[this.sourceToken];if(this.type==="newline")yield*this.pop()}}*lineEnd($){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:if($.end)$.end.push(this.sourceToken);else $.end=[this.sourceToken];if(this.type==="newline")yield*this.pop()}}}Z.Parser=V}),d4=w((Z)=>{var X=H7(),z=rZ(),W=tZ(),_=l5(),q=m(),B=Y7(),U=V7();function G(J){let Y=J.prettyErrors!==!1;return{lineCounter:J.lineCounter||Y&&new B.LineCounter||null,prettyErrors:Y}}function H(J,Y={}){let{lineCounter:A,prettyErrors:M}=G(Y),D=new U.Parser(A?.addNewLine),L=new X.Composer(Y),F=Array.from(L.compose(D.parse(J)));if(M&&A)for(let R of F)R.errors.forEach(W.prettifyError(J,A)),R.warnings.forEach(W.prettifyError(J,A));if(F.length>0)return F;return Object.assign([],{empty:!0},L.streamInfo())}function V(J,Y={}){let{lineCounter:A,prettyErrors:M}=G(Y),D=new U.Parser(A?.addNewLine),L=new X.Composer(Y),F=null;for(let R of L.compose(D.parse(J),!0,J.length))if(!F)F=R;else if(F.options.logLevel!=="silent"){F.errors.push(new W.YAMLParseError(R.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}if(M&&A)F.errors.forEach(W.prettifyError(J,A)),F.warnings.forEach(W.prettifyError(J,A));return F}function $(J,Y,A){let M=void 0;if(typeof Y==="function")M=Y;else if(A===void 0&&Y&&typeof Y==="object")A=Y;let D=V(J,A);if(!D)return null;if(D.warnings.forEach((L)=>_.warn(D.options.logLevel,L)),D.errors.length>0)if(D.options.logLevel!=="silent")throw D.errors[0];else D.errors=[];return D.toJS(Object.assign({reviver:M},A))}function Q(J,Y,A){let M=null;if(typeof Y==="function"||Array.isArray(Y))M=Y;else if(A===void 0&&Y)A=Y;if(typeof A==="string")A=A.length;if(typeof A==="number"){let D=Math.round(A);A=D<1?void 0:D>8?{indent:8}:{indent:D}}if(J===void 0){let{keepUndefined:D}=A??Y??{};if(!D)return}if(q.isDocument(J)&&!M)return J.toString(A);return new z.Document(J,M,A).toString(A)}Z.parse=$,Z.parseAllDocuments=H,Z.parseDocument=V,Z.stringify=Q}),_7=w((Z)=>{var X=H7(),z=rZ(),W=X7(),_=tZ(),q=lZ(),B=m(),U=T8(),G=G0(),H=P8(),V=w8(),$=o6(),Q=J7(),J=Y7(),Y=V7(),A=d4(),M=pZ();Z.Composer=X.Composer,Z.Document=z.Document,Z.Schema=W.Schema,Z.YAMLError=_.YAMLError,Z.YAMLParseError=_.YAMLParseError,Z.YAMLWarning=_.YAMLWarning,Z.Alias=q.Alias,Z.isAlias=B.isAlias,Z.isCollection=B.isCollection,Z.isDocument=B.isDocument,Z.isMap=B.isMap,Z.isNode=B.isNode,Z.isPair=B.isPair,Z.isScalar=B.isScalar,Z.isSeq=B.isSeq,Z.Pair=U.Pair,Z.Scalar=G.Scalar,Z.YAMLMap=H.YAMLMap,Z.YAMLSeq=V.YAMLSeq,Z.CST=$,Z.Lexer=Q.Lexer,Z.LineCounter=J.LineCounter,Z.Parser=Y.Parser,Z.parse=A.parse,Z.parseAllDocuments=A.parseAllDocuments,Z.parseDocument=A.parseDocument,Z.stringify=A.stringify,Z.visit=M.visit,Z.visitAsync=M.visitAsync});var B7=["none","acpx","llama-cpp","ollama","claude-code","codex","opencode","anthropic","openrouter","openai-compatible","command"],c4=B7.filter((Z)=>Z!=="command");var OJ=new Set(B7),FJ=new Set(c4);var U7="unicode61";function n4(Z){return Z.replace(/\s+/g," ").trim().toLowerCase()}function G7(Z){Z.exec(`
		CREATE VIRTUAL TABLE IF NOT EXISTS memories_fts USING fts5(
			content,
			content='memories',
			content_rowid='rowid',
			tokenize='${U7}'
		);
	`),Z.exec(`
		CREATE TRIGGER IF NOT EXISTS memories_ai AFTER INSERT ON memories BEGIN
			INSERT INTO memories_fts(rowid, content) VALUES (new.rowid, new.content);
		END;
	`),Z.exec(`
		CREATE TRIGGER IF NOT EXISTS memories_ad AFTER DELETE ON memories BEGIN
			INSERT INTO memories_fts(memories_fts, rowid, content) VALUES('delete', old.rowid, old.content);
		END;
	`),Z.exec(`
		CREATE TRIGGER IF NOT EXISTS memories_au AFTER UPDATE OF content ON memories BEGIN
			INSERT INTO memories_fts(memories_fts, rowid, content) VALUES('delete', old.rowid, old.content);
			INSERT INTO memories_fts(rowid, content) VALUES (new.rowid, new.content);
		END;
	`)}function i4(Z){Z.exec("DROP TRIGGER IF EXISTS memories_ai"),Z.exec("DROP TRIGGER IF EXISTS memories_ad"),Z.exec("DROP TRIGGER IF EXISTS memories_au"),Z.exec("DROP TABLE IF EXISTS memories_fts"),G7(Z),Z.exec("INSERT INTO memories_fts(rowid, content) SELECT rowid, content FROM memories")}function o4(Z){let X=Z.prepare("SELECT sql FROM sqlite_master WHERE name = 'memories_fts' AND type = 'table'").get();return typeof X?.sql==="string"?X.sql:null}function s4(Z){if(Z===null)return!1;let X=n4(Z);if(X.includes("porter unicode61"))return!0;return!X.includes(`tokenize='${U7}'`)}function a4(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS schema_migrations (
			version INTEGER PRIMARY KEY,
			applied_at TEXT NOT NULL,
			checksum TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS conversations (
			id TEXT PRIMARY KEY,
			session_id TEXT NOT NULL,
			harness TEXT NOT NULL,
			started_at TEXT NOT NULL,
			ended_at TEXT,
			summary TEXT,
			topics TEXT,
			decisions TEXT,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL,
			updated_by TEXT NOT NULL,
			vector_clock TEXT NOT NULL DEFAULT '{}',
			version INTEGER DEFAULT 1,
			manual_override INTEGER DEFAULT 0
		);

		CREATE TABLE IF NOT EXISTS memories (
			id TEXT PRIMARY KEY,
			type TEXT NOT NULL DEFAULT 'fact',
			category TEXT,
			content TEXT NOT NULL,
			confidence REAL DEFAULT 1.0,
			importance REAL DEFAULT 0.5,
			source_id TEXT,
			source_type TEXT,
			tags TEXT,
			who TEXT,
			why TEXT,
			project TEXT,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL,
			updated_by TEXT NOT NULL DEFAULT 'system',
			last_accessed TEXT,
			access_count INTEGER DEFAULT 0,
			vector_clock TEXT NOT NULL DEFAULT '{}',
			version INTEGER DEFAULT 1,
			manual_override INTEGER DEFAULT 0,
			pinned INTEGER DEFAULT 0
		);

		CREATE TABLE IF NOT EXISTS embeddings (
			id TEXT PRIMARY KEY,
			content_hash TEXT NOT NULL UNIQUE,
			vector BLOB NOT NULL,
			dimensions INTEGER NOT NULL,
			source_type TEXT NOT NULL,
			source_id TEXT NOT NULL,
			chunk_text TEXT NOT NULL,
			created_at TEXT NOT NULL
		);

		-- Indexes
		CREATE INDEX IF NOT EXISTS idx_conversations_session
			ON conversations(session_id);
		CREATE INDEX IF NOT EXISTS idx_conversations_harness
			ON conversations(harness);
		CREATE INDEX IF NOT EXISTS idx_memories_type
			ON memories(type);
		CREATE INDEX IF NOT EXISTS idx_memories_category
			ON memories(category);
		CREATE INDEX IF NOT EXISTS idx_memories_pinned
			ON memories(pinned);
		CREATE INDEX IF NOT EXISTS idx_memories_importance
			ON memories(importance DESC);
		CREATE INDEX IF NOT EXISTS idx_memories_created
			ON memories(created_at DESC);
		CREATE INDEX IF NOT EXISTS idx_embeddings_source
			ON embeddings(source_type, source_id);
		CREATE INDEX IF NOT EXISTS idx_embeddings_hash
			ON embeddings(content_hash);
	`);try{Z.exec(`
			CREATE VIRTUAL TABLE IF NOT EXISTS vec_embeddings USING vec0(
				embedding FLOAT[768]
			);
		`)}catch{}G7(Z)}function r4(Z,X,z){return Z.prepare(`PRAGMA table_info(${X})`).all().some((_)=>_.name===z)}function j0(Z,X,z,W){if(!r4(Z,X,z))Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function t4(Z){j0(Z,"memories","content_hash","TEXT"),j0(Z,"memories","normalized_content","TEXT"),j0(Z,"memories","is_deleted","INTEGER DEFAULT 0"),j0(Z,"memories","deleted_at","TEXT"),j0(Z,"memories","extraction_status","TEXT DEFAULT 'none'"),j0(Z,"memories","embedding_model","TEXT"),j0(Z,"memories","extraction_model","TEXT"),j0(Z,"memories","update_count","INTEGER DEFAULT 0"),j0(Z,"memories","who","TEXT"),j0(Z,"memories","why","TEXT"),j0(Z,"memories","project","TEXT"),j0(Z,"memories","pinned","INTEGER DEFAULT 0"),j0(Z,"memories","importance","REAL DEFAULT 0.5"),j0(Z,"memories","last_accessed","TEXT"),j0(Z,"memories","access_count","INTEGER DEFAULT 0"),Z.exec(`
		CREATE TABLE IF NOT EXISTS memory_history (
			id TEXT PRIMARY KEY,
			memory_id TEXT NOT NULL,
			event TEXT NOT NULL,
			old_content TEXT,
			new_content TEXT,
			changed_by TEXT NOT NULL,
			reason TEXT,
			metadata TEXT,
			created_at TEXT NOT NULL,
			FOREIGN KEY (memory_id) REFERENCES memories(id)
		);
	`),Z.exec(`
		CREATE TABLE IF NOT EXISTS memory_jobs (
			id TEXT PRIMARY KEY,
			memory_id TEXT NOT NULL,
			job_type TEXT NOT NULL,
			status TEXT NOT NULL DEFAULT 'pending',
			payload TEXT,
			result TEXT,
			attempts INTEGER DEFAULT 0,
			max_attempts INTEGER DEFAULT 3,
			leased_at TEXT,
			completed_at TEXT,
			failed_at TEXT,
			error TEXT,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL,
			FOREIGN KEY (memory_id) REFERENCES memories(id)
		);
	`),Z.exec(`
		CREATE TABLE IF NOT EXISTS entities (
			id TEXT PRIMARY KEY,
			name TEXT NOT NULL UNIQUE,
			entity_type TEXT NOT NULL,
			description TEXT,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL
		);
	`),Z.exec(`
		CREATE TABLE IF NOT EXISTS relations (
			id TEXT PRIMARY KEY,
			source_entity_id TEXT NOT NULL,
			target_entity_id TEXT NOT NULL,
			relation_type TEXT NOT NULL,
			strength REAL DEFAULT 1.0,
			metadata TEXT,
			created_at TEXT NOT NULL,
			FOREIGN KEY (source_entity_id) REFERENCES entities(id),
			FOREIGN KEY (target_entity_id) REFERENCES entities(id)
		);
	`),Z.exec(`
		CREATE TABLE IF NOT EXISTS memory_entity_mentions (
			memory_id TEXT NOT NULL,
			entity_id TEXT NOT NULL,
			PRIMARY KEY (memory_id, entity_id),
			FOREIGN KEY (memory_id) REFERENCES memories(id),
			FOREIGN KEY (entity_id) REFERENCES entities(id)
		);
	`),Z.exec(`
		CREATE TABLE IF NOT EXISTS schema_migrations_audit (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			version INTEGER NOT NULL,
			applied_at TEXT NOT NULL,
			duration_ms INTEGER,
			checksum TEXT
		);
	`),Z.exec(`
		CREATE INDEX IF NOT EXISTS idx_memories_content_hash
			ON memories(content_hash);
		CREATE INDEX IF NOT EXISTS idx_memories_is_deleted
			ON memories(is_deleted);
		CREATE INDEX IF NOT EXISTS idx_memories_extraction_status
			ON memories(extraction_status);
		CREATE INDEX IF NOT EXISTS idx_memory_history_memory_id
			ON memory_history(memory_id);
		CREATE INDEX IF NOT EXISTS idx_memory_jobs_status
			ON memory_jobs(status);
		CREATE INDEX IF NOT EXISTS idx_memory_jobs_memory_id
			ON memory_jobs(memory_id);
		CREATE INDEX IF NOT EXISTS idx_relations_source
			ON relations(source_entity_id);
		CREATE INDEX IF NOT EXISTS idx_relations_target
			ON relations(target_entity_id);
		CREATE INDEX IF NOT EXISTS idx_memory_entity_mentions_entity
			ON memory_entity_mentions(entity_id);
	`)}function k5(Z,X,z,W){if(Z.prepare(`PRAGMA table_info(${X})`).all().some((q)=>q.name===z))return!1;return Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`),!0}function e4(Z){k5(Z,"memories","why","TEXT"),k5(Z,"memories","project","TEXT"),Z.exec("DROP INDEX IF EXISTS idx_memories_content_hash"),Z.exec(`
		UPDATE memories
		SET content_hash = NULL
		WHERE content_hash IS NOT NULL
		  AND is_deleted = 0
		  AND id NOT IN (
			SELECT id FROM (
				SELECT id, ROW_NUMBER() OVER (
					PARTITION BY content_hash
					ORDER BY created_at DESC, rowid DESC
				) AS rn
				FROM memories
				WHERE content_hash IS NOT NULL
				  AND is_deleted = 0
			) ranked
			WHERE rn = 1
		  )
	`),Z.exec(`
		CREATE UNIQUE INDEX IF NOT EXISTS idx_memories_content_hash_unique
			ON memories(content_hash)
			WHERE content_hash IS NOT NULL AND is_deleted = 0
	`)}function Z9(Z,X,z){return Z.prepare(`PRAGMA table_info(${X})`).all().some((_)=>_.name===z)}function b6(Z,X,z,W){if(!Z9(Z,X,z))Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function X9(Z){b6(Z,"memory_history","actor_type","TEXT"),b6(Z,"memory_history","session_id","TEXT"),b6(Z,"memory_history","request_id","TEXT"),Z.exec(`
		CREATE INDEX IF NOT EXISTS idx_memories_deleted_at
			ON memories(deleted_at)
			WHERE is_deleted = 1;
	`),Z.exec(`
		CREATE INDEX IF NOT EXISTS idx_memory_history_created_at
			ON memory_history(created_at);
	`),Z.exec(`
		CREATE INDEX IF NOT EXISTS idx_memory_jobs_completed_at
			ON memory_jobs(completed_at)
			WHERE status = 'completed';
	`),Z.exec(`
		CREATE INDEX IF NOT EXISTS idx_memory_jobs_failed_at
			ON memory_jobs(failed_at)
			WHERE status = 'dead';
	`)}function z9(Z,X,z){return Z.prepare(`PRAGMA table_info(${X})`).all().some((_)=>_.name===z)}function W8(Z,X,z,W){if(!z9(Z,X,z))Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function $9(Z){W8(Z,"entities","canonical_name","TEXT"),W8(Z,"entities","mentions","INTEGER DEFAULT 0"),W8(Z,"entities","embedding","BLOB"),W8(Z,"relations","mentions","INTEGER DEFAULT 1"),W8(Z,"relations","confidence","REAL DEFAULT 0.5"),W8(Z,"relations","updated_at","TEXT"),W8(Z,"memory_entity_mentions","mention_text","TEXT"),W8(Z,"memory_entity_mentions","confidence","REAL"),W8(Z,"memory_entity_mentions","created_at","TEXT"),Z.exec("CREATE INDEX IF NOT EXISTS idx_entities_canonical_name ON entities(canonical_name)"),Z.exec("CREATE INDEX IF NOT EXISTS idx_relations_composite ON relations(source_entity_id, relation_type)")}function b5(Z,X,z){return Z.prepare(`PRAGMA table_info(${X})`).all().some((_)=>_.name===z)}function Q9(Z){if(!b5(Z,"memories","idempotency_key"))Z.exec("ALTER TABLE memories ADD COLUMN idempotency_key TEXT");if(Z.exec(`CREATE UNIQUE INDEX IF NOT EXISTS idx_memories_idempotency_key
		 ON memories(idempotency_key)
		 WHERE idempotency_key IS NOT NULL`),!b5(Z,"memories","runtime_path"))Z.exec("ALTER TABLE memories ADD COLUMN runtime_path TEXT")}function W9(Z,X,z){return Z.prepare(`PRAGMA table_info(${X})`).all().some((_)=>_.name===z)}function H9(Z){if(Z.exec(`
		CREATE TABLE IF NOT EXISTS documents (
			id TEXT PRIMARY KEY,
			source_url TEXT,
			source_type TEXT NOT NULL,
			content_type TEXT,
			content_hash TEXT,
			title TEXT,
			raw_content TEXT,
			status TEXT NOT NULL DEFAULT 'queued',
			error TEXT,
			connector_id TEXT,
			chunk_count INTEGER NOT NULL DEFAULT 0,
			memory_count INTEGER NOT NULL DEFAULT 0,
			metadata_json TEXT,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL,
			completed_at TEXT
		)
	`),Z.exec(`CREATE INDEX IF NOT EXISTS idx_documents_status
		 ON documents(status)`),Z.exec(`CREATE INDEX IF NOT EXISTS idx_documents_source_url
		 ON documents(source_url)`),Z.exec(`CREATE INDEX IF NOT EXISTS idx_documents_connector_id
		 ON documents(connector_id)`),Z.exec(`CREATE INDEX IF NOT EXISTS idx_documents_content_hash
		 ON documents(content_hash)`),Z.exec(`
		CREATE TABLE IF NOT EXISTS document_memories (
			document_id TEXT NOT NULL REFERENCES documents(id),
			memory_id TEXT NOT NULL REFERENCES memories(id),
			chunk_index INTEGER,
			PRIMARY KEY (document_id, memory_id)
		)
	`),Z.exec(`
		CREATE TABLE IF NOT EXISTS connectors (
			id TEXT PRIMARY KEY,
			provider TEXT NOT NULL,
			display_name TEXT,
			config_json TEXT NOT NULL,
			cursor_json TEXT,
			status TEXT NOT NULL DEFAULT 'idle',
			last_sync_at TEXT,
			last_error TEXT,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL
		)
	`),Z.exec(`CREATE INDEX IF NOT EXISTS idx_connectors_provider
		 ON connectors(provider)`),!W9(Z,"memory_jobs","document_id"))Z.exec("ALTER TABLE memory_jobs ADD COLUMN document_id TEXT")}function J9(Z){if(Z.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='embeddings'").all().length===0)return;Z.exec(`
		DELETE FROM embeddings
		WHERE rowid NOT IN (
			SELECT MIN(rowid) FROM embeddings
			GROUP BY content_hash
		)
	`),Z.exec("DROP INDEX IF EXISTS idx_embeddings_hash"),Z.exec(`
		CREATE UNIQUE INDEX IF NOT EXISTS idx_embeddings_content_hash_unique
			ON embeddings(content_hash)
	`)}function Y9(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS summary_jobs (
			id TEXT PRIMARY KEY,
			session_key TEXT,
			harness TEXT NOT NULL,
			project TEXT,
			transcript TEXT NOT NULL,
			status TEXT NOT NULL DEFAULT 'pending',
			result TEXT,
			attempts INTEGER DEFAULT 0,
			max_attempts INTEGER DEFAULT 3,
			created_at TEXT NOT NULL,
			completed_at TEXT,
			error TEXT
		)
	`),Z.exec(`CREATE INDEX IF NOT EXISTS idx_summary_jobs_status
		 ON summary_jobs(status)`)}function V9(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS umap_cache (
			id INTEGER PRIMARY KEY,
			dimensions INTEGER NOT NULL,
			embedding_count INTEGER NOT NULL,
			payload TEXT NOT NULL,
			created_at TEXT NOT NULL
		)
	`)}function _9(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS session_scores (
			id TEXT PRIMARY KEY,
			session_key TEXT NOT NULL,
			project TEXT,
			harness TEXT,
			score REAL NOT NULL,
			memories_recalled INTEGER,
			memories_used INTEGER,
			novel_context_count INTEGER,
			reasoning TEXT,
			created_at TEXT NOT NULL
		);
		CREATE INDEX IF NOT EXISTS idx_session_scores_project
			ON session_scores(project, created_at);
		CREATE INDEX IF NOT EXISTS idx_session_scores_session
			ON session_scores(session_key);
	`)}function B9(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS scheduled_tasks (
			id TEXT PRIMARY KEY,
			name TEXT NOT NULL,
			prompt TEXT NOT NULL,
			cron_expression TEXT NOT NULL,
			harness TEXT NOT NULL,
			working_directory TEXT,
			enabled INTEGER NOT NULL DEFAULT 1,
			last_run_at TEXT,
			next_run_at TEXT,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL
		);
		CREATE INDEX IF NOT EXISTS idx_scheduled_tasks_enabled_next
			ON scheduled_tasks(enabled, next_run_at);

		CREATE TABLE IF NOT EXISTS task_runs (
			id TEXT PRIMARY KEY,
			task_id TEXT NOT NULL REFERENCES scheduled_tasks(id) ON DELETE CASCADE,
			status TEXT NOT NULL DEFAULT 'pending',
			started_at TEXT NOT NULL,
			completed_at TEXT,
			exit_code INTEGER,
			stdout TEXT,
			stderr TEXT,
			error TEXT
		);
		CREATE INDEX IF NOT EXISTS idx_task_runs_task_id
			ON task_runs(task_id);
		CREATE INDEX IF NOT EXISTS idx_task_runs_status
			ON task_runs(status);
	`)}function f5(Z,X,z,W){if(!Z.prepare(`PRAGMA table_info(${X})`).all().some((q)=>q.name===z))Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function U9(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS ingestion_jobs (
			id TEXT PRIMARY KEY,
			source_path TEXT NOT NULL,
			source_type TEXT NOT NULL,
			file_hash TEXT,
			status TEXT NOT NULL DEFAULT 'pending',
			chunks_total INTEGER DEFAULT 0,
			chunks_processed INTEGER DEFAULT 0,
			memories_created INTEGER DEFAULT 0,
			started_at TEXT NOT NULL,
			completed_at TEXT,
			error TEXT
		);

		CREATE INDEX IF NOT EXISTS idx_ingestion_jobs_status
			ON ingestion_jobs(status);
		CREATE INDEX IF NOT EXISTS idx_ingestion_jobs_file_hash
			ON ingestion_jobs(file_hash);
		CREATE INDEX IF NOT EXISTS idx_ingestion_jobs_source_path
			ON ingestion_jobs(source_path);
	`),f5(Z,"memories","source_path","TEXT"),f5(Z,"memories","source_section","TEXT")}function G9(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS telemetry_events (
			id TEXT PRIMARY KEY,
			event TEXT NOT NULL,
			timestamp TEXT NOT NULL,
			properties TEXT NOT NULL,
			sent_to_posthog INTEGER NOT NULL DEFAULT 0,
			created_at TEXT NOT NULL
		);

		CREATE INDEX IF NOT EXISTS idx_telemetry_events_event
			ON telemetry_events(event);
		CREATE INDEX IF NOT EXISTS idx_telemetry_events_timestamp
			ON telemetry_events(timestamp);
		CREATE INDEX IF NOT EXISTS idx_telemetry_events_unsent
			ON telemetry_events(sent_to_posthog) WHERE sent_to_posthog = 0;
	`)}function x5(Z,X,z,W){if(!Z.prepare(`PRAGMA table_info(${X})`).all().some((q)=>q.name===z))Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function q9(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS session_memories (
			id TEXT PRIMARY KEY,
			session_key TEXT NOT NULL,
			memory_id TEXT NOT NULL,
			source TEXT NOT NULL,
			effective_score REAL,
			predictor_score REAL,
			final_score REAL NOT NULL,
			rank INTEGER NOT NULL,
			was_injected INTEGER NOT NULL,
			relevance_score REAL,
			fts_hit_count INTEGER NOT NULL DEFAULT 0,
			agent_preference TEXT,
			created_at TEXT NOT NULL,
			UNIQUE(session_key, memory_id)
		);

		CREATE INDEX IF NOT EXISTS idx_session_memories_session
			ON session_memories(session_key);
		CREATE INDEX IF NOT EXISTS idx_session_memories_memory
			ON session_memories(memory_id);
	`),x5(Z,"session_scores","confidence","REAL"),x5(Z,"session_scores","continuity_reasoning","TEXT")}function A9(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS session_checkpoints (
			id TEXT PRIMARY KEY,
			session_key TEXT NOT NULL,
			harness TEXT NOT NULL,
			project TEXT,
			project_normalized TEXT,
			trigger TEXT NOT NULL,
			digest TEXT NOT NULL,
			prompt_count INTEGER NOT NULL,
			memory_queries TEXT,
			recent_remembers TEXT,
			created_at TEXT NOT NULL
		);

		CREATE INDEX IF NOT EXISTS idx_checkpoints_session
			ON session_checkpoints(session_key, created_at DESC);
		CREATE INDEX IF NOT EXISTS idx_checkpoints_project
			ON session_checkpoints(project_normalized, created_at DESC);
	`)}function M9(Z){let X=Z.prepare("PRAGMA table_info(scheduled_tasks)").all(),z=new Set(X.flatMap((W)=>typeof W.name==="string"?[W.name]:[]));if(!z.has("skill_name"))Z.exec("ALTER TABLE scheduled_tasks ADD COLUMN skill_name TEXT");if(!z.has("skill_mode"))Z.exec(`ALTER TABLE scheduled_tasks ADD COLUMN skill_mode TEXT
			 CHECK (skill_mode IN ('inject', 'slash') OR skill_mode IS NULL)`)}function D9(Z){if(Z.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='skill_meta'").get())return;Z.exec(`
		CREATE TABLE skill_meta (
			entity_id     TEXT PRIMARY KEY REFERENCES entities(id),
			agent_id      TEXT NOT NULL DEFAULT 'default',
			version       TEXT,
			author        TEXT,
			license       TEXT,
			source        TEXT NOT NULL,
			role          TEXT NOT NULL DEFAULT 'utility',
			triggers      TEXT,
			tags          TEXT,
			permissions   TEXT,
			enriched      INTEGER DEFAULT 0,
			installed_at  TEXT NOT NULL,
			last_used_at  TEXT,
			use_count     INTEGER DEFAULT 0,
			importance    REAL DEFAULT 0.7,
			decay_rate    REAL DEFAULT 0.99,
			fs_path       TEXT NOT NULL,
			uninstalled_at TEXT,
			created_at    TEXT NOT NULL DEFAULT (datetime('now')),
			updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
		);

		CREATE INDEX idx_skill_meta_agent ON skill_meta(agent_id);
		CREATE INDEX idx_skill_meta_source ON skill_meta(source);
	`)}function L9(Z){let X=Z.prepare("PRAGMA table_info(entities)").all();if(!new Set(X.flatMap((W)=>typeof W.name==="string"?[W.name]:[])).has("agent_id"))Z.exec("ALTER TABLE entities ADD COLUMN agent_id TEXT NOT NULL DEFAULT 'default'");Z.exec("CREATE INDEX IF NOT EXISTS idx_entities_agent ON entities(agent_id)"),Z.exec(`
		CREATE TABLE IF NOT EXISTS entity_aspects (
			id             TEXT PRIMARY KEY,
			entity_id      TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
			agent_id       TEXT NOT NULL DEFAULT 'default',
			name           TEXT NOT NULL,
			canonical_name TEXT NOT NULL,
			weight         REAL NOT NULL DEFAULT 0.5,
			created_at     TEXT NOT NULL DEFAULT (datetime('now')),
			updated_at     TEXT NOT NULL DEFAULT (datetime('now')),
			UNIQUE(entity_id, canonical_name)
		);

		CREATE INDEX IF NOT EXISTS idx_entity_aspects_entity ON entity_aspects(entity_id);
		CREATE INDEX IF NOT EXISTS idx_entity_aspects_agent ON entity_aspects(agent_id);
		CREATE INDEX IF NOT EXISTS idx_entity_aspects_weight ON entity_aspects(weight DESC);
	`),Z.exec(`
		CREATE TABLE IF NOT EXISTS entity_attributes (
			id                 TEXT PRIMARY KEY,
			aspect_id          TEXT REFERENCES entity_aspects(id) ON DELETE SET NULL,
			agent_id           TEXT NOT NULL DEFAULT 'default',
			memory_id          TEXT REFERENCES memories(id) ON DELETE SET NULL,
			kind               TEXT NOT NULL,
			content            TEXT NOT NULL,
			normalized_content TEXT NOT NULL,
			confidence         REAL NOT NULL DEFAULT 0.0,
			importance         REAL NOT NULL DEFAULT 0.5,
			status             TEXT NOT NULL DEFAULT 'active',
			superseded_by      TEXT,
			created_at         TEXT NOT NULL DEFAULT (datetime('now')),
			updated_at         TEXT NOT NULL DEFAULT (datetime('now'))
		);

		CREATE INDEX IF NOT EXISTS idx_entity_attributes_aspect ON entity_attributes(aspect_id);
		CREATE INDEX IF NOT EXISTS idx_entity_attributes_agent ON entity_attributes(agent_id);
		CREATE INDEX IF NOT EXISTS idx_entity_attributes_kind ON entity_attributes(kind);
		CREATE INDEX IF NOT EXISTS idx_entity_attributes_status ON entity_attributes(status);
	`),Z.exec(`
		CREATE TABLE IF NOT EXISTS entity_dependencies (
			id                TEXT PRIMARY KEY,
			source_entity_id  TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
			target_entity_id  TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
			agent_id          TEXT NOT NULL DEFAULT 'default',
			aspect_id         TEXT REFERENCES entity_aspects(id) ON DELETE SET NULL,
			dependency_type   TEXT NOT NULL,
			strength          REAL NOT NULL DEFAULT 0.5,
			created_at        TEXT NOT NULL DEFAULT (datetime('now')),
			updated_at        TEXT NOT NULL DEFAULT (datetime('now'))
		);

		CREATE INDEX IF NOT EXISTS idx_entity_dependencies_source ON entity_dependencies(source_entity_id);
		CREATE INDEX IF NOT EXISTS idx_entity_dependencies_target ON entity_dependencies(target_entity_id);
		CREATE INDEX IF NOT EXISTS idx_entity_dependencies_agent ON entity_dependencies(agent_id);
	`),Z.exec(`
		CREATE TABLE IF NOT EXISTS task_meta (
			entity_id        TEXT PRIMARY KEY REFERENCES entities(id) ON DELETE CASCADE,
			agent_id         TEXT NOT NULL DEFAULT 'default',
			status           TEXT NOT NULL,
			expires_at       TEXT,
			retention_until  TEXT,
			completed_at     TEXT,
			updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
		);

		CREATE INDEX IF NOT EXISTS idx_task_meta_agent ON task_meta(agent_id);
		CREATE INDEX IF NOT EXISTS idx_task_meta_status ON task_meta(status);
		CREATE INDEX IF NOT EXISTS idx_task_meta_retention ON task_meta(retention_until);
	`)}function uZ(Z,X,z,W){if(!Z.prepare(`PRAGMA table_info(${X})`).all().some((q)=>q.name===z))Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function O9(Z){uZ(Z,"session_memories","entity_slot","INTEGER"),uZ(Z,"session_memories","aspect_slot","INTEGER"),uZ(Z,"session_memories","is_constraint","INTEGER NOT NULL DEFAULT 0"),uZ(Z,"session_memories","structural_density","INTEGER")}function F9(Z){let X=Z.prepare("PRAGMA table_info(session_checkpoints)").all(),z=new Set(X.flatMap((W)=>typeof W.name==="string"?[W.name]:[]));if(!z.has("focal_entity_ids"))Z.exec("ALTER TABLE session_checkpoints ADD COLUMN focal_entity_ids TEXT");if(!z.has("focal_entity_names"))Z.exec("ALTER TABLE session_checkpoints ADD COLUMN focal_entity_names TEXT");if(!z.has("active_aspect_ids"))Z.exec("ALTER TABLE session_checkpoints ADD COLUMN active_aspect_ids TEXT");if(!z.has("surfaced_constraint_count"))Z.exec("ALTER TABLE session_checkpoints ADD COLUMN surfaced_constraint_count INTEGER");if(!z.has("traversal_memory_count"))Z.exec("ALTER TABLE session_checkpoints ADD COLUMN traversal_memory_count INTEGER")}function g5(Z,X,z,W){if(!Z.prepare(`PRAGMA table_info(${X})`).all().some((q)=>q.name===z))Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function N9(Z){g5(Z,"entities","pinned","INTEGER NOT NULL DEFAULT 0"),g5(Z,"entities","pinned_at","TEXT"),Z.exec("CREATE INDEX IF NOT EXISTS idx_entities_pinned ON entities(agent_id, pinned, pinned_at DESC)")}function K9(Z){}function R9(Z){}function h5(Z,X,z,W){if(!Z.prepare(`PRAGMA table_info(${X})`).all().some((q)=>q.name===z))Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function j9(Z){h5(Z,"session_memories","agent_relevance_score","REAL"),h5(Z,"session_memories","agent_feedback_count","INTEGER DEFAULT 0")}function S9(Z){}function C9(Z){Z.exec(`
		UPDATE entities
		SET canonical_name = REPLACE(REPLACE(REPLACE(
			LOWER(TRIM(name)),
			'  ', ' '), '  ', ' '), '  ', ' ')
		WHERE canonical_name IS NULL
	`)}function E9(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS memories_cold (
			archive_id TEXT PRIMARY KEY,
			memory_id TEXT NOT NULL,
			type TEXT DEFAULT 'fact',
			category TEXT,
			content TEXT NOT NULL,
			confidence REAL DEFAULT 1.0,
			importance REAL DEFAULT 0.5,
			source_id TEXT,
			source_type TEXT,
			tags TEXT,
			who TEXT,
			why TEXT,
			project TEXT,
			content_hash TEXT,
			normalized_content TEXT,
			extraction_status TEXT,
			embedding_model TEXT,
			extraction_model TEXT,
			update_count INTEGER DEFAULT 0,
			original_created_at TEXT NOT NULL,
			archived_at TEXT NOT NULL,
			archived_reason TEXT,
			cold_source_id TEXT,
			agent_id TEXT NOT NULL DEFAULT 'default',
			original_row_json TEXT
		);

		CREATE INDEX IF NOT EXISTS idx_cold_memory_id ON memories_cold(memory_id);
		CREATE INDEX IF NOT EXISTS idx_cold_agent ON memories_cold(agent_id);
		CREATE INDEX IF NOT EXISTS idx_cold_project ON memories_cold(project);
		CREATE INDEX IF NOT EXISTS idx_cold_archived_at ON memories_cold(archived_at);
		CREATE INDEX IF NOT EXISTS idx_cold_source ON memories_cold(cold_source_id);
	`)}function I9(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS session_summaries (
			id TEXT PRIMARY KEY,
			project TEXT,
			depth INTEGER NOT NULL DEFAULT 0,
			kind TEXT NOT NULL CHECK(kind IN ('session', 'arc', 'epoch')),
			content TEXT NOT NULL,
			token_count INTEGER,
			earliest_at TEXT NOT NULL,
			latest_at TEXT NOT NULL,
			session_key TEXT,
			harness TEXT,
			agent_id TEXT NOT NULL DEFAULT 'default',
			created_at TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS session_summary_children (
			parent_id TEXT NOT NULL REFERENCES session_summaries(id) ON DELETE CASCADE,
			child_id TEXT NOT NULL REFERENCES session_summaries(id) ON DELETE CASCADE,
			ordinal INTEGER NOT NULL,
			PRIMARY KEY (parent_id, child_id)
		);

		-- No FK on memory_id: memories may be soft-deleted, purged, or
		-- archived to cold tier. The link is intentionally durable so
		-- summary lineage survives retention sweeps.
		CREATE TABLE IF NOT EXISTS session_summary_memories (
			summary_id TEXT NOT NULL REFERENCES session_summaries(id) ON DELETE CASCADE,
			memory_id TEXT NOT NULL,
			PRIMARY KEY (summary_id, memory_id)
		);

		CREATE INDEX IF NOT EXISTS idx_summaries_project_depth ON session_summaries(project, depth);
		CREATE INDEX IF NOT EXISTS idx_summaries_kind ON session_summaries(kind);
		CREATE INDEX IF NOT EXISTS idx_summaries_agent ON session_summaries(agent_id);
		CREATE INDEX IF NOT EXISTS idx_summaries_latest ON session_summaries(latest_at DESC);
		CREATE INDEX IF NOT EXISTS idx_summary_children_child ON session_summary_children(child_id);
		CREATE INDEX IF NOT EXISTS idx_summaries_session_key ON session_summaries(session_key);
		-- Unique constraint prevents duplicate depth-0 rows on retry
		CREATE UNIQUE INDEX IF NOT EXISTS idx_summaries_session_depth
			ON session_summaries(session_key, depth)
			WHERE session_key IS NOT NULL;
	`)}function T9(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS memory_jobs_new (
			id TEXT PRIMARY KEY,
			memory_id TEXT,
			job_type TEXT NOT NULL,
			status TEXT NOT NULL DEFAULT 'pending',
			payload TEXT,
			result TEXT,
			attempts INTEGER DEFAULT 0,
			max_attempts INTEGER DEFAULT 3,
			leased_at TEXT,
			completed_at TEXT,
			failed_at TEXT,
			error TEXT,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL,
			document_id TEXT,
			FOREIGN KEY (memory_id) REFERENCES memories(id)
		)
	`),Z.exec(`
		INSERT INTO memory_jobs_new
			(id, memory_id, job_type, status, payload, result,
			 attempts, max_attempts, leased_at, completed_at, failed_at,
			 error, created_at, updated_at, document_id)
		SELECT
			id, memory_id, job_type, status, payload, result,
			attempts, max_attempts, leased_at, completed_at, failed_at,
			error, created_at, updated_at, document_id
		FROM memory_jobs
	`),Z.exec("DROP TABLE IF EXISTS memory_jobs"),Z.exec("ALTER TABLE memory_jobs_new RENAME TO memory_jobs"),Z.exec(`
		CREATE INDEX IF NOT EXISTS idx_memory_jobs_status
			ON memory_jobs(status);
		CREATE INDEX IF NOT EXISTS idx_memory_jobs_memory_id
			ON memory_jobs(memory_id);
		CREATE INDEX IF NOT EXISTS idx_memory_jobs_completed_at
			ON memory_jobs(completed_at);
		CREATE INDEX IF NOT EXISTS idx_memory_jobs_failed_at
			ON memory_jobs(failed_at);
	`)}function P9(Z){if(!Z.prepare("PRAGMA table_info(entity_dependencies)").all().some((W)=>W.name==="reason"))Z.exec("ALTER TABLE entity_dependencies ADD COLUMN reason TEXT");if(!Z.prepare("PRAGMA table_info(entities)").all().some((W)=>W.name==="last_synthesized_at"))Z.exec("ALTER TABLE entities ADD COLUMN last_synthesized_at TEXT")}function w9(Z){let X=Z.prepare("PRAGMA table_info(embeddings)").all();if(X.length===0)return;if(!X.some((z)=>z.name==="vector"))Z.exec("ALTER TABLE embeddings ADD COLUMN vector BLOB")}function k9(Z){if(!Z.prepare("PRAGMA table_info(memories)").all().some((z)=>z.name==="scope"))Z.exec("ALTER TABLE memories ADD COLUMN scope TEXT DEFAULT NULL");Z.exec("CREATE INDEX IF NOT EXISTS idx_memories_scope ON memories(scope) WHERE scope IS NOT NULL")}function b9(Z){Z.exec("DROP INDEX IF EXISTS idx_memories_content_hash_unique"),Z.exec(`
		CREATE UNIQUE INDEX idx_memories_content_hash_unique
		ON memories(content_hash, COALESCE(scope, '__NULL__'))
		WHERE content_hash IS NOT NULL AND is_deleted = 0
	`)}function f9(Z){Z.exec(`
		CREATE VIRTUAL TABLE IF NOT EXISTS entities_fts USING fts5(
			name, canonical_name,
			content='entities', content_rowid='rowid'
		)
	`),Z.exec(`
		INSERT INTO entities_fts(rowid, name, canonical_name)
		SELECT rowid, name, canonical_name FROM entities
	`),Z.exec(`
		CREATE TRIGGER IF NOT EXISTS entities_fts_ai AFTER INSERT ON entities BEGIN
			INSERT INTO entities_fts(rowid, name, canonical_name)
			VALUES (new.rowid, new.name, new.canonical_name);
		END
	`),Z.exec(`
		CREATE TRIGGER IF NOT EXISTS entities_fts_ad AFTER DELETE ON entities BEGIN
			INSERT INTO entities_fts(entities_fts, rowid, name, canonical_name)
			VALUES ('delete', old.rowid, old.name, old.canonical_name);
		END
	`),Z.exec(`
		CREATE TRIGGER IF NOT EXISTS entities_fts_au AFTER UPDATE ON entities BEGIN
			INSERT INTO entities_fts(entities_fts, rowid, name, canonical_name)
			VALUES ('delete', old.rowid, old.name, old.canonical_name);
			INSERT INTO entities_fts(rowid, name, canonical_name)
			VALUES (new.rowid, new.name, new.canonical_name);
		END
	`)}function x9(Z){if(!Z.prepare("PRAGMA table_info(entity_dependencies)").all().some((z)=>z.name==="confidence"))Z.exec("ALTER TABLE entity_dependencies ADD COLUMN confidence REAL DEFAULT 0.7")}function g9(Z){if(Z.exec(`
		CREATE TABLE IF NOT EXISTS entity_communities (
			id TEXT PRIMARY KEY,
			agent_id TEXT NOT NULL,
			name TEXT,
			cohesion REAL DEFAULT 0.0,
			member_count INTEGER DEFAULT 0,
			created_at TEXT NOT NULL DEFAULT (datetime('now')),
			updated_at TEXT NOT NULL DEFAULT (datetime('now'))
		)
	`),Z.exec("CREATE INDEX IF NOT EXISTS idx_entity_communities_agent ON entity_communities(agent_id)"),!Z.prepare("PRAGMA table_info(entities)").all().some((z)=>z.name==="community_id"))Z.exec("ALTER TABLE entities ADD COLUMN community_id TEXT REFERENCES entity_communities(id)")}function h9(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS memory_hints (
			id TEXT PRIMARY KEY,
			memory_id TEXT NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
			agent_id TEXT NOT NULL,
			hint TEXT NOT NULL,
			created_at TEXT NOT NULL DEFAULT (datetime('now')),
			UNIQUE(memory_id, hint)
		)
	`),Z.exec("CREATE INDEX IF NOT EXISTS idx_hints_memory ON memory_hints(memory_id)"),Z.exec("CREATE INDEX IF NOT EXISTS idx_hints_agent ON memory_hints(agent_id)"),Z.exec(`
		CREATE VIRTUAL TABLE IF NOT EXISTS memory_hints_fts USING fts5(
			hint,
			content='memory_hints', content_rowid='rowid'
		)
	`),Z.exec(`
		CREATE TRIGGER IF NOT EXISTS memory_hints_fts_ai AFTER INSERT ON memory_hints BEGIN
			INSERT INTO memory_hints_fts(rowid, hint)
			VALUES (new.rowid, new.hint);
		END
	`),Z.exec(`
		CREATE TRIGGER IF NOT EXISTS memory_hints_fts_ad AFTER DELETE ON memory_hints BEGIN
			INSERT INTO memory_hints_fts(memory_hints_fts, rowid, hint)
			VALUES ('delete', old.rowid, old.hint);
		END
	`),Z.exec(`
		CREATE TRIGGER IF NOT EXISTS memory_hints_fts_au AFTER UPDATE ON memory_hints BEGIN
			INSERT INTO memory_hints_fts(memory_hints_fts, rowid, hint)
			VALUES ('delete', old.rowid, old.hint);
			INSERT INTO memory_hints_fts(rowid, hint)
			VALUES (new.rowid, new.hint);
		END
	`)}function v9(Z){Z.exec(`
		DELETE FROM entity_dependencies
		WHERE id NOT IN (
			SELECT MIN(id) FROM entity_dependencies
			GROUP BY source_entity_id, target_entity_id,
			         dependency_type, agent_id
		)
	`),Z.exec(`
		CREATE UNIQUE INDEX IF NOT EXISTS
			idx_entity_deps_unique
		ON entity_dependencies(
			source_entity_id, target_entity_id,
			dependency_type, agent_id
		)
	`)}function y9(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS session_transcripts (
			session_key TEXT PRIMARY KEY,
			content TEXT NOT NULL,
			harness TEXT,
			project TEXT,
			agent_id TEXT NOT NULL DEFAULT 'default',
			created_at TEXT NOT NULL
		);

		CREATE INDEX IF NOT EXISTS idx_st_project
			ON session_transcripts(project);
		CREATE INDEX IF NOT EXISTS idx_st_created
			ON session_transcripts(created_at);
	`)}function m9(Z,X,z,W){if(!Z.prepare(`PRAGMA table_info(${X})`).all().some((q)=>q.name===z))Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function u9(Z){m9(Z,"session_memories","path_json","TEXT"),Z.exec(`
		CREATE TABLE IF NOT EXISTS path_feedback_events (
			id TEXT PRIMARY KEY,
			agent_id TEXT NOT NULL,
			session_key TEXT NOT NULL,
			memory_id TEXT NOT NULL,
			path_hash TEXT NOT NULL,
			path_json TEXT NOT NULL,
			rating REAL NOT NULL,
			reward REAL NOT NULL DEFAULT 0,
			reward_forward REAL NOT NULL DEFAULT 0,
			reward_update REAL NOT NULL DEFAULT 0,
			reward_downstream REAL NOT NULL DEFAULT 0,
			reward_dead_end REAL NOT NULL DEFAULT 0,
			created_at TEXT NOT NULL
		);

		CREATE INDEX IF NOT EXISTS idx_path_feedback_events_agent_path
			ON path_feedback_events(agent_id, path_hash);
		CREATE INDEX IF NOT EXISTS idx_path_feedback_events_session
			ON path_feedback_events(session_key);
		CREATE INDEX IF NOT EXISTS idx_path_feedback_events_memory
			ON path_feedback_events(memory_id);

		CREATE TABLE IF NOT EXISTS path_feedback_stats (
			agent_id TEXT NOT NULL,
			path_hash TEXT NOT NULL,
			path_json TEXT NOT NULL,
			q_value REAL NOT NULL DEFAULT 0,
			sample_count INTEGER NOT NULL DEFAULT 0,
			positive_count INTEGER NOT NULL DEFAULT 0,
			negative_count INTEGER NOT NULL DEFAULT 0,
			neutral_count INTEGER NOT NULL DEFAULT 0,
			updated_at TEXT NOT NULL,
			created_at TEXT NOT NULL,
			PRIMARY KEY (agent_id, path_hash)
		);

		CREATE TABLE IF NOT EXISTS entity_retrieval_stats (
			agent_id TEXT NOT NULL,
			entity_id TEXT NOT NULL,
			session_count INTEGER NOT NULL DEFAULT 0,
			last_session_key TEXT,
			updated_at TEXT NOT NULL,
			created_at TEXT NOT NULL,
			PRIMARY KEY (agent_id, entity_id)
		);

		CREATE TABLE IF NOT EXISTS entity_cooccurrence (
			agent_id TEXT NOT NULL,
			source_entity_id TEXT NOT NULL,
			target_entity_id TEXT NOT NULL,
			session_count INTEGER NOT NULL DEFAULT 0,
			last_session_key TEXT,
			updated_at TEXT NOT NULL,
			created_at TEXT NOT NULL,
			PRIMARY KEY (agent_id, source_entity_id, target_entity_id)
		);

		CREATE TABLE IF NOT EXISTS path_feedback_sessions (
			agent_id TEXT NOT NULL,
			session_key TEXT NOT NULL,
			created_at TEXT NOT NULL,
			PRIMARY KEY (agent_id, session_key)
		);
	`)}function G8(Z,X,z,W){if(Z.prepare(`PRAGMA table_info(${X})`).all().some((q)=>q.name===z))return;Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function d9(Z){G8(Z,"session_memories","entity_slot","INTEGER"),G8(Z,"session_memories","aspect_slot","INTEGER"),G8(Z,"session_memories","is_constraint","INTEGER NOT NULL DEFAULT 0"),G8(Z,"session_memories","structural_density","INTEGER"),G8(Z,"session_memories","predictor_rank","INTEGER"),G8(Z,"session_memories","agent_relevance_score","REAL"),G8(Z,"session_memories","agent_feedback_count","INTEGER DEFAULT 0"),G8(Z,"session_memories","path_json","TEXT");let W=Z.prepare("PRAGMA table_info(session_memories)").all().some((_)=>_.name==="agent_id")?"COALESCE(NULLIF(agent_id, ''), 'default')":"'default'";Z.exec(`
		CREATE TABLE IF NOT EXISTS session_memories_new (
			id TEXT PRIMARY KEY,
			session_key TEXT NOT NULL,
			agent_id TEXT NOT NULL DEFAULT 'default',
			memory_id TEXT NOT NULL,
			source TEXT NOT NULL,
			effective_score REAL,
			predictor_score REAL,
			final_score REAL NOT NULL,
			rank INTEGER NOT NULL,
			was_injected INTEGER NOT NULL,
			relevance_score REAL,
			fts_hit_count INTEGER NOT NULL DEFAULT 0,
			agent_preference TEXT,
			created_at TEXT NOT NULL,
			entity_slot INTEGER,
			aspect_slot INTEGER,
			is_constraint INTEGER NOT NULL DEFAULT 0,
			structural_density INTEGER,
			predictor_rank INTEGER,
			agent_relevance_score REAL,
			agent_feedback_count INTEGER DEFAULT 0,
			path_json TEXT,
			UNIQUE(session_key, agent_id, memory_id)
		);

		INSERT INTO session_memories_new
			(id, session_key, agent_id, memory_id, source,
			 effective_score, predictor_score, final_score, rank,
			 was_injected, relevance_score, fts_hit_count,
			 agent_preference, created_at, entity_slot, aspect_slot,
			 is_constraint, structural_density, predictor_rank,
			 agent_relevance_score, agent_feedback_count, path_json)
		SELECT
			id,
			session_key,
			${W},
			memory_id,
			source,
			effective_score,
			predictor_score,
			final_score,
			rank,
			was_injected,
			relevance_score,
			fts_hit_count,
			agent_preference,
			created_at,
			entity_slot,
			aspect_slot,
			COALESCE(is_constraint, 0),
			structural_density,
			predictor_rank,
			agent_relevance_score,
			COALESCE(agent_feedback_count, 0),
			path_json
		FROM session_memories;

		DROP TABLE session_memories;
		ALTER TABLE session_memories_new RENAME TO session_memories;

		CREATE INDEX IF NOT EXISTS idx_session_memories_session
			ON session_memories(session_key);
		CREATE INDEX IF NOT EXISTS idx_session_memories_memory
			ON session_memories(memory_id);
		CREATE INDEX IF NOT EXISTS idx_session_memories_agent_session
			ON session_memories(agent_id, session_key);
	`)}function v5(Z,X,z,W){if(Z.prepare(`PRAGMA table_info(${X})`).all().some((q)=>q.name===z))return;Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function c9(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS agents (
			id           TEXT PRIMARY KEY,
			name         TEXT,
			read_policy  TEXT NOT NULL DEFAULT 'isolated',
			policy_group TEXT,
			created_at   TEXT NOT NULL,
			updated_at   TEXT NOT NULL
		);
	`);let X=new Date().toISOString();Z.prepare(`INSERT OR IGNORE INTO agents (id, name, read_policy, created_at, updated_at)
		 VALUES ('default', 'default', 'shared', ?, ?)`).run(X,X),v5(Z,"memories","agent_id","TEXT DEFAULT 'default'"),v5(Z,"memories","visibility","TEXT DEFAULT 'global'"),Z.exec(`
		CREATE INDEX IF NOT EXISTS idx_memories_agent_id
			ON memories(agent_id);
		CREATE INDEX IF NOT EXISTS idx_memories_agent_visibility
			ON memories(agent_id, visibility);
	`)}function f6(Z,X,z,W){if(Z.prepare(`PRAGMA table_info(${X})`).all().some((q)=>q.name===z))return;Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function p9(Z){f6(Z,"session_summaries","source_type","TEXT"),f6(Z,"session_summaries","source_ref","TEXT"),f6(Z,"session_summaries","meta_json","TEXT"),Z.exec(`
		UPDATE session_summaries
		SET source_type = CASE
			WHEN source_type IS NOT NULL THEN source_type
			WHEN kind = 'session' THEN 'summary'
			WHEN kind IN ('arc', 'epoch') THEN 'condensation'
			ELSE kind
		END
		WHERE source_type IS NULL;

		CREATE INDEX IF NOT EXISTS idx_summaries_source_type
			ON session_summaries(source_type);
		CREATE INDEX IF NOT EXISTS idx_summaries_source_ref
			ON session_summaries(source_ref);
	`)}function x6(Z,X,z,W){if(Z.prepare(`PRAGMA table_info(${X})`).all().some((q)=>q.name===z))return;Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function l9(Z){x6(Z,"session_transcripts","updated_at","TEXT"),x6(Z,"summary_jobs","agent_id","TEXT NOT NULL DEFAULT 'default'"),x6(Z,"session_scores","agent_id","TEXT NOT NULL DEFAULT 'default'"),Z.exec(`
		UPDATE session_transcripts
		SET updated_at = COALESCE(updated_at, created_at)
		WHERE updated_at IS NULL;

		UPDATE summary_jobs
		SET agent_id = COALESCE(agent_id, 'default')
		WHERE agent_id IS NULL;

		UPDATE session_scores
		SET agent_id = COALESCE(agent_id, 'default')
		WHERE agent_id IS NULL;

		CREATE INDEX IF NOT EXISTS idx_st_agent_updated
			ON session_transcripts(agent_id, updated_at);
		CREATE INDEX IF NOT EXISTS idx_summary_jobs_agent
			ON summary_jobs(agent_id, created_at);
		CREATE INDEX IF NOT EXISTS idx_session_scores_agent_session
			ON session_scores(agent_id, session_key, created_at);
	`),Z.exec(`
		CREATE VIRTUAL TABLE IF NOT EXISTS session_transcripts_fts USING fts5(
			content,
			content='session_transcripts',
			content_rowid='rowid'
		)
	`),Z.exec(`
		CREATE TRIGGER IF NOT EXISTS session_transcripts_fts_ai AFTER INSERT ON session_transcripts BEGIN
			INSERT INTO session_transcripts_fts(rowid, content)
			VALUES (new.rowid, new.content);
		END
	`),Z.exec(`
		CREATE TRIGGER IF NOT EXISTS session_transcripts_fts_ad AFTER DELETE ON session_transcripts BEGIN
			INSERT INTO session_transcripts_fts(session_transcripts_fts, rowid, content)
			VALUES ('delete', old.rowid, old.content);
		END
	`),Z.exec(`
		CREATE TRIGGER IF NOT EXISTS session_transcripts_fts_au AFTER UPDATE ON session_transcripts BEGIN
			INSERT INTO session_transcripts_fts(session_transcripts_fts, rowid, content)
			VALUES ('delete', old.rowid, old.content);
			INSERT INTO session_transcripts_fts(rowid, content)
			VALUES (new.rowid, new.content);
		END
	`),Z.exec(`
		INSERT INTO session_transcripts_fts(session_transcripts_fts)
		VALUES ('rebuild');
	`),Z.exec(`
		CREATE TABLE IF NOT EXISTS memory_md_heads (
			agent_id TEXT PRIMARY KEY,
			content TEXT NOT NULL DEFAULT '',
			content_hash TEXT NOT NULL DEFAULT '',
			revision INTEGER NOT NULL DEFAULT 0,
			updated_at TEXT NOT NULL,
			lease_token TEXT,
			lease_owner TEXT,
			lease_expires_at TEXT
		);

		CREATE INDEX IF NOT EXISTS idx_memory_md_heads_lease
			ON memory_md_heads(lease_expires_at);
	`)}function n9(Z){Z.exec(`
		DROP INDEX IF EXISTS idx_summaries_session_depth;

		CREATE TEMP TABLE IF NOT EXISTS session_summary_duplicate_map AS
		WITH ranked AS (
			SELECT
				id,
				agent_id,
				session_key,
				depth,
				ROW_NUMBER() OVER (
					PARTITION BY agent_id, session_key, depth
					ORDER BY latest_at DESC, created_at DESC, id ASC
				) AS rn
			FROM session_summaries
			WHERE session_key IS NOT NULL
			  AND COALESCE(source_type, 'summary') = 'summary'
		)
		SELECT dup.id AS drop_id, keep.id AS keep_id
		FROM ranked dup
		JOIN ranked keep
		  ON keep.agent_id = dup.agent_id
		 AND keep.session_key = dup.session_key
		 AND keep.depth = dup.depth
		 AND keep.rn = 1
		WHERE dup.rn > 1;

		INSERT OR IGNORE INTO session_summary_memories (summary_id, memory_id)
		SELECT map.keep_id, link.memory_id
		FROM session_summary_duplicate_map map
		JOIN session_summary_memories link ON link.summary_id = map.drop_id;

		INSERT OR IGNORE INTO session_summary_children (parent_id, child_id, ordinal)
		SELECT
			COALESCE(parent_map.keep_id, rel.parent_id),
			COALESCE(child_map.keep_id, rel.child_id),
			rel.ordinal
		FROM session_summary_children rel
		LEFT JOIN session_summary_duplicate_map parent_map ON parent_map.drop_id = rel.parent_id
		LEFT JOIN session_summary_duplicate_map child_map ON child_map.drop_id = rel.child_id
		WHERE parent_map.drop_id IS NOT NULL OR child_map.drop_id IS NOT NULL;

		DELETE FROM session_summary_children
		WHERE parent_id IN (SELECT drop_id FROM session_summary_duplicate_map)
		   OR child_id IN (SELECT drop_id FROM session_summary_duplicate_map);

		DELETE FROM session_summary_memories
		WHERE summary_id IN (SELECT drop_id FROM session_summary_duplicate_map);

		DELETE FROM session_summaries
		WHERE id IN (SELECT drop_id FROM session_summary_duplicate_map);

		DROP TABLE session_summary_duplicate_map;

		CREATE UNIQUE INDEX IF NOT EXISTS idx_summaries_session_depth_summary
			ON session_summaries(agent_id, session_key, depth)
			WHERE session_key IS NOT NULL
			  AND COALESCE(source_type, 'summary') = 'summary';
	`)}function i9(Z){Z.exec(`
		DROP TRIGGER IF EXISTS session_transcripts_fts_ai;
		DROP TRIGGER IF EXISTS session_transcripts_fts_ad;
		DROP TRIGGER IF EXISTS session_transcripts_fts_au;
		DROP TABLE IF EXISTS session_transcripts_fts;

		CREATE TABLE IF NOT EXISTS session_transcripts_next (
			session_key TEXT NOT NULL,
			content TEXT NOT NULL,
			harness TEXT,
			project TEXT,
			agent_id TEXT NOT NULL DEFAULT 'default',
			created_at TEXT NOT NULL,
			updated_at TEXT,
			PRIMARY KEY (agent_id, session_key)
		);

		INSERT INTO session_transcripts_next (
			session_key,
			content,
			harness,
			project,
			agent_id,
			created_at,
			updated_at
		)
		SELECT
			session_key,
			content,
			harness,
			project,
			agent_id,
			created_at,
			updated_at
		FROM (
			SELECT
				session_key,
				content,
				harness,
				project,
				COALESCE(agent_id, 'default') AS agent_id,
				created_at,
				COALESCE(updated_at, created_at) AS updated_at,
				ROW_NUMBER() OVER (
					PARTITION BY COALESCE(agent_id, 'default'), session_key
					ORDER BY COALESCE(updated_at, created_at) DESC, LENGTH(content) DESC, created_at DESC, rowid DESC
				) AS rn
			FROM session_transcripts
		) ranked
		WHERE rn = 1;

		DROP TABLE session_transcripts;
		ALTER TABLE session_transcripts_next RENAME TO session_transcripts;

		CREATE INDEX IF NOT EXISTS idx_st_project
			ON session_transcripts(project);
		CREATE INDEX IF NOT EXISTS idx_st_created
			ON session_transcripts(created_at);
		CREATE INDEX IF NOT EXISTS idx_st_agent_updated
			ON session_transcripts(agent_id, updated_at);

		CREATE VIRTUAL TABLE IF NOT EXISTS session_transcripts_fts USING fts5(
			content,
			content='session_transcripts',
			content_rowid='rowid'
		);

		CREATE TRIGGER IF NOT EXISTS session_transcripts_fts_ai AFTER INSERT ON session_transcripts BEGIN
			INSERT INTO session_transcripts_fts(rowid, content)
			VALUES (new.rowid, new.content);
		END;

		CREATE TRIGGER IF NOT EXISTS session_transcripts_fts_ad AFTER DELETE ON session_transcripts BEGIN
			INSERT INTO session_transcripts_fts(session_transcripts_fts, rowid, content)
			VALUES ('delete', old.rowid, old.content);
		END;

		CREATE TRIGGER IF NOT EXISTS session_transcripts_fts_au AFTER UPDATE ON session_transcripts BEGIN
			INSERT INTO session_transcripts_fts(session_transcripts_fts, rowid, content)
			VALUES ('delete', old.rowid, old.content);
			INSERT INTO session_transcripts_fts(rowid, content)
			VALUES (new.rowid, new.content);
		END;

		INSERT INTO session_transcripts_fts(session_transcripts_fts)
		VALUES ('rebuild');

		DROP INDEX IF EXISTS idx_summaries_session_depth;
		DROP INDEX IF EXISTS idx_summaries_session_depth_summary;
		CREATE INDEX IF NOT EXISTS idx_summaries_agent_session_key
			ON session_summaries(agent_id, session_key);
		CREATE UNIQUE INDEX IF NOT EXISTS idx_summaries_agent_session_depth_summary
			ON session_summaries(agent_id, session_key, depth)
			WHERE session_key IS NOT NULL
			  AND COALESCE(source_type, 'summary') = 'summary';
	`)}function o9(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS memory_thread_heads (
			agent_id TEXT NOT NULL DEFAULT 'default',
			thread_key TEXT NOT NULL,
			label TEXT NOT NULL,
			project TEXT,
			session_key TEXT,
			source_type TEXT NOT NULL DEFAULT 'summary',
			source_ref TEXT,
			harness TEXT,
			node_id TEXT NOT NULL,
			latest_at TEXT NOT NULL,
			sample TEXT NOT NULL,
			updated_at TEXT NOT NULL,
			PRIMARY KEY (agent_id, thread_key)
		);

		CREATE INDEX IF NOT EXISTS idx_thread_heads_agent_latest
			ON memory_thread_heads(agent_id, latest_at DESC);
		CREATE INDEX IF NOT EXISTS idx_thread_heads_agent_project
			ON memory_thread_heads(agent_id, project);

		INSERT INTO memory_thread_heads (
			agent_id, thread_key, label, project, session_key, source_type,
			source_ref, harness, node_id, latest_at, sample, updated_at
		)
		SELECT
			ss.agent_id,
			CASE
				WHEN ss.harness IS NOT NULL AND TRIM(ss.harness) != ''
						AND (ss.project IS NULL OR TRIM(ss.project) = '')
						AND (ss.source_ref IS NULL OR TRIM(ss.source_ref) = '')
						AND (ss.session_key IS NULL OR TRIM(ss.session_key) = '')
					THEN 'harness:' || TRIM(ss.harness)
				ELSE
					CASE
						WHEN ss.source_ref IS NOT NULL AND TRIM(ss.source_ref) != '' AND ss.project IS NOT NULL AND TRIM(ss.project) != '' THEN
							'project:' || TRIM(ss.project) || '|source:' || TRIM(ss.source_ref)
						WHEN ss.source_ref IS NOT NULL AND TRIM(ss.source_ref) != '' THEN 'source:' || TRIM(ss.source_ref)
						WHEN ss.session_key IS NOT NULL AND TRIM(ss.session_key) != '' AND ss.project IS NOT NULL AND TRIM(ss.project) != '' THEN
							'project:' || TRIM(ss.project) || '|session:' || TRIM(ss.session_key)
						WHEN ss.project IS NOT NULL AND TRIM(ss.project) != '' THEN 'project:' || TRIM(ss.project)
						WHEN ss.session_key IS NOT NULL AND TRIM(ss.session_key) != '' THEN 'session:' || TRIM(ss.session_key)
						ELSE 'thread:unscoped'
					END ||
					CASE
						WHEN ss.harness IS NOT NULL AND TRIM(ss.harness) != '' THEN '|harness:' || TRIM(ss.harness)
						ELSE ''
					END
			END AS thread_key,
			CASE
				WHEN ss.source_ref IS NOT NULL AND TRIM(ss.source_ref) != '' AND ss.project IS NOT NULL AND TRIM(ss.project) != '' THEN
					'project:' || TRIM(ss.project) || '#source:' || TRIM(ss.source_ref)
				WHEN ss.source_ref IS NOT NULL AND TRIM(ss.source_ref) != '' THEN 'source:' || TRIM(ss.source_ref)
				WHEN ss.session_key IS NOT NULL AND TRIM(ss.session_key) != '' AND ss.project IS NOT NULL AND TRIM(ss.project) != '' THEN
					'project:' || TRIM(ss.project) || '#session:' || TRIM(ss.session_key)
				WHEN ss.project IS NOT NULL AND TRIM(ss.project) != '' THEN 'project:' || TRIM(ss.project)
				WHEN ss.session_key IS NOT NULL AND TRIM(ss.session_key) != '' THEN 'session:' || TRIM(ss.session_key)
				WHEN ss.harness IS NOT NULL AND TRIM(ss.harness) != '' THEN 'harness:' || TRIM(ss.harness)
				ELSE 'thread:unscoped'
			END AS label,
			ss.project,
			ss.session_key,
			COALESCE(ss.source_type, ss.kind, 'summary') AS source_type,
			ss.source_ref,
			ss.harness,
			ss.id AS node_id,
			ss.latest_at,
			SUBSTR(REPLACE(REPLACE(TRIM(ss.content), CHAR(10), ' '), CHAR(13), ' '), 1, 240) AS sample,
			ss.latest_at AS updated_at
		FROM (
			SELECT
				s0.*,
				ROW_NUMBER() OVER (
					PARTITION BY s0.agent_id,
					CASE
						WHEN s0.harness IS NOT NULL AND TRIM(s0.harness) != ''
								AND (s0.project IS NULL OR TRIM(s0.project) = '')
								AND (s0.source_ref IS NULL OR TRIM(s0.source_ref) = '')
								AND (s0.session_key IS NULL OR TRIM(s0.session_key) = '')
							THEN 'harness:' || TRIM(s0.harness)
						ELSE
							CASE
								WHEN s0.source_ref IS NOT NULL AND TRIM(s0.source_ref) != '' AND s0.project IS NOT NULL AND TRIM(s0.project) != '' THEN
									'project:' || TRIM(s0.project) || '|source:' || TRIM(s0.source_ref)
								WHEN s0.source_ref IS NOT NULL AND TRIM(s0.source_ref) != '' THEN 'source:' || TRIM(s0.source_ref)
								WHEN s0.session_key IS NOT NULL AND TRIM(s0.session_key) != '' AND s0.project IS NOT NULL AND TRIM(s0.project) != '' THEN
									'project:' || TRIM(s0.project) || '|session:' || TRIM(s0.session_key)
								WHEN s0.project IS NOT NULL AND TRIM(s0.project) != '' THEN 'project:' || TRIM(s0.project)
								WHEN s0.session_key IS NOT NULL AND TRIM(s0.session_key) != '' THEN 'session:' || TRIM(s0.session_key)
								ELSE 'thread:unscoped'
							END ||
							CASE
								WHEN s0.harness IS NOT NULL AND TRIM(s0.harness) != '' THEN '|harness:' || TRIM(s0.harness)
								ELSE ''
							END
					END
					ORDER BY s0.latest_at DESC, s0.created_at DESC
				) AS rn
			FROM session_summaries s0
			WHERE COALESCE(s0.source_type, s0.kind) != 'chunk'
		) ss
		WHERE ss.rn = 1
		ON CONFLICT(agent_id, thread_key) DO UPDATE SET
			label = excluded.label,
			project = excluded.project,
			session_key = excluded.session_key,
			source_type = excluded.source_type,
			source_ref = excluded.source_ref,
			harness = excluded.harness,
			node_id = excluded.node_id,
			latest_at = excluded.latest_at,
			sample = excluded.sample,
			updated_at = excluded.updated_at
		WHERE excluded.latest_at >= memory_thread_heads.latest_at;
	`)}function s9(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS session_extract_cursors (
			session_key TEXT NOT NULL,
			agent_id TEXT NOT NULL DEFAULT 'default',
			last_offset INTEGER NOT NULL DEFAULT 0,
			last_extract_at TEXT NOT NULL,
			PRIMARY KEY (session_key, agent_id)
		);
	`)}function a9(Z,X){return Z.prepare(`SELECT name
			 FROM sqlite_master
			 WHERE type = 'table' AND name = ?
			 LIMIT 1`).get(X)!==void 0}function r9(Z){if(Z.exec(`
		CREATE TABLE IF NOT EXISTS entity_dependency_history (
			id                TEXT PRIMARY KEY,
			dependency_id     TEXT NOT NULL,
			source_entity_id  TEXT NOT NULL,
			target_entity_id  TEXT NOT NULL,
			agent_id          TEXT NOT NULL DEFAULT 'default',
			dependency_type   TEXT NOT NULL,
			event             TEXT NOT NULL,
			changed_by        TEXT NOT NULL,
			reason            TEXT NOT NULL,
			previous_reason   TEXT,
			metadata          TEXT,
			created_at        TEXT NOT NULL DEFAULT (datetime('now'))
		);

		CREATE INDEX IF NOT EXISTS idx_entity_dependency_history_dep
			ON entity_dependency_history(dependency_id);
		CREATE INDEX IF NOT EXISTS idx_entity_dependency_history_agent
			ON entity_dependency_history(agent_id);
		CREATE INDEX IF NOT EXISTS idx_entity_dependency_history_created
			ON entity_dependency_history(created_at DESC);
	`),!a9(Z,"entity_dependencies"))return;Z.exec("DROP TRIGGER IF EXISTS trg_entity_dependencies_related_to_reason_insert"),Z.exec("DROP TRIGGER IF EXISTS trg_entity_dependencies_related_to_reason_update"),Z.exec("DROP TRIGGER IF EXISTS trg_entity_dependencies_audit_insert"),Z.exec("DROP TRIGGER IF EXISTS trg_entity_dependencies_audit_update"),Z.exec("DROP TRIGGER IF EXISTS trg_entity_dependencies_audit_delete"),Z.exec(`
		CREATE TRIGGER trg_entity_dependencies_related_to_reason_insert
		BEFORE INSERT ON entity_dependencies
		FOR EACH ROW
		WHEN NEW.dependency_type = 'related_to'
		  AND (NEW.reason IS NULL OR length(trim(NEW.reason)) = 0)
		BEGIN
			SELECT RAISE(ABORT, 'related_to dependencies require a non-empty reason');
		END;
	`),Z.exec(`
		CREATE TRIGGER trg_entity_dependencies_related_to_reason_update
		BEFORE UPDATE OF dependency_type, reason ON entity_dependencies
		FOR EACH ROW
		WHEN NEW.dependency_type = 'related_to'
		  AND (NEW.reason IS NULL OR length(trim(NEW.reason)) = 0)
		BEGIN
			SELECT RAISE(ABORT, 'related_to dependencies require a non-empty reason');
		END;
	`),Z.exec(`
		CREATE TRIGGER trg_entity_dependencies_audit_insert
		AFTER INSERT ON entity_dependencies
		FOR EACH ROW
		BEGIN
			INSERT INTO entity_dependency_history (
				id, dependency_id, source_entity_id, target_entity_id, agent_id,
				dependency_type, event, changed_by, reason, previous_reason,
				metadata, created_at
			) VALUES (
				lower(hex(randomblob(16))),
				NEW.id,
				NEW.source_entity_id,
				NEW.target_entity_id,
				NEW.agent_id,
				NEW.dependency_type,
				'created',
				'db-trigger',
				COALESCE(NEW.reason, 'created without reason'),
				NULL,
				'{"source":"trg_entity_dependencies_audit_insert"}',
				datetime('now')
			);
		END;
	`),Z.exec(`
		CREATE TRIGGER trg_entity_dependencies_audit_update
		AFTER UPDATE ON entity_dependencies
		FOR EACH ROW
		BEGIN
			INSERT INTO entity_dependency_history (
				id, dependency_id, source_entity_id, target_entity_id, agent_id,
				dependency_type, event, changed_by, reason, previous_reason,
				metadata, created_at
			) VALUES (
				lower(hex(randomblob(16))),
				NEW.id,
				NEW.source_entity_id,
				NEW.target_entity_id,
				NEW.agent_id,
				NEW.dependency_type,
				'updated',
				'db-trigger',
				COALESCE(NEW.reason, 'updated without reason'),
				OLD.reason,
				'{"source":"trg_entity_dependencies_audit_update"}',
				datetime('now')
			);
		END;
	`),Z.exec(`
		CREATE TRIGGER trg_entity_dependencies_audit_delete
		AFTER DELETE ON entity_dependencies
		FOR EACH ROW
		BEGIN
			INSERT INTO entity_dependency_history (
				id, dependency_id, source_entity_id, target_entity_id, agent_id,
				dependency_type, event, changed_by, reason, previous_reason,
				metadata, created_at
			) VALUES (
				lower(hex(randomblob(16))),
				OLD.id,
				OLD.source_entity_id,
				OLD.target_entity_id,
				OLD.agent_id,
				OLD.dependency_type,
				'deleted',
				'db-trigger',
				COALESCE(OLD.reason, 'deleted without reason'),
				NULL,
				'{"source":"trg_entity_dependencies_audit_delete"}',
				datetime('now')
			);
		END;
	`),Z.exec(`
		INSERT INTO entity_dependency_history (
			id, dependency_id, source_entity_id, target_entity_id, agent_id,
			dependency_type, event, changed_by, reason, previous_reason,
			metadata, created_at
		)
		SELECT
			lower(hex(randomblob(16))),
			d.id,
			d.source_entity_id,
			d.target_entity_id,
			d.agent_id,
			d.dependency_type,
			'backfill',
			'migration-050',
			CASE
				WHEN d.reason IS NULL OR length(trim(d.reason)) = 0
					THEN 'legacy dependency without recorded reason'
				ELSE d.reason
			END,
			NULL,
			'{"source":"migration-050"}',
			datetime('now')
		FROM entity_dependencies d
		WHERE NOT EXISTS (
			SELECT 1
			FROM entity_dependency_history h
			WHERE h.dependency_id = d.id
			  AND h.event = 'backfill'
		  )
	`),Z.exec(`
		UPDATE entity_dependencies
		SET reason = 'legacy-unattributed related_to edge'
		WHERE dependency_type = 'related_to'
		  AND (reason IS NULL OR length(trim(reason)) = 0)
	`)}function UZ(Z,X,z,W){if(Z.prepare(`PRAGMA table_info(${X})`).all().some((q)=>q.name===z))return;Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function t9(Z){UZ(Z,"summary_jobs","session_id","TEXT"),UZ(Z,"summary_jobs","trigger","TEXT NOT NULL DEFAULT 'session_end'"),UZ(Z,"summary_jobs","captured_at","TEXT"),UZ(Z,"summary_jobs","started_at","TEXT"),UZ(Z,"summary_jobs","ended_at","TEXT"),Z.exec(`
		UPDATE summary_jobs
		SET
			session_id = COALESCE(session_id, session_key, id),
			trigger = COALESCE(NULLIF(trigger, ''), 'session_end'),
			captured_at = COALESCE(captured_at, completed_at, created_at),
			ended_at = COALESCE(ended_at, completed_at)
		WHERE 1 = 1;

		CREATE INDEX IF NOT EXISTS idx_summary_jobs_agent_trigger
			ON summary_jobs(agent_id, trigger, created_at);
		CREATE INDEX IF NOT EXISTS idx_summary_jobs_agent_session
			ON summary_jobs(agent_id, session_key, created_at);
	`),Z.exec(`
		CREATE TABLE IF NOT EXISTS memory_artifacts (
			agent_id TEXT NOT NULL DEFAULT 'default',
			source_path TEXT NOT NULL,
			source_sha256 TEXT NOT NULL,
			source_kind TEXT NOT NULL,
			session_id TEXT NOT NULL,
			session_key TEXT,
			session_token TEXT NOT NULL,
			project TEXT,
			harness TEXT,
			captured_at TEXT NOT NULL,
			started_at TEXT,
			ended_at TEXT,
			manifest_path TEXT,
			source_node_id TEXT,
			memory_sentence TEXT,
			memory_sentence_quality TEXT,
			content TEXT NOT NULL DEFAULT '',
			updated_at TEXT NOT NULL,
			PRIMARY KEY (agent_id, source_path)
		);

		CREATE INDEX IF NOT EXISTS idx_memory_artifacts_agent_kind
			ON memory_artifacts(agent_id, source_kind, captured_at DESC);
		CREATE INDEX IF NOT EXISTS idx_memory_artifacts_agent_session
			ON memory_artifacts(agent_id, session_token, captured_at DESC);
		CREATE INDEX IF NOT EXISTS idx_memory_artifacts_agent_membership
			ON memory_artifacts(agent_id, COALESCE(ended_at, captured_at) DESC);

		CREATE TABLE IF NOT EXISTS memory_artifact_tombstones (
			agent_id TEXT NOT NULL DEFAULT 'default',
			session_token TEXT NOT NULL,
			removed_at TEXT NOT NULL,
			reason TEXT NOT NULL,
			removed_paths TEXT NOT NULL,
			PRIMARY KEY (agent_id, session_token)
		);
	`),Z.exec(`
		CREATE VIRTUAL TABLE IF NOT EXISTS memory_artifacts_fts USING fts5(
			content,
			source_path,
			content='memory_artifacts',
			content_rowid='rowid'
		)
	`),Z.exec(`
		CREATE TRIGGER IF NOT EXISTS memory_artifacts_fts_ai AFTER INSERT ON memory_artifacts BEGIN
			INSERT INTO memory_artifacts_fts(rowid, content, source_path)
			VALUES (new.rowid, new.content, new.source_path);
		END
	`),Z.exec(`
		CREATE TRIGGER IF NOT EXISTS memory_artifacts_fts_ad AFTER DELETE ON memory_artifacts BEGIN
			INSERT INTO memory_artifacts_fts(memory_artifacts_fts, rowid, content, source_path)
			VALUES ('delete', old.rowid, old.content, old.source_path);
		END
	`),Z.exec(`
		CREATE TRIGGER IF NOT EXISTS memory_artifacts_fts_au AFTER UPDATE ON memory_artifacts BEGIN
			INSERT INTO memory_artifacts_fts(memory_artifacts_fts, rowid, content, source_path)
			VALUES ('delete', old.rowid, old.content, old.source_path);
			INSERT INTO memory_artifacts_fts(rowid, content, source_path)
			VALUES (new.rowid, new.content, new.source_path);
		END
	`),Z.exec(`
		INSERT INTO memory_artifacts_fts(memory_artifacts_fts)
		VALUES ('rebuild');
	`)}function e9(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS mcp_invocations (
			id          TEXT PRIMARY KEY,
			server_id   TEXT NOT NULL,
			tool_name   TEXT NOT NULL,
			agent_id    TEXT NOT NULL DEFAULT 'default',
			source      TEXT NOT NULL CHECK(source IN ('cli','agent','mcp','dashboard')),
			latency_ms  INTEGER NOT NULL,
			success     INTEGER NOT NULL DEFAULT 1,
			error_text  TEXT,
			created_at  TEXT NOT NULL DEFAULT (datetime('now'))
		);
		CREATE INDEX IF NOT EXISTS idx_mcp_inv_server ON mcp_invocations(server_id, created_at);
		CREATE INDEX IF NOT EXISTS idx_mcp_inv_agent ON mcp_invocations(agent_id, created_at);
	`)}function Zz(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS skill_invocations (
			id          TEXT PRIMARY KEY,
			skill_name  TEXT NOT NULL,
			agent_id    TEXT NOT NULL DEFAULT 'default',
			source      TEXT NOT NULL CHECK(source IN ('agent','scheduler','api')),
			latency_ms  INTEGER NOT NULL,
			success     INTEGER NOT NULL DEFAULT 1,
			error_text  TEXT,
			created_at  TEXT NOT NULL DEFAULT (datetime('now'))
		);
		CREATE INDEX IF NOT EXISTS idx_skill_inv_name ON skill_invocations(skill_name, created_at);
		CREATE INDEX IF NOT EXISTS idx_skill_inv_agent ON skill_invocations(agent_id, created_at);
	`)}function Xz(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS task_scope_hints (
			task_id     TEXT PRIMARY KEY REFERENCES scheduled_tasks(id) ON DELETE CASCADE,
			agent_id    TEXT NOT NULL DEFAULT 'default',
			created_at  TEXT NOT NULL DEFAULT (datetime('now')),
			updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
		);

		INSERT INTO task_scope_hints (task_id, agent_id, created_at, updated_at)
		SELECT st.id,
		       MIN(sm.agent_id),
		       datetime('now'),
		       datetime('now')
		  FROM scheduled_tasks st
		  JOIN entities e
		    ON e.entity_type = 'skill'
		   AND lower(e.name) = lower(st.skill_name)
		  JOIN skill_meta sm
		    ON sm.entity_id = e.id
		   AND sm.agent_id = e.agent_id
		   AND sm.uninstalled_at IS NULL
		 WHERE st.skill_name IS NOT NULL
		 GROUP BY st.id, lower(st.skill_name)
		HAVING COUNT(DISTINCT sm.agent_id) = 1
		ON CONFLICT(task_id) DO NOTHING;

		CREATE INDEX IF NOT EXISTS idx_task_scope_hints_agent
			ON task_scope_hints(agent_id, updated_at);
	`)}function zz(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS dreaming_state (
			agent_id TEXT PRIMARY KEY NOT NULL,
			tokens_since_last_pass INTEGER NOT NULL DEFAULT 0,
			consecutive_failures INTEGER NOT NULL DEFAULT 0,
			last_pass_at TEXT,
			last_pass_id TEXT,
			last_pass_mode TEXT,
			created_at TEXT NOT NULL DEFAULT (datetime('now')),
			updated_at TEXT NOT NULL DEFAULT (datetime('now'))
		);
	`),Z.exec(`
		CREATE TABLE IF NOT EXISTS dreaming_passes (
			id TEXT PRIMARY KEY,
			agent_id TEXT NOT NULL,
			mode TEXT NOT NULL DEFAULT 'incremental',
			status TEXT NOT NULL DEFAULT 'running',
			started_at TEXT NOT NULL DEFAULT (datetime('now')),
			completed_at TEXT,
			tokens_consumed INTEGER,
			mutations_applied INTEGER,
			mutations_skipped INTEGER,
			mutations_failed INTEGER,
			summary TEXT,
			error TEXT,
			created_at TEXT NOT NULL DEFAULT (datetime('now'))
		);
	`),Z.exec(`
		CREATE INDEX IF NOT EXISTS idx_dreaming_passes_agent
		ON dreaming_passes (agent_id, created_at DESC);
	`)}function $z(Z){let X=Z.prepare("PRAGMA table_info(memories)").all(),z=new Set(X.map((W)=>W.name).filter((W)=>typeof W==="string"));if(!z.has("agent_id"))Z.exec("ALTER TABLE memories ADD COLUMN agent_id TEXT DEFAULT 'default'");if(!z.has("scope"))Z.exec("ALTER TABLE memories ADD COLUMN scope TEXT")}function Qz(Z){$z(Z),Z.exec("DROP INDEX IF EXISTS idx_memories_content_hash_unique"),Z.exec(`
		CREATE UNIQUE INDEX idx_memories_content_hash_unique
		ON memories(
			content_hash,
			COALESCE(NULLIF(agent_id, ''), 'default'),
			COALESCE(scope, '__NULL__')
		)
		WHERE content_hash IS NOT NULL AND is_deleted = 0
	`)}function Wz(Z){let X=o4(Z);if(X!==null&&!s4(X))return;i4(Z)}function Hz(Z){Z.exec(`CREATE INDEX IF NOT EXISTS idx_entities_order
			ON entities(agent_id, pinned DESC, pinned_at DESC, mentions DESC, updated_at DESC, name)`),Z.exec(`CREATE INDEX IF NOT EXISTS idx_entities_extracted_mentions
			ON entities(entity_type, mentions)
			WHERE entity_type = 'extracted'`)}function Jz(Z){if(!Z.prepare("PRAGMA table_info(entity_attributes)").all().some((z)=>z.name==="claim_key"))Z.exec("ALTER TABLE entity_attributes ADD COLUMN claim_key TEXT");Z.exec(`CREATE INDEX IF NOT EXISTS idx_entity_attributes_claim_key
			ON entity_attributes(agent_id, aspect_id, claim_key, status)
			WHERE claim_key IS NOT NULL`)}function Yz(Z){if(!Z.prepare("PRAGMA table_info(entity_attributes)").all().some((z)=>z.name==="group_key"))Z.exec("ALTER TABLE entity_attributes ADD COLUMN group_key TEXT");Z.exec(`CREATE INDEX IF NOT EXISTS idx_entity_attributes_group_key
			ON entity_attributes(agent_id, aspect_id, group_key, status)
			WHERE group_key IS NOT NULL`),Z.exec(`CREATE INDEX IF NOT EXISTS idx_entity_attributes_group_claim
			ON entity_attributes(agent_id, aspect_id, group_key, claim_key, status)
			WHERE claim_key IS NOT NULL`)}function Vz(Z){if(Z.prepare("PRAGMA table_info(memory_artifacts)").all().some((z)=>z.name==="source_mtime_ms"))return;Z.exec("ALTER TABLE memory_artifacts ADD COLUMN source_mtime_ms REAL")}function _z(Z){let X=Z.prepare("PRAGMA table_info(memory_artifacts)").all(),z=new Set(X.map((W)=>W.name));if(!z.has("is_deleted"))Z.exec("ALTER TABLE memory_artifacts ADD COLUMN is_deleted INTEGER NOT NULL DEFAULT 0");if(!z.has("deleted_at"))Z.exec("ALTER TABLE memory_artifacts ADD COLUMN deleted_at TEXT");Z.exec(`
		CREATE INDEX IF NOT EXISTS idx_memory_artifacts_agent_deleted
			ON memory_artifacts(agent_id, is_deleted, deleted_at)
	`)}function Bz(Z){Z.exec("DROP TRIGGER IF EXISTS memories_au"),Z.exec(`
		CREATE TRIGGER IF NOT EXISTS memories_au AFTER UPDATE OF content ON memories BEGIN
			INSERT INTO memories_fts(memories_fts, rowid, content) VALUES('delete', old.rowid, old.content);
			INSERT INTO memories_fts(rowid, content) VALUES (new.rowid, new.content);
		END;
	`)}function Uz(Z,X,z){return Z.prepare(`PRAGMA table_info(${X})`).all().some((_)=>_.name===z)}function dZ(Z,X,z,W){if(!Uz(Z,X,z))Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function Gz(Z){for(let X of["entities","entity_communities","entity_attributes","entity_dependencies"])dZ(Z,X,"source_id","TEXT"),dZ(Z,X,"source_kind","TEXT"),dZ(Z,X,"source_path","TEXT"),dZ(Z,X,"source_root","TEXT");Z.exec("CREATE INDEX IF NOT EXISTS idx_entities_source ON entities(agent_id, source_id, source_path)"),Z.exec("CREATE INDEX IF NOT EXISTS idx_entity_communities_source ON entity_communities(agent_id, source_id, source_path)"),Z.exec("CREATE INDEX IF NOT EXISTS idx_entity_attributes_source ON entity_attributes(agent_id, source_id, source_path)"),Z.exec("CREATE INDEX IF NOT EXISTS idx_entity_dependencies_source_origin ON entity_dependencies(agent_id, source_id, source_path)")}function qz(Z,X){return Z.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name = ?").get(X)?.name===X}function Az(Z,X,z){return Z.prepare(`PRAGMA table_info(${X})`).all().some((_)=>_.name===z)}function Mz(Z){if(!qz(Z,"embeddings"))return;if(!Az(Z,"embeddings","agent_id"))Z.exec("ALTER TABLE embeddings ADD COLUMN agent_id TEXT");Z.exec("CREATE INDEX IF NOT EXISTS idx_embeddings_agent_source ON embeddings(agent_id, source_type, source_id)")}function Dz(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS memory_search_telemetry (
			id TEXT PRIMARY KEY,
			created_at TEXT NOT NULL,
			route TEXT NOT NULL,
			agent_id TEXT NOT NULL,
			session_key TEXT,
			project TEXT,
			query TEXT NOT NULL,
			keyword_query TEXT,
			filters_json TEXT NOT NULL,
			method TEXT NOT NULL,
			result_count INTEGER NOT NULL,
			top_score REAL,
			no_hits INTEGER NOT NULL DEFAULT 0,
			duration_ms REAL NOT NULL DEFAULT 0,
			timings_json TEXT NOT NULL,
			results_json TEXT NOT NULL,
			sources_json TEXT
		);

		CREATE INDEX IF NOT EXISTS idx_memory_search_telemetry_agent_time
			ON memory_search_telemetry(agent_id, created_at DESC);
		CREATE INDEX IF NOT EXISTS idx_memory_search_telemetry_session
			ON memory_search_telemetry(session_key) WHERE session_key IS NOT NULL;
		CREATE INDEX IF NOT EXISTS idx_memory_search_telemetry_route_time
			ON memory_search_telemetry(route, created_at DESC);
		CREATE INDEX IF NOT EXISTS idx_memory_search_telemetry_no_hits
			ON memory_search_telemetry(no_hits, created_at DESC);
	`)}function Lz(Z,X,z){return Z.prepare(`PRAGMA table_info(${X})`).all().some((_)=>_.name===z)}function y5(Z,X,z,W){if(!Lz(Z,X,z))Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function Oz(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS ontology_proposals (
			id          TEXT PRIMARY KEY,
			agent_id    TEXT NOT NULL DEFAULT 'default',
			operation   TEXT NOT NULL,
			status      TEXT NOT NULL DEFAULT 'pending'
				CHECK (status IN ('pending', 'applied', 'rejected', 'failed')),
			payload     TEXT NOT NULL,
			confidence  REAL NOT NULL DEFAULT 0.0
				CHECK (confidence >= 0.0 AND confidence <= 1.0),
			rationale   TEXT NOT NULL DEFAULT '',
			evidence    TEXT NOT NULL DEFAULT '[]',
			risk        TEXT,
			source_kind TEXT,
			source_id   TEXT,
			source_path TEXT,
			source_root TEXT,
			created_by  TEXT NOT NULL DEFAULT 'ontology-proposal',
			applied_by  TEXT,
			rejected_by TEXT,
			result      TEXT,
			created_at  TEXT NOT NULL DEFAULT (datetime('now')),
			updated_at  TEXT NOT NULL DEFAULT (datetime('now')),
			applied_at  TEXT,
			rejected_at TEXT
		);

		CREATE INDEX IF NOT EXISTS idx_ontology_proposals_agent_status
			ON ontology_proposals(agent_id, status, updated_at DESC);

		CREATE INDEX IF NOT EXISTS idx_ontology_proposals_agent_operation
			ON ontology_proposals(agent_id, operation, updated_at DESC);

		CREATE INDEX IF NOT EXISTS idx_ontology_proposals_source
			ON ontology_proposals(agent_id, source_kind, source_id);
	`);for(let X of["entity_attributes","entity_dependencies"])y5(Z,X,"proposal_id","TEXT"),y5(Z,X,"proposal_evidence","TEXT NOT NULL DEFAULT '[]'"),Z.exec(`CREATE INDEX IF NOT EXISTS idx_${X}_proposal ON ${X}(agent_id, proposal_id)`)}function Fz(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS daily_reflections (
			id               TEXT PRIMARY KEY,
			agent_id         TEXT NOT NULL DEFAULT 'default',
			date             TEXT NOT NULL,
			summary          TEXT NOT NULL DEFAULT '',
			patterns         TEXT NOT NULL DEFAULT '[]',
			question         TEXT,
			answer           TEXT,
			answer_memory_id TEXT,
			content_key      TEXT,
			memory_ids       TEXT NOT NULL DEFAULT '[]',
			summary_ids      TEXT NOT NULL DEFAULT '[]',
			model            TEXT,
			created_at       TEXT NOT NULL DEFAULT (datetime('now')),
			answered_at      TEXT
		);

		CREATE INDEX IF NOT EXISTS idx_daily_reflections_agent_date
			ON daily_reflections(agent_id, date, created_at DESC);

		CREATE UNIQUE INDEX IF NOT EXISTS idx_daily_reflections_agent_content_key
			ON daily_reflections(agent_id, date, content_key)
			WHERE content_key IS NOT NULL;
	`)}function Nz(Z){let X=Z.prepare("PRAGMA table_info(daily_reflections)").all();if(!new Set(X.flatMap((W)=>typeof W.name==="string"?[W.name]:[])).has("content_key"))Z.exec("ALTER TABLE daily_reflections ADD COLUMN content_key TEXT");Z.exec(`
		DROP INDEX IF EXISTS idx_daily_reflections_agent_date;
		DROP INDEX IF EXISTS idx_daily_reflections_agent_content_key;

		CREATE INDEX IF NOT EXISTS idx_daily_reflections_agent_created
			ON daily_reflections(agent_id, created_at DESC);

		CREATE INDEX IF NOT EXISTS idx_daily_reflections_agent_date
			ON daily_reflections(agent_id, date, created_at DESC);

		CREATE UNIQUE INDEX IF NOT EXISTS idx_daily_reflections_agent_content_key
			ON daily_reflections(agent_id, date, content_key)
			WHERE content_key IS NOT NULL;
	`)}function Kz(Z,X,z){return Z.prepare(`PRAGMA table_info(${X})`).all().some((_)=>_.name===z)}function h0(Z,X,z,W){if(!Kz(Z,X,z))Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function Rz(Z){Z.exec(`
		UPDATE entity_attributes
		SET version_root_id = id
		WHERE version_root_id IS NULL
	`)}function jz(Z){for(let X of["entities","entity_aspects","entity_dependencies"])h0(Z,X,"status","TEXT NOT NULL DEFAULT 'active'"),h0(Z,X,"archived_at","TEXT"),h0(Z,X,"archived_by","TEXT"),h0(Z,X,"archive_reason","TEXT");for(let X of["entities","entity_aspects"])h0(Z,X,"proposal_id","TEXT"),h0(Z,X,"proposal_evidence","TEXT NOT NULL DEFAULT '[]'");h0(Z,"entity_attributes","version","INTEGER NOT NULL DEFAULT 1"),h0(Z,"entity_attributes","version_root_id","TEXT"),h0(Z,"entity_attributes","previous_attribute_id","TEXT"),h0(Z,"entity_attributes","archived_at","TEXT"),h0(Z,"entity_attributes","archived_by","TEXT"),h0(Z,"entity_attributes","archive_reason","TEXT"),Rz(Z),Z.exec(`
		CREATE INDEX IF NOT EXISTS idx_entities_status
			ON entities(agent_id, status, updated_at DESC);
		CREATE INDEX IF NOT EXISTS idx_entity_aspects_status
			ON entity_aspects(agent_id, entity_id, status);
		CREATE INDEX IF NOT EXISTS idx_entity_attributes_version_root
			ON entity_attributes(agent_id, version_root_id, version DESC);
		CREATE INDEX IF NOT EXISTS idx_entity_attributes_claim_version
			ON entity_attributes(agent_id, aspect_id, group_key, claim_key, version DESC);
		CREATE INDEX IF NOT EXISTS idx_entity_dependencies_status
			ON entity_dependencies(agent_id, status, updated_at DESC);
		CREATE INDEX IF NOT EXISTS idx_entities_proposal
			ON entities(agent_id, proposal_id);
		CREATE INDEX IF NOT EXISTS idx_entity_aspects_proposal
			ON entity_aspects(agent_id, proposal_id);
	`)}function Sz(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS epistemic_assertions (
			id TEXT PRIMARY KEY,
			agent_id TEXT NOT NULL DEFAULT 'default',
			subject_entity_id TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
			claim_attribute_id TEXT REFERENCES entity_attributes(id) ON DELETE SET NULL,
			predicate TEXT NOT NULL CHECK (
				predicate IN ('claims', 'believes', 'observed', 'decided', 'prefers', 'denies', 'questions')
			),
			content TEXT NOT NULL,
			normalized_content TEXT NOT NULL,
			speaker TEXT,
			asserted_at TEXT NOT NULL,
			confidence REAL NOT NULL DEFAULT 0.0 CHECK (confidence >= 0.0 AND confidence <= 1.0),
			evidence TEXT NOT NULL DEFAULT '[]',
			source_kind TEXT,
			source_id TEXT,
			source_path TEXT,
			source_root TEXT,
			status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'superseded')),
			supersedes_assertion_id TEXT REFERENCES epistemic_assertions(id) ON DELETE SET NULL,
			archived_at TEXT,
			archived_by TEXT,
			archive_reason TEXT,
			created_by TEXT NOT NULL DEFAULT 'operator',
			created_at TEXT NOT NULL DEFAULT (datetime('now')),
			updated_at TEXT NOT NULL DEFAULT (datetime('now'))
		);

		CREATE INDEX IF NOT EXISTS idx_epistemic_assertions_agent_entity
			ON epistemic_assertions(agent_id, subject_entity_id, status, asserted_at DESC);
		CREATE INDEX IF NOT EXISTS idx_epistemic_assertions_agent_speaker
			ON epistemic_assertions(agent_id, speaker, asserted_at DESC);
		CREATE INDEX IF NOT EXISTS idx_epistemic_assertions_agent_predicate
			ON epistemic_assertions(agent_id, predicate, status, asserted_at DESC);
		CREATE INDEX IF NOT EXISTS idx_epistemic_assertions_agent_source
			ON epistemic_assertions(agent_id, source_kind, source_id);
		CREATE INDEX IF NOT EXISTS idx_epistemic_assertions_claim
			ON epistemic_assertions(agent_id, claim_attribute_id);
	`)}function Cz(Z){let X=Z.prepare("PRAGMA table_info(memories)").all(),z=new Set(X.map((W)=>W.name).filter((W)=>typeof W==="string"));if(!z.has("agent_id"))Z.exec("ALTER TABLE memories ADD COLUMN agent_id TEXT DEFAULT 'default'");if(!z.has("visibility"))Z.exec("ALTER TABLE memories ADD COLUMN visibility TEXT DEFAULT 'global'");if(!z.has("scope"))Z.exec("ALTER TABLE memories ADD COLUMN scope TEXT");if(!z.has("idempotency_key"))Z.exec("ALTER TABLE memories ADD COLUMN idempotency_key TEXT");if(!z.has("runtime_path"))Z.exec("ALTER TABLE memories ADD COLUMN runtime_path TEXT")}function Ez(Z){Cz(Z),Z.exec("DROP INDEX IF EXISTS idx_memories_idempotency_key"),Z.exec(`
		CREATE UNIQUE INDEX idx_memories_idempotency_key
		ON memories(
			idempotency_key,
			COALESCE(NULLIF(agent_id, ''), 'default'),
			COALESCE(visibility, 'global'),
			COALESCE(scope, '__NULL__')
		)
		WHERE idempotency_key IS NOT NULL AND is_deleted = 0
	`)}function Iz(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS session_context_epochs (
			session_key TEXT NOT NULL,
			agent_id TEXT NOT NULL DEFAULT 'default',
			context_epoch INTEGER NOT NULL DEFAULT 0,
			reason TEXT NOT NULL,
			source_ref TEXT,
			created_at TEXT NOT NULL DEFAULT (datetime('now')),
			PRIMARY KEY (session_key, agent_id, context_epoch)
		);

		CREATE INDEX IF NOT EXISTS idx_session_context_epochs_created
			ON session_context_epochs(agent_id, created_at DESC);

		CREATE TABLE IF NOT EXISTS session_recall_events (
			session_key TEXT NOT NULL,
			agent_id TEXT NOT NULL DEFAULT 'default',
			context_epoch INTEGER NOT NULL DEFAULT 0,
			item_kind TEXT NOT NULL,
			item_id TEXT NOT NULL,
			surface TEXT NOT NULL,
			mode TEXT NOT NULL,
			score REAL,
			source TEXT,
			created_at TEXT NOT NULL DEFAULT (datetime('now')),
			PRIMARY KEY (session_key, agent_id, context_epoch, item_kind, item_id)
		);

		CREATE INDEX IF NOT EXISTS idx_session_recall_events_session
			ON session_recall_events(session_key, agent_id, context_epoch, created_at DESC);
		CREATE INDEX IF NOT EXISTS idx_session_recall_events_item
			ON session_recall_events(item_kind, item_id, created_at DESC);
	`)}function Tz(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS aggregate_memory_sources (
			aggregate_memory_id TEXT NOT NULL,
			source_memory_id TEXT NOT NULL,
			agent_id TEXT NOT NULL DEFAULT 'default',
			created_at TEXT NOT NULL,
			PRIMARY KEY (aggregate_memory_id, source_memory_id)
		);
		CREATE INDEX IF NOT EXISTS idx_aggregate_memory_sources_agent
			ON aggregate_memory_sources(agent_id, aggregate_memory_id);
	`)}function GZ(Z,X,z,W){if(Z.prepare(`PRAGMA table_info(${X})`).all().some((q)=>q.name===z))return;Z.exec(`ALTER TABLE ${X} ADD COLUMN ${z} ${W}`)}function Pz(Z){GZ(Z,"memory_artifacts","source_id","TEXT"),GZ(Z,"memory_artifacts","source_root","TEXT"),GZ(Z,"memory_artifacts","source_external_id","TEXT"),GZ(Z,"memory_artifacts","source_parent_path","TEXT"),GZ(Z,"memory_artifacts","source_meta_json","TEXT"),Z.exec(`
		CREATE INDEX IF NOT EXISTS idx_memory_artifacts_agent_source
			ON memory_artifacts(agent_id, source_id, source_external_id);
		CREATE INDEX IF NOT EXISTS idx_memory_artifacts_agent_source_root
			ON memory_artifacts(agent_id, source_id, source_root);
	`)}function wz(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS temporal_edges (
			id TEXT PRIMARY KEY,
			agent_id TEXT NOT NULL DEFAULT 'default',
			subject_type TEXT NOT NULL,
			subject_id TEXT NOT NULL,
			facet TEXT NOT NULL CHECK(facet IN ('captured', 'session', 'source', 'observed', 'occurred', 'valid')),
			start_at TEXT NOT NULL,
			end_at TEXT,
			confidence REAL NOT NULL DEFAULT 1.0,
			provenance_json TEXT,
			metadata_json TEXT,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL
		);

		CREATE INDEX IF NOT EXISTS idx_temporal_edges_agent_facet_range
			ON temporal_edges(agent_id, facet, start_at, end_at);
		CREATE INDEX IF NOT EXISTS idx_temporal_edges_agent_subject
			ON temporal_edges(agent_id, subject_type, subject_id);
	`)}function kz(Z){Z.exec(`
		CREATE TABLE IF NOT EXISTS entity_aliases (
			id TEXT PRIMARY KEY,
			entity_id TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
			agent_id TEXT NOT NULL DEFAULT 'default',
			alias TEXT NOT NULL,
			canonical_alias TEXT NOT NULL,
			confidence REAL NOT NULL DEFAULT 1.0,
			source TEXT,
			status TEXT NOT NULL DEFAULT 'active',
			created_at TEXT NOT NULL DEFAULT (datetime('now')),
			updated_at TEXT NOT NULL DEFAULT (datetime('now'))
		);

		CREATE UNIQUE INDEX IF NOT EXISTS idx_entity_aliases_active_unique
			ON entity_aliases(agent_id, canonical_alias)
			WHERE status = 'active';
		CREATE INDEX IF NOT EXISTS idx_entity_aliases_entity
			ON entity_aliases(agent_id, entity_id, status);
		CREATE INDEX IF NOT EXISTS idx_entity_aliases_lookup
			ON entity_aliases(agent_id, canonical_alias, status);
	`)}var m5=[{version:1,name:"baseline",up:a4,artifacts:{tables:["memories","conversations","embeddings"]}},{version:2,name:"pipeline-v2",up:t4,artifacts:{tables:["memory_history","memory_jobs","entities","relations","memory_entity_mentions"]}},{version:3,name:"unique-content-hash",up:e4},{version:4,name:"history-actor-and-retention",up:X9,artifacts:{columns:[{table:"memory_history",column:"actor_type"}]}},{version:5,name:"graph-extended",up:$9,artifacts:{columns:[{table:"entities",column:"canonical_name"}]}},{version:6,name:"idempotency-key",up:Q9,artifacts:{columns:[{table:"memories",column:"idempotency_key"}]}},{version:7,name:"documents-and-connectors",up:H9,artifacts:{tables:["documents","document_memories","connectors"]}},{version:8,name:"embeddings-unique-hash",up:J9},{version:9,name:"summary-jobs",up:Y9,artifacts:{tables:["summary_jobs"]}},{version:10,name:"umap-cache",up:V9,artifacts:{tables:["umap_cache"]}},{version:11,name:"session-scores",up:_9,artifacts:{tables:["session_scores"]}},{version:12,name:"scheduled-tasks",up:B9,artifacts:{tables:["scheduled_tasks","task_runs"]}},{version:13,name:"ingestion-tracking",up:U9,artifacts:{tables:["ingestion_jobs"],columns:[{table:"memories",column:"source_path"},{table:"memories",column:"source_section"}]}},{version:14,name:"telemetry",up:G9,artifacts:{tables:["telemetry_events"]}},{version:15,name:"session-memories",up:q9,artifacts:{tables:["session_memories"],columns:[{table:"session_scores",column:"confidence"},{table:"session_scores",column:"continuity_reasoning"}]}},{version:16,name:"session-checkpoints",up:A9,artifacts:{tables:["session_checkpoints"]}},{version:17,name:"task-skills",up:M9,artifacts:{columns:[{table:"scheduled_tasks",column:"skill_name"}]}},{version:18,name:"skill-meta",up:D9,artifacts:{tables:["skill_meta"]}},{version:19,name:"knowledge-structure",up:L9,artifacts:{tables:["entity_aspects","entity_attributes","entity_dependencies","task_meta"],columns:[{table:"entities",column:"agent_id"}]}},{version:20,name:"session-structural-columns",up:O9,artifacts:{columns:[{table:"session_memories",column:"entity_slot"},{table:"session_memories",column:"aspect_slot"},{table:"session_memories",column:"is_constraint"},{table:"session_memories",column:"structural_density"}]}},{version:21,name:"checkpoint-structural",up:F9,artifacts:{columns:[{table:"session_checkpoints",column:"focal_entity_ids"}]}},{version:22,name:"entity-pinning",up:N9,artifacts:{columns:[{table:"entities",column:"pinned"},{table:"entities",column:"pinned_at"}]}},{version:23,name:"retired-scorer-gap",up:K9},{version:24,name:"retired-scorer-gap",up:R9},{version:25,name:"agent-feedback",up:j9,artifacts:{columns:[{table:"session_memories",column:"agent_relevance_score"}]}},{version:26,name:"retired-scorer-gap",up:S9},{version:27,name:"backfill-canonical-names",up:C9},{version:28,name:"lossless-retention",up:E9},{version:29,name:"session-summary-dag",up:I9},{version:30,name:"nullable-memory-job-memory-id",up:T9},{version:31,name:"dependency-reason",up:P9,artifacts:{columns:[{table:"entity_dependencies",column:"reason"},{table:"entities",column:"last_synthesized_at"}]}},{version:32,name:"embeddings-vector-column",up:w9,artifacts:{columns:[{table:"embeddings",column:"vector",optional:!0}]}},{version:33,name:"scope",up:k9,artifacts:{columns:[{table:"memories",column:"scope"}]}},{version:34,name:"scope-aware-dedup",up:b9},{version:35,name:"entity-fts",up:f9},{version:36,name:"dependency-confidence",up:x9,artifacts:{columns:[{table:"entity_dependencies",column:"confidence"}]}},{version:37,name:"entity-communities",up:g9,artifacts:{tables:["entity_communities"],columns:[{table:"entities",column:"community_id"}]}},{version:38,name:"memory-hints",up:h9,artifacts:{tables:["memory_hints"]}},{version:39,name:"dedup-entity-dependencies",up:v9},{version:40,name:"session-transcripts",up:y9,artifacts:{tables:["session_transcripts"]}},{version:41,name:"path-feedback",up:u9,artifacts:{tables:["path_feedback_events","path_feedback_stats","entity_retrieval_stats","entity_cooccurrence","path_feedback_sessions"],columns:[{table:"session_memories",column:"path_json"}]}},{version:42,name:"session-memories-agent-id",up:d9,artifacts:{columns:[{table:"session_memories",column:"agent_id"}]}},{version:43,name:"agents-table",up:c9,artifacts:{tables:["agents"],columns:[{table:"memories",column:"agent_id"},{table:"memories",column:"visibility"}]}},{version:44,name:"memory-md-temporal-head",up:p9,artifacts:{columns:[{table:"session_summaries",column:"source_type"},{table:"session_summaries",column:"source_ref"},{table:"session_summaries",column:"meta_json"}]}},{version:45,name:"lossless-working-memory-hardening",up:l9,artifacts:{tables:["session_transcripts_fts","memory_md_heads"],columns:[{table:"session_transcripts",column:"updated_at"},{table:"summary_jobs",column:"agent_id"},{table:"session_scores",column:"agent_id"}]}},{version:46,name:"session-summary-uniqueness",up:n9},{version:47,name:"agent-scoped-temporal-uniqueness",up:i9},{version:48,name:"thread-heads",up:o9,artifacts:{tables:["memory_thread_heads"]}},{version:49,name:"session-extract-cursors",up:s9,artifacts:{tables:["session_extract_cursors"]}},{version:50,name:"related-to-audit",up:r9,artifacts:{tables:["entity_dependency_history"]}},{version:51,name:"memory-md-rolling-window-lineage",up:t9,artifacts:{tables:["memory_artifacts","memory_artifact_tombstones","memory_artifacts_fts"],columns:[{table:"summary_jobs",column:"session_id"},{table:"summary_jobs",column:"trigger"},{table:"summary_jobs",column:"captured_at"},{table:"summary_jobs",column:"started_at"},{table:"summary_jobs",column:"ended_at"}]}},{version:52,name:"mcp-invocations",up:e9,artifacts:{tables:["mcp_invocations"]}},{version:53,name:"skill-invocations",up:Zz,artifacts:{tables:["skill_invocations"]}},{version:54,name:"task-agent-scope",up:Xz,artifacts:{tables:["task_scope_hints"]}},{version:55,name:"dreaming-state",up:zz,artifacts:{tables:["dreaming_state","dreaming_passes"]}},{version:56,name:"agent-scoped-content-hash",up:Qz},{version:57,name:"memories-fts-tokenizer-repair",up:Wz},{version:58,name:"knowledge-graph-indices",up:Hz},{version:59,name:"entity-attribute-claim-key",up:Jz,artifacts:{columns:[{table:"entity_attributes",column:"claim_key"}]}},{version:60,name:"entity-attribute-group-key",up:Yz,artifacts:{columns:[{table:"entity_attributes",column:"group_key"}]}},{version:61,name:"memory-artifact-source-mtime",up:Vz,artifacts:{columns:[{table:"memory_artifacts",column:"source_mtime_ms"}]}},{version:62,name:"memory-artifact-soft-delete",up:_z,artifacts:{columns:[{table:"memory_artifacts",column:"is_deleted"},{table:"memory_artifacts",column:"deleted_at"}]}},{version:63,name:"content-only-memories-fts-update",up:Bz},{version:64,name:"source-graph-provenance",up:Gz,artifacts:{columns:[{table:"entities",column:"source_path"},{table:"entity_communities",column:"source_path"},{table:"entity_attributes",column:"source_path"},{table:"entity_dependencies",column:"source_path"}]}},{version:65,name:"source-embedding-agent-scope",up:Mz,artifacts:{columns:[{table:"embeddings",column:"agent_id",optional:!0}]}},{version:66,name:"memory-search-telemetry",up:Dz,artifacts:{tables:["memory_search_telemetry"]}},{version:67,name:"ontology-proposals",up:Oz,artifacts:{tables:["ontology_proposals"],columns:[{table:"entity_attributes",column:"proposal_id"},{table:"entity_attributes",column:"proposal_evidence"},{table:"entity_dependencies",column:"proposal_id"},{table:"entity_dependencies",column:"proposal_evidence"}]}},{version:68,name:"daily-reflections",up:Fz,artifacts:{tables:["daily_reflections"]}},{version:69,name:"daily-reflections-multiple-insights",up:Nz,artifacts:{tables:["daily_reflections"]}},{version:70,name:"ontology-control-plane-state",up:jz,artifacts:{columns:[{table:"entities",column:"status"},{table:"entity_aspects",column:"status"},{table:"entity_attributes",column:"version"},{table:"entity_attributes",column:"version_root_id"},{table:"entity_attributes",column:"previous_attribute_id"},{table:"entity_dependencies",column:"status"}]}},{version:71,name:"epistemic-assertions",up:Sz,artifacts:{tables:["epistemic_assertions"]}},{version:72,name:"agent-scoped-idempotency-key",up:Ez,artifacts:{columns:[{table:"memories",column:"idempotency_key"},{table:"memories",column:"runtime_path"}]}},{version:73,name:"recall-context-dedupe",up:Iz,artifacts:{tables:["session_context_epochs","session_recall_events"]}},{version:74,name:"aggregate-memory-links",up:Tz,artifacts:{tables:["aggregate_memory_sources"]}},{version:75,name:"memory-artifact-source-provenance",up:Pz,artifacts:{columns:[{table:"memory_artifacts",column:"source_id"},{table:"memory_artifacts",column:"source_root"},{table:"memory_artifacts",column:"source_external_id"},{table:"memory_artifacts",column:"source_parent_path"},{table:"memory_artifacts",column:"source_meta_json"}]}},{version:76,name:"temporal-edges",up:wz,artifacts:{tables:["temporal_edges"]}},{version:77,name:"entity-aliases",up:kz,artifacts:{tables:["entity_aliases"]}}];var jJ=m5[m5.length-1]?.version??0;var bz=l4(import.meta.url),SJ=p4(bz);var CJ=d5(_7(),1);var fz=d5(_7(),1);function xz(Z){try{let X=fz.default.parse(Z);return typeof X==="object"&&X!==null?X:{}}catch{return{}}}var hz=null;try{hz=gz(import.meta.url)("@signet/native")}catch{}function E8(Z){return typeof Z==="object"&&Z!==null&&!Array.isArray(Z)}function s6(Z){return Object.fromEntries(Object.entries(Z).filter(([,X])=>X!==void 0))}function vz(Z){if(typeof Z==="string"){let X=Z.split(",").map((z)=>z.trim()).filter((z)=>z.length>0).join(",");return X.length>0?X:void 0}if(Array.isArray(Z)){let X=Z.map((z)=>z.trim()).filter((z)=>z.length>0).join(",");return X.length>0?X:void 0}return}function yz(Z){return{primary:Z.filter((X)=>X.supplementary!==!0),supporting:Z.filter((X)=>X.supplementary===!0)}}function mz(Z,X){if(!E8(Z))return{totalReturned:X,hasSupplementary:!1,noHits:X===0};let z=typeof Z.totalReturned==="number"?Z.totalReturned:X,W=Z.hasSupplementary===!0,_="noHits"in Z?Z.noHits===!0:z===0,q=E8(Z.dedupe)?{enabled:Z.dedupe.enabled===!0,contextEpoch:typeof Z.dedupe.contextEpoch==="number"?Z.dedupe.contextEpoch:void 0,suppressed:typeof Z.dedupe.suppressed==="number"?Z.dedupe.suppressed:0,repeatedReturned:typeof Z.dedupe.repeatedReturned==="number"?Z.dedupe.repeatedReturned:0}:void 0,B=E8(Z.temporal)?Z.temporal:void 0;return{totalReturned:z,hasSupplementary:W,noHits:_,...q?{dedupe:q}:{},...B?{temporal:B}:{}}}function Z6(Z){let X=E8(Z)?Z:{},W=(Array.isArray(X.results)?X.results:Array.isArray(X.memories)?X.memories:[]).filter(E8);return{query:typeof X.query==="string"?X.query:void 0,method:typeof X.method==="string"?X.method:void 0,rows:W,meta:mz(X.meta,W.length),message:typeof X.message==="string"?X.message:void 0}}function uz(Z){return typeof Z==="string"&&Z.length>0?Z.slice(0,10):"unknown"}function h6(Z,X){let z=typeof Z.score==="number"?`[${(Z.score*100).toFixed(0)}%] `:"",W=typeof Z.source==="string"?Z.source:"unknown",_=typeof Z.type==="string"?Z.type:"memory",q=typeof Z.who==="string"&&Z.who.length>0?`, by ${Z.who}`:"",B=uz(Z.created_at),U=typeof Z.id==="string"&&Z.id.length>0?`id: ${Z.id}; `:"";return`${X?.includeIndex?`${X.includeIndex}. `:"- "}${z}${U}${Z.content??""} (${_}, ${W}, ${B}${q})`}function dz(Z){if(Z.temporal_facet==="session")return"Sessions";if(Z.temporal_facet==="source")return"Source Activity";if(Z.temporal_facet==="occurred"||Z.temporal_facet==="observed"||Z.temporal_facet==="valid")return"Events";return"Memories Captured"}function cz(Z){let X=new Date(Z);if(Number.isNaN(X.getTime()))return Z.slice(0,10);return X.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric",timeZone:"UTC"})}function pz(Z,X){let z=[cz(X.start)],W=new Map;for(let _ of Z){let q=dz(_);W.set(q,[...W.get(q)??[],_])}for(let _ of["Sessions","Source Activity","Events","Memories Captured"]){let q=W.get(_);if(!q||q.length===0)continue;z.push("",_,...q.map((B)=>h6(B)))}return z.join(`
`)}function a6(Z){if(typeof Z!=="object"||Z===null||Array.isArray(Z))return typeof Z==="string"?Z:JSON.stringify(Z,null,2);let z=Z6(Z);if(z.message&&z.rows.length===0)return z.message;if(z.meta.noHits||z.rows.length===0)return"No matching memories found.";let{primary:W,supporting:_}=yz(z.rows);if(z.meta.temporal?.mode==="timeline")return pz(W,z.meta.temporal);let q=z.meta.totalReturned===1?"memory":"memories",B=[`Found ${z.meta.totalReturned} ${q}${z.method?` (${z.method})`:""}.`];if(W.length>0)B.push("","Primary matches:",...W.map((U)=>h6(U)));if(_.length>0)B.push("","Supporting context:",..._.map((U)=>h6(U)));return B.join(`
`)}function q7(Z,X={}){return s6({query:Z,keywordQuery:X.keywordQuery??X.keyword_query,limit:X.limit,project:X.project,type:X.type,tags:X.tags,who:X.who,pinned:X.pinned===!0?!0:void 0,importance_min:X.importance_min,since:X.since,until:X.until,time:X.time,expand:X.expand===!0?!0:void 0,agentId:X.agentId,sessionKey:X.sessionKey,includeRecalled:X.includeRecalled===!0?!0:void 0,scope:X.scope,sourceOnly:X.sourceOnly===!0?!0:void 0,aggregate:X.aggregate===!0?!0:void 0,aggregateBudget:X.aggregateBudget??X.aggregate_budget,saveAggregate:X.saveAggregate===!1||X.save_aggregate===!1?!1:X.saveAggregate===!0||X.save_aggregate===!0?!0:void 0})}function lz(Z){if(!E8(Z))return Z;let X=Z.aspects;if(!Array.isArray(X))return Z;return{...Z,aspects:X.map((z)=>{if(!E8(z))return z;if(typeof z.entityName==="string"&&Array.isArray(z.attributes))return z;if(typeof z.entity==="string"&&typeof z.aspect==="string"&&typeof z.value==="string")return{entityName:z.entity,aspect:z.aspect,attributes:[s6({content:z.value,groupKey:typeof z.groupKey==="string"?z.groupKey:void 0,claimKey:typeof z.claimKey==="string"?z.claimKey:void 0,confidence:typeof z.confidence==="number"?z.confidence:void 0,importance:typeof z.importance==="number"?z.importance:void 0})]};return z})}}function A7(Z,X={}){return s6({content:Z,type:X.type,importance:X.importance,tags:vz(X.tags),who:X.who,pinned:X.pinned===!0?!0:void 0,sourceType:X.sourceType,sourceId:X.sourceId,sourcePath:X.sourcePath,createdAt:X.createdAt,occurredAt:X.occurredAt,observedAt:X.observedAt,validFrom:X.validFrom,validUntil:X.validUntil,sourceCreatedAt:X.sourceCreatedAt,hints:X.hints,transcript:X.transcript,structured:lz(X.structured),agentId:X.agentId,visibility:X.visibility,mode:X.mode,idempotencyKey:X.idempotencyKey,runtimePath:X.runtimePath,harness:X.harness,source:X.source})}var nz="signetai";var IJ=["memory/memories.db","memory/memories.db-wal","memory/memories.db-shm","memory/memories.db-journal",`${nz}/`];var bJ=sz(),oz=["issues","pulls","discussions","docs"];var fJ=new Set(oz);function sz(){switch(iz()){case"darwin":return qZ(g6(),"Library","Application Support","discord");case"win32":return qZ(process.env.APPDATA||qZ(g6(),"AppData","Roaming"),"discord");default:return qZ(process.env.XDG_CONFIG_HOME||qZ(g6(),".config"),"discord")}}function L7(Z,X){let z=Z[X];if(typeof z!=="string")return null;let W=z.trim();return W.length>0?W:null}function ez(Z){let X=Z.trim();if(X==="~")return AZ();if(X.startsWith("~/"))return MZ(AZ(),X.slice(2));if(X.startsWith("~"))return MZ(AZ(),X.slice(1));return X}function r6(Z){return tz(ez(Z))}function Z$(Z){let X=L7(Z,"XDG_CONFIG_HOME");return X?r6(X):MZ(AZ(),".config")}function X$(Z=process.env){return MZ(Z$(Z),"signet","pi.json")}function z$(Z=process.env){let X=X$(Z);if(!az(X))return null;try{let z=JSON.parse(rz(X,"utf-8"));if(typeof z!=="object"||z===null)return null;let W=Reflect.get(z,"agentDir");return typeof W==="string"&&W.trim().length>0?r6(W):null}catch{return null}}function O7(Z=process.env){let X=L7(Z,"PI_CODING_AGENT_DIR");if(X)return r6(X);return z$(Z)??MZ(AZ(),".pi","agent")}var F7={agents:{path:"AGENTS.md",description:"Operational rules and behavioral settings",optional:!1},soul:{path:"SOUL.md",description:"Persona, character, and security settings",optional:!1},identity:{path:"IDENTITY.md",description:"Agent name, creature type, and vibe",optional:!1},user:{path:"USER.md",description:"User profile and preferences",optional:!1},heartbeat:{path:"HEARTBEAT.md",description:"Heartbeat prompt used only for heartbeat/background check sessions",optional:!0,context:"session",session:"heartbeat"},memory:{path:"MEMORY.md",description:"Memory index and summary",optional:!0},tools:{path:"TOOLS.md",description:"Tool preferences and notes",optional:!0},bootstrap:{path:"BOOTSTRAP.md",description:"Setup ritual (typically deleted after first run)",optional:!0,context:"session",session:"bootstrap"},dreaming:{path:"DREAMING.md",description:"Dreaming/reflection prompt used only for dreaming sessions",optional:!0,context:"session",session:"dreaming"}},$$={minimal:{name:"minimal",description:"AGENTS.md only for normal startup, plus DREAMING.md for dreaming sessions.",startup:[{path:"AGENTS.md",role:"operating_instructions",budget:12000}],special:[{path:"DREAMING.md",kind:"dreaming",role:"dreaming_prompt",budget:4000}]},hermes:{name:"hermes",description:"Hermes-style SOUL.md primary identity with project-context discovery handled by Hermes.",startup:[{path:"SOUL.md",role:"primary_identity",budget:4000},{path:"AGENTS.md",role:"project_context",budget:12000}],special:[{path:"DREAMING.md",kind:"dreaming",role:"dreaming_prompt",budget:4000}]},openclaw:{name:"openclaw",description:"OpenClaw-style rich identity stack for character-forward agents.",startup:[{path:"AGENTS.md",role:"operating_instructions",budget:12000},{path:"SOUL.md",role:"persona",budget:4000},{path:"IDENTITY.md",role:"agent_identity",budget:2000},{path:"USER.md",role:"user_profile",budget:6000},{path:"MEMORY.md",role:"working_memory",budget:1e4}],special:[{path:"HEARTBEAT.md",kind:"heartbeat",role:"heartbeat_prompt",budget:4000},{path:"DREAMING.md",kind:"dreaming",role:"dreaming_prompt",budget:4000},{path:"BOOTSTRAP.md",kind:"bootstrap",role:"bootstrap_prompt",budget:4000}]},custom:{name:"custom",description:"User-selected startup files and explicit order.",startup:[{path:"AGENTS.md",role:"operating_instructions",budget:12000}],special:[{path:"DREAMING.md",kind:"dreaming",role:"dreaming_prompt",budget:4000}]}},oJ=Object.entries(F7).filter(([,Z])=>!Z.optional).map(([Z])=>Z),sJ=Object.entries(F7).filter(([,Z])=>Z.optional).map(([Z])=>Z);var y6=[{file:"AGENTS.md",header:"Agent Instructions",budget:12000},{file:"SOUL.md",header:"Soul",budget:4000},{file:"IDENTITY.md",header:"Identity",budget:2000},{file:"USER.md",header:"About Your User",budget:6000},{file:"MEMORY.md",header:"Working Memory",budget:1e4}],Q$={"AGENTS.md":"Agent Instructions","SOUL.md":"Soul","IDENTITY.md":"Identity","USER.md":"About Your User","MEMORY.md":"Working Memory"};function u5(Z){let X=Z.trim();if(!X)return!1;if(X.startsWith("/")||X.startsWith("~"))return!1;return!X.split(/[\\/]/).includes("..")}function m6(Z){return typeof Z==="object"&&Z!==null&&!Array.isArray(Z)?Z:{}}function W$(Z){if(typeof Z==="string")return u5(Z)?{path:Z}:null;let X=m6(Z),z=typeof X.path==="string"?X.path.trim():"";if(!u5(z))return null;if(X.enabled===!1)return null;let W=typeof X.role==="string"?X.role:void 0,_=typeof X.budget==="number"?X.budget:Number.parseInt(String(X.budget??""),10),q=Number.isFinite(_)&&_>0?Math.floor(_):void 0;return{path:z,role:W,budget:q}}function H$(Z){if(!Array.isArray(Z))return[];return Z.map(W$).filter((X)=>X!==null)}function J$(Z,X){let z=Z.split(/[\\/]/).pop()??Z;return Q$[z]??X??z.replace(/\.md$/i,"")}function Y$(Z){let X=D7(Z,"agent.yaml");if(!v6(X))return y6.map(({file:z,budget:W})=>({path:z,budget:W}));try{let z=xz(M7(X,"utf-8")),W=m6(z.identity),_=m6(W.startup),q=H$(_.load);if(q.length>0)return q;let B=typeof W.preset==="string"?W.preset:"",U=$$[B];if(U)return U.startup}catch{}return y6.map(({file:z,budget:W})=>({path:z,budget:W}))}var V$="[signet: daemon offline — running with static identity]";function N7(Z,X=V$){if(!v6(Z))return null;let z=[];for(let W of Y$(Z)){let _=D7(Z,W.path);if(!v6(_))continue;try{let q=M7(_,"utf-8").trim();if(!q)continue;let B=W.budget??y6.find((G)=>G.file===W.path)?.budget??4000,U=q.length<=B?q:`${q.slice(0,B)}
[truncated]`;z.push(`## ${J$(W.path,W.role)}

${U}`)}catch{}}if(z.length===0)return null;return`${X}

${z.join(`

`)}`}var rJ=_$();function q8(Z){return typeof Z==="object"&&Z!==null}function NZ(Z){let X=Reflect.get(globalThis,"process");if(!q8(X))return;let z=Reflect.get(X,"env");if(!q8(z))return;let W=Reflect.get(z,Z);return typeof W==="string"?W:void 0}function c(Z){if(typeof Z!=="string")return;let X=Z.trim();return X.length>0?X:void 0}function c8(Z){return c(NZ(Z))}import{existsSync as B$,readFileSync as U$}from"node:fs";function K7(Z){return Z.replace(/\s*\r?\n\s*/g," ").trim()}function G$(Z){switch(Z){case"assistant":return"Assistant";case"system":return"System";case"custom":return"Custom";case"tool":case"toolResult":case"bashExecution":case"pythonExecution":return"Tool";default:return"User"}}function q$(Z){if(typeof Z==="string"){let z=K7(Z);return z.length>0?z:void 0}if(!Array.isArray(Z))return;let X=[];for(let z of Z){if(!q8(z))continue;let W=c(z.text)??c(z.input_text)??c(z.content);if(!W)continue;X.push(K7(W))}if(X.length===0)return;return X.join(" ")}function R7(Z,X){let z=q$(X);if(!z)return;return`${G$(Z)}: ${z}`}function A$(Z,X){if(!q8(Z)||typeof Z.type!=="string")return;if(Z.type==="custom_message"){if(typeof Z.customType==="string"&&X.has(Z.customType))return;return R7("custom",Z.content)}if(Z.type!=="message")return;if(!q8(Z.message))return;let z=c(Z.message.role),W=Reflect.get(Z.message,"content")??Reflect.get(Z.message,"parts");return R7(z,W)}function X6(Z,X=new Set){let z=[];for(let W of Z){let _=A$(W,X);if(!_)continue;z.push(_)}if(z.length===0)return;return z.join(`
`)}function M$(Z){try{return JSON.parse(Z)}catch{return}}function D$(Z){let X,z=[];for(let W of Z){let _=M$(W);if(!q8(_)||typeof _.type!=="string")continue;if(_.type==="session"){X=_;continue}z.push(_)}return{header:X,entries:z}}function L$(Z){return U$(Z,"utf-8").split(`
`).map((X)=>X.trim()).filter((X)=>X.length>0)}function O$(Z){return c(Z?.cwd)??c(Z?.project)??c(Z?.workspace)}function z6(Z,X=new Set){if(!Z||!B$(Z))return{loaded:!1,sessionId:void 0,project:void 0,transcript:void 0};try{let{header:z,entries:W}=D$(L$(Z));return{loaded:!0,sessionId:c(z?.id),project:O$(z),transcript:X6(W,X)}}catch{return{loaded:!1,sessionId:void 0,project:void 0,transcript:void 0}}}function F$(Z){return{"Content-Type":"application/json","x-signet-runtime-path":Z.runtimePath,"x-signet-actor":Z.actorName,"x-signet-actor-type":"harness"}}function C7(Z){if(typeof Z!=="object"||Z===null)return"";let X=Reflect.get(Z,"name");return typeof X==="string"?X:""}function j7(Z){let X=C7(Z);if(X==="AbortError"||X==="TimeoutError")return!0;return(typeof Z==="object"&&Z!==null?Reflect.get(Z,"code"):void 0)==="ABORT_ERR"}async function S7(Z,X,z,W={}){let{method:_="POST",body:q,timeout:B=z.defaultTimeout}=W;try{let U={method:_,headers:F$(z),signal:AbortSignal.timeout(B)};if(q!==void 0)U.body=JSON.stringify(q);let G=await fetch(`${Z}${X}`,U);if(!G.ok)return console.warn(`[${z.logPrefix}] ${_} ${X} failed: ${G.status}`),{ok:!1,reason:"http",status:G.status};try{let H=await G.text();try{return{ok:!0,data:JSON.parse(H)}}catch{return console.warn(`[${z.logPrefix}] ${_} ${X} returned invalid JSON (${H.length} chars${H.length===0?", empty body":""})`),{ok:!1,reason:"invalid-json",status:G.status}}}catch(H){if(j7(H))return console.warn(`[${z.logPrefix}] ${_} ${X} body read timed out after ${B}ms`),{ok:!1,reason:"timeout"};return console.warn(`[${z.logPrefix}] ${_} ${X} body read failed:`,C7(H)||H),{ok:!1,reason:"body-read"}}}catch(U){if(j7(U))return console.warn(`[${z.logPrefix}] ${_} ${X} timed out after ${B}ms`),{ok:!1,reason:"timeout"};return console.warn(`[${z.logPrefix}] ${_} ${X} error:`,U),{ok:!1,reason:"offline"}}}function t6(Z,X){return{async post(z,W,_=X.defaultTimeout){let q=await S7(Z,z,X,{method:"POST",body:W,timeout:_});if(!q.ok)return null;return q.data},postResult(z,W,_=X.defaultTimeout){return S7(Z,z,X,{method:"POST",body:W,timeout:_})}}}import{homedir as N$}from"node:os";import{join as K$}from"node:path";function e6(Z){let X=c8("SIGNET_PATH")??K$(N$(),".agents");return N7(X)??""}function R$(Z){let X=Z.sessionManager.getBranch();if(Array.isArray(X)&&X.length>0)return X;let z=Z.sessionManager.getEntries();return Array.isArray(z)?z:[]}function T0(Z){let X=Z.sessionManager.getHeader(),z=c(Z.sessionManager.getSessionId())??c(X?.id),W=c(Z.sessionManager.getSessionFile()),_=c(Z.cwd)??c(X?.cwd)??c(X?.project)??c(X?.workspace);return{sessionId:z,sessionFile:W,project:_}}async function KZ(Z,X){return await Z.client.post("/api/hooks/session-end",{harness:Z.config.harness,runtimePath:Z.config.runtimePath,reason:X.reason,sessionKey:X.sessionId,sessionId:X.sessionId,agentId:X.agentId,cwd:X.project,...X.transcript?{transcript:X.transcript}:{}},Z.config.writeTimeout)!==null}async function p8(Z){for(let X of Z.state.getPendingSessionEnds()){if(Z.state.sessionAlreadyEnded(X.sessionId)){Z.state.clearPendingSessionEnd(X.sessionId);continue}let z=z6(X.sessionFile,Z.config.excludedCustomTypes);if(!z.loaded){await KZ(Z,{sessionId:X.sessionId,agentId:X.agentId,transcript:void 0,reason:X.reason,project:void 0});continue}if(!await KZ(Z,{sessionId:z.sessionId??X.sessionId,agentId:X.agentId,transcript:z.transcript,reason:X.reason,project:z.project}))continue;Z.state.markSessionEnded(X.sessionId),Z.state.clearPendingSessionData(X.sessionId),Z.state.clearPendingSessionEnd(X.sessionId)}}async function A8(Z,X){await p8(Z);let z=T0(X);Z.state.setActiveSession(z.sessionId,z.sessionFile),Z.state.clearSessionEnded(z.sessionId);let W=await Z.client.postResult("/api/hooks/session-start",{harness:Z.config.harness,project:z.project,agentId:Z.agentId,sessionKey:z.sessionId,runtimePath:Z.config.runtimePath},Z.config.sessionStartTimeout()),_=W.ok?W.data.inject??W.data.recentContext??"":Z.config.staticFallback(W.reason==="timeout"?"timeout":"offline");Z.state.setSessionContext(_),Z.state.setPendingSessionContext(z.sessionId,_)}async function l8(Z,X){await p8(Z);let z=T0(X);if(!z.sessionId)return;if(z.sessionId===Z.state.getActiveSessionId()&&z.sessionFile===Z.state.getActiveSessionFile())return;await A8(Z,X)}async function $6(Z,X,z){await p8(Z);let W=T0(X);if(Z.state.sessionAlreadyEnded(W.sessionId))return;if(!await KZ(Z,{sessionId:W.sessionId,agentId:Z.agentId,transcript:X6(R$(X),Z.config.excludedCustomTypes),reason:z,project:W.project}))return;Z.state.markSessionEnded(W.sessionId),Z.state.clearPendingSessionData(W.sessionId)}async function RZ(Z,X,z){let W=c(X.previousSessionFile)??Z.state.getActiveSessionFile(),_=z6(W,Z.config.excludedCustomTypes),q=_.sessionId??Z.state.getActiveSessionId();if(Z.state.sessionAlreadyEnded(q))return;if(!_.loaded){if(q)await KZ(Z,{sessionId:q,agentId:Z.agentId,transcript:void 0,reason:z,project:void 0});if(q&&W)Z.state.queuePendingSessionEnd(q,W,Z.agentId,z);return}if(!await KZ(Z,{sessionId:q,agentId:Z.agentId,transcript:_.transcript,reason:z,project:_.project})){if(q&&W)Z.state.queuePendingSessionEnd(q,W,Z.agentId,z);return}Z.state.markSessionEnded(q),Z.state.clearPendingSessionData(q)}async function jZ(Z,X,z){await p8(Z);let W=c(z);if(!W)return;await l8(Z,X);let _=T0(X);if(!_.sessionId)return;let q=await Z.client.post("/api/hooks/user-prompt-submit",{harness:Z.config.harness,project:_.project,agentId:Z.agentId,sessionKey:_.sessionId,userMessage:W,runtimePath:Z.config.runtimePath},Z.config.promptSubmitTimeout);if(!q)return;if(q.sessionKnown===!1)await A8(Z,X);let B=c(q.inject);if(B)Z.state.queuePendingRecall(_.sessionId,B)}var Z5=64,E7=4,I7=128;function X5(Z){return Z.replace(/<\/signet-memory>/gi,"<\\/signet-memory>")}function Q6(Z,X){if(Z.size<X)return;let z=Z.keys().next().value;if(z!==void 0)Z.delete(z)}class W6{pendingSessionContext=new Map;pendingRecall=new Map;pendingSessionEnds=new Map;endedSessions=new Map;activeSessionId;activeSessionFile;sessionContext="";setActiveSession(Z,X){this.activeSessionId=Z,this.activeSessionFile=X}getActiveSessionId(){return this.activeSessionId}getActiveSessionFile(){return this.activeSessionFile}setSessionContext(Z){this.sessionContext=Z}getSessionContext(){return this.sessionContext}markSessionEnded(Z){if(!Z)return;if(!this.endedSessions.has(Z))Q6(this.endedSessions,I7);this.endedSessions.set(Z,Date.now())}clearSessionEnded(Z){if(!Z)return;this.endedSessions.delete(Z)}sessionAlreadyEnded(Z){if(!Z)return!1;return this.endedSessions.has(Z)}setPendingSessionContext(Z,X){if(!Z)return;let z=c(X);if(z){this.pendingSessionContext.set(Z,z);return}this.pendingSessionContext.delete(Z)}clearPendingSessionContext(Z){if(!Z)return;this.pendingSessionContext.delete(Z)}queuePendingRecall(Z,X){if(!this.pendingRecall.has(Z))Q6(this.pendingRecall,Z5);let z=this.pendingRecall.get(Z)??[];z.push(X);while(z.length>E7)z.shift();this.pendingRecall.set(Z,z)}clearPendingRecall(Z){if(!Z)return;this.pendingRecall.delete(Z)}clearPendingSessionData(Z){if(!Z)return;this.pendingSessionContext.delete(Z),this.pendingRecall.delete(Z),this.pendingSessionEnds.delete(Z)}hasPendingRecall(Z){if(!Z)return!1;let X=this.pendingRecall.get(Z);return Array.isArray(X)&&X.length>0}consumePendingRecall(Z){if(!Z)return;let X=this.pendingRecall.get(Z);if(!X||X.length===0)return;let z=X.shift();if(X.length===0)this.pendingRecall.delete(Z);return c(z)}queuePendingSessionEnd(Z,X,z,W){if(!this.pendingSessionEnds.has(Z))Q6(this.pendingSessionEnds,Z5);this.pendingSessionEnds.set(Z,{sessionId:Z,sessionFile:X,agentId:z,reason:W})}clearPendingSessionEnd(Z){if(!Z)return;this.pendingSessionEnds.delete(Z)}getPendingSessionEnds(){return Array.from(this.pendingSessionEnds.values())}}var D0={};k6(D0,{IsUndefined:()=>H0,IsUint8Array:()=>J8,IsSymbol:()=>H5,IsString:()=>s,IsRegExp:()=>CZ,IsObject:()=>l,IsNumber:()=>P0,IsNull:()=>W5,IsIterator:()=>Q5,IsFunction:()=>$5,IsDate:()=>k8,IsBoolean:()=>H8,IsBigInt:()=>SZ,IsAsyncIterator:()=>z5,IsArray:()=>W0,HasPropertyKey:()=>H6});function H6(Z,X){return X in Z}function z5(Z){return l(Z)&&!W0(Z)&&!J8(Z)&&Symbol.asyncIterator in Z}function W0(Z){return Array.isArray(Z)}function SZ(Z){return typeof Z==="bigint"}function H8(Z){return typeof Z==="boolean"}function k8(Z){return Z instanceof globalThis.Date}function $5(Z){return typeof Z==="function"}function Q5(Z){return l(Z)&&!W0(Z)&&!J8(Z)&&Symbol.iterator in Z}function W5(Z){return Z===null}function P0(Z){return typeof Z==="number"}function l(Z){return typeof Z==="object"&&Z!==null}function CZ(Z){return Z instanceof globalThis.RegExp}function s(Z){return typeof Z==="string"}function H5(Z){return typeof Z==="symbol"}function J8(Z){return Z instanceof globalThis.Uint8Array}function H0(Z){return Z===void 0}function j$(Z){return Z.map((X)=>J6(X))}function S$(Z){return new Date(Z.getTime())}function C$(Z){return new Uint8Array(Z)}function E$(Z){return new RegExp(Z.source,Z.flags)}function I$(Z){let X={};for(let z of Object.getOwnPropertyNames(Z))X[z]=J6(Z[z]);for(let z of Object.getOwnPropertySymbols(Z))X[z]=J6(Z[z]);return X}function J6(Z){return W0(Z)?j$(Z):k8(Z)?S$(Z):J8(Z)?C$(Z):CZ(Z)?E$(Z):l(Z)?I$(Z):Z}function t(Z){return J6(Z)}function n8(Z,X){return X===void 0?t(Z):t({...X,...Z})}function T7(Z){return Z!==null&&typeof Z==="object"}function P7(Z){return globalThis.Array.isArray(Z)&&!globalThis.ArrayBuffer.isView(Z)}function w7(Z){return Z===void 0}function k7(Z){return typeof Z==="number"}var Y6;(function(Z){Z.InstanceMode="default",Z.ExactOptionalPropertyTypes=!1,Z.AllowArrayObject=!1,Z.AllowNaN=!1,Z.AllowNullVoid=!1;function X(B,U){return Z.ExactOptionalPropertyTypes?U in B:B[U]!==void 0}Z.IsExactOptionalProperty=X;function z(B){let U=T7(B);return Z.AllowArrayObject?U:U&&!P7(B)}Z.IsObjectLike=z;function W(B){return z(B)&&!(B instanceof Date)&&!(B instanceof Uint8Array)}Z.IsRecordLike=W;function _(B){return Z.AllowNaN?k7(B):Number.isFinite(B)}Z.IsNumberLike=_;function q(B){let U=w7(B);return Z.AllowNullVoid?U||B===null:U}Z.IsVoidLike=q})(Y6||(Y6={}));function T$(Z){return globalThis.Object.freeze(Z).map((X)=>EZ(X))}function P$(Z){return Z}function w$(Z){return Z}function k$(Z){return Z}function b$(Z){let X={};for(let z of Object.getOwnPropertyNames(Z))X[z]=EZ(Z[z]);for(let z of Object.getOwnPropertySymbols(Z))X[z]=EZ(Z[z]);return globalThis.Object.freeze(X)}function EZ(Z){return W0(Z)?T$(Z):k8(Z)?P$(Z):J8(Z)?w$(Z):CZ(Z)?k$(Z):l(Z)?b$(Z):Z}function j(Z,X){let z=X!==void 0?{...X,...Z}:Z;switch(Y6.InstanceMode){case"freeze":return EZ(z);case"clone":return t(z);default:return z}}class A0 extends Error{constructor(Z){super(Z)}}var Y0=Symbol.for("TypeBox.Transform"),n0=Symbol.for("TypeBox.Readonly"),M0=Symbol.for("TypeBox.Optional"),v0=Symbol.for("TypeBox.Hint"),I=Symbol.for("TypeBox.Kind");function i8(Z){return l(Z)&&Z[n0]==="Readonly"}function S0(Z){return l(Z)&&Z[M0]==="Optional"}function J5(Z){return g(Z,"Any")}function Y5(Z){return g(Z,"Argument")}function i0(Z){return g(Z,"Array")}function b8(Z){return g(Z,"AsyncIterator")}function f8(Z){return g(Z,"BigInt")}function Y8(Z){return g(Z,"Boolean")}function o0(Z){return g(Z,"Computed")}function s0(Z){return g(Z,"Constructor")}function f$(Z){return g(Z,"Date")}function a0(Z){return g(Z,"Function")}function r0(Z){return g(Z,"Integer")}function X0(Z){return g(Z,"Intersect")}function x8(Z){return g(Z,"Iterator")}function g(Z,X){return l(Z)&&I in Z&&Z[I]===X}function V6(Z){return H8(Z)||P0(Z)||s(Z)}function w0(Z){return g(Z,"Literal")}function k0(Z){return g(Z,"MappedKey")}function e(Z){return g(Z,"MappedResult")}function M8(Z){return g(Z,"Never")}function x$(Z){return g(Z,"Not")}function IZ(Z){return g(Z,"Null")}function t0(Z){return g(Z,"Number")}function J0(Z){return g(Z,"Object")}function g8(Z){return g(Z,"Promise")}function h8(Z){return g(Z,"Record")}function Q0(Z){return g(Z,"Ref")}function V5(Z){return g(Z,"RegExp")}function V8(Z){return g(Z,"String")}function TZ(Z){return g(Z,"Symbol")}function b0(Z){return g(Z,"TemplateLiteral")}function g$(Z){return g(Z,"This")}function D8(Z){return l(Z)&&Y0 in Z}function f0(Z){return g(Z,"Tuple")}function PZ(Z){return g(Z,"Undefined")}function h(Z){return g(Z,"Union")}function h$(Z){return g(Z,"Uint8Array")}function v$(Z){return g(Z,"Unknown")}function y$(Z){return g(Z,"Unsafe")}function m$(Z){return g(Z,"Void")}function u$(Z){return l(Z)&&I in Z&&s(Z[I])}function x0(Z){return J5(Z)||Y5(Z)||i0(Z)||Y8(Z)||f8(Z)||b8(Z)||o0(Z)||s0(Z)||f$(Z)||a0(Z)||r0(Z)||X0(Z)||x8(Z)||w0(Z)||k0(Z)||e(Z)||M8(Z)||x$(Z)||IZ(Z)||t0(Z)||J0(Z)||g8(Z)||h8(Z)||Q0(Z)||V5(Z)||V8(Z)||TZ(Z)||b0(Z)||g$(Z)||f0(Z)||PZ(Z)||h(Z)||h$(Z)||v$(Z)||y$(Z)||m$(Z)||u$(Z)}var O={};k6(O,{TypeGuardUnknownTypeError:()=>b7,IsVoid:()=>FX,IsUnsafe:()=>OX,IsUnknown:()=>LX,IsUnionLiteral:()=>a$,IsUnion:()=>U5,IsUndefined:()=>MX,IsUint8Array:()=>DX,IsTuple:()=>AX,IsTransform:()=>qX,IsThis:()=>GX,IsTemplateLiteral:()=>UX,IsSymbol:()=>BX,IsString:()=>_X,IsSchema:()=>q0,IsRegExp:()=>VX,IsRef:()=>YX,IsRecursive:()=>s$,IsRecord:()=>JX,IsReadonly:()=>l$,IsProperties:()=>_6,IsPromise:()=>HX,IsOptional:()=>n$,IsObject:()=>WX,IsNumber:()=>QX,IsNull:()=>$X,IsNot:()=>zX,IsNever:()=>XX,IsMappedResult:()=>ZX,IsMappedKey:()=>e7,IsLiteralValue:()=>t7,IsLiteralString:()=>a7,IsLiteralNumber:()=>r7,IsLiteralBoolean:()=>o$,IsLiteral:()=>kZ,IsKindOf:()=>x,IsKind:()=>NX,IsIterator:()=>s7,IsIntersect:()=>o7,IsInteger:()=>i7,IsImport:()=>i$,IsFunction:()=>n7,IsDate:()=>l7,IsConstructor:()=>p7,IsComputed:()=>c7,IsBoolean:()=>d7,IsBigInt:()=>u7,IsAsyncIterator:()=>m7,IsArray:()=>y7,IsArgument:()=>v7,IsAny:()=>h7});class b7 extends A0{}var d$=["Argument","Any","Array","AsyncIterator","BigInt","Boolean","Computed","Constructor","Date","Enum","Function","Integer","Intersect","Iterator","Literal","MappedKey","MappedResult","Not","Null","Number","Object","Promise","Record","Ref","RegExp","String","Symbol","TemplateLiteral","This","Tuple","Undefined","Union","Uint8Array","Unknown","Void"];function f7(Z){try{return new RegExp(Z),!0}catch{return!1}}function _5(Z){if(!s(Z))return!1;for(let X=0;X<Z.length;X++){let z=Z.charCodeAt(X);if(z>=7&&z<=13||z===27||z===127)return!1}return!0}function x7(Z){return B5(Z)||q0(Z)}function wZ(Z){return H0(Z)||SZ(Z)}function a(Z){return H0(Z)||P0(Z)}function B5(Z){return H0(Z)||H8(Z)}function n(Z){return H0(Z)||s(Z)}function c$(Z){return H0(Z)||s(Z)&&_5(Z)&&f7(Z)}function p$(Z){return H0(Z)||s(Z)&&_5(Z)}function g7(Z){return H0(Z)||q0(Z)}function l$(Z){return l(Z)&&Z[n0]==="Readonly"}function n$(Z){return l(Z)&&Z[M0]==="Optional"}function h7(Z){return x(Z,"Any")&&n(Z.$id)}function v7(Z){return x(Z,"Argument")&&P0(Z.index)}function y7(Z){return x(Z,"Array")&&Z.type==="array"&&n(Z.$id)&&q0(Z.items)&&a(Z.minItems)&&a(Z.maxItems)&&B5(Z.uniqueItems)&&g7(Z.contains)&&a(Z.minContains)&&a(Z.maxContains)}function m7(Z){return x(Z,"AsyncIterator")&&Z.type==="AsyncIterator"&&n(Z.$id)&&q0(Z.items)}function u7(Z){return x(Z,"BigInt")&&Z.type==="bigint"&&n(Z.$id)&&wZ(Z.exclusiveMaximum)&&wZ(Z.exclusiveMinimum)&&wZ(Z.maximum)&&wZ(Z.minimum)&&wZ(Z.multipleOf)}function d7(Z){return x(Z,"Boolean")&&Z.type==="boolean"&&n(Z.$id)}function c7(Z){return x(Z,"Computed")&&s(Z.target)&&W0(Z.parameters)&&Z.parameters.every((X)=>q0(X))}function p7(Z){return x(Z,"Constructor")&&Z.type==="Constructor"&&n(Z.$id)&&W0(Z.parameters)&&Z.parameters.every((X)=>q0(X))&&q0(Z.returns)}function l7(Z){return x(Z,"Date")&&Z.type==="Date"&&n(Z.$id)&&a(Z.exclusiveMaximumTimestamp)&&a(Z.exclusiveMinimumTimestamp)&&a(Z.maximumTimestamp)&&a(Z.minimumTimestamp)&&a(Z.multipleOfTimestamp)}function n7(Z){return x(Z,"Function")&&Z.type==="Function"&&n(Z.$id)&&W0(Z.parameters)&&Z.parameters.every((X)=>q0(X))&&q0(Z.returns)}function i$(Z){return x(Z,"Import")&&H6(Z,"$defs")&&l(Z.$defs)&&_6(Z.$defs)&&H6(Z,"$ref")&&s(Z.$ref)&&Z.$ref in Z.$defs}function i7(Z){return x(Z,"Integer")&&Z.type==="integer"&&n(Z.$id)&&a(Z.exclusiveMaximum)&&a(Z.exclusiveMinimum)&&a(Z.maximum)&&a(Z.minimum)&&a(Z.multipleOf)}function _6(Z){return l(Z)&&Object.entries(Z).every(([X,z])=>_5(X)&&q0(z))}function o7(Z){return x(Z,"Intersect")&&(s(Z.type)&&Z.type!=="object"?!1:!0)&&W0(Z.allOf)&&Z.allOf.every((X)=>q0(X)&&!qX(X))&&n(Z.type)&&(B5(Z.unevaluatedProperties)||g7(Z.unevaluatedProperties))&&n(Z.$id)}function s7(Z){return x(Z,"Iterator")&&Z.type==="Iterator"&&n(Z.$id)&&q0(Z.items)}function x(Z,X){return l(Z)&&I in Z&&Z[I]===X}function a7(Z){return kZ(Z)&&s(Z.const)}function r7(Z){return kZ(Z)&&P0(Z.const)}function o$(Z){return kZ(Z)&&H8(Z.const)}function kZ(Z){return x(Z,"Literal")&&n(Z.$id)&&t7(Z.const)}function t7(Z){return H8(Z)||P0(Z)||s(Z)}function e7(Z){return x(Z,"MappedKey")&&W0(Z.keys)&&Z.keys.every((X)=>P0(X)||s(X))}function ZX(Z){return x(Z,"MappedResult")&&_6(Z.properties)}function XX(Z){return x(Z,"Never")&&l(Z.not)&&Object.getOwnPropertyNames(Z.not).length===0}function zX(Z){return x(Z,"Not")&&q0(Z.not)}function $X(Z){return x(Z,"Null")&&Z.type==="null"&&n(Z.$id)}function QX(Z){return x(Z,"Number")&&Z.type==="number"&&n(Z.$id)&&a(Z.exclusiveMaximum)&&a(Z.exclusiveMinimum)&&a(Z.maximum)&&a(Z.minimum)&&a(Z.multipleOf)}function WX(Z){return x(Z,"Object")&&Z.type==="object"&&n(Z.$id)&&_6(Z.properties)&&x7(Z.additionalProperties)&&a(Z.minProperties)&&a(Z.maxProperties)}function HX(Z){return x(Z,"Promise")&&Z.type==="Promise"&&n(Z.$id)&&q0(Z.item)}function JX(Z){return x(Z,"Record")&&Z.type==="object"&&n(Z.$id)&&x7(Z.additionalProperties)&&l(Z.patternProperties)&&((X)=>{let z=Object.getOwnPropertyNames(X.patternProperties);return z.length===1&&f7(z[0])&&l(X.patternProperties)&&q0(X.patternProperties[z[0]])})(Z)}function s$(Z){return l(Z)&&v0 in Z&&Z[v0]==="Recursive"}function YX(Z){return x(Z,"Ref")&&n(Z.$id)&&s(Z.$ref)}function VX(Z){return x(Z,"RegExp")&&n(Z.$id)&&s(Z.source)&&s(Z.flags)&&a(Z.maxLength)&&a(Z.minLength)}function _X(Z){return x(Z,"String")&&Z.type==="string"&&n(Z.$id)&&a(Z.minLength)&&a(Z.maxLength)&&c$(Z.pattern)&&p$(Z.format)}function BX(Z){return x(Z,"Symbol")&&Z.type==="symbol"&&n(Z.$id)}function UX(Z){return x(Z,"TemplateLiteral")&&Z.type==="string"&&s(Z.pattern)&&Z.pattern[0]==="^"&&Z.pattern[Z.pattern.length-1]==="$"}function GX(Z){return x(Z,"This")&&n(Z.$id)&&s(Z.$ref)}function qX(Z){return l(Z)&&Y0 in Z}function AX(Z){return x(Z,"Tuple")&&Z.type==="array"&&n(Z.$id)&&P0(Z.minItems)&&P0(Z.maxItems)&&Z.minItems===Z.maxItems&&(H0(Z.items)&&H0(Z.additionalItems)&&Z.minItems===0||W0(Z.items)&&Z.items.every((X)=>q0(X)))}function MX(Z){return x(Z,"Undefined")&&Z.type==="undefined"&&n(Z.$id)}function a$(Z){return U5(Z)&&Z.anyOf.every((X)=>a7(X)||r7(X))}function U5(Z){return x(Z,"Union")&&n(Z.$id)&&l(Z)&&W0(Z.anyOf)&&Z.anyOf.every((X)=>q0(X))}function DX(Z){return x(Z,"Uint8Array")&&Z.type==="Uint8Array"&&n(Z.$id)&&a(Z.minByteLength)&&a(Z.maxByteLength)}function LX(Z){return x(Z,"Unknown")&&n(Z.$id)}function OX(Z){return x(Z,"Unsafe")}function FX(Z){return x(Z,"Void")&&Z.type==="void"&&n(Z.$id)}function NX(Z){return l(Z)&&I in Z&&s(Z[I])&&!d$.includes(Z[I])}function q0(Z){return l(Z)&&(h7(Z)||v7(Z)||y7(Z)||d7(Z)||u7(Z)||m7(Z)||c7(Z)||p7(Z)||l7(Z)||n7(Z)||i7(Z)||o7(Z)||s7(Z)||kZ(Z)||e7(Z)||ZX(Z)||XX(Z)||zX(Z)||$X(Z)||QX(Z)||WX(Z)||HX(Z)||JX(Z)||YX(Z)||VX(Z)||_X(Z)||BX(Z)||UX(Z)||GX(Z)||AX(Z)||MX(Z)||U5(Z)||DX(Z)||LX(Z)||OX(Z)||FX(Z)||NX(Z))}var KX="(true|false)",B6="(0|[1-9][0-9]*)",RX="(.*)";var L8="^(0|[1-9][0-9]*)$",O8="^(.*)$",jX="^(?!.*)$";function SX(Z,X){return Z.includes(X)}function CX(Z){return[...new Set(Z)]}function r$(Z,X){return Z.filter((z)=>X.includes(z))}function t$(Z,X){return Z.reduce((z,W)=>{return r$(z,W)},X)}function EX(Z){return Z.length===1?Z[0]:Z.length>1?t$(Z.slice(1),Z[0]):[]}function IX(Z){let X=[];for(let z of Z)X.push(...z);return X}function F8(Z){return j({[I]:"Any"},Z)}function o8(Z,X){return j({[I]:"Array",type:"array",items:Z},X)}function TX(Z){return j({[I]:"Argument",index:Z})}function s8(Z,X){return j({[I]:"AsyncIterator",type:"AsyncIterator",items:Z},X)}function r(Z,X,z){return j({[I]:"Computed",target:Z,parameters:X},z)}function e$(Z,X){let{[X]:z,...W}=Z;return W}function z0(Z,X){return X.reduce((z,W)=>e$(z,W),Z)}function v(Z){return j({[I]:"Never",not:{}},Z)}function y(Z){return j({[I]:"MappedResult",properties:Z})}function a8(Z,X,z){return j({[I]:"Constructor",type:"Constructor",parameters:Z,returns:X},z)}function z8(Z,X,z){return j({[I]:"Function",type:"Function",parameters:Z,returns:X},z)}function bZ(Z,X){return j({[I]:"Union",anyOf:Z},X)}function ZQ(Z){return Z.some((X)=>S0(X))}function PX(Z){return Z.map((X)=>S0(X)?XQ(X):X)}function XQ(Z){return z0(Z,[M0])}function zQ(Z,X){return ZQ(Z)?L0(bZ(PX(Z),X)):bZ(PX(Z),X)}function $8(Z,X){return Z.length===1?j(Z[0],X):Z.length===0?v(X):zQ(Z,X)}function d(Z,X){return Z.length===0?v(X):Z.length===1?j(Z[0],X):bZ(Z,X)}class G5 extends A0{}function $Q(Z){return Z.replace(/\\\$/g,"$").replace(/\\\*/g,"*").replace(/\\\^/g,"^").replace(/\\\|/g,"|").replace(/\\\(/g,"(").replace(/\\\)/g,")")}function q5(Z,X,z){return Z[X]===z&&Z.charCodeAt(X-1)!==92}function B8(Z,X){return q5(Z,X,"(")}function fZ(Z,X){return q5(Z,X,")")}function wX(Z,X){return q5(Z,X,"|")}function QQ(Z){if(!(B8(Z,0)&&fZ(Z,Z.length-1)))return!1;let X=0;for(let z=0;z<Z.length;z++){if(B8(Z,z))X+=1;if(fZ(Z,z))X-=1;if(X===0&&z!==Z.length-1)return!1}return!0}function WQ(Z){return Z.slice(1,Z.length-1)}function HQ(Z){let X=0;for(let z=0;z<Z.length;z++){if(B8(Z,z))X+=1;if(fZ(Z,z))X-=1;if(wX(Z,z)&&X===0)return!0}return!1}function JQ(Z){for(let X=0;X<Z.length;X++)if(B8(Z,X))return!0;return!1}function YQ(Z){let[X,z]=[0,0],W=[];for(let q=0;q<Z.length;q++){if(B8(Z,q))X+=1;if(fZ(Z,q))X-=1;if(wX(Z,q)&&X===0){let B=Z.slice(z,q);if(B.length>0)W.push(r8(B));z=q+1}}let _=Z.slice(z);if(_.length>0)W.push(r8(_));if(W.length===0)return{type:"const",const:""};if(W.length===1)return W[0];return{type:"or",expr:W}}function VQ(Z){function X(_,q){if(!B8(_,q))throw new G5("TemplateLiteralParser: Index must point to open parens");let B=0;for(let U=q;U<_.length;U++){if(B8(_,U))B+=1;if(fZ(_,U))B-=1;if(B===0)return[q,U]}throw new G5("TemplateLiteralParser: Unclosed group parens in expression")}function z(_,q){for(let B=q;B<_.length;B++)if(B8(_,B))return[q,B];return[q,_.length]}let W=[];for(let _=0;_<Z.length;_++)if(B8(Z,_)){let[q,B]=X(Z,_),U=Z.slice(q,B+1);W.push(r8(U)),_=B}else{let[q,B]=z(Z,_),U=Z.slice(q,B);if(U.length>0)W.push(r8(U));_=B-1}return W.length===0?{type:"const",const:""}:W.length===1?W[0]:{type:"and",expr:W}}function r8(Z){return QQ(Z)?r8(WQ(Z)):HQ(Z)?YQ(Z):JQ(Z)?VQ(Z):{type:"const",const:$Q(Z)}}function t8(Z){return r8(Z.slice(1,Z.length-1))}class kX extends A0{}function _Q(Z){return Z.type==="or"&&Z.expr.length===2&&Z.expr[0].type==="const"&&Z.expr[0].const==="0"&&Z.expr[1].type==="const"&&Z.expr[1].const==="[1-9][0-9]*"}function BQ(Z){return Z.type==="or"&&Z.expr.length===2&&Z.expr[0].type==="const"&&Z.expr[0].const==="true"&&Z.expr[1].type==="const"&&Z.expr[1].const==="false"}function UQ(Z){return Z.type==="const"&&Z.const===".*"}function v8(Z){return _Q(Z)||UQ(Z)?!1:BQ(Z)?!0:Z.type==="and"?Z.expr.every((X)=>v8(X)):Z.type==="or"?Z.expr.every((X)=>v8(X)):Z.type==="const"?!0:(()=>{throw new kX("Unknown expression type")})()}function bX(Z){let X=t8(Z.pattern);return v8(X)}class fX extends A0{}function*xX(Z){if(Z.length===1)return yield*Z[0];for(let X of Z[0])for(let z of xX(Z.slice(1)))yield`${X}${z}`}function*GQ(Z){return yield*xX(Z.expr.map((X)=>[...xZ(X)]))}function*qQ(Z){for(let X of Z.expr)yield*xZ(X)}function*AQ(Z){return yield Z.const}function*xZ(Z){return Z.type==="and"?yield*GQ(Z):Z.type==="or"?yield*qQ(Z):Z.type==="const"?yield*AQ(Z):(()=>{throw new fX("Unknown expression")})()}function U6(Z){let X=t8(Z.pattern);return v8(X)?[...xZ(X)]:[]}function u(Z,X){return j({[I]:"Literal",const:Z,type:typeof Z},X)}function G6(Z){return j({[I]:"Boolean",type:"boolean"},Z)}function e8(Z){return j({[I]:"BigInt",type:"bigint"},Z)}function y0(Z){return j({[I]:"Number",type:"number"},Z)}function e0(Z){return j({[I]:"String",type:"string"},Z)}function*MQ(Z){let X=Z.trim().replace(/"|'/g,"");return X==="boolean"?yield G6():X==="number"?yield y0():X==="bigint"?yield e8():X==="string"?yield e0():yield(()=>{let z=X.split("|").map((W)=>u(W.trim()));return z.length===0?v():z.length===1?z[0]:$8(z)})()}function*DQ(Z){if(Z[1]!=="{"){let X=u("$"),z=A5(Z.slice(1));return yield*[X,...z]}for(let X=2;X<Z.length;X++)if(Z[X]==="}"){let z=MQ(Z.slice(2,X)),W=A5(Z.slice(X+1));return yield*[...z,...W]}yield u(Z)}function*A5(Z){for(let X=0;X<Z.length;X++)if(Z[X]==="$"){let z=u(Z.slice(0,X)),W=DQ(Z.slice(X));return yield*[z,...W]}yield u(Z)}function gX(Z){return[...A5(Z)]}class hX extends A0{}function LQ(Z){return Z.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function vX(Z,X){return b0(Z)?Z.pattern.slice(1,Z.pattern.length-1):h(Z)?`(${Z.anyOf.map((z)=>vX(z,X)).join("|")})`:t0(Z)?`${X}${B6}`:r0(Z)?`${X}${B6}`:f8(Z)?`${X}${B6}`:V8(Z)?`${X}${RX}`:w0(Z)?`${X}${LQ(Z.const.toString())}`:Y8(Z)?`${X}${KX}`:(()=>{throw new hX(`Unexpected Kind '${Z[I]}'`)})()}function M5(Z){return`^${Z.map((X)=>vX(X,"")).join("")}$`}function y8(Z){let z=U6(Z).map((W)=>u(W));return $8(z)}function q6(Z,X){let z=s(Z)?M5(gX(Z)):M5(Z);return j({[I]:"TemplateLiteral",type:"string",pattern:z},X)}function OQ(Z){return U6(Z).map((z)=>z.toString())}function FQ(Z){let X=[];for(let z of Z)X.push(...C0(z));return X}function NQ(Z){return[Z.toString()]}function C0(Z){return[...new Set(b0(Z)?OQ(Z):h(Z)?FQ(Z.anyOf):w0(Z)?NQ(Z.const):t0(Z)?["[number]"]:r0(Z)?["[number]"]:[])]}function KQ(Z,X,z){let W={};for(let _ of Object.getOwnPropertyNames(X))W[_]=N8(Z,C0(X[_]),z);return W}function RQ(Z,X,z){return KQ(Z,X.properties,z)}function yX(Z,X,z){let W=RQ(Z,X,z);return y(W)}function uX(Z,X){return Z.map((z)=>dX(z,X))}function jQ(Z){return Z.filter((X)=>!M8(X))}function SQ(Z,X){return A6(jQ(uX(Z,X)))}function CQ(Z){return Z.some((X)=>M8(X))?[]:Z}function EQ(Z,X){return $8(CQ(uX(Z,X)))}function IQ(Z,X){return X in Z?Z[X]:X==="[number]"?$8(Z):v()}function TQ(Z,X){return X==="[number]"?Z:v()}function PQ(Z,X){return X in Z?Z[X]:v()}function dX(Z,X){return X0(Z)?SQ(Z.allOf,X):h(Z)?EQ(Z.anyOf,X):f0(Z)?IQ(Z.items??[],X):i0(Z)?TQ(Z.items,X):J0(Z)?PQ(Z.properties,X):v()}function D5(Z,X){return X.map((z)=>dX(Z,z))}function mX(Z,X){return $8(D5(Z,X))}function N8(Z,X,z){if(Q0(Z)||Q0(X)){if(!x0(Z)||!x0(X))throw new A0("Index types using Ref parameters require both Type and Key to be of TSchema");return r("Index",[Z,X])}if(e(X))return yX(Z,X,z);if(k0(X))return cX(Z,X,z);return j(x0(X)?mX(Z,C0(X)):mX(Z,X),z)}function wQ(Z,X,z){return{[X]:N8(Z,[X],t(z))}}function kQ(Z,X,z){return X.reduce((W,_)=>{return{...W,...wQ(Z,_,z)}},{})}function bQ(Z,X,z){return kQ(Z,X.keys,z)}function cX(Z,X,z){let W=bQ(Z,X,z);return y(W)}function ZZ(Z,X){return j({[I]:"Iterator",type:"Iterator",items:Z},X)}function fQ(Z){return globalThis.Object.keys(Z).filter((X)=>!S0(Z[X]))}function xQ(Z,X){let z=fQ(Z),W=z.length>0?{[I]:"Object",type:"object",required:z,properties:Z}:{[I]:"Object",type:"object",properties:Z};return j(W,X)}var i=xQ;function M6(Z,X){return j({[I]:"Promise",type:"Promise",item:Z},X)}function gQ(Z){return j(z0(Z,[n0]))}function hQ(Z){return j({...Z,[n0]:"Readonly"})}function vQ(Z,X){return X===!1?gQ(Z):hQ(Z)}function E0(Z,X){let z=X??!0;return e(Z)?pX(Z,z):vQ(Z,z)}function yQ(Z,X){let z={};for(let W of globalThis.Object.getOwnPropertyNames(Z))z[W]=E0(Z[W],X);return z}function mQ(Z,X){return yQ(Z.properties,X)}function pX(Z,X){let z=mQ(Z,X);return y(z)}function m0(Z,X){return j(Z.length>0?{[I]:"Tuple",type:"array",items:Z,additionalItems:!1,minItems:Z.length,maxItems:Z.length}:{[I]:"Tuple",type:"array",minItems:Z.length,maxItems:Z.length},X)}function lX(Z,X){return Z in X?u0(Z,X[Z]):y(X)}function uQ(Z){return{[Z]:u(Z)}}function dQ(Z){let X={};for(let z of Z)X[z]=u(z);return X}function cQ(Z,X){return SX(X,Z)?uQ(Z):dQ(X)}function pQ(Z,X){let z=cQ(Z,X);return lX(Z,z)}function gZ(Z,X){return X.map((z)=>u0(Z,z))}function lQ(Z,X){let z={};for(let W of globalThis.Object.getOwnPropertyNames(X))z[W]=u0(Z,X[W]);return z}function u0(Z,X){let z={...X};return S0(X)?L0(u0(Z,z0(X,[M0]))):i8(X)?E0(u0(Z,z0(X,[n0]))):e(X)?lX(Z,X.properties):k0(X)?pQ(Z,X.keys):s0(X)?a8(gZ(Z,X.parameters),u0(Z,X.returns),z):a0(X)?z8(gZ(Z,X.parameters),u0(Z,X.returns),z):b8(X)?s8(u0(Z,X.items),z):x8(X)?ZZ(u0(Z,X.items),z):X0(X)?O0(gZ(Z,X.allOf),z):h(X)?d(gZ(Z,X.anyOf),z):f0(X)?m0(gZ(Z,X.items??[]),z):J0(X)?i(lQ(Z,X.properties),z):i0(X)?o8(u0(Z,X.items),z):g8(X)?M6(u0(Z,X.item),z):X}function nQ(Z,X){let z={};for(let W of Z)z[W]=u0(W,X);return z}function nX(Z,X,z){let W=x0(Z)?C0(Z):Z,_=X({[I]:"MappedKey",keys:W}),q=nQ(W,_);return i(q,z)}function iQ(Z){return j(z0(Z,[M0]))}function oQ(Z){return j({...Z,[M0]:"Optional"})}function sQ(Z,X){return X===!1?iQ(Z):oQ(Z)}function L0(Z,X){let z=X??!0;return e(Z)?iX(Z,z):sQ(Z,z)}function aQ(Z,X){let z={};for(let W of globalThis.Object.getOwnPropertyNames(Z))z[W]=L0(Z[W],X);return z}function rQ(Z,X){return aQ(Z.properties,X)}function iX(Z,X){let z=rQ(Z,X);return y(z)}function hZ(Z,X={}){let z=Z.every((_)=>J0(_)),W=x0(X.unevaluatedProperties)?{unevaluatedProperties:X.unevaluatedProperties}:{};return j(X.unevaluatedProperties===!1||x0(X.unevaluatedProperties)||z?{...W,[I]:"Intersect",type:"object",allOf:Z}:{...W,[I]:"Intersect",allOf:Z},X)}function tQ(Z){return Z.every((X)=>S0(X))}function eQ(Z){return z0(Z,[M0])}function oX(Z){return Z.map((X)=>S0(X)?eQ(X):X)}function Z1(Z,X){return tQ(Z)?L0(hZ(oX(Z),X)):hZ(oX(Z),X)}function A6(Z,X={}){if(Z.length===1)return j(Z[0],X);if(Z.length===0)return v(X);if(Z.some((z)=>D8(z)))throw Error("Cannot intersect transform types");return Z1(Z,X)}function O0(Z,X){if(Z.length===1)return j(Z[0],X);if(Z.length===0)return v(X);if(Z.some((z)=>D8(z)))throw Error("Cannot intersect transform types");return hZ(Z,X)}function Q8(...Z){let[X,z]=typeof Z[0]==="string"?[Z[0],Z[1]]:[Z[0].$id,Z[1]];if(typeof X!=="string")throw new A0("Ref: $ref must be a string");return j({[I]:"Ref",$ref:X},z)}function X1(Z,X){return r("Awaited",[r(Z,X)])}function z1(Z){return r("Awaited",[Q8(Z)])}function $1(Z){return O0(sX(Z))}function Q1(Z){return d(sX(Z))}function W1(Z){return XZ(Z)}function sX(Z){return Z.map((X)=>XZ(X))}function XZ(Z,X){return j(o0(Z)?X1(Z.target,Z.parameters):X0(Z)?$1(Z.allOf):h(Z)?Q1(Z.anyOf):g8(Z)?W1(Z.item):Q0(Z)?z1(Z.$ref):Z,X)}function aX(Z){let X=[];for(let z of Z)X.push(vZ(z));return X}function H1(Z){let X=aX(Z);return IX(X)}function J1(Z){let X=aX(Z);return EX(X)}function Y1(Z){return Z.map((X,z)=>z.toString())}function V1(Z){return["[number]"]}function _1(Z){return globalThis.Object.getOwnPropertyNames(Z)}function B1(Z){if(!U1)return[];return globalThis.Object.getOwnPropertyNames(Z).map((z)=>{return z[0]==="^"&&z[z.length-1]==="$"?z.slice(1,z.length-1):z})}function vZ(Z){return X0(Z)?H1(Z.allOf):h(Z)?J1(Z.anyOf):f0(Z)?Y1(Z.items??[]):i0(Z)?V1(Z.items):J0(Z)?_1(Z.properties):h8(Z)?B1(Z.patternProperties):[]}var U1=!1;function G1(Z,X){return r("KeyOf",[r(Z,X)])}function q1(Z){return r("KeyOf",[Q8(Z)])}function A1(Z,X){let z=vZ(Z),W=M1(z),_=$8(W);return j(_,X)}function M1(Z){return Z.map((X)=>X==="[number]"?y0():u(X))}function zZ(Z,X){return o0(Z)?G1(Z.target,Z.parameters):Q0(Z)?q1(Z.$ref):e(Z)?rX(Z,X):A1(Z,X)}function D1(Z,X){let z={};for(let W of globalThis.Object.getOwnPropertyNames(Z))z[W]=zZ(Z[W],t(X));return z}function L1(Z,X){return D1(Z.properties,X)}function rX(Z,X){let z=L1(Z,X);return y(z)}function O1(Z){let X=[];for(let z of Z)X.push(...vZ(z));return CX(X)}function F1(Z){return Z.filter((X)=>!M8(X))}function N1(Z,X){let z=[];for(let W of Z)z.push(...D5(W,[X]));return F1(z)}function K1(Z,X){let z={};for(let W of X)z[W]=A6(N1(Z,W));return z}function tX(Z,X){let z=O1(Z),W=K1(Z,z);return i(W,X)}function D6(Z){return j({[I]:"Date",type:"Date"},Z)}function L6(Z){return j({[I]:"Null",type:"null"},Z)}function O6(Z){return j({[I]:"Symbol",type:"symbol"},Z)}function F6(Z){return j({[I]:"Undefined",type:"undefined"},Z)}function N6(Z){return j({[I]:"Uint8Array",type:"Uint8Array"},Z)}function K8(Z){return j({[I]:"Unknown"},Z)}function R1(Z){return Z.map((X)=>L5(X,!1))}function j1(Z){let X={};for(let z of globalThis.Object.getOwnPropertyNames(Z))X[z]=E0(L5(Z[z],!1));return X}function K6(Z,X){return X===!0?Z:E0(Z)}function L5(Z,X){return z5(Z)?K6(F8(),X):Q5(Z)?K6(F8(),X):W0(Z)?E0(m0(R1(Z))):J8(Z)?N6():k8(Z)?D6():l(Z)?K6(i(j1(Z)),X):$5(Z)?K6(z8([],K8()),X):H0(Z)?F6():W5(Z)?L6():H5(Z)?O6():SZ(Z)?e8():P0(Z)?u(Z):H8(Z)?u(Z):s(Z)?u(Z):i({})}function eX(Z,X){return j(L5(Z,!0),X)}function Z2(Z,X){return s0(Z)?m0(Z.parameters,X):v(X)}function X2(Z,X){if(H0(Z))throw Error("Enum undefined or empty");let z=globalThis.Object.getOwnPropertyNames(Z).filter((q)=>isNaN(q)).map((q)=>Z[q]),_=[...new Set(z)].map((q)=>u(q));return d(_,{...X,[v0]:"Enum"})}class H2 extends A0{}var S;(function(Z){Z[Z.Union=0]="Union",Z[Z.True=1]="True",Z[Z.False=2]="False"})(S||(S={}));function d0(Z){return Z===S.False?Z:S.True}function $Z(Z){throw new H2(Z)}function V0(Z){return O.IsNever(Z)||O.IsIntersect(Z)||O.IsUnion(Z)||O.IsUnknown(Z)||O.IsAny(Z)}function _0(Z,X){return O.IsNever(X)?V2(Z,X):O.IsIntersect(X)?R6(Z,X):O.IsUnion(X)?R5(Z,X):O.IsUnknown(X)?G2(Z,X):O.IsAny(X)?K5(Z,X):$Z("StructuralRight")}function K5(Z,X){return S.True}function S1(Z,X){return O.IsIntersect(X)?R6(Z,X):O.IsUnion(X)&&X.anyOf.some((z)=>O.IsAny(z)||O.IsUnknown(z))?S.True:O.IsUnion(X)?S.Union:O.IsUnknown(X)?S.True:O.IsAny(X)?S.True:S.Union}function C1(Z,X){return O.IsUnknown(Z)?S.False:O.IsAny(Z)?S.Union:O.IsNever(Z)?S.True:S.False}function E1(Z,X){return O.IsObject(X)&&j6(X)?S.True:V0(X)?_0(Z,X):!O.IsArray(X)?S.False:d0(o(Z.items,X.items))}function I1(Z,X){return V0(X)?_0(Z,X):!O.IsAsyncIterator(X)?S.False:d0(o(Z.items,X.items))}function T1(Z,X){return V0(X)?_0(Z,X):O.IsObject(X)?F0(Z,X):O.IsRecord(X)?c0(Z,X):O.IsBigInt(X)?S.True:S.False}function J2(Z,X){return O.IsLiteralBoolean(Z)?S.True:O.IsBoolean(Z)?S.True:S.False}function P1(Z,X){return V0(X)?_0(Z,X):O.IsObject(X)?F0(Z,X):O.IsRecord(X)?c0(Z,X):O.IsBoolean(X)?S.True:S.False}function w1(Z,X){return V0(X)?_0(Z,X):O.IsObject(X)?F0(Z,X):!O.IsConstructor(X)?S.False:Z.parameters.length>X.parameters.length?S.False:!Z.parameters.every((z,W)=>d0(o(X.parameters[W],z))===S.True)?S.False:d0(o(Z.returns,X.returns))}function k1(Z,X){return V0(X)?_0(Z,X):O.IsObject(X)?F0(Z,X):O.IsRecord(X)?c0(Z,X):O.IsDate(X)?S.True:S.False}function b1(Z,X){return V0(X)?_0(Z,X):O.IsObject(X)?F0(Z,X):!O.IsFunction(X)?S.False:Z.parameters.length>X.parameters.length?S.False:!Z.parameters.every((z,W)=>d0(o(X.parameters[W],z))===S.True)?S.False:d0(o(Z.returns,X.returns))}function Y2(Z,X){return O.IsLiteral(Z)&&D0.IsNumber(Z.const)?S.True:O.IsNumber(Z)||O.IsInteger(Z)?S.True:S.False}function f1(Z,X){return O.IsInteger(X)||O.IsNumber(X)?S.True:V0(X)?_0(Z,X):O.IsObject(X)?F0(Z,X):O.IsRecord(X)?c0(Z,X):S.False}function R6(Z,X){return X.allOf.every((z)=>o(Z,z)===S.True)?S.True:S.False}function x1(Z,X){return Z.allOf.some((z)=>o(z,X)===S.True)?S.True:S.False}function g1(Z,X){return V0(X)?_0(Z,X):!O.IsIterator(X)?S.False:d0(o(Z.items,X.items))}function h1(Z,X){return O.IsLiteral(X)&&X.const===Z.const?S.True:V0(X)?_0(Z,X):O.IsObject(X)?F0(Z,X):O.IsRecord(X)?c0(Z,X):O.IsString(X)?U2(Z,X):O.IsNumber(X)?_2(Z,X):O.IsInteger(X)?Y2(Z,X):O.IsBoolean(X)?J2(Z,X):S.False}function V2(Z,X){return S.False}function v1(Z,X){return S.True}function z2(Z){let[X,z]=[Z,0];while(!0){if(!O.IsNot(X))break;X=X.not,z+=1}return z%2===0?X:K8()}function y1(Z,X){return O.IsNot(Z)?o(z2(Z),X):O.IsNot(X)?o(Z,z2(X)):$Z("Invalid fallthrough for Not")}function m1(Z,X){return V0(X)?_0(Z,X):O.IsObject(X)?F0(Z,X):O.IsRecord(X)?c0(Z,X):O.IsNull(X)?S.True:S.False}function _2(Z,X){return O.IsLiteralNumber(Z)?S.True:O.IsNumber(Z)||O.IsInteger(Z)?S.True:S.False}function u1(Z,X){return V0(X)?_0(Z,X):O.IsObject(X)?F0(Z,X):O.IsRecord(X)?c0(Z,X):O.IsInteger(X)||O.IsNumber(X)?S.True:S.False}function I0(Z,X){return Object.getOwnPropertyNames(Z.properties).length===X}function $2(Z){return j6(Z)}function Q2(Z){return I0(Z,0)||I0(Z,1)&&"description"in Z.properties&&O.IsUnion(Z.properties.description)&&Z.properties.description.anyOf.length===2&&(O.IsString(Z.properties.description.anyOf[0])&&O.IsUndefined(Z.properties.description.anyOf[1])||O.IsString(Z.properties.description.anyOf[1])&&O.IsUndefined(Z.properties.description.anyOf[0]))}function O5(Z){return I0(Z,0)}function W2(Z){return I0(Z,0)}function d1(Z){return I0(Z,0)}function c1(Z){return I0(Z,0)}function p1(Z){return j6(Z)}function l1(Z){let X=y0();return I0(Z,0)||I0(Z,1)&&"length"in Z.properties&&d0(o(Z.properties.length,X))===S.True}function n1(Z){return I0(Z,0)}function j6(Z){let X=y0();return I0(Z,0)||I0(Z,1)&&"length"in Z.properties&&d0(o(Z.properties.length,X))===S.True}function i1(Z){let X=z8([F8()],F8());return I0(Z,0)||I0(Z,1)&&"then"in Z.properties&&d0(o(Z.properties.then,X))===S.True}function B2(Z,X){return o(Z,X)===S.False?S.False:O.IsOptional(Z)&&!O.IsOptional(X)?S.False:S.True}function F0(Z,X){return O.IsUnknown(Z)?S.False:O.IsAny(Z)?S.Union:O.IsNever(Z)||O.IsLiteralString(Z)&&$2(X)||O.IsLiteralNumber(Z)&&O5(X)||O.IsLiteralBoolean(Z)&&W2(X)||O.IsSymbol(Z)&&Q2(X)||O.IsBigInt(Z)&&d1(X)||O.IsString(Z)&&$2(X)||O.IsSymbol(Z)&&Q2(X)||O.IsNumber(Z)&&O5(X)||O.IsInteger(Z)&&O5(X)||O.IsBoolean(Z)&&W2(X)||O.IsUint8Array(Z)&&p1(X)||O.IsDate(Z)&&c1(X)||O.IsConstructor(Z)&&n1(X)||O.IsFunction(Z)&&l1(X)?S.True:O.IsRecord(Z)&&O.IsString(F5(Z))?(()=>{return X[v0]==="Record"?S.True:S.False})():O.IsRecord(Z)&&O.IsNumber(F5(Z))?(()=>{return I0(X,0)?S.True:S.False})():S.False}function o1(Z,X){return V0(X)?_0(Z,X):O.IsRecord(X)?c0(Z,X):!O.IsObject(X)?S.False:(()=>{for(let z of Object.getOwnPropertyNames(X.properties)){if(!(z in Z.properties)&&!O.IsOptional(X.properties[z]))return S.False;if(O.IsOptional(X.properties[z]))return S.True;if(B2(Z.properties[z],X.properties[z])===S.False)return S.False}return S.True})()}function s1(Z,X){return V0(X)?_0(Z,X):O.IsObject(X)&&i1(X)?S.True:!O.IsPromise(X)?S.False:d0(o(Z.item,X.item))}function F5(Z){return L8 in Z.patternProperties?y0():(O8 in Z.patternProperties)?e0():$Z("Unknown record key pattern")}function N5(Z){return L8 in Z.patternProperties?Z.patternProperties[L8]:(O8 in Z.patternProperties)?Z.patternProperties[O8]:$Z("Unable to get record value schema")}function c0(Z,X){let[z,W]=[F5(X),N5(X)];return O.IsLiteralString(Z)&&O.IsNumber(z)&&d0(o(Z,W))===S.True?S.True:O.IsUint8Array(Z)&&O.IsNumber(z)?o(Z,W):O.IsString(Z)&&O.IsNumber(z)?o(Z,W):O.IsArray(Z)&&O.IsNumber(z)?o(Z,W):O.IsObject(Z)?(()=>{for(let _ of Object.getOwnPropertyNames(Z.properties))if(B2(W,Z.properties[_])===S.False)return S.False;return S.True})():S.False}function a1(Z,X){return V0(X)?_0(Z,X):O.IsObject(X)?F0(Z,X):!O.IsRecord(X)?S.False:o(N5(Z),N5(X))}function r1(Z,X){let z=O.IsRegExp(Z)?e0():Z,W=O.IsRegExp(X)?e0():X;return o(z,W)}function U2(Z,X){return O.IsLiteral(Z)&&D0.IsString(Z.const)?S.True:O.IsString(Z)?S.True:S.False}function t1(Z,X){return V0(X)?_0(Z,X):O.IsObject(X)?F0(Z,X):O.IsRecord(X)?c0(Z,X):O.IsString(X)?S.True:S.False}function e1(Z,X){return V0(X)?_0(Z,X):O.IsObject(X)?F0(Z,X):O.IsRecord(X)?c0(Z,X):O.IsSymbol(X)?S.True:S.False}function ZW(Z,X){return O.IsTemplateLiteral(Z)?o(y8(Z),X):O.IsTemplateLiteral(X)?o(Z,y8(X)):$Z("Invalid fallthrough for TemplateLiteral")}function XW(Z,X){return O.IsArray(X)&&Z.items!==void 0&&Z.items.every((z)=>o(z,X.items)===S.True)}function zW(Z,X){return O.IsNever(Z)?S.True:O.IsUnknown(Z)?S.False:O.IsAny(Z)?S.Union:S.False}function $W(Z,X){return V0(X)?_0(Z,X):O.IsObject(X)&&j6(X)?S.True:O.IsArray(X)&&XW(Z,X)?S.True:!O.IsTuple(X)?S.False:D0.IsUndefined(Z.items)&&!D0.IsUndefined(X.items)||!D0.IsUndefined(Z.items)&&D0.IsUndefined(X.items)?S.False:D0.IsUndefined(Z.items)&&!D0.IsUndefined(X.items)?S.True:Z.items.every((z,W)=>o(z,X.items[W])===S.True)?S.True:S.False}function QW(Z,X){return V0(X)?_0(Z,X):O.IsObject(X)?F0(Z,X):O.IsRecord(X)?c0(Z,X):O.IsUint8Array(X)?S.True:S.False}function WW(Z,X){return V0(X)?_0(Z,X):O.IsObject(X)?F0(Z,X):O.IsRecord(X)?c0(Z,X):O.IsVoid(X)?YW(Z,X):O.IsUndefined(X)?S.True:S.False}function R5(Z,X){return X.anyOf.some((z)=>o(Z,z)===S.True)?S.True:S.False}function HW(Z,X){return Z.anyOf.every((z)=>o(z,X)===S.True)?S.True:S.False}function G2(Z,X){return S.True}function JW(Z,X){return O.IsNever(X)?V2(Z,X):O.IsIntersect(X)?R6(Z,X):O.IsUnion(X)?R5(Z,X):O.IsAny(X)?K5(Z,X):O.IsString(X)?U2(Z,X):O.IsNumber(X)?_2(Z,X):O.IsInteger(X)?Y2(Z,X):O.IsBoolean(X)?J2(Z,X):O.IsArray(X)?C1(Z,X):O.IsTuple(X)?zW(Z,X):O.IsObject(X)?F0(Z,X):O.IsUnknown(X)?S.True:S.False}function YW(Z,X){return O.IsUndefined(Z)?S.True:O.IsUndefined(Z)?S.True:S.False}function VW(Z,X){return O.IsIntersect(X)?R6(Z,X):O.IsUnion(X)?R5(Z,X):O.IsUnknown(X)?G2(Z,X):O.IsAny(X)?K5(Z,X):O.IsObject(X)?F0(Z,X):O.IsVoid(X)?S.True:S.False}function o(Z,X){return O.IsTemplateLiteral(Z)||O.IsTemplateLiteral(X)?ZW(Z,X):O.IsRegExp(Z)||O.IsRegExp(X)?r1(Z,X):O.IsNot(Z)||O.IsNot(X)?y1(Z,X):O.IsAny(Z)?S1(Z,X):O.IsArray(Z)?E1(Z,X):O.IsBigInt(Z)?T1(Z,X):O.IsBoolean(Z)?P1(Z,X):O.IsAsyncIterator(Z)?I1(Z,X):O.IsConstructor(Z)?w1(Z,X):O.IsDate(Z)?k1(Z,X):O.IsFunction(Z)?b1(Z,X):O.IsInteger(Z)?f1(Z,X):O.IsIntersect(Z)?x1(Z,X):O.IsIterator(Z)?g1(Z,X):O.IsLiteral(Z)?h1(Z,X):O.IsNever(Z)?v1(Z,X):O.IsNull(Z)?m1(Z,X):O.IsNumber(Z)?u1(Z,X):O.IsObject(Z)?o1(Z,X):O.IsRecord(Z)?a1(Z,X):O.IsString(Z)?t1(Z,X):O.IsSymbol(Z)?e1(Z,X):O.IsTuple(Z)?$W(Z,X):O.IsPromise(Z)?s1(Z,X):O.IsUint8Array(Z)?QW(Z,X):O.IsUndefined(Z)?WW(Z,X):O.IsUnion(Z)?HW(Z,X):O.IsUnknown(Z)?JW(Z,X):O.IsVoid(Z)?VW(Z,X):$Z(`Unknown left type operand '${Z[I]}'`)}function R8(Z,X){return o(Z,X)}function _W(Z,X,z,W,_){let q={};for(let B of globalThis.Object.getOwnPropertyNames(Z))q[B]=QZ(Z[B],X,z,W,t(_));return q}function BW(Z,X,z,W,_){return _W(Z.properties,X,z,W,_)}function q2(Z,X,z,W,_){let q=BW(Z,X,z,W,_);return y(q)}function UW(Z,X,z,W){let _=R8(Z,X);return _===S.Union?d([z,W]):_===S.True?z:W}function QZ(Z,X,z,W,_){return e(Z)?q2(Z,X,z,W,_):k0(Z)?j(A2(Z,X,z,W,_)):j(UW(Z,X,z,W),_)}function GW(Z,X,z,W,_){return{[Z]:QZ(u(Z),X,z,W,t(_))}}function qW(Z,X,z,W,_){return Z.reduce((q,B)=>{return{...q,...GW(B,X,z,W,_)}},{})}function AW(Z,X,z,W,_){return qW(Z.keys,X,z,W,_)}function A2(Z,X,z,W,_){let q=AW(Z,X,z,W,_);return y(q)}function M2(Z,X){return WZ(y8(Z),X)}function MW(Z,X){let z=Z.filter((W)=>R8(W,X)===S.False);return z.length===1?z[0]:d(z)}function WZ(Z,X,z={}){if(b0(Z))return j(M2(Z,X),z);if(e(Z))return j(D2(Z,X),z);return j(h(Z)?MW(Z.anyOf,X):R8(Z,X)!==S.False?v():Z,z)}function DW(Z,X){let z={};for(let W of globalThis.Object.getOwnPropertyNames(Z))z[W]=WZ(Z[W],X);return z}function LW(Z,X){return DW(Z.properties,X)}function D2(Z,X){let z=LW(Z,X);return y(z)}function L2(Z,X){return HZ(y8(Z),X)}function OW(Z,X){let z=Z.filter((W)=>R8(W,X)!==S.False);return z.length===1?z[0]:d(z)}function HZ(Z,X,z){if(b0(Z))return j(L2(Z,X),z);if(e(Z))return j(O2(Z,X),z);return j(h(Z)?OW(Z.anyOf,X):R8(Z,X)!==S.False?Z:v(),z)}function FW(Z,X){let z={};for(let W of globalThis.Object.getOwnPropertyNames(Z))z[W]=HZ(Z[W],X);return z}function NW(Z,X){return FW(Z.properties,X)}function O2(Z,X){let z=NW(Z,X);return y(z)}function F2(Z,X){return s0(Z)?j(Z.returns,X):v(X)}function S6(Z){return E0(L0(Z))}function m8(Z,X,z){return j({[I]:"Record",type:"object",patternProperties:{[Z]:X}},z)}function j5(Z,X,z){let W={};for(let _ of Z)W[_]=X;return i(W,{...z,[v0]:"Record"})}function KW(Z,X,z){return bX(Z)?j5(C0(Z),X,z):m8(Z.pattern,X,z)}function RW(Z,X,z){return j5(C0(d(Z)),X,z)}function jW(Z,X,z){return j5([Z.toString()],X,z)}function SW(Z,X,z){return m8(Z.source,X,z)}function CW(Z,X,z){let W=H0(Z.pattern)?O8:Z.pattern;return m8(W,X,z)}function EW(Z,X,z){return m8(O8,X,z)}function IW(Z,X,z){return m8(jX,X,z)}function TW(Z,X,z){return i({true:X,false:X},z)}function PW(Z,X,z){return m8(L8,X,z)}function wW(Z,X,z){return m8(L8,X,z)}function C6(Z,X,z={}){return h(Z)?RW(Z.anyOf,X,z):b0(Z)?KW(Z,X,z):w0(Z)?jW(Z.const,X,z):Y8(Z)?TW(Z,X,z):r0(Z)?PW(Z,X,z):t0(Z)?wW(Z,X,z):V5(Z)?SW(Z,X,z):V8(Z)?CW(Z,X,z):J5(Z)?EW(Z,X,z):M8(Z)?IW(Z,X,z):v(z)}function E6(Z){return globalThis.Object.getOwnPropertyNames(Z.patternProperties)[0]}function N2(Z){let X=E6(Z);return X===O8?e0():X===L8?y0():e0({pattern:X})}function I6(Z){return Z.patternProperties[E6(Z)]}function kW(Z,X){return X.parameters=yZ(Z,X.parameters),X.returns=Z8(Z,X.returns),X}function bW(Z,X){return X.parameters=yZ(Z,X.parameters),X.returns=Z8(Z,X.returns),X}function fW(Z,X){return X.allOf=yZ(Z,X.allOf),X}function xW(Z,X){return X.anyOf=yZ(Z,X.anyOf),X}function gW(Z,X){if(H0(X.items))return X;return X.items=yZ(Z,X.items),X}function hW(Z,X){return X.items=Z8(Z,X.items),X}function vW(Z,X){return X.items=Z8(Z,X.items),X}function yW(Z,X){return X.items=Z8(Z,X.items),X}function mW(Z,X){return X.item=Z8(Z,X.item),X}function uW(Z,X){let z=lW(Z,X.properties);return{...X,...i(z)}}function dW(Z,X){let z=Z8(Z,N2(X)),W=Z8(Z,I6(X)),_=C6(z,W);return{...X,..._}}function cW(Z,X){return X.index in Z?Z[X.index]:K8()}function pW(Z,X){let z=i8(X),W=S0(X),_=Z8(Z,X);return z&&W?S6(_):z&&!W?E0(_):!z&&W?L0(_):_}function lW(Z,X){return globalThis.Object.getOwnPropertyNames(X).reduce((z,W)=>{return{...z,[W]:pW(Z,X[W])}},{})}function yZ(Z,X){return X.map((z)=>Z8(Z,z))}function Z8(Z,X){return s0(X)?kW(Z,X):a0(X)?bW(Z,X):X0(X)?fW(Z,X):h(X)?xW(Z,X):f0(X)?gW(Z,X):i0(X)?hW(Z,X):b8(X)?vW(Z,X):x8(X)?yW(Z,X):g8(X)?mW(Z,X):J0(X)?uW(Z,X):h8(X)?dW(Z,X):Y5(X)?cW(Z,X):X}function K2(Z,X){return Z8(X,n8(Z))}function R2(Z){return j({[I]:"Integer",type:"integer"},Z)}function nW(Z,X,z){return{[Z]:X8(u(Z),X,t(z))}}function iW(Z,X,z){return Z.reduce((_,q)=>{return{..._,...nW(q,X,z)}},{})}function oW(Z,X,z){return iW(Z.keys,X,z)}function j2(Z,X,z){let W=oW(Z,X,z);return y(W)}function sW(Z){let[X,z]=[Z.slice(0,1),Z.slice(1)];return[X.toLowerCase(),z].join("")}function aW(Z){let[X,z]=[Z.slice(0,1),Z.slice(1)];return[X.toUpperCase(),z].join("")}function rW(Z){return Z.toUpperCase()}function tW(Z){return Z.toLowerCase()}function eW(Z,X,z){let W=t8(Z.pattern);if(!v8(W))return{...Z,pattern:S2(Z.pattern,X)};let B=[...xZ(W)].map((H)=>u(H)),U=C2(B,X),G=d(U);return q6([G],z)}function S2(Z,X){return typeof Z==="string"?X==="Uncapitalize"?sW(Z):X==="Capitalize"?aW(Z):X==="Uppercase"?rW(Z):X==="Lowercase"?tW(Z):Z:Z.toString()}function C2(Z,X){return Z.map((z)=>X8(z,X))}function X8(Z,X,z={}){return k0(Z)?j2(Z,X,z):b0(Z)?eW(Z,X,z):h(Z)?d(C2(Z.anyOf,X),z):w0(Z)?u(S2(Z.const,X),z):j(Z,z)}function E2(Z,X={}){return X8(Z,"Capitalize",X)}function I2(Z,X={}){return X8(Z,"Lowercase",X)}function T2(Z,X={}){return X8(Z,"Uncapitalize",X)}function P2(Z,X={}){return X8(Z,"Uppercase",X)}function ZH(Z,X,z){let W={};for(let _ of globalThis.Object.getOwnPropertyNames(Z))W[_]=j8(Z[_],X,t(z));return W}function XH(Z,X,z){return ZH(Z.properties,X,z)}function w2(Z,X,z){let W=XH(Z,X,z);return y(W)}function zH(Z,X){return Z.map((z)=>S5(z,X))}function $H(Z,X){return Z.map((z)=>S5(z,X))}function QH(Z,X){let{[X]:z,...W}=Z;return W}function WH(Z,X){return X.reduce((z,W)=>QH(z,W),Z)}function HH(Z,X,z){let W=z0(Z,[Y0,"$id","required","properties"]),_=WH(z,X);return i(_,W)}function JH(Z){let X=Z.reduce((z,W)=>V6(W)?[...z,u(W)]:z,[]);return d(X)}function S5(Z,X){return X0(Z)?O0(zH(Z.allOf,X)):h(Z)?d($H(Z.anyOf,X)):J0(Z)?HH(Z,X,Z.properties):i({})}function j8(Z,X,z){let W=W0(X)?JH(X):X,_=x0(X)?C0(X):X,q=Q0(Z),B=Q0(X);return e(Z)?w2(Z,_,z):k0(X)?k2(Z,X,z):q&&B?r("Omit",[Z,W],z):!q&&B?r("Omit",[Z,W],z):q&&!B?r("Omit",[Z,W],z):j({...S5(Z,_),...z})}function YH(Z,X,z){return{[X]:j8(Z,[X],t(z))}}function VH(Z,X,z){return X.reduce((W,_)=>{return{...W,...YH(Z,_,z)}},{})}function _H(Z,X,z){return VH(Z,X.keys,z)}function k2(Z,X,z){let W=_H(Z,X,z);return y(W)}function BH(Z,X,z){let W={};for(let _ of globalThis.Object.getOwnPropertyNames(Z))W[_]=S8(Z[_],X,t(z));return W}function UH(Z,X,z){return BH(Z.properties,X,z)}function b2(Z,X,z){let W=UH(Z,X,z);return y(W)}function GH(Z,X){return Z.map((z)=>C5(z,X))}function qH(Z,X){return Z.map((z)=>C5(z,X))}function AH(Z,X){let z={};for(let W of X)if(W in Z)z[W]=Z[W];return z}function MH(Z,X,z){let W=z0(Z,[Y0,"$id","required","properties"]),_=AH(z,X);return i(_,W)}function DH(Z){let X=Z.reduce((z,W)=>V6(W)?[...z,u(W)]:z,[]);return d(X)}function C5(Z,X){return X0(Z)?O0(GH(Z.allOf,X)):h(Z)?d(qH(Z.anyOf,X)):J0(Z)?MH(Z,X,Z.properties):i({})}function S8(Z,X,z){let W=W0(X)?DH(X):X,_=x0(X)?C0(X):X,q=Q0(Z),B=Q0(X);return e(Z)?b2(Z,_,z):k0(X)?f2(Z,X,z):q&&B?r("Pick",[Z,W],z):!q&&B?r("Pick",[Z,W],z):q&&!B?r("Pick",[Z,W],z):j({...C5(Z,_),...z})}function LH(Z,X,z){return{[X]:S8(Z,[X],t(z))}}function OH(Z,X,z){return X.reduce((W,_)=>{return{...W,...LH(Z,_,z)}},{})}function FH(Z,X,z){return OH(Z,X.keys,z)}function f2(Z,X,z){let W=FH(Z,X,z);return y(W)}function NH(Z,X){return r("Partial",[r(Z,X)])}function KH(Z){return r("Partial",[Q8(Z)])}function RH(Z){let X={};for(let z of globalThis.Object.getOwnPropertyNames(Z))X[z]=L0(Z[z]);return X}function jH(Z,X){let z=z0(Z,[Y0,"$id","required","properties"]),W=RH(X);return i(W,z)}function x2(Z){return Z.map((X)=>g2(X))}function g2(Z){return o0(Z)?NH(Z.target,Z.parameters):Q0(Z)?KH(Z.$ref):X0(Z)?O0(x2(Z.allOf)):h(Z)?d(x2(Z.anyOf)):J0(Z)?jH(Z,Z.properties):f8(Z)?Z:Y8(Z)?Z:r0(Z)?Z:w0(Z)?Z:IZ(Z)?Z:t0(Z)?Z:V8(Z)?Z:TZ(Z)?Z:PZ(Z)?Z:i({})}function JZ(Z,X){if(e(Z))return h2(Z,X);else return j({...g2(Z),...X})}function SH(Z,X){let z={};for(let W of globalThis.Object.getOwnPropertyNames(Z))z[W]=JZ(Z[W],t(X));return z}function CH(Z,X){return SH(Z.properties,X)}function h2(Z,X){let z=CH(Z,X);return y(z)}function EH(Z,X){return r("Required",[r(Z,X)])}function IH(Z){return r("Required",[Q8(Z)])}function TH(Z){let X={};for(let z of globalThis.Object.getOwnPropertyNames(Z))X[z]=z0(Z[z],[M0]);return X}function PH(Z,X){let z=z0(Z,[Y0,"$id","required","properties"]),W=TH(X);return i(W,z)}function v2(Z){return Z.map((X)=>y2(X))}function y2(Z){return o0(Z)?EH(Z.target,Z.parameters):Q0(Z)?IH(Z.$ref):X0(Z)?O0(v2(Z.allOf)):h(Z)?d(v2(Z.anyOf)):J0(Z)?PH(Z,Z.properties):f8(Z)?Z:Y8(Z)?Z:r0(Z)?Z:w0(Z)?Z:IZ(Z)?Z:t0(Z)?Z:V8(Z)?Z:TZ(Z)?Z:PZ(Z)?Z:i({})}function YZ(Z,X){if(e(Z))return m2(Z,X);else return j({...y2(Z),...X})}function wH(Z,X){let z={};for(let W of globalThis.Object.getOwnPropertyNames(Z))z[W]=YZ(Z[W],X);return z}function kH(Z,X){return wH(Z.properties,X)}function m2(Z,X){let z=kH(Z,X);return y(z)}function bH(Z,X){return X.map((z)=>{return Q0(z)?E5(Z,z.$ref):g0(Z,z)})}function E5(Z,X){return X in Z?Q0(Z[X])?E5(Z,Z[X].$ref):g0(Z,Z[X]):v()}function fH(Z){return XZ(Z[0])}function xH(Z){return N8(Z[0],Z[1])}function gH(Z){return zZ(Z[0])}function hH(Z){return JZ(Z[0])}function vH(Z){return j8(Z[0],Z[1])}function yH(Z){return S8(Z[0],Z[1])}function mH(Z){return YZ(Z[0])}function uH(Z,X,z){let W=bH(Z,z);return X==="Awaited"?fH(W):X==="Index"?xH(W):X==="KeyOf"?gH(W):X==="Partial"?hH(W):X==="Omit"?vH(W):X==="Pick"?yH(W):X==="Required"?mH(W):v()}function dH(Z,X){return o8(g0(Z,X))}function cH(Z,X){return s8(g0(Z,X))}function pH(Z,X,z){return a8(mZ(Z,X),g0(Z,z))}function lH(Z,X,z){return z8(mZ(Z,X),g0(Z,z))}function nH(Z,X){return O0(mZ(Z,X))}function iH(Z,X){return ZZ(g0(Z,X))}function oH(Z,X){return i(globalThis.Object.keys(X).reduce((z,W)=>{return{...z,[W]:g0(Z,X[W])}},{}))}function sH(Z,X){let[z,W]=[g0(Z,I6(X)),E6(X)],_=n8(X);return _.patternProperties[W]=z,_}function aH(Z,X){return Q0(X)?{...E5(Z,X.$ref),[Y0]:X[Y0]}:X}function rH(Z,X){return m0(mZ(Z,X))}function tH(Z,X){return d(mZ(Z,X))}function mZ(Z,X){return X.map((z)=>g0(Z,z))}function g0(Z,X){return S0(X)?j(g0(Z,z0(X,[M0])),X):i8(X)?j(g0(Z,z0(X,[n0])),X):D8(X)?j(aH(Z,X),X):i0(X)?j(dH(Z,X.items),X):b8(X)?j(cH(Z,X.items),X):o0(X)?j(uH(Z,X.target,X.parameters)):s0(X)?j(pH(Z,X.parameters,X.returns),X):a0(X)?j(lH(Z,X.parameters,X.returns),X):X0(X)?j(nH(Z,X.allOf),X):x8(X)?j(iH(Z,X.items),X):J0(X)?j(oH(Z,X.properties),X):h8(X)?j(sH(Z,X)):f0(X)?j(rH(Z,X.items||[]),X):h(X)?j(tH(Z,X.anyOf),X):X}function eH(Z,X){return X in Z?g0(Z,Z[X]):v()}function u2(Z){return globalThis.Object.getOwnPropertyNames(Z).reduce((X,z)=>{return{...X,[z]:eH(Z,z)}},{})}class d2{constructor(Z){let X=u2(Z),z=this.WithIdentifiers(X);this.$defs=z}Import(Z,X){let z={...this.$defs,[Z]:j(this.$defs[Z],X)};return j({[I]:"Import",$defs:z,$ref:Z})}WithIdentifiers(Z){return globalThis.Object.getOwnPropertyNames(Z).reduce((X,z)=>{return{...X,[z]:{...Z[z],$id:z}}},{})}}function c2(Z){return new d2(Z)}function p2(Z,X){return j({[I]:"Not",not:Z},X)}function l2(Z,X){return a0(Z)?m0(Z.parameters,X):v()}var ZJ=0;function n2(Z,X={}){if(H0(X.$id))X.$id=`T${ZJ++}`;let z=n8(Z({[I]:"This",$ref:`${X.$id}`}));return z.$id=X.$id,j({[v0]:"Recursive",...z},X)}function i2(Z,X){let z=s(Z)?new globalThis.RegExp(Z):Z;return j({[I]:"RegExp",type:"RegExp",source:z.source,flags:z.flags},X)}function XJ(Z){return X0(Z)?Z.allOf:h(Z)?Z.anyOf:f0(Z)?Z.items??[]:[]}function o2(Z){return XJ(Z)}function s2(Z,X){return a0(Z)?j(Z.returns,X):v(X)}class a2{constructor(Z){this.schema=Z}Decode(Z){return new r2(this.schema,Z)}}class r2{constructor(Z,X){this.schema=Z,this.decode=X}EncodeTransform(Z,X){let _={Encode:(q)=>X[Y0].Encode(Z(q)),Decode:(q)=>this.decode(X[Y0].Decode(q))};return{...X,[Y0]:_}}EncodeSchema(Z,X){let z={Decode:this.decode,Encode:Z};return{...X,[Y0]:z}}Encode(Z){return D8(this.schema)?this.EncodeTransform(Z,this.schema):this.EncodeSchema(Z,this.schema)}}function t2(Z){return new a2(Z)}function e2(Z={}){return j({[I]:Z[I]??"Unsafe"},Z)}function Z4(Z){return j({[I]:"Void",type:"void"},Z)}var I5={};k6(I5,{Void:()=>Z4,Uppercase:()=>P2,Unsafe:()=>e2,Unknown:()=>K8,Union:()=>d,Undefined:()=>F6,Uncapitalize:()=>T2,Uint8Array:()=>N6,Tuple:()=>m0,Transform:()=>t2,TemplateLiteral:()=>q6,Symbol:()=>O6,String:()=>e0,ReturnType:()=>s2,Rest:()=>o2,Required:()=>YZ,RegExp:()=>i2,Ref:()=>Q8,Recursive:()=>n2,Record:()=>C6,ReadonlyOptional:()=>S6,Readonly:()=>E0,Promise:()=>M6,Pick:()=>S8,Partial:()=>JZ,Parameters:()=>l2,Optional:()=>L0,Omit:()=>j8,Object:()=>i,Number:()=>y0,Null:()=>L6,Not:()=>p2,Never:()=>v,Module:()=>c2,Mapped:()=>nX,Lowercase:()=>I2,Literal:()=>u,KeyOf:()=>zZ,Iterator:()=>ZZ,Intersect:()=>O0,Integer:()=>R2,Instantiate:()=>K2,InstanceType:()=>F2,Index:()=>N8,Function:()=>z8,Extract:()=>HZ,Extends:()=>QZ,Exclude:()=>WZ,Enum:()=>X2,Date:()=>D6,ConstructorParameters:()=>Z2,Constructor:()=>a8,Const:()=>eX,Composite:()=>tX,Capitalize:()=>E2,Boolean:()=>G6,BigInt:()=>e8,Awaited:()=>XZ,AsyncIterator:()=>s8,Array:()=>o8,Argument:()=>TX,Any:()=>F8});var N0=I5;var X4="http://127.0.0.1:3850",VZ="pi",C8="plugin",U8=5000,_Z=1e4,z4=5000,T6="signet-pi-hidden-recall",P6="signet-pi-session-context";function $4(Z){return t6(Z,{logPrefix:"signet-pi",actorName:"pi-extension",runtimePath:C8,defaultTimeout:U8})}var zJ=new Set([T6,P6]),Q4={harness:VZ,runtimePath:C8,writeTimeout:_Z,promptSubmitTimeout:z4,excludedCustomTypes:zJ,sessionStartTimeout:()=>U8,staticFallback:e6};function W4(Z,X){return{role:"custom",customType:Z,display:!1,content:`<signet-memory source="auto-recall">
${X5(X)}
</signet-memory>`,timestamp:Date.now()}}class H4 extends W6{consumeHiddenInjectMessages(Z){if(!Z)return[];let X=[],z=c(this.pendingSessionContext.get(Z));if(z)X.push(W4(P6,z));this.pendingSessionContext.delete(Z);let W=this.consumePendingRecall(Z);if(W)X.push(W4(T6,W));return X}}function J4(){return new H4}function HJ(){let Z=WJ(O7(),"extensions","signet.json");if(!$J(Z))return null;try{let X=QJ(Z,"utf-8"),z=JSON.parse(X);if(typeof z!=="object"||z===null)return null;return z}catch{return null}}function JJ(){let Z=HJ(),X=NZ("SIGNET_ENABLED"),z=Z?.enabled;return{enabled:X!==void 0?X!=="false":z!==void 0?z:!0}}var YJ=JJ(),BZ={lastRecall:null,memoryCount:0};async function u8(Z){try{return(await fetch(`${Z}/health`,{method:"GET",headers:{Accept:"application/json"},signal:AbortSignal.timeout(U8)})).ok}catch{return!1}}async function Y4(Z,X,z={}){let{limit:W=10,agentId:_,sessionKey:q,includeRecalled:B,scope:U,aggregate:G,aggregateBudget:H,saveAggregate:V}=z,$J=G?Math.max(U8*6,30000):U8,$=await fetch(`${Z}/api/memory/recall`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(q7(X,{limit:W,agentId:_,sessionKey:q,includeRecalled:B,scope:U,aggregate:G,aggregateBudget:H,saveAggregate:V})),signal:AbortSignal.timeout($J)});if(!$.ok){let Q=await $.text();throw Error(`Recall failed: ${Q}`)}return await $.json()}async function V4(Z,X,z={}){let{critical:W=!1,tags:_=[],agentId:q}=z,B=await fetch(`${Z}/api/hooks/remember`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(A7(X,{harness:VZ,pinned:W,tags:_,agentId:q,source:"pi-extension",runtimePath:C8})),signal:AbortSignal.timeout(_Z)});if(!B.ok){let U=await B.text();throw Error(`Remember failed: ${U}`)}}async function VJ(Z,X,z,W={}){let _=await fetch(`${Z}/api/memory/feedback`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sessionKey:X,agentId:W.agentId??"default",feedback:z}),signal:AbortSignal.timeout(_Z)});if(!_.ok){let q=await _.text();throw Error(`Feedback failed: ${q}`)}return await _.json()}function T5(Z){let X=BZ.lastRecall?`signet:${BZ.memoryCount} memories`:"signet:ready";Z.ui.setStatus("signet",Z.ui.theme.fg("accent",X))}function _J(Z,X,z){Z.on("session_start",async(W,_)=>{if(await u8(z))_.ui.notify("SignetAI memory connected","info"),T5(_);else _.ui.notify("SignetAI daemon not running. Memory features disabled.","warning"),_.ui.notify("Install: curl -fsSL https://signetai.sh/install.sh | bash && signet setup","info");await A8(X,_)}),Z.on("session_switch",async(W,_)=>{await RZ(X,W,W.type),await A8(X,_)}),Z.on("session_fork",async(W,_)=>{await RZ(X,W,W.type),await A8(X,_)}),Z.on("session_shutdown",async(W,_)=>{_.ui.setStatus("signet",void 0),await $6(X,_,"session_shutdown")})}function BJ(Z,X){Z.on("input",async(z,W)=>{let _=T0(W);X.state.clearPendingRecall(_.sessionId),await jZ(X,W,z.text)}),Z.on("before_agent_start",async(z,W)=>{await l8(X,W);let _=T0(W);if(!_.sessionId)return;if(X.state.hasPendingRecall(_.sessionId))return;await jZ(X,W,z.prompt)})}function UJ(Z,X){Z.on("context",async(z,W)=>{let _=T0(W),q=X.state.consumeHiddenInjectMessages(_.sessionId);if(q.length===0)return;return{messages:[...z.messages,...q]}})}function GJ(Z,X){Z.on("session_before_compact",async(z,W)=>{await l8(X,W);let _=T0(W);await X.client.post("/api/hooks/pre-compaction",{harness:VZ,sessionKey:_.sessionId,messageCount:Array.isArray(z.preparation?.messagesToSummarize)?z.preparation.messagesToSummarize.length:void 0,runtimePath:C8},U8);return}),Z.on("session_compact",async(z,W)=>{let _=c(z.compactionEntry?.summary);if(!_)return;let q=T0(W);await X.client.post("/api/hooks/compaction-complete",{harness:VZ,summary:_,project:q.project,sessionKey:q.sessionId,agentId:X.agentId,runtimePath:C8},_Z)})}function qJ(Z){let X=Z.trim(),z=!1,W=[];if(X.startsWith("critical:"))z=!0,X=X.slice(9).trim();let _=X.match(/^\[([^\]]+)\]:\s*/);if(_)W.push(..._[1].split(",").map((q)=>q.trim())),X=X.slice(_[0].length);return{content:X,critical:z,tags:W}}function AJ(Z,X,z){Z.registerCommand("recall",{description:"Search SignetAI memories",handler:async(W,_)=>{if(!W?.trim()){_.ui.notify("Usage: /recall <query>","warning");return}if(!await u8(X)){_.ui.notify("Signet daemon not running. Run: signet daemon start","error");return}_.ui.notify(`Recalling: "${W}"...`,"info");try{let B=await Y4(X,W,{limit:5,agentId:z}),U=Z6(B);if(U.rows.length===0){_.ui.notify("No relevant memories found","info");return}BZ.lastRecall=new Date().toISOString(),BZ.memoryCount=U.rows.length,T5(_),_.ui.notify(a6(B),"success")}catch(B){let U=B instanceof Error?B.message:String(B);_.ui.notify(`Recall failed: ${U}`,"error")}}}),Z.registerCommand("remember",{description:"Save a memory to SignetAI",handler:async(W,_)=>{if(!W?.trim()){_.ui.notify("Usage: /remember <content>","warning");return}if(!await u8(X)){_.ui.notify("Signet daemon not running. Run: signet daemon start","error");return}let{content:B,critical:U,tags:G}=qJ(W);try{await V4(X,B,{critical:U,tags:G,agentId:z});let H=U?" (pinned)":"";_.ui.notify(`Memory saved${H}: "${B.substring(0,50)}..."`,"success")}catch(H){let V=H instanceof Error?H.message:String(H);_.ui.notify(`Remember failed: ${V}`,"error")}}}),Z.registerCommand("signet-status",{description:"Check SignetAI daemon status",handler:async(W,_)=>{let q=await u8(X),B=_.sessionManager.getSessionId();if(q){let U=[`Signet daemon is running on ${X}`];if(B)U.push(`Session: ${B}`);_.ui.notify(U.join(`
`),"success");try{let G=await fetch(`${X}/api/memory/stats`,{signal:AbortSignal.timeout(U8)});if(G.ok){let H=await G.json();_.ui.notify(`Memory stats: ${JSON.stringify(H)}`,"info")}}catch{}}else _.ui.notify(`Signet daemon not responding.
Install: curl -fsSL https://signetai.sh/install.sh | bash && signet setup
Start: signet daemon start`,"error")}}),Z.registerTool({name:"signet_recall",label:"Signet Recall",description:"Search SignetAI persistent memory for relevant context from previous sessions. Use aggregate=true for multi-query synthesis that consolidates scattered memories into a single summary.",promptSnippet:"Search past memories when user asks about previous decisions, preferences, or project context",promptGuidelines:["Use aggregate=true when the user asks a broad question that likely spans many memories (e.g. 'who is X', 'what happened with Y', 'summarize the history of Z')","Use aggregate=false (default) for targeted lookups of specific facts or single memories","Aggregate recall takes longer (3-5s) but produces higher-quality synthesized answers for complex queries"],parameters:N0.Object({query:N0.String({description:"Search query to find relevant memories"}),limit:N0.Optional(N0.Number({description:"Maximum number of memories to return (default: 5)",default:5})),aggregate:N0.Optional(N0.Boolean({description:"Enable aggregate recall: runs multiple follow-up queries and synthesizes a consolidated answer. Use for broad questions spanning many memories. (default: false)",default:!1})),aggregateBudget:N0.Optional(N0.String({description:"Aggregate synthesis budget: 'small', 'medium', or 'large'. Controls depth of multi-query recall and synthesis. (default: medium)"}))}),async execute(W,_,q,B,U){if(!await u8(X))return{content:[{type:"text",text:"Signet daemon not running. Memories unavailable."}],details:{error:"daemon_offline"}};try{let H=String(_.query||""),V=typeof _.limit==="number"?_.limit:5,G=_.aggregate===!0,HG=typeof _.aggregateBudget==="string"&&["small","medium","large"].includes(_.aggregateBudget)?_.aggregateBudget:void 0;let $=await Y4(X,H,{limit:V,agentId:z,aggregate:G,aggregateBudget:HG}),Q=Z6($);if(G&&$.aggregate){let VV=$.results||Q.rows,AG=$.aggregate;if(VV.length===0)return{content:[{type:"text",text:"No relevant memories found for this query."}],details:{memoriesFound:0}};BZ.lastRecall=new Date().toISOString(),BZ.memoryCount=VV.length,T5(U);let HV=["[Aggregate Recall] Query: "+H];for(let VQ of VV)typeof VQ.content==="string"&&HV.push(VQ.content);return{content:[{type:"text",text:HV.join("\n\n")}],details:{memoriesFound:VV.length,memories:VV,aggregate:AG,meta:Q.meta}}}if(Q.rows.length===0)return{content:[{type:"text",text:"No relevant memories found for this query."}],details:{memoriesFound:0}};return BZ.lastRecall=new Date().toISOString(),BZ.memoryCount=Q.rows.length,T5(U),{content:[{type:"text",text:a6($)}],details:{memoriesFound:Q.rows.length,memories:Q.rows,meta:Q.meta}}}catch(H){let V=H instanceof Error?H.message:String(H);return{content:[{type:"text",text:`Error recalling memories: ${V}`}],details:{error:V},isError:!0}}}}),Z.registerTool({name:"signet_remember",label:"Signet Remember",description:"Save important information to SignetAI persistent memory for future sessions",promptSnippet:"Save critical decisions, user preferences, or key facts that should persist across sessions",promptGuidelines:["Use this tool when the user explicitly asks to remember something","Save key decisions made during the conversation that would be useful context later","Store user preferences about coding style, tools, or workflows","Mark critical information with critical=true to prevent decay"],parameters:N0.Object({content:N0.String({description:"The content to remember"}),critical:N0.Optional(N0.Boolean({description:"If true, memory will never decay and is always prioritized",default:!1})),tags:N0.Optional(N0.Array(N0.String(),{description:"Tags to categorize this memory for better search"}))}),async execute(W,_,q,B,U){if(!await u8(X))return{content:[{type:"text",text:"Signet daemon not running. Cannot save memory."}],details:{error:"daemon_offline"}};try{let H=String(_.content||""),V=Boolean(_.critical),$=Array.isArray(_.tags)?_.tags.filter((J)=>typeof J==="string"):[];return await V4(X,H,{critical:V,tags:$,agentId:z}),{content:[{type:"text",text:`Memory saved${V?" (pinned/critical)":""} successfully.`}],details:{saved:!0,content:H}}}catch(H){let V=H instanceof Error?H.message:String(H);return{content:[{type:"text",text:`Error saving memory: ${V}`}],details:{error:V},isError:!0}}}}),Z.registerTool({name:"signet_memory_feedback",label:"Memory Feedback",description:"Rate how relevant injected memories were to the conversation. Scores from -1 (harmful) to 1 (directly helpful). 0 = unused.",promptSnippet:"After each turn where injected memories are present, rate every memory's relevance "+"so future recall improves. Always call this tool — do not skip feedback.",promptGuidelines:["Call this tool EVERY turn that includes injected Signet memories","Rate each memory ID: 1 = directly helpful, 0 = unused, -1 = harmful/misleading","Do not wait for the user to ask — proactively rate memories after using them","Include ALL injected memory IDs in the ratings map, even unused ones (rate 0)"],parameters:N0.Object({ratings:N0.Record(N0.String(),N0.Number(),{description:"Map of memory ID to relevance score (-1 to 1)"})}),async execute(W,_,q,B,U){if(!await u8(X))return{content:[{type:"text",text:"Signet daemon not running. Cannot record feedback."}],details:{error:"daemon_offline"}};try{let H=_.ratings,V=T0(U),$=c(V.sessionId);if(!$)return{content:[{type:"text",text:"Cannot record feedback: session not initialized."}],details:{error:"no_session"}};let Q=await VJ(X,$,H,{agentId:z});return{content:[{type:"text",text:`Recorded feedback for ${Q.recorded} memories (${Q.accepted??Q.recorded} accepted).`}],details:Q}}catch(H){let V=H instanceof Error?H.message:String(H);return{content:[{type:"text",text:`Error recording feedback: ${V}`}],details:{error:V},isError:!0}}}})}var MJ=(Z)=>{if(!YJ.enabled)return;let X=c8("SIGNET_DAEMON_URL")??X4,z=c8("SIGNET_AGENT_ID");if(NZ("SIGNET_BYPASS")!=="1"){let W={agentId:z,client:$4(X),state:J4(),config:Q4};_J(Z,W,X),BJ(Z,W),UJ(Z,W),GJ(Z,W)}AJ(Z,X,z)},qL=MJ;export{VJ as sendMemoryFeedback,V4 as rememberContent,Y4 as recallMemories,qJ as parseRememberArgs,JJ as loadConfig,qL as default};
