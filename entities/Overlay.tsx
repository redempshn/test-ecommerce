interface OverlayProps {
  visible: boolean;
  onClick: () => void;
}

const Overlay = ({ visible, onClick }: OverlayProps) => {
  return (
    <div
      onClick={onClick}
      className={`
        fixed inset-0 backdrop-blur-sm bg-black/10
        transition-opacity duration-200 ease-out
        z-40
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    />
  );
};

export default Overlay;
