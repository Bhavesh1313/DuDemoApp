import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { images } from '../../../assets/images';
import { Colors } from '../../../utils/colors';
import { TOTAL_PAGES } from '../../../utils/constants';
import styles from '../style';

type PaginationProps = {
    onPreviousPageChange: () => void;
    onNextPageChange: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ onPreviousPageChange, onNextPageChange }) => {
    const [page, setPage] = useState<number>(1);

    const handlePreviousPage = useCallback(() => {
        setPage(prevPage => {
            const newPage = prevPage - 1;
            if (newPage !== prevPage) {
                onPreviousPageChange();
            }
            return newPage;
        });
    }, [onPreviousPageChange]);

    const handleNextPage = useCallback(() => {
        setPage(prevPage => {
            const newPage = prevPage + 1;
            if (newPage !== prevPage) {
                onNextPageChange();
            }
            return newPage;
        });
    }, [onNextPageChange]);

    return (
        <View style={styles.paginationContainer}>
            <TouchableOpacity
                disabled={page === 1}
                style={page === 1 ? styles.paginationBtnDisabled : styles.paginationBtn}
                onPress={handlePreviousPage}>
                <FastImage
                    source={images.pagination_arrow}
                    style={styles.leftArrow}
                    tintColor={Colors.white}
                />
            </TouchableOpacity>
            <Text style={styles.pageNumber}>{page}</Text>
            <TouchableOpacity
                disabled={page === TOTAL_PAGES}
                style={page === TOTAL_PAGES ? styles.paginationBtnDisabled : styles.paginationBtn}
                onPress={handleNextPage}>
                <FastImage
                    source={images.pagination_arrow}
                    style={styles.rightArrow}
                    tintColor={Colors.white}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Pagination;
