 import {
ChevronDown,
ChevronRight,
CircleHelp,
MessageCircle,
Search,
ShieldAlert,
Mail,
Headphones,
ExternalLink,
} from "lucide-react";
import { useState } from "react";

const SUPPORT_EMAIL = "[consultantchamber1@outlook.com](mailto:consultantchamber1@outlook.com)";

const FAQS = [
{
question: "How do I buy cryptocurrency?",
answer:
"Open the Buy Crypto page, select the cryptocurrency you want, enter the amount, review the details, and follow the confirmation steps.",
},
{
question: "How do I place a trade?",
answer:
"Open the Trade page, select your trading pair, choose Buy or Sell, enter your amount, review your order, and follow the instructions on the screen.",
},
{
question: "Why is my transaction restricted?",
answer:
"A transaction may require additional verification or an account review. Contact support for assistance. Never share your password or verification codes.",
},
{
question: "How can I secure my account?",
answer:
"Use a strong, unique password, enable two-factor authentication when available, and never share your password or verification codes with anyone.",
},
{
question: "Where can I view my wallet balance?",
answer:
"Open the Wallet page to review the cryptocurrency balances and portfolio information available in your account.",
},
{
question: "How can I check my transaction history?",
answer:
"Open the relevant wallet or transaction section of the app to review the transaction information available.",
},
{
question: "How do I change my profile information?",
answer:
"Open your Profile or Settings page and review the available account information and preferences.",
},
{
question: "What should I do if I cannot log in?",
answer:
"Check your login details and try again. If the problem continues, contact support and explain the issue without sharing your password.",
},
];

export default function Support() {
const [openFaq, setOpenFaq] = useState<number | null>(null);
const [searchQuery, setSearchQuery] = useState("");

const outlookComposeUrl = (subject = "Customer Support Request") => {
const body =
"Hello Support Team,\n\n" +
"I need assistance with my account.\n\n" +
"My issue is:\n\n\n" +
"Thank you.";


return (
  "https://outlook.live.com/mail/0/deeplink/compose" +
  `?to=${encodeURIComponent(SUPPORT_EMAIL)}` +
  `&subject=${encodeURIComponent(subject)}` +
  `&body=${encodeURIComponent(body)}`
);


};

const contactSupport = () => {
window.location.assign(outlookComposeUrl());
};

const filteredFaqs = FAQS.filter(
(faq) =>
faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
);

const scrollToFaq = () => {
document.getElementById("faq-section")?.scrollIntoView({
behavior: "smooth",
block: "start",
});
};

const showSecurityFaq = () => {
setSearchQuery("secure my account");
document.getElementById("faq-section")?.scrollIntoView({
behavior: "smooth",
block: "start",
});
};

return ( <main className="min-h-screen w-full overflow-x-hidden bg-[#0b0e11] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8"> <div className="mx-auto max-w-5xl"> <header className="mb-8"> <div className="mb-3 flex items-center gap-3"> <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0b90b]/10"> <Headphones className="text-[#f0b90b]" size={25} /> </div>

```
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Support Center
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            How can we help you today?
          </p>
        </div>
      </div>

      <p className="max-w-2xl text-sm leading-6 text-gray-400">
        Find answers to common questions or contact our support team for
        assistance with your account, wallet, and trading activity.
      </p>
    </header>

    <section className="mb-8 rounded-xl border border-[#2b2f36] bg-[#15181d] p-4 sm:p-6">
      <h2 className="mb-4 text-lg font-semibold">
        Search for help
      </h2>

      <div className="relative">
        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setOpenFaq(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              scrollToFaq();
            }
          }}
          placeholder="Search for help..."
          aria-label="Search frequently asked questions"
          className="w-full rounded-lg border border-[#2b2f36] bg-[#0b0e11] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#f0b90b]"
        />
      </div>
    </section>

    <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <button
        type="button"
        onClick={scrollToFaq}
        className="group flex min-h-40 flex-col items-start rounded-xl border border-[#2b2f36] bg-[#15181d] p-5 text-left transition hover:border-[#f0b90b]/60 hover:bg-[#1b1e23]"
      >
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#f0b90b]/10 text-[#f0b90b]">
          <CircleHelp size={23} />
        </div>

        <h2 className="font-semibold">Help Center</h2>

        <p className="mt-2 text-sm leading-5 text-gray-400">
          Browse answers to frequently asked questions.
        </p>

        <span className="mt-4 flex items-center gap-2 text-sm text-[#f0b90b]">
          Find answers
          <ChevronRight
            size={16}
            className="transition group-hover:translate-x-1"
          />
        </span>
      </button>

      <button
        type="button"
        onClick={contactSupport}
        className="group flex min-h-40 flex-col items-start rounded-xl border border-[#2b2f36] bg-[#15181d] p-5 text-left transition hover:border-[#f0b90b]/60 hover:bg-[#1b1e23]"
      >
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#0ecb81]/10 text-[#0ecb81]">
          <MessageCircle size={23} />
        </div>

        <h2 className="font-semibold">Contact Support</h2>

        <p className="mt-2 text-sm leading-5 text-gray-400">
          Open a new Outlook message addressed to our support email.
        </p>

        <span className="mt-4 flex items-center gap-2 text-sm text-[#f0b90b]">
          Send a message
          <ExternalLink size={15} />
        </span>
      </button>

      <button
        type="button"
        onClick={showSecurityFaq}
        className="group flex min-h-40 flex-col items-start rounded-xl border border-[#2b2f36] bg-[#15181d] p-5 text-left transition hover:border-[#f0b90b]/60 hover:bg-[#1b1e23] sm:col-span-2 lg:col-span-1"
      >
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#f6465d]/10 text-[#f6465d]">
          <ShieldAlert size={23} />
        </div>

        <h2 className="font-semibold">Account Security</h2>

        <p className="mt-2 text-sm leading-5 text-gray-400">
          Learn how to protect your account and personal information.
        </p>

        <span className="mt-4 flex items-center gap-2 text-sm text-[#f0b90b]">
          Security help
          <ChevronRight
            size={16}
            className="transition group-hover:translate-x-1"
          />
        </span>
      </button>
    </section>

    <section id="faq-section" className="mb-10 scroll-mt-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">
            Frequently Asked Questions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Find quick answers to common questions.
          </p>
        </div>

        <CircleHelp
          size={25}
          className="shrink-0 text-[#f0b90b]"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-[#2b2f36] bg-[#15181d]">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={faq.question}
                className={
                  index !== filteredFaqs.length - 1
                    ? "border-b border-[#2b2f36]"
                    : ""
                }
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(isOpen ? null : index)
                  }
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left transition hover:bg-[#1b1e23] sm:px-6"
                >
                  <span className="text-sm font-medium sm:text-base">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={19}
                    className={`shrink-0 text-gray-500 transition-transform ${
                      isOpen ? "rotate-180 text-[#f0b90b]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-6">
                    <p className="text-sm leading-6 text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="px-5 py-10 text-center">
            <Search
              size={30}
              className="mx-auto mb-3 text-gray-600"
            />

            <h3 className="font-medium text-gray-300">
              No results found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another keyword or contact our support team.
            </p>

            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-4 text-sm font-medium text-[#f0b90b] hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>

    <section className="rounded-xl border border-[#2b2f36] bg-[#15181d] p-5 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-[#f0b90b]/10 text-[#f0b90b]">
            <Mail size={23} />
          </div>

          <h2 className="text-xl font-semibold">
            Still need help?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            Send our support team a message describing the problem
            you're experiencing.
          </p>

          <a
            href={outlookComposeUrl()}
            className="mt-3 inline-flex items-center gap-2 break-all text-sm text-[#f0b90b] hover:underline"
          >
            {SUPPORT_EMAIL}
            <ExternalLink size={14} className="shrink-0" />
          </a>
        </div>

        <button
          type="button"
          onClick={contactSupport}
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#f0b90b] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d9a509] focus:outline-none focus:ring-2 focus:ring-[#f0b90b] focus:ring-offset-2 focus:ring-offset-[#15181d]"
        >
          <Mail size={18} />
          Contact Support
        </button>
      </div>
    </section>

    <footer className="py-8 text-center text-xs leading-5 text-gray-600">
      <p>Support Center</p>
      <p className="mt-1">
        Never share your password or verification codes with anyone.
      </p>
      <p className="mt-2">
        This is a frontend demo. Support availability and account
        verification are not connected to a live exchange backend.
      </p>
    </footer>
  </div>
</main>


);
}
