/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';


import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, {
  Path,
  Circle,
  Rect,
  Polygon,
  G,
  Line,
} from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  background: '#FAF8EF',
  green: '#086044',
  darkGreen: '#064B38',
  lightGreen: '#DDE7D7',
  leafGreen: '#80A995',
  gold: '#F3C85F',
  cream: '#F3EACD',
  text: '#71838A',
};

function Lantern({ x }) {
  return (
    <G>
      <Line x1={x} y1="0" x2={x} y2="38" stroke={COLORS.green} strokeWidth="2" />
      <Circle cx={x} cy="39" r="3" fill={COLORS.green} />
      <Path
        d={`M${x - 10} 43 Q${x - 16} 44 ${x - 16} 53 L${x - 13} 79 Q${x} 91 ${x + 13} 79 L${x + 16} 53 Q${x + 16} 44 ${x + 10} 43 Z`}
        fill={COLORS.green}
      />
      <Rect x={x - 12} y="49" width="24" height="28" rx="3" fill={COLORS.gold} />
      <Path
        d={`M${x - 6} 52 L${x - 2} 52 L${x - 2} 74 L${x - 6} 74 Z M${x + 2} 52 L${x + 6} 52 L${x + 6} 74 L${x + 2} 74 Z`}
        fill="#FFF5D4"
      />
    </G>
  );
}

function MosqueIllustration() {
  return (
    <View style={styles.mosqueWrapper}>
      <Svg width="100%" height="100%" viewBox="0 0 360 390">
        {/* Islamic arch */}
        <Path
          d="M42 330 L42 175 Q42 142 76 137 Q78 73 142 57 Q180 39 180 14 Q180 39 218 57 Q282 73 284 137 Q318 142 318 175 L318 330"
          fill="none"
          stroke={COLORS.lightGreen}
          strokeWidth="7"
        />

        <Lantern x={30} />
        <Lantern x={330} />

        {/* Mosque background */}
        <Path
          d="M0 294 Q35 240 72 278 Q101 302 131 277 Q166 246 197 282 Q230 312 263 271 Q312 235 360 290 L360 390 L0 390 Z"
          fill="#E9EEDF"
        />

        {/* Decorative foliage */}
        <G fill={COLORS.leafGreen} opacity={0.8}>
          <Path d="M93 330 Q44 294 57 266 Q92 280 93 330 Z" />
          <Path d="M96 333 Q68 281 87 263 Q111 293 96 333 Z" />
          <Path d="M267 331 Q311 292 299 267 Q267 281 267 331 Z" />
          <Path d="M263 333 Q292 283 272 266 Q248 295 263 333 Z" />
        </G>

        {/* Mosque building */}
        <Path
          d="M105 290 L105 238 Q105 228 116 225 L244 225 Q255 228 255 238 L255 290 Z"
          fill={COLORS.cream}
        />
        <Path d="M101 232 L259 232 L259 243 L101 243 Z" fill="#D9D1B0" />

        {/* Dome */}
        <Path
          d="M121 226 L121 202 C121 171 144 149 180 136 C216 149 239 171 239 202 L239 226 Z"
          fill={COLORS.green}
        />
        <Path d="M121 210 Q180 200 239 210 L239 226 L121 226 Z" fill={COLORS.darkGreen} />

        {/* Dome finial */}
        <Path d="M176 137 L180 119 L184 137 Z" fill={COLORS.gold} />
        <Circle cx="180" cy="116" r="3" fill={COLORS.gold} />

        {/* Minaret */}
        <Path
          d="M253 224 L253 146 L244 140 L244 128 L255 120 L255 108 L260 108 L260 120 L271 128 L271 140 L262 146 L262 224 Z"
          fill="#E8DFC0"
        />
        <Path d="M243 163 L272 163 L272 170 L243 170 Z" fill={COLORS.green} />

        {/* Windows */}
        <G fill={COLORS.green}>
          <Path d="M118 288 L118 267 Q124 253 130 267 L130 288 Z" />
          <Path d="M145 288 L145 267 Q151 253 157 267 L157 288 Z" />
          <Path d="M173 288 L173 267 Q180 253 187 267 L187 288 Z" />
          <Path d="M203 288 L203 267 Q209 253 215 267 L215 288 Z" />
          <Path d="M230 288 L230 267 Q236 253 242 267 L242 288 Z" />
        </G>

        {/* Foreground */}
        <Path
          d="M0 345 Q32 315 60 343 Q85 363 112 346 Q143 321 171 350 Q194 374 224 349 Q254 326 282 350 Q324 320 360 349 L360 390 L0 390 Z"
          fill="#F6F5E9"
        />
      </Svg>

      {/* Vector icons layered over the illustration */}
      <View style={styles.moonIcon}>
        <Ionicons name="moon" size={42} color={COLORS.gold} />
      </View>

      <View style={styles.starOne}>
        <Ionicons name="star" size={15} color={COLORS.gold} />
      </View>
      <View style={styles.starTwo}>
        <Ionicons name="star" size={12} color={COLORS.gold} />
      </View>
      <View style={styles.starThree}>
        <Ionicons name="star" size={13} color={COLORS.gold} />
      </View>
    </View>
  );
}

export default function NaatLoadingScreen() {
  const { height, width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.container}>
        <View
          style={[
            styles.illustration,
            { height: Math.min(height * 0.53, width * 1.05) },
          ]}
        >
          <MosqueIllustration />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Explore Naat</Text>

          <Text style={styles.subtitle}>
            Listen to the beautiful words
            {'\n'}
            of our beloved Nabi ﷺ
          </Text>

          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#25805D" />
            <Text style={styles.loadingText}>App is Loading...</Text>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <MaterialCommunityIcons
              name="star-four-points-outline"
              size={27}
              color="#8EAF98"
            />
            <View style={styles.dividerLine} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  illustration: {
    width: '100%',
    maxWidth: 430,
  },
  mosqueWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  moonIcon: {
    position: 'absolute',
    left: '34%',
    top: '20%',
  },
  starOne: {
    position: 'absolute',
    left: '27%',
    top: '36%',
  },
  starTwo: {
    position: 'absolute',
    left: '59%',
    top: '24%',
  },
  starThree: {
    position: 'absolute',
    right: '20%',
    top: '47%',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 8,
  },
  title: {
    color: COLORS.darkGreen,
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: -1,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.text,
    fontSize: 17,
    lineHeight: 27,
    textAlign: 'center',
    marginTop: 14,
  },
  loader: {
    alignItems: 'center',
    marginTop: 42,
    gap: 14,
  },
  loadingText: {
    color: '#7A8C90',
    fontSize: 16,
  },
  divider: {
    width: '72%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    marginTop: 32,
  },
  dividerLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#B4CCB9',
    borderRadius: 2,
  },
});
