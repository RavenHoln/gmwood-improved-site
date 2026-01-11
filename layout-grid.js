// ========================================
// Layout Grid - JavaScript для интерактивной сетки
// ========================================

(function() {
    'use strict'; // Строгий режим
    
    // Инициализация при загрузке DOM
    document.addEventListener('DOMContentLoaded', function() {
        initLayoutGrid(); // Инициализация layout grid
    });
    
    // Функция инициализации layout grid
    function initLayoutGrid() {
        const gridContainer = document.querySelector('.layout-grid-container'); // Контейнер сетки
        if (!gridContainer) return; // Выход если контейнера нет
        
        const cards = gridContainer.querySelectorAll('.layout-grid-card'); // Все карточки
        const overlay = document.createElement('div'); // Элемент затемнения
        overlay.className = 'layout-grid-overlay'; // Класс для стилизации
        document.body.appendChild(overlay); // Добавление в DOM
        
        let selectedCard = null; // Выбранная карточка
        
        // Обработчик клика по карточке
        cards.forEach(function(card) {
            card.addEventListener('click', function(e) {
                e.preventDefault(); // Предотвращение перехода по ссылке
                if (selectedCard === card) return; // Если уже выбрана, ничего не делать
                
                openCard(card); // Открытие карточки
            });
        });
        
        // Обработчик клика по overlay (закрытие)
        overlay.addEventListener('click', function() {
            closeCard(); // Закрытие карточки
        });
        
        // Обработчик нажатия Escape (закрытие)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && selectedCard) {
                closeCard(); // Закрытие карточки
            }
        });
        
        // Функция открытия карточки
        function openCard(card) {
            selectedCard = card; // Сохранение выбранной карточки
            
            // Создание модальной карточки
            const expandedCard = createExpandedCard(card); // Создание элемента
            document.body.appendChild(expandedCard); // Добавление в DOM
            
            // Активация overlay
            overlay.classList.add('active'); // Добавление класса active
            
            // Активация модальной карточки (после небольшой задержки для плавности)
            setTimeout(function() {
                expandedCard.classList.add('active'); // Добавление класса active
            }, 10);
        }
        
        // Функция закрытия карточки
        function closeCard() {
            if (!selectedCard) return; // Выход если ничего не выбрано
            
            const expandedCard = document.querySelector('.layout-grid-card-expanded'); // Модальная карточка
            if (expandedCard) {
                expandedCard.classList.remove('active'); // Удаление класса active
                overlay.classList.remove('active'); // Удаление класса active у overlay
                
                // Удаление элемента после анимации
                setTimeout(function() {
                    if (expandedCard.parentNode) {
                        expandedCard.parentNode.removeChild(expandedCard); // Удаление из DOM
                    }
                }, 300); // Задержка для анимации
            }
            
            selectedCard = null; // Сброс выбранной карточки
        }
        
        // Функция создания модальной карточки
        function createExpandedCard(card) {
            const img = card.querySelector('img'); // Изображение из карточки
            const title = card.querySelector('h3') ? card.querySelector('h3').textContent : ''; // Заголовок
            const description = card.querySelector('.product-description') ? card.querySelector('.product-description').textContent : ''; // Описание
            const ctaLink = card.querySelector('.btn-cta') ? card.querySelector('.btn-cta').getAttribute('href') : '#'; // Ссылка CTA
            const ctaText = card.querySelector('.btn-cta') ? card.querySelector('.btn-cta').textContent : 'Заказать консультацию'; // Текст CTA
            
            // Создание контейнера модальной карточки
            const expandedCard = document.createElement('div'); // Создание элемента
            expandedCard.className = 'layout-grid-card-expanded'; // Класс для стилизации
            
            // Создание кнопки закрытия
            const closeBtn = document.createElement('button'); // Создание элемента
            closeBtn.className = 'layout-grid-card-close'; // Класс для стилизации
            closeBtn.innerHTML = '×'; // Символ закрытия
            closeBtn.setAttribute('aria-label', 'Закрыть'); // Доступность
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Остановка всплытия события
                closeCard(); // Закрытие карточки
            });
            
            // Создание контейнера изображения
            const imageContainer = document.createElement('div'); // Создание элемента
            imageContainer.className = 'layout-grid-card-expanded-image'; // Класс для стилизации
            const expandedImg = document.createElement('img'); // Создание элемента
            expandedImg.src = img ? img.src : ''; // Источник изображения
            expandedImg.alt = img ? img.alt : ''; // Альтернативный текст
            imageContainer.appendChild(expandedImg); // Добавление изображения в контейнер
            
            // Создание контейнера контента
            const contentContainer = document.createElement('div'); // Создание элемента
            contentContainer.className = 'layout-grid-card-expanded-content'; // Класс для стилизации
            
            // Создание заголовка
            const titleElement = document.createElement('h3'); // Создание элемента
            titleElement.textContent = title; // Текст заголовка
            contentContainer.appendChild(titleElement); // Добавление заголовка
            
            // Создание описания
            const descElement = document.createElement('div'); // Создание элемента
            descElement.className = 'product-description'; // Класс для стилизации
            descElement.textContent = description; // Текст описания
            contentContainer.appendChild(descElement); // Добавление описания
            
            // Создание кнопки CTA
            const ctaElement = document.createElement('a'); // Создание элемента
            ctaElement.href = ctaLink; // Ссылка
            ctaElement.className = 'btn-cta'; // Класс для стилизации
            ctaElement.textContent = ctaText; // Текст кнопки
            contentContainer.appendChild(ctaElement); // Добавление кнопки
            
            // Сборка модальной карточки
            expandedCard.appendChild(closeBtn); // Добавление кнопки закрытия
            expandedCard.appendChild(imageContainer); // Добавление контейнера изображения
            expandedCard.appendChild(contentContainer); // Добавление контейнера контента
            
            return expandedCard; // Возврат созданного элемента
        }
    }
})();
