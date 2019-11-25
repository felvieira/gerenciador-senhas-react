const FS = require('fs');

// read the index.html from build folder
const data = FS.readFileSync('./build/index.html', 'utf8');

function insertContent(fullContent, beforeWhat, newContent) {
  // get the position before which newContent has to be added
  const position = fullContent.indexOf(beforeWhat);

  // since splice can be used on arrays only
  const fullContentCopy = fullContent.split('');
  fullContentCopy.splice(position, 0, newContent);

  return fullContentCopy.join('');
}

// will add the <meta> tags needed for cordova app
const afterAddingMeta = insertContent(
  data,
  '<link',
  `<meta http-equiv="Content-Security-Policy" content="default-src gap://ready file://* *; style-src 'self' http://* https://* 'unsafe-inline'; script-src 'self' http://* https://* 'unsafe-inline' 'unsafe-eval'">` +
    `<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />` +
    `<meta name="format-detection" content="telephone=no">` +
    `<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">`
);

// will add <script> pointing to cordova.js
const afterAddingScript = insertContent(
  afterAddingMeta,
  '<script',
  `<script type="text/javascript" src="cordova.js"></script><script type="text/javascript" src="cordova-script.js"></script>`
);

// updates the index.html file
FS.writeFile('./build/index.html', afterAddingScript, 'utf8', err => {
  if (err) {
    throw err;
  }
});
