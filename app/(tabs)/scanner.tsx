import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, PermissionStatus, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torchOn, setTorchOn] = useState(false);

  useEffect(() => {
    if (permission?.status === PermissionStatus.DENIED) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <View style={styles.center}><Text>Loading...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Camera permission is required</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;

    setScanned(true);

    // open browser scanner
    Linking.openURL(data).catch(() => {
      Alert.alert("Invalid QR Code", data, [
        { text: "OK", onPress: () => setScanned(false) }
      ]);
    });
  };

  return (
    <View style={{ flex: 1 }}>
<CameraView
  style={{ flex: 1 }}
  facing="back"
  enableTorch={torchOn}
  zoom={0.1}
  barcodeScannerSettings={{
    barcodeTypes: ["qr", "ean13", "ean8", "code39", "code128"],
  }}
  onBarcodeScanned={handleBarCodeScanned}
/>


      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Scan QR Code</Text>
      </View>

      <View style={styles.flashContainer}>
        <TouchableOpacity 
          style={styles.flashButton} 
          onPress={() => setTorchOn(prev => !prev)}
        >
          <MaterialIcons
            name={torchOn ? 'flashlight-off' : 'flashlight-on'}
            size={28}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 60,
    width: '100%',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  flashContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  flashButton: {
    padding: 14,
    borderRadius: 50,
  },
});
