import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "../hooks/useTheme";
import { Picker } from "@react-native-picker/picker";

export function PerfilBBScreen(props) {
  const styles = createStyles(useTheme());
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  // Estado adicionais necessários para o Picker e campos de perfil
  const [tipoIdentificador, setTipoIdentificador] = useState("");
  const [identificador, setIdentificador] = useState("");
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
    <View>
      <View style={styles.estCabPerfil}>
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
        <Image
          source={props.logoSource}
          style={styles.logoPerfil}
          resizeMode="contain"
        />
      </View>
      <View style={styles.estPerfil}>
        <Image source={props.Bombeiro} style={styles.bombeiro} />
        <Text style={styles.nomePerfil}>Bombeiro da Eliana</Text>
      </View>
      <View>
        <View style={styles.estDados}>
          <Text style={styles.Prin}>Nome</Text>
          <TextInput
            style={styles.Seng}
            placeholder="Digite seu nome"
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.estDados}>
          <Text style={styles.Prin}>E-mail</Text>
          <TextInput
            style={styles.Seng}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#888"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.estDados}>
          <Text style={styles.Prin}>Telefone</Text>
          <TextInput
            style={styles.Seng}
            placeholder="Digite seu telefone"
            placeholderTextColor="#888"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.estDados}>
          <Text style={styles.Prin}>Senha</Text>
          <TextInput
            style={styles.Seng}
            value={senha}
            onChangeText={(text) => setSenha(text)}
            placeholder="Digite sua senha"
            placeholderTextColor="#888"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.estDados}>
          <Text style={styles.Prin}>Identificar Bombeiro</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={tipoIdentificador}
              onValueChange={(itemValue) => setTipoIdentificador(itemValue)}
              style={styles.picker} // Aplica estilos internos ao texto do Picker
            >
              <Picker.Item label="PM" value="PM" />
              <Picker.Item label="RE" value="RE" />
            </Picker>
          </View>

          <TextInput
            style={styles.Seng}
            value={identificador}
            onChangeText={(text) => setIdentificador(text)}
            placeholderTextColor="#888"
            placeholder="xxxxxx-x"
            keyboardType="numeric" // Teclado numérico
            maxLength={8} // Limita o número de caracteres
          />
        </View>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity style={styles.btnEnteCad}>
          <Text style={styles.TextBtnEnteCad}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
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
    bombeiro: {
      width: 150,
      height: 150,
      borderRadius: 100,
      resizeMode: "cover",
      alignSelf: "center",
      borderWidth: 2,
      borderColor: theme.borderColorCaixa,
      marginTop: 30,
    },
    estPerfil: {
      alignItems: "center",
      marginBottom: 40,
    },
    nomePerfil: {
      color: theme.color,
      fontSize: 20,
      marginTop: 12,
      fontWeight: "500",
    },
    estDados: {
      marginTop: 20,
    },
    Prin: {
      color: theme.color,
      fontSize: 15,
      marginBottom: 8,
    },
    Seng: {
      color: theme.color,
      fontSize: 15,
      padding: 12,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.borderColorCaixa,
    },
    IconNot: {
      color: theme.color,
    },
    btn: {
      marginTop: 30,
      marginBottom: 30,
    },
    TextBtnEnteCad: {
      fontSize: 20,
      textAlign: "center",
      color: theme.color,
    },
    btnEnteCad: {
      borderRadius: 16,
      padding: 10,
      borderWidth: 1,
      borderColor: theme.color,
      backgroundColor: theme.alert,
    },
    picker: {
      color: theme.color,
    },
  });
