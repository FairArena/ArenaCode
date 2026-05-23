import { useCallback } from "react";
import { useDialog } from "../../providers/dialog";
import { DialogSearchList } from "../dialog-search-list";

type PermissionDialogProps = {
  toolName: string;
  input: string;
  onDecision: (allowed: boolean) => void;
};

export const PermissionDialogContent = ({
  toolName,
  input,
  onDecision,
}: PermissionDialogProps) => {
  const dialog = useDialog();

  const handleSelect = useCallback(
    (decision: "Allow" | "Deny") => {
      onDecision(decision === "Allow");
      dialog.close();
    },
    [dialog, onDecision]
  );

  return (
    <box flexDirection="column" gap={1}>
      <box flexDirection="column" gap={0.5} paddingBottom={1}>
        <text>The agent wants to execute a local tool:</text>
        <text fg="yellow">{toolName}</text>
        <box borderStyle="single" padding={1} width="100%" height="auto">
          <text wrap>{input}</text>
        </box>
      </box>
      <DialogSearchList
        items={["Allow", "Deny"] as const}
        onSelect={handleSelect}
        filterFn={(item, query) => item.toLowerCase().includes(query.toLowerCase())}
        renderItem={(item, isSelected) => (
          <text fg={isSelected ? "black" : item === "Allow" ? "green" : "red"}>
            {item === "Allow" ? "✓ Allow" : "✗ Deny"}
          </text>
        )}
        getKey={(item) => item}
        placeholder="Select action"
      />
    </box>
  );
};
