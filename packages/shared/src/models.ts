export type ModelPricing = {
  inputUsdPerMillionTokens: number;
  outputUsdPerMillionTokens: number;
};

export type SupportedProvider = "anthropic" | "openai" | "openrouter";

export type SupportedChatModel = {
  id: string;
  provider: SupportedProvider;
  pricing: ModelPricing;
};
export type SupportedChatModelId = SupportedChatModel["id"];

export const DEFAULT_CHAT_MODEL_ID: SupportedChatModelId = "auto";
