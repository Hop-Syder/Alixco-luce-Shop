/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Auth helpers (JWT + bcrypt) — remplace app/core/security.py et app/api/deps.py
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import prisma from '@/lib/db';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'super_secret');
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface AuthUser {
  id: string;
  email: string | null;
  phone: string;
  full_name: string;
  role: string;
}

export async function createAccessToken(subject: string, role: string): Promise<string> {
  return new SignJWT({ role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(subject)
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET);
}

export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

function extractBearerToken(req: NextRequest): string | null {
  const header = req.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) return null;
  return header.slice('Bearer '.length);
}

async function decodeToken(token: string): Promise<{ sub: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (typeof payload.sub !== 'string' || typeof payload.role !== 'string') return null;
    return { sub: payload.sub, role: payload.role };
  } catch {
    return null;
  }
}

export async function getOptionalCurrentUser(req: NextRequest): Promise<AuthUser | null> {
  const token = extractBearerToken(req);
  if (!token) return null;
  const decoded = await decodeToken(token);
  if (!decoded) return null;
  const user = await prisma.user.findUnique({ where: { id: decoded.sub } });
  if (!user) return null;
  return { id: user.id, email: user.email, phone: user.phone, full_name: user.full_name, role: user.role };
}

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function requireUser(req: NextRequest): Promise<AuthUser> {
  const token = extractBearerToken(req);
  if (!token) throw new AuthError('Could not validate credentials', 401);
  const decoded = await decodeToken(token);
  if (!decoded) throw new AuthError('Could not validate credentials', 401);
  const user = await prisma.user.findUnique({ where: { id: decoded.sub } });
  if (!user) throw new AuthError('User not found', 404);
  return { id: user.id, email: user.email, phone: user.phone, full_name: user.full_name, role: user.role };
}

export async function requireAdmin(req: NextRequest): Promise<AuthUser> {
  const user = await requireUser(req);
  if (user.role !== 'admin') throw new AuthError("The user doesn't have enough privileges", 403);
  return user;
}
