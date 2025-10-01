import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function NotificacaoScreen() {
    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.text}>👤 Tela de Perfil</Text>
          <Text style={styles.subtext}>Seu ID único: {userId}</Text>
        </SafeAreaView>
        )
}