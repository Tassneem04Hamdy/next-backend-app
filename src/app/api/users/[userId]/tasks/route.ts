import { NextResponse } from "next/server";
import { Types } from "mongoose";

import connect from "@/lib/dbClient";
import User from "@/lib/models/userSchema";
import Task from "@/lib/models/taskSchema";

export const GET = async (req: Request, context: {params: any}) => {
    try {
        const { userId } = context.params;
        
        if (!Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ error: 'Invalid user ID!' }, { status: 400 });
        }
        
        await connect();
        const user = await User.exists({ _id: userId });
        if (!user) {
            return NextResponse.json({ error: 'Wrong user ID!' }, { status: 400 });
        }

        const tasks = await Task.find({ user: userId });
        return NextResponse.json({ tasks }, { status: 200 });

    } catch (err) {
        console.log(`error: ${err}`);
        return NextResponse.json(err, { status: 500 });
    }
};

export const POST = async (req: Request, context: {params: any}) => {
    try {
        const { userId } = context.params;
        
        if (!Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ error: 'Invalid user ID!' }, { status: 400 });
        }
        
        await connect();
        const user = await User.exists({ _id: userId });
        if (!user) {
            return NextResponse.json({ error: 'Wrong user ID!' }, { status: 400 });
        }

        let newTask = await req.json();
        newTask.user = userId;
        newTask = await Task.create(newTask);
        await User.findByIdAndUpdate(userId, { $push: { tasks: newTask._id } });

        return NextResponse.json({ task: newTask }, { status: 201 });

    } catch (err) {
        console.log(`error: ${err}`);
        return NextResponse.json(err, { status: 500 });
    }
};
