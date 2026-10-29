/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import {
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { colors } from '../lib/theme'; // adjust path to your theme file
import { useEffect } from 'react';
import { TOKEN_KEYS, tokenService } from '../lib/tokenService';
import { useTokenStore } from '../lib/token.store';

export default function RegistrationSuccessScreen({ route, navigation }) {
    const status = route.params?.status ?? 'success';
    const isSuccess = status === 'success';
    const token = route.params?.token;
    let Login = useTokenStore(state => state.Login);

    useEffect(() => {
        setTimeout(() => {
            if (!!token && isSuccess) Login(token);
        }, 3000);
    }, []);
    
    const goToLogin = () => navigation.replace('Login');
    const goToRegister = () => navigation.replace('Register');


    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

            <View style={styles.content}>
                <View style={[styles.badgeOuter, !isSuccess && styles.badgeOuterError]}>
                    <View style={[styles.badgeInner, !isSuccess && styles.badgeInnerError]}>
                        {isSuccess ? (
                            <View style={styles.check} />
                        ) : (
                            <Text style={styles.cross}>!</Text>
                        )}
                    </View>
                </View>

                <Text style={styles.title}>
                    {isSuccess ? 'You’re all set' : 'Registration failed'}
                </Text>
                <Text style={styles.subtitle}>
                    {isSuccess
                        ? 'Your account has been created. Log in to get started.'
                        : 'We couldn’t complete your registration. The link may have expired, so try registering again.'}
                </Text>
            </View>

            <View style={styles.footer}>
                <Pressable
                    onPress={isSuccess ? goToLogin : goToRegister}
                    accessibilityRole="button"
                    style={({ pressed }) => [
                        styles.button,
                        pressed && styles.buttonPressed,
                    ]}
                >
                    <Text style={styles.buttonText}>
                        {isSuccess ? 'Log in' : 'Register again'}
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    badgeOuter: {
        width: 148,
        height: 148,
        borderRadius: 74,
        backgroundColor: colors.emeraldSoft,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 36,
    },
    badgeOuterError: {
        backgroundColor: `${colors.danger}1F`,
    },
    badgeInner: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.emerald,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeInnerError: {
        backgroundColor: colors.danger,
    },
    check: {
        width: 22,
        height: 42,
        borderRightWidth: 6,
        borderBottomWidth: 6,
        borderColor: colors.white,
        borderRadius: 2,
        transform: [{ rotate: '45deg' }, { translateY: -4 }],
    },
    cross: {
        fontSize: 52,
        fontWeight: '700',
        color: colors.white,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.ink,
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.muted,
        textAlign: 'center',
        maxWidth: 320,
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    button: {
        backgroundColor: colors.emerald,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
    },
    buttonPressed: {
        opacity: 0.85,
    },
    buttonText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: '600',
    },
});