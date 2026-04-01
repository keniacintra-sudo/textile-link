import { type LucideIcon } from 'lucide-react';

interface NavItem {
  icon: LucideIcon;
  label: string;
  id: string;
}

interface BottomNavProps {
  items: NavItem[];
  active: string;
  onNavigate: (id: string) => void;
}

const BottomNav = ({ items, active, onNavigate }: BottomNavProps) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-lg border-t border-border px-2 pb-safe z-50"
      style={{ height: 68 }}
    >
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative flex flex-col items-center gap-1 px-3 py-2 transition-all duration-200 active:scale-90"
            >
              {isActive && (
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-primary" />
              )}
              <div className={`p-1 rounded-lg transition-colors duration-200 ${isActive ? 'bg-primary/10' : ''}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} className={`transition-colors duration-200 ${isActive ? 'text-primary' : 'text-nav-inactive'}`} />
              </div>
              <span className={`text-[10px] font-medium leading-none font-sans transition-colors duration-200 ${isActive ? 'text-primary' : 'text-nav-inactive'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
