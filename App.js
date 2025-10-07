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
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const [wifiAtivado, setWifiAtivado] = useState(false);
  const colorScheme = useColorScheme();
  const logoSource = colorScheme === "light" ? LogoDark : LogoLight;
  const [ativo, setAtivo] = useState("historico");
  const [alertaVisivel, setAlertaVisivel] = useState(false);
  // const [mostrarPrimeirosSOS, setMostrarPrimeirosSOS] = useState(false);
  const [telaAtiva, setTelaAtiva] = useState("home"); // Tela inicial é "home"

  const styles = createStyles(useTheme());


  const handleLigar = () => {
    Linking.openURL(`tel:193`);
  };

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
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {telaAtiva === "home" && (
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
              <Image
                source={logoSource}
                style={styles.logoImagem}
                resizeMode="contain"
              />
              <TouchableOpacity onPress={() => setTelaAtiva("notificacao")}>
                <Ionicons name="notifications-outline" size={20}></Ionicons>
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
                  ativo === "historico"
                    ? styles.textoAtivo
                    : styles.textoInativo
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

          {ativo === "historico" && (
            <View style={styles.caixabege}>
              <View style={styles.headerhistorico}>
                <Text style={styles.titulohistorico}>
                  Histórico de Ocorrências
                </Text>
                <Text style={styles.textohistorico}>
                  Registro das últimas operações realizadas
                </Text>
              </View>

              <ScrollView
                contentContainerStyle={styles.scrollContainer}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={"#8faaff"}
                  />
                }
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.caixashistorico}>
                  <View style={styles.cbm}>
                    <View style={styles.tituloebotao}>
                      <Text style={styles.textocbm}>Incendio Residencial</Text>
                      <View style={[styles.botaoconcluido]}>
                        <Text style={styles.textobotaoconcluido}>
                          Concluído
                        </Text>
                      </View>
                    </View>
                    <Text>Rua das Flores</Text>
                    <View style={styles.diaedata}>
                      <Text>15/02/2025</Text>
                      <Text>14:30</Text>
                      <Text style={styles.vidassalvas}>3 Vidas salvas!</Text>
                    </View>
                  </View>

                  <View style={styles.cbm}>
                    <View style={styles.tituloebotao}>
                      <Text style={styles.textocbm}>Resgate em Altura</Text>
                      <View style={styles.botaoconcluido}>
                        <Text style={styles.textobotaoconcluido}>
                          Concluído
                        </Text>
                      </View>
                    </View>
                    <Text>Av. Central</Text>
                    <View style={styles.diaedata}>
                      <Text>14/02/2025</Text>
                      <Text>09:30</Text>
                      <Text style={styles.vidassalvas}>1 Vida salva!</Text>
                    </View>
                  </View>

                  <View style={styles.cbm}>
                    <View style={styles.tituloebotao}>
                      <Text style={styles.textocbm}>Acidente em Trânsito</Text>
                      <View style={styles.botaoconcluido}>
                        <Text style={styles.textobotaoconcluido}>
                          Concluído
                        </Text>
                      </View>
                    </View>
                    <Text>13 de Maio</Text>
                    <View style={styles.diaedata}>
                      <Text>02/01/2025</Text>
                      <Text>12:45</Text>
                      <Text style={styles.vidassalvas}>4 Vidas salvas!</Text>
                    </View>
                  </View>

                  <View style={styles.cbm}>
                    <View style={styles.tituloebotao}>
                      <Text style={styles.textocbm}>Incendio Florestal</Text>
                      <View style={styles.botaoconcluido}>
                        <Text style={styles.textobotaoconcluido}>
                          Concluído
                        </Text>
                      </View>
                    </View>
                    <Text>Rua Carolina</Text>
                    <View style={styles.diaedata}>
                      <Text>02/01/2025</Text>
                      <Text>01:00</Text>
                      <Text style={styles.vidassalvas}>5 Vidas salvas!</Text>
                    </View>
                  </View>

                  <View style={styles.cbm}>
                    <View style={styles.tituloebotao}>
                      <Text style={styles.textocbm}>Resgate em Altura</Text>
                      <View style={styles.botaoconcluido}>
                        <Text style={styles.textobotaoconcluido}>
                          Concluído
                        </Text>
                      </View>
                    </View>
                    <Text>25 de Março</Text>
                    <View style={styles.diaedata}>
                      <Text>01/01/2025</Text>
                      <Text>04:00</Text>
                      <Text style={styles.vidassalvas}>1 Vida salva!</Text>
                    </View>
                  </View>

                  <View style={styles.cbm}>
                    <View style={styles.tituloebotao}>
                      <Text style={styles.textocbm}>Resgate em Altura</Text>
                      <View style={styles.botaoconcluido}>
                        <Text style={styles.textobotaoconcluido}>
                          Concluído
                        </Text>
                      </View>
                    </View>
                    <Text>25 de Março</Text>
                    <View style={styles.diaedata}>
                      <Text>01/01/2025</Text>
                      <Text>04:00</Text>
                      <Text style={styles.vidassalvas}>1 Vida salva!</Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          )}

          {ativo === "socorros" && (
            <View style={styles.estCard}>
              <View style={styles.cardPQE}>
                <Text style={styles.textCardPQE}>
                  <Ionicons
                    name="heart-outline"
                    size={24}
                    color="#9b0101"
                  ></Ionicons>{" "}
                  Parada Cardiorrespiratória
                </Text>
                <View style={styles.ListaPQE}>
                  <Text style={[styles.bolinhaLista, styles.textBolinha]}>
                    1
                  </Text>
                  <Text style={styles.textListaPQE}>
                    Verifique a consciência da vítima
                  </Text>
                </View>
                <View style={styles.ListaPQE}>
                  <Text style={[styles.bolinhaLista, styles.textBolinha]}>
                    2
                  </Text>
                  <Text style={styles.textListaPQE}>Chame Ajuda (193)</Text>
                </View>
                <View style={styles.ListaPQE}>
                  <Text style={[styles.bolinhaLista, styles.textBolinha]}>
                    3
                  </Text>
                  <Text style={styles.textListaPQE}>
                    Pocisione as mãos no centro do peito
                  </Text>
                </View>
                <View style={styles.ListaPQE}>
                  <Text style={[styles.bolinhaLista, styles.textBolinha]}>
                    4
                  </Text>
                  <Text style={styles.textListaPQE}>
                    Faça compressões de 5-6 cm de profundidade
                  </Text>
                </View>
                <View style={styles.ListaPQE}>
                  <Text style={[styles.bolinhaLista, styles.textBolinha]}>
                    5
                  </Text>
                  <Text style={styles.textListaPQE}>
                    Mantenha o ritmo de 100-200 compressões/min
                  </Text>
                </View>
              </View>

              <View style={styles.cardPQE}>
                <Text style={styles.textCardPQE}>
                  <Ionicons
                    name="warning-outline"
                    size={24}
                    color="#9b0101"
                  ></Ionicons>{" "}
                  Queimadas
                </Text>
                <View style={styles.ListaPQE}>
                  <Text style={[styles.bolinhaLista, styles.textBolinha]}>
                    1
                  </Text>
                  <Text style={styles.textListaPQE}>
                    Remova a vítima da fonte de calor
                  </Text>
                </View>
                <View style={styles.ListaPQE}>
                  <Text style={[styles.bolinhaLista, styles.textBolinha]}>
                    2
                  </Text>
                  <Text style={styles.textListaPQE}>
                    Resfrie com água corrente por 10-20 min
                  </Text>
                </View>
                <View style={styles.ListaPQE}>
                  <Text style={[styles.bolinhaLista, styles.textBolinha]}>
                    3
                  </Text>
                  <Text style={styles.textListaPQE}>
                    Não aplique gelo diretamente
                  </Text>
                </View>
                <View style={styles.ListaPQE}>
                  <Text style={[styles.bolinhaLista, styles.textBolinha]}>
                    4
                  </Text>
                  <Text style={styles.textListaPQE}>
                    Cubra com pano limpo e úmido
                  </Text>
                </View>
                <View style={styles.ListaPQE}>
                  <Text style={[styles.bolinhaLista, styles.textBolinha]}>
                    5
                  </Text>
                  <Text style={styles.textListaPQE}>
                    Procure atendimento médico
                  </Text>
                </View>
              </View>

              <View style={styles.cardPQE}>
                <Text style={styles.textCardPQE}>
                  <Ionicons
                    name="shield-outline"
                    size={24}
                    color="#9b0101"
                  ></Ionicons>{" "}
                  Engasgo
                </Text>
                <View style={styles.ListaPQE}>
                  <Text style={[styles.bolinhaLista, styles.textBolinha]}>
                    1
                  </Text>
                  <Text style={styles.textListaPQE}>
                    Incentive a tosse se a pessoa conseguir
                  </Text>
                </View>
                <View style={styles.ListaPQE}>
                  <Text style={[styles.bolinhaLista, styles.textBolinha]}>
                    2
                  </Text>
                  <Text style={styles.textListaPQE}>
                    Aplique 5 pancadas nas costas
                  </Text>
                </View>
                <View style={styles.ListaPQE}>
                  <Text style={[styles.bolinhaLista, styles.textBolinha]}>
                    3
                  </Text>
                  <Text style={styles.textListaPQE}>
                    Faça a manobra de Heimilich se necessário
                  </Text>
                </View>
                <View style={styles.ListaPQE}>
                  <Text style={[styles.bolinhaLista, styles.textBolinha]}>
                    4
                  </Text>
                  <Text style={styles.textListaPQE}>
                    Alterne pancadas e compreensões
                  </Text>
                </View>
                <View style={styles.ListaPQE}>
                  <Text style={[styles.bolinhaLista, styles.textBolinha]}>
                    5
                  </Text>
                  <Text style={styles.textListaPQE}>
                    Chame ajuda se não resolver
                  </Text>
                </View>
              </View>
            </View>
          )}

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
      )}

      {telaAtiva === "notificacao" && (
        <View>
          <View style={styles.estNot}>
            <TouchableOpacity
              onPress={() => setTelaAtiva("home")}
              style={styles.btnVoltar}
            >
              <Ionicons name="arrow-back-circle-outline" size={30}></Ionicons>
            </TouchableOpacity>
          </View>
          <View style={styles.caixabege}>
            <Text style={styles.tituloNotificacao}>Notificações</Text>
            <View style={styles.cbmNot}>
              <View style={styles.tituloebotaoNot}>
                <Text style={styles.textocbmNot}>Incendio Residencial</Text>
                <View style={styles.botaoconcluidoNotCon}>
                  <Text style={styles.textobotaoconcluido}>Concluído</Text>
                </View>
              </View>
              <Text>Rua das Flores</Text>
              <View style={styles.diaedataNot}>
                <Text>15/02/2025</Text>
                <Text>14:30</Text>
                <Text style={styles.distanciaNot}>50.000 km</Text>
              </View>
            </View>

            <View style={styles.cbmNot}>
              <View style={styles.tituloebotaoNot}>
                <Text style={styles.textocbmNot}>Incendio Residencial</Text>
                <View style={styles.botaoconcluidoNotEmAnd}>
                  <Text style={styles.textobotaoconcluido}>Acontecendo</Text>
                </View>
              </View>
              <Text>Rua das Flores</Text>
              <View style={styles.diaedataNot}>
                <Text>15/02/2025</Text>
                <Text>14:30</Text>
                <Text style={styles.distanciaNotPerto}> 10 km</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {alertaVisivel && (
        <TouchableWithoutFeedback onPress={() => setAlertaVisivel(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.cartaoAlerta}>
                <View style={styles.cabecalhoAlerta}>
                  <Text style={styles.textoAlerta}>ALERTA! 🆘</Text>
                </View>
                <View style={styles.conteudoAlerta}>
                  <Text style={styles.textoPrincipal}>
                    Se não for possível fazer os primeiros socorros em caso de
                    perigo, não faça! Acione diretamente o corpo de bombeiro.
                    botão de ligar 193
                  </Text>
                  <TouchableOpacity
                    style={styles.botaoLigar}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleLigar();
                    }}
                  >
                    <Text style={styles.textoBotao}>Ligar 193</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    // alignItems: "center",
    // justifyContent: "center",
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
    color: theme.colorSub,
  },
  logoENot: {
    flexDirection: "row",
    alignItems: "center",
    gap: 130,
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
    color: theme.colorC,
  },
  textoDescritivo: {
    fontSize: 15,
    color: theme.colorD,
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
    color: theme.colorS,
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
  // estNot:{
  //   flexDirection:"row",
  // },
  btnVoltar: {
    justifyContent: "flex-start",
  },
  tituloNotificacao: {
    fontSize: 35,
    // fontWeight: "bold",
  },
  cbmNot: {
    marginTop: 20,
    backgroundColor: "#F7F4EA",
    width: 330,
    height: 90,
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.30)",
    alignSelf:"flex-end"
  },
  tituloebotaoNot: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textocbmNot: {
    fontWeight: "bold",
    fontSize: 15,
  },
  botaoconcluidoNotCon: {
    backgroundColor: "#84994F",
    width: 90,
    height: 30,
    borderRadius: 10,
    padding: 5,
    borderColor: "rgba(0, 0, 0, 0.30)",
    borderWidth: 1,
    // alignItems: "flex-end", // coloca tudo do container à direita
  },
  distanciaNot:{
    justifyContent:"flex-end",
    color: "#B12C00",
    fontWeight: "bold",
    fontSize: 15,
  },
  diaedataNot: {
    flexDirection: "row",
    gap: 60,
  },
  botaoconcluidoNotCon: {
    backgroundColor: "#84994F",
    width: 90,
    height: 30,
    borderRadius: 10,
    padding: 5,
    borderColor: "rgba(0, 0, 0, 0.30)",
    borderWidth: 1,
    // alignItems: "flex-end", // coloca tudo do container à direita
  }, botaoconcluidoNotEmAnd: {
    backgroundColor: "#FFF287",
    width: 90,
    height: 30,
    borderRadius: 10,
    padding: 5,
    borderColor: "rgba(0, 0, 0, 0.30)",
    borderWidth: 1,
    // alignItems: "flex-end", // coloca tudo do container à direita
  },
  distanciaNotPerto:{
    justifyContent:"flex-end",
    color: "#FF9013",
    fontWeight: "bold",
    fontSize: 15,
  }
});
