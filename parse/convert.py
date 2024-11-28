from in_out import read_json, write_json
import random
import re


def filter_null_header(ads):
    return list(filter(lambda ad: ad["main"]["header"], ads))


def set_id(ads):
    for i in range(len(ads)):
        ad = ads[i]
        ad["id"] = i + 1

    return ads


def set_status_for_every(ads, status, step):
    for i in range(0, len(ads), step):
        ad = ads[i]
        ad["main"]["status"] = status

    return ads


def set_owner_for_every(ads, owner, step):
    for i in range(0, len(ads), step):
        ad = ads[i]
        ad["owner"] = owner

    return ads



def shuffle(ads, randSeed = 1):
    random.seed(randSeed)
    random.shuffle(ads)
    return ads


def remove_tags_from_shortDesc(ads):
    for ad in ads:
        if not ad["main"]["shortDesc"]:
            continue
        clear_br = re.sub(r"(<br[/]>)|(<[/]br>)|(<br>)", " ", ad["main"]["shortDesc"])
        clear_all = re.sub(r"<.*?>", "", clear_br)
        ad["main"]["shortDesc"] = clear_all

    return ads


def detect_and_set_props_types(ads):

    def is_int(value: str):
        try:
            int(value)
            return True
        except:
            return False
        
    def is_float(value: str):
        try:
            float(value)
            return True
        except:
            return False

    def detect_int(value: str):
        split = value.replace(" ", " ").split(" ")
        if len(split) == 1:
            if is_int(split[0]):
                return (split[0], "")
        if len(split) == 2:
            if is_int(split[0]) and not is_int(split[1]):
                return (split[0], split[1])
        elif len(split) > 2:
            without_last = split[0:-1]
            join = "".join(without_last)
            if is_int(join) and not is_int(split[-1]):
                return (join, split[-1])
        else:
            return None
        
    def detect_float(value: str):
        split = value.replace(" ", " ").split(" ")
        if len(split) == 1:
            if is_float(split[0]):
                return (split[0], "")
        elif len(split) == 2:
            if (is_float(split[0]) and not is_float(split[1])):
                return (split[0], split[1])
        else:
            return None
        
    def set_num_prop_fields(prop, detect_result, type):
        num, metric = detect_result
        prop["value"] = num
        prop["type"] = type
        if metric:
            prop["metric"] = metric

    for ad in ads:
        props = ad["properties"]
        for prop in props:
            name, value = prop["name"], prop["value"]

            detect_result = detect_int(value)
            if detect_result is not None:
                set_num_prop_fields(prop, detect_result, "int")
                continue

            detect_result = detect_float(value)
            if detect_result is not None:
                set_num_prop_fields(prop, detect_result, "float")
                continue

            prop["type"] = "str"

    return ads


def delete_main_category(ads):
    for ad in ads:
        category = ad["main"]["category"]
        split = category.split(">")
        split = [cat for cat in split if cat != "Главная"]
        join = ">".join(split)
        ad["main"]["category"] = join

    return ads


def compile():
    phones = read_json("results/phones-ads.json")
    phones2 = read_json("results/phones-ads-50.json")
    cars = read_json("results/cars-ads.json")
    cars2 = read_json("results/cars-ads-12.json")

    ads = phones + phones2 + cars + cars2
    ads = filter_null_header(ads)
    ads = set_id(ads)
    ads = shuffle(ads)
    ads = set_status_for_every(ads, "published", 1)
    ads = set_status_for_every(ads, "unpublished", 4)
    ads = set_status_for_every(ads, "bunned", 10)
    ads = shuffle(ads)
    ads = set_owner_for_every(ads, "3", 1)
    ads = set_owner_for_every(ads, "4", 2)
    ads = remove_tags_from_shortDesc(ads)
    ads = detect_and_set_props_types(ads)
    ads = delete_main_category(ads)

    return ads


def extract_props(ads):
    props = {}
    for ad in ads:
        for prop in ad["properties"]:
            next = {"name": prop["name"], "type": prop["type"]}

            if "metric" in prop:
                next["metric"] = prop["metric"]

            props[prop["name"]] = next

    result = []
    for _, value in props.items():
        result.append(value)

    return result


def extract_props_for_cars_and_phones():
    ads = compile()
    cars = [ad for ad in ads if "Автомобили" in ad["main"]["category"] or "Транспорт" in ad["main"]["category"] or "С пробегом" in ad["main"]["category"]]
    cars_props = extract_props(cars)
    phones = [ad for ad in ads if "Телефоны" in ad["main"]["category"]]
    phones_props = extract_props(phones)

    return {"Автомобили": cars_props, "Телефоны": phones_props}


# compile()
# write_json("C:/Users/Egor/source/repos/obyavi.site/web/src/data/db/ads.json", compile())
# write_json("results/ads.json", compile())

write_json("C:/Users/Egor/source/repos/obyavi.site/web/src/data/db/props.json", extract_props_for_cars_and_phones())

