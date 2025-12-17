// app/tabs/generate.tsx
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import React, { useRef, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";

export default function Generate() {
  const [value, setValue] = useState("");
  const [qrColor, setQrColor] = useState("#0037fd");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [showQR, setShowQR] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  const viewShotRef = useRef<ViewShot>(null);

  const colorOptions = ["#0037fd", "#000000", "#00c853", "#ff1744"];
  const bgOptions = ["#ffffff", "#f5f5f5", "#ffe0b2", "#c8e6c9"];

  // Logo seç
  const pickLogo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setLogo(result.assets[0].uri);
    }
  };

  // QR Share (KESİN ÇALIŞIR)
  const shareQR = async () => {
    try {
      if (!viewShotRef.current) return;

const uri = await viewShotRef.current!.capture!();

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Error", "Sharing is not available on this device");
        return;
      }

      await Sharing.shareAsync(uri);
    } catch (e) {
      Alert.alert("Error", "QR paylaşılırken hata oluştu");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate QR Code</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter text here"
        value={value}
        onChangeText={(text) => {
          setValue(text);
          setShowQR(false);
        }}
      />

      <Text style={styles.sectionTitle}>QR Color</Text>
      <View style={styles.colorRow}>
        {colorOptions.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorDot,
              { backgroundColor: color },
              qrColor === color && styles.activeDot,
            ]}
            onPress={() => setQrColor(color)}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Background Color</Text>
      <View style={styles.colorRow}>
        {bgOptions.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorDot,
              { backgroundColor: color },
              bgColor === color && styles.activeDot,
            ]}
            onPress={() => setBgColor(color)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.blackButton} onPress={pickLogo}>
        <Text style={styles.blackButtonText}>
          {logo ? "Change Logo" : "Pick Logo from Gallery"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.blackButton} onPress={() => setShowQR(true)}>
        <Text style={styles.blackButtonText}>Generate QR</Text>
      </TouchableOpacity>

      {showQR && value && (
        <View style={styles.qrBox}>
          <ViewShot
            ref={viewShotRef}
            options={{ format: "png", quality: 1 }}
          >
            <QRCode
              value={value}
              size={180}
              color={qrColor}
              backgroundColor={bgColor}
              logo={logo ? { uri: logo } : undefined}
              logoSize={40}
            />
          </ViewShot>

          <TouchableOpacity style={styles.blackButton} onPress={shareQR}>
            <Text style={styles.blackButtonText}>Share QR</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.footer}>Developed by Özer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  title: { fontSize: 22, fontWeight: "700" },
  input: {
    width: "90%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  sectionTitle: { marginTop: 20, fontSize: 16, fontWeight: "600" },
  colorRow: { flexDirection: "row", marginTop: 10 },
  colorDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 6,
  },
  activeDot: { borderWidth: 2, borderColor: "#000" },
  blackButton: {
    marginTop: 16,
    backgroundColor: "#f2f2f2f2",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#000",
  },
  blackButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  qrBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 4,
    alignItems: "center",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    color: "#888",
    fontSize: 14,
  },
});
