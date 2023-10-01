import { Keyboard } from "react-native";

export function handleKeyboard({
   onShow,
   onHide,
}: {
   onShow: () => void;
   onHide: () => void;
}) {
   // Keyboard.addListener("keyboardWillShow", () => onShow());
   Keyboard.addListener("keyboardDidShow", () => onShow());
   // Keyboard.addListener("keyboardWillHide", () => onHide());
   Keyboard.addListener("keyboardDidHide", () => onHide());
}
