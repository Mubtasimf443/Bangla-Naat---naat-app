import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { categoryLabel } from '../lib/common/constants';
import { colors, radius, space, type } from '../lib/common/theme';

function NaatCard({ naat, onPress }) {
  return (
    <Pressable
      onPress={() => onPress?.(naat)}
      style={({ pressed }) => [styles.card, pressed && { backgroundColor: colors.emeraldSoft }]}
    >
      <Text style={type.title} numberOfLines={1}>{naat.title}</Text>
      <Text style={[type.body, { color: colors.muted }]} numberOfLines={2}>{naat.content}</Text>
      <View style={styles.row}>
        <Text style={[type.small, { flex: 1 }]} numberOfLines={1}>{naat.author}  ·  {categoryLabel(naat.category)}</Text>
        <View style={styles.likes}>
          <Ionicons name="heart" size={14} color={colors.brass} />
          <Text style={type.small}>{naat.likes}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default memo(NaatCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface, borderRadius: radius.md, borderLeftWidth: 4, borderLeftColor: colors.brass,
    padding: space.lg, marginHorizontal: space.lg, marginBottom: space.md,
  },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: space.sm },
  likes: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
