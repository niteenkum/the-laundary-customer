import React, {useState, useEffect} from 'react';
import {View, Animated, RefreshControl} from 'react-native';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const PaginationView = props => {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (props.loading) setLoading(false);
  }, [props.loading]);

  const _onScroll = e => {
    const {contentSize, contentOffset, layoutMeasurement} = e.nativeEvent;
    let ht = contentOffset.y + layoutMeasurement.height;
    if (contentSize.height <= ht + 2 && !loading) {
      setLoading(true);
      props.onReachedEnd();
    }
  };

  const onRefresh = React.useCallback(() => {
    if (props.onRefresh) {
      setRefreshing(true);
      props.onRefresh();
      setLoading(false);
      wait(1000).then(() => setRefreshing(false));
    }
  }, [refreshing]);

  return (
    <Animated.ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        listener: _onScroll,
      })}>
      {props.children}
    </Animated.ScrollView>
  );
};
export default PaginationView;
