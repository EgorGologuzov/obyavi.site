import { cleanPhone } from "../utils/utils";

export function useUserService() {
    return fakeService;
}

const fakeAccounts = [
    {
        id: 1,
        role: "moder",
        phone: "+70000000001",
        theme: "light",
        lastname: "Гологузов",
        firstname: "Егор",
        email: "egor@mail.ru"
    },
    {
        id: 2,
        role: "moder",
        phone: "+70000000002",
        theme: "dark",
        lastname: "Ермолин",
        firstname: "Артем",
        email: "artem@mail.ru"
    },
    {
        id: 3,
        role: "client",
        phone: "+70000000003",
        theme: "dark",
        lastname: "Трамп",
        firstname: "Дональд",
        email: "trump@mail.ru",
        avatar: "https://alpinabook.ru/upload/resize_cache/iblock/8d9/550_800_1/8d9cd63476f15e85f0d8796555ab1e6b.jpg",
        location: 'г. Омск, Самарская обл.',
        regDate: '01.11.2024',
        birthDate: '02.02.1952',
        description:'Американский государственный и политический деятель, предприниматель, миллиардер, 45-й президент США с 20 января 2017 по 20 января 2021 года от Республиканской партии.',
        rating: 4,
        favoriteAds:[1,2],
    },
    {
        id: 4,
        role: "client",
        phone: "+70000000004",
        theme: "light",
        lastname: "Харрис",
        firstname: "Камала",
        email: "harris@mail.ru",
        avatar: "https://iv.kommersant.ru/Issues.photo/DAILY/2024/158/KMO_162543_54330_1_t222_180737.jpg",
        location: 'г. Омск, Самарская обл.',
        regDate: '01.11.2024',
        birthDate: '02.02.1952',
        description:'Американский государственный и политический деятель, предприниматель, миллиардер, 45-й президент США с 20 января 2017 по 20 января 2021 года от Республиканской партии.',
        rating: 4,
        favoriteAds:[],
    }
]

const fakeRecovaryRequests = {}

const fakeService = {
    signIn({ login }) {
        login = cleanPhone(login);

        return new Promise((resolve, reject) => {
            const user = fakeAccounts.find((element) => element.phone === login);
            setTimeout(() => {
                user ? resolve(user) : reject(new Error("Неверный логин или пароль"));
                console.log("Авторизация", user);
            }, 500);
        })
    },

    signOut() {
        return;
    },

    reg(data) {
        const user = {
            ...data,
            id: Math.round(Math.random() * 100_000_000_000),
            role: "client",
            theme: "light",
            phone: cleanPhone(data.phone)
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const findUser = fakeAccounts.find((element) => element.phone === user.phone);

                if (findUser) {
                    reject(new Error("Аккаунт с этим номером уже существует"));
                    return;
                } 

                fakeAccounts.push(user);
                resolve(user);
                console.log("Регистрация", user);

            }, 500);
        })
    },

    sendRecoveryRequest({ phone }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const findUser = fakeAccounts.find((element) => element.phone === cleanPhone(phone));

                if (!findUser) {
                    reject(new Error("Аккаунт с этим номером не найден"));
                    return;
                } 

                const newRecoveryRequest = {
                    phone: cleanPhone(findUser.phone),
                    recoveryCode: Math.round(Math.random() * 100_000_000_000)
                }

                fakeRecovaryRequests[cleanPhone(phone)] = (newRecoveryRequest);

                resolve({ email: findUser.email });

                alert("Код восстановления: " + newRecoveryRequest.recoveryCode);

            }, 500);
        })
    },

    finishRecovery({ phone, recoveryCode }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const findRequest = fakeRecovaryRequests[cleanPhone(phone)];

                if (!findRequest) {
                    reject(new Error("На этот номер не поступало запросов восстановления"));
                    return;
                }

                if (findRequest.recoveryCode.toString() !== recoveryCode.toString()) {
                    reject(new Error("Код не совпадает"));
                    return;
                } 

                fakeRecovaryRequests[cleanPhone(phone)] = undefined;
                resolve({ success: true });

            }, 500);
        })
    },

    changePassword({ phone, newPassword }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const findUser = fakeAccounts.find((element) => element.phone === cleanPhone(phone));

                if (!findUser) {
                    reject(new Error("Аккаунт с этим номером не найден"));
                    return;
                }

                resolve({ login: findUser.phone });

            }, 500);
        })
    },

    getUsers(){
        return fakeAccounts;
    },

    getUserById(id){
        return fakeAccounts.find((user)=>user.id==id);
    }
}