// Fallback toast implementation for environments where 'sonner' is not available
export function toast(options: { success?: string; error?: string }) {
  if (options.success) {
    window.alert(options.success);
  } else if (options.error) {
    window.alert(options.error);
  }
}
