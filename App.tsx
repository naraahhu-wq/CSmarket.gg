import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, Wallet, ShoppingCart, Search, Filter, 
  ExternalLink, User, CheckCircle2, AlertCircle, RefreshCw,
  TrendingUp, Layers, Flame, ArrowUpRight, ArrowDownRight,
  LogOut, Plus, Trash2, Settings, DollarSign, Lock, Eye,
  Sparkles, Check, ChevronDown, SlidersHorizontal, BarChart3,
  Users, CreditCard, ArrowRight, X, Info, Link as LinkIcon,
  Send, HelpCircle, Copy, AlertTriangle, Scale, QrCode,
  Building2, Zap, Clock, ShieldAlert, CheckCircle, Smartphone
} from 'lucide-react';

// DEMO DATA ONLY: not live BUFF163 listings or verified current prices.
 // Real BUFF163 data requires a permitted data/API integration.
 // --- CS2 SKINS SAMPLE DATA WITH RMB & FLOAT SPECS ---
const INITIAL_SKINS = [
  {
    id: 'skin-1',
    name: '★ Butterfly Knife | Fade',
    category: 'Knives',
    type: 'Covert Knife',
    wear: 'Factory New',
    float: 0.0084,
    buffRmb: 18500.00,
    rarity: 'Covert',
    statTrak: false,
    souvenir: false,
    image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=600',
    color: '#EB4B4B',
    gradient: 'from-pink-500/20 via-purple-500/10 to-amber-500/5'
  },
  {
    id: 'skin-2',
    name: 'AWP | Dragon Lore',
    category: 'Snipers',
    type: 'Sniper Rifle',
    wear: 'Field-Tested',
    float: 0.1824,
    buffRmb: 68000.00,
    rarity: 'Contraband',
    statTrak: false,
    souvenir: true,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600',
    color: '#FFD700',
    gradient: 'from-amber-500/25 to-yellow-500/5'
  },
  {
    id: 'skin-3',
    name: 'AK-47 | Fire Serpent',
    category: 'Rifles',
    type: 'Rifle',
    wear: 'Minimal Wear',
    float: 0.0812,
    buffRmb: 8900.00,
    rarity: 'Covert',
    statTrak: true,
    souvenir: false,
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&q=80&w=600',
    color: '#EB4B4B',
    gradient: 'from-red-500/20 to-orange-500/5'
  },
  {
    id: 'skin-4',
    name: 'M4A1-S | Printstream',
    category: 'Rifles',
    type: 'Rifle',
    wear: 'Factory New',
    float: 0.0211,
    buffRmb: 2450.00,
    rarity: 'Classified',
    statTrak: true,
    souvenir: false,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
    color: '#D32CE6',
    gradient: 'from-pink-500/20 to-purple-500/5'
  },
  {
    id: 'skin-5',
    name: '★ Sport Gloves | Vice',
    category: 'Gloves',
    type: 'Extraordinary Gloves',
    wear: 'Field-Tested',
    float: 0.2105,
    buffRmb: 14200.00,
    rarity: 'Covert',
    statTrak: false,
    souvenir: false,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
    color: '#EB4B4B',
    gradient: 'from-fuchsia-500/20 to-cyan-500/5'
  },
  {
    id: 'skin-6',
    name: '★ Karambit | Doppler (Phase 2)',
    category: 'Knives',
    type: 'Covert Knife',
    wear: 'Factory New',
    float: 0.0091,
    buffRmb: 16800.00,
    rarity: 'Covert',
    statTrak: false,
    souvenir: false,
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=600',
    color: '#EB4B4B',
    gradient: 'from-rose-500/20 to-purple-500/5'
  },
  {
    id: 'skin-7',
    name: 'USP-S | Kill Confirmed',
    category: 'Pistols',
    type: 'Pistol',
    wear: 'Minimal Wear',
    float: 0.0914,
    buffRmb: 680.00,
    rarity: 'Covert',
    statTrak: true,
    souvenir: false,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600',
    color: '#EB4B4B',
    gradient: 'from-red-600/20 to-slate-800/10'
  },
  {
    id: 'skin-8',
    name: 'Desert Eagle | Printstream',
    category: 'Pistols',
    type: 'Pistol',
    wear: 'Factory New',
    float: 0.0195,
    buffRmb: 850.00,
    rarity: 'Classified',
    statTrak: false,
    souvenir: false,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
    color: '#D32CE6',
    gradient: 'from-slate-300/20 to-purple-500/5'
  }
];

// USER STEAM INVENTORY MOCK DATA
const INITIAL_USER_INVENTORY = [
  {
    id: 'inv-1',
    name: 'AK-47 | Vulcan',
    category: 'Rifles',
    wear: 'Field-Tested',
    float: 0.1742,
    rarity: 'Covert',
    buffRmb: 1350.00,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600',
    color: '#EB4B4B'
  },
  {
    id: 'inv-2',
    name: 'AWP | Asiimov',
    category: 'Snipers',
    wear: 'Field-Tested',
    float: 0.2410,
    rarity: 'Covert',
    buffRmb: 780.00,
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&q=80&w=600',
    color: '#EB4B4B'
  },
  {
    id: 'inv-3',
    name: 'M4A4 | In Living Color',
    category: 'Rifles',
    wear: 'Minimal Wear',
    float: 0.0811,
    rarity: 'Classified',
    buffRmb: 260.00,
    image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=600',
    color: '#D32CE6'
  }
];

export default function App() {
  // Config & Exchange Rate Settings
  const [rmbToMntRate, setRmbToMntRate] = useState(485); // 1 RMB = 485 MNT
  const [platformFeePercent, setPlatformFeePercent] = useState(3.5); // 3.5% markup/fee

  // Navigation & State
  const [activeTab, setActiveTab] = useState('buy'); // 'buy', 'sell', 'admin'
  const [userBalance, setUserBalance] = useState(4850000); // MNT (₮)
  const [steamTradeUrl, setSteamTradeUrl] = useState(
    'https://steamcommunity.com/tradeoffer/new/?partner=442918239&token=K82xLs9P'
  );
  const [isTradeUrlModalOpen, setIsTradeUrlModalOpen] = useState(false);
  const [tempTradeUrl, setTempTradeUrl] = useState(steamTradeUrl);

  const [steamUser] = useState({
    username: 'Mongol_Sniper_99',
    steamId: '76561198402918239',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=150',
    verified: true
  });

  // Data Collections
  const [marketSkins, setMarketSkins] = useState(INITIAL_SKINS);
  const [userInventory, setUserInventory] = useState(INITIAL_USER_INVENTORY);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Бүгд');
  const [selectedWear, setSelectedWear] = useState('Бүгд');
  const [priceSort, setPriceSort] = useState('buff-low'); // 'buff-low', 'buff-high', 'float-low'

  // Cart & Modals
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [quickDetailSkin, setQuickDetailSkin] = useState(null);
  const [topUpAmountMnt, setTopUpAmountMnt] = useState(100000);
  const [paymentMethod, setPaymentMethod] = useState('qpay'); // 'qpay', 'khan', 'tdb'
  const [toast, setToast] = useState(null);

  // Steam Trade Dispatch Simulator State
  const [dispatchStep, setDispatchStep] = useState(0); // 0: idle, 1: verifying link, 2: fetching skin & sending bot, 3: completed
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [checkoutSkin, setCheckoutSkin] = useState(null);

  // Admin Audit Log
  const [tradeLogs, setTradeLogs] = useState([
    { id: 'LOG-8821', time: '14:20:10', user: 'Mongol_Sniper_99', skin: 'AWP | Printstream', mnt: 412000, status: 'Амжилттай Trade Offer' },
    { id: 'LOG-8820', time: '13:05:44', user: 'CS2_Pro_UB', skin: '★ Bowie Knife | Doppler', mnt: 1850000, status: 'Амжилттай Trade Offer' }
  ]);

  // Helper: Convert Buff163 RMB to MNT with fee multiplier
  const calculateMntPrice = (buffRmb) => {
    const rawMnt = buffRmb * rmbToMntRate;
    const finalMnt = rawMnt * (1 + platformFeePercent / 100);
    return Math.round(finalMnt);
  };

  // Helper: Format MNT Currency
  const formatMNT = (amount) => {
    return new Intl.NumberFormat('mn-MN').format(amount) + ' ₮';
  };

  // Toast Notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Filter & Sort Skins
  const filteredSkins = useMemo(() => {
    return marketSkins.filter(skin => {
      const matchesSearch = skin.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'Бүгд' || 
                         (selectedCategory === 'Хутга' && skin.category === 'Knives') ||
                         (selectedCategory === 'Бээлий' && skin.category === 'Gloves') ||
                         (selectedCategory === 'Винтов' && skin.category === 'Rifles') ||
                         (selectedCategory === 'Снайпер' && skin.category === 'Snipers') ||
                         (selectedCategory === 'Гар буу' && skin.category === 'Pistols');
      
      const matchesWear = selectedWear === 'Бүгд' || 
                          (selectedWear === 'FN' && skin.wear === 'Factory New') ||
                          (selectedWear === 'MW' && skin.wear === 'Minimal Wear') ||
                          (selectedWear === 'FT' && skin.wear === 'Field-Tested');
      return matchesSearch && matchesCat && matchesWear;
    }).sort((a, b) => {
      const priceA = calculateMntPrice(a.buffRmb);
      const priceB = calculateMntPrice(b.buffRmb);
      if (priceSort === 'buff-low') return priceA - priceB;
      if (priceSort === 'buff-high') return priceB - priceA;
      if (priceSort === 'float-low') return a.float - b.float;
      return 0;
    });
  }, [marketSkins, searchQuery, selectedCategory, selectedWear, priceSort, rmbToMntRate, platformFeePercent]);

  // Cart operations
  const addToCart = (skin) => {
    if (cart.find(item => item.id === skin.id)) {
      showToast('Энэ скин таны сагсанд хэдийн бүртгэгдсэн байна.', 'info');
      return;
    }
    setCart([...cart, skin]);
    showToast(`${skin.name} сагсанд нэмэгдлээ!`);
  };

  const removeFromCart = (skinId) => {
    setCart(cart.filter(i => i.id !== skinId));
  };

  const cartTotalMnt = useMemo(() => {
    return cart.reduce((acc, item) => acc + calculateMntPrice(item.buffRmb), 0);
  }, [cart, rmbToMntRate, platformFeePercent]);

  // Single Item Direct Buy Step Dispatch Simulator
  const startSingleCheckout = (skin) => {
    if (!steamTradeUrl || !steamTradeUrl.includes('steamcommunity.com/tradeoffer/new')) {
      showToast('Эхлээд Steam Trade URL-ээ тохируулна уу!', 'error');
      setIsTradeUrlModalOpen(true);
      return;
    }
    const priceMnt = calculateMntPrice(skin.buffRmb);
    if (userBalance < priceMnt) {
      showToast('Таны дансны үлдэгдэл хүрэлцэхгүй байна!', 'error');
      setIsWalletModalOpen(true);
      return;
    }

    setCheckoutSkin(skin);
    setIsDispatchModalOpen(true);
    setDispatchStep(1);

    // Timeline steps simulation
    setTimeout(() => {
      setDispatchStep(2);
      setTimeout(() => {
        setDispatchStep(3);
        setUserBalance(prev => prev - priceMnt);
        setMarketSkins(prev => prev.filter(item => item.id !== skin.id));

        // Add to audit log
        setTradeLogs(prev => [{
          id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
          time: new Date().toLocaleTimeString(),
          user: steamUser.username,
          skin: skin.name,
          mnt: priceMnt,
          status: 'Trade Илгээгдсэн'
        }, ...prev]);

        showToast(`${skin.name} скинийг Steam Trade Offer-оор амжилттай илгээлээ!`);
      }, 2200);
    }, 1800);
  };

  // Cart Batch Checkout Handler via Steam Trade URL
  const handleCartCheckout = () => {
    if (!steamTradeUrl || !steamTradeUrl.includes('steamcommunity.com/tradeoffer/new')) {
      showToast('Steam Trade URL эхлээд оруулна уу!', 'error');
      setIsTradeUrlModalOpen(true);
      return;
    }

    if (userBalance < cartTotalMnt) {
      showToast('Таны дансны үлдэгдэл хүрэлцэхгүй байна!', 'error');
      setIsWalletModalOpen(true);
      return;
    }

    setCheckoutSkin({ name: `Сагсан дахь ${cart.length} скин`, totalMnt: cartTotalMnt });
    setIsCartOpen(false);
    setIsDispatchModalOpen(true);
    setDispatchStep(1);

    setTimeout(() => {
      setDispatchStep(2);
      setTimeout(() => {
        setDispatchStep(3);
        setUserBalance(prev => prev - cartTotalMnt);
        const cartIds = cart.map(c => c.id);
        setMarketSkins(prev => prev.filter(item => !cartIds.includes(item.id)));

        // Add log
        const newLogs = cart.map(item => ({
          id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
          time: new Date().toLocaleTimeString(),
          user: steamUser.username,
          skin: item.name,
          mnt: calculateMntPrice(item.buffRmb),
          status: 'Trade Offer Илгээгдсэн'
        }));
        setTradeLogs(prev => [...newLogs, ...prev]);

        setCart([]);
        showToast('Steam Trade Offer таны Trade URL рүү амжилттай илгээгдлээ!');
      }, 2500);
    }, 2000);
  };

  // Instant Cashout (Selling skin to site based on Buff163 RMB * Rate * 92%)
  const handleSellSkinInstant = (skin) => {
    const cashoutMnt = Math.round((skin.buffRmb * rmbToMntRate) * 0.92); // 92% of Buff163
    setUserBalance(prev => prev + cashoutMnt);
    setUserInventory(prev => prev.filter(i => i.id !== skin.id));
    showToast(`${skin.name} амжилттай борлуулагдлаа! Дансанд +${formatMNT(cashoutMnt)} нэмэгдлээ.`);
  };

  // Save Trade URL
  const handleSaveTradeUrl = () => {
    if (!tempTradeUrl.includes('partner=') || !tempTradeUrl.includes('token=')) {
      showToast('Хүчинтэй Steam Trade URL оруулна уу!', 'error');
      return;
    }
    setSteamTradeUrl(tempTradeUrl);
    setIsTradeUrlModalOpen(false);
    showToast('Steam Trade URL амжилттай хадгалагдлаа!');
  };

  // DEMO ONLY: this updates local UI state; it does not process a real payment.
  const handleTopUp = () => {
    setUserBalance(prev => prev + Number(topUpAmountMnt));
    setIsWalletModalOpen(false);
    showToast(`Данс амжилттай +${formatMNT(topUpAmountMnt)}-өөр цэнэглэгдлээ!`);
  };

  return (
    <div className="min-h-screen bg-[#08090E] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 border border-cyan-500/40 text-white px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md animate-bounce">
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-400" />
          ) : toast.type === 'info' ? (
            <Info className="w-5 h-5 text-cyan-400" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          )}
          <span className="font-semibold text-sm">{toast.message}</span>
        </div>
      )}

      {/* STEAM TRADE URL VERIFICATION WARNING BANNER */}
      {!steamTradeUrl && (
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-slate-950 font-bold px-4 py-2 text-xs text-center flex items-center justify-center gap-2 shadow-lg">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Анхаар: Таны Steam Trade URL тохируулагдаагүй байна! Скин шууд хүлээж авахын тулд холбоно уу.</span>
          <button 
            onClick={() => setIsTradeUrlModalOpen(true)}
            className="bg-black/20 hover:bg-black/40 text-black px-2.5 py-0.5 rounded-md text-[11px] font-extrabold ml-2 border border-black/30 transition"
          >
            Одоо Холбох
          </button>
        </div>
      )}

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#0B0C13]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <div onClick={() => setActiveTab('buy')} className="flex items-center gap-3 cursor-pointer group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition">
                <Flame className="w-6 h-6 text-slate-950 fill-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                    CSMARKET<span className="text-cyan-400">.MN</span>
                  </span>
                  <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5" /> ҮНИЙН ЖИШИГ
                  </span>
                </div>
                <span className="block text-[10px] font-bold text-slate-400 tracking-wider -mt-0.5">
                  CS2 Монгол Арилжаа & Trade Demo
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('buy')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'buy'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" /> Скин Зах (Buy)
              </button>
              <button
                onClick={() => setActiveTab('sell')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'sell'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" /> Скин Зарах (Cashout)
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'admin'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Settings className="w-3.5 h-3.5" /> Админ Ханш
              </button>
            </nav>
          </div>

          {/* User Status & Controls */}
          <div className="flex items-center gap-3">
            
            {/* Buff Rate Ticker */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
              <span className="text-slate-400 font-semibold">Buff RMB Ханш:</span>
              <span className="font-mono font-bold text-amber-400">¥1 = {rmbToMntRate} ₮</span>
            </div>

            {/* Wallet Balance Display (MNT) */}
            <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1.5 pl-3">
              <div className="flex flex-col mr-3">
                <span className="text-[9px] uppercase font-bold text-slate-400 leading-none">Дансны Үлдэгдэл</span>
                <span className="text-xs font-black text-emerald-400 font-mono mt-0.5">{formatMNT(userBalance)}</span>
              </div>
              <button
                onClick={() => setIsWalletModalOpen(true)}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 p-2 rounded-lg transition flex items-center gap-1 font-bold text-xs"
                title="Данс Цэнэглэх"
              >
                <Plus className="w-3.5 h-3.5" /> QPay
              </button>
            </div>

            {/* Trade URL Quick Setting Button */}
            <button
              onClick={() => setIsTradeUrlModalOpen(true)}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-2.5 rounded-xl transition text-slate-300 relative"
              title="Steam Trade URL Тохируулах"
            >
              <LinkIcon className="w-4 h-4 text-cyan-400" />
              {steamTradeUrl && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-slate-900 border border-slate-800 hover:border-slate-700 p-2.5 rounded-xl transition text-slate-200"
            >
              <ShoppingCart className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-cyan-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Steam User Avatar / Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <img
                src={steamUser.avatar}
                alt={steamUser.username}
                className="w-9 h-9 rounded-xl border border-cyan-500/40 object-cover"
              />
            </div>

          </div>
        </div>
      </header>

      {/* HERO SECTION (Buy Tab) */}
      {activeTab === 'buy' && (
        <section className="relative border-b border-slate-800/80 bg-[#0C0E15] overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="space-y-3 text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
                <Send className="w-3.5 h-3.5" /> Туршилтын интерфейс — бодит Steam trade илгээхгүй
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                BUFF163 ХАНШААР <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">CS2 SKINS</span> ХУДАЛДАН АВАХ
              </h1>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                BUFF163-ийн жишиг RMB үнийг төгрөгөөр харуулах CS2 skin marketplace-ийн загвар. Энэ хувилбарын үнэ, данс, QPay болон Steam trade үйлдлүүд нь туршилтын өгөгдөл бөгөөд бодит арилжаа хийхгүй.
              </p>
            </div>

            {/* Direct Steam Trade URL Indicator Card */}
            <div className="bg-[#12141F] border border-slate-800 p-4 rounded-2xl w-full md:w-80 space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold">Хүлээж авах Steam Trade URL:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Идэвхтэй
                </span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-[11px] font-mono text-cyan-300 truncate">
                {steamTradeUrl || 'Trade URL тохируулаагүй байна!'}
              </div>
              <button
                onClick={() => setIsTradeUrlModalOpen(true)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2 rounded-xl border border-slate-700 transition flex items-center justify-center gap-1.5"
              >
                <LinkIcon className="w-3.5 h-3.5 text-cyan-400" /> URL Солих / Тохируулах
              </button>
            </div>

          </div>
        </section>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ================= TAB 1: BUY SKINS MARKET ================= */}
        {activeTab === 'buy' && (
          <div className="space-y-6">
            
            {/* Filter Toolbar */}
            <div className="bg-[#12141F] border border-slate-800 p-4 rounded-2xl space-y-4 shadow-xl">
              
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                
                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Скин хайх (AK-47, Butterfly Fade, Dragon Lore...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none transition"
                  />
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-400">Эрэмбэлэх:</span>
                    <select
                      value={priceSort}
                      onChange={(e) => setPriceSort(e.target.value)}
                      className="bg-transparent text-xs font-bold text-cyan-400 focus:outline-none cursor-pointer"
                    >
                      <option value="buff-low" className="bg-slate-900 text-white">Үнэ: Багаас нь Их рүү</option>
                      <option value="buff-high" className="bg-slate-900 text-white">Үнэ: Ихээс нь Бага руу</option>
                      <option value="float-low" className="bg-slate-900 text-white">Float: Багаас нь (Factory New)</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Category Chips & Wear Filters */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800/80 text-xs">
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider mr-1">Төрөл:</span>
                {['Бүгд', 'Хутга', 'Бээлий', 'Винтов', 'Снайпер', 'Гар буу'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      selectedCategory === cat
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}

                <div className="h-4 w-[1px] bg-slate-800 mx-2" />

                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider mr-1">Wear:</span>
                {['Бүгд', 'FN', 'MW', 'FT'].map(wear => (
                  <button
                    key={wear}
                    onClick={() => setSelectedWear(wear)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      selectedWear === wear
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {wear}
                  </button>
                ))}
              </div>

            </div>

            {/* Skins Grid Catalog */}
            {filteredSkins.length === 0 ? (
              <div className="bg-[#12141F] border border-slate-800 rounded-2xl p-12 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">Хайлтанд тохирох CS2 скин олдсонгүй</h3>
                <p className="text-slate-400 text-xs">Шүүлтүүрээ цэвэрлээд дахин хайна уу.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSkins.map((skin) => {
                  const mntPrice = calculateMntPrice(skin.buffRmb);
                  return (
                    <div
                      key={skin.id}
                      className="group relative bg-[#12141F] border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition duration-300 flex flex-col justify-between shadow-lg"
                    >
                      {/* Top Badges */}
                      <div className="p-3 flex items-center justify-between relative z-10">
                        <span className="text-[10px] font-black text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 font-mono">
                          FLOAT {skin.float}
                        </span>
                        <div className="flex gap-1">
                          {skin.statTrak && (
                            <span className="text-[9px] font-bold text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800/60">
                              ST™
                            </span>
                          )}
                          <span className="text-[10px] font-bold text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            {skin.wear}
                          </span>
                        </div>
                      </div>

                      {/* Item Visual Stage */}
                      <div className={`relative h-44 w-full bg-gradient-to-b ${skin.gradient} flex items-center justify-center p-4`}>
                        <img
                          src={skin.image}
                          alt={skin.name}
                          className="h-32 object-contain group-hover:scale-110 transition duration-500 drop-shadow-2xl"
                        />
                      </div>

                      <div className="h-0.5 w-full" style={{ backgroundColor: skin.color }} />

                      {/* Card Details */}
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-bold text-xs text-white truncate group-hover:text-cyan-400 transition">
                            {skin.name}
                          </h3>
                          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                            <span>Buff163 RMB:</span>
                            <span className="font-mono font-bold text-amber-400">¥{skin.buffRmb.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Price in MNT & Buy Actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase block">Үнэ (MNT)</span>
                            <span className="text-base font-black text-emerald-400 font-mono">
                              {formatMNT(mntPrice)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => addToCart(skin)}
                              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 transition"
                              title="Сагсанд нэмэх"
                            >
                              <ShoppingCart className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => startSingleCheckout(skin)}
                              className="px-3 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition flex items-center gap-1"
                              title="Шууд авъя"
                            >
                              Авах
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ================= TAB 2: SELL / CASHOUT INVENTORY ================= */}
        {activeTab === 'sell' && (
          <div className="space-y-6">
            <div className="bg-[#12141F] border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <h2 className="text-xl font-black text-white">Steam Inventory-ээ шууд MNT төгрөг болгох</h2>
                <p className="text-slate-400 text-xs">Buff163 зах зээлийн жишиг үнийн 92%-иар бодож таны данс руу шууд шуурхай шилжүүлнэ.</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-semibold text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Автомат Trade Offer Хүлээн Авагч
              </div>
            </div>

            {/* Inventory Listing */}
            {userInventory.length === 0 ? (
              <div className="bg-[#12141F] border border-slate-800 rounded-2xl p-12 text-center space-y-3">
                <Layers className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">Таны Steam Inventory дээр зарах боломжтой скин алга</h3>
                <p className="text-slate-400 text-xs">Худалдан авалт хийсний дараа энд зарах боломжтой болно.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userInventory.map(item => {
                  const instantMnt = Math.round((item.buffRmb * rmbToMntRate) * 0.92);
                  return (
                    <div key={item.id} className="bg-[#12141F] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-4">
                      <div className="flex gap-4 items-center">
                        <div className="w-20 h-20 bg-slate-900 rounded-xl p-2 border border-slate-800 flex items-center justify-center shrink-0">
                          <img src={item.image} alt={item.name} className="h-16 object-contain" />
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-[10px] font-bold text-cyan-400 font-mono">Float: {item.float}</span>
                          <h4 className="font-bold text-xs text-white truncate">{item.name}</h4>
                          <div className="text-[11px] text-slate-400 mt-0.5">Buff163: ¥{item.buffRmb}</div>
                        </div>
                      </div>

                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Шууд авах дүн (92%):</span>
                          <span className="font-mono font-black text-emerald-400">{formatMNT(instantMnt)}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSellSkinInstant(item)}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
                      >
                        <DollarSign className="w-4 h-4" /> Шууд Дансанд Авах ({formatMNT(instantMnt)})
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: ADMIN PANEL ================= */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-white">Админ Ханш & Арилжааны Тохиргоо</h2>
                <p className="text-slate-400 text-xs">Жишиг RMB/₮ ханш болон демо маржиныг тохируулах.</p>
              </div>
            </div>

            {/* Admin Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#12141F] border border-slate-800 p-5 rounded-2xl space-y-4">
                <h3 className="font-bold text-sm text-cyan-400 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Жишиг RMB / MNT ханш тохируулах
                </h3>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400">1 RMB (Юань) = Ханш (₮ MNT):</label>
                  <input
                    type="number"
                    value={rmbToMntRate}
                    onChange={(e) => setRmbToMntRate(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-emerald-400 font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-[#12141F] border border-slate-800 p-5 rounded-2xl space-y-4">
                <h3 className="font-bold text-sm text-amber-400 flex items-center gap-2">
                  <Scale className="w-4 h-4" /> Платформын Нэмэгдэл Хувь (%)
                </h3>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400">Шимтгэл / Ашиг маржин (%):</label>
                  <input
                    type="number"
                    value={platformFeePercent}
                    onChange={(e) => setPlatformFeePercent(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-amber-400 font-bold focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Live Trade Offer Log Table */}
            <div className="bg-[#12141F] border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-800 font-bold text-xs text-slate-200 flex justify-between items-center">
                <span>Сүүлийн Steam Trade Offer Логууд</span>
                <span className="text-[10px] text-slate-400">Нийт: {tradeLogs.length} гүйлгээ</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Гүйлгээний ID</th>
                      <th className="p-3">Цаг</th>
                      <th className="p-3">Хэрэглэгч</th>
                      <th className="p-3">Скин</th>
                      <th className="p-3">Дүн (MNT)</th>
                      <th className="p-3">Төлөв</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    {tradeLogs.map(log => (
                      <tr key={log.id}>
                        <td className="p-3 text-slate-400">{log.id}</td>
                        <td className="p-3 text-slate-400">{log.time}</td>
                        <td className="p-3 text-white font-sans font-semibold">{log.user}</td>
                        <td className="p-3 text-cyan-400 font-sans">{log.skin}</td>
                        <td className="p-3 font-bold text-emerald-400">{formatMNT(log.mnt)}</td>
                        <td className="p-3"><span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-sans text-[11px] font-bold">{log.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* STEAM TRADE DISPATCH SIMULATOR MODAL */}
      {isDispatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg bg-[#12141F] border border-slate-800 rounded-2xl p-6 shadow-2xl z-10 space-y-6">
            
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
                <h3 className="font-black text-base text-white">Steam Trade Offer Илгээх Ажиллагаа</h3>
              </div>
              {dispatchStep === 3 && (
                <button onClick={() => setIsDispatchModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-4">
              
              {/* Step 1 */}
              <div className={`flex items-start gap-3.5 p-3 rounded-xl border transition ${
                dispatchStep >= 1 ? 'bg-slate-900 border-cyan-500/40' : 'bg-slate-950 border-slate-900 opacity-50'
              }`}>
                {dispatchStep > 1 ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : dispatchStep === 1 ? (
                  <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin shrink-0 mt-0.5" />
                ) : (
                  <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="text-xs font-bold text-white">1. Steam Trade Link Шалгах</h4>
                  <p className="text-[11px] text-slate-400">Хэрэглэгчийн Trade URL холбоосыг системд баталгаажуулж байна.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`flex items-start gap-3.5 p-3 rounded-xl border transition ${
                dispatchStep >= 2 ? 'bg-slate-900 border-cyan-500/40' : 'bg-slate-950 border-slate-900 opacity-50'
              }`}>
                {dispatchStep > 2 ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : dispatchStep === 2 ? (
                  <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin shrink-0 mt-0.5" />
                ) : (
                  <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="text-xs font-bold text-white">2. Арилжааны бот (демо)</h4>
                  <p className="text-[11px] text-slate-400">Скинийг автоматаар бэлтгэж Steam-ийн API-аар Trade Offer бэлдлээ.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className={`flex items-start gap-3.5 p-3 rounded-xl border transition ${
                dispatchStep === 3 ? 'bg-emerald-950/40 border-emerald-500/50' : 'bg-slate-950 border-slate-900 opacity-50'
              }`}>
                {dispatchStep === 3 ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="text-xs font-bold text-white">3. Trade Offer Илгээгдлээ!</h4>
                  <p className="text-[11px] text-slate-400">Та өөрийн Steam Гар утасны апп эсвэл вэб дээрээс Trade Offer-ийг зөвшөөрнө үү.</p>
                </div>
              </div>

            </div>

            {dispatchStep === 3 && (
              <button
                onClick={() => setIsDispatchModalOpen(false)}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl transition text-xs shadow-lg shadow-emerald-500/20"
              >
                Ойлголоо, Баярлалаа
              </button>
            )}

          </div>
        </div>
      )}

      {/* STEAM TRADE URL SETUP MODAL */}
      {isTradeUrlModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsTradeUrlModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#12141D] border border-slate-800 rounded-2xl p-6 shadow-2xl z-10 space-y-4">
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-base text-white">Steam Trade URL Тохируулах</h3>
              </div>
              <button onClick={() => setIsTradeUrlModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Таны худалдаж авсан CS2 скинүүд шууд таны Steam аккаунт руу Trade Offer байдлаар илгээгдэх тул Steam Trade URL-ээ оруулна уу.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Steam Trade URL Линк:</label>
              <input
                type="text"
                placeholder="https://steamcommunity.com/tradeoffer/new/?partner=..."
                value={tempTradeUrl}
                onChange={(e) => setTempTradeUrl(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs font-mono text-cyan-400 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2">
              <a
                href="https://steamcommunity.com/my/tradeoffers/privacy"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                Trade URL хаанаас авах вэ? <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <button
              onClick={handleSaveTradeUrl}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-3 rounded-xl transition text-xs shadow-lg shadow-cyan-500/20"
            >
              Хадгалах ба Идэвхжүүлэх
            </button>

          </div>
        </div>
      )}

      {/* CART DRAWER OVERLAY */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-[#12141D] border-l border-slate-800 h-full flex flex-col z-10 shadow-2xl">
            
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-base text-white">Сагсласан Скинүүд</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-500 space-y-2">
                  <ShoppingCart className="w-10 h-10 mx-auto" />
                  <p className="text-xs">Сагс хоосон байна</p>
                </div>
              ) : (
                cart.map(item => {
                  const mnt = calculateMntPrice(item.buffRmb);
                  return (
                    <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-16 h-14 object-contain bg-slate-950 rounded-lg p-1" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-white truncate">{item.name}</h4>
                        <span className="text-[10px] text-cyan-400 font-mono block">Float: {item.float}</span>
                        <span className="text-xs font-mono font-black text-emerald-400">{formatMNT(mnt)}</span>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-red-400 p-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Cart Checkout Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-800 bg-slate-900/60 space-y-4">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Нийт дүн:</span>
                    <span className="font-mono text-white font-bold">{formatMNT(cartTotalMnt)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Steam Trade Хүлээн авагч:</span>
                    <span className="font-mono text-emerald-400 truncate max-w-[180px]">Personal URL</span>
                  </div>
                </div>

                <button
                  onClick={handleCartCheckout}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2 text-xs"
                >
                  <Send className="w-4 h-4" /> TRADE OFFER ИЛГЭЭХ ({formatMNT(cartTotalMnt)})
                </button>

              </div>
            )}

          </div>
        </div>
      )}

      {/* TOP-UP BALANCE QPAY / KHAN BANK MODAL (MNT) */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsWalletModalOpen(false)} />
          <div className="relative w-full max-w-md bg-[#12141D] border border-slate-800 rounded-2xl p-6 shadow-2xl z-10 space-y-5">
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-white">Төлбөрийн демо (бодит QPay холболтгүй)</h3>
              </div>
              <button onClick={() => setIsWalletModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Amount Presets */}
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-semibold">Цэнэглэх Дүн Сонгох (MNT ₮):</label>
              <div className="grid grid-cols-3 gap-2">
                {[50000, 100000, 500000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setTopUpAmountMnt(amt)}
                    className={`py-2 rounded-xl text-xs font-bold border transition font-mono ${
                      topUpAmountMnt === amt
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                        : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}
                  >
                    +{formatMNT(amt)}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method selector */}
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-semibold">Төлбөрийн Хэрэгсэл:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('qpay')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-[11px] font-bold transition ${
                    paymentMethod === 'qpay' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <QrCode className="w-4 h-4" /> QPay QR
                </button>
                <button
                  onClick={() => setPaymentMethod('khan')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-[11px] font-bold transition ${
                    paymentMethod === 'khan' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <Building2 className="w-4 h-4" /> Хаан Банк
                </button>
                <button
                  onClick={() => setPaymentMethod('tdb')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-[11px] font-bold transition ${
                    paymentMethod === 'tdb' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <Building2 className="w-4 h-4" /> ХХБ / Голомт
                </button>
              </div>
            </div>

            {/* QR Code Graphic Display */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center space-y-2">
              <div className="w-32 h-32 bg-white p-2 rounded-lg flex items-center justify-center shadow-md">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=qpay_mock_mnt_${topUpAmountMnt}`}
                  alt="QPay QR"
                  className="w-full h-full"
                />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Демо QR — бодит төлбөр хүлээн авахгүй</span>
            </div>

            <button
              onClick={handleTopUp}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl transition text-xs shadow-lg shadow-emerald-500/10"
            >
              Демо данс нэмэх (+{formatMNT(topUpAmountMnt)})
            </button>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-auto bg-[#08090E] border-t border-slate-800/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-400">CSmarket.mn</span> — CS2 skin marketplace-ийн демо хувилбар.
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <span>Жишиг өгөгдөл</span>
            <span>Steam холболт идэвхгүй</span>
          </div>
        </div>
      </footer>

    </div>
  );
}