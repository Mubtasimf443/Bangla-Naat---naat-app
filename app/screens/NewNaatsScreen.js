import NaatList from '../components/NaatList';
import { newNaats } from '../features/naats';

export default function NewNaatsScreen({ navigation }) {
  return <NaatList data={newNaats()} onSelect={(n) => navigation.navigate('NaatDetail', { id: n.id })} />;
}
