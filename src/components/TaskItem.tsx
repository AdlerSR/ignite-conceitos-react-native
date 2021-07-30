import React, { useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTaskTitle: string) => void;
}

export function TaskItem({ item, index ,toggleTaskDone, removeTask, editTask }: TaskItemProps) {
  const [newTitle, setNewTitle] = useState('');
  const [editing, setEditing] = useState(false);

  const handleSubmitEdit = () => {
    editTask(item.id, newTitle);
    setEditing(false);
    setNewTitle('');
  }

  const handleEdit = () => {
    setEditing(!editing)
    setNewTitle('');
  }

  const confirmRemoveTask = () => {
    Alert.alert(
      "Deletar Tarefa",
      "Você tem certeza que deseja deletar essa tarefa?",
      [
        {
          text: "Não", 
          style: "cancel"
        },
        { text: "tenho", onPress: () => removeTask(item.id) }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
          disabled={editing}
        >
          <View 
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          {editing 
            ? 
            <TextInput value={newTitle || item.title} onChangeText={(text) => setNewTitle(text)} style={[styles.input, styles.taskText]} onSubmitEditing={handleSubmitEdit}/> 
            : 
            <Text 
            style={item.done ? styles.taskTextDone : styles.taskText}
            >
              {item.title}
            </Text>
          }

          
        </TouchableOpacity>
      </View>
      <View style={styles.iconsWrapper}>
        <TouchableOpacity
          testID={`trash-${index}`} 
          onPress={handleEdit}
        >
          <Icon name={editing ? "x" : "edit-3"} size={20} color="#B2B2B2"/>
        </TouchableOpacity>
        <TouchableOpacity
          testID={`trash-${index}`} 
          onPress={confirmRemoveTask}
          style={{marginHorizontal: 24}}
          disabled={editing}
        >
          <Image source={trashIcon} style={{opacity: editing ? 0.4 : 1}}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  input: {
    padding: 0,
    height: 20,
    flexGrow: 1
  },
  iconsWrapper: {
    flexDirection: 'row', 
    alignItems: 'center',
  }
})