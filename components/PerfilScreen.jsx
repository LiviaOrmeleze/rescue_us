import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { useTheme } from "../hooks/useTheme";

export function PerfilScreen(props) {
  const styles = createStyles(useTheme());
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
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
      </View>
     <View style={styles.btn}>
             <TouchableOpacity style={styles.btnEnteCad}>
               <Text style={styles.TextBtnEnteCad}>Salvar</Text>
             </TouchableOpacity>
           </View>
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
      }
  });
