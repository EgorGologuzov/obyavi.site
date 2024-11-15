import json


def read_all(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()
    

def read_json(path):
    return json.loads(read_all(path))


def write_text(path, text):
    with open(path, "w", encoding='utf-8') as f:
        f.write(text)


def write_json(path, obj):
    with open(path, "w", encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=4)

