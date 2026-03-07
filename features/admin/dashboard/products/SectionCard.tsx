interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
}

const SectionCard = ({ title, children, extra }: SectionCardProps) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
      <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
        {title}
      </h2>
      {extra}
    </div>
    <div className="p-6">{children}</div>
  </div>
);

export default SectionCard;
