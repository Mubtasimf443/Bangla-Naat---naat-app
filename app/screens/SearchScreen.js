import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Chip from '../components/Chip';
import EmptyState from '../components/EmptyState';
import NaatList from '../components/NaatList';
import { searchNaats } from '../features/naats';
import { s } from '../lib/common/strings';
import { colors, radius, space } from '../lib/common/theme';

export default function SearchScreen({ navigation }) {
  const [text, setText] = useState('');
  const [field, setField] = useState('title');
  const q = text.trim();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: space.lg, paddingBottom: space.sm }}>
        <TextInput
          autoFocus
          value={text}
          onChangeText={setText}
          placeholder={s.searchPlaceholder}
          placeholderTextColor={colors.muted}
          returnKeyType="search"
          style={styles.input}
        />
        <View style={{ flexDirection: 'row', marginTop: space.md }}>
          <Chip label={s.byTitle} active={field === 'title'} onPress={() => setField('title')} />
          <Chip label={s.byText} active={field === 'content'} onPress={() => setField('content')} />
        </View>
      </View>
      {q.length < 2
        ? <EmptyState text={s.searchHint} />
        : <NaatList data={searchNaats(q, field)} onSelect={(n) => navigation.navigate('NaatDetail', { id: n.id })} />}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: radius.md,
    paddingHorizontal: space.lg, minHeight: 48, fontSize: 16, color: colors.ink,
  },
});
