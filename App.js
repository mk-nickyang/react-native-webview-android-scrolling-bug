import React, { useRef } from 'react';
import { View, Dimensions, Animated, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const height = Dimensions.get('window').width / (16 / 9);

function WebviewScreen() {
  const offsetAnim = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          height: offsetAnim.interpolate({
            inputRange: [0, 100],
            outputRange: [100, 50],
            extrapolate: 'clamp',
          }),
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold', color: 'white' }}>Header</Text>
        </View>
      </Animated.View>

      <View style={{ flex: 1 }}>
        <Animated.ScrollView
          scrollEventThrottle={10}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: offsetAnim,
                  },
                },
              },
            ],
            { useNativeDriver: false },
          )}
        >
          <View style={{ height }}>
            <WebView
              source={{
                uri: 'https://reactnative.dev/',
              }}
              style={{ height }}
            />
          </View>

          <View
            style={{
              height: 800,
              backgroundColor: 'blue',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontWeight: 'bold', color: 'white' }}>Body</Text>
          </View>
        </Animated.ScrollView>
      </View>
    </View>
  );
}

function App() {
  return <WebviewScreen />;
}

export default App;
