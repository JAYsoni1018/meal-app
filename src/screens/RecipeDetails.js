import { View, Text, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import Loading from '../components/Loading';

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


export default function RecipeDetails() {
  const route = useRoute();
  const { itemData } = route.params;


  const [isFavourate, setisFavourate] = useState(false)
  const [RecipeData, setRecipeData] = useState([])
  const [loading, setLoading] = useState(true)
  const [IngingredientData, setIngingredient] = useState([])
  const [QuentityData, setQuentity] = useState([])



  const randomTime = getRandomNumber(4, 60);
  const randomCal = getRandomNumber(10, 1000);
  const randomMen = getRandomNumber(2, 9);
  useEffect(() => {
    setRecipeData([])
    getRecipeData(itemData?.idMeal);
    RecipeIngredients({ RecipeData });
  }, [])

  const getRecipeData = async (id) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      // console.log(response?.data?.meals)
      if (response?.data) {
        setRecipeData(response?.data?.meals[0])
        setLoading(false)
      }
    } catch (error) {
      console.log("error is :", error.message)

    }
  }

  const RecipeIngredients = ({ RecipeData }) => {
    // Combine non-empty ingredient and measure pairs into an array of strings
    let Ingingredient = []
    let Quentity = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = RecipeData?.[`strIngredient${i}`];
      const measure = RecipeData?.[`strMeasure${i}`];

      if (ingredient && measure && typeof ingredient === 'string' && typeof measure === 'string') {
        const trimmedIngredient = ingredient.trim();
        const trimmedMeasure = measure.trim();
        if (trimmedIngredient !== '' && trimmedMeasure !== '') {
          Ingingredient.push(`${trimmedIngredient}`);
          Quentity.push(`${trimmedMeasure}`);
          console.log("Data is ", Ingingredient)
          console.log("qu is ", Quentity)
        }
        setIngingredient(Ingingredient)
        setQuentity(Quentity)
      }
    }
  }
  {
    console.log("qqqqq is ", IngingredientData)
    console.log("dddddd is ", QuentityData)
  }
  // { console.log("Data is ", ingredient) }
  return (


    <>
      <ScrollView className="flex bg-white" showVerticalScrollIndicator="false" contentContainerStyle={{ paddingBottom: 30 }} >
        <StatusBar style={"light"} />
        {/* food img */}
        <View className='flex justify-center items-center mt-[2px]'>
          <Image source={{ uri: RecipeData?.strMealThumb, alt: RecipeData?.strMeal }}
            style={{ width: wp(98), height: hp(50), borderTopLeftRadius: 25, borderTopRightRadius: 25, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }} />
        </View>

        {/* back btn */}
        <View className='absolute flex-row items-center justify-between w-full px-2 pt-14'>
          <TouchableOpacity style={{ width: hp(3.3), height: hp(3.3) }} className='flex items-center justify-center rounded-full bg-slate-100'>

            <Ionicons name="arrow-back-outline" size={hp(3.3)} color="black" />

          </TouchableOpacity>
          <TouchableOpacity style={{ width: hp(3.5), height: hp(3.5) }} className='flex items-center justify-center rounded-full bg-slate-100'
            onPress={() => setisFavourate(!isFavourate)}>
            {
              isFavourate ? (
                <Ionicons name="heart-sharp" size={hp(2.8)} color="red" />

              ) : (
                <Ionicons name="heart-outline" size={hp(2.8)} color="black" />


              )
            }

          </TouchableOpacity>
        </View>

        {/* meal description */}
        {
          loading ? (
            <Loading size="large" className='mt-20' />

          ) : (
            <View className='flex justify-between px-4 space-y-6 pt-9'>
              <View className='space-y-2 '>
                <Text style={{ fontSize: hp(3) }} className='font-bold text-neutral-500 '>{RecipeData?.strMeal}
                </Text>
                <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700 '>{RecipeData?.strArea}
                </Text>

              </View>

              <View className='flex-row justify-around'>
                <View className='p-2 rounded-full bg-amber-300'>
                  <View style={{ height: hp(6.5), width: hp(6.5) }} className='flex items-center justify-center p-1 bg-white rounded-full'>
                    <AntDesign name="clockcircleo" size={hp(3)} color="black" />
                  </View>
                  <View className='flex items-center py-2 '>
                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>{randomTime}</Text>
                    <Text style={{ fontSize: hp(1.2) }} className='font-semibold text-neutral-600'>Mins</Text>
                  </View>
                </View>


                <View className='p-2 rounded-full bg-amber-300'>
                  <View style={{ height: hp(6.5), width: hp(6.5) }} className='flex items-center justify-center p-1 bg-white rounded-full'>
                    <SimpleLineIcons name="fire" size={hp(3)} color="black" />
                  </View>
                  <View className='flex items-center py-2 '>
                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>{randomCal}K</Text>
                    <Text style={{ fontSize: hp(1.2) }} className='font-semibold text-neutral-600'>Cal</Text>
                  </View>
                </View>


                <View className='p-2 rounded-full bg-amber-300'>
                  <View style={{ height: hp(6.5), width: hp(6.5) }} className='flex items-center justify-center p-1 bg-white rounded-full'>
                    <Ionicons name="people-outline" size={hp(3)} color="black" />
                  </View>
                  <View className='flex items-center py-2 '>
                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>{randomMen}</Text>
                    <Text style={{ fontSize: hp(1.2) }} className='font-semibold text-neutral-600'>Servings</Text>
                  </View>
                </View>
              </View>

              {/* Ingredients */}

              <View className='space-y-5'>
                <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>Ingredient</Text>

                <View className='flex items-center space-y-2'>
                  {IngingredientData.map((pair, index) => (
                    <Text key={index} style={{ fontSize: hp(2.4) }} className='font-semibold text-neutral-600'>
                      {pair}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          )
        }

      </ScrollView>
    </>
  )
}