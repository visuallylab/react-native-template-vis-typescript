const fs = require('fs');
const path = require('path');

const projectPath = path.join(__dirname, '..', '..');
const PACKAGE_JSON_PATH = path.join(projectPath, 'package.json');

const projectFilesToDelete = ['.flowconfig', 'App.js', '__tests__/App-test.js'];

const templateFilesToDelete = ['setup.js', 'README.md', 'LICENSE'];

const deleteFile = filePath => {
  if (!fs.existsSync(filePath)) {
    return;
  }

  fs.unlinkSync(filePath);
};

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
    devDependencies: { ...data.devDependencies },
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
