import myAds from './db/my-ads.json';

export function useAdService() {
    return fakeService;
}

const pageSize = 6;

const fakeService = {
    getMyAds({ page }) {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                const start = (page - 1) * pageSize;
                const end = start + pageSize;
                resolve({
                    totalPages: Math.ceil(myAds.length / pageSize),
                    list: myAds.slice(start, end)
                })
            }, 500);
        })
    },

    publish({ idList }) {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                myAds.forEach((ad) => {
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
                myAds.forEach((ad) => {
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
                myAds = myAds.filter((ad) => !idList.includes(ad.id));
                resolve({ result: "ok" });
                console.log("Delete", idList);
            }, 500);
        })
    }
}