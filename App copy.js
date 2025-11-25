import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

import apiService from "./service/apiService";

const App = () => {
  const [perfis, setPerfis] = useState([]);

  useEffect(() => {
    const perfil = async () => {
      try {
        const listaSimples = await apiService.getPerfisSimples();
        setPerfis(listaSimples);
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    };

    perfil();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Lista de Perfis (via apiService)</Text>
      <FlatList
        data={perfis}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <View>
            <Text>Nome: {item.nome}</Text>
            <Text>Email: {item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
