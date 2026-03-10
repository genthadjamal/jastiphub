'use server';

import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

// ─── Register ────────────────────────────────────────────
export async function registerUser(formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const email = (formData.get('email') as string).toLowerCase().trim();
        const password = formData.get('password') as string;
        const role = (formData.get('role') as string) || 'CUSTOMER';

        if (!name || !email || !password) {
            return { success: false, error: 'All fields are required' };
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return { success: false, error: 'Email already registered' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, role }
        });

        // Auto-login after registration
        const cookieStore = await cookies();
        cookieStore.set('session-user', JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }), {
            httpOnly: false,
            secure: false,
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return { success: true, data: { id: user.id, name: user.name, email: user.email, role: user.role } };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: 'Registration failed' };
    }
}

// ─── Login ───────────────────────────────────────────────
export async function loginUser(formData: FormData) {
    try {
        const email = (formData.get('email') as string).toLowerCase().trim();
        const password = formData.get('password') as string;

        if (!email || !password) {
            return { success: false, error: 'Email and password are required' };
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return { success: false, error: 'Invalid email or password' };
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return { success: false, error: 'Invalid email or password' };
        }

        const cookieStore = await cookies();
        cookieStore.set('session-user', JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }), {
            httpOnly: false,
            secure: false,
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

        return { success: true, data: { id: user.id, name: user.name, email: user.email, role: user.role } };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Login failed' };
    }
}

// ─── Logout ──────────────────────────────────────────────
export async function logoutUser() {
    const cookieStore = await cookies();
    cookieStore.delete('session-user');
    return { success: true };
}

// ─── Get Current User ────────────────────────────────────
export async function getCurrentUser() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session-user');
        if (!sessionCookie) return null;
        return JSON.parse(sessionCookie.value) as { id: string; name: string; email: string; role: string };
    } catch {
        return null;
    }
}

// ─── Admin: Get All Users ────────────────────────────────
export async function getUsers(role?: string) {
    try {
        const where = role ? { role } : {};
        const users = await prisma.user.findMany({
            where,
            select: { id: true, name: true, email: true, role: true, createdAt: true },
            orderBy: { createdAt: 'desc' }
        });
        return { success: true, data: users };
    } catch (error) {
        console.error('Error fetching users:', error);
        return { success: false, error: 'Failed to fetch users' };
    }
}

// ─── Admin: Delete User ──────────────────────────────────
export async function deleteUser(id: string) {
    try {
        await prisma.user.delete({ where: { id } });
        return { success: true };
    } catch (error) {
        console.error('Error deleting user:', error);
        return { success: false, error: 'Failed to delete user' };
    }
}
