import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const Hilightview = () => {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    // Change the state every second or the time given by User.
    const interval = setInterval(() => {
      setShowText(showText => !showText);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        // marginVertical: 30,
        position: 'absolute',
      }}>
      <View style={[styles.container, {display: showText ? 'none' : 'flex'}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: 8,
    top: 3,
    marginLeft: '110%',
    borderRadius: 5,
    backgroundColor: '#074279',

    alignSelf: 'flex-end',
  },
});

export default Hilightview;
