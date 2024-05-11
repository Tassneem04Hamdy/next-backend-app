import { NextResponse, NextRequest } from "next/server";
import { z } from 'zod';

export const middleware = async (req: NextRequest, context: {params: any}) => {
    // console.log(`req path: ${req.nextUrl.pathname},   req method: ${req.method}`);

    if (req.nextUrl.pathname.match('/api/users') && req.method == 'POST') {
        try {
            const userSchema = z.object({
                username: z.string(),
                password: z.string(),
            });
    
            userSchema.parse(await req.json());
            return NextResponse.next();
        } catch (err: unknown) {
            const error = err as z.ZodError;
            return NextResponse.json({ error: err }, { status: 400 });
        }
    }

    if (req.nextUrl.pathname.match('/api/users/:userId/tasks') && req.method == 'POST') {
        try {
            const taskSchema = z.object({
                title: z.string(),
                description: z.string(),
            });
    
            taskSchema.parse(await req.json());
            return NextResponse.next();
        } catch (err: unknown) {
            const error = err as z.ZodError;
            return NextResponse.json({ error: err }, { status: 400 });
        }
    }

    if (req.nextUrl.pathname.match('/api/users/:userId/tasks/:taskId') && req.method == 'PATCH') {
        try {
            const taskSchema = z.object({
                title: z.string().optional(),
                description: z.string().optional(),
                status: z.boolean().optional(),
            });
    
            taskSchema.parse(await req.json());
            return NextResponse.next();
        } catch (err: unknown) {
            const error = err as z.ZodError;
            return NextResponse.json({ error: err }, { status: 400 });
        }
    }

    return NextResponse.next();
};

export const config = {
    matcher: '/api/users',
};
