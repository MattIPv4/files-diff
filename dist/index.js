function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var d=e(require("string-similarity")),t=require("diff"),r=e(require("escape-html"));function n(){return(n=Object.assign||function(e){for(var d=1;d<arguments.length;d++){var t=arguments[d];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}const a=(e,d)=>{if(d.highlightFunction){const t=e.value.match(/^(\s*)(.*)(\s*)$/),r=d.highlightFunction(t?t[2]:e.value,e.added,e.removed);e.value=`${t?t[1]:""}${r}${t?t[3]:""}`}return e};var o=(e,d)=>{const t=e.reduce((e,t,o,i)=>{const l=n({},t);if(d.escapeHtml&&(l.value=r(l.value)),l.added=!!l.added,l.removed=!!l.removed,"count"in l&&delete l.count,!l.removed&&!l.added)return e.push(l),e;if(!d.ignoreWhitespace)return e.push(a(l,d)),e;if(o>0&&(i[o-1].removed&&t.added||i[o-1].added&&t.removed)&&i[o-1].value.replace(/\s/g,"")===t.value.replace(/\s/g,""))return e.push({added:!1,removed:!1,value:l.value}),e;if(o<i.length-1&&(i[o+1].removed&&t.added||i[o+1].added&&t.removed)&&i[o+1].value.replace(/\s/g,"")===t.value.replace(/\s/g,""))return e;const s=l.value.split("\n").map((e,d,t)=>`${e}${d<t.length-1?"\n":""}`);for(const t of s)e.push(a({added:l.added,removed:l.removed,value:t},d));return e},[]),o={added:null,removed:null};return t.reduce((e,d)=>(d.added===o.added&&d.removed===o.removed?e[e.length-1].value+=d.value:e.push(d),o.added=d.added,o.removed=d.removed,e),[])},i=(e,d,r)=>{const n=t.diffChars(d,e);return o(n,r)},l=(e,d,r)=>{const n=t.diffLines(d,e);return o(n,r)};module.exports=(e,t,r)=>{(r=r||{}).similarity="number"==typeof r.similarity?Math.min(Math.max(r.similarity,0),1):.5,r.newAsAdded=void 0!==r.newAsAdded&&!!r.newAsAdded,r.escapeHtml=void 0===r.escapeHtml||!!r.escapeHtml,r.ignoreWhitespace=void 0===r.ignoreWhitespace||!!r.ignoreWhitespace;const n=((e,t,r)=>{const n=Object.keys(e),a=Object.keys(t),o=a.filter(e=>!n.includes(e)),i=n.filter(e=>!a.includes(e)),l=new Set(i),s={};for(const n of o){const a=Array.from(l).map(d=>[d,e[d]]),o=d.findBestMatch(t[n],a.map(e=>e[1]));if(o.bestMatch.rating<r)continue;const i=a[o.bestMatchIndex][0];s[i]=n,l.delete(i)}return s})(e,t,r.similarity),a={};for(const d in e){if(!Object.prototype.hasOwnProperty.call(e,d))continue;a[d]={name:[{added:!1,removed:!1,value:d}],content:[{added:!1,removed:!1,value:e[d]}]};const o=d in n?n[d]:d in t?d:null,s=o?t[o]:null;if(null===o)return a[d].name[0].added=r.newAsAdded,void(a[d].content[0].added=r.newAsAdded);d!==o&&(a[d].name=i(d,o,r)),e[d]!==s&&(a[d].content=l(e[d],s,r))}return a};
