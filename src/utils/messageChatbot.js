import json from '../data/chatbotMessage';

const initialOptions = json[0].messages.map((message) => message.msg);
const jsonMessage = (optionSelected) => {
  const newOptionId = (json[0].messages.filter((message) => message.msg === optionSelected))[0].trigger;
  const jsonById = json.filter((json) => json.id === newOptionId)[0];
  console.log(jsonById.end);
  if (jsonById.end) {
    console.log(jsonById.end);
    return jsonById.messages;
  }
  return jsonById.messages.map((message) => message.msg);
};

export {
  initialOptions,
  jsonMessage,
};
