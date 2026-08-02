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
    <div className="w-full py-6 sm:py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-border-default bg-surface shadow-lg sm:grid-cols-1 lg:grid-cols-[1fr_1fr]">
        <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12 flex flex-col justify-center">
          <div className="max-w-xl">
            <p className="text-text-disabled text-sm font-semibold uppercase tracking-[0.2em]">
              Welcome to ZenMind
            </p>

            <h1 className="mt-4 sm:mt-6 text-2xl font-semibold tracking-tight text-brand sm:text-4xl">
              {title}
            </h1>

            <p className="mt-2 sm:mt-4 text-sm leading-6 text-text-soft sm:text-base">
              {subtitle}
            </p>
          </div>

          <div className="mt-6 sm:mt-8 space-y-4">
            {children}
          </div>

          {footerText && footerLinkText && footerLinkTo && (
            <p className="mt-6 sm:mt-8 text-sm text-text-soft">
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