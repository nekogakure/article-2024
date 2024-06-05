//add article
const article_text=document.body.innerHTML;
document.body.innerHTML="";
const article_box=document.createElement("div");
article_box.id="article-content";
article_box.innerHTML=article_text;
document.body.append(article_box);
//add title
const title_elem=document.querySelector("title");
const article_title=document.createElement("h1");
article_title.id="article-title";
article_title.innerHTML=title_elem.innerHTML;
document.body.prepend(article_title);
//add index
const article_index=document.createElement("div");
article_index.id="article-index";
document.body.append(article_index);