# Stage 1: Build the Backend
# FROM oven/bun:1 as base
FROM node:latest as backend-build
WORKDIR /usr/src/backend
RUN npm install -g typescript


# Install backend dependencies
COPY backend/package*.json ./
# COPY prisma ./backend/prisma/schema.prisma
RUN npm install

# Copy backend source and build
COPY backend/ .
RUN npm run build
RUN npx prisma generate

# Stage 2: Build the Frontend
FROM node:latest as frontend-build
WORKDIR /usr/src/frontend

# Copy necessary backend artifacts for frontend
COPY --from=backend-build /usr/src/backend /usr/src/backend

# Install frontend dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source and build
COPY frontend/ .
RUN npm install -g typescript
RUN npm install vite
RUN npm run build

# Stage 3: Serve the Backend
FROM node:latest as backend-serve
WORKDIR /usr/src/backend
EXPOSE 5000
CMD ["npm", "run", "start"]

# Stage 4: Serve the Frontend
FROM node:latest as frontend-serve
WORKDIR /usr/src/frontend
EXPOSE 5173
CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "5173"]