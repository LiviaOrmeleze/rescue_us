import { StyleSheet, useColorScheme, Linking } from "react-native";

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
import { ListagemPerfil } from "./components/ListagemPerfil";
import { PerfilBBScreen } from "./components/PerfilBBScreen";
import { HomeBB } from "./components/HomeBB";

export default function App() {
  const colorScheme = useColorScheme();
  const logoSource = colorScheme === "light" ? LogoDark : LogoLight;
  const [alertaVisivel, setAlertaVisivel] = useState(false);
  const [telaAtiva, setTelaAtiva] = useState("listagem");
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
          perfilBB={"perfilBB"}
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
        <PerfilBBScreen
          logoSource={logoSource}
          setTelaAtiva={setTelaAtiva}
          homeBB={"homeBB"} 
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
        <NotificacaoScreen setTelaAtiva={setTelaAtiva} home={"home"} />
      )}

      {telaAtiva === "listagem" && (
        <ListagemPerfil
          setTelaAtiva={setTelaAtiva}
          homeBB={"homeBB"}
          logoSource={logoSource}
        />
      )}

      {telaAtiva === "homeBB" && (
        <HomeBB
          setTelaAtiva={setTelaAtiva}
          perfilBB={"perfilBB"}
          logoSource={logoSource}
        />
      )}
      {alertaVisivel && (
        <Alerta handleLigar={handleLigar} setAlertaVisivel={setAlertaVisivel} />
      )}
      
    </SafeAreaView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      paddingHorizontal: 20,
    },
  });
