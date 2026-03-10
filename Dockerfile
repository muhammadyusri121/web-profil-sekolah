# ================================
# Tahap 1: Dependencies (Install biner yang dibutuhkan)
# ================================
FROM node:20-alpine AS deps
WORKDIR /app

# Install libc6-compat untuk kompatibilitas Alpine (penting untuk Next.js & Prisma)
RUN apk add --no-cache libc6-compat openssl

# Salin package files dan prisma schema
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (menggunakan npm ci agar versi persis sesuai package-lock)
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# ================================
# Tahap 2: Builder (Proses Build)
# ================================
FROM node:20-alpine AS builder
WORKDIR /app

# Salin node_modules & prisma dari tahap deps
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma

# Salin sisa kode proyek
COPY . .

# Set environment untuk build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
# Memory limit ditingkatkan (butuh Swap jika VPS kecil)
ENV NODE_OPTIONS="--max-old-space-size=1024"

# Build Next.js
RUN npm run build

# ================================
# Tahap 3: Runner (Produksi - Sangat Ringan)
# ================================
FROM node:20-alpine AS runner
WORKDIR /app

# Install runtime dependency (OpenSSL) & Tini untuk signal handling yang baik
RUN apk add --no-cache openssl tini

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Buat user non-root demi keamanan
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Salin file yang diperlukan dari builder (Next.js Standalone)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Gunakan user non-root
USER nextjs

EXPOSE 3000

# Entrypoint menggunakan Tini untuk menangani signal terminasi dengan benar
ENTRYPOINT ["/sbin/tini", "--"]

# Jalankan aplikasi
CMD ["node", "server.js"]