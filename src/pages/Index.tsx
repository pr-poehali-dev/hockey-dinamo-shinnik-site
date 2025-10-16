import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
  plusMinus?: string;
  pim?: number;
  shots?: number;
  saves?: number;
  gaa?: number;
  svPercent?: number;
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
  { name: 'Morfyy', number: '99', position: 'Нападающий', isCaptain: true, goals: 3, assists: 2, points: 5, plusMinus: '+4', pim: 2, shots: 18 },
  { name: 'Ylokz', number: '19', position: 'Защитник', isAssistant: true, goals: 0, assists: 3, points: 3, plusMinus: '+3', pim: 0, shots: 8 },
  { name: 'quantum', number: '53', position: 'Нападающий', goals: 1, assists: 1, points: 2, plusMinus: '+2', pim: 4, shots: 12 },
  { name: 'gazash', number: '21', position: 'Нападающий', goals: 1, assists: 0, points: 1, plusMinus: '+1', pim: 0, shots: 9 },
  { name: 'Unnamed', number: '5', position: 'Защитник', isAssistant: true, goals: 0, assists: 2, points: 2, plusMinus: '+3', pim: 2, shots: 6 },
  { name: 'крико', number: '54', position: 'Защитник', goals: 0, assists: 1, points: 1, plusMinus: '+2', pim: 0, shots: 4 },
  { name: 'Estriper', number: '3', position: 'Защитник', goals: 0, assists: 1, points: 1, plusMinus: '+2', pim: 0, shots: 5 },
  { name: 'Cago', number: '13', position: 'Нападающий', goals: 0, assists: 0, points: 0, plusMinus: '0', pim: 2, shots: 7 },
  { name: 'Николаич', number: '35', position: 'Вратарь', saves: 45, gaa: 0.5, svPercent: 97.8 },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('matches');

  const upcomingMatches = matches.filter(m => !m.result);
  const pastMatches = matches.filter(m => m.result);
  const forwardPlayers = players.filter(p => p.position === 'Нападающий');
  const defensePlayers = players.filter(p => p.position === 'Защитник');
  const goalies = players.filter(p => p.position === 'Вратарь');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div 
        className="relative h-[70vh] bg-gradient-to-br from-primary via-blue-900 to-slate-950 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
        
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
              <Badge className="bg-blue-500 text-white px-6 py-3 text-lg hover:bg-blue-600">
                2 победы
              </Badge>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20 pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 h-14 bg-slate-800 border-slate-700 shadow-lg mb-8">
            <TabsTrigger value="matches" className="text-sm md:text-base font-bold text-slate-300 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="Calendar" size={20} className="mr-1 md:mr-2" />
              МАТЧИ
            </TabsTrigger>
            <TabsTrigger value="players" className="text-sm md:text-base font-bold text-slate-300 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="Users" size={20} className="mr-1 md:mr-2" />
              СОСТАВ
            </TabsTrigger>
            <TabsTrigger value="stats" className="text-sm md:text-base font-bold text-slate-300 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="BarChart3" size={20} className="mr-1 md:mr-2" />
              СТАТИСТИКА
            </TabsTrigger>
            <TabsTrigger value="results" className="text-sm md:text-base font-bold text-slate-300 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="Trophy" size={20} className="mr-1 md:mr-2" />
              РЕЗУЛЬТАТЫ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-4 animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-center text-white">Календарь матчей</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingMatches.map((match, idx) => (
                <Card key={idx} className="bg-slate-800 border-slate-700 hover:shadow-xl hover:shadow-primary/20 transition-all hover:-translate-y-1 hover:border-primary">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-slate-400">{match.date}</p>
                        <p className="text-2xl font-bold text-white">{match.time} МСК</p>
                      </div>
                      <Badge variant={match.isHome ? "default" : "secondary"}>
                        {match.isHome ? '🏠 Дома' : '✈️ Выезд'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 text-right">
                        <p className="text-sm text-slate-400 mb-1">Динамо Шинник</p>
                        <div className="w-12 h-12 bg-primary rounded-full mx-auto flex items-center justify-center text-white font-bold text-xl">
                          ДШ
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-slate-600">VS</div>
                      <div className="flex-1 text-left">
                        <p className="text-sm text-slate-400 mb-1">{match.opponent}</p>
                        <div className="w-12 h-12 bg-slate-700 rounded-full mx-auto flex items-center justify-center text-slate-300 font-bold">
                          <Icon name="Shield" size={24} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="players" className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-center text-white">Состав команды</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {players.map((player, idx) => (
                <Card key={idx} className="bg-slate-800 border-slate-700 hover:shadow-xl hover:shadow-primary/20 transition-all hover:-translate-y-1 hover:border-primary group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform">
                        {player.number}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-white">{player.name}</h3>
                          {player.isCaptain && (
                            <Badge className="bg-blue-500 text-xs">C</Badge>
                          )}
                          {player.isAssistant && (
                            <Badge variant="outline" className="text-xs border-blue-500 text-blue-400">A</Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-400">{player.position}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 text-center text-white">Статистика игроков</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                  <Icon name="Target" size={24} className="text-primary" />
                  Нападающие
                </h3>
                <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-900 text-slate-300">
                        <tr>
                          <th className="px-4 py-3 font-bold">#</th>
                          <th className="px-4 py-3 font-bold">Игрок</th>
                          <th className="px-4 py-3 font-bold text-center">Г</th>
                          <th className="px-4 py-3 font-bold text-center">П</th>
                          <th className="px-4 py-3 font-bold text-center">О</th>
                          <th className="px-4 py-3 font-bold text-center">+/-</th>
                          <th className="px-4 py-3 font-bold text-center">Штр</th>
                          <th className="px-4 py-3 font-bold text-center">Бр</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-200">
                        {forwardPlayers.sort((a, b) => (b.points || 0) - (a.points || 0)).map((player, idx) => (
                          <tr key={idx} className="border-t border-slate-700 hover:bg-slate-700/50 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-primary">{player.number}</span>
                                {player.isCaptain && <Badge className="bg-blue-500 text-xs">C</Badge>}
                              </div>
                            </td>
                            <td className="px-4 py-3 font-semibold">{player.name}</td>
                            <td className="px-4 py-3 text-center text-green-400 font-bold">{player.goals}</td>
                            <td className="px-4 py-3 text-center text-blue-400 font-bold">{player.assists}</td>
                            <td className="px-4 py-3 text-center font-bold">{player.points}</td>
                            <td className="px-4 py-3 text-center text-emerald-400">{player.plusMinus}</td>
                            <td className="px-4 py-3 text-center text-orange-400">{player.pim}</td>
                            <td className="px-4 py-3 text-center">{player.shots}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                  <Icon name="Shield" size={24} className="text-primary" />
                  Защитники
                </h3>
                <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-900 text-slate-300">
                        <tr>
                          <th className="px-4 py-3 font-bold">#</th>
                          <th className="px-4 py-3 font-bold">Игрок</th>
                          <th className="px-4 py-3 font-bold text-center">Г</th>
                          <th className="px-4 py-3 font-bold text-center">П</th>
                          <th className="px-4 py-3 font-bold text-center">О</th>
                          <th className="px-4 py-3 font-bold text-center">+/-</th>
                          <th className="px-4 py-3 font-bold text-center">Штр</th>
                          <th className="px-4 py-3 font-bold text-center">Бр</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-200">
                        {defensePlayers.sort((a, b) => (b.points || 0) - (a.points || 0)).map((player, idx) => (
                          <tr key={idx} className="border-t border-slate-700 hover:bg-slate-700/50 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-primary">{player.number}</span>
                                {player.isAssistant && <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">A</Badge>}
                              </div>
                            </td>
                            <td className="px-4 py-3 font-semibold">{player.name}</td>
                            <td className="px-4 py-3 text-center text-green-400 font-bold">{player.goals}</td>
                            <td className="px-4 py-3 text-center text-blue-400 font-bold">{player.assists}</td>
                            <td className="px-4 py-3 text-center font-bold">{player.points}</td>
                            <td className="px-4 py-3 text-center text-emerald-400">{player.plusMinus}</td>
                            <td className="px-4 py-3 text-center text-orange-400">{player.pim}</td>
                            <td className="px-4 py-3 text-center">{player.shots}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                  <Icon name="Sparkles" size={24} className="text-primary" />
                  Вратари
                </h3>
                <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-900 text-slate-300">
                        <tr>
                          <th className="px-4 py-3 font-bold">#</th>
                          <th className="px-4 py-3 font-bold">Игрок</th>
                          <th className="px-4 py-3 font-bold text-center">Сэйвы</th>
                          <th className="px-4 py-3 font-bold text-center">GAA</th>
                          <th className="px-4 py-3 font-bold text-center">SV%</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-200">
                        {goalies.map((player, idx) => (
                          <tr key={idx} className="border-t border-slate-700 hover:bg-slate-700/50 transition-colors">
                            <td className="px-4 py-3 font-bold text-primary">{player.number}</td>
                            <td className="px-4 py-3 font-semibold">{player.name}</td>
                            <td className="px-4 py-3 text-center text-blue-400 font-bold">{player.saves}</td>
                            <td className="px-4 py-3 text-center text-green-400 font-bold">{player.gaa}</td>
                            <td className="px-4 py-3 text-center text-emerald-400 font-bold">{player.svPercent}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-center text-white">Результаты игр</h2>
            <div className="max-w-2xl mx-auto space-y-4">
              {pastMatches.map((match, idx) => (
                <Card key={idx} className="bg-slate-800 border-slate-700 hover:shadow-xl hover:shadow-primary/20 transition-all border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="text-sm text-slate-400 mb-1">{match.date} • {match.time} МСК</p>
                        <div className="flex items-center gap-3">
                          <p className="font-bold text-lg text-white">Динамо Шинник</p>
                          <Badge variant={match.isHome ? "default" : "secondary"} className="text-xs">
                            {match.isHome ? 'Дома' : 'Выезд'}
                          </Badge>
                        </div>
                        <p className="text-slate-400">{match.opponent}</p>
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

            <div className="mt-12 max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-primary/10 to-blue-900/10 border-2 border-primary/30">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-6 text-center text-white">Статистика сезона</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-primary mb-2">2</div>
                      <p className="text-sm text-slate-400 uppercase">Игр сыграно</p>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-green-400 mb-2">2</div>
                      <p className="text-sm text-slate-400 uppercase">Побед</p>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-blue-400 mb-2">5</div>
                      <p className="text-sm text-slate-400 uppercase">Голов забито</p>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-orange-400 mb-2">1</div>
                      <p className="text-sm text-slate-400 uppercase">Голов пропущено</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-gradient-to-r from-primary via-blue-900 to-slate-950 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-2">ДИНАМО ШИННИК</h2>
          <p className="text-white/80">МХЛ Б • Сезон 2024/25</p>
          <p className="text-sm text-white/60 mt-4">Время московское</p>
        </div>
      </footer>
    </div>
  );
}
