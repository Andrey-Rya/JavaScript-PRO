const reviewKey = 'reviews';
const allReviews = JSON.parse(localStorage.getItem(reviewKey));
const container = document.querySelector('.container');

// Получение данных
function fetchReviews() {
    return new Promise((resolve, reject) => {
        if (allReviews) {
            resolve(allReviews);
        } else {
            reject(new Error('Отзывов нет :('));
        }
    })
}

// Отрисовка + взаимодействие внутри
function renderReviews(reviews) {
    reviews.forEach(({ name, text }) => {
        const reviewEl = `
        <div class="review">
        <h2 class="name">${name}</h2>
        <button class="view-button">Показать отзыв</button>
        <div class="review-block" style="display: none">
        <p class="text">${text}</p>
        <button class="remove-button">Удалить</button>
        </div>
        </div>
        `
        container.insertAdjacentHTML("beforeend", reviewEl);
    });

    const buttonsView = document.querySelectorAll('.view-button');
    buttonsView.forEach(button => {
        button.addEventListener("click", () => {
            const reviewBlock = findElement(button, '.review-block');
            toggleReviewButton(button, reviewBlock)
        });
    });

    const buttonsRemove = document.querySelectorAll('.remove-button');
    removeReview(buttonsRemove);

};

// Удаление блока с продуктом по клику
function removeReview(buttons) {
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const review = button.closest('.review');
            const reviewText = review.querySelector('.text').textContent;
            console.log(review);
            console.log(reviewText);
            const index = allReviews.findIndex(item => item.text === reviewText);
            if (index !== -1) {
                allReviews.splice(index, 1);
            }
            localStorage.setItem(reviewKey, JSON.stringify(allReviews));

            review.remove();
        })
    });
}

// Поиск элемента для дальнейшей работы с ним
function findElement(element, selector) {
    let sibling = element.nextElementSibling;
    while (sibling) {
        if (sibling.matches(selector)) {
            return sibling;
        } else {
            const matchedChild = sibling.querySelector(selector);
            if (matchedChild) {
                return matchedChild;
            }
        }
        sibling = sibling.nextElementSibling;
    }
    return null;
}

// Меняет стили скрыть/показать отзыв
function toggleReviewButton(button, block) {
    if (block.style.display === 'none') {
        button.textContent = 'Скрыть текст';
        block.style.display = 'block';
    } else {
        button.textContent = 'Показать отзыв';
        block.style.display = 'none';
    }
}

fetchReviews()
    .then((reviews) =>
        renderReviews(reviews)
    )
    .catch((error) => console.log(error.message));