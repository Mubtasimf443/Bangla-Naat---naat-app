import { FlatList } from 'react-native';
import UserCard from '../../components/UserCard';
import { allUsers } from '../../features/users';
import { space } from '../../lib/theme';

export default function AdminUsersScreen() {
  return (
    <FlatList
      data={allUsers()}
      keyExtractor={(u) => u.id}
      contentContainerStyle={{ padding: space.lg }}
      // TODO: wire onBan / onUnban / onDelete
      renderItem={({ item }) => <UserCard user={item} />}
    />
  );
}
