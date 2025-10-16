import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  { name: 'Morfyy', number: '99', position: 'Нападающий', isCaptain: true },
  { name: 'Ylokz', number: '19', position: 'Защитник', isAssistant: true },
  { name: 'quantum', number: '53', position: 'Нападающий' },
  { name: 'gazash', number: '21', position: 'Нападающий' },
  { name: 'Unnamed', number: '5', position: 'Защитник', isAssistant: true },
  { name: 'крико', number: '54', position: 'Защитник' },
  { name: 'Estriper', number: '3', position: 'Защитник' },
  { name: 'Cago', number: '13', position: 'Нападающий' },
  { name: 'Николаич', number: '35', position: 'Вратарь' },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('matches');

  const upcomingMatches = matches.filter(m => !m.result);
  const pastMatches = matches.filter(m => m.result);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div 
        className="relative h-[70vh] bg-gradient-to-br from-primary via-purple-600 to-secondary overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <div className="animate-fade-in">
            <h1 className="text-7xl md:text-9xl font-bold text-white mb-4 tracking-wider drop-shadow-2xl">
              ДИНАМО ШИННИК
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-8 font-medium">
              Хоккейный клуб
            </p>
            <div className="flex gap-4 justify-center">
              <Badge className="bg-white text-primary px-6 py-3 text-lg hover:bg-white/90">
                МХЛ Б 2024/25
              </Badge>
              <Badge className="bg-secondary text-white px-6 py-3 text-lg hover:bg-secondary/90">
                2 победы
              </Badge>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20 pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 h-14 bg-white shadow-lg mb-8">
            <TabsTrigger value="matches" className="text-base font-bold">
              <Icon name="Calendar" size={20} className="mr-2" />
              МАТЧИ
            </TabsTrigger>
            <TabsTrigger value="players" className="text-base font-bold">
              <Icon name="Users" size={20} className="mr-2" />
              СОСТАВ
            </TabsTrigger>
            <TabsTrigger value="results" className="text-base font-bold">
              <Icon name="Trophy" size={20} className="mr-2" />
              РЕЗУЛЬТАТЫ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-4 animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-center">Календарь матчей</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingMatches.map((match, idx) => (
                <Card key={idx} className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-transparent hover:border-primary">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">{match.date}</p>
                        <p className="text-2xl font-bold">{match.time} МСК</p>
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
                        <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto flex items-center justify-center text-gray-600 font-bold">
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
            <h2 className="text-4xl font-bold mb-6 text-center">Состав команды</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {players.map((player, idx) => (
                <Card key={idx} className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-transparent hover:border-primary group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform">
                        {player.number}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold">{player.name}</h3>
                          {player.isCaptain && (
                            <Badge className="bg-secondary text-xs">C</Badge>
                          )}
                          {player.isAssistant && (
                            <Badge variant="outline" className="text-xs">A</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{player.position}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="results" className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-center">Результаты игр</h2>
            <div className="max-w-2xl mx-auto space-y-4">
              {pastMatches.map((match, idx) => (
                <Card key={idx} className="hover:shadow-xl transition-all border-l-4 border-l-primary">
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

            <div className="mt-12 max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-6 text-center">Статистика сезона</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-primary mb-2">2</div>
                      <p className="text-sm text-muted-foreground uppercase">Игр сыграно</p>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-green-500 mb-2">2</div>
                      <p className="text-sm text-muted-foreground uppercase">Побед</p>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-secondary mb-2">5</div>
                      <p className="text-sm text-muted-foreground uppercase">Голов забито</p>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-orange-500 mb-2">1</div>
                      <p className="text-sm text-muted-foreground uppercase">Голов пропущено</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-gradient-to-r from-primary via-purple-600 to-secondary text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-2">ДИНАМО ШИННИК</h2>
          <p className="text-white/80">МХЛ Б • Сезон 2024/25</p>
          <p className="text-sm text-white/60 mt-4">Время московское</p>
        </div>
      </footer>
    </div>
  );
}
