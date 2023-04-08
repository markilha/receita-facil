import { useState,useEffect } from 'react';
import { View,StyleSheet,Text,FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import { Foodlist } from "../../components/foodlist";


export function Search() {
const route = useRoute()
const [receipes , setReceipes] = useState([])

useEffect(()=>{
  async function fetchApi(){
    const response = await axios.get(`https://markilha.github.io/db/db.json`)

    const filteredFoods = response.data.foods.filter(food => {
      return food.name.toLowerCase().includes(route.params?.name.toLowerCase())
    })
    setReceipes(filteredFoods)
  }
  fetchApi(); 

},[])

 return (
   <View style={styles.container}> 
    <FlatList
      data={receipes}
      keyExtractor={(item)=> String(item.id)}
      renderItem={({item})=><Foodlist data={item}/>}
      showsHorizontalScrollIndicator = {false}
      ListEmptyComponent={()=><Text style={styles.text}>Não encontramos o que você esta buscando...</Text>}
      />
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f3f9ff',
        paddingStart:14,
        paddingEnd:14,
        paddingTop:14,

    },
    text:{
      fontSize: 16
    }
})