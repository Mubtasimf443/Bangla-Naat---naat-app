import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { space } from '../lib/theme';

// Keyboard-safe scrolling wrapper for any form screen.
export default function FormScreen({ children }) {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ padding: space.xl }} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
