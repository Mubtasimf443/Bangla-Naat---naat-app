import NaatList from '../components/NaatList';
import { newNaats } from '../features/naats';
import { useExpoSecureStorage } from '../lib/hooks/useExpoSecureStorage';

export default function NewNaatsScreen({ navigation }) {
  let [naats, setNaats] = useExpoSecureStorage('NAATS', []);

  
  return <NaatList data={newNaats()} onSelect={(n) => navigation.navigate('NaatDetail', { id: n.id })} />;
}
