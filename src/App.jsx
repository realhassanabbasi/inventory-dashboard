import { useState, useEffect, useMemo, useCallback } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/functional/Header";
import ThemeToggle from "./components/functional/ThemeToggle";
import InventoryMetrics from "./components/functional/InventoryMetrics";
import ProductForm from "./components/functional/ProductForm";
import ProductList from "./components/functional/ProductList";
import AuditLogger from "./components/class/AuditLogger";

// First products shown when the app opens the first time
const sampleProducts = [
  { id: 1, title: "Wireless Mouse", category: "Electronics", quantity: 25 },
  { id: 2, title: "Notebook", category: "Stationery", quantity: 8 },
  { id: 3, title: "T-Shirt", category: "Clothing", quantity: 0 },
  { id: 4, title: "USB Cable", category: "Electronics", quantity: 40 },
];

function App() {
  // Load saved products, or use the sample products on first open
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("inventoryProducts");
    return saved ? JSON.parse(saved) : sampleProducts;
  });
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [latestLog, setLatestLog] = useState(null);

  // Save products and update the page title when products change
  useEffect(() => {
    localStorage.setItem("inventoryProducts", JSON.stringify(products));
    document.title = products.length + " Products in Inventory";
  }, [products]);

  // Find the status of one product from its quantity
  function getStatus(quantity) {
    if (quantity === 0) return "Out of Stock";
    if (quantity <= 10) return "Low Stock";
    return "In Stock";
  }

  // Add a new product to the list
  const addProduct = useCallback((title, category, quantity) => {
    const newProduct = { id: Date.now(), title, category, quantity };
    setProducts((oldProducts) => [...oldProducts, newProduct]);
    setLatestLog("Product added: " + title);
  }, []);

  // Remove a product from the list
  const deleteProduct = useCallback((id, title) => {
    setProducts((oldProducts) => oldProducts.filter((p) => p.id !== id));
    setLatestLog("Item deleted: " + title);
  }, []);

  // Change the stock of one product
  const updateQuantity = useCallback((id, title, change) => {
    setProducts((oldProducts) =>
      oldProducts.map((p) => {
        if (p.id !== id) return p;
        const newQuantity = p.quantity + change;
        return { ...p, quantity: newQuantity < 0 ? 0 : newQuantity };
      })
    );
    setLatestLog("Stock level updated: " + title);
  }, []);

  // Filtered list, recalculated only when its inputs change
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        categoryFilter === "All" || p.category === categoryFilter;
      const matchStatus =
        statusFilter === "All" || getStatus(p.quantity) === statusFilter;
      return matchCategory && matchStatus;
    });
  }, [products, categoryFilter, statusFilter]);

  // Total stock of all products
  const totalStock = useMemo(() => {
    return products.reduce((total, p) => total + p.quantity, 0);
  }, [products]);

  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <ThemeToggle />
        <InventoryMetrics
          totalProducts={products.length}
          totalStock={totalStock}
        />
        <ProductForm onAdd={addProduct} />
        <div className="filters">
          <label>
            Category:
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Stationery">Stationery</option>
              <option value="Grocery">Grocery</option>
            </select>
          </label>
          <label>
            Stock Status:
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </label>
        </div>
        <ProductList
          products={filteredProducts}
          getStatus={getStatus}
          onDelete={deleteProduct}
          onUpdateQuantity={updateQuantity}
        />
        <AuditLogger latestLog={latestLog} />
      </div>
    </ThemeProvider>
  );
}

export default App;
