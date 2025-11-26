import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function NotificacaoScreen(props) {
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
