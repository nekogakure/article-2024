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
for (let i = 0; i < 10; ++i) {
  const index_text = document.createElement("h1");
  index_text.innerHTML = "123";
  document.body.apeendChild(index_text);
}