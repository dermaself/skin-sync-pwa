interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionHeader = ({ children, className }: SectionHeaderProps) => {
  return (
    <div className={`section-header ${className || ''}`}>
      <h2 className="text-xl font-semibold text-center">{children}</h2>
    </div>
  );
};