// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Brain, Beaker, TrendingUp, AlertTriangle, CheckCircle, Info, Zap, Target, Activity } from 'lucide-react';

export function AIFormulaRecommendation({
  nadLevel,
  onRecommendationSelect,
  className = ''
}) {
  const {
    toast
  } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [nadHistory, setNadHistory] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  // 模拟NAD+历史数据
  const mockNadHistory = [{
    date: '2024-01-01',
    level: 45.2
  }, {
    date: '2024-01-08',
    level: 46.8
  }, {
    date: '2024-01-15',
    level: 48.1
  }, {
    date: '2024-01-22',
    level: 49.5
  }, {
    date: '2024-01-29',
    level: 51.2
  }, {
    date: '2024-02-05',
    level: 52.8
  }, {
    date: '2024-02-12',
    level: nadLevel || 53.5
  }];
  useEffect(() => {
    setNadHistory(mockNadHistory);
    if (nadLevel) {
      generateRecommendation(nadLevel);
    }
  }, [nadLevel]);
  const generateRecommendation = async currentNadLevel => {
    setIsAnalyzing(true);

    // 模拟AI分析过程
    await new Promise(resolve => setTimeout(resolve, 2000));

    // AI推荐算法
    let recommendedDosage = 250; // 基础剂量
    let frequency = '每日一次';
    let timing = '早餐后';
    let confidence = 85;
    let reasons = [];
    if (currentNadLevel < 40) {
      recommendedDosage = 500;
      frequency = '每日两次';
      timing = '早餐后和晚餐前';
      confidence = 92;
      reasons.push('NAD+水平偏低，需要强化补充');
      reasons.push('建议分次服用提高吸收率');
    } else if (currentNadLevel < 50) {
      recommendedDosage = 350;
      frequency = '每日一次';
      timing = '早餐后';
      confidence = 88;
      reasons.push('NAD+水平略低，需要适量补充');
    } else if (currentNadLevel < 60) {
      recommendedDosage = 250;
      frequency = '每日一次';
      timing = '早餐后';
      confidence = 85;
      reasons.push('NAD+水平正常，维持当前剂量');
    } else {
      recommendedDosage = 150;
      frequency = '隔日一次';
      timing = '早餐后';
      confidence = 78;
      reasons.push('NAD+水平良好，可减少剂量维持');
    }
    const recommendationData = {
      currentNadLevel,
      recommendedDosage,
      frequency,
      timing,
      confidence,
      reasons,
      expectedImprovement: calculateExpectedImprovement(currentNadLevel, recommendedDosage),
      sideEffects: getSideEffects(recommendedDosage),
      interactions: getInteractions(),
      duration: '建议持续12周后重新检测',
      cost: calculateCost(recommendedDosage, frequency),
      products: getRecommendedProducts(recommendedDosage)
    };
    setRecommendation(recommendationData);
    setIsAnalyzing(false);
    toast({
      title: "AI分析完成",
      description: `基于您的NAD+水平${currentNadLevel}mg/dL，推荐剂量为${recommendedDosage}mg`
    });
  };
  const calculateExpectedImprovement = (currentLevel, dosage) => {
    const baseImprovement = dosage * 0.08; // 每mg剂量提升0.08mg/dL
    const expectedLevel = Math.min(currentLevel + baseImprovement, 80);
    return {
      current: currentLevel,
      expected: expectedLevel,
      improvement: expectedLevel - currentLevel,
      timeframe: '4-6周'
    };
  };
  const getSideEffects = dosage => {
    const effects = [];
    if (dosage >= 500) {
      effects.push('可能出现轻微头痛（适应期1-2周）');
      effects.push('建议随餐服用减少胃部不适');
    }
    if (dosage >= 350) {
      effects.push('部分用户可能出现轻微失眠');
      effects.push('建议避免晚间服用');
    }
    if (dosage <= 150) {
      effects.push('副作用风险极低');
    }
    return effects.length > 0 ? effects : ['副作用风险极低，耐受性良好'];
  };
  const getInteractions = () => {
    return ['避免与咖啡因同时服用（可能影响吸收）', '可与维生素D3协同服用（提高效果）', '服用期间避免饮酒（可能增加肝脏负担）'];
  };
  const calculateCost = (dosage, frequency) => {
    const monthlyDosage = dosage * (frequency === '每日两次' ? 60 : frequency === '每日一次' ? 30 : 15);
    const pricePerMg = 0.15; // 每mg价格
    return {
      monthly: monthlyDosage * pricePerMg,
      daily: dosage * pricePerMg * (frequency === '每日两次' ? 2 : 1),
      yearly: monthlyDosage * pricePerMg * 12
    };
  };
  const getRecommendedProducts = dosage => {
    const products = [];
    if (dosage === 150) {
      products.push({
        id: 'nmn-150',
        name: 'NMN 150mg 胶囊',
        specification: '150mg × 60粒',
        price: 1350,
        duration: '2个月',
        rating: 4.8,
        reviews: 2341
      });
    } else if (dosage === 250) {
      products.push({
        id: 'nmn-250',
        name: 'NMN 250mg 胶囊',
        specification: '250mg × 60粒',
        price: 2250,
        duration: '2个月',
        rating: 4.9,
        reviews: 5678
      });
    } else if (dosage === 350) {
      products.push({
        id: 'nmn-350',
        name: 'NMN 350mg 胶囊',
        specification: '350mg × 60粒',
        price: 3150,
        duration: '2个月',
        rating: 4.7,
        reviews: 1234
      });
    } else if (dosage === 500) {
      products.push({
        id: 'nmn-500',
        name: 'NMN 500mg 胶囊',
        specification: '500mg × 60粒',
        price: 4500,
        duration: '2个月',
        rating: 4.6,
        reviews: 892
      });
    }
    return products;
  };
  const getNadLevelStatus = level => {
    if (level < 40) return {
      status: '偏低',
      color: 'text-red-600 bg-red-100',
      icon: AlertTriangle
    };
    if (level < 50) return {
      status: '略低',
      color: 'text-yellow-600 bg-yellow-100',
      icon: TrendingUp
    };
    if (level < 60) return {
      status: '正常',
      color: 'text-green-600 bg-green-100',
      icon: CheckCircle
    };
    return {
      status: '良好',
      color: 'text-blue-600 bg-blue-100',
      icon: Activity
    };
  };
  const handleSelectProduct = product => {
    onRecommendationSelect?.({
      ...recommendation,
      selectedProduct: product
    });
    toast({
      title: "已选择产品",
      description: `已选择${product.name}，即将进入下单流程`
    });
  };
  const nadStatus = getNadLevelStatus(nadLevel || 53.5);
  return <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="w-5 h-5 mr-2 text-blue-600" />
          AI智能配方推荐
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* NAD+水平状态 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Beaker className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">当前NAD+水平</h3>
                <p className="text-sm text-gray-600">基于最新检测结果</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{nadLevel || 53.5}</div>
              <div className="text-sm text-gray-600">mg/dL</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${nadStatus.color}`}>
              <nadStatus.icon className="w-4 h-4 mr-1 inline" />
              {nadStatus.status}
            </span>
            <span className="text-sm text-gray-600">
              参考范围：40-60 mg/dL
            </span>
          </div>
        </div>

        {/* AI分析中状态 */}
        {isAnalyzing && <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">AI正在分析您的NAD+水平并生成个性化方案...</p>
          </div>}

        {/* 推荐结果 */}
        {recommendation && !isAnalyzing && <div className="space-y-6">
            {/* 推荐方案概览 */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                AI推荐方案
              </h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{recommendation.recommendedDosage}</div>
                  <div className="text-sm text-gray-600">推荐剂量(mg)</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-800">{recommendation.frequency}</div>
                  <div className="text-sm text-gray-600">服用频率</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-800">{recommendation.timing}</div>
                  <div className="text-sm text-gray-600">服用时间</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{recommendation.confidence}%</div>
                  <div className="text-sm text-gray-600">置信度</div>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-green-800">推荐理由：</h5>
                <ul className="space-y-1">
                  {recommendation.reasons.map((reason, index) => <li key={index} className="flex items-start space-x-2 text-sm text-green-700">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{reason}</span>
                    </li>)}
                </ul>
              </div>
            </div>

            {/* 预期效果 */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h5 className="font-semibold text-blue-800 mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                预期改善效果
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">当前水平</p>
                  <p className="text-xl font-bold text-gray-800">{recommendation.expectedImprovement.current}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">预期水平</p>
                  <p className="text-xl font-bold text-green-600">{recommendation.expectedImprovement.expected}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">提升幅度</p>
                  <p className="text-xl font-bold text-blue-600">+{recommendation.expectedImprovement.improvement.toFixed(1)}</p>
                </div>
              </div>
              <p className="text-sm text-blue-700 mt-2 text-center">
                预期在{recommendation.expectedImprovement.timeframe}内达到
              </p>
            </div>

            {/* 注意事项 */}
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h5 className="font-semibold text-yellow-800 mb-3 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                注意事项
              </h5>
              <div className="space-y-3">
                <div>
                  <h6 className="font-medium text-yellow-700 mb-1">可能的副作用：</h6>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {recommendation.sideEffects.map((effect, index) => <li key={index} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>{effect}</span>
                      </li>)}
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-yellow-700 mb-1">药物相互作用：</h6>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {recommendation.interactions.map((interaction, index) => <li key={index} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>{interaction}</span>
                      </li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* 推荐产品 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">推荐产品</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendation.products.map(product => <Card key={product.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h5 className="font-semibold text-gray-800">{product.name}</h5>
                          <p className="text-sm text-gray-600">{product.specification}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-red-600">¥{product.price}</div>
                          <div className="text-xs text-gray-500">{product.duration}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => <span key={i} className={i < Math.floor(product.rating) ? '★' : '☆'}>
                                ★
                              </span>)}
                          </div>
                          <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">{product.reviews}条评价</span>
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleSelectProduct(product)}>
                        选择此产品
                      </Button>
                    </CardContent>
                  </Card>)}
              </div>
            </div>

            {/* 详细信息切换 */}
            <div className="text-center">
              <Button variant="outline" onClick={() => setShowDetails(!showDetails)} className="text-blue-600 border-blue-200">
                {showDetails ? '收起' : '查看'}详细信息
              </Button>
            </div>

            {/* 详细信息 */}
            {showDetails && <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">费用分析</h5>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-gray-600">日费用</p>
                      <p className="font-semibold">¥{recommendation.cost.daily.toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">月费用</p>
                      <p className="font-semibold">¥{recommendation.cost.monthly.toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">年费用</p>
                      <p className="font-semibold">¥{recommendation.cost.yearly.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">服用建议</h5>
                  <p className="text-sm text-gray-700">
                    {recommendation.duration}，建议定期监测NAD+水平变化，
                    根据改善情况调整剂量。如有任何不适，请及时咨询专业医师。
                  </p>
                </div>
              </div>}
          </div>}
      </CardContent>
    </div>;
}