/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { useState } from 'react';
import { Text } from 'react-native';
import { z } from 'zod';
import Button from '../components/Button';
import Field from '../components/Field';
import FormScreen from '../components/FormScreen';
import { s } from '../lib/strings';
import { colors, space, type } from '../lib/theme';

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, 'নাম কমপক্ষে 4 অক্ষরের হতে হবে')
    .max(80, 'নাম সর্বোচ্চ 50 অক্ষরের হতে পারবে'),
  email: z
    .string()
    .trim()
    .min(6, 'ইমেইল লিখুন')
    .max(254, 'ইমেইল সর্বোচ্চ 254 অক্ষরের হতে পারবে')
    .email('সঠিক ইমেইল ঠিকানা দিন'),
  password: z
    .string()
    .min(8, 'পাসওয়ার্ড কমপক্ষে 8 অক্ষরের হতে হবে')
    .max(64, 'পাসওয়ার্ড সর্বোচ্চ 64 অক্ষরের হতে পারবে'),
});

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function formSubmit() {
    if (loading || success) return;
    setError('');
    setSuccess('');

    const result = registerSchema.safeParse({ name, email, password });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      let response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/api/auth/registration', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })
      if (response.status === 409) {
        setError('আপনার ইমেইল থেকে একটি একাউন্ট নিবন্ধিত, প্লিজ লগইন করেন');
        setTimeout(() => {
          navigation.navigate('Login')
        }, 3000);
      }
      else if (response.status === 503) {
        setError('কিছু কারণে আপনার মোবাইলে ইমেইল পাঠানো যাচ্ছে না')
      }
      else if (response.status === 200 || response.status === 201) {
        setSuccess(
          'আপনার ইমেইলে একটি ভেরিফিকেশন লিংক পাঠানো হয়েছে, অনুগ্রহ করে লিংকটি অনুসরণ করুন।'
        );
        setName('');
        setEmail('');
        setPassword('');
      }
      else {
        console.log(await response.json());
        setError('সার্ভারে সমস্য়ার কারণে নিবন্ধন করা সম্ভব হচ্ছে না')
      }
    } catch (e) {
      setError(e?.message || 'নিবন্ধন ব্যর্থ হয়েছে, আবার চেষ্টা করুন');
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormScreen error={error}>
      <Field label={s.name} value={name} onChangeText={setName} maxLength={50} />
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

      {success ? (
        <Text
          style={[
            type.body,
            { color: colors.emerald, textAlign: 'center', marginBottom: space.lg },
          ]}
        >
          {success}
        </Text>
      ) : null}

      <Button title={s.register} onPress={formSubmit} disabled={loading || !!success} loading={loading} />
      <Text
        style={[type.body, { color: colors.emerald, textAlign: 'center', marginTop: space.xl }]}
        onPress={() => navigation.replace('Login')}
      >
        {s.haveAccount}
      </Text>
    </FormScreen>
  );
}