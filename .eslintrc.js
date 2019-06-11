module.exports = {
  env: { node: true },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
