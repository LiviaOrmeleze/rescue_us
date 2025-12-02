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

export function EntrarScreen(props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const styles = createStyles(useTheme());

  return (
    <View>
      <Image
        source={props.logoSource}
        style={styles.logoEntrar}
        resizeMode="contain"
      />
      <Text style={styles.tituloBV}>Bem-Vindo ao Rescue Us!</Text>
      <View style={styles.caixabege}>
        <Text style={styles.entrar}>Entrar</Text>
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
            <TouchableOpacity
              onPress={() => props.setTelaAtiva(props.cadastrar)}
            >
              <Text style={styles.textLink}>Se não tem conta, cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity
          style={styles.btnEnteCad}
          onPress={async () => {
            if (!email || !senha) {
              alert("Erro no login: preencha e-mail e senha.");
              return;
            }

            const userEmail = String(email).trim().toLowerCase();
            const userSenha = String(senha);

            try {
              // primeiro tenta o perfil individual
              const key = `perfil:${userEmail}`;
              const perJson = await AsyncStorage.getItem(key);
              if (perJson) {
                const perObj = JSON.parse(perJson);
                if (String(perObj.senha) === userSenha) {
                  // login ok: atualiza referência atual e navega
                  await AsyncStorage.setItem(
                    "perfil",
                    JSON.stringify({ email: userEmail, senha: userSenha })
                  );
                  // se o perfil individual já tiver dados (nome/telefone), vai direto para home
                  const temPerfilPreenchido =
                    (perObj.nome && String(perObj.nome).trim() !== "") ||
                    (perObj.telefone && String(perObj.telefone).trim() !== "");
                  props.setTelaAtiva(temPerfilPreenchido ? "home" : "euSou");
                  return;
                } else {
                  alert("Credenciais inválidas.");
                  return;
                }
              }

              // fallback: checa se existe objeto genérico 'perfil' com mesmas credenciais
              const generic = await AsyncStorage.getItem("perfil");
              if (generic) {
                try {
                  const gobj = JSON.parse(generic);
                  if (
                    String(gobj.email).trim().toLowerCase() === userEmail &&
                    String(gobj.senha) === userSenha
                  ) {
                    // se o objeto genérico contém também dados do perfil, vai para home
                    const temPerfilPreenchido =
                      (gobj.nome && String(gobj.nome).trim() !== "") ||
                      (gobj.telefone && String(gobj.telefone).trim() !== "");
                    props.setTelaAtiva(temPerfilPreenchido ? "home" : "euSou");
                    return;
                  }
                } catch (e) {
                  // ignore parse error and continue to not-registered
                }
              }

              // se chegou aqui, não há registro
              alert("Usuário não cadastrado.");
            } catch (err) {
              console.log("Erro ao verificar credenciais:", err);
              alert("Erro ao verificar credenciais.");
            }
          }}
        >
          <Text style={styles.TextBtnEnteCad}>Entrar</Text>
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
