import { StyleSheet, Text, View } from 'react-native';
import { s } from '../lib/strings';
import { colors, space, type } from '../lib/theme';
import Button from './Button';

export default function Pager({ page, totalPages, onChange }) {
  return (
    <View style={styles.row}>
      <Button small variant="ghost" title={s.prev} onPress={() => onChange(page - 1)} />
      <Text style={[type.small, { color: colors.ink }]}>{page} / {totalPages}</Text>
      <Button small variant="ghost" title={s.next} onPress={() => onChange(page + 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: space.lg },
});
