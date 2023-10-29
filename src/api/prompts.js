import { apiCall, dummyapiCall } from 'openai';

import prompt_json from "../../assets/prompts/prompts.json"

export const begin = async () => {

    begin_prompt = prompt_json.prompts.begin.text;
    chatgptResponse = await apiCall(begin_prompt);

    return chatgptResponse;
};

export const askCharacter = () => {
    return "Let's start with building your character? What would be your name? And what would be your powers?";
};




