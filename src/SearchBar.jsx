import data from './assets/products.json'

function search(keyword) {
  let searchFields = ['name','class_name'];
  let results = [];

  for(let i in data){
    for(let u = 0; u < searchFields.length; u++){
      let q = rel(data[i][searchFields[u]], keyword);

      if(q==0) continue;

      results.push({lower:q, entry:data[i]})
    }

    results.sort(compare);
    for(i = 0; i < results.length; i++){
      results[i] = results[i].entry;
    }

    return results;
  }
}

function rel(value, keyword) {
  value = value.toLowerCase();
  keyword = keyword.toLowerCase();

  let index = value.indexOf(keyword);
  let wIndex = value.indexOf(' ' + keyword);

  if(index == 0)   return 3;
  if(wIndex != -1) return 2;
  if(index != -1)  return 1;

  return 0;
}

function compare(a, b){
  return b.rel - a.rel;
}

export default function SearchBar() {
  return (
    <form id="form" role="search">
      <input className="search-bar" type="search" id="query" name="q" placeholder="Search..." />
      <button type="button" onClick={() => {console.log(search(document.getElementById("query").value)[0].id)} /* onclick for testing purposes */}>
        Search
      </button>
    </form>
  )
}