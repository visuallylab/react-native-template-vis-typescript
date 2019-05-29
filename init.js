const fs = require('fs');

const PACKAGE_JSON = 'package.json';

let packageContent = '{}';

if (!fs.existsSync(PACKAGE_JSON)) {
  console.log(`No find ${PACKAGE_JSON}`);
  process.exit();
}

packageContent = fs.readFileSync(PACKAGE_JSON, 'utf8');

let data = JSON.parse(packageContent);

data.scripts = {
  ...data.scripts,
  'build:ios': "react-native run-ios --no-packager --simulator 'iPhone 7'",
  'release:android':
    'react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle && cd ./android && ./gradlew assembleRelease',
};

data = {
  ...data,
  husky: {
    hooks: {
      'pre-commit': 'lint-staged',
    },
  },
  'lint-staged': {
    '*.{ts,tsx,js,json,css,md}': ['prettier --write', 'git add'],
  },
  prettier: {
    singleQuote: true,
    jsxSingleQuote: false,
    trailingComma: 'all',
  },
};

fs.writeFileSync(PACKAGE_JSON, JSON.stringify(data, null, 2));