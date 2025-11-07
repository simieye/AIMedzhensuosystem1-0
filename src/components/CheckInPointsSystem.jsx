// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Trophy, Star, Calendar, Target, Zap, Gift, Crown, Medal, Award, CheckCircle, TrendingUp, Clock, Users } from 'lucide-react';

export function CheckInPointsSystem({
  onCheckIn,
  userPoints,
  checkInHistory
}) {
  const {
    toast
  } = useToast;
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalCheckIns, setTotalCheckIns] = useState(0);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [rewards, setRewards] = useState([]);
  const [selectedReward, setSelectedReward] = useState(null);
  const [checkInAnimation, setCheckInAnimation] = useState(false);
  useEffect(() => {
    // 初始化数据
    const mockData = {
      hasCheckedInToday: false,
      currentStreak: 7,
      totalCheckIns: 45,
      points: 2580,
      level: 3
    };
    setHasCheckedInToday(mockData.hasCheckedInToday);
    setCurrentStreak(mockData.currentStreak);
    setTotalCheckIns(mockData.totalCheckIns);
    setPoints(mockData.points);
    setLevel(mockData.level);
    generateRewards();
  }, []);
  const generateRewards = () => {
    const mockRewards = [{
      id: 1,
      name: '健康达人徽章',
      description: '连续打卡30天获得',
      points: 500,
      type: 'badge',
      icon: Medal,
      color: 'text-yellow-600',
      required: 30,
      progress: 7,
      unlocked: false
    }, {
      id: 2,
      name: '营养补充券',
      description: '可兑换NMN产品优惠券',
      points: 1000,
      type: 'coupon',
      icon: Gift,
      color: 'text-blue-600',
      required: 0,
      progress: 100,
      unlocked: true
    }, {
      id: 3,
      name: 'VIP体检套餐',
      description: '免费升级VIP体检服务',
      points: 2000,
      type: 'service',
      icon: Crown,
      color: 'text-purple-600',
      required: 0,
      progress: 100,
      unlocked: true
    }, {
      id: 4,
      name: '运动装备',
      description: '品牌运动手环折扣券',
      points: 1500,
      type: 'product',
      icon: Target,
      color: 'text-green-600',
      required: 0,
      progress: 100,
      unlocked: false
    }, {
      id: 5,
      name: '专家咨询',
      description: '一对一健康专家咨询',
      points: 3000,
      type: 'service',
      icon: Users,
      color: 'text-red-600',
      required: 0,
      progress: 100,
      unlocked: false
    }];
    setRewards(mockRewards);
  };
  const handleCheckIn = () => {
    if (hasCheckedInToday) {
      toast({
        title: "今日已打卡",
        description: "您今天已经完成打卡了，明天再来吧！",
        variant: "default"
      });
      return;
    }
    setCheckInAnimation(true);

    // 计算积分
    const basePoints = 10;
    const streakBonus = Math.floor(currentStreak / 7) * 5;
    const totalPointsEarned = basePoints + streakBonus;
    setTimeout(() => {
      setHasCheckedInToday(true);
      setCurrentStreak(prev => prev + 1);
      setTotalCheckIns(prev => prev + 1);
      setPoints(prev => prev + totalPointsEarned);
      setCheckInAnimation(false);
      onCheckIn?.({
        date: new Date(),
        points: totalPointsEarned,
        streak: currentStreak + 1
      });
      toast({
        title: "打卡成功！",
        description: `获得${totalPointsEarned}积分（基础${basePoints}+连续${streakBonus}）`,
        duration: 3000
      });
    }, 1500);
  };
  const handleRedeemReward = reward => {
    if (points < reward.points) {
      toast({
        title: "积分不足",
        description: `还需要${reward.points - points}积分才能兑换`,
        variant: "destructive"
      });
      return;
    }
    setSelectedReward(reward);
    toast({
      title: "确认兑换",
      description: `确定要兑换"${reward.name}"吗？`,
      action: <Button size="sm" onClick={() => confirmRedeem(reward)}>
          确认兑换
        </Button>
    });
  };
  const confirmRedeem = reward => {
    setPoints(prev => prev - reward.points);
    setRewards(prev => prev.map(r => r.id === reward.id ? {
      ...r,
      unlocked: true
    } : r));
    toast({
      title: "兑换成功",
      description: `成功兑换"${reward.name}"`,
      duration: 3000
    });
    setSelectedReward(null);
  };
  const getLevelInfo = level => {
    const levels = [{
      name: '新手',
      min: 0,
      max: 500,
      color: 'text-gray-600'
    }, {
      name: '入门',
      min: 500,
      max: 1500,
      color: 'text-green-600'
    }, {
      name: '进阶',
      min: 1500,
      max: 3000,
      color: 'text-blue-600'
    }, {
      name: '专家',
      min: 3000,
      max: 5000,
      color: 'text-purple-600'
    }, {
      name: '大师',
      min: 5000,
      max: Infinity,
      color: 'text-yellow-600'
    }];
    return levels.find(l => level >= l.min && level < l.max) || levels[4];
  };
  const getLevelProgress = () => {
    const levelInfo = getLevelInfo(points);
    const progress = (points - levelInfo.min) / (levelInfo.max - levelInfo.min) * 100;
    return Math.min(progress, 100);
  };
  const currentLevelInfo = getLevelInfo(points);
  const levelProgress = getLevelProgress();
  return <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Trophy className="w-5 h-5 mr-2" />
            打卡积分系统
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-600">{points}</div>
              <div className="text-sm text-gray-600">总积分</div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 打卡区域 */}
        <div className="text-center">
          <div className={`inline-flex flex-col items-center p-8 rounded-2xl ${hasCheckedInToday ? 'bg-gray-100' : 'bg-gradient-to-br from-yellow-50 to-orange-50'}`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${hasCheckedInToday ? 'bg-gray-300' : 'bg-gradient-to-br from-yellow-400 to-orange-500'} ${checkInAnimation ? 'animate-pulse' : ''}`}>
              {hasCheckedInToday ? <CheckCircle className="w-10 h-10 text-white" /> : <Star className="w-10 h-10 text-white" />}
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {hasCheckedInToday ? '今日已打卡' : '立即打卡'}
            </h3>
            
            {!hasCheckedInToday && <p className="text-gray-600 mb-4">
              坚持打卡，获得积分奖励
            </p>}
            
            {hasCheckedInToday && <div className="space-y-2">
                <p className="text-green-600 font-medium">打卡成功！</p>
                <p className="text-sm text-gray-600">明天继续加油</p>
              </div>}
            
            <Button onClick={handleCheckIn} disabled={hasCheckedInToday || checkInAnimation} size="lg" className={hasCheckedInToday ? 'bg-gray-400' : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'}>
              {checkInAnimation ? <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  打卡中...
                </> : hasCheckedInToday ? '已完成' : '立即打卡'}
            </Button>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Zap className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{currentStreak}</div>
            <div className="text-sm text-gray-600">连续天数</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{totalCheckIns}</div>
            <div className="text-sm text-gray-600">总打卡数</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{level}</div>
            <div className="text-sm text-gray-600">当前等级</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{rewards.filter(r => r.unlocked).length}</div>
            <div className="text-sm text-gray-600">已解锁奖励</div>
          </div>
        </div>

        {/* 等级进度 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-800">等级进度</h4>
            <span className={`text-sm font-medium ${currentLevelInfo.color}`}>
              {currentLevelInfo.name} Lv.{level}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div className={`h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-500`} style={{
            width: `${levelProgress}%`
          }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>{currentLevelInfo.min}分</span>
            <span>{points}/{currentLevelInfo.max}分</span>
            <span>{currentLevelInfo.max}分</span>
          </div>
        </div>

        {/* 奖励商城 */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">积分兑换</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map(reward => {
            const Icon = reward.icon;
            return <div key={reward.id} className={`border rounded-lg p-4 ${reward.unlocked ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'} hover:shadow-md transition-shadow`}>
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${reward.unlocked ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Icon className={`w-5 h-5 ${reward.unlocked ? reward.color : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-800">{reward.name}</h5>
                    <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold text-gray-800">{reward.points}</span>
                      </div>
                      <Button size="sm" onClick={() => handleRedeemReward(reward)} disabled={reward.unlocked || points < reward.points} variant={reward.unlocked ? 'outline' : 'default'}>
                        {reward.unlocked ? '已兑换' : points >= reward.points ? '兑换' : '积分不足'}
                      </Button>
                    </div>
                    {reward.required > 0 && <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{
                        width: `${reward.progress / reward.required * 100}%`
                      }}></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          进度: {reward.progress}/{reward.required}
                        </p>
                      </div>}
                  </div>
                </div>
              </div>;
          })}
          </div>
        </div>

        {/* 积分规则 */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-3">积分规则</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <p className="font-medium mb-2">获得积分：</p>
              <ul className="space-y-1">
                <li>• 每日打卡：10积分</li>
                <li>• 连续7天：额外5积分</li>
                <li>• 连续30天：额外20积分</li>
                <li>• 完成方案任务：5-20积分</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">积分用途：</p>
              <ul className="space-y-1">
                <li>• 兑换健康产品</li>
                <li>• 获取服务优惠</li>
                <li>• 解锁专属内容</li>
                <li>• 参与活动抽奖</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
}