found_results = [];
function call_fct(updates) {
  console.log(updates);
}

final_callback = 0;

function get_me_some_figshare(dois, callback) {
  final_callback = callback;
  for (i in dois)
    get_figshare_data_by_doi(dois[i]);
  window.setTimeout(verify_if_done,3000);
}


function find_some_figshare(url, parameter, type) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
         if (xmlhttp.status == 200) {
              results = JSON.parse(xmlhttp.responseText);
              if (results) {
                found_results = found_results.concat(results);
                get_results_updates(found_results, type);
              }
         }
         else if (xmlhttp.status == 400) {
            console('There was an error 400');
         }
         else {
             console('something else other than 200 was returned');
         }
      }
  };

  xmlhttp.open("GET",url+parameter, true);
  xmlhttp.send();
}


function get_figshare_data_by_doi(doi) {
  find_some_figshare("http://api.figshare.com/v2/collections?doi=", doi, 'collection');
  find_some_figshare("http://api.figshare.com/v2/collections?resource_doi=", doi, 'collection');
  find_some_figshare("http://api.figshare.com/v2/articles?doi=", doi, 'article');
  find_some_figshare("http://api.figshare.com/v2/articles?resource_doi=", doi, 'article');
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
    console.log("HEREE");
    if (type==="article")
      get_figshare_article(result["id"], update.xmlhttp);
      else
      get_figshare_collection(result["id"], update.xmlhttp);
  }
}


function get_figshare_article(collection_id, xmlhttp) {
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
         if (xmlhttp.status == 200) {
              article = JSON.parse(xmlhttp.responseText);

              results_updates['article_'+article["id"]].data = article;
              results_updates['article_'+article["id"]].done = true;
              window.setTimeout(verify_if_done,1000);
         }
         else if (xmlhttp.status == 400) {
            console('There was an error 400');
         }
         else {
             console('something else other than 200 was returned');
         }
      }
  };

  xmlhttp.open("GET", "http://api.figshare.com/v2/articles/"+collection_id, true);
  xmlhttp.send();
}


function get_figshare_collection(collection_id, xmlhttp) {
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
         if (xmlhttp.status == 200) {
              article = JSON.parse(xmlhttp.responseText);

              results_updates['collection_'+article["id"]].data = article;
              results_updates['collection_'+article["id"]].done = true;
              window.setTimeout(verify_if_done,1000);
         }
         else if (xmlhttp.status == 400) {
            console('There was an error 400');
         }
         else {
             console('something else other than 200 was returned');
         }
      }
  };

  xmlhttp.open("GET", "http://api.figshare.com/v2/collections/"+collection_id, true);
  xmlhttp.send();
}


function verify_if_done() {
  if (all_good) return;
  var ok = true;
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
  updates = [];

  for (i in results_updates) {
    data = results_updates[i].data;

    if (data.version > 1) {
      updates.push({
        id: data.id,
        modified_date: data.modified_date,
        version: data.version,
        title: data.title,
        doi: data.doi,
        published_date: data.published_date
      })
    }
  }
  final_callback(updates);
}
