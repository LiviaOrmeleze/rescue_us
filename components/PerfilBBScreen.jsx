import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import { useTheme } from "../hooks/useTheme";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function PerfilBBScreen(props) {
  const styles = createStyles(useTheme());
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipoIdentificador, setTipoIdentificador] = useState("");
  const [identificador, setIdentificador] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const carregarPerfil = async () => {
    try {
      console.log("🔄 Carregando perfil...");
      const perfilString = await AsyncStorage.getItem("perfil");
      if (perfilString) {
        const perfil = JSON.parse(perfilString);
        setNome(perfil.nome || "");
        setEmail(perfil.email || "");
        setTelefone(perfil.telefone || "");
        setSenha(perfil.senha || "");
        setTipoIdentificador(perfil.tipoIdentificador || "");
        setIdentificador(perfil.identificador || "");
        console.log("✅ Perfil carregado:", perfil);
      } else {
        console.log("⚠️ Nenhum perfil encontrado.");
      }
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
    }
  };

  const salvarPerfil = async () => {
    try {
      const userEmail = String(email || "")
        .trim()
        .toLowerCase();
      if (!userEmail) {
        alert("Digite um e-mail para salvar o perfil.");
        return;
      }

      const perfil = {
        nome,
        email: userEmail,
        telefone,
        senha,
        tipoIdentificador,
        identificador,
      };

      const key = `perfil:${userEmail}`;
      await AsyncStorage.setItem(key, JSON.stringify(perfil));

      await AsyncStorage.setItem(
        "perfil",
        JSON.stringify({ email: userEmail, senha })
      );

      Alert.alert("Sucesso", "Perfil salvo com sucesso!");
      console.log("✅ Dados salvos:", perfil);
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      Alert.alert("Erro", "Erro ao salvar o perfil. Tente novamente.");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarPerfil();
    setRefreshing(false);
  };

  useEffect(() => {
    carregarPerfil();
  }, []);

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
        <View style={styles.estPerfil}>
          <Image source={props.Bombeiro} style={styles.bombeiro} />
          <Text style={styles.nomePerfil}>Bombeiro da Eliana</Text>
        </View>
        <View>
          <View style={styles.estDados}>
            <Text style={styles.Prin}>Nome</Text>
            <TextInput
              style={styles.Seng}
              value={nome}
              onChangeText={setNome}
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
              value={telefone}
              onChangeText={setTelefone}
              placeholder="Digite seu telefone"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
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
            <Text style={styles.Prin}>Tipo de Identificador</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={tipoIdentificador}
                onValueChange={(itemValue) => setTipoIdentificador(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="PM" value="PM" />
                <Picker.Item label="RE" value="RE" />
              </Picker>
            </View>
            <TextInput
              style={styles.Seng}
              value={identificador}
              onChangeText={(text) => setIdentificador(text)}
              placeholder="Digite o identificador"
              placeholderTextColor="#888"
              keyboardType="numeric"
              maxLength={8}
            />
          </View>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.btnEnteCad}
            onPress={async () => {
              await salvarPerfil();
              props.setTelaAtiva(props.homeBB);
            }}
          >
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
      justifyContent: "space-between",
      width: "100%",
    },
    logoPerfil: {
      width: 200,
      height: 80,
      resizeMode: "contain",
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
