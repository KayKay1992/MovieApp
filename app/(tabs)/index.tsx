import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
} from "react-native";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const renderMovie = ({ item }: { item: Movie }) => <MovieCard {...item} />;

  const ListHeader = () => (
    <View className="px-5">
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      <SearchBar
        onPress={() => router.push("/search")}
        placeholder="Search for a movie..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {trendingMovies && (
        <View className="mt-10">
          <Text className="text-lg text-white font-bold mb-3">
            Trending Movies
          </Text>
          <FlatList
            horizontal
            data={trendingMovies}
            renderItem={({ item, index }) => (
              <TrendingCard movie={item} index={index} />
            )}
            keyExtractor={(item) => `trending-${item.movie_id}-${Math.random().toString(36).substr(2, 9)}`}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-4" />}
            className="mb-5"
          />
        </View>
      )}

      <Text className="text-lg text-white font-bold mt-5 mb-3">
        Latest Movies
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      {moviesLoading || trendingLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          className="mt-10 self-center"
        />
      ) : moviesError || trendingError ? (
        <Text className="text-red-500 text-center mt-10">
          Error: {moviesError?.message || trendingError?.message}
        </Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovie}
         keyExtractor={(item) => `movie-${item.id}-${Math.random().toString(36).substr(2, 9)}`}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
          }}
          ListHeaderComponent={ListHeader}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
          className="px-5"
        />
      )}
    </View>
  );
}
