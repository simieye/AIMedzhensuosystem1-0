// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { ShoppingCart, Search, Filter, Star, Heart, Brain, Sparkles, Zap, Award, FileText, Mic, Volume2, VolumeX, MessageCircle, Package, TrendingUp, Shield, CheckCircle, Clock, ArrowRight, Info, X, Play, Pause } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { AIAssistant } from '@/components/AIAssistant';
// @ts-ignore;
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
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
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [rpaStatus, setRpaStatus] = useState('idle'); // idle, analyzing, ordering, completed
  const [showPatentDialog, setShowPatentDialog] = useState(false);
  const [selectedPatent, setSelectedPatent] = useState(null);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [userHealthMetrics, setUserHealthMetrics] = useState(null);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const voiceRecognitionRef = useRef(null);

  // 模拟用户健康指标数据
  const mockHealthMetrics = {
    nad: 45.2,
    // NAD+水平 μmol/L
    coq10: 1.8,
    // 辅酶Q10 μg/mL
    glutathione: 850,
    // 谷胱甘肽 μg/L
    vitaminD: 32,
    // 维生素D ng/mL
    omega3: 6.5,
    // Omega-3指数 %
    melatonin: 85,
    // 褪黑素 pg/mL
    age: 35,
    // 年龄
    gender: 'female',
    // 性别
    healthGoals: ['抗衰老', '提升精力', '改善睡眠'],
    // 健康目标
    allergies: ['无'],
    // 过敏信息
    budget: 'medium' // 预算等级
  };

  // 产品分类
  const categories = [{
    id: 'all',
    name: '全部',
    icon: Package
  }, {
    id: 'anti-aging',
    name: '抗衰老',
    icon: Sparkles
  }, {
    id: 'vitamins',
    name: '维生素',
    icon: Heart
  }, {
    id: 'supplements',
    name: '补充剂',
    icon: Brain
  }, {
    id: 'herbal',
    name: '草本',
    icon: Shield
  }];

  // 模拟产品数据
  const products = [{
    id: 1,
    name: 'NMN细胞活化精华',
    category: 'anti-aging',
    price: 2880,
    originalPrice: 3580,
    rating: 4.8,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop',
    description: '高纯度NMN补充剂，激活细胞能量，延缓衰老进程',
    tags: ['热销', '专利'],
    stock: 156,
    discount: 20,
    ingredients: ['NMN 99%', '维生素 B3', '生物素'],
    benefits: ['提升NAD+水平', '增强细胞活力', '延缓衰老'],
    patents: ['CN202310123456.7', 'US202301234567A'],
    recommended: true
  }, {
    id: 2,
    name: '辅酶Q10心脏保护',
    category: 'supplements',
    price: 1680,
    originalPrice: 1980,
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
    description: '高浓度辅酶Q10，保护心脏健康，提升能量代谢',
    tags: ['畅销'],
    stock: 89,
    discount: 15,
    ingredients: ['辅酶Q10 200mg', '维生素E', '硒'],
    benefits: ['心脏保护', '能量提升', '抗氧化'],
    patents: ['CN202310234567.8'],
    recommended: false
  }, {
    id: 3,
    name: '褪黑素睡眠优化',
    category: 'vitamins',
    price: 380,
    originalPrice: 480,
    rating: 4.6,
    reviews: 134,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop',
    description: '天然褪黑素，改善睡眠质量，调节生物钟',
    tags: ['新品'],
    stock: 234,
    discount: 21,
    ingredients: ['褪黑素 3mg', 'GABA', '5-HTP'],
    benefits: ['改善睡眠', '调节生物钟', '提升睡眠质量'],
    patents: [],
    recommended: false
  }, {
    id: 4,
    name: 'Omega-3脑黄金',
    category: 'supplements',
    price: 1280,
    originalPrice: 1580,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop',
    description: '高纯度深海鱼油，富含DHA和EPA，保护大脑健康',
    tags: ['热销', '专利'],
    stock: 67,
    discount: 19,
    ingredients: ['Omega-3 1000mg', 'DHA 600mg', 'EPA 400mg'],
    benefits: ['大脑健康', '心血管保护', '抗炎'],
    patents: ['CN202310345678.9', 'US202301345678B'],
    recommended: true
  }, {
    id: 5,
    name: '谷胱甘肽排毒精华',
    category: 'anti-aging',
    price: 2180,
    originalPrice: 2680,
    rating: 4.5,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop',
    description: '强效抗氧化剂，清除自由基，排毒养颜',
    tags: ['专利'],
    stock: 45,
    discount: 19,
    ingredients: ['谷胱甘肽 500mg', '维生素C', '维生素E'],
    benefits: ['抗氧化', '排毒', '养颜'],
    patents: ['CN202310456789.0'],
    recommended: false
  }, {
    id: 6,
    name: '维生素D3钙镁锌',
    category: 'vitamins',
    price: 280,
    originalPrice: 380,
    rating: 4.4,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop',
    description: '复合维生素矿物质，增强免疫力，强健骨骼',
    tags: ['特价'],
    stock: 189,
    discount: 26,
    ingredients: ['维生素D3 2000IU', '钙 500mg', '镁 250mg', '锌 15mg'],
    benefits: ['增强免疫', '强健骨骼', '提升活力'],
    patents: [],
    recommended: false
  }];

  // 专利信息数据
  const patentsData = {
    'CN202310123456.7': {
      title: '一种高纯度NMN的制备方法及其应用',
      description: '本发明涉及一种高纯度NMN的制备方法，通过特殊的提取和纯化工艺，使NMN纯度达到99%以上，显著提高了生物利用度和稳定性。',
      inventor: '张博士等',
      applicant: '臻寿生物科技有限公司',
      date: '2023-10-15',
      type: '发明专利',
      status: '已授权',
      claims: ['纯度达到99%以上', '生物利用度提升35%', '稳定性提高50%']
    },
    'US202301234567A': {
      title: 'Method for enhancing NAD+ levels using NMN derivatives',
      description: 'This invention relates to novel NMN derivatives that effectively increase NAD+ levels in cells, showing superior bioavailability and sustained release properties.',
      inventor: 'Dr. Smith et al.',
      applicant: 'ZhenShou Biotech Inc.',
      date: '2023-01-20',
      type: 'US Patent',
      status: 'Pending',
      claims: ['Enhanced bioavailability', 'Sustained release', 'Cellular uptake improvement']
    },
    'CN202310345678.9': {
      title: '高纯度Omega-3提取工艺',
      description: '本发明提供了一种从深海鱼类中提取高纯度Omega-3的新工艺，通过分子蒸馏技术，使DHA和EPA的纯度达到95%以上。',
      inventor: '李研究员等',
      applicant: '臻寿海洋生物研究所',
      date: '2023-10-25',
      type: '发明专利',
      status: '已授权',
      claims: ['DHA+EPA纯度95%以上', '无重金属污染', '氧化稳定性优异']
    }
  };
  useEffect(() => {
    // 初始化用户健康指标
    setUserHealthMetrics(mockHealthMetrics);

    // 生成AI推荐
    generateAIRecommendations();

    // 初始化语音识别
    initializeVoiceRecognition();

    // 从localStorage加载购物车和收藏
    const savedCart = localStorage.getItem('cartItems');
    const savedFavorites = localStorage.getItem('favorites');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);
  const generateAIRecommendations = () => {
    if (!userHealthMetrics) return;

    // 基于用户健康指标生成推荐
    const recommendations = [];

    // NAD+水平偏低，推荐NMN
    if (userHealthMetrics.nad < 50) {
      const nmnProduct = products.find(p => p.name.includes('NMN'));
      if (nmnProduct) {
        recommendations.push({
          ...nmnProduct,
          reason: '您的NAD+水平偏低，建议补充NMN提升细胞活力',
          priority: 'high',
          matchScore: 95
        });
      }
    }

    // 辅酶Q10偏低，推荐辅酶Q10
    if (userHealthMetrics.coq10 < 2.0) {
      const coq10Product = products.find(p => p.name.includes('辅酶Q10'));
      if (coq10Product) {
        recommendations.push({
          ...coq10Product,
          reason: '您的辅酶Q10水平偏低，建议补充保护心脏健康',
          priority: 'medium',
          matchScore: 88
        });
      }
    }

    // 睡眠问题，推荐褪黑素
    if (userHealthMetrics.melatonin < 100) {
      const melatoninProduct = products.find(p => p.name.includes('褪黑素'));
      if (melatoninProduct) {
        recommendations.push({
          ...melatoninProduct,
          reason: '您的褪黑素水平偏低，建议补充改善睡眠质量',
          priority: 'medium',
          matchScore: 82
        });
      }
    }

    // 抗衰老需求，推荐谷胱甘肽
    if (userHealthMetrics.healthGoals.includes('抗衰老')) {
      const glutathioneProduct = products.find(p => p.name.includes('谷胱甘肽'));
      if (glutathioneProduct) {
        recommendations.push({
          ...glutathioneProduct,
          reason: '基于您的抗衰老需求，推荐谷胱甘肽强效抗氧化',
          priority: 'medium',
          matchScore: 78
        });
      }
    }
    setAiRecommendations(recommendations);
  };
  const initializeVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      voiceRecognitionRef.current = new SpeechRecognition();
      voiceRecognitionRef.current.continuous = false;
      voiceRecognitionRef.current.interimResults = false;
      voiceRecognitionRef.current.lang = 'zh-CN';
      voiceRecognitionRef.current.onresult = event => {
        const transcript = event.results[0][0].transcript;
        setVoiceCommand(transcript);
        processVoiceOrder(transcript);
      };
      voiceRecognitionRef.current.onerror = event => {
        console.error('语音识别错误:', event.error);
        setIsListening(false);
        toast({
          title: "语音识别失败",
          description: "请检查麦克风权限或重试",
          variant: "destructive"
        });
      };
      voiceRecognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  };
  const processVoiceOrder = command => {
    // 解析语音下单指令
    const orderPatterns = [{
      pattern: /下单|购买|我要买|订购/,
      action: 'order'
    }, {
      pattern: /加入购物车|添加到购物车/,
      action: 'add_to_cart'
    }, {
      pattern: /搜索|查找|找一下/,
      action: 'search'
    }, {
      pattern: /推荐|建议|什么好/,
      action: 'recommend'
    }];
    for (const pattern of orderPatterns) {
      if (pattern.pattern.test(command)) {
        handleVoiceAction(pattern.action, command);
        return;
      }
    }
    toast({
      title: "未识别指令",
      description: "请尝试说：下单NMN、加入购物车、搜索产品等",
      variant: "destructive"
    });
  };
  const handleVoiceAction = (action, command) => {
    switch (action) {
      case 'order':
        // 查找产品名称
        const productNames = products.map(p => p.name);
        const matchedProduct = productNames.find(name => command.includes(name.replace(/精华|保护|优化/g, '')));
        if (matchedProduct) {
          const product = products.find(p => p.name === matchedProduct);
          if (product) {
            handleRPAOrder(product);
          }
        } else {
          toast({
            title: "产品识别失败",
            description: "请说出具体的产品名称",
            variant: "destructive"
          });
        }
        break;
      case 'add_to_cart':
        // 类似下单逻辑
        handleVoiceAction('order', command);
        break;
      case 'search':
        const searchTerm = command.replace(/搜索|查找|找一下/g, '').trim();
        if (searchTerm) {
          setSearchQuery(searchTerm);
          toast({
            title: "搜索执行",
            description: `正在搜索: ${searchTerm}`
          });
        }
        break;
      case 'recommend':
        toast({
          title: "AI推荐",
          description: "正在为您生成个性化推荐..."
        });
        generateAIRecommendations();
        break;
    }
  };
  const toggleVoiceListening = () => {
    if (isListening) {
      voiceRecognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (voiceRecognitionRef.current) {
        voiceRecognitionRef.current.start();
        setIsListening(true);
        toast({
          title: "语音识别已启动",
          description: "请说出您要购买的产品..."
        });
      } else {
        toast({
          title: "语音识别不可用",
          description: "您的浏览器不支持语音识别功能",
          variant: "destructive"
        });
      }
    }
  };
  const handleRPAOrder = product => {
    setRpaStatus('analyzing');
    toast({
      title: "RPA智能下单",
      description: "正在分析您的健康数据，优化订单..."
    });

    // 模拟RPA分析过程
    setTimeout(() => {
      setRpaStatus('ordering');
      toast({
        title: "正在下单",
        description: `正在为您下单 ${product.name}...`
      });

      // 模拟下单过程
      setTimeout(() => {
        const order = {
          id: Date.now(),
          product: product,
          quantity: 1,
          price: product.price,
          discount: product.discount,
          finalPrice: product.price * (1 - product.discount / 100),
          timestamp: new Date(),
          orderNumber: `ZS${Date.now()}`,
          status: 'completed',
          aiOptimized: true,
          savings: product.originalPrice - product.price
        };
        setLastOrder(order);
        setRpaStatus('completed');
        setShowOrderSuccess(true);

        // 添加到购物车
        setCartItems(prev => [...prev, {
          ...product,
          quantity: 1,
          addedAt: new Date()
        }]);

        // 保存到localStorage
        localStorage.setItem('cartItems', JSON.stringify([...cartItems, {
          ...product,
          quantity: 1,
          addedAt: new Date()
        }]));
        toast({
          title: "下单成功！",
          description: `${product.name} 已成功下单，节省¥${order.savings}`
        });

        // 语音播报
        if (isVoiceEnabled && 'speechSynthesis' in window) {
          const orderText = `下单成功！${product.name}已成功加入购物车，为您节省了${order.savings}元。RPA智能下单为您优化了最佳方案。`;
          const utterance = new SpeechSynthesisUtterance(orderText);
          utterance.lang = 'zh-CN';
          utterance.rate = 0.9;
          speechSynthesis.speak(utterance);
        }
        setTimeout(() => {
          setRpaStatus('idle');
        }, 3000);
      }, 2000);
    }, 1500);
  };
  const handleAddToCart = product => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(prev => prev.map(item => item.id === product.id ? {
        ...item,
        quantity: item.quantity + 1
      } : item));
    } else {
      setCartItems(prev => [...prev, {
        ...product,
        quantity: 1,
        addedAt: new Date()
      }]);
    }

    // 保存到localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    toast({
      title: "已加入购物车",
      description: `${product.name} 已添加到购物车`
    });
  };
  const handleToggleFavorite = product => {
    const isFavorite = favorites.some(fav => fav.id === product.id);
    if (isFavorite) {
      setFavorites(prev => prev.filter(fav => fav.id !== product.id));
    } else {
      setFavorites(prev => [...prev, product]);
    }

    // 保存到localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    toast({
      title: isFavorite ? "已取消收藏" : "已添加收藏",
      description: product.name
    });
  };
  const handlePatentClick = patentId => {
    const patent = patentsData[patentId];
    if (patent) {
      setSelectedPatent(patent);
      setShowPatentDialog(true);
    }
  };
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    const pageMap = {
      home: 'home',
      detection: 'detectionCenter',
      mall: 'mall',
      plan: 'myPlan',
      profile: 'personalCenter'
    };
    if (pageMap[tabId]) {
      $w.utils.navigateTo({
        pageId: pageMap[tabId],
        params: {}
      });
    }
  };
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const getMatchScoreColor = score => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };
  const getPriorityColor = priority => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部导航 */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">臻选商城</h1>
              <p className="text-purple-100">AI智能推荐 · RPA一键下单 · 专利品质保证</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{cartItems.length}</div>
                <div className="text-purple-100 text-sm">购物车</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{favorites.length}</div>
                <div className="text-purple-100 text-sm">收藏</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* AI推荐区域 */}
        {aiRecommendations.length > 0 && <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                AI定制配方推荐
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiRecommendations.map((product, index) => <div key={index} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{product.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(product.matchScore)}`}>
                            匹配度: {product.matchScore}%
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(product.priority)}`}>
                            {product.priority === 'high' ? '高优先级' : product.priority === 'medium' ? '中优先级' : '低优先级'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-red-600">¥{product.price}</div>
                        <div className="text-sm text-gray-500 line-through">¥{product.originalPrice}</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{product.reason}</p>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleRPAOrder(product)} className="flex-1">
                        <Zap className="w-4 h-4 mr-1" />
                        RPA下单
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleAddToCart(product)}>
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        加入购物车
                      </Button>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>}

        {/* 搜索和筛选区域 */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="搜索产品..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {categories.map(category => {
              const Icon = category.icon;
              return <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${selectedCategory === category.id ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}>
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>;
            })}
            </div>
            
            <Button onClick={toggleVoiceListening} className={`flex items-center space-x-2 ${isListening ? 'bg-red-500 animate-pulse' : 'bg-purple-600'}`}>
              {isListening ? <VolumeX className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isListening ? '正在听...' : '语音下单'}</span>
            </Button>
          </div>
        </div>

        {/* RPA状态指示器 */}
        {rpaStatus !== 'idle' && <Alert className={`border-${rpaStatus === 'completed' ? 'green' : rpaStatus === 'ordering' ? 'blue' : 'yellow'}-200 bg-${rpaStatus === 'completed' ? 'green' : rpaStatus === 'ordering' ? 'blue' : 'yellow'}-50`}>
            <Zap className={`h-4 w-4 text-${rpaStatus === 'completed' ? 'green' : rpaStatus === 'ordering' ? 'blue' : 'yellow'}-600`} />
            <AlertDescription className={`text-${rpaStatus === 'completed' ? 'green' : rpaStatus === 'ordering' ? 'blue' : 'yellow'}-800`}>
              <strong>RPA智能下单：</strong>
              {rpaStatus === 'analyzing' && '正在分析您的健康数据，优化最佳方案...'}
              {rpaStatus === 'ordering' && '正在执行下单流程，为您争取最优价格...'}
              {rpaStatus === 'completed' && '下单成功！RPA为您节省了时间和金钱。'}
            </AlertDescription>
          </Alert>}

        {/* 产品列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-3" />
                  {product.discount > 0 && <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      -{product.discount}%
                    </span>}
                  {product.recommended && <span className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                      AI推荐
                    </span>}
                  </div>
                  
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews})</span>
                    {product.stock < 100 && <span className="text-sm text-orange-600">仅剩{product.stock}件</span>}
                  </div>
                  
                  {/* 专利标签 */}
                  {product.patents && product.patents.length > 0 && <div className="mb-3">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-600">专利产品</span>
                        {product.patents.map((patent, index) => <button key={index} onClick={() => handlePatentClick(patent)} className="text-xs text-blue-500 hover:text-blue-700 underline">
                            {index === 0 ? '查看专利' : `专利${index + 1}`}
                          </button>)}
                      </div>
                    </div>}
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-lg font-bold text-red-600">¥{product.price}</div>
                      <div className="text-sm text-gray-500 line-through">¥{product.originalPrice}</div>
                    </div>
                    <div className="flex space-x-1">
                      {product.tags.map((tag, index) => <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {tag}
                        </span>)}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => handleRPAOrder(product)} className="flex-1">
                      <Zap className="w-4 h-4 mr-1" />
                      RPA下单
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleAddToCart(product)}>
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleToggleFavorite(product)}>
                      <Heart className={`w-4 h-4 ${favorites.some(fav => fav.id === product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
        </div>

        {/* 健康指标可视化 */}
        {userHealthMetrics && <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                您的健康指标
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{userHealthMetrics.nad}</div>
                  <div className="text-sm text-gray-600">NAD+ (μmol/L)</div>
                  <div className="text-xs text-orange-600">偏低</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{userHealthMetrics.coq10}</div>
                  <div className="text-sm text-gray-600">辅酶Q10 (μg/mL)</div>
                  <div className="text-xs text-orange-600">偏低</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{userHealthMetrics.glutathione}</div>
                  <div className="text-sm text-gray-600">谷胱甘肽 (μg/L)</div>
                  <div className="text-xs text-green-600">正常</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{userHealthMetrics.vitaminD}</div>
                  <div className="text-sm text-gray-600">维生素D (ng/mL)</div>
                  <div className="text-xs text-yellow-600">不足</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{userHealthMetrics.omega3}</div>
                  <div className="text-sm text-gray-600">Omega-3 (%)</div>
                  <div className="text-xs text-orange-600">偏低</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{userHealthMetrics.melatonin}</div>
                  <div className="text-sm text-gray-600">褪黑素 (pg/mL)</div>
                  <div className="text-xs text-green-600">正常</div>
                </div>
              </div>
            </CardContent>
          </Card>}
      </div>

      {/* 专利详情弹窗 */}
      {showPatentDialog && selectedPatent && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                专利详情
              </h3>
              <button onClick={() => setShowPatentDialog(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">{selectedPatent.title}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className={`px-2 py-1 rounded ${selectedPatent.status === '已授权' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {selectedPatent.status}
                  </span>
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
                    {selectedPatent.type}
                  </span>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-700 mb-2">专利描述</h5>
                <p className="text-sm text-gray-600 leading-relaxed">{selectedPatent.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">发明人</h5>
                  <p className="text-sm text-gray-600">{selectedPatent.inventor}</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">申请人</h5>
                  <p className="text-sm text-gray-600">{selectedPatent.applicant}</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">申请日期</h5>
                  <p className="text-sm text-gray-600">{selectedPatent.date}</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">专利号</h5>
                  <p className="text-sm text-gray-600">{Object.keys(patentsData).find(key => patentsData[key] === selectedPatent)}</p>
                </div>
              </div>
              
              {selectedPatent.claims && <div>
                  <h5 className="font-medium text-gray-700 mb-2">专利要点</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedPatent.claims.map((claim, index) => <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {claim}
                      </li>)}
                  </ul>
                </div>}
            </div>
          </div>
        </div>}

      {/* 下单成功弹窗 */}
      {showOrderSuccess && lastOrder && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">下单成功！</h3>
              <p className="text-gray-600 mb-4">
                {lastOrder.product.name} 已成功下单<br />
                订单号：{lastOrder.orderNumber}<br />
                为您节省：¥{lastOrder.savings}
              </p>
              <div className="flex space-x-3">
                <Button onClick={() => setShowOrderSuccess(false)} className="flex-1">
                  继续购物
                </Button>
                <Button variant="outline" onClick={() => {
              setShowOrderSuccess(false);
              // 跳转到购物车页面
              toast({
                title: "跳转购物车",
                description: "正在跳转到购物车页面..."
              });
            }} className="flex-1">
                  查看购物车
                </Button>
              </div>
            </div>
          </div>
        </div>}

      {/* 底部导航 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* AI客服组件 */}
      <AIAssistant />
    </div>;
}