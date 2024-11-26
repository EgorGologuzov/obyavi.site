import ads from './db/ads.json';
import users from './db/users.json';
import props from './db/props.json';

export function useAdService() {
    return fakeService;
}

const pageSize = 8;

const fakeService = {
    getMyAds({ page, userId }) {
        const myAds = ads.filter((ad) => Number(ad.owner) === Number(userId))
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        const result = {
            totalPages: Math.ceil(myAds.length / pageSize),
            list: myAds.slice(start, end).map((ad) => JSON.parse(JSON.stringify(ad)))
        };

        return new Promise((resolve, _) => setTimeout(() => resolve(result), 500));
    },

    publish({ idList }) {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                ads.forEach((ad) => {
                    if (idList.includes(ad.id)) {
                        ad.main.status = "published";
                    }
                })
                resolve({ result: "ok" });
                console.log("Publish", idList);
            }, 500);
        })
    },

    unpublish({ idList }) {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                ads.forEach((ad) => {
                    if (idList.includes(ad.id)) {
                        ad.main.status = "unpublished";
                    }
                })
                resolve({ result: "ok" });
                console.log("Unpublish", idList);
            }, 500);
        })
    },

    delete({ idList }) {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                ads = ads.filter((ad) => !idList.includes(ad.id));
                resolve({ result: "ok" });
                console.log("Delete", idList);
            }, 500);
        })
    },

    getById({ id }) {
        const result = ads.find((ad) => ad.id == id);
        return new Promise((resolve, _) => setTimeout(() => resolve(result), 500));
    },

    getOwner({ ownerId }) {
        const result = users.find((user) => user.id == ownerId);
        return new Promise((resolve, _) => setTimeout(() => resolve(result), 500));
    },

    getAllProps({ categoryStr }) {
        const categoryList = categoryStr.split(">");
        const allProps = []
        categoryList.forEach((cat, _) => {
            const propsForCat = props[cat]
            if (propsForCat) {
                allProps.push(...propsForCat);
            }
        })
        
        return new Promise((resolve, _) => setTimeout(() => resolve(allProps), 500));
    },

    update({ updateData }) {
        const old = ads.find((ad) => ad.id == updateData.id);
        const updatedAd = { ...old, ...updateData }
        const index = ads.indexOf(old);
        ads[index] = updatedAd;

        return new Promise((resolve, _) => {
            setTimeout(() => {
                resolve(updatedAd)
            }, 500)
        })
    }
}