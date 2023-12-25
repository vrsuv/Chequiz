import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { PieChart, BarChart, LineChart } from 'react-native-svg-charts';

const ProgCard = ({ pieData, barChartData, lineData, onPress }) => {
  return (
    <TouchableOpacity onPress = {onPress}>
    <Card >
      <Card.Content style={[styles.cardCont, styles.shadowStyle]}>

        <View>
          <BarChart
            style={{ height: 90, width: 90, }}
            data={barChartData}
            yAccessor={({ item }) => item.value}
            svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            contentInset={{ top: 20, bottom: 10 }}
          />
        </View>

        <View>
          <LineChart
            style={{ height: 100, width: 100 }}
            data={lineData}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20 }}
          />
        </View>

        <View>
          <PieChart
            style={{ height: 90, width: 90 }}
            data={pieData}
            innerRadius={2}
          />
        </View>

      </Card.Content>
    </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardCont: {
    margin: 5,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 5
  },
  shadowStyle: {
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});


export default ProgCard;
