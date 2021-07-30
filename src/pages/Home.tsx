import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const findEqualTaskTitle = tasks.find(task => task.title.toLowerCase() === newTaskTitle.toLowerCase());

    if(findEqualTaskTitle) {
      Alert.alert(
        "Tarefa Duplicada",
        "Já existe outra tarefa adicionada com o mesmo nome",
        [
          { text: "ok" }
        ]
      );

      return;
    }

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

  function handleEditTask(id: number, newTaskTitle: string) {
    setTasks(tasks.map(item => 
      item.id === id 
      ? {...item, title: newTaskTitle} 
      : item 
    ))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
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