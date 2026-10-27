import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Linking, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import { findNaat } from '../features/naats';
import { categoryLabel } from '../lib/constants';
import { s } from '../lib/strings';
import { colors, radius, space, type } from '../lib/theme';

const Action = ({ icon, label, active, onPress }) => (
  <Pressable onPress={onPress} style={[styles.action, active && { backgroundColor: colors.emeraldSoft }]}>
    <Ionicons name={icon} size={20} color={active ? colors.emerald : colors.muted} />
    <Text style={{ color: active ? colors.emerald : colors.muted, fontSize: 14 }}>{label}</Text>
  </Pressable>
);

export default function NaatDetailScreen({ route }) {
  const naat = findNaat(route.params.id);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  if (!naat) return <EmptyState text={s.emptyNaats} />;

  return (
    <ScrollView contentContainerStyle={{ padding: space.lg, paddingBottom: space.xl * 2 }}>
      <Text style={type.display}>{naat.title}</Text>
      <Text style={[type.small, { marginTop: space.xs }]}>{naat.author}  ·  {categoryLabel(naat.category)}</Text>

      <View style={styles.actions}>
        <Action icon={liked ? 'heart' : 'heart-outline'} label={String(naat.likes + (liked ? 1 : 0))} active={liked} onPress={() => setLiked(!liked)} />
        <Action icon={saved ? 'bookmark' : 'bookmark-outline'} label={s.favorites} active={saved} onPress={() => setSaved(!saved)} />
        <Action icon="share-outline" label={s.share} onPress={() => Share.share({ message: `${naat.title}\n\n${naat.content}` })} />
      </View>

      <Text style={styles.verse} selectable>{naat.content}</Text>
      {!!naat.youtubeUrl && <Button title={s.youtube} variant="ghost" onPress={() => Linking.openURL(naat.youtubeUrl)} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, marginVertical: space.lg },
  action: {
    flexDirection: 'row', alignItems: 'center', gap: space.xs, borderWidth: 1, borderColor: colors.line,
    borderRadius: radius.pill, paddingHorizontal: space.lg, minHeight: 40,
  },
  verse: {
    fontSize: 20, lineHeight: 36, color: colors.ink, marginBottom: space.xl, paddingLeft: space.lg,
    borderLeftWidth: 3, borderLeftColor: colors.brass,
  },
});
