import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './src/i18n';
import MainNavigator from './src/navigation/MainNavigator';
import store, { persistor } from './src/redux/store';

const App = () => {

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