import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, FlatList, StyleSheet, StatusBar } from "react-native";
import Button from "./src/components/Button";

const App = () => {
  const [contador, setContador] = useState(0);

  const [tarefaInput, setTarefaInput] = useState("");
  const [tarefas, setTarefas] = useState([
    { id: "1", text: "Estudar React Native" },
    { id: "2", text: "Fazer café" },
    { id: "3", text: "Passear com o cachorro" },
  ]);

  const incrementarContador = () => {
    setContador(contador + 1);
  };

  const adicionarTarefa = () => {
    if (tarefaInput.trim().length > 0) {
      setTarefas([...tarefas, { id: Math.random().toString(), text: tarefaInput }]);
      setTarefaInput("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contador</Text>
        <Text style={styles.contadorText}>Valor: {contador}</Text>
        <Button title="Incrementar Contador" onPress={incrementarContador} />
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lista de Tarefas</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma nova tarefa..."
            value={tarefaInput}
            onChangeText={setTarefaInput}
          />
          <Button title="Adicionar" onPress={adicionarTarefa} />
        </View>

        <FlatList
          data={tarefas}
          renderItem={({ item }) => (
            <View style={styles.tarefaItem}>
              <Text style={styles.tarefaText}>{item.text}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  contadorText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  divider: {
    height: 1,
    backgroundColor: "#DDDDDD",
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: "#FFFFFF",
  },
  list: {
    marginTop: 10,
  },
  tarefaItem: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  tarefaText: {
    fontSize: 16,
  },
});

export default App;
