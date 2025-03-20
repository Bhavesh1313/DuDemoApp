import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    I18nManager,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FastImage from 'react-native-fast-image';
import Restart from 'react-native-restart';
import { useDispatch } from 'react-redux';
import { images } from '../../assets/images';
import { setLanguage } from '../../redux/reducers/languageSlice';
import { setAuthCredentials } from '../../redux/reducers/loginSlice';
import { Colors } from '../../utils/colors';
import { LANGUAGE_CODES, LANGUAGE_STORAGE_KEY, LANGUAGES } from '../../utils/constants';
import SecureStorage from '../../utils/SensitiveStorage';
import { validateEmail, validatePassword } from '../../utils/validations';
import styles from './style';

type LoginScreenProps = {
    navigation: {
        [x: string]: any;
        replace: (screen: string) => void;
    };
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginBtnDisabled, setLoginBtnDisabled] = useState(true);
    const [selectedLanguage,setSelectedLanguage] =useState<string>('');
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchLanguage = async () => {
            let language: string | null = await SecureStorage.getItem(LANGUAGE_STORAGE_KEY);
            setSelectedLanguage(language ?? 'en');
        };
    
        fetchLanguage();
    }, []);
    

    useEffect(() => {
        setLoginBtnDisabled(!validateEmail(email) || !validatePassword(password));
    }, [email, password]);

    const onLoginBtnClick = useCallback(() => {
        dispatch(setAuthCredentials({ email, password }));
    }, [email, password]);

    const handleLanguageChange = useCallback(async (lang: string) => {
        if (lang === selectedLanguage) {
            return;
        }
        setSelectedLanguage(lang);
        i18n.changeLanguage(lang);
        dispatch(setLanguage(lang));
        await SecureStorage.setItem(LANGUAGE_STORAGE_KEY, lang);

        const isRTL = lang === LANGUAGE_CODES.ARABIC;
        I18nManager.forceRTL(isRTL);
        I18nManager.allowRTL(isRTL);

        Restart.Restart();
    }, [i18n, navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
            <ScrollView contentContainerStyle={styles.subContainer} bounces={false}>
                <FastImage
                    source={images.login_logo}
                    style={styles.poster}
                />
                <View style={styles.dropdownContainer}>
                    <Dropdown
                        style={styles.dropdown}
                        selectedTextStyle={styles.dropdownText}
                        containerStyle={styles.dropdownContainerStyle}
                        itemContainerStyle={styles.dropdownItemContainer}
                        iconStyle={styles.dropdownIconStyle}
                        itemTextStyle={styles.dropdownItemTextStyle}
                        data={LANGUAGES}
                        labelField="label"
                        valueField="value"
                        value={selectedLanguage}
                        onChange={item => handleLanguageChange(item?.value)}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={Colors.black}
                    placeholder={t('login.email')}
                    value={email}
                    onChangeText={(val) => {
                        setEmail(val);
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {email.length > 0 &&  !validateEmail(email) ? <Text style={styles.errorText}>{t('login.emailInvalid')}</Text> : null}

                <TextInput
                    style={styles.input}
                    placeholder={t('login.password')}
                    placeholderTextColor={Colors.black}
                    value={password}
                    onChangeText={(val) => {
                        setPassword(val);
                    }}
                    secureTextEntry
                    maxLength={15}
                />
                {password.length > 0 && !validatePassword(password) ? <Text style={styles.errorText}>{t('login.passwordInvalid')}</Text> : null}

                <TouchableOpacity
                    disabled={loginBtnDisabled}
                    style={loginBtnDisabled ? styles.submitBtnDisabled : styles.submitBtn}
                    onPress={onLoginBtnClick}
                >
                    <Text style={styles.submitText}>{t('login.login').toUpperCase()}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;
