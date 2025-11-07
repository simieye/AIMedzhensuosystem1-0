// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { ShoppingCart, Search, Filter, Star, TrendingUp, Award, Brain, Zap, Package, ChevronRight, Heart, BarChart3 } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { AIFormulaRecommendation } from '@/components/AIFormulaRecommendation';
// @ts-ignore;
import { RPAOrderSystem } from '@/components/RPAOrderSystem';
// @ts-ignore;
import { PatentInfoTooltip } from '@/components/PatentInfoTooltip';
export default function Mall(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('mall');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [nadLevel] = useState(53.5); // 模拟NAD+水平

  // 模拟商品数据
  const mockProducts = [{
    id: 'nmn-150',
    name: 'NMN 150mg 胶囊',
    category: 'supplement',
    price: 1350,
    originalPrice: 1680,
    image: 'https://images.unsplash.com/photo-1534212623852-8a5b496c05b0?w=300&h=300&fit=crop',
    rating: 4.8,
    reviews: 2341,
    sales: 15234,
    description: '高纯度NMN补充剂，提升NAD+水平，延缓衰老',
    tags: ['热销', '入门级'],
    stock: 156,
    specification: '150mg × 60粒',
    dosage: '每日1粒',
    hasPatent: true
  }, {
    id: 'nmn-250',
    name: 'NMN 250mg 胶囊',
    category: 'supplement',
    price: 2250,
    originalPrice: 2880,
    image: 'https://images.unsplash.com/photo-1534212623852-8a5b496c05b0?w=300&h=300&fit=crop',
    rating: 4.9,
    reviews: 5678,
    sales: 28956,
    description: '标准剂量NMN，适合日常抗衰老保健',
    tags: ['爆款', '推荐'],
    stock: 89,
    specification: '250mg × 60粒',
    dosage: '每日1粒',
    hasPatent: true
  }, {
    id: 'nmn-350',
    name: 'NMN 350mg 胶囊',
    category: 'supplement',
    price: 3150,
    originalPrice: 3880,
    image: 'https://images.unsplash.com/photo-1534212623852-8a5b496c05b0?w=300&h=300&fit=crop',
    rating: 4.7,
    reviews: 1234,
    sales: 8923,
    description: '强化剂量NMN，适合需要快速提升NAD+的人群',
    tags: ['强化版'],
    stock: 45,
    specification: '350mg × 60粒',
    dosage: '每日1粒',
    hasPatent: true
  }, {
    id: 'nmn-500',
    name: 'NMN 500mg 胶囊',
    category: 'supplement',
    price: 4500,
    originalPrice: 5880,
    image: 'https://images.unsplash.com/photo-1534212623852-8a5b496c05b0?w=300&h=300&fit=crop',
    rating: 4.6,
    reviews: 892,
    sales: 4567,
    description: '高剂量NMN，专业抗衰老配方',
    tags: ['专业版', '高浓度'],
    stock: 23,
    specification: '500mg × 60粒',
    dosage: '每日1粒',
    hasPatent: true
  }, {
    id: 'resveratrol',
    name: '白藜芦醇胶囊',
    category: 'supplement',
    price: 880,
    originalPrice: 1280,
    image: 'https://images.unsplash.com/photo-1544481895-4c2b41a9b82c?w=300&h=300&fit=crop',
    rating: 4.5,
    reviews: 1567,
    sales: 9876,
    description: '天然抗氧化剂，配合NMN效果更佳',
    tags: ['抗氧化'],
    stock: 234,
    specification: '200mg × 90粒',
    dosage: '每日2粒',
    hasPatent: false
  }, {
    id: 'coq10',
    name: '辅酶Q10软胶囊',
    category: 'supplement',
    price: 680,
    originalPrice: 980,
    image: 'https://images.unsplash.com/photo-1544481895-4c2b41a9b82c?w=300&h=300&fit=crop',
    rating: 4.4,
    reviews: 892,
    sales: 6789,
    description: '心脏健康保护，增强能量代谢',
    tags: ['心脏健康'],
    stock: 178,
    specification: '100mg × 120粒',
    dosage: '每日2粒',
    hasPatent: false
  }];
  const categories = [{
    id: 'all',
    name: '全部',
    icon: Package
  }, {
    id: 'supplement',
    name: '补充剂',
    icon: Brain
  }, {
    id: 'equipment',
    name: '设备',
    icon: Zap
  }, {
    id: 'service',
    name: '服务',
    icon: BarChart3
  }];
  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);
  useEffect(() => {
    let filtered = products;

    // 按分类筛选
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // 按搜索关键词筛选
    if (searchQuery) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, products]);
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    const pageMap = {
      mall: 'mall',
      plan: 'myPlan',
      detection: 'detectionCenter',
      profile: 'personalCenter'
    };
    if (pageMap[tabId]) {
      $w.utils.navigateTo({
        pageId: pageMap[tabId],
        params: {}
      });
    }
  };
  const handleProductClick = product => {
    setSelectedProduct(product);
    toast({
      title: "已选择商品",
      description: `已选择${product.name}`
    });
  };
  const handleRecommendationSelect = data => {
    setRecommendation(data);
    setSelectedProduct(data.selectedProduct);
    toast({
      title: "AI推荐已应用",
      description: "已根据AI推荐选择最适合的产品"
    });
  };
  const handleOrderComplete = orderInfo => {
    setOrderData(orderInfo);
    toast({
      title: "订单完成",
      description: "感谢您的购买，订单正在处理中"
    });
  };
  const handleAddToCart = product => {
    toast({
      title: "已加入购物车",
      description: `${product.name} 已加入购物车`
    });
  };
  const handleBuyNow = product => {
    setSelectedProduct(product);
    // 可以直接跳转到RPA下单系统
  };
  const getStockStatus = stock => {
    if (stock > 100) return {
      text: '库存充足',
      color: 'text-green-600 bg-green-100'
    };
    if (stock > 50) return {
      text: '库存较少',
      color: 'text-yellow-600 bg-yellow-100'
    };
    return {
      text: '库存紧张',
      color: 'text-red-600 bg-red-100'
    };
  };
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部背景 */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">臻选商城</h1>
              <p className="text-purple-100">AI智能推荐，专利品质保证</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{products.length}</div>
                <div className="text-purple-100 text-sm">精选商品</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-purple-100 text-sm">平均评分</div>
              </div>
            </div>
          </div>

          {/* 搜索栏 */}
          <div className="mt-6 flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="搜索商品..." className="w-full pl-10 pr-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-purple-200" />
            </div>
            <Button className="bg-white text-purple-600 hover:bg-purple-50">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 分类标签 */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {categories.map(category => {
          const Icon = category.icon;
          return <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${selectedCategory === category.id ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-purple-100'}`}>
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>;
        })}
        </div>

        {/* AI推荐区域 */}
        <div className="mb-8">
          <AIFormulaRecommendation nadLevel={nadLevel} onRecommendationSelect={handleRecommendationSelect} />
        </div>

        {/* RPA下单系统 */}
        {selectedProduct && <div className="mb-8">
            <RPAOrderSystem selectedProduct={selectedProduct} recommendation={recommendation} onOrderComplete={handleOrderComplete} />
          </div>}

        {/* 商品列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                  {product.tags.map((tag, index) => <Badge key={index} className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                      {tag}
                    </Badge>)}
                  {product.hasPatent && <div className="absolute top-2 left-2">
                      <PatentInfoTooltip product={product} />
                    </div>}
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
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

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-red-600">¥{product.price}</span>
                        {product.originalPrice > product.price && <span className="text-sm text-gray-400 line-through">¥{product.originalPrice}</span>}
                      </div>
                      <div className="text-xs text-gray-500">已售{product.sales}</div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${getStockStatus(product.stock).color}`}>
                      {getStockStatus(product.stock).text}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>规格：{product.specification}</p>
                    <p>用法：{product.dosage}</p>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleAddToCart(product)} className="flex-1">
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      加购物车
                    </Button>
                    <Button size="sm" onClick={() => handleBuyNow(product)} className="flex-1 bg-purple-600 hover:bg-purple-700">
                      立即购买
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* 订单完成提示 */}
        {orderData && <div className="fixed bottom-20 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-green-600">✓</span>
              </div>
              <div>
                <p className="font-semibold">订单已生成</p>
                <p className="text-sm opacity-90">{orderData.product.name} x{orderData.quantity}</p>
              </div>
            </div>
          </div>}
      </div>

      {/* 底部导航 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}