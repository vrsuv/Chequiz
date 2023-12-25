import { StyleSheet } from 'react-native';

const dropdownStyle = StyleSheet.create({
  dropAll: {
    width: "100%",
    paddingBottom: "1%",
    flexDirection: 'column', 
    alignItems: 'center', 
    backgroundColor: '#ffc0cb',
    borderRadius: 10,
  },
  dropTwo: {
    width: "100%",
    paddingBottom: "1%",
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#ffc0cb',
  },
  dropdown1: {
    width: "48%",
    height: 40,
    margin: "1%",
    marginTop: "2%",
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  dropdown2: {
    width: "98%",
    height: 40,
    marginBottom: "2%",
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
});

export { dropdownStyle };