import os
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

print(get_dir_info("./"))
