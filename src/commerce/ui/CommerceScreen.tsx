"use client";

interface Props {
  onBack: () => void;
}

export function CommerceScreen({ onBack }: Props) {
  return (
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="flex items-center gap-2 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button type="button" onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full bg-white" aria-label="Назад">
          ←
        </button>
        <h1 className="text-[18px] font-semibold text-[var(--sg-ink)]">Магазины и еда</h1>
      </header>
      <div className="flex-1 px-4 py-4">
        <div className="rounded-[var(--sg-radius-lg)] bg-white/90 p-5 ring-1 ring-[var(--sg-border)]">
          <p className="text-[15px] font-semibold text-[var(--sg-ink)]">Справочник без оплаты</p>
          <p className="mt-2 text-[13px] leading-relaxed text-[var(--sg-ink-muted)]">
            Заказ и оплата не подключены (нужна платёжная модель). Точки shop/food смотрите в
            «Места» и на карте.
          </p>
        </div>
      </div>
    </div>
  );
}
