'use client';

import dynamic from 'next/dynamic';

// ─────────────────────────────────────────────────────────────────────────────
// Lazy-load each tool so the bundle is split per-tool page
// ─────────────────────────────────────────────────────────────────────────────

// Existing tools
const CsvJsonConverter      = dynamic(() => import('./CsvJsonConverter'));
const JsonFormatter         = dynamic(() => import('./JsonFormatter'));
const JwtDecoder            = dynamic(() => import('./JwtDecoder'));
const TextDiffChecker       = dynamic(() => import('./TextDiffChecker'));
const ColorPaletteGenerator = dynamic(() => import('./ColorPaletteGenerator'));
const JsonYamlConverter     = dynamic(() => import('./JsonYamlConverter'));
const JsonXmlConverter      = dynamic(() => import('./JsonXmlConverter'));

// New tools — batch 2
const CronExpressionBuilder = dynamic(() => import('./CronExpressionBuilder'));
const ChmodCalculator       = dynamic(() => import('./ChmodCalculator'));
const UnixTimestampConverter= dynamic(() => import('./UnixTimestampConverter'));
const OgMetaTagPreviewer    = dynamic(() => import('./OgMetaTagPreviewer'));
const HashGenerator         = dynamic(() => import('./HashGenerator'));
const HttpHeaderAnalyzer    = dynamic(() => import('./HttpHeaderAnalyzer'));
const SqlFormatterTool      = dynamic(() => import('./SqlFormatterTool'));
const FaviconGenerator      = dynamic(() => import('./FaviconGenerator'));
const NumberBaseConverter   = dynamic(() => import('./NumberBaseConverter'));
const Base64Tool            = dynamic(() => import('./Base64Tool'));
const UrlParserBuilder      = dynamic(() => import('./UrlParserBuilder'));
const RegexTester           = dynamic(() => import('./RegexTester'));
const CssUnitConverter      = dynamic(() => import('./CssUnitConverter'));
const ColorContrastChecker  = dynamic(() => import('./ColorContrastChecker'));
const MockJsonGenerator     = dynamic(() => import('./MockJsonGenerator'));
const EnvFileParser         = dynamic(() => import('./EnvFileParser'));
const MarkdownToHtml        = dynamic(() => import('./MarkdownToHtml'));
const IpSubnetCalculator    = dynamic(() => import('./IpSubnetCalculator'));

// New tools — batch 3 (in-browser computation)
const TextToAsciiArt  = dynamic(() => import('./TextToAsciiArt'));
const WasmAnalyzer    = dynamic(() => import('./WasmAnalyzer'));
const LlmTokenCounter = dynamic(() => import('./LlmTokenCounter'));
const ApiPingTester   = dynamic(() => import('./ApiPingTester'));

// New tools — batch 4 (utility tools)
const UuidGenerator       = dynamic(() => import('./UuidGenerator'));
const PasswordGenerator   = dynamic(() => import('./PasswordGenerator'));
const LoremIpsumGenerator = dynamic(() => import('./LoremIpsumGenerator'));
const WordCounter         = dynamic(() => import('./WordCounter'));

// New tools — batch 5
const XmlFormatter = dynamic(() => import('./XmlFormatter'));
const HtmlFormatter = dynamic(() => import('./HtmlFormatter'));
const XmlValidator = dynamic(() => import('./XmlValidator'));
const JsonValidator = dynamic(() => import('./JsonValidator'));
const HtmlValidator = dynamic(() => import('./HtmlValidator'));
const XpathTester = dynamic(() => import('./XpathTester'));
const CreditCardValidator = dynamic(() => import('./CreditCardValidator'));
const JavaRegexTester = dynamic(() => import('./JavaRegexTester'));
const JsBeautifier = dynamic(() => import('./JsBeautifier'));
const JsMinifier = dynamic(() => import('./JsMinifier'));
const CssBeautifier = dynamic(() => import('./CssBeautifier'));
const CssMinifier = dynamic(() => import('./CssMinifier'));
const XsdGenerator = dynamic(() => import('./XsdGenerator'));
const XsltTransformer = dynamic(() => import('./XsltTransformer'));
const CsvToXml = dynamic(() => import('./CsvToXml'));
const StringUtilities = dynamic(() => import('./StringUtilities'));
const HtmlEscape = dynamic(() => import('./HtmlEscape'));
const XmlEscape = dynamic(() => import('./XmlEscape'));
const JavaDotnetEscape = dynamic(() => import('./JavaDotnetEscape'));
const JavascriptEscape = dynamic(() => import('./JavascriptEscape'));
const JsonEscape = dynamic(() => import('./JsonEscape'));
const CsvEscape = dynamic(() => import('./CsvEscape'));
const SqlEscape = dynamic(() => import('./SqlEscape'));
const MimeTypesList = dynamic(() => import('./MimeTypesList'));
const HtmlEntities = dynamic(() => import('./HtmlEntities'));
const I18nSnippets = dynamic(() => import('./I18nSnippets'));

// Top 3 requested
const AdsenseApprovalChecker = dynamic(() => import('./AdsenseApprovalChecker'));
const ScamWebsiteChecker = dynamic(() => import('./ScamWebsiteChecker'));
const SalaryInHandIndia = dynamic(() => import('./SalaryInHandIndia'));

// Auto-generated mass imports


// Auto-generated mass imports
const YouTubeRpmCalculator = dynamic(() => import('./YouTubeRpmCalculator'));
const FakeJobPostChecker = dynamic(() => import('./FakeJobPostChecker'));
const ResumeAtsScore = dynamic(() => import('./ResumeAtsScore'));
const OfferCompareTool = dynamic(() => import('./OfferCompareTool'));
const KeywordCannibalizationChecker = dynamic(() => import('./KeywordCannibalizationChecker'));
const GstInclusiveExclusive = dynamic(() => import('./GstInclusiveExclusive'));
const UpiQrReceiptGenerator = dynamic(() => import('./UpiQrReceiptGenerator'));
const CodProfitCalculator = dynamic(() => import('./CodProfitCalculator'));
const InternalLinkFinder = dynamic(() => import('./InternalLinkFinder'));
const ThumbnailCtrScore = dynamic(() => import('./ThumbnailCtrScore'));
const SideHustleProfitCalculator = dynamic(() => import('./SideHustleProfitCalculator'));
const EmiVsRentCalculator = dynamic(() => import('./EmiVsRentCalculator'));
const FlipkartSellerMargin = dynamic(() => import('./FlipkartSellerMargin'));
const ScopeCreepRiskChecker = dynamic(() => import('./ScopeCreepRiskChecker'));
const JwtDecoderRiskScan = dynamic(() => import('./JwtDecoderRiskScan'));
const JsonRepairTool = dynamic(() => import('./JsonRepairTool'));
const ClientRedFlagDetector = dynamic(() => import('./ClientRedFlagDetector'));
const SqlExplainSimplifier = dynamic(() => import('./SqlExplainSimplifier'));
const DomainAgeTrustChecker = dynamic(() => import('./DomainAgeTrustChecker'));
const NoticePeriodBuyoutTool = dynamic(() => import('./NoticePeriodBuyoutTool'));
const ContractSummaryTool = dynamic(() => import('./ContractSummaryTool'));
const SwiggyZomatoPartnerEarnings = dynamic(() => import('./SwiggyZomatoPartnerEarnings'));
const ChitFundReturnCalculator = dynamic(() => import('./ChitFundReturnCalculator'));
const LeaveEncashmentCalculator = dynamic(() => import('./LeaveEncashmentCalculator'));
const CronExpressionHumanizer = dynamic(() => import('./CronExpressionHumanizer'));
const ThumbnailTextReadability = dynamic(() => import('./ThumbnailTextReadability'));
const RefundImpactCalculator = dynamic(() => import('./RefundImpactCalculator'));
const PackagingCostOptimizer = dynamic(() => import('./PackagingCostOptimizer'));
const FreelancerGstNeedChecker = dynamic(() => import('./FreelancerGstNeedChecker'));
const ApiResponseMockGenerator = dynamic(() => import('./ApiResponseMockGenerator'));
const CssUnusedDetectorLite = dynamic(() => import('./CssUnusedDetectorLite'));
const StartupRunwayCalculator = dynamic(() => import('./StartupRunwayCalculator'));
const GoldLoanCostCalculator = dynamic(() => import('./GoldLoanCostCalculator'));
const MsmeLoanEligibilityScore = dynamic(() => import('./MsmeLoanEligibilityScore'));
const ApiLatencyEstimator = dynamic(() => import('./ApiLatencyEstimator'));
const CostPerHireCalculator = dynamic(() => import('./CostPerHireCalculator'));
const ProjectDelayCostTool = dynamic(() => import('./ProjectDelayCostTool'));
const ReturnRateCostTool = dynamic(() => import('./ReturnRateCostTool'));
const FlatRegistrationCostEstimator = dynamic(() => import('./FlatRegistrationCostEstimator'));
const QrScamChecker = dynamic(() => import('./QrScamChecker'));
const ScreenshotTamperDetector = dynamic(() => import('./ScreenshotTamperDetector'));
const AdPlacementSimulator = dynamic(() => import('./AdPlacementSimulator'));
const BrowserPermissionRiskScan = dynamic(() => import('./BrowserPermissionRiskScan'));
const BarcodeLabelGenerator = dynamic(() => import('./BarcodeLabelGenerator'));
const ColorContrastFixer = dynamic(() => import('./ColorContrastFixer'));
const ThinContentDetector = dynamic(() => import('./ThinContentDetector'));
const DuplicateParagraphFinder = dynamic(() => import('./DuplicateParagraphFinder'));
const MetaTagMissingScanner = dynamic(() => import('./MetaTagMissingScanner'));
const LowRpmCountryDetector = dynamic(() => import('./LowRpmCountryDetector'));
const BrokenAffiliateLinkScanner = dynamic(() => import('./BrokenAffiliateLinkScanner'));
const EzoicReadinessChecker = dynamic(() => import('./EzoicReadinessChecker'));
const CoreWebVitalsLite = dynamic(() => import('./CoreWebVitalsLite'));
const AdDensityChecker = dynamic(() => import('./AdDensityChecker'));
const GooglePolicyRiskScanner = dynamic(() => import('./GooglePolicyRiskScanner'));
const AdsenseEarningsEstimator = dynamic(() => import('./AdsenseEarningsEstimator'));
const SitemapErrorChecker = dynamic(() => import('./SitemapErrorChecker'));
const IndexabilityChecker = dynamic(() => import('./IndexabilityChecker'));
const BlogMonetizationScore = dynamic(() => import('./BlogMonetizationScore'));
const RpmByCountryCalculator = dynamic(() => import('./RpmByCountryCalculator'));
const TrafficValueCalculator = dynamic(() => import('./TrafficValueCalculator'));
const SearchIntentClassifier = dynamic(() => import('./SearchIntentClassifier'));
const KeywordDifficultyLite = dynamic(() => import('./KeywordDifficultyLite'));
const TopicGapFinder = dynamic(() => import('./TopicGapFinder'));
const CompetitorMissingKeyword = dynamic(() => import('./CompetitorMissingKeyword'));
const AnchorTextRatioChecker = dynamic(() => import('./AnchorTextRatioChecker'));
const SpamScoreLite = dynamic(() => import('./SpamScoreLite'));
const SchemaMissingChecker = dynamic(() => import('./SchemaMissingChecker'));
const FaqSchemaGenerator = dynamic(() => import('./FaqSchemaGenerator'));
const EeatScoreChecklist = dynamic(() => import('./EeatScoreChecklist'));
const VideoTitleScore = dynamic(() => import('./VideoTitleScore'));
const WatchTimePredictor = dynamic(() => import('./WatchTimePredictor'));
const ChannelGrowthCalculator = dynamic(() => import('./ChannelGrowthCalculator'));
const SubscriberMilestoneTracker = dynamic(() => import('./SubscriberMilestoneTracker'));
const HashtagRankChecker = dynamic(() => import('./HashtagRankChecker'));
const CopyrightRiskKeyword = dynamic(() => import('./CopyrightRiskKeyword'));
const ViralTopicOpportunity = dynamic(() => import('./ViralTopicOpportunity'));
const CaptionCleanerTool = dynamic(() => import('./CaptionCleanerTool'));
const ScriptTimerTool = dynamic(() => import('./ScriptTimerTool'));
const TalkingSpeedAnalyzer = dynamic(() => import('./TalkingSpeedAnalyzer'));
const BrandDealRateCalculator = dynamic(() => import('./BrandDealRateCalculator'));
const VideoRetentionBenchmark = dynamic(() => import('./VideoRetentionBenchmark'));
const ChannelNicheSaturation = dynamic(() => import('./ChannelNicheSaturation'));
const YoutubeIncomeTaxIndia = dynamic(() => import('./YoutubeIncomeTaxIndia'));
const UploadBestTimeChecker = dynamic(() => import('./UploadBestTimeChecker'));
const CreatorBurnoutPlanner = dynamic(() => import('./CreatorBurnoutPlanner'));
const GstProfitCalculator = dynamic(() => import('./GstProfitCalculator'));
const UpiFeeEstimator = dynamic(() => import('./UpiFeeEstimator'));
const CtcBreakupTool = dynamic(() => import('./CtcBreakupTool'));
const PfGrowthCalculator = dynamic(() => import('./PfGrowthCalculator'));
const GratuityEstimator = dynamic(() => import('./GratuityEstimator'));
const TdsCalculatorIndia = dynamic(() => import('./TdsCalculatorIndia'));
const InvoiceNumberGenerator = dynamic(() => import('./InvoiceNumberGenerator'));


// ─────────────────────────────────────────────────────────────────────────────
// DevToolBox — renders the correct interactive tool for a given slug
// ─────────────────────────────────────────────────────────────────────────────

interface DevToolBoxProps { slug: string }

export default function DevToolBox({ slug }: DevToolBoxProps) {
  switch (slug) {
    // Existing
    case 'csv-json-converter':      return <CsvJsonConverter />;
    case 'color-palette-generator': return <ColorPaletteGenerator />;
    case 'text-diff-checker':       return <TextDiffChecker />;
    case 'json-to-yaml':            return <JsonYamlConverter slug="json-to-yaml" />;
    case 'yaml-to-json':            return <JsonYamlConverter slug="yaml-to-json" />;
    case 'json-to-xml':             return <JsonXmlConverter slug="json-to-xml" />;
    case 'xml-to-json':             return <JsonXmlConverter slug="xml-to-json" />;
    case 'json-formatter':          return <JsonFormatter />;
    case 'jwt-decoder':             return <JwtDecoder />;
    // New — batch 2
    case 'cron-expression-builder': return <CronExpressionBuilder />;
    case 'chmod-calculator':        return <ChmodCalculator />;
    case 'unix-timestamp-converter':return <UnixTimestampConverter />;
    case 'og-meta-tag-previewer':   return <OgMetaTagPreviewer />;
    case 'hash-generator':          return <HashGenerator />;
    case 'http-header-analyzer':    return <HttpHeaderAnalyzer />;
    case 'sql-formatter':           return <SqlFormatterTool />;
    case 'favicon-generator':       return <FaviconGenerator />;
    case 'number-base-converter':   return <NumberBaseConverter />;
    case 'base64-encoder-decoder':  return <Base64Tool />;
    case 'url-parser-builder':      return <UrlParserBuilder />;
    case 'regex-tester':            return <RegexTester />;
    case 'css-unit-converter':      return <CssUnitConverter />;
    case 'color-contrast-checker':  return <ColorContrastChecker />;
    case 'mock-json-generator':     return <MockJsonGenerator />;
    case 'env-file-parser':         return <EnvFileParser />;
    case 'markdown-to-html':        return <MarkdownToHtml />;
    case 'ip-subnet-calculator':    return <IpSubnetCalculator />;
    // New — batch 3
    case 'text-to-ascii-art':      return <TextToAsciiArt />;
    case 'wasm-analyzer':          return <WasmAnalyzer />;
    case 'llm-token-counter':      return <LlmTokenCounter />;
    case 'api-ping-tester':        return <ApiPingTester />;
    // New — batch 4
    case 'uuid-generator':         return <UuidGenerator />;
    case 'password-generator':     return <PasswordGenerator />;
    case 'lorem-ipsum-generator':  return <LoremIpsumGenerator />;
    case 'word-counter':           return <WordCounter />;
    // New — batch 5
    case 'xml-formatter':          return <XmlFormatter />;
    case 'html-formatter':         return <HtmlFormatter />;
    case 'xml-validator':          return <XmlValidator />;
    case 'json-validator':         return <JsonValidator />;
    case 'html-validator':         return <HtmlValidator />;
    case 'xpath-tester':           return <XpathTester />;
    case 'credit-card-validator':  return <CreditCardValidator />;
    case 'java-regex-tester':      return <JavaRegexTester />;
    case 'js-beautifier':          return <JsBeautifier />;
    case 'js-minifier':            return <JsMinifier />;
    case 'css-beautifier':         return <CssBeautifier />;
    case 'css-minifier':           return <CssMinifier />;
    case 'xsd-generator':          return <XsdGenerator />;
    case 'xslt-transformer':       return <XsltTransformer />;
    case 'csv-to-xml':             return <CsvToXml />;
    case 'string-utilities':       return <StringUtilities />;
    case 'html-escape':            return <HtmlEscape />;
    case 'xml-escape':             return <XmlEscape />;
    case 'java-dotnet-escape':     return <JavaDotnetEscape />;
    case 'javascript-escape':      return <JavascriptEscape />;
    case 'json-escape':            return <JsonEscape />;
    case 'csv-escape':             return <CsvEscape />;
    case 'sql-escape':             return <SqlEscape />;
    case 'mime-types-list':        return <MimeTypesList />;
    case 'html-entities':          return <HtmlEntities />;
    case 'i18n-snippets':          return <I18nSnippets />;
    // Top 3 requested
    case 'adsense-approval-checker': return <AdsenseApprovalChecker />;
    case 'scam-website-checker':   return <ScamWebsiteChecker />;
    case 'salary-in-hand-india':   return <SalaryInHandIndia />;

    // Auto-generated mass cases    // Auto-generated mass cases
    case 'youtube-rpm-calculator': return <YouTubeRpmCalculator />;
    case 'fake-job-post-checker': return <FakeJobPostChecker />;
    case 'resume-ats-score': return <ResumeAtsScore />;
    case 'offer-compare-tool': return <OfferCompareTool />;
    case 'keyword-cannibalization-checker': return <KeywordCannibalizationChecker />;
    case 'gst-inclusive-exclusive': return <GstInclusiveExclusive />;
    case 'upi-qr-receipt-generator': return <UpiQrReceiptGenerator />;
    case 'cod-profit-calculator': return <CodProfitCalculator />;
    case 'internal-link-finder': return <InternalLinkFinder />;
    case 'thumbnail-ctr-score': return <ThumbnailCtrScore />;
    case 'side-hustle-profit-calculator': return <SideHustleProfitCalculator />;
    case 'emi-vs-rent-calculator': return <EmiVsRentCalculator />;    case 'flipkart-seller-margin': return <FlipkartSellerMargin />;
    case 'scope-creep-risk-checker': return <ScopeCreepRiskChecker />;
    case 'jwt-decoder-risk-scan': return <JwtDecoderRiskScan />;
    case 'json-repair-tool': return <JsonRepairTool />;
    case 'client-red-flag-detector': return <ClientRedFlagDetector />;
    case 'sql-explain-simplifier': return <SqlExplainSimplifier />;
    case 'domain-age-trust-checker': return <DomainAgeTrustChecker />;
    case 'notice-period-buyout-tool': return <NoticePeriodBuyoutTool />;
    case 'contract-summary-tool': return <ContractSummaryTool />;
    case 'swiggy-zomato-partner-earnings': return <SwiggyZomatoPartnerEarnings />;
    case 'chit-fund-return-calculator': return <ChitFundReturnCalculator />;
    case 'leave-encashment-calculator': return <LeaveEncashmentCalculator />;
    case 'cron-expression-humanizer': return <CronExpressionHumanizer />;
    case 'thumbnail-text-readability': return <ThumbnailTextReadability />;
    case 'refund-impact-calculator': return <RefundImpactCalculator />;
    case 'packaging-cost-optimizer': return <PackagingCostOptimizer />;
    case 'freelancer-gst-need-checker': return <FreelancerGstNeedChecker />;
    case 'api-response-mock-generator': return <ApiResponseMockGenerator />;
    case 'css-unused-detector-lite': return <CssUnusedDetectorLite />;
    case 'startup-runway-calculator': return <StartupRunwayCalculator />;
    case 'gold-loan-cost-calculator': return <GoldLoanCostCalculator />;
    case 'msme-loan-eligibility-score': return <MsmeLoanEligibilityScore />;
    case 'api-latency-estimator': return <ApiLatencyEstimator />;
    case 'cost-per-hire-calculator': return <CostPerHireCalculator />;
    case 'project-delay-cost-tool': return <ProjectDelayCostTool />;
    case 'return-rate-cost-tool': return <ReturnRateCostTool />;
    case 'flat-registration-cost-estimator': return <FlatRegistrationCostEstimator />;
    case 'qr-scam-checker': return <QrScamChecker />;
    case 'screenshot-tamper-detector': return <ScreenshotTamperDetector />;
    case 'ad-placement-simulator': return <AdPlacementSimulator />;
    case 'browser-permission-risk-scan': return <BrowserPermissionRiskScan />;
    case 'barcode-label-generator': return <BarcodeLabelGenerator />;
    case 'color-contrast-fixer': return <ColorContrastFixer />;
    case 'thin-content-detector': return <ThinContentDetector />;
    case 'duplicate-paragraph-finder': return <DuplicateParagraphFinder />;
    case 'meta-tag-missing-scanner': return <MetaTagMissingScanner />;    case 'low-rpm-country-detector': return <LowRpmCountryDetector />;
    case 'broken-affiliate-link-scanner': return <BrokenAffiliateLinkScanner />;
    case 'ezoic-readiness-checker': return <EzoicReadinessChecker />;
    case 'core-web-vitals-lite': return <CoreWebVitalsLite />;
    case 'ad-density-checker': return <AdDensityChecker />;
    case 'google-policy-risk-scanner': return <GooglePolicyRiskScanner />;
    case 'adsense-earnings-estimator': return <AdsenseEarningsEstimator />;
    case 'sitemap-error-checker': return <SitemapErrorChecker />;
    case 'indexability-checker': return <IndexabilityChecker />;
    case 'blog-monetization-score': return <BlogMonetizationScore />;
    case 'rpm-by-country-calculator': return <RpmByCountryCalculator />;
    case 'traffic-value-calculator': return <TrafficValueCalculator />;
    case 'search-intent-classifier': return <SearchIntentClassifier />;
    case 'keyword-difficulty-lite': return <KeywordDifficultyLite />;
    case 'topic-gap-finder': return <TopicGapFinder />;
    case 'competitor-missing-keyword': return <CompetitorMissingKeyword />;
    case 'anchor-text-ratio-checker': return <AnchorTextRatioChecker />;
    case 'spam-score-lite': return <SpamScoreLite />;
    case 'schema-missing-checker': return <SchemaMissingChecker />;
    case 'faq-schema-generator': return <FaqSchemaGenerator />;
    case 'eeat-score-checklist': return <EeatScoreChecklist />;
    case 'video-title-score': return <VideoTitleScore />;    case 'watch-time-predictor': return <WatchTimePredictor />;
    case 'channel-growth-calculator': return <ChannelGrowthCalculator />;
    case 'subscriber-milestone-tracker': return <SubscriberMilestoneTracker />;
    case 'hashtag-rank-checker': return <HashtagRankChecker />;
    case 'copyright-risk-keyword': return <CopyrightRiskKeyword />;
    case 'viral-topic-opportunity': return <ViralTopicOpportunity />;    case 'caption-cleaner-tool': return <CaptionCleanerTool />;    case 'script-timer-tool': return <ScriptTimerTool />;
    case 'talking-speed-analyzer': return <TalkingSpeedAnalyzer />;
    case 'brand-deal-rate-calculator': return <BrandDealRateCalculator />;
    case 'video-retention-benchmark': return <VideoRetentionBenchmark />;
    case 'channel-niche-saturation': return <ChannelNicheSaturation />;
    case 'youtube-income-tax-india': return <YoutubeIncomeTaxIndia />;
    case 'upload-best-time-checker': return <UploadBestTimeChecker />;
    case 'hook-line-generator': return <HookLineGenerator />;    case 'creator-burnout-planner': return <CreatorBurnoutPlanner />;    case 'gst-profit-calculator': return <GstProfitCalculator />;
    case 'upi-fee-estimator': return <UpiFeeEstimator />;
    case 'ctc-breakup-tool': return <CtcBreakupTool />;
    case 'pf-growth-calculator': return <PfGrowthCalculator />;
    case 'gratuity-estimator': return <GratuityEstimator />;
    case 'tds-calculator-india': return <TdsCalculatorIndia />;
    case 'invoice-number-generator': return <InvoiceNumberGenerator />;

    default:                        return null;
  }
}
