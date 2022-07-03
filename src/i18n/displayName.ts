import i18n from 'i18next';

const displayNames = {
  'en': 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
};
const switchLangAnchor = document.querySelector('#switchLang')! as HTMLAnchorElement;

switchLangAnchor.addEventListener('click', (e) => {
  e.preventDefault();

  switch (i18n.language) {
    case 'en':
      i18n.changeLanguage('zh-CN');
      break;
    default:
      i18n.changeLanguage('en');
      break;
  }
});
export function updateDisplayName(locale: string) {
  switchLangAnchor.innerText = locale in displayNames ? displayNames[locale as keyof typeof displayNames] : locale.toUpperCase();
}