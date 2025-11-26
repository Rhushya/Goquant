import type { Config } from 'tailwindcss'

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#21808d',
        secondary: '#5e5240',
        error: '#c0152f',
        success: '#22c55e',
        warning: '#f59e0b',
        info: '#3b82f6',
        destructive: '#c0152f',
        border: '#e5e7eb',
        input: '#f3f4f6',
        ring: '#21808d',
        background: '#ffffff',
        foreground: '#0f172a',
        muted: {
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280',
        },
        accent: {
          DEFAULT: '#21808d',
          foreground: '#ffffff',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      fontFamily: {
        sans: ['Inter', 'FKGroteskNeue', 'Geist', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config

export default config
