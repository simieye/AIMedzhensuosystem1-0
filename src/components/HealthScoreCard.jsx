// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { TrendingUp, TrendingDown, Minus, Award } from 'lucide-react';

export function HealthScoreCard({
  dimension,
  score,
  status,
  trend
}) {
  const getStatusColor = status => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'fair':
        return 'text-yellow-600 bg-yellow-100';
      case 'poor':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getTrendIcon = trend => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };
  const getScoreColor = score => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };
  return <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-800">{dimension}</h4>
          <div className="flex items-center space-x-2">
            {getTrendIcon(trend)}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              {status === 'excellent' ? '优秀' : status === 'good' ? '良好' : status === 'fair' ? '一般' : '需改善'}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-gray-400" />
            <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
          </div>
          <div className="w-20 bg-gray-200 rounded-full h-2">
            <div className={`h-2 rounded-full ${score >= 90 ? 'bg-green-500' : score >= 80 ? 'bg-blue-500' : score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
            width: `${score}%`
          }}></div>
          </div>
        </div>
      </CardContent>
    </Card>;
}