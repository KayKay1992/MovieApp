import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import useFetch from '@/services/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { icons } from '@/constants/icons';
import { WebView } from 'react-native-webview';

interface MovieInfoProps {
  label: string;
  value?: string | number | null | undefined;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value !== null && value !== undefined ? String(value) : 'N/A'}
    </Text>
  </View>
);

const formatCurrency = (amount: number | undefined) => {
  if (!amount) return '$0';
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  return `$${amount.toLocaleString()}`;
};

const formatRuntime = (minutes: number | null | undefined): string => {
  if (minutes == null || minutes === 0) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));

  const [loadingWebView, setLoadingWebView] = useState(true);
  const [showFullMovie, setShowFullMovie] = useState(false);
  const [hasFullMovie, setHasFullMovie] = useState(false);
  const [fullMovieUrl, setFullMovieUrl] = useState('');

  useEffect(() => {
    if (movie?.videos?.results) {
      // Try to find official full movie on YouTube
      const officialFullMovie = movie.videos.results.find(
        (video) =>
          (video.type === 'Feature Film' ||
            video.type === 'Feature' ||
            video.name?.toLowerCase().includes('full movie')) &&
          video.site === 'YouTube' &&
          video.official
      );

      // If no official full movie, try any full movie
      const anyFullMovie = officialFullMovie || movie.videos.results.find(
        (video) =>
          (video.type === 'Feature Film' ||
            video.type === 'Feature' ||
            video.name?.toLowerCase().includes('full movie')) &&
          video.site === 'YouTube'
      );

      // Create YouTube search URL as fallback
      const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
        movie.title + ' full movie'
      )}`;

      if (anyFullMovie) {
        setFullMovieUrl(`https://www.youtube.com/embed/${anyFullMovie.key}?autoplay=1&controls=1`);
        setHasFullMovie(true);
      } else {
        setFullMovieUrl(youtubeSearchUrl);
        setHasFullMovie(false);
      }
    }
  }, [movie]);

  if (loading) {
    return (
      <View className="bg-primary flex-1 items-center justify-center">
        <Text className="text-white">Loading...</Text>
      </View>
    );
  }

  const trailer = movie?.videos?.results?.find(
    (video) =>
      (video.type === 'Trailer' || video.type === 'Teaser') &&
      (video.site === 'YouTube' || video.site === 'Vimeo')
  );

  const videoUrl = showFullMovie && fullMovieUrl && hasFullMovie
    ? fullMovieUrl
    : trailer?.site === 'YouTube'
    ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&controls=1`
    : trailer?.site === 'Vimeo'
    ? `https://player.vimeo.com/video/${trailer.key}?autoplay=1`
    : null;

  const handleWatchFullMovie = () => {
    if (hasFullMovie) {
      setShowFullMovie(true);
      setLoadingWebView(true);
    } else {
      Linking.openURL(fullMovieUrl);
    }
  };

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Debug info (visible only in development) */}
        {__DEV__ && (
          <View className="bg-dark-100 p-2 mx-5 mt-2 rounded">
            <Text className="text-light-200 text-xs">
              {hasFullMovie ? 'Full movie available' : 'No full movie found'}
            </Text>
          </View>
        )}

        {/* Trailer/Poster Section */}
        <View className="w-full h-[550px] bg-black">
          {videoUrl ? (
            <>
              {loadingWebView && (
                <View className="absolute inset-0 items-center justify-center z-10 bg-black/70">
                  <ActivityIndicator size="large" color="#fff" />
                  <Text className="text-white mt-2">
                    {showFullMovie ? 'Loading Movie...' : 'Loading Trailer...'}
                  </Text>
                </View>
              )}
              <WebView
                source={{ uri: videoUrl }}
                javaScriptEnabled
                allowsFullscreenVideo
                onLoadEnd={() => setLoadingWebView(false)}
                style={{ flex: 1 }}
              />
            </>
          ) : movie?.poster_path ? (
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-white">No trailer or poster available.</Text>
            </View>
          )}
        </View>

        {/* Basic Info Section */}
        <View className="px-5 mt-5">
          <Text className="text-white font-bold text-2xl">{movie?.title}</Text>

          <View className="flex-row items-center gap-3 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split('-')[0]}
            </Text>
            <MovieInfo label="Runtime" value={formatRuntime(movie?.runtime)} />
            {movie?.adult && (
              <Text className="text-red-500 text-xs border border-red-500 px-1">
                18+
              </Text>
            )}
          </View>

          {/* Rating Info */}
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2 self-start">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count?.toLocaleString()} votes)
            </Text>
          </View>
        </View>

        {/* Watch Full Movie Button */}
        {fullMovieUrl && !showFullMovie && (
          <TouchableOpacity
            className={`mx-5 mt-5 rounded-lg py-3.5 flex-row items-center justify-center ${
              hasFullMovie ? 'bg-red-600' : 'bg-dark-100'
            }`}
            onPress={handleWatchFullMovie}
          >
            <Image source={icons.play} className="size-5 mr-2" tintColor="#fff" />
            <Text className="text-white font-semibold text-base">
              {hasFullMovie ? 'Watch Full Movie' : 'Search for Full Movie'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Detailed Info Section */}
        <View className="px-5 mt-3">
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(' • ') || 'N/A'}
          />
          <MovieInfo
            label="Original Language"
            value={movie?.original_language?.toUpperCase()}
          />

          <View className="flex-row justify-between mt-5">
            <MovieInfo label="Budget" value={formatCurrency(movie?.budget)} />
            <MovieInfo label="Revenue" value={formatCurrency(movie?.revenue)} />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(' • ') || 'N/A'
            }
          />

          <MovieInfo
            label="Production Countries"
            value={
              movie?.production_countries?.map((c) => c.name).join(' • ') || 'N/A'
            }
          />

          <MovieInfo label="Status" value={movie?.status} />

          {movie?.homepage && <MovieInfo label="Website" value={movie.homepage} />}
        </View>
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mt-0.5 mr-1 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});