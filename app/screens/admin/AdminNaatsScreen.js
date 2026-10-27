import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import Pager from '../../components/Pager';
import { allNaats } from '../../features/naats';
import { s } from '../../lib/strings';
import { colors, radius, space, type } from '../../lib/theme';

const PAGE_SIZE = 8;

const IconButton = ({ name, color = colors.emerald, onPress }) => (
  <Pressable onPress={onPress} hitSlop={6} style={styles.iconBtn}>
    <Ionicons name={name} size={22} color={color} />
  </Pressable>
);

export default function AdminNaatsScreen({ navigation }) {
  const naats = allNaats();
  const totalPages = Math.max(1, Math.ceil(naats.length / PAGE_SIZE));
  const [page, setPage] = useState(1);
  const rows = naats.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={rows}
        keyExtractor={(n) => n.id}
        contentContainerStyle={{ padding: space.lg }}
        ListHeaderComponent={
          <View style={{ flexDirection: 'row', gap: space.md, marginBottom: space.md }}>
            <View style={{ flex: 1 }}><Button small title={s.createNaat} onPress={() => navigation.navigate('AdminNaatForm')} /></View>
            {/* TODO: show only for admin */}
            <View style={{ flex: 1 }}><Button small variant="ghost" title={s.users} onPress={() => navigation.navigate('AdminUsers')} /></View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={type.title} numberOfLines={1}>{item.title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Ionicons name="heart" size={13} color={colors.brass} />
                <Text style={type.small}>{item.likes}  ·  {item.author}</Text>
              </View>
            </View>
            <IconButton name="create-outline" onPress={() => navigation.navigate('AdminNaatForm', { id: item.id })} />
            {/* TODO: delete naat */}
            <IconButton name="trash-outline" color={colors.danger} />
          </View>
        )}
      />
      <Pager page={page} totalPages={totalPages} onChange={(p) => setPage(Math.min(totalPages, Math.max(1, p)))} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: space.md, paddingLeft: space.lg, marginBottom: space.sm },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
});
