import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function HomeScreen(props) {
  const styles = createStyles(useTheme());
  const [refreshing, setRefreshing] = useState(false);
  const [wifiAtivado, setWifiAtivado] = useState(false);

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
    <ScrollView
      contentContainerStyle={[styles.scrollContainer, { paddingTop: 20 }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={"#8faaff"}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      <View >
        <View style={styles.logoENot}>
          <TouchableOpacity onPress={() => props.setTelaAtiva(props.perfil)}>
            <Ionicons
              style={styles.IconNot}
              name="person-circle-sharp"
              size={30}
            ></Ionicons>
          </TouchableOpacity>
          <Image
            source={props.logoSource}
            style={styles.logoImagem}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={() => props.setTelaAtiva(props.notificacao)}>
            <Ionicons
              style={styles.IconNot}
              name="notifications-outline"
              size={25}
            ></Ionicons>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitulo}>
          Sistema de apoio para situações de emergência
        </Text>
      </View>

      <View style={styles.cartaoPrincipal}>
        <View style={styles.linhaTitulo}>
          <Text style={styles.tituloCartao}>
            {" "}
            <Ionicons name="wifi-outline" size={24}>
              {" "}
            </Ionicons>
            Extensão de Rede WiFi
          </Text>
        </View>
        <Text style={styles.textoDescritivo}>
          Ative a extensão para melhorar a cobertura para operações
        </Text>
        <View style={styles.areaStatusBotao}>
          <View style={styles.linhaStatus}>
            <Text style={styles.textoStatus}>Status:</Text>
            <Text style={[styles.textoStatusDestaque, styles.status]}>
              {wifiAtivado ? "Ativo" : "Inativo"}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.botaoAtivar}
            onPress={() => setWifiAtivado(!wifiAtivado)}
          >
            <Text style={styles.textoBotaoWiFi}>Ativar WiFi</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerBotoes}>
        <TouchableOpacity
          style={[
            styles.botaoIndividual,
            ativo === "historico" && styles.botaoAtivo,
          ]}
          onPress={() => {
            props.setAtivo(props.historico);
            setAlertaVisivel(false);
          }}
        >
          <Text
            style={
              ativo === "historico" ? styles.textoAtivo : styles.textoInativo
            }
          >
            <Ionicons name="time-outline" size={15}></Ionicons> Histórico de
            Ajudas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.botaoIndividual,
            ativo === "socorros" && styles.botaoAtivo,
          ]}
          onPress={() => {
            props.setAtivo(props.socorros);
            // setMostrarPrimeirosSOS(!mostrarPrimeirosSOS);
            props.setAlertaVisivel(true);
          }}
        >
          <Text
            style={
              ativo === "socorros" ? styles.textoAtivo : styles.textoInativo
            }
          >
            <Ionicons name="heart-outline" size={15}></Ionicons> Primeiros
            socorros
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => Linking.openURL("tel:193")}>
        <View style={styles.caixaEmergencia}>
          <View style={styles.estCardEmergencia}>
            <Text style={styles.textIcon}>
              {" "}
              <Ionicons
                name="call-outline"
                size={30}
                color="#FF9903"
              ></Ionicons>{" "}
            </Text>
            <View>
              <Text style={styles.textEmergencia}>Emergência: 193</Text>
              <Text style={styles.textExpEmergencia}>
                Em casos de emergência, sempre acione o Corpo de Bombeiros
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
    logoENot: {
      flexDirection: "row",
      // alignItems: "center",
      gap: 50,
    },
      IconNot: {
      color: theme.color,
    },
     logoImagem: {
      width: 220,
      height: 100,
      justifyContent: "flex-start",
    },
     subtitulo: {
      textAlign: "center",
      fontSize: 16,
      color: theme.color,
    },
    cartaoPrincipal: {
      backgroundColor: theme.cartaoPrincipal,
      borderWidth: 1,
      borderColor: theme.borderColorCP,
      borderRadius: 12,
      padding: 15,
      marginTop: 20,
      shadowColor: theme.shadowColorCP,
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
      color: theme.color,
    },textoDescritivo: {
      fontSize: 15,
      color: theme.color,
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
      color: theme.color,
      fontWeight: "bold",
      marginRight: 5,
    },
    textoStatusDestaque: {
      fontSize: 14,
      fontWeight: "bold",
      backgroundColor: theme.backgroundColorStatus,
      borderRadius: 6,
      padding: 2,
      paddingHorizontal: 10,
      fontSize: 14,
      marginBottom: 1,
      color: theme.color,
    },
     botaoAtivar: {
      backgroundColor: theme.backgroundColorWifi,
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    textoBotaoWiFi: {
      color: theme.colorBtnWifi,
    },
    containerBotoes: {
      flexDirection: "row",
      backgroundColor: theme.Btns,
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
    botaoAtivo: {
      flex: 1,
      backgroundColor: theme.BtnAtivo,
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
      color: theme.color,
    },
    textoInativo: {
      fontSize: 14,
      color: theme.color,
    },
})
