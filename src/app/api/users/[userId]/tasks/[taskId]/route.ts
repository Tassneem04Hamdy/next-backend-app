import { NextResponse } from "next/server";
import { Types } from "mongoose";

import connect from "@/lib/dbClient";
import User from "@/lib/models/userSchema";
import Task from "@/lib/models/taskSchema";

export const GET = async (req: Request, context: {params: any}) => {
    try {
        const { userId, taskId } = context.params;
        
        if (!Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ error: 'Invalid user ID!' }, { status: 400 });
        }
        if (!Types.ObjectId.isValid(taskId)) {
            return NextResponse.json({ error: 'Invalid task ID!' }, { status: 400 });
        }
        
        await connect();
        const user = await User.exists({ _id: userId });
        if (!user) {
            return NextResponse.json({ error: 'Wrong user ID!' }, { status: 400 });
        }
        
        let task = await Task.findById(taskId);
        if (!task) {
            return NextResponse.json({ error: 'Wrong task ID!' }, { status: 400 });
        }

        if (task.user != userId) {
            return NextResponse.json({ error: 'Forbidden access!' }, { status: 403 });
        }
        
        return NextResponse.json({ task }, { status: 200 });

    } catch (err) {
        console.log(`error: ${err}`);
        return NextResponse.json(err, { status: 500 });
    }
};

export const PATCH = async (req: Request, context: {params: any}) => {
    try {
        const { userId, taskId } = context.params;
        
        if (!Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ error: 'Invalid user ID!' }, { status: 400 });
        }
        if (!Types.ObjectId.isValid(taskId)) {
            return NextResponse.json({ error: 'Invalid task ID!' }, { status: 400 });
        }
        
        await connect();
        const user = await User.exists({ _id: userId });
        if (!user) {
            return NextResponse.json({ error: 'Wrong user ID!' }, { status: 400 });
        }
        
        let task = await Task.findById(taskId);
        if (!task) {
            return NextResponse.json({ error: 'Wrong task ID!' }, { status: 400 });
        }

        if (task.user != userId) {
            return NextResponse.json({ error: 'Forbidden access!' }, { status: 403 });
        }

        const updates= await req.json();
        let updatedTask = {
            ...task.toObject(),
            ...updates,
        };
        await Task.updateOne({ _id: task._id }, updatedTask);

        return NextResponse.json({ task: updatedTask }, { status: 200 });

    } catch (err) {
        console.log(`error: ${err}`);
        return NextResponse.json(err, { status: 500 });
    }
};

export const DELETE = async (req: Request, context: {params: any}) => {
    try {
        const { userId, taskId } = context.params;
        
        if (!Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ error: 'Invalid user ID!' }, { status: 400 });
        }
        if (!Types.ObjectId.isValid(taskId)) {
            return NextResponse.json({ error: 'Invalid task ID!' }, { status: 400 });
        }
        
        await connect();
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: 'Wrong user ID!' }, { status: 400 });
        }
        
        let task = await Task.findById(taskId);
        if (!task) {
            return NextResponse.json({ error: 'Wrong task ID!' }, { status: 400 });
        }

        if (task.user != userId) {
            return NextResponse.json({ error: 'Forbidden access!' }, { status: 403 });
        }

        user.tasks = user.tasks.filter((item: any) => item != taskId);
        await User.updateOne({ _id: user._id }, user);
        await Task.deleteOne({ _id: taskId });

        return NextResponse.json({ message: 'Task is successfully deleted.'}, { status: 200 });

    } catch (err) {
        console.log(`error: ${err}`);
        return NextResponse.json(err, { status: 500 });
    }
};
