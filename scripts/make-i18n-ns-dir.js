const fs = require('fs');
const path = require('path');

const ROOT = path.dirname(__dirname);

const { locales, extraNamespaces } = require('../src/i18n/config.json');

locales.forEach(lng => {
  const localeRoot = path.join(ROOT, 'public/_locales/', lng);

  if (!fs.existsSync(localeRoot)) {
    fs.mkdirSync(localeRoot, { recursive: true });
  }
  const localeMsgJson = path.resolve(localeRoot, 'messages.json');

  if (!fs.existsSync(localeMsgJson)) {
    fs.writeFileSync(localeMsgJson, '{}');
  }

  extraNamespaces.forEach(ns => {
    const nsRoot = path.join(localeRoot, ns);

    if (!fs.existsSync(nsRoot)) {
      fs.mkdirSync(nsRoot, { recursive: true });
    }

    const nsMsgJson = path.resolve(nsRoot, 'messages.json');

    if (!fs.existsSync(nsMsgJson)) {
      fs.writeFileSync(nsMsgJson, '{}');
    }
  }); 
});