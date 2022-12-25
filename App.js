import React,{useState} from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { StyleSheet, Text, View, SafeAreaView,KeyboardAvoidingView,Button } from "react-native";
import Task from "./components/Task";
import { ScrollView } from "react-native";

export default function App() {
  const [task,setTask] = useState('');
  const [taskItems,setTaskItems] = useState([]);

  const handleAddTask = () => {
    if(task.trim() !==''){
      setTaskItems([...taskItems,task]);
      setTask('');
    }
  }
  const handleCompleteTask =(index) => {
    const allTasks = [...taskItems];
    allTasks.splice(index, 1);
    setTaskItems(allTasks);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
      </View>
      <View style={styles.items}>
        <ScrollView style={styles.scrollView}>

        {
          taskItems && taskItems.map((taskItem, index) =>(
            <TouchableOpacity key={index} onPress={()=>{handleCompleteTask(index)}}>
            <Task text={taskItem} />
            </TouchableOpacity>
            
          ))
        }

        </ScrollView>
        </View>
        <KeyboardAvoidingView 
          behaviour={Platform.OS === 'ios' ? 'padding':'height'}
          style={styles.writeTaskWrapper}
        >
          <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)}/>
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    marginTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    paddingTop: 80,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper:{
    position: "absolute",
    bottom:10,
    width:'110%',
    flexDirection:'row',
    justifyContent: "space-between",
    alignItem:'center',
    paddingHorizontal:15,
  },
  input:{
    paddingVertical:15,
    paddingHorizontal: 15,
    width:300,
    backgroundColor: "#fff",
    borderRadius:60,
    borderColor:'#c0c0c0',
    borderWidth:1,
  },
  addWrapper:{
    width:60,
    height: 60,
    borderRadius:60,
    backgroundColor: "#fff",
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#c0c0c0',
    borderWidth:1,
  },
  addText:{
    fontSize: 40,
  },
  scrollView:{
    height: '75%',
  }
});
