import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
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

export function PerfilScreen(props) {
  const styles = createStyles(useTheme());

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [remoteId, setRemoteId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Carregar dados do perfil localmente
  useEffect(() => {
    const carregarLocal = async () => {
      try {
        const json = await AsyncStorage.getItem("perfil");
        if (json) {
          const obj = JSON.parse(json);

          setNome(obj.nome || "");
          setEmail(obj.email || "");
          setTelefone(obj.telefone || "");
          setSenha(obj.senha || "");
          setRemoteId(obj.remoteId || null);
        }
      } catch (err) {
        console.log("Erro ao carregar perfil:", err);
      }
    };

    carregarLocal();
  }, []);

  // Salvar perfil local + sincronizar com API
  const salvarPerfil = async () => {
    try {
      const userEmail = (email || "").trim().toLowerCase();
      if (!userEmail) {
        alert("Digite um e-mail para salvar.");
        return;
      }

      const perfil = {
        nome,
        email: userEmail,
        telefone,
        senha,
        remoteId,
      };

      // grava no key genérico e também no key por-usuário (para restauração no login)
      await AsyncStorage.setItem("perfil", JSON.stringify(perfil));
      if (userEmail) {
        await AsyncStorage.setItem(`perfil:${userEmail}`, JSON.stringify(perfil));
      }
      alert("Dados salvos localmente!");

      // Sincronizar com o servidor
      setLoading(true);

      try {
        const apiUrl = "http://rescueus.somee.com/api/Perfis";
        const payload = {
          nome,
          email: userEmail,
          telefone,
          senha,
        };

        let resp;

        if (remoteId) {
          resp = await axios.put(`${apiUrl}/${remoteId}`, payload);
        } else {
          resp = await axios.post(apiUrl, payload);
        }

        if (resp?.status === 200 || resp?.status === 201) {
          const returned = resp.data ?? {};
          const newId =
            returned.id ?? returned.ID ?? returned.idPerfil ?? null;

          // atualiza estado e grava ambos os keys com remoteId
          setRemoteId(newId);

          // salva id atualizado no local
          const perfilAtualizado = { ...perfil, remoteId: newId };
          await AsyncStorage.setItem("perfil", JSON.stringify(perfilAtualizado));
          if (userEmail) {
            await AsyncStorage.setItem(
              `perfil:${userEmail}`,
              JSON.stringify(perfilAtualizado)
            );
          }

          alert("Dados sincronizados com o servidor!");
        }
      } catch (err) {
        console.log("Erro API:", err?.response?.data ?? err.message);
        alert("Não foi possível sincronizar com o servidor. Dados mantidos.");
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.log("Erro ao salvar perfil:", err);
      alert("Erro ao salvar dados.");
      setLoading(false);
    }
  };

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
          />
        </TouchableOpacity>

        <Image
          source={props.logoSource}
          style={styles.logoPerfil}
          resizeMode="contain"
        />
      </View>

      <View style={styles.estPerfil}>
        <Image source={props.Bombeiro} style={styles.bombeiro} />
        <Text style={styles.nomePerfil}>{nome || "Bombeiro"}</Text>
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
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
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
            keyboardType="numeric"
          />
        </View>

        <View style={styles.estDados}>
          <Text style={styles.Prin}>Senha</Text>
          <TextInput
            style={styles.Seng}
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite sua senha"
            placeholderTextColor="#888"
            secureTextEntry={true}
          />
        </View>
      </View>

      <View style={styles.btn}>
        <TouchableOpacity
          style={styles.btnEnteCad}
          onPress={salvarPerfil}
          disabled={loading}
        >
          <Text style={styles.TextBtnEnteCad}>
            {loading ? "Salvando..." : "Salvar"}
          </Text>
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
  });
