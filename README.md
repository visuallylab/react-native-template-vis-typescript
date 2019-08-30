# react-native-template-vis-typescript

[![Build Status](https://travis-ci.org/visuallylab/react-native-template-vis-typescript.svg?branch=master)](https://travis-ci.org/visuallylab/react-native-template-vis-typescript)

React Native template for a quick start with TypeScript

## Usage

1. Create a new react-native App with this template

```
$ npx react-native init MyApp --template vis-typescript
```

2. Run app

```
$ yarn react-native run-ios
$ yarn react-native run-android
```

Note: currently [react native cli support autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md#autolinking), do not need the command `react-native link` anymore, it may cause build error after you run the command. 

If the library do not support the autolinking, [edit the config in react-native.config.js](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md#how-can-i-disable-autolinking-for-unsupported-library).

## Development
[Run the template locally](https://github.com/react-native-community/cli/blob/master/docs/init.md#initializing-project-with-custom-template)

```
$ npx react-native init MyApp --template file://ThePathToTemplate
```
ex:
```
$ npx react-native init MyApp --template file:///Users/username/Projects/react-native-template-vis-typescript
```

## Frameworks

#### This template including

- Navigator -> [react-navigation](https://reactnavigation.org/)
- Icons -> [react-native-vector-icons](https://oblador.github.io/react-native-vector-icons/)
- Persist -> [@react-native-community/async-storage](https://github.com/react-native-community/react-native-async-storage) + our own `useAsyncStorage`(including in hooks folder)

#### We recommend if you need

- UI components -> [react-native-base](https://nativebase.io/)

- Image picker -> [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)

- Maps -> [react-native-map](https://github.com/airbnb/react-native-maps)

- Permissions -> [react-native-permissions](https://github.com/yonahforst/react-native-permissions)

- OpenGL -> [gl-react-native-v2](https://github.com/gre/gl-react-native-v2)

- Pop Dialogs -> [react-native-pop-dialog](https://github.com/jacklam718/react-native-popup-dialog)

- Dynamic navigator tabs -> [react-native-tab-view](https://github.com/react-native-community/react-native-tab-view)
