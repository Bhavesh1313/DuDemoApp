import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { useSelector } from 'react-redux';
import i18n from '../i18n';
import { RootState } from '../redux/store';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import { HOME, LOGIN } from './routes';

const Stack = createStackNavigator();

const screenOptions = { headerShown: false };

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
            <Stack.Screen name={LOGIN} component={LoginScreen} />
        </Stack.Navigator>
    );
};

const MainNavigator = () => {

    const { email, password } = useSelector((state: RootState) => state.login);

    return (
        <I18nextProvider i18n={i18n}>
            <NavigationContainer>
                {email && password ?
                    <Stack.Navigator
                        screenOptions={screenOptions}
                        initialRouteName={HOME}>
                        <Stack.Screen
                            name={HOME}
                            component={HomeScreen}
                            options={{ gestureEnabled: false }}
                        />
                    </Stack.Navigator>
                    :
                    <AuthStackNavigator />
                }

            </NavigationContainer>
        </I18nextProvider>
    );
};

export default MainNavigator;
