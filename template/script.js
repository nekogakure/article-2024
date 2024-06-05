const article_text=document.body.innerHTML;
document.body.innerHTML="";
const article_box=document.createElement("div");
article_box.id="main-content";
article_box.innerHTML=article_text;
document.body.append(article_box);