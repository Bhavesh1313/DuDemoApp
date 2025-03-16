import { CommonActions } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    Text,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN } from '../../navigation/routes';
import { getPopularMovies } from '../../network/fetchHelper';
import { clearAuthCredentials } from '../../redux/reducers/loginSlice';
import { persistor, RootState } from '../../redux/store';
import { Colors } from '../../utils/colors';
import CustomToolbar from './components/CustomToolbar';
import MovieItem from './components/MovieItem';
import Pagination from './components/Pagination';
import styles from './style';

type MovieDetails = {
    id: number;
    title: string;
    poster_path: string;
}

type HomeScreenProps = {
    navigation: {
        [x: string]: any;
        replace: (screen: string) => void;
    };
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [movies, setMovies] = useState<MovieDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState<number>(1);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { selectedLanguage } = useSelector((state: RootState) => state.language);

    const fetchMovies = useCallback(async () => {
        setLoading(true);
        try {
            const movieData = await getPopularMovies(selectedLanguage, page);
            setMovies(movieData);
        } catch (error) {
            setMovies([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [page, selectedLanguage]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.noRecordFoundText}>{t('home.noRecordFound')}</Text>
        </View>
    );

    const handleLogout = () => {
        Alert.alert(t('home.logout'), t('home.logout_msg'), [
            {
                text: t('home.cancel'),
            },
            {
                text: t('home.yes'),
                onPress: () => {
                    dispatch(clearAuthCredentials());
                    persistor.purge().then(() => {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: LOGIN }],
                            })
                        );
                    });
                },
            },
        ]);
    };

    const renderItem = useCallback(({ item }: { item: MovieDetails }) => {
        return <MovieItem item={item} />;
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchMovies();
    }, [fetchMovies]);

    return (
        <SafeAreaView style={styles.container}>
            <CustomToolbar handleLogout={handleLogout} />
            <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
            <View style={styles.subContainer}>
                {loading ? (
                    <View style={styles.indicatorContainer}>
                        <ActivityIndicator size={'large'} color={Colors.primary} />
                    </View>
                ) : (
                    <FlatList
                        data={movies}
                        style={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        keyExtractor={(item) => item?.id?.toString()}
                        numColumns={2}
                        ListEmptyComponent={() => renderEmptyComponent()}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={[Colors.primary]}
                            />
                        }
                    />
                )}
                <Pagination
                    onPreviousPageChange={() => setPage((prevPage) => prevPage - 1)}
                    onNextPageChange={() => setPage((prevPage) => prevPage + 1)}
                />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
