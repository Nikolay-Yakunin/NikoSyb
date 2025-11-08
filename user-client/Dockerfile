FROM node:22.20.0-bookworm AS builder

WORKDIR /app

# ARG NEXT_PUBLIC_API_URL
# ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY package*.json ./

RUN mkdir -p /root/.cache/next-swc

RUN npm install

#  => => # > next build --turbopack                                                                                                                                       
#  => => #    Downloading swc package @next/swc-linux-x64-gnu... to /root/.cache/next-swc                                                                                 
#  => => #    Downloading swc package @next/swc-linux-x64-musl... to /root/.cache/next-swc  

COPY . .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
