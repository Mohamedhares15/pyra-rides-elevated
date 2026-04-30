/**
 * Compatibility shim: maps the small surface of `react-router-dom` that the
 * legacy PyraRides pages use onto `@tanstack/react-router`. This lets the
 * ported page code from the legacy repo run unmodified while routing is
 * actually handled by TanStack Router (file-based routes in src/routes/).
 */
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import {
  Link as TSLink,
  useLocation as useTSLocation,
  useNavigate as useTSNavigate,
  useParams as useTSParams,
  useRouter,
} from "@tanstack/react-router";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  replace?: boolean;
  state?: unknown;
  children?: ReactNode;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, children, replace, state: _state, ...rest }, ref) => {
    // TanStack's Link enforces typed routes; cast to any for a free-form `to`
    // string so legacy code with hand-written paths still compiles.
    const Anchor = TSLink as unknown as React.ComponentType<any>;
    return (
      <Anchor ref={ref} to={to} replace={replace} {...rest}>
        {children}
      </Anchor>
    );
  },
);
Link.displayName = "Link";

type NavLinkProps = LinkProps & {
  className?:
    | string
    | ((args: { isActive: boolean; isPending: boolean }) => string);
  end?: boolean;
  children?:
    | ReactNode
    | ((args: { isActive: boolean; isPending: boolean }) => ReactNode);
};

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, className, children, end, ...rest }, ref) => {
    const Anchor = TSLink as unknown as React.ComponentType<any>;
    return (
      <Anchor
        ref={ref}
        to={to}
        activeOptions={{ exact: !!end }}
        {...rest}
        className={(args: { isActive: boolean }) => {
          const ctx = { isActive: !!args?.isActive, isPending: false };
          return typeof className === "function" ? className(ctx) : className;
        }}
      >
        {typeof children === "function"
          ? (renderArgs: { isActive: boolean }) =>
              (children as any)({
                isActive: !!renderArgs?.isActive,
                isPending: false,
              })
          : children}
      </Anchor>
    );
  },
);
NavLink.displayName = "NavLink";

export const useLocation = () => {
  const loc = useTSLocation();
  return {
    pathname: loc.pathname,
    search: loc.searchStr ?? "",
    hash: loc.hash ?? "",
    state: (loc.state as unknown) ?? null,
    key: loc.href,
  };
};

export const useParams = <T extends Record<string, string | undefined>>() =>
  useTSParams({ strict: false }) as T;

export const useNavigate = () => {
  const nav = useTSNavigate();
  const router = useRouter();
  return (
    to: string | number,
    opts?: { replace?: boolean; state?: unknown },
  ) => {
    if (typeof to === "number") {
      router.history.go(to);
      return;
    }
    nav({ to: to as any, replace: opts?.replace });
  };
};

export const useSearchParams = () => {
  const loc = useTSLocation();
  const params = new URLSearchParams(loc.searchStr ?? "");
  const nav = useTSNavigate();
  const set = (
    next:
      | URLSearchParams
      | Record<string, string>
      | ((prev: URLSearchParams) => URLSearchParams),
  ) => {
    let outParams: URLSearchParams;
    if (typeof next === "function") outParams = next(params);
    else if (next instanceof URLSearchParams) outParams = next;
    else outParams = new URLSearchParams(next);
    const search: Record<string, string> = {};
    outParams.forEach((v, k) => (search[k] = v));
    nav({ to: loc.pathname as any, search: search as any });
  };
  return [params, set] as const;
};
