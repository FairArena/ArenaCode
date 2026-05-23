import { createOpenAI } from "@ai-sdk/openai";
import {
  DEFAULT_CHAT_MODEL_ID,
  type ModelPricing,
  type SupportedChatModel,
  type SupportedChatModelId,
  type SupportedProvider,
} from "@arenacode/shared";
import type { LanguageModel } from "ai";

type ProviderOptions = Record<string, unknown>;

type CatalogChatModel = SupportedChatModel & {
  routeModel: string;
};

export const SUPPORTED_CHAT_MODELS = [
  {
    id: "auto",
    provider: "openrouter",
    routeModel: "openrouter/free",
    pricing: {
      inputUsdPerMillionTokens: 2.0,
      outputUsdPerMillionTokens: 10.0,
    },
  },
  {
    id: "qwen3-coder",
    provider: "openrouter",
    routeModel: "qwen/qwen3-coder:free",
    pricing: {
      inputUsdPerMillionTokens: 1.5,
      outputUsdPerMillionTokens: 7.5,
    },
  },
  {
    id: "llama-3.3-70b",
    provider: "openrouter",
    routeModel: "meta-llama/llama-3.3-70b-instruct:free",
    pricing: {
      inputUsdPerMillionTokens: 1.5,
      outputUsdPerMillionTokens: 7.5,
    },
  },
  {
    id: "gpt-oss-20b",
    provider: "openrouter",
    routeModel: "openai/gpt-oss-20b:free",
    pricing: {
      inputUsdPerMillionTokens: 1.25,
      outputUsdPerMillionTokens: 6.25,
    },
  },
  {
    id: "nemotron-3-super",
    provider: "openrouter",
    routeModel: "nvidia/nemotron-3-super-120b-a12b:free",
    pricing: {
      inputUsdPerMillionTokens: 1.0,
      outputUsdPerMillionTokens: 5.0,
    },
  },
] as const satisfies readonly CatalogChatModel[];

export type ResolvedModel = {
  model: LanguageModel;
  provider: SupportedProvider;
  modelId: SupportedChatModelId;
  providerOptions?: ProviderOptions;
};

// Create a custom OpenAI instance pointing to OpenRouter
const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
});

export function isSupportedChatModel(modelId: string): modelId is SupportedChatModelId {
  return SUPPORTED_CHAT_MODELS.find((model) => model.id === modelId) != null;
}

export function findSupportedChatModel(modelId: string) {
  return SUPPORTED_CHAT_MODELS.find((model) => model.id === modelId);
}

export function getSupportedChatModels() {
  return SUPPORTED_CHAT_MODELS;
}

export function resolveChatModel(modelId: string): ResolvedModel {
  const model = findSupportedChatModel(modelId);
  if (!model) {
    throw new Error(`Unsupported model: ${modelId}`);
  }

  // Route the request to the OpenRouter model attached to this catalog entry.
  return {
    model: openrouter(model.routeModel),
    provider: model.provider,
    modelId: model.id,
  };
}

export { DEFAULT_CHAT_MODEL_ID };
