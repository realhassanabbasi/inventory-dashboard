import ProductCard from "./ProductCard";
import CardWrapper from "./CardWrapper";

function ProductList({ products, getStatus, onDelete, onUpdateQuantity }) {
  return (
    <div>
      <h2>Product List</h2>
      {products.length === 0 && <p>No products found.</p>}
      {products.map((product) => (
        <CardWrapper key={product.id}>
          <ProductCard
            product={product}
            status={getStatus(product.quantity)}
            onDelete={onDelete}
            onUpdateQuantity={onUpdateQuantity}
          />
        </CardWrapper>
      ))}
    </div>
  );
}

export default ProductList;
