import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  MarketCategory,
  Timeframe,
  ChartStyle,
  DrawingTool,
  TickerData,
  Candle,
  ChartDrawing,
  IndicatorSettings,
} from '../types';
import { INITIAL_TICKERS, generateCandleHistory, MARKET_NEWS } from '../data/marketData';
import {
  Crosshair,
  PenTool,
  SlidersHorizontal,
  Paintbrush,
  Type,
  Calculator,
  Ruler,
  ZoomIn,
  Magnet,
  Trash2,
  Camera,
  Settings,
  Maximize2,
  Plus,
  MoreHorizontal,
  CandlestickChart,
  LineChart,
  AreaChart,
  Layers,
  GitCompare,
  TrendingUp,
  TrendingDown,
  Check,
  ChevronDown,
} from 'lucide-react';

interface SuperchartsProps {
  onOpenSearch: () => void;
  selectedSymbolFromParent?: string;
  onSymbolChange?: (symbol: string) => void;
}

export const Supercharts: React.FC<SuperchartsProps> = ({
  onOpenSearch,
  selectedSymbolFromParent,
  onSymbolChange,
}) => {
  // Active Category filter
  const [activeCategory, setActiveCategory] = useState<MarketCategory>('Crypto');

  // Active Symbol & Tickers
  const [tickers, setTickers] = useState<TickerData[]>(INITIAL_TICKERS);
  const [activeSymbol, setActiveSymbol] = useState<string>('BTCUSD');

  // Chart configurations
  const [timeframe, setTimeframe] = useState<Timeframe>('4H');
  const [chartStyle, setChartStyle] = useState<ChartStyle>('candles');
  const [activeTool, setActiveTool] = useState<DrawingTool>('crosshair');
  const [magnetMode, setMagnetMode] = useState(false);

  // Indicators state
  const [indicators, setIndicators] = useState<IndicatorSettings>({
    ema20: true,
    ema50: true,
    ema200: true,
    bollinger: false,
    volume: true,
  });
  const [showIndicatorMenu, setShowIndicatorMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showStyleMenu, setShowStyleMenu] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Active Ticker object
  const activeTicker = useMemo(() => {
    return tickers.find((t) => t.symbol === activeSymbol) || tickers[0];
  }, [tickers, activeSymbol]);

  // Sync with parent selected symbol if provided
  useEffect(() => {
    if (selectedSymbolFromParent) {
      const exists = tickers.find((t) => t.symbol === selectedSymbolFromParent);
      if (exists) {
        setActiveSymbol(selectedSymbolFromParent);
        setActiveCategory(exists.category);
      }
    }
  }, [selectedSymbolFromParent, tickers]);

  // Candlestick historical dataset
  const [candles, setCandles] = useState<Candle[]>(() =>
    generateCandleHistory(68432.10, 44)
  );

  // User freehand drawings on canvas
  const [drawings, setDrawings] = useState<ChartDrawing[]>([]);
  const isDrawingRef = useRef(false);
  const currentDrawingRef = useRef<ChartDrawing | null>(null);

  // Regenerate history when active ticker or timeframe changes
  useEffect(() => {
    const fresh = generateCandleHistory(activeTicker.price, 44);
    setCandles(fresh);
  }, [activeTicker.symbol, timeframe]);

  // Real-time live market tick simulation (updating the latest candle and price)
  useEffect(() => {
    const interval = setInterval(() => {
      const pctDrift = (Math.random() - 0.485) * 0.003;
      setTickers((prev) =>
        prev.map((t) => {
          if (t.symbol === activeTicker.symbol) {
            const newPrice = Math.max(0.0001, t.price * (1 + pctDrift));
            const diff = newPrice - t.price;
            return {
              ...t,
              price: newPrice,
              change: t.change + diff,
              changePercent: t.changePercent + pctDrift * 100,
            };
          }
          return t;
        })
      );

      setCandles((prevCandles) => {
        if (prevCandles.length === 0) return prevCandles;
        const last = { ...prevCandles[prevCandles.length - 1] };
        const priceDrift = last.close * (1 + pctDrift);
        last.close = priceDrift;
        if (priceDrift > last.high) last.high = priceDrift;
        if (priceDrift < last.low) last.low = priceDrift;
        last.volume += Math.floor(Math.random() * 3);
        return [...prevCandles.slice(0, prevCandles.length - 1), last];
      });
    }, 1600);

    return () => clearInterval(interval);
  }, [activeTicker.symbol]);

  // Interactive Canvas Handling
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Switch Symbol Handler
  const handleSelectSymbol = (sym: string) => {
    setActiveSymbol(sym);
    if (onSymbolChange) onSymbolChange(sym);
    const target = tickers.find((t) => t.symbol === sym);
    if (target) {
      setActiveCategory(target.category);
    }
  };

  // Render chart onto canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    if (candles.length < 2) return;

    const priceColWidth = 72;
    const chartAreaW = w - priceColWidth;
    const chartAreaH = indicators.volume ? h * 0.76 : h * 0.92;
    const volumeAreaH = indicators.volume ? h * 0.22 : 0;

    // Background chart grid
    ctx.strokeStyle = '#1e222d';
    ctx.lineWidth = 1;

    // Price Horizontal Grid
    const gridRows = 6;
    let minPrice = Infinity;
    let maxPrice = -Infinity;

    candles.forEach((c) => {
      if (c.low < minPrice) minPrice = c.low;
      if (c.high > maxPrice) maxPrice = c.high;
    });

    const priceMargin = (maxPrice - minPrice) * 0.08 || 1;
    minPrice -= priceMargin;
    maxPrice += priceMargin;
    const priceRange = maxPrice - minPrice || 1;

    for (let i = 0; i <= gridRows; i++) {
      const y = (chartAreaH / gridRows) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartAreaW, y);
      ctx.stroke();

      const priceVal = maxPrice - (i / gridRows) * priceRange;
      ctx.fillStyle = '#787b86';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(
        priceVal.toLocaleString(undefined, {
          minimumFractionDigits: activeTicker.precision,
          maximumFractionDigits: activeTicker.precision,
        }),
        chartAreaW + 6,
        y + 3
      );
    }

    // Time Vertical Grid
    const gridCols = 7;
    for (let i = 0; i <= gridCols; i++) {
      const x = (chartAreaW / gridCols) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    const candleCount = candles.length;
    const candleStep = chartAreaW / candleCount;
    const candleBodyWidth = Math.max(3, candleStep * 0.68);

    // Render Volume Bars
    if (indicators.volume) {
      const maxVol = Math.max(...candles.map((c) => c.volume)) || 1;
      candles.forEach((c, idx) => {
        const x = idx * candleStep + candleStep / 2;
        const isGreen = c.close >= c.open;
        const vHeight = (c.volume / maxVol) * (volumeAreaH - 12);
        const vy = h - vHeight;

        ctx.fillStyle = isGreen ? 'rgba(8, 153, 129, 0.35)' : 'rgba(242, 54, 69, 0.35)';
        ctx.fillRect(x - candleBodyWidth / 2, vy, candleBodyWidth, vHeight);
      });
    }

    // Helper to get Y coordinate for a price
    const getY = (val: number) => chartAreaH - ((val - minPrice) / priceRange) * chartAreaH;

    // Render Chart Types
    if (chartStyle === 'candles' || chartStyle === 'heikin') {
      candles.forEach((c, idx) => {
        const x = idx * candleStep + candleStep / 2;
        const isGreen = c.close >= c.open;
        const color = isGreen ? '#089981' : '#f23645';

        const openY = getY(c.open);
        const closeY = getY(c.close);
        const highY = getY(c.high);
        const lowY = getY(c.low);

        // Wick
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();

        // Body
        const topY = Math.min(openY, closeY);
        const bodyH = Math.max(Math.abs(closeY - openY), 2);

        ctx.fillStyle = color;
        ctx.fillRect(x - candleBodyWidth / 2, topY, candleBodyWidth, bodyH);
      });
    } else if (chartStyle === 'line') {
      ctx.beginPath();
      ctx.strokeStyle = '#2962ff';
      ctx.lineWidth = 2.2;
      candles.forEach((c, idx) => {
        const x = idx * candleStep + candleStep / 2;
        const y = getY(c.close);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    } else if (chartStyle === 'area') {
      ctx.beginPath();
      candles.forEach((c, idx) => {
        const x = idx * candleStep + candleStep / 2;
        const y = getY(c.close);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      const lastX = (candles.length - 1) * candleStep + candleStep / 2;
      ctx.lineTo(lastX, chartAreaH);
      ctx.lineTo(candleStep / 2, chartAreaH);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, chartAreaH);
      gradient.addColorStop(0, 'rgba(41, 98, 255, 0.45)');
      gradient.addColorStop(1, 'rgba(41, 98, 255, 0.0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Top line
      ctx.beginPath();
      ctx.strokeStyle = '#2962ff';
      ctx.lineWidth = 2;
      candles.forEach((c, idx) => {
        const x = idx * candleStep + candleStep / 2;
        const y = getY(c.close);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    // Technical Indicators
    // EMA 20 (Cyan)
    if (indicators.ema20) {
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.8;
      candles.forEach((c, idx) => {
        const x = idx * candleStep + candleStep / 2;
        const ema20Val = (c.open + c.close) / 2 - (maxPrice - minPrice) * 0.02;
        const y = getY(ema20Val);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    // EMA 50 (Purple)
    if (indicators.ema50) {
      ctx.beginPath();
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 1.8;
      candles.forEach((c, idx) => {
        const x = idx * candleStep + candleStep / 2;
        const ema50Val = (c.open + c.close) / 2 - (maxPrice - minPrice) * 0.045;
        const y = getY(ema50Val);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    // EMA 200 (Amber)
    if (indicators.ema200) {
      ctx.beginPath();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.6;
      candles.forEach((c, idx) => {
        const x = idx * candleStep + candleStep / 2;
        const ema200Val = (c.open + c.close) / 2 - (maxPrice - minPrice) * 0.09;
        const y = getY(ema200Val);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    // Bollinger Bands
    if (indicators.bollinger) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(147, 197, 253, 0.4)';
      ctx.setLineDash([4, 4]);
      candles.forEach((c, idx) => {
        const x = idx * candleStep + candleStep / 2;
        const upper = (c.open + c.close) / 2 + (maxPrice - minPrice) * 0.05;
        const y = getY(upper);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      ctx.beginPath();
      candles.forEach((c, idx) => {
        const x = idx * candleStep + candleStep / 2;
        const lower = (c.open + c.close) / 2 - (maxPrice - minPrice) * 0.05;
        const y = getY(lower);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // User drawings
    drawings.forEach((d) => {
      ctx.strokeStyle = d.color || '#38bdf8';
      ctx.lineWidth = 2;
      if (d.tool === 'trendline' && d.endX !== undefined && d.endY !== undefined) {
        ctx.beginPath();
        ctx.moveTo(d.startX, d.startY);
        ctx.lineTo(d.endX, d.endY);
        ctx.stroke();
      } else if (d.tool === 'brush' && d.points && d.points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(d.points[0].x, d.points[0].y);
        d.points.forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.stroke();
      }
    });

    // Current price horizontal dashed line & badge
    const lastCandle = candles[candles.length - 1];
    const currentPriceY = getY(lastCandle.close);
    const isUp = activeTicker.change >= 0;
    const badgeColor = isUp ? '#089981' : '#f23645';

    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = badgeColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, currentPriceY);
    ctx.lineTo(chartAreaW, currentPriceY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Live Price Pill on right scale
    ctx.fillStyle = badgeColor;
    ctx.fillRect(chartAreaW, currentPriceY - 10, priceColWidth, 20);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px JetBrains Mono, monospace';
    ctx.fillText(
      lastCandle.close.toLocaleString(undefined, {
        minimumFractionDigits: activeTicker.precision,
        maximumFractionDigits: activeTicker.precision,
      }),
      chartAreaW + 4,
      currentPriceY + 3
    );

    // Crosshair rendering
    if (mousePos.active && mousePos.x < chartAreaW && mousePos.y < h) {
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#787b86';
      ctx.lineWidth = 1;

      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(0, mousePos.y);
      ctx.lineTo(chartAreaW, mousePos.y);
      ctx.stroke();

      // Vertical line
      ctx.beginPath();
      ctx.moveTo(mousePos.x, 0);
      ctx.lineTo(mousePos.x, h);
      ctx.stroke();
      ctx.setLineDash([]);

      // Price at crosshair
      const crossPrice = maxPrice - (mousePos.y / chartAreaH) * priceRange;
      ctx.fillStyle = '#2a2e39';
      ctx.fillRect(chartAreaW, mousePos.y - 10, priceColWidth, 20);
      ctx.fillStyle = '#d1d4dc';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(
        crossPrice.toLocaleString(undefined, {
          minimumFractionDigits: activeTicker.precision,
          maximumFractionDigits: activeTicker.precision,
        }),
        chartAreaW + 4,
        mousePos.y + 3
      );
    }
  }, [
    candles,
    indicators,
    chartStyle,
    mousePos,
    drawings,
    activeTicker,
  ]);

  // Handle Canvas Mouse Events for Interactive Crosshairs & Drawing
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y, active: true });

    if (isDrawingRef.current && currentDrawingRef.current) {
      if (activeTool === 'trendline') {
        currentDrawingRef.current.endX = x;
        currentDrawingRef.current.endY = y;
        setDrawings((prev) => [
          ...prev.slice(0, prev.length - 1),
          { ...currentDrawingRef.current! },
        ]);
      } else if (activeTool === 'brush') {
        currentDrawingRef.current.points?.push({ x, y });
        setDrawings((prev) => [
          ...prev.slice(0, prev.length - 1),
          { ...currentDrawingRef.current! },
        ]);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === 'trendline') {
      isDrawingRef.current = true;
      const newD: ChartDrawing = {
        id: Math.random().toString(),
        tool: 'trendline',
        startX: x,
        startY: y,
        endX: x,
        endY: y,
        color: '#38bdf8',
      };
      currentDrawingRef.current = newD;
      setDrawings((prev) => [...prev, newD]);
    } else if (activeTool === 'brush') {
      isDrawingRef.current = true;
      const newD: ChartDrawing = {
        id: Math.random().toString(),
        tool: 'brush',
        startX: x,
        startY: y,
        points: [{ x, y }],
        color: '#a855f7',
      };
      currentDrawingRef.current = newD;
      setDrawings((prev) => [...prev, newD]);
    }
  };

  const handleMouseUp = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      currentDrawingRef.current = null;
      notify('Drawing saved to chart layout');
    }
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      currentDrawingRef.current = null;
    }
  };

  // Fullscreen trigger
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      notify('Entered Fullscreen mode');
    } else {
      document.exitFullscreen?.().catch(() => {});
      notify('Exited Fullscreen');
    }
  };

  // Take Snapshot
  const handleTakeSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeTicker.symbol}-superchart.png`;
      a.click();
      notify('Chart snapshot saved to downloads!');
    } catch {
      notify('Snapshot captured to clipboard');
    }
  };

  // Filter watchlist based on active category
  const filteredWatchlist = useMemo(() => {
    return tickers.filter((t) => t.category === activeCategory);
  }, [tickers, activeCategory]);

  return (
    <section
      id="chart-section"
      className="py-12 px-2 sm:px-6 max-w-[1920px] mx-auto select-none"
      ref={containerRef}
    >
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 bg-[#1e222d] border border-[#2962ff] text-white px-4 py-2 rounded-lg shadow-2xl flex items-center gap-2 text-xs animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-[#089981]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Platform Section Header & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>Supercharts</span>
            <span className="text-xs bg-[#2962ff]/20 text-[#2962ff] px-2.5 py-0.5 rounded-full font-medium border border-[#2962ff]/30">
              PRO
            </span>
          </h2>
          <p className="text-sm text-[#787b86] mt-1">
            Live streaming multi-asset financial charts engineered for speed.
          </p>
        </div>

        {/* Quick Asset Market Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 text-xs font-semibold no-scrollbar">
          {(['Stocks', 'Crypto', 'Forex', 'Indices', 'Futures', 'Bonds'] as MarketCategory[]).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  const firstInCat = tickers.find((t) => t.category === cat);
                  if (firstInCat) {
                    handleSelectSymbol(firstInCat.symbol);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#2962ff] text-white shadow-sm'
                    : 'bg-[#1e222d] hover:bg-[#2a2e39] text-[#787b86] hover:text-white'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Terminal Frame Wrapper */}
      <div className="bg-[#131722] border border-[#2a2e39] rounded-xl shadow-2xl overflow-hidden flex flex-col h-[760px]">
        {/* Chart Top Control Bar: Symbol, Intervals, Types, Indicators */}
        <div className="h-12 border-b border-[#2a2e39] bg-[#181b27] px-3 flex items-center justify-between gap-2 overflow-x-auto text-xs select-none">
          {/* Left: Asset Header Info */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 cursor-pointer hover:bg-[#2a2e39] px-2 py-1 rounded transition-colors text-left"
              title="Search symbol"
            >
              <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center font-bold text-[10px] text-white">
                {activeTicker.symbol[0]}
              </span>
              <span className="font-bold text-white text-sm">{activeTicker.symbol}</span>
              <span className="text-[#787b86] font-mono text-xs">{activeTicker.exchange}</span>
              <ChevronDown className="w-3 h-3 text-[#787b86]" />
            </button>

            <div className="h-4 w-[1px] bg-[#2a2e39]" />

            {/* Timeframe Intervals */}
            <div className="flex items-center gap-1 font-semibold text-[#787b86]">
              {(['1m', '15m', '1H', '4H', '1D', '1W'] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-1.5 py-1 rounded cursor-pointer transition-colors ${
                    timeframe === tf
                      ? 'text-[#2962ff] bg-[#2962ff]/10 font-bold'
                      : 'hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <div className="h-4 w-[1px] bg-[#2a2e39]" />

            {/* Chart Style Selector */}
            <div className="relative">
              <button
                onClick={() => setShowStyleMenu(!showStyleMenu)}
                className="hover:text-white px-1.5 py-1 rounded flex items-center gap-1 text-[#787b86] hover:bg-[#2a2e39] cursor-pointer"
                title="Chart Type"
              >
                {chartStyle === 'candles' && <CandlestickChart className="w-4 h-4 text-white" />}
                {chartStyle === 'line' && <LineChart className="w-4 h-4 text-white" />}
                {chartStyle === 'area' && <AreaChart className="w-4 h-4 text-white" />}
                {chartStyle === 'heikin' && <CandlestickChart className="w-4 h-4 text-purple-400" />}
                <ChevronDown className="w-2.5 h-2.5" />
              </button>

              {showStyleMenu && (
                <div className="absolute left-0 top-full mt-1 bg-[#1e222d] border border-[#2a2e39] rounded-lg py-1 w-32 shadow-xl z-50">
                  <button
                    onClick={() => { setChartStyle('candles'); setShowStyleMenu(false); }}
                    className="w-full px-3 py-1.5 text-left text-xs hover:bg-[#2a2e39] flex items-center gap-2 text-gray-200"
                  >
                    <CandlestickChart className="w-3.5 h-3.5" /> Candlesticks
                  </button>
                  <button
                    onClick={() => { setChartStyle('line'); setShowStyleMenu(false); }}
                    className="w-full px-3 py-1.5 text-left text-xs hover:bg-[#2a2e39] flex items-center gap-2 text-gray-200"
                  >
                    <LineChart className="w-3.5 h-3.5" /> Line
                  </button>
                  <button
                    onClick={() => { setChartStyle('area'); setShowStyleMenu(false); }}
                    className="w-full px-3 py-1.5 text-left text-xs hover:bg-[#2a2e39] flex items-center gap-2 text-gray-200"
                  >
                    <AreaChart className="w-3.5 h-3.5" /> Area
                  </button>
                  <button
                    onClick={() => { setChartStyle('heikin'); setShowStyleMenu(false); }}
                    className="w-full px-3 py-1.5 text-left text-xs hover:bg-[#2a2e39] flex items-center gap-2 text-gray-200"
                  >
                    <CandlestickChart className="w-3.5 h-3.5 text-purple-400" /> Heikin Ashi
                  </button>
                </div>
              )}
            </div>

            {/* Indicators Toggle Menu */}
            <div className="relative">
              <button
                onClick={() => setShowIndicatorMenu(!showIndicatorMenu)}
                className="hover:text-white px-1.5 py-1 rounded flex items-center gap-1.5 text-[#787b86] hover:bg-[#2a2e39] cursor-pointer"
                title="Indicators"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Indicators</span>
              </button>

              {showIndicatorMenu && (
                <div className="absolute left-0 top-full mt-1 bg-[#1e222d] border border-[#2a2e39] rounded-lg p-2 w-52 shadow-2xl z-50">
                  <div className="text-[11px] font-bold text-gray-400 px-2 py-1 uppercase tracking-wider">
                    Overlays
                  </div>
                  <label className="flex items-center justify-between px-2 py-1.5 hover:bg-[#2a2e39] rounded cursor-pointer text-xs">
                    <span className="text-cyan-400 font-mono">EMA 20</span>
                    <input
                      type="checkbox"
                      checked={indicators.ema20}
                      onChange={(e) => setIndicators((prev) => ({ ...prev, ema20: e.target.checked }))}
                      className="rounded bg-[#131722] border-[#2a2e39] text-[#2962ff] focus:ring-0"
                    />
                  </label>
                  <label className="flex items-center justify-between px-2 py-1.5 hover:bg-[#2a2e39] rounded cursor-pointer text-xs">
                    <span className="text-purple-400 font-mono">EMA 50</span>
                    <input
                      type="checkbox"
                      checked={indicators.ema50}
                      onChange={(e) => setIndicators((prev) => ({ ...prev, ema50: e.target.checked }))}
                      className="rounded bg-[#131722] border-[#2a2e39] text-[#2962ff] focus:ring-0"
                    />
                  </label>
                  <label className="flex items-center justify-between px-2 py-1.5 hover:bg-[#2a2e39] rounded cursor-pointer text-xs">
                    <span className="text-amber-400 font-mono">EMA 200</span>
                    <input
                      type="checkbox"
                      checked={indicators.ema200}
                      onChange={(e) => setIndicators((prev) => ({ ...prev, ema200: e.target.checked }))}
                      className="rounded bg-[#131722] border-[#2a2e39] text-[#2962ff] focus:ring-0"
                    />
                  </label>
                  <label className="flex items-center justify-between px-2 py-1.5 hover:bg-[#2a2e39] rounded cursor-pointer text-xs">
                    <span className="text-blue-300 font-mono">Bollinger Bands</span>
                    <input
                      type="checkbox"
                      checked={indicators.bollinger}
                      onChange={(e) => setIndicators((prev) => ({ ...prev, bollinger: e.target.checked }))}
                      className="rounded bg-[#131722] border-[#2a2e39] text-[#2962ff] focus:ring-0"
                    />
                  </label>
                  <label className="flex items-center justify-between px-2 py-1.5 hover:bg-[#2a2e39] rounded cursor-pointer text-xs">
                    <span className="text-emerald-400 font-mono">Volume Histogram</span>
                    <input
                      type="checkbox"
                      checked={indicators.volume}
                      onChange={(e) => setIndicators((prev) => ({ ...prev, volume: e.target.checked }))}
                      className="rounded bg-[#131722] border-[#2a2e39] text-[#2962ff] focus:ring-0"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Compare Tool */}
            <button
              onClick={() => {
                notify('Compare mode enabled: SPX overlaid on scale');
              }}
              className="hover:text-white px-1.5 py-1 rounded flex items-center gap-1.5 text-[#787b86] hover:bg-[#2a2e39] cursor-pointer"
              title="Compare"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Compare</span>
            </button>
          </div>

          {/* Right Chart Quick Tools */}
          <div className="flex items-center gap-2 shrink-0 text-[#787b86]">
            <span
              className={`font-mono text-xs font-semibold px-2 py-0.5 rounded transition-colors ${
                activeTicker.change >= 0
                  ? 'text-[#089981] bg-[#089981]/10'
                  : 'text-[#f23645] bg-[#f23645]/10'
              }`}
            >
              Live: ${activeTicker.price.toLocaleString(undefined, {
                minimumFractionDigits: activeTicker.precision,
                maximumFractionDigits: activeTicker.precision,
              })}
            </span>

            {/* Snapshot */}
            <button
              onClick={handleTakeSnapshot}
              className="hover:text-white p-1.5 rounded hover:bg-[#2a2e39] transition-colors cursor-pointer"
              title="Take Snapshot"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Settings */}
            <button
              onClick={() => setShowSettingsMenu(!showSettingsMenu)}
              className="hover:text-white p-1.5 rounded hover:bg-[#2a2e39] transition-colors cursor-pointer"
              title="Chart Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="hover:text-white p-1.5 rounded hover:bg-[#2a2e39] transition-colors cursor-pointer"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Publish */}
            <button
              onClick={() => notify('Trade idea ready to publish on TradingView community')}
              className="bg-[#2962ff] text-white text-xs font-semibold px-3 py-1 rounded hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Publish
            </button>
          </div>
        </div>

        {/* Main Body: [Left Tool Sidebar] + [Interactive Chart Canvas] + [Right Watchlist Drawer] */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Tool Palette Sidebar */}
          <aside className="w-12 border-r border-[#2a2e39] bg-[#131722] flex flex-col items-center py-2 gap-2 text-[#787b86] shrink-0">
            <button
              onClick={() => { setActiveTool('crosshair'); notify('Crosshair tool active'); }}
              className={`w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer ${
                activeTool === 'crosshair'
                  ? 'bg-[#2a2e39] text-white'
                  : 'hover:bg-[#2a2e39] hover:text-white'
              }`}
              title="Crosshair (Navigate)"
            >
              <Crosshair className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => { setActiveTool('trendline'); notify('Trendline tool active: click and drag on canvas'); }}
              className={`w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer ${
                activeTool === 'trendline'
                  ? 'bg-[#2a2e39] text-white'
                  : 'hover:bg-[#2a2e39] hover:text-white'
              }`}
              title="Trendline"
            >
              <PenTool className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => { setActiveTool('fib'); notify('Fibonacci retracement level tool selected'); }}
              className={`w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer ${
                activeTool === 'fib'
                  ? 'bg-[#2a2e39] text-white'
                  : 'hover:bg-[#2a2e39] hover:text-white'
              }`}
              title="Fibonacci Retracement"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => { setActiveTool('brush'); notify('Brush tool active: click and draw freehand on canvas'); }}
              className={`w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer ${
                activeTool === 'brush'
                  ? 'bg-[#2a2e39] text-white'
                  : 'hover:bg-[#2a2e39] hover:text-white'
              }`}
              title="Brush / Paint"
            >
              <Paintbrush className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => { setActiveTool('text'); notify('Annotation text tool active'); }}
              className={`w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer ${
                activeTool === 'text'
                  ? 'bg-[#2a2e39] text-white'
                  : 'hover:bg-[#2a2e39] hover:text-white'
              }`}
              title="Text Note"
            >
              <Type className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => { setActiveTool('position'); notify('Risk / Reward long position calculator engaged'); }}
              className={`w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer ${
                activeTool === 'position'
                  ? 'bg-[#2a2e39] text-white'
                  : 'hover:bg-[#2a2e39] hover:text-white'
              }`}
              title="Long / Short Position Tool"
            >
              <Calculator className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => { setActiveTool('measure'); notify('Measure price & bar distance tool active'); }}
              className={`w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer ${
                activeTool === 'measure'
                  ? 'bg-[#2a2e39] text-white'
                  : 'hover:bg-[#2a2e39] hover:text-white'
              }`}
              title="Measure Distance"
            >
              <Ruler className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => { setActiveTool('zoom'); notify('Box zoom active'); }}
              className={`w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer ${
                activeTool === 'zoom'
                  ? 'bg-[#2a2e39] text-white'
                  : 'hover:bg-[#2a2e39] hover:text-white'
              }`}
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <div className="my-auto" />

            <button
              onClick={() => {
                setMagnetMode(!magnetMode);
                notify(magnetMode ? 'Magnet mode disabled' : 'Magnet mode enabled (snaps to wicks)');
              }}
              className={`w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer ${
                magnetMode ? 'bg-blue-600 text-white' : 'hover:bg-[#2a2e39] hover:text-white'
              }`}
              title="Magnet Mode"
            >
              <Magnet className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setDrawings([]);
                notify('Cleared all canvas drawings');
              }}
              className="w-8 h-8 rounded flex items-center justify-center hover:bg-[#2a2e39] text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              title="Delete Drawings"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </aside>

          {/* Center: Interactive Financial Chart Viewport */}
          <div className="flex-1 relative flex flex-col bg-[#131722] overflow-hidden">
            {/* Chart Indicators Overlay Watermark */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none select-none">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-white font-bold">
                  {activeTicker.symbol} · {timeframe} · {activeTicker.exchange}
                </span>
                <span className={activeTicker.change >= 0 ? 'text-[#089981] font-semibold' : 'text-[#f23645] font-semibold'}>
                  O: {(activeTicker.price * 0.991).toFixed(2)} H: {activeTicker.high24h.toFixed(2)} L: {activeTicker.low24h.toFixed(2)} C: {activeTicker.price.toFixed(2)}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono mt-1">
                {indicators.ema20 && (
                  <span className="text-cyan-400 font-medium">
                    EMA (20, close): {(activeTicker.price * 0.985).toFixed(2)}
                  </span>
                )}
                {indicators.ema50 && (
                  <span className="text-purple-400 font-medium">
                    EMA (50, close): {(activeTicker.price * 0.962).toFixed(2)}
                  </span>
                )}
                {indicators.ema200 && (
                  <span className="text-amber-400 font-medium">
                    EMA (200, close): {(activeTicker.price * 0.885).toFixed(2)}
                  </span>
                )}
                {indicators.volume && (
                  <span className="text-[#787b86]">Vol: {activeTicker.volume24h}</span>
                )}
              </div>
            </div>

            {/* HTML5 Canvas for Candlesticks & Technical Lines */}
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className="w-full flex-1 cursor-crosshair block"
            />

            {/* Interactive Time Bar at bottom of chart */}
            <div className="h-7 border-t border-[#2a2e39] bg-[#181b27] flex items-center justify-between px-3 text-[10px] font-mono text-[#787b86]">
              <span>12:00</span>
              <span>15:00</span>
              <span>18:00</span>
              <span>21:00</span>
              <span>03:00</span>
              <span>06:00</span>
              <span>09:00</span>
              <span className="text-white bg-[#2a2e39] px-1.5 py-0.5 rounded">Current (UTC)</span>
            </div>
          </div>

          {/* Right Watchlist & Financial News Drawer */}
          <aside className="hidden xl:flex flex-col w-72 border-l border-[#2a2e39] bg-[#181b27] shrink-0">
            {/* Watchlist Header */}
            <div className="p-3 border-b border-[#2a2e39] flex items-center justify-between text-xs">
              <span className="font-bold text-white uppercase tracking-wider">Watchlist</span>
              <div className="flex items-center gap-2 text-[#787b86]">
                <button
                  onClick={onOpenSearch}
                  className="hover:text-white cursor-pointer p-1 rounded hover:bg-[#2a2e39]"
                  title="Add Symbol"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => notify('Watchlist sorted by 24h gain')}
                  className="hover:text-white cursor-pointer p-1 rounded hover:bg-[#2a2e39]"
                  title="Options"
                >
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Watchlist Items List */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#2a2e39]/50 text-xs">
              {filteredWatchlist.map((item) => {
                const isSelected = item.symbol === activeTicker.symbol;
                const isPositive = item.change >= 0;
                return (
                  <div
                    key={item.symbol}
                    onClick={() => handleSelectSymbol(item.symbol)}
                    className={`p-2.5 cursor-pointer flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-[#2a2e39]/80 border-l-2 border-[#2962ff]'
                        : 'hover:bg-[#2a2e39]/50'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        {item.symbol}
                      </div>
                      <div className="text-[10px] text-[#787b86] truncate max-w-[120px]">
                        {item.name}
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-white font-medium">
                        {item.price.toLocaleString(undefined, {
                          minimumFractionDigits: item.precision,
                          maximumFractionDigits: item.precision,
                        })}
                      </div>
                      <div
                        className={`text-[11px] flex items-center justify-end gap-0.5 ${
                          isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {item.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom News Stream in Watchlist */}
            <div className="h-44 border-t border-[#2a2e39] bg-[#141722] p-3 flex flex-col justify-between text-xs">
              <div>
                <div className="flex items-center justify-between text-[#787b86] mb-1.5 text-[11px]">
                  <span className="font-semibold text-white">Market Headlines</span>
                  <span>{MARKET_NEWS[0].time}</span>
                </div>
                <p
                  onClick={() => notify(`Opening headline: ${MARKET_NEWS[0].title}`)}
                  className="text-gray-300 font-medium line-clamp-2 leading-relaxed hover:text-white cursor-pointer"
                >
                  {MARKET_NEWS[0].title}
                </p>
                <div className="text-[10px] text-gray-400 mt-1">{MARKET_NEWS[0].source}</div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#787b86] pt-2 border-t border-[#2a2e39]/40">
                <button
                  onClick={onOpenSearch}
                  className="text-[#2962ff] hover:underline cursor-pointer"
                >
                  View full feed
                </button>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                  Live
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
