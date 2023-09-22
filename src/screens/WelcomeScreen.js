import React, { Component, useEffect } from 'react'
import { Image, StatusBar, Text, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
export default function WelcomeScreen() {
    const ring2padding = useSharedValue(0);
    const ring1padding = useSharedValue(0);
    const navigation = useNavigation()
    useEffect(() => {
        ring2padding.value = 0;
        ring1padding.value = 0;
        setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(5)), 100)
        setTimeout(() => ring1padding.value = withSpring(ring1padding.value + hp(3.5)), 100)

        setTimeout(() => {
            navigation.navigate("Home")
        }, 2500);
    }, [])

    return (
        <View className="items-center justify-center flex-1 bg-amber-500">
            <StatusBar style="light" />
            <Animated.View className='rounded-full bg-white/20 ' style={{ padding: ring2padding }}>
                <Animated.View className='rounded-full bg-white/20 ' style={{ padding: ring1padding }}>
                    <Image source={require('../../assets/Images/welcome.png')}
                        resizeMode='contain'
                        style={{ width: hp(20), height: hp(20) }} />
                </Animated.View>
            </Animated.View >
            <View className='flex items-center space-y-4 ' style={{ marginTop: hp(5) }}>
                <Text className='font-bold text-white' style={{ fontSize: hp(6) }}>Foody</Text>
                <Text className='text-[#dcdddf]  font-semibold' style={{ fontSize: hp(2) }}>Food is always right!!</Text>
            </View>
        </View>
    )
}
