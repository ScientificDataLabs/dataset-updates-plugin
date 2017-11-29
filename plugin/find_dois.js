// const doiMatcher = /(10[.][0-9]{4,}(?:[.][0-9]+)*\/(?:(?![%"#? ])\\S)+)/

function findDois(node) {
	const doiMatcher = /10\.[0-9]{4,}(\.[0-9]+)*\/[\S]+/g
	var dois = []
	var matches = null;

	do {
		matches = doiMatcher.exec(node.textContent)
    	if (matches) {
    		dois.push(matches[0])
    	}
	} while (matches);

	console.log("found dois using regex: ", dois)

	return dois;
}