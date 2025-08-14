import React, { useEffect, useMemo, useState } from 'react';
import { getRandomGreeting } from '../utils/getRandomGreeting';
import { Plus } from 'lucide-react';
import { TaskList } from '../components/TaskList';
import AddTasks from '../components/AddTasks';
import { EditTask } from '../components/EditTask';
import { useTasks } from '../hooks/useTask';
import type { Task } from '../types/Task';
import { motion } from 'framer-motion';
import helloimg from '../assets/hello.png';

interface HomePageProps {
  searchTerm: string;
}

export const Home: React.FC<HomePageProps> = ({ searchTerm }) => {
  const [greeting, setGreeting] = useState('')
  const { tasks, addTask, toggleComplete, deleteTask, duplicateTask, togglePin, updateTask, isLoaded } = useTasks();
  const [name, setName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    setGreeting(getRandomGreeting());
  }, []);

  // Filter and sort tasks
  const filteredAndSortedTasks = [...tasks].filter(task => {
    if (!searchTerm) return true;
    return task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  // Memoize time-based greeting
  const timeGreeting = useMemo(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";      // 5 AM - 11:59 AM
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon";    // 12 PM - 4:59 PM
    } else if (currentHour >= 17 && currentHour < 21) {
      return "Good Evening";      // 5 PM - 8:59 PM
    } else {
      return "Good Night";        // 9 PM - 4:59 AM
    }
  }, []);


  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
      try {
        const newData = JSON.parse(data);

        setName(newData.name,);
      } catch (error) {
        console.error('Invalid JSON in localStorage:', error);
      }
    }
  }, []);

  // Show loading state while tasks are being loaded
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 pt-5 pb-24 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl flex items-center justify-center font-bold text-slate-800 mb-2">
            {<img src={helloimg} alt="" className='w-10' />}
            <p className='ml-2'>
              {timeGreeting}
            </p>
            <p className='ml-2'>
              {name}
            </p>
          </h1>

          {/* <p className="text-slate-600">Organize your tasks and boost your productivity</p> */}
          <p>{greeting}</p>
        </div>

        <div className="flex justify-between items-center m-10">
          <h2 className="text-xl font-semibold text-slate-800">Your Tasks</h2>
          <motion.button
            onClick={() => setIsModalOpen(true)}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className=" bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex justify-center  space-x-2 px-4 py-2  duration-200 "
          >
            <Plus className="h-4 w-4" />

          </motion.button>
        </div>

        <TaskList
          tasks={filteredAndSortedTasks}
          onToggleComplete={toggleComplete}
          onDelete={deleteTask}
          onDuplicate={duplicateTask}
          onEdit={handleEdit}
          onTogglePin={togglePin}
        />

        <AddTasks
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={addTask}
        />

        <EditTask
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingTask(null);
          }}
          onUpdate={updateTask}
          task={editingTask}
        />
      </div>
    </>
  );
};

export default Home;