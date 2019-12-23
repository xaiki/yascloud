<style type='scss'>
 /* https://codepen.io/supah/pen/jqOBqp */
 /*--------------------
    Mixins
    --------------------*/
 @mixin center {
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
 }

 @mixin ball {
     @include center;
     content: '';
     display: block;
     width: 3px;
     height: 3px;
     border-radius: 50%;
     background: rgba(255, 255, 255, .5);
     z-index: 2;
     margin-top: 4px;
     animation: ball .45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
 }


 /*--------------------
    Body
    --------------------*/
 *,
 *::before,
 *::after {
     box-sizing: border-box;
 }

 html,
 body {
     height: 100%;
 }

 body {
     background: linear-gradient(135deg, #044f48, #2a7561);
     background-size: cover;
     font-family: 'Open Sans', sans-serif;
     font-size: 12px;
     line-height: 1.3;
     overflow: hidden;
 }

 .bg {
     position: fixed;
     width: 100%;
     height: 100%;
     top: 0;
     left: 0;
     z-index: 1;
     background: linear-gradient(45deg, steelblue, hotpink, yellow);
     filter: blur(80px);
     transform: scale(1.2);
 }


 /*--------------------
    Chat
    --------------------*/
 .chat {
     @include center;
     width: 80vw;
     height: 80vh;
     max-height: 80vh;
     z-index: 2;
     overflow: hidden;
     box-shadow: 0 5px 30px rgba(0, 0, 0, .2);
     background: rgba(0, 0, 0, .5);
     border-radius: 20px;
     display: flex;
     justify-content: space-between;
     flex-direction: column;
 }


 /*--------------------
    Chat Title
    --------------------*/
 .chat-title {
     flex: 0 1 45px;
     position: relative;
     z-index: 2;
     background: rgba(0, 0, 0, 0.2);
     color: #fff;
     text-transform: uppercase;
     text-align: left;
     padding: 10px 10px 10px 50px;

     h1, h2 {
         font-weight: normal;
         font-size: 10px;
         margin: 0;
         padding: 0;
     }

     h2 {
         color: rgba(255, 255, 255, .5);
         font-size: 8px;
         letter-spacing: 1px;
     }

     .avatar {
         position: absolute;
         z-index: 1;
         top: 8px;
         left: 9px;
         border-radius: 30px;
         width: 30px;
         height: 30px;
         overflow: hidden;
         margin: 0;
         padding: 0;
         border: 2px solid rgba(255, 255, 255, 0.24);

         img {
             width: auto;
             height: 100%;
         }
     }
 }

 /*--------------------
    Messages
    --------------------*/
 .messages {
     flex: 1 1 auto;
     color: rgba(255, 255, 255, .5);
     overflow: hidden;
     position: relative;
     width: 100%;

     & .messages-content {
         position: absolute;
         top: 0;
         left: 0;
         height: 100%;
         width: 100%;
     }

     & img {
         width: 100%;
         height: 100%;
     }
 }

 /*--------------------
    Message Box
    --------------------*/
 .message-box {
     flex: 1 1 40px;
     width: 100%;
     background: rgba(0, 0, 0, 0.3);
     padding: 10px;
     position: relative;

     & .message-input {
         background: none;
         border: none;
         outline: none!important;
         resize: none;
         color: rgba(255, 255, 255, .7);
         font-size: 11px;
         height: 100%;
         width: 100%;
         margin: 0;
         padding-right: 20px;
     }

     textarea:focus:-webkit-placeholder{
         color: transparent;
     }

     & .last-row {
         position: absolute;
         z-index: 1;
         bottom: 9px;
         font-size: 10px;
         text-transform: uppercase;
         color: #fff;
         line-height: 1;
         padding: 6px 10px; 
     }

     & .message-submit {
         right: 10px;
         border: none;
         background: #248A52;
         border-radius: 10px;
         outline: none!important;
         transition: background .2s ease;

         &:hover {
             background: #1D7745;
         }
     }
 }


 /*--------------------
    Custom Srollbar
    --------------------*/
 .mCSB_scrollTools {
     margin: 1px -3px 1px 0;
     opacity: 0;
 }

 .mCSB_inside > .mCSB_container {
     margin-right: 0px;
     padding: 0 10px;
 }

 .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar {
     background-color: rgba(0, 0, 0, 0.5)!important;
 }

 .red {
     color: #a11;
     font-size: large;
 }
</style>
<div class="chat">
  <div class="chat-title">
    <h1>World Cloud generator</h1>
    <h2>hecho con <span class="red">♥</span></h2>
    <figure class="avatar">
      <img src="http://camba.coop/_nuxt/img/dddf669.svg" /></figure>
  </div>
  <div class="messages">
    <div class="messages-content">
      <D3Viz text={renderText}/>
    </div>
  </div>

  <div class="message-box">
    <textarea type="text" class="message-input" bind:value={text} placeholder={placeholder}/>
    <form class="last-row">
      <input type=checkbox bind:checked={quotes} on:change={handleSend}/>
      <label>Split quotes</label>
    </form>
    <button type="submit" class="message-submit last-row" on:click={handleSend}>Send</button>
  </div>

</div>
<div class="bg"></div>

<script lang="typescript">
 import D3Viz from './d3.svelte';

 const placeholder = `please enter text
 «quoted test»
”quoted 2 test”
 `
 let text;
 let renderText = placeholder;
 let quotes
 const quoteChars = [['”', '”'], ['«', '»'], ['\'', '\''], ['\"', '\"']]
 const quoteRE = quoteChars.map(([s, e]) => new RegExp(`${s}([^${s}]+)${e}`, 'gmu'))

 function handleSend() {
   const strippedText = (text || placeholder).replace(/\s+/g, ' ')

   if (quotes) {
     const quoted = quoteRE.map(re => (strippedText.match(re) || [])
       .map(s => s.replace(/^./, '')
                  .replace(/.$/, '')))

     renderText = quoted.join(' ')
   } else {
     renderText = strippedText;
   }
 }
</script>
