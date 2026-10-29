import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import { space } from '../lib/theme';

// Keyboard-safe scrolling wrapper for any form screen.
export default function FormScreen({ children , error }) {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ padding: space.xl }} keyboardShouldPersistTaps="handled">
        {!!error && <Text style={{ color: 'red', fontSize: 15 }} >{error}</Text>}
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
