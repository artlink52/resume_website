document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-button');
    const countSelect = document.getElementById('count-talent');
    const resumes = document.querySelectorAll('.resume_and_func-talent');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const resumeContainer = button.previousElementSibling;
            resumeContainer.classList.toggle('expanded');
            if (resumeContainer.classList.contains('expanded')) {
                button.textContent = 'Скрыть';
            } else {
                button.textContent = 'Показать больше';
            }

            //Проверяем высоту .resume
            // if (resumeContainer.clientHeight < 201) {
            //     button.style.display = 'none'; 
            // } else {
            //     button.style.display = 'block'; 
            // }
        });

        // Проверяем высоту .resume при инициализации
        // const resumeContainer = button.previousElementSibling;
        // if (resumeContainer.clientHeight < 201) {
        //     button.style.display = 'none'; 
        // }
    });

    function updateResumeDisplay() {
        const selectedValue = countSelect.value;
        let resumeCount = selectedValue === 'all' ? resumes.length : parseInt(selectedValue);

        for (let i = 0; i < resumes.length; i++) {
            if (i < resumeCount) {
                resumes[i].style.display = 'block';
            } else {
                resumes[i].style.display = 'none';
            }
        }
    }

    countSelect.addEventListener('change', () => {
        updateResumeDisplay();
    });

    // Инициализация
    updateResumeDisplay();
});


// добавление функ-ти кнопкам подходит не подходит

function handleClickTalent(button, action) {
    // Находим родительский элемент, содержащий кнопку
    var parent = button.closest('.resume_and_func-talent');

    // Находим элемент с классом "status-text"
    var statusText = parent.querySelector('.status-text-talent');

    // В зависимости от действия, изменяем текст и стиль элемента "status-text"
    if (action === 'add') {
        statusText.innerText = "Добавлен";
        statusText.style.color = "green";
    } else if (action === 'reject') {
        statusText.innerText = "Отказ";
        statusText.style.color = "red";
    }
}

function handleClickDb(button, action) {
    // Находим родительский элемент, содержащий кнопку
    var parent = button.closest('.resume_and_func-db');

    // Находим элемент с классом "status-text"
    var statusText = parent.querySelector('.status-text-db');

    // В зависимости от действия, изменяем текст и стиль элемента "status-text"
    if (action === 'add') {
        statusText.innerText = "Добавлен";
        statusText.style.color = "green";
    } else if (action === 'reject') {
        statusText.innerText = "Отказ";
        statusText.style.color = "red";
    }
}

// хранение добавленных рез.ме
// Массив для хранения добавленных кандидатов
var addedCandidates = [];

// Обработчик клика по кнопкам "Подходит" и "Не подходит"
function handleClickTalent(button, action) {
    var parent = button.closest('.resume_and_func-talent');
    var key = parent.querySelector('h3').innerText.trim();
    var id = parent.querySelector('.candidate-id').innerText.trim();
    
    var candidateInfo = {
        key: key,
        id: id
    };

    var statusText = parent.querySelector('.status-text-talent');
    if (action === 'add') {
        statusText.innerText = "Добавлен";
        statusText.style.color = "green";
        addedCandidates.push(candidateInfo); // Добавляем кандидата в массив
    } else if (action === 'reject') {
        statusText.innerText = "Отказ";
        statusText.style.color = "red";
        addedCandidates = addedCandidates.filter(function(candidate) {
            return candidate.key !== candidateInfo.key;
        });
    }
}

// Функция для отправки данных на сервер при клике на кнопку "Выгрузить все подходящие резюме"
// function sendCandidatesToServer() {
//     // Выполняем POST запрос на сервер FastAPI
//     fetch('/process-resumes', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(addedCandidates)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Произошла ошибка при отправке данных на сервер');
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Переходим на страницу 3str.html после успешной отправки данных
//         window.location.href = '/get-added-candidates';
//     })
//     .catch(error => {
//         console.error('Ошибка:', error);
//         // Обработка ошибок, если необходимо
//     });
// }
