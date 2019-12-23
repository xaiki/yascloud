<script lang="typescript">
 import WordCloud from './wordcloud';
 import { onMount } from 'svelte';
 import stopwords from './stopwords.json';

 const d3 = require('d3');

 const sw = new Set(stopwords)
 const MAX_WORDS = 100
 const SIZES = {
   min: 10,
   max: 100
 }

 const fontScale = d3.scaleSqrt().range([10, 100])

 export let text = `
hello darkness my old friend, 
I've come to talk to you again`;

 let w, h, m;
 let wc;
 let processed = {
   done: 0,
   total: 0
 }

 function createArray (size) {
   return Array.apply(null, Array(size))
 } 

 function uniquify(text) {
   m = 0;
   const tokens : string[] = text
     .replace(/[!\.,:;\?\(\)\"\”\“\n]/g, '')
     .split(/ +/)

   const scores = {}
   for (let i in tokens) {
     const t = tokens[i]

     if (sw.has(t.toLowerCase())) continue;
     let s = scores[t] || 0;
     scores[t] = ++s;

     if (s > m) m = s;
   }

   const unique = Object.keys(scores)
                        .sort((a, b) => scores[a] - scores[b])
                        .slice(-MAX_WORDS)
   let c = (SIZES.max - SIZES.min)/m 

   console.error ({unique, c})

   return unique.map(d => ({
     text: d,
     size: SIZES.min + scores[d]*c
   }))
 }

 function progress() {
   processed.done = processed.done + 1 //reactivity
 }

 function update(text) {
   const tokens = uniquify(text)
   processed = {
     done: 0,
     total: tokens.length
   }
   $: wc && wc.update(tokens, progress)
 }

 $: update(text)
 onMount(() => {
   wc = WordCloud('#vis', {h, w});
   update(text)
 })
</script>

<style>
 #vis {
     height: 100%;
     width: 100%;
 }
</style>

<div id="vis" bind:clientWidth={w} bind:clientHeight={h}/>

