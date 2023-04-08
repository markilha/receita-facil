import { useState,useEffect} from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Logo } from "../../components/logo";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Foodlist } from "../../components/foodlist";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [inputValue, setInputValue] = useState("");
  const [foods,setFoods]= useState([])
  const navigation = useNavigation()

  useEffect(()=>{
   async function fetchApi(){
      const response = await axios.get(`https://markilha.github.io/db/db.json`)
      setFoods(response.data.foods)
    }
    fetchApi(); 
  },[])

  function handleSearch() {
   if(!inputValue) return;
   setInputValue("")
   navigation.navigate("Search",{name:inputValue})
  }
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Text style={styles.title}>Encontre a receita</Text>
      <Text style={styles.title}>que combina com você</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Digite o nome da comida..."
          style={styles.input}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={28} color={"#4cbe6c"} />
        </TouchableOpacity>
      </View>

      <FlatList
      data={foods}
      keyExtractor={(item)=> String(item.id)}
      renderItem={({item})=><Foodlist data={item}/>}
      showsHorizontalScrollIndicator = {false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F9FF",
    paddingTop: 36,
    paddingStart: 14,
    paddingEnd: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
  form: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ececec",
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "90%",
    height: 54,
    maxWidth: "90%",
  },
});
