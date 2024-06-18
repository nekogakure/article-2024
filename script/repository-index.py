import os
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
def get_dir_info(path):
  result={
    "files":listfiles(path),
    "folders":{}
    }
  for folder_name in listfolders(path):
    result["folders"][folder_name]=get_dir_info(path+"/"+folder_name)
  return result
result_obj=get_dir_info("./")
def end():
  f=open("repository-index.json",mode="w")
  f.write(json.dumps(result_obj,indent=2))
  print(json.dumps(result_obj,indent=2))
  f.close()
def renew():
  os.system("git config user.name github-actions")
  os.system("git config user.email github-actions@github.com")
  os.system("git add .")
  os.system("git commit -m \"update blog-data repository-index\"")
  os.system("git push origin main")
end()
renew()
