function InventoryMetrics({ totalProducts, totalStock }) {
  return (
    <div className="metrics">
      <div className="metric">
        <h3>{totalProducts}</h3>
        <p>Total Products</p>
      </div>
      <div className="metric">
        <h3>{totalStock}</h3>
        <p>Total Stock</p>
      </div>
    </div>
  );
}

export default InventoryMetrics;
