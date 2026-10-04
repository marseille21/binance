 import { useState } from "react";
import {
  X,
  ShieldCheck,
  Upload,
  CheckCircle,
  Lock,
} from "lucide-react";

interface ComplianceModalProps {
  type: "send" | "withdraw";
  onClose: () => void;
}

type Step = "verification" | "amount" | "aml" | "submitted";

function ComplianceModal({ type, onClose }: ComplianceModalProps) {
  const [step, setStep] = useState<Step>("verification");

  const [document, setDocument] = useState<File | null>(null);
  const [amlDocument, setAmlDocument] = useState<File | null>(null);

  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  const isSend = type === "send";

  const handleFirstVerification = () => {
    if (!document) return;

    if (isSend) {
      setStep("amount");
    } else {
      setStep("aml");
    }
  };

  const handleAmountContinue = () => {
    if (!amount || !address) return;

    setStep("aml");
  };

  const handleAmlSubmit = () => {
    if (!amlDocument) return;

    setStep("submitted");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#2b3139] bg-[#181a20] text-white shadow-2xl">

      
        <div className="flex items-center justify-between border-b border-[#2b3139] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0b90b]/10">
              <ShieldCheck className="text-[#f0b90b]" size={21} />
            </div>

            <div>
              <h2 className="font-semibold">
                {step === "aml"
                  ? "AML Compliance Verification"
                  : step === "amount"
                  ? "Send BTC"
                  : "Transfer Compliance Verification"}
              </h2>

              <p className="text-xs text-[#848e9c]">
                {isSend ? "BTC transfer" : "BTC withdrawal"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#848e9c] transition hover:bg-[#2b3139] hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

      
        {step === "verification" && (
          <div className="p-6">

            <div className="rounded-xl border border-[#f0b90b]/30 bg-[#f0b90b]/5 p-4">
              <div className="flex gap-3">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-[#f0b90b]"
                />

                <div>
                  <h3 className="font-medium">
                    Fund Ownership Verification
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#848e9c]">
                    Before this BTC transfer can continue, provide
                    documentation supporting ownership or authorization of
                    the funds and their source.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                Required Verification Document
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#474d57] bg-[#0f1115] px-5 py-8 text-center transition hover:border-[#f0b90b]">
                <Upload size={25} className="text-[#848e9c]" />

                <span className="mt-3 text-sm text-white">
                  {document ? document.name : "Choose a document"}
                </span>

                <span className="mt-1 text-xs text-[#848e9c]">
                  PDF, JPG or PNG
                </span>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) =>
                    setDocument(e.target.files?.[0] ?? null)
                  }
                />
              </label>
            </div>

            <button
              type="button"
              disabled={!document}
              onClick={handleFirstVerification}
              className="mt-6 w-full rounded-lg bg-[#f0b90b] px-5 py-3 font-semibold text-black transition hover:bg-[#f8c62e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        )}

    
        {step === "amount" && (
          <div className="p-6">

            <div className="mb-6 rounded-xl border border-[#2b3139] bg-[#0f1115] p-4">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-[#0ecb81]" />

                <span className="text-sm font-medium">
                  Ownership verification submitted
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-[#848e9c]">
                Continue by entering the BTC transfer details.
              </p>
            </div>

            <h3 className="text-lg font-semibold">
              Send Bitcoin
            </h3>

            <p className="mt-1 text-sm text-[#848e9c]">
              Enter the amount and destination wallet address.
            </p>

            <div className="mt-6">
              <label className="mb-2 block text-sm text-[#b7bdc6]">
                BTC Amount
              </label>

              <div className="flex overflow-hidden rounded-lg border border-[#474d57] bg-[#0f1115] focus-within:border-[#f0b90b]">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00000000"
                  className="w-full bg-transparent px-4 py-3 text-white outline-none"
                />

                <span className="flex items-center px-4 text-sm font-semibold text-[#848e9c]">
                  BTC
                </span>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm text-[#b7bdc6]">
                Destination Wallet Address
              </label>

              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter BTC wallet address"
                className="w-full rounded-lg border border-[#474d57] bg-[#0f1115] px-4 py-3 text-sm text-white outline-none transition focus:border-[#f0b90b]"
              />
            </div>

            <button
              type="button"
              disabled={!amount || !address}
              onClick={handleAmountContinue}
              className="mt-6 w-full rounded-lg bg-[#f0b90b] px-5 py-3 font-semibold text-black transition hover:bg-[#f8c62e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        )}


        {step === "aml" && (
          <div className="p-6">

            <div className="rounded-xl border border-[#f0b90b]/30 bg-[#f0b90b]/5 p-4">
              <div className="flex gap-3">
                <Lock
                  size={20}
                  className="mt-0.5 shrink-0 text-[#f0b90b]"
                />

                <div>
                  <h3 className="font-semibold">
                    AML Compliance Certificate Required
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#848e9c]">
                    An additional compliance review is required before this
                    BTC transfer can proceed.
                  </p>
                </div>
              </div>
            </div>

            {isSend && (
              <div className="mt-5 rounded-xl border border-[#2b3139] bg-[#0f1115] p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#848e9c]">
                    Transfer amount
                  </span>

                  <span className="font-semibold">
                    {amount} BTC
                  </span>
                </div>

                <div className="mt-3 break-all text-xs text-[#848e9c]">
                  Destination: {address}
                </div>
              </div>
            )}

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                AML Compliance Documentation
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#474d57] bg-[#0f1115] px-5 py-8 text-center transition hover:border-[#f0b90b]">
                <Upload size={25} className="text-[#848e9c]" />

                <span className="mt-3 text-sm text-white">
                  {amlDocument
                    ? amlDocument.name
                    : "Upload compliance documentation"}
                </span>

                <span className="mt-1 text-xs text-[#848e9c]">
                  PDF, JPG or PNG
                </span>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) =>
                    setAmlDocument(e.target.files?.[0] ?? null)
                  }
                />
              </label>
            </div>

            <p className="mt-4 text-xs leading-5 text-[#848e9c]">
              Only submit documentation that you are authorized to provide.
              This frontend demo does not validate or issue regulatory
              certificates.
            </p>

            <button
              type="button"
              disabled={!amlDocument}
              onClick={handleAmlSubmit}
              className="mt-6 w-full rounded-lg bg-[#f0b90b] px-5 py-3 font-semibold text-black transition hover:bg-[#f8c62e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit for Review
            </button>
          </div>
        )}

        
        {step === "submitted" && (
          <div className="p-8 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0ecb81]/10">
              <CheckCircle
                size={34}
                className="text-[#0ecb81]"
              />
            </div>

            <h3 className="mt-5 text-xl font-semibold">
              Compliance Review Submitted
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#848e9c]">
              Your documentation has been submitted for review.
              The BTC transfer remains locked while the compliance
              review is pending.
            </p>

            <div className="mt-6 rounded-xl border border-[#2b3139] bg-[#0f1115] p-4">
              <div className="flex items-center justify-center gap-2 text-sm">
                <Lock size={16} className="text-[#f0b90b]" />
                <span className="text-[#f0b90b]">
                  Transfer Locked — Review Pending
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-lg border border-[#474d57] px-5 py-3 font-semibold transition hover:bg-[#2b3139]"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplianceModal;