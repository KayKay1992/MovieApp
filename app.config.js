import 'dotenv/config';

export default {
  expo: {
    name: "MovieFlex",
    slug: "Movie_flex",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo.png",
    scheme: "mobilemovieapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/logo.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/logo.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/logo.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    assetBundlePatterns: ["assets/**/*"],
    packagerOpts: {
      assetExts: ["png", "jpg", "jpeg", "ttf", "woff", "woff2"],
    },
    extra: {
      apiKey: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    },
  },
};

