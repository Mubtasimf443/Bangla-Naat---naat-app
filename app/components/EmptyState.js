import { StyleSheet, Text, View } from 'react-native';
import { colors, space, type } from '../lib/theme';

export default function EmptyState({ text }) {
  return (
    <View style={styles.wrap}>
      <Text style={[type.body, { color: colors.muted, textAlign: 'center' }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.xl } });
