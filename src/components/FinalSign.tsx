import { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

interface FinalSignProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function FinalSign({ onBack, onSuccess }: FinalSignProps) {
  const [agreed, setAgreed] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (showCodeInput && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [showCodeInput, countdown]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        const nextInput = document.getElementById(`final-code-${index + 1}`);
        nextInput?.focus();
      }

      if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
        setTimeout(() => {
          onSuccess();
        }, 500);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`final-code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleProceed = () => {
    if (agreed) {
      setShowCodeInput(true);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2>Подписание акта</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-md mx-auto">
          {!showCodeInput ? (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-purple-600" />
                </div>
              </div>

              <h2 className="text-center mb-2">Подписание акта приема-передачи</h2>
              <p className="text-center text-gray-600 mb-8">
                Пожалуйста, подтвердите, что вы ознакомились с объектом и готовы принять его
              </p>

              {/* Document Info */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                <h3 className="mb-3">Документ к подписанию</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Документ:</span>
                    <span>Акт сдачи-приемки</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Номер:</span>
                    <span>№123/2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Дата:</span>
                    <span>06.12.2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Объект:</span>
                    <span>Проект &quot;Современный&quot;</span>
                  </div>
                </div>
              </div>

              {/* Agreement */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">
                    Подтверждаю, что объект осмотрен, претензий к качеству выполненных работ и срокам не имею. Принимаю работу в полном объеме.
                  </span>
                </label>
              </div>

              {/* Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="text-blue-900 mb-2">После подписания</h3>
                <ul className="space-y-1 text-blue-700">
                  <li>• Будет сформирован гарантийный сертификат</li>
                  <li>• Все документы будут доступны для скачивания</li>
                  <li>• Начнется период гарантийного обслуживания (5 лет)</li>
                </ul>
              </div>

              <button
                onClick={handleProceed}
                disabled={!agreed}
                className={`w-full py-3 rounded-lg transition-colors ${
                  agreed
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Подписать акт
              </button>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-purple-600" />
                </div>
              </div>

              <h2 className="text-center mb-2">Подтверждение подписи</h2>
              <p className="text-center text-gray-600 mb-8">
                Введите код из SMS для финальной подписи документов
              </p>

              {/* Code Input */}
              <div className="flex gap-2 justify-center mb-6">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`final-code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  />
                ))}
              </div>

              <div className="text-center mb-8">
                <p className="text-gray-500">
                  Отправить код повторно через {countdown} сек
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-700">
                  После ввода кода акт будет подписан, и вы официально станете владельцем дома
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
