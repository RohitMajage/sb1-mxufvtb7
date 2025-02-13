import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';

type FormData = {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    school: string;
    degree: string;
    graduationDate: string;
  }[];
  skills: string[];
};

const initialFormData: FormData = {
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
};

export default function BuildResumeScreen() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);

  const updatePersonalInfo = (field: keyof FormData['personalInfo'], value: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }));
  };

  const updateExperience = (index: number, field: keyof FormData['experience'][0], value: string) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          school: '',
          degree: '',
          graduationDate: '',
        },
      ],
    }));
  };

  const updateEducation = (index: number, field: keyof FormData['education'][0], value: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, ''],
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) =>
        i === index ? value : skill
      ),
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.personalInfo.fullName}
              onChangeText={(value) => updatePersonalInfo('fullName', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.personalInfo.email}
              onChangeText={(value) => updatePersonalInfo('email', value)}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={formData.personalInfo.phone}
              onChangeText={(value) => updatePersonalInfo('phone', value)}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={formData.personalInfo.location}
              onChangeText={(value) => updatePersonalInfo('location', value)}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Professional Summary"
              value={formData.summary}
              onChangeText={(value) => setFormData(prev => ({ ...prev, summary: value }))}
              multiline
              numberOfLines={4}
            />
          </View>
        );
      case 1:
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {formData.experience.map((exp, index) => (
              <View key={index} style={styles.subsection}>
                <TextInput
                  style={styles.input}
                  placeholder="Company"
                  value={exp.company}
                  onChangeText={(value) => updateExperience(index, 'company', value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Position"
                  value={exp.position}
                  onChangeText={(value) => updateExperience(index, 'position', value)}
                />
                <View style={styles.row}>
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChangeText={(value) => updateExperience(index, 'startDate', value)}
                  />
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="End Date"
                    value={exp.endDate}
                    onChangeText={(value) => updateExperience(index, 'endDate', value)}
                  />
                </View>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Description"
                  value={exp.description}
                  onChangeText={(value) => updateExperience(index, 'description', value)}
                  multiline
                  numberOfLines={4}
                />
              </View>
            ))}
            <Pressable style={styles.addButton} onPress={addExperience}>
              <Text style={styles.addButtonText}>Add Experience</Text>
            </Pressable>
          </View>
        );
      case 2:
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {formData.education.map((edu, index) => (
              <View key={index} style={styles.subsection}>
                <TextInput
                  style={styles.input}
                  placeholder="School"
                  value={edu.school}
                  onChangeText={(value) => updateEducation(index, 'school', value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Degree"
                  value={edu.degree}
                  onChangeText={(value) => updateEducation(index, 'degree', value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Graduation Date"
                  value={edu.graduationDate}
                  onChangeText={(value) => updateEducation(index, 'graduationDate', value)}
                />
              </View>
            ))}
            <Pressable style={styles.addButton} onPress={addEducation}>
              <Text style={styles.addButtonText}>Add Education</Text>
            </Pressable>
          </View>
        );
      case 3:
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {formData.skills.map((skill, index) => (
              <TextInput
                key={index}
                style={styles.input}
                placeholder="Skill"
                value={skill}
                onChangeText={(value) => updateSkill(index, value)}
              />
            ))}
            <Pressable style={styles.addButton} onPress={addSkill}>
              <Text style={styles.addButtonText}>Add Skill</Text>
            </Pressable>
          </View>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/preview');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.stepsContainer}>
          {['Personal Info', 'Experience', 'Education', 'Skills'].map((step, index) => (
            <View
              key={index}
              style={[
                styles.stepIndicator,
                currentStep === index && styles.activeStep,
                currentStep > index && styles.completedStep,
              ]}
            >
              <Text
                style={[
                  styles.stepText,
                  (currentStep === index || currentStep > index) && styles.activeStepText,
                ]}
              >
                {index + 1}
              </Text>
            </View>
          ))}
        </View>
        {renderStep()}
      </ScrollView>
      <View style={styles.buttonContainer}>
        {currentStep > 0 && (
          <Pressable style={[styles.button, styles.backButton]} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </Pressable>
        )}
        <Pressable
          style={[styles.button, styles.nextButton]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {currentStep === 3 ? 'Preview Resume' : 'Next'}
          </Text>
        </Pressable>
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
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  stepIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    backgroundColor: '#007AFF',
  },
  completedStep: {
    backgroundColor: '#4CD964',
  },
  stepText: {
    color: '#666',
    fontWeight: '600',
  },
  activeStepText: {
    color: '#fff',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  subsection: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  addButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});