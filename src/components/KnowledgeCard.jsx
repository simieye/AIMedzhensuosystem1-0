// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Edit, Trash2, Eye, Star, CheckCircle, AlertCircle } from 'lucide-react';

export function KnowledgeCard({
  knowledge,
  onView,
  onEdit,
  onDelete,
  onVerify
}) {
  const getVerificationColor = status => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getEvolutionColor = stage => {
    switch (stage) {
      case 'optimized':
        return 'text-purple-600 bg-purple-100';
      case 'mature':
        return 'text-blue-600 bg-blue-100';
      case 'growing':
        return 'text-green-600 bg-green-100';
      case 'developing':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  return <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getVerificationColor(knowledge.verificationStatus)}`}>
            {knowledge.verificationStatus === 'verified' ? '已验证' : knowledge.verificationStatus === 'pending' ? '待验证' : '已拒绝'}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getEvolutionColor(knowledge.evolutionStage)}`}>
            {knowledge.evolutionStage === 'optimized' ? '优化' : knowledge.evolutionStage === 'mature' ? '成熟' : knowledge.evolutionStage === 'growing' ? '成长中' : '开发中'}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Button size="sm" variant="outline" onClick={() => onEdit(knowledge.id)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => onDelete(knowledge.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{knowledge.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{knowledge.summary}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>来源: {knowledge.source}</span>
        <span>作者: {knowledge.author}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <span className="text-gray-600">置信度:</span>
          <span className="ml-2 font-medium">{Math.round(knowledge.confidenceScore * 100)}%</span>
        </div>
        <div>
          <span className="text-gray-600">质量评分:</span>
          <span className="ml-2 font-medium">{Math.round(knowledge.qualityScore * 100)}%</span>
        </div>
        <div>
          <span className="text-gray-600">使用频率:</span>
          <span className="ml-2 font-medium">{knowledge.usageFrequency}</span>
        </div>
        <div>
          <span className="text-gray-600">查看次数:</span>
          <span className="ml-2 font-medium">{knowledge.viewCount}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mb-4">
        {knowledge.keywords.slice(0, 3).map((keyword, index) => <span key={index} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
            {keyword}
          </span>)}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm ml-1">{knowledge.feedbackScore}</span>
        </div>
        <Button size="sm" variant="outline" onClick={() => onView(knowledge.id)}>
          <Eye className="w-4 h-4 mr-1" />
          查看详情
        </Button>
      </div>
    </div>;
}