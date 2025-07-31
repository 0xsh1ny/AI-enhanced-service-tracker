# ---------- STAGE 1: Build ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install all deps
COPY package*.json ./
RUN npm install

# Copy source code and build the app
COPY . .
RUN npm run build

# ---------- STAGE 2: Run ----------
FROM node:18-alpine

WORKDIR /app

# Install a lightweight static server
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose the port serve will use
EXPOSE 3000

# Run the production server
CMD ["serve", "-s", "dist", "-l", "3000"]

