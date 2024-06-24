document.addEventListener('DOMContentLoaded', function() {
    var toggleLink = document.getElementById('toggleLink1');
    var subNav = document.getElementById('subNav1');
    var radioInputs = document.querySelectorAll('.sub-nav-how input[type="radio"]');

    toggleLink.addEventListener('click', function(event) {
        event.stopPropagation();
        if (subNav.style.display === 'none' || subNav.style.display === '') {
            subNav.style.display = 'block';
        } else {
            subNav.style.display = 'none';
        }
    });

    

    // Обработчик изменения радиокнопок
    radioInputs.forEach(function(radioInput) {
        radioInput.addEventListener('change', function() {
            if (this.checked) {
                toggleLink.textContent = this.parentElement.textContent.trim();
                // subNav.style.display = 'none'; // Закрываем подменю после выбора
            }
        });
    });

    // Закрытие подменю при клике вне него
    document.addEventListener('click', function(event) {
        if (!toggleLink.contains(event.target) && !subNav.contains(event.target)) {
            subNav.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleLink = document.getElementById('toggleLink1');

    toggleLink.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем действие ссылки по умолчанию
        toggleLink.classList.toggle('expanded'); // Переключаем класс expanded при клике
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const toggleLink = document.getElementById('toggleLink2');

    toggleLink.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем действие ссылки по умолчанию
        toggleLink.classList.toggle('expanded'); // Переключаем класс expanded при клике
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var toggleLink = document.getElementById('toggleLink2');
    var subNav = document.getElementById('subNav2');
    var radioInputs = document.querySelectorAll('.sub-nav-where input[type="radio"]');

    toggleLink.addEventListener('click', function(event) {
        event.stopPropagation();
        if (subNav.style.display === 'none' || subNav.style.display === '') {
            subNav.style.display = 'block';
        } else {
            subNav.style.display = 'none';
        }
    });

    // Обработчик изменения радиокнопок
    radioInputs.forEach(function(radioInput) {
        radioInput.addEventListener('change', function() {
            if (this.checked) {
                toggleLink.textContent = this.parentElement.textContent.trim();
                // subNav.style.display = 'none'; // Закрываем подменю после выбора
            }
        });
    });

    // Закрытие подменю при клике вне него
    document.addEventListener('click', function(event) {
        if (!toggleLink.contains(event.target) && !subNav.contains(event.target)) {
            subNav.style.display = 'none';
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const toggleLink = document.getElementById('toggleLink2');
    const checkboxes = document.querySelectorAll('.sub-nav-where input[type="checkbox"]');
    const subNavExperienceCheckboxes = document.querySelectorAll('.sub-nav-where-experience input[type="checkbox"]');
    const everywhereCheckbox = document.querySelector('.sub-nav-where input[value="everywhere"]');
    const experienceCheckbox = document.querySelector('.sub-nav-where input[value="experience"]');
    
    // Функция для обновления текста ссылки в зависимости от выбранных чекбоксов
    function updateLinkText() {
        const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked && checkbox.value !== 'everywhere');
        
        if (everywhereCheckbox.checked) {
            toggleLink.textContent = 'Везде';
        } else if (checkedCheckboxes.length === 0) {
            toggleLink.textContent = 'Выберите место';
        } else {
            let text = checkedCheckboxes.map(checkbox => checkbox.parentElement.textContent.trim()).join(', ');
            
            if (experienceCheckbox.checked) {
                const experienceText = getSelectedExperienceText();
                if (experienceText !== '') {
                    text += ` (${experienceText})`;
                }
            }
            
            toggleLink.textContent = text;
        }
    }
    
    // Функция для получения текста выбранных пунктов в подменю "В опыте работы"
    function getSelectedExperienceText() {
        const selectedExperience = [];
        subNavExperienceCheckboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                selectedExperience.push(checkbox.parentElement.textContent.trim());
            }
        });
        return selectedExperience.length > 0 ? `В опыте работы: ${selectedExperience.join(', ')}` : '';
    }
    
    // Обработчик для чекбоксов в основном меню
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (checkbox.value === 'everywhere' && checkbox.checked) {
                checkboxes.forEach(function(cb) {
                    cb.checked = true;
                });
                subNavExperienceCheckboxes.forEach(function(cb) {
                    cb.checked = true;
                });
                updateLinkText();
            } else if (checkbox.value === 'everywhere' && !checkbox.checked) {
                checkboxes.forEach(function(cb) {
                    if (cb !== everywhereCheckbox) {
                        cb.checked = false;
                    }
                });
                updateLinkText();
            } else if (checkbox.value === 'experience' && !checkbox.checked) {
                subNavExperienceCheckboxes.forEach(function(cb) {
                    cb.checked = false;
                });
                updateLinkText();
            } else {
                if (!checkbox.checked && checkbox.value !== 'everywhere') {
                    checkboxes[0].checked = false;
                }
                updateLinkText();
            }
        });
    });
    
    // Обработчик для чекбоксов в подменю опыта работы
    subNavExperienceCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            updateLinkText();
        });
    });
    
    // Инициализация текста ссылки при загрузке страницы
    updateLinkText();
});


// ОТПРАВКА ДАННЫХ НА СЕРВЕР (ПОКА ЛОКАЛЬНЫЙ)
// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('keywordsForm');

//     form.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const keywordsInput = document.getElementById('keywords-input').value;
//         const keywordsArray = keywordsInput.split(' ').filter(Boolean);

//         const data = {
//             keywords: keywordsArray
//         };

//         try {
//             const response = await fetch('/submit', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             });

//             if (!response.ok) {
//                 throw new Error(`Network response was not ok: ${response.statusText}`);
//             }

//             const result = await response.json();
            
//             console.log('Success:', result);
            
//         } catch (error) {
//             console.error('There was a problem with the fetch operation:', error);
//         }
//     });
// });


// const form = document.querySelector('.form');
// const submitButton = document.getElementById('submit-btn');
// // const uid = document.querySelector('.uid__form');

// submitButton.addEventListener('click', function(event) {
//     event.preventDefault();  // Предотвращаем стандартное действие кнопки

//     // Доступ к форме и отправка данных
//     form.submit();
//     // uid.submit();
// });

