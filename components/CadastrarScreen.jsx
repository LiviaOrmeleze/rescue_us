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

export function CadastrarScreen(props) {
  const styles = createStyles(useTheme());
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

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
              // checa se já existe perfil por e-mail
              const key = `perfil:${userEmail}`;
              const perJson = await AsyncStorage.getItem(key);
              if (perJson) {
                alert("Usuário já cadastrado.");
                return;
              }

              // checa fallback na chave genérica
              const generic = await AsyncStorage.getItem("perfil");
              if (generic) {
                try {
                  const gobj = JSON.parse(generic);
                  if (String(gobj.email).trim().toLowerCase() === userEmail) {
                    alert("Usuário já cadastrado.");
                    return;
                  }
                } catch (e) {
                  // ignore parse errors
                }
              }

              // salva novo perfil (por e-mail) e atualiza referência genérica
              const perfil = {
                nome: "",
                email: userEmail,
                telefone: "",
                senha: userSenha,
              };
              await AsyncStorage.setItem(key, JSON.stringify(perfil));
              await AsyncStorage.setItem(
                "perfil",
                JSON.stringify({ email: userEmail, senha: userSenha })
              );
            } catch (err) {
              console.log("Erro ao salvar perfil no Cadastrar:", err);
              alert("Erro ao salvar dados localmente.");
              return;
            }

            props.setTelaAtiva("euSou");
          }}
        >
          <Text style={styles.TextBtnEnteCad}>Cadastrar</Text>
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
