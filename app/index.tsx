import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  Switch,
  StatusBar,
} from 'react-native';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => setIsDarkMode((prev) => !prev);

  return (
    <SafeAreaView style={[styles.safeArea, isDarkMode && styles.darkBackground]}>
      {/* Status Bar */}
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#333' : '#f5f5f5'}
      />

      {/* Header with background image */}
      <ImageBackground
        source={{ uri: 'https://picsum.photos/800/300' }}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <Text style={styles.headerText}>Welcome to the Jungle</Text>
      </ImageBackground>

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
          style={styles.profileImage}
        />
        <Text style={[styles.name, isDarkMode && styles.textLight]}>Jane Doe</Text>
      </View>

      {/* Body Content */}
      <View style={styles.body}>
        <Text style={[styles.description, isDarkMode && styles.textLight]}>
          Explore the beautiful world of React Native. This layout combines both static and background images!
        </Text>

        {/* Dark Mode Toggle */}
        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, isDarkMode && styles.textLight]}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleSwitch}
            trackColor={{ false: '#ccc', true: '#81b0ff' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkBackground: {
    backgroundColor: '#121212',
  },
  headerBackground: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  body: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
  switchContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 18,
    color: '#333',
  },
  textLight: {
    color: '#fff',
  },
});

export default App;












// import { Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Edit app/index.tsx to edit this weldone.</Text>
//     </View>
//   );
// }
