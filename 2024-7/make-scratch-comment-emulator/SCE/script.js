scratch_comment_emulator = {
  elem: {
    source: {
      html: `
        <button class="hide">x</button>
        <h1>Scratch Comment Emulator</h1>
        <label for="usersname">username<input id="sce-username" type="text" /></label>
        <label for="messages">messages <textarea id="sce-messages"></textarea></label>
        <label for="position">position <input type="text"></label>
        <label for="is-reply">reply <input type="checkbox"></label>
        <button id="sce-send">send</button>
    `,
      css: `
      .sce-box {
        font-family: Arial, Helvetica, sans-serif;
        position: fixed;
        width: 50vw;
        right: 0;
        top: 0;
        height: 100vh;
        background-color: #80f;
        color: #ff0;
        padding: 0%;
      }
      .sce-box .hide {
        margin-bottom: 0;
        margin-left: 40vw;
        width: 10vw;
        border-radius: 0;
        color: #ff0;
        font-size: 3vw;
        background-color: #80f;
        border: 1px solid #ff0;
      }
      .sce-box>h1 {
        margin: 0;
        border: 1px solid #ff0;
        width: 100%;
        font-size: 3vw;
      }
      .sce-box input,
      .sce-box textarea {
        font-size: 2vh;
        width: 100%;
        border-radius: 0;
        background-color: black;
        color: white;
        border: 1px solid #ff0;
      }
      #sce-messages {
        height: 60%;
      }
      #sce-send {
        font-size: 2vh;
        width: 100%;
        border-radius: 0;
        color: #ff0;
        background-color: #80f;
        border: 1px solid #ff0;
    }
      `
    }
  },
  init: () => {
    const sce_div = document.createElement("div");
    sce_div.className="sce-box";
    sce_div.innerHTML = scratch_comment_emulator.elem.source.html;
    const sce_style = document.createElement("style");
    sce_style.innerHTML = scratch_comment_emulator.elem.source.css;
    document.body.append(sce_div);
    document.body.append(sce_style);
  }
};
scratch_comment_emulator.init();