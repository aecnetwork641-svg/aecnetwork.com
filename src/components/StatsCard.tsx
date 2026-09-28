"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string | number;
  icon?: LucideIcon;
  gradient?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  gradient = "bg-gradient-to-r from-blue-500 to-indigo-500"
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="glass-card p-6 rounded-2xl bg-aec-navy text-white border border-white/10 shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/70">{title}</p>
          <h2 className="text-2xl font-bold text-white mt-1">{value}</h2>
          <p className="flex items-center gap-1 text-sm font-semibold text-emerald-400 mt-2">
            <ArrowUpRight size={16} />
            <span>{change}%</span>
          </p>
        </div>

        {Icon && (
          <div className={`p-3.5 rounded-xl text-white shadow-lg ${gradient}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
