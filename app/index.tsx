import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Alert } from 'react-native';

const App = () => {
  // Function to handle button press
  const handlePress = () => {
    Alert.alert('Button Pressed', 'You clicked the button!');
  };

  return (
    // Root View: Full-screen container with Flexbox
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

      {/* Button Section: Demonstrates touch handling with TouchableHighlight */}
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          onPress={handlePress}
          style={styles.button}
          underlayColor="#e45367" // Darker orange when pressed
        >
          <Text style={styles.buttonText}>Press Me</Text>
        </TouchableHighlight>
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

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the full screen
    backgroundColor: '#f0f0f0', // Light gray background
    padding: 20,
  },
  header: {
    backgroundColor: '#6200ea', // Purple background
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center', // Center content horizontally
  },
  headerText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff', // White background
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  cardHeader: {
    backgroundColor: '#03a9f4', // Blue background
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
    alignItems: 'center', // Center button horizontally
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff5722', // Orange background
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-between', // Space items evenly
    backgroundColor: '#212121', // Dark background
    padding: 10,
    borderRadius: 10,
  },
  footerItem: {
    flex: 1, // Each item takes equal space
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#ffffff',
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
