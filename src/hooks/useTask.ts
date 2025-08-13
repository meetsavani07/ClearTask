import { useEffect, useState } from "react";
import type { Task } from "../types/Task";
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
        setTasks(Array.isArray(parsedTasks) ? parsedTasks : []);
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

  // Define a function `addTask` that takes taskData (excluding id, createdAt, updatedAt)
  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    // Create a new Task object by adding generated id and timestamps to the taskData
    const newTask: Task = {
      ...taskData, // Spread all the other task fields provided (like title, description, etc.)
      id: crypto.randomUUID(), // Generate a unique ID for the task using built-in crypto API
      createdAt: new Date().toISOString(), // Set the current timestamp as creation time in ISO format
      updatedAt: new Date().toISOString(), // Set the current timestamp as the last updated time
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast.success('Task created successfully!');
    // alert("You Create a Task");  
  };

  // Define a function `duplicateTask` that takes an id of the task to duplicate
  const duplicateTask = (id: string) => {
    const taskToDuplicate = tasks.find((task) => task.id === id);
    if (taskToDuplicate) {
      const duplicatedTask: Task = {
        ...taskToDuplicate,
        id: crypto.randomUUID(),
        title: `${taskToDuplicate.title} (Copy)`, // Append "(Copy)" to the title of the duplicated task
        completed: false, // Reset completed status for the duplicated task
        pinned: false, // Reset pinned status for the duplicated task
        createdAt: new Date().toISOString(), // Set the current timestamp as creation time for the duplicated task
        updatedAt: new Date().toISOString(), // Set the current timestamp as the last updated time for the duplicated task
      };
      setTasks((prev) => [duplicatedTask, ...prev]);
      showToast.success('Duplicate Task created...');
    }
  };

  // Define a function `togglePin` that takes an id of the task to toggle its pinned status
  const togglePin = (id: string) => {
    setTasks((prev) =>
      prev.map(
        (task) =>
          task.id === id
            ? {
                ...task,
                pinned: !task.pinned, // Toggle the pinned status of the task
                updatedAt: new Date().toISOString(), // Update the last updated timestamp
              }
            : task // Return the task unchanged if it is not the one being toggled
      )
    );
    
  };

  // Define a function `updateTask` that takes an id and updates the task with the given updates
  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map(
        (task) =>
          task.id === id
            ? { ...task, ...updates, updatedAt: new Date().toISOString() } // Merge updates and update the last updated timestamp
            : task // Return the task unchanged if it is not the one being updated
      )
    );
    showToast.success('Task Is Updated');
  };

  // Define a function `deleteTask` that takes an id of the task to delete
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id)); // Filter out the task with the given id
    showToast.success('Task deleted successfully!')
  };

  // Define a function `toggleComplete` that takes an id of the task to toggle its completion status
  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map(
        (task) =>
          task.id === id
            ? {
                ...task,
                completed: !task.completed, // Toggle the completed status of the task
                updatedAt: new Date().toISOString(), // Update the last updated timestamp
              }
            : task // Return the task unchanged if it is not the one being toggled
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
