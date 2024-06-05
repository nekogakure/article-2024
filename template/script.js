//add article
const article_text = document.body.innerHTML;
document.body.innerHTML = "";
const article_box = document.createElement("div");
article_box.id = "article-content";
article_box.innerHTML = article_text;
document.body.append(article_box);
//add title
const title_elem = document.querySelector("title");
const article_title = document.createElement("h1");
article_title.id = "article-title";
article_title.innerHTML = title_elem.innerHTML;
document.body.prepend(article_title);
//add index
const article_index = document.createElement("div");
article_index.id = "article-index";
article_index.innerHTML = article_title.innerHTML;
document.body.append(article_index);
for (let i = 0; i < article_box.children.length; ++i) {
  const article_box_child = article_box.children[i];
  const index_text = document.createElement(article_box_child.tagName);
  index_text.innerHTML = article_box_child.innerHTML;
  const tags = { "H1": "H1", "H2": "H2", "H3": "H3", "H4": "H4" };
  if (article_box_child.tagName in tags) {
    document.querySelector("#article-index").append(index_text);
  }
}
//add style
// let The_Infinitys_Infinity = document.createElement("div");
// The_Infinitys_Infinity.innerHTML = `<script defer src="/The-Infinitys-Infinity/The-Infinitys.js"></script><link rel="stylesheet" href="/The-Infinitys-Infinity/The-Infinitys.css" />`;
// document.body.append(The_Infinitys_Infinity);
