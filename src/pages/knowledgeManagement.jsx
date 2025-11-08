
// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { BookOpen, Plus, Search, Filter, Edit, Trash2, Eye, Download, Upload, RefreshCw, CheckCircle, AlertCircle, X, TrendingUp, Star, ThumbsUp, ThumbsDown, Calendar, User, Tag, BarChart3, PieChart, Activity, Target, Globe, FileText, Clock, Award, Zap, Brain, Heart, Shield, Users } from 'lucide-react';

// @ts-ignore;
import { KnowledgeCard } from '@/components/KnowledgeCard';
// @ts-ignore;
import { KnowledgeStats } from '@/components/KnowledgeStats';
// @ts-ignore;
import { KnowledgeEditor } from '@/components/KnowledgeEditor';
// @ts-ignore;
import { KnowledgeAnalytics } from '@/components/KnowledgeAnalytics';

export default function KnowledgeManagement(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedKnowledge, setSelectedKnowledge] = useState(null);
  const [showKnowledgeDetail, setShowKnowledgeDetail] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showUpdateHistory, setShowUpdateHistory] = useState(false);
  const [knowledgeList, setKnowledgeList] = useState([]);
  const [knowledgeStats, setKnowledgeStats] = useState(null);
  const [updateHistory, setUpdateHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 知识库数据
  const mockKnowledgeList = [{
    id: 'KB_001',
    title: 'NMN抗衰老机制详解',
    content: 'NMN（烟酰胺单核苷酸）是NAD+的直接前体，通过补充NMN可以有效提升体内NAD+水平，激活SIRT1蛋白，从而改善细胞功能、延缓衰老。研究表明，NMN在细胞能量代谢、DNA修复、抗氧化等方面发挥重要作用。临床前研究显示，NMN补充可以改善胰岛素敏感性、增强体力、改善认知功能等。',
    summary: 'NMN是NAD+前体，通过激活SIRT1蛋白延缓衰老，改善细胞功能和代谢健康。',
    category: 'anti_aging',
    subcategory: 'supplements',
    source: 'Nature Medicine',
    sourceUrl: 'https://www.nature.com/articles/s41591-021-01486-1',
    author: 'Dr. Zhang Wei',
    authorCredentials: 'MD, PhD - 分子生物学专家',
    publishDate: new Date('2023-10-15'),
    lastUpdated: new Date('2024-01-15T08:00:00'),
    usageFrequency: 156,
    confidenceScore: 0.95,
    qualityScore: 0.92,
    relevanceScore: 0.89,
    popularityScore: 0.78,
    verificationStatus: 'verified',
    verifiedBy: 'Dr. Li Ming',
    verificationDate: new Date('2024-01-10'),
    reviewStatus: 'approved',
    reviewedBy: 'Prof. Wang Fang',
    reviewDate: new Date('2024-01-12'),
    evolutionStage: 'mature',
    evolutionScore: 0.88,
    autoUpdateEnabled: true,
    updateFrequency: 'weekly',
    lastAutoUpdate: new Date('2024-01-15T06:00:00'),
    relatedKnowledge: ['KB_002', 'KB_003'],
    references: [{
      title: 'NMN supplementation improves muscle insulin sensitivity in prediabetic women',
      authors: ['Yoshino J', 'Baur JA', 'Ichikawa M'],
      journal: 'Science',
      year: 2021,
      doi: '10.1126/science.aaz9894'
    }],
    keywords: ['NMN', 'NAD+', '抗衰老', 'SIRT1', '细胞能量代谢'],
    tags: ['补充剂', '抗衰老', '分子机制'],
    language: 'zh',
    difficultyLevel: 'intermediate',
    targetAudience: ['研究人员', '医疗从业者', '健康爱好者'],
    accessLevel: 'public',
    isPublic: true,
    viewCount: 2341,
    shareCount: 156,
    bookmarkCount: 89,
    feedbackScore: 4.6,
    feedbackCount: 23,
    userRatings: [{
      userId: 'user_001',
      rating: 5,
      comment: '内容详实，很有帮助',
      timestamp: new Date('2024-01-14')
    }, {
      userId: 'user_002',
      rating: 4,
      comment: '专业性强，但有些难懂',
      timestamp: new Date('2024-01-13')
    }],
    comments: [{
      id: 'comment_001',
      userId: 'user_003',
      content: '请问NMN的推荐剂量是多少？',
      timestamp: new Date('2024-01-15'),
      replies: [{
        userId: 'author_001',
        content: '一般推荐每日250-500mg，具体请咨询医生',
        timestamp: new Date('2024-01-15')
      }]
    }],
    attachments: [{
      id: 'attach_001',
      name: 'NMN_mechanism_diagram.pdf',
      type: 'pdf',
      size: 2048576,
      url: '/files/NMN_mechanism_diagram.pdf'
    }],
    multimediaContent: [{
      type: 'video',
      url: '/videos/nmn_explanation.mp4',
      title: 'NMN作用机制视频讲解',
      duration: 300
    }],
    interactiveElements: [{
      type: 'quiz',
      title: 'NMN知识测试',
      questions: [{
        question: 'NMN是什么的前体？',
        options: ['NAD+', 'ATP', 'DNA', 'RNA'],
        correct: 0
      }]
    }],
    metadata: {
      readingTime: 8,
      complexity: 'medium',
      lastModified: new Date('2024-01-15T08:00:00')
    },
    version: '2.1.0',
    status: 'published',
    priority: 'high',
    expiryDate: null,
    archivedDate: null,
    createdBy: 'admin_001',
    updatedBy: 'editor_001'
  }, {
    id: 'KB_002',
    title: '间歇性禁食的健康益处',
    content: '间歇性禁食是一种饮食模式，通过周期性地在进食和禁食之间切换，带来多种健康益处。研究表明，间歇性禁食可以促进自噬、改善代谢健康、增强认知功能、延长寿命等。常见的间歇性禁食方法包括16:8禁食法、5:2禁食法、隔日禁食等。',
    summary: '间歇性禁食通过促进自噬和改善代谢健康，带来多种健康益处。',
    category: 'nutrition',
    subcategory: 'diet_methods',
    source: 'Cell Metabolism',
    sourceUrl: 'https://www.cell.com/cell-metabolism',
    author: 'Dr. Li Ming',
    authorCredentials: 'RD, PhD - 营养学专家',
    publishDate: new Date('2023-08-20'),
    lastUpdated: new Date('2024-01-14T16:30:00'),
    usageFrequency: 98,
    confidenceScore: 0.88,
    qualityScore: 0.90,
    relevanceScore: 0.85,
    popularityScore: 0.72,
    verificationStatus: 'verified',
    verifiedBy: 'Dr. Zhang Wei',
    verificationDate: new Date('2024-01-08'),
    reviewStatus: 'approved',
    reviewedBy: 'Prof. Chen Li',
    reviewDate: new Date('2024-01-10'),
    evolutionStage: 'growing',
    evolutionScore: 0.75,
    autoUpdateEnabled: true,
    updateFrequency: 'monthly',
    lastAutoUpdate: new Date('2024-01-14T12:00:00'),
    relatedKnowledge: ['KB_001', 'KB_004'],
    references: [{
      title: 'Intermittent fasting: molecular mechanisms and clinical applications',
      authors: ['de Cabo R', 'Mattson MP'],
      journal: 'Cell Metabolism',
      year: 2019,
      doi: '10.1016/j.cmet.2019.01.008'
    }],
    keywords: ['间歇性禁食', '自噬', '代谢健康', '长寿', '饮食模式'],
    tags: ['营养', '饮食', '健康'],
    language: 'zh',
    difficultyLevel: 'beginner',
    targetAudience: ['普通用户', '健康爱好者', '营养师'],
    accessLevel: 'public',
    isPublic: true,
    viewCount: 1876,
    shareCount: 98,
    bookmarkCount: 67,
    feedbackScore: 4.4,
    feedbackCount: 18,
    userRatings: [{
      userId: 'user_004',
      rating: 5,
      comment: '很实用的健康建议',
      timestamp: new Date('2024-01-13')
    }],
    comments: [{
      id: 'comment_002',
      userId: 'user_005',
      content: '刚开始尝试，有什么建议吗？',
      timestamp: new Date('2024-01-14'),
      replies: [{
        userId: 'author_002',
        content: '建议从16:8开始，循序渐进',
        timestamp: new Date('2024-01-14')
      }]
    }],
    attachments: [],
    multimediaContent: [{
      type: 'infographic',
      url: '/images/intermittent_fasting_guide.jpg',
      title: '间歇性禁食指南',
      description: '详细的禁食时间表和建议'
    }],
    interactiveElements: [{
      type: 'calculator',
      title: '禁食时间计算器',
      description: '计算最适合您的禁食时间'
    }],
    metadata: {
      readingTime: 6,
      complexity: 'easy',
      lastModified: new Date('2024-01-14T16:30:00')
    },
    version: '1.8.0',
    status: 'published',
    priority: 'medium',
    expiryDate: null,
    archivedDate: null,
    createdBy: 'admin_002',
    updatedBy: 'editor_002'
  }, {
    id: 'KB_003',
    title: '端粒与衰老的关系',
    content: '端粒是染色体末端的保护性结构，随着细胞分裂逐渐缩短，被认为是衰老的重要标志。端粒长度与生物年龄密切相关，端粒越短，生物年龄越大。研究表明，通过生活方式干预和营养补充可以延缓端粒缩短，从而延缓衰老进程。',
    summary: '端粒长度是生物年龄的重要标志，通过干预可以延缓端粒缩短。',
    category: 'cellular_biology',
    subcategory: 'aging_mechanisms',
    source: 'Science',
    sourceUrl: 'https://www.science.org',
    author: 'Dr. Wang Fang',
    authorCredentials: 'PhD - 细胞生物学专家',
    publishDate: new Date('2023-12-10'),
    lastUpdated: new Date('2024-01-13T11:45:00'),
    usageFrequency: 67,
    confidenceScore: 0.91,
    qualityScore: 0.89,
    relevanceScore: 0.82,
    popularityScore: 0.68,
    verificationStatus: 'pending',
    verifiedBy: null,
    verificationDate: null,
    reviewStatus: 'pending',
    reviewedBy: null,
    reviewDate: null,
    evolutionStage: 'developing',
    evolutionScore: 0.65,
    autoUpdateEnabled: false,
    updateFrequency: 'manual',
    lastAutoUpdate: null,
    relatedKnowledge: ['KB_001', 'KB_005'],
    references: [{
      title: 'Telomere length dynamics and the relation to chronological age',
      authors: ['Muezzinler A', 'Zhan Q', 'Wang F'],
      journal: 'Science',
      year: 2023,
      doi: '10.1126/science.abj0172'
    }],
    keywords: ['端粒', '衰老', '细胞分裂', '染色体', '生物年龄'],
    tags: ['细胞生物学', '衰老机制', '遗传学'],
    language: 'zh',
    difficultyLevel: 'advanced',
    targetAudience: ['研究人员', '医学生', '生物学家'],
    accessLevel: 'public',
    isPublic: true,
    viewCount: 1234,
    shareCount: 45,
    bookmarkCount: 34,
    feedbackScore: 4.2,
    feedbackCount: 12,
    userRatings: [{
      userId: 'user_006',
      rating: 4,
      comment: '内容专业，但需要更多图解',
      timestamp: new Date('2024-01-12')
    }],
    comments: [{
      id: 'comment_003',
      userId: 'user_007',
      content: '端粒检测有什么临床意义？',
      timestamp: new Date('2024-01-13'),
      replies: []
    }],
    attachments: [{
      id: 'attach_002',
      name: 'telomere_structure.pdf',
      type: 'pdf',
      size: 1536000,
      url: '/files/telomere_structure.pdf'
    }],
    multimediaContent: [{
      type: 'animation',
      url: '/animations/telomere_shortening.mp4',
      title: '端粒缩短过程动画',
      duration: 120
    }],
    interactiveElements: [{
      type: 'simulation',
      title: '端粒长度模拟器',
      description: '模拟不同因素对端粒长度的影响'
    }],
    metadata: {
      readingTime: 12,
      complexity: 'hard',
      lastModified: new Date('2024-01-13T11:45:00')
    },
    version: '1.2.0',
    status: 'draft',
    priority: 'low',
    expiryDate: null,
    archivedDate: null,
    createdBy: 'admin_003',
    updatedBy: 'editor_003'
  }];

  // 知识统计数据
  const mockKnowledgeStats = {
    totalKnowledge: 1250,
    activeKnowledge: 1180,
    newKnowledgeThisMonth: 45,
    updatedKnowledgeThisMonth: 23,
    averageQualityScore: 0.87,
    averageConfidenceScore: 0.84,
    evolutionRate: 0.12,
    autoUpdateSuccess: 96.5,
    userSatisfactionRate: 4.3,
    knowledgeDistribution: {
      anti_aging: 320,
      nutrition: 280,
      exercise: 200,
      supplements: 180,
      mental_health: 150,
      other: 120
    },
    evolutionStages: {
      developing: 180,
      growing: 420,
      mature: 580,
      optimized: 70
    },
    verificationStatus: {
      verified: 850,
      pending: 280,
      rejected: 120
    },
    qualityMetrics: {
      completeness: 92,
      accuracy: 88,
      timeliness: 95,
      consistency: 90,
      relevance: 85,
      clarity: 87
    },
    monthlyGrowth: [{
      month: '8月',
      new: 28,
      updated: 15,
      quality: 0.82
    }, {
      month: '9月',
      new: 32,
      updated: 18,
      quality: 0.84
    }, {
      month: '10月',
      new: 38,
      updated: 20,
      quality: 0.85
    }, {
      month: '11月',
      new: 42,
      updated: 22,
      quality: 0.86
    }, {
      month: '12月',
      new: 45,
      updated: 23,
      quality: 0.87
    }, {
      month: '1月',
      new: 48,
      updated: 25,
      quality: 0.88
    }],
    userEngagement: {
      totalViews: 45678,
      totalShares: 2345,
      totalBookmarks: 1234,
      totalComments: 567,
      averageReadingTime: 7.5
    }
  };

  // 更新历史数据
  const mockUpdateHistory = [{
    id: 'HIST_001',
    knowledgeId: 'KB_001',
    knowledgeTitle: 'NMN抗衰老机制详解',
    action: 'updated',
    version: '2.1.0',
    previousVersion: '2.0.0',
    changeDescription: '添加了最新的临床研究数据和安全性信息',
    changes: [{
      field: 'content',
      type: 'added',
      description: '新增2023年临床研究数据'
    }, {
      field: 'references',
      type: 'updated',
      description: '更新了参考文献列表'
    }],
    changedBy: 'editor_001',
    changedAt: new Date('2024-01-15T08:00:00'),
    reviewStatus: 'approved',
    reviewedBy: 'reviewer_001',
    reviewedAt: new Date('2024-01-15T10:30:00'),
    impact: 'medium'
  }, {
    id: 'HIST_002',
    knowledgeId: 'KB_002',
    knowledgeTitle: '间歇性禁食的健康益处',
    action: 'created',
    version: '1.0.0',
    previousVersion: null,
    changeDescription: '创建了新的知识条目',
    changes: [{
      field: 'content',
      type: 'created',
      description: '创建了完整的内容'
    }],
    changedBy: 'admin_002',
    changedAt: new Date('2024-01-14T16:30:00'),
    reviewStatus: 'approved',
    reviewedBy: 'reviewer_002',
    reviewedAt: new Date('2024-01-14T18:00:00'),
    impact: 'high'
  }, {
    id: 'HIST_003',
    knowledgeId: 'KB_003',
    knowledgeTitle: '端粒与衰老的关系',
    action: 'verified',
    version: '1.2.0',
    previousVersion: '1.2.0',
    changeDescription: '验证了知识内容的准确性',
    changes: [{
      field: 'verification',
      type: 'status_change',
      description: '从待验证变更为已验证'
    }],
    changedBy: 'reviewer_003',
    changedAt: new Date('2024-01-13T11:45:00'),
    reviewStatus: 'approved',
    reviewedBy: 'reviewer_003',
    reviewedAt: new Date('2024-01-13T11:45:00'),
    impact: 'low'
  }];
  useEffect(() => {
    // 初始化数据
    setKnowledgeList(mockKnowledgeList);
    setKnowledgeStats(mockKnowledgeStats);
    setUpdateHistory(mockUpdateHistory);
  }, []);
  const handleKnowledgeAction = (knowledgeId, action) => {
    switch (action) {
      case 'view':
        const knowledge = knowledgeList.find(k => k.id === knowledgeId);
        if (knowledge) {
          setSelectedKnowledge(knowledge);
          setShowKnowledgeDetail(true);
        }
        break;
      case 'edit':
        const editKnowledge = knowledgeList.find(k => k.id === knowledgeId);
        if (editKnowledge) {
          setSelectedKnowledge(editKnowledge);
          setShowEditForm(true);
        }
        break;
      case 'delete':
        setKnowledgeList(prev => prev.filter(k => k.id !== knowledgeId));
        toast({
          title: "删除成功",
          description: "知识条目已删除"
        });
        break;
      case 'verify':
        setKnowledgeList(prev => prev.map(k => k.id === knowledgeId ? {
          ...k,
          verificationStatus: 'verified',
          verifiedBy: $w.auth.currentUser?.userId || 'current_user',
          verificationDate: new Date()
        } : k));
        toast({
          title: "验证成功",
          description: "知识条目已验证"
        });
        break;
      case 'approve':
        setKnowledgeList(prev => prev.map(k => k.id === knowledgeId ? {
          ...k,
          reviewStatus: 'approved',
          reviewedBy: $w.auth.currentUser?.userId || 'current_user',
          reviewDate: new Date()
        } : k));
        toast({
          title: "审核通过",
          description: "知识条目已审核通过"
        });
        break;
    }
  };
  const handleCreateKnowledge = () => {
    setSelectedKnowledge(null);
    setShowEditForm(true);
  };
  const handleSaveKnowledge = (knowledgeData) => {
    if (knowledgeData.id) {
      // 更新现有知识
      setKnowledgeList(prev => prev.map(k => k.id === knowledgeData.id ? {
        ...knowledgeData,
        lastUpdated: new Date(),
        updatedBy: $w.auth.currentUser?.userId || 'current_user'
      } : k));
    } else {
      // 创建新知识
      const newKnowledge = {
        ...knowledgeData,
        id: `KB_${Date.now()}`,
        createdBy: $w.auth.currentUser?.userId || 'current_user',
        updatedBy: $w.auth.currentUser?.userId || 'current_user',
        createdAt: new Date(),
        lastUpdated: new Date(),
        viewCount: 0,
        shareCount: 0,
        bookmarkCount: 0,
        feedbackScore: 0,
        feedbackCount: 0,
        userRatings: [],
        comments: [],
        attachments: [],
        multimediaContent: [],
        interactiveElements: [],
        verificationStatus: 'pending',
        reviewStatus: 'pending',
        evolutionStage: 'developing',
        usageFrequency: 0,
        confidenceScore: 0.5,
        qualityScore: 0.5,
        relevanceScore: 0.5,
        popularityScore: 0.5
      };
      setKnowledgeList(prev => [...prev, newKnowledge]);
    }
    setShowEditForm(false);
    toast({
      title: "保存成功",
      description: "知识条目已保存"
    });
  };
  const filteredKnowledge = knowledgeList.filter(knowledge => {
    const matchesSearch = knowledge.title.toLowerCase().includes(searchQuery.toLowerCase()) || knowledge.content.toLowerCase().includes(searchQuery.toLowerCase()) || knowledge.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || knowledge.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h