import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../hooks/useTheme";
import axios from "axios";

export function CadastrarScreen(props) {
  const styles = createStyles(useTheme());
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <View>
      <Image
        source={props.logoSource}
        style={styles.logoEntrar}
        resizeMode="contain"
      />
      <Text style={styles.tituloBV}>Bem-Vindo ao Rescue Us!</Text>
      <View style={styles.caixabege}>
        <Text style={styles.entrar}>Cadastrar</Text>
        <View>
          <View style={styles.estDados}>
            <Text style={styles.Prin}>E-mail</Text>

            <TextInput
              style={styles.Seng}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
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

          <View style={styles.Link}>
            <TouchableOpacity onPress={() => props.setTelaAtiva(props.entrar)}>
              <Text style={styles.textLink}>Se já tem conta, entre</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity
          style={styles.btnEnteCad}
          onPress={async () => {
            if (!email || !senha) {
              alert("Erro no cadastro: preencha e-mail e senha.");
              return;
            }

            const userEmail = String(email).trim().toLowerCase();
            const userSenha = String(senha);

            try {
              setLoading(true);

              const url =  'http://rescueus.somee.com/Usuario/register';
              // envio ambos os campos "senha" e "password" temporariamente
              const payload = {
                email: userEmail,
                senha: userSenha,
                password: userSenha,
              };

              const response = await axios.post(url, payload, {
                headers: { "Content-Type": "application/json" },
              });

              console.log("Register response:", response.status, response.data);

              if (response?.status === 200 || response?.status === 201) {
                const key = `perfil:${userEmail}`;
                const perfil = { email: userEmail, senha: userSenha };
                await AsyncStorage.setItem(key, JSON.stringify(perfil));
                await AsyncStorage.setItem(
                  "perfil",
                  JSON.stringify({ email: userEmail, senha: userSenha })
                );

                alert("Cadastro realizado com sucesso!");
                props.setTelaAtiva("euSou");
                return;
              }

              const msg =
                response?.data?.message ||
                JSON.stringify(response?.data) ||
                `Erro no cadastro (status ${response?.status}).`;
              alert(msg);
            } catch (err) {
              // logs detalhados para debug
              console.log("Erro ao cadastrar (API):", err);
              console.log("err.response?.status:", err?.response?.status);
              console.log("err.response?.data:", err?.response?.data);
              const serverData = err?.response?.data;
              const serverMsg =
                (serverData && (serverData.message || JSON.stringify(serverData))) ||
                err.message ||
                "Erro ao cadastrar.";
              alert(`Erro ao cadastrar`);
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
        >
          <Text style={styles.TextBtnEnteCad}>
            {loading ? "Registrando..." : "Cadastrar"}
          </Text>
        </TouchableOpacity>
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
    btn: {
      marginTop: 30,
    },
    btnEnteCad: {
      borderRadius: 16,
      padding: 10,
      borderWidth: 1,
      borderColor: theme.color,
      backgroundColor: theme.alert,
    },
    TextBtnEnteCad: {
      fontSize: 20,
      textAlign: "center",
      color: theme.color,
    },
    textLink: {
      marginTop: 14,
      color: theme.color,
    },
  });
