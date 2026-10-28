function ProductCard({ product, status, onDelete, onUpdateQuantity }) {
  // Badge color depends on the stock status
  const badgeClass =
    status === "In Stock"
      ? "badge in"
      : status === "Low Stock"
        ? "badge low"
        : "badge out";

  return (
    <div>
      <h3>{product.title}</h3>
      <p>Category: {product.category}</p>
      <p>Quantity: {product.quantity}</p>
      <span className={badgeClass}>{status}</span>
      <div className="card-buttons">
        <button onClick={() => onUpdateQuantity(product.id, product.title, 1)}>
          + Stock
        </button>
        <button onClick={() => onUpdateQuantity(product.id, product.title, -1)}>
          - Stock
        </button>
        <button onClick={() => onDelete(product.id, product.title)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
