
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
     className="flex-1 justify-center items-center"
    >
      <Text className="text-dark-200 text-5xl font-bold">Welcome</Text>
      <Link href="/onboarding">Onboarding</Link>
      <Link href="/movie/[id], query: { id: 'avengers' }">Movie Details</Link>
     
    </View>
  );
}
