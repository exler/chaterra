import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {
    return (
        <section>
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="font-bold text-xl">Page not found</h1>
                <RouterLink to="/" className="btn btn-primary">
                    Go to home page
                </RouterLink>
            </div>
        </section>
    );
}
