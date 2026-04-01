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
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 pb-safe z-50" style={{ height: 64 }}>
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative flex flex-col items-center gap-0.5 px-3 py-2 transition-colors"
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-full bg-primary" />
              )}
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-primary' : 'text-nav-inactive'} />
              <span className={`text-[10px] font-medium leading-none font-sans ${isActive ? 'text-primary' : 'text-nav-inactive'}`}>
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