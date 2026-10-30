import { FlatList } from 'react-native';
import { s } from '../lib/common/strings';
import { space } from '../lib/common/theme';
import EmptyState from './EmptyState';
import NaatCard from './NaatCard';

export default function NaatList({ data, onSelect, emptyText = s.emptyNaats }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(n) => n.id}
      renderItem={({ item }) => <NaatCard naat={item} onPress={onSelect} />}
      ListEmptyComponent={<EmptyState text={emptyText} />}
      contentContainerStyle={{ paddingTop: space.md, paddingBottom: space.xl, flexGrow: 1 }}
      initialNumToRender={8}
      windowSize={7}
      removeClippedSubviews
    />
  );
}
