import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './StatCard.css';


export const StatCard = ({ title, value, change, isLoading }) => {
  if (isLoading) {
    return (
      <div className="stat-card skeleton">
        <div className="skeleton-title"></div>
        <div className="skeleton-value"></div>
        <div className="skeleton-change"></div>
      </div>
    );
  }

  return (
    <div className="stat-card">
      <h3 className="stat-title">{title}</h3>
      <p className="stat-value">{value}</p>
      <div className={`stat-change ${change >= 0 ? 'positive' : 'negative'}`}>
        {change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        <span>{Math.abs(change)}% from last month</span>
      </div>
    </div>
  );
}