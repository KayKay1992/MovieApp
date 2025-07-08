import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';
import { router } from 'expo-router';

const Saved = () => {
  return (
    <View className="flex-1 bg-primary px-10 justify-center items-center">
      <View className="items-center space-y-4">
        <Image
          source={icons.save}
          className="w-10 h-10"
          style={{ tintColor: '#fff' }}
          resizeMode="contain"
        />

        <Text className="text-white text-lg font-semibold">
          No saved items yet
        </Text>

        <Text className="text-gray-400 text-center text-sm px-2">
          Tap the save icon on a movie to find it here later.
        </Text>

        <TouchableOpacity className="mt-4 bg-blue-600 px-5 py-2 rounded-xl"  onPress={() => router.push("/")}>
          <Text className="text-white text-base font-medium">
            Explore Movies
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Saved;
