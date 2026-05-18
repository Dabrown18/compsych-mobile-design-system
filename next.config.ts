import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve(__dirname),
  transpilePackages: ['react-native-web', '@compsych/mobile-ui'],
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      'react-native$': 'react-native-web',
      '@expo/vector-icons': path.resolve(__dirname, 'stubs/expo-vector-icons.js'),
      'expo-font': path.resolve(__dirname, 'stubs/expo-font.js'),
    };
    return config;
  },
};

export default nextConfig;
