import React, { Component, useEffect, useState } from 'react'
import { Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Categories from '../components/Categories';
import axios from 'axios';
import Recipes from '../components/Recipes';
import NotFound from '../components/NotFound';

export default function HomeScreen() {
    const [loader, setLoader] = useState(false)
    useEffect(() => {

        getcategory();
        getrecipe(activeCategory);
    }, [])


    const [searchTerm, setsearchTerm] = useState("");
    const [activeCategory, setactiveCategory] = useState("Beef")
    const [categoryData, setcategoryData] = useState([])
    const [Meals, setMeals] = useState([])
    const [SearchMeals, setSearchMeals] = useState([])
    const [searchString, setsearchString] = useState("");

    const handelText = (text) => {
        setsearchString(text)
        setsearchTerm(text)
        getSearchrecipe(searchTerm)
    }
    const handelChangeCategory = (category) => {
        // console.log("handelchange category....", category)

        getrecipe(category)
        setactiveCategory(category)
        setMeals([])
        setSearchMeals([])
        setsearchString("")
        setsearchTerm("")
    }

    const handelClearText = () => {
        getrecipe(activeCategory)
        setMeals([])
        setSearchMeals([])
        setsearchString("")
        setsearchTerm("")
    }
    const getcategory = async () => {
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
            // console.log(response?.data?.categories)
            if (response?.data) {
                setcategoryData(response?.data?.categories.slice(0, 13))
            }
        } catch (error) {
            console.log("error is :", error.message)

        }
    }
    const getrecipe = async (category) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            // console.log(response?.data?.meals[0]?.strMeal)
            if (response?.data) {
                setMeals(response?.data?.meals)
            }
        } catch (error) {
            console.log("error is :", error.message)

        }
    }
    const getSearchrecipe = async (s) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${s}`);
            // console.log("setSearchMeals ", response?.data?.meals.length)
            if (response?.data) {
                setSearchMeals(response?.data?.meals || [])
            }
        } catch (error) {
            console.log("error is :", error.message)

        }
    }
    // console.log("active category....", activeCategory)


    return (
        <View className="flex-1 bg-slate-200 ">
            <StatusBar style="dark" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }} className='space-y-4' style={{ paddingTop: hp(4.5) }}>

                {/* avatar */}
                <View className='flex-row justify-between mx-4'>
                    <Image source={require('../../assets/Images/avatar.png')}
                        resizeMethod='resize'
                        style={{ width: hp(5.5), height: hp(5) }} />
                    <TouchableOpacity className='p-1 rounded-full'>

                        <Feather name="bell" size={hp(4)} color="black" />
                    </TouchableOpacity>
                </View>
                {/* heading */}
                <View className='mx-3 mt-3 '>
                    <Text style={{ fontSize: hp(1.6) }} className='mb-4 font-semibold'>Hello, Jay</Text>
                    <View>

                        <Text style={{ fontSize: hp(3) }} className='font-semibold '>Make your own food,</Text>
                    </View>
                    <View>

                        <Text style={{ fontSize: hp(3) }} className='font-semibold'>stay at <Text className='font-bold text-amber-400'>Home</Text></Text>
                    </View>

                </View>

                {/* search bar */}
                <View className='flex-row items-center justify-between ' style={{ paddingHorizontal: hp(2), paddingVertical: hp(3) }}>

                    <View className='flex-row items-center w-full bg-white rounded-xl' style={{ paddingHorizontal: hp(2), paddingVertical: hp(1) }}>
                        <TouchableOpacity>
                            <MaterialIcons name="search" size={hp(2.9)} color="black" />
                        </TouchableOpacity>
                        <TextInput
                            placeholder='Search Food'
                            style={{ fontSize: hp(1.7), paddingHorizontal: hp(1.9), width: '100%' }}
                            className=' text-base font-semibold text-[#555]'
                            value={searchTerm}

                            onChangeText={handelText}

                        />
                        {
                            searchString.length > 0 ? (
                                <TouchableOpacity onPress={handelClearText} className='ml-auto'>
                                    <MaterialIcons name="cancel" size={hp(2.9)} color="black" />

                                </TouchableOpacity>
                            ) : ""
                        }

                    </View>
                </View>

                {/* categories */}
                <View className=''>
                    {

                        categoryData.length > 0 ? (
                            <Categories category={categoryData} activeCategory={(searchString.length > 0) ? "" : activeCategory} handelChangeCategory={handelChangeCategory} />
                        ) : ""

                    }

                </View>


                {/* recipes */}
                <View className=''>
                    {
                        (searchString.length > 0 && !SearchMeals.length > 0) ? (

                            <NotFound />

                        ) : (

                            <Recipes categories={categoryData} recipeData={searchString.length == 0 ? Meals : SearchMeals} />


                        )
                    }
                </View>

            </ScrollView>
        </View>
    )
}
