import { View, Text, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import Loading from '../components/Loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


export default function RecipeDetails() {
  const route = useRoute();
  const { itemData } = route.params;
  const navigation = useNavigation();

  const [isFavourate, setisFavourate] = useState(false)
  const [RecipeData, setRecipeData] = useState([])
  const [loading, setLoading] = useState(true)
  const [IngingredientData, setIngingredient] = useState([])
  const [QuentityData, setQuentity] = useState([])
  const [readMore, setreadMore] = useState(false)
  const [text, settext] = useState(null)

  const randomTime = getRandomNumber(4, 60);
  const randomCal = getRandomNumber(10, 1000);
  const randomMen = getRandomNumber(2, 9);
  useEffect(() => {
    setRecipeData([])
    getRecipeData(itemData?.idMeal);
  }, [])

  const getRecipeData = async (id) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      // console.log(response?.data?.meals)
      if (response?.data) {
        setRecipeData(response?.data?.meals[0])
        settext(response?.data?.meals[0]?.strInstructions.slice(0, 100))

        setLoading(false)
      }
    } catch (error) {
      console.log("error is :", error.message)

    }
  }
  const handelBack = () => {
    navigation.goBack();
    // navigation.navigate('Home')
  }
  const getYoutubeId = url => {
    if (url) { // Check if url is not null or undefined
      const regex = /[?&]v=([^&]+)/;
      const match = url.match(regex);
      if (match && match[1]) {
        // { console.log("id is ", match[1]) }
        return match[1];
      }
    }
    return null;
  }
  const RecipeIngredients = (RecipeData) => {

    if (!RecipeData) return [];
    let indexes = [];
    for (let i = 0; i <= 20; i++) {
      if (RecipeData[`strIngredient${i}`]) {
        indexes.push(i)
        // console.log("indexs  is ", indexes)
      }
    }
    return indexes;
  }

  {
    // console.log("dddddd is ", QuentityData)
  }
  // { console.log("yt is ", RecipeData?.strYoutube) }
  return (


    <>
      <ScrollView className="flex bg-white" showVerticalScrollIndicator="false" contentContainerStyle={{ paddingBottom: 30 }} >
        <StatusBar style={"light"} />
        {/* food img */}
        <View className='flex items-center '>
          <Image source={{ uri: RecipeData?.strMealThumb, alt: RecipeData?.strMeal }}
            style={{ width: wp(98), height: hp(50), borderTopLeftRadius: 25, borderTopRightRadius: 25, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}
            // sharedTransitionTag={RecipeData.strMeal}
          />
        </View>

        {/* back btn */}
        <Animated.View entering={FadeIn.delay(600).duration(1000)} className='absolute flex-row items-center justify-between w-full px-2 pt-14'>
          <TouchableOpacity onPress={handelBack} style={{ width: hp(4.5), height: hp(4.5) }} className='flex items-center justify-center rounded-full bg-slate-400'>

            <Ionicons name="arrow-back-outline" size={hp(3.3)} color="#FCD34D" />

          </TouchableOpacity>
          <TouchableOpacity style={{ width: hp(4.5), height: hp(4.5) }} className='flex items-center justify-center rounded-full bg-slate-400'
            onPress={() => setisFavourate(!isFavourate)}>
            {
              isFavourate ? (
                <Ionicons name="heart-sharp" size={hp(2.8)} color="#FCD34D" />

              ) : (
                  <Ionicons name="heart-outline" size={hp(2.8)} color="#FCD34D" />


              )
            }

          </TouchableOpacity>
        </Animated.View>

        {/* meal description */}
        {
          loading ? (
            <Loading size="large" className='mt-20' />

          ) : (
            <View className='flex justify-between px-4 space-y-6 pt-9'>
                <Animated.View entering={FadeInDown.duration(600).springify().damping(12)} className='space-y-2 '>
                <Text style={{ fontSize: hp(3) }} className='font-bold text-neutral-500 '>{RecipeData?.strMeal}
                </Text>
                  {/* <Text style={{ fontSize: hp(3) }} className='font-bold text-neutral-500 '>{RecipeData?.idMeal}
                  </Text> */}
                <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700 '>{RecipeData?.strArea}
                </Text>

                </Animated.View>
                {/* 3 designs time, cal, servings */}
                <Animated.View entering={FadeInDown.springify().damping(12).delay(200)} className='flex-row justify-around'>
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
                </Animated.View>

              {/* Ingredients */}

                <Animated.View entering={FadeInDown.springify().damping(12).delay(400)} className='space-y-5'>
                  <Text style={{ fontSize: hp(2) }} className='flex-1 font-bold text-neutral-700'>Ingredient</Text>

                  <View className='ml-3 space-y-4 '>
                    {

                      RecipeIngredients(RecipeData).map((i, index) => {

                        return (

                          <>
                            <View style={{ width: hp(10) }} className='flex-row items-center justify-start space-x-4 '>
                              <View style={{ width: hp(1.5), height: hp(1.5), marginTop: hp(0.5) }} className='rounded-full bg-amber-300' />
                              <View key={index} className='flex-row space-x-2 '>
                                <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-600'>
                                  {RecipeData[`strIngredient${i}`]}
                                </Text>
                                <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-600'>
                                  ------
                                </Text>
                                <Text style={{ fontSize: hp(1.8) }} className='font-bold '>
                                  {RecipeData[`strMeasure${i}`]}
                                </Text>
                              </View>
                            </View>
                          </>
                        )
                      })
                    }
                  </View>
                </Animated.View>

                {/* instructions */}
                <Animated.View entering={FadeInDown.springify().damping(12).delay(600)} className='space-y-5'>
                  <Text style={{ fontSize: hp(2) }} className='flex-1 font-bold text-neutral-700'>Instructions</Text>

                  <View className='flex space-x-2'>
                    <Text style={{ fontSize: hp(1.9), flex: 1 }} className='text-neutral-700'>
                      {text}
                      {!readMore && ' ... '}
                    </Text>
                    <Text
                      style={{ fontSize: hp(1.5) }}
                      className='font-bold text-neutral-900'
                      onPress={() => {
                        if (!readMore) {
                          settext(RecipeData?.strInstructions)
                          setreadMore(true)
                        } else {
                          settext(RecipeData?.strInstructions.slice(0, 100))
                          setreadMore(false)
                        }
                      }}
                    >
                      {readMore ? 'Show Less' : 'Read More'}
                    </Text>
                  </View>
                </Animated.View>
                {/* youtuve video frame */}
                {/* <View className='space-y-5'>
                  <Text style={{ fontSize: hp(2) }} className='flex-1 font-bold text-neutral-700'>Recipe Video</Text>
                  {RecipeData?.strYoutube ? (
                    <View>
                      <YoutubeIframe videoId={getYoutubeId(RecipeData?.strYoutube)} height={hp(35)} />
                    </View>
                  ) : null}
                </View> */}
            </View>
          )
        }

      </ScrollView>
    </>
  )
}