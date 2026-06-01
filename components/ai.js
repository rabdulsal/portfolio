import Vapi from "@vapi-ai/web";

// Infinitely chainable no-op stub used when API key is absent
const makeStub = () => {
  const stub = { on: () => stub, start: async () => null, stop: async () => null };
  return stub;
};

const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
export const vapi = apiKey ? new Vapi(apiKey) : makeStub();

const assistantId = process.env.NEXT_PUBLIC_ASSISTANT_ID;
let activeAssistant = null;

export const startAssistant = async (firstName, lastName, email, phone) => {
  if (!apiKey) { console.warn("[vapi] API key not configured"); return null; }
  if (activeAssistant) return activeAssistant;
  const assistantOverrides = {
    variableValues: { firstName: "", lastName: "", email: "", phone: "" },
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
