import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, RefreshControl } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import apiService from "../service/apiService";

export function ListagemPerfil(props) {
  const styles = createStyles(useTheme());
  const [perfis, setPerfis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarPerfis = async () => {
    try {
      setLoading(true);
      const lista = await apiService.getPerfisSimples();
      setPerfis(lista || []);
    } catch (error) {
      console.error("Erro ao buscar perfis:", error);
      alert("Erro ao carregar listagem de perfis.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    carregarPerfis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.refreshKey]); // quando props.refreshKey mudar, recarrega a lista

  const onRefresh = () => {
    setRefreshing(true);
    carregarPerfis();
  };

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
          />
        </TouchableOpacity>
        <Image
          source={props.logoSource}
          style={styles.logoPerfil}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.titulo}>Listagem de Perfis</Text>

      {loading && !refreshing ? (
        <Text style={{ color: styles.nome.color, textAlign: "center" }}>Carregando...</Text>
      ) : (
        <FlatList
          data={perfis}
          keyExtractor={(item, index) => item.email || index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={styles.nome.color} />
          }
          ListEmptyComponent={<Text style={{ color: styles.nome.color, textAlign: "center" }}>Nenhum perfil encontrado.</Text>}
        />
      )}
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      paddingHorizontal: 20,
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