(function () {
    'use strict';

    function ready(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    ready(function () {
        var form = document.forms.login;
        var speedSelect = document.getElementById('speed');
        var oldCardSelect = document.getElementById('se');
        var loginButton = document.querySelector('.login-submit[parent-id="status"], .login-submit');
        var usernameInput = form ? form.querySelector('input[username-field]') : null;
        var modal = document.getElementById('speed-required-modal');
        var optionsBox = document.getElementById('speed-required-options');
        var closeButton = document.getElementById('speed-required-close');
        var cancelButton = document.getElementById('speed-required-cancel');
        var allowNextSubmit = false;
        var savedCardMode = false;

        if (!form || !speedSelect || !modal || !optionsBox) return;

        function trim(value) {
            return (value || '').replace(/^\s+|\s+$/g, '');
        }

        function hasUsername() {
            return !!usernameInput && trim(usernameInput.value).length > 0;
        }

        function isSpeedSelected() {
            var index = speedSelect.selectedIndex;
            if (index < 0) return false;
            var option = speedSelect.options[index];
            if (!option) return false;
            return !!trim(option.value) && !option.disabled && !option.hidden;
        }

        function isSavedCardSelected() {
            if (!oldCardSelect) return false;
            var value = trim(oldCardSelect.value);
            return !!value && value !== '0' && value !== 'relod' && value.indexOf(',') !== -1;
        }

        function shouldSkipSpeedGate() {
            return allowNextSubmit || savedCardMode || isSavedCardSelected();
        }

        function needsSpeedGate() {
            return hasUsername() && !isSpeedSelected() && !shouldSkipSpeedGate();
        }

        function openModal() {
            buildSpeedButtons();
            modal.hidden = false;
            modal.classList.add('active');
            document.body.classList.add('speed-modal-open');
            var firstButton = optionsBox.querySelector('button');
            if (firstButton) setTimeout(function () { firstButton.focus(); }, 30);
        }

        function closeModal() {
            modal.classList.remove('active');
            modal.hidden = true;
            document.body.classList.remove('speed-modal-open');
        }

        function submitAfterSpeedChoice() {
            allowNextSubmit = true;
            closeModal();
            setTimeout(function () {
                if (typeof form.requestSubmit === 'function') {
                    form.requestSubmit();
                } else {
                    var event = document.createEvent('Event');
                    event.initEvent('submit', true, true);
                    form.dispatchEvent(event);
                }
                setTimeout(function () { allowNextSubmit = false; }, 300);
            }, 80);
        }

        function buildSpeedButtons() {
            var html = '';
            for (var i = 0; i < speedSelect.options.length; i++) {
                var option = speedSelect.options[i];
                if (!option || !trim(option.value) || option.disabled || option.hidden) continue;
                html += '<button type="button" class="speed-choice-item" data-speed-index="' + i + '">' + option.text + '</button>';
            }
            optionsBox.innerHTML = html;
        }

        optionsBox.addEventListener('click', function (event) {
            var button = event.target.closest ? event.target.closest('.speed-choice-item') : event.target;
            if (!button || !button.getAttribute('data-speed-index')) return;
            var index = parseInt(button.getAttribute('data-speed-index'), 10);
            if (!isNaN(index) && speedSelect.options[index]) {
                speedSelect.selectedIndex = index;
                submitAfterSpeedChoice();
            }
        });

        function gateEvent(event) {
            if (allowNextSubmit) return;
            if (needsSpeedGate()) {
                event.preventDefault();
                event.stopPropagation();
                if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                openModal();
            }
        }

        form.addEventListener('submit', gateEvent, true);
        if (loginButton) loginButton.addEventListener('click', gateEvent, true);

        if (oldCardSelect) {
            oldCardSelect.addEventListener('change', function () {
                savedCardMode = isSavedCardSelected();
            });
        }

        if (usernameInput) {
            usernameInput.addEventListener('input', function () {
                savedCardMode = false;
            });
        }

        speedSelect.addEventListener('change', function () {
            savedCardMode = false;
        });

        if (closeButton) closeButton.addEventListener('click', closeModal);
        if (cancelButton) cancelButton.addEventListener('click', closeModal);

        modal.addEventListener('click', function (event) {
            if (event.target === modal) closeModal();
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && !modal.hidden) closeModal();
        });
    });
})();
