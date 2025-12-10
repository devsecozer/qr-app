// app/tabs/generate.tsx
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import QRCode from "react-native-qrcode-svg"; // npm install react-native-qrcode-svg

export default function Generate() {
  const [value, setValue] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Oluştur</Text>
      <TextInput
        style={styles.input}
        placeholder="Buraya metin yaz"
        value={value}
        onChangeText={setValue}
      />

      <View style={{ marginTop: 16 }}>
        <Button title="QR Gör" onPress={() => {}} />
      </View>

      <View style={{ marginTop: 24 }}>
        {value ? <QRCode value={value} size={180} /> : <Text>QR görmek için metin gir</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,alignItems:'center',justifyContent:'flex-start',padding:20, paddingTop:60},
  title:{fontSize:22,fontWeight:'700'},
  input:{width:'90%',borderColor:'#ccc',borderWidth:1,borderRadius:8,padding:12,marginTop:12}
});
