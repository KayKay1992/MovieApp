import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMovieDetails } from '@/services/api'
import { icons } from '@/constants/icons'

// Type definitions for our components
interface MovieInfoProps {
  label: string
  value?: string | number | null | undefined
}

/**
 * Reusable component for displaying movie information in a label-value format
 */
const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 font-normal text-sm'>
      {label}
    </Text>
    <Text className='text-light-100 font-bold text-sm mt-2'>
      {value !== null && value !== undefined ? String(value) : 'N/A'}
    </Text>
  </View>
)

/**
 * Format large numbers into readable strings (millions/billions)
 */
const formatCurrency = (amount: number | undefined) => {
  if (!amount) return '$0'
  
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}B`
  }
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`
  }
  return `$${amount.toLocaleString()}`
}

/**
 * Format runtime from minutes to "Xh Ym" format
 */
const formatRuntime = (minutes: number | null | undefined): string => {
  if (minutes == null || minutes === 0) return 'N/A'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}


const MovieDetails = () => {
  const { id } = useLocalSearchParams()
  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string))

  if (loading) {
    return (
      <View className='bg-primary flex-1 items-center justify-center'>
        <Text className='text-white'>Loading...</Text>
      </View>
    )
  }

  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Movie Poster */}
        <View>
          <Image 
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} 
            className='w-full h-[550px]' 
            resizeMode='cover'
          />
        </View>

        {/* Basic Info Section */}
        <View className='px-5 mt-5'>
          <Text className='text-white font-bold text-2xl'>{movie?.title}</Text>
          
          <View className='flex-row items-center gap-3 mt-2'>
            <Text className='text-light-200 text-sm'>
              {movie?.release_date?.split('-')[0]}
            </Text>
        <MovieInfo label="Runtime" value={formatRuntime(movie?.runtime)} />
            {movie?.adult && (
              <Text className='text-red-500 text-xs border border-red-500 px-1'>18+</Text>
            )}
          </View>

          {/* Rating Info */}
          <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2 self-start'>
            <Image source={icons.star} className='size-4'/>
            <Text className='text-white font-bold text-sm'>
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className='text-light-200 text-sm'>
              ({movie?.vote_count?.toLocaleString()} votes)
            </Text>
          </View>
        </View>

        {/* Detailed Info Section */}
        <View className='px-5 mt-3'>
          <MovieInfo label="Overview" value={movie?.overview}/>
          
          <MovieInfo 
            label="Genres" 
            value={movie?.genres?.map(g => g.name).join(' • ') || 'N/A'}
          />
          
          <MovieInfo 
            label="Original Language" 
            value={movie?.original_language?.toUpperCase()}
          />

          <View className='flex-row justify-between mt-5'>
            <MovieInfo label='Budget' value={formatCurrency(movie?.budget)}/>
            <MovieInfo label='Revenue' value={formatCurrency(movie?.revenue)}/>
          </View>

          <MovieInfo 
            label='Production Companies' 
            value={movie?.production_companies?.map(c => c.name).join(' • ') || 'N/A'}
          />

          <MovieInfo 
            label='Production Countries' 
            value={movie?.production_countries?.map(c => c.name).join(' • ') || 'N/A'}
          />

          <MovieInfo 
            label='Status' 
            value={movie?.status}
          />

          {movie?.homepage && (
            <MovieInfo 
              label='Website' 
              value={movie.homepage}
            />
          )}
        </View>

        {/* Cast Section (would need additional API call) */}
        {/* <CastList movieId={id as string} /> */}
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity 
        className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex-row items-center justify-center z-50'
        onPress={router.back}
      >
        <Image 
          source={icons.arrow} 
          className='size-5 mt-0.5 mr-1 rotate-180' 
          tintColor='#fff'
        />
        <Text className='text-white font-semibold text-base'>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({}) 