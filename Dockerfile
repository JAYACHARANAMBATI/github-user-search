# Stage 1: Build the application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy nginx configuration
COPY --from=build /app/dist /usr/share/nginx/html

# Create a custom nginx config for SPAs
RUN echo 'server {\
    listen 80;\
    listen [::]:80;\
    server_name _;\
    root /usr/share/nginx/html;\
    index index.html;\
    # Support for SPA routing\
    location / {\
        try_files $uri $uri/ /index.html;\
    }\
    # Cache static assets\
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {\
        expires 30d;\
        add_header Cache-Control "public, no-transform";\
    }\
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Set user to non-root
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

