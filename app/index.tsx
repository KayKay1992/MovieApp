import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

interface ListItem {
  id: string;
  title: string;
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePress = (buttonName: 'Highlight' | 'WithoutFeedback') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(`${buttonName} Pressed`, `You clicked the ${buttonName} button!`);
    }, 2000);
  };

  const listData: ListItem[] = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
    { id: '5', title: 'Item 5' },
    { id: '6', title: 'Item 6' },
    { id: '7', title: 'Item 7' },
    { id: '8', title: 'Item 8' },
    { id: '9', title: 'Item 9' },
  ];

  const handleItemPress = (item: ListItem) => {
    Alert.alert('Item Pressed', `You selected ${item.title}`);
  };

  const renderItem = ({ item }: { item: ListItem }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleItemPress(item)}
      accessibilityLabel={`Select ${item.title}`}
      accessibilityRole="button"
    >
      <Text style={styles.listItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Welcome to My App</Text>
          </View>

          {/* Card Section */}
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

          {/* Button Section */}
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

          {/* List Section */}
          <View style={styles.listContainer}>
            <Text style={styles.listHeaderText}>Sample List</Text>
            <FlatList
              data={listData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={styles.flatList}
              contentContainerStyle={styles.flatListContent}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>

        {/* Footer Section */}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<{
  safeArea: ViewStyle;
  container: ViewStyle;
  scrollView: ViewStyle;
  scrollViewContent: ViewStyle;
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
  listContainer: ViewStyle;
  listHeaderText: TextStyle;
  flatList: ViewStyle;
  flatListContent: ViewStyle;
  listItem: ViewStyle;
  listItemText: TextStyle;
  footer: ViewStyle;
  footerItem: ViewStyle;
  footerText: TextStyle;
}>({

  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 40,
  },
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
  listContainer: {
    marginBottom: 20,
  },
  listHeaderText: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flatList: {},
  flatListContent: {
    paddingBottom: 20,
  },
  listItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#212121',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
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
