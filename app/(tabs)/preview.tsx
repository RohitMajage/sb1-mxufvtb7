import { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { exportAsPDF, exportAsDocx, exportAsTxt } from '../../utils/exportResume';
import { supabase } from '../../lib/supabase';
import type { Resume } from '../../types/resume';

export default function PreviewScreen() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [resume, setResume] = useState<Resume | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const handleExport = async (format: 'pdf' | 'docx' | 'txt') => {
    if (!resume || !resumeRef.current) return;

    try {
      setExporting(true);
      setError(null);

      switch (format) {
        case 'pdf':
          await exportAsPDF(resumeRef.current);
          break;
        case 'docx':
          await exportAsDocx(resume);
          break;
        case 'txt':
          exportAsTxt(resume);
          break;
      }
    } catch (err) {
      setError(`Failed to export as ${format.toUpperCase()}`);
    } finally {
      setExporting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        
        <View ref={resumeRef} style={styles.resume}>
          <View style={styles.header}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.contact}>john@example.com | (555) 123-4567</Text>
            <Text style={styles.location}>New York, NY</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>
              Experienced software developer with a strong background in web development
              and a passion for creating user-friendly applications.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            <View style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.company}>Tech Company Inc.</Text>
                <Text style={styles.dates}>2020 - Present</Text>
              </View>
              <Text style={styles.position}>Senior Software Developer</Text>
              <Text style={styles.description}>
                • Led development of multiple web applications
                {'\n'}• Mentored junior developers
                {'\n'}• Implemented CI/CD pipelines
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.educationItem}>
              <Text style={styles.school}>University of Technology</Text>
              <Text style={styles.degree}>Bachelor of Science in Computer Science</Text>
              <Text style={styles.graduationDate}>Graduated: 2019</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              <Text style={styles.skill}>JavaScript</Text>
              <Text style={styles.skill}>React</Text>
              <Text style={styles.skill}>Node.js</Text>
              <Text style={styles.skill}>TypeScript</Text>
              <Text style={styles.skill}>Git</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <Text style={styles.exportTitle}>Export Resume</Text>
        <View style={styles.exportButtons}>
          <Pressable 
            style={[styles.exportButton, exporting && styles.buttonDisabled]} 
            onPress={() => handleExport('pdf')}
            disabled={exporting}
          >
            <Ionicons name="document-text" size={24} color="#fff" />
            <Text style={styles.exportButtonText}>PDF</Text>
          </Pressable>

          <Pressable 
            style={[styles.exportButton, exporting && styles.buttonDisabled]} 
            onPress={() => handleExport('docx')}
            disabled={exporting}
          >
            <Ionicons name="document" size={24} color="#fff" />
            <Text style={styles.exportButtonText}>DOCX</Text>
          </Pressable>

          <Pressable 
            style={[styles.exportButton, exporting && styles.buttonDisabled]} 
            onPress={() => handleExport('txt')}
            disabled={exporting}
          >
            <Ionicons name="code" size={24} color="#fff" />
            <Text style={styles.exportButtonText}>TXT</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  scrollView: {
    flex: 1,
  },
  resume: {
    backgroundColor: '#fff',
    padding: 40,
    margin: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  contact: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  experienceItem: {
    marginBottom: 20,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  company: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  dates: {
    fontSize: 16,
    color: '#666',
  },
  position: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  educationItem: {
    marginBottom: 15,
  },
  school: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  degree: {
    fontSize: 16,
    color: '#444',
    marginBottom: 4,
  },
  graduationDate: {
    fontSize: 16,
    color: '#666',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  skill: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 16,
    color: '#444',
  },
  actions: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  exportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  exportButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exportButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  exportButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
});