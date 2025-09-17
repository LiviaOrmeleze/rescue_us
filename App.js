import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.caixabege}>
        <View>
          <Text style={styles.titulohistorico}>Histórico de Ocorrências</Text>
          <Text style={styles.textohistorico}>Registro das últimas operações realizadas</Text>

          <View style={styles.cbm}>
            <View style={styles.tituloebotao}>
            <Text style={styles.textocbm}>Incendio Residencial</Text>
            <View style={styles.botaoconcluido}><Text>Concluído</Text></View>
            </View>
            <Text>Rua das Flores</Text>
            <View style={styles.diaedata}>
            <Text>15/02/2025</Text>
            <Text>14:30</Text>
            <Text style={styles.vidassalvas}>3 Vidas salvas!</Text>
            </View>
          </View>
          
          <View style={styles.cbm}>
            <View style={styles.tituloebotao}>
            <Text style={styles.textocbm}>Resgate em Altura</Text>
            <View style={styles.botaoconcluido}><Text>Concluído</Text></View>
            </View>
            <Text>Av. Central</Text>
            <View style={styles.diaedata}>
            <Text>14/02/2025</Text>
            <Text>09:30</Text>
            <Text style={styles.vidassalvas}>1 Vida salva!</Text>
            </View>
          </View>

          <View style={styles.cbm}>
            <View style={styles.tituloebotao}>
            <Text style={styles.textocbm}>Acidente em Trânsito</Text>
            <View style={styles.botaoconcluido}><Text>Concluído</Text></View>
            </View>
            <Text>13 de Maio</Text>
            <View style={styles.diaedata}>
            <Text>02/01/2025</Text>
            <Text>12:45</Text>
            <Text style={styles.vidassalvas}>4 Vidas salvas!</Text>
            </View>
          </View>

          <View style={styles.cbm}>
            <View style={styles.tituloebotao}>
            <Text style={styles.textocbm}>Incendio Florestal</Text>
            <View style={styles.botaoconcluido}><Text>Concluído</Text></View>
            </View>
            <Text>Rua Carolina</Text>
            <View style={styles.diaedata}>
            <Text>02/01/2025</Text>
            <Text>01:00</Text>
            <Text style={styles.vidassalvas}>5 Vidas salvas!</Text>
            </View>
          </View>

          <View style={styles.cbm}>
            <View style={styles.tituloebotao}>
            <Text style={styles.textocbm}>Resgate em Altura</Text>
            <View style={styles.botaoconcluido}><Text>Concluído</Text></View>
            </View>
            <Text>25 de Março</Text>
            <View style={styles.diaedata}>
            <Text>01/01/2025</Text>
            <Text>04:00</Text>
            <Text style={styles.vidassalvas}>1 Vida salva!</Text>
            </View>
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
   height: 600,
   borderRadius: 20,
   padding: 23,
   borderWidth: 1,
   borderColor: "rgba(0, 0, 0, 0.10)",
  },
  titulohistorico:{
    fontWeight: "bold",
    fontSize: 18,
  },
  textohistorico: {
    fontSize: 15,
  },
  cbm:{
    marginTop: 10,
    backgroundColor: "#F7F4EA",
    width: 335,
    height: 90,
    borderRadius: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.30)",
  },
  textocbm: {
    fontWeight: "bold",
    fontSize: 15,
  },
  tituloebotao: {
    flexDirection: "row",
  },
  botaoconcluido: {
    backgroundColor: "#F7F4EA",
    width: 90,
    height: 30,
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.30)",
    justifyContent: "flex-end",
  },
  diaedata: {
    flexDirection: "row",
    gap: 48,
  },
  vidassalvas: {
    color: "#FF9903",
    fontWeight: "bold",
    fontSize: 15,
  },
});
