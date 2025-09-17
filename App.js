import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function App() {
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
    <View style={styles.container}>
      <StatusBar style="auto" />

      <ScrollView
        contentContainerStyle={[styles.scrollContainer, { paddingTop: 70 }]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={"#8faaff"}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.estCard}>
          <View style={styles.cardPQE}>
            <Text style={styles.textCardPQE}>
              ❤️ Parada Cardiorrespiratória
            </Text>
            <View style={styles.ListaPQE}>
              <Text style={[styles.bolinhaLista, styles.textBolinha]}>1</Text>
              <Text style={styles.textListaPQE}>
                Verifique a consciência da vítima
              </Text>
            </View>
            <View style={styles.ListaPQE}>
              <Text style={[styles.bolinhaLista, styles.textBolinha]}>2</Text>
              <Text style={styles.textListaPQE}>Chame Ajuda (193)</Text>
            </View>
            <View style={styles.ListaPQE}>
              <Text style={[styles.bolinhaLista, styles.textBolinha]}>3</Text>
              <Text style={styles.textListaPQE}>
                Pocisione as mãos no centro do peito
              </Text>
            </View>
            <View style={styles.ListaPQE}>
              <Text style={[styles.bolinhaLista, styles.textBolinha]}>4</Text>
              <Text style={styles.textListaPQE}>
                Faça compressões de 5-6 cm de profundidade
              </Text>
            </View>
            <View style={styles.ListaPQE}>
              <Text style={[styles.bolinhaLista, styles.textBolinha]}>5</Text>
              <Text style={styles.textListaPQE}>
                Mantenha o ritmo de 100-200 compressões/min
              </Text>
            </View>
          </View>

          <View style={styles.cardPQE}>
            <Text style={styles.textCardPQE}>
            ⚠️  Queimadas
            </Text>
            <View style={styles.ListaPQE}>
              <Text style={[styles.bolinhaLista, styles.textBolinha]}>1</Text>
              <Text style={styles.textListaPQE}>
              Remova a vítima da fonte de calor 
              </Text>
            </View>
            <View style={styles.ListaPQE}>
              <Text style={[styles.bolinhaLista, styles.textBolinha]}>2</Text>
              <Text style={styles.textListaPQE}>Resfrie com água corrente por 10-20 min</Text>
            </View>
            <View style={styles.ListaPQE}>
              <Text style={[styles.bolinhaLista, styles.textBolinha]}>3</Text>
              <Text style={styles.textListaPQE}>
              Não aplique gelo diretamente
              </Text>
            </View>
            <View style={styles.ListaPQE}>
              <Text style={[styles.bolinhaLista, styles.textBolinha]}>4</Text>
              <Text style={styles.textListaPQE}>
              Cubra com pano limpo e úmido
              </Text>
            </View>
            <View style={styles.ListaPQE}>
              <Text style={[styles.bolinhaLista, styles.textBolinha]}>5</Text>
              <Text style={styles.textListaPQE}>
              Procure atendimento médico
              </Text>
            </View>
          </View>

          <View style={styles.cardPQE}>
            <Text style={styles.textCardPQE}>
              🛡️ Engasgo
            </Text>
            <View style={styles.ListaPQE}>
              <Text style={[styles.bolinhaLista, styles.textBolinha]}>1</Text>
              <Text style={styles.textListaPQE}>
              Incentive  a tosse se a pessoa conseguir  
              </Text>
            </View>
            <View style={styles.ListaPQE}>
              <Text style={[styles.bolinhaLista, styles.textBolinha]}>2</Text>
              <Text style={styles.textListaPQE}>Aplique 5 pancadas nas costas</Text>
            </View>
            <View style={styles.ListaPQE}>
              <Text style={[styles.bolinhaLista, styles.textBolinha]}>3</Text>
              <Text style={styles.textListaPQE}>
              Faça a manobra de Heimilich se necessário 
              </Text>
            </View>
            <View style={styles.ListaPQE}>
              <Text style={[styles.bolinhaLista, styles.textBolinha]}>4</Text>
              <Text style={styles.textListaPQE}>
              Alterne pancadas e compreensões 
              </Text>
            </View>
            <View style={styles.ListaPQE}>
              <Text style={[styles.bolinhaLista, styles.textBolinha]}>5</Text>
              <Text style={styles.textListaPQE}>
              Chame ajuda se não resolver
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.caixaEmergencia}>
          <View style={styles.estCardEmergencia}>
          <Text style={styles.textIcon}>📞</Text>
          <View>
          <Text style={styles.textEmergencia}>Emergência: 193</Text>
          <Text style={styles.textExpEmergencia}>Em casos de emergência, sempre acione o Corpo de Bombeiros</Text>
          </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  estCard: {
    gap: 30,
  },
  cardPQE: {
    backgroundColor: "#F7F4EA",
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
  },
  textCardPQE: {
    fontWeight: "bold",
    fontSize: 21,
    marginBottom: 10,
  },
  ListaPQE: {
    flexDirection: "row",
    marginTop: 13,
    gap: 10,
  },
  textListaPQE: {
    fontSize: 16,
  },
  bolinhaLista: {
    backgroundColor: "#9b0101",
    width: 24,
    height: 24,
    borderRadius: 50,
  },
  textBolinha: {
    color: "#fff",
    textAlign: "center",
  },
  caixaEmergencia:{
    backgroundColor:"rgba(255,153,3,0.15)",
    padding:20,
    borderRadius: 15,
    marginTop:30,
    borderWidth: 1,
    borderColor: "#FF9903"
  },
  estCardEmergencia:{
    flexDirection:"row",
    gap:10,
  },
  textIcon:{
    fontSize:25,
    padding:10
  },
  textEmergencia:{
    fontWeight: "bold",
    fontSize: 16,
  }

});
