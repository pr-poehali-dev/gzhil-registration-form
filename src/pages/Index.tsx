import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

type Screen = 'loading' | 'auth' | 'main';
type AuthMode = 'login' | 'register';
type MainTab = 'home' | 'profile';

interface User {
  name: string;
  email: string;
}

const Index = () => {
  const [screen, setScreen] = useState<Screen>('loading');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [mainTab, setMainTab] = useState<MainTab>('home');
  const [user, setUser] = useState<User | null>(null);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');

  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('auth');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      setUser({ name: 'Пользователь', email: loginEmail });
      setProfileName('Пользователь');
      setProfileEmail(loginEmail);
      setScreen('main');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerName && registerEmail && registerPassword === registerPasswordConfirm) {
      setUser({ name: registerName, email: registerEmail });
      setProfileName(registerName);
      setProfileEmail(registerEmail);
      setScreen('main');
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({ name: profileName, email: profileEmail });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setScreen('auth');
    setAuthMode('login');
    setLoginEmail('');
    setLoginPassword('');
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterPasswordConfirm('');
  };

  if (screen === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="relative">
            <div className="w-24 h-24 mx-auto border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="Sparkles" size={32} className="text-sky-500" />
            </div>
          </div>
          <h1 className="text-4xl font-light text-gray-800 tracking-tight">Загрузка</h1>
        </div>
      </div>
    );
  }

  if (screen === 'auth') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-50 p-4">
        <Card className="w-full max-w-md shadow-lg border-0 animate-fade-in">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-lg">
                <Icon name="User" size={32} className="text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-light text-center text-gray-800">
              {authMode === 'login' ? 'Вход в систему' : 'Регистрация'}
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              {authMode === 'login' ? 'Введите свои данные для входа' : 'Создайте новый аккаунт'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {authMode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-gray-700 font-normal">Email</Label>
                  <div className="relative">
                    <Icon name="Mail" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="example@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-sky-400 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-gray-700 font-normal">Пароль</Label>
                  <div className="relative">
                    <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-sky-400 transition-colors"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 transition-all shadow-md">
                  Войти
                </Button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name" className="text-gray-700 font-normal">Имя</Label>
                  <div className="relative">
                    <Icon name="User" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Ваше имя"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-sky-400 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-gray-700 font-normal">Email</Label>
                  <div className="relative">
                    <Icon name="Mail" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="example@email.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-sky-400 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-gray-700 font-normal">Пароль</Label>
                  <div className="relative">
                    <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-sky-400 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password-confirm" className="text-gray-700 font-normal">Подтверждение пароля</Label>
                  <div className="relative">
                    <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="register-password-confirm"
                      type="password"
                      placeholder="••••••••"
                      value={registerPasswordConfirm}
                      onChange={(e) => setRegisterPasswordConfirm(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-sky-400 transition-colors"
                      required
                    />
                  </div>
                </div>
                {registerPassword !== registerPasswordConfirm && registerPasswordConfirm && (
                  <p className="text-sm text-red-500">Пароли не совпадают</p>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 transition-all shadow-md"
                  disabled={registerPassword !== registerPasswordConfirm}
                >
                  Зарегистрироваться
                </Button>
              </form>
            )}
            <div className="relative">
              <Separator className="my-4" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
                или
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              className="w-full text-sky-600 hover:text-sky-700 hover:bg-sky-50"
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            >
              {authMode === 'login' ? 'Создать новый аккаунт' : 'Уже есть аккаунт? Войти'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
                <Icon name="Sparkles" size={20} className="text-white" />
              </div>
              <span className="text-xl font-light text-gray-800">Приложение</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant={mainTab === 'home' ? 'default' : 'ghost'}
                onClick={() => setMainTab('home')}
                className={mainTab === 'home' ? 'bg-gradient-to-r from-sky-400 to-blue-500' : 'text-gray-600 hover:text-gray-800'}
              >
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </Button>
              <Button
                variant={mainTab === 'profile' ? 'default' : 'ghost'}
                onClick={() => setMainTab('profile')}
                className={mainTab === 'profile' ? 'bg-gradient-to-r from-sky-400 to-blue-500' : 'text-gray-600 hover:text-gray-800'}
              >
                <Icon name="User" size={18} className="mr-2" />
                Профиль
              </Button>
              <Button variant="ghost" onClick={handleLogout} className="text-gray-600 hover:text-red-600">
                <Icon name="LogOut" size={18} className="mr-2" />
                Выход
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        {mainTab === 'home' ? (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-light text-gray-800 tracking-tight">
                Добро пожаловать, {user?.name}
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Минималистичный интерфейс для комфортной работы
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mb-4">
                    <Icon name="Zap" size={24} className="text-sky-600" />
                  </div>
                  <CardTitle className="text-xl font-light">Быстрый старт</CardTitle>
                  <CardDescription>Начните работу за несколько секунд</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Icon name="Shield" size={24} className="text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-light">Безопасность</CardTitle>
                  <CardDescription>Защита ваших данных на всех уровнях</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <Icon name="Settings" size={24} className="text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl font-light">Гибкость</CardTitle>
                  <CardDescription>Настройте всё под свои нужды</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-8">
            <Card className="shadow-lg border-0">
              <CardHeader className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20 border-4 border-sky-100">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-sky-400 to-blue-500 text-white">
                      {user?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl font-light">{user?.name}</CardTitle>
                    <CardDescription>{user?.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="profile-name" className="text-gray-700 font-normal">Имя</Label>
                    <div className="relative">
                      <Icon name="User" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="profile-name"
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="pl-10 border-gray-200 focus:border-sky-400 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-email" className="text-gray-700 font-normal">Email</Label>
                    <div className="relative">
                      <Icon name="Mail" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="profile-email"
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="pl-10 border-gray-200 focus:border-sky-400 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 transition-all shadow-md"
                  >
                    <Icon name="Save" size={18} className="mr-2" />
                    Сохранить изменения
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
