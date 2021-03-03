import * as React from 'react';
import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import adminLogin from '../components/login'
import company from '../components/Company'
// import  from '../components/companyAdmin'
import companyAdmin from '../components/Admin';
import StudentList from '../components/appliedStudentList'
import student2 from '../components/Student2'
import SignUp from '../components/SignUp'
import StudentListAdmin from '../components/studentListAdmin'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();
// const Drawer = createDrawerNavigator();

function StackNavigator(props) {
    return (
        <Stack.Navigator>

            <Stack.Screen name='Login' component={adminLogin} />
            <Stack.Screen name='Company' component={TabNavigator} />
            <Stack.Screen name='Admin' component={TabNavigatorAdmin} />
            <Stack.Screen name='Student' component={student2} />
            <Stack.Screen name='SignUp' component={SignUp} />





        </Stack.Navigator>
    );
}
function TabNavigator(props) {
    return (
        <Tab.Navigator>

            <Tab.Screen name="Company" component={company} />
            <Tab.Screen name="Student List" component={StudentList} />




        </Tab.Navigator>
    );
}
function TabNavigatorAdmin(props) {
    return (
        <Tab.Navigator>

            <Tab.Screen name="Company Admin" component={companyAdmin} />
            <Tab.Screen name="Student List Admin" component={StudentListAdmin} />




        </Tab.Navigator>
    );
}

export default (StackNavigator);
