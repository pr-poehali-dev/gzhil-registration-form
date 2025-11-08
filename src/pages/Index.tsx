import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type Screen = 'loading' | 'auth' | 'main';
type AuthMode = 'login' | 'register';

interface User {
  name: string;
  email: string;
}

const Index = () => {
  const [screen, setScreen] = useState<Screen>('loading');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [user, setUser] = useState<User | null>(null);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('auth');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      setUser({ name: 'Мастер', email: loginEmail });
      setScreen('main');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerName && registerEmail && registerPassword === registerPasswordConfirm) {
      setUser({ name: registerName, email: registerEmail });
      setScreen('main');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setScreen('auth');
    setAuthMode('login');
  };

  if (screen === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 gzhel-ornament">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 border-8 border-blue-200 rounded-full animate-pulse-slow" />
            <div className="absolute inset-4 border-8 border-blue-400 rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
            <div className="absolute inset-8 border-8 border-blue-600 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl animate-float">🏺</span>
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-bold text-gzhel mb-2" style={{ fontFamily: 'Merriweather, serif' }}>Гжель</h1>
            <p className="text-blue-700 text-lg">Искусство синей росписи</p>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'auth') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 gzhel-ornament">
        <div className="absolute top-8 left-8 text-6xl opacity-20 animate-float">🌸</div>
        <div className="absolute bottom-8 right-8 text-6xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🦜</div>
        
        <Card className="w-full max-w-md shadow-2xl border-2 border-blue-200 animate-fade-in bg-white/95 backdrop-blur">
          <CardHeader className="space-y-4 pb-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-xl border-4 border-white">
                  <span className="text-4xl">🏺</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Icon name="Sparkles" size={16} className="text-white" />
                </div>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gzhel mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
                {authMode === 'login' ? 'Добро пожаловать' : 'Присоединяйтесь'}
              </h2>
              <p className="text-blue-600">
                {authMode === 'login' ? 'Войдите в мир Гжели' : 'Станьте частью традиции'}
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {authMode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-blue-900 font-semibold">Электронная почта</Label>
                  <div className="relative">
                    <Icon name="Mail" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="example@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-10 border-2 border-blue-200 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-blue-900 font-semibold">Пароль</Label>
                  <div className="relative">
                    <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-10 border-2 border-blue-200 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white shadow-lg text-lg py-6">
                  Войти
                </Button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name" className="text-blue-900 font-semibold">Имя</Label>
                  <div className="relative">
                    <Icon name="User" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Ваше имя"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="pl-10 border-2 border-blue-200 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-blue-900 font-semibold">Электронная почта</Label>
                  <div className="relative">
                    <Icon name="Mail" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="example@email.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="pl-10 border-2 border-blue-200 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-blue-900 font-semibold">Пароль</Label>
                  <div className="relative">
                    <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="pl-10 border-2 border-blue-200 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password-confirm" className="text-blue-900 font-semibold">Подтверждение пароля</Label>
                  <div className="relative">
                    <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                    <Input
                      id="register-password-confirm"
                      type="password"
                      placeholder="••••••••"
                      value={registerPasswordConfirm}
                      onChange={(e) => setRegisterPasswordConfirm(e.target.value)}
                      className="pl-10 border-2 border-blue-200 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>
                {registerPassword !== registerPasswordConfirm && registerPasswordConfirm && (
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <Icon name="AlertCircle" size={16} />
                    Пароли не совпадают
                  </p>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white shadow-lg text-lg py-6"
                  disabled={registerPassword !== registerPasswordConfirm}
                >
                  Зарегистрироваться
                </Button>
              </form>
            )}
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-blue-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-blue-600">или</span>
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="w-full border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            >
              {authMode === 'login' ? 'Создать аккаунт' : 'Уже есть аккаунт'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <nav className="bg-white/80 backdrop-blur-md border-b-2 border-blue-200 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <span className="text-5xl">🏺</span>
              <div>
                <h1 className="text-2xl font-bold text-gzhel" style={{ fontFamily: 'Merriweather, serif' }}>Гжель</h1>
                <p className="text-xs text-blue-600">Синяя сказка России</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-blue-700">Здравствуйте, {user?.name}</span>
              <Button variant="outline" onClick={handleLogout} className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50">
                <Icon name="LogOut" size={18} className="mr-2" />
                Выход
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="history" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur border-2 border-blue-200 p-2 h-auto">
            <TabsTrigger value="history" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white py-3">
              <Icon name="BookOpen" size={18} className="mr-2" />
              История
            </TabsTrigger>
            <TabsTrigger value="classes" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white py-3">
              <Icon name="Video" size={18} className="mr-2" />
              Мастер-классы
            </TabsTrigger>
            <TabsTrigger value="workshop" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white py-3">
              <Icon name="Palette" size={18} className="mr-2" />
              Мастерская
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white py-3">
              <Icon name="Image" size={18} className="mr-2" />
              Галерея
            </TabsTrigger>
            <TabsTrigger value="shop" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white py-3">
              <Icon name="ShoppingBag" size={18} className="mr-2" />
              Магазин
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-8">
              <h2 className="text-5xl font-bold text-gzhel" style={{ fontFamily: 'Merriweather, serif' }}>История Гжели</h2>
              <p className="text-xl text-blue-700 max-w-3xl mx-auto">Традиционный русский народный промысел с 300-летней историей</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-shadow bg-white/80 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">📜</span>
                    <Badge className="bg-blue-600 text-white">XVII век</Badge>
                  </div>
                  <CardTitle className="text-2xl text-blue-900">Зарождение промысла</CardTitle>
                  <CardDescription className="text-base text-blue-700">
                    Гжель впервые упоминается в завещании Ивана Калиты в 1339 году. Богатые залежи глины сделали этот район центром гончарного мастерства.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-shadow bg-white/80 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">🎨</span>
                    <Badge className="bg-blue-600 text-white">XIX век</Badge>
                  </div>
                  <CardTitle className="text-2xl text-blue-900">Синяя роспись</CardTitle>
                  <CardDescription className="text-base text-blue-700">
                    Появление знаменитой сине-белой росписи кобальтом. Мастера создали уникальный стиль с характерными мазками и орнаментами.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-shadow bg-white/80 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">🏭</span>
                    <Badge className="bg-blue-600 text-white">XX век</Badge>
                  </div>
                  <CardTitle className="text-2xl text-blue-900">Возрождение традиций</CardTitle>
                  <CardDescription className="text-base text-blue-700">
                    В 1972 году создано объединение "Гжель", которое возродило и развило традиции промысла. Изделия стали известны по всему миру.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-shadow bg-white/80 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">✨</span>
                    <Badge className="bg-blue-600 text-white">Сегодня</Badge>
                  </div>
                  <CardTitle className="text-2xl text-blue-900">Современная Гжель</CardTitle>
                  <CardDescription className="text-base text-blue-700">
                    Гжель - это символ России, признанный во всем мире. Мастера продолжают создавать уникальные изделия, сочетая традиции и современность.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="classes" className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-8">
              <h2 className="text-5xl font-bold text-gzhel" style={{ fontFamily: 'Merriweather, serif' }}>Онлайн мастер-классы</h2>
              <p className="text-xl text-blue-700">Научитесь искусству гжельской росписи не выходя из дома</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Основы росписи', level: 'Начальный', duration: '2 часа', students: 245, icon: '🎨' },
                { title: 'Гжельская роза', level: 'Средний', duration: '3 часа', students: 187, icon: '🌹' },
                { title: 'Птица-синица', level: 'Средний', duration: '2.5 часа', students: 156, icon: '🦜' },
                { title: 'Композиция на тарелке', level: 'Продвинутый', duration: '4 часа', students: 98, icon: '🍽️' },
                { title: 'Роспись чайника', level: 'Продвинутый', duration: '5 часов', students: 73, icon: '🫖' },
                { title: 'Авторские узоры', level: 'Мастер', duration: '6 часов', students: 45, icon: '✨' }
              ].map((course, idx) => (
                <Card key={idx} className="border-2 border-blue-200 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <div className="text-6xl mb-4 text-center">{course.icon}</div>
                    <CardTitle className="text-xl text-blue-900 text-center">{course.title}</CardTitle>
                    <div className="flex justify-center gap-2 pt-2">
                      <Badge variant="outline" className="border-blue-400 text-blue-700">{course.level}</Badge>
                      <Badge variant="outline" className="border-blue-400 text-blue-700">{course.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-blue-600">
                      <Icon name="Users" size={18} />
                      <span className="text-sm">{course.students} учеников</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600">
                      <Icon name="Play" size={18} className="mr-2" />
                      Начать обучение
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="workshop" className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-8">
              <h2 className="text-5xl font-bold text-gzhel" style={{ fontFamily: 'Merriweather, serif' }}>Виртуальная мастерская</h2>
              <p className="text-xl text-blue-700">Создавайте собственные узоры в традиционном стиле</p>
            </div>

            <Card className="border-2 border-blue-200 shadow-2xl bg-white/80 backdrop-blur">
              <CardContent className="p-8">
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-white border-4 border-blue-300 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="text-center space-y-4">
                    <div className="text-8xl animate-float">🎨</div>
                    <p className="text-2xl text-blue-700 font-semibold">Холст для творчества</p>
                    <p className="text-blue-600">Выберите инструменты и начните создавать свой узор</p>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Button size="sm" className="bg-blue-600">
                      <Icon name="Paintbrush" size={18} />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Icon name="Eraser" size={18} />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Icon name="Undo" size={18} />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-6">
                  <Button variant="outline" className="border-2 border-blue-300">Кисть тонкая</Button>
                  <Button variant="outline" className="border-2 border-blue-300">Кисть широкая</Button>
                  <Button variant="outline" className="border-2 border-blue-300">Штамп "Роза"</Button>
                  <Button variant="outline" className="border-2 border-blue-300">Штамп "Листья"</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-8">
              <h2 className="text-5xl font-bold text-gzhel" style={{ fontFamily: 'Merriweather, serif' }}>Галерея изделий</h2>
              <p className="text-xl text-blue-700">Коллекция традиционных и современных работ</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Чайный сервиз "Роза"', master: 'Мария Петрова', year: 2023, price: '45 000 ₽', icon: '🫖' },
                { name: 'Тарелка "Птица счастья"', master: 'Иван Смирнов', year: 2023, price: '12 000 ₽', icon: '🍽️' },
                { name: 'Ваза "Полевые цветы"', master: 'Елена Иванова', year: 2024, price: '28 000 ₽', icon: '🏺' },
                { name: 'Статуэтка "Синица"', master: 'Петр Волков', year: 2023, price: '8 500 ₽', icon: '🦜' },
                { name: 'Самовар "Традиции"', master: 'Анна Козлова', year: 2024, price: '65 000 ₽', icon: '☕' },
                { name: 'Шкатулка "Узоры"', master: 'Дмитрий Соколов', year: 2023, price: '15 000 ₽', icon: '📦' }
              ].map((item, idx) => (
                <Card key={idx} className="border-2 border-blue-200 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <div className="w-full aspect-square bg-gradient-to-br from-blue-100 to-white rounded-lg flex items-center justify-center border-2 border-blue-200 mb-4">
                      <span className="text-8xl">{item.icon}</span>
                    </div>
                    <CardTitle className="text-xl text-blue-900">{item.name}</CardTitle>
                    <CardDescription className="space-y-1">
                      <p className="text-blue-700">Мастер: {item.master}</p>
                      <p className="text-blue-600 text-sm">{item.year} год</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-900">{item.price}</span>
                      <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                        <Icon name="Heart" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shop" className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-8">
              <h2 className="text-5xl font-bold text-gzhel" style={{ fontFamily: 'Merriweather, serif' }}>Магазин изделий</h2>
              <p className="text-xl text-blue-700">Купите подлинные изделия гжельских мастеров</p>
            </div>

            <div className="flex gap-4 mb-6">
              <Button variant="outline" className="border-2 border-blue-300">
                <Icon name="Filter" size={18} className="mr-2" />
                Все категории
              </Button>
              <Button variant="outline" className="border-2 border-blue-300">Посуда</Button>
              <Button variant="outline" className="border-2 border-blue-300">Декор</Button>
              <Button variant="outline" className="border-2 border-blue-300">Статуэтки</Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: 'Чашка с блюдцем', price: '3 500 ₽', stock: 'В наличии', icon: '☕' },
                { name: 'Чайник заварочный', price: '8 500 ₽', stock: 'В наличии', icon: '🫖' },
                { name: 'Сахарница', price: '4 200 ₽', stock: 'В наличии', icon: '🍯' },
                { name: 'Масленка', price: '3 800 ₽', stock: 'Под заказ', icon: '🧈' },
                { name: 'Конфетница', price: '5 500 ₽', stock: 'В наличии', icon: '🍬' },
                { name: 'Салатник большой', price: '6 800 ₽', stock: 'В наличии', icon: '🥗' },
                { name: 'Кружка 500мл', price: '2 800 ₽', stock: 'В наличии', icon: '☕' },
                { name: 'Подсвечник', price: '4 500 ₽', stock: 'Под заказ', icon: '🕯️' }
              ].map((product, idx) => (
                <Card key={idx} className="border-2 border-blue-200 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 bg-white/80 backdrop-blur">
                  <CardHeader className="pb-3">
                    <div className="w-full aspect-square bg-gradient-to-br from-blue-100 to-white rounded-lg flex items-center justify-center border-2 border-blue-200">
                      <span className="text-7xl">{product.icon}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <CardTitle className="text-base text-blue-900">{product.name}</CardTitle>
                      <Badge variant={product.stock === 'В наличии' ? 'default' : 'secondary'} className="mt-2">
                        {product.stock}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-bold text-blue-900">{product.price}</span>
                      <Button size="sm" className="bg-gradient-to-r from-blue-700 to-blue-500">
                        <Icon name="ShoppingCart" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white/80 backdrop-blur border-t-2 border-blue-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl">🏺</span>
              <h3 className="text-2xl font-bold text-gzhel" style={{ fontFamily: 'Merriweather, serif' }}>Гжель</h3>
            </div>
            <p className="text-blue-700">Сохраняя традиции, создаём будущее</p>
            <div className="flex justify-center gap-4 pt-4">
              <Button variant="ghost" size="sm" className="text-blue-600">О нас</Button>
              <Button variant="ghost" size="sm" className="text-blue-600">Контакты</Button>
              <Button variant="ghost" size="sm" className="text-blue-600">Доставка</Button>
            </div>
            <p className="text-sm text-blue-600 pt-4">© 2024 Гжель. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
