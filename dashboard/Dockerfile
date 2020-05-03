# Stage 1 - the build process
FROM node:14.1 as build-deps

# Set a working directory
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.17-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

# Copy the nginx.conf for client side navigation practices
COPY --from=build-deps /usr/src/app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
