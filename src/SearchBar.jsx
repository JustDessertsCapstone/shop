
function search(query, data) {
  return data.filter(product => {
      let productClassClean = product.name.toLowerCase().replaceAll('-', ' ') + ' '
        + product.class_name.toLowerCase();

      let productList = productClassClean.includes(query.toLowerCase());

      return productList
  })
}

export default function SearchBar({ data }) {
  return (
    <form role="search">
      <input className="search-bar" id="search-input" type="search" placeholder="Search..." />
      <button type="button" onClick={() => {console.log(search(document.getElementById("search-input").value, data).map(product => {
        return product.name
      }))} /* onclick for testing purposes */}>
        Search
      </button>
    </form>
  )
}
