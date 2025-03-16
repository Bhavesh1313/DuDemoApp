import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../style';
import FastImage from 'react-native-fast-image';
import { t } from 'i18next';
import { images } from '../../../assets/images';
import { Colors } from '../../../utils/colors';

type CustomToolbarProps = {
    handleLogout: () => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ handleLogout }) => {
    return (
        <View style={styles.toolbar}>
            <Text style={styles.toolbarTitle}>{t('home.title')}</Text>
            <TouchableOpacity onPress={handleLogout}>
                <FastImage
                    source={images.logout}
                    style={styles.logout}
                    tintColor={Colors.white}
                />
            </TouchableOpacity>
        </View>
    );
};

export default CustomToolbar;
