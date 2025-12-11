// app/tabs/generate.tsx
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import React, { useState } from "react";
import QRCode from "react-native-qrcode-svg";

export default function Generate() {
  const [value, setValue] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate QR Code</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter text here"
        value={value}
        onChangeText={setValue}
      />

      <View style={{ marginTop: 16 }}>
        <Button title="Show QR Code" onPress={() => {}} />
      </View>

      <View style={{ marginTop: 24 }}>
        {value ? (
          <QRCode value={value} size={180} />
        ) : (
          <Text style={{ color: "#777" }}>Enter text to generate QR</Text>
        )}
      </View>

      <Text style={styles.footer}>Developed by Özer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
  footer: {
    position: "absolute",
    bottom: 20,
    color: "#888",
    fontSize: 14,
  },
});
