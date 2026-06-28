/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
          active: '#1e40af',
          soft: '#dbeafe',
          'soft-hover': '#bfdbfe',
        },
        canvas: {
          DEFAULT: '#f6f7fb',
          subtle: '#eef2f7',
        },
        surface: {
          DEFAULT: '#ffffff',
          raised: '#fdfefe',
          muted: '#f8fafc',
        },
        ink: '#111827',
        body: '#374151',
        muted: '#6b7280',
        'muted-soft': '#9ca3af',
        hairline: '#e5e7eb',
        'hairline-strong': '#d1d5db',
        focusRing: '#93c5fd',
        'on-primary': '#ffffff',
        success: '#15803d',
        'success-soft': '#dcfce7',
        warning: '#b45309',
        'warning-soft': '#fef3c7',
        error: '#b91c1c',
        'error-soft': '#fee2e2',
      },
      fontFamily: {
        inter: ["'Inter', ui-sans-serif, system-ui, sans-serif"],
        mono: ["'JetBrains Mono', 'Fira Code', ui-monospace, monospace"],
      },
    },
  },
  plugins: [],
}
