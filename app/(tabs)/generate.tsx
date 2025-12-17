// app/tabs/generate.tsx
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function Generate() {
  const [value, setValue] = useState("");
  const [qrColor, setQrColor] = useState("#0037fd");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [showQR, setShowQR] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const qrRef = useRef<any>(null);

  const colorOptions = ["#0037fd", "#000000", "#00c853", "#ff1744"];
  const bgOptions = ["#ffffff", "#f5f5f5", "#ffe0b2", "#c8e6c9"];

  // Logo seçme
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

  // QR'ı kaydetme
  const saveQR = () => {
    if (!qrRef.current) return;

    qrRef.current.toDataURL(async (data: string) => {
      try {
        const path = (FileSystem as any).cacheDirectory + "qr.png"; // TS bypass
        await FileSystem.writeAsStringAsync(path, data, { encoding: "base64" });
        Alert.alert("Saved!", `QR code saved to: ${path}`);
      } catch (err: any) {
        Alert.alert("Error", "Failed to save QR code: " + err.message);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate QR Code</Text>

      {/* Text input */}
      <TextInput
        style={styles.input}
        placeholder="Enter text here"
        value={value}
        onChangeText={(text) => {
          setValue(text);
          setShowQR(false);
        }}
      />

      {/* QR Color Picker */}
      <Text style={styles.sectionTitle}>QR Color</Text>
      <View style={styles.colorRow}>
        {colorOptions.map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.colorDot, { backgroundColor: color }, qrColor === color && styles.activeDot]}
            onPress={() => setQrColor(color)}
          />
        ))}
      </View>

      {/* Background Color Picker */}
      <Text style={styles.sectionTitle}>Background Color</Text>
      <View style={styles.colorRow}>
        {bgOptions.map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.colorDot, { backgroundColor: color }, bgColor === color && styles.activeDot]}
            onPress={() => setBgColor(color)}
          />
        ))}
      </View>

      {/* Logo Picker */}
      <TouchableOpacity style={styles.logoButton} onPress={pickLogo}>
        <Text style={styles.logoButtonText}>{logo ? "Change Logo" : "Pick Logo from Gallery"}</Text>
      </TouchableOpacity>

      {/* Generate Button */}
      <TouchableOpacity style={styles.generateButton} onPress={() => setShowQR(true)}>
        <Text style={styles.generateButtonText}>Generate QR</Text>
      </TouchableOpacity>

      {/* QR Code */}
      <View style={styles.qrBox}>
        {showQR && value && (
          <>
            <QRCode
              ref={qrRef}
              value={value}
              size={180}
              color={qrColor}
              backgroundColor={bgColor}
              logo={logo ? { uri: logo } : undefined}
              logoSize={40}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveQR}>
              <Text style={styles.saveButtonText}>Save QR</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Text style={styles.footer}>Developed by Özer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "flex-start", padding: 20, paddingTop: 60 },
  title: { fontSize: 22, fontWeight: "700" },
  input: { width: "90%", borderColor: "#ccc", borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 12 },
  sectionTitle: { marginTop: 20, fontSize: 16, fontWeight: "600" },
  colorRow: { flexDirection: "row", marginTop: 10 },
  colorDot: { width: 32, height: 32, borderRadius: 16, marginHorizontal: 6 },
  activeDot: { borderWidth: 2, borderColor: "#000" },
  logoButton: { marginTop: 16, backgroundColor: "#ff8c00", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 },
  logoButtonText: { color: "#fff", fontWeight: "bold" },
  generateButton: { marginTop: 16, backgroundColor: "#0037fd", paddingVertical: 14, paddingHorizontal: 40, borderRadius: 14 },
  generateButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  qrBox: { marginTop: 20, padding: 16, backgroundColor: "#fff", borderRadius: 20, elevation: 4, alignItems: "center" },
  saveButton: { marginTop: 12, backgroundColor: "#00c853", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12 },
  saveButtonText: { color: "#fff", fontWeight: "bold" },
  footer: { position: "absolute", bottom: 20, color: "#888", fontSize: 14 },
});
