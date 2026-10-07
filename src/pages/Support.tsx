
import {
  ChevronDown,
  ChevronRight,
  CircleHelp,
  MessageCircle,
  Search,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    question: "How do I buy cryptocurrency?",
    answer:
      "Go to Buy Crypto, select the cryptocurrency you want, enter your amount and follow the confirmation steps.",
  },
  {
    question: "How do I place a trade?",
    answer:
      "Open the Trade page, select your trading pair, choose Buy or Sell, enter the amount and review your order before confirming.",
  },
  {
    question: "Why is my transaction restricted?",
    answer:
      "Some transactions may require additional verification or account checks before they can be completed.",
  },
  {
    question: "How can I secure my account?",
    answer:
      "Enable two-factor authentication, use a strong password and never share your password or verification codes.",
  },
];

export default function Support() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen w-full bg-[#0b0e11] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Support Center
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Find answers or get help with your account and trading activity.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 rounded-xl border border-[#2b2f36] bg-[#15181d] p-4 sm:p-6">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search for help..."
              className="w-full rounded-lg border border-[#2b2f36] bg-[#0b0e11] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#f0b90b]"
            />
          </div>
        </div>

        {/* Support cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#2b2f36] bg-[#15181d] p-5 transition hover:border-[#3b414a]">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2b2f36]">
              <CircleHelp size={20} />
            </div>

            <h2 className="font-medium">Help Center</h2>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Browse guides and answers to common questions.
            </p>

            <button className="mt-4 flex items-center gap-1 text-sm text-[#f0b90b]">
              Browse articles
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="rounded-xl border border-[#2b2f36] bg-[#15181d] p-5 transition hover:border-[#3b414a]">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2b2f36]">
              <MessageCircle size={20} />
            </div>

            <h2 className="font-medium">Live Support</h2>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Talk to our support team about your account.
            </p>

            <button className="mt-4 flex items-center gap-1 text-sm text-[#f0b90b]">
              Start conversation
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="rounded-xl border border-[#2b2f36] bg-[#15181d] p-5 transition hover:border-[#3b414a]">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2b2f36]">
              <ShieldAlert size={20} />
            </div>

            <h2 className="font-medium">Security</h2>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Learn how to protect your account and funds.
            </p>

            <button className="mt-4 flex items-center gap-1 text-sm text-[#f0b90b]">
              Security guide
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* FAQ */}
        <section className="overflow-hidden rounded-xl border border-[#2b2f36] bg-[#15181d]">
          <div className="border-b border-[#2b2f36] px-4 py-4 sm:px-6">
            <h2 className="font-medium">
              Frequently Asked Questions
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Common questions about trading and your account.
            </p>
          </div>

          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={faq.question}
                className="border-b border-[#2b2f36] last:border-b-0"
              >
                <button
                  onClick={() =>
                    setOpenFaq(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left sm:px-6"
                >
                  <span className="text-sm font-medium">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-gray-500 transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 text-sm leading-6 text-gray-500 sm:px-6">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Contact */}
        <div className="mt-6 rounded-xl border border-[#2b2f36] bg-[#15181d] p-5 sm:p-6">
          <h2 className="font-medium">
            Still need help?
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Contact support if you cannot find the answer you're looking for.
          </p>

          <button className="mt-5 rounded-lg bg-[#f0b90b] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#f8c52c]">
            Contact Support
          </button>
        </div>
      </div>
    </main>
  );
}

