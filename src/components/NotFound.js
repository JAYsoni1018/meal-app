import { View, Text, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function NotFound() {
    return (
        <View className='flex items-center justify-center '>
            <Image
                source={require('../../assets/Images/Nofood.png')}
                style={{ width: hp(40), height: hp(40), borderTopLeftRadius: 25, borderTopRightRadius: 25, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}
                resizeMode='cover'
            />
            <Text style={{ fontSize: hp(2.2) }} className='pt-3 font-bold text-slate-600'>Food Not Found</Text>
        </View>
    )
}