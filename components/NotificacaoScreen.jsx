import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

export function NotificacaoScreen(props) {
  const styles = createStyles(useTheme());

  
  return (
    <View>
      <View style={styles.caixabege}>
        <View style={styles.estNot}>
          <TouchableOpacity
            onPress={() => props.setTelaAtiva(props.home)}
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
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    IconNot: {
      color: theme.color,
    },
    caixabege: {
      backgroundColor: theme.caixaBegeCinza,
      borderRadius: 20,
      padding: 23,
      borderWidth: 1,
      borderColor: theme.borderColorCaixa,
      marginTop: 20,
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
  })
