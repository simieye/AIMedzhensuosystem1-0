// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger, Alert, AlertDescription, useToast } from '@/components/ui';
// @ts-ignore;
import { FileText, Droplet, Watch, Upload, Clock, TrendingUp, Calendar, Filter, Download, Plus, Search, BarChart3, Activity, Heart, Brain } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
export default function DetectionCenter(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('reports');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');

  // 模拟数据
  const [reports, setReports] = useState([{
    id: 1,
    title: '年度体检报告',
    type: 'comprehensive',
    date: '2024-01-15',
    status: 'completed',
    hospital: '北京协和医院',
    doctor: '张医生',
    summary: '整体健康状况良好，建议注意血压控制',
    score: 85
  }, {
    id: 2,
    title: '血常规检查',
    type: 'blood',
    date: '2024-01-10',
    status: 'completed',
    hospital: '北京协和医院',
    doctor: '李医生',
    summary: '白细胞计数略高，建议复查',
    score: 78
  }, {
    id: 3,
    title: '心电图检查',
    type: 'heart',
    date: '2024-01-05',
    status: 'completed',
    hospital: '北京协和医院',
    doctor: '王医生',
    summary: '心律正常，无异常发现',
    score: 92
  }]);
  const [bloodData, setBloodData] = useState([{
    id: 1,
    type: 'glucose',
    value: 5.2,
    unit: 'mmol/L',
    date: '2024-01-15 08:00',
    status: 'normal',
    note: '空腹血糖'
  }, {
    id: 2,
    type: 'glucose',
    value: 7.8,
    unit: 'mmol/L',
    date: '2024-01-15 14:00',
    status: 'high',
    note: '餐后2小时'
  }, {
    id: 3,
    type: 'pressure',
    value: '120/80',
    unit: 'mmHg',
    date: '2024-01-14 09:00',
    status: 'normal',
    note: '晨起血压'
  }]);
  const [deviceData, setDeviceData] = useState([{
    id: 1,
    device: 'Apple Watch',
    type: 'heart_rate',
    value: 72,
    unit: 'bpm',
    date: '2024-01-15 10:30',
    status: 'normal'
  }, {
    id: 2,
    device: '小米手环',
    type: 'steps',
    value: 8542,
    unit: '步',
    date: '2024-01-15 18:00',
    status: 'good'
  }, {
    id: 3,
    device: 'Apple Watch',
    type: 'sleep',
    value: 7.5,
    unit: '小时',
    date: '2024-01-14 23:00',
    status: 'good'
  }]);

  // 图表数据
  const [chartData, setChartData] = useState([{
    date: '01-10',
    glucose: 5.1,
    heartRate: 68,
    steps: 6000
  }, {
    date: '01-11',
    glucose: 5.3,
    heartRate: 70,
    steps: 7500
  }, {
    date: '01-12',
    glucose: 5.0,
    heartRate: 72,
    steps: 8200
  }, {
    date: '01-13',
    glucose: 5.4,
    heartRate: 69,
    steps: 6800
  }, {
    date: '01-14',
    glucose: 5.2,
    heartRate: 71,
    steps: 9100
  }, {
    date: '01-15',
    glucose: 5.2,
    heartRate: 72,
    steps: 8542
  }]);
  const healthScoreData = [{
    name: '心血管',
    value: 85,
    color: '#ef4444'
  }, {
    name: '代谢',
    value: 78,
    color: '#f59e0b'
  }, {
    name: '免疫',
    value: 92,
    color: '#10b981'
  }, {
    name: '神经',
    value: 88,
    color: '#3b82f6'
  }];
  const handleUpload = type => {
    toast({
      title: "上传功能",
      description: `${type}数据上传功能正在开发中`
    });
  };
  const handleGenerateReport = async () => {
    setIsLoading(true);
    try {
      // 模拟生成报告
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "报告生成成功",
        description: "您的健康寿命报告已生成完成"
      });
      // 跳转到报告页面
      $w.utils.navigateTo({
        pageId: 'healthReport',
        params: {}
      });
    } catch (error) {
      toast({
        title: "生成失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const getStatusColor = status => {
    switch (status) {
      case 'normal':
      case 'good':
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'high':
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
      case 'danger':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'normal':
        return '正常';
      case 'good':
        return '良好';
      case 'high':
        return '偏高';
      case 'low':
        return '偏低';
      case 'completed':
        return '已完成';
      default:
        return '未知';
    }
  };
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">健康检测中心</h1>
            </div>
            <Button onClick={handleGenerateReport} disabled={isLoading} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              {isLoading ? '生成中...' : '生成健康寿命报告'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 数据概览卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">检测报告</p>
                  <p className="text-2xl font-bold text-gray-800">{reports.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">指尖血数据</p>
                  <p className="text-2xl font-bold text-gray-800">{bloodData.length}</p>
                </div>
                <Droplet className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">设备数据</p>
                  <p className="text-2xl font-bold text-gray-800">{deviceData.length}</p>
                </div>
                <Watch className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">健康评分</p>
                  <p className="text-2xl font-bold text-gray-800">85</p>
                </div>
                <Heart className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 主要内容区域 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>报告单</span>
            </TabsTrigger>
            <TabsTrigger value="blood" className="flex items-center space-x-2">
              <Droplet className="w-4 h-4" />
              <span>指尖血</span>
            </TabsTrigger>
            <TabsTrigger value="devices" className="flex items-center space-x-2">
              <Watch className="w-4 h-4" />
              <span>穿戴设备</span>
            </TabsTrigger>
          </TabsList>

          {/* 报告单标签页 */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="搜索报告..." className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <div className="flex items-center space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={timeFilter} onChange={e => setTimeFilter(e.target.value)}>
                  <option value="all">全部时间</option>
                  <option value="week">最近一周</option>
                  <option value="month">最近一月</option>
                  <option value="year">最近一年</option>
                </select>
                <Button onClick={() => handleUpload('报告单')} className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-4 h-4 mr-2" />
                  上传报告
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {reports.map(report => <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{report.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {getStatusText(report.status)}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {report.date}
                          </div>
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-1" />
                            {report.hospital}
                          </div>
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {report.doctor}
                          </div>
                          <div className="flex items-center">
                            <BarChart3 className="w-4 h-4 mr-1" />
                            健康评分: {report.score}
                          </div>
                        </div>
                        <p className="text-gray-700">{report.summary}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          下载
                        </Button>
                        <Button variant="outline" size="sm">
                          查看详情
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </TabsContent>

          {/* 指尖血标签页 */}
          <TabsContent value="blood" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">指尖血检测数据</h3>
              <Button onClick={() => handleUpload('指尖血')} className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                添加数据
              </Button>
            </div>

            {/* 数据趋势图 */}
            <Card>
              <CardHeader>
                <CardTitle>血糖趋势图</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="glucose" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {bloodData.map(item => <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${getStatusColor(item.status)}`}>
                          <Droplet className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {item.type === 'glucose' ? '血糖' : '血压'}: {item.value} {item.unit}
                          </h4>
                          <p className="text-sm text-gray-600">{item.note} • {item.date}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </TabsContent>

          {/* 穿戴设备标签页 */}
          <TabsContent value="devices" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">穿戴设备数据</h3>
              <Button onClick={() => handleUpload('设备')} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                同步设备
              </Button>
            </div>

            {/* 健康评分分布 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>健康评分分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={healthScoreData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                        {healthScoreData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>步数趋势</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="steps" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4">
              {deviceData.map(item => <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${getStatusColor(item.status)}`}>
                          <Watch className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {item.device} - {item.type === 'heart_rate' ? '心率' : item.type === 'steps' ? '步数' : '睡眠'}: {item.value} {item.unit}
                          </h4>
                          <p className="text-sm text-gray-600">{item.date}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}