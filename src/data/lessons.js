export const categories = [
  { name: 'Grammar', icon: '📚', color: 'bg-blue-500', count: 6 },
  { name: 'Vocabulary', icon: '📝', color: 'bg-green-500', count: 6 },
  { name: 'Reading', icon: '📖', color: 'bg-red-500', count: 3 },
  { name: 'Listening', icon: '👂', color: 'bg-purple-500', count: 2 },
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
  },
  {
    id: 6,
    title: 'Beginner Grammar: To be, Present Simple/Continuous',
    description: 'Learn the fundamental grammar points for beginners: the verb "to be", Present Simple, and Present Continuous.',
    level: 'Beginner',
    category: 'Grammar',
    duration: '30 min',
    completed: false,
    score: null,
    objectives: [
      'Understand and use the verb "to be" in different forms.',
      'Differentiate and use Present Simple and Present Continuous.',
      'Form basic sentences with these tenses.'
    ],
    content: {
      rules: [
        'To be: I am, You/We/They are, He/She/It is.',
        'Present Simple: for habits, routines, facts (I play, She plays).',
        'Present Continuous: for actions happening now (I am playing, She is playing).'
      ],
      examples: [
        { positive: 'I am a student.', negative: 'She is not here.', question: 'Are you ready?' },
        { positive: 'He usually wakes up early.', negative: 'They do not like coffee.', question: 'Does she work here?' },
        { positive: 'I am reading a book now.', negative: 'He is not watching TV.', question: 'Are you listening?' }
      ],
      exercises: [
        { type: 'fill-in-the-blank', question: 'She ____ (be) happy.', answer: 'is', category: 'grammar' },
        { type: 'multiple-choice', question: 'We usually ____ (go) to the park on Sundays.', options: ['go', 'goes', 'going'], answer: 'go', category: 'grammar' },
        { type: 'fill-in-the-blank', question: 'Look! It ____ (rain) outside.', answer: 'is raining', category: 'grammar' }
      ]
    }
  },
  {
    id: 7,
    title: 'Beginner Vocabulary: Introductions and Daily Life',
    description: 'Learn essential vocabulary for introducing yourself, talking about your family, friends, and daily routines.',
    level: 'Beginner',
    category: 'Vocabulary',
    duration: '20 min',
    completed: false,
    score: null,
    objectives: [
      'Learn and use vocabulary for personal information.',
      'Talk about family and friends.',
      'Describe your daily activities.'
    ],
    content: {
      vocabulary: [
        { word: 'hello', pronunciation: '/həˈloʊ/', meaning: 'a greeting' },
        { word: 'goodbye', pronunciation: '/ɡʊdˈbaɪ/', meaning: 'a farewell' },
        { word: 'name', pronunciation: '/neɪm/', meaning: 'what someone is called' },
        { word: 'family', pronunciation: '/ˈfæməli/', meaning: 'parents and children' },
        { word: 'friend', pronunciation: '/frend/', meaning: 'a person you know and like' },
        { word: 'wake up', pronunciation: '/weɪk ʌp/', meaning: 'stop sleeping' },
        { word: 'eat breakfast', pronunciation: '/iːt ˈbrekfəst/', meaning: 'have the first meal of the day' },
        { word: 'go to work/school', pronunciation: '/ɡoʊ tə wɜːrk/skuːl/', meaning: 'travel to your place of work or study' }
      ],
      examples: [
        'Hello, my name is John.',
        'This is my family.',
        'I wake up at 7 AM every day.',
        'She goes to school by bus.'
      ]
    }
  },
  {
    id: 8,
    title: 'Beginner Skills: Basic Communication',
    description: 'Develop fundamental listening and speaking skills for simple interactions.',
    level: 'Beginner',
    category: 'Listening', // Categorizing under Listening as it's a core receptive skill
    duration: '25 min',
    completed: false,
    score: null,
    objectives: [
      'Understand simple questions and statements.',
      'Introduce yourself and ask basic personal questions.',
      'Recognize key words in simple conversations.'
    ],
    content: {
      dialogues: [{ title: 'Introducing Yourself', conversation: [{ speaker: 'A', text: 'Hi, I\'m [Your Name]. Nice to meet you.' }, { speaker: 'B', text: 'Nice to meet you too. I\'m [Other Person\'s Name].' }] }]
    }
  },
  {
    id: 9,
    title: 'Elementary Grammar: Future Forms and Present Perfect',
    description: 'Explore how to talk about the future using "will" and "be going to", and learn the basic use of the Present Perfect for experiences.',
    level: 'Elementary',
    category: 'Grammar',
    duration: '35 min',
    completed: false,
    score: null,
    objectives: [
      'Understand and use "will" for future predictions and spontaneous decisions.',
      'Understand and use "be going to" for future plans and intentions.',
      'Use the Present Perfect to talk about past experiences.'
    ],
    content: {
      rules: [
        'Will: for predictions (It will rain tomorrow) and spontaneous decisions (I will help you).',
        'Be going to: for plans/intentions (I am going to visit my parents) and predictions based on evidence (Look at the clouds, it is going to rain).',
        'Present Perfect: has/have + past participle (I have visited Paris). Used for experiences or actions with a connection to the present.'
      ],
      examples: [
        { future_will: 'I think she will pass the exam.', future_going_to: 'She is going to study medicine.', present_perfect: 'Have you ever been to London?' },
        { future_will: 'Okay, I will call you later.', future_going_to: 'They are going to buy a new car next month.', present_perfect: 'I have never eaten sushi.' }
      ],
      exercises: [
        { type: 'fill-in-the-blank', question: 'I ____ (visit) my grandmother tomorrow. (plan)', answer: 'am going to visit', category: 'grammar' },
        { type: 'multiple-choice', question: 'I\'m tired. I ____ (go) to bed now.', options: ['will go', 'am going to go', 'have gone'], answer: 'will go', category: 'grammar' },
        { type: 'fill-in-the-blank', question: 'She ____ (finish) her homework yet.', answer: 'has not finished', category: 'grammar' }
      ]
    }
  },
  {
    id: 10,
    title: 'Elementary Vocabulary: Hobbies, Shopping, and Health',
    description: 'Learn vocabulary related to hobbies, shopping, describing places, and talking about health and feelings.',
    level: 'Elementary',
    category: 'Vocabulary',
    duration: '25 min',
    completed: false,
    score: null,
    objectives: [
      'Discuss hobbies and free time activities.',
      'Use vocabulary for shopping and describing places.',
      'Talk about health and feelings.'
    ],
    content: {
      vocabulary: [
        { word: 'hobby', pronunciation: '/ˈhɒbi/', meaning: 'an activity done regularly in one\'s leisure time for pleasure.' },
        { word: 'shopping', pronunciation: '/ˈʃɒpɪŋ/', meaning: 'the activity of buying things in shops.' },
        { word: 'park', pronunciation: '/pɑːrk/', meaning: 'a large public green area in a town, used for recreation.' },
        { word: 'cinema', pronunciation: '/ˈsɪnəmə/', meaning: 'a movie theater.' },
        { word: 'healthy', pronunciation: '/ˈhelθi/', meaning: 'in good physical or mental condition.' },
        { word: 'happy', pronunciation: '/ˈhæpi/', meaning: 'feeling or showing pleasure.' },
        { word: 'sad', pronunciation: '/sæd/', meaning: 'feeling or showing sorrow; unhappy.' }
      ],
      examples: [
        'My hobby is reading.',
        'Let\'s go shopping.',
        'The park is very big.',
        'I am feeling healthy today.',
        'She looks happy.'
      ]
    }
  },
  {
    id: 11,
    title: 'Elementary Skills: Conversations and Descriptions',
    description: 'Develop your ability to understand short conversations, describe past events, and give simple opinions and directions.',
    level: 'Elementary',
    category: 'Reading', // Categorizing under Reading/Listening/Speaking as they are integrated
    duration: '30 min',
    completed: false,
    score: null,
    objectives: [
      'Understand the main ideas in short conversations.',
      'Describe past events using simple past tense.',
      'Give basic opinions on familiar topics.',
      'Give and follow simple directions.'
    ],
    content: {
      dialogues: [
        {
          title: 'A Weekend Chat',
          conversation: [
            { speaker: 'A', text: 'Hi! How was your weekend?' },
            { speaker: 'B', text: 'It was good! I went to the park with my family.' },
            { speaker: 'A', text: 'Oh, nice! Did you do anything else?' },
            { speaker: 'B', text: 'Yes, we watched a movie on Saturday evening.' }
          ]
        }
      ],
      examples: [
        'Yesterday, I visited my friend.',
        'I think this book is interesting.',
        'Go straight, then turn left at the corner.'
      ],
      exercises: [
        { type: 'comprehension', question: 'What did Person B do on Saturday?', answer: 'Watched a movie', category: 'listening' },
        { type: 'speaking-prompt', question: 'Tell about your last weekend.', category: 'speaking' },
        { type: 'writing-prompt', question: 'Write a short paragraph about your favorite hobby.', category: 'writing' },
        { type: 'multiple-choice', question: 'Which direction do you take to get to the park?', options: ['Turn right', 'Go straight', 'Turn left'], answer: 'Go straight', category: 'reading' } // Assuming a map or dialogue context
      ]
    }
  }
  ,
  {
    id: "lesson-vocab-01",
    title: "Confusing Word Pairs - Part 1",
    description: "Learn to distinguish between commonly confused English word pairs through definitions and examples.",
    level: "Intermediate",
    category: "Vocabulary",
    duration: "15 min",
    objectives: [
      "Understand the differences between similar-looking English words.",
      "Use each word correctly in context.",
      "Reinforce learning through example sentences."
    ],
    content: [
      {
        type: "vocabList",
        items: [
          { word: "advertise", meaning: "to promote a product or service", pronunciation: "/ˈæd.və.taɪz/" },
          { word: "announce", meaning: "to publicly share important information", pronunciation: "/əˈnaʊns/" },
          { word: "tabloid", meaning: "a small newspaper with sensational stories", pronunciation: "/ˈtæb.lɔɪd/" },
          { word: "broadsheet", meaning: "a large, more serious newspaper", pronunciation: "/ˈbrɔːd.ʃiːt/" },
          { word: "incident", meaning: "a minor or unplanned event", pronunciation: "/ˈɪn.sɪ.dənt/" },
          { word: "event", meaning: "a planned, important occasion", pronunciation: "/ɪˈvent/" },
          { word: "win", meaning: "to be victorious in a competition", pronunciation: "/wɪn/" },
          { word: "beat", meaning: "to defeat an opponent", pronunciation: "/biːt/" },
          { word: "borrow", meaning: "to take something for a short time", pronunciation: "/ˈbɒr.əʊ/" },
          { word: "lend", meaning: "to give something temporarily", pronunciation: "/lend/" }
        ]
      },
      {
        type: "examples",
        items: [
          { sentence: "They advertised their product on social media.", translation: "روّجوا منتجهم على وسائل التواصل الاجتماعي." },
          { sentence: "The company announced a new CEO today.", translation: "أعلنت الشركة عن مدير تنفيذي جديد اليوم." },
          { sentence: "The tabloid covered the celebrity scandal.", translation: "غطت الصحيفة الشعبية فضيحة المشاهير." },
          { sentence: "He prefers reading broadsheets for serious news.", translation: "يفضل قراءة الصحف الرسمية للأخبار الجادة." },
          { sentence: "There was a small incident in the lobby.", translation: "حدثت واقعة صغيرة في البهو." },
          { sentence: "The opening event starts at 6 PM.", translation: "يبدأ الحدث الافتتاحي في الساعة 6 مساءً." },
          { sentence: "They won the game!", translation: "لقد فازوا بالمباراة!" },
          { sentence: "We beat the other team by 3 points.", translation: "هزمنا الفريق الآخر بفارق 3 نقاط." },
          { sentence: "Can I borrow your pen?", translation: "هل يمكنني استعارة قلمك؟" },
          { sentence: "I'll lend you some money until payday.", translation: "سأقرضك بعض المال حتى يوم الدفع." }
        ]
      }
    ]
  }
];