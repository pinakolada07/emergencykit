import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  Zap,
  Users
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  AreaChart, 
  Area 
} from 'recharts';
import { useEmergency } from '../../context/EmergencyContext';

export const AnalyticsDashboard: React.FC = () => {
  const { profile, incidents, contacts } = useEmergency();

  // Mock Analytics Data
  const incidentTypeData = [
    { name: 'Road Accidents', value: 42, color: '#FF3B30' },
    { name: 'Medical Distress', value: 28, color: '#00F0FF' },
    { name: 'Fire / Thermal', value: 15, color: '#F59E0B' },
    { name: 'Stranded / Lost', value: 15, color: '#8B5CF6' },
  ];

  const monthlyData = [
    { month: 'Apr', count: 2, avgResponseMin: 4.8 },
    { month: 'May', count: 1, avgResponseMin: 4.2 },
    { month: 'Jun', count: 3, avgResponseMin: 3.9 },
    { month: 'Jul', count: 4, avgResponseMin: 3.5 },
    { month: 'Aug', count: 2, avgResponseMin: 3.1 },
    { month: 'Sep', count: 1, avgResponseMin: 2.8 },
  ];

  const responseTimelineData = [
    { stage: 'Detection', seconds: 12 },
    { stage: 'GPS Lock', seconds: 8 },
    { stage: 'AI Triage', seconds: 14 },
    { stage: 'Contact Alert', seconds: 22 },
    { stage: 'Unit En Route', seconds: 160 },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-6xl mx-auto animate-fadeIn pb-24 lg:pb-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-surface-100/80 border border-white/10 shadow-glass-panel">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-cyan/15 text-cyan border border-cyan/30 shadow-glow-cyan-sm">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-white uppercase tracking-wide">
              Emergency Analytics & Readiness
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Performance telemetry, response velocities, and preparedness audit metrics.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
            ● 99.8% Reliability Index
          </span>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400">
            <span>Readiness Score</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-display font-black text-white">
            {profile.emergencyReadiness.score}%
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">
            Tier-1 Mission Ready
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400">
            <span>Avg Response Speed</span>
            <Clock className="w-4 h-4 text-cyan" />
          </div>
          <div className="text-3xl font-display font-black text-cyan">
            2.8 min
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            -42s faster than city avg
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400">
            <span>Trusted Contacts</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-display font-black text-white">
            {contacts.length} / 4
          </div>
          <div className="text-[11px] text-purple-400 font-mono">
            100% Connectivity Mesh
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400">
            <span>Resolution Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-display font-black text-emerald-400">
            100%
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Zero Unresolved Incidents
          </div>
        </div>
      </div>

      {/* 2-Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incident Types Donut Chart */}
        <div className="p-6 rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 shadow-glass-panel space-y-4">
          <div>
            <h3 className="text-base font-display font-bold text-white uppercase tracking-wide">
              Historical Incident Distribution
            </h3>
            <p className="text-xs text-slate-400">Breakdown of reported telemetry crises by category</p>
          </div>

          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidentTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {incidentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B101B',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                    fontFamily: 'Inter',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
            {incidentTypeData.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 truncate">{item.name}</span>
                <span className="font-mono text-slate-500 ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Response Velocity Trends Area Chart */}
        <div className="p-6 rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 shadow-glass-panel space-y-4">
          <div>
            <h3 className="text-base font-display font-bold text-white uppercase tracking-wide">
              Dispatch Velocity Progression
            </h3>
            <p className="text-xs text-slate-400">Average minutes to first responder coordination over time</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00F0FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit="m" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B101B',
                    borderColor: 'rgba(0,240,255,0.3)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="avgResponseMin"
                  stroke="#00F0FF"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#velocityGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-white/5">
            <span>Peak optimization achieved</span>
            <span className="text-cyan font-bold">2.8 mins (Sep)</span>
          </div>
        </div>
      </div>

      {/* Monthly Incident Frequency Bar Chart */}
      <div className="p-6 rounded-3xl bg-[#0B101B]/90 backdrop-blur-xl border border-white/10 shadow-glass-panel space-y-4">
        <h3 className="text-base font-display font-bold text-white uppercase tracking-wide">
          Monthly Incident Volumes & Drills
        </h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0B101B',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="count" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
