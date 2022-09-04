module.exports = {
  '**/*.+(js|ts)': [
    'eslint --fix',
    'prettier --write',
    'jest --findRelatedTests --passWithNoTests',
  ],
  '**/*.+(json|css)': ['prettier --write'],
}
