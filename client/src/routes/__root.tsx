import { ModeToggle } from "@/components/mode-toggle";
import Providers from "@/components/Providers";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <div className="p-2 lg:p-5 flex items-center justify-between">
        <div className="flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </div>
        <ModeToggle />
      </div>
      <hr />
      <main className="overflow-scroll p-2 lg:p-5 flex-1">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </Providers>
  ),
});
