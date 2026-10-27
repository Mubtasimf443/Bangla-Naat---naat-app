import { useState } from 'react';
import { Text } from 'react-native';
import Button from '../components/Button';
import Field from '../components/Field';
import FormScreen from '../components/FormScreen';
import { s } from '../lib/strings';
import { colors, space, type } from '../lib/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const link = [type.body, { color: colors.emerald, textAlign: 'center', marginTop: space.xl }];

  return (
    <FormScreen>
      <Field label={s.email} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <Field label={s.password} value={password} onChangeText={setPassword} secureTextEntry />
      {/* TODO: call login from features/auth */}
      <Button title={s.login} onPress={() => navigation.goBack()} />
      <Text style={link} onPress={() => navigation.navigate('ForgotPassword')}>{s.forgot}</Text>
      <Text style={link} onPress={() => navigation.replace('Register')}>{s.noAccount}</Text>
    </FormScreen>
  );
}
