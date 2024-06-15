const main = () => {//add article
  const article_text = document.body.innerHTML;
  document.body.innerHTML = "";
  const article_box = document.createElement("div");
  article_box.id = "article-content";
  article_box.innerHTML = article_text;
  const article_inner = document.createElement("div");
  article_inner.append(article_box);
  document.body.append(article_inner);
  //add title
  const title_elem = document.querySelector("title");
  const article_title = document.createElement("div");
  article_title.id = "article-title";
  article_title.innerHTML = "<h1>" + title_elem.innerHTML + "</h1>";
  article_inner.prepend(article_title);
  //add index
  const article_index = document.createElement("div");
  article_index.id = "article-index";
  article_inner.append(article_index);
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
      article_index.append(index_text);
    }
  }
  const other_articles = document.createElement("div");
  other_articles.id = "other-articles";
  article_inner.append(other_articles);
  const get_all_article_info = () => {
    const blog_start = {
      year: 2024,
      month: 4
    }
    let today = new Date();
    today = {
      year: today.getFullYear(),
      month: today.getMonth() + 1
    }
    const data_list_length = 1 + 12 * (today.year - blog_start.year) + today.month - blog_start.month;
    const domain = new URL(window.location.href);
    const blog_domain = domain.hostname;
    const append_blog_button = info => {
      const box = document.createElement("button");
      box.classList.add("blog-button");
      box.onclick = () => {
        window.location.href = "https://" + blog_domain + info.index;
      }
      const thumbnail = document.createElement("img");
      thumbnail.src = "https://" + blog_domain + info.thumbnail;
      thumbnail.alt = info.name;
      thumbnail.loading = "lazy";
      const loading = document.createElement("img");
      loading.src = "data:image/svg+xml;base64,PHN2ZyAgIHZlcnNpb249IjEuMSIgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICAgdmlld0JveD0iLTYwIC02MCAxMjAgMTIwIiAgIGZpbGw9Im5vbmUiICAgc3Ryb2tlPSIjNzc3Ij4gICA8Zz4gICA8YW5pbWF0ZVRyYW5zZm9ybSAgICBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iICAgICBhdHRyaWJ1dGVUeXBlPSJYTUwiICAgICB0eXBlPSJyb3RhdGUiICAgICBmcm9tPSIwIDAgMCIgICAgIHRvPSIzNjAgMCAwIiAgICAga2V5VGltZXM9IjA7IDEiICAgICBrZXlTcGxpbmVzPSIwLjUsIDAuMjMsIDAuNSwgMC43NyIgICAgIGNhbGNNb2RlPSJzcGxpbmUiICAgICBkdXI9IjJzIiAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4gICA8YW5pbWF0ZSAgICAgICBhdHRyaWJ1dGVOYW1lPSJzdHJva2UiICAgICAgIHZhbHVlcz0iI2YwMDsjZmYwOyMwZjA7IzBmZjsjMDBmOyNmMGY7I2YwMCIgICAgICAgZHVyPSI1cyIgICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+ICAgPGVsbGlwc2UgY3g9Ii0yNSIgY3k9IjAiIHJ4PSIyNSIgcnk9IjIwIiBzdHJva2Utd2lkdGg9IjIiIC8+ICAgPGVsbGlwc2UgY3g9IjI1IiBjeT0iMCIgcng9IjI1IiByeT0iMjAiIHN0cm9rZS13aWR0aD0iMiIgLz4gICA8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iNTAiIHN0cm9rZS13aWR0aD0iNCIgLz4gICA8L2c+IDwvc3ZnPiA=";
      loading.alt = "loading...";
      loading.className = "loading-infinity";
      const title = document.createElement("div");
      title.innerHTML = info.title;
      box.innerHTML = loading.outerHTML + thumbnail.outerHTML + title.outerHTML;
      const insert_button = () => {
        document.querySelector("#other-articles").append(box);
      }
      insert_button();
    };
    const getData = (name) => {
      console.log("get: " + "https://" + blog_domain + name + ".json");
      fetch("https://" + blog_domain + name + ".json")
        .then((res) => res.json()).then(
          data => {
            const infos = data.info;
            let counter = 0;
            for (let i = 0; i < infos.length; ++i) {
              const info = infos[i];
              if (Math.random() < 1 / (info.length - 1)) {
                append_blog_button(info);
                counter++;
              }
              if (counter >= 2) {
                return 0;
              }
            }
            return 1;//エラーが発生した。
          }
        ).catch((err) => console.log(`データが取得できませんでした：${err}`));
    };
    for (let load_count = data_list_length; load_count > data_list_length - 2; --load_count) {
      const pathname = "/api/blog/" + (blog_start.year + ~~((blog_start.month + load_count - 1) / 12)).toString() + "-" + ((blog_start.month + load_count - 2) % 12 + 1).toString()
      getData(pathname);
    }
  };
  get_all_article_info();
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