import React, { useState } from 'react';
import { X, Tag, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';
import { DEALS_PROMOS } from '../data/travelData';

interface DealsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDeal: (code: string) => void;
}

export const DealsModal: React.FC<DealsModalProps> = ({
  isOpen,
  onClose,
  onSelectDeal,
}) => {
  if (!isOpen) return null;

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-amber-500 mb-1">
          <Sparkles className="w-5 h-5 fill-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Seasonal Promotions
          </span>
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-2">
          Exclusive Travel Deals
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Copy your preferred discount voucher and apply it directly in your hotel or package reservation.
        </p>

        {/* Deals list */}
        <div className="space-y-3.5">
          {DEALS_PROMOS.map((deal) => {
            const isCopied = copiedCode === deal.code;

            return (
              <div
                key={deal.id}
                className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-teal-400 transition-all flex flex-col justify-between gap-3 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-black uppercase text-[#E76F51] bg-[#E76F51]/10 px-2.5 py-0.5 rounded-full">
                      {deal.discount}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1.5">{deal.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{deal.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold bg-white px-3 py-1 rounded-md border border-slate-200 text-slate-800">
                      {deal.code}
                    </span>
                    <span className="text-[10px] text-slate-400">Valid until {deal.validUntil}</span>
                  </div>

                  <button
                    onClick={() => {
                      handleCopy(deal.code);
                      onSelectDeal(deal.code);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      isCopied
                        ? 'bg-teal-700 text-white'
                        : 'bg-white border border-slate-200 hover:border-teal-600 text-teal-800'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Terms and conditions apply</span>
          <button
            onClick={onClose}
            className="text-teal-800 font-bold hover:underline flex items-center gap-1"
          >
            <span>Back to Explorer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
