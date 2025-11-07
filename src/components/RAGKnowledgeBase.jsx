// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { BookOpen, FileText, Search, TrendingUp, AlertTriangle, Pill, FlaskConical, Users, ExternalLink, Clock, Star, ChevronRight, Brain, Lightbulb } from 'lucide-react';

export function RAGKnowledgeBase({
  healthData,
  onRecommendationSelect,
  className = ''
}) {
  const {
    toast
  } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = [{
    id: 'all',
    name: '全部',
    icon: BookOpen
  }, {
    id: 'uric_acid',
    name: '尿酸管理',
    icon: TrendingUp
  }, {
    id: 'traditional_medicine',
    name: '中医方案',
    icon: FlaskConical
  }, {
    id: 'clinical_guidelines',
    name: '临床指南',
    icon: FileText
  }, {
    id: 'research',
    name: '最新研究',
    icon: Search
  }];
  const mockKnowledgeBase = {
    uric_acid: [{
      id: 'UA001',
      title: '高尿酸血症的中医辨证论治',
      authors: ['张中医', '李华佗'],
      journal: '中医杂志',
      year: 2023,
      impactFactor: 2.8,
      abstract: '高尿酸血症是现代常见代谢性疾病，中医认为其发病机制主要与脾肾功能失调、湿热内蕴有关。本研究通过临床观察发现，采用清热利湿、健脾补肾的方法治疗高尿酸血症具有显著效果...',
      keyFindings: ['中医辨证分型治疗有效率85.6%', '汉方清幽方剂降低尿酸效果显著', '副作用少，患者依从性高'],
      recommendations: [{
        name: '汉方清幽方案',
        type: 'treatment',
        description: '基于中医经典方剂改良，包含黄柏、苍术、薏苡仁等成分',
        efficacy: '降低尿酸30-40%，改善症状',
        duration: '8周为一个疗程',
        price: '¥1,280/疗程'
      }],
      riskLevel: 'moderate',
      confidence: 0.92
    }, {
      id: 'UA002',
      title: '尿酸与心血管疾病关联性研究',
      authors: ['王心血管', '刘代谢'],
      journal: '中华心血管病杂志',
      year: 2023,
      impactFactor: 3.2,
      abstract: '大规模队列研究显示，高尿酸血症是心血管疾病的独立危险因素。尿酸水平每增加1mg/dL，心血管事件风险增加12%。控制尿酸水平对预防心血管疾病具有重要意义...',
      keyFindings: ['尿酸水平与心血管风险呈正相关', '降尿酸治疗可降低心血管事件发生率', '建议将尿酸控制在6.0mg/dL以下'],
      recommendations: [{
        name: '综合管理方案',
        type: 'lifestyle',
        description: '结合饮食控制、运动干预和药物治疗',
        efficacy: '全面降低心血管风险',
        duration: '长期坚持',
        price: '个性化定制'
      }],
      riskLevel: 'high',
      confidence: 0.88
    }],
    traditional_medicine: [{
      id: 'TM001',
      title: '汉方清幽方的临床应用研究',
      authors: ['中医研究院专家组'],
      journal: '中医临床研究',
      year: 2024,
      impactFactor: 2.1,
      abstract: '汉方清幽方是基于传统中医理论研制的治疗高尿酸血症的复方制剂。该方剂由黄柏、苍术、薏苡仁、茯苓、泽泻等多味中药组成，具有清热利湿、健脾补肾的功效...',
      keyFindings: ['总有效率87.3%', '尿酸平均下降35.2%', '症状改善率92.1%', '不良反应发生率<2%'],
      recommendations: [{
        name: '汉方清幽方案',
        type: 'treatment',
        description: '标准化中药配方，个体化剂量调整',
        efficacy: '显著降低尿酸，改善肾功能',
        duration: '6-8周',
        price: '¥1,580/疗程'
      }],
      riskLevel: 'low',
      confidence: 0.95
    }],
    clinical_guidelines: [{
      id: 'CG001',
      title: '中国高尿酸血症诊疗指南(2023版)',
      authors: ['中华医学会内分泌学分会'],
      journal: '中华内分泌代谢杂志',
      year: 2023,
      impactFactor: 4.1,
      abstract: '最新版诊疗指南基于循证医学证据，对高尿酸血症的诊断、治疗和随访提出了明确建议。指南强调个体化治疗和综合管理的重要性...',
      keyFindings: ['更新诊断标准', '强调早期干预', '推荐目标值<6.0mg/dL', '注重生活方式干预'],
      recommendations: [{
        name: '标准化诊疗流程',
        type: 'guideline',
        description: '按照指南推荐的标准化诊疗路径',
        efficacy: '规范化治疗，提高疗效',
        duration: '长期管理',
        price: '医保覆盖'
      }],
      riskLevel: 'low',
      confidence: 0.98
    }],
    research: [{
      id: 'RS001',
      title: '新型降尿酸药物的临床试验结果',
      authors: ['国际多中心研究组'],
      journal: '新英格兰医学杂志',
      year: 2024,
      impactFactor: 5.8,
      abstract: '最新研究显示，新型选择性尿酸转运蛋白抑制剂在降低尿酸方面显示出优异效果，且具有良好的安全性。该药物为高尿酸血症患者提供了新的治疗选择...',
      keyFindings: ['新型药物降尿酸效果显著', '副作用发生率低', '患者依从性好', '长期安全性良好'],
      recommendations: [{
        name: '新药物治疗方案',
        type: 'medication',
        description: '最新研发的靶向药物治疗',
        efficacy: '强效降尿酸，安全性高',
        duration: '按需调整',
        price: '¥3,200/月'
      }],
      riskLevel: 'moderate',
      confidence: 0.85
    }]
  };
  useEffect(() => {
    // 根据健康数据初始化推荐
    if (healthData && healthData.uricAcid && healthData.uricAcid > 7.0) {
      handleSearch('尿酸偏高');
    }
  }, [healthData]);
  const handleSearch = async query => {
    setIsSearching(true);
    setSearchQuery(query);

    // 模拟RAG检索过程
    await new Promise(resolve => setTimeout(resolve, 1500));
    let results = [];
    const lowerQuery = query.toLowerCase();

    // 根据查询内容筛选相关知识
    if (lowerQuery.includes('尿酸') || lowerQuery.includes('gout')) {
      results = [...mockKnowledgeBase.uric_acid, ...mockKnowledgeBase.traditional_medicine];
    } else if (lowerQuery.includes('中医') || lowerQuery.includes('汉方')) {
      results = mockKnowledgeBase.traditional_medicine;
    } else if (lowerQuery.includes('指南') || lowerQuery.includes('诊疗')) {
      results = mockKnowledgeBase.clinical_guidelines;
    } else {
      // 默认返回所有内容
      results = Object.values(mockKnowledgeBase).flat();
    }

    // 按相关性和置信度排序
    results.sort((a, b) => b.confidence - a.confidence);
    setRecommendations(results.slice(0, 6));
    setIsSearching(false);
    toast({
      title: "检索完成",
      description: `找到${results.length}条相关医学文献`
    });
  };
  const handleCategoryChange = category => {
    setSelectedCategory(category);
    if (category === 'all') {
      setRecommendations(Object.values(mockKnowledgeBase).flat().slice(0, 6));
    } else {
      setRecommendations(mockKnowledgeBase[category] || []);
    }
  };
  const getRiskLevelColor = level => {
    switch (level) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getRiskLevelText = level => {
    switch (level) {
      case 'low':
        return '低风险';
      case 'moderate':
        return '中等风险';
      case 'high':
        return '高风险';
      default:
        return '未知';
    }
  };
  return <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="w-5 h-5 mr-2 text-blue-600" />
          RAG医学知识库
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch(searchQuery)} placeholder="搜索医学文献、治疗方案..." className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <Button onClick={() => handleSearch(searchQuery)} disabled={isSearching} className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700">
            {isSearching ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <Search className="w-4 h-4" />}
          </Button>
        </div>

        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => {
          const Icon = category.icon;
          return <button key={category.id} onClick={() => handleCategoryChange(category.id)} className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${selectedCategory === category.id ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-gray-300 hover:border-gray-400'}`}>
              <Icon className="w-4 h-4" />
              <span className="text-sm">{category.name}</span>
            </button>;
        })}
        </div>

        {/* 推荐内容 */}
        <div className="space-y-4">
          {isSearching ? <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
              <span className="text-gray-600">AI正在检索最新医学文献...</span>
            </div> : recommendations.length > 0 ? recommendations.map(item => <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.authors.join(', ')} • {item.journal} • {item.year}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          IF: {item.impactFactor}
                        </span>
                        <span className={`px-2 py-1 rounded ${getRiskLevelColor(item.riskLevel)}`}>
                          {getRiskLevelText(item.riskLevel)}
                        </span>
                        <span className="flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          置信度: {(item.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 line-clamp-3">{item.abstract}</p>
                  </div>
                  
                  <div className="mb-3">
                    <h5 className="text-sm font-medium text-gray-800 mb-2">关键发现：</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {item.keyFindings.map((finding, index) => <li key={index} className="flex items-start space-x-2">
                          <ChevronRight className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{finding}</span>
                        </li>)}
                    </ul>
                  </div>
                  
                  {item.recommendations && item.recommendations.length > 0 && <div className="bg-blue-50 rounded-lg p-3">
                      <h5 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                        <Lightbulb className="w-4 h-4 mr-2" />
                        推荐方案
                      </h5>
                      {item.recommendations.map((rec, index) => <div key={index} className="mb-3 last:mb-0">
                          <div className="flex items-center justify-between mb-1">
                            <h6 className="font-medium text-blue-800">{rec.name}</h6>
                            <span className="text-sm text-blue-600">{rec.price}</span>
                          </div>
                          <p className="text-sm text-blue-700 mb-1">{rec.description}</p>
                          <div className="flex items-center justify-between text-xs text-blue-600">
                            <span>疗效: {rec.efficacy}</span>
                            <span>疗程: {rec.duration}</span>
                          </div>
                          <Button size="sm" className="mt-2 w-full bg-blue-600 hover:bg-blue-700" onClick={() => onRecommendationSelect?.(rec)}>
                            选择此方案
                          </Button>
                        </div>)}
                    </div>}
                </CardContent>
              </Card>) : <div className="text-center py-8">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">暂无相关文献</p>
              <p className="text-sm text-gray-500 mt-2">请尝试其他搜索关键词</p>
            </div>}
        </div>
      </CardContent>
    </div>;
}