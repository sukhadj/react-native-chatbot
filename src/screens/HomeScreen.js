import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { apiCall, dummyapiCall } from '../api/openai';
import { askCharacter } from '../api/prompts';

import * as Animatable from 'react-native-animatable';

import demo_prompt from '../../assets/prompts/demoPrompts.json'

const sleep1 = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};



export default function HomeScreen() {
  const [text, setText] = useState('');
  const [textArray, setTextArray] = useState([{}]);
  const [isStart, setIsStart] = useState(true);
  const [placeholderText, setPlaceHolder] = useState("Say Hi or Start");

  // demo stuff
  const [isDemo, setIsDemo] = useState(false);
  const [demoi, setDemoi] = useState(0);
  const prompts_size = 5;

  const handleSubmit = async () => {

    if (text.length > 0) {
      try {
        
        setTextArray((currArray) => [...currArray, {'role':"user", 'content':text}]);
        setText('');
        
        if(isStart)
        {
            setIsStart(false);
            setPlaceHolder("Type here...");

            // check if demo
            if(text.trim().toLowerCase()=="demo")
            {
              setIsDemo(true);
              await sleep1(1000);
              setTextArray((currArray) => [...currArray, {'role':"assistant", 'content':"Welcome to the demo!"}]);
              return;
            }
            
            const beginText = await apiCall("Play Dungeons and Dragons with me over multiple exchange of conversations. Here are rules for you - You be the Dungeon Master. Talk to me as a Dungeon master only. Wait for me to give you more information. Limit your response to 200 words.");
            setTextArray((currArray) => [...currArray, {'role':"assistant", 'content':beginText}]);
            // const askCharacterText =  askCharacter();
            // setTextArray((currArray) => [...currArray, {'role':"assistant", 'content':askCharacterText}]);
            
            return;
        }

        if(isDemo)
        {
          // logic to get predefined demo
        
          await sleep1(1000);
          setTextArray((currArray) => [...currArray, {'role':"assistant", 'content':demo_prompt.prompts[demoi.toString()].output}]);
          setDemoi((demoi+1)%prompts_size);
          
        }
        else
        {
          const chatgptResponse = await apiCall(text);
          setTextArray((currArray) => [...currArray, {'role':"assistant", 'content':chatgptResponse}]);
          //const chatgptResponse = await apiCall(text);
        }
        
        
      } catch (error) {
        console.error('Error in API call:', error);
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8eedf' }}>
      <View style={{ marginTop: hp('5%') }}>
        <Text style={{ fontSize: wp('6%'), color: 'gray', fontWeight: 'bold' }}>Your Story Starts Here...</Text>
      </View>
  
  <ScrollView
    style={{
      flex: 1,
      width: wp('90%'),
      maxHeight: hp('70%'),
      marginTop: hp('2%'),
      marginBottom: hp('2%'),
    }}
  >
{textArray.map((message, index) => {
  if (message.role === 'assistant') {
    // ChatGPT response with pop-out animation
    return (
      <Animatable.View
        key={index}
        animation="bounceIn" // You can use any animation effect from the library, 'bounceIn' for a pop-out effect
        duration={500} // Adjust the duration as needed
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginBottom: hp('1%'),
        }}
      >
        <View
          style={{
            width: wp(70),
            backgroundColor: '#e28651',
            padding: wp('2%'),
            borderRadius: wp('2%'),
            borderTopLeftRadius: 0,
          }}
        >
          <Text style={{ fontSize: wp(4), color: '#ffffff' }}>{message.content}</Text>
        </View>
      </Animatable.View>
    );
  } else if (message.role === 'user') {
    // User input text with pop-out animation
    return (
      <Animatable.View
        key={index}
        animation="bounceIn" // You can use any animation effect from the library, 'bounceIn' for a pop-out effect
        duration={500} // Adjust the duration as needed
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: hp('1%'),
        }}
      >
        <View
          style={{
            width: wp(70),
            backgroundColor: '#ffffff',
            padding: wp('2%'),
            borderRadius: wp('2%'),
            borderTopRightRadius: 0,
          }}
        >
          <Text style={{ fontSize: wp(4), color: '#000000' }}>{message.content}</Text>
        </View>
      </Animatable.View>
    );
  }
})}


  </ScrollView>
          <TextInput
            style={{
              width: wp('90%'),
              height: hp('10%'), 
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: wp('2%'),
              paddingHorizontal: wp('2%'),
              fontSize: wp('4%'),
            }}
            placeholder= {placeholderText}
            onChangeText={(newText) => setText(newText)}
            multiline={true}
            numberOfLines={4}
            value={text}
          />
  
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={{
              backgroundColor: '#e28651',
              marginTop: hp('2%'),
              width: wp('80%'),
              paddingVertical: hp('2%'),
              paddingHorizontal: wp('10%'),
              borderRadius: wp('5%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: wp('4%'), fontWeight: 'bold', color: 'white' }}>Send</Text>
          </TouchableOpacity>
    </SafeAreaView>
  );
  
  }