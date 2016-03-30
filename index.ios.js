var React = require('react-native');
var formatTime = require('minutes-seconds-milliseconds');
var {
  Text,
  View,
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
} = React;

var StopWatch = React.createClass({
  getInitialState: function() {
    return {
      timeElapsed: null,
      running: false,
    }
  },
  // requred rendering function that renders the whole screen
  render: function() {
    return <View style={styles.container}>
        <View style = {[styles.header, this.border('yellow')]}>
          <View style = {[this.border('red'), styles.timerWrapper]}>
            <Text style = {styles.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style = {[this.border('green'), styles.buttonWrapper]}>
            {this.startStopButton()}
            {this.lapButton()}
          </View>
      </View>
      <View style ={[styles.footer, this.border('blue')]}>
        <Text>
          A list of laps
        </Text>
      </View>
    </View>
  },
  // heler function that returns a startStopButton component
  startStopButton: function() {
    var borderColorStyle = this.state.running ? styles.stopButton : styles.startButton;
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.handleStartPress}
      style = {[styles.button, borderColorStyle]}
      >
      <Text>
        {this.state.running ? 'Stop' : 'Start'}
      </Text>
    </TouchableHighlight>
  },

  // report the time
  handleStartPress: function() {
    if (this.state.running){
      clearInterval(this.interval);
      this.setState({running:false});
      return;
    }
    var startTime = new Date();

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - startTime,
        running: true,
      });
    }, 30);

  },

  // helper function that returns a lapButton component
  lapButton: function() {
    return <TouchableHighlight
      style = {styles.button}>
      <Text>
        Lap
      </Text>
    </TouchableHighlight>
  },

  // dynamic styling should be put as a function here
  border: function(color) {
    return {
      borderColor: color,
      borderWidth: 4,
    }
  },

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
   header: {
     flex: 1
   },
   footer: {
     flex: 1
   },
   timerWrapper: {
     flex: 5,
     alignItems:'center',
     justifyContent:'center',
   },
   buttonWrapper: {
     flex: 3,
     flexDirection:'row',
     justifyContent:'space-around',
     alignItems:'center'
   },
   timer: {
     fontSize: 60,
   },
   button: {
     borderWidth: 2,
     height: 100,
     width: 100,
     borderRadius: 50,
     justifyContent: 'center',
     alignItems: 'center'
   },
   startButton: {
     borderColor: '#00CC00',
   },
   stopButton: {
     borderColor: '#CC0000',
   }

});

AppRegistry.registerComponent('stopwatch', () => StopWatch);
