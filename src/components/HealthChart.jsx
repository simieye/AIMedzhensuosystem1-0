// @ts-ignore;
import React from 'react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
export function HealthTrendChart({
  data
}) {
  return <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[70, 100]} />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{
        fill: '#3b82f6',
        r: 6
      }} activeDot={{
        r: 8
      }} />
      </LineChart>
    </ResponsiveContainer>;
}
export function HealthRadarChart({
  data
}) {
  const radarData = data.map(item => ({
    dimension: item.dimension,
    score: item.score,
    fullMark: 100
  }));
  return <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="dimension" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} />
        <Radar name="健康评分" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} strokeWidth={2} />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>;
}
export function HealthScoreDistribution({
  data
}) {
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
  const scoreRanges = [{
    name: '优秀(90-100)',
    value: data.filter(item => item.score >= 90).length,
    color: COLORS[0]
  }, {
    name: '良好(80-89)',
    value: data.filter(item => item.score >= 80 && item.score < 90).length,
    color: COLORS[1]
  }, {
    name: '一般(70-79)',
    value: data.filter(item => item.score >= 70 && item.score < 80).length,
    color: COLORS[2]
  }, {
    name: '需改善(<70)',
    value: data.filter(item => item.score < 70).length,
    color: COLORS[3]
  }];
  return <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={scoreRanges} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label={({
        name,
        value
      }) => `${name}: ${value}`}>
          {scoreRanges.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>;
}