// document.addEventListener('DOMContentLoaded', function() {
//     const keywordsContainer = document.getElementById('keywords-container');
//     const logicalOperatorContainer = document.querySelector('.logical-operator-container');
    
//     function updateLogicalOperatorVisibility() {
//         const keywordsEntries = document.querySelectorAll('.keywords-entry');
//         if (keywordsEntries.length >= 2) {
//             logicalOperatorContainer.style.display = 'flex';
//         } else {
//             logicalOperatorContainer.style.display = 'none';
//         }
//     }

//     document.getElementById('add-keywords-btn').addEventListener('click', function() {
//         var originalEntry = document.querySelector('.keywords-entry');
//         var newEntry = originalEntry.cloneNode(true);

//         var inputs = newEntry.getElementsByTagName('input');
//         for (var i = 0; i < inputs.length; i++) {
//             if (inputs[i].type === 'text') {
//                 inputs[i].value = '';
//             } else if (inputs[i].type === 'radio' || inputs[i].type === 'checkbox') {
//                 inputs[i].checked = false;
//             }
//         }

//         keywordsContainer.appendChild(newEntry);

//         // Initialize navigation for the new entry
//         var toggleLinks = newEntry.querySelectorAll('.nav-list__link.toggle-link');
//         toggleLinks.forEach(function(toggleLink) {
//             var subNav = toggleLink.nextElementSibling;
//             var radioInputs = subNav.querySelectorAll('input[type="radio"]');
//             var checkboxInputs = subNav.querySelectorAll('input[type="checkbox"]');
//             initializeNav(toggleLink, subNav, radioInputs, checkboxInputs);
//         });

//         updateLogicalOperatorVisibility(); // Update visibility of logical operators
//     });

//     document.getElementById('delete-keywords-btn').addEventListener('click', function() {
//         var keywordsEntries = document.querySelectorAll('.keywords-entry');
//         if (keywordsEntries.length > 1) {
//             keywordsEntries[keywordsEntries.length - 1].remove();
//         }
//         updateLogicalOperatorVisibility(); // Update visibility of logical operators
//     });

//     function initializeNav(toggleLink, subNav, radioInputs, checkboxInputs) {
//         toggleLink.addEventListener('click', function(event) {
//             event.stopPropagation();
//             subNav.style.display = subNav.style.display === 'none' || subNav.style.display === '' ? 'block' : 'none';
//         });

//         radioInputs.forEach(function(radioInput) {
//             radioInput.addEventListener('change', function() {
//                 if (this.checked) {
//                     updateToggleLinkText(toggleLink);
//                 }
//             });
//         });

//         checkboxInputs.forEach(function(checkboxInput) {
//             checkboxInput.addEventListener('change', function() {
//                 if (checkboxInput.value === 'everywhere' && checkboxInput.checked) {
//                     checkboxInputs.forEach(function(cb) {
//                         cb.checked = true;
//                     });
//                     updateToggleLinkText(toggleLink);
//                 } else if (checkboxInput.value === 'everywhere' && !checkboxInput.checked) {
//                     checkboxInputs.forEach(function(cb) {
//                         cb.checked = false;
//                     });
//                     updateToggleLinkText(toggleLink);
//                 } else {
//                     updateToggleLinkText(toggleLink);
//                 }
//             });
//         });

//         document.addEventListener('click', function(event) {
//             if (!toggleLink.contains(event.target) && !subNav.contains(event.target)) {
//                 subNav.style.display = 'none';
//             }
//         });

//         // Set default text
//         updateToggleLinkText(toggleLink);
//     }

//     function updateToggleLinkText(toggleLink) {
//         var subNav = toggleLink.nextElementSibling;
//         var radioInputs = subNav.querySelectorAll('input[type="radio"]');
//         var checkboxInputs = subNav.querySelectorAll('input[type="checkbox"]');

//         if (toggleLink.closest('.nav-list__item').querySelector('.sub-nav-how')) {
//             var selectedRadios = Array.from(radioInputs).filter(radio => radio.checked);
//             if (selectedRadios.length > 0) {
//                 toggleLink.textContent = selectedRadios.map(radio => radio.parentElement.textContent.trim()).join(', ');
//             } else {
//                 toggleLink.textContent = 'Выберите способ';
//             }
//         } else if (toggleLink.closest('.nav-list__item').querySelector('.sub-nav-where')) {
//             var selectedCheckboxes = Array.from(checkboxInputs).filter(checkbox => checkbox.checked && checkbox.value !== 'everywhere');
//             if (selectedCheckboxes.length > 0) {
//                 toggleLink.textContent = selectedCheckboxes.map(checkbox => checkbox.parentElement.textContent.trim()).join(', ');
//             } else if (checkboxInputs[0].checked) {
//                 toggleLink.textContent = 'Везде';
//             } else {
//                 toggleLink.textContent = 'Выберите место';
//             }
//         }
//     }

//     var toggleLinks = document.querySelectorAll('.nav-list__link.toggle-link');
//     toggleLinks.forEach(function(toggleLink) {
//         var subNav = toggleLink.nextElementSibling;
//         var radioInputs = subNav.querySelectorAll('input[type="radio"]');
//         var checkboxInputs = subNav.querySelectorAll('input[type="checkbox"]');
//         initializeNav(toggleLink, subNav, radioInputs, checkboxInputs);
//     });

//     // Initial check to set the visibility of logical operators
//     updateLogicalOperatorVisibility();
// });

document.addEventListener('DOMContentLoaded', function() {
    const keywordsContainer = document.getElementById('keywords-container');
    const logicalOperatorContainer = document.querySelector('.logical-operator-container');
    
    function updateLogicalOperatorVisibility() {
        const keywordsEntries = document.querySelectorAll('.keywords-entry');
        if (keywordsEntries.length >= 2) {
            logicalOperatorContainer.style.display = 'flex';
        } else {
            logicalOperatorContainer.style.display = 'none';
        }
    }

    document.getElementById('add-keywords-btn').addEventListener('click', function() {
        var originalEntry = document.querySelector('.keywords-entry');
        var newEntry = originalEntry.cloneNode(true);

        var inputs = newEntry.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type === 'text') {
                inputs[i].value = '';
            } else if (inputs[i].type === 'radio' || inputs[i].type === 'checkbox') {
                inputs[i].checked = false;
            }
        }

        keywordsContainer.appendChild(newEntry);

        var toggleLinks = newEntry.querySelectorAll('.nav-list__link.toggle-link');
        toggleLinks.forEach(function(toggleLink) {
            var subNav = toggleLink.nextElementSibling;
            var radioInputs = subNav.querySelectorAll('input[type="radio"]');
            var checkboxInputs = subNav.querySelectorAll('input[type="checkbox"]');
            initializeNav(toggleLink, subNav, radioInputs, checkboxInputs);
        });

        updateLogicalOperatorVisibility(); 
    });

    document.getElementById('delete-keywords-btn').addEventListener('click', function() {
        var keywordsEntries = document.querySelectorAll('.keywords-entry');
        if (keywordsEntries.length > 1) {
            keywordsEntries[keywordsEntries.length - 1].remove();
        }
        updateLogicalOperatorVisibility(); 
    });

    function initializeNav(toggleLink, subNav, radioInputs, checkboxInputs) {
        toggleLink.addEventListener('click', function(event) {
            event.stopPropagation();
            subNav.style.display = subNav.style.display === 'none' || subNav.style.display === '' ? 'block' : 'none';
        });

        radioInputs.forEach(function(radioInput) {
            radioInput.addEventListener('change', function() {
                if (this.checked) {
                    updateToggleLinkText(toggleLink);
                }
            });
        });

        checkboxInputs.forEach(function(checkboxInput) {
            checkboxInput.addEventListener('change', function() {
                handleCheckboxChange(checkboxInput, checkboxInputs, toggleLink);
            });
        });

        document.addEventListener('click', function(event) {
            if (!toggleLink.contains(event.target) && !subNav.contains(event.target)) {
                subNav.style.display = 'none';
            }
        });

        updateToggleLinkText(toggleLink);
    }

    function handleCheckboxChange(changedCheckbox, checkboxInputs, toggleLink) {
        if (changedCheckbox.value === 'everywhere') {
            if (changedCheckbox.checked) {
                checkboxInputs.forEach(function(cb) {
                    cb.checked = true;
                });
            } else {
                checkboxInputs.forEach(function(cb) {
                    cb.checked = false;
                });
            }
        } else {
            var everywhereCheckbox = Array.from(checkboxInputs).find(checkbox => checkbox.value === 'everywhere');
            if (everywhereCheckbox && changedCheckbox.checked === false) {
                everywhereCheckbox.checked = false;
            }
        }

        if (changedCheckbox.value === 'experience') {
            var subExperienceCheckboxes = changedCheckbox.closest('li').querySelectorAll('.sub-nav-where-experience input[type="checkbox"]');
            subExperienceCheckboxes.forEach(function(cb) {
                cb.checked = changedCheckbox.checked;
            });
        }

        var subExperienceCheckboxes = checkboxInputs[0].closest('ul').querySelectorAll('.sub-nav-where-experience input[type="checkbox"]');
        if (changedCheckbox.closest('.sub-nav-where-experience') && !changedCheckbox.checked) {
            var mainExperienceCheckbox = checkboxInputs[0].closest('ul').querySelector('input[value="experience"]');
            if (mainExperienceCheckbox) {
                mainExperienceCheckbox.checked = false;
            }
        }

        updateToggleLinkText(toggleLink);
    }

    function updateToggleLinkText(toggleLink) {
        var subNav = toggleLink.nextElementSibling;
        var radioInputs = subNav.querySelectorAll('input[type="radio"]');
        var checkboxInputs = subNav.querySelectorAll('input[type="checkbox"]');

        if (toggleLink.closest('.nav-list__item').querySelector('.sub-nav-how')) {
            var selectedRadios = Array.from(radioInputs).filter(radio => radio.checked);
            if (selectedRadios.length > 0) {
                toggleLink.textContent = selectedRadios.map(radio => radio.parentElement.textContent.trim()).join(', ');
            } else {
                toggleLink.textContent = 'Выберите способ';
            }
        } else if (toggleLink.closest('.nav-list__item').querySelector('.sub-nav-where')) {
            var everywhereCheckbox = Array.from(checkboxInputs).find(checkbox => checkbox.value === 'everywhere');
            if (everywhereCheckbox && everywhereCheckbox.checked) {
                toggleLink.textContent = 'Везде';
            } else {
                var selectedCheckboxes = Array.from(checkboxInputs).filter(checkbox => checkbox.checked && checkbox.value !== 'everywhere');
                if (selectedCheckboxes.length > 0) {
                    toggleLink.textContent = selectedCheckboxes.map(checkbox => checkbox.parentElement.textContent.trim()).join(', ');
                } else {
                    toggleLink.textContent = 'Выберите место';
                }
            }
        }
    }

    var toggleLinks = document.querySelectorAll('.nav-list__link.toggle-link');
    toggleLinks.forEach(function(toggleLink) {
        var subNav = toggleLink.nextElementSibling;
        var radioInputs = subNav.querySelectorAll('input[type="radio"]');
        var checkboxInputs = subNav.querySelectorAll('input[type="checkbox"]');
        initializeNav(toggleLink, subNav, radioInputs, checkboxInputs);
    });

    updateLogicalOperatorVisibility();
});



let keywordCount = 1;
    document.getElementById('add-keywords-btn').addEventListener('click', function() {
        const container = document.getElementById('keywords-container');
        const entry = document.createElement('div');
        entry.className = 'keywords-entry';
        entry.innerHTML = `
            <label for="keywords-input-${keywordCount}" class="form-label">Ключевые слова</label>
            <input type="text" class="keywords-input" placeholder="Введите ключевые слова через точку с запятой" name="keywords_${keywordCount}">
            <nav class="key-words__nav">
                <ul class="nav-list">
                    <li class="nav-list__item">
                        <a href="#!" class="nav-list__link toggle-link">Выберите способ</a>
                        <div class="nav-list__sub-nav-how sub-nav">
                            <ul class="sub-nav-how">
                                <li>
                                    <label class="label_choice">
                                        <input type="radio" name="option1_${keywordCount}" value="all_words">Все слова
                                    </label>
                                </li>
                                <li>
                                    <label class="label_choice">
                                        <input type="radio" name="option1_${keywordCount}" value="any_word">Любое из слов
                                    </label>
                                </li>
                                <li>
                                    <label class="label_choice">
                                        <input type="radio" name="option1_${keywordCount}" value="exact_phrase">Точная фраза
                                    </label>
                                </li>
                                <li>
                                    <label class="label_choice">
                                        <input type="radio" name="option1_${keywordCount}" value="not_appear">Не встречаются
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-list__item">
                        <a href="#!" class="nav-list__link toggle-link">Выберите место</a>
                        <div class="nav-list__sub-nav-where sub-nav">
                            <ul class="sub-nav-where">
                                <li>
                                    <label class="label_choice">
                                        <input type="checkbox" name="where_${keywordCount}" value="everywhere">Везде
                                    </label>
                                </li>
                                <li>
                                    <label class="label_choice">
                                        <input type="checkbox" name="where_${keywordCount}" value="resume_title">В названии резюме
                                    </label>
                                </li>
                                <li>
                                    <label class="label_choice">
                                        <input type="checkbox" name="where_${keywordCount}" value="education">В образовании
                                    </label>
                                </li>
                                <li>
                                    <label class="label_choice">
                                        <input type="checkbox" name="where_${keywordCount}" value="skills">В ключевых навыках
                                    </label>
                                </li>
                                <li>
                                    <label class="label_choice">
                                        <input type="checkbox" name="where_${keywordCount}" value="experience">В опыте работы
                                    </label>
                                    <ul class="sub-nav-where-experience">

                                    <li>
                                    <label class="label_choice">
                                        <input type="checkbox" name="where_${keywordCount}" value="companies" class="experience-checkbox">В компаниях и отраслях
                                    </label>
                                </li>
                                <li>
                                    <label class="label_choice">
                                        <input type="checkbox" name="where_${keywordCount}" value="job" class="experience-checkbox">В должностях
                                    </label>
                                </li>
                                <li>
                                    <label class="label_choice">
                                        <input type="checkbox" name="where_${keywordCount}" value="duties" class="experience-checkbox">В обязанностях
                                    </label>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </nav>
`;
document.getElementById('group_count').value = keywordCount + 1;
keywordCount++;
});

document.getElementById('delete-keywords-btn').addEventListener('click', function() {
const container = document.getElementById('keywords-container');
if (container.children.length > 1) {
    keywordCount--;
    document.getElementById('group_count').value = keywordCount;
}
});

document.getElementById('keywordsForm').addEventListener('submit', function(event) {
    var vacancyNumber = document.getElementById('vacantion-input').value.trim();
    var uidNumber = document.getElementById('uid-input').value.trim();
    var errorMessage = document.getElementById('error-message');

    if (vacancyNumber === '' && uidNumber === '') {
        event.preventDefault();
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
    }
});
