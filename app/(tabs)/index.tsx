// app/tabs/index.tsx
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Scan() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Scanner</Text>
      <Text style={styles.subtitle}>Kamera izinlerini ekleyip burada tarama yapacağız.</Text>

      <View style={{ marginTop: 20, width: "80%" }}>
        <Button title="Generate ekranına git" onPress={() => router.push("/(tabs)/generate")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center', padding:20 },
  title: { fontSize:22, fontWeight:'700' },
  subtitle: { marginTop:8, color:'#666' }
});
