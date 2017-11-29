const doiTag = document.querySelector('meta[name=citation_doi]')

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
}
