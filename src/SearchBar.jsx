import data from './assets/products.json'

  var data1 = JSON.parse(data);
  var searchFields = ['name','class_name'];
  var results = [];

  function search(keyword){
    for(var i in data1){
      for(var u=0; u<searchFields.length; u++){
        var q = rel(data1[i][searchFields[u]], keyword);
        if(q==0){
          continue;
        }
        results.push({lower:q,entry:data1[i]})
      }
      results.sort(compare);
      for(i = 0; i < results.length; i++){
        results[i] = results[i].entry;
      }
    print(results);
    return results;
    }
  }

  function rel(value, keyword){
    value = value.toLowerCase();
    keyword = keyword.toLowerCase();

    var index = value.indexOf(keyword);
    var wIndex = value.indexOf(' ' + keyword);

    if(index == 0){
      return 3;
    }else if(wIndex != -1){
      return 2;
    }else if(index != -1){
      return 1;
    }else{
      return 0;
    }
  }

  function compare(a, b){
    return b.rel - a.rel;
  }