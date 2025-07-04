export const categories = [
  { name: 'Grammar', icon: '📚', color: 'bg-blue-500', count: 2 },
  { name: 'Vocabulary', icon: '📝', color: 'bg-green-500', count: 1 },
  { name: 'Reading', icon: '📖', color: 'bg-red-500', count: 1 },
  { name: 'Listening', icon: '👂', color: 'bg-purple-500', count: 1 },
  { name: 'Speaking', icon: '🗣️', color: 'bg-orange-500', count: 0 },
];

export const lessons = [
  {
    id: 1,
    title: 'Introduction to Present Simple',
    description: 'Learn the basics of the Present Simple tense, how to form it, and when to use it for daily routines and facts.',
    level: 'Beginner',
    category: 'Grammar',
    duration: '15 min',
    completed: true,
    score: 90,
    objectives: [
      'Understand the structure of the Present Simple tense.',
      'Use Present Simple for habits and routines.',
      'Form positive, negative, and question sentences.'
    ],
    content: {
      rules: [
        'For I, you, we, they, use the base form of the verb (e.g., "I go").',
        'For he, she, it, add -s, -es, or -ies to the verb (e.g., "She goes").',
        'For negative sentences, use do/does + not + base verb (e.g., "They do not go").',
        'For questions, use Do/Does + subject + base verb (e.g., "Do you go?").'
      ],
      examples: [
        {
          positive: 'I play tennis every Sunday.',
          negative: 'He does not play tennis.',
          question: 'Do you play tennis?'
        },
        {
          positive: 'The sun rises in the east.',
          negative: 'The sun does not rise in the west.',
          question: 'Does the sun rise in the east?'
        }
      ],
      exercises: [
        {
          type: 'multiple-choice',
          question: 'Which sentence is correct?',
          options: ['She play the piano.', 'She plays the piano.', 'She is play the piano.', 'She playing the piano.'],
          answer: 'She plays the piano.',
          category: 'grammar'
        }
      ]
    }
  },
  {
    id: 2,
    title: 'Common Daily Verbs',
    description: 'Expand your vocabulary with essential verbs used in everyday conversations and activities.',
    level: 'Beginner',
    category: 'Vocabulary',
    duration: '10 min',
    completed: false,
    score: null,
    objectives: [
      'Learn 10 new common verbs.',
      'Understand the meaning and pronunciation of each verb.',
      'Use the new verbs in example sentences.'
    ],
    content: {
      vocabulary: [
        { word: 'eat', pronunciation: '/iːt/', meaning: 'To put food into the mouth and chew and swallow it.' },
        { word: 'sleep', pronunciation: '/sliːp/', meaning: 'To rest your mind and body by closing your eyes.' },
        { word: 'walk', pronunciation: '/wɔːk/', meaning: 'To move along on foot.' },
        { word: 'read', pronunciation: '/riːd/', meaning: 'To look at and comprehend the meaning of written matter.' },
        { word: 'write', pronunciation: '/raɪt/', meaning: 'To mark letters, words, or other symbols on a surface.' }
      ]
    }
  },
  {
    id: 3,
    title: 'Understanding Past Simple',
    description: 'Master the Past Simple tense to talk about completed actions and events in the past.',
    level: 'Intermediate',
    category: 'Grammar',
    duration: '20 min',
    completed: true,
    score: 85,
    objectives: [
      'Differentiate between regular and irregular verbs.',
      'Form positive and negative sentences in the Past Simple.',
      'Ask questions about past events.'
    ],
    content: {
      rules: [
        'For regular verbs, add -ed to the base form (e.g., "walked").',
        'Irregular verbs have unique past tense forms (e.g., "go" -> "went").',
        'For negatives and questions, use "did" + not + base verb (e.g., "I did not go", "Did you go?").'
      ],
      examples: [
        {
          positive: 'They visited Paris last year.',
          negative: 'She did not see the movie.',
          question: 'Did you finish your homework?'
        }
      ],
      exercises: [
        {
          type: 'multiple-choice',
          question: 'What is the past tense of "go"?',
          options: ['Goed', 'Gone', 'Went', 'Going'],
          answer: 'Went',
          category: 'grammar'
        }
      ]
    }
  },
  {
    id: 4,
    title: 'Reading a Short Story',
    description: 'Improve your reading comprehension by analyzing a short story and its key elements.',
    level: 'Intermediate',
    category: 'Reading',
    duration: '25 min',
    completed: false,
    score: null,
    objectives: [
      'Identify the main idea and supporting details.',
      'Understand new vocabulary in context.',
      'Answer questions about the story\'s plot and characters.'
    ],
    content: {
      dialogues: [
        {
          title: 'The Gift of the Forest',
          conversation: [
            { speaker: 'Narrator', text: 'Once upon a time, in a small village, lived a girl named Elara. She loved the forest behind her house.' },
            { speaker: 'Narrator', text: 'One day, she found a small, injured bird. She carefully picked it up and took it home to care for it.' },
            { speaker: 'Narrator', text: 'After a week, the bird was strong again. Elara took it to the forest and let it fly away. The bird chirped a happy song as it flew into the trees.' }
          ]
        }
      ],
      exercises: [
        {
          type: 'multiple-choice',
          question: 'What did Elara find in the forest?',
          options: ['A flower', 'An injured bird', 'A lost dog', 'A shiny rock'],
          answer: 'An injured bird',
          category: 'reading'
        }
      ]
    }
  },
  {
    id: 5,
    title: 'Listening to a Weather Forecast',
    description: 'Practice your listening skills by understanding a typical weather forecast.',
    level: 'Advanced',
    category: 'Listening',
    duration: '10 min',
    completed: false,
    score: null,
    objectives: [
      'Identify key weather-related vocabulary.',
      'Understand predictions for temperature and conditions.',
      'Extract specific information from an audio clip.'
    ],
    content: {
      vocabulary: [
        { word: 'forecast', pronunciation: '/ˈfɔːrkæst/', meaning: 'A prediction of what the weather will be like.' },
        { word: 'temperature', pronunciation: '/ˈtemprətʃər/', meaning: 'The degree of heat or cold.' },
        { word: 'precipitation', pronunciation: '/prɪˌsɪpɪˈteɪʃn/', meaning: 'Rain, snow, sleet, or hail that falls to the ground.' }
      ]
    }
  }
];