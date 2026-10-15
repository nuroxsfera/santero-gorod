"use client";

/** Shared loading / empty / error blocks for Horizon 2 consistency. */

export function LoadingState({ label = "Загрузка…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12" role="status">
      <div className="mb-3 h-8 w-8 animate-pulse rounded-full bg-[#058BED]/25" />
      <p className="text-[14px] text-gray-500">{label}</p>
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
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
        ○
      </div>
      <p className="text-[15px] font-medium text-gray-800">{title}</p>
      {description && (
        <p className="mt-1 max-w-xs text-[13px] text-gray-500">{description}</p>
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
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-400">
        !
      </div>
      <p className="text-[15px] font-medium text-gray-800">{title}</p>
      {description && (
        <p className="mt-1 max-w-xs text-[13px] text-gray-500">{description}</p>
      )}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-full bg-[#058BED] px-4 py-2 text-[13px] font-medium text-white"
        >
          Повторить
        </button>
      )}
    </div>
  );
}
