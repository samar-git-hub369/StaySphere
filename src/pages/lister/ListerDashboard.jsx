import { Building2, CalendarCheck, DollarSign, Activity } from 'lucide-react';

const STATS = [
  { label: 'Total Hotels', value: '3', icon: Building2 },
  { label: 'Active Bookings', value: '12', icon: CalendarCheck },
  { label: 'Monthly Revenue', value: '$8,450', icon: DollarSign },
  { label: 'Occupancy Rate', value: '78%', icon: Activity },
];

export default function ListerDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-6">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white border border-[var(--color-border-div)] rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-sec)] mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-[var(--color-text-main)]">{stat.value}</h3>
                </div>
                <div className="bg-[var(--color-section)] p-2 rounded-lg">
                  <Icon className="h-5 w-5 text-[var(--color-primary)]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-[var(--color-border-div)] rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[var(--color-border-div)]">
          <h2 className="text-lg font-bold text-[var(--color-primary)]">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--color-section)] text-[var(--color-text-main)] uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Guest</th>
                <th className="px-6 py-3">Hotel</th>
                <th className="px-6 py-3">Dates</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--color-border-div)] hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">John Doe</td>
                <td className="px-6 py-4">The Grand Azure Resort</td>
                <td className="px-6 py-4">Oct 12 - Oct 15</td>
                <td className="px-6 py-4">$1,350</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Confirmed</span>
                </td>
              </tr>
              <tr className="border-b border-[var(--color-border-div)] hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Jane Smith</td>
                <td className="px-6 py-4">Alpine Peak Chalet</td>
                <td className="px-6 py-4">Oct 18 - Oct 22</td>
                <td className="px-6 py-4">$1,280</td>
                <td className="px-6 py-4">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
