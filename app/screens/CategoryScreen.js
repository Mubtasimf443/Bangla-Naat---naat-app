import NaatList from '../components/NaatList';
import { naatsByCategory } from '../features/naats';

export default function CategoryScreen({ navigation, route }) {
  return (
    <NaatList
      data={naatsByCategory(route.params.id)}
      onSelect={(n) => navigation.navigate('NaatDetail', { id: n.id })}
    />
  );
}
