import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function ExtractionTable({ data }) {
  if (!data) return null;

  const statusIcon = (status) => {
    if (status === 'high') return <ArrowUpRight size={14} className="text-danger-400" />;
    if (status === 'low') return <ArrowDownRight size={14} className="text-amber-400" />;
    return <Minus size={14} className="text-success-400" />;
  };

  const statusColor = (status) => {
    if (status === 'high') return 'text-danger-400';
    if (status === 'low') return 'text-amber-400';
    return 'text-success-400';
  };

  return (
    <div className="space-y-4">
      {/* Document info */}
      <div className="flex items-center gap-4 px-1">
        <span className="px-3 py-1 rounded-full bg-primary-600/20 text-primary-400 text-xs font-semibold uppercase tracking-wider">
          {data.type}
        </span>
        {data.date && <span className="text-sm text-white/40">{data.date}</span>}
        {data.doctor && <span className="text-sm text-white/40">{data.doctor}</span>}
        {data.lab && <span className="text-sm text-white/40">{data.lab}</span>}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <table className="extraction-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
              {data.fields[0]?.reference && <th>Reference</th>}
              {data.fields[0]?.status && <th>Status</th>}
            </tr>
          </thead>
          <tbody>
            {data.fields.map((row, i) => (
              <tr key={i}>
                <td className="font-medium text-white/80">{row.field}</td>
                <td className={row.status ? statusColor(row.status) : 'text-white'}>
                  <div className="flex items-center gap-2">
                    {row.status && statusIcon(row.status)}
                    {row.value}
                  </div>
                </td>
                {row.reference !== undefined && (
                  <td className="text-white/40 text-sm">{row.reference}</td>
                )}
                {row.status !== undefined && (
                  <td>
                    <span className={`
                      inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider
                      ${row.status === 'high' ? 'bg-danger-500/15 text-danger-400' :
                        row.status === 'low' ? 'bg-amber-500/15 text-amber-400' :
                        'bg-success-500/15 text-success-400'}
                    `}>
                      {row.status}
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
