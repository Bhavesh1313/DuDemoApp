import React, { useEffect } from 'react';
import { I18nManager } from 'react-native';
import Restart from 'react-native-restart';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './src/i18n';
import i18n from './src/i18n';
import MainNavigator from './src/navigation/MainNavigator';
import store, { persistor } from './src/redux/store';
import { LANGUAGE_CODES, LANGUAGE_STORAGE_KEY } from './src/utils/constants';
import SecureStorage from './src/utils/SensitiveStorage';

const App = () => {

  useEffect(() => {
    const configureAppLanguage = async () => {
      try {
        const storedLanguage = await SecureStorage.getItem(LANGUAGE_STORAGE_KEY);
        const isRTL = storedLanguage === LANGUAGE_CODES.ARABIC;
        if (storedLanguage) {
          i18n.changeLanguage(storedLanguage);
          I18nManager.forceRTL(isRTL);
          I18nManager.allowRTL(isRTL);
        }
        if (I18nManager.isRTL !== isRTL) {
          Restart.Restart();
        }
      } catch (error) {
        console.log('Failed to load settings:', error);
      }
    };

    configureAppLanguage();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MainNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;