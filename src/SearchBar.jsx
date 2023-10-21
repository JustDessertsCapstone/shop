
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
    <form role="search" onSubmit={event => {
      event.preventDefault();

      let query = document.getElementById("search-input").value;
      
      setProducts(search(query, data));
    }} >
      <input className="search-bar" aria-label="Searchbar for products" id="search-input" type="search" placeholder="Search..." />

      <button type="submit">
        Search
      </button>

      <button type="button" onClick={() => {
        setProducts(data);
      }}>
        Clear Search
      </button>
    </form>
  )
}
