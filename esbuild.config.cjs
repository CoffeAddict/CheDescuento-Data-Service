const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./api/fetchData.ts'], // Your entry script
  outfile: './dist/index.cjs', // The output file
  bundle: true,
  format: 'cjs',
  platform: 'node', // Ensures compatibility with Node.js
  target: 'node16', // Specify Node.js version (adjust as needed)
  minify: true, // Optional: Minify the output to reduce bundle size
}).catch(() => process.exit(1));