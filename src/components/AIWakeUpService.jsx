// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Sun, Bell, BellOff, Clock, Calendar, Volume2, VolumeX, Play, Pause, Settings, Sparkles, CheckCircle, X } from 'lucide-react';

export function AIWakeUpService({
  onWakeUpComplete,
  userPreferences
}) {
  const {
    toast
  } = useToast();
  const [isWakeUpTime, setIsWakeUpTime] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wakeUpMessage, setWakeUpMessage] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [wakeUpTime, setWakeUpTime] = useState('06:30');
  const [isEnabled, setIsEnabled] = useState(true);
  const [wakeUpHistory, setWakeUpHistory] = useState([]);
  const [speechSupported, setSpeechSupported] = useState(false);
  useEffect(() => {
    // 检查语音合成支持
    setSpeechSupported('speechSynthesis' in window);

    // 加载叫醒历史
    const mockHistory = [{
      date: '2024-01-15',
      time: '06:30',
      status: 'completed',
      mood: 'excellent'
    }, {
      date: '2024-01-14',
      time: '06:32',
      status: 'completed',
      mood: 'good'
    }, {
      date: '2024-01-13',
      time: '06:45',
      status: 'snoozed',
      mood: 'fair'
    }];
    setWakeUpHistory(mockHistory);

    // 每分钟检查时间
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      checkWakeUpTime(now);
    }, 60000);
    return () => clearInterval(timer);
  }, []);
  const checkWakeUpTime = now => {
    if (!isEnabled) return;
    const currentHours = now.getHours().toString().padStart(2, '0');
    const currentMinutes = now.getMinutes().toString().padStart(2, '0');
    const currentTimeStr = `${currentHours}:${currentMinutes}`;
    if (currentTimeStr === wakeUpTime && !isWakeUpTime) {
      triggerWakeUp();
    }
  };
  const triggerWakeUp = () => {
    setIsWakeUpTime(true);
    generateWakeUpMessage();

    // 自动播放语音
    setTimeout(() => {
      playWakeUpMessage();
    }, 1000);
    toast({
      title: "早安叫醒",
      description: "AI助手正在为您准备今日叫醒服务",
      duration: 5000
    });
  };
  const generateWakeUpMessage = () => {
    const messages = [`早安！${userPreferences?.name || '健康达人'}，今天是${new Date().toLocaleDateString('zh-CN', {
      weekday: 'long'
    })}，${new Date().toLocaleDateString('zh-CN', {
      month: 'long',
      day: 'numeric'
    })}。`, '根据您的睡眠数据分析，您昨晚的睡眠质量为85分，深度睡眠充足。', '今日健康重点：建议进行30分钟晨练，补充维生素D，保持充足水分。', '记得按时服用今日的营养补充剂，早餐建议包含优质蛋白质。', '祝您拥有美好的一天！让我们一起开启健康之旅！'];
    setWakeUpMessage(messages.join('\n\n'));
  };
  const playWakeUpMessage = async () => {
    if (!speechSupported) {
      toast({
        title: "语音播放不可用",
        description: "您的浏览器不支持语音合成功能",
        variant: "destructive"
      });
      return;
    }
    try {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(wakeUpMessage);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      utterance.onend = () => {
        setIsPlaying(false);
        onWakeUpComplete?.({
          time: new Date().toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          status: 'completed',
          message: wakeUpMessage
        });
      };
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      setIsPlaying(false);
      toast({
        title: "语音播放失败",
        description: "请检查浏览器语音合成设置",
        variant: "destructive"
      });
    }
  };
  const stopWakeUp = () => {
    if (speechSupported) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsWakeUpTime(false);
  };
  const snoozeWakeUp = () => {
    stopWakeUp();
    const snoozeMinutes = 5;
    const now = new Date();
    now.setMinutes(now.getMinutes() + snoozeMinutes);
    const snoozeTime = now.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
    toast({
      title: "贪睡模式",
      description: `${snoozeMinutes}分钟后再次叫醒 (${snoozeTime})`
    });
    setTimeout(() => {
      triggerWakeUp();
    }, snoozeMinutes * 60 * 1000);
  };
  const handleTimeChange = newTime => {
    setWakeUpTime(newTime);
    toast({
      title: "叫醒时间已更新",
      description: `明日将在${newTime}叫醒您`
    });
  };
  const getMoodColor = mood => {
    switch (mood) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'fair':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getMoodText = mood => {
    switch (mood) {
      case 'excellent':
        return '优秀';
      case 'good':
        return '良好';
      case 'fair':
        return '一般';
      default:
        return '未知';
    }
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'snoozed':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <X className="w-4 h-4 text-gray-400" />;
    }
  };
  return <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Sun className="w-5 h-5 mr-2" />
            AI智能叫醒服务
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsEnabled(!isEnabled)} className={isEnabled ? 'text-green-600 border-green-600' : 'text-gray-600 border-gray-600'}>
              {isEnabled ? <Bell className="w-4 h-4 mr-2" /> : <BellOff className="w-4 h-4 mr-2" />}
              {isEnabled ? '已启用' : '已禁用'}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              设置
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 当前时间和叫醒时间 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">当前时间</h3>
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {currentTime.toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit'
            })}
            </div>
            <div className="text-sm text-gray-600">
              {currentTime.toLocaleDateString('zh-CN', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
            </div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
            <Sun className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">叫醒时间</h3>
            <div className="text-3xl font-bold text-yellow-600 mb-1">
              {wakeUpTime}
            </div>
            <div className="text-sm text-gray-600">每日智能叫醒</div>
          </div>
        </div>

        {/* 叫醒状态 */}
        {isWakeUpTime && <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 text-center">
            <Sparkles className="w-12 h-12 text-green-600 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-gray-800 mb-3">早安叫醒进行中</h3>
            <p className="text-gray-600 mb-4 whitespace-pre-line">
              {wakeUpMessage}
            </p>
            <div className="flex justify-center space-x-4">
              <Button onClick={snoozeWakeUp} variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-50">
                <Clock className="w-4 h-4 mr-2" />
                贪睡5分钟
              </Button>
              <Button onClick={stopWakeUp} variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                <BellOff className="w-4 h-4 mr-2" />
                停止叫醒
              </Button>
              <Button onClick={playWakeUpMessage} disabled={isPlaying} className="bg-green-600 hover:bg-green-700">
                {isPlaying ? <>
                    <Pause className="w-4 h-4 mr-2" />
                    播放中...
                  </> : <>
                    <Volume2 className="w-4 h-4 mr-2" />
                    重新播放
                  </>}
              </Button>
            </div>
          </div>}

        {/* 叫醒历史 */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">最近叫醒记录</h4>
          <div className="space-y-3">
            {wakeUpHistory.map((record, index) => <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(record.status)}
                  <div>
                    <p className="font-medium text-gray-800">{record.date}</p>
                    <p className="text-sm text-gray-600">叫醒时间: {record.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(record.mood)}`}>
                    {getMoodText(record.mood)}
                  </span>
                </div>
              </div>)}
          </div>
        </div>

        {/* 语音设置 */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
            <Volume2 className="w-4 h-4 mr-2" />
            语音设置
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">语音合成:</p>
              <p className="font-medium">{speechSupported ? '支持' : '不支持'}</p>
            </div>
            <div>
              <p className="text-gray-600">语音语速:</p>
              <p className="font-medium">正常 (0.9x)</p>
            </div>
            <div>
              <p className="text-gray-600">语音音量:</p>
              <p className="font-medium">80%</p>
            </div>
            <div>
              <p className="text-gray-600">语音语言:</p>
              <p className="font-medium">中文</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
}