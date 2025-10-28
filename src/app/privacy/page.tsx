import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | I LOVE MY BIKE",
  description:
    "Learn how I LOVE MY BIKE collects and uses your personal data, including name, surname and email for checkout. Payments are processed securely by Stripe.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-[calc(100vh-106px)] w-full bg-white text-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: 28 October 2025</p>

        <p className="mt-6 leading-relaxed">
          I LOVE MY BIKE ("we", "us") respects your privacy. This policy explains what personal
          data we collect when you use our website and checkout, how we use it, and the rights you
          have under applicable law (including the GDPR).
        </p>

        <h2 className="mt-10 text-xl font-semibold">1. Who is responsible for your data?</h2>
        <p className="mt-2 leading-relaxed">
          I LOVE MY BIKE is the controller of your personal data for the purposes described in this
          policy. If you have questions or requests, please contact us via the
          <Link href="/contact" className="text-emerald-700 underline ml-1">Contact</Link> page.
        </p>

        <h2 className="mt-8 text-xl font-semibold">2. What data do we collect?</h2>
        <p className="mt-2 leading-relaxed">When you place an order, we collect only what we need to process it:</p>
        <ul className="mt-2 list-disc pl-6 space-y-1">
          <li>Name and surname</li>
          <li>Email address</li>
          <li>Order details (products, totals, timestamps)</li>
        </ul>
        <p className="mt-2 leading-relaxed">
          We do not collect or store your full payment card details. Payments are processed securely
          by our provider, Stripe.
        </p>

        <h2 className="mt-8 text-xl font-semibold">3. Payments handled by Stripe</h2>
        <p className="mt-2 leading-relaxed">
          We use Stripe to process payments. When you pay, certain data required for the transaction
          is sent directly to Stripe. We do not have access to your full card number, CVV, or bank
          credentials. For details, see the
          <a
            href="https://stripe.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-emerald-700 underline"
          >
            Stripe Privacy Policy
          </a>
          .
        </p>

        <h2 className="mt-8 text-xl font-semibold">4. Why we use your data (legal bases)</h2>
        <ul className="mt-2 list-disc pl-6 space-y-1 leading-relaxed">
          <li>
            To process and fulfill your orders and provide customer support (performance of a
            contract).
          </li>
          <li>To prevent fraud and ensure the security of our services (legitimate interests).</li>
          <li>
            To send optional updates or marketing if you explicitly opt in (consent, which you can
            withdraw at any time).
          </li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">5. Sharing your data</h2>
        <p className="mt-2 leading-relaxed">
          We share data only with service providers that help us run our business, such as Stripe for
          payments. These providers act as processors or independent controllers as applicable and
          must protect your data according to the law and our agreements. We do not sell your
          personal data.
        </p>

        <h2 className="mt-8 text-xl font-semibold">6. Cookies and local storage</h2>
        <p className="mt-2 leading-relaxed">
          We may use essential cookies or local storage to remember items in your cart and maintain
          site functionality. We do not use these technologies to store your payment card details.
        </p>

        <h2 className="mt-8 text-xl font-semibold">7. Data retention</h2>
        <p className="mt-2 leading-relaxed">
          We keep your order information only as long as necessary to fulfill your purchase, provide
          support, and meet legal or accounting obligations. After that, we securely delete or
          anonymize it.
        </p>

        <h2 className="mt-8 text-xl font-semibold">8. Your rights</h2>
        <p className="mt-2 leading-relaxed">
          Depending on your location (including the EU/EEA), you may have rights to access, correct,
          delete, restrict or object to processing of your personal data, and to data portability.
          You can exercise these rights by contacting us via the
          <Link href="/contact" className="text-emerald-700 underline ml-1">Contact</Link> page. You
          also have the right to lodge a complaint with your local data protection authority.
        </p>

        <h2 className="mt-8 text-xl font-semibold">9. International transfers</h2>
        <p className="mt-2 leading-relaxed">
          Our service providers (such as Stripe) may process data outside your country. When that
          happens, we and our providers use appropriate safeguards required by law (for example,
          Standard Contractual Clauses) to protect your information.
        </p>

        <h2 className="mt-8 text-xl font-semibold">10. Changes to this policy</h2>
        <p className="mt-2 leading-relaxed">
          We may update this policy from time to time. We will post any changes on this page and
          update the “Last updated” date above.
        </p>

        <div className="mt-10 border-t pt-6 text-sm text-slate-600">
          If you have questions about this policy or how we handle your data, please reach us via the
          <Link href="/contact" className="text-emerald-700 underline ml-1">Contact</Link> page.
        </div>
      </div>
    </div>
  );
}

