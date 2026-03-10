export default function TermsContent() {
  const sections = [
    {
      title: "Usage Agreement",
      content: (
        <>
          By accessing and using <strong>weFixPDF</strong>, you agree to use our
          tools only for <strong>lawful purposes</strong>. You are solely responsible
          for the files you upload and process using our services.
        </>
      )
    },
    {
      title: "No Login Required",
      content: (
        <>
          weFixPDF tools are designed for <strong>instant use without login or
            signup</strong>. Users can convert files anonymously without creating
          an account.
        </>
      )
    },
    {
      title: "Service Scope",
      content: (
        <>
          Our services are provided on an <strong>"as is"</strong> and
          <strong> "as available"</strong> basis. While we strive to maintain
          reliable tools, we do not guarantee that conversions will always be
          <strong> error-free, uninterrupted, or available at all times</strong>.
        </>
      )
    },
    {
      title: "Limitation of Liability",
      content: (
        <>
          weFixPDF shall <strong>not be held responsible for any loss of data,
            file corruption, conversion errors, or damages</strong> resulting from
          the use of our tools. Users should always keep backups of important
          documents before processing them.
        </>
      )
    },
    {
      title: "Intellectual Property",
      content: (
        <>
          You retain <strong>full ownership of the files you upload</strong>.
          However, all website elements including <strong>design, branding,
            logos, and code</strong> belong to weFixPDF and may not be copied,
          reproduced, or reused without permission.
        </>
      )
    },
    {
      title: "User Obligations",
      content: (
        <>
          Users must not attempt to <strong>reverse engineer, abuse, or bypass
            security mechanisms</strong> of the platform. Malicious use,
          automated attacks, or misuse of services may result in
          <strong> restricted or blocked access</strong>.
        </>
      )
    },
    {
      title: "Fair Usage Policy",
      content: (
        <>
          weFixPDF tools are offered <strong>free for normal usage</strong>.
          If you plan to use our services for <strong>large-scale automated
            processing</strong>, please contact us regarding API access or
          enterprise solutions.
        </>
      )
    },
    {
      title: "Service Availability",
      content: (
        <>
          We may update, modify, or temporarily suspend parts of the service
          for maintenance, improvements, or security purposes without prior
          notice.
        </>
      )
    },
    {
      title: "Changes to Terms",
      content: (
        <>
          These Terms of Service may be updated occasionally to reflect
          service improvements or legal requirements. Continued use of
          weFixPDF indicates acceptance of the updated terms.
        </>
      )
    }
  ];

  return (
    <div className="space-y-16">

      {/* Header */}
      <section className="text-center max-w-3xl mx-auto">

        <p className="text-sm text-slate-400 mt-2">
          Last Updated: March 2026
        </p>
      </section>

      {/* Sections */}
      <div className="grid md:grid-cols-2 gap-8">
        {sections.map((section) => (
          <div
            key={section.title}
            className="glass dark:glass-dark rounded-[2rem] p-10 border border-slate-200/50 dark:border-white/5"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {section.title}
            </h2>

            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <section className="text-center">
        <p className="text-slate-500 dark:text-slate-400">
          Questions about these terms? Contact us at{" "}
          <a
            href="mailto:hello@wefixpdf.com"
            className="underline font-medium"
          >
            hello@wefixpdf.com
          </a>
        </p>
      </section>
    </div>
  );
}