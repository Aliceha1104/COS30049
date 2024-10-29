import React from 'react';
import './ChartSkeleton.css';

export const ChartSkeleton = () => {
  return (
    <div className="chart-skeleton">
      <div className="chart-skeleton-title"></div>
      <div className="chart-skeleton-content"></div>
    </div>
  );
}