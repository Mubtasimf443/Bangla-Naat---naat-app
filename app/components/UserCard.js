import { StyleSheet, Text, View } from 'react-native';
import { s } from '../lib/strings';
import { colors, radius, space, type } from '../lib/theme';
import Button from './Button';

export default function UserCard({ user, onBan, onUnban, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={type.title}>{user.name}</Text>
      <Text style={type.small}>{user.email}</Text>
      <Text style={[type.small, { marginTop: 2 }]}>
        {user.role}{user.isBanned ? `  ·  ${s.banned}` : ''}{!user.isVerified ? `  ·  ${s.unverified}` : ''}
      </Text>
      <View style={styles.actions}>
        {user.isBanned
          ? <Button small variant="ghost" title={s.unban} onPress={onUnban} />
          : <Button small variant="ghost" title={s.ban} onPress={onBan} />}
        <Button small variant="danger" title={s.delete} onPress={onDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.md, padding: space.lg, marginBottom: space.sm },
  actions: { flexDirection: 'row', gap: space.sm, marginTop: space.md },
});
