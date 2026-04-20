export default function PrivacyContent() {
  const sections = [
    {
      title: "1. No Login or Signup Required",
      content: (
        <>
          weFixPDF is designed for <strong>simple and anonymous usage</strong>. You do not need to
          create an account, sign up, or provide personal information to use our tools.
          All file conversions can be performed instantly without registration.
        </>
      ),
    },
    {
      title: "2. File Processing & Automatic Deletion",
      content: (
        <>
          Uploaded files are <strong>temporarily processed on secure servers</strong> only for the
          time required to complete the conversion. After processing is finished, files are{" "}
          <strong>automatically and permanently deleted</strong> from our systems. We do not
          read, analyse, or retain your files in any form.
        </>
      ),
    },
    {
      title: "3. No Permanent File Storage",
      content: (
        <>
          weFixPDF <strong>does not permanently store uploaded files</strong>. Files exist only
          during processing and are <strong>automatically removed</strong> immediately after the
          operation completes. We have no access to your files after deletion.
        </>
      ),
    },
    {
      title: "4. Minimal Technical Data",
      content: (
        <>
          Our servers may automatically collect <strong>limited technical information</strong> such
          as IP address, browser type, and device type. This data is used only for{" "}
          <strong>security, troubleshooting, and service reliability</strong>. It is not linked to
          any personal identity or shared with third parties for marketing.
        </>
      ),
    },
    {
      title: "5. Security & Encryption",
      content: (
        <>
          All file transfers are protected using <strong>TLS/SSL encryption</strong>. This ensures
          that files uploaded, processed, and downloaded remain{" "}
          <strong>secure during transmission</strong> and cannot be intercepted by third parties.
        </>
      ),
    },
    {
      title: "6. Cookies & Advertising",
      content: (
        <>
          weFixPDF uses cookies to improve your experience.{" "}
          <strong>Third-party vendors, including Google</strong>, use cookies to serve ads based on
          your prior visits to our website or other websites. Google&apos;s use of advertising
          cookies enables it and its partners to serve ads based on your visit to weFixPDF.
          <br />
          <br />
          You may opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary underline hover:opacity-80 transition-opacity"
          >
            Google Ads Settings
          </a>
          . You can also opt out via{" "}
          <a
            href="https://www.aboutads.info"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary underline hover:opacity-80 transition-opacity"
          >
            aboutads.info
          </a>
          .
        </>
      ),
    },
    {
      title: "7. Cookies We Use",
      content: (
        <>
          <strong>Essential cookies</strong> are required for the site to function (e.g. theme
          preference). No consent is needed for these.
          <br />
          <br />
          <strong>Analytics cookies</strong> collect anonymous page-view data via Google Analytics 4
          to help us improve our service. No personal data or file content is shared.

          <br />
          <br />
          <strong>Advertising cookies</strong>: Google AdSense sets cookies to serve relevant ads
          based on your browsing activity. You can opt out of personalised advertising at{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary underline hover:opacity-80 transition-opacity"
          >
            google.com/settings/ads
          </a>{" "}
          or via{" "}
          <a
            href="https://www.aboutads.info"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary underline hover:opacity-80 transition-opacity"
          >
            aboutads.info
          </a>
          . Your consent for these cookies is managed via our Cookie Consent banner, and
          you can change your preferences at any time.

        </>
      ),
    },
    {
      title: "8. Third-Party Infrastructure",
      content: (
        <>
          weFixPDF relies on trusted third-party infrastructure providers for{" "}
          <strong>hosting, CDN, security, and performance optimization</strong> (including
          Cloudflare and cloud server providers). These services process only the technical data
          required to operate the platform and are bound by their own privacy policies.
        </>
      ),
    },
    {
      title: "9. Your Rights Under GDPR",
      content: (
        <>
          If you are located in the EU or EEA, you have the right to:{" "}
          <strong>access your data</strong>, request deletion, restrict processing, data
          portability, and object to processing. Since weFixPDF collects no personal file data,
          these rights apply only to any technical logs (IP address, browser type) retained for
          security purposes.
          <br />
          <br />
          To exercise any of these rights, contact us at{" "}
          <a
            href="mailto:hello@wefixpdf.com"
            className="text-brand-primary underline hover:opacity-80 transition-opacity"
          >
            hello@wefixpdf.com
          </a>
          . We will respond within 30 days.
        </>
      ),
    },
    {
      title: "10. Data Controller",
      content: (
        <>
          weFixPDF is operated by an <strong>independent developer based in India</strong>. For all
          privacy-related inquiries, contact{" "}
          <a
            href="mailto:hello@wefixpdf.com"
            className="text-brand-primary underline hover:opacity-80 transition-opacity"
          >
            hello@wefixpdf.com
          </a>
          . We do not have an EU establishment but{" "}
          <strong>voluntarily comply with GDPR principles</strong> for all users worldwide.
        </>
      ),
    },
    {
      title: "11. Policy Updates",
      content: (
        <>
          This Privacy Policy may be updated occasionally to reflect{" "}
          <strong>service improvements or legal requirements</strong>. Updates will be posted on
          this page with a revised date. Continued use of weFixPDF after changes constitutes
          acceptance of the updated policy.
        </>
      ),
    },
  ];

  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <div key={section.title} className="space-y-3">
          <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
            {section.title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">
            {section.content}
          </p>
          <div className="border-b border-slate-100 dark:border-slate-800" />
        </div>
      ))}

      {/* Contact CTA */}
      <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 p-8 text-center mt-8">
        <h3 className="text-base font-black text-slate-900 dark:text-white mb-2">
          Questions about your privacy?
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
          Contact us at{" "}
          <a
            href="mailto:hello@wefixpdf.com"
            className="text-brand-primary underline hover:opacity-80 transition-opacity font-bold"
          >
            hello@wefixpdf.com
          </a>
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-3">
          weFixPDF is committed to secure, private, and anonymous file processing.
        </p>
      </div>
    </div>
  );
}
