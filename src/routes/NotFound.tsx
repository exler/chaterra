import { Link } from "react-router";

export default function NotFound() {
    return (
        <section>
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="font-bold text-xl">Page not found</h1>
                <Link to="/" className="btn btn-primary">
                    Go to home page
                </Link>
            </div>
        </section>
    );
}
