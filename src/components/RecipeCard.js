import React, { Component, useEffect, useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown, LightSpeedInLeft, LightSpeedInRight, LightSpeedOutLeft, LightSpeedOutRight } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';


export default function RecipeCard({ item, index }) {
    let isEven = index % 2 == 0;
    const navigation = useNavigation();

    const handleNavigation = () => {
        navigation.navigate('RecipesData', { itemData: item });
    };
    return (
        <Animated.View entering={isEven ? LightSpeedInLeft.duration(500) : LightSpeedInRight.duration(500)}>
            <Pressable style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }} className="flex justify-center"
                onPress={handleNavigation}>

                <View style={{ marginTop: hp(2.2) }}  >
                    <Animated.Image source={{ uri: item?.strMealThumb, alt: item?.strMeal }}
                        resizeMode='cover'
                        style={{ width: '100%', height: isEven ? hp(26) : hp(29), borderRadius: 36 }}
                        className="bg-black/5 "
                        sharedTransitionTag={item?.strMeal}
                    />
                    {/* <CachedImage uri={item?.strMealThumb}
                        resizeMode='cover'
                        style={{ width: '100%', height: isEven ? hp(26) : hp(29), borderRadius: 36 }}
                        className="bg-black/5 " /> */}
                    <Text style={{ fontSize: hp(1.5) }} className='py-1 text-center'>{item?.strMeal.length > 15 ? item?.strMeal.slice(0, 20) + '...' : item?.strMeal}</Text>
                </View>
            </Pressable>
        </Animated.View>
    )
}