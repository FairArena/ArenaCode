import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { Mode, DEFAULT_CHAT_MODEL_ID, type ModeType, type SupportedChatModel } from "@arenacode/shared";
import type { InferResponseType } from "hono/client";
import { apiClient } from "../../lib/api-client";

type ModelCatalogResponse = InferResponseType<(typeof apiClient.models)["$get"], 200>;

type PromptConfigContextValue = {
  mode: ModeType;
  toggleMode: () => void;
  setMode: (mode: ModeType) => void;
  model: string;
  setModel: (model: string) => void;
  availableModels: SupportedChatModel[];
};

const PromptConfigContext = createContext<PromptConfigContextValue | null>(null);

export function usePromptConfig(): PromptConfigContextValue {
  const value = useContext(PromptConfigContext);
  if (!value) {
    throw new Error("usePromptConfig must be used within a PromptConfigProvider");
  }
  return value;
};

type PromptConfigProviderProps = {
  children: ReactNode;
};

export function PromptConfigProvider({ children }: PromptConfigProviderProps) {
  const [mode, setMode] = useState<ModeType>(Mode.BUILD);
  const [model, setModel] = useState(DEFAULT_CHAT_MODEL_ID);
  const [availableModels, setAvailableModels] = useState<SupportedChatModel[]>([]);

  useEffect(() => {
    let ignore = false;

    const loadModels = async () => {
      try {
        const response = await apiClient.models.$get();
        if (!response.ok) return;

        const data = (await response.json()) as ModelCatalogResponse;
        if (ignore) return;

        setAvailableModels(data.models);

        setModel((current) => {
          if (data.models.some((entry) => entry.id === current)) {
            return current;
          }

          return data.defaultModelId;
        });
      } catch {
        if (!ignore) {
          setAvailableModels([]);
        }
      }
    };

    void loadModels();

    return () => {
      ignore = true;
    };
  }, []);

  const toggleMode = useCallback(() => {
    setMode((m) => (m === Mode.BUILD ? Mode.PLAN : Mode.BUILD));
  }, []);

  return (
    <PromptConfigContext.Provider 
      value={{ 
        mode, 
        toggleMode, 
        setMode, 
        model, 
        setModel,
        availableModels,
    }}>
      {children}
    </PromptConfigContext.Provider>
  );
};
