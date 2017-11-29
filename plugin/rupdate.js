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

	fetch(crossRefAPI(doiTag.content))
		.then(response => response.json())
		.then(object => {
			const referenceDOIs = new Set(object.message.reference
				.map(r => r.DOI)
				.filter(r => r !== undefined))

			console.log('Fetching data for references: ', referenceDOIs)

			window.setInterval(() => {
				const results = munger()
				displayReferences(results, element)
			}, 1000)

			get_me_some_figshare([...referenceDOIs], (results) => {
				window.setInterval(() => {
					const results = munger()
					displayReferences(results, element)
				}, 1000)
			})

		})
		.catch(e => console.error(e))
}


function displayReferences(references, element) {
	console.log('display references for:', references)
	const list = references.reduce((list, reference) => {
		return list + `<li>${reference.title}, ${reference.published_date}</li>`
	}, "<ul>") + "</ul>"
	element.innerHTML = list
}



