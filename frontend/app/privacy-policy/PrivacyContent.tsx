export default function PrivacyContent() {
  const sections = [
    {
      title: "No Login or Signup Required",
      content: (
        <>
          weFixPDF is designed for <strong>simple and anonymous usage</strong>. You do not need to
          <strong> create an account, sign up, or provide personal information</strong> to use our tools.
          All file conversions can be performed instantly without registration.
        </>
      )
    },
    {
      title: "File Processing & Automatic Deletion",
      content: (
        <>
          Uploaded files are <strong>temporarily processed on secure servers</strong> only for the time
          required to complete the conversion. After processing is finished, files are
          <strong> automatically and permanently deleted</strong> from our systems.
        </>
      )
    },
    {
      title: "No Permanent File Storage",
      content: (
        <>
          weFixPDF <strong>does not permanently store uploaded files</strong>. Files exist only during
          processing and are <strong>automatically removed shortly after the operation completes</strong>.
        </>
      )
    },
    {
      title: "Minimal Technical Data",
      content: (
        <>
          Our servers may automatically collect <strong>limited technical information</strong> such as
          IP address, browser type, and device type. This data is used only for
          <strong> security, troubleshooting, and service reliability</strong>.
        </>
      )
    },
    {
      title: "Security & Encryption",
      content: (
        <>
          All file transfers are protected using <strong>SSL/TLS encryption</strong>. This ensures that
          files uploaded, processed, and downloaded remain
          <strong> secure during transmission</strong>.
        </>
      )
    },
    {
      title: "Cookies and Advertising",
      content: (
        <>
          weFixPDF use cookies to improve your experience. <strong>Third-party vendors, including Google</strong>, use cookies to serve ads based on your prior visits to our website or other websites.
          Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to weFixPDF and/or other sites on the Internet.
          <br /><br />
          You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-primary transition-colors">Ads Settings</a>.
          Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-primary transition-colors">www.aboutads.info</a>.
        </>
      )
    },
    {
      title: "Third-Party Infrastructure",
      content: (
        <>
          weFixPDF may rely on trusted third-party infrastructure providers for
          <strong> hosting, security, and performance optimization</strong>. These services process
          only the technical data required to operate the platform.
        </>
      )
    },
    {
      title: "Policy Updates",
      content: (
        <>
          This Privacy Policy may be updated occasionally to reflect
          <strong> service improvements or legal requirements</strong>. Updates will be posted on this
          page with a revised date.
        </>
      )
    }
  ];

  return (
    <div className="space-y-16 animate-fade-in">

      {/* Header */}
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Last Updated: March 2026
        </p>
      </section>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {sections.map((section) => (
          <div
            key={section.title}
            className="glass dark:glass-dark rounded-[2.5rem] p-10 border border-slate-200/50 dark:border-white/5 space-y-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {section.title}
            </h2>

            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      {/* Privacy Commitment */}
      <section className="glass dark:glass-dark rounded-[3rem] p-12 text-center border border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          Questions about your privacy?
        </h3>

        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto font-medium">
          If you have any concerns about how we handle data, please contact us at{" "}
          <a
            href="mailto:hello@wefixpdf.com"
            className="text-slate-900 dark:text-white underline decoration-slate-300 dark:decoration-white/20 hover:decoration-slate-900 dark:hover:decoration-white transition-colors"
          >
            hello@wefixpdf.com
          </a>.
        </p>

        <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
          weFixPDF is committed to <strong>secure, private, and anonymous file processing</strong>.
        </p>
      </section>

    </div>
  );
}