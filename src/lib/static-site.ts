const FORMSUBMIT_BASE = "https://formsubmit.co/ajax";

export async function submitToFormSubmit(
  email: string,
  fields: Record<string, string>
) {
  const res = await fetch(`${FORMSUBMIT_BASE}/${encodeURIComponent(email)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(fields),
  });
  if (!res.ok) throw new Error("Form submit failed");
}

export function getSitePassword() {
  return process.env.NEXT_PUBLIC_SITE_PASSWORD || "whistler2027";
}
