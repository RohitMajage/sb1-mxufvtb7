import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { router } from 'expo-router';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80',
  },
  {
    id: 'professional',
    name: 'Professional',
    image: 'https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?w=400&q=80',
  },
  {
    id: 'creative',
    name: 'Creative',
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400&q=80',
  },
];

export default function TemplatesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Choose a Template</Text>
      <Text style={styles.subtitle}>
        Select a template that best represents your professional style
      </Text>
      
      <View style={styles.grid}>
        {templates.map((template) => (
          <Pressable
            key={template.id}
            style={styles.templateCard}
            onPress={() => router.push('/')}
          >
            <Image
              source={{ uri: template.image }}
              style={styles.templateImage}
            />
            <View style={styles.templateInfo}>
              <Text style={styles.templateName}>{template.name}</Text>
              <Text style={styles.templateDescription}>
                Perfect for {template.id} professionals
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    margin: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  grid: {
    padding: 10,
  },
  templateCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  templateImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  templateInfo: {
    padding: 16,
  },
  templateName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 14,
    color: '#666',
  },
});