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
      className="p-6 rounded-3xl bg-white/70 backdrop-blur-2xl text-slate-900 border border-white/80 shadow-[0_20px_50px_-15px_rgba(11,31,58,0.1),0_0_0_1px_rgba(255,255,255,0.7)_inset] relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</p>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1">{value}</h2>
          <p className="flex items-center gap-1 text-xs font-bold text-emerald-600 mt-2">
            <ArrowUpRight size={16} />
            <span>{change}%</span>
          </p>
        </div>

        {Icon && (
          <div className={`p-3.5 rounded-2xl text-white shadow-lg ${gradient}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
