import React, { useState, useRef, useEffect } from 'react';
import { Check, X, Clock, Flag, MoreVertical, Copy, Edit, Pin, PinOff } from 'lucide-react';
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
  onDuplicate, 
  onEdit, 
  onTogglePin 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleMenuAction = (action: () => void) => {
    action();
    setIsMenuOpen(false);
  };

  return (
    <div className={`group bg-slate-200 rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-md relative ${
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
        <div className="flex items-start space-x-3 flex-1">
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
              <p className={`text-sm mt-1 transition-all duration-200 ${
                task.completed ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {task.description}
              </p>
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
        
        <div className="flex items-center space-x-1 ml-3">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10">
                <button
                  onClick={() => handleMenuAction(() => onEdit(task))}
                  className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Task</span>
                </button>
                
                <button
                  onClick={() => handleMenuAction(() => onDuplicate(task.id))}
                  className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                >
                  <Copy className="h-4 w-4" />
                  <span>Duplicate Task</span>
                </button>
                
                <button
                  onClick={() => handleMenuAction(() => onTogglePin(task.id))}
                  className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                >
                  {task.pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                  <span>{task.pinned ? 'Unpin Task' : 'Pin Task'}</span>
                </button>
                
                <hr className="my-1 border-slate-200" />
                
                <button
                  onClick={() => handleMenuAction(() => onDelete(task.id))}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  
                  <X className="h-4 w-4" />
                  <span>Delete Task</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};