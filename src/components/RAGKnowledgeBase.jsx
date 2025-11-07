// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { BookOpen, ExternalLink, Search, Filter, TrendingUp, Users, Star, Clock, ChevronRight, Database, Brain } from 'lucide-react';

export function RAGKnowledgeBase({
  symptoms,
  diagnosis,
  onRecommendationSelect
}) {
  const {
    toast
  } = useToast();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    if (symptoms || diagnosis) {
      generateRecommendations();
    }
  }, [symptoms, diagnosis]);
  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      // 模拟RAG检索过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockRecommendations = [{
        id: 1,
        title: '心血管疾病预防与管理的最新进展',
        authors: ['张明华', '李晓明', '王建军'],
        journal: '中华心血管病杂志',
        year: 2024,
        doi: '10.3760/cma.j.cn.112148-20240115-00123',
        abstract: '本文综述了近年来心血管疾病预防与管理的最新研究进展，包括生活方式干预、药物治疗、新型治疗技术等方面的突破性发现。研究表明，通过综合干预措施，心血管疾病的发病率可降低30-40%...',
        category: 'cardiology',
        relevanceScore: 0.95,
        citationCount: 156,
        openAccess: true,
        keyFindings: ['综合干预可降低发病率30-40%', '生活方式干预是基础', '新型药物显示良好效果'],
        recommendations: ['建议进行心血管风险评估', '考虑生活方式干预计划', '定期监测相关指标']
      }, {
        id: 2,
        title: '血脂异常管理的临床实践指南（2024版）',
        authors: ['中华医学会内分泌学分会'],
        journal: '中华内分泌代谢杂志',
        year: 2024,
        doi: '10.3760/cma.j.cn.311282-20240220-00045',
        abstract: '本指南基于最新的循证医学证据，为血脂异常的诊断、治疗和管理提供了全面的临床指导。指南强调了个体化治疗的重要性，并提供了具体的药物选择和剂量调整建议...',
        category: 'endocrinology',
        relevanceScore: 0.92,
        citationCount: 89,
        openAccess: true,
        keyFindings: ['个体化治疗方案效果更佳', '新型降脂药物安全性良好', '生活方式干预仍为基础'],
        recommendations: ['根据指南调整治疗方案', '定期监测血脂水平', '加强生活方式管理']
      }, {
        id: 3,
        title: '人工智能在医疗诊断中的应用与挑战',
        authors: ['刘志强', '陈晓华', '赵文静'],
        journal: '中国医学影像技术',
        year: 2024,
        doi: '10.13929/j.issn.1003-3289.2024.01.015',
        abstract: '随着人工智能技术的快速发展，AI在医疗诊断领域的应用越来越广泛。本文系统回顾了AI在各种疾病诊断中的应用现状，分析了其优势、局限性及未来发展方向...',
        category: 'ai_medicine',
        relevanceScore: 0.78,
        citationCount: 67,
        openAccess: false,
        keyFindings: ['AI诊断准确率可达95%以上', '需要结合临床判断', '数据质量是关键因素'],
        recommendations: ['可考虑AI辅助诊断', '重视数据质量控制', '保持临床警惕性']
      }, {
        id: 4,
        title: '慢性疲劳综合征的综合治疗策略',
        authors: ['王丽华', '张建国', '李秀英'],
        journal: '中华全科医学',
        year: 2023,
        doi: '10.3760/cma.j.issn.1007-9572.2023.12.008',
        abstract: '慢性疲劳综合征是一种常见的功能性紊乱，严重影响患者的生活质量。本文探讨了基于循证医学的综合治疗策略，包括药物治疗、心理干预、生活方式调整等多维度干预方案...',
        category: 'neurology',
        relevanceScore: 0.85,
        citationCount: 45,
        openAccess: true,
        keyFindings: ['综合治疗效果优于单一治疗', '心理干预重要性突出', '需要长期管理'],
        recommendations: ['采用综合治疗方案', '重视心理健康', '建立长期管理计划']
      }];
      setRecommendations(mockRecommendations);
    } catch (error) {
      toast({
        title: "检索失败",
        description: "知识库检索失败，请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const categories = [{
    id: 'all',
    name: '全部',
    icon: Database
  }, {
    id: 'cardiology',
    name: '心血管',
    icon: Heart
  }, {
    id: 'endocrinology',
    name: '内分泌',
    icon: Brain
  }, {
    id: 'neurology',
    name: '神经科',
    icon: Users
  }, {
    id: 'ai_medicine',
    name: 'AI医疗',
    icon: TrendingUp
  }];
  const filteredRecommendations = recommendations.filter(rec => {
    const matchesCategory = selectedCategory === 'all' || rec.category === selectedCategory;
    const matchesSearch = !searchQuery || rec.title.toLowerCase().includes(searchQuery.toLowerCase()) || rec.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const getCategoryColor = category => {
    switch (category) {
      case 'cardiology':
        return 'text-red-600 bg-red-100';
      case 'endocrinology':
        return 'text-blue-600 bg-blue-100';
      case 'neurology':
        return 'text-purple-600 bg-purple-100';
      case 'ai_medicine':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getCategoryName = category => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.name : '其他';
  };
  const handleRecommendationClick = recommendation => {
    onRecommendationSelect?.(recommendation);
    toast({
      title: "已选择文献",
      description: `已选择《${recommendation.title}》`
    });
  };
  const handleSearch = () => {
    // 触发搜索
    generateRecommendations();
  };
  return <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            RAG知识库推荐
          </CardTitle>
          <Button variant="outline" size="sm" onClick={generateRecommendations} disabled={isLoading}>
            <Search className="w-4 h-4 mr-2" />
            重新检索
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 搜索和筛选 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="搜索医学文献..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex gap-2">
            {categories.map(category => {
            const Icon = category.icon;
            return <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>;
          })}
          </div>
        </div>

        {/* 加载状态 */}
        {isLoading && <div className="flex items-center justify-center p-8 bg-blue-50 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
            <div>
              <p className="text-blue-800 font-semibold">正在检索知识库...</p>
              <p className="text-blue-600 text-sm">AI正在分析最新医学文献</p>
            </div>
          </div>}

        {/* 推荐结果 */}
        {!isLoading && filteredRecommendations.length > 0 && <div className="space-y-4">
            {filteredRecommendations.map(recommendation => <div key={recommendation.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleRecommendationClick(recommendation)}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
                      {recommendation.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span>{recommendation.journal}</span>
                      <span>{recommendation.year}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(recommendation.category)}`}>
                        {getCategoryName(recommendation.category)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span>{recommendation.relevanceScore.toFixed(2)}</span>
                    </div>
                    {recommendation.openAccess && <span className="text-green-600 text-xs">开放获取</span>}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {recommendation.abstract}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      <span>{recommendation.authors.slice(0, 2).join(', ')}{recommendation.authors.length > 2 ? '等' : ''}</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      <span>引用 {recommendation.citationCount}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>DOI: {recommendation.doi}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    查看全文
                  </Button>
                </div>

                {/* 关键发现 */}
                {recommendation.keyFindings && recommendation.keyFindings.length > 0 && <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2 text-sm">关键发现</h4>
                    <ul className="space-y-1">
                      {recommendation.keyFindings.map((finding, index) => <li key={index} className="text-sm text-blue-700 flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>{finding}</span>
                        </li>)}
                    </ul>
                  </div>}

                {/* 推荐建议 */}
                {recommendation.recommendations && recommendation.recommendations.length > 0 && <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2 text-sm">临床建议</h4>
                    <ul className="space-y-1">
                      {recommendation.recommendations.map((rec, index) => <li key={index} className="text-sm text-green-700 flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>{rec}</span>
                        </li>)}
                    </ul>
                  </div>}
              </div>)}
          </div>}

        {/* 无结果 */}
        {!isLoading && filteredRecommendations.length === 0 && <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">暂无相关文献</h3>
            <p className="text-gray-500">请尝试调整搜索条件或重新检索</p>
          </div>}
      </CardContent>
    </Card>;
}