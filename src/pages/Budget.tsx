import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Budget() {
  const income = 425500;
  
  const expenseItems = [
    { name: 'Аренда льда', amount: 150000, icon: 'Snowflake' },
    { name: 'Экипировка', amount: 80000, icon: 'ShieldCheck' },
    { name: 'Зарплаты игроков', amount: 120000, icon: 'Users' },
    { name: 'Транспорт', amount: 45000, icon: 'Bus' },
    { name: 'Медицинское обслуживание', amount: 30500, icon: 'Heart' },
  ];
  
  const expenses = expenseItems.reduce((sum, item) => sum + item.amount, 0);
  const balance = income - expenses;

  const Snowflake = ({ className = "" }: { className?: string }) => (
    <div className={`absolute text-white/20 ${className}`}>❅</div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#003B7A] to-[#001F3F] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Snowflake className="top-[5%] left-[10%] text-2xl animate-pulse" />
        <Snowflake className="top-[15%] right-[15%] text-3xl animate-pulse delay-100" />
        <Snowflake className="top-[8%] right-[45%] text-xl animate-pulse delay-200" />
        <Snowflake className="top-[20%] left-[70%] text-2xl animate-pulse delay-300" />
        <Snowflake className="top-[12%] left-[40%] text-xl animate-pulse delay-150" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors"
          >
            <Icon name="ArrowLeft" size={24} />
            <span className="text-lg">Назад в админку</span>
          </Link>
        </div>

        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 pointer-events-none">
            <Snowflake className="top-[10%] left-[5%] text-xl animate-pulse" />
            <Snowflake className="top-[20%] right-[8%] text-2xl animate-pulse delay-100" />
            <Snowflake className="bottom-[15%] left-[15%] text-xl animate-pulse delay-200" />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl">$</span>
            <h2 className="text-5xl font-bold">БЮДЖЕТ<br/>КЛУБА</h2>
          </div>
          <p className="text-xl text-white/80">Финансовый учет и статистика</p>
        </div>

        <div className="space-y-6">
          <div className="relative bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <Snowflake className="top-[10%] right-[15%] text-3xl" />
              <Snowflake className="bottom-[20%] left-[10%] text-2xl" />
              <Snowflake className="top-[60%] right-[70%] text-xl" />
              <Snowflake className="bottom-[40%] right-[20%] text-2xl" />
            </div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="TrendingUp" size={32} />
                <h3 className="text-3xl font-bold">ДОХОД</h3>
              </div>
              <div className="text-6xl font-bold">{income.toLocaleString('ru-RU')} ₽</div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-3xl p-8 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <Snowflake className="top-[15%] left-[10%] text-2xl" />
              <Snowflake className="bottom-[25%] right-[15%] text-3xl" />
              <Snowflake className="top-[50%] right-[60%] text-xl" />
              <Snowflake className="bottom-[15%] left-[70%] text-2xl" />
            </div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <Icon name="TrendingDown" size={32} />
                <h3 className="text-3xl font-bold">РАСХОД</h3>
              </div>
              <div className="text-6xl font-bold mb-6">{expenses.toLocaleString('ru-RU')} ₽</div>
              
              <div className="space-y-3 mt-6 pt-6 border-t border-white/20">
                {expenseItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-white/90">
                    <div className="flex items-center gap-2">
                      <Icon name={item.icon} size={20} />
                      <span className="text-lg">{item.name}</span>
                    </div>
                    <span className="text-xl font-semibold">{item.amount.toLocaleString('ru-RU')} ₽</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <Snowflake className="top-[20%] right-[10%] text-3xl" />
              <Snowflake className="bottom-[15%] left-[15%] text-2xl" />
              <Snowflake className="top-[45%] left-[60%] text-xl" />
              <Snowflake className="bottom-[35%] right-[65%] text-2xl" />
              <Snowflake className="top-[70%] right-[30%] text-xl" />
            </div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Wallet" size={32} />
                <h3 className="text-3xl font-bold">БАЛАНС</h3>
              </div>
              <div className="text-6xl font-bold">{balance.toLocaleString('ru-RU')} ₽</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}