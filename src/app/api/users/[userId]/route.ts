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
        const user = await User.findById(userId, { password: 0 }).populate('tasks');
        if (!user) {
            return NextResponse.json({ error: 'Wrong user ID!' }, { status: 400 });
        }

        return NextResponse.json({ user }, { status: 200 });

    } catch (err) {
        console.log(`error: ${err}`);
        return NextResponse.json(err, { status: 500 });
    }
};

export const DELETE = async (req: Request, context: {params: any}) => {
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

        await Task.deleteMany({ user: userId });
        await User.deleteOne({ _id: userId });

        return NextResponse.json({ message: 'User is successfully deleted.'}, { status: 200 });

    } catch (err) {
        console.log(`error: ${err}`);
        return NextResponse.json(err, { status: 500 });
    }
};
