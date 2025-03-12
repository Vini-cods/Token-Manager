import { View, StyleSheet, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Armazenamento from "../hooks/bancoTokens";
import { useState, useEffect } from "react";
import { CaixaToken } from "../components/tokenView";
import { useIsFocused } from "@react-navigation/native";

export function PaginaSenhas() {
  const { obterItem, removerItem } = Armazenamento();
  const [listaTokens, defListaTokens] = useState([]);
  const telaAtiva = useIsFocused();

  useEffect(() => {
    async function carregaTokens() {
      const tokens = await obterItem("@token");
      defListaTokens(tokens);
    }
    carregaTokens();
  }, [telaAtiva]);

  async function deletarToken(item) {
    const tokens = await removerItem("@token", item);
    defListaTokens(tokens);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={ESTILO.header}>
        <Text style={ESTILO.title}>Minhas senhas</Text>
      </View>
      <View style={ESTILO.content}>
        <FlatList
          style={{ flex: 1, paddingTop: 14 }}
          data={listaTokens}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <CaixaToken token={item} removerToken={() => deletarToken(item)} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const ESTILO = StyleSheet.create({
  header: {
    padding: 14,
    paddingTop: 58,
    backgroundColor: "#392de9",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  content: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
  },
});
