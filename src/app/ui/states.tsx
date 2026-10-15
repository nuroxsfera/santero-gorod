"use client";

export function LoadingState({ label = "Загрузка…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16" role="status">
      <div className="mb-4 h-9 w-9 animate-pulse rounded-full bg-[var(--sg-blue-soft)] ring-4 ring-[var(--sg-blue)]/10" />
      <p className="text-[14px] font-medium text-[var(--sg-ink-muted)]">{label}</p>
    </div>
  );
}

export function EmptyState({
  title = "Пока пусто",
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[18px] bg-white text-[22px] shadow-[var(--sg-shadow-sm)] ring-1 ring-[var(--sg-border)]">
        ◌
      </div>
      <p className="text-[16px] font-semibold text-[var(--sg-ink)]">{title}</p>
      {description && (
        <p className="mt-2 max-w-[260px] text-[14px] leading-relaxed text-[var(--sg-ink-muted)]">
          {description}
        </p>
      )}
    </div>
  );
}

export function ErrorState({
  title = "Что-то пошло не так",
  description,
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[18px] bg-red-50 text-[20px] text-red-500 ring-1 ring-red-100">
        !
      </div>
      <p className="text-[16px] font-semibold text-[var(--sg-ink)]">{title}</p>
      {description && (
        <p className="mt-2 max-w-[260px] text-[14px] leading-relaxed text-[var(--sg-ink-muted)]">
          {description}
        </p>
      )}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-[var(--sg-radius-pill)] bg-[var(--sg-blue)] px-5 py-2.5 text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(5,139,237,0.3)]"
        >
          Повторить
        </button>
      )}
    </div>
  );
}
