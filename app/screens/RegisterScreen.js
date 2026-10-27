import { useState } from 'react';
import { Text } from 'react-native';
import Button from '../components/Button';
import Field from '../components/Field';
import FormScreen from '../components/FormScreen';
import { s } from '../lib/strings';
import { colors, space, type } from '../lib/theme';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <FormScreen>
      <Field label={s.name} value={name} onChangeText={setName} />
      <Field label={s.email} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <Field label={s.password} value={password} onChangeText={setPassword} secureTextEntry />
      {/* TODO: call register from features/auth */}
      <Button title={s.register} onPress={() => navigation.goBack()} />
      <Text
        style={[type.body, { color: colors.emerald, textAlign: 'center', marginTop: space.xl }]}
        onPress={() => navigation.replace('Login')}
      >
        {s.haveAccount}
      </Text>
    </FormScreen>
  );
}
