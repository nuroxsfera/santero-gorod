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
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100"
          aria-label="Назад"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="text-[15px] font-medium text-gray-900">Новость</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {article.isDemo && (
          <div className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-[12px] text-amber-800">
            Демонстрационный материал. Не является реальной новостью.
          </div>
        )}

        <div className="mb-2 flex flex-wrap gap-2 text-[12px] text-gray-500">
          {cat && <span className="font-medium text-[#058BED]">{cat.label}</span>}
          <span>{formatDate(article.publishedAt)}</span>
        </div>

        <h1 className="mb-3 text-[22px] font-semibold leading-tight text-gray-900">
          {article.title}
        </h1>

        <p className="mb-4 text-[14px] text-gray-600">{article.summary}</p>

        <div className="mb-6 whitespace-pre-wrap text-[15px] leading-relaxed text-gray-800">
          {article.body}
        </div>

        <div className="rounded-2xl bg-gray-50 p-4 text-[13px] text-gray-600">
          <p>
            <span className="font-medium text-gray-900">Источник:</span> {article.sourceName}
          </p>
          {article.geo.localityName && (
            <p className="mt-1">
              <span className="font-medium text-gray-900">Город:</span> {article.geo.localityName}
            </p>
          )}
          {article.geo.regionName && (
            <p className="mt-1">
              <span className="font-medium text-gray-900">Регион:</span> {article.geo.regionName}
            </p>
          )}
          {article.geo.scope === "federal" && (
            <p className="mt-1">
              <span className="font-medium text-gray-900">Уровень:</span> федеральный
            </p>
          )}
          {article.originalUrl && (
            <a
              href={article.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[#058BED]"
            >
              Открыть оригинал
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
