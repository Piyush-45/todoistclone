// metro.config.js
/** @type {import('expo/metro-config').MetroConfig} */
const { getDefaultConfig } = require('expo/metro-config');

// Get the default configuration
const config = getDefaultConfig(__dirname);

// Extend the sourceExts to include 'sql'
config.resolver.sourceExts.push('sql');

module.exports = config;
