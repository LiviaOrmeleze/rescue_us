import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";



export function EuSouScreen(props){

const styles = createStyles(useTheme());

return(
    <View>
           <Image
            source={props.logoSource}
            style={styles.logoEntrar}
            resizeMode="contain"
          />
          <Text style={styles.tituloBV}>Bem-Vindo ao Rescue Us!</Text>
          <View style={styles.caixabege}>
            <Text style={styles.entrar}>O que você é?</Text>

            <View style={styles.campoEuSou}>
              
            <TouchableOpacity style={styles.cardEuSou} onPress={() => setTelaAtiva("entrarBB")}>
                <Text style={styles.textEuSou}>Eu sou Bombeiro</Text>
                <Ionicons style={styles.iconEuSou} name="flame-outline" size={25}></Ionicons>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cardEuSou} onPress={() => setTelaAtiva("entrar")}>
                <Text style={styles.textEuSou}>Eu sou Colaborador</Text>
                <Ionicons style={styles.iconEuSou} name="person-outline" size={25}></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
         
        </View>
)
}
const createStyles = (theme) =>
  StyleSheet.create({

  })