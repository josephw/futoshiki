export default {
  input: 'lib-browser/index.js',
  external: ['react'],
  output: {
    file: 'static/bundle.js',
    name: 'futoshiki',
    format: 'iife',
    globals: {
      'react': 'React'
    }
  }
};
