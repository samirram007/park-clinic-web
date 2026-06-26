import { Helmet } from 'react-helmet-async'
import { company } from '@/lib/company'

const DEFAULT_OG_IMAGE = '/og-image.svg'

interface SEOProps {
  title: string
  description: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: string
  noindex?: boolean
}

export default function SEO({
  title,
  description,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
}: SEOProps) {
  const fullTitle = `${title} | ${company.name}`
  const url = canonicalUrl
    ? `${company.siteUrl}${canonicalUrl}`
    : company.siteUrl

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={company.name} />
      <meta property="og:image" content={`${company.siteUrl}${ogImage}`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${company.siteUrl}${ogImage}`} />

      {/* Search Engine Verification (set via .env) */}
      <meta
        name="google-site-verification"
        content={
          import.meta.env.VITE_GOOGLE_VERIFICATION ||
          'YOUR_GOOGLE_VERIFICATION_CODE'
        }
      />
      <meta
        name="msvalidate.01"
        content={
          import.meta.env.VITE_BING_VERIFICATION ||
          'YOUR_BING_VERIFICATION_CODE'
        }
      />

      {/* Noindex for private pages */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  )
}
