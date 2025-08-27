import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, ScrollView } from 'react-native';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || 'http://localhost:3000';

export default function App(){
  const [messages, setMessages] = useState([{role:'assistant', content:'Hi, I’m Carys on mobile.'}]);
  const [text, setText] = useState('');

  async function send(){
    const next = [...messages, {role:'user', content:text}];
    setMessages(next); setText('');
    try{
      const res = await fetch(BASE_URL+'/api/chat', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ messages: next })
      });
      const data = await res.json();
      setMessages(m=>[...m, {role:'assistant', content:data?.reply||'No reply'}]);
    }catch(e){
      setMessages(m=>[...m, {role:'assistant', content:'Network error'}]);
    }
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
      <ScrollView style={{flex:1, padding:16}}>
        {messages.map((m,i)=>(
          <View key={i} style={{alignSelf:m.role==='user'?'flex-end':'flex-start', backgroundColor:m.role==='user'?'#0ea5e9':'#f1f5f9', padding:12, borderRadius:12, marginVertical:6}}>
            <Text style={{color:m.role==='user'?'#fff':'#111827'}}>{m.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={{flexDirection:'row', padding:12, borderTopWidth:1, borderColor:'#e5e7eb'}}>
        <TextInput value={text} onChangeText={setText} placeholder="Message Carys…" style={{flex:1, backgroundColor:'#fff', borderWidth:1, borderColor:'#e5e7eb', borderRadius:24, paddingHorizontal:12}} />
        <View style={{width:8}}/>
        <Button title="Send" onPress={send} />
      </View>
    </SafeAreaView>
  );
}
