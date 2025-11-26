import {
    StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTheme } from "../hooks/useTheme";

export function Alerta(props) {
  const styles = createStyles(useTheme());


  return (
    <TouchableWithoutFeedback onPress={() => props.setAlertaVisivel(false)}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.cartaoAlerta}>
            <View style={styles.cabecalhoAlerta}>
              <Text style={styles.textoAlerta}>ALERTA! 🆘</Text>
            </View>
            <View style={styles.conteudoAlerta}>
              <Text style={styles.textoPrincipal}>
                Se não for possível fazer os primeiros socorros em caso de
                perigo, não faça! Acione diretamente o corpo de bombeiro. botão
                de ligar 193
              </Text>
              <TouchableOpacity
                style={styles.botaoLigar}
                onPress={(e) => {
                  e.stopPropagation();
                  props.handleLigar;
                }}
              >
                <Text style={styles.textoBotao}>Ligar 193</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme.overlay,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
      },
      cartaoAlerta: {
        width: "90%",
        backgroundColor: theme.alert,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
      },
      cabecalhoAlerta: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start", // Alinha ao canto esquerdo
        marginBottom: 10,
      },
      textoAlerta: {
        color: theme.colorBtnWifi,
        fontWeight: "bold",
        fontSize: 20, // Texto grande
      },
      conteudoAlerta: {
        alignItems: "center",
      },
      textoPrincipal: {
        color: theme.color,
        fontSize: 14,
        textAlign: "center",
        marginBottom: 15,
        // fontWeight: "bold",
      },
      botaoLigar: {
        backgroundColor: theme.colorVidas,
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 15,
      },
      textoBotao: {
        color: theme.colorP,
        fontWeight: "bold",
        fontSize: 16,
      },
  })
