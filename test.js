var SparqlParser = require('sparqljs').Parser
// Parse a SPARQL query without validation.
var SparqlParser = require('sparqljs').Parser;
var parser = new SparqlParser({ skipValidation: true });
var parsedQuery = parser.parse(
  'select (?x as ?xString)' +
  '(count(?y) as ?count)' +
  '{ ?x ?y ?z }');
console.log(parsedQuery)