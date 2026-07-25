import authImage from "@/assets/Auth.png";
import { Link } from "react-router-dom";

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
}) {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-h-200 max-w-6xl overflow-hidden rounded-[2rem] border border-border-default bg-surface shadow-lg sm:grid-cols-1 lg:grid-cols-[1fr_1fr]">
        <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="max-w-xl">
            <p className="text-text-disabled text-sm font-semibold uppercase tracking-[0.2em]">
              Welcome to ZenMind
            </p>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
              {title}
            </h1>

            <p className="mt-4 text-sm leading-6 text-text-soft sm:text-base">
              {subtitle}
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {children}
          </div>

          {footerText && footerLinkText && footerLinkTo && (
            <p className="mt-10 text-sm text-text-soft">
              {footerText}{" "}
              <Link
                to={footerLinkTo}
                className="font-semibold text-brand transition-colors hover:text-brand-muted"
              >
                {footerLinkText}
              </Link>
            </p>
          )}
        </div>

        <div className="relative overflow-hidden bg-page dark:bg-app sm:h-72 lg:h-auto">
          <img
            src={authImage}
            alt="Authentication design"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}