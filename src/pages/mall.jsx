// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger, useToast } from '@/components/ui';
// @ts-ignore;
import { ShoppingBag, Search, Filter, Star, Heart, ShoppingCart, Brain, Zap, Shield, Award, TrendingUp, Package, Truck, Headphones } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { AIFormulaRecommendation } from '@/components/AIFormulaRecommendation';
// @ts-ignore;
import { RPAOneClickOrder } from '@/components/RPAOneClickOrder';
// @ts-ignore;
import { PatentTooltip } from '@/components/PatentTooltip';
// @ts-ignore;
import { VoicePurchase } from '@/components/VoicePurchase';
export default function Mall(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showVoicePurchase, setShowVoicePurchase] = useState(false);
  const [userHealthData, setUserHealthData] = useState(null);
  useEffect(() => {
    // 模拟加载用户健康数据
    const mockHealthData = {
      healthScore: 85,
      age: 35,
      gender: 'male',
      healthGoals: ['抗衰老', '免疫力提升'],
      healthIssues: ['易疲劳', '睡眠质量一般'],
      preferences: ['天然成分', '无副作用']
    };
    setUserHealthData(mockHealthData);

    // 模拟加载产品数据
    const mockProducts = [{
      id: 1,
      name: 'NMN细胞活化精华',
      category: 'anti_aging',
      price: 2880,
      originalPrice: 3680,
      rating: 4.9,
      sales: 15234,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop',
      description: '基于最新NAD+前体技术，高效激活细胞能量代谢',
      benefits: ['激活长寿蛋白', '提升细胞能量', '延缓衰老'],
      ingredients: ['NMN 300mg', '白藜芦醇', '维生素E'],
      suitableFor: '30岁以上人群',
      stock: 156,
      tags: ['热销', 'AI推荐'],
      patent: 'ZL202310123456.7',
      featured: true
    }, {
      id: 2,
      name: '免疫增强复合配方',
      category: 'immunity',
      price: 1980,
      originalPrice: 2580,
      rating: 4.8,
      sales: 8921,
      image: 'https://images.unsplash.com/photo-1574171332299-0d2a4f0a6c63?w=300&h=300&fit=crop',
      description: '科学配比免疫营养素，全面提升机体防御能力',
      benefits: ['增强免疫力', '抗氧化', '提升抵抗力'],
      ingredients: ['维生素C', '锌', '硒', '维生素D3'],
      suitableFor: '免疫力低下人群',
      stock: 89,
      tags: ['AI推荐'],
      patent: 'ZL202310234567.8',
      featured: false
    }, {
      id: 3,
      name: '精力提升能量配方',
      category: 'energy',
      price: 1680,
      originalPrice: 2180,
      rating: 4.7,
      sales: 6789,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop',
      description: '天然草本精华结合现代营养学，快速恢复体力',
      benefits: ['提升精力', '改善疲劳', '增强体力'],
      ingredients: ['辅酶Q10', 'B族维生素', '镁', '人参提取物'],
      suitableFor: '工作压力大人群',
      stock: 234,
      tags: ['新品'],
      patent: 'ZL202310345678.9',
      featured: false
    }, {
      id: 4,
      name: '定制化营养套餐',
      category: 'custom',
      price: 3880,
      originalPrice: 4880,
      rating: 5.0,
      sales: 3456,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop',
      description: '基于您的健康数据AI定制的专属营养方案',
      benefits: ['个性化营养', '精准补充', '效果最大化'],
      ingredients: ['个性化配方'],
      suitableFor: '追求个性化健康管理',
      stock: 45,
      tags: ['定制', '高端'],
      patent: 'ZL202310456789.0',
      featured: true
    }];
    setProducts(mockProducts);
    const mockCategories = [{
      id: 'all',
      name: '全部',
      icon: Package
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
      icon: Brain
    }];
    setCategories(mockCategories);
  }, []);
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    const pageMap = {
      products: 'mall',
      ai_recommend: 'mall',
      voice_purchase: 'mall',
      orders: 'mall'
    };
    if (pageMap[tabId]) {
      $w.utils.navigateTo({
        pageId: pageMap[tabId],
        params: {}
      });
    }
  };
  const handleProductSelect = product => {
    setSelectedProduct(product);
    setShowOrderModal(true);
  };
  const handleFormulaSelect = formula => {
    setSelectedProduct(formula);
    setShowOrderModal(true);
  };
  const handleCustomize = () => {
    toast({
      title: "定制配方",
      description: "正在跳转到定制页面..."
    });
  };
  const handleOrderComplete = orderResult => {
    setShowOrderModal(false);
    toast({
      title: "购买成功",
      description: `订单号：${orderResult.orderId}`,
      duration: 5000
    });
  };
  const handleVoiceCommand = (command, action) => {
    console.log('Voice command:', command, action);
    if (action && action.type === 'purchase') {
      setSelectedProduct(action.product);
      setShowOrderModal(true);
    }
  };
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const getCategoryIcon = categoryId => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : Package;
  };
  const getTabIcon = tabId => {
    switch (tabId) {
      case 'products':
        return ShoppingBag;
      case 'ai_recommend':
        return Brain;
      case 'voice_purchase':
        return Headphones;
      case 'orders':
        return Package;
      default:
        return ShoppingBag;
    }
  };
  const getTabTitle = tabId => {
    switch (tabId) {
      case 'products':
        return '商品列表';
      case 'ai_recommend':
        return 'AI推荐';
      case 'voice_purchase':
        return '语音购买';
      case 'orders':
        return '我的订单';
      default:
        return '臻选商城';
    }
  };
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部导航 */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">臻选商城</h1>
              <p className="text-purple-100">AI智能推荐，专利品质保证</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{products.length}</div>
                <div className="text-purple-100 text-sm">精选产品</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-purple-100 text-sm">平均评分</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 主要内容区域 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            {['products', 'ai_recommend', 'voice_purchase', 'orders'].map(tabId => {
            const Icon = getTabIcon(tabId);
            return <TabsTrigger key={tabId} value={tabId} className="flex items-center space-x-2">
                <Icon className="w-4 h-4" />
                <span>{getTabTitle(tabId)}</span>
              </TabsTrigger>;
          })}
          </TabsList>

          {/* 商品列表 */}
          <TabsContent value="products" className="space-y-6">
            {/* 搜索和筛选 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="搜索产品..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map(category => {
                const Icon = category.icon;
                return <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>;
              })}
              </div>
            </div>

            {/* 产品网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => <Card key={product.id} className="hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {product.tags.map((tag, index) => <span key={index} className={`px-2 py-1 rounded-full text-xs font-medium ${tag === 'AI推荐' ? 'bg-blue-600 text-white' : tag === '热销' ? 'bg-red-600 text-white' : tag === '新品' ? 'bg-green-600 text-white' : tag === '定制' ? 'bg-purple-600 text-white' : 'bg-gray-600 text-white'}`}>
                          {tag}
                        </span>)}
                    </div>
                    {product.featured && <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                        推荐
                      </div>}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* 专利标识 */}
                    {product.patent && <div className="mb-3">
                        <PatentTooltip patentNumber={product.patent} productName={product.name}>
                          <div className="flex items-center space-x-1 text-xs text-blue-600 cursor-help">
                            <Shield className="w-3 h-3" />
                            <span>专利技术</span>
                            <span className="text-gray-400">({product.patent})</span>
                          </div>
                        </PatentTooltip>
                      </div>}
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        销量 {product.sales.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-red-600">¥{product.price}</span>
                          <span className="text-sm text-gray-400 line-through">¥{product.originalPrice}</span>
                        </div>
                        <div className="text-xs text-green-600">
                          节省¥{product.originalPrice - product.price}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        库存 {product.stock}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1" onClick={() => handleProductSelect(product)}>
                        立即购买
                      </Button>
                      <Button size="sm" variant="outline">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </TabsContent>

          {/* AI推荐 */}
          <TabsContent value="ai_recommend" className="space-y-6">
            <AIFormulaRecommendation userData={userHealthData} onFormulaSelect={handleFormulaSelect} onCustomize={handleCustomize} />
          </TabsContent>

          {/* 语音购买 */}
          <TabsContent value="voice_purchase" className="space-y-6">
            <VoicePurchase products={products} onPurchase={handleProductSelect} onVoiceCommand={handleVoiceCommand} />
          </TabsContent>

          {/* 我的订单 */}
          <TabsContent value="orders" className="space-y-6">
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">暂无订单</h3>
              <p className="text-gray-500">您还没有购买任何产品</p>
              <Button className="mt-4" onClick={() => setActiveTab('products')}>
                去购物
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* RPA下单弹窗 */}
      {showOrderModal && selectedProduct && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] mx-4 my-8 bg-white rounded-2xl shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">RPA智能下单</h2>
                <button onClick={() => setShowOrderModal(false)} className="text-gray-400 hover:text-gray-600">
                  ×
                </button>
              </div>
              <RPAOneClickOrder product={selectedProduct} onOrderComplete={handleOrderComplete} onAddressUpdate={() => {
            toast({
              title: "地址管理",
              description: "跳转到地址管理页面"
            });
          }} />
            </div>
          </div>
        </div>}

      {/* 底部导航 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}