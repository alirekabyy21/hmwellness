const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ["googleapis", "google-auth-library"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Remove unoptimized images setting as it might cause issues
  images: {
    domains: ["placeholder.com"],
  },
  // Ensure server-only modules don't get bundled with the client
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle server-only packages on the client
      config.resolve.alias = {
        ...config.resolve.alias,
        googleapis: false,
        "google-auth-library": false,
      }
    }
    return config
  },
}

module.exports = nextConfig
