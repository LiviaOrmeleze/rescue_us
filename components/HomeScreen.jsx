import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
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
      <View style={styles.topoCabecalho}>
        <View style={styles.logoENot}>
          <TouchableOpacity onPress={() => setTelaAtiva("perfil")}>
            <Ionicons
              style={styles.IconNot}
              name="person-circle-sharp"
              size={30}
            ></Ionicons>
          </TouchableOpacity>
          <Image
            source={logoSource}
            style={styles.logoImagem}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={() => setTelaAtiva("notificacao")}>
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
            setAtivo("historico");
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
            setAtivo("socorros");
            // setMostrarPrimeirosSOS(!mostrarPrimeirosSOS);
            setAlertaVisivel(true);
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
