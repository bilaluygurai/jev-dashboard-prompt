"use client";

import { useState } from "react";
import type {
  Question,
  BooleanQuestion,
  ChoiceQuestion,
  ScoreQuestion,
  DecisionResponse,
  ChoiceOption,
  ScoreLevel,
  DecisionResult,
} from "@/lib/types";
import { makeDecision } from "@/lib/decide-action";

const EXAMPLE_STATE = `Konu: Abonelik İptali ve İade Talebi

Merhaba,

Geçen hafta premium planınıza geçtim ama beklediğim özellikleri bulamadım.
Henüz sadece 3 gün kullandım ve hiçbir proje oluşturmadım.

Aboneliğimi iptal edip param geri iade edilebilir mi? Yoksa bir sonraki
fatura dönemine kadar beklemem mi gerekiyor?

Teşekkürler`;

const DEFAULT_QUESTIONS: Question[] = [
  {
    id: "1",
    field: "acil_mi",
    type: "boolean",
    instructions: "Müşteri durumunu acil olarak mı tanımlıyor?",
  },
  {
    id: "2",
    field: "kategori",
    type: "choice",
    instructions: "Bu mesaj hangi departmana yönlendirilmeli?",
    options: [
      { value: "satis", criteria: "Yeni satış, demo talebi veya ürün bilgisi" },
      { value: "destek", criteria: "Teknik sorun veya kullanım yardımı" },
      { value: "fatura", criteria: "Ödeme, fatura veya abonelik işlemleri" },
    ],
  },
  {
    id: "3",
    field: "memnuniyet",
    type: "score",
    instructions: "Müşterinin genel memnuniyet seviyesi nedir?",
    levels: [
      { value: "dusuk", criteria: "Hayal kırıklığı, şikayet veya rahatsızlık" },
      { value: "orta", criteria: "Nötr veya karışık duygular" },
      { value: "yuksek", criteria: "Memnuniyet, övgü veya takdir ifadeleri" },
    ],
  },
];

export default function HomePage() {
  const [state, setState] = useState("");
  const [questions, setQuestions] = useState<Question[]>(DEFAULT_QUESTIONS);
  const [results, setResults] = useState<DecisionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadExample = () => {
    setState(EXAMPLE_STATE);
  };

  const addQuestion = (type: Question["type"]) => {
    let newQuestion: Question;

    if (type === "boolean") {
      newQuestion = {
        id: Date.now().toString(),
        field: `yeni_alan_${questions.length + 1}`,
        type: "boolean",
        instructions: "",
      };
    } else if (type === "choice") {
      newQuestion = {
        id: Date.now().toString(),
        field: `yeni_alan_${questions.length + 1}`,
        type: "choice",
        instructions: "",
        options: [
          { value: "secenek1", criteria: "" },
          { value: "secenek2", criteria: "" },
        ],
      };
    } else {
      newQuestion = {
        id: Date.now().toString(),
        field: `yeni_alan_${questions.length + 1}`,
        type: "score",
        instructions: "",
        levels: [
          { value: "dusuk", criteria: "" },
          { value: "yuksek", criteria: "" },
        ],
      };
    }

    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(
      questions.map((q) => {
        if (q.id !== id) return q;

        const updated = { ...q, ...updates };

        // Tip güvenliği için kontrol
        if (updated.type === "choice" && "options" in updated) {
          return updated as ChoiceQuestion;
        } else if (updated.type === "score" && "levels" in updated) {
          return updated as ScoreQuestion;
        } else if (updated.type === "boolean") {
          return updated as BooleanQuestion;
        }

        return q;
      })
    );
  };

  const handleSubmit = async () => {
    setError(null);
    setResults(null);
    setLoading(true);

    try {
      const response = await makeDecision({ state, questions });
      setResults(response);
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Jev Karar Modeli
          </h1>
          <p className="text-gray-600">
            Bir durum girin ve Jev&apos;in tipli karar sonuçlarını görün
          </p>
        </header>

        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Durum</h2>
            <button
              onClick={loadExample}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Örnek yükle
            </button>
          </div>
          <textarea
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Değerlendirilecek durumu buraya yazın..."
            className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </section>

        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Karar Soruları
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => addQuestion("boolean")}
                className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md font-medium"
              >
                + Boolean
              </button>
              <button
                onClick={() => addQuestion("choice")}
                className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md font-medium"
              >
                + Choice
              </button>
              <button
                onClick={() => addQuestion("score")}
                className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md font-medium"
              >
                + Score
              </button>
            </div>
          </div>

          {questions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Henüz soru eklenmedi
            </p>
          ) : (
            <div className="space-y-4">
              {questions.map((q) => (
                <QuestionEditor
                  key={q.id}
                  question={q}
                  onUpdate={(updates) => updateQuestion(q.id, updates)}
                  onRemove={() => removeQuestion(q.id)}
                />
              ))}
            </div>
          )}
        </section>

        <div className="flex justify-center mb-6">
          <button
            onClick={handleSubmit}
            disabled={loading || !state.trim() || questions.length === 0}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Değerlendiriliyor..." : "Kararları Al"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {results && (
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Sonuçlar
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Bunlar Jev&apos;in değerlendirdiği karar sinyalleridir. Kesin doğru
              olarak değil, uygulamanızın kullanacağı olasılıklı tahminler
              olarak değerlendirin.
            </p>

            <div className="space-y-4 mb-6">
              {results.results.map((result) => (
                <ResultCard key={result.field} result={result} />
              ))}
            </div>

            <details className="border border-gray-200 rounded-lg">
              <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50 font-medium">
                Ham JSON çıktısı
              </summary>
              <pre className="p-4 bg-gray-50 overflow-x-auto text-xs">
                {JSON.stringify(results.raw, null, 2)}
              </pre>
            </details>
          </section>
        )}
      </div>
    </div>
  );
}

function QuestionEditor({
  question,
  onUpdate,
  onRemove,
}: {
  question: Question;
  onUpdate: (updates: Partial<Question>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alan adı
            </label>
            <input
              type="text"
              value={question.field}
              onChange={(e) => onUpdate({ field: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ornek_alan"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tür
            </label>
            <div className="px-3 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-700">
              {question.type}
            </div>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="ml-3 text-red-600 hover:text-red-700 text-sm font-medium"
        >
          Sil
        </button>
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Instructions
        </label>
        <textarea
          value={question.instructions}
          onChange={(e) => onUpdate({ instructions: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={2}
          placeholder="Bu alan için karar sorusunu yazın"
        />
      </div>

      {question.type === "choice" && "options" in question && (
        <ChoiceEditor
          options={question.options}
          onChange={(options) => onUpdate({ options } as any)}
        />
      )}

      {question.type === "score" && "levels" in question && (
        <ScoreEditor
          levels={question.levels}
          onChange={(levels) => onUpdate({ levels } as any)}
        />
      )}
    </div>
  );
}

function ChoiceEditor({
  options,
  onChange,
}: {
  options: ChoiceOption[];
  onChange: (options: ChoiceOption[]) => void;
}) {
  const addOption = () => {
    onChange([...options, { value: "", criteria: "" }]);
  };

  const removeOption = (index: number) => {
    onChange(options.filter((_, i) => i !== index));
  };

  const updateOption = (index: number, updates: Partial<ChoiceOption>) => {
    onChange(
      options.map((opt, i) => (i === index ? { ...opt, ...updates } : opt))
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Seçenekler
        </label>
        <button
          onClick={addOption}
          className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          + Ekle
        </button>
      </div>
      <div className="space-y-2">
        {options.map((opt, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={opt.value}
              onChange={(e) => updateOption(index, { value: e.target.value })}
              placeholder="Kod"
              className="w-32 px-2 py-1.5 border border-gray-300 rounded text-sm"
            />
            <input
              type="text"
              value={opt.criteria}
              onChange={(e) =>
                updateOption(index, { criteria: e.target.value })
              }
              placeholder="Ölçüt açıklaması"
              className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm"
            />
            {options.length > 2 && (
              <button
                onClick={() => removeOption(index)}
                className="text-red-600 text-sm px-2"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreEditor({
  levels,
  onChange,
}: {
  levels: ScoreLevel[];
  onChange: (levels: ScoreLevel[]) => void;
}) {
  const addLevel = () => {
    onChange([...levels, { value: "", criteria: "" }]);
  };

  const removeLevel = (index: number) => {
    onChange(levels.filter((_, i) => i !== index));
  };

  const updateLevel = (index: number, updates: Partial<ScoreLevel>) => {
    onChange(
      levels.map((lvl, i) => (i === index ? { ...lvl, ...updates } : lvl))
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Seviyeler
        </label>
        <button
          onClick={addLevel}
          className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          + Ekle
        </button>
      </div>
      <div className="space-y-2">
        {levels.map((lvl, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={lvl.value}
              onChange={(e) => updateLevel(index, { value: e.target.value })}
              placeholder="Seviye"
              className="w-32 px-2 py-1.5 border border-gray-300 rounded text-sm"
            />
            <input
              type="text"
              value={lvl.criteria}
              onChange={(e) => updateLevel(index, { criteria: e.target.value })}
              placeholder="Ölçüt açıklaması"
              className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm"
            />
            {levels.length > 2 && (
              <button
                onClick={() => removeLevel(index)}
                className="text-red-600 text-sm px-2"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultCard({ result }: { result: DecisionResult }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{result.field}</h3>
          <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
            {result.type}
          </span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {result.type === "boolean"
              ? result.value
                ? "Evet"
                : "Hayır"
              : result.value}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-600">Olasılık:</span>
          <span className="ml-2 font-medium">
            {(result.probability * 100).toFixed(1)}%
          </span>
        </div>
        {result.type === "score" && (
          <div>
            <span className="text-gray-600">Score:</span>
            <span className="ml-2 font-medium">
              {result.score.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {result.type === "choice" && result.distribution && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-700 mb-2">Dağılım:</p>
          <div className="space-y-1">
            {result.distribution.map((d: { value: string; probability: number }) => (
              <div key={d.value} className="flex items-center gap-2">
                <span className="text-xs w-20">{d.value}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${d.probability * 100}%` }}
                  />
                </div>
                <span className="text-xs w-12 text-right">
                  {(d.probability * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

