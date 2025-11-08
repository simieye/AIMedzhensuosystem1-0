// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { BookOpen, CheckCircle, Users, Star, TrendingUp, ThumbsUp } from 'lucide-react';

export function KnowledgeStats({
  stats
}) {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{stats?.totalKnowledge || 0}</h3>
          <p className="text-gray-600 text-sm">知识条目</p>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            活跃增长
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+3.2%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{Math.round((stats?.averageQualityScore || 0) * 100)}%</h3>
          <p className="text-gray-600 text-sm">平均质量</p>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
            质量提升
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-purple-600 font-medium">+8.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{stats?.newKnowledgeThisMonth || 0}</h3>
          <p className="text-gray-600 text-sm">本月新增</p>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <TrendingUp className="w-4 h-4 text-purple-500 mr-2" />
            持续增长
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm text-orange-600 font-medium">{stats?.userSatisfactionRate || 0}</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{stats?.userSatisfactionRate || 0}</h3>
          <p className="text-gray-600 text-sm">用户评分</p>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <ThumbsUp className="w-4 h-4 text-orange-500 mr-2" />
            高度满意
          </div>
        </CardContent>
      </Card>
    </div>;
}