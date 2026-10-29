import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CATEGORIES } from '../lib/constants';
import { s } from '../lib/strings';
import { colors, radius, space, type } from '../lib/theme';

const IconButton = ({ name, onPress }) => (
  <Pressable onPress={onPress} hitSlop={8} style={styles.iconBtn}>
    <Ionicons name={name} size={22} color={colors.emerald} />
  </Pressable>
);

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: space.lg }}>
        <View style={styles.top}>
          <Text style={type.display}>{s.appName}</Text>
          <View style={{ flexDirection: 'row', gap: space.sm }}>
            {/* TODO: show only for admin / moderator */}
            <IconButton name="shield-checkmark-outline" onPress={() => navigation.navigate('AdminNaats')} />
            <IconButton name="person-outline" onPress={() => navigation.navigate('Login')} />
          </View>
        </View>

        <Pressable onPress={() => navigation.navigate('Search')} style={styles.search}>
          <Ionicons name="search" size={20} color={colors.muted} />
          <Text style={[type.body, { color: colors.muted }]}>{s.searchPlaceholder}</Text>
        </Pressable>

        <Text style={[type.title, { marginVertical: space.lg }]}>{s.categories}</Text>
        <View style={styles.grid}>
          {CATEGORIES.map((c) => (
            <Pressable
              key={c.id}
              style={({ pressed }) => [styles.tile, pressed && { backgroundColor: colors.emeraldSoft }]}
              onPress={() => navigation.navigate('Category', { id: c.id, label: c.label })}
            >
              <Text style={[type.title, { color: colors.emerald }]}>{c.label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: space.lg },
  iconBtn: { width: 40, height: 40, borderRadius: radius.pill, backgroundColor: colors.emeraldSoft, alignItems: 'center', justifyContent: 'center' },
  search: {
    flexDirection: 'row', alignItems: 'center', gap: space.sm, backgroundColor: colors.surface, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.line, paddingHorizontal: space.lg, minHeight: 48,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.md },
  tile: {
    width: '48%',
    minHeight: 84, 
    backgroundColor: colors.surface, 
    borderRadius: radius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.brass, 
    padding: space.lg, 
    justifyContent: 'center',
  },
});
