import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks([...tasks, {done: false, id: tasks.length + 1 ,title: newTaskTitle}])
  }

  function handleToggleTaskDone(id: number) {
    setTasks(tasks.map(item => 
      item.id === id 
      ? {...item, done: !item.done} 
      : item 
    ))
  }

  function handleRemoveTask(id: number) {
    const filterTask = tasks.filter(task => task.id !== id);


    setTasks(filterTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})