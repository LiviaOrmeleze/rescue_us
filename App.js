import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.caixabege}>
        <View>
          <Text style={styles.titulohistorico}>Histórico de Ocorrências</Text>
          <Text>Registro das últimas operações realizadas</Text>

          <View style={styles.cbm}>
            <View style={styles.tituloebotao}>
            <Text style={styles.textocbm}>Incendio Residencial</Text>
            <View style={styles.botaoconcluido}><Text>Concluído</Text></View>
            </View>
            <Text>Rua das Flores</Text>
            <Text>15/02/2025</Text>
            <Text>14:30</Text>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caixabege: {
   backgroundColor: '#F7F4EA',
   width: 380,
   height: 580,
   borderRadius: 20,
   padding: 23,
  },
  titulohistorico:{
    fontWeight: "bold",
    fontSize: 17,
  },
  cbm:{
    marginTop: 10,
    backgroundColor: "#d9d9d9",
    width: 335,
    height: 90,
    borderRadius: 15,
    padding: 10,
  },
  textocbm: {

  },
  tituloebotao: {
    flexDirection: "row",
  },
});
