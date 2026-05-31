const acorn = require('acorn');
const walk = require('acorn-walk');

class CodeParserEngine {
  constructor() {
    this.initialized = false;
  }

  // Pure JS parser h, isme initialize karne ke liye koi binary load nahi karni padti!
  initialize() {
    this.initialized = true;
    console.log('🌲 Acorn Pure-JS AST Engine initialized smoothly on Windows.');
  }

  /**
   * Source code ko parse karke uski AST tree banata h aur functions nikalta h
   * @param {string} sourceCode 
   */
  parseRepositoryCode(sourceCode) {
    if (!this.initialized) {
      throw new Error("Parser engine uninitialized. Call initialize() first.");
    }

    const extractedEntities = [];

    try {
      // Code ko tokenized AST structure me parse karo (ES6 features enabled)
      const ast = acorn.parse(sourceCode, { 
        ecmaVersion: 2020, 
        sourceType: 'module',
        locations: true // Line numbers track karne ke liye zaroori h
      });

      // Pure AST tree me se functions ko walk/traverse karke nikalna
      walk.simple(ast, {
        // Standard function definition mila
        FunctionDeclaration(node) {
          const entityName = node.id ? node.id.name : 'anonymous_function';
          extractedEntities.push({
            name: entityName,
            body: sourceCode.substring(node.start, node.end),
            coordinates: {
              startLine: node.loc.start.line,
              endLine: node.loc.end.line
            }
          });
        },
        // Arrow functions jo variables me store hote hain (e.g., const x = () => {})
        VariableDeclarator(node) {
          if (node.init && (node.init.type === 'ArrowFunctionExpression' || node.init.type === 'FunctionExpression')) {
            const entityName = node.id.name;
            extractedEntities.push({
              name: entityName,
              body: sourceCode.substring(node.init.start, node.init.end),
              coordinates: {
                startLine: node.loc.start.line,
                endLine: node.loc.end.line
              }
            });
          }
        }
      });

    } catch (err) {
      console.error('⚠️ Parsing error encountered on this file, skipping syntax break.', err.message);
    }

    return extractedEntities;
  }
}

module.exports = new CodeParserEngine();