import { Ionicons } from '@expo/vector-icons';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { CONTACTS } from '../lib/constants';
import { s } from '../lib/strings';
import { colors, radius, space, type } from '../lib/theme';

export default function ContactScreen() {
  return (
    <View style={{ padding: space.lg }}>
      <Text style={[type.body, { color: colors.muted, marginBottom: space.lg }]}>{s.contactIntro}</Text>
      {CONTACTS.map((c) => (
        <Pressable key={c.name} onPress={() => Linking.openURL(`tel:${c.phone}`)} style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={type.title}>{c.name}</Text>
            <Text style={type.small}>{c.phone}</Text>
          </View>
          <View style={styles.icon}><Ionicons name="call" size={20} color={colors.white} /></View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colors.surface, 
    borderRadius: radius.md,
    borderLeftWidth: 4, 
    borderLeftColor: colors.brass, 
    padding: space.lg,
    marginBottom: space.md,
  },
  icon: { 
    width: 44, 
    height: 44, 
    borderRadius: radius.pill, 
    backgroundColor: colors.emerald, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
});
