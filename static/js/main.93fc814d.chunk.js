(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{107:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(61),i=n.n(c),r=(n(71),n(11)),s=n(12),l=n(14),d=n(13),m=n(15),u=(n(35),n(62)),p=n.n(u),h=n(2),g=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).handleInputChange=function(e){var t=e.target,a=t.name;t.checked?n.props.addLocation(a):n.props.removeLocation(a)},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.locations,a=t.search,c=a.split(" ").map(function(e){return new RegExp(e,"i")});return n.size?o.a.createElement("div",null,n.keySeq().map(function(t){return a&&c.find(function(e){return!e.test(t)})?null:o.a.createElement("label",{key:t,className:"selectortron"},o.a.createElement("div",{className:""},t),o.a.createElement("input",{name:t,type:"checkbox",checked:e.props.selectedLocations.has(t),onChange:e.handleInputChange}))})):o.a.createElement("header",{className:"App-header"},o.a.createElement("img",{src:p.a,className:"App-logo",alt:"logo"}))}}]),t}(o.a.Component),f=n(64),v=n(63),b=n.n(v),k=n(88),y=/([\w\s()-.]*kW\s)\(([\w\s-,]{3,})\)/gim,w=function(){return fetch("https://cors-anywhere.herokuapp.com/https://www.esb.ie/ECARS/kml/charging-locations.kml").then(function(e){return e.text()}).then(function(e){var t=k.xml2js(e,{compact:!0}).kml.Document.Placemark,n=Object(h.a)({}),a={};return t.forEach(function(e){var t=e.name._text,o=e.description._cdata,c=Object(f.a)(b()(o,y)),i=o.match(/(https:\/\/www.google.com\S*)"/);i&&(a[t]=i[1]),c.forEach(function(e){var a=/Note:/i.test(o)?"Unknown":e[2].trim();n=n.setIn([t,e[1].trim()],a)}),c.length||console.warn("no match:",o)}),{mapLinks:a,locations:n}})},L=n(65),E=n(5),S=n(4),j=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).openMap=function(e){var t=e.currentTarget.dataset.maplink;t&&window.open(t,"_blank")},n.removeLocation=function(e){var t=e.target.name;n.props.removeLocation(t)},n.changeLocationName=function(e){var t=e.target.name;n.props.setLocationNickname(t,window.prompt(t,""))},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.locations,a=t.selectedLocations,c=t.locationNicknames,i=t.mapLinks;return o.a.createElement("div",{style:{paddingTop:10,paddingBottom:10}},a.map(function(t){var a=n.get(t);if(!a)return null;var r=c.get(t);return o.a.createElement("div",{key:t,style:{padding:10}},o.a.createElement("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}},r?o.a.createElement("div",null,r,o.a.createElement("div",{style:{fontSize:10,color:"gray"}},t)):t,o.a.createElement(E.a,{icon:S.b,size:"2x",style:{marginLeft:5,padding:"5px 10px",border:"1px solid teal"},onClick:e.openMap,"data-maplink":i[t],color:"teal"})),o.a.createElement("div",{style:{padding:5}},a.entrySeq().map(function(e){var t=Object(L.a)(e,2),n=t[0],a=t[1],c=/Available/i.test(a),i=c?"lime":"gray",r=c?"black":"gray",s=/DC/.test(n)?S.a:S.d;return o.a.createElement("div",{key:n,style:{color:r,padding:5}},o.a.createElement(E.a,{icon:s,color:i,style:{paddingRight:5}}),n,": ",a)})),o.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},o.a.createElement("button",{onClick:e.removeLocation,name:t,style:{padding:10,border:"1px solid gray",background:"white"}},o.a.createElement(E.a,{icon:S.g,color:"gray",size:"1x"})),o.a.createElement("button",{onClick:e.changeLocationName,name:t,style:{marginLeft:10,padding:10,border:"1px solid teal",color:"teal",flexGrow:1,background:"white"}},"Edit name",o.a.createElement(E.a,{icon:S.c,color:"teal",style:{marginLeft:10}}))),o.a.createElement("hr",{style:{marginTop:20}}))}))}}]),t}(o.a.Component),O=function(e){var t=e.search,n=e.fetchError,a=e.loading,c=e.setSearch,i=e.getLocations;return o.a.createElement("div",{style:{display:"flex",alignItems:"center",position:"fixed",left:0,right:0,top:0,background:"white"}},o.a.createElement("input",{onChange:c,value:t,placeholder:"Search Locations...",style:{width:10,flexGrow:1,padding:10,fontSize:23,border:"1px solid black",borderRight:"none",borderRadius:0,margin:0,height:28,boxShadow:"none",WebkitAppearance:"none"}}),o.a.createElement("div",{onClick:c,value:"",style:{paddingRight:10,paddingTop:8,paddingBottom:8,background:"none",border:"1px solid black",borderLeft:"none"}},o.a.createElement(E.a,{icon:S.f,size:"2x",color:"gray"})),o.a.createElement("div",{onClick:i,style:{padding:10}},o.a.createElement(E.a,{icon:S.e,size:"2x",color:n?"red":"teal",className:a?"spin":""})))},x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"selectedLocations",t=localStorage.getItem(e);return!!t&&Object(h.c)(JSON.parse(t),function(e,t){return Object(h.d)(t)?t.toMap():t.toSet()})},N=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={selectedLocations:x("selectedLocations")||Object(h.b)(),locations:x("locations")||Object(h.a)(),locationNicknames:x("locationsNicknames")||Object(h.a)(),search:"",mapLinks:{},fetchError:!1,loading:!1},n.getLocations=function(){n.setState({loading:!0}),w().then(function(e){var t=e.locations,a=e.mapLinks;localStorage.setItem("locations",JSON.stringify(t.toJS())),n.setState({locations:t,mapLinks:a,fetchError:!1,loading:!1})}).catch(function(){var e;(e=console).error.apply(e,arguments),n.setState({fetchError:!0,loading:!1})})},n.addLocation=function(e){var t=n.state.selectedLocations.add(e);n.setSelected(t)},n.removeLocation=function(e){var t=n.state.selectedLocations.remove(e);n.setSelected(t)},n.clearSelected=function(){n.setSelected(Object(h.b)())},n.setSelected=function(e){n.setState({selectedLocations:e}),localStorage.setItem("selectedLocations",JSON.stringify(e.toJS()))},n.setSearch=function(e){n.setState({search:e.target.value||""})},n.setLocationNickname=function(e,t){var a=n.state.locationNicknames.set(e,t);n.setState({locationNicknames:a}),localStorage.setItem("locationsNicknames",JSON.stringify(a.toJS()))},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e;this.getLocations(),e=this.getLocations,document.addEventListener("visibilitychange",function(){"visible"===document.visibilityState&&e()}),window.addEventListener("focus",e)}},{key:"render",value:function(){var e=this.state,t=e.locations,n=e.selectedLocations,a=e.locationNicknames,c=e.search,i=e.mapLinks,r=e.fetchError,s=e.loading;return o.a.createElement("div",{className:"App"},o.a.createElement(O,{search:c,fetchError:r,loading:s,setSearch:this.setSearch,getLocations:this.getLocations}),o.a.createElement("div",{style:{paddingTop:60}},c||!n.size?o.a.createElement(g,{search:c,locations:t,selectedLocations:n,removeLocation:this.removeLocation,addLocation:this.addLocation}):o.a.createElement(j,{locations:t,selectedLocations:n,removeLocation:this.removeLocation,setLocationNickname:this.setLocationNickname,mapLinks:i,locationNicknames:a})))}}]),t}(o.a.Component),C=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function A(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(o.a.createElement(N,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/car-chargers",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/car-chargers","/service-worker.js");C?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):A(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):A(t,e)})}}()},35:function(e,t,n){},62:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},66:function(e,t,n){e.exports=n(107)},71:function(e,t,n){},93:function(e,t){},95:function(e,t){}},[[66,1,2]]]);
//# sourceMappingURL=main.93fc814d.chunk.js.map