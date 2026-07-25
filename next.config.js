/** @type {import('next').NextConfig} */
const { execSync } = require('child_process');
const path = require('path');

const nextConfig = {
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && isServer) {
      // Watch sold.json and re-run sync-data when it changes
      const soldJsonPath = path.join(__dirname, 'public', 'sold.json');
      config.watchOptions = {
        ...config.watchOptions,
        ignored: /node_modules/,
      };

      // Add sold.json as a dependency to watch
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        return entries;
      };

      // Use a plugin to watch sold.json
      const { DefinePlugin } = require('webpack');
      config.plugins.push(
        new (class SoldJsonWatcherPlugin {
          apply(compiler) {
            compiler.hooks.afterCompile.tap('SoldJsonWatcherPlugin', (compilation) => {
              compilation.fileDependencies.add(soldJsonPath);
            });
            compiler.hooks.watchRun.tapAsync('SoldJsonWatcherPlugin', (compiler, callback) => {
              const changedFiles = compiler.modifiedFiles || new Set();
              if (changedFiles.has(soldJsonPath)) {
                console.log('🔄 sold.json changed — re-running sync-data...');
                try {
                  execSync('node scripts/sync-data.js', {
                    cwd: __dirname,
                    stdio: 'inherit',
                  });
                } catch (e) {
                  console.error('❌ sync-data failed:', e.message);
                }
              }
              callback();
            });
          }
        })()
      );
    }
    return config;
  },
};
module.exports = nextConfig;
