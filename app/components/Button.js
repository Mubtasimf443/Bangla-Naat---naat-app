import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, space } from '../lib/theme';

export default function Button({ title, onPress, variant = 'primary', loading, small }) {
  const bg = variant === 'primary' ? colors.emerald : variant === 'danger' ? colors.danger : 'transparent';
  const fg = variant === 'ghost' ? colors.emerald : colors.white;
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.btn,
        small && styles.small,
        { backgroundColor: bg, opacity: pressed ? 0.85 : 1 },
        variant === 'ghost' && { borderWidth: 1, borderColor: colors.emerald },
      ]}
    >
      {loading ? <ActivityIndicator color={fg} /> : <Text style={[styles.text, { color: fg }]}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { minHeight: 48, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', paddingHorizontal: space.xl },
  small: { minHeight: 40, paddingHorizontal: space.lg },
  text: { fontSize: 16, fontWeight: '600' },
});
