import axios from 'axios';
import { t } from 'i18next';
import { Alert } from 'react-native';
import { AUTH_TOKEN_PREFIX, MOVIE_DB_API_BASE_URL, MOVIE_DB_API_KEY } from '../utils/constants';

type MovieDetails = {
    id: number;
    title: string;
    poster_path: string;
};

type ApiResponse = {
    results: MovieDetails[];
};

export const getPopularMovies = async (languageCode: string, pageNumber: number): Promise<MovieDetails[]> => {
    try {
        const response = await axios.get<ApiResponse>(MOVIE_DB_API_BASE_URL, {
            params: {
                api_key: MOVIE_DB_API_KEY,
                language: languageCode,
                page: pageNumber,
            },
            headers: {
                Authorization: AUTH_TOKEN_PREFIX,
                Accept: 'application/json',
            },
            timeout: 10000,
        });
        if (response.status === 200) {
            return response?.data?.results || [];
        } else {
            return [];
        }
    } catch (error: any) {
        handleApiError(error);
        throw error;
    }
};

const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        Alert.alert(t('home.networkTitle'), t('home.networkErrorMsg'));
    } else {
        console.log('Unknown Error:', error);
    }
};
