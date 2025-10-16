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

const matches: Match[] = [
  { date: '25 сентября', time: '18:30', opponent: 'Белые медведи', isHome: false, result: '3:0' },
  { date: '2 октября', time: '17:30', opponent: 'Кузнецкие Медведи', isHome: true, result: '2:1' },
  { date: '7 октября', time: '19:00', opponent: 'Мамонты Югры', isHome: false },
  { date: '9 октября', time: '17:30', opponent: 'Локо', isHome: true },
  { date: '10 октября', time: '17:30', opponent: 'Сибирские снайперы', isHome: true },
  { date: '11 октября', time: '18:30', opponent: 'Алмаз', isHome: true },
  { date: '16 октября', time: '15:00', opponent: 'Чайка', isHome: false },
  { date: '16 октября', time: '17:30', opponent: 'Стальные лисы', isHome: false },
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
    name: 'Morfyy', 
    number: '99', 
    position: 'Нападающий', 
    isCaptain: true,
    stats: { games: 2, goals: 2, assists: 1, points: 3, plusMinus: 3 }
  },
  { 
    name: 'Ylokz', 
    number: '19', 
    position: 'Защитник', 
    isAssistant: true,
    stats: { games: 2, goals: 0, assists: 2, points: 2, plusMinus: 2 }
  },
  { 
    name: 'quantum', 
    number: '53', 
    position: 'Нападающий',
    stats: { games: 2, goals: 1, assists: 0, points: 1, plusMinus: 1 }
  },
  { 
    name: 'gazash', 
    number: '21', 
    position: 'Нападающий',
    stats: { games: 2, goals: 1, assists: 1, points: 2, plusMinus: 2 }
  },
  { 
    name: 'Unnamed', 
    number: '5', 
    position: 'Защитник', 
    isAssistant: true,
    stats: { games: 2, goals: 0, assists: 1, points: 1, plusMinus: 1 }
  },
  { 
    name: 'крико', 
    number: '54', 
    position: 'Защитник',
    stats: { games: 2, goals: 0, assists: 0, points: 0, plusMinus: 0 }
  },
  { 
    name: 'Estriper', 
    number: '3', 
    position: 'Защитник',
    stats: { games: 2, goals: 1, assists: 0, points: 1, plusMinus: 2 }
  },
  { 
    name: 'Cago', 
    number: '13', 
    position: 'Нападающий',
    stats: { games: 2, goals: 0, assists: 0, points: 0, plusMinus: 0 }
  },
  { 
    name: 'Николаич', 
    number: '35', 
    position: 'Вратарь',
    stats: { games: 2, goals: 0, assists: 0, points: 0, plusMinus: 0 }
  },
];

const news: NewsItem[] = [
  {
    title: 'Динамо Шинник одержал вторую победу подряд!',
    date: '2 октября 2024',
    preview: 'В напряженном матче против Кузнецких Медведей наша команда одержала победу со счетом 2:1. Решающую шайбу забросил Morfyy на 58-й минуте.',
    category: 'Матчи'
  },
  {
    title: 'Уверенный старт сезона МХЛ Б',
    date: '26 сентября 2024',
    preview: 'Команда разгромила Белых медведей со счетом 3:0 в первом матче сезона. Отличная игра в обороне и уверенные действия вратаря Николаича.',
    category: 'Результаты'
  },
  {
    title: 'Morfyy - лидер по набранным очкам',
    date: '3 октября 2024',
    preview: 'Капитан команды набрал 3 очка (2+1) за первые два матча сезона и возглавил внутреннюю статистику клуба.',
    category: 'Статистика'
  },
  {
    title: 'Впереди серия домашних игр',
    date: '7 октября 2024',
    preview: 'С 9 по 19 октября команда проведет 5 домашних матчей подряд. Это отличная возможность укрепить позиции в турнирной таблице.',
    category: 'Анонсы'
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
      <div className="relative h-[70vh] bg-gradient-to-br from-primary via-blue-600 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <div className="animate-fade-in">
            <h1 className="text-7xl md:text-9xl font-bold text-white mb-4 tracking-wider drop-shadow-2xl">
              ДИНАМО ШИННИК
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-8 font-medium">
              Хоккейный клуб
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Badge className="bg-white text-primary px-6 py-3 text-lg hover:bg-white/90">
                МХЛ Б 2024/25
              </Badge>
              <Badge className="bg-green-500 text-white px-6 py-3 text-lg hover:bg-green-600">
                2 победы
              </Badge>
              <Badge className="bg-primary/80 backdrop-blur text-white px-6 py-3 text-lg">
                5 голов забито
              </Badge>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20 pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-4 h-14 bg-card shadow-lg mb-8 border border-border">
            <TabsTrigger value="news" className="text-base font-bold">
              <Icon name="Newspaper" size={20} className="mr-2" />
              НОВОСТИ
            </TabsTrigger>
            <TabsTrigger value="matches" className="text-base font-bold">
              <Icon name="Calendar" size={20} className="mr-2" />
              МАТЧИ
            </TabsTrigger>
            <TabsTrigger value="players" className="text-base font-bold">
              <Icon name="Users" size={20} className="mr-2" />
              СОСТАВ
            </TabsTrigger>
            <TabsTrigger value="stats" className="text-base font-bold">
              <Icon name="BarChart3" size={20} className="mr-2" />
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
                  if (parts.length >= 2) {
                    return parts[0][0] + parts[1][0];
                  }
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
                      <div className="text-4xl font-bold text-primary mb-2">2</div>
                      <p className="text-sm text-muted-foreground uppercase">Игр сыграно</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-4xl font-bold text-green-500 mb-2">2</div>
                      <p className="text-sm text-muted-foreground uppercase">Побед</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-4xl font-bold text-primary mb-2">5</div>
                      <p className="text-sm text-muted-foreground uppercase">Голов забито</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-4xl font-bold text-orange-500 mb-2">1</div>
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

            <Card className="border-2 border-primary/50">
              <CardHeader className="bg-gradient-to-r from-primary/20 to-blue-600/20">
                <CardTitle className="text-2xl text-center">Детальная статистика игроков</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold">#</th>
                        <th className="px-4 py-3 text-left font-bold">Игрок</th>
                        <th className="px-4 py-3 text-left font-bold">Позиция</th>
                        <th className="px-4 py-3 text-center font-bold">И</th>
                        <th className="px-4 py-3 text-center font-bold">Г</th>
                        <th className="px-4 py-3 text-center font-bold">П</th>
                        <th className="px-4 py-3 text-center font-bold">О</th>
                        <th className="px-4 py-3 text-center font-bold">+/-</th>
                      </tr>
                    </thead>
                    <tbody>
                      {players.filter(p => p.position !== 'Вратарь').map((player, idx) => (
                        <tr key={idx} className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center font-bold text-sm">
                              {player.number}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{player.name}</span>
                              {player.isCaptain && <Badge className="text-xs bg-primary">C</Badge>}
                              {player.isAssistant && <Badge variant="outline" className="text-xs">A</Badge>}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{player.position}</td>
                          <td className="px-4 py-3 text-center font-semibold">{player.stats.games}</td>
                          <td className="px-4 py-3 text-center font-semibold text-primary">{player.stats.goals}</td>
                          <td className="px-4 py-3 text-center font-semibold text-green-500">{player.stats.assists}</td>
                          <td className="px-4 py-3 text-center font-bold text-lg">{player.stats.points}</td>
                          <td className={`px-4 py-3 text-center font-semibold ${
                            player.stats.plusMinus > 0 ? 'text-green-500' : 
                            player.stats.plusMinus < 0 ? 'text-red-500' : 'text-muted-foreground'
                          }`}>
                            {player.stats.plusMinus > 0 ? '+' : ''}{player.stats.plusMinus}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-6 bg-muted/30 border-t border-border">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <Icon name="Shield" className="text-primary" />
                    Вратари
                  </h4>
                  {players.filter(p => p.position === 'Вратарь').map((player, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-card rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {player.number}
                        </div>
                        <div>
                          <p className="font-bold text-lg">{player.name}</p>
                          <p className="text-sm text-muted-foreground">{player.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-green-500">100%</p>
                        <p className="text-sm text-muted-foreground">Процент отраженных бросков</p>
                        <p className="text-xs text-muted-foreground mt-1">2 игры, 0 пропущенных шайб</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-card border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-2">ДИНАМО ШИННИК</h2>
          <p className="text-muted-foreground">МХЛ Б • Сезон 2024/25</p>
          <p className="text-sm text-muted-foreground mt-4">Время московское</p>
        </div>
      </footer>
    </div>
  );
}