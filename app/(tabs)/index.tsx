import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR App</Text>

      <Link href="/(tabs)/scanner" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>📷 Scan QR Code</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/(tabs)/generate" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>✨ Generate QR Code</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.footer}>Developed by Özer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 30 
  },
  button: {
    width: "100%",
    backgroundColor: "#0037fd",
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: { 
    color: "white", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  footer: {
    position: "absolute",
    bottom: 20,
    color: "#888",
    fontSize: 14,
  },
});
