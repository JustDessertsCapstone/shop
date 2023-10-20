
function search(query, data) {
  return data.filter(product => {
      let productClassClean = product.name.toLowerCase().replaceAll('-', ' ') + ' '
        + product.class_name.toLowerCase();

      let productList = productClassClean.includes(query.toLowerCase());

      return productList;
  })
}

export default function SearchBar({ data, setProducts }) {
  return (
    <form role="search" onSubmit={e => { e.preventDefault(); }} >
      <input className="search-bar" id="search-input" type="search" placeholder="Search..." />

      <button type="button" onClick={() => {
          setProducts(search(document.getElementById("search-input").value, data));
        }}>
        Search
      </button>

      <button type="button" onClick={() => {
          setProducts(data)
        }}>
        Clear Search
      </button>
    </form>
  )
}
