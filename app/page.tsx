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

const EXAMPLE_STATE = `Konu: Ödeme Sorunu

Merhaba,

3 gün önce yıllık abonelik için 1.200 TL ödeme yaptım ama hesabım hala premium'a geçmedi.
Kredi kartımdan para çekildi, banka ekstremde görünüyor ama sisteminizde aktif görünmüyor.

Bu durumu acil çözmeniz gerekiyor çünkü yarın önemli bir sunum için premium özelliklerini
kullanmam gerekiyor. Eğer bugün içinde çözülmezse ödemeyi iptal ettirip başka bir servise
geçeceğim.

Lütfen en kısa sürede dönüş yapın.`;

const DEFAULT_QUESTIONS: Question[] = [
  {
    id: "1",
    field: "kategori",
    type: "choice",
    instructions: "Bu mesaj hangi departmana yönlendirilmeli?",
    options: [
      { value: "satis", criteria: "Yeni satış, demo talebi, fiyat bilgisi" },
      { value: "destek", criteria: "Teknik sorun, kullanım yardımı, hata" },
      { value: "fatura", criteria: "Ödeme, fatura, abonelik, iade işlemleri" },
      { value: "yonetim", criteria: "Şikayet, üst düzey talep, kritik sorunlar" },
    ],
  },
  {
    id: "2",
    field: "oncelik",
    type: "choice",
    instructions: "Bu talebin aciliyet derecesi nedir?",
    options: [
      { value: "dusuk", criteria: "Genel bilgi, rutin sorular" },
      { value: "orta", criteria: "Normal destek talebi, makul bekleme süresi" },
      { value: "yuksek", criteria: "Önemli sorun, hızlı müdahale gerekli" },
      { value: "kritik", criteria: "Acil, iş kaybı riski, SLA ihlaline yakın" },
    ],
  },
  {
    id: "3",
    field: "ton",
    type: "choice",
    instructions: "Müşterinin mesajındaki duygusal ton nedir?",
    options: [
      { value: "notr", criteria: "Sakin, açıklayıcı, duygusuz" },
      { value: "mutlu", criteria: "Memnun, pozitif, teşekkür eden" },
      { value: "endiseli", criteria: "Endişeli, meraklı, sorguluyor" },
      { value: "kizgin", criteria: "Rahatsız, sinirli, şikayet eden" },
    ],
  },
];

export default function HomePage() {
  const [state, setState] = useState("");
  const [questions, setQuestions] = useState<Question[]>(DEFAULT_QUESTIONS);
  const [results, setResults] = useState<DecisionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadExample = () => setState(EXAMPLE_STATE);

  const addQuestion = (type: Question["type"]) => {
    let newQuestion: Question;
    if (type === "boolean") {
      newQuestion = { id: Date.now().toString(), field: `alan_${questions.length + 1}`, type: "boolean", instructions: "" };
    } else if (type === "choice") {
      newQuestion = { id: Date.now().toString(), field: `alan_${questions.length + 1}`, type: "choice", instructions: "", options: [{ value: "a", criteria: "" }, { value: "b", criteria: "" }] };
    } else {
      newQuestion = { id: Date.now().toString(), field: `alan_${questions.length + 1}`, type: "score", instructions: "", levels: [{ value: "dusuk", criteria: "" }, { value: "yuksek", criteria: "" }] };
    }
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => setQuestions(questions.filter((q) => q.id !== id));

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map((q) => {
      if (q.id !== id) return q;
      const updated = { ...q, ...updates };
      if (updated.type === "choice" && "options" in updated) return updated as ChoiceQuestion;
      if (updated.type === "score" && "levels" in updated) return updated as ScoreQuestion;
      if (updated.type === "boolean") return updated as BooleanQuestion;
      return q;
    }));
  };

  const handleSubmit = async () => {
    setError(null);
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <div className="container mx-auto p-4 max-w-[1600px]">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
            Jev Karar Modeli
          </h1>
          <p className="text-slate-600">Yan yana görünüm ile hızlı test</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* SOL PANEL - Input */}
          <div className="space-y-4">
            {/* Durum */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-violet-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></span>
                  Durum
                </h2>
                <button
                  onClick={loadExample}
                  className="px-3 py-1.5 text-xs bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Örnek Yükle
                </button>
              </div>
              <textarea
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Değerlendirilecek durumu buraya yazın..."
                className="w-full h-40 p-3 border-2 border-violet-100 rounded-xl focus:ring-2 focus:ring-violet-400 focus:border-transparent resize-none text-sm bg-white/70"
              />
            </div>

            {/* Sorular */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-violet-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-fuchsia-500 rounded-full"></span>
                  Sorular
                </h2>
                <div className="flex gap-1">
                  <button onClick={() => addQuestion("boolean")} className="px-2 py-1 text-xs bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold">+ Bool</button>
                  <button onClick={() => addQuestion("choice")} className="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold">+ Choice</button>
                  <button onClick={() => addQuestion("score")} className="px-2 py-1 text-xs bg-violet-500 hover:bg-violet-600 text-white rounded-lg font-semibold">+ Score</button>
                </div>
              </div>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scroll">
                {questions.length === 0 ? (
                  <p className="text-slate-400 text-center py-6 text-sm">Soru eklenmedi</p>
                ) : (
                  questions.map((q) => <QuestionCard key={q.id} question={q} onUpdate={(u) => updateQuestion(q.id, u)} onRemove={() => removeQuestion(q.id)} />)
                )}
              </div>
            </div>

            {/* Gönder */}
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                disabled={loading || !state.trim() || questions.length === 0}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-bold hover:shadow-xl disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all"
              >
                {loading ? "⏳ Analiz ediliyor..." : "🚀 Kararları Al"}
              </button>
              {results && (
                <button onClick={() => setResults(null)} className="px-4 py-3 bg-slate-200 hover:bg-slate-300 rounded-xl font-bold">
                  🔄
                </button>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-sm">
                <span className="font-semibold text-red-800">⚠️ {error}</span>
              </div>
            )}
          </div>

          {/* SAĞ PANEL - Results */}
          <div>
            {!results && !error && (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-violet-100 p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-slate-700 mb-2">Hazır mısınız?</h3>
                <p className="text-slate-500">Durum girin ve Jev&apos;in analizini görün</p>
              </div>
            )}

            {results && (
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-violet-100 p-4">
                <h2 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></span>
                  Sonuçlar
                </h2>
                <p className="text-xs text-slate-600 mb-4">Jev&apos;in karar sinyalleri</p>
                <div className="space-y-3">
                  {results.results.map((r) => <ResultCard key={r.field} result={r} />)}
                </div>
                <details className="mt-4 border border-slate-200 rounded-lg overflow-hidden">
                  <summary className="px-3 py-2 cursor-pointer hover:bg-slate-100 text-sm font-semibold">
                    📄 Ham JSON
                  </summary>
                  <pre className="p-3 bg-slate-900 text-green-400 text-xs overflow-x-auto">
                    {JSON.stringify(results.raw, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
}

function QuestionCard({ question, onUpdate, onRemove }: { question: Question; onUpdate: (u: Partial<Question>) => void; onRemove: () => void }) {
  const colors = { boolean: "bg-emerald-100 text-emerald-700", choice: "bg-blue-100 text-blue-700", score: "bg-violet-100 text-violet-700" };
  
  return (
    <div className="border border-slate-200 rounded-lg p-3 bg-white/70 hover:bg-white hover:border-violet-300 transition-all">
      <div className="flex items-start gap-2 mb-2">
        <div className="flex-1 grid grid-cols-2 gap-2">
          <input
            type="text"
            value={question.field}
            onChange={(e) => onUpdate({ field: e.target.value })}
            className="px-2 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-violet-400"
            placeholder="Alan adı"
          />
          <div className={`px-2 py-1 text-xs rounded font-bold text-center ${colors[question.type]}`}>
            {question.type}
          </div>
        </div>
        <button onClick={onRemove} className="text-red-600 hover:text-red-700 font-bold text-lg leading-none">×</button>
      </div>
      <textarea
        value={question.instructions}
        onChange={(e) => onUpdate({ instructions: e.target.value })}
        className="w-full px-2 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-violet-400 resize-none mb-2"
        rows={2}
        placeholder="Instructions"
      />
      {question.type === "choice" && "options" in question && (
        <ChoiceEditor options={question.options} onChange={(options) => onUpdate({ options } as any)} />
      )}
      {question.type === "score" && "levels" in question && (
        <ScoreEditor levels={question.levels} onChange={(levels) => onUpdate({ levels } as any)} />
      )}
    </div>
  );
}

function ChoiceEditor({ options, onChange }: { options: ChoiceOption[]; onChange: (o: ChoiceOption[]) => void }) {
  return (
    <div className="space-y-1">
      {options.map((opt, i) => (
        <div key={i} className="flex gap-1">
          <input
            type="text"
            value={opt.value}
            onChange={(e) => onChange(options.map((o, j) => (j === i ? { ...o, value: e.target.value } : o)))}
            placeholder="Kod"
            className="w-16 px-2 py-1 text-xs border border-slate-300 rounded"
          />
          <input
            type="text"
            value={opt.criteria}
            onChange={(e) => onChange(options.map((o, j) => (j === i ? { ...o, criteria: e.target.value } : o)))}
            placeholder="Açıklama"
            className="flex-1 px-2 py-1 text-xs border border-slate-300 rounded"
          />
          {options.length > 2 && (
            <button onClick={() => onChange(options.filter((_, j) => j !== i))} className="text-red-600 text-sm px-1">×</button>
          )}
        </div>
      ))}
      <button
        onClick={() => onChange([...options, { value: "", criteria: "" }])}
        className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
      >
        + Ekle
      </button>
    </div>
  );
}

function ScoreEditor({ levels, onChange }: { levels: ScoreLevel[]; onChange: (l: ScoreLevel[]) => void }) {
  return (
    <div className="space-y-1">
      {levels.map((lvl, i) => (
        <div key={i} className="flex gap-1">
          <input
            type="text"
            value={lvl.value}
            onChange={(e) => onChange(levels.map((l, j) => (j === i ? { ...l, value: e.target.value } : l)))}
            placeholder="Seviye"
            className="w-16 px-2 py-1 text-xs border border-slate-300 rounded"
          />
          <input
            type="text"
            value={lvl.criteria}
            onChange={(e) => onChange(levels.map((l, j) => (j === i ? { ...l, criteria: e.target.value } : l)))}
            placeholder="Açıklama"
            className="flex-1 px-2 py-1 text-xs border border-slate-300 rounded"
          />
          {levels.length > 2 && (
            <button onClick={() => onChange(levels.filter((_, j) => j !== i))} className="text-red-600 text-sm px-1">×</button>
          )}
        </div>
      ))}
      <button
        onClick={() => onChange([...levels, { value: "", criteria: "" }])}
        className="text-xs text-violet-600 hover:text-violet-700 font-semibold"
      >
        + Ekle
      </button>
    </div>
  );
}

function ResultCard({ result }: { result: DecisionResult }) {
  const gradient = result.type === "boolean" ? "from-emerald-500 to-teal-500" : result.type === "choice" ? "from-blue-500 to-indigo-500" : "from-violet-500 to-purple-500";

  return (
    <div className="border-2 border-slate-200 rounded-xl p-4 bg-white/80 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-slate-900">{result.field}</h3>
          <span className={`inline-block mt-1 px-2 py-0.5 bg-gradient-to-r ${gradient} text-white text-xs font-bold rounded-full`}>
            {result.type}
          </span>
        </div>
        <div className={`text-3xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {result.type === "boolean" ? (result.value ? "✓" : "✗") : result.value}
        </div>
      </div>
      <div className="flex gap-2 text-xs mb-3">
        <div className="flex-1 bg-blue-50 rounded-lg p-2">
          <div className="text-slate-600 mb-0.5">Olasılık</div>
          <div className="font-bold text-blue-700">{(result.probability * 100).toFixed(1)}%</div>
        </div>
        {result.type === "score" && (
          <div className="flex-1 bg-violet-50 rounded-lg p-2">
            <div className="text-slate-600 mb-0.5">Score</div>
            <div className="font-bold text-violet-700">{result.score.toFixed(2)}</div>
          </div>
        )}
      </div>
      {result.type === "choice" && result.distribution && (
        <div className="pt-3 border-t border-slate-200">
          <div className="text-xs font-bold text-slate-700 mb-2">📊 Dağılım</div>
          <div className="space-y-1.5">
            {result.distribution.map((d: { value: string; probability: number }) => (
              <div key={d.value} className="flex items-center gap-2">
                <span className="text-xs w-16 font-medium text-slate-700">{d.value}</span>
                <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${gradient} h-2 rounded-full transition-all`}
                    style={{ width: `${d.probability * 100}%` }}
                  />
                </div>
                <span className="text-xs w-12 text-right font-bold text-slate-700">
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
