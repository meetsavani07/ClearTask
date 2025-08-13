import { CheckSquare } from "lucide-react";
import { useTasks } from "../hooks/useTask";
import { TaskList } from "../components/TaskList";
import { EditTask } from "../components/EditTask";
import type { FilterType, SortType, Task } from "../types/Task";
import { useMemo, useState } from "react";
import { FilterControls } from "../components/FilterControls";

interface TaskPageProps {
  searchTerm: string;
}

export const Tasks: React.FC<TaskPageProps> = ({ searchTerm }) => {

  const { tasks, toggleComplete, deleteTask, duplicateTask, togglePin, updateTask, isLoaded } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [sortType, setSortType] = useState<SortType>('date');
  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.filter(task => !task.completed).length;


  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };
  const filteredAndSortedTasks = useMemo(() => {
    if (!isLoaded) return [];
    
    let filtered = tasks;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by completion status
    if (filterType !== 'all') {
      filtered = filtered.filter(task =>
        filterType === 'completed' ? task.completed : !task.completed
      );
    }

    // Sort tasks
    const sorted = [...filtered].sort((a, b) => {
      // Always show pinned tasks first
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      
      switch (sortType) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'priority':
          { const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority]; }
        case 'date':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return sorted;
  }, [tasks, searchTerm, filterType, sortType, isLoaded]);

  return (
    <>
      <div className="bg-gray-50 pb-24 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 m-10 gap-4">
          <div className="bg-slate-200/50 rounded-xl border border-slate-200 p-6 text-center">
            <CheckSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-800">{tasks.length}</p>
            <p className="text-sm text-slate-600">Total Tasks</p>
          </div>
          <div className="bg-slate-200/50 rounded-xl border border-slate-200 p-6 text-center">
            <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="h-4 w-4 bg-yellow-500 rounded-full"></div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{pendingCount}</p>
            <p className="text-sm text-slate-600">Pending</p>
          </div>
          <div className="bg-slate-200/50 rounded-xl border border-slate-200 p-6 text-center">
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="h-4 w-4 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{completedCount}</p>
            <p className="text-sm text-slate-600">Completed</p>
          </div>
        </div>

        <FilterControls
          filterType={filterType}
          onFilterChnage={setFilterType}
          sortType={sortType}
          onSortChange={setSortType}
        />

        <div className="bg-white m-10 rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-slate-800">
              {filteredAndSortedTasks.length} task{filteredAndSortedTasks.length !== 1 ? 's' : ''}
              {filterType !== 'all' && ` (${filterType})`}
            </h3>
          </div>
          <div className="sm:-ml-3 sm:-mr-3 -ml-5 -mr-5 space-y-6 ">
            <TaskList
              tasks={filteredAndSortedTasks}
              onToggleComplete={toggleComplete}
              onDelete={deleteTask}
              onDuplicate={duplicateTask}
              onEdit={handleEdit}
              onTogglePin={togglePin}
            />
          </div>


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
      </div>
    </>
  );
}

export default Tasks;