import { useUser } from "@/lib/hooks/useUser";
import type { UserRole } from "@/lib/hooks/useUser";

/**
 * Roles that inherit full admin-level privileges.
 * Every role listed here can do anything an admin can do.
 */
const ADMIN_PRIVILEGED_ROLES: UserRole[] = [
  "admin",
  "chairman",
  "president",
  "gen_secretary",
  "fin_secretary",
  "secretary",
  "treasurer",
];

export function useRole() {
  const { user, loading } = useUser();
  const role = user?.role ?? null;

  const is = (target: UserRole) => role === target;

  // ── Exact role checks ──────────────────────────────────────────────────────
  const isMember = is("member");
  const isAdmin = is("admin");
  const isChairman = is("chairman");
  const isGenSecretary = is("gen_secretary");
  const isFinSecretary = is("fin_secretary");
  const isSecretary = is("secretary");
  const isTreasurer = is("treasurer");
  const isPresident = is("president");

  // ── Privilege checks ───────────────────────────────────────────────────────
  /** True for any role that inherits admin-level permissions */
  const hasAdminPrivileges =
    role !== null && ADMIN_PRIVILEGED_ROLES.includes(role);

  /** True for any leadership / committee role (everyone except plain members) */
  const isCommittee = role !== null && role !== "member";

  // ── Utility helpers ────────────────────────────────────────────────────────
  /**
   * Returns true if the user's role exactly matches any of the provided roles.
   * No admin escalation — use when strict matching is required.
   *
   * @example hasRole("fin_secretary", "treasurer")
   */
  const hasRole = (...roles: UserRole[]) =>
    role !== null && roles.includes(role);

  /**
   * Returns true if the user matches one of the given roles OR has admin privileges.
   * Use this for most UI guards where admins should inherit access.
   *
   * @example canAccess("treasurer") // true for treasurer AND all admin-privileged roles
   */
  const canAccess = (...roles: UserRole[]) =>
    hasAdminPrivileges || hasRole(...roles);

  return {
    role,
    loading,

    // Exact role booleans
    isMember,
    isAdmin,
    isChairman,
    isGenSecretary,
    isFinSecretary,
    isSecretary,
    isTreasurer,
    isPresident,

    // Privilege booleans
    hasAdminPrivileges,
    isCommittee,

    // Utility functions
    hasRole,
    canAccess,
  };
}
