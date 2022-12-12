const { build } = require('esbuild')
const mri = require('mri')
const path = require('path')

const pkg = require('./package.json')

const prog = mri(process.argv.slice(2), {
    boolean: ['watch', 'minify'],
})

build({
    entryPoints: [path.join(process.cwd(), 'client/index.ts')],
    bundle: true,
    platform: 'browser',
    outfile: path.join(process.cwd(), 'dist/index.js'),
    minify: prog.minify,
    sourcemap: !prog.minify,
    watch: prog.watch,
    external: [
        ...Object.keys(pkg.dependencies),
        ...Object.keys(pkg.devDependencies),
    ],
}).then(() => {})
