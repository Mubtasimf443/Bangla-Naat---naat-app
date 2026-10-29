<!-- بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ صلى الله عليه وسلم InshaAllah -->
# Bangla Naat App – NestJS Backend

NestJS + MongoDB (Mongoose) + Brevo (`@getbrevo/brevo`) + Socket.IO + Swagger.

## Run
```bash
npm install
cp .env.example .env     # fill in MONGODB_URI, JWT_SECRET, BREVO_API_KEY, MAIL_SENDER_EMAIL, APP_URL
npm run start:dev
```
- API base: `http://localhost:3000/api`
- Swagger docs: `http://localhost:3000/api/docs`
- First admin is auto-created from `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

## WebSocket (React Native)
```ts
import { io } from 'socket.io-client';
const socket = io('https://YOUR_HOST/notifications');
socket.on('naat:created', (p) => { /* p.title, p.message, p.naat */ });
socket.on('naat:updated', (p) => { /* p.title, p.message, p.naat */ });
socket.on('naat:deleted', (p) => { /* p.id */ });
```
