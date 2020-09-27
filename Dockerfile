# stage 1

FROM node:alpine AS MyFinanceUI
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2

FROM nginx:alpine
COPY --from=MyFinanceUI /app/dist/MyFinanceUI /usr/share/nginx/html
EXPOSE 4200