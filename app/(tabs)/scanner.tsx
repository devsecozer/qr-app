// app/(tabs)/scanner.tsx
import { MaterialIcons } from "@expo/vector-icons";
import { CameraView, PermissionStatus, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
const [showModal, setShowModal] = useState(false);


  // ✅ animation
  const scanLine = useRef(new Animated.Value(0)).current;

  // 🔁 Scan line 
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scanLine, {
          toValue: 1,
          duration: 1800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanLine, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, []);

  // 📸 Camera access
  useEffect(() => {
    if (permission?.status === PermissionStatus.DENIED) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Camera permission is required
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionButton}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 📦 QR scan
  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;

    let url = data.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
setScanned(true);
setScannedData(url);
setShowModal(true);

  };

return (
  <View style={{ flex: 1 }}>
    <CameraView
      style={{ flex: 1 }}
      facing="back"
      enableTorch={torchOn}
      zoom={0.2}
      barcodeScannerSettings={{
        barcodeTypes: ["qr", "ean13", "ean8", "code39", "code128"],
      }}
      onBarcodeScanned={handleBarCodeScanned}
    />

    {/* Scan frame */}
    <View style={styles.scanFrame} />

    {/* Scan line */}
    <Animated.View
      style={[
        styles.scanLine,
        {
          transform: [
            {
              translateY: scanLine.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 260],
              }),
            },
          ],
        },
      ]}
    />

    {/* Title */}
    <View style={styles.overlay}>
      <Text style={styles.overlayText}>Scan QR Code</Text>
    </View>

    {/* Flash Button */}
    <View style={styles.flashContainer}>
      <TouchableOpacity
        style={styles.flashButton}
        onPress={() => setTorchOn((prev) => !prev)}
      >
        <MaterialIcons
          name={torchOn ? "flashlight-off" : "flashlight-on"}
          size={28}
          color="#fff"
        />
      </TouchableOpacity>
    </View>

    {/* 🔥 MODAL — MUTLAKA AYNI ROOT İÇİNDE */}
    {showModal && scannedData && (
      <View style={styles.modalOverlay}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>QR Code Found</Text>
          <Text style={styles.modalText} numberOfLines={2}>
            {scannedData}
          </Text>

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setShowModal(false);
              Linking.openURL(scannedData);
              setTimeout(() => setScanned(false), 1500);
            }}
          >
            <Text style={styles.modalButtonText}>Open Link</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={() => {
              setShowModal(false);
              setScanned(false);
            }}
          >
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
  </View>
);
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  permissionButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },

  permissionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  overlay: {
    position: "absolute",
    top: 60,
    width: "100%",
    alignItems: "center",
  },

  overlayText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  flashContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },

  flashButton: {
    padding: 14,
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  scanFrame: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 260,
    height: 260,
    marginLeft: -130,
    marginTop: -130,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.7)",
  },

  scanLine: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 260,
    height: 2,
    marginLeft: -130,
    marginTop: -130,
    backgroundColor: "#00ff9c",
    opacity: 0.85,
  },
  modalOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  justifyContent: "flex-end",
},

modal: {
  backgroundColor: "#fff",
  padding: 20,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},

modalTitle: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 6,
},

modalText: {
  color: "#555",
  marginBottom: 16,
},

modalButton: {
  backgroundColor: "#0037fd",
  padding: 14,
  borderRadius: 12,
  alignItems: "center",
  marginBottom: 10,
},

cancelButton: {
  backgroundColor: "#aaa",
},

modalButtonText: {
  color: "#fff",
  fontWeight: "bold",
},

});
