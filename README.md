# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.
## Screenshots:

## Step 1: Start the Metro Server

First, take a clone of the project using command 

```bash
git clone 'https://github.com/Bhavesh1313/DuDemoApp.git'
```
## Step 2: Install the packages
Now install the packages added in package.json file

```bash
# using npm
npm install

# OR using Yarn
yarn add
```

## Step 3: Install Pods for iOS and sync gradle for android
This will install the packages required for iOS(Pods) and android(SDKs)
```bash
# iOS
cd ios && pod install

# android
./gradlew build
```

## Step 4: Start the Metro server
You will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 5: Start Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of the project. Run the following command to start the _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

### Packages used in this project

```bash
i18next/react-i18next  for multilingual support
redux-persist to store data when the app is not running or in killed state
react-native-fast-image for better performance, caching, and handling for images
@reduxjs/toolkit/react-redux for state management of application
react-native-element-dropdown for dropdown
react-native-restart for restart app once language change
react-native-size-matters for responsive mobile UI
axios for API call
react-native-sensitive-info to store the sensitive/confidential data 
```

## Application Details:

**Screen1:**

1.Form contains two text fields: one is email and other one is password
2.Email must be valid email address
3.Password size limitation between 8 - 15 characters(Alpha Number with at least one Capital Letter and 1 Special Character)
4.Submit button to be enabled only in case of email & password are valid otherwise it will be disabled
5.Once Submit button is active move to next screen without any Remote API Call.
 

**Screen2:**

1.Using Restful Web APIs load the list of popular Movies on this screen in a grid view with number of columns as 2.
2.Each Item contains the name and image. Name to be taken from the “title” and image from “poster_path” from the response.
 
**Note:**
For Screen 2 you will need to create a free account on https://www.themoviedb.org and use their APIs to load the list of Popular Movies.
https://developers.themoviedb.org/3/movies/get-popular-movies