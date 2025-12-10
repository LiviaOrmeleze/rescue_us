import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";

export function RedesConhecidas(props) {
  const styles = createStyles(useTheme());
  const [redes, setRedes] = useState([
    { id: "1", nome: "Rede 193", conectado: false },
    { id: "2", nome: "Rede Ajuda bombeiro", conectado: false },
    { id: "3", nome: "Rede Socorros", conectado: false },
    { id: "4", nome: "Rede SOS", conectado: false },
  ]);
  const [redeConectada, setRedeConectada] = useState(null);

  const conectarRede = (id) => {
    const novaListaRedes = redes.map((rede) =>
      rede.id === id
        ? { ...rede, conectado: true }
        : { ...rede, conectado: false }
    );
    const redeSelecionada = novaListaRedes.find((rede) => rede.id === id);
    setRedes(novaListaRedes);
    setRedeConectada(redeSelecionada.nome);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        item.conectado && styles.cardConectado, // Aplica estilo de conectado
      ]}
      onPress={() => conectarRede(item.id)}
    >
      <Text style={styles.nome}>{item.nome}</Text>
      {item.conectado && (
        <Text style={styles.statusConectado}>Conectado</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.estCabPerfil}>
        <TouchableOpacity
          onPress={() => props.setTelaAtiva(props.homeBB)}
          style={styles.btnVoltar}
        >
          <Ionicons
            style={styles.IconNot}
            name="arrow-back-circle-outline"
            size={30}
          ></Ionicons>
        </TouchableOpacity>
        <Image
          source={props.logoSource}
          style={styles.logoPerfil}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.titulo}>Redes Conhecidas</Text>
      <FlatList
        data={redes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />
      {redeConectada && (
        <Text style={styles.redeConectada}>
          Conectado à: {redeConectada}
        </Text>
      )}
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      padding: 20,
    },
    estCabPerfil: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between", // Coloca o botão e a logo em extremidades opostas
      width: "100%",
    },
    logoPerfil: {
      width: 200, // Define a largura da logo
      height: 80, // Define a altura da logo
      resizeMode: "contain", // Garante que a imagem seja redimensionada corretamente
    },
    IconNot: {
      color: theme.color,
    },
    titulo: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.color,
      marginBottom: 20,
      marginTop: 15,
      textAlign: "center",
    },
    lista: {
      paddingBottom: 20,
    },
    card: {
      backgroundColor: theme.borderColorCaixa,
      marginBottom: 10,
      padding: 10,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.backgroundColorCbm,
    },
    cardConectado: {
      borderColor: theme.successColor, // Destaque para redes conectadas
    },
    nome: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.color,
      marginBottom: 5,
    },
    statusConectado: {
      fontSize: 16,
      color: theme.successColor,
      fontWeight: "bold",
    },
    redeConectada: {
      marginTop: 20,
      fontSize: 16,
      fontWeight: "bold",
      color: theme.color,
      textAlign: "center",
    },
  });