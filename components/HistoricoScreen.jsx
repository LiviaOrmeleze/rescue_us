import React, { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../hooks/useTheme";

export function HistoricoScreen(props) {
  const styles = createStyles(useTheme());
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
                <Text style={styles.textobotaoconcluido}>Concluído</Text>
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
                <Text style={styles.textobotaoconcluido}>Concluído</Text>
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
                <Text style={styles.textobotaoconcluido}>Concluído</Text>
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
                <Text style={styles.textobotaoconcluido}>Concluído</Text>
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
                <Text style={styles.textobotaoconcluido}>Concluído</Text>
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
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    caixashistorico: {
      alignItems: "center",
      justifyContent: "center",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 50,
      paddingHorizontal: 20,
    },
    caixabege: {
        backgroundColor: theme.caixaBegeCinza,
        borderRadius: 20,
        padding: 23,
        borderWidth: 1,
        borderColor: theme.borderColorCaixa,
        marginTop: 20,
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
  });
