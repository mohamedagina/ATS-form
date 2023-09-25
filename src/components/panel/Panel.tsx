import './Panel.css';

type PanelProps = {
  title?: string;
  children: React.ReactNode;
};

export const Panel = ({ title, children }: PanelProps) => {
  return (
    <div className="panel">
      {title && <header>{title}</header>}
      {children}
    </div>
  );
};
