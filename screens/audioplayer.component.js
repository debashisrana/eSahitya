import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Text} from '@ui-kitten/components';
import SoundPlayer from 'react-native-sound-player';

export const AudioPlayer = props => {

  const [playing, setPlaying] = useState(true);
  const [mute, setMute] = useState(false);
  const [mediaInfo, setMediaInfo] = useState({});
  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      try {
          console.log(props.audioFile);
        // or play from url
        SoundPlayer.playUrl({url:props.audioFile});
        // setTimeout(() => {
        //   SoundPlayer.play();
        // //   getInfo();
        // }, 500);
      } catch (e) {
        console.log(`cannot play the sound file`, e);
      }
    }
    return () => {
      componentMounted = false;
      SoundPlayer.stop();
    };
  }, [props.audioFile]);

  async function getInfo() {
    try {
      const info = await SoundPlayer.getInfo(); // Also, you need to await this because it is async
      setMediaInfo(info);
      // {duration: 12.416, currentTime: 7.691}
    } catch (e) {
      console.log('There is no song playing', e);
    }
  }
  const muteUnmute = () => {
    if (mute) {
      SoundPlayer.setVolume(100);
    } else {
      SoundPlayer.setVolume(0);
    }
    setMute(!mute);
  };
  const playPause = () => {
    if (playing) {
      SoundPlayer.pause();
    } else {
      SoundPlayer.resume();
    }
    setPlaying(!playing);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.playBtn} onPress={playPause}>
        <Icon
          name={playing ? 'pause-circle-outline' : 'play-circle-outline'}
          fill="green"
        />
      </TouchableOpacity>
      {/* <Text>
        {Object.entries(mediaInfo).length !== 0 && mediaInfo.duration}
      </Text> */}
      {/* <TouchableOpacity style={styles.playBtn} onPress={muteUnmute}>
        <Icon
          name={mute ? 'volume-up-outline' : 'volume-off-outline'}
          fill="green"
        />
      </TouchableOpacity> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  playBtn: {
    padding: 2,
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
});
