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
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../navigation/routes';
import { getPopularMovies } from '../../network/fetchHelper';
import { clearAuthCredentials } from '../../redux/reducers/loginSlice';
import { persistor } from '../../redux/store';
import { Colors } from '../../utils/colors';
import { LANGUAGE_STORAGE_KEY } from '../../utils/constants';
import SecureStorage from '../../utils/SensitiveStorage';
import CustomToolbar from './components/CustomToolbar';
import MovieItem from './components/MovieItem';
import styles from './style';

type MovieDetails = {
    id: number;
    title: string;
    poster_path: string;
};

type HomeScreenProps = {
    navigation: {
        [x: string]: any;
        replace: (screen: string) => void;
    };
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [movies, setMovies] = useState<MovieDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [selectedLanguage,setSelectedLanguage] =useState<string>('');


    useEffect(() => {
        const fetchLanguageAndMovies = async () => {
            let language: string | null = await SecureStorage.getItem(LANGUAGE_STORAGE_KEY);
            const selectedLang = language ?? 'en';
            setSelectedLanguage(selectedLang);
            fetchMovies(1, false);
        };
    
        fetchLanguageAndMovies();
    }, []);

    const fetchMovies = useCallback(async (currentPage: number, isLoadMore = false) => {
        if (isLoadMore) setLoadingMore(true);
        else setLoading(true);
        try {
            const movieData = await getPopularMovies(selectedLanguage, currentPage);
            setMovies((prevMovies) => (isLoadMore ? [...prevMovies, ...movieData] : movieData));
        } catch (error) {
            if (!isLoadMore) setMovies([]);
        } finally {
            setLoading(false);
            setLoadingMore(false);
            setRefreshing(false);
        }
    }, [selectedLanguage]);

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
        setPage(1);
        fetchMovies(1);
    }, [fetchMovies]);

    const loadMoreMovies = useCallback(() => {
        if (!loadingMore) {
            setPage((prevPage) => {
                const nextPage = prevPage + 1;
                fetchMovies(nextPage, true);
                return nextPage;
            });
        }
    }, [loadingMore, fetchMovies]);


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
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        ListEmptyComponent={renderEmptyComponent}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={[Colors.primary]}
                            />
                        }
                        onEndReached={loadMoreMovies}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={loadingMore ? (
                            <ActivityIndicator size="small" color={Colors.primary} style={styles.listFooterComponent} />
                        ) : null}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;