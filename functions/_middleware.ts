// functions/_middleware.ts
export async function onRequest(context: {
  request: Request;
  next: () => Promise<Response>;
}) {
  const response = await context.next();
  
  // إضافة Headers للأمان
  const newHeaders = new Headers(response.headers);
  newHeaders.set('X-Frame-Options', 'DENY');
  newHeaders.set('X-Content-Type-Options', 'nosniff');
  newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
```

---

### 5️⃣ تأكد من وجود `public/_redirects`
```
# public/_redirects
/*    /index.html   200
```

---

### 6️⃣ هيكل المشروع النهائي
```
vue-tailwind-admin-dashboard/
├── public/
│   ├── _redirects          ← مهم للـ SPA
│   └── index.html
├── src/
├── functions/               ← اختياري
│   └── _middleware.ts
├── wrangler.toml           ← أضفه بالتاريخ الصحيح
├── package.json
├── vite.config.ts
└── tsconfig.json