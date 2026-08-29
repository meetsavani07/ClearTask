import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Trash2,
  Clock,
  Flag,
  Pencil,
  Pin,
  PinOff,
  TriangleAlert as AlertTriangle,
  Eye,
  X,
} from 'lucide-react';
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
  onTogglePin,
}) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isViewingTask, setIsViewingTask] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    return `${dayName}, ${formattedDate}`;
  };

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      className={`group min-w-0 w-full bg-slate-200 rounded-xl border-2 p-4 transition-colors duration-200 hover:shadow-md relative ${
        task.completed
          ? 'border-green-200 bg-green-50/30'
          : task.pinned
          ? 'border-yellow-300 bg-blue-50/30 shadow-sm'
          : 'border-slate-200 hover:border-orange-300'
      }`}
    >
      {task.pinned && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-orange-500 text-white rounded-full p-1">
            <Pin className="h-3 w-3" />
          </div>
        </div>
      )}

      <div className="flex items-start">
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
            <button
              onClick={() => setIsViewingTask(true)}
              className="text-left w-full"
              aria-label="View task details"
            >
              <h3
                className={`font-medium pr-24 transition-all duration-200 hover:text-orange-600 ${
                  task.completed
                    ? 'text-slate-500 line-through'
                    : 'text-slate-800'
                }`}
              >
                {task.title}
              </h3>
            </button>

            {task.description && (
              <ul
                className={`mt-1 space-y-1 transition-all duration-200 ${
                  task.completed ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {task.description.split('\n').map((line, idx) => {
                  const trimmed = line.trim();
                  if (!trimmed) return null;
                  const match = trimmed.match(/^(\d+)[.)]\s*(.*)$/);
                  const number = match ? match[1] : String(idx + 1);
                  const text = match ? match[2] : trimmed;
                  return (
                    <li
                      key={`${task.id}-point-${idx}`}
                      className="flex items-start gap-2 text-sm min-w-0"
                    >
                      <span className="font-medium text-orange-500 shrink-0">
                        {number}.
                      </span>
                      <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                        {text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="flex items-center space-x-3 mt-2">
              <span
                className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${
                  priorityColors[task.priority]
                }`}
              >
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

        <div className="absolute top-4 right-4 flex items-center gap-0.5">
          <button
            onClick={() => setIsViewingTask(true)}
            className="p-1 text-slate-500 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-all duration-200"
            aria-label="View task"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-slate-500 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-all duration-200"
            aria-label="Edit task"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onTogglePin(task.id)}
            className={`p-1 rounded-md transition-all duration-200 ${
              task.pinned
                ? 'text-orange-500 bg-orange-50'
                : 'text-slate-500 hover:text-orange-500 hover:bg-orange-50'
            }`}
            aria-label={task.pinned ? 'Unpin task' : 'Pin task'}
          >
            {task.pinned ? (
              <PinOff className="h-3.5 w-3.5" />
            ) : (
              <Pin className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            onClick={() => setIsConfirmingDelete(true)}
            className="p-1 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-all duration-200"
            aria-label="Delete task"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* View task modal */}
      {isViewingTask && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsViewingTask(false)}
        >
          <AnimatePresence>
            <motion.div
              key="view-task"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-slate-800 break-words min-w-0">
                  {task.title}
                </h3>
                <button
                  onClick={() => setIsViewingTask(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-all duration-200 shrink-0"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span
                  className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${
                    priorityColors[task.priority]
                  }`}
                >
                  <Flag className={`h-3 w-3 ${priorityIcons[task.priority]}`} />
                  <span className="capitalize">{task.priority} priority</span>
                </span>

                {task.completed && (
                  <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border bg-green-100 text-green-700 border-green-200">
                    <Check className="h-3 w-3" />
                    <span>Completed</span>
                  </span>
                )}

                {task.pinned && (
                  <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border bg-orange-100 text-orange-700 border-orange-200">
                    <Pin className="h-3 w-3" />
                    <span>Pinned</span>
                  </span>
                )}
              </div>

              {task.dueDate && (
                <div className="flex items-center space-x-2 mt-4 text-sm text-slate-600">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>Due {formatFullDate(task.dueDate)}</span>
                </div>
              )}

              {task.description && (
                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                    Details
                  </h4>
                  <ul className="space-y-1.5">
                    {task.description.split('\n').map((line, idx) => {
                      const trimmed = line.trim();
                      if (!trimmed) return null;
                      const match = trimmed.match(/^(\d+)[.)]\s*(.*)$/);
                      const number = match ? match[1] : String(idx + 1);
                      const text = match ? match[2] : trimmed;
                      return (
                        <li
                          key={`${task.id}-view-point-${idx}`}
                          className="flex items-start gap-2 text-sm text-slate-600 min-w-0"
                        >
                          <span className="font-medium text-orange-500 shrink-0">
                            {number}.
                          </span>
                          <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                            {text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {isConfirmingDelete && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsConfirmingDelete(false)}
        >
          <AnimatePresence>
            <motion.div
              key="delete-confirm"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Delete this task?
                </h3>
                <p className="text-sm text-slate-500">
                  "{task.title}" will be permanently removed. This can't be
                  undone.
                </p>
              </div>
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setIsConfirmingDelete(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onDelete(task.id);
                    setIsConfirmingDelete(false);
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
