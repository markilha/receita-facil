import { useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import { getFavorites } from "../../utils/storage";
import { useIsFocused } from "@react-navigation/native";
import {Foodlist} from '../../components/foodlist'

export function Favorites() {
  const [receipes, setReceipes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    let isActive = true;

    async function getReceipes() {
      const result = await getFavorites("@appreceitas");
      if (isActive) {
        setReceipes(result);
      }
    }
    if (isActive) {
      getReceipes();
    }
    return () => {
      isActive = false;
    };
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Receitas Favoritas</Text>
      {receipes.length === 0 && (
        <Text>Você ainda não tem nenhuma receita favorita</Text>
      )}

      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 14 }}
        data={receipes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item})=><Foodlist data={item}/>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f9ff",
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 14,
    marginTop: 20,
  },
  title: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 24,
  },
});
