import React, { Component, useEffect, useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import MasonryList from '@react-native-seoul/masonry-list';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { mealData } from '../constants';
import Animated, { FadeInDown, LightSpeedInLeft, LightSpeedInRight, LightSpeedOutLeft, LightSpeedOutRight } from 'react-native-reanimated';
import Loading from './Loading';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';
import RecipeCard from './RecipeCard';


export default function Recipes({ categories, recipeData }) {
    const navigation = useNavigation();


    return (
        <View className="mx-4 space-y-6">
            <Text> Recipes </Text>

            <View>
                {
                    (categories.length == 0 || recipeData.length == 0) ? (
                        <Loading size="large" className='mt-20' />
                    ) : (

                        <MasonryList
                            data={recipeData}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
                        />
                    )
                }
            </View>
        </View>
    )
}

// const RecipeCard = ({ item, index, navigation }) => {

//     let isEven = index % 2 == 0;
//     return (

//         <Animated.View entering={isEven ? LightSpeedInLeft.duration(500) : LightSpeedInRight.duration(500)}>
//             <Pressable style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }} className="flex justify-center"
//                 onPress={() => navigation.navigate('RecipesData', { itemData: item })}>

//                 <View style={{ marginTop: hp(2.2) }}  >
//                     <Image source={{ uri: item?.strMealThumb, alt: item?.strMeal }}
//                         resizeMode='cover'
//                         style={{ width: '100%', height: isEven ? hp(26) : hp(29), borderRadius: 36 }}
//                         className="bg-black/5 "
//                         sharedTransitionTag={item.strMeal} />
//                     {/* <CachedImage uri={item?.strMealThumb}
//                         resizeMode='cover'
//                         style={{ width: '100%', height: isEven ? hp(26) : hp(29), borderRadius: 36 }}
//                         className="bg-black/5 " /> */}
//                     <Text style={{ fontSize: hp(1.5) }} className='py-1 text-center'>{item?.strMeal.length > 15 ? item?.strMeal.slice(0, 20) + '...' : item?.strMeal}</Text>
//                 </View>
//             </Pressable>
//         </Animated.View>
//     )
//     // isEven ? hp(26) : hp(30)
// }