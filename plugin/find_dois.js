// const doiMatcher = /(10[.][0-9]{4,}(?:[.][0-9]+)*\/(?:(?![%"#? ])\\S)+)/

function findDois(node) {
	 if (node.nodeType === Node.TEXT_NODE) {
		const doiMatcher = /10\.[0-9]{4,}(\.[0-9]+)*\/[\S]+/g
		var dois = []
		var matches = null;

		do {
			matches = doiMatcher.exec(node.textContent)
	    	if (matches) {
	    		dois.push(matches[0])
	    	}
		} while (matches);
		return dois;
	} else {
		var dois = []
		for (let i = 0; i < node.childNodes.length; i++) {
			const foundDois = findDois(node.childNodes[i])
      		dois = dois.concat(foundDois)
		}
		return dois
	}
}