# ================================
# Stage 1: Builder
# ================================
FROM node:20-slim AS builder

# Debian slim butuh library tambahan untuk Prisma & build process
RUN apt-get update && apt-get install -y \
    openssl \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (menggunakan npm install sesuai CMS Anda)
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy semua source code
COPY . .

# Set environment untuk build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
# Batasi RAM agar tetap aman di VPS
ENV NODE_OPTIONS="--max-old-space-size=1024"

# Build Next.js
RUN npm run build

# ================================
# Stage 2: Runner
# ================================
FROM node:20-slim AS runner

# Install runtime dependency (OpenSSL) yang dibutuhkan Prisma
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Next.js standalone optimization
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# Pastikan Prisma menggunakan engine library yang stabil di Debian
ENV PRISMA_CLIENT_ENGINE_TYPE="library"
ENV HOSTNAME="0.0.0.0"

# Menjalankan aplikasi (server.js dihasilkan oleh output: 'standalone')
CMD ["node", "server.js"]