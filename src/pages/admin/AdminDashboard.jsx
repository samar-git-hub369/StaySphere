import { Users, Building2, CheckSquare, TrendingUp, Check, X } from 'lucide-react';

const STATS = [
  { label: 'Total Users', value: '1,245', icon: Users },
  { label: 'Total Hotels', value: '48', icon: Building2 },
  { label: 'Pending Approvals', value: '5', icon: CheckSquare },
  { label: 'Platform Revenue', value: '$45,200', icon: TrendingUp },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-6">Admin Overview</h1>
      
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

      {/* Pending Approvals */}
      <div className="bg-white border border-[var(--color-border-div)] rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[var(--color-border-div)]">
          <h2 className="text-lg font-bold text-[var(--color-primary)]">Pending Hotel Approvals</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--color-section)] text-[var(--color-text-main)] uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Hotel Name</th>
                <th className="px-6 py-3">Lister</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Submitted</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--color-border-div)] hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Boutique City Hotel</td>
                <td className="px-6 py-4">Samar Goyal</td>
                <td className="px-6 py-4">London, UK</td>
                <td className="px-6 py-4">2 hours ago</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-green-600 hover:bg-green-50 p-2 rounded-lg mr-2 transition-colors">
                    <Check className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </td>
              </tr>
              <tr className="border-b border-[var(--color-border-div)] hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Ocean View Villa</td>
                <td className="px-6 py-4">Jane Smith</td>
                <td className="px-6 py-4">Bali, Indonesia</td>
                <td className="px-6 py-4">1 day ago</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-green-600 hover:bg-green-50 p-2 rounded-lg mr-2 transition-colors">
                    <Check className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
