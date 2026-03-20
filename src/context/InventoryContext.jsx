import React, { createContext, useState, useContext, useEffect } from 'react';

const InventoryContext = createContext();

const initialData = [
  { id: '1', name: 'MacBook Pro 16"', sku: 'APP-MBP-16', category: 'Electronics', quantity: 15, price: 2499.00, minStock: 5 },
  { id: '2', name: 'Ergonomic Office Chair', sku: 'FURN-CHR-01', category: 'Furniture', quantity: 3, price: 299.50, minStock: 5 },
  { id: '3', name: 'Wireless Mouse', sku: 'ELEC-MOU-WL', category: 'Electronics', quantity: 0, price: 49.99, minStock: 10 },
  { id: '4', name: 'Standing Desk', sku: 'FURN-DSK-ST', category: 'Furniture', quantity: 8, price: 599.00, minStock: 2 },
  { id: '5', name: 'A4 Printer Paper (Ream)', sku: 'OFF-PAP-A4', category: 'Office Supplies', quantity: 45, price: 8.99, minStock: 20 },
];

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('inventory_items');
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('inventory_items', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem) => {
    setItems(prev => [...prev, { ...newItem, id: Date.now().toString() }]);
  };

  const updateItem = (id, updatedData) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
  };

  const deleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getStats = () => {
    const totalItems = items.length;
    const totalValue = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const lowStock = items.filter(item => item.quantity <= item.minStock && item.quantity > 0).length;
    const outOfStock = items.filter(item => item.quantity === 0).length;

    return { totalItems, totalValue, lowStock, outOfStock };
  };

  return (
    <InventoryContext.Provider value={{ items, addItem, updateItem, deleteItem, getStats }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);