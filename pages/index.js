import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { ModalTokens } from "../components/modal";

export function Home() {
  const [qtde, defineQtde] = useState(6);
  const [telaModal, configTelaModal] = useState(false);
  const [tokenValue, configTokenValue] = useState("");

  function gerarToken() {
    let token = "";
    for (let i = 0, n = caracteres.length; i < qtde; i++) {
      token += caracteres.charAt(Math.floor(Math.random() * n));
    }
    configTokenValue(token);
    configTelaModal(true);
  }

  let caracteres =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  return (
    <View style={ESTILO.container}>
      <Image source={require("../assets/logo.png")} style={ESTILO.logo} />
      <Text style={ESTILO.caracteres}>{qtde} Caracteres</Text>
      <View style={ESTILO.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={6}
          maximumValue={20}
          minimumTrackTintColor="#ff0000"
          maximumTrackTintColor="#000"
          thumbTintColor="#392de9"
          value={qtde}
          onValueChange={(value) => defineQtde(Math.floor(value))}
        />
      </View>
      <TouchableOpacity style={ESTILO.button} onPress={gerarToken}>
        <Text style={ESTILO.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>
      <Modal visible={telaModal} animationType="fade" transparent={true}>
        <ModalTokens token={tokenValue} fechar={() => configTelaModal(false)} />
      </Modal>
    </View>
  );
}

const ESTILO = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3ff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginBottom: 60,
  },
  area: {
    marginBottom: 14,
    marginTop: 14,
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 8,
  },
  button: {
    backgroundColor: "#392de9",
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
  },
  caracteres: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
