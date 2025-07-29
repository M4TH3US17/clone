'use client'
import { useEffect } from "react";

export function useKeyboardShortcuts(handlers: {
  onSelect?: () => void;
  onNavigateUp?: () => void;
  onNavigateDown?: () => void;
  onNavigateRight?: () => void;
  onNavigateLeft?: () => void;
  onClose?: () => void;
}) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                handlers.onSelect?.();
            } else if (e.key === "ArrowUp") {
                handlers.onNavigateUp?.();
            } else if (e.key === "ArrowDown") {
                handlers.onNavigateDown?.();
            } else if (e.key === "ArrowRight") {
                handlers.onNavigateRight?.();
            } else if (e.key === "ArrowLeft") {
                handlers.onNavigateLeft?.();
            } else if (e.key === "Escape") {
                handlers.onClose?.();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handlers]);
}
