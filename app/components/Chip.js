import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, space } from '../lib/common/theme';

export default function Chip({ label, active, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.active]}>
      <Text style={{ color: active ? colors.white : colors.ink, fontSize: 14 }}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, borderRadius: radius.pill,
    paddingHorizontal: space.lg, paddingVertical: space.sm, marginRight: space.sm, marginBottom: space.sm,
  },
  active: { backgroundColor: colors.emerald, borderColor: colors.emerald },
});
