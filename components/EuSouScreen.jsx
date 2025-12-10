import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function EuSouScreen(props) {
  const styles = createStyles(useTheme());

  // Função para salvar o tipo de usuário e redirecionar
  const selecionarTipoUsuario = async (tipoUsuario) => {
    try {
      await AsyncStorage.setItem("tipoUsuario", tipoUsuario); // Salva o tipo de usuário no AsyncStorage
      console.log(`Tipo de usuário salvo: ${tipoUsuario}`);

      if (tipoUsuario === "bombeiro") {
        props.setTelaAtiva(props.perfilBB); // Redireciona para a tela de Bombeiro
      } else if (tipoUsuario === "colaborador") {
        props.setTelaAtiva(props.entrar); // Redireciona para a tela de Colaborador
      }
    } catch (err) {
      console.error("Erro ao salvar tipo de usuário:", err);
      Alert.alert("Erro", "Não foi possível salvar o tipo de usuário.");
    }
  };

  const selecionarBombeiro = async () => {
    try {
      await AsyncStorage.setItem("tipoUsuario", "bombeiro"); // Salva o tipo de usuário como "bombeiro"
      props.setTelaAtiva(props.perfilBB); // Redireciona para o PerfilBB
    } catch (err) {
      console.error("Erro ao salvar tipo de usuário:", err);
      Alert.alert("Erro", "Não foi possível selecionar Bombeiro.");
    }
  };

  return (
    <View>
      <Image
        source={props.logoSource}
        style={styles.logoEntrar}
        resizeMode="contain"
      />
      <Text style={styles.tituloBV}>Bem-Vindo ao Rescue Us!</Text>
      <View style={styles.caixabege}>
        <Text style={styles.entrar}>O que você é?</Text>

        <View style={styles.campoEuSou}>
          {/* Botão para Bombeiro */}
          <TouchableOpacity
            style={styles.cardEuSou}
            onPress={() => selecionarBombeiro() }
          >
            <Text style={styles.textEuSou}>Eu sou Bombeiro</Text>
            <Ionicons
              style={styles.iconEuSou}
              name="flame-outline"
              size={25}
            ></Ionicons>
          </TouchableOpacity>

          {/* Botão para Colaborador */}
          <TouchableOpacity
            style={styles.cardEuSou}
            onPress={() => selecionarTipoUsuario("colaborador")}
          >
            <Text style={styles.textEuSou}>Eu sou Colaborador</Text>
            <Ionicons
              style={styles.iconEuSou}
              name="person-outline"
              size={25}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
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
    caixabege: {
      backgroundColor: theme.caixaBegeCinza,
      borderRadius: 20,
      padding: 23,
      borderWidth: 1,
      borderColor: theme.borderColorCaixa,
      marginTop: 20,
    },
    campoEuSou: {
      marginTop: 15,
      gap: 15,
      flexDirection: "row",
      justifyContent: "center",
    },
    cardEuSou: {
      backgroundColor: theme.color,
      padding: 12,
      alignItems: "center",
      borderRadius: 9,
      paddingHorizontal: 15,
      borderWidth: 2,
      borderColor: theme.alert,
    },
    textEuSou: {
      fontSize: 16,
    },
    iconEuSou: {
      marginTop: 10,
    },
  });
