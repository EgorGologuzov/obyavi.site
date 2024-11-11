export function useAdService(){
    return fakeService;
}

const fakeAds=[
    {
        id:1,
        userId: 3,
        title:'Title 1',
        description: "description description descriptiondescription description descriptiondescription description description",
        img:("https://alpinabook.ru/upload/resize_cache/iblock/8d9/550_800_1/8d9cd63476f15e85f0d8796555ab1e6b.jpg"),
        creationDate:'03.11.2024',
        price:12.19,
    },
    {
        id:2,
        userId: 4,
        title:'Title 2',
        description: "new description new description new description new description new description",
        img:("https://alpinabook.ru/upload/resize_cache/iblock/8d9/550_800_1/8d9cd63476f15e85f0d8796555ab1e6b.jpg"),
        creationDate:'04.11.2024',
        price:12.1,
    },
    {
        id:3,
        userId: 4,
        title:'Title 3',
        description: "new description1 new description1 new description1 new description1 new description1",
        img:("https://alpinabook.ru/upload/resize_cache/iblock/8d9/550_800_1/8d9cd63476f15e85f0d8796555ab1e6b.jpg"),
        creationDate:'05.11.2024',
        price:12.3,
    }
]

const fakeService={
    getAds(){
        return fakeAds
    },
    getAdsByTitle(title){
        return fakeAds.filter((item)=>item.title==title);
    }
}