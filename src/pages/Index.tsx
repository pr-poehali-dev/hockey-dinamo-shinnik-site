import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Player {
  name: string;
  team: string;
  position: string;
  goals: number;
  assists: number;
  points: number;
  games: number;
}

interface NewsItem {
  title: string;
  date: string;
  preview: string;
  category: string;
}

interface Standing {
  position: number;
  team: string;
  games: number;
  wins: number;
  overtimeWins: number;
  overtimeLosses: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

interface BettingOdds {
  team: string;
  championship: string;
  playoffs: string;
  topScorer: string;
}

const standings: Standing[] = [
  { position: 1, team: 'Торпедо', games: 10, wins: 9, overtimeWins: 0, overtimeLosses: 0, losses: 1, goalsFor: 30, goalsAgainst: 12, points: 18 },
  { position: 2, team: 'Салават Юлаев', games: 10, wins: 6, overtimeWins: 0, overtimeLosses: 2, losses: 2, goalsFor: 22, goalsAgainst: 14, points: 14 },
  { position: 3, team: 'Аризона', games: 10, wins: 7, overtimeWins: 0, overtimeLosses: 0, losses: 3, goalsFor: 38, goalsAgainst: 6, points: 14 },
  { position: 4, team: 'Адмирал', games: 10, wins: 7, overtimeWins: 0, overtimeLosses: 0, losses: 3, goalsFor: 15, goalsAgainst: 11, points: 14 },
  { position: 5, team: 'СКА', games: 10, wins: 6, overtimeWins: 0, overtimeLosses: 0, losses: 4, goalsFor: 18, goalsAgainst: 13, points: 12 },
  { position: 6, team: 'Сибирь', games: 10, wins: 5, overtimeWins: 0, overtimeLosses: 2, losses: 3, goalsFor: 17, goalsAgainst: 15, points: 12 },
  { position: 7, team: 'Металлург', games: 10, wins: 5, overtimeWins: 0, overtimeLosses: 0, losses: 5, goalsFor: 21, goalsAgainst: 13, points: 10 },
  { position: 8, team: 'Динамо Рига', games: 9, wins: 4, overtimeWins: 0, overtimeLosses: 0, losses: 5, goalsFor: 8, goalsAgainst: 16, points: 8 },
  { position: 9, team: 'Слован', games: 8, wins: 3, overtimeWins: 1, overtimeLosses: 0, losses: 4, goalsFor: 7, goalsAgainst: 13, points: 8 },
  { position: 10, team: 'Кристалл', games: 8, wins: 3, overtimeWins: 0, overtimeLosses: 1, losses: 4, goalsFor: 9, goalsAgainst: 9, points: 7 },
  { position: 11, team: 'Йокерит', games: 8, wins: 4, overtimeWins: 0, overtimeLosses: 0, losses: 4, goalsFor: 11, goalsAgainst: 15, points: 8 },
  { position: 12, team: 'Северсталь', games: 8, wins: 4, overtimeWins: 0, overtimeLosses: 0, losses: 4, goalsFor: 10, goalsAgainst: 15, points: 8 },
  { position: 13, team: 'Ак Барс', games: 9, wins: 3, overtimeWins: 0, overtimeLosses: 0, losses: 6, goalsFor: 13, goalsAgainst: 9, points: 6 },
  { position: 14, team: 'Неман', games: 8, wins: 3, overtimeWins: 0, overtimeLosses: 0, losses: 5, goalsFor: 8, goalsAgainst: 6, points: 6 },
  { position: 15, team: 'Спартак', games: 9, wins: 3, overtimeWins: 0, overtimeLosses: 0, losses: 6, goalsFor: 7, goalsAgainst: 13, points: 6 },
  { position: 16, team: 'Автомобилист', games: 9, wins: 2, overtimeWins: 0, overtimeLosses: 0, losses: 7, goalsFor: 15, goalsAgainst: 6, points: 4 },
  { position: 17, team: 'Динамо Минск', games: 8, wins: 1, overtimeWins: 0, overtimeLosses: 0, losses: 7, goalsFor: 5, goalsAgainst: 24, points: 2 },
];

const topScorers: Player[] = [
  { name: 'Connor McDavid', team: 'Boston Bruins', position: 'Нападающий', goals: 12, assists: 18, points: 30, games: 10 },
  { name: 'Nathan MacKinnon', team: 'Pittsburgh Penguins', position: 'Нападающий', goals: 10, assists: 16, points: 26, games: 10 },
  { name: 'Auston Matthews', team: 'Chicago Blackhawks', position: 'Нападающий', goals: 14, assists: 8, points: 22, games: 10 },
  { name: 'Leon Draisaitl', team: 'Nashville Predators', position: 'Нападающий', goals: 9, assists: 12, points: 21, games: 10 },
  { name: 'David Pastrnak', team: 'Vegas Golden Knights', position: 'Нападающий', goals: 11, assists: 9, points: 20, games: 10 },
  { name: 'Nikita Kucherov', team: 'Tampa Bay Lightning', position: 'Нападающий', goals: 8, assists: 11, points: 19, games: 10 },
  { name: 'Artemi Panarin', team: 'Toronto Maple Leafs', position: 'Нападающий', goals: 7, assists: 11, points: 18, games: 10 },
  { name: 'Mikko Rantanen', team: 'Colorado Avalanche', position: 'Нападающий', goals: 6, assists: 10, points: 16, games: 10 },
];

const bettingOdds: BettingOdds[] = [
  { team: 'Торпедо', championship: '2.50', playoffs: '1.15', topScorer: '4.00' },
  { team: 'Салават Юлаев', championship: '3.80', playoffs: '1.35', topScorer: '5.50' },
  { team: 'Аризона', championship: '4.50', playoffs: '1.50', topScorer: '6.00' },
  { team: 'Адмирал', championship: '5.00', playoffs: '1.65', topScorer: '7.00' },
  { team: 'СКА', championship: '6.50', playoffs: '1.80', topScorer: '8.00' },
  { team: 'Сибирь', championship: '7.00', playoffs: '2.00', topScorer: '9.00' },
  { team: 'Металлург', championship: '10.00', playoffs: '2.50', topScorer: '12.00' },
  { team: 'Динамо Рига', championship: '12.00', playoffs: '3.00', topScorer: '14.00' },
  { team: 'Слован', championship: '15.00', playoffs: '3.50', topScorer: '16.00' },
  { team: 'Кристалл', championship: '18.00', playoffs: '4.00', topScorer: '18.00' },
  { team: 'Йокерит', championship: '20.00', playoffs: '4.50', topScorer: '20.00' },
  { team: 'Северсталь', championship: '25.00', playoffs: '5.00', topScorer: '22.00' },
  { team: 'Ак Барс', championship: '30.00', playoffs: '6.00', topScorer: '25.00' },
  { team: 'Неман', championship: '35.00', playoffs: '7.00', topScorer: '28.00' },
  { team: 'Спартак', championship: '40.00', playoffs: '8.00', topScorer: '30.00' },
  { team: 'Автомобилист', championship: '60.00', playoffs: '12.00', topScorer: '40.00' },
  { team: 'Динамо Минск', championship: '100.00', playoffs: '20.00', topScorer: '60.00' },
];

const news: NewsItem[] = [
  {
    title: 'Торпедо одержало уверенную победу!',
    date: '23 ноября 2024',
    preview: 'Лидер турнирной таблицы Торпедо обыграл Динамо Минск со счетом 5:1. Команда продолжает уверенно держать первое место с 18 очками.',
    category: 'Матчи'
  },
  {
    title: 'Салават Юлаев вышел на второе место',
    date: '20 ноября 2024',
    preview: 'После победы над Автомобилистом в овертайме 3:2, Салават Юлаев поднялся на вторую строчку турнирной таблицы с 14 очками.',
    category: 'Новости'
  },
  {
    title: 'Аризона показывает отличную форму',
    date: '18 ноября 2024',
    preview: 'Аризона разгромила Спартак со счетом 6:1. Команда набрала 38 заброшенных шайб за сезон - лучший показатель в лиге.',
    category: 'Результаты'
  },
  {
    title: 'Старт сезона IHL 2024/25!',
    date: '15 ноября 2024',
    preview: 'Международная хоккейная лига IHL стартовала с захватывающих матчей. 17 команд борются за главный трофей сезона. Лидерами стали Торпедо и Салават Юлаев.',
    category: 'Турнир'
  }
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('news');

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[70vh] bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZCIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <div className="animate-fade-in">
            <h1 className="text-7xl md:text-9xl font-bold text-primary mb-4 tracking-wider drop-shadow-2xl">
              IHL
            </h1>
            <p className="text-2xl md:text-3xl text-white mb-8 font-medium">
              International Hockey League
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Badge className="bg-primary text-black px-6 py-3 text-lg hover:bg-primary/90 font-bold">
                Сезон 2024/25
              </Badge>
              <Badge className="bg-white text-black px-6 py-3 text-lg hover:bg-white/90 font-bold">
                17 команд
              </Badge>
              <Badge className="bg-primary/80 backdrop-blur text-black px-6 py-3 text-lg font-bold">
                Pro League
              </Badge>
              <Badge className="bg-white/80 backdrop-blur text-black px-6 py-3 text-lg font-bold">
                25 игр
              </Badge>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20 pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 h-14 bg-card shadow-lg mb-8 border border-primary">
            <TabsTrigger value="news" className="text-sm md:text-base font-bold">
              <Icon name="Newspaper" size={20} className="mr-1 md:mr-2" />
              НОВОСТИ
            </TabsTrigger>
            <TabsTrigger value="standings" className="text-sm md:text-base font-bold">
              <Icon name="Trophy" size={20} className="mr-1 md:mr-2" />
              ТАБЛИЦА
            </TabsTrigger>
            <TabsTrigger value="betting" className="text-sm md:text-base font-bold">
              <Icon name="TrendingUp" size={20} className="mr-1 md:mr-2" />
              СТАВКИ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-4 animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-center text-primary">Новости лиги</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {news.map((item, idx) => (
                <Card key={idx} className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-primary/30 hover:border-primary">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-primary text-black font-bold">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{item.preview}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="standings" className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-center text-primary">Турнирная таблица IHL</h2>
            <Card className="max-w-6xl mx-auto border-2 border-primary/50">
              <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/10">
                <CardTitle className="text-2xl text-center">Сезон 2024/25</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-primary/20">
                      <tr>
                        <th className="px-3 py-3 text-left font-bold text-sm">#</th>
                        <th className="px-3 py-3 text-left font-bold text-sm">Команда</th>
                        <th className="px-3 py-3 text-center font-bold text-sm">И</th>
                        <th className="px-3 py-3 text-center font-bold text-sm">В</th>
                        <th className="px-3 py-3 text-center font-bold text-sm">ВО</th>
                        <th className="px-3 py-3 text-center font-bold text-sm">ПО</th>
                        <th className="px-3 py-3 text-center font-bold text-sm">П</th>
                        <th className="px-3 py-3 text-center font-bold text-sm">ШЗ</th>
                        <th className="px-3 py-3 text-center font-bold text-sm">ШП</th>
                        <th className="px-3 py-3 text-center font-bold text-sm bg-primary/30">О</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((team, idx) => (
                        <tr 
                          key={idx} 
                          className="border-b border-border hover:bg-primary/5 transition-colors"
                        >
                          <td className="px-3 py-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              team.position <= 3 
                                ? 'bg-primary text-black' 
                                : 'bg-muted text-foreground'
                            }`}>
                              {team.position}
                            </div>
                          </td>
                          <td className="px-3 py-4 font-semibold">{team.team}</td>
                          <td className="px-3 py-4 text-center text-muted-foreground">{team.games}</td>
                          <td className="px-3 py-4 text-center text-primary font-semibold">{team.wins}</td>
                          <td className="px-3 py-4 text-center text-primary/70">{team.overtimeWins}</td>
                          <td className="px-3 py-4 text-center text-muted-foreground">{team.overtimeLosses}</td>
                          <td className="px-3 py-4 text-center text-muted-foreground font-semibold">{team.losses}</td>
                          <td className="px-3 py-4 text-center">{team.goalsFor}</td>
                          <td className="px-3 py-4 text-center">{team.goalsAgainst}</td>
                          <td className="px-3 py-4 text-center bg-primary/10">
                            <Badge className="bg-primary text-black font-bold">{team.points}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-muted/30 border-t border-border">
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span><strong>И</strong> - Игры</span>
                    <span><strong>В</strong> - Победы</span>
                    <span><strong>ВО</strong> - Победы в овертайме</span>
                    <span><strong>ПО</strong> - Поражения в овертайме</span>
                    <span><strong>П</strong> - Поражения</span>
                    <span><strong>ШЗ</strong> - Шайбы забитые</span>
                    <span><strong>ШП</strong> - Шайбы пропущенные</span>
                    <span><strong>О</strong> - Очки</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="betting" className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-center text-primary">Ставки на команды</h2>
            <Card className="max-w-5xl mx-auto border-2 border-primary/50">
              <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/10">
                <CardTitle className="text-2xl text-center">Коэффициенты букмекеров</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-primary/20">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold">Команда</th>
                        <th className="px-4 py-3 text-center font-bold">Чемпионство</th>
                        <th className="px-4 py-3 text-center font-bold">Плей-офф</th>
                        <th className="px-4 py-3 text-center font-bold">Лучший бомбардир</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bettingOdds.map((odd, idx) => (
                        <tr key={idx} className="border-b border-border hover:bg-primary/5 transition-colors">
                          <td className="px-4 py-4 font-semibold">{odd.team}</td>
                          <td className="px-4 py-4 text-center">
                            <Badge className="bg-primary text-black font-bold">{odd.championship}</Badge>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <Badge variant="outline" className="font-bold border-primary">{odd.playoffs}</Badge>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <Badge variant="secondary" className="font-bold">{odd.topScorer}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-muted/30 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    * Коэффициенты указаны для примера. Ставки на реальные деньги могут быть опасны для вашего бюджета.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>


        </Tabs>
      </div>
    </div>
  );
}