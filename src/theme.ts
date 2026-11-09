export const colors = {
  // Figma Ibigo Design System Colors (Light Mode)
  primary: '#1E242B',       // Slate Dark
  primarySoft: '#FFF0EB',   // Soft primary / terracotta tint
  secondary: '#FD4F49',     // Terracotta Accent
  accent: '#FD4F49',        // Alias for secondary
  accentSoft: '#FFF0EB',    // Soft terracotta
  bgBase: '#F7F4EF',        // Warm Sand
  background: '#F7F4EF',    // Alias for bgBase
  bgSurface: '#FFFFFF',     // White
  surface: '#FFFFFF',       // Alias for bgSurface
  bgDarkCard: '#1E242B',    // Slate Dark Card
  bgDarkCardAlt: '#2A323D', // Slate Dark Card Alt

  // Semantic Status Colors
  success: '#2E7D32',       // Green
  successSoft: '#E8F5E9',
  warning: '#F57C00',       // Amber / Orange
  warningSoft: '#FFF3E0',
  danger: '#D32F2F',        // Red
  dangerSoft: '#FFEBEE',
  info: '#1976D2',          // Blue
  infoSoft: '#E3F2FD',

  // Typography & Neutrals
  textPrimary: '#1E242B',   // Slate Dark
  textSecondary: '#666F7A', // Muted slate
  textMuted: '#94A3B8',     // Subtitle gray
  textOnDark: '#FFFFFF',
  textOnDarkSecondary: '#94A3B8',

  // Borders & Dividers
  border: '#E5E0D8',
  borderSubtle: '#EFEBE4',
  line: '#E5E0D8',
  surfaceMuted: '#F0ECE4',
  ink: '#1E242B',
  muted: '#666F7A',
};

export const darkColors = {
  // Figma Ibigo Dark Mode
  primary: '#FFFFFF',
  primarySoft: '#382417',
  secondary: '#fd4f49',
  accent: '#fd4f49',
  accentSoft: '#382417',
  bgBase: '#12161A',
  background: '#12161A',
  bgSurface: '#1E242B',
  surface: '#1E242B',
  bgDarkCard: '#151A20',
  bgDarkCardAlt: '#232A33',
  success: '#43A05B',
  successSoft: '#172D1E',
  warning: '#FB8C00',
  warningSoft: '#382715',
  danger: '#E53935',
  dangerSoft: '#381A16',
  info: '#2196F3',
  infoSoft: '#152C42',
  textPrimary: '#F7F4EF',
  textSecondary: '#A2AAB4',
  textMuted: '#6E7682',
  textOnDark: '#FFFFFF',
  textOnDarkSecondary: '#A2AAB4',
  border: '#2A323D',
  borderSubtle: '#222932',
  line: '#2A323D',
  surfaceMuted: '#242C36',
  ink: '#F7F4EF',
  muted: '#A2AAB4',
};

export const radii = {
  xs: 6,        // Légèrement plus doux pour les très petits éléments
  sm: 8,        // Doux pour les inputs/badges discrets
  btn: 12,      // Figma: Rayon 12 pour des boutons nettement plus arrondis
  md: 14,       // Rayon intermédiaire
  card: 18,     // Figma: Rayon 18 pour des cartes bien arrondies
  lg: 20,       // Pour les grands conteneurs / modales
  xl: 28,       // Pour les éléments très mis en valeur
  full: 9999,   // Pilules & status chips
};

export const dimensions = {
  buttonHeight: 44, // Figma: Hauteur 44px
  inputHeight: 48,  // Figma inputs
  cardBorder: 1,    // Figma: Bordure 1px
};

export const shadow = {
  card: '0 2px 8px rgba(30, 36, 43, 0.04), 0 1px 2px rgba(30, 36, 43, 0.02)',
  cardHover: '0 8px 24px rgba(30, 36, 43, 0.08)',
  dropdown: '0 12px 32px rgba(30, 36, 43, 0.12)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  screen: 16,
};

export const fontSizes = {
  caption: 10.5,
  small: 11.5,
  body: 12,
  bodyLg: 13,
  title: 14,
  titleLg: 16,
  heading: 18,
};

export const sizes = {
  touch: 44,
  control: 40,
  cta: 44,
};

export const typography = {
  fontPrimaryRegular: 'Inter, sans-serif',
  fontPrimaryMedium: 'Inter, sans-serif',
  fontPrimarySemiBold: 'Inter, sans-serif',
  fontPrimaryBold: 'Inter, sans-serif',
  fontPrimaryExtraBold: 'Inter, sans-serif',

  display: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700' as const,
  },
  h1: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  h3: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
  },
  bodyBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600' as const,
  },
  bodySmall: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as const,
  },
  badge: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700' as const,
  },
};

export default {
  colors,
  darkColors,
  radii,
  dimensions,
  shadow,
  spacing,
  fontSizes,
  sizes,
  typography,
};
