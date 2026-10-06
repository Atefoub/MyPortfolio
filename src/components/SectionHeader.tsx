interface SectionHeaderProps {
  index: string;
  title: string;
  lede?: string;
  className?: string;
}

export default function SectionHeader({ index, title, lede, className = '' }: SectionHeaderProps) {
  return (
    <header className={`section-intro animate-fade-in ${className}`}>
      <p className="section-index">{index}</p>
      <h1 className="section-title">{title}</h1>
      {lede && <p className="section-lede">{lede}</p>}
    </header>
  );
}
