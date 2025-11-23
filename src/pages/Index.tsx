import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Match {
  date: string;
  time: string;
  opponent: string;
  isHome: boolean;
  result?: string;
}

interface Player {
  name: string;
  number: string;
  position: string;
  isCaptain?: boolean;
  isAssistant?: boolean;
  goals?: number;
  assists?: number;
  points?: number;
  saves?: number;
  svPercent?: number;
  stats: {
    games: number;
    goals: number;
    assists: number;
    points: number;
    plusMinus: number;
  };
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

const standings: Standing[] = [
  { position: 1, team: 'Boston Bruins', games: 10, wins: 8, overtimeWins: 1, overtimeLosses: 0, losses: 1, goalsFor: 35, goalsAgainst: 18, points: 25 },
  { position: 2, team: 'Pittsburgh Penguins', games: 10, wins: 7, overtimeWins: 1, overtimeLosses: 1, losses: 1, goalsFor: 32, goalsAgainst: 20, points: 23 },
  { position: 3, team: 'Chicago Blackhawks', games: 10, wins: 6, overtimeWins: 2, overtimeLosses: 0, losses: 2, goalsFor: 28, goalsAgainst: 22, points: 22 },
  { position: 4, team: 'Nashville Predators', games: 10, wins: 6, overtimeWins: 0, overtimeLosses: 2, losses: 2, goalsFor: 26, goalsAgainst: 23, points: 20 },
  { position: 5, team: 'Vegas Golden Knights', games: 10, wins: 5, overtimeWins: 1, overtimeLosses: 1, losses: 3, goalsFor: 29, goalsAgainst: 26, points: 18 },
  { position: 6, team: 'Tampa Bay Lightning', games: 10, wins: 5, overtimeWins: 0, overtimeLosses: 2, losses: 3, goalsFor: 27, goalsAgainst: 25, points: 17 },
  { position: 7, team: 'Toronto Maple Leafs', games: 10, wins: 4, overtimeWins: 1, overtimeLosses: 1, losses: 4, goalsFor: 24, goalsAgainst: 27, points: 15 },
  { position: 8, team: 'Florida Panthers', games: 10, wins: 4, overtimeWins: 0, overtimeLosses: 1, losses: 5, goalsFor: 22, goalsAgainst: 28, points: 13 },
  { position: 9, team: 'Colorado Avalanche', games: 10, wins: 3, overtimeWins: 1, overtimeLosses: 0, losses: 6, goalsFor: 20, goalsAgainst: 30, points: 11 },
  { position: 10, team: 'Montreal Canadiens', games: 10, wins: 3, overtimeWins: 0, overtimeLosses: 1, losses: 6, goalsFor: 18, goalsAgainst: 29, points: 10 },
  { position: 11, team: 'Detroit Red Wings', games: 10, wins: 2, overtimeWins: 0, overtimeLosses: 2, losses: 6, goalsFor: 16, goalsAgainst: 32, points: 8 },
  { position: 12, team: 'Arizona Coyotes', games: 10, wins: 1, overtimeWins: 0, overtimeLosses: 1, losses: 8, goalsFor: 12, goalsAgainst: 35, points: 4 },
];

const matches: Match[] = [
  { date: '25 сентября', time: '18:30', opponent: 'Белые медведи', isHome: false, result: '3:0' },
  { date: '2 октября', time: '17:30', opponent: 'Кузнецкие Медведи', isHome: true, result: '2:1' },
  { date: '7 октября', time: '19:00', opponent: 'Мамонты Югры', isHome: false, result: '2:0' },
  { date: '9 октября', time: '17:30', opponent: 'Локо', isHome: true, result: '6:5 (ОТ)' },
  { date: '10 октября', time: '17:30', opponent: 'Сибирские снайперы', isHome: true, result: '2:1 (Б)' },
  { date: '11 октября', time: '18:30', opponent: 'Алмаз', isHome: true, result: '5:0' },
  { date: '16 октября', time: '15:00', opponent: 'ДСПб', isHome: false, result: 'ТП' },
  { date: '16 октября', time: '17:30', opponent: 'Стальные лисы', isHome: false, result: '0:3' },
  { date: '17 октября', time: '16:30', opponent: 'Омские ястребы', isHome: true },
  { date: '18 октября', time: '16:30', opponent: 'Академия Михайлово', isHome: false },
  { date: '19 октября', time: '18:30', opponent: 'СКА', isHome: true },
  { date: '23 октября', time: '18:30', opponent: 'Толпар', isHome: false },
  { date: '24 октября', time: '18:30', opponent: 'Красная армия', isHome: false },
  { date: '25 октября', time: '14:00', opponent: 'Крылья Советов', isHome: false },
  { date: '25 октября', time: '19:30', opponent: 'Тюменский Легион', isHome: true },
  { date: '30 октября', time: '19:00', opponent: 'Спартак', isHome: false },
];

const players: Player[] = [
  { 
    name: 'Unnamed', 
    number: '5', 
    position: 'Вратарь',
    saves: 1,
    svPercent: 100,
    stats: { games: 8, goals: 0, assists: 0, points: 0, plusMinus: 0 }
  },
  { 
    name: 'Morfyy', 
    number: '99', 
    position: 'Вратарь',
    saves: 2,
    svPercent: 100,
    stats: { games: 8, goals: 0, assists: 0, points: 0, plusMinus: 0 }
  },
  { 
    name: 'Ylokz', 
    number: '19', 
    position: 'Защитник', 
    isCaptain: true,
    goals: 1,
    assists: 5,
    points: 6,
    stats: { games: 8, goals: 1, assists: 5, points: 6, plusMinus: 8 }
  },
  { 
    name: 'николаич', 
    number: '35', 
    position: 'Защитник',
    goals: 0,
    assists: 3,
    points: 3,
    stats: { games: 8, goals: 0, assists: 3, points: 3, plusMinus: 5 }
  },
  { 
    name: 'quantum', 
    number: '53', 
    position: 'Нападающий',
    goals: 7,
    assists: 2,
    points: 9,
    stats: { games: 8, goals: 7, assists: 2, points: 9, plusMinus: 10 }
  },
  { 
    name: 'estriper', 
    number: '3', 
    position: 'Нападающий',
    goals: 1,
    assists: 1,
    points: 2,
    stats: { games: 8, goals: 1, assists: 1, points: 2, plusMinus: 3 }
  },
  { 
    name: 'Gazash', 
    number: '21', 
    position: 'Нападающий', 
    isAssistant: true,
    goals: 5,
    assists: 4,
    points: 9,
    stats: { games: 8, goals: 5, assists: 4, points: 9, plusMinus: 9 }
  },
  { 
    name: 'крико', 
    number: '54', 
    position: 'Нападающий',
    goals: 3,
    assists: 3,
    points: 6,
    stats: { games: 8, goals: 3, assists: 3, points: 6, plusMinus: 7 }
  },
  { 
    name: 'huksyy', 
    number: '7', 
    position: 'Нападающий',
    goals: 0,
    assists: 0,
    points: 0,
    stats: { games: 8, goals: 0, assists: 0, points: 0, plusMinus: 0 }
  },
];

const news: NewsItem[] = [
  {
    title: 'Boston Bruins берут старт с победы!',
    date: '23 ноября 2024',
    preview: 'В стартовом матче сезона IHL команда Boston Bruins уверенно обыграла Florida Panthers со счетом 4:1. Хет-трик оформил нападающий McDavid.',
    category: 'Матчи'
  },
  {
    title: 'Рекордная посещаемость на матче IHL',
    date: '20 ноября 2024',
    preview: 'Встреча Pittsburgh Penguins и Chicago Blackhawks собрала рекордные 18,500 зрителей. Матч завершился победой Penguins в овертайме 3:2.',
    category: 'Новости'
  },
  {
    title: 'Vegas Golden Knights продолжают серию побед',
    date: '18 ноября 2024',
    preview: 'Vegas одержали четвертую победу подряд, обыграв Detroit Red Wings 5:2. Команда показывает отличную атакующую игру в начале сезона.',
    category: 'Результаты'
  },
  {
    title: 'Старт сезона IHL 2024/25!',
    date: '15 ноября 2024',
    preview: 'Международная хоккейная лига IHL стартовала с захватывающих матчей. 12 команд борются за главный трофей сезона. Первыми лидерами стали Boston Bruins и Pittsburgh Penguins.',
    category: 'Турнир'
  }
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('news');

  const upcomingMatches = matches.filter(m => !m.result);
  const pastMatches = matches.filter(m => m.result);

  const topScorers = [...players]
    .filter(p => p.position !== 'Вратарь')
    .sort((a, b) => b.stats.points - a.stats.points)
    .slice(0, 5);

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
                12 команд
              </Badge>
              <Badge className="bg-primary/80 backdrop-blur text-black px-6 py-3 text-lg font-bold">
                Pro League
              </Badge>
              <Badge className="bg-white/80 backdrop-blur text-black px-6 py-3 text-lg font-bold">
                82 игры
              </Badge>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20 pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-5xl mx-auto grid-cols-5 h-14 bg-card shadow-lg mb-8 border border-border">
            <TabsTrigger value="news" className="text-sm md:text-base font-bold">
              <Icon name="Newspaper" size={20} className="mr-1 md:mr-2" />
              НОВОСТИ
            </TabsTrigger>
            <TabsTrigger value="standings" className="text-sm md:text-base font-bold">
              <Icon name="Trophy" size={20} className="mr-1 md:mr-2" />
              ТУРНИР
            </TabsTrigger>
            <TabsTrigger value="matches" className="text-sm md:text-base font-bold">
              <Icon name="Calendar" size={20} className="mr-1 md:mr-2" />
              МАТЧИ
            </TabsTrigger>
            <TabsTrigger value="players" className="text-sm md:text-base font-bold">
              <Icon name="Users" size={20} className="mr-1 md:mr-2" />
              СОСТАВ
            </TabsTrigger>
            <TabsTrigger value="stats" className="text-sm md:text-base font-bold">
              <Icon name="BarChart3" size={20} className="mr-1 md:mr-2" />
              СТАТИСТИКА
            </TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-4 animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-center">Новости клуба</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {news.map((item, idx) => (
                <Card key={idx} className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-border hover:border-primary">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs">
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
<h2 className="text-4xl font-bold mb-6 text-center">Западная конференция VFHL</h2>
            <Card className="max-w-6xl mx-auto border-2 border-primary/30">
              <CardHeader className="bg-gradient-to-r from-primary/20 to-blue-600/20">
                <CardTitle className="text-2xl text-center">Турнирная таблица • Сезон 2024/25</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
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
                        <th className="px-3 py-3 text-center font-bold text-sm bg-primary/20">О</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((team, idx) => (
                        <tr 
                          key={idx} 
                          className={`border-b border-border transition-colors ${
                            team.team === 'Динамо-Шинник' 
                              ? 'bg-primary/10 hover:bg-primary/20 font-semibold' 
                              : 'hover:bg-muted/30'
                          }`}
                        >
                          <td className="px-3 py-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              team.position <= 3 
                                ? 'bg-gradient-to-br from-primary to-blue-600 text-white' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {team.position}
                            </div>
                          </td>
                          <td className="px-3 py-4">
                            <div className="flex items-center gap-2">
                              {team.team === 'Динамо-Шинник' && (
                                <Icon name="Star" size={16} className="text-primary" />
                              )}
                              <span className="font-semibold">{team.team}</span>
                            </div>
                          </td>
                          <td className="px-3 py-4 text-center text-muted-foreground">{team.games}</td>
                          <td className="px-3 py-4 text-center text-green-500 font-semibold">{team.wins}</td>
                          <td className="px-3 py-4 text-center text-green-400">{team.overtimeWins}</td>
                          <td className="px-3 py-4 text-center text-orange-400">{team.overtimeLosses}</td>
                          <td className="px-3 py-4 text-center text-red-500 font-semibold">{team.losses}</td>
                          <td className="px-3 py-4 text-center text-blue-400">{team.goalsFor}</td>
                          <td className="px-3 py-4 text-center text-orange-500">{team.goalsAgainst}</td>
                          <td className="px-3 py-4 text-center bg-primary/10">
                            <Badge className="bg-primary font-bold">{team.points}</Badge>
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

          <TabsContent value="matches" className="space-y-4 animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-center">Календарь матчей</h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">Предстоящие матчи</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {upcomingMatches.map((match, idx) => (
                  <Card key={idx} className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-border hover:border-primary">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">{match.date}</p>
                          <p className="text-2xl font-bold text-primary">{match.time} МСК</p>
                        </div>
                        <Badge variant={match.isHome ? "default" : "secondary"}>
                          {match.isHome ? '🏠 Дома' : '✈️ Выезд'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 text-right">
                          <p className="text-sm text-muted-foreground mb-1">Динамо Шинник</p>
                          <div className="w-12 h-12 bg-primary rounded-full mx-auto flex items-center justify-center text-white font-bold text-xl">
                            ДШ
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-muted-foreground">VS</div>
                        <div className="flex-1 text-left">
                          <p className="text-sm text-muted-foreground mb-1">{match.opponent}</p>
                          <div className="w-12 h-12 bg-secondary rounded-full mx-auto flex items-center justify-center text-white font-bold">
                            <Icon name="Shield" size={24} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Результаты</h3>
              <div className="max-w-2xl mx-auto space-y-4">
                {pastMatches.map((match, idx) => (
                  <Card key={idx} className="hover:shadow-xl transition-all border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-1">{match.date} • {match.time} МСК</p>
                          <div className="flex items-center gap-3">
                            <p className="font-bold text-lg">Динамо Шинник</p>
                            <Badge variant={match.isHome ? "default" : "secondary"} className="text-xs">
                              {match.isHome ? 'Дома' : 'Выезд'}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{match.opponent}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-4xl font-bold text-primary">{match.result}</div>
                          <Badge className="bg-green-500 text-white mt-2">ПОБЕДА</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="players" className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-center text-white">Состав команды</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {players.map((player, idx) => {
                const getInitials = (name: string) => {
                  const parts = name.split(' ');
                  if (parts.length >= 2) return parts[0][0] + parts[1][0];
                  return name.substring(0, 2).toUpperCase();
                };
                
                const avatarColors = [
                  'from-blue-500 to-blue-700',
                  'from-indigo-500 to-indigo-700',
                  'from-purple-500 to-purple-700',
                  'from-cyan-500 to-cyan-700',
                  'from-sky-500 to-sky-700',
                  'from-blue-600 to-indigo-600',
                  'from-violet-500 to-violet-700',
                  'from-blue-400 to-blue-600',
                  'from-indigo-600 to-purple-600'
                ];
                
                return (
                  <Card key={idx} className="bg-slate-800 border-slate-700 hover:shadow-xl hover:shadow-primary/20 transition-all hover:-translate-y-1 hover:border-primary group overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-6 pb-4">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                        <div className="flex items-start gap-4 relative z-10">
                          <div className={`w-20 h-20 bg-gradient-to-br ${avatarColors[idx % avatarColors.length]} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform border-4 border-slate-700`}>
                            {getInitials(player.name)}
                          </div>
                          <div className="flex-1 pt-2">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-bold text-white">{player.name}</h3>
                              {player.isCaptain && (
                                <Badge className="bg-blue-500 text-xs">C</Badge>
                              )}
                              {player.isAssistant && (
                                <Badge className="bg-slate-600 text-white text-xs">A</Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-400">{player.position}</p>
                            <div className="mt-2">
                              <Badge variant="outline" className="border-primary/50 text-primary text-xs">
                                #{player.number}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-6 pb-6">
                        {player.position !== 'Вратарь' ? (
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-slate-900/50 p-3 rounded-lg">
                              <p className="text-xs text-slate-400 mb-1">Голы</p>
                              <p className="text-xl font-bold text-green-400">{player.goals || 0}</p>
                            </div>
                            <div className="bg-slate-900/50 p-3 rounded-lg">
                              <p className="text-xs text-slate-400 mb-1">Передачи</p>
                              <p className="text-xl font-bold text-blue-400">{player.assists || 0}</p>
                            </div>
                            <div className="bg-slate-900/50 p-3 rounded-lg">
                              <p className="text-xs text-slate-400 mb-1">Очки</p>
                              <p className="text-xl font-bold text-primary">{player.points || 0}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-slate-900/50 p-4 rounded-lg text-center">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-slate-400 mb-1">Сэйвы</p>
                                <p className="text-xl font-bold text-blue-400">{player.saves}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400 mb-1">SV%</p>
                                <p className="text-xl font-bold text-green-400">{player.svPercent}%</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-center">Статистика сезона</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Trophy" className="text-primary" />
                    Общая статистика
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-4xl font-bold text-primary mb-2">8</div>
                      <p className="text-sm text-muted-foreground uppercase">Игр сыграно</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-4xl font-bold text-green-500 mb-2">6</div>
                      <p className="text-sm text-muted-foreground uppercase">Побед</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-4xl font-bold text-primary mb-2">20</div>
                      <p className="text-sm text-muted-foreground uppercase">Голов забито</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-4xl font-bold text-orange-500 mb-2">10</div>
                      <p className="text-sm text-muted-foreground uppercase">Голов пропущено</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Target" className="text-primary" />
                    Топ бомбардиров
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topScorers.map((player, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="font-bold">{player.name}</p>
                            <p className="text-xs text-muted-foreground">{player.position}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{player.stats.points}</p>
                          <p className="text-xs text-muted-foreground">{player.stats.goals}+{player.stats.assists}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-card border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-2">ДИНАМО ШИННИК</h2>
          <p className="text-muted-foreground">VFHL • Сезон 2024/25 • 2 место в Западной конференции</p>
          <p className="text-sm text-muted-foreground mt-4">Время московское</p>
        </div>
      </footer>
    </div>
  );
}