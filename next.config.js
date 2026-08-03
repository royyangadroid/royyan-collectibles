/** @type {import('next').NextConfig} */
const { execSync } = require('child_process');
const path = require('path');

const nextConfig = {
  // ── Performance ─────────────────────────────────────────────
  compress: true,
  poweredByHeader: false,

  images: {
    // AVIF first (better compression), WebP fallback
    formats: ['image/avif', 'image/webp'],
    // Minimum cache TTL for served images (1 week)
    minimumCacheTTL: 60 * 60 * 24 * 7,
    // Tuned device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'wallpapercave.com',
      },
      {
        protocol: 'https',
        hostname: 'as1.ftcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },

  // ── HTTP Headers ────────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
      {
        // Long-term cache for static assets
        source: '/catalog/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },
    ];
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
