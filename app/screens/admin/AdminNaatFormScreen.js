import { useState } from 'react';
import { Text, View } from 'react-native';
import Button from '../../components/Button';
import Chip from '../../components/Chip';
import Field from '../../components/Field';
import FormScreen from '../../components/FormScreen';
import { findNaat } from '../../features/naats';
import { CATEGORIES } from '../../lib/constants';
import { s } from '../../lib/strings';
import { colors, space, type } from '../../lib/theme';

export default function AdminNaatFormScreen({ navigation, route }) {
  const existing = route.params?.id ? findNaat(route.params.id) : null;
  const [title, setTitle] = useState(existing?.title ?? '');
  const [author, setAuthor] = useState(existing?.author ?? '');
  const [category, setCategory] = useState(existing?.category ?? CATEGORIES[0].id);
  const [content, setContent] = useState(existing?.content ?? '');
  const [youtubeUrl, setYoutubeUrl] = useState(existing?.youtubeUrl ?? '');

  return (
    <FormScreen>
      <Field label={s.title} value={title} onChangeText={setTitle} />
      <Field label={s.author} value={author} onChangeText={setAuthor} />
      <Text style={[type.small, { color: colors.ink, fontWeight: '600', marginBottom: space.xs }]}>{s.category}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: space.md }}>
        {CATEGORIES.map((c) => (
          <Chip key={c.id} label={c.label} active={category === c.id} onPress={() => setCategory(c.id)} />
        ))}
      </View>
      <Field label={s.content} value={content} onChangeText={setContent} multiline />
      <Field label={s.youtubeLink} value={youtubeUrl} onChangeText={setYoutubeUrl} autoCapitalize="none" keyboardType="url" />
      {/* TODO: create / update naat */}
      <Button title={s.save} onPress={() => navigation.goBack()} />
    </FormScreen>
  );
}
