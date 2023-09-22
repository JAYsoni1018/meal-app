import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import { categoryData, mealData } from '../constants/index'
import { CachedImage } from '../helpers/image';
export default function Categories({ category, activeCategory, handelChangeCategory }) {
    return (
        <Animated.View entering={FadeInDown.duration(500)}>
            {/* {console.log(activeCategory)} */}

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
                {

                    category?.map((item, index) => {
                        // Check if the item's name contains "chicken" (case insensitive)
                        if (!item?.strCategory.toLowerCase().includes("chicken")) {
                            return (
                                <TouchableOpacity
                                    key={index + 1}
                                    onPress={() => handelChangeCategory(item?.strCategory)}
                                >
                                    <View
                                        className={`rounded-lg p-[6px] ${activeCategory == item?.strCategory ? "bg-yellow-100" : ""
                                            }`}
                                    >
                                        <Image
                                            source={{ uri: item?.strCategoryThumb, alt: item?.strCategory }}
                                            style={{ width: hp(6), height: hp(6) }}
                                            className="rounded-full"
                                        />
                                        {/* <CachedImage
                                            uri={item?.strCategoryThumb}
                                            style={{ width: hp(6), height: hp(6) }}
                                            className="rounded-full"
                                        /> */}
                                        <Text
                                            style={{ fontSize: hp(1.2) }}
                                            className="text-xs font-semibold text-center"
                                        >
                                            {item?.strCategory}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        } else {
                            return null; // Exclude items with the name "chicken"
                        }
                    })

                }
            </ScrollView>
        </Animated.View>
    )
}