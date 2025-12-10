import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Kamera izni gerekli
        </Text>

        <Text
          onPress={requestPermission}
          style={{ color: "blue", fontSize: 16 }}
        >
          İzin ver
        </Text>
      </View>
    );
  }

  const handleScan = ({ data }: any) => {
    if (scanned) return;
    setScanned(true);

    Alert.alert("QR Kod", data, [
      { text: "Tamam", onPress: () => setScanned(false) },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "ean8", "code39", "code128"],
        }}
        onBarcodeScanned={handleScan}
      />

      <View style={styles.overlay}>
        <Text style={styles.text}>QR Kod Tara</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  overlay: {
    position: "absolute",
    top: 60,
    width: "100%",
    alignItems: "center",
  },
  text: { color: "white", fontSize: 20, fontWeight: "bold" },
});
