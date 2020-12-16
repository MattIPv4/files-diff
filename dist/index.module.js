import e from"string-similarity";import{diffChars as d,diffLines as t}from"diff";import n from"escape-html";function r(){return(r=Object.assign||function(e){for(var d=1;d<arguments.length;d++){var t=arguments[d];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}const a=(e,d)=>{if(d.highlightFunction){const t=e.value.match(/^(\s*)(.*)(\s*)$/),n=d.highlightFunction(t?t[2]:e.value,e.added,e.removed);e.value=`${t?t[1]:""}${n}${t?t[3]:""}`}return e};var o=(e,d)=>{const t=e.reduce((e,t,o,i)=>{const s=r({},t);if(d.escapeHtml&&(s.value=n(s.value)),s.added=!!s.added,s.removed=!!s.removed,"count"in s&&delete s.count,!s.removed&&!s.added)return e.push(s),e;if(!d.ignoreWhitespace)return e.push(a(s,d)),e;if(o>0&&(i[o-1].removed&&t.added||i[o-1].added&&t.removed)&&i[o-1].value.replace(/\s/g,"")===t.value.replace(/\s/g,""))return e.push({added:!1,removed:!1,value:s.value}),e;if(o<i.length-1&&(i[o+1].removed&&t.added||i[o+1].added&&t.removed)&&i[o+1].value.replace(/\s/g,"")===t.value.replace(/\s/g,""))return e;const l=s.value.split("\n").map((e,d,t)=>`${e}${d<t.length-1?"\n":""}`);for(const t of l)e.push(a({added:s.added,removed:s.removed,value:t},d));return e},[]),o={added:null,removed:null};return t.reduce((e,d)=>(d.added===o.added&&d.removed===o.removed?e[e.length-1].value+=d.value:e.push(d),o.added=d.added,o.removed=d.removed,e),[])},i=(e,t,n)=>{const r=d(t,e);return o(r,n)},s=(e,d,n)=>{const r=t(d,e);return o(r,n)};export default(d,t,n)=>{(n=n||{}).similarity="number"==typeof n.similarity?Math.min(Math.max(n.similarity,0),1):.5,n.newAsAdded=void 0!==n.newAsAdded&&!!n.newAsAdded,n.escapeHtml=void 0===n.escapeHtml||!!n.escapeHtml,n.ignoreWhitespace=void 0===n.ignoreWhitespace||!!n.ignoreWhitespace;const r=((d,t,n)=>{const r=Object.keys(d),a=Object.keys(t),o=a.filter(e=>!r.includes(e)),i=r.filter(e=>!a.includes(e)),s=new Set(i),l={};for(const r of o){if(0===s.size)continue;const a=Array.from(s).map(e=>[e,d[e]]),o=e.findBestMatch(t[r],a.map(e=>e[1]));if(o.bestMatch.rating<n)continue;const i=a[o.bestMatchIndex][0];l[i]=r,s.delete(i)}return l})(d,t,n.similarity),a={};for(const e in d){if(!Object.prototype.hasOwnProperty.call(d,e))continue;a[e]={name:[{added:!1,removed:!1,value:e}],content:[{added:!1,removed:!1,value:d[e]}]};const o=e in r?r[e]:e in t?e:null,l=o?t[o]:null;null!==o?(e!==o&&(a[e].name=i(e,o,n)),d[e]!==l&&(a[e].content=s(d[e],l,n))):(a[e].name[0].added=n.newAsAdded,a[e].content[0].added=n.newAsAdded)}return a};
