import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
  TouchableWithoutFeedback,
  Linking,
  RefreshControl,
  ScrollView,
} from "react-native";

// Importe as imagens da logo
import LogoDark from "./assets/LogoDark.png";
import LogoLight from "./assets/LogoLight.png";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { enableScreens } from "react-native-screens";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import NotificacaoScreen from "./screens/NotificacaoScreen";

export default function App() {
  enableScreens();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      console.log("🔄 Atualizando dados...");
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error("Erro durante refresh:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: " #007aff",
            tabBarActiveBackgroundColor: "#666",
            tabBarHideOnKeyboard: true,
          }}
        >
          <Tab.Screen
            name="Home" //Nome da rota
            component={HomeScreen} //Tela associada a rota
            options={{
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size * 0.8, color }}>🏠</Text>
              ),
            }}
          />

          <Tab.Screen
            name="Perfil" //Nome da rota
            component={ProfileScreen} //Tela associada a rota
            options={{
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size * 0.8, color }}>👤</Text>
              ),
            }}
          />

          <Tab.Screen
            name="Configurações" //Nome da rota
            component={SettingsScreen} //Tela associada a rota
            options={{
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size * 0.8, color }}>⚙️</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  topoCabecalho: {
    // alignItems: "center",
    marginBottom: 20,
  },
  logoImagem: {
    width: 220,
    height: 100,
    justifyContent: "flex-start",
  },
  subtitulo: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
  },
  logoENot: {
    flexDirection: "row",
    alignItems: "center",
    gap: 130,
  },
  cartaoPrincipal: {
    backgroundColor: "rgba(181, 0, 0, 0.1)",
    borderWidth: 1,
    borderColor: "#9b0101",
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  linhaTitulo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  tituloCartao: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  textoDescritivo: {
    fontSize: 15,
    color: "#000",
    marginBottom: 25,
  },
  areaStatusBotao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linhaStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  textoStatus: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
    marginRight: 5,
  },
  textoStatusDestaque: {
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#FF9903",
    borderRadius: 6,
    padding: 2,
    paddingHorizontal: 10,
    fontSize: 14,
    marginBottom: 1,
    color: "#fff",
  },
  botaoAtivar: {
    backgroundColor: "#9b0101",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  textoBotaoWiFi: {
    color: "#fff",
  },
  containerBotoes: {
    flexDirection: "row",
    backgroundColor: "#f7f4ea",
    borderRadius: 17,
    justifyContent: "space-between",
    marginTop: 20,
    padding: 2,
    alignSelf: "center",
  },
  botaoIndividual: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 9,
    borderRadius: 15,
  },
  caixabege: {
    backgroundColor: "#F7F4EA",
    //  width: 380,
    //  height: 600,
    borderRadius: 20,
    padding: 23,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.10)",
    marginTop: 20,
  },
  headerhistorico: {
    marginBottom: 10,
  },
  titulohistorico: {
    fontWeight: "bold",
    fontSize: 18,
  },
  textohistorico: {
    fontSize: 15,
  },
  cbm: {
    marginTop: 10,
    backgroundColor: "#F7F4EA",
    width: 330,
    height: 90,
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.30)",
  },
  textocbm: {
    fontWeight: "bold",
    fontSize: 15,
  },
  tituloebotao: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botaoconcluido: {
    backgroundColor: "#F7F4EA",
    width: 90,
    height: 30,
    borderRadius: 10,
    padding: 5,
    borderColor: "rgba(0, 0, 0, 0.30)",
    borderWidth: 1,
    // alignItems: "flex-end", // coloca tudo do container à direita
  },
  textobotaoconcluido: {
    textAlign: "center",
  },
  diaedata: {
    flexDirection: "row",
    gap: 48,
  },
  vidassalvas: {
    color: "#FF9903",
    fontWeight: "bold",
    fontSize: 15,
  },
  caixashistorico: {
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    paddingHorizontal: 20,
  },

  estCard: {
    gap: 30,
    marginTop: 20,
  },
  cardPQE: {
    backgroundColor: "#F7F4EA",
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
  },
  textCardPQE: {
    fontWeight: "bold",
    fontSize: 21,
    marginBottom: 10,
  },
  ListaPQE: {
    flexDirection: "row",
    marginTop: 13,
    gap: 10,
  },
  textListaPQE: {
    fontSize: 16,
  },
  bolinhaLista: {
    backgroundColor: "#9b0101",
    width: 24,
    height: 24,
    borderRadius: 50,
  },
  textBolinha: {
    color: "#fff",
    textAlign: "center",
  },

  caixaEmergencia: {
    backgroundColor: "rgba(255,153,3,0.15)",
    padding: 18,
    borderRadius: 15,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#FF9903",
  },
  estCardEmergencia: {
    flexDirection: "row",
    gap: 10,
  },
  textIcon: {
    alignItems: "center",
    padding: 10,
  },
  textEmergencia: {
    fontWeight: "bold",
    fontSize: 16,
  },

  botaoAtivo: {
    flex: 1,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    paddingVertical: 10,
    paddingHorizontal: 9,
  },
  textoAtivo: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
  },
  textoInativo: {
    fontSize: 14,
    color: "#333",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  cartaoAlerta: {
    width: "90%",
    backgroundColor: "rgba(234, 34, 34, 0.44)",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cabecalhoAlerta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Alinha ao canto esquerdo
    marginBottom: 10,
  },
  textoAlerta: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20, // Texto grande
  },
  textoRisco: {
    backgroundColor: "#F7C042",
    color: "#000",
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 14,
    marginLeft: 8,
  },
  conteudoAlerta: {
    alignItems: "center",
  },
  textoPrincipal: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
    // fontWeight: "bold",
  },
  botaoLigar: {
    backgroundColor: "#FFC107",
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  textoBotao: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
