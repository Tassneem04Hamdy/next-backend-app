import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

import connect from "@/lib/dbClient";
import User from "@/lib/models/userSchema";
import Task from "@/lib/models/taskSchema";

export const GET = async () => {
    try {
        await connect();
        await Task.find();
        const users = await User.find({ }, { password: 0 }).populate('tasks');
        return NextResponse.json({ users }, { status: 200 });

    } catch (err) {
        console.log(`error: ${err}`);
        return NextResponse.json(err, { status: 500 });
    }
};

export const POST = async (req: Request) => {
    try {
        let newUser = await req.json();        
        
        await connect();
        const user = await User.findOne({ username: newUser.username });
        if (user) {
            return NextResponse.json({ error: 'Username already exists!' }, { status: 400 });
        }

        newUser.password = await bcrypt.hash(newUser.password, 10);
        newUser = await User.create(newUser);
        return NextResponse.json({ user: newUser }, { status: 201 });

    } catch (err) {
        console.log(`error: ${err}`);
        return NextResponse.json(err, { status: 500 });
    }
};
