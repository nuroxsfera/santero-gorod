"use client";

import type { NewsArticle } from "../domain/types";
import { NEWS_CATEGORIES } from "../data/demo";

interface Props {
  article: NewsArticle;
  onBack: () => void;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function NewsArticleScreen({ article, onBack }: Props) {
  const cat = NEWS_CATEGORIES.find((c) => c.id === article.categoryId);

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-2 border-b border-[var(--sg-border)] px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sg-surface)]"
          aria-label="Назад"
        >
          ←
        </button>
        <span className="text-[15px] font-semibold text-[var(--sg-ink)]">Новость</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {article.isDemo ? (
          <div className="mb-3 rounded-[var(--sg-radius-md)] bg-[var(--sg-warning-bg)] px-3 py-2 text-[12px] text-[var(--sg-warning-text)]">
            Демонстрационный материал.
          </div>
        ) : (
          <div className="mb-3 rounded-[var(--sg-radius-md)] bg-[var(--sg-blue-soft)] px-3 py-2 text-[12px] text-[var(--sg-blue-deep)]">
            Live metadata. Полный текст читайте у источника.
          </div>
        )}

        <div className="mb-2 flex flex-wrap gap-2 text-[12px] text-[var(--sg-ink-faint)]">
          {cat && <span className="font-semibold text-[var(--sg-blue)]">{cat.label}</span>}
          <span>{formatDate(article.publishedAt)}</span>
        </div>

        <h1 className="mb-3 text-[22px] font-semibold leading-tight tracking-tight text-[var(--sg-ink)]">
          {article.title}
        </h1>

        <p className="mb-4 text-[14px] leading-relaxed text-[var(--sg-ink-muted)]">
          {article.summary}
        </p>

        <div className="mb-6 whitespace-pre-wrap text-[15px] leading-relaxed text-[var(--sg-ink)]">
          {article.body}
        </div>

        <div className="rounded-[var(--sg-radius-lg)] bg-[var(--sg-surface)] p-4 text-[13px] text-[var(--sg-ink-muted)]">
          <p>
            <span className="font-semibold text-[var(--sg-ink)]">Источник:</span>{" "}
            {article.sourceName}
          </p>
          {article.originalUrl && (
            <a
              href={article.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex rounded-[var(--sg-radius-pill)] bg-[var(--sg-blue)] px-4 py-2 text-[13px] font-semibold text-white"
            >
              Открыть оригинал
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
