import { I18nManager, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../utils/colors';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: moderateScale(25),
        justifyContent: 'center',
        backgroundColor: Colors.backgroundColor,
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        borderColor: Colors.borderColor,
        borderWidth: 1,
        marginBottom: moderateScale(15),
        padding: moderateScale(10),
        backgroundColor: Colors.white,
        elevation: 4,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
        marginHorizontal: moderateScale(2),
        color: Colors.black,
    },
    errorText: {
        color: Colors.red,
        marginBottom: moderateScale(10),
        marginHorizontal: moderateScale(2),
    },
    dropdown: {
        height: verticalScale(40),
        paddingHorizontal: moderateScale(8),
        backgroundColor: Colors.white,
        elevation: 4,
        marginHorizontal: moderateScale(2),
        color: Colors.black,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        borderColor: "#E5E7EB",
    },
    dropdownContainer: {
        position: 'absolute',
        top: 10,
        left: 0,
        width: '35%',
    },
    dropdownContainerStyle: {
        backgroundColor: Colors.white,
        elevation: 4,
        marginHorizontal: moderateScale(1),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        borderColor: "#E5E7EB",
    },
    dropdownText: {
        fontSize: 16,
        color: Colors.black,
    },
    dropdownItemContainer: {
        borderBottomColor: Colors.primary,
        borderBottomWidth: 0,
    },
    dropdownIconStyle: {
        tintColor: Colors.primary,
    },
    dropdownItemTextStyle: {
        color: Colors.black,
    },
    submitBtn: {
        backgroundColor: Colors.primary,
        padding: moderateScale(15),
        alignItems: 'center',
        elevation: 4,
        marginHorizontal: moderateScale(2),
    },
    submitBtnDisabled: {
        backgroundColor: Colors.disable,
        padding: moderateScale(15),
        alignItems: 'center',
        elevation: 4,
        marginHorizontal: moderateScale(2),
    },
    submitText: {
        color: Colors.white,
        fontWeight: 'bold',
    },
    poster: {
        width: scale(110),
        height: verticalScale(100),
        backgroundColor: Colors.backgroundColor,
        alignSelf: 'center',
        marginTop: moderateScale(50),
        marginBottom: moderateScale(20),
    },
    forgotPassword: {
        alignSelf: "flex-end",
        color: Colors.primary,
        marginBottom: moderateScale(20),
    },
    createAccount: { 
        alignSelf: "center",
        marginTop: moderateScale(20), 
        color: Colors.primary,
        fontSize: 16,
    },
});

export default styles;
