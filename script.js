// script.js

let dishes = [];

const selectedDishes = {
    soup: null,
    main: null,
    starter: null,
    drink: null,
    dessert: null
};

// ========== ЗАГРУЗКА ДАННЫХ (ЧИСТО ЛОКАЛЬНО + ФОНОВОЙ API) ==========
async function loadDishes() {
    // 1. МГНОВЕННО загружаем локальные данные
    if (typeof dishesBackup !== 'undefined' && dishesBackup.length > 0) {
        dishes = dishesBackup;
        console.log("Данные загружены из локального файла data.js");
        renderMenu();
        updateOrderUI();
    } else {
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.innerHTML = `<div style="text-align: center; padding: 50px;">Ошибка: не найден локальный файл data.js</div>`;
        }
        return;
    }


    
    // ВАЖНО: Эта ссылка строго по заданию для хостингов типа Render/Netlify
    const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';
    
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            dishes = data;
            console.log("Данные обновлены с сервера Политеха!");
            renderMenu();
            updateOrderUI();
        }
    } catch (error) {
        // Игнорируем ошибку, так как сайт уже работает на локальных данных
        console.log("Сервер Политеха не ответил. Работаем локально.");
    }
}

// ========== ОТРИСОВКА ==========
function sortDishesByAlphabet(arr) {
    return arr.sort((a, b) => a.name.localeCompare(b.name));
}

function renderMenu() {
    const categories = ['soup', 'main', 'starter', 'drink', 'dessert'];

    categories.forEach(function(category) {
        let categoryDishes = dishes.filter(function(dish) {
            return dish.category === category;
        });
        
        categoryDishes = sortDishesByAlphabet(categoryDishes);
        const container = document.getElementById('menu-' + category);
        if (!container) return;

        let html = '';
        container.dataset.allDishes = JSON.stringify(categoryDishes);

        categoryDishes.forEach(function(dish) {
            html += `
                <div class="menu-card" data-dish="${dish.keyword}" data-kind="${dish.kind}">
                    <img src="${dish.image}" alt="${dish.name}">
                    <p class="price">${dish.price} руб.</p>
                    <p class="name">${dish.name}</p>
                    <p class="weight">${dish.count}</p>
                    <button class="add-btn">Добавить</button>
                </div>
            `;
        });

        container.innerHTML = html;
    });

    var buttons = document.querySelectorAll('.add-btn');
    buttons.forEach(function(btn) {
        btn.addEventListener('click', handleAddClick);
    });

    setupFilters();
}

// ========== ФИЛЬТРЫ ==========
function setupFilters() {
    const categories = ['soup', 'main', 'starter', 'drink', 'dessert'];

    categories.forEach(function(category) {
        const filterContainer = document.getElementById('filters-' + category);
        if (!filterContainer) return;
        
        const buttons = filterContainer.querySelectorAll('.filter-btn');
        const menuContainer = document.getElementById('menu-' + category);

        buttons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const isActive = btn.classList.contains('active');
                buttons.forEach(function(b) { b.classList.remove('active'); });

                if (isActive) {
                    showAllDishes(menuContainer, category);
                } else {
                    btn.classList.add('active');
                    const kind = btn.dataset.kind;
                    filterDishesByKind(menuContainer, category, kind);
                }
            });
        });
    });
}

function filterDishesByKind(container, category, kind) {
    const allDishes = JSON.parse(container.dataset.allDishes);
    const filtered = allDishes.filter(function(dish) {
        return dish.kind === kind;
    });
    renderDishesInContainer(container, filtered);
}

function showAllDishes(container, category) {
    const allDishes = JSON.parse(container.dataset.allDishes);
    renderDishesInContainer(container, allDishes);
}

function renderDishesInContainer(container, dishesArray) {
    let html = '';
    dishesArray.forEach(function(dish) {
        html += `
            <div class="menu-card" data-dish="${dish.keyword}" data-kind="${dish.kind}">
                <img src="${dish.image}" alt="${dish.name}">
                <p class="price">${dish.price} руб.</p>
                <p class="name">${dish.name}</p>
                <p class="weight">${dish.count}</p>
                <button class="add-btn">Добавить</button>
            </div>
        `;
    });
    container.innerHTML = html;

    var buttons = container.querySelectorAll('.add-btn');
    buttons.forEach(function(btn) {
        btn.addEventListener('click', handleAddClick);
    });
    updateOrderUI();
}

// ========== ДОБАВЛЕНИЕ В КОРЗИНУ ==========
function handleAddClick(event) {
    var card = event.target.closest('.menu-card');
    var dishKeyword = card.dataset.dish;

    var dish = dishes.find(function(d) {
        return d.keyword === dishKeyword;
    });
    
    if (!dish) return;

    selectedDishes[dish.category] = dish;
    updateOrderUI();
}

function updateOrderUI() {
    var categories = ['soup', 'main', 'starter', 'drink', 'dessert'];
    var categoryTitles = {
        soup: 'Суп',
        main: 'Главное блюдо',
        starter: 'Салат/Стартер',
        drink: 'Напиток',
        dessert: 'Десерт'
    };
    
    var totalPrice = 0;
    var hasSelection = false;
    var hiddenInputsHtml = '';

    categories.forEach(function(category) {
        var container = document.getElementById('selected-' + category);
        if (!container) return;
        
        var title = container.querySelector('h4');
        var content = container.querySelector('.selected-content');
        
        var dish = selectedDishes[category];

        if (dish) {
            title.style.display = 'block';
            content.innerHTML = `
                <div class="selected-item">
                    <span>${dish.name}</span>
                    <span>${dish.price} руб.</span>
                </div>
            `;
            totalPrice += dish.price; 
            hasSelection = true;
            hiddenInputsHtml += '<input type="hidden" name="' + category + '" value="' + dish.keyword + '">';
        } else {
            title.style.display = 'none';
            content.innerHTML = '<p class="empty-msg">' + categoryTitles[category] + ' не выбран</p>';
        }
    });

    if (!hasSelection) {
        categories.forEach(function(category) {
            var container = document.getElementById('selected-' + category);
            if (!container) return;
            var title = container.querySelector('h4');
            var content = container.querySelector('.selected-content');
            title.style.display = 'none';
            content.innerHTML = '<p class="empty-msg">Ничего не выбрано</p>';
        });
        var totalBlock = document.getElementById('order-total');
        if (totalBlock) totalBlock.style.display = 'none';
        
        var hiddenContainer = document.getElementById('hidden-inputs-container');
        if (hiddenContainer) hiddenContainer.innerHTML = '';
    } else {
        var totalBlock = document.getElementById('order-total');
        if (totalBlock) {
            totalBlock.style.display = 'block';
            var priceSpan = document.getElementById('total-price');
            if (priceSpan) priceSpan.textContent = totalPrice; 
        }

        var hiddenContainer = document.getElementById('hidden-inputs-container');
        if (hiddenContainer) hiddenContainer.innerHTML = hiddenInputsHtml;
    }

    var allCards = document.querySelectorAll('.menu-card');
    allCards.forEach(function(card) {
        card.classList.remove('selected');
        var dishKeyword = card.dataset.dish;
        for (var cat in selectedDishes) {
            if (selectedDishes[cat] && selectedDishes[cat].keyword === dishKeyword) {
                card.classList.add('selected');
            }
        }
    });
}

// ========== УВЕДОМЛЕНИЯ ==========
function showModal(emoji, text) {
    var existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    var box = document.createElement('div');
    box.className = 'modal-box';

    var emojiEl = document.createElement('div');
    emojiEl.className = 'modal-emoji';
    emojiEl.textContent = emoji;

    var textEl = document.createElement('div');
    textEl.className = 'modal-text';
    textEl.textContent = text;

    var btn = document.createElement('button');
    btn.className = 'modal-btn';
    btn.textContent = 'Окей';

    box.appendChild(emojiEl);
    box.appendChild(textEl);
    box.appendChild(btn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    btn.addEventListener('click', function() {
        overlay.remove();
    });
}

document.getElementById('orderForm').addEventListener('submit', function(event) {
    var isSoup = selectedDishes.soup !== null;
    var isMain = selectedDishes.main !== null;
    var isStarter = selectedDishes.starter !== null;
    var isDrink = selectedDishes.drink !== null;
    var isDessert = selectedDishes.dessert !== null;

    if (!isSoup && !isMain && !isStarter && !isDrink && !isDessert) {
        event.preventDefault();
        showModal('😕', 'Ничего не выбрано. Выберите блюда для заказа');
        return;
    }

    if (isSoup && isMain && isStarter && isDrink) return;
    if (isSoup && isMain && isDrink && !isStarter) return;
    if (isSoup && isStarter && isDrink && !isMain) return;
    if (isMain && isStarter && isDrink && !isSoup) return;
    if (isMain && isDrink && !isSoup && !isStarter) return;

    event.preventDefault();

    if (isSoup && !isMain && !isStarter) {
        showModal('🧐', 'Выберите главное блюдо/салат/стартер');
        return;
    }
    if (isStarter && !isSoup && !isMain) {
        showModal('🧐', 'Выберите суп или главное блюдо');
        return;
    }
    if (isMain && !isDrink) {
        showModal('🧐', 'Выберите напиток');
        return;
    }
    if (isMain && isDrink && !isSoup && !isStarter) {
        showModal('🧐', 'Выберите суп или салат/стартер');
        return;
    }
    if ((isDrink || isDessert) && !isMain && !isSoup) {
        showModal('🧐', 'Выберите главное блюдо');
        return;
    }
    showModal('🤔', 'Выберите блюда, чтобы собрать один из вариантов ланча');
});

// ========== ЗАПУСК ==========
document.addEventListener('DOMContentLoaded', function() {
    loadDishes();
});
