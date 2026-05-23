import { Outlet } from "react-router";
import { ToastProvider } from "../providers/toast";
import { DialogProvider } from "../providers/dialog";
import { KeyboardLayerProvider } from "../providers/keyboard-layer";
import { ThemeProvider } from "../providers/theme";
import { ThemedRoot } from "./themed-root";
import { PromptConfigProvider } from "../providers/prompt-config";
import { AuthProvider } from "../providers/auth";

export function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
          <KeyboardLayerProvider>
            <DialogProvider>
              <PromptConfigProvider>
                <ThemedRoot>
                  <Outlet />
                </ThemedRoot>
              </PromptConfigProvider>
            </DialogProvider>
          </KeyboardLayerProvider>
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
