// Mock chat service — simulates the backend's adaptive questioning system.
// Replace the fetchNextQuestion call with a real API call when the backend is ready.

const RED_FLAG_KEYWORDS = [
  'suicidal', 'suicide', 'kill myself',
  'chest pain', 'heart attack',
  'bleeding heavily', 'hemorrhage',
  'can\'t breathe', 'cannot breathe', 'difficulty breathing', 'breathless',
  'unconscious', 'fainted', 'seizure',
  'severe headache', 'worst headache',
];

const BASE_QUESTIONS = [
  {
    id: 'q1',
    text: 'Hello! I\'m MediKiosk, your digital health assistant. What brings you in today? Please describe your main concern.',
    type: 'text', // 'text' | 'voice' | 'chips'
    inputHint: 'Describe your symptoms or reason for visit...',
  },
  {
    id: 'q2',
    text: 'How long have you been experiencing this? When did it first start?',
    type: 'text',
    inputHint: 'e.g., 3 days ago, since last week...',
  },
  {
    id: 'q3',
    text: 'How would you rate the severity of your symptoms?',
    type: 'chips',
    chips: ['Mild', 'Moderate', 'Severe', 'Very Severe'],
  },
  {
    id: 'q4',
    text: 'Is this a new symptom or something you\'ve experienced before?',
    type: 'chips',
    chips: ['New / First time', 'Happened before', 'Ongoing / Chronic'],
  },
  {
    id: 'q5',
    text: 'Do you have any of the following associated symptoms? Select all that apply.',
    type: 'chips',
    chips: ['Fever', 'Nausea/Vomiting', 'Fatigue', 'Body aches', 'Loss of appetite', 'Dizziness', 'None of these'],
    multiSelect: true,
  },
  {
    id: 'q6',
    text: 'Do you have any pre-existing medical conditions?',
    type: 'chips',
    chips: ['Diabetes', 'Hypertension', 'Asthma', 'Heart disease', 'Thyroid disorder', 'None'],
    multiSelect: true,
  },
  {
    id: 'q7',
    text: 'Are you currently taking any medications? If yes, please list them.',
    type: 'text',
    inputHint: 'e.g., Metformin 500mg, Amlodipine 5mg, or "None"',
  },
  {
    id: 'q8',
    text: 'Do you have any known drug allergies?',
    type: 'text',
    inputHint: 'e.g., Penicillin, Sulfa drugs, or "No known allergies"',
  },
  {
    id: 'q9',
    text: 'Does anyone in your family have a history of similar conditions or major illnesses?',
    type: 'text',
    inputHint: 'e.g., Father has diabetes, Mother had breast cancer...',
  },
  {
    id: 'q10',
    text: 'Thank you for answering all the questions. Your responses have been recorded and a clinical summary is being prepared for the doctor. You can now upload any prescriptions or lab reports if you have them.',
    type: 'final',
  },
];

// Chest pain follow-up branch
const CHEST_PAIN_FOLLOWUP = [
  {
    id: 'cp1',
    text: '⚠️ You mentioned chest pain. Can you describe it — is it sharp, dull, or a pressure/squeezing sensation?',
    type: 'chips',
    chips: ['Sharp/Stabbing', 'Dull ache', 'Pressure/Squeezing', 'Burning'],
  },
  {
    id: 'cp2',
    text: 'Does the pain spread to your arm, jaw, neck, or back?',
    type: 'chips',
    chips: ['Yes — left arm', 'Yes — jaw/neck', 'Yes — back', 'No, stays in chest'],
  },
  {
    id: 'cp3',
    text: 'Does the pain get worse with physical activity, deep breathing, or at rest?',
    type: 'chips',
    chips: ['With activity', 'With deep breathing', 'At rest', 'All the time'],
  },
];

class MockChatService {
  constructor() {
    this.questionIndex = 0;
    this.answers = [];
    this.isRedFlagged = false;
    this.useChestPainBranch = false;
    this.chestPainIndex = 0;
    this.questionQueue = [...BASE_QUESTIONS];
  }

  checkRedFlags(answer) {
    const lower = answer.toLowerCase();
    return RED_FLAG_KEYWORDS.some(keyword => lower.includes(keyword));
  }

  async fetchNextQuestion(userAnswer) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

    if (userAnswer) {
      this.answers.push(userAnswer);

      // Check for red flags
      const answerText = typeof userAnswer === 'string' ? userAnswer : userAnswer.join(', ');
      if (this.checkRedFlags(answerText)) {
        this.isRedFlagged = true;
      }

      // Branch for chest pain
      if (answerText.toLowerCase().includes('chest pain') && !this.useChestPainBranch) {
        this.useChestPainBranch = true;
        this.chestPainIndex = 0;
        // Insert chest pain questions after current position
        this.questionQueue.splice(
          this.questionIndex,
          0,
          ...CHEST_PAIN_FOLLOWUP
        );
      }
    }

    // Get next question
    if (this.questionIndex >= this.questionQueue.length) {
      return null; // No more questions
    }

    const question = this.questionQueue[this.questionIndex];
    this.questionIndex++;

    return {
      ...question,
      isRedFlagged: this.isRedFlagged,
    };
  }

  getAnswers() {
    return this.answers;
  }

  getSummary() {
    return {
      chiefComplaint: this.answers[0] || 'Not provided',
      duration: this.answers[1] || 'Not provided',
      severity: this.answers[2] || 'Not provided',
      isNew: this.answers[3] || 'Not provided',
      associatedSymptoms: this.answers[4] || 'None',
      pmh: this.answers[5] || 'None',
      medications: this.answers[6] || 'None',
      allergies: this.answers[7] || 'No known allergies',
      familyHistory: this.answers[8] || 'Not provided',
      isRedFlagged: this.isRedFlagged,
    };
  }

  reset() {
    this.questionIndex = 0;
    this.answers = [];
    this.isRedFlagged = false;
    this.useChestPainBranch = false;
    this.chestPainIndex = 0;
    this.questionQueue = [...BASE_QUESTIONS];
  }
}

export default MockChatService;
