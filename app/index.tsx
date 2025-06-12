import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePress = (buttonName: 'Highlight' | 'WithoutFeedback') => {
    setIsLoading(true);
    // Simulate a loading task (e.g., API call)
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(`${buttonName} Pressed`, `You clicked the ${buttonName} button!`);
    }, 2000); // 2-second delay
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to My App</Text>
      </View>

      {/* Card Section: Demonstrates nested Views and styling */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Featured Content</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardBodyText}>
            This is a card-like component created using nested View components. It
            showcases Flexbox layout and styling.
          </Text>
        </View>
      </View>

      {/* Button Section: Includes TouchableHighlight, TouchableWithoutFeedback, and ActivityIndicator */}
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#6200ea" style={styles.loader} />
        ) : (
          <>
            <TouchableHighlight
              onPress={() => handlePress('Highlight')}
              style={styles.button}
              underlayColor="#e64a19"
              accessibilityLabel="Highlight button"
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>Press Me (Highlight)</Text>
            </TouchableHighlight>
            <TouchableWithoutFeedback
              onPress={() => handlePress('WithoutFeedback')}
              accessibilityLabel="No feedback button"
              accessibilityRole="button"
            >
              <View style={styles.noFeedbackButton}>
                <Text style={styles.buttonText}>Press Me (No Feedback)</Text>
              </View>
            </TouchableWithoutFeedback>
          </>
        )}
      </View>

      {/* Footer Section: Row layout with multiple items */}
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={styles.footerText}>Home</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={styles.footerText}>Profile</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={styles.footerText}>Settings</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create<{
  container: ViewStyle;
  header: ViewStyle;
  headerText: TextStyle;
  card: ViewStyle;
  cardHeader: ViewStyle;
  cardHeaderText: TextStyle;
  cardBody: ViewStyle;
  cardBodyText: TextStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  noFeedbackButton: ViewStyle;
  buttonText: TextStyle;
  loader: ViewStyle;
  footer: ViewStyle;
  footerItem: ViewStyle;
  footerText: TextStyle;
}>({
  container: { flex: 1, backgroundColor: '#f0f0f0', padding: 20 },
  header: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    backgroundColor: '#03a9f4',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardHeaderText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  cardBody: {
    padding: 15,
  },
  cardBodyText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff5722',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
  },
  noFeedbackButton: {
    backgroundColor: '#0288d1',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loader: {
    marginVertical: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#212121',
    padding: 10,
    borderRadius: 10,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#ffffff',
  },
} as const);

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
