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
     width: 100%;
     height: 100%;
     top: 0;
     left: 0;
     z-index: 1;
     background: url('https://images.unsplash.com/photo-1451186859696-371d9477be93?crop=entropy&fit=crop&fm=jpg&h=975&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1925') no-repeat 0 0;
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

     & .message-submit {
         position: absolute;
         z-index: 1;
         bottom: 9px;
         right: 10px;
         color: #fff;
         border: none;
         background: #248A52;
         font-size: 10px;
         text-transform: uppercase;
         line-height: 1;
         padding: 6px 10px; 
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

<script lang="typescript">
 const enc = new TextEncoder();
 const API_URL="http://localhost:5000/img"

 let text;
 let hash;
 let imgData;

 function bufferToHex(buffer) {
   if (!buffer) return '';
   var s = '', h = '0123456789ABCDEF';
   (new Uint8Array(buffer)).forEach((v) => { s += h[v >> 4] + h[v & 15]; });
   return s;
 }

 function handleSend() {
   const strippedText = (text || '').replace(/\s+/g, ' ')

   crypto.subtle.digest('SHA-1', enc.encode(strippedText))
                                    .then(bufferToHex)
                                    .then(h => {
                                      hash = h
                                      return fetch(`${API_URL}/${hash}`, {
                                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                                        mode: 'cors', // no-cors, *cors, same-origin
                                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                        credentials: 'same-origin', // include, *same-origin, omit
                                        headers: {
                                          'Content-Type': 'text'
                                          // 'Content-Type': 'application/x-www-form-urlencoded',
                                        },
                                        redirect: 'follow', // manual, *follow, error
                                        referrer: 'no-referrer', // no-referrer, *client
                                        body: strippedText
                                      })
                                    }).then(r => r.blob())
                                    .then(b => imgData = URL.createObjectURL(b))
 }
</script>

<div>
  <p>{text}</p>
  <p>{hash}</p>

  <div class="chat">
    <div class="chat-title">
      <h1>World Cloud generator</h1>
      <h2>hecho con <span class="red">♥</span></h2>
      <figure class="avatar">
        <img src="http://camba.coop/_nuxt/img/dddf669.svg" /></figure>
    </div>
    <div class="messages">
      <div class="messages-content">
        {#if !imgData}
        <span>loading…</span>
        {:else}
        <img src={imgData}/>
        {/if}
      </div>
    </div>

    <div class="message-box">
      <textarea type="text" class="message-input" bind:value={text} placeholder="enter text"/>
      <button type="submit" class="message-submit" on:click={handleSend}>Send</button>
    </div>

  </div>
  <div class="bg"></div>
</div>
