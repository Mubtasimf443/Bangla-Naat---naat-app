import { useState } from 'react';
import { Text } from 'react-native';
import { z } from 'zod';
import Button from '../components/Button';
import Field from '../components/Field';
import FormScreen from '../components/FormScreen';
import { s } from '../lib/common/strings';
import { colors, space, type } from '../lib/common/theme';

const forgotSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'ইমেইল লিখুন')
    .min(6, 'ইমেইল কমপক্ষে 6 অক্ষরের হতে হবে')
    .max(255, 'ইমেইল সর্বোচ্চ 255 অক্ষরের হতে পারবে')
    .email('সঠিক ইমেইল ঠিকানা দিন'),
  newPassword: z
    .string()
    .min(8, 'পাসওয়ার্ড কমপক্ষে 8 অক্ষরের হতে হবে')
    .max(64, 'পাসওয়ার্ড সর্বোচ্চ 64 অক্ষরের হতে পারবে'),
});

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function formSubmit() {
    if (loading || success) return;
    setError('');
    setSuccess('');

    const result = forgotSchema.safeParse({ email, newPassword: password });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: result.data.email, // trimmed
          newPassword: password,
        }),
      });

      const data = await response.json().catch(() => ({}));
      console.log({data})
      if (response.status === 200 || response.status === 201) {
        setSuccess(
          'আপনার ইমেইলে পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে। লিংকে ক্লিক করার পর নতুন পাসওয়ার্ড কার্যকর হবে।'
        );
        setEmail('');
        setPassword('');
      } else if (response.status === 404) {
        setError('এই ইমেইল দিয়ে কোনো একাউন্ট পাওয়া যায়নি');
      } else if (response.status === 403) {
        // the API uses 403 for two different cases, so check the message
        if (data.message === 'Please verify your email before resetting your password') {
          setError('পাসওয়ার্ড রিসেট করার আগে আপনার ইমেইল ভেরিফাই করুন');
        } else if (data.message === 'Your account has been banned') {
          setError('আপনার একাউন্টটি নিষিদ্ধ করা হয়েছে');
        } else {
          setError('এই একাউন্টের পাসওয়ার্ড রিসেট করার অনুমতি নেই');
        }
      } else if (response.status === 400) {
        setError('সঠিক ইমেইল ও নতুন পাসওয়ার্ড দিন');
      } else if (response.status === 503) {
        setError('কিছু কারণে আপনার ইমেইলে মেইল পাঠানো যাচ্ছে না, পরে আবার চেষ্টা করুন');
      } else {
        console.log(data);
        setError('সার্ভারে সমস্যার কারণে অনুরোধ সম্পন্ন করা সম্ভব হচ্ছে না');
      }
    } catch (e) {
      setError(e?.message || 'অনুরোধ ব্যর্থ হয়েছে, আবার চেষ্টা করুন');
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
        maxLength={255}
      />
      <Field
        label={s.newPassword ?? s.password}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
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

      <Button title={s.sendLink} onPress={formSubmit} disabled={loading || !!success} loading={loading} />
      <Text
        style={[type.body, { color: colors.emerald, textAlign: 'center', marginTop: space.xl }]}
        onPress={() => navigation.goBack()}
      >
        {s.login}
      </Text>
    </FormScreen>
  );
}