import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { MOVIE_POSTER_BASE_URL } from '../../../utils/constants';
import styles from '../style';

type MovieDetails = {
    id: number;
    title: string;
    poster_path: string;
}

type MovieItemProps = {
    item: MovieDetails;
}

const MovieItem: React.FC<MovieItemProps> = ({ item }) => {
    const { title = '', poster_path = '' } = item;
    return (
        <View style={styles.movieItem}>
            <FastImage
                source={{ uri: `${MOVIE_POSTER_BASE_URL}${poster_path}` }}
                style={styles.poster}
                resizeMode={FastImage.resizeMode.stretch}
            />
            <Text numberOfLines={1} style={styles.title} ellipsizeMode="tail" >{title}</Text>
        </View>
    );
};

export default MovieItem;
