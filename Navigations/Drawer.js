import { createDrawerNavigator } from '@react-navigation/drawer';
import DashBoard from '../Components/DashBoard';
import Mybooking from '../Components/Mybooking';
import Hotels from '../Components/Hotels';

const Drawer = createDrawerNavigator();

function Drawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="DashBoard" component={DashBoard} />
      <Drawer.Screen name="Mybooking" component={Mybooking} />
      <Drawer.Screen name="Hotels" component={Hotels} />
    </Drawer.Navigator>
  );
}

export default Drawer