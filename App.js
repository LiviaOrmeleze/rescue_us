import {
  StyleSheet,
  useColorScheme,
  Linking,
} from "react-native";

// Importe as imagens da logo
import LogoDark from "./assets/LogoDark.png";
import LogoLight from "./assets/LogoLight.png";
import bombeiro from "./assets/Chama o bombeiro___.jpg";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "./hooks/useTheme";
import { EuSouScreen } from "./components/EuSouScreen";
import { EntrarScreen } from "./components/EntrarScreen";
import { CadastrarScreen } from "./components/CadastrarScreen";
import { PerfilScreen } from "./components/PerfilScreen";
import { HomeScreen } from "./components/HomeScreen";
import { NotificacaoScreen } from "./components/NotificacaoScreen";
import { Alerta } from "./components/Alerta";

export default function App() {
  const colorScheme = useColorScheme();
  const logoSource = colorScheme === "light" ? LogoDark : LogoLight;
  const [alertaVisivel, setAlertaVisivel] = useState(false);
  const [telaAtiva, setTelaAtiva] = useState("entrar");
  const styles = createStyles(useTheme());
  const handleLigar = () => {
    Linking.openURL(`tel:193`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {telaAtiva === "euSou" && (
        <EuSouScreen
          logoSource={logoSource}
          setTelaAtiva={setTelaAtiva}
          entrarBB={"perfilBB"}
          entrar={"perfil"}
        />
      )}

      {telaAtiva === "perfil" && (
        <PerfilScreen
          logoSource={logoSource}
          setTelaAtiva={setTelaAtiva}
          home={"home"}
          Bombeiro={bombeiro}
        />
      )}

      {telaAtiva === "perfilBB" && (
        <PerfilScreen
          logoSource={logoSource}
          setTelaAtiva={setTelaAtiva}
          home={"home"}
          Bombeiro={bombeiro}
        />
      )}


      {telaAtiva === "entrar" && (
        <EntrarScreen
          logoSource={logoSource}
          setTelaAtiva={setTelaAtiva}
          cadastrar={"cadastrar"}
        />
      )}

      {telaAtiva === "cadastrar" && (
        <CadastrarScreen
          logoSource={logoSource}
          setTelaAtiva={setTelaAtiva}
          entrar={"entrar"}
        />
      )}

      {telaAtiva === "home" && (
        <HomeScreen
          historico={"historico"}
          socorros={"socorros"}
          setTelaAtiva={setTelaAtiva}
          perfil={"perfil"}
          notificacao={"notificacao"}
          logoSource={logoSource}
          setAlertaVisivel={setAlertaVisivel}
          />
       
        )}


      {telaAtiva === "notificacao" && (
       <NotificacaoScreen
       setTelaAtiva={setTelaAtiva}
       home={"home"}
       />
      )}

      {alertaVisivel && (
        <Alerta
        handleLigar={handleLigar}
        setAlertaVisivel={setAlertaVisivel}
        />
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
    // logoEntrar: {
    //   width: 220,
    //   height: 100,
    // },
    // tituloBV: {
    //   fontSize: 30,
    //   color: theme.color,
    //   marginTop: 50,
    //   marginBottom: 15,
    // },
    // entrar: {
    //   fontSize: 23,
    //   color: theme.color,
    //   fontWeight: "bold",
    // },
    // btn: {
    //   marginTop: 30,
    // },
    // TextBtnEnteCad: {
    //   fontSize: 20,
    //   textAlign: "center",
    //   color: theme.color,
    // },
    // btnEnteCad: {
    //   borderRadius: 16,
    //   padding: 10,
    //   borderWidth: 1,
    //   borderColor: theme.color,
    //   backgroundColor: theme.alert,
    // },
    // topoCabecalho: {
    //   // alignItems: "center",
    //   // marginBottom: 20,
    // },
    // logoImagem: {
    //   width: 220,
    //   height: 100,
    //   justifyContent: "flex-start",
    // },
    // subtitulo: {
    //   textAlign: "center",
    //   fontSize: 16,
    //   color: theme.color,
    // },
    // IconNot: {
    //   color: theme.color,
    // },
    // logoENot: {
    //   flexDirection: "row",
    //   // alignItems: "center",
    //   gap: 50,
    // },
    // cartaoPrincipal: {
    //   backgroundColor: theme.cartaoPrincipal,
    //   borderWidth: 1,
    //   borderColor: theme.borderColorCP,
    //   borderRadius: 12,
    //   padding: 15,
    //   marginTop: 20,
    //   shadowColor: theme.shadowColorCP,
    //   shadowOffset: { width: 0, height: 2 },
    //   shadowOpacity: 0.1,
    //   shadowRadius: 3,
    // },
    // linhaTitulo: {
    //   flexDirection: "row",
    //   alignItems: "center",
    //   marginBottom: 5,
    // },
    // tituloCartao: {
    //   fontSize: 18,
    //   fontWeight: "bold",
    //   color: theme.color,
    // },
    // textoDescritivo: {
    //   fontSize: 15,
    //   color: theme.color,
    //   marginBottom: 25,
    // },
    // areaStatusBotao: {
    //   flexDirection: "row",
    //   justifyContent: "space-between",
    //   alignItems: "center",
    // },
    // linhaStatus: {
    //   flexDirection: "row",
    //   alignItems: "center",
    // },
    // textoStatus: {
    //   fontSize: 14,
    //   color: theme.color,
    //   fontWeight: "bold",
    //   marginRight: 5,
    // },
    // textoStatusDestaque: {
    //   fontSize: 14,
    //   fontWeight: "bold",
    //   backgroundColor: theme.backgroundColorStatus,
    //   borderRadius: 6,
    //   padding: 2,
    //   paddingHorizontal: 10,
    //   fontSize: 14,
    //   marginBottom: 1,
    //   color: theme.color,
    // },
    // botaoAtivar: {
    //   backgroundColor: theme.backgroundColorWifi,
    //   paddingVertical: 5,
    //   paddingHorizontal: 15,
    //   borderRadius: 5,
    // },
    // textoBotaoWiFi: {
    //   color: theme.colorBtnWifi,
    // },
    // containerBotoes: {
    //   flexDirection: "row",
    //   backgroundColor: theme.Btns,
    //   borderRadius: 17,
    //   justifyContent: "space-between",
    //   marginTop: 20,
    //   padding: 2,
    //   alignSelf: "center",
    // },
    // botaoIndividual: {
    //   flex: 1,
    //   alignItems: "center",
    //   paddingVertical: 10,
    //   paddingHorizontal: 9,
    //   borderRadius: 15,
    // },
    // caixabege: {
    //   backgroundColor: theme.caixaBegeCinza,
    //   borderRadius: 20,
    //   padding: 23,
    //   borderWidth: 1,
    //   borderColor: theme.borderColorCaixa,
    //   marginTop: 20,
    // },
    // headerhistorico: {
    //   marginBottom: 10,
    // },
    // titulohistorico: {
    //   fontWeight: "bold",
    //   fontSize: 18,
    //   color: theme.color,
    // },
    // textohistorico: {
    //   fontSize: 15,
    //   color: theme.color,
    // },
    // cbm: {
    //   marginTop: 10,
    //   backgroundColor: theme.backgroundColorCbm,
    //   width: 330,
    //   height: 90,
    //   borderRadius: 15,
    //   padding: 15,
    //   borderWidth: 1,
    //   borderColor: theme.borderColorCaixa,
    // },
    // textocbm: {
    //   fontWeight: "bold",
    //   fontSize: 15,
    //   color: theme.color,
    // },
    // tituloebotao: {
    //   flexDirection: "row",
    //   justifyContent: "space-between",
    // },
    // botaoconcluido: {
    //   backgroundColor: theme.backgroundColorBtnCon,
    //   width: 90,
    //   height: 30,
    //   borderRadius: 10,
    //   padding: 5,
    //   borderColor: theme.borderColorCaixa,
    //   borderWidth: 1,
    //   // alignItems: "flex-end", // coloca tudo do container à direita
    // },
    // textobotaoconcluido: {
    //   textAlign: "center",
    //   color: theme.color,
    // },
    // textobotaoconcluidoNot: {
    //   textAlign: "center",
    //   color: theme.colorP,
    // },
    // colorRuaDiaData: {
    //   color: theme.color,
    // },
    // diaedata: {
    //   flexDirection: "row",
    //   gap: 48,
    // },
    // colordiaedata: {
    //   color: theme.color,
    // },
    // vidassalvas: {
    //   color: theme.colorVidas,
    //   fontWeight: "bold",
    //   fontSize: 15,
    // },
    

    

    // caixaEmergencia: {
    //   backgroundColor: theme.emergencia,
    //   padding: 18,
    //   borderRadius: 15,
    //   marginTop: 30,
    //   borderWidth: 1,
    //   borderColor: theme.colorVidas,
    // },
    // estCardEmergencia: {
    //   flexDirection: "row",
    //   gap: 10,
    // },
    // textIcon: {
    //   alignItems: "center",
    //   padding: 10,
    // },
    // textEmergencia: {
    //   fontWeight: "bold",
    //   fontSize: 16,
    //   color: theme.color,
    // },
    // textExpEmergencia: {
    //   color: theme.color,
    // },

    // botaoAtivo: {
    //   flex: 1,
    //   backgroundColor: theme.BtnAtivo,
    //   shadowColor: "#000",
    //   shadowOffset: { width: 0, height: 2 },
    //   shadowOpacity: 0.15,
    //   shadowRadius: 3,
    //   elevation: 3,
    //   paddingVertical: 10,
    //   paddingHorizontal: 9,
    // },
    // textoAtivo: {
    //   fontWeight: "bold",
    //   fontSize: 14,
    //   color: theme.color,
    // },
    // textoInativo: {
    //   fontSize: 14,
    //   color: theme.color,
    // },
    // overlay: {
    //   ...StyleSheet.absoluteFillObject,
    //   backgroundColor: theme.overlay,
    //   justifyContent: "center",
    //   alignItems: "center",
    //   zIndex: 100,
    // },
    // cartaoAlerta: {
    //   width: "90%",
    //   backgroundColor: theme.alert,
    //   borderRadius: 8,
    //   paddingHorizontal: 15,
    //   paddingVertical: 25,
    //   shadowColor: "#000",
    //   shadowOffset: { width: 0, height: 2 },
    //   shadowOpacity: 0.2,
    //   shadowRadius: 5,
    //   elevation: 5,
    // },
    // cabecalhoAlerta: {
    //   flexDirection: "row",
    //   alignItems: "center",
    //   justifyContent: "flex-start", // Alinha ao canto esquerdo
    //   marginBottom: 10,
    // },
    // textoAlerta: {
    //   color: theme.colorBtnWifi,
    //   fontWeight: "bold",
    //   fontSize: 20, // Texto grande
    // },
    // conteudoAlerta: {
    //   alignItems: "center",
    // },
    // textoPrincipal: {
    //   color: theme.color,
    //   fontSize: 14,
    //   textAlign: "center",
    //   marginBottom: 15,
    //   // fontWeight: "bold",
    // },
    // botaoLigar: {
    //   backgroundColor: theme.colorVidas,
    //   paddingVertical: 8,
    //   paddingHorizontal: 30,
    //   borderRadius: 15,
    // },
    // textoBotao: {
    //   color: theme.colorP,
    //   fontWeight: "bold",
    //   fontSize: 16,
    // },
    // estNot: {
    //   flexDirection: "row",
    //   alignItems: "center",
    //   gap: 10,
    // },
    // btnVoltar: {
    //   justifyContent: "flex-start",
    // },
    // tituloNotificacao: {
    //   fontSize: 35,
    //   // fontWeight: "bold",
    //   color: theme.color,
    // },
    // cbmNot: {
    //   width: "100%",
    //   marginTop: 20,
    //   backgroundColor: theme.backgroundColorCbm,
    //   // width: 330,
    //   // height: 90,
    //   borderRadius: 15,
    //   padding: 15,
    //   borderWidth: 1,
    //   borderColor: theme.borderColorCaixa,
    //   alignSelf: "flex-end",
    // },
    // tituloebotaoNot: {
    //   flexDirection: "row",
    //   justifyContent: "space-between",
    // },
    // textocbmNot: {
    //   fontWeight: "bold",
    //   fontSize: 15,
    //   color: theme.color,
    // },
    // botaoconcluidoNotCon: {
    //   backgroundColor: theme.notCon,
    //   width: 90,
    //   height: 30,
    //   borderRadius: 10,
    //   padding: 5,
    //   borderColor: theme.borderColorCaixa,
    //   borderWidth: 1,
    //   // alignItems: "flex-end", // coloca tudo do container à direita
    // },
    // distanciaNot: {
    //   justifyContent: "flex-end",
    //   color: theme.colorDis,
    //   fontWeight: "bold",
    //   fontSize: 15,
    // },
    // diaedataNot: {
    //   flexDirection: "row",
    //   gap: 60,
    // },
    // botaoconcluidoNotEmAnd: {
    //   backgroundColor: theme.notEmAnd,
    //   width: 90,
    //   height: 30,
    //   borderRadius: 10,
    //   padding: 5,
    //   borderColor: theme.borderColorCaixa,
    //   borderWidth: 1,
    //   // alignItems: "flex-end", // coloca tudo do container à direita
    // },
    // distanciaNotPerto: {
    //   justifyContent: "flex-end",
    //   color: theme.colorVidas,
    //   fontWeight: "bold",
    //   fontSize: 15,
    // },
    // estCabPerfil: {
    //   flexDirection: "row",
    //   alignItems: "center",
    //   justifyContent: "space-between", // Coloca o botão e a logo em extremidades opostas
    //   width: "100%",
    // },
    // logoPerfil: {
    //   width: 200, // Define a largura da logo
    //   height: 80, // Define a altura da logo
    //   resizeMode: "contain", // Garante que a imagem seja redimensionada corretamente
    // },
    // bombeiro: {
    //   width: 150,
    //   height: 150,
    //   borderRadius: 100,
    //   resizeMode: "cover",
    //   alignSelf: "center",
    //   borderWidth: 2,
    //   borderColor: theme.borderColorCaixa,
    //   marginTop: 30,
    // },
    // estPerfil: {
    //   alignItems: "center",
    //   marginBottom: 40,
    // },
    // nomePerfil: {
    //   color: theme.color,
    //   fontSize: 20,
    //   marginTop: 12,
    //   fontWeight: "500",
    // },
    // estDados: {
    //   marginTop: 20,
    // },
    // Prin: {
    //   color: theme.color,
    //   fontSize: 15,
    //   marginBottom: 8,
    // },
    // Seng: {
    //   color: theme.color,
    //   fontSize: 15,
    //   padding: 12,
    //   borderRadius: 12,
    //   borderWidth: 2,
    //   borderColor: theme.borderColorCaixa,
    // },
    // Link: {
    //   marginTop: 8,
    // },
    // textLink: {
    //   color: theme.color,
    // },
  });