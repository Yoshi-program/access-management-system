(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[964],{9274:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return g}});var r=e(29),i=e(7794),o=e.n(i),c=e(6847),a=e(9895),s=e(2302),u=e(3750),h=e(7394),d=e(1908),l=e(9613),f=e(7294),p=e(5893),x=function(){var n=(0,f.useState)(),t=n[0],e=n[1];return(0,f.useEffect)((function(){fetch("http://localhost:8081/testGet").then((function(n){return n.body})).then((function(n){if(null!==n){var t=n.getReader();return new ReadableStream({start:function(n){!function e(){t.read().then((function(t){var r=t.done,i=t.value;r?n.close():(n.enqueue(i),e())}))}()}})}})).then((function(n){return new Response(n,{headers:{"Content-Type":"text/html"}}).text()})).then((function(n){console.log(n),e(JSON.parse(n).data)}))}),[]),(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(c.Z,{component:a.Z,children:(0,p.jsxs)(s.Z,{children:[(0,p.jsx)(u.Z,{children:(0,p.jsxs)(h.Z,{children:[(0,p.jsx)(d.Z,{children:"\u7d44\u7e54id"}),(0,p.jsx)(d.Z,{align:"right",children:"\u7d44\u7e54\u540d"}),(0,p.jsx)(d.Z,{align:"right",children:"\u7d44\u7e54DiscordID"})]})}),(0,p.jsx)(l.Z,{children:t?t.map((function(n){return(0,p.jsxs)(h.Z,{children:[(0,p.jsx)(d.Z,{children:n.organizationId}),(0,p.jsx)(d.Z,{align:"right",children:n.organizationName}),(0,p.jsx)(d.Z,{align:"right",children:n.discordId})]},n.id)})):(0,p.jsx)(p.Fragment,{})})]})})})},g=function(){var n=function(){var n=(0,r.Z)(o().mark((function n(){var t;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t={organizationId:"1111111",organizationName:"INIAD.ts",discordId:"aaaaaa"},n.next=3,fetch("http://localhost:8081/testPost",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).catch((function(n){console.error("\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f",n)}));case 3:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),t=function(){var n=(0,r.Z)(o().mark((function n(){return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:fetch("http://localhost:8081/testGet").then((function(n){return n.body})).then((function(n){if(null!==n){var t=n.getReader();return new ReadableStream({start:function(n){!function e(){t.read().then((function(t){var r=t.done,i=t.value;r?n.close():(n.enqueue(i),e())}))}()}})}})).then((function(n){return new Response(n,{headers:{"Content-Type":"text/html"}}).text()})).then((function(n){console.log(n)}));case 1:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("p",{children:"admin page"}),(0,p.jsx)("button",{onClick:n,children:"\u7d44\u7e54\u3092post"}),(0,p.jsx)("button",{onClick:t,children:"\u7d44\u7e54\u3092get"}),(0,p.jsx)(x,{})]})}},577:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin",function(){return e(9274)}])}},function(n){n.O(0,[748,774,888,179],(function(){return t=577,n(n.s=t);var t}));var t=n.O();_N_E=t}]);