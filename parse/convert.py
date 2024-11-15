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


def build():
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
    
    write_json("C:/Users/Egor/source/repos/obyavi.site/web/src/data/db/ads.json", ads)
    # write_json("results/ads.json", ads)


build()

