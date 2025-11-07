// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { TrendingUp, TrendingDown, Calendar, Download, Share2, Filter } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
export function HealthDataComparison({
  currentData,
  historicalData,
  onExport,
  onShare
}) {
  const {
    toast
  } = useToast();
  const [timeRange, setTimeRange] = useState('month'); // week, month, quarter, year
  const [comparisonMode, setComparisonMode] = useState('trend'); // trend, comparison, distribution
  const [selectedMetrics, setSelectedMetrics] = useState(['overall', 'heart', 'blood_pressure', 'weight']);
  const timeRanges = [{
    id: 'week',
    name: '最近一周',
    days: 7
  }, {
    id: 'month',
    name: '最近一月',
    days: 30
  }, {
    id: 'quarter',
    name: '最近三月',
    days: 90
  }, {
    id: 'year',
    name: '最近一年',
    days: 365
  }];
  const metrics = [{
    id: 'overall',
    name: '整体健康',
    color: '#3b82f6',
    unit: '分'
  }, {
    id: 'heart',
    name: '心率',
    color: '#ef4444',
    unit: 'bpm'
  }, {
    id: 'blood_pressure',
    name: '血压',
    color: '#f59e0b',
    unit: 'mmHg'
  }, {
    id: 'weight',
    name: '体重',
    color: '#10b981',
    unit: 'kg'
  }, {
    id: 'sleep',
    name: '睡眠',
    color: '#8b5cf6',
    unit: '小时'
  }, {
    id: 'steps',
    name: '步数',
    color: '#06b6d4',
    unit: '步'
  }];
  const [comparisonData, setComparisonData] = useState([]);
  const [statistics, setStatistics] = useState({});
  useEffect(() => {
    // 生成对比数据
    const generateComparisonData = () => {
      const range = timeRanges.find(r => r.id === timeRange);
      const data = [];
      const today = new Date();
      for (let i = range.days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dataPoint = {
          date: date.toLocaleDateString('zh-CN', {
            month: 'short',
            day: 'numeric'
          })
        };
        selectedMetrics.forEach(metricId => {
          const metric = metrics.find(m => m.id === metricId);
          if (metric) {
            // 生成模拟数据，带有趋势
            const baseValue = metric.id === 'overall' ? 80 : metric.id === 'heart' ? 72 : metric.id === 'blood_pressure' ? 120 : metric.id === 'weight' ? 70 : metric.id === 'sleep' ? 7 : metric.id === 'steps' ? 8000 : 50;
            const variation = Math.sin(i / 7) * 10 + Math.random() * 5;
            dataPoint[metricId] = Math.round((baseValue + variation) * 10) / 10;
          }
        });
        data.push(dataPoint);
      }
      return data;
    };
    const data = generateComparisonData();
    setComparisonData(data);

    // 计算统计信息
    const stats = {};
    selectedMetrics.forEach(metricId => {
      const values = data.map(d => d[metricId]).filter(v => v !== undefined);
      if (values.length > 0) {
        const latest = values[values.length - 1];
        const previous = values[values.length - 2] || latest;
        const average = values.reduce((sum, val) => sum + val, 0) / values.length;
        const max = Math.max(...values);
        const min = Math.min(...values);
        stats[metricId] = {
          latest,
          previous,
          average: Math.round(average * 10) / 10,
          max,
          min,
          trend: latest > previous ? 'up' : latest < previous ? 'down' : 'stable',
          change: Math.abs(Math.round((latest - previous) / previous * 100))
        };
      }
    });
    setStatistics(stats);
  }, [timeRange, selectedMetrics]);
  const handleMetricToggle = metricId => {
    setSelectedMetrics(prev => prev.includes(metricId) ? prev.filter(id => id !== metricId) : [...prev, metricId]);
  };
  const handleExport = () => {
    toast({
      title: "导出数据",
      description: "正在导出健康对比数据..."
    });
    onExport?.(comparisonData);
  };
  const handleShare = () => {
    toast({
      title: "分享报告",
      description: "正在生成分享链接..."
    });
    onShare?.(comparisonData);
  };
  const renderChart = () => {
    switch (comparisonMode) {
      case 'trend':
        return <ResponsiveContainer width="100%" height={300}>
            <LineChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '8px'
            }} />
              {selectedMetrics.map(metricId => {
              const metric = metrics.find(m => m.id === metricId);
              return metric ? <Line key={metricId} type="monotone" dataKey={metricId} stroke={metric.color} strokeWidth={2} dot={false} name={metric.name} /> : null;
            })}
            </LineChart>
          </ResponsiveContainer>;
      case 'comparison':
        return <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '8px'
            }} />
              {selectedMetrics.map(metricId => {
              const metric = metrics.find(m => m.id === metricId);
              return metric ? <Bar key={metricId} dataKey={metricId} fill={metric.color} name={metric.name} /> : null;
            })}
            </BarChart>
          </ResponsiveContainer>;
      case 'distribution':
        return <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '8px'
            }} />
              {selectedMetrics.map(metricId => {
              const metric = metrics.find(m => m.id === metricId);
              return metric ? <Area key={metricId} type="monotone" dataKey={metricId} stroke={metric.color} fill={metric.color} fillOpacity={0.3} name={metric.name} /> : null;
            })}
            </AreaChart>
          </ResponsiveContainer>;
      default:
        return null;
    }
  };
  return <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            健康数据对比
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleExport} className="border-slate-600 text-gray-300 hover:bg-slate-700">
              <Download className="w-4 h-4 mr-2" />
              导出
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare} className="border-slate-600 text-gray-300 hover:bg-slate-700">
              <Share2 className="w-4 h-4 mr-2" />
              分享
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 时间范围选择 */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">时间范围:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {timeRanges.map(range => <button key={range.id} onClick={() => setTimeRange(range.id)} className={`px-3 py-1 rounded-lg text-sm transition-colors ${timeRange === range.id ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}`}>
                {range.name}
              </button>)}
          </div>
        </div>

        {/* 图表模式选择 */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">图表模式:</span>
          </div>
          <div className="flex gap-2">
            {['trend', 'comparison', 'distribution'].map(mode => <button key={mode} onClick={() => setComparisonMode(mode)} className={`px-3 py-1 rounded-lg text-sm transition-colors ${comparisonMode === mode ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}`}>
                {mode === 'trend' ? '趋势图' : mode === 'comparison' ? '对比图' : '分布图'}
              </button>)}
          </div>
        </div>

        {/* 指标选择 */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-gray-400 text-sm">显示指标:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {metrics.map(metric => <button key={metric.id} onClick={() => handleMetricToggle(metric.id)} className={`px-3 py-1 rounded-lg text-sm transition-colors flex items-center space-x-2 ${selectedMetrics.includes(metric.id) ? 'bg-slate-700 text-white' : 'bg-slate-900 text-gray-400 hover:bg-slate-800'}`}>
                <div className={`w-3 h-3 rounded-full ${metric.color}`}></div>
                <span>{metric.name}</span>
              </button>)}
          </div>
        </div>

        {/* 图表展示 */}
        <div className="bg-slate-900 rounded-lg p-4">
          {renderChart()}
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {selectedMetrics.map(metricId => {
          const metric = metrics.find(m => m.id === metricId);
          const stat = statistics[metricId];
          if (!metric || !stat) return null;
          return <div key={metricId} className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${metric.color}`}></div>
                  <span className="text-gray-300 text-sm">{metric.name}</span>
                </div>
                {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                {stat.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.latest} {metric.unit}
              </div>
              <div className="text-xs text-gray-400">
                平均: {stat.average} {metric.unit} | 
                范围: {stat.min}-{stat.max} {metric.unit}
              </div>
              {stat.change > 0 && <div className="text-xs mt-1">
                  {stat.trend === 'up' ? <span className="text-green-500">↑</span> : <span className="text-red-500">↓</span>}
                  <span className="text-gray-400 ml-1">{stat.change}% vs 上期</span>
                </div>}
            </div>;
        })}
        </div>
      </CardContent>
    </Card>;
}