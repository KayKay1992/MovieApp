import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';

const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const showAlert = () => {
    Alert.alert(
      'React Native Alert',
      'Do you want to continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
        <Text style={styles.name}>Jane Doe</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Open Modal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.alertButton]} onPress={showAlert}>
          <Text style={styles.buttonText}>Show Alert</Text>
        </TouchableOpacity>
      </View>

      {/* Body Content */}
      <View style={styles.body}>
        <Text style={styles.description}>
          Explore the beautiful world of React Native. This layout combines both static and background images!
        </Text>
      </View>

      {/* Modal Component */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Hello from the Modal!</Text>
            <Text style={styles.modalMessage}>You can customize this dialog box freely.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    gap: 10,
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  alertButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  body: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: 300,
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 6,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
