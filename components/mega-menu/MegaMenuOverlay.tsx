'use client';

interface MegaMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenuOverlay({ isOpen, onClose }: MegaMenuOverlayProps) {
  return (
    <div
      onClick={onClose}
      aria-hidden="true"
      className={`
        fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px]
        transition-opacity duration-300
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
    />
  );
}
