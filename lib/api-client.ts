export async function getResourceData(resource: string, queryParams: Record<string, string> = {}) {
  // 1. Cek apakah ini dijalankan di server atau di browser
  const isServer = typeof window === 'undefined';
  
  // 2. Jika di server, kita bisa pakai URL relatif atau panggil DB langsung (opsional)
  // Untuk fetch, kita tetap butuh URL absolut di server component Next.js
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl && !isServer) {
     console.error("API URL tidak terdefinisi!");
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${baseUrl || "http://localhost:3000"}/api/${resource}${queryString ? `?${queryString}` : ''}`;

  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;
  return res.json();
}