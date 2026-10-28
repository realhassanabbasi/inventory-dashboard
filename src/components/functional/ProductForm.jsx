import { useState, useRef, useEffect } from "react";

function ProductForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [quantity, setQuantity] = useState("");
  const titleInput = useRef(null);

  // Focus the title input when the form opens
  useEffect(() => {
    titleInput.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (title === "" || quantity === "") return;
    onAdd(title, category, Number(quantity));
    setTitle("");
    setQuantity("");
    titleInput.current.focus();
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add Product</h2>
      <input
        ref={titleInput}
        type="text"
        placeholder="Product title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Stationery">Stationery</option>
        <option value="Grocery">Grocery</option>
      </select>
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;
