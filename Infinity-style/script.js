const repository_year = "2024";
const main = () => {
  //add article
  const go_top = document.createElement("button");
  go_top.id = "go-top";
  go_top.innerHTML = `
  <svg
    viewBox="0 0 100 100"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="none"
    stroke="#888"
    stroke-width="2">
    <animate
      attributeName="stroke"
      dur="5s"
      repeatCount="indefinite"
      values="#ff0000;#ffff00;#00ff00;#00ffff;#0000ff;#ff00ff;#ff0000"
      >
    </animate>
    <circle cx="50" cy="50" r="40" />
    <path d="M 80 45 L50 25 L 20 45" />
    <path d="M 80 55 L50 35 L 20 55" />
    <circle cx="50" cy="65" r="20"/>
    <ellipse cx="40" cy="65" rx="10" ry="8" stroke-width="1" />
    <ellipse cx="60" cy="65" rx="10" ry="8" stroke-width="1" />
  </svg>
  `;
  go_top.onclick = () => {
    document.querySelector("#article-title").scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "center",
    });
  };
  document.body.append(go_top);
  const article_content = document.querySelector("#article-content");
  const article_body = document.querySelector("#article-body");
  //add title
  const title_elem = document.querySelector("title");
  const article_title = document.createElement("div");
  article_title.id = "article-title";
  article_title.innerHTML = "<h1>" + title_elem.innerHTML + "</h1>";
  article_title.innerHTML += "<br />";
  article_title.innerHTML += `
  <svg
  class="Infinity-clock"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewbox="0 0 100 100"
  style="width:2.5em;height:2.5em;"
  stroke="#888"
  fill="none"
  stroke-width="5"
  stroke-linecap="round">
  <g class="Infinity-clock_frame">
    <circle cx="50" cy="50" r="40" />
    <circle cx="50" cy="50" r="30" stroke-opacity="0.5" />
    <ellipse
      cx="37.5"
      cy="50"
      rx="12.5"
      ry="10"
      stroke-width="2"
      stroke-opacity="0.5" />
    <ellipse
      cx="62.5"
      cy="50"
      rx="12.5"
      ry="10"
      stroke-width="2"
      stroke-opacity="0.5" />
  <animate
  attributeName="stroke"
  dur="5s"
  repeatCount="indefinite"
  values="#ff0000;#ffff00;#00ff00;#00ffff;#0000ff;#ff00ff;#ff0000"
  >
  </g>
  <g class="Infinity-clock_hands">
    <path d="M50 50,L50 20 Z" />
    <path d="M50 50,L60 60 Z" />
  </g>
</svg>
`; // Infinity-clock.svg
  const date_obj = document.querySelector("date");
  article_title.innerHTML += date_obj.outerHTML;
  article_body.prepend(article_title);
  //add index
  const article_index = document.createElement("div");
  article_index.id = "article-index";
  for (let i = 0; i < article_content.children.length; ++i) {
    const article_content_child = article_content.children[i];
    const tags = { H1: "H1", H2: "H2", H3: "H3", H4: "H4" };
    if (article_content_child.tagName in tags) {
      const index_text = document.createElement(article_content_child.tagName);
      index_text.innerHTML = article_content_child.innerHTML;
      index_text.onclick = () => {
        article_content_child.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      };
      article_index.append(index_text);
    }
  }
  article_body.append(article_index);
  const other_articles = document.createElement("div");
  other_articles.id = "other-articles";
  other_articles.innerHTML = "<h1>other articles</h1>";
  article_body.append(other_articles);
  const get_all_article_info = () => {
    const blog_start = {
      year: 2024,
      month: 4,
    };
    let today = new Date();
    today = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
    };
    const data_list_length =
      1 + 12 * (today.year - blog_start.year) + today.month - blog_start.month;
    const domain = new URL(window.location.href);
    const blog_domain = domain.hostname;
    const append_blog_button = (info) => {
      const box = document.createElement("button");
      box.classList.add("blog-button");
      box.onclick = () => {
        window.location.href = "https://" + blog_domain + info.index;
      };
      const thumbnail = document.createElement("img");
      thumbnail.src = "https://" + blog_domain + info.thumbnail;
      thumbnail.alt = info.name;
      thumbnail.loading = "lazy";
      const loading = document.createElement("img");
      loading.src =
        "data:image/svg+xml;base64,PHN2ZyAgIHZlcnNpb249IjEuMSIgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICAgdmlld0JveD0iLTYwIC02MCAxMjAgMTIwIiAgIGZpbGw9Im5vbmUiICAgc3Ryb2tlPSIjNzc3Ij4gICA8Zz4gICA8YW5pbWF0ZVRyYW5zZm9ybSAgICBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iICAgICBhdHRyaWJ1dGVUeXBlPSJYTUwiICAgICB0eXBlPSJyb3RhdGUiICAgICBmcm9tPSIwIDAgMCIgICAgIHRvPSIzNjAgMCAwIiAgICAga2V5VGltZXM9IjA7IDEiICAgICBrZXlTcGxpbmVzPSIwLjUsIDAuMjMsIDAuNSwgMC43NyIgICAgIGNhbGNNb2RlPSJzcGxpbmUiICAgICBkdXI9IjJzIiAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4gICA8YW5pbWF0ZSAgICAgICBhdHRyaWJ1dGVOYW1lPSJzdHJva2UiICAgICAgIHZhbHVlcz0iI2YwMDsjZmYwOyMwZjA7IzBmZjsjMDBmOyNmMGY7I2YwMCIgICAgICAgZHVyPSI1cyIgICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+ICAgPGVsbGlwc2UgY3g9Ii0yNSIgY3k9IjAiIHJ4PSIyNSIgcnk9IjIwIiBzdHJva2Utd2lkdGg9IjIiIC8+ICAgPGVsbGlwc2UgY3g9IjI1IiBjeT0iMCIgcng9IjI1IiByeT0iMjAiIHN0cm9rZS13aWR0aD0iMiIgLz4gICA8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iNTAiIHN0cm9rZS13aWR0aD0iNCIgLz4gICA8L2c+IDwvc3ZnPiA=";
      loading.alt = "loading...";
      loading.className = "loading-infinity";
      const title = document.createElement("div");
      title.innerHTML = info.title;
      box.innerHTML = loading.outerHTML + thumbnail.outerHTML + title.outerHTML;
      const insert_button = () => {
        document.querySelector("#other-articles").append(box);
      };
      insert_button();
    };
    const getData = (name) => {
      console.log("get: " + "https://" + blog_domain + name + ".json");
      fetch("https://" + blog_domain + name + ".json")
        .then((res) => res.json())
        .then((data) => {
          const infos = data.info;
          let counter = 3;
          for (let i = 0; i < infos.length; ++i) {
            const info = infos[i];
            if (Math.random() < 1 / (infos.length - i - counter)) {
              if (counter > 0) {
                append_blog_button(info);
                counter--;
              }
            }
          }
        })
        .catch((err) => console.log(`データが取得できませんでした：${err}`));
    };
    let mode_load_before = null;
    //check length of now month articles
    fetch(
      "https://" +
        blog_domain +
        "/article-" +
        repository_year +
        "/index/" +
        today.year.toString() +
        "-" +
        today.month.toString().padStart(2, "0") +
        ".json"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.info.length < 3) {
          mode_load_before = 1;
        } else {
          mode_load_before = 0;
        }
      });
    for (
      let load_count = data_list_length - mode_load_before;
      load_count > data_list_length - mode_load_before - 2;
      --load_count
    ) {
      const pathname =
        "/article-2024/index/" +
        (
          blog_start.year + ~~((blog_start.month + load_count - 1) / 12)
        ).toString() +
        "-" +
        (((blog_start.month + load_count - 2) % 12) + 1)
          .toString()
          .padStart(2, "0");
      getData(pathname);
    }
  };
  get_all_article_info();
};
main();

const scroll_index = () => {
  const body_scroll = window.scrollY / document.body.scrollHeight;
  const index_scrollTop_target =
    body_scroll * document.querySelector("#article-index").scrollHeight;
  const index_scrollTop_now =
    document.querySelector("#article-index").scrollTop;
  document.querySelector("#article-index").scrollTop +=
    (index_scrollTop_target - index_scrollTop_now) / 30;
  requestAnimationFrame(scroll_index);
};
scroll_index();

// 時計をアニメーションさせる
let renew_Infinity_clock_count = 0;
const renew_Infinity_clock = () => {
  renew_Infinity_clock_count = (renew_Infinity_clock_count + 1) % 5;
  if (renew_Infinity_clock_count == 0) {
    const now = new Date();
    const clock_hand_svg = document.querySelector(".Infinity-clock_hands");
    clock_hand_svg.style = "stroke:var(--article-text);";
    const now_hours = now.getHours();
    const now_minutes = now.getMinutes();
    const now_seconds = now.getSeconds() + now.getMilliseconds() / 1000;
    const short_way =
      ((((now_hours + now_minutes / 60) / 12) * 360 - 90) * Math.PI) / 180;
    const long_way = (((now_minutes / 60) * 360 - 90) * Math.PI) / 180;
    const thin_way = (((now_seconds / 60) * 360 - 90) * Math.PI) / 180;
    clock_hand_svg.innerHTML =
      `
    <path d="M50 50,l` +
      (30 * Math.cos(thin_way)).toString() +
      " " +
      (30 * Math.sin(thin_way)).toString() +
      `Z" stroke-width="1" />
    <path d="M50 50,l` +
      (30 * Math.cos(long_way)).toString() +
      " " +
      (30 * Math.sin(long_way)).toString() +
      `Z" />
    <path d="M50 50,l` +
      (20 * Math.cos(short_way)).toString() +
      " " +
      (20 * Math.sin(short_way)).toString() +
      `Z" />
  `;
  }
  requestAnimationFrame(renew_Infinity_clock);
};
renew_Infinity_clock();

const add_ads = () => {
  const article_content = document.querySelector("#article-content");
  const createInfinityAds = (e) => {
    const ads = document.createElement("div");
    const image = document.createElement("img");
    const info = {
      image: null,
      text: null,
      url: null,
    };
    if (info.image == null) {
      image.src = "../../Infinity-style/Infinity-ads.svg";
    } else {
      image.src = info.image;
    }
    ads.append(image);
    ads.className = "Infinity-ads";
    const text = document.createElement("div");
    if (info.text == null) {
      text.innerHTML = "Infinity ads 募集中";
    } else {
      text.innerHTML = info.text;
    }
    ads.append(text);
    if (info.url == null) {
      ads.onclick = () => {
        window.location.href =
          "https://" +
          new URL(window.location.href).hostname +
          "/Infinity-ads/";
      };
    } else {
      ads.onclick = () => {
        window.location.href = info.url;
      };
    }
    article_content.insertBefore(ads, e.nextSibling);
  };
  const tags = { H1: "H1", H2: "H2", H3: "H3", H4: "H4" };
  for (let i = 0; i < article_content.children.length; ++i) {
    const article_content_child = article_content.children[i];
    if (article_content_child.tagName in tags) {
      createInfinityAds(article_content_child);
    }
  }
};
if (new URL(window.location.href).hostname.endsWith("the-infinitys.f5.si")) {
  add_ads();
}
