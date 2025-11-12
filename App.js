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
  TextInput,
} from "react-native";

// Importe as imagens da logo
import LogoDark from "./assets/LogoDark.png";
import LogoLight from "./assets/LogoLight.png";
import Bombeiro from "./assets/Chama o bombeiro___.jpg";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "./hooks/useTheme";
import { EuSouScreen } from "./components/EuSouScreen";
import { EntrarBBScreen } from "./components/EntrarBBScreen";
import { EntrarScreen } from "./components/EntrarScreen";
import { CadastrarScreen } from "./components/CadastrarScreen";

export default function App() {
  const [wifiAtivado, setWifiAtivado] = useState(false);
  const colorScheme = useColorScheme();
  const logoSource = colorScheme === "light" ? LogoDark : LogoLight;
  const [ativo, setAtivo] = useState("historico");
  const [alertaVisivel, setAlertaVisivel] = useState(false);
  // const [mostrarPrimeirosSOS, setMostrarPrimeirosSOS] = useState(false);
  const [telaAtiva, setTelaAtiva] = useState("euSou");


  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

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

      {telaAtiva === "euSou" && (
       <EuSouScreen
          logoSource={logoSource}
          entrarBB={"entrarBB"}
          entrar={"entrar"}
        />
            )}

            {telaAtiva === "entrarBB" && (
            <EntrarBBScreen
              logoSource={logoSource}
              cadastrar={"cadastrar"}
            />
            )}

      {telaAtiva === "entrar" && (
       <EntrarScreen
       logoSource={logoSource}
       cadastrar={"cadastrar"}
       />
      )}
      {telaAtiva === "cadastrar" && (
       <CadastrarScreen
       logoSource={logoSource}
       entrar={"entrar"}
       />
      )}

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
                    <Text style={styles.colorRuaDiaData}>Rua das Flores</Text>
                    <View style={styles.diaedata}>
                      <Text style={styles.colorRuaDiaData}>15/02/2025</Text>
                      <Text style={styles.colorRuaDiaData}>14:30</Text>
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
                    <Text style={styles.colorRuaDiaData}>Av. Central</Text>
                    <View style={styles.diaedata}>
                      <Text style={styles.colorRuaDiaData}>14/02/2025</Text>
                      <Text style={styles.colorRuaDiaData}>09:30</Text>
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
                    <Text style={styles.colorRuaDiaData}>13 de Maio</Text>
                    <View style={styles.diaedata}>
                      <Text style={styles.colorRuaDiaData}>02/01/2025</Text>
                      <Text style={styles.colorRuaDiaData}>12:45</Text>
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
                    <Text style={styles.colorRuaDiaData}>Rua Carolina</Text>
                    <View style={styles.diaedata}>
                      <Text style={styles.colorRuaDiaData}>02/01/2025</Text>
                      <Text style={styles.colorRuaDiaData}>01:00</Text>
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
                    <Text style={styles.colorRuaDiaData}>25 de Março</Text>
                    <View style={styles.diaedata}>
                      <Text style={styles.colorRuaDiaData}>01/01/2025</Text>
                      <Text style={styles.colorRuaDiaData}>04:00</Text>
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
                    <Text style={styles.colorRuaDiaData}>25 de Março</Text>
                    <View style={styles.diaedata}>
                      <Text style={styles.colorRuaDiaData}>01/01/2025</Text>
                      <Text style={styles.colorRuaDiaData}>04:00</Text>
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

      {telaAtiva === "perfil" && (
        <View>
          <View style={styles.estCabPerfil}>
            <TouchableOpacity
              onPress={() => setTelaAtiva("home")}
              style={styles.btnVoltar}
            >
              <Ionicons
                style={styles.IconNot}
                name="arrow-back-circle-outline"
                size={30}
              ></Ionicons>
            </TouchableOpacity>
            <Image
              source={logoSource}
              style={styles.logoPerfil}
              resizeMode="contain"
            />
          </View>
          <View style={styles.estPerfil}>
            <Image source={Bombeiro} style={styles.bombeiro} />
            <Text style={styles.nomePerfil}>Bombeiro da Eliana</Text>
          </View>
          <View>
            <View style={styles.estDados}>
              <Text style={styles.Prin}>Nome</Text>
              <Text style={styles.Seng}></Text>
            </View>
            <View style={styles.estDados}>
              <Text style={styles.Prin}>E-mail</Text>
              <Text style={styles.Seng}>chama_o_bombeiro@gmail.com</Text>
            </View>
            <View style={styles.estDados}>
              <Text style={styles.Prin}>Telefone</Text>
              <Text style={styles.Seng}>(14)77921-1221</Text>
            </View>
            <View style={styles.estDados}>
              <Text style={styles.Prin}>Senha</Text>
              <Text style={styles.Seng}>{"•".repeat(8)}</Text>
            </View>
          </View>
        </View>
      )}

      {telaAtiva === "notificacao" && (
        <View>
          <View style={styles.caixabege}>
            <View style={styles.estNot}>
              <TouchableOpacity
                onPress={() => setTelaAtiva("home")}
                style={styles.btnVoltar}
              >
                <Ionicons
                  style={styles.IconNot}
                  name="arrow-back-circle-outline"
                  size={30}
                ></Ionicons>
              </TouchableOpacity>
              <Text style={styles.tituloNotificacao}>Notificações</Text>
            </View>

            <View style={styles.cbmNot}>
              <View style={styles.tituloebotaoNot}>
                <Text style={styles.textocbmNot}>Incendio Residencial</Text>
                <View style={styles.botaoconcluidoNotCon}>
                  <Text style={styles.textobotaoconcluidoNot}>Concluído</Text>
                </View>
              </View>
              <Text style={styles.colorRuaDiaData}>Rua das Flores</Text>
              <View style={styles.diaedataNot}>
                <Text style={styles.colorRuaDiaData}>15/02/2025</Text>
                <Text style={styles.colorRuaDiaData}>14:30</Text>
                <Text style={styles.distanciaNot}>50.000 km</Text>
              </View>
            </View>

            <View style={styles.cbmNot}>
              <View style={styles.tituloebotaoNot}>
                <Text style={styles.textocbmNot}>Incendio Residencial</Text>
                <View style={styles.botaoconcluidoNotEmAnd}>
                  <Text style={styles.textobotaoconcluidoNot}>Acontecendo</Text>
                </View>
              </View>
              <Text style={styles.colorRuaDiaData}>Rua das Flores</Text>
              <View style={styles.diaedataNot}>
                <Text style={styles.colorRuaDiaData}>15/02/2025</Text>
                <Text style={styles.colorRuaDiaData}>14:30</Text>
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
    logoEntrar: {
      width: 220,
      height: 100,
    },
    tituloBV: {
      fontSize: 30,
      color: theme.color,
      marginTop: 50,
      marginBottom: 15,
    },
    entrar: {
      fontSize: 23,
      color: theme.color,
      fontWeight: "bold",
    },
    btn: {
      marginTop: 30,
    },
    TextBtnEnteCad: {
      fontSize: 20,
      textAlign: "center",
      color: theme.color,
    },
    btnEnteCad: {
      borderRadius: 16,
      padding: 10,
      borderWidth: 1,
      borderColor: theme.color,
      backgroundColor: theme.alert,
    },
    topoCabecalho: {
      // alignItems: "center",
      // marginBottom: 20,
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
    IconNot: {
      color: theme.color,
    },
    logoENot: {
      flexDirection: "row",
      // alignItems: "center",
      gap: 50,
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
    },
    textoDescritivo: {
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
    caixabege: {
      backgroundColor: theme.caixaBegeCinza,
      borderRadius: 20,
      padding: 23,
      borderWidth: 1,
      borderColor: theme.borderColorCaixa,
      marginTop: 20,
    },
    headerhistorico: {
      marginBottom: 10,
    },
    titulohistorico: {
      fontWeight: "bold",
      fontSize: 18,
      color: theme.color,
    },
    textohistorico: {
      fontSize: 15,
      color: theme.color,
    },
    cbm: {
      marginTop: 10,
      backgroundColor: theme.backgroundColorCbm,
      width: 330,
      height: 90,
      borderRadius: 15,
      padding: 15,
      borderWidth: 1,
      borderColor: theme.borderColorCaixa,
    },
    textocbm: {
      fontWeight: "bold",
      fontSize: 15,
      color: theme.color,
    },
    tituloebotao: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    botaoconcluido: {
      backgroundColor: theme.backgroundColorBtnCon,
      width: 90,
      height: 30,
      borderRadius: 10,
      padding: 5,
      borderColor: theme.borderColorCaixa,
      borderWidth: 1,
      // alignItems: "flex-end", // coloca tudo do container à direita
    },
    textobotaoconcluido: {
      textAlign: "center",
      color: theme.color,
    },
    textobotaoconcluidoNot: {
      textAlign: "center",
      color: theme.colorP,
    },
    colorRuaDiaData: {
      color: theme.color,
    },
    diaedata: {
      flexDirection: "row",
      gap: 48,
    },
    colordiaedata: {
      color: theme.color,
    },
    vidassalvas: {
      color: theme.colorVidas,
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
      backgroundColor: theme.caixaBegeCinza,
      padding: 25,
      borderRadius: 15,
      elevation: 5,
      borderWidth: 1,
      borderColor: theme.borderColorCaixa,
    },
    textCardPQE: {
      fontWeight: "bold",
      fontSize: 21,
      marginBottom: 10,
      color: theme.color,
    },
    ListaPQE: {
      flexDirection: "row",
      marginTop: 13,
      gap: 10,
    },
    textListaPQE: {
      fontSize: 16,
      color: theme.color,
    },
    bolinhaLista: {
      backgroundColor: "#9b0101",
      width: 24,
      height: 24,
      borderRadius: 50,
    },
    textBolinha: {
      color: theme.colorBtnWifi,
      textAlign: "center",
    },

    caixaEmergencia: {
      backgroundColor: theme.emergencia,
      padding: 18,
      borderRadius: 15,
      marginTop: 30,
      borderWidth: 1,
      borderColor: theme.colorVidas,
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
      color: theme.color,
    },
    textExpEmergencia: {
      color: theme.color,
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
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.overlay,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100,
    },
    cartaoAlerta: {
      width: "90%",
      backgroundColor: theme.alert,
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
      color: theme.colorBtnWifi,
      fontWeight: "bold",
      fontSize: 20, // Texto grande
    },
    conteudoAlerta: {
      alignItems: "center",
    },
    textoPrincipal: {
      color: theme.color,
      fontSize: 14,
      textAlign: "center",
      marginBottom: 15,
      // fontWeight: "bold",
    },
    botaoLigar: {
      backgroundColor: theme.colorVidas,
      paddingVertical: 8,
      paddingHorizontal: 30,
      borderRadius: 15,
    },
    textoBotao: {
      color: theme.colorP,
      fontWeight: "bold",
      fontSize: 16,
    },
    estNot: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    btnVoltar: {
      justifyContent: "flex-start",
    },
    tituloNotificacao: {
      fontSize: 35,
      // fontWeight: "bold",
      color: theme.color,
    },
    cbmNot: {
      width: "100%",
      marginTop: 20,
      backgroundColor: theme.backgroundColorCbm,
      // width: 330,
      // height: 90,
      borderRadius: 15,
      padding: 15,
      borderWidth: 1,
      borderColor: theme.borderColorCaixa,
      alignSelf: "flex-end",
    },
    tituloebotaoNot: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    textocbmNot: {
      fontWeight: "bold",
      fontSize: 15,
      color: theme.color,
    },
    botaoconcluidoNotCon: {
      backgroundColor: theme.notCon,
      width: 90,
      height: 30,
      borderRadius: 10,
      padding: 5,
      borderColor: theme.borderColorCaixa,
      borderWidth: 1,
      // alignItems: "flex-end", // coloca tudo do container à direita
    },
    distanciaNot: {
      justifyContent: "flex-end",
      color: theme.colorDis,
      fontWeight: "bold",
      fontSize: 15,
    },
    diaedataNot: {
      flexDirection: "row",
      gap: 60,
    },
    botaoconcluidoNotEmAnd: {
      backgroundColor: theme.notEmAnd,
      width: 90,
      height: 30,
      borderRadius: 10,
      padding: 5,
      borderColor: theme.borderColorCaixa,
      borderWidth: 1,
      // alignItems: "flex-end", // coloca tudo do container à direita
    },
    distanciaNotPerto: {
      justifyContent: "flex-end",
      color: theme.colorVidas,
      fontWeight: "bold",
      fontSize: 15,
    },
    estCabPerfil: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between", // Coloca o botão e a logo em extremidades opostas
      width: "100%",
    },
    logoPerfil: {
      width: 200, // Define a largura da logo
      height: 80, // Define a altura da logo
      resizeMode: "contain", // Garante que a imagem seja redimensionada corretamente
    },
    bombeiro: {
      width: 150,
      height: 150,
      borderRadius: 100,
      resizeMode: "cover",
      alignSelf: "center",
      borderWidth: 2,
      borderColor: theme.borderColorCaixa,
      marginTop: 30,
    },
    estPerfil: {
      alignItems: "center",
      marginBottom: 40,
    },
    nomePerfil: {
      color: theme.color,
      fontSize: 20,
      marginTop: 12,
      fontWeight: "500",
    },
    estDados: {
      marginTop: 20,
    },
    Prin: {
      color: theme.color,
      fontSize: 15,
      marginBottom: 8,
    },
    Seng: {
      color: theme.color,
      fontSize: 15,
      padding: 12,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.borderColorCaixa,
    },
    Link: {
      marginTop: 8,
    },
    textLink: {
      color: theme.color,
    },
  });
