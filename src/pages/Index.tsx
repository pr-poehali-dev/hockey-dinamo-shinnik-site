import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const Index = () => {
  const upcomingMatches = [
    { date: "7 октября", opponent: "Мамонты Югры", time: "19:00", location: "Гостевая" },
    { date: "9 октября", opponent: "Локомотив", time: "17:30", location: "Домашняя" },
    { date: "10 октября", opponent: "Сибирские Снайперы", time: "17:30", location: "Домашняя" },
    { date: "11 октября", opponent: "Алмаз", time: "18:30", location: "Домашняя" },
    { date: "16 октября", opponent: "Чайка", time: "15:00", location: "Гостевая" },
  ];

  const recentResults = [
    { date: "25 сентября", opponent: "Белые Медведи", score: "3:0", result: "win" },
    { date: "2 октября", opponent: "Кузнецкие Медведи", score: "2:1", result: "win" },
  ];

  const players = [
    { number: 17, name: "Александр Иванов", position: "Нападающий", goals: 12, assists: 8 },
    { number: 27, name: "Дмитрий Петров", position: "Защитник", goals: 3, assists: 15 },
    { number: 1, name: "Михаил Соколов", position: "Вратарь", saves: 156, percentage: 92.5 },
    { number: 91, name: "Сергей Морозов", position: "Нападающий", goals: 15, assists: 7 },
    { number: 44, name: "Андрей Волков", position: "Защитник", goals: 2, assists: 10 },
  ];

  const management = [
    { name: "Игорь Смирнов", position: "Главный тренер", experience: "15 лет" },
    { name: "Олег Кузнецов", position: "Ассистент тренера", experience: "8 лет" },
    { name: "Владимир Новиков", position: "Тренер вратарей", experience: "12 лет" },
    { name: "Елена Романова", position: "Спортивный директор", experience: "10 лет" },
  ];

  const standings = [
    { position: 1, team: "СКА", games: 8, wins: 7, losses: 1, points: 21 },
    { position: 2, team: "Динамо Шинник", games: 8, wins: 6, losses: 2, points: 18 },
    { position: 3, team: "Локомотив", games: 8, wins: 5, losses: 3, points: 15 },
    { position: 4, team: "Толпар", games: 8, wins: 4, losses: 4, points: 12 },
    { position: 5, team: "Спартак", games: 8, wins: 3, losses: 5, points: 9 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-gradient-to-r from-primary via-primary to-secondary text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Icon name="Award" size={32} className="text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-wider">ДИНАМО ШИННИК</h1>
                <p className="text-sm opacity-90">Хоккейный Клуб</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#matches" className="hover:text-secondary transition-colors">Матчи</a>
              <a href="#players" className="hover:text-secondary transition-colors">Игроки</a>
              <a href="#standings" className="hover:text-secondary transition-colors">Турнир</a>
              <a href="#management" className="hover:text-secondary transition-colors">Руководство</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative h-[60vh] bg-gradient-to-br from-primary via-blue-700 to-secondary flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10 text-white animate-fade-in">
          <h2 className="text-7xl font-bold mb-4 drop-shadow-lg">ВПЕРЁД, ДИНАМО!</h2>
          <p className="text-2xl mb-8 opacity-90">Молодёжная Хоккейная Лига</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 hover:scale-105 transition-transform">
              <Icon name="Calendar" className="mr-2" />
              Календарь игр
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur border-white text-white hover:bg-white hover:text-primary hover:scale-105 transition-all">
              <Icon name="Trophy" className="mr-2" />
              Результаты
            </Button>
          </div>
        </div>
      </section>

      <section id="matches" className="py-16 container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-12 text-primary">МАТЧИ</h2>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="upcoming" className="text-lg">Предстоящие</TabsTrigger>
            <TabsTrigger value="results" className="text-lg">Результаты</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingMatches.map((match, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-all hover:scale-[1.02] border-2">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[100px]">
                        <p className="text-sm text-muted-foreground">{match.date}</p>
                        <p className="text-2xl font-bold text-primary">{match.time}</p>
                      </div>
                      <div className="w-px h-16 bg-border"></div>
                      <div>
                        <p className="text-2xl font-bold mb-1">Динамо Шинник VS {match.opponent}</p>
                        <Badge variant={match.location === "Домашняя" ? "default" : "secondary"}>
                          <Icon name="MapPin" size={14} className="mr-1" />
                          {match.location}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="lg">
                      Подробнее
                      <Icon name="ArrowRight" className="ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="results" className="space-y-4">
            {recentResults.map((match, idx) => (
              <Card key={idx} className="border-2 border-green-500 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[100px]">
                        <p className="text-sm text-muted-foreground">{match.date}</p>
                        <Badge className="mt-2 bg-green-500">Победа</Badge>
                      </div>
                      <div className="w-px h-16 bg-border"></div>
                      <div>
                        <p className="text-2xl font-bold mb-1">Динамо Шинник VS {match.opponent}</p>
                        <p className="text-4xl font-bold text-primary">{match.score}</p>
                      </div>
                    </div>
                    <Icon name="Trophy" size={48} className="text-green-500" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </section>

      <section id="players" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12 text-primary">СОСТАВ КОМАНДЫ</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-all hover:scale-105 border-t-4 border-t-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-1">{player.name}</CardTitle>
                      <p className="text-muted-foreground">{player.position}</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">{player.number}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {player.goals !== undefined && (
                      <div className="flex-1 text-center p-3 bg-muted rounded-lg">
                        <Icon name="Target" size={20} className="mx-auto mb-1 text-primary" />
                        <p className="text-2xl font-bold text-primary">{player.goals}</p>
                        <p className="text-xs text-muted-foreground">Голов</p>
                      </div>
                    )}
                    {player.assists !== undefined && (
                      <div className="flex-1 text-center p-3 bg-muted rounded-lg">
                        <Icon name="Users" size={20} className="mx-auto mb-1 text-secondary" />
                        <p className="text-2xl font-bold text-secondary">{player.assists}</p>
                        <p className="text-xs text-muted-foreground">Передач</p>
                      </div>
                    )}
                    {player.saves !== undefined && (
                      <>
                        <div className="flex-1 text-center p-3 bg-muted rounded-lg">
                          <Icon name="Shield" size={20} className="mx-auto mb-1 text-primary" />
                          <p className="text-2xl font-bold text-primary">{player.saves}</p>
                          <p className="text-xs text-muted-foreground">Сэйвов</p>
                        </div>
                        <div className="flex-1 text-center p-3 bg-muted rounded-lg">
                          <Icon name="Percent" size={20} className="mx-auto mb-1 text-green-600" />
                          <p className="text-2xl font-bold text-green-600">{player.percentage}%</p>
                          <p className="text-xs text-muted-foreground">Процент</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="standings" className="py-16 container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-12 text-primary">ТУРНИРНАЯ ТАБЛИЦА</h2>
        
        <Card className="max-w-4xl mx-auto shadow-xl border-2">
          <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
            <CardTitle className="text-3xl text-center">МХЛ 2024-2025</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Место</th>
                    <th className="px-6 py-4 text-left font-bold">Команда</th>
                    <th className="px-6 py-4 text-center font-bold">Игры</th>
                    <th className="px-6 py-4 text-center font-bold">Победы</th>
                    <th className="px-6 py-4 text-center font-bold">Поражения</th>
                    <th className="px-6 py-4 text-center font-bold">Очки</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((team, idx) => (
                    <tr 
                      key={idx} 
                      className={`border-b hover:bg-muted/50 transition-colors ${
                        team.team === "Динамо Шинник" ? "bg-primary/5 font-bold" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold">
                          {team.position}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-lg">
                        {team.team === "Динамо Шинник" && (
                          <Icon name="Star" size={18} className="inline mr-2 text-secondary" />
                        )}
                        {team.team}
                      </td>
                      <td className="px-6 py-4 text-center">{team.games}</td>
                      <td className="px-6 py-4 text-center text-green-600 font-semibold">{team.wins}</td>
                      <td className="px-6 py-4 text-center text-red-600 font-semibold">{team.losses}</td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant="default" className="text-lg px-3 py-1">{team.points}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="management" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12 text-primary">РУКОВОДСТВО КЛУБА</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {management.map((person, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-all hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" size={36} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1">{person.name}</h3>
                      <p className="text-muted-foreground mb-2">{person.position}</p>
                      <Badge variant="outline">
                        <Icon name="Award" size={14} className="mr-1" />
                        Опыт: {person.experience}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">ДИНАМО ШИННИК</h3>
              <p className="opacity-90">Молодёжный хоккейный клуб МХЛ</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Контакты</h4>
              <div className="space-y-2 opacity-90">
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={18} />
                  info@dinamoshinnik.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  +7 (495) 123-45-67
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Социальные сети</h4>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  <Icon name="Share2" />
                </Button>
                <Button variant="outline" size="icon" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  <Icon name="Youtube" />
                </Button>
                <Button variant="outline" size="icon" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  <Icon name="Instagram" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center opacity-90">
            <p>&copy; 2024 ХК Динамо Шинник. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
