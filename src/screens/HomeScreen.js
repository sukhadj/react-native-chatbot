import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function HomeScreen() {
  const [text, setText] = useState("");
  const [textArray, setTextArray] = useState([""])

  const handleSubmit = () => {
    if (text.length > 0)
    {
      setTextArray(currArray => [...currArray, text]);
      setText("");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>

      <View style={{ marginTop: hp('5%') }}>
        <Text style={{ fontSize: wp('6%'), color: 'gray', fontWeight: 'bold' }}>Here</Text>
      </View>
      
      <ScrollView
          style={{ width: wp('90%'), maxHeight: hp('30%'), marginTop: hp('2%'), borderWidth: 1, borderColor: 'gray', borderRadius: wp('2%') }}
        >
          {textArray.map((message, index) => (
            <Text key={index} style={{ padding: wp('2%') }}>{message}</Text>
          ))}
      </ScrollView>

      {/* Translate button and text box at the bottom */}
      <View style={{ width: '100%', alignItems: 'center' }}>
        <TextInput
          style={{
            width: wp('90%'),
            height: hp('8%'),
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: wp('2%'),
            paddingHorizontal: wp('2%'),
            fontSize: wp('4%'),
          }}

          placeholder="Type here..."
          onChangeText={newText => setText(newText)}
          multiline={true}
          numberOfLines={4}
          onContentSizeChange={(e) => {
            e.target.scrollHeight > hp('6%') && e.target.scrollHeight < hp('40%') && e.target.scrollHeight > hp('6%')
              ? e.target.scrollHeight
              : hp('6%')
          }}
          defaultValue={text}
        />

        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{
            backgroundColor: 'green',
            marginTop: hp('2%'),
            width: wp('80%'),
            paddingVertical: hp('2%'),
            paddingHorizontal: wp('10%'),
            borderRadius: wp('5%'),
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: wp('4%'), fontWeight: 'bold', color: 'white' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
