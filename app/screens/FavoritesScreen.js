import NaatList from '../components/NaatList';
import { favoriteNaats } from '../features/naats';

export default function FavoritesScreen({ navigation }) {
  return <NaatList data={favoriteNaats()} onSelect={(n) => navigation.navigate('NaatDetail', { id: n.id })} />;
}
