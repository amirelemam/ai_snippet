FROM node:22-alpine AS builder
WORKDIR /app

# install deps
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .
RUN npm run build

# Final stage
FROM node:22-alpine
WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/jest.config.ts ./jest.config.ts

# Envs
ENV NODE_ENV=production

# Start server
EXPOSE 8080
CMD ["npm", "start"]