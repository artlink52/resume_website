document.addEventListener('DOMContentLoaded', function() {
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

            // Проверяем высоту .resume
            if (resumeContainer.clientHeight < 200) {
                button.style.display = 'none'; 
            } else {
                button.style.display = 'block'; 
            }
        });

        // Проверяем высоту .resume при инициализации
        const resumeContainer = button.previousElementSibling;
        if (resumeContainer.clientHeight < 200) {
            button.style.display = 'none'; 
        }
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
