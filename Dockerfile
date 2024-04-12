FROM node:20.11.1-alpine3.18 as builder

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build Prisma client based on the prisma schema and build the application
RUN npx prisma generate && npm run build

# Final stage/base image
FROM node:20.11.1-alpine3.18


WORKDIR /app

# Copy only necessary artifacts from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json




# Environment variables for runtime
ENV DB_URL=${DB_URL}
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}

# Expose the application port
EXPOSE ${APP_PORT}

# Command to run migrations and start the application
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
