// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { TrendingUp, PieChart, Shield, Activity } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
export function KnowledgeAnalytics({
  stats
}) {
  const monthlyGrowthData = stats?.monthlyGrowth || [];
  const categoryData = Object.entries(stats?.knowledgeDistribution || {}).map(([name, value]) => ({
    name: name.replace('_', ' '),
    value
  }));
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6b7280'];
  return <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              知识增长趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="new" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="新增知识" />
                <Area type="monotone" dataKey="updated" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="更新知识" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              知识分类分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            知识质量评估
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(stats?.qualityMetrics || {}).map(([metric, value]) => <div key={metric}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{metric === 'completeness' ? '数据完整性' : metric === 'accuracy' ? '数据准确性' : metric === 'timeliness' ? '数据时效性' : metric === 'consistency' ? '数据一致性' : metric === 'relevance' ? '相关性' : '清晰度'}</span>
                  <span className="font-medium">{value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${metric === 'completeness' ? 'bg-blue-500' : metric === 'accuracy' ? 'bg-green-500' : metric === 'timeliness' ? 'bg-purple-500' : metric === 'consistency' ? 'bg-orange-500' : metric === 'relevance' ? 'bg-pink-500' : 'bg-indigo-500'} h-2 rounded-full`} style={{
                width: `${value}%`
              }}></div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}