(function () {
    'use strict';

    var DEFAULT_SPEED = '512K/1M';
    var DEFAULT_UPDATE = 'Uon';
    var STORAGE_PREFIX = 'TecsmartCardDomain:';
    var LAST_DOMAIN_KEY = 'TecsmartLastDomain';

    function ready(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    function trim(value) {
        return (value || '').replace(/^\s+|\s+$/g, '');
    }

    function enc(value) {
        return encodeURIComponent(value == null ? '' : String(value));
    }

    function getCookie(name) {
        var parts = document.cookie ? document.cookie.split(';') : [];
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i].trim();
            if (part.indexOf(name + '=') === 0) {
                return decodeURIComponent(part.substring(name.length + 1));
            }
        }
        return '';
    }

    function setCookie(name, value) {
        var d = new Date();
        d.setTime(d.getTime() + 2592e6);
        document.cookie = name + '=' + encodeURIComponent(value || '') + ';expires=' + d.toUTCString() + ';path=/';
    }

    function getForm() {
        return document.forms.login;
    }

    function getUsername() {
        var form = getForm();
        var input = form ? form.querySelector('input[username-field]') : null;
        return trim(input ? input.value : '');
    }

    function getPassword() {
        var form = getForm();
        var input = form ? form.querySelector('input[password-field]') : null;
        return input ? input.value : '';
    }

    function getSpeedSelect() {
        return document.getElementById('speed');
    }

    function getHiddenDomain() {
        return document.getElementById('domainFinal');
    }

    function getSelectedSpeed() {
        var speedSelect = getSpeedSelect();
        if (!speedSelect || speedSelect.selectedIndex < 0) return '';
        var option = speedSelect.options[speedSelect.selectedIndex];
        if (!option || option.disabled || option.hidden) return '';
        return trim(option.value);
    }

    function setSpeedByValue(speed) {
        var speedSelect = getSpeedSelect();
        if (!speedSelect || !speed) return false;
        for (var i = 0; i < speedSelect.options.length; i++) {
            if (speedSelect.options[i].value === speed && !speedSelect.options[i].disabled) {
                speedSelect.selectedIndex = i;
                return true;
            }
        }
        return false;
    }

    function getUpdateFlag() {
        var checkbox = document.getElementById('chupdate');
        if (!checkbox) return DEFAULT_UPDATE;
        checkbox.value = checkbox.checked ? '_Uoff' : '_Uon';
        return checkbox.checked ? 'Uoff' : 'Uon';
    }

    function setUpdateFlag(flag) {
        var checkbox = document.getElementById('chupdate');
        if (!checkbox) return;
        checkbox.checked = flag === 'Uoff';
        checkbox.value = checkbox.checked ? '_Uoff' : '_Uon';
    }

    function splitDomain(domain) {
        domain = trim(domain);
        if (!domain) return { speed: '', update: DEFAULT_UPDATE };
        var idx = domain.indexOf('_');
        if (idx === -1) return { speed: domain, update: DEFAULT_UPDATE };
        return {
            speed: domain.substring(0, idx),
            update: domain.substring(idx + 1) || DEFAULT_UPDATE
        };
    }

    function normalizeDomain(domain) {
        var parts = splitDomain(domain);
        if (!parts.speed) return '';
        return parts.speed + '_' + (parts.update || DEFAULT_UPDATE);
    }

    function isSavedCardSelected() {
        var oldCardSelect = document.getElementById('se');
        if (!oldCardSelect) return false;
        var value = trim(oldCardSelect.value);
        return !!value && value !== '0' && value !== 'relod' && value.indexOf(',') !== -1;
    }

    function getSavedCardUsername() {
        var oldCardSelect = document.getElementById('se');
        if (!oldCardSelect || !isSavedCardSelected()) return '';
        return trim(oldCardSelect.value.split(',')[0]);
    }

    function getStoredDomain(username) {
        username = trim(username);
        if (!username) return '';
        try {
            return normalizeDomain(localStorage.getItem(STORAGE_PREFIX + username) || '');
        } catch (e) {
            return '';
        }
    }

    function saveStoredDomain(username, domain) {
        username = trim(username);
        domain = normalizeDomain(domain);
        if (!username || !domain) return;
        try {
            localStorage.setItem(STORAGE_PREFIX + username, domain);
            localStorage.setItem(LAST_DOMAIN_KEY, domain);
        } catch (e) {}
        setCookie('speed', domain);
    }

    function getFallbackDomainForSaved(username) {
        return getStoredDomain(username) ||
               normalizeDomain(getCookie('speed')) ||
               DEFAULT_SPEED + '_' + DEFAULT_UPDATE;
    }

    function buildDomain() {
        var username = getUsername() || getSavedCardUsername();
        var selectedSpeed = getSelectedSpeed();
        var domain = '';

        if (selectedSpeed) {
            domain = selectedSpeed + '_' + getUpdateFlag();
        } else if (isSavedCardSelected()) {
            domain = getFallbackDomainForSaved(username);
            var parts = splitDomain(domain);
            setSpeedByValue(parts.speed);
            setUpdateFlag(parts.update);
        }

        var hidden = getHiddenDomain();
        if (hidden) hidden.value = domain;
        return domain;
    }

    function showMessage(message) {
        var error = document.getElementById('error');
        if (error) error.innerText = message;
        if (typeof window.showErrorPopup === 'function') {
            window.showErrorPopup();
        } else {
            alert(message);
        }
    }

    function prepareDomainForLogin() {
        var username = getUsername();
        var domain = buildDomain();

        if (!username) {
            showMessage('يجب ادخال قيمة صحيحة!');
            return '';
        }

        if (!domain) {
            showMessage('يرجى اختيار السرعة قبل تسجيل الدخول');
            return '';
        }

        saveStoredDomain(username, domain);
        return domain;
    }

    function doLoginRequest(username, password, domain) {
        var url = '/login?username=' + enc(username) + '&var=callBack';
        if (password) url += '&password=' + enc(password);
        if (domain) url += '&domain=' + enc(domain);

        if (typeof window.getRequest === 'function') {
            window.getRequest(url);
        } else {
            window.location.href = url;
        }
    }

    var originalRemember = window.remember;
    window.remember = function () {
        if (typeof originalRemember === 'function') {
            try { originalRemember.apply(this, arguments); } catch (e) {}
        }
        var username = getUsername() || getCookie('username');
        var domain = buildDomain() || normalizeDomain(getCookie('speed'));
        if (username && domain) saveStoredDomain(username, domain);
    };

    window.cookieLogin = function () {
        var username = trim(getCookie('username'));
        if (!username) return;

        var password = getCookie('password');
        var domain = getStoredDomain(username) || normalizeDomain(getCookie('speed')) || DEFAULT_SPEED + '_' + DEFAULT_UPDATE;
        var hidden = getHiddenDomain();
        if (hidden) hidden.value = domain;

        doLoginRequest(username, password, domain);
    };

    window.userLogin = function () {
        var domain = prepareDomainForLogin();
        if (!domain) {
            if (typeof window.animating !== 'undefined') window.animating = false;
            var btn = document.querySelector('.login-submit');
            if (btn) btn.classList.remove('processing');
            return;
        }
        doLoginRequest(getUsername(), getPassword(), domain);
    };

    window.TecsmartDomainGuard = {
        buildDomain: buildDomain,
        prepareDomainForLogin: prepareDomainForLogin,
        saveStoredDomain: saveStoredDomain,
        getStoredDomain: getStoredDomain
    };

    ready(function () {
        var speedSelect = getSpeedSelect();
        var checkbox = document.getElementById('chupdate');
        var oldCardSelect = document.getElementById('se');
        var form = getForm();

        if (checkbox) {
            checkbox.value = checkbox.checked ? '_Uoff' : '_Uon';
            checkbox.addEventListener('change', function () {
                checkbox.value = checkbox.checked ? '_Uoff' : '_Uon';
                buildDomain();
            }, true);
        }

        if (speedSelect) {
            speedSelect.addEventListener('change', buildDomain, true);
        }

        if (oldCardSelect) {
            oldCardSelect.addEventListener('change', function () {
                setTimeout(function () {
                    var username = getSavedCardUsername() || getUsername();
                    var domain = getFallbackDomainForSaved(username);
                    var parts = splitDomain(domain);
                    setSpeedByValue(parts.speed);
                    setUpdateFlag(parts.update);
                    buildDomain();
                }, 30);
            }, true);
        }

        if (form) {
            form.addEventListener('submit', function () {
                buildDomain();
            }, true);
        }

        buildDomain();
    });
})();
