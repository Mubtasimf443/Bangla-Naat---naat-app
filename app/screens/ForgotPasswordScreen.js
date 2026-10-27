import { useState } from 'react';
import Button from '../components/Button';
import Field from '../components/Field';
import FormScreen from '../components/FormScreen';
import { s } from '../lib/strings';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  return (
    <FormScreen>
      <Field label={s.email} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      {/* TODO: call forgotPassword from features/auth */}
      <Button title={s.sendLink} onPress={() => navigation.goBack()} />
    </FormScreen>
  );
}
