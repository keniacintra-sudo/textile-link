import { useEffect, useRef, useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

const THRESHOLD = 72;

const PullToRefresh = ({ onRefresh, children }: PullToRefreshProps) => {
  const [pullY, setPullY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const pulling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const el = containerRef.current;
    if (!el) return;
    if (el.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!pulling.current || refreshing) return;
    const delta = e.touches[0].clientY - startY.current;
    if (delta > 0) {
      setPullY(Math.min(delta * 0.45, THRESHOLD + 20));
    }
  }, [refreshing]);

  const handleTouchEnd = useCallback(async () => {
    if (!pulling.current) return;
    pulling.current = false;
    if (pullY >= THRESHOLD) {
      setRefreshing(true);
      setPullY(THRESHOLD);
      await onRefresh();
      setRefreshing(false);
    }
    setPullY(0);
  }, [pullY, onRefresh]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    el.addEventListener('touchend', handleTouchEnd);
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  const progress = Math.min(pullY / THRESHOLD, 1);
  const activated = pullY >= THRESHOLD;

  return (
    <div ref={containerRef} className="h-full overflow-y-auto scrollbar-hide relative">
      {(pullY > 0 || refreshing) && (
        <div
          className="flex items-center justify-center transition-all duration-200"
          style={{ height: refreshing ? 48 : pullY, overflow: 'hidden' }}
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              activated || refreshing ? 'bg-accent' : 'bg-muted'
            }`}
            style={{ transform: `scale(${0.6 + progress * 0.4})` }}
          >
            <RefreshCw
              size={16}
              className={`transition-colors ${activated || refreshing ? 'text-white' : 'text-muted-foreground'}`}
              style={{
                animation: refreshing ? 'spin 0.8s linear infinite' : undefined,
                transform: `rotate(${progress * 180}deg)`,
              }}
            />
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default PullToRefresh;
