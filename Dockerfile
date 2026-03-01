FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
# Menggunakan npm install (atau npm ci)
RUN npm ci

# Copy all files
COPY . .

# Generate Prisma client (jika file prisma/schema.prisma digunakan)
# RUN npx prisma generate

# Build Next.js
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/prisma ./prisma

# Start the Next.js app
CMD ["npm", "start"]
