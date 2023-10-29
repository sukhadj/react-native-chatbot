import axios from 'axios';

export const apiCall = async (text) => {
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const apiKey = ''; // Replace with your OpenAI API key

  const requestData = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: text,
      },
    ],
  };

  try {
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const firstResponse = response.data.choices[0].message.content;
    console.log(firstResponse);
    return firstResponse;
  } catch (error) {
    console.error('API call error:', error);
    return "Error";
  }
};

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  

export const dummyapiCall = async (text) => {
    try {
        await sleep(5000)
        return "This is a dummy call";
    } catch (error) {
      console.error('API call error:', error);
      return "Error";
    }
  };
  
  