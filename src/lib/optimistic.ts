import { toast } from "sonner";

/**
 * Run an optimistic action with instant toast feedback + rollback on failure.
 *
 *   await withOptimistic({
 *     optimistic: "Saved.",
 *     run: () => fetch(...),
 *     onError: () => setForm(prevForm),
 *     errorMessage: "Could not save.",
 *   });
 */
export async function withOptimistic<T>(opts: {
  optimistic: string;
  run: () => Promise<T> | T;
  onError?: () => void;
  errorMessage?: string;
}): Promise<T | undefined> {
  const id = toast.success(opts.optimistic);
  try {
    return await opts.run();
  } catch (err) {
    toast.dismiss(id);
    toast.error(opts.errorMessage ?? "Something went wrong. Reverted.");
    opts.onError?.();
    return undefined;
  }
}

/** Promise-toast helper with editorial copy. */
export function promiseToast<T>(p: Promise<T>, msgs: { loading: string; success: string; error?: string }) {
  return toast.promise(p, {
    loading: msgs.loading,
    success: msgs.success,
    error: msgs.error ?? "Something went wrong.",
  });
}
