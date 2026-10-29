
/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ
InshaAllah
*/

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#0B6B4B',
  secondary: '#084C38',
  deep: '#063D2E',
  gold: '#E8C778',
  cream: '#FFF8E7',
  muted: '#C3DCCF',
  border: 'rgba(232, 199, 120, 0.45)',
};

export default function InitializingScreen({
  title = 'Bangla Naat',
  message = 'Preparing your experience...',
  footer = 'A peaceful voice for the soul',
}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.deep}
        barStyle="light-content"
      />

      {/* Decorative background */}
      <View style={styles.topDecoration} />
      <View style={styles.bottomDecoration} />

      {/* Bismillah */}
      <View style={styles.header}>
        <Text style={styles.bismillah}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </Text>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.star}>✦</Text>
          <View style={styles.dividerLine} />
        </View>
      </View>

      {/* Main branding */}
      <View style={styles.content}>
        <View style={styles.logoFrame}>
          <View style={styles.logoInner}>
            <Image
              source={require('../assets/smallLogo.png')}
              style={styles.logo}
              resizeMode="contain"
              accessibilityLabel="Bangla Naat logo"
            />
          </View>
        </View>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.titleDivider}>
          <View style={styles.goldLine} />
          <Text style={styles.star}>✦</Text>
          <View style={styles.goldLine} />
        </View>

        <Text style={styles.subtitle}>
          ISLAMIC DEVOTIONAL AUDIO
        </Text>

        <Text style={styles.message}>{message}</Text>

        {/* Loading indicator */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="small"
            color={COLORS.gold}
          />
          <Text style={styles.loadingText}>
            Initializing
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>{footer}</Text>
        <Text style={styles.footerArabic}>الحمد لله</Text>
        <Text style={styles.footerCaption}>
          Made with love and devotion
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.deep,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    overflow: 'hidden',
  },

  // Background decorations
  topDecoration: {
    position: 'absolute',
    top: -180,
    right: -110,
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 1,
    borderColor: 'rgba(232, 199, 120, 0.10)',
  },

  bottomDecoration: {
    position: 'absolute',
    bottom: -220,
    left: -120,
    width: 360,
    height: 360,
    borderRadius: 180,
    borderWidth: 1,
    borderColor: 'rgba(232, 199, 120, 0.08)',
  },

  // Header
  header: {
    alignItems: 'center',
    width: '100%',
  },

  bismillah: {
    color: COLORS.cream,
    fontSize: 21,
    textAlign: 'center',
    lineHeight: 38,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 14,
  },

  dividerLine: {
    width: 42,
    height: 1,
    backgroundColor: COLORS.gold,
    opacity: 0.7,
  },

  star: {
    color: COLORS.gold,
    fontSize: 14,
  },

  // Logo
  content: {
    alignItems: 'center',
    width: '100%',
  },

  logoFrame: {
    width: 190,
    height: 210,
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    borderTopLeftRadius: 95,
    borderTopRightRadius: 95,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 9,
    marginBottom: 28,
    backgroundColor: 'rgba(255,255,255,0.025)',
  },

  logoInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderTopLeftRadius: 84,
    borderTopRightRadius: 84,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: COLORS.secondary,
    padding: 18,
  },

  logo: {
    width: '100%',
    height: '100%',
  },

  // App title
  title: {
    color: COLORS.cream,
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  titleDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 15,
    marginBottom: 12,
  },

  goldLine: {
    width: 34,
    height: 1,
    backgroundColor: COLORS.gold,
  },

  subtitle: {
    color: COLORS.gold,
    fontSize: 11,
    letterSpacing: 2,
    textAlign: 'center',
  },

  message: {
    color: COLORS.muted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 28,
  },

  // Loading
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 22,
  },

  loadingText: {
    color: COLORS.gold,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  // Footer
  footer: {
    alignItems: 'center',
    gap: 8,
  },

  footerText: {
    color: COLORS.muted,
    fontSize: 13,
    textAlign: 'center',
  },

  footerArabic: {
    color: COLORS.gold,
    fontSize: 21,
    marginTop: 4,
  },

  footerCaption: {
    color: '#91B7A5',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 2,
  },
});
