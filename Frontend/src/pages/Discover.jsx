import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { BRANCHES, YEARS, HOSTEL_STATUS } from '../utils/constants';
import Navbar from '../components/Navbar';
import UserCard from '../components/UserCard';

export default function Discover() {
  const { profile } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    let query = supabase
      .from('users')
      .select('*')
      .neq('id', profile.id)
      .order('full_name', { ascending: true });

    if (search.trim()) {
      query = query.ilike('full_name', `%${search.trim()}%`);
    }
    if (filterBranch) {
      query = query.eq('branch', filterBranch);
    }
    if (filterYear) {
      query = query.eq('year', filterYear);
    }
    if (filterStatus) {
      query = query.eq('hostel_or_day', filterStatus);
    }

    const { data, error } = await query.limit(50);
    if (error) console.error(error);
    setUsers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (profile) fetchUsers();
  }, [profile, search, filterBranch, filterYear, filterStatus]);

  const ChipButton = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-transform active:scale-95 cursor-pointer border-none ${
        active 
          ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary-container shadow-[0_0_15px_rgba(233,30,140,0.3)]' 
          : 'bg-surface-container-highest text-on-surface hover:bg-surface-bright'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-background min-h-screen pb-32">
      {/* Ambient Glow Effects */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-container/10 blur-[150px] pointer-events-none z-0"></div>

      <Navbar />

      <main className="pt-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="space-y-6">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-on-surface animate-fade-in">Discover</h1>

          {/* Sticky Search Bar Container */}
          <div className="sticky top-20 z-40 py-2 bg-background/80 backdrop-blur-md animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="relative group neon-glow-pink transition-all duration-300 rounded-full overflow-hidden border border-outline-variant/20 focus-within:shadow-[0_0_20px_rgba(233,30,140,0.3)]">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-on-surface-variant">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-surface-container-high py-4 pl-14 pr-6 rounded-full border-none focus:ring-0 text-on-surface placeholder-on-surface-variant/50 transition-all outline-none"
                placeholder="Search by name, branch, or interest..."
                type="text"
              />
            </div>
          </div>

          {/* Scrollable Filter Chips */}
          <div className="flex gap-3 overflow-x-auto hide-scrollbar py-2 -mx-6 px-6 animate-fade-in" style={{ animationDelay: '0.15s' }}>
            <ChipButton active={!filterYear && !filterStatus} onClick={() => { setFilterYear(''); setFilterStatus(''); }}>
              All
            </ChipButton>
            {YEARS.map(y => (
              <ChipButton key={y.value} active={filterYear === y.value} onClick={() => setFilterYear(filterYear === y.value ? '' : y.value)}>
                {y.value}
              </ChipButton>
            ))}
            {HOSTEL_STATUS.map(h => (
              <ChipButton key={h.value} active={filterStatus === h.value} onClick={() => setFilterStatus(filterStatus === h.value ? '' : h.value)}>
                {h.label}
              </ChipButton>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-[3/4] rounded-2xl glass-card animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 h-[65%] bg-surface-container-high/50"></div>
                <div className="absolute bottom-0 h-[35%] w-full p-4 flex flex-col justify-center gap-2">
                  <div className="h-5 w-2/3 bg-surface-container-highest/50 rounded"></div>
                  <div className="h-3 w-1/2 bg-surface-container-highest/50 rounded"></div>
                </div>
              </div>
            ))
          ) : users.length === 0 ? (
            <div className="col-span-full glass-card p-12 rounded-3xl text-center border border-outline-variant/10 shadow-2xl mt-8">
              <span className="material-symbols-outlined text-6xl text-primary/30 mb-4 block">search_off</span>
              <p className="text-xl font-headline font-bold mb-2 text-on-surface">No students found</p>
              <p className="text-sm text-on-surface-variant leading-relaxed max-w-md mx-auto">
                Try adjusting your filters or search query to find more matches.
              </p>
            </div>
          ) : (
            users.map((u, i) => (
              <div key={u.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <UserCard user={u} />
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
