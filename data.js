/* data.js - Локальный источник данных */

// Это имя переменной (dishesBackup) должен видеть script.js
const dishesBackup = [
    // ===== СУПЫ (6 шт) =====
    { keyword: "gaspacho", name: "Гаспачо", price: 195, category: "soup", kind: "veg", count: "350 г", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=400&fit=crop" },
    { keyword: "mushroom_soup", name: "Грибной суп-пюре", price: 185, category: "soup", kind: "veg", count: "330 г", image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&h=400&fit=crop" },
    { keyword: "ukha", name: "Уха", price: 270, category: "soup", kind: "fish", count: "330 г", image: "https://ist.say7.info/img0006/54/654_0139t38_6162_1024.jpg" },
    { keyword: "fish_soup_2", name: "Суп из лосося", price: 320, category: "soup", kind: "fish", count: "350 г", image: "https://img.iamcook.ru/2019/upl/recipes/zen/u9661-297c9a8405c0c4f78371b5a882cae5a8.jpg" },
    { keyword: "beef_bouillon", name: "Говяжий бульон", price: 210, category: "soup", kind: "meat", count: "350 г", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPxsNAmpGaxwV2Z8_UqmtXOxOCa96ZNjLMvN9_Bm-d1vRgSCHTt_v9h7s&s=10" },
    { keyword: "chicken_soup", name: "Куриный суп с лапшой", price: 190, category: "soup", kind: "meat", count: "340 г", image: "https://art-lunch.ru/content/uploads/2014/02/chicken-soup-001.jpg" },

    // ===== ГЛАВНЫЕ БЛЮДА (6 шт) =====
    { keyword: "fried_potatoes", name: "Жареная картошка с грибами", price: 150, category: "main", kind: "veg", count: "250 г", image: "https://img.povar.ru/mobile/5d/63/d4/81/jarenaya_kartoshka_s_marinovannimi_gribami-794830.jpg" },
    { keyword: "veg_pasta", name: "Паста с овощами", price: 280, category: "main", kind: "veg", count: "300 г", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=400&fit=crop" },
    { keyword: "lasagna", name: "Лазанья", price: 385, category: "main", kind: "meat", count: "310 г", image: "https://images.unsplash.com/photo-1579631542720-3a87824fff86?w=400&h=400&fit=crop" },
    { keyword: "beef_stroganoff", name: "Бефстроганов", price: 380, category: "main", kind: "meat", count: "300 г", image: "https://art-lunch.ru/wp-content/uploads/2016/04/Beef_Stroganoff_01.jpg" },
    { keyword: "salmon_steak", name: "Стейк из лосося", price: 450, category: "main", kind: "fish", count: "250 г", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop" },
    { keyword: "fish_cakes", name: "Рыбные котлеты", price: 310, category: "main", kind: "fish", count: "300 г", image: "https://images.gastronom.ru/e-TRMpM4hmxYGFkJjhH2q8fVUjrrTT1XLgcMFqTqzHo/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzgzN2ZjODVjLWIyZjAtNGFmZi1iMGE4LTA1Mjc2NTU5NGE5Ni5qcGc.webp" },

    // ===== САЛАТЫ И СТАРТЕРЫ (6 шт) =====
    { keyword: "caesar_salad", name: "Цезарь с курицей", price: 250, category: "starter", kind: "meat", count: "220 г", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=400&fit=crop" },
    { keyword: "greek_salad", name: "Греческий салат", price: 210, category: "starter", kind: "veg", count: "230 г", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop" },
    { keyword: "tomato_salad", name: "Салат с помидорами и моцареллой", price: 190, category: "starter", kind: "veg", count: "200 г", image: "https://www.djurenko.com/wp-content/uploads/2013/08/insalata-caprese_07.jpg" },
    { keyword: "olivier", name: "Оливье", price: 220, category: "starter", kind: "veg", count: "250 г", image: "https://www.torchyn.ua/sites/default/files/styles/webp/public/2024-03/IMG_2539.JPG.webp?itok=WQS8lmCm" },
    { keyword: "herring", name: "Селёдка под шубой", price: 240, category: "starter", kind: "fish", count: "210 г", image: "https://cooklikemary.ru/sites/default/files/styles/width_700/public/ad292250-bcc7-44b2-aad4-c2b8a3aea0ac.jpeg?itok=rtvfCswc" },
    { keyword: "veg_sticks", name: "Овощные палочки с хумусом", price: 160, category: "starter", kind: "veg", count: "200 г", image: "https://eda-priroda.ru/upload/iblock/882/2t30qbxfrzpndg703jfpz4djr7tq61r4.jpg" },

    // ===== НАПИТКИ (6 шт) =====
    { keyword: "orange_juice", name: "Апельсиновый сок", price: 120, category: "drink", kind: "cold", count: "300 мл", image: "https://www.yamdiet.com/wp-content/uploads/02-6.jpg" },
    { keyword: "apple_juice", name: "Яблочный сок", price: 90, category: "drink", kind: "cold", count: "300 мл", image: "https://hurom.com.ua/wp-content/uploads/2023/10/front-view-of-fresh-natural-delicious-juice-in-two-glasses-with-red-apple-limes-on-black-background-scaled.jpg" },
    { keyword: "kvass", name: "Квас", price: 110, category: "drink", kind: "cold", count: "300 мл", image: "https://bober.ru/sites/default/files/styles/large/public/2020-06/head-images/shutterstock_1294826314.jpg?itok=v7qvSYPR" },
    { keyword: "black_tea", name: "Чёрный чай", price: 70, category: "drink", kind: "hot", count: "300 мл", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn-TmnLpqb7E4uR7lv2_4HsIN9Q9CiJ20cuFmApviBFj2zbDyZYaWbAts&s=10" },
    { keyword: "green_tea", name: "Зелёный чай", price: 80, category: "drink", kind: "hot", count: "300 мл", image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&h=400&fit=crop" },
    { keyword: "coffee", name: "Американо", price: 100, category: "drink", kind: "hot", count: "250 мл", image: "https://www.nestleprofessional.ru/sites/default/files/styles/450px_width/public/2024-10/639140596_0.jpg" },

    // ===== ДЕСЕРТЫ (6 шт) =====
    { keyword: "brownie", name: "Брауни", price: 150, category: "dessert", kind: "small", count: "120 г", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop" },
    { keyword: "cheesecake", name: "Чизкейк", price: 200, category: "dessert", kind: "small", count: "130 г", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=400&fit=crop" },
    { keyword: "ice_cream", name: "Мороженое", price: 100, category: "dessert", kind: "small", count: "100 г", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop" },
    { keyword: "pancakes", name: "Блины со сгущёнкой", price: 180, category: "dessert", kind: "medium", count: "180 г", image: "https://s1.eda.ru/StaticContent/Photos/3/220305174744/p_O.jpg" },
    { keyword: "waffles", name: "Вафли с ягодами", price: 190, category: "dessert", kind: "medium", count: "170 г", image: "https://cdn.7days.ru/pic/110/988823/1488343/90.jpg" },
    { keyword: "cake", name: "Торт Наполеон", price: 250, category: "dessert", kind: "large", count: "250 г", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" }
];
