// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger, Alert, AlertDescription, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { ShoppingCart, Star, Award, Shield, Package, ChevronRight, Search, Filter, Heart, Plus, Minus, Clock, Truck, Certificate, FlaskConical, Leaf, Home, Target } from 'lucide-react';

export default function Mall(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 商品分类
  const categories = [{
    id: 'all',
    name: '全部商品',
    icon: Package,
    color: 'bg-gray-600'
  }, {
    id: 'anti-aging',
    name: '抗衰保护剂',
    icon: Shield,
    color: 'bg-purple-600'
  }, {
    id: 'taxol',
    name: '紫杉醇系列',
    icon: FlaskConical,
    color: 'bg-red-600'
  }, {
    id: 'herbal',
    name: '汉方清幽',
    icon: Leaf,
    color: 'bg-green-600'
  }, {
    id: 'lifestyle',
    name: '生活馆',
    icon: Home,
    color: 'bg-blue-600'
  }];

  // 商品数据
  const [products, setProducts] = useState([{
    id: 1,
    name: 'NMN细胞活化精华',
    category: 'anti-aging',
    price: 2880,
    originalPrice: 3680,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop',
    rating: 4.8,
    reviews: 256,
    description: '采用最新NMN技术，激活细胞能量，延缓衰老进程',
    features: ['美国专利号: US20230123456', '香港GMP药厂认证', '纯度99.8%'],
    stock: 50,
    sales: 1234,
    tags: ['热销', '专利产品']
  }, {
    id: 2,
    name: '紫杉醇抗衰胶囊',
    category: 'taxol',
    price: 3680,
    originalPrice: 4680,
    image: 'https://images.unsplash.com/photo-1534785486340-3a6c2b5d2d6f?w=300&h=300&fit=crop',
    rating: 4.9,
    reviews: 189,
    description: '天然紫杉醇提取，强效抗氧化，保护细胞健康',
    features: ['美国专利号: US20230123457', '香港GMP药厂认证', '临床验证有效'],
    stock: 30,
    sales: 892,
    tags: ['新品', '临床验证']
  }, {
    id: 3,
    name: '汉方清幽调理液',
    category: 'herbal',
    price: 1880,
    originalPrice: 2380,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=300&fit=crop',
    rating: 4.7,
    reviews: 145,
    description: '传统汉方配方，温和调理，改善身体机能',
    features: ['古法传承', '香港GMP药厂认证', '无副作用'],
    stock: 80,
    sales: 567,
    tags: ['汉方', '温和']
  }, {
    id: 4,
    name: '智能睡眠监测仪',
    category: 'lifestyle',
    price: 1280,
    originalPrice: 1680,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop',
    rating: 4.6,
    reviews: 98,
    description: '智能监测睡眠质量，提供个性化健康建议',
    features: ['AI智能分析', '医疗级精度', 'APP连接'],
    stock: 100,
    sales: 234,
    tags: ['智能', '健康监测']
  }, {
    id: 5,
    name: '辅酶Q10强效配方',
    category: 'anti-aging',
    price: 1580,
    originalPrice: 1980,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop',
    rating: 4.8,
    reviews: 167,
    description: '高浓度辅酶Q10，增强心脏功能，提升免疫力',
    features: ['美国专利号: US20230123458', '香港GMP药厂认证', '高吸收率'],
    stock: 60,
    sales: 789,
    tags: ['心脏健康', '高吸收']
  }, {
    id: 6,
    name: '灵芝孢子粉精华',
    category: 'herbal',
    price: 2180,
    originalPrice: 2680,
    image: 'https://images.unsplash.com/photo-1505378978329-0cfa4f5282a7?w=300&h=300&fit=crop',
    rating: 4.9,
    reviews: 203,
    description: '破壁灵芝孢子粉，增强免疫力，延缓衰老',
    features: ['破壁率99%', '香港GMP药厂认证', '有机种植'],
    stock: 45,
    sales: 945,
    tags: ['有机', '免疫增强']
  }]);

  // 筛选商品
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const handleAddToCart = product => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => item.id === product.id ? {
        ...item,
        quantity: item.quantity + 1
      } : item));
    } else {
      setCartItems([...cartItems, {
        ...product,
        quantity: 1
      }]);
    }
    toast({
      title: "添加成功",
      description: `${product.name} 已添加到购物车`
    });
  };
  const handleCustomFormula = () => {
    toast({
      title: "定制配方",
      description: "正在跳转到定制配方页面..."
    });
    $w.utils.navigateTo({
      pageId: 'customFormula',
      params: {}
    });
  };
  const getCategoryIcon = categoryId => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : Package;
  };
  const getCategoryColor = categoryId => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : 'bg-gray-600';
  };
  const renderStars = rating => {
    return Array.from({
      length: 5
    }, (_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />);
  };
  return <div style={style} className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* 顶部导航 */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">臻选商城</h1>
                <p className="text-amber-100">高端抗衰产品 · 专业品质保证</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="搜索商品..." className="pl-10 pr-4 py-2 rounded-lg text-gray-800 w-64 focus:outline-none focus:ring-2 focus:ring-amber-400" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <Button onClick={handleCustomFormula} className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                <Award className="w-4 h-4 mr-2" />
                定制配方
              </Button>
              <div className="relative">
                <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  购物车
                  {cartItems.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 分类导航 */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => {
            const Icon = category.icon;
            return <Button key={category.id} variant={activeCategory === category.id ? "default" : "outline"} onClick={() => setActiveCategory(category.id)} className={`flex items-center space-x-2 px-6 py-3 ${activeCategory === category.id ? `${category.color} text-white` : 'bg-white hover:bg-gray-50'}`}>
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{category.name}</span>
                </Button>;
          })}
          </div>
        </div>

        {/* 特色横幅 */}
        <Alert className="mb-8 border-amber-200 bg-amber-50">
          <Certificate className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>品质保证：</strong>所有产品均获得美国专利认证，香港GMP药厂生产，确保产品安全有效
          </AlertDescription>
        </Alert>

        {/* 商品网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProducts.map(product => {
          const CategoryIcon = getCategoryIcon(product.category);
          return <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 left-2">
                    <Badge className={`${getCategoryColor(product.category)} text-white`}>
                      <CategoryIcon className="w-3 h-3 mr-1" />
                      {categories.find(cat => cat.id === product.category)?.name}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  {product.tags.length > 0 && <div className="absolute bottom-2 left-2 flex gap-1">
                      {product.tags.map((tag, index) => <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>)}
                    </div>}
                </div>
                
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews}评价)
                    </span>
                  </div>

                  <div className="space-y-2 mb-3">
                    {product.features.slice(0, 2).map((feature, index) => <div key={index} className="flex items-center text-xs text-gray-600">
                        <Shield className="w-3 h-3 mr-1 text-green-500" />
                        {feature}
                      </div>)}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-red-600">¥{product.price}</span>
                        <span className="text-sm text-gray-400 line-through">¥{product.originalPrice}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        已售 {product.sales} | 库存 {product.stock}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={() => handleAddToCart(product)} className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      加入购物车
                    </Button>
                    <Button variant="outline" size="sm">
                      查看详情
                    </Button>
                  </div>
                </CardContent>
              </Card>;
        })}
        </div>

        {/* 底部推荐 */}
        <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <CardContent className="p-8 text-center">
            <Award className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">需要个性化定制？</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              根据您的身体状况和需求，我们的专业团队将为您量身定制最适合的抗衰方案
            </p>
            <Button onClick={handleCustomFormula} size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
              <Plus className="w-5 h-5 mr-2" />
              立即定制配方
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>;
}