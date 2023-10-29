import React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function WelcomeScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-around', backgroundColor: 'white' }}>
            {/* title */}
            <View style={{ marginBottom: hp('2%') }}>
                <Text style={{ fontSize: wp('10%'), textAlign: 'center', fontWeight: 'bold', color: 'gray' }}>
                    Jarvis
                </Text>
                <Text style={{ fontSize: wp('4%'), textAlign: 'center', fontWeight: '600', color: 'gray' }}>
                    The future is here, powered by AI.
                </Text>
            </View>

            {/* assistant image */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Image
                    source={require('../../assets/images/welcome.png')}
                    style={{ height: wp('75%'), width: wp('75%') }}
                />
            </View>

            {/* start button */}
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ backgroundColor: 'green', margin: wp('5%'), padding: wp('4%'), borderRadius: wp('5%') }}>
                <Text style={{ fontSize: wp('6%'), textAlign: 'center', fontWeight: 'bold', color: 'white' }}>
                    Get Started
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
