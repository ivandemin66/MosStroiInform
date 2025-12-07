import { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

interface DocumentSignProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function DocumentSign({ onBack, onSuccess }: DocumentSignProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }

      // Auto-submit when all fields are filled
      if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
        setTimeout(() => {
          onSuccess();
        }, 500);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    setCode(['', '', '', '', '', '']);
  };

  const isComplete = code.every(digit => digit !== '');

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2>Подписание документа</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <h2 className="text-center mb-2">Подтверждение подписи</h2>
          <p className="text-center text-gray-600 mb-8">
            Для подписания договора введите код, отправленный на номер{' '}
            <strong>+7 (XXX) XXX-XX-XX</strong>
          </p>

          {/* Code Input */}
          <div className="flex gap-2 justify-center mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              />
            ))}
          </div>

          {/* Resend */}
          <div className="text-center mb-8">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-blue-600 hover:underline"
              >
                Отправить код повторно
              </button>
            ) : (
              <p className="text-gray-500">
                Отправить код повторно через {countdown} сек
              </p>
            )}
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-blue-900 mb-2">Электронная подпись</h3>
            <p className="text-blue-700">
              После ввода кода документ будет подписан простой электронной подписью в соответствии с ФЗ-63 &quot;Об электронной подписи&quot;
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={onSuccess}
            disabled={!isComplete}
            className={`w-full mt-6 py-3 rounded-lg transition-colors ${
              isComplete
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Подписать документ
          </button>
        </div>
      </div>
    </div>
  );
}
