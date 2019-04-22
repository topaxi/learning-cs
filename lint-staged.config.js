module.exports = {
  linters: {
    '**/*.+(js|ts)': [
      'eslint --fix',
      'prettier --write',
      'jest --findRelatedTests',
      'git add'
    ],
    '**/*.+(json|css)': ['prettier --write', 'git add']
  }
}
