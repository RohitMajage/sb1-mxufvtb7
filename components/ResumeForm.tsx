import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../lib/supabase';
import type { ResumeFormData } from '../types/resume';

export default function ResumeForm() {
  const [formData, setFormData] = useState<ResumeFormData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
    },
    summary: '',
    experience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    }],
    education: [{
      school: '',
      degree: '',
      graduationDate: '',
    }],
    skills: [''],
    template: 'modern',
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Please sign in to save your resume');
        return;
      }

      const { error: saveError } = await supabase
        .from('resumes')
        .insert({
          user_id: user.id,
          data: formData,
          template: formData.template,
        });

      if (saveError) throw saveError;

      router.push('/preview');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  // ... rest of the component code remains the same as in app/(tabs)/index.tsx
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        {/* ... rest of the JSX remains the same */}
      </ScrollView>
      <View style={styles.buttonContainer}>
        {currentStep > 0 && (
          <Pressable 
            style={[styles.button, styles.backButton]} 
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Text style={styles.buttonText}>Back</Text>
          </Pressable>
        )}
        <Pressable
          style={[
            styles.button, 
            styles.nextButton,
            saving && styles.buttonDisabled
          ]}
          onPress={currentStep === 3 ? handleSave : () => setCurrentStep(currentStep + 1)}
          disabled={saving}
        >
          <Text style={styles.buttonText}>
            {currentStep === 3 ? (saving ? 'Saving...' : 'Save & Preview') : 'Next'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... existing styles remain the same
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
  buttonDisabled: {
    opacity: 0.7,
  },
});