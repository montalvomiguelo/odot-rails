/*
Copyright (c) 2008-2015 Pivotal Labs

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function getJasmineRequireObj(){return"undefined"!=typeof module&&module.exports?exports:(window.jasmineRequire=window.jasmineRequire||{},window.jasmineRequire)}getJasmineRequireObj().console=function(e,n){n.ConsoleReporter=e.ConsoleReporter()},getJasmineRequireObj().ConsoleReporter=function(){function e(e){function t(){c("\n")}function o(e,n){return p?v[e]+n+v.none:n}function i(e,n){return 1==n?e:e+"s"}function r(e,n){for(var t=[],o=0;n>o;o++)t.push(e);return t}function s(e,n){for(var t=(e||"").split("\n"),o=[],i=0;i<t.length;i++)o.push(r(" ",n).join("")+t[i]);return o.join("\n")}function a(e){t(),c(e.fullName);for(var n=0;n<e.failedExpectations.length;n++){var o=e.failedExpectations[n];t(),c(s(o.message,2)),c(s(o.stack,2))}t()}function u(e){for(var n=0;n<e.failedExpectations.length;n++)t(),c(o("red","An error was thrown in an afterAll")),t(),c(o("red","AfterAll "+e.failedExpectations[n].message));t()}var f,l,d,c=e.print,p=e.showColors||!1,m=e.onComplete||function(){},h=e.timer||n,g=[],v={green:"[32m",red:"[31m",yellow:"[33m",none:"[0m"},w=[];return c("ConsoleReporter is deprecated and will be removed in a future version."),this.jasmineStarted=function(){f=0,l=0,d=0,c("Started"),t(),h.start()},this.jasmineDone=function(){t();for(var e=0;e<g.length;e++)a(g[e]);if(f>0){t();var n=f+" "+i("spec",f)+", "+l+" "+i("failure",l);d&&(n+=", "+d+" pending "+i("spec",d)),c(n)}else c("No specs found");t();var o=h.elapsed()/1e3;for(c("Finished in "+o+" "+i("second",o)),t(),e=0;e<w.length;e++)u(w[e]);m(0===l)},this.specDone=function(e){return f++,"pending"==e.status?(d++,void c(o("yellow","*"))):"passed"==e.status?void c(o("green",".")):void("failed"==e.status&&(l++,g.push(e),c(o("red","F"))))},this.suiteDone=function(e){e.failedExpectations&&e.failedExpectations.length>0&&(l++,w.push(e))},this}var n={start:function(){},elapsed:function(){return 0}};return e};