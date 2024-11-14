from bs4 import BeautifulSoup
import datetime
from in_out import read_all, write_json
import re


def parse_ad(html):
    soup = BeautifulSoup(html, "html.parser")

    # header
    div = soup.find("div", class_="style-titleWrapper-Hmr_5")
    h1 = div.find("h1") if div else None
    header = h1.text if h1 else None

    # avatar
    div = soup.find("div", class_="image-frame-wrapper-_NvbY")
    avatar = div["data-url"] if div else None

    # images
    images = [avatar]
    all = soup.find_all("li", class_="images-preview-previewImageWrapper-RfThd")
    for item in all:
        img = item.find("img")
        srcset = img["srcset"] if img else None
        split = srcset.split(",") if srcset else None
        second = split[1] if split and len(split) > 1 else None
        if second:
            path = second.split()[0]
            images.append(path)

    # categories
    categories = ""
    all = soup.find_all("a", class_="breadcrumbs-link-Vr4Nc")
    for item in all:
        span = item.find("span")
        text = span.text if span else None
        if text and text != "…":
            categories += text + ">"
    categories = categories[:-1:]

    # description
    div = soup.find("div", class_="style-item-description-text-mc3G6")
    div = div if div else soup.find("div", class_="style-item-description-html-qCwUL")
    p = div.find("p") if div else None
    desc = str(p) if p else None

    # props
    props = []
    all = soup.find_all("li", class_="params-paramsList__item-_2Y2O")
    for item in all:
        split = item.text.split(":")
        if len(split) != 2:
            html = str(item)
            replaced = re.sub(r"<img[^>]*>", ":", html)
            item = BeautifulSoup(replaced, "html.parser")
            split = item.text.split(":")
        name, value = split if len(split) == 2 else [split[0], None]
        props.append({
            "name": name.strip() if name else None,
            "value": value.strip() if value else None
        })

    # price
    span = soup.find("span", class_="style-price-value-main-TIg6u")
    text = span.text if span else None
    clean = [i for i in text if i.isdigit()] if text else None
    price = "".join(clean) if clean else None

    # ad
    ad = {
        "id": 0,
        "owner": "3",
        "main": {
            "header": header,
            "status": "published",
            "avatar": avatar,
            "category": categories,
            "shortDesc": desc
        },
        "price": {
            "value": price,
            "currency": "₽"
        },
        "adress": {
            "country": "РФ",
            "state": "Свердловская область",
            "city": "Нижний Тагил",
            "district": "Ленинский район",
            "street": "пр-т Мира",
            "house": "30а",
            "apartment": "29",
            "comment": None
        },
        "meta": {
            "create": str(datetime.datetime.now()),
            "change": str(datetime.datetime.now())
        },
        "images": images,
        "desc": desc,
        "properties": props
    }

    return ad


def parse_list(html):
    soup = BeautifulSoup(html, "html.parser")

    result = []
    all = soup.find_all("a", class_="styles-module-root-m3BML", href=True)
    for item in all:
        link = "https://www.avito.ru" + item["href"]
        result.append(link)

    result = list(filter(lambda link: "cd=" not in link and "search_seller_info" not in link, result))

    return result


def parse_from_files(start, end, file_name):
    output = []

    for i in range(start, end + 1):
        html = read_all(f"pages/{i}.html")
        parsed = parse_ad(html)
        parsed["id"] = i
        output.append(parsed)

    write_json(f"results/{file_name}.json", output)


def parse_list_from_file(file_name):
    html = read_all(f"pages/{file_name}.html")
    parsed = parse_list(html)
    write_json(f"results/{file_name}.json", parsed)
    print("parsed")


# parse_from_files(1, 10, "phones-ads")
# parse_list_from_file("cars")

