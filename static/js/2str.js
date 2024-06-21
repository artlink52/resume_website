
// отображение количества резюме талентфорсе
const toggleButtons = document.querySelectorAll('.toggle-button');
        const countSelect = document.getElementById('count-talent');
        const resumes = document.querySelectorAll('.resume_and_func');

        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const resumeContainer = button.previousElementSibling;
                resumeContainer.classList.toggle('expanded');
                if (resumeContainer.classList.contains('expanded')) {
                    button.textContent = 'Скрыть';
                } else {
                    button.textContent = 'Показать больше';
                }
            });
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

// отображение количества резюме в бд

//
// const vacancyNumber = sessionStorage.getItem('vacancyNumber');
//         const vacancyValue = sessionStorage.getItem('vacancyValue');

//         // Отобразить данные на странице
//         if (vacancyNumber && vacancyValue) {
//             document.querySelector('.num-vac').textContent = `Номер вакансии: ${vacancyNumber}`;
//             document.querySelector('.desc-vac').textContent = `Описание вакансии: ${vacancyValue}`;
//         } else {
//             document.querySelector('.vacs').innerHTML = '<p>Вакансия не найдена</p>';
//         }