import data2 from "./assets/products.json";


export function search(query, data) {
  return data.filter((product) => {
    let productClassClean =
      product.name.toLowerCase().replaceAll("-", " ") +
      " " +
      product.class_name.toLowerCase();

    return productClassClean.includes(query.toLowerCase());;
  });
}

export function SearchBar({ setProducts, data }) {
  if (!data) data = data2;

  return (
    <form
      className="search-forum"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();

        let query = document.getElementById("search-input").value;

        setProducts(search(query, data));
      }}
    >
      <input
        className="search-bar"
        aria-label="Searchbar for products"
        id="search-input"
        type="search"
        placeholder="Search..."
      />

      <button type="submit">Search</button>

      <button
        type="button"
        onClick={() => {
          setProducts(data);
          document.getElementById("search-input").value = "";
        }}
      >
        Clear Search
      </button>
    </form>
  );
}
