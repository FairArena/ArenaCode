import { useCallback } from "react";
import { useDialog } from "../../providers/dialog";
import { DialogSearchList } from "../dialog-search-list";
import type { SupportedChatModel } from "@arenacode/shared";

type ModelsDialogContentProps = {
  models: SupportedChatModel[];
  onSelectModel: (modelId: string) => void;
};

export const ModelsDialogContent = ({ 
  models, 
  onSelectModel 
}: ModelsDialogContentProps) => {
  const dialog = useDialog();

  const handleSelect = useCallback(
    (model: SupportedChatModel) => {
      onSelectModel(model.id);
      dialog.close();
    },
    [dialog, onSelectModel],
  );

  return (
    <DialogSearchList
      items={models}
      onSelect={handleSelect}
      filterFn={(model, query) => {
        const search = query.toLowerCase();
        return `${model.id} ${model.provider}`.toLowerCase().includes(search);
      }}
      renderItem={(model, isSelected) => (
        <text selectable={false} fg={isSelected ? "black" : "white"}>
          {model.id} · ${model.pricing.inputUsdPerMillionTokens}/M in, ${model.pricing.outputUsdPerMillionTokens}/M out
        </text>
      )}
      getKey={(model) => model.id}
      placeholder="Search models"
      emptyText="No matching models"
    />
  );
};
