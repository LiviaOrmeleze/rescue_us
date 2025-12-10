import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../hooks/useTheme";

export function HomeBB(props) {
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
      <View>
        <View style={styles.logoENot}>
          <TouchableOpacity onPress={() => props.setTelaAtiva(props.perfilBB)}>
            <Ionicons
              style={styles.IconNot}
              name="person-circle-sharp"
              size={30}
            ></Ionicons>
          </TouchableOpacity>
          <Image
            source={props.logoSource}
            style={styles.logoImagem}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.subtitulo}>
          Sistema de apoio para situações de emergência
        </Text>
      </View>

      <TouchableOpacity
        style={styles.container}
        onPress={() => props.setTelaAtiva(props.ListagemPerfil)}
      >
        <Text style={styles.title}>Listagem de Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.container}
        onPress={() => props.setTelaAtiva(props.RedesConhecidas)}
      >
        <Text style={styles.title}>Redes conhecidas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.container}
        onPress={() => props.setTelaAtiva(props.HistóricoDeAlerta)}
      >
        <Text style={styles.title}>Histórico de alertas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    logoENot: {
      flexDirection: "row",
      gap: 50,
    },
    IconNot: {
      color: theme.color,
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
    container: {
      padding: 16,
      borderColor: theme.borderColorCaixa,
      borderWidth: 1,
      borderRadius: 8,
      marginTop: 30,
    },
    title: {
      fontSize: 19,
      fontWeight: "bold",
      color: theme.color,
      marginBottom: 8,
      textAlign: "center",
    },
  });
