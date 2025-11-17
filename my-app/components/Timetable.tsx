'use client';

type Slot = {
  time: string;
  mon?: string; tue?: string; wed?: string; thu?: string; fri?: string; sat?: string;
};

const slots: Slot[] = [
  { time: '09:00–10:00', mon: 'Math (A101)', tue: 'English', wed: 'Physics', thu: 'DSA', fri: 'Free', sat: 'Lab' },
  { time: '10:00–11:00', mon: 'DBMS',        tue: 'Math',    wed: 'English', thu: 'Physics', fri: 'DSA',  sat: 'Lab' },
  { time: '11:15–12:15', mon: 'DSA',         tue: 'DBMS',    wed: 'Math',    thu: 'English', fri: 'Physics', sat: 'Seminar' },
  { time: '12:15–01:00', mon: 'Break',       tue: 'Break',   wed: 'Break',   thu: 'Break',   fri: 'Break',  sat: 'Break' },
  { time: '01:00–02:00', mon: 'OS',          tue: 'OS',      wed: 'DBMS',    thu: 'DBMS',    fri: 'OS',     sat: 'Project' },
];

export default function Timetable() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat'] as const;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Section CSE-3A • Semester 5</h2>
        <button className="px-3 py-2 rounded-xl border text-sm hover:bg-gray-50">
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border">
        <table className="min-w-[720px] w-full border-collapse text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left font-medium">Time</th>
              {days.map(d => (
                <th key={d} className="p-3 text-left font-medium">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((row, i) => (
              <tr key={i} className="border-t">
                <td className="p-3 font-medium">{row.time}</td>
                {days.map(d => (
                  <td key={d} className="p-3">
                    {(row as any)[d.toLowerCase()] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
