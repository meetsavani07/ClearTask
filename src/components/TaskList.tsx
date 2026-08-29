import type { Task } from "../types/Task";
import { TaskItem } from "./TaskItem";
import { motion } from "framer-motion";
import disappointedimg from '../assets/disappointed.png';

interface TaskListProps {
    tasks: Task[];
    onToggleComplete: (id: string) => void;
    onDelete: (id: string) => void;
    onDuplicate: (id: string) => void;
    onEdit: (task: Task) => void;
    onTogglePin: (id: string) => void;
    viewMode?: 'grid' | 'list';
}

export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onToggleComplete,
    onDelete,
    onDuplicate,
    onEdit,
    onTogglePin,
    viewMode = 'grid',
}) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="flex items-center justify-center">
                    <img src={disappointedimg} alt="" className="w-20 " />
                </div>
                <h3 className="text-lg font-medium text-slate-600 mb-2">I'm really disappointed in you because you're too lazy to make a task. </h3>
                <p className="text-slate-500">Create your first task to get started!</p>
            </div>
        );
    }

    const containerClass = viewMode === 'list'
        ? "sm:m-10 m-5 space-y-4 max-w-3xl mx-auto"
        : "sm:m-10 m-5 columns-1 sm:columns-2 lg:columns-3 [column-gap:1rem]";

    return (
        <div className={containerClass}>
            {tasks.map((task, index) => (
                <motion.div
                    key={`${task.id}-${index}`}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.3) }}
                    className="mb-4 w-full min-w-0 break-inside-avoid"
                >
                    <TaskItem
                        task={task}
                        onToggleComplete={onToggleComplete}
                        onDelete={onDelete}
                        onDuplicate={onDuplicate}
                        onEdit={onEdit}
                        onTogglePin={onTogglePin}
                    />
                </motion.div>
            ))}
        </div>
    );
};
