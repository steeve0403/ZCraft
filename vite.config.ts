import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import eslintPlugin from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

// Définir __dirname pour les modules ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Détection de l'environnement
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
    plugins: [
        react(),
        // Plugin pour ESLint intégré dans le processus de build
        eslintPlugin({
            // Affiche les erreurs ESLint dans la console pendant le développement
            emitWarning: !isProduction,
            emitError: isProduction
        }),
        // Plugin pour importer des SVG en tant que composants React
        svgr(),
        // Plugin pour utiliser les chemins d'alias définis dans tsconfig.json
        tsconfigPaths(),
        // Plugin pour analyser la taille de votre bundle (optionnel)
        isProduction &&
        visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@styles': path.resolve(__dirname, './src/styles'),
            // Ajoutez d'autres alias si nécessaire
            // Exemples :
            // '@components': path.resolve(__dirname, './src/components'),
            // '@assets': path.resolve(__dirname, './src/assets'),
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
                // Inclure automatiquement les variables et mixins SCSS dans chaque fichier SCSS
                // additionalData: `@import "@/styles/variables.scss"; @import "@/styles/mixins.scss";`,
            }
        },
        modules: {
            // Configuration des modules CSS/SCSS
            localsConvention: 'camelCaseOnly'
        }
    },
    server: {
        port: 3000,
        open: true,
        // Configuration du proxy si vous avez besoin de rediriger des appels API
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        sourcemap: !isProduction, // Génère les sourcemaps en développement
        // Configuration pour optimiser le bundle
        rollupOptions: {
            output: {
                manualChunks: {
                    // Séparer les dépendances en chunks distincts
                    vendor: ['react', 'react-dom']
                }
            }
        },
        // Configuration des minifications
        minify: isProduction ? 'esbuild' : false,
        // Définir le répertoire de sortie
        outDir: 'dist'
    },
    // Optimisations spécifiques
    optimizeDeps: {
        include: ['react', 'react-dom']
    },
    // Définir la base pour le déploiement (utile si vous déployez sur un sous-répertoire)
    base: '/'
});

