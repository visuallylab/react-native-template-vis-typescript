const fs = require('fs');
const path = require('path');

const PACKAGE_JSON_PATH = path.join(__dirname, 'package.json');

if (fs.existsSync(path.join(__dirname, '.travis.yml'))) {
  process.exit();
}

const projectFilesToDelete = ['.flowconfig', 'App.js', '__tests__/App-test.js'];

const templateFilesToDelete = ['setup.js', 'README.md', 'LICENSE'];

const deleteFile = filePath => {
  if (!fs.existsSync(filePath)) {
    return;
  }

  fs.unlinkSync(filePath);
};

const projectPath = path.join(__dirname, '..', '..');
const deleteProjectFile = fileName =>
  deleteFile(path.join(projectPath, fileName));
const deleteTemplateFile = fileName =>
  deleteFile(path.join(__dirname, fileName));

updatePackageJSON();
projectFilesToDelete.forEach(deleteProjectFile);
templateFilesToDelete.forEach(deleteTemplateFile);

function updatePackageJSON() {
  let packageContent = '{}';

  if (fs.existsSync(PACKAGE_JSON_PATH)) {
    packageContent = fs.readFileSync(PACKAGE_JSON_PATH, 'utf8');
    console.log(`find ${PACKAGE_JSON_PATH}`);
  }

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

  fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(data, null, 2));
}
