module.exports = {
  linters: {
    '**/*.+(js|ts)': [
      'eslint --fix',
      'tsc --noEmit --allowJs --strict',
      'prettier --write',
      'jest --findRelatedTests',
      'git add'
    ],
    '**/*.+(json|css)': ['prettier --write', 'git add']
  }
}
