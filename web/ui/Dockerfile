# ============================================
# Stage 1: Build
# ============================================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Copy source files
COPY . .

# Build the application
RUN npm run build

# ============================================
# Stage 2: Production
# ============================================
FROM nginx:alpine AS production

# Install certificates and curl for health checks
RUN apk add --no-cache \
    curl \
    openssl \
    tzdata

# Create non-root user for security
RUN addgroup -g 1000 -S appgroup && \
    adduser -u 1000 -S appuser -G appgroup

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets from builder
COPY --from=builder --chown=appuser:appgroup /app/dist /usr/share/nginx/html

# Create directories for logs and run files
RUN mkdir -p /var/cache/nginx /var/run/nginx && \
    chown -R appuser:appgroup /var/cache/nginx /var/run /var/log/nginx

# Switch to non-root user
USER appuser

# Expose ports
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
