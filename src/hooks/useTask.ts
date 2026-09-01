import { useEffect, useState } from "react";
import type { Task } from "../types/Task";
import { generateCategoryFromTitle } from "../types/Task";
import { showToast } from "../utils/toast";

const TASKS_KEY = "ClearTask-tasks";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(TASKS_KEY);
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        const normalized = (Array.isArray(parsedTasks) ? parsedTasks : []).map(
          (task: Task) => ({
            ...task,
            category: task.category || generateCategoryFromTitle(task.title),
          })
        );
        setTasks(normalized);
      }
    } catch (error) {
      console.log("Error loading tasks from localStorage:", error);
      setTasks([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.log("Error saving tasks to localStorage:", error);
        showToast.error("Tasks is Not Save. Please try again later.");
      }
    }
  }, [tasks, isLoaded]);

  // Add task
  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...taskData,
      category: generateCategoryFromTitle(taskData.title),
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast.success("Task created successfully!");
  };

  // Automatically delete expired tasks (completed > 3 min)
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      setTasks((prev) =>
        prev.filter((task) => {
          if (
            task.completed &&
            currentTime - new Date(task.updatedAt).getTime() >
              3 * 60 * 1000
          ) {
            showToast.success(
              `Completed task "${task.title}" was deleted after 3 minutes.`
            );
            return false;
          }
          return true;
        })
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Duplicate task
  const duplicateTask = (id: string) => {
    const taskToDuplicate = tasks.find((task) => task.id === id);
    if (taskToDuplicate) {
      const duplicatedTask: Task = {
        ...taskToDuplicate,
        id: crypto.randomUUID(),
        title: `${taskToDuplicate.title} (Copy)`,
        completed: false,
        pinned: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTasks((prev) => [duplicatedTask, ...prev]);
      showToast.success("Duplicate Task created...");
    }
  };

  // Toggle pin
  const togglePin = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              pinned: !task.pinned,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  // Update task
  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updates,
              category: updates.title
                ? generateCategoryFromTitle(updates.title)
                : task.category,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
    showToast.success("Task Is Updated");
  };

  // Delete task
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    showToast.success("Task deleted successfully!");
  };

  // Toggle complete
  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  return {
    tasks,
    addTask,
    duplicateTask,
    togglePin,
    updateTask,
    deleteTask,
    toggleComplete,
    isLoaded,
  };
};
