import datetime
import os;os.system("pip install markdown")
import markdown
from sys import exit
article_temp_head='''
<!DOCTYPE html>
<html lang="Ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>
    <link rel="stylesheet" href="./style.css" />
    <script defer src="./script.js"></script>
  </head>
  <body>
'''
article_temp_foot='''
  </body>
</html>
'''
#関数の定義
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
now=datetime.datetime.now()
now=str(now.year)+"-"+str(now.month)
root_dir="./"+now
def renew():
  os.system("git config user.name github-actions")
  os.system("git config user.email github-actions@github.com")
  os.system("git add .")
  os.system("git commit -m \"convert markdown\"")
  os.system("git push")
#プログラムの実行
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
    with open(root_dir+"/"+article_dir+"/"+article_path,mode="r") as f:
      markdown_text = f.read()
      f.close()
    html_result=markdown.markdown(markdown_text)
    if index_path!=None:
      os.system("rm "+root_dir+"/"+article_dir+"/"+index_path)
    with open(root_dir+"/"+article_dir+"/index.html",mode="w") as f:
      f.write(article_temp_head+markdown_text+article_temp_foot)
      f.close()
