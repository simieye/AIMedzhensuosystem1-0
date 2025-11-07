// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Brain, Sparkles, TrendingUp, Shield, Target, Heart, Activity, Zap, ChevronRight, Star, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export function AIFormulaRecommendation({
  userData,
  onFormulaSelect,
  onCustomize
}) {
  const {
    toast
  } = useToast();
  const [recommendations, setRecommendations] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [analysisResult, setAnalysisResult] = useState(null);
  useEffect(() => {
    generateRecommendations();
  }, [userData]);
  const generateRecommendations = async () => {
    setIsAnalyzing(true);
    try {
      // 模拟AI分析过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockAnalysis = {
        healthScore: userData?.healthScore || 75,
        primaryNeeds: ['抗衰老', '免疫力提升', '精力改善'],
        riskFactors: ['氧化应激', '炎症水平', '代谢缓慢'],
        recommendedIngredients: ['NMN', '辅酶Q10', '维生素D3', 'Omega-3'],
        confidence: 92
      };
      setAnalysisResult(mockAnalysis);
      const mockRecommendations = [{
        id: 1,
        name: 'NMN细胞活化精华',
        category: 'anti_aging',
        price: 2880,
        originalPrice: 3680,
        rating: 4.9,
        sales: 15234,
        matchScore: 95,
        ingredients: ['NMN 300mg', '白藜芦醇', '维生素E'],
        benefits: ['激活长寿蛋白', '提升细胞能量', '延缓衰老'],
        suitableFor: '30岁以上人群，特别是关注抗衰老的用户',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop',
        tags: ['热销', 'AI推荐'],
        patent: 'ZL202310123456.7',
        description: '基于最新NAD+前体技术，高效激活细胞能量代谢'
      }, {
        id: 2,
        name: '免疫增强复合配方',
        category: 'immunity',
        price: 1980,
        originalPrice: 2580,
        rating: 4.8,
        sales: 8921,
        matchScore: 88,
        ingredients: ['维生素C', '锌', '硒', '维生素D3'],
        benefits: ['增强免疫力', '抗氧化', '提升抵抗力'],
        suitableFor: '免疫力低下人群，易感冒用户',
        image: 'https://images.unsplash.com/photo-1574171332299-0d2a4f0a6c63?w=300&h=300&fit=crop',
        tags: ['AI推荐'],
        patent: 'ZL202310234567.8',
        description: '科学配比免疫营养素，全面提升机体防御能力'
      }, {
        id: 3,
        name: '精力提升能量配方',
        category: 'energy',
        price: 1680,
        originalPrice: 2180,
        rating: 4.7,
        sales: 6789,
        matchScore: 82,
        ingredients: ['辅酶Q10', 'B族维生素', '镁', '人参提取物'],
        benefits: ['提升精力', '改善疲劳', '增强体力'],
        suitableFor: '工作压力大，易疲劳人群',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop',
        tags: ['新品', 'AI推荐'],
        patent: 'ZL202310345678.9',
        description: '天然草本精华结合现代营养学，快速恢复体力'
      }, {
        id: 4,
        name: '定制化营养套餐',
        category: 'custom',
        price: 3880,
        originalPrice: 4880,
        rating: 5.0,
        sales: 3456,
        matchScore: 98,
        ingredients: ['个性化配方', '根据检测数据定制'],
        benefits: ['个性化营养', '精准补充', '效果最大化'],
        suitableFor: '追求个性化健康管理的高端用户',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop',
        tags: ['定制', 'AI推荐', '高端'],
        patent: 'ZL202310456789.0',
        description: '基于您的健康数据AI定制的专属营养方案'
      }];
      setRecommendations(mockRecommendations);
      toast({
        title: "AI分析完成",
        description: `为您推荐了${mockRecommendations.length}款个性化配方`
      });
    } catch (error) {
      toast({
        title: "分析失败",
        description: "AI分析失败，请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  const categories = [{
    id: 'all',
    name: '全部',
    icon: Sparkles
  }, {
    id: 'anti_aging',
    name: '抗衰老',
    icon: Clock
  }, {
    id: 'immunity',
    name: '免疫力',
    icon: Shield
  }, {
    id: 'energy',
    name: '精力',
    icon: Zap
  }, {
    id: 'custom',
    name: '定制',
    icon: Target
  }];
  const filteredRecommendations = selectedCategory === 'all' ? recommendations : recommendations.filter(r => r.category === selectedCategory);
  const getCategoryColor = category => {
    switch (category) {
      case 'anti_aging':
        return 'text-purple-600 bg-purple-100';
      case 'immunity':
        return 'text-green-600 bg-green-100';
      case 'energy':
        return 'text-yellow-600 bg-yellow-100';
      case 'custom':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const handleFormulaSelect = formula => {
    onFormulaSelect?.(formula);
    toast({
      title: "已选择配方",
      description: `已选择"${formula.name}"`
    });
  };
  const handleCustomize = () => {
    onCustomize?.();
  };
  return <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            AI定制配方推荐
          </CardTitle>
          <Button variant="outline" size="sm" onClick={generateRecommendations} disabled={isAnalyzing}>
            {isAnalyzing ? <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                分析中...
              </> : <>
                <Sparkles className="w-4 h-4 mr-2" />
                重新分析
              </>}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI分析结果 */}
        {analysisResult && <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-800">AI健康分析</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{analysisResult.healthScore}</div>
                <div className="text-sm text-gray-600">健康评分</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{analysisResult.confidence}%</div>
                <div className="text-sm text-gray-600">推荐置信度</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{analysisResult.primaryNeeds.length}</div>
                <div className="text-sm text-gray-600">主要需求</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{analysisResult.recommendedIngredients.length}</div>
                <div className="text-sm text-gray-600">推荐成分</div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">主要需求:</span>
                <span className="text-sm text-gray-600">{analysisResult.primaryNeeds.join('、')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">关注因素:</span>
                <span className="text-sm text-gray-600">{analysisResult.riskFactors.join('、')}</span>
              </div>
            </div>
          </div>}

        {/* 分类筛选 */}
        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          {categories.map(category => {
          const Icon = category.icon;
          return <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>;
        })}
        </div>

        {/* 加载状态 */}
        {isAnalyzing && <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">AI正在分析您的健康数据...</p>
              <p className="text-sm text-gray-500 mt-1">生成个性化推荐配方</p>
            </div>
          </div>}

        {/* 推荐配方列表 */}
        {!isAnalyzing && filteredRecommendations.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecommendations.map(formula => <Card key={formula.id} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => handleFormulaSelect(formula)}>
                <div className="relative">
                  <img src={formula.image} alt={formula.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {formula.tags.map((tag, index) => <span key={index} className={`px-2 py-1 rounded-full text-xs font-medium ${tag === 'AI推荐' ? 'bg-blue-600 text-white' : tag === '热销' ? 'bg-red-600 text-white' : tag === '新品' ? 'bg-green-600 text-white' : tag === '定制' ? 'bg-purple-600 text-white' : 'bg-gray-600 text-white'}`}>
                        {tag}
                      </span>)}
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{formula.rating}</span>
                    </div>
                  </div>
                  {formula.matchScore >= 90 && <div className="absolute bottom-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" />
                    匹配度{formula.matchScore}%
                  </div>}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {formula.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {formula.description}
                  </p>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">适合人群:</span>
                      <span className="text-gray-800">{formula.suitableFor}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">销量:</span>
                      <span className="text-gray-800">{formula.sales.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-red-600">¥{formula.price}</span>
                        <span className="text-sm text-gray-400 line-through">¥{formula.originalPrice}</span>
                      </div>
                      <div className="text-xs text-green-600">
                        节省¥{formula.originalPrice - formula.price}
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(formula.category)}`}>
                      {categories.find(c => c.id === formula.category)?.name}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1" onClick={e => {
                e.stopPropagation();
                handleFormulaSelect(formula);
              }}>
                      立即购买
                    </Button>
                    {formula.category === 'custom' && <Button size="sm" variant="outline" onClick={e => {
                e.stopPropagation();
                handleCustomize();
              }}>
                      定制
                    </Button>}
                  </div>
                </CardContent>
              </Card>)}
          </div>}

        {/* 定制配方入口 */}
        <div className="text-center py-8">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
            <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">需要更精准的配方？</h3>
            <p className="text-gray-600 mb-6">基于您的检测数据，AI为您定制专属营养方案</p>
            <Button onClick={handleCustomize} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Brain className="w-4 h-4 mr-2" />
              开始定制
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>;
}