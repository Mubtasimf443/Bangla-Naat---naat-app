import NaatList from '../components/NaatList';
import { popularNaats } from '../features/naats';

export default function PopularScreen({ navigation }) {
  return <NaatList data={popularNaats()} onSelect={(n) => navigation.navigate('NaatDetail', { id: n.id })} />;
}
