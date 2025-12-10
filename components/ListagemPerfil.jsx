import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";


export function ListagemPerfil(props) {
  const styles = createStyles(useTheme());

  // Exemplo de dados fictícios
  const perfis = [
    { nome: "João Silva", email: "joao.silva@email.com" },
    { nome: "Maria Oliveira", email: "maria.oliveira@email.com" },
    { nome: "Carlos Santos", email: "carlos.santos@email.com" },
    { nome: "Ana Costa", email: "ana.costa@email.com" },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
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
      <Text style={styles.titulo}>Listagem de Perfis</Text>
      <FlatList
        data={perfis}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
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
      marginBottom:20,
      marginTop:15,
      textAlign: "center",
    },
    lista: {
      paddingBottom: 20,
    },
    card: {
      backgroundColor: theme.borderColorCaixa,
      marginBottom: 10,
      padding:10,
      borderRadius: 10,
      borderWidth:2,
      borderColor: theme.backgroundColorCbm
    },
    nome: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.color,
      marginBottom: 5,
    },
    email: {
      fontSize: 16,
      color: theme.color,
    },
  });