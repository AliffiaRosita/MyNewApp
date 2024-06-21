import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import WebView from 'react-native-webview';

function NewsScreen() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdkZTZmN2ZiYzQ4NjUzZDZlNjI2NTRlNWNmOWFhMjA3NDI0MWUzYTkxNjVmNzZmZDE2M2JiYWM5MzY5Nzk2MTBkNGZiMGNjZTA1MjhiYzQ0In0.eyJhdWQiOiIzIiwianRpIjoiN2RlNmY3ZmJjNDg2NTNkNmU2MjY1NGU1Y2Y5YWEyMDc0MjQxZTNhOTE2NWY3NmZkMTYzYmJhYzkzNjk3OTYxMGQ0ZmIwY2NlMDUyOGJjNDQiLCJpYXQiOjE3MTg5MzY0NDksIm5iZiI6MTcxODkzNjQ0OSwiZXhwIjoxNzUwNDcyNDQ5LCJzdWIiOiI4MTciLCJzY29wZXMiOlsiYmVyaXRhIl19.LH4EZrbZU8yeXD8HupT03fi2RKu3qKK51gjjMcZ1vy603fTWmfudZD_Cc73g1EK9vuatTgtyuzdrozkQ8CqvQfswceD7TDB5u6FGIs9LBUZi-nAxYGGNxeC2ErDClpXaLAUw98vLH2TNJ9hAh7VZwxRFeP7roRzCccDVDMpG4tBxOm5E0DvBlBkzj6KHhZxcreMWbbvS_pyItXzWpNzFw345in9_l1NIVc02S9rGqHLixSGEZXLxbI1TuiCDJ5GDo5HcIiNKfDLfZNhUax7vL4I2YQKH8smU6ETaRmJNziIeYG-qfbksC37oGnsWZPX5041xx_7-VDdXkewMDR93fBWtvcPYhlPuiKiS6CwXpSZFeSkxRb0RLERMNlPy_ByP8lSIN86bs8j2U-XqDnuM99qdC9dU7MaUS1PeulOEfrTxWVkc3TEeFeEzLPVNErv9LH3kHPYVvj0Wf4AKiz3oJgFimAdFRyleCiZoCfm_38ak7vr72Lh5yLvC9pfwrUo3kM_lK8eiAqV0N57bdMMgJGyJFCo5N3dljglOZvT2ZjG-jtKuMlmUohBIY_elGC-weX3nnzGPakC7nHjYN7u0QXHyd-w9gr2vctZIAtYp0tqyVlTqX5M2n5PUEYzCLDoD-j-KbbIUnzLc62q8ZevwPukyOgtN0zvmVjyMmh0nufM';

  React.useEffect(() => {
    // Define the fetch function
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://api.samarindakota.go.id/api/v2/generate/dinas-komunikasi-dan-informatika/beritakominfo',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const sortedData = data.sort((a, b) => {
          return new Date(a.created_at) - new Date(b.created_at);
        });
        setData(sortedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <ScrollView style={{marginTop: 10}}>
      <Text style={{fontSize: 20, textAlign: 'center'}}>Berita</Text>

      {data.map(item => (
        <View
          key={item.uuid}
          style={{
            margin: 10,
            backgroundColor: '#fff',
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
            overflow: 'hidden',
            padding: 8,
          }}>
          <Text style={{fontWeight: 'bold'}}>{item.judul}</Text>
          {/* <WebView originWhitelist={['*']} source={{html: item.isi}} /> */}
          <Text style={{fontSize: 10}}>{item.isi}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default NewsScreen;
