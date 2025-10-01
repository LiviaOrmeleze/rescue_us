import { NavigationContainer } from "@react-navigation/native";
import { Image, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";



export default function HomeScreen() {
    const logoSource = colorScheme === "dark" ? LogoDark : LogoLight;
    const [ativo, setAtivo] = useState("historico");
    const [alertaVisivel, setAlertaVisivel] = useState(false);
    const [wifiAtivado, setWifiAtivado] = useState(false);

  const Tab = createBottomTabNavigator();

    const colorScheme = useColorScheme();
  
    
      const handleLigar = () => {
        Linking.openURL(`tel:193`);
      };
  

    return(
        <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
       

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

        {ativo === "historico" && (
          <View style={styles.caixabege}>
          <View style={styles.headerhistorico}>
            <Text style={styles.titulohistorico}>Histórico de Ocorrências</Text>
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
                    <Text style={styles.textobotaoconcluido}>Concluído</Text>
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
                    <Text style={styles.textobotaoconcluido}>Concluído</Text>
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
                    <Text style={styles.textobotaoconcluido}>Concluído</Text>
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
                    <Text style={styles.textobotaoconcluido}>Concluído</Text>
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
                    <Text style={styles.textobotaoconcluido}>Concluído</Text>
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
                    <Text style={styles.textobotaoconcluido}>Concluído</Text>
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
                <Text style={[styles.bolinhaLista, styles.textBolinha]}>1</Text>
                <Text style={styles.textListaPQE}>
                  Verifique a consciência da vítima
                </Text>
              </View>
              <View style={styles.ListaPQE}>
                <Text style={[styles.bolinhaLista, styles.textBolinha]}>2</Text>
                <Text style={styles.textListaPQE}>Chame Ajuda (193)</Text>
              </View>
              <View style={styles.ListaPQE}>
                <Text style={[styles.bolinhaLista, styles.textBolinha]}>3</Text>
                <Text style={styles.textListaPQE}>
                  Pocisione as mãos no centro do peito
                </Text>
              </View>
              <View style={styles.ListaPQE}>
                <Text style={[styles.bolinhaLista, styles.textBolinha]}>4</Text>
                <Text style={styles.textListaPQE}>
                  Faça compressões de 5-6 cm de profundidade
                </Text>
              </View>
              <View style={styles.ListaPQE}>
                <Text style={[styles.bolinhaLista, styles.textBolinha]}>5</Text>
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
                <Text style={[styles.bolinhaLista, styles.textBolinha]}>1</Text>
                <Text style={styles.textListaPQE}>
                  Remova a vítima da fonte de calor
                </Text>
              </View>
              <View style={styles.ListaPQE}>
                <Text style={[styles.bolinhaLista, styles.textBolinha]}>2</Text>
                <Text style={styles.textListaPQE}>
                  Resfrie com água corrente por 10-20 min
                </Text>
              </View>
              <View style={styles.ListaPQE}>
                <Text style={[styles.bolinhaLista, styles.textBolinha]}>3</Text>
                <Text style={styles.textListaPQE}>
                  Não aplique gelo diretamente
                </Text>
              </View>
              <View style={styles.ListaPQE}>
                <Text style={[styles.bolinhaLista, styles.textBolinha]}>4</Text>
                <Text style={styles.textListaPQE}>
                  Cubra com pano limpo e úmido
                </Text>
              </View>
              <View style={styles.ListaPQE}>
                <Text style={[styles.bolinhaLista, styles.textBolinha]}>5</Text>
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
                <Text style={[styles.bolinhaLista, styles.textBolinha]}>1</Text>
                <Text style={styles.textListaPQE}>
                  Incentive a tosse se a pessoa conseguir
                </Text>
              </View>
              <View style={styles.ListaPQE}>
                <Text style={[styles.bolinhaLista, styles.textBolinha]}>2</Text>
                <Text style={styles.textListaPQE}>
                  Aplique 5 pancadas nas costas
                </Text>
              </View>
              <View style={styles.ListaPQE}>
                <Text style={[styles.bolinhaLista, styles.textBolinha]}>3</Text>
                <Text style={styles.textListaPQE}>
                  Faça a manobra de Heimilich se necessário
                </Text>
              </View>
              <View style={styles.ListaPQE}>
                <Text style={[styles.bolinhaLista, styles.textBolinha]}>4</Text>
                <Text style={styles.textListaPQE}>
                  Alterne pancadas e compreensões
                </Text>
              </View>
              <View style={styles.ListaPQE}>
                <Text style={[styles.bolinhaLista, styles.textBolinha]}>5</Text>
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
      {/* </ScrollView> */}
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

    )
} 
