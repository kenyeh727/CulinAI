import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from './services/supabaseClient';
import { saveReading } from './services/readingsService';
import HistoryPage from './components/HistoryPage';
import { AuthButton } from './components/AuthButton';

import RecipeForm from './components/RecipeForm';
import RecipeDisplay from './components/RecipeDisplay';
import ChatBot from './components/ChatBot';
import CookieConsent from './components/CookieConsent';
import { Recipe, Language, RecipePreferences, RecipeHistoryItem, Cuisine } from './types';
import { generateRecipe, ensureApiKey } from './services/geminiService';
import { translations } from './translations';

/* Removed HISTORY_KEY as we are moving to Supabase, but keeping local storage for guest mode if needed */
const HISTORY_KEY = 'culinai_history';

const AppContent: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const [history, setHistory] = useState<RecipeHistoryItem[]>([]);
  const [presetPrefs, setPresetPrefs] = useState<RecipePreferences | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const t = translations[lang];

  // Check for API key on mount
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);



  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveToHistory = (newRecipes: Recipe[]) => {
    if (!newRecipes.length) return;

    const newItem: RecipeHistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      recipes: newRecipes,
      summaryTitle: newRecipes[0].title
    };

    const updatedHistory = [newItem, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const saveToSupabase = async (newRecipes: Recipe[], prefs: RecipePreferences) => {
    if (!user) return;

    const recipe = newRecipes[0];
    const summary = `Generated ${prefs.cuisine} ${prefs.mealType}: ${recipe.title}`;

    await saveReading({
      mode: 'Tarot', // Using 'Tarot' as requested by schema, effectively 'Recipe' mode
      user_query: summary,
      cards_drawn: newRecipes.map(r => r.title), // Storing titles as 'cards'
      ai_analysis: JSON.stringify(newRecipes), // Storing full JSON in analysis
      image_urls: [] // No generated images yet
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const handleGenerateRecipe = async (prefs: RecipePreferences) => {
    setIsLoading(true);
    setError(null);
    try {
      // Ensure we have a key before generating
      await ensureApiKey();

      const newRecipes = await generateRecipe(prefs, lang);
      setRecipes(newRecipes);
      saveToHistory(newRecipes);
      if (user) {
        saveToSupabase(newRecipes, prefs);
      }
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setError(`${t.errorGen} (${err.message || 'Unknown error'})`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRecipes(null);
    setError(null);
  };

  const loadFromHistory = (item: RecipeHistoryItem) => {
    setRecipes(item.recipes);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadSuggestion = (type: 'chinese' | 'western' | 'french') => {
    let prefs: RecipePreferences = {
      ingredients: "",
      cuisine: Cuisine.CHINESE,
      difficulty: "Medium",
      time: "45 mins",
      numDishes: 1,
      portionSize: "2",
      occasion: "daily",
      mealType: "dinner",
      dietaryRestrictions: [],
      appliance: "stove"
    };

    if (type === 'chinese') {
      prefs.ingredients = "Tofu, Ground Pork, Sichuan Peppercorns, Doubanjiang (Bean Paste)";
      prefs.cuisine = Cuisine.CHINESE;
    } else if (type === 'western') {
      prefs.ingredients = "Pasta, Mushrooms, Heavy Cream, Garlic, Parmesan Cheese";
      prefs.cuisine = Cuisine.ITALIAN;
    } else if (type === 'french') {
      prefs.ingredients = "Beef Chuck, Red Wine, Carrots, Onions, Bacon, Mushrooms";
      prefs.cuisine = Cuisine.FRENCH;
      prefs.time = "3 hours";
    }

    setPresetPrefs(prefs);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLang(prev => {
      if (prev === 'en') return 'zh-TW';
      if (prev === 'zh-TW') return 'zh-CN';
      if (prev === 'zh-CN') return 'ko';
      return 'en';
    });
  };

  const getLangLabel = (l: Language) => {
    switch (l) {
      case 'en': return 'EN';
      case 'zh-TW': return '繁體';
      case 'zh-CN': return '简体';
      case 'ko': return '한국어';
      default: return 'EN';
    }
  };

  const isHistoryPage = location.pathname === '/history';

  return (
    <div className="min-h-screen relative font-sans selection:bg-chef-200 overflow-x-hidden pb-12">
      {/* Background Image with Overlay */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80")',
        }}
      ></div>
      <div className="fixed inset-0 z-0 bg-stone-50/90 backdrop-blur-[2px]"></div>

      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200/50 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <i className="fas fa-utensils text-chef-600 text-xl"></i>
            <span className="text-xl font-serif font-bold text-stone-900">{t.appTitle}</span>
          </div>
          <div className="flex items-center gap-4">

            {/* Login / Profile Section */}
            {!user ? (
              <AuthButton />
            ) : (
              <div className="flex items-center gap-3 bg-stone-100 pl-1 pr-3 py-1 rounded-full border border-stone-200 shadow-inner">
                {user.user_metadata.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="Profile" className="w-8 h-8 rounded-full shadow-sm" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-chef-400 to-chef-600 flex items-center justify-center text-white shadow-sm">
                    <i className="fas fa-user text-xs"></i>
                  </div>
                )}
                {/* User Dropdown / Link to History */}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-stone-700 leading-none">{user.user_metadata.full_name?.split(' ')[0] || 'Chef'}</span>
                  <Link to="/history" className="text-[10px] text-chef-600 hover:underline leading-none mt-0.5">View History</Link>
                </div>

                <button onClick={() => supabase.auth.signOut()} className="text-xs text-stone-400 hover:text-stone-600 ml-1">
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            )}

            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full text-sm font-semibold text-stone-600 transition-colors w-24 justify-center"
            >
              <i className="fas fa-globe text-stone-400"></i>
              <span>{getLangLabel(lang)}</span>
            </button>
          </div>
        </div >
      </nav >

      {/* Main Content */}
      {
        isHistoryPage ? (
          <HistoryPage />
        ) : (
          <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {error && (
              <div className="mb-8 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl flex items-center shadow-sm">
                <i className="fas fa-exclamation-circle mr-3"></i>
                {error}
              </div>
            )}

            {recipes ? (
              <RecipeDisplay recipes={recipes} onReset={handleReset} lang={lang} />
            ) : (
              <div className="flex flex-col items-center">
                <div className="text-center mb-12 max-w-2xl bg-white/60 p-8 rounded-3xl backdrop-blur-sm shadow-sm border border-white/50">
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4 leading-tight">
                    {t.heroTitle} <span className="text-chef-600">{t.heroTitleHighlight}</span>.
                  </h1>
                  <p className="text-lg text-stone-600">
                    {t.heroDesc}
                  </p>
                </div>

                <RecipeForm
                  onSubmit={handleGenerateRecipe}
                  isLoading={isLoading}
                  lang={lang}
                  presetPrefs={presetPrefs}
                />

                {/* History Section (Local Storage - Guest) */}
                {history.length > 0 && !user && (
                  <div className="w-full max-w-2xl mt-12">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif font-bold text-lg text-stone-800 flex items-center gap-2">
                        <i className="fas fa-history text-stone-400"></i>
                        {t.historyTitle}
                      </h3>
                      <button
                        onClick={clearHistory}
                        className="text-xs text-stone-500 hover:text-red-500 underline"
                      >
                        {t.clearHistory}
                      </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                      {history.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => loadFromHistory(item)}
                          className="flex-shrink-0 w-64 bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:border-chef-300 hover:shadow-md transition-all text-left group"
                        >
                          <div className="font-bold text-stone-800 truncate mb-1 group-hover:text-chef-700">
                            {item.summaryTitle}
                          </div>
                          <div className="text-xs text-stone-400">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {/* Logged in user sees link to full history above, or we could show recent here too */}

                {/* Suggested Recipes Section */}
                <div className="w-full max-w-5xl mt-16 mb-8">
                  <div className="text-center mb-8">
                    <h3 className="font-serif font-bold text-2xl text-stone-900 mb-2">{t.suggestionsTitle}</h3>
                    <p className="text-stone-500">{t.suggestionsDesc}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Chinese Suggestion - Mapo Tofu */}
                    <div
                      onClick={() => loadSuggestion('chinese')}
                      className="bg-white/90 backdrop-blur rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border border-stone-100 group"
                    >
                      <div className="h-32 bg-red-100 relative overflow-hidden">
                        <img
                          src="./images/mapo-tofu.png"
                          alt="Chinese Mapo Tofu"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md text-xs font-bold text-stone-700">
                          {t.suggestionDishes.chinese.cuisine}
                        </div>
                      </div>
                      <div className="p-5">
                        <h4 className="font-bold text-lg text-stone-900 mb-1 group-hover:text-chef-600 transition-colors">
                          {t.suggestionDishes.chinese.title}
                        </h4>
                        <p className="text-sm text-stone-500">
                          {t.suggestionDishes.chinese.desc}
                        </p>
                      </div>
                    </div>

                    {/* Western Suggestion - Creamy Mushroom Pasta */}
                    <div
                      onClick={() => loadSuggestion('western')}
                      className="bg-white/90 backdrop-blur rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border border-stone-100 group"
                    >
                      <div className="h-32 bg-yellow-100 relative overflow-hidden">
                        <img
                          src="./images/mushroom-pasta.png"
                          alt="Creamy Mushroom Pasta"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md text-xs font-bold text-stone-700">
                          {t.suggestionDishes.western.cuisine}
                        </div>
                      </div>
                      <div className="p-5">
                        <h4 className="font-bold text-lg text-stone-900 mb-1 group-hover:text-chef-600 transition-colors">
                          {t.suggestionDishes.western.title}
                        </h4>
                        <p className="text-sm text-stone-500">
                          {t.suggestionDishes.western.desc}
                        </p>
                      </div>
                    </div>

                    {/* French Suggestion - Beef Bourguignon */}
                    <div
                      onClick={() => loadSuggestion('french')}
                      className="bg-white/90 backdrop-blur rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border border-stone-100 group"
                    >
                      <div className="h-32 bg-indigo-100 relative overflow-hidden">
                        <img
                          src="./images/beef-bourguignon.png"
                          alt="French Beef Bourguignon"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md text-xs font-bold text-stone-700">
                          {t.suggestionDishes.french.cuisine}
                        </div>
                      </div>
                      <div className="p-5">
                        <h4 className="font-bold text-lg text-stone-900 mb-1 group-hover:text-chef-600 transition-colors">
                          {t.suggestionDishes.french.title}
                        </h4>
                        <p className="text-sm text-stone-500">
                          {t.suggestionDishes.french.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-stone-200/50 bg-white/60 backdrop-blur-sm mt-12 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-stone-500 text-sm">
          &copy; {new Date().getFullYear()} {t.appTitle}. Powered by AI.
        </div>
      </footer>

      {/* Floating Chat */}
      <ChatBot lang={lang} />

      {/* Cookie Banner */}
      <CookieConsent />
    </div >
  );
};

const App: React.FC = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="*" element={<AppContent />} />
      </Routes>
    </Router>
  );
};

export default App;