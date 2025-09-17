import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";

// Importe as imagens da logo
import LogoDark from "./assets/LogoDark.png";
import LogoLight from "./assets/LogoLight.png";

export default function App() {
  const [wifiAtivado, setWifiAtivado] = useState(false);
  const colorScheme = useColorScheme();
  const logoSource = colorScheme === "light" ? LogoDark : LogoLight;
  const [ativo, setAtivo] = useState("historico");
  const [alertaVisivel, setAlertaVisivel] = useState(false);

  const handleLigar = () => {
    Linking.openURL(`tel:193`);
  };

  return (
    <View style={paginaGlobal.containerPrincipal}>
      {/* SEÇÃO DO CABEÇALHO */}
      <View style={cabecalhoLayout.topoCabecalho}>
        <Image
          source={logoSource}
          style={cabecalhoLayout.logoImagem}
          resizeMode="contain"
        />
        <Text style={cabecalhoLayout.subtitulo}>
          Sistema de apoio para situações de emergência
        </Text>
      </View>

      {/* SEÇÃO DE WIFI */}
      <View style={secaoWifi.cartaoPrincipal}>
        <View style={secaoWifi.linhaTitulo}>
          <Text style={secaoWifi.iconeWifi}>📶</Text>
          <Text style={secaoWifi.tituloCartao}>Extensão de Rede WiFi</Text>
        </View>
        <Text style={secaoWifi.textoDescritivo}>
          Ative a extensão para melhorar a cobertura para operações
        </Text>
        <View style={secaoWifi.areaStatusBotao}>
          <View style={secaoWifi.linhaStatus}>
            <Text style={secaoWifi.textoStatus}>Status:</Text>
            <Text
              style={[
                secaoWifi.textoStatusDestaque,
                wifiAtivado ? secaoWifi.statusAtivo : secaoWifi.statusInativo,
              ]}
            >
              {wifiAtivado ? "ativo" : "inativo"}
            </Text>
          </View>
          <TouchableOpacity
            style={secaoWifi.botaoAtivar}
            onPress={() => setWifiAtivado(!wifiAtivado)}
          >
            <Text style={secaoWifi.textoBotao}>Ativar WiFi</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* BOTÕES DE NAVEGAÇÃO */}
      <View style={navegacaoInferior.containerBotoes}>
        <TouchableOpacity
          style={[
            navegacaoInferior.botaoIndividual,
            ativo === "historico" && navegacaoInferior.botaoAtivo,
          ]}
          onPress={() => {
            setAtivo("historico");
            setAlertaVisivel(false);
          }}
        >
          <Text
            style={
              ativo === "historico"
                ? navegacaoInferior.textoAtivo
                : navegacaoInferior.textoInativo
            }
          >
            ⏱️ Histórico de Ajudas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            navegacaoInferior.botaoIndividual,
            ativo === "socorros" && navegacaoInferior.botaoAtivo,
          ]}
          onPress={() => {
            setAtivo("socorros");
            setAlertaVisivel(true);
          }}
        >
          <Text
            style={
              ativo === "socorros"
                ? navegacaoInferior.textoAtivo
                : navegacaoInferior.textoInativo
            }
          >
            ❤️ Primeiros socorros
          </Text>
        </TouchableOpacity>
      </View>

      {/* SEÇÃO DO ALERTA */}
      {alertaVisivel && (
        <TouchableWithoutFeedback onPress={() => setAlertaVisivel(false)}>
          <View style={alertaRisco.overlay}>
            <TouchableWithoutFeedback>
              <View style={alertaRisco.cartaoAlerta}>
                <View style={alertaRisco.cabecalhoAlerta}>
                  <Text style={alertaRisco.textoAlerta}>ALERTA! 🆘</Text>
                </View>
                <View style={alertaRisco.conteudoAlerta}>
                  <Text style={alertaRisco.textoPrincipal}>
                    Se não for possível fazer os primeiros socorros em caso de
                    perigo, não faça! Acione diretamente o corpo de bombeiro.
                    botão de ligar 193
                  </Text>
                  <TouchableOpacity
                    style={alertaRisco.botaoLigar}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleLigar();
                    }}
                  >
                    <Text style={alertaRisco.textoBotao}>Ligar 193</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const paginaGlobal = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

const cabecalhoLayout = StyleSheet.create({
  topoCabecalho: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoImagem: {
    width: 220,
    height: 100,
  },
  subtitulo: {
    fontSize: 16,
    color: "#000",
  },
});

const secaoWifi = StyleSheet.create({
  cartaoPrincipal: {
    width: "90%",
    backgroundColor: "rgba(181, 0, 0, 0.1)",
    borderWidth: 1,
    borderColor: "#dc3545",
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  linhaTitulo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  iconeWifi: {
    fontSize: 24,
    marginRight: 10,
  },
  tituloCartao: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  textoDescritivo: {
    fontSize: 14,
    color: "#000",
    marginBottom: 15,
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
    padding: 8,
    fontSize: 14,
    marginBottom: 1,
  },
  statusInativo: {
    color: "#fff",
  },
  statusAtivo: {
    color: "#fff",
  },
  botaoAtivar: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const navegacaoInferior = StyleSheet.create({
  containerBotoes: {
    flexDirection: "row",
    backgroundColor: "#f7f4ea",
    borderRadius: 15,
    justifyContent: "space-between",
    marginTop: 20,
    width: "90%",
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
});

const alertaRisco = StyleSheet.create({
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
    fontWeight: "bold",
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
