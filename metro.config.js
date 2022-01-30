const { getDefaultConfig } = require('@expo/metro-config')

const config = getDefaultConfig(__dirname)

// 解决apollo资源包引用问题

config.resolver.sourceExts = process.env.RN_SRC_EXT
  ? [
      ...process.env.RN_SRC_EXT.split(',').concat(config.resolver.sourceExts),
      'cjs',
    ] // <-- cjs added here
  : [...config.resolver.sourceExts, 'cjs'] // <-- cjs added here

module.exports = config
