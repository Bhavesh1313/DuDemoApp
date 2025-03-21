import React, { useState } from 'react';
import {
    I18nManager,
    StyleSheet,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { moderateScale } from 'react-native-size-matters';
import { images } from '../assets/images';
import { Colors } from '../utils/colors';

const TextInputView = (props: TextInputProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={props.style ?? styles.input}
                placeholder={props.placeholder}
                placeholderTextColor={Colors.black}
                value={props.value}
                onChangeText={props.onChangeText}
                keyboardType={props.keyboardType ?? 'default'}
                secureTextEntry={props.secureTextEntry && !isPasswordVisible}
                autoCapitalize="none"
                maxLength={props.maxLength}
            />
            {props.secureTextEntry && (
                <TouchableOpacity
                    style={styles.passwordButton}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                    <FastImage
                        source={isPasswordVisible ? images.hide : images.show} 
                        style={styles.passwordImage}
                        tintColor={Colors.black}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.borderColor,
        borderWidth: 1,
        marginBottom: moderateScale(15),
        padding: moderateScale(5),
        backgroundColor: Colors.white,
        elevation: 4,
        marginHorizontal: moderateScale(2),
    },
    input: {
        flex: 1,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
        color: Colors.black,
    },
    passwordButton: {
        padding: moderateScale(5),
    },
    passwordImage: {
        width: moderateScale(20),
        height: moderateScale(20),
    },
});
export default TextInputView;