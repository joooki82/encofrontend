FROM nginx:alpine

# Copy Angular build files to NGINX's default directory
COPY dist /usr/share/nginx/html

# Copy custom NGINX configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]

