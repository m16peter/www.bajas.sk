webpackJsonp([1],{"/rWs":function(n,e,t){"use strict";function i(n){return l._19(0,[(n()(),l._2(0,0,null,null,10,"div",[["class","video-archive full-screen"]],null,null,null,null,null)),(n()(),l._18(-1,null,["\n  "])),(n()(),l._2(2,0,null,null,7,"div",[],null,null,null,null,null)),(n()(),l._18(-1,null,["\n\n    "])),(n()(),l._2(4,0,null,null,1,"div",[["class","h1"]],null,null,null,null,null)),(n()(),l._18(5,null,["",""])),(n()(),l._18(-1,null,["\n    "])),(n()(),l._2(7,0,null,null,1,"div",[["class","p"]],null,null,null,null,null)),(n()(),l._18(8,null,["",""])),(n()(),l._18(-1,null,["\n\n  "])),(n()(),l._18(-1,null,["\n"]))],null,function(n,e){var t=e.component;n(e,5,0,t.i18n.translate(t.videoArchive.content,"title")),n(e,8,0,t.i18n.translate(t.videoArchive.content,"description"))})}function o(n){return l._19(0,[(n()(),l.X(16777216,null,null,1,null,i)),l._1(1,16384,null,0,r.i,[l.M,l.J],{ngIf:[0,"ngIf"]},null),(n()(),l._18(-1,null,["\n"]))],function(n,e){n(e,1,0,e.component.videoArchive.loaded)},null)}Object.defineProperty(e,"__esModule",{value:!0});var l=t("LMZF"),a=function(){},r=t("Un6q"),c=t("GZB0"),u=t("fgj+"),d=(t("RSzd"),t("Dv4c"),t("ivSB"),function(){function n(){this.init()}return n.prototype.init=function(){this.content={title:void 0,description:void 0},this.video={id:void 0,img:void 0,title:void 0,topic:void 0},this.loaded=!1},n.prototype.initialize=function(n,e,t){try{this.content=n.content,this.video=n.video,this.feature=e,this.languages=t,this.loaded=!0}catch(n){console.warn("Ooops, something went wrong...",[n]),this.init()}},n}()),s=function(){function n(n,e,t,i,o,l,a,r,c){var u=this;this.communication=n,this.cdr=e,this.globals=t,this.http=i,this.i18n=o,this.page=l,this.route=a,this.router=r,this.url=c,this.videoArchive=new d,this.subscription=this.communication.onLanguageChanged$.subscribe(function(){return u.navigateToVideoArchive()})}return n.prototype.ngOnInit=function(){var n,e=this;this.route.paramMap.switchMap(function(t){if(console.log("\x3c!--"),e.videoArchive.loaded)return e.detectUrlLanguage(t.get("url")),Object(c.a)("");if(e.globals.json.videoArchive.loaded){var i=e.globals.json.videoArchive,o=e.globals.json.features,l=e.globals.json.languages;return i.loaded&&o.loaded&&l.loaded?(e.videoArchive.initialize(i.data,o.data.videoArchive,l.data),e.communication.updateFeature("videoArchive"),e.detectUrlLanguage(t.get("url"))):(console.warn("Ooops, something went wrong...",[i,o,l]),e.videoArchive.loaded=!1),Object(c.a)("")}return n=t.get("url"),Object(u.a)(e.http.get(e.globals.pathTo.videoArchive).retry(3))}).subscribe(function(t){if(!1===e.videoArchive.loaded){console.log("Json loaded!",[e.globals.pathTo.videoArchive,t]);try{e.globals.json.videoArchive.data=t.data,e.globals.json.videoArchive.loaded=!0;var i=e.globals.json.features,o=e.globals.json.languages;i.loaded&&o.loaded&&(e.videoArchive.initialize(e.globals.json.videoArchive.data,i.data.videoArchive,o.data),e.communication.updateFeature("videoArchive"),e.detectUrlLanguage(n))}catch(n){console.warn("Ooops, something went wrong...",[n]),e.videoArchive.loaded=!1}}e.page.updateTitle(e.i18n.translate(e.videoArchive.feature,"title")),e.page.updateDescription(e.i18n.translate(e.videoArchive.content,"title")),console.log("--\x3e")},function(n){console.warn("Ooops, something went wrong...",[n]),e.videoArchive.loaded=!1})},n.prototype.detectUrlLanguage=function(n){var e=this.url.detectedUrlLanguage(n,this.videoArchive.feature,this.videoArchive.languages);""===e?this.navigateToVideoArchive():this.communication.updateLanguage(e)},n.prototype.navigateToVideoArchive=function(){this.router.navigate([this.globals.routes.videoArchive+this.i18n.translate(this.videoArchive.feature,"route")])},n.prototype.ngOnDestroy=function(){this.subscription.unsubscribe()},n}(),v=t("wwDG"),h=t("yhGf"),g=t("9iV4"),p=t("lcT1"),f=t("QjUj"),_=t("UHIZ"),A=t("RDPe"),b=l._0({encapsulation:0,styles:[[".video-archive[_ngcontent-%COMP%]{overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;will-change:transform;-webkit-transform:translateZ(0);transform:translateZ(0);background-color:#fff}.video-archive[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{padding:50px 20px}.video-archive[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .h1[_ngcontent-%COMP%]{text-align:center;text-transform:uppercase}@media (max-width:1024px){.video-archive[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .h1[_ngcontent-%COMP%]{font-size:42px;margin:50px 0}}.video-archive[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .p[_ngcontent-%COMP%]{padding:50px}@media (max-width:600px){.video-archive[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .p[_ngcontent-%COMP%]{padding:20px}}"]],data:{}}),m=l.Y("app-video-archive",s,function(n){return l._19(0,[(n()(),l._2(0,0,null,null,1,"app-video-archive",[],null,null,null,o,b)),l._1(1,245760,null,0,s,[v.a,l.h,h.a,g.c,p.a,f.a,_.a,_.k,A.a],null,null)],function(n,e){n(e,1,0)},null)},{},{},[]),w=function(){};t.d(e,"VideoArchiveModuleNgFactory",function(){return O});var O=l.Z(a,[],function(n){return l._12([l._13(512,l.j,l.V,[[8,[m]],[3,l.j],l.v]),l._13(4608,r.k,r.j,[l.s,[2,r.o]]),l._13(512,r.b,r.b,[]),l._13(512,_.m,_.m,[[2,_.r],[2,_.k]]),l._13(512,w,w,[]),l._13(512,a,a,[]),l._13(1024,_.i,function(){return[[{path:"",component:s},{path:":url",component:s}]]},[])])})}});