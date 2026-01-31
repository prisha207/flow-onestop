import { NavLink, useLocation } from 'react-router-dom';

const navTabs = [
  { name: 'Focus Day View', path: '/' },
  { name: 'Mailbox', path: '/mailbox' },
  { name: 'Calendar', path: '/calendar' },
  { name: 'Meetings', path: '/meetings' },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center">
          <span className="text-lg font-semibold text-foreground">FlowMail</span>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-2xl font-bold text-foreground">Focus</h1>
        </div>

        <nav className="flex items-center gap-1">
          {navTabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`nav-tab ${
                location.pathname === tab.path ? 'nav-tab-active' : ''
              }`}
            >
              {tab.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
