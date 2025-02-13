import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PROFILE_DATA = {
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  bio: 'Software developer by day, photographer by night. Love sharing tech insights and travel stories.',
  stats: {
    posts: 42,
    followers: 1234,
    following: 890,
  },
};

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: PROFILE_DATA.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{PROFILE_DATA.name}</Text>
        <Text style={styles.bio}>{PROFILE_DATA.bio}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{PROFILE_DATA.stats.posts}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{PROFILE_DATA.stats.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{PROFILE_DATA.stats.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <Pressable style={styles.editButton}>
        <Ionicons name="settings-outline" size={20} color="#007AFF" />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#eee',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  editButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});