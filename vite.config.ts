import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    noExternal: [
      'react-tweet',
      'react-farcaster-embed',
      '@farcaster/miniapp-sdk',
    ],
  },
  ssr: {
    noExternal: [
      'react-tweet',
      'react-farcaster-embed',
      '@farcaster/miniapp-sdk',
    ],
  },
  plugins: [
    nitro(),
    tailwindcss(),
    tanstackStart({
      srcDirectory: 'app',
      router: {
        routesDirectory: 'routes',
        generatedRouteTree: 'routeTree.gen.ts',
      },
    }),
    viteReact(),
  ],
})
