from selenium import webdriver
from in_out import read_json, write_json
from avito_bs import parse_ad
import time
import random

SKIP = 12
LIMIT = 100
LIST_PATH = "results/cars.json"
SAVE_PATH = "results/cars-ads-12.json"


def parse_list(skip, limit, list_path, save_path):
    links = read_json(list_path)
    links = links[skip:limit]

    driver = webdriver.Chrome()
    output = []

    for i in range(len(links)):
        link = links[i]
        driver.get(link)
        time.sleep(random.randint(5, 15))
        content = driver.page_source
        try:
            parsed = parse_ad(content)
            output.append(parsed)
            write_json(save_path, output)
            print("Parsed:", link)
        except:
            print("Fail:", link)

    driver.quit()


parse_list(SKIP, LIMIT, LIST_PATH, SAVE_PATH)