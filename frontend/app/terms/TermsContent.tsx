export default function TermsContent() {
  const sections = [
    {
      title: "1. Usage Agreement",
      content: (
        <>
          By accessing and using <strong>weFixPDF</strong>, you agree to use our tools only for{" "}
          <strong>lawful purposes</strong>. You are solely responsible for the files you upload
          and process using our services. Do not upload files that contain illegal content,
          malware, or material that violates the rights of others.
        </>
      ),
    },
    {
      title: "2. No Login Required",
      content: (
        <>
          weFixPDF tools are designed for <strong>instant use without login or signup</strong>.
          Users can convert files anonymously without creating an account. We do not collect
          personal information during tool usage.
        </>
      ),
    },
    {
      title: "3. Service Scope",
      content: (
        <>
          Our services are provided on an <strong>&ldquo;as is&rdquo;</strong> and{" "}
          <strong>&ldquo;as available&rdquo;</strong> basis. While we strive to maintain reliable
          tools, we do not guarantee that conversions will always be{" "}
          <strong>error-free, uninterrupted, or available at all times</strong>. Service may be
          affected by maintenance, updates, or factors beyond our control.
        </>
      ),
    },
    {
      title: "4. Limitation of Liability",
      content: (
        <>
          weFixPDF shall <strong>not be held responsible for any loss of data, file corruption,
          conversion errors, or damages</strong> resulting from the use of our tools. Users should
          always keep backups of important documents before processing them. Our total liability
          to you for any claim shall not exceed zero, as the service is provided free of charge.
        </>
      ),
    },
    {
      title: "5. Intellectual Property",
      content: (
        <>
          You retain <strong>full ownership of the files you upload</strong>. However, all website
          elements including <strong>design, branding, logos, and code</strong> belong to weFixPDF
          and may not be copied, reproduced, or reused without written permission.
        </>
      ),
    },
    {
      title: "6. User Obligations",
      content: (
        <>
          Users must not attempt to <strong>reverse engineer, abuse, or bypass security
          mechanisms</strong> of the platform. You agree not to use automated scripts, bots, or
          tools to bulk-process files without prior written consent. Malicious use or misuse of
          services may result in <strong>restricted or blocked access</strong>.
        </>
      ),
    },
    {
      title: "7. Prohibited Content",
      content: (
        <>
          You agree not to upload files that contain: <strong>illegal material</strong>, content
          that infringes on third-party copyrights or trademarks, malware or harmful code,
          adult or explicit content, or any material that violates applicable laws. We reserve
          the right to terminate access for violations.
        </>
      ),
    },
    {
      title: "8. Fair Usage Policy",
      content: (
        <>
          weFixPDF tools are offered <strong>free for normal personal and business usage</strong>.
          If you plan to use our services for{" "}
          <strong>large-scale automated processing</strong>, please contact us at{" "}
          <a
            href="mailto:hello@wefixpdf.com"
            className="text-brand-primary underline hover:opacity-80 transition-opacity"
          >
            hello@wefixpdf.com
          </a>{" "}
          regarding API access or enterprise solutions.
        </>
      ),
    },
    {
      title: "9. Service Availability",
      content: (
        <>
          We may update, modify, or temporarily suspend parts of the service for maintenance,
          improvements, or security purposes <strong>without prior notice</strong>. We will
          endeavour to minimise disruption but cannot guarantee continuous availability.
        </>
      ),
    },
    {
      title: "10. Advertising",
      content: (
        <>
          weFixPDF is supported by <strong>Google AdSense advertising</strong>. Ads are served
          by Google and subject to Google&apos;s advertising policies. We are not responsible
          for the content of third-party advertisements. Ad personalisation is controlled via
          your cookie consent preferences.
        </>
      ),
    },
    {
      title: "11. Governing Law & Jurisdiction",
      content: (
        <>
          These Terms of Service shall be governed by and construed in accordance with the{" "}
          <strong>laws of India</strong>. Any disputes arising out of or in connection with these
          terms shall be subject to the exclusive jurisdiction of the courts located in India.
          Users in other jurisdictions agree to comply with local laws applicable to their use
          of the service.
        </>
      ),
    },
    {
      title: "12. Dispute Resolution",
      content: (
        <>
          In the event of a dispute, we encourage you to first contact us at{" "}
          <a
            href="mailto:hello@wefixpdf.com"
            className="text-brand-primary underline hover:opacity-80 transition-opacity"
          >
            hello@wefixpdf.com
          </a>{" "}
          to resolve the matter informally. We will make reasonable efforts to resolve any
          concern within <strong>30 days</strong> of receiving your notice.
        </>
      ),
    },
    {
      title: "13. Changes to Terms",
      content: (
        <>
          These Terms of Service may be updated occasionally to reflect service improvements or
          legal requirements. Continued use of weFixPDF after updates indicates{" "}
          <strong>acceptance of the revised terms</strong>. We recommend reviewing this page
          periodically.
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

      <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 p-8 text-center mt-8">
        <h3 className="text-base font-black text-slate-900 dark:text-white mb-2">
          Questions about these terms?
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
          Contact us at{" "}
          <a
            href="mailto:hello@wefixpdf.com"
            className="text-brand-primary underline hover:opacity-80 transition-opacity font-bold"
          >
            hello@wefixpdf.com
          </a>
        </p>
      </div>
    </div>
  );
}
