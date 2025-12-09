
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Use Poppins directly
      },
  		colors: {
  			background: 'hsl(var(--background))', 
  			foreground: 'hsl(var(--foreground))', 

  			muted: 'hsl(var(--muted))', 
  			'muted-foreground': 'hsl(var(--muted-foreground))', 

  			popover: 'hsl(var(--popover))',
  			'popover-foreground': 'hsl(var(--popover-foreground))',

  			card: 'hsl(var(--card))', 
  			'card-foreground': 'hsl(var(--card-foreground))',

  			border: 'hsl(var(--border))', 
  			input: 'hsl(var(--input))', 

  			primary: 'hsl(var(--primary))', 
  			'primary-foreground': 'hsl(var(--primary-foreground))', 

  			secondary: 'hsl(var(--secondary))', 
  			'secondary-foreground': 'hsl(var(--secondary-foreground))', 

  			accent: 'hsl(var(--accent))', 
  			'accent-foreground': 'hsl(var(--accent-foreground))', 
        
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
            'menu-clasico': 'hsl(var(--menu-clasico))',
            'menu-dieta': 'hsl(var(--menu-dieta))',
            'menu-ejecutivo': 'hsl(var(--menu-ejecutivo))',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
            scroll: {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-50%)' },
            },
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
            scroll: 'scroll 60s linear infinite',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
