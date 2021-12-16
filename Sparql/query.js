const query = {
    all:`SELECT ?o ?p ?s WHERE 
        {?o ?p ?s.}`,
    selectHierarchy:`PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
     
    SELECT DISTINCT ?subject ?label ?supertype
    WHERE {
        { ?subject a owl:Class . } UNION { ?individual a ?subject . } .
        OPTIONAL { ?subject rdfs:subClassOf ?supertype } .
        OPTIONAL { ?subject rdfs:label ?label }
    } ORDER BY ?subject`

    ,hierarchy:`
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

 SELECT ?directSub ?super 
 WHERE { ?directSub rdfs:subClassOf ?super .
         FILTER NOT EXISTS { ?otherSub rdfs:subClassOf ?super. 
                             ?directSub rdfs:subClassOf ?otherSub .
                             FILTER (?otherSub != ?directSub)
         }
 }
`
}

exports.query=query