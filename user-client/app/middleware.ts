import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Генерируем случайное значение nonce (base64)
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Определяем политику CSP. Убираем 'unsafe-inline' и добавляем 'nonce-${nonce}'
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self';
    img-src 'self' data: https:;
    font-src 'self';
    connect-src 'self';
    frame-ancestors 'none';
  `;

  // Клонируем заголовки из входящего запроса
  const requestHeaders = new Headers(request.headers);
  // Устанавливаем nonce в заголовки запроса, чтобы его можно было использовать в компонентах
  requestHeaders.set('x-nonce', nonce);

  // Создаем новый ответ
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Устанавливаем заголовок CSP в ответе. Убираем переносы строк.
  response.headers.set(
    'Content-Security-Policy',
    cspHeader.replace(/\s{2,}/g, ' ').trim()
  );

  return response;
}

// Указываем, для каких путей будет работать middleware
export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};