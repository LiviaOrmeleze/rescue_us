import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

export function SocorrosScreen(props) {
  const styles = createStyles(useTheme());

  return (
    <View style={styles.estCard}>
      <View style={styles.cardPQE}>
        <Text style={styles.textCardPQE}>
          <Ionicons name="heart-outline" size={24} color="#9b0101"></Ionicons>{" "}
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
          <Ionicons name="warning-outline" size={24} color="#9b0101"></Ionicons>{" "}
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
          <Text style={styles.textListaPQE}>Não aplique gelo diretamente</Text>
        </View>
        <View style={styles.ListaPQE}>
          <Text style={[styles.bolinhaLista, styles.textBolinha]}>4</Text>
          <Text style={styles.textListaPQE}>Cubra com pano limpo e úmido</Text>
        </View>
        <View style={styles.ListaPQE}>
          <Text style={[styles.bolinhaLista, styles.textBolinha]}>5</Text>
          <Text style={styles.textListaPQE}>Procure atendimento médico</Text>
        </View>
      </View>

      <View style={styles.cardPQE}>
        <Text style={styles.textCardPQE}>
          <Ionicons name="shield-outline" size={24} color="#9b0101"></Ionicons>{" "}
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
          <Text style={styles.textListaPQE}>Aplique 5 pancadas nas costas</Text>
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
          <Text style={styles.textListaPQE}>Chame ajuda se não resolver</Text>
        </View>
      </View>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
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
  });
