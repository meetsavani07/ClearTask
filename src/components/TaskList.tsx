// import { ClipboardList } from "lucide-react";
import type { Task } from "../types/Task";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
    tasks: Task[];
    onToggleComplete: (id: string) => void;
    onDelete: (id: string) => void;
    onDuplicate: (id: string) => void;
    onEdit: (task: Task) => void;
    onTogglePin: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onToggleComplete,
    onDelete,
    onDuplicate,
    onEdit,
    onTogglePin,
}) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-12">
                {/* <ClipboardList className="h-16 w-16 text-slate-300 mx-auto" /> */}
                <div className="flex items-center justify-center">
                    <img src="./src/assets/disappointed.png" alt="" className="w-20 " />
                </div>
                <h3 className="text-lg font-medium text-slate-600 mb-2">I'm really disappointed in you because you're too lazy to make a task. </h3>
                <p className="text-slate-500">Create your first task to get started!</p>

            </div>
        );
    }


    return (
        <div className="space-y-4">
            <div className="sm:m-10 m-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggleComplete={onToggleComplete}
                        onDelete={onDelete}
                        onDuplicate={onDuplicate}
                        onEdit={onEdit}
                        onTogglePin={onTogglePin}
                    />
                ))}
            </div>
        </div>
    );
};