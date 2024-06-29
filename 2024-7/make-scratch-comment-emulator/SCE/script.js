scratch_comment_emulator = {
  elem: {
    source: {
      html: `
        <button class="hide">x</button>
        <h1>Scratch Comment Emulator()</h1>
        <label for="usersname">username<input id="sce-username" type="text" /></label>
        <label for="messages">messages <textarea id="sce-messages"></textarea></label>
        <label for="position">position <input type="text"></label>
        <label for="is-reply">reply <input type="checkbox"></label>
        <button id="sce-send">send</button>
    `,
      css: `
      .sce-box {
        z-index:6666;
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
    sce_div.className = "sce-box";
    sce_div.innerHTML = scratch_comment_emulator.elem.source.html;
    const sce_style = document.createElement("style");
    sce_style.innerHTML = scratch_comment_emulator.elem.source.css;
    document.body.append(sce_div);
    document.body.append(sce_style);
  },
  send_comment: (username, text) => {
    if (window.location.href.startsWith("https://scratch.mit.edu/users/")) {
      var comment_box = document.createElement("div");
      comment_box.id = Math.floor(Math.random() * 10 ** 10);
      comment_box.className = "comment";
      var actions_warp = document.createElement("div");
      actions_warp.className = "actions-wrap";
      actions_warp.innerHTML = '<span data-control="delete" class="actions report">Delete</span>\n<span data-control="report" class="actions report"> 報告 </span>';
      comment_box.append(actions_warp);
      const comment_user_a = document.createElement("a");
      const comment_username = username;
      comment_user_a.href = "/users/" + comment_username;
      const comment_image = document.createElement("img");
      comment_image.className = "avatar";
      fetch("https://api.scratch.mit.edu/users/" + comment_username)
        .then(res => res.json())
        .then(data => {
          comment_image.src = data.profile.images["60x60"];
          comment_image.alt = comment_username;
        })
        .catch(err => alert("error: " + err));
      comment_image.width = 45;
      comment_image.height = 45;
      comment_user_a.append(comment_image);
      comment_box.append(comment_user_a);
      const comment_info = document.createElement("div");
      comment_info.className = "info";
      comment_info.innerHTML = '<div class="name">\n<a href="/users/' + comment_username + '">' + comment_username + '</a>\n</div>';
      comment_content = document.createElement("div");
      comment_content.className = "content";
      comment_content.innerHTML = text;
      comment_info.append(comment_content);
      const comment_info_other = document.createElement("div");
      comment_info_other.innerHTML = `
      <div>
      <span class="time" title="made by The Infinity's">1 minute ago</span>
      <a
        class="reply"
        style="display: inline;"
        data-comment-id="1234567890"
        data-parent-thread="1234567890"
        data-commentee-id="1234567890"
        data-control="reply-to">
        <span>Reply</span>
      </a>
      </div>
      <div data-content="reply-form"></div>
      `;
      comment_info.append(comment_info_other);
      comment_box.append(comment_info);
      const comment_li = document.createElement("li");
      comment_li.className = "top-level-reply";
      comment_li.append(comment_box);
      const comment_ul = document.createElement("ul");
      comment_ul.className = "replies";
      comment_li.append(comment_ul);
      document.querySelector("ul.comments").prepend(comment_li);
    } else if (
      window.location.href.startsWith("https://scratch.mit.edu/projects/")
    ) {
      var comment_box = document.createElement("div");
      comment_box.id = Math.floor(Math.random() * 10 ** 10);
      comment_box.className = "flex-row comment";
      const comment_user_a = document.createElement("a");
      const comment_username = username;
      comment_user_a.href = "/users/" + comment_username;
      const comment_image = document.createElement("img");
      comment_image.className = "avatar";
      fetch("https://api.scratch.mit.edu/users/" + comment_username)
        .then(res => res.json())
        .then(data => {
          comment_image.src = data.profile.images["60x60"];
          comment_image.alt = comment_username;
        })
        .catch(err => alert("error: " + err));
      comment_image.width = 45;
      comment_image.height = 45;
      comment_user_a.append(comment_image);
      comment_box.append(comment_user_a);
      const comment_bubble = document.createElement("div");
      comment_bubble.className = "comment-bubble";
      const comment_content = document.createElement("span");
      comment_content.innerHTML = '<span class="emoji-text">' + text + '</span>';
      const comment_bottom = document.createElement("div");
      comment_bottom.className = "flex-row comment-bottom-row";
      comment_bottom.innerHTML = '<span class="comment-time"><span>' + prompt("date(examples 「4 時間前」、「1 分前」...): ") + '</span></span><span class="comment-reply"><span>返信</span></span>';
      comment_bubble.append(comment_content);
      comment_bubble.append(comment_bottom);
      const comment_body = document.createElement("div");
      comment_body.className = "flex-row comment-body column";
      comment_body.innerHTML = '<div class="flex-row comment-top-row"><a class="username" href="/users/' + comment_username + '">' + comment_username + '</a><div class="action-list"></div></div>';
      comment_body.append(comment_bubble);
      comment_box.append(comment_body);
      const comment_container = document.createElement("div");
      comment_container.className = "flex-row comment-container";
      comment_container.append(comment_box);
      document.querySelector(".comments-list").prepend(comment_container);
    } else {
      alert("対応していません")
    }
  }
};
scratch_comment_emulator.init();
document.querySelector("#sce-send").onclick = () => {
  const username = document.querySelector("#sce-username").value;
  const message = document.querySelector("#sce-messages").value;
  scratch_comment_emulator.send_comment(username, message);
};
