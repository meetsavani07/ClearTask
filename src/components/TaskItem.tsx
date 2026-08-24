import React from 'react';
import { Check, Trash2, Clock, Flag, Pencil, Pin, PinOff } from 'lucide-react';
import type { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onEdit: (task: Task) => void;
  onTogglePin: (id: string) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  high: 'bg-red-100 text-red-700 border-red-200',
};

const priorityIcons = {
  low: 'text-green-500',
  medium: 'text-yellow-500',
  high: 'text-red-500',
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
  onTogglePin
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return `${dayName}, ${formattedDate}`;
  };

  return (
    <div
      className={`group min-w-0 w-full bg-slate-200 rounded-xl border-2 p-4 transition-colors duration-200 hover:shadow-md relative ${
      task.completed
        ? 'border-green-200 bg-green-50/30'
        : task.pinned
        ? 'border-yellow-300 bg-blue-50/30 shadow-sm'
        : 'border-slate-200 hover:border-orange-300'
    }`}>
      {task.pinned && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-orange-500 text-white rounded-full p-1">
            <Pin className="h-3 w-3" />
          </div>
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-slate-300 hover:border-orange-500 hover:bg-blue-50'
            }`}
          >
            {task.completed && <Check className="h-3 w-3" />}
          </button>
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium transition-all duration-200 ${
              task.completed ? 'text-slate-500 line-through' : 'text-slate-800'
            }`}>
              {task.title}
            </h3>
            
            {task.description && (
              <ul className={`mt-1 space-y-1 transition-all duration-200 ${
                task.completed ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {task.description.split("\n").map((line, idx) => {
                  const trimmed = line.trim();
                  if (!trimmed) return null;
                  const match = trimmed.match(/^(\d+)[.)]\s*(.*)$/);
                  const number = match ? match[1] : String(idx + 1);
                  const text = match ? match[2] : trimmed;
                  return (
                    <li key={`${task.id}-point-${idx}`} className="flex items-start gap-2 text-sm min-w-0">
                      <span className="font-medium text-orange-500 shrink-0">{number}.</span>
                      <span className="min-w-0 break-words [overflow-wrap:anywhere]">{text}</span>
                    </li>
                  );
                })}
              </ul>
            )}
            
            <div className="flex items-center space-x-3 mt-2">
              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${
                priorityColors[task.priority]
              }`}>
                <Flag className={`h-3 w-3 ${priorityIcons[task.priority]}`} />
                <span className="capitalize">{task.priority}</span>
              </span>
              
              {task.dueDate && (
                <span className="inline-flex items-center space-x-1 text-xs text-slate-500">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(task.dueDate)}</span>
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 ml-3 shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-slate-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200"
            aria-label="Edit task"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onTogglePin(task.id)}
            className={`p-1.5 rounded-lg transition-all duration-200 ${
              task.pinned
                ? 'text-orange-500 bg-orange-50'
                : 'text-slate-500 hover:text-orange-500 hover:bg-orange-50'
            }`}
            aria-label={task.pinned ? 'Unpin task' : 'Pin task'}
          >
            {task.pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
            aria-label="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};