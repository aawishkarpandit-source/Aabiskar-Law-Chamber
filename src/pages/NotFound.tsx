import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { ArrowRightIcon } from "../components/Icons";

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        path="/404"
        index={false}
      />

      <section className="container-page flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p
          className="font-display text-[5rem] leading-none sm:text-[7rem]"
          style={{ color: "var(--c-accent)" }}
        >
          404
        </p>
        <h1 className="mt-4 text-3xl sm:text-4xl">Page not found</h1>
        <p
          className="mt-4 max-w-md text-[1.02rem] leading-relaxed"
          style={{ color: "var(--c-ink-soft)" }}
        >
          The page you're looking for doesn't exist or has been moved. Let us
          help you find your way.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn btn-primary">
            Back to home
            <ArrowRightIcon size={16} />
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
