import { useState } from 'react';
import { Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { z } from 'zod';
import Button from '../components/Button';
import Field from '../components/Field';
import FormScreen from '../components/FormScreen';
import { s } from '../lib/common/strings';
import { colors, space, type } from '../lib/common/theme';
import { useTokenStore } from '../lib/common/token.store';
import { tokenService } from '../services/token.service';

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'ইমেইল লিখুন')
    .max(254, 'ইমেইল সর্বোচ্চ 254 অক্ষরের হতে পারবে')
    .email('সঠিক ইমেইল ঠিকানা দিন'),
  password: z
    .string()
    .min(1, 'পাসওয়ার্ড লিখুন')
    .max(64, 'পাসওয়ার্ড সর্বোচ্চ 64 অক্ষরের হতে পারবে'),
});

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const link = [type.body, { color: colors.emerald, textAlign: 'center', marginTop: space.xl }];
  let Login= useTokenStore(state => state.Login);

  async function formSubmit() {
    if (loading) return;
    setError('');

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/api/auth/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: result.data.email, // trimmed
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 200 || response.status === 201) {
        console.log({token : data.accessToken});
        tokenService.setBearerToken(data.accessToken);
        Login(data.accessToken);
      } else if (response.status === 401) {
        setError('ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে');
      } else if (response.status === 403) {
        // the API uses 403 for two different cases, so check the message
        if (data.message === 'Please verify your email before logging in') {
          setError('লগইন করার আগে আপনার ইমেইল ভেরিফাই করুন');
        } else if (data.message === 'Your account has been banned') {
          setError('আপনার একাউন্টটি নিষিদ্ধ করা হয়েছে');
        } else {
          setError('আপনার একাউন্টে লগইন করার অনুমতি নেই');
        }
      } else if (response.status === 400) {
        setError('সঠিক ইমেইল ও পাসওয়ার্ড দিন');
      } else {
        console.log(data);
        setError('সার্ভারে সমস্যার কারণে লগইন করা সম্ভব হচ্ছে না');
      }
    } catch (e) {
      setError(e?.message || 'লগইন ব্যর্থ হয়েছে, আবার চেষ্টা করুন');
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormScreen error={error}>
      <Field
        label={s.email}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        maxLength={254}
      />
      <Field
        label={s.password}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        maxLength={64}
      />
      <Button title={s.login} onPress={formSubmit} disabled={loading} loading={loading}/>
      <Text style={link} onPress={() => navigation.navigate('ForgotPassword')}>{s.forgot}</Text>
      <Text style={link} onPress={() => navigation.replace('Register')}>{s.noAccount}</Text>
    </FormScreen>
  );
}