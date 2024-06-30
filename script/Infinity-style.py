import datetime
import os
import json
import markdown
from sys import exit
article_temp_head = '''
<!DOCTYPE html>
<html lang="Ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="The Infinity's awesome blog article" />
    <title>HERE TO THE TITLE</title>
    <link rel="stylesheet" href="../../Infinity-style/style.css" />
    <script defer src="../../Infinity-style/script.js"></script>
    <script defer src="/The-Infinitys-Infinity/script.js"></script>
    <link rel="stylesheet" href="/The-Infinitys-Infinity/style.css">
    <script defer src="/The-Infinitys-Infinity/script.js"></script>
    <link rel="stylesheet" href="/The-Infinitys-Infinity/style.css" />
    <script
    defer
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2045274771035552"
    crossorigin="anonymous"></script>
  </head>
  <body>
    <div id="article-body">
      <div id="article-content">
'''
article_temp_foot = '''      </div>
    </div>
  </body>
</html>
'''
def listfolders(dir_path):
  result = [
      f for f in os.listdir(dir_path) if os.path.isdir(os.path.join(dir_path, f))
  ]
  return result
def listfiles(dir_path):
  result = [
      f for f in os.listdir(dir_path) if os.path.isfile(os.path.join(dir_path, f))
  ]
  return result
setting_file=open("./setting/setting.json")
setting_data=json.loads(setting_file.read())
custom_date_info=setting_data["custom-date"]
setting_file.close()
class custom_date:
  def __init__(self,year,month):
    self.year=year
    self.month=month
now=None
if custom_date_info["auto"]:
  now=datetime.datetime.now()
else:
  now=custom_date(custom_date_info["year"],custom_date_info["month"])

root_dir="./"+str(now.month).zfill(2)
if not os.path.isdir(root_dir):
  print("No datas")
  exit()
for article_dir in listfolders(root_dir):
  path = root_dir+"/"+article_dir
  file_names = listfiles(path)
  index_path = None
  article_path=None
  for file_name in file_names:
    if file_name.startswith("index"):
      index_path=file_name
    elif file_name==("article.md"):
      article_path=file_name
  if article_path!=None:
    markdown_text = ""
    markdown_title = ""
    with open(root_dir+"/"+article_dir+"/"+article_path,mode="r") as f:
      markdown_text = f.read()
      f.close()
          
    def convertmarkdown(markdown_text):
      extensions = [
        "extra",
        'admonition',
        'codehilite',
        'legacy_attrs',
        'legacy_em',
        'nl2br',
        'sane_lists',
        'toc',
        'wikilinks',
        'meta',
        'smarty',
      ]
      configs = {
        'codehilite':{
            'noclasses': True,
            'pygments_style': 'monokai',
        }
      }
      global markdown_title
      markdown_result=""
      convert_mode={
        "~~":False
      }
      for markdown_line in markdown_text.split("\n"):
        #~~を変換する機能がないので自分で実装する
        while "~~" in markdown_line:
          if convert_mode["~~"]:
            markdown_line = markdown_line.replace("~~","</s>",1)
          else:
            markdown_line = markdown_line.replace("~~","<s>",1)
          convert_mode["~~"] = not convert_mode["~~"]
        if markdown_line.startswith("#title: "):
          markdown_title=markdown_line[8:]
        elif markdown_line.startswith("#date: "):
          markdown_result+="<date>"+markdown_line[7:]+"</date>\n"
        else:
          markdown_result+=markdown_line+"\n"
      return markdown.markdown(markdown_result,extensions=extensions,extension_configs=configs)
    html_text = convertmarkdown(markdown_text)
    html_result=""
    for html_line in html_text.split("\n"):
      html_result+=" "*8+html_line+"\n"
    if index_path!=None:
      os.system("rm "+root_dir+"/"+article_dir+"/index.html")
    with open(root_dir+"/"+article_dir+"/index.html",mode="w") as f:
      f.write(article_temp_head.replace("HERE TO THE TITLE",markdown_title)+html_result+article_temp_foot)
      f.close()
