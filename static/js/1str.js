document.addEventListener('DOMContentLoaded', function() {
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
    
        document.getElementById('keywords-container').appendChild(newEntry);
    
        // Initialize navigation for the new entry
        var toggleLinks = newEntry.querySelectorAll('.nav-list__link.toggle-link');
        toggleLinks.forEach(function(toggleLink) {
            var subNav = toggleLink.nextElementSibling;
            var radioInputs = subNav.querySelectorAll('input[type="radio"]');
            var checkboxInputs = subNav.querySelectorAll('input[type="checkbox"]');
            initializeNav(toggleLink, subNav, radioInputs, checkboxInputs);
        });
    });

    document.getElementById('delete-keywords-btn').addEventListener('click', function() {
        var keywordsEntries = document.querySelectorAll('.keywords-entry');
        if (keywordsEntries.length > 1) {
            keywordsEntries[keywordsEntries.length - 1].remove();
        }
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
                if (checkboxInput.value === 'everywhere' && checkboxInput.checked) {
                    checkboxInputs.forEach(function(cb) {
                        cb.checked = true;
                    });
                    updateToggleLinkText(toggleLink);
                } else if (checkboxInput.value === 'everywhere' && !checkboxInput.checked) {
                    checkboxInputs.forEach(function(cb) {
                        cb.checked = false;
                    });
                    updateToggleLinkText(toggleLink);
                } else {
                    updateToggleLinkText(toggleLink);
                }
            });
        });
    
        document.addEventListener('click', function(event) {
            if (!toggleLink.contains(event.target) && !subNav.contains(event.target)) {
                subNav.style.display = 'none';
            }
        });
    
        // Set default text
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
            var selectedCheckboxes = Array.from(checkboxInputs).filter(checkbox => checkbox.checked && checkbox.value !== 'everywhere');
            if (selectedCheckboxes.length > 0) {
                toggleLink.textContent = selectedCheckboxes.map(checkbox => checkbox.parentElement.textContent.trim()).join(', ');
            } else if (checkboxInputs[0].checked) {
                toggleLink.textContent = 'Везде';
            } else {
                toggleLink.textContent = 'Выберите место';
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
});