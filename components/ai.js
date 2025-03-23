import Vapi from "@vapi-ai/web";

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);

const assistantId = process.env.NEXT_PUBLIC_ASSISTANT_ID;
console.log(assistantId);

let activeAssistant = null;

export const startAssistant = async () => {
  if (activeAssistant) {
    return activeAssistant; // Return existing instance if already started
  }
  
  const assistantOverrides = {
    variableValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  };
  
  activeAssistant = await vapi.start(assistantId, assistantOverrides);
  return activeAssistant;
};

export const stopAssistant = async () => {
  if (activeAssistant) {
    await vapi.stop();
    activeAssistant = null;
  }
};

