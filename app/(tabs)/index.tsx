import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR App</Text>

      <Link href="/(tabs)/scanner" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>📷 QR Kod Tara</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/(tabs)/generate" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>✨ QR Kod Oluştur</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30 },
  button: {
    width: "100%",
    backgroundColor: "#0037fdff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
