webpackJsonp([0],{fLFm:function(n,t,e){"use strict";function o(n,t,e){return function(n,t,e){return function(o){return o.lift(new _(n,t,e))}}(n,t,e)(this)}function i(n){return s._18(0,[(n()(),s._2(0,0,null,null,10,"div",[["class","news full-screen"]],null,null,null,null,null)),(n()(),s._17(-1,null,["\n  "])),(n()(),s._2(2,0,null,null,7,"div",[],null,null,null,null,null)),(n()(),s._17(-1,null,["\n\n    "])),(n()(),s._2(4,0,null,null,1,"div",[["class","h1"]],null,null,null,null,null)),(n()(),s._17(5,null,["",""])),(n()(),s._17(-1,null,["\n    "])),(n()(),s._2(7,0,null,null,1,"div",[["class","h2"]],null,null,null,null,null)),(n()(),s._17(8,null,["",""])),(n()(),s._17(-1,null,["\n\n  "])),(n()(),s._17(-1,null,["\n"]))],null,function(n,t){var e=t.component;n(t,5,0,e.i18n.translate(e.news.content,"title")),n(t,8,0,e.i18n.translate(e.news.content,"description"))})}function r(n){return s._18(0,[(n()(),s.X(16777216,null,null,1,null,i)),s._1(1,16384,null,0,a.i,[s.M,s.J],{ngIf:[0,"ngIf"]},null),(n()(),s._17(-1,null,["\n"]))],function(n,t){n(t,1,0,t.component.news.loaded)},null)}Object.defineProperty(t,"__esModule",{value:!0});var s=e("LMZF"),l=function(){},a=e("Un6q"),u=e("GZB0"),c=e("fgj+"),h=e("AP4T"),p=e("6Xbx"),d=e("lI6h"),f=e("qgI0"),g=function(){function n(n,t){this.project=n,this.resultSelector=t}return n.prototype.call=function(n,t){return t.subscribe(new w(n,this.project,this.resultSelector))},n}(),w=function(n){function t(t,e,o){n.call(this,t),this.project=e,this.resultSelector=o,this.index=0}return Object(p.b)(t,n),t.prototype._next=function(n){var t,e=this.index++;try{t=this.project(n,e)}catch(n){return void this.destination.error(n)}this._innerSub(t,n,e)},t.prototype._innerSub=function(n,t,e){var o=this.innerSubscription;o&&o.unsubscribe(),this.add(this.innerSubscription=Object(f.a)(this,n,t,e))},t.prototype._complete=function(){var t=this.innerSubscription;t&&!t.closed||n.prototype._complete.call(this)},t.prototype._unsubscribe=function(){this.innerSubscription=null},t.prototype.notifyComplete=function(t){this.remove(t),this.innerSubscription=null,this.isStopped&&n.prototype._complete.call(this)},t.prototype.notifyNext=function(n,t,e,o,i){this.resultSelector?this._tryNotifyNext(n,t,e,o):this.destination.next(t)},t.prototype._tryNotifyNext=function(n,t,e,o){var i;try{i=this.resultSelector(n,t,e,o)}catch(n){return void this.destination.error(n)}this.destination.next(i)},t}(d.a);h.a.prototype.switchMap=function(n,t){return function(n,t){return function(e){return e.lift(new g(n,t))}}(n,t)(this)},e("Dv4c");var b=e("E9/g"),_=function(){function n(n,t,e){this.nextOrObserver=n,this.error=t,this.complete=e}return n.prototype.call=function(n,t){return t.subscribe(new y(n,this.nextOrObserver,this.error,this.complete))},n}(),y=function(n){function t(t,e,o,i){n.call(this,t);var r=new b.a(e,o,i);r.syncErrorThrowable=!0,this.add(r),this.safeSubscriber=r}return Object(p.b)(t,n),t.prototype._next=function(n){var t=this.safeSubscriber;t.next(n),t.syncErrorThrown?this.destination.error(t.syncErrorValue):this.destination.next(n)},t.prototype._error=function(n){var t=this.safeSubscriber;t.error(n),this.destination.error(t.syncErrorThrown?t.syncErrorValue:n)},t.prototype._complete=function(){var n=this.safeSubscriber;n.complete(),n.syncErrorThrown?this.destination.error(n.syncErrorValue):this.destination.complete()},t}(b.a);h.a.prototype.do=o,h.a.prototype._do=o;var v=function(){function n(){this.init()}return n.prototype.init=function(){this.cards=[],this.content={title:void 0,description:void 0},this.loaded=!1},n.prototype.initialize=function(n,t,e){try{this.cards=n.cards,this.content=n.content,this.feature=t,this.languages=e,this.loaded=!0}catch(n){console.warn("Ooops, something went wrong...",[n]),this.init()}},n}(),m=function(){function n(n,t,e,o,i,r,s,l,a){var u=this;this.communication=n,this.cdr=t,this.globals=e,this.http=o,this.i18n=i,this.page=r,this.route=s,this.router=l,this.url=a,this.news=new v,this.subscription=this.communication.onLanguageChanged$.subscribe(function(){return u.navigateToNews()})}return n.prototype.ngOnInit=function(){var n,t=this;this.route.paramMap.switchMap(function(e){if(console.log("\x3c!--"),t.news.loaded)return t.detectUrlLanguage(e.get("url")),Object(u.a)("");if(t.globals.json.news.loaded){var o=t.globals.json.news,i=t.globals.json.features,r=t.globals.json.languages;return o.loaded&&i.loaded&&r.loaded?(t.news.initialize(o.data,i.data.news,r.data),t.communication.updateFeature("news"),t.detectUrlLanguage(e.get("url"))):(console.warn("Ooops, something went wrong...",[o,i,r]),t.news.loaded=!1),Object(u.a)("")}return n=e.get("url"),Object(c.a)(t.http.get(t.globals.pathTo.news).retry(3))}).subscribe(function(e){if(!1===t.news.loaded){console.log("Json loaded!",[t.globals.pathTo.news,e]);try{t.globals.json.news.data=e.data,t.globals.json.news.loaded=!0;var o=t.globals.json.features,i=t.globals.json.languages;o.loaded&&i.loaded&&(t.news.initialize(t.globals.json.news.data,o.data.news,i.data),t.communication.updateFeature("news"),t.detectUrlLanguage(n))}catch(n){console.warn("Ooops, something went wrong...",[n]),t.news.loaded=!1}}t.page.updateTitle(t.i18n.translate(t.news.feature,"title")),t.page.updateDescription(t.i18n.translate(t.news.content,"title")),console.log("--\x3e")},function(n){console.warn("Ooops, something went wrong...",[n]),t.news.loaded=!1})},n.prototype.detectUrlLanguage=function(n){var t=this.url.detectedUrlLanguage(n,this.news.feature,this.news.languages);""===t?this.navigateToNews():this.communication.updateLanguage(t)},n.prototype.navigateToNews=function(){this.router.navigate([this.globals.routes.news+this.i18n.translate(this.news.feature,"route")])},n.prototype.ngOnDestroy=function(){this.subscription.unsubscribe()},n}(),j=e("wwDG"),O=e("yhGf"),x=e("9iV4"),S=e("lcT1"),M=e("QjUj"),T=e("UHIZ"),N=e("RDPe"),L=s._0({encapsulation:0,styles:[[".news[_ngcontent-%COMP%]{overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;will-change:transform;-webkit-transform:translateZ(0);transform:translateZ(0);background-color:#fff}.news[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{padding:100px 20px}.news[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{line-height:200%;padding:20px;text-transform:uppercase;text-align:center}"]],data:{}}),P=s.Y("app-news",m,function(n){return s._18(0,[(n()(),s._2(0,0,null,null,1,"app-news",[],null,null,null,r,L)),s._1(1,245760,null,0,m,[j.a,s.h,O.a,x.c,S.a,M.a,T.a,T.k,N.a],null,null)],function(n,t){n(t,1,0)},null)},{},{},[]),C=function(){};e.d(t,"NewsModuleNgFactory",function(){return E});var E=s.Z(l,[],function(n){return s._12([s._13(512,s.j,s.V,[[8,[P]],[3,s.j],s.v]),s._13(4608,a.k,a.j,[s.s,[2,a.o]]),s._13(512,a.b,a.b,[]),s._13(512,T.n,T.n,[[2,T.s],[2,T.k]]),s._13(512,C,C,[]),s._13(512,l,l,[]),s._13(1024,T.i,function(){return[[{path:"",component:m},{path:":url",component:m}]]},[])])})}});