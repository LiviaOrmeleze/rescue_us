import React from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";

export function EntrarBBScreen(props) {
  const styles = createStyles(useTheme());
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoIdentificador, setTipoIdentificador] = useState(""); // Valor inicial do select
  const [identificador, setIdentificador] = useState(""); // Valor do identificador numérico

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
              secureTextEntry={true}
            />
          </View>

          <View style={styles.estDados}>
            <Text style={styles.Prin}>Identificar Bombeiro</Text>
            {/* <View style={styles.identificadorContainer}> */}
              {/* Select para PM ou Bombeiro */}
              <Picker
                selectedValue={tipoIdentificador}
                onValueChange={(itemValue) => setTipoIdentificador(itemValue)}
                style={styles.selectIdentificador}
              >
                <Picker.Item label="PM" value="PM" />
                <Picker.Item label="RE" value="RE" />
              </Picker>

              {/* Input para o identificador numérico */}
              <TextInput
                style={styles.Seng}
                value={identificador}
                onChangeText={(text) => setIdentificador(text)}
                placeholder="xxxxxx-x"
                keyboardType="numeric" // Teclado numérico
                maxLength={8} // Limita o número de caracteres
              />
            {/* </View> */}
          </View>

          <View style={styles.Link}>
            <TouchableOpacity onPress={() => setTelaAtiva(props.cadastrar)}>
              <Text style={styles.textLink}>Se não tem conta, cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity style={styles.btnEnteCad}>
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
  });
