import os
import datetime
from sys import exit
import json
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
repository_name=setting_data["repository-name"]
json_files_name="./index/"+str(now.year)+"-"+str(now.month)+".json"
result_obj={"info":[]}
root_dir="./"+str(now.month).zfill(2)
def end():
  f=open(json_files_name,mode="w")
  def get_date(obj):
    return obj["date"]
  result_obj["info"].sort(key=get_date, reverse=True)
  f.write(json.dumps(result_obj,indent=2))
  print(json.dumps(result_obj,indent=2))
  f.close()

def renew():
  os.system("git config user.name github-actions")
  os.system("git config user.email github-actions@github.com")
  os.system("git add .")
  os.system("git commit -m \"made with Infinity Style Static Site Generator\"")
  os.system("git push")
#プログラムの実行
if not os.path.isdir(root_dir):
  print("No datas")
  exit()
for article_dir in listfolders(root_dir):
  path = root_dir+"/"+article_dir
  file_names = listfiles(path)
  index_path = None
  thumbnail_path = None
  for file_name in file_names:
    if file_name.startswith("index"):
      index_path=file_name
    elif file_name.startswith("thumbnail"):
      thumbnail_path = file_name
  if index_path == None or thumbnail_path == None:
    print("Something was losted: at "+path)
  else:
    article_data=open(path+"/"+index_path)
    article_text=article_data.read()
    article_data.close()
    title=article_text[article_text.find("<title>")+7:article_text.find("</title>")]
    date=article_text[article_text.find("<date>")+6:article_text.find("</date>")]
    if article_text.find("<date>")==-1:
      date=str(now.year)+"/"+str(now.month)+"/nn"
    title=title.encode("unicode-escape").decode("unicode-escape")
    add_path="/"+repository_name+"/"+root_dir.replace("./","")+"/"+article_dir+"/"
    result_obj["info"].append(
      {
        "index":add_path,
        "thumbnail":add_path+thumbnail_path,
        "name":article_dir,
        "title":title,
        "date":date
      }
    )
end()
renew()
