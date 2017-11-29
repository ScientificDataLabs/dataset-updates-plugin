const doiTag = document.querySelector('meta[name=citation_doi]')

const crossRefAPI = function (doi) { return `http://api.crossref.org/works/${doi}` }

const styleCss = `
body {
	border: 5px solid red;
}
`

if (doiTag) {
	var element = document.createElement('style')
	element.innerHTML = styleCss
	document.body.appendChild(element)

	var element = document.createElement('div')
	element.innerHTML = `<h1>HELLO DOILLY: ${doiTag.content}</h1>`
	document.body.appendChild(element)

	console.log(crossRefAPI(doiTag.content))

	fetch(crossRefAPI(doiTag.content))
		.then(response => {
			console.log(response)
			return response.json()
		})
		.then(object => {
			const referenceDOIs = new Set(object.message.reference
				.map(r => r.DOI)
				.filter(r => r !== undefined))
			lookUpInFig([...referenceDOIs], (results) => {
				displayReferences(results, element)
			})

		})
		.catch(e => console.error(e))
}

function lookUpInFig(dois, callback) {
		// your code here	
}

function displayReferences(references, element) {
	console.log(references)
	const list = references.reduce((list, reference) => {
		return list + `<li>${reference}</li>`
	}, "<ul>") + "</ul>"
	element.innerHTML = list
}


