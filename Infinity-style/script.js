const main = () => {//add article
  const article_text = document.body.innerHTML;
  document.body.innerHTML = "";
  const article_box = document.createElement("div");
  article_box.id = "article-content";
  article_box.innerHTML = article_text;
  document.body.append(article_box);
  //add title
  const title_elem = document.querySelector("title");
  const article_title = document.createElement("div");
  article_title.id = "article-title";
  article_title.innerHTML = "<h1>" + title_elem.innerHTML + "</h1>";
  document.body.prepend(article_title);
  //add index
  const article_index = document.createElement("div");
  article_index.id = "article-index";
  document.body.append(article_index);
  for (let i = 0; i < article_box.children.length; ++i) {
    const article_box_child = article_box.children[i];
    const tags = { "H1": "H1", "H2": "H2", "H3": "H3", "H4": "H4" };
    if (article_box_child.tagName in tags) {
      const index_text = document.createElement(article_box_child.tagName);
      index_text.innerHTML = article_box_child.innerHTML;
      index_text.onclick = () => {
        article_box_child.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'center'
        });
      }
      document.querySelector("#article-index").append(index_text);
    }
  }
  const article_inner = document.createElement("div");
  const body_html = document.body.innerHTML;
  document.body.innerHTML = "";
  article_inner.innerHTML = body_html;
  article_inner.style.overflow = "visible";
  document.body.append(article_inner);
  article_inner.offsetHeight=document.querySelector("#article-content").offsetHeight+window.innerHeight;
  const other_articles = document.createElement("div");
  other_articles.id = "other-articles";
  article_inner.append(other_articles);
  //add style
  fetch("https://" + new URL(window.location.href).hostname + "/The-Infinitys-Infinity/style.css").then(res => res.text()).then(style => {
    const The_Infinitys_css = document.createElement("style");
    The_Infinitys_css.innerHTML = style;
    document.body.append(The_Infinitys_css);
  }).catch(err => alert(err));
  fetch("https://" + new URL(window.location.href).hostname + "/The-Infinitys-Infinity/script.js").then(res => res.text()).then(style => {
    const The_Infinitys_js = document.createElement("script");
    The_Infinitys_js.innerHTML = style;
    document.body.append(The_Infinitys_js);
  }).catch(err => alert(err));
};
main();