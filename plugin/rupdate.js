const doiTag = document.querySelector('meta[name=citation_doi]')
const dateMetadata = document.querySelector('meta[name="dc.date"]').content
const documentPublishDate = new Date(dateMetadata)

const crossRefAPI = function (doi) {
  return `http://api.crossref.org/works/${doi}`
}

const styleCss = `
body {

}

#doi-list {
  position: absolute;
  top: 0px;
  z-index: 1000;
  font-family: 'Comic sans',  sans-serif;
  color: white;
  background: rgba(0,0,0,0.8);
}

#doi-list a {
  color: white;
  text-decoration: underline;
}

#doi-list .updated {
  color: orange;
}

#doi-list .updated a {
  color: orange;
}
`
function addStylesheet () {
  const element = document.createElement('style')
  element.innerHTML = styleCss
  document.body.appendChild(element)
}

function addDummyList () {
  var element = document.createElement('div')
  element.id = 'doi-list'
  element.innerHTML = `<h1>HELLO DOILLY: ${doiTag.content}</h1>`
  document.body.appendChild(element)
  return element
}

if (doiTag) {
  addStylesheet()
  const element = addDummyList()

  fetch(crossRefAPI(doiTag.content))
    .then(response => response.json())
    .then(object => {
      const referenceDOIs = new Set([
        ...object.message.reference
        .map(r => r.DOI)
        .filter(r => r !== undefined),
        ...findDois(document.body)
      ])

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

async function run () {
  if (doiTag) {
    addStylesheet()
    const element = addDummyList()
    const documentDOIs = findDois(document.body)
    const crossRefDOIs = await fetch(crossRefAPI(doiTag.content))
      .then(response => response.json())
      .then(object => object.message.reference
            .map(r => r.DOI)
            .filter(r => r !== undefined))

    const allDOIs = new Set([...crossRefDOIs, ...documentDOIs])

    console.log('Fetching data for references: ', allDOIs)

    get_me_some_figshare([...referenceDOIs], (results) => {
      window.setInterval(() => {
        const results = munger()
        displayReferences(results, element)
      }, 1000)
    })
      .catch(e => console.error(e))
  }
}

var massiveHack = 0

function displayReferences (references, element) {
  if (massiveHack !== references.length) {
    console.log('display references for:', references)
    const list = references.reduce((list, reference) => {
      return list + referenceListItem(reference)
    }, '<ul>') + '</ul>'
    const title = '<h2>Data Resources in this article (orange indicates post publication update)</h2>'
    element.innerHTML = title + list
    massiveHack = references.length
  }
}

function referenceListItem (reference) {
  const link = 'https://figshare.com/collections/collection/' + reference.id
  const date = new Date(reference.modified_date)
  const updated = date > documentPublishDate ? 'updated' : ''

  return `<li class="${updated}"><a href="${link}" target="_blank">${reference.title}</a>, ${reference.modified_date} </li>`
}
