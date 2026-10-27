import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, space, type } from '../lib/theme';

export default function Field({ label, error, multiline, ...props }) {
  return (
    <View style={{ marginBottom: space.lg }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.muted}
        multiline={multiline}
        {...props}
        style={[styles.input, multiline && styles.multiline, !!error && { borderColor: colors.danger }]}
      />
      {!!error && <Text style={[type.small, { color: colors.danger, marginTop: space.xs }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { ...type.small, color: colors.ink, fontWeight: '600', marginBottom: space.xs },
  input: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: radius.md,
    paddingHorizontal: space.lg, paddingVertical: space.md, fontSize: 16, color: colors.ink, minHeight: 48,
  },
  multiline: { minHeight: 160, textAlignVertical: 'top' },
});
