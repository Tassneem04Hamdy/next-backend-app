import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: false,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true,
    },
}, { timestamps: true });

const Task = mongoose.models.tasks || mongoose.model('tasks', taskSchema);
export default Task;
