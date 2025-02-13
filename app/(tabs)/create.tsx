import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CreateScreen() {
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (content.trim()) {
      // In a real app, this would send the post to a backend
      console.log('Posted:', content);
      setContent('');
      router.push('/');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          multiline
          placeholder="What's on your mind?"
          value={content}
          onChangeText={setContent}
          maxLength={500}
        />
        <Text style={styles.charCount}>
          {content.length}/500
        </Text>
      </View>
      <Pressable
        style={[
          styles.postButton,
          !content.trim() && styles.postButtonDisabled
        ]}
        onPress={handlePost}
        disabled={!content.trim()}
      >
        <Ionicons name="send" size={20} color="#fff" />
        <Text style={styles.postButtonText}>Post</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    minHeight: 120,
  },
  charCount: {
    alignSelf: 'flex-end',
    color: '#666',
    fontSize: 14,
    marginTop: 8,
  },
  postButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButtonDisabled: {
    backgroundColor: '#ccc',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});