const dictionaries = { "en": en };
const defaultLocale = "it";
const i18nSelector = "data-i18n-key";
const buttonsClass = "translate";
let locale = defaultLocale;

document.addEventListener("DOMContentLoaded", () => {
    addDefaultDictionary();
    setLocale(defaultLocale);
    updateTranslationButtons();
});

const setLocale = (newLocale) => {
    if (newLocale === locale) return;
    const dictionary = dictionaries[newLocale];
    if (!dictionary) {
        console.warn('no dictionary for ' + newLocale);
        return;
    }
    locale = newLocale;
    translatePage(dictionary);
    updateTranslationButtons();
}

const translatePage = (dictionary) => {
    document
        .querySelectorAll(`[${i18nSelector}]`)
        .forEach(el => translateElement(el, dictionary));
}

const translateElement = (element, dictionary) => {
    const key = element.getAttribute(i18nSelector);
    const translation = dictionary[key];
    element.innerHTML = translation;
}

const updateTranslationButtons = () => {
    const buttons = document.getElementsByClassName(buttonsClass);
    [].forEach.call(buttons, el => {
        el.style.display = el.classList.contains(locale) ? 'none' : 'block';
    });
}

const addDefaultDictionary = () => {
    dictionaries[defaultLocale] = {};
    document
        .querySelectorAll(`[${i18nSelector}]`)
        .forEach(recordSingleLemma);
}

const recordSingleLemma = (element) => {
    const label = element.getAttribute(i18nSelector);
    dictionaries[defaultLocale][label] = element.innerHTML;
}