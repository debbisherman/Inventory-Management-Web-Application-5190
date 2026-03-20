import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';

const PlaceholderPage = ({ title }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500 mt-1">This section is currently under construction.</p>
      </div>
      
      <Card className="p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl text-indigo-500">🚧</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
        <p className="text-gray-500 max-w-sm">
          We're working hard to bring you the {title.toLowerCase()} features. Check back soon for updates!
        </p>
      </Card>
    </motion.div>
  );
};

export default PlaceholderPage;