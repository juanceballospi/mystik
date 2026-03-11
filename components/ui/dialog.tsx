"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface DialogContextValue {
  open: boolean;
  onClose: () => void;
}

const DialogContext = createContext<DialogContextValue>({
  open: false,
  onClose: () => {},
});

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const dialogContentVariants = cva(
  [
    "relative z-50 flex flex-col w-full bg-star-dust-950",
    "border-2 border-star-dust-700",
    "shadow-2xl shadow-black/60",
    "transition-all duration-300 ease-in-out",
    "animate-in fade-in-0 zoom-in-95",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        full: "max-w-full mx-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Dialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const onClose = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(false);
    } else {
      setInternalOpen(false);
    }
  }, [isControlled, onOpenChange]);

  return (
    <DialogContext.Provider value={{ open, onClose }}>
      {children}
    </DialogContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------

interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

function DialogTrigger({ children, className }: DialogTriggerProps) {
  const context = useContext(DialogContext);
  // We reach into the parent Dialog's open setter via a separate setter context
  // (see DialogRoot pattern). For simplicity, Trigger sets open via a sibling
  // context value provided by DialogRoot below.
  const triggerContext = useContext(DialogTriggerContext);

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={triggerContext.onOpen}
      onKeyDown={(e) => e.key === "Enter" && triggerContext.onOpen()}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </span>
  );
}

// Internal trigger context so Trigger can open the dialog
interface DialogTriggerContextValue {
  onOpen: () => void;
}
const DialogTriggerContext = createContext<DialogTriggerContextValue>({
  onOpen: () => {},
});

// ---------------------------------------------------------------------------
// Root (orchestrates open state and exposes both contexts)
// ---------------------------------------------------------------------------

interface DialogRootProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function DialogRoot({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  children,
}: DialogRootProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? (controlledOpen as boolean) : internalOpen;

  const onOpen = useCallback(() => {
    if (isControlled) onOpenChange?.(true);
    else setInternalOpen(true);
  }, [isControlled, onOpenChange]);

  const onClose = useCallback(() => {
    if (isControlled) onOpenChange?.(false);
    else setInternalOpen(false);
  }, [isControlled, onOpenChange]);

  return (
    <DialogTriggerContext.Provider value={{ onOpen }}>
      <DialogContext.Provider value={{ open, onClose }}>
        {children}
      </DialogContext.Provider>
    </DialogTriggerContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Portal / Overlay
// ---------------------------------------------------------------------------

function DialogPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

// ---------------------------------------------------------------------------
// Overlay
// ---------------------------------------------------------------------------

interface DialogOverlayProps {
  className?: string;
}

function DialogOverlay({ className }: DialogOverlayProps) {
  const { open, onClose } = useContext(DialogContext);
  if (!open) return null;
  return (
    <div
      data-slot="dialog-overlay"
      aria-hidden="true"
      onClick={onClose}
      className={cn(
        "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm",
        "animate-in fade-in-0 duration-200",
        className
      )}
    />
  );
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

interface DialogContentProps extends VariantProps<typeof dialogContentVariants> {
  children: React.ReactNode;
  className?: string;
  /** Close when clicking outside. Default: true */
  closeOnOverlayClick?: boolean;
  /** Show the default X close button. Default: true */
  showCloseButton?: boolean;
  /**
   * When true: renders only the backdrop overlay + a loader.
   * When false (default): renders the full dialog panel.
   */
  loading?: boolean;
  /**
   * Custom content to show over the overlay while loading.
   * Defaults to a spinning arc icon.
   */
  loadingContent?: React.ReactNode;
}

function DialogContent({
  children,
  className,
  size,
  closeOnOverlayClick = true,
  showCloseButton = true,
  loading = false,
  loadingContent,
}: DialogContentProps) {
  const { open, onClose } = useContext(DialogContext);
  const contentRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Focus trap: focus first focusable element on open
  useEffect(() => {
    if (!open || !contentRef.current) return;
    const focusable = contentRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable[0]?.focus();
  }, [open]);

  if (!open) return null;

  // ── Loading state: overlay + loader ───────────────────────────────────────
  if (loading) {
    const defaultSpinner = (
      <svg
        className="animate-spin text-koromiko-300"
        xmlns="http://www.w3.org/2000/svg"
        width={48}
        height={48}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    );

    return (
      <DialogPortal>
        {/* Overlay */}
        <div
          aria-hidden="true"
          className={cn(
            "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm",
            "animate-in fade-in-0 duration-200"
          )}
        />
        {/* Loader */}
        <div
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {loadingContent ?? defaultSpinner}
        </div>
      </DialogPortal>
    );
  }

  // ── Full dialog ────────────────────────────────────────────────────────────
  return (
    <DialogPortal>
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={closeOnOverlayClick ? onClose : undefined}
        className={cn(
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm",
          "animate-in fade-in-0 duration-200"
        )}
      />

      {/* Centering wrapper */}
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => {
          if (closeOnOverlayClick && e.target === e.currentTarget) onClose();
        }}
      >
        <div
          ref={contentRef}
          data-slot="dialog-content"
          className={cn(dialogContentVariants({ size }), className)}
          onClick={(e) => e.stopPropagation()}
        >
          {showCloseButton && (
            <button
              data-slot="dialog-close"
              onClick={onClose}
              aria-label="Close dialog"
              className={cn(
                "absolute top-4 right-4 z-10",
                "text-star-dust-400 hover:text-koromiko-300",
                "transition-colors duration-200 cursor-pointer",
                "focus:outline-none focus-visible:ring-1 focus-visible:ring-koromiko-300"
              )}
            >
              <XIcon size={18} />
            </button>
          )}
          {children}
        </div>
      </div>
    </DialogPortal>
  );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

function DialogHeader({ children, className }: DialogHeaderProps) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col gap-1 px-6 pt-6 pb-4",
        className
      )}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Title
// ---------------------------------------------------------------------------

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

function DialogTitle({ children, className }: DialogTitleProps) {
  return (
    <h2
      data-slot="dialog-title"
      className={cn(
        "text-xl font-bold font-title tracking-wide text-koromiko-300 pr-6",
        className
      )}
    >
      {children}
    </h2>
  );
}

// ---------------------------------------------------------------------------
// Description
// ---------------------------------------------------------------------------

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

function DialogDescription({ children, className }: DialogDescriptionProps) {
  return (
    <p
      data-slot="dialog-description"
      className={cn("text-sm text-star-dust-400 leading-relaxed font-sans", className)}
    >
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Body
// ---------------------------------------------------------------------------

interface DialogBodyProps {
  children: React.ReactNode;
  className?: string;
}

function DialogBody({ children, className }: DialogBodyProps) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("flex-1 overflow-y-auto px-6 py-5 font-sans", className)}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex items-center justify-end gap-3 px-6 py-4 font-sans",
        className
      )}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Close (utility trigger to close from inside content)
// ---------------------------------------------------------------------------

interface DialogCloseProps {
  children: React.ReactNode;
  className?: string;
}

function DialogClose({ children, className }: DialogCloseProps) {
  const { onClose } = useContext(DialogContext);
  return (
    <span
      role="button"
      tabIndex={0}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Enter" && onClose()}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export {
  DialogRoot as Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  dialogContentVariants,
};

export type { DialogRootProps as DialogProps };
