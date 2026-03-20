import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useInventory } from '../context/InventoryContext';

const { FiPackage, FiDollarSign, FiAlertTriangle, FiTrendingUp } = FiIcons;

const StatCard = ({ title, value, icon, trend, trendLabel, colorClass }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <SafeIcon icon={icon} className="w-6 h-6" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-sm">
        <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-emerald-500 mr-1" />
        <span className="text-emerald-500 font-medium">{trend}</span>
        <span className="text-gray-500 ml-2">{trendLabel}</span>
      </div>
    )}
  </Card>
);

const Dashboard = () => {
  const { items, getStats } = useInventory();
  const stats = getStats();
  const lowStockItems = items.filter(i => i.quantity <= i.minStock && i.quantity > 0).slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your inventory today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Items" 
          value={stats.totalItems} 
          icon={FiPackage} 
          colorClass="bg-indigo-100 text-indigo-600"
          trend="+4.75%"
          trendLabel="vs last month"
        />
        <StatCard 
          title="Total Value" 
          value={`$${stats.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} 
          icon={FiDollarSign} 
          colorClass="bg-emerald-100 text-emerald-600"
        />
        <StatCard 
          title="Low Stock Alerts" 
          value={stats.lowStock} 
          icon={FiAlertTriangle} 
          colorClass="bg-amber-100 text-amber-600"
        />
        <StatCard 
          title="Out of Stock" 
          value={stats.outOfStock} 
          icon={FiPackage} 
          colorClass="bg-rose-100 text-rose-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p className="text-gray-500 text-sm">Activity chart visualization would go here</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Low Stock Items</h3>
            <Badge variant="warning">{stats.lowStock} Items</Badge>
          </div>
          <div className="space-y-4">
            {lowStockItems.length > 0 ? lowStockItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-amber-600">{item.quantity} left</p>
                  <p className="text-xs text-gray-500">Min: {item.minStock}</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-gray-500 text-center py-4">All items are well stocked.</p>
            )}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default Dashboard;