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
