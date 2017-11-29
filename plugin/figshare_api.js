found_results = [];
final_callback = 0;

function get_me_some_figshare(dois, callback) {
  final_callback = callback;
  for (i in dois) get_figshare_data_by_doi(dois[i]);
  window.setTimeout(verify_if_done,3000);
}


function find_some_figshare(url, parameter, type) {

	fetch(url + parameter)
		.then(response => {
			return response.json()
		})
	        .then(results => {
			if (results) {
				found_results = found_results.concat(results);
				get_results_updates(found_results, type);
			}
		})
		.catch(e => console.log('something ---', e))
}


function get_figshare_data_by_doi(doi) {
  find_some_figshare("https://api.figshare.com/v2/collections?doi=", doi, 'collection');

  find_some_figshare("https://api.figshare.com/v2/collections?resource_doi=", doi, 'collection');
  find_some_figshare("https://api.figshare.com/v2/articles?doi=", doi, 'article');
  find_some_figshare("https://api.figshare.com/v2/articles?resource_doi=", doi, 'article');
}


results_updates = {};
all_good = false;
function get_results_updates(results, type) {
  for (i in results) {
    result = results[i];
    update = {
      xmlhttp: new XMLHttpRequest(),
      data: {},
      done: false,
      type: type
    }
    results_updates[type+'_'+result["id"]] = update;

    if (type==="article") {
      get_figshare_article(result["id"], update.xmlhttp);
    } else {
      get_figshare_collection(result["id"], update.xmlhttp);
    }
  }
}


function get_figshare_article(collection_id, xmlhttp) {
	const url = "https://api.figshare.com/v2/articles/" + collection_id
	fetch(url)
		.then(response => response.json())
	        .then(article => {
			if (article === undefined || article.message) {
				// console.log('undefined for : ', url)
			} else {
				results_updates['article_'+article["id"]].data = article;
				results_updates['article_'+article["id"]].done = true;
			}
		})
		.catch(e => console.log('get article ERROR  ---', e))
}


function get_figshare_collection(collection_id, xmlhttp) {
	const url = "https://api.figshare.com/v2/collections/" + collection_id
	fetch(url)
		.then(response => response.json())
	        .then(article => {
			if (article === undefined || article.message) {
			} else {
				results_updates['collection_'+article["id"]].data = article;
				results_updates['collection_'+article["id"]].done = true;
			}
		})
		.catch(e => console.log('get collection ERROR  ---', e))
}


function verify_if_done() {
  if (all_good) return;

  var ok = true;

	if (results_updates.length === 0) {
		ok = false
	}

  for (i in results_updates) {
    if (!results_updates[i].done)
      ok=false;
  }

  if (ok) {
    all_good = true;
    get_updates();
  }
}

function get_updates() {
  final_callback([]);
}

function munger() {
	updates = [];

	for (i in results_updates) {
		data = results_updates[i].data;

		if (data.id) {
			updates.push({
				id: data.id,
				modified_date: data.modified_date,
				version: data.version,
				title: data.title,
				doi: data.doi,
				published_date: data.published_date,
				link: data.resource_link
			})
		}
	}

	return updates
}
