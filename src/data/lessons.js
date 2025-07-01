export const lessons = [
  {
    id: 1,
    title: "Basic Greetings & Introductions",
    category: "Speaking",
    level: "Beginner",
    duration: "15 min",
    description: "Learn essential greetings and how to introduce yourself confidently.",
    objectives: [
      "Master common greetings in different contexts",
      "Practice self-introduction techniques",
      "Understand formal vs informal language"
    ],
    content: {
      vocabulary: [
        { word: "Hello", pronunciation: "/həˈloʊ/", meaning: "A greeting used when meeting someone" },
        { word: "Goodbye", pronunciation: "/ɡʊdˈbaɪ/", meaning: "A farewell expression" },
        { word: "Please", pronunciation: "/pliːz/", meaning: "Used to make a polite request" },
        { word: "Thank you", pronunciation: "/θæŋk juː/", meaning: "Expression of gratitude" }
      ],
      dialogues: [
        {
          title: "Meeting Someone New",
          conversation: [
            { speaker: "A", text: "Hello! My name is Sarah. What's your name?" },
            { speaker: "B", text: "Hi Sarah! I'm David. Nice to meet you." },
            { speaker: "A", text: "Nice to meet you too, David. Where are you from?" },
            { speaker: "B", text: "I'm from Canada. How about you?" }
          ]
        }
      ],
      exercises: [
        {
          type: "fill-blank",
          question: "Complete the dialogue: 'Hello! My name is ___. What's your name?'",
          answer: "Sarah",
          options: ["Sarah", "David", "Canada", "Hello"]
        }
      ]
    },
    completed: true,
    score: 95
  },
  {
    id: 2,
    title: "Present Simple Tense",
    category: "Grammar",
    level: "Beginner",
    duration: "20 min",
    description: "Master the present simple tense for daily routines and facts.",
    objectives: [
      "Understand present simple structure",
      "Practice with daily routines",
      "Learn question formation"
    ],
    content: {
      rules: [
        "Use base form of verb for I, you, we, they",
        "Add -s/-es for he, she, it",
        "Use 'do/does' for questions and negatives"
      ],
      examples: [
        { positive: "I work every day", negative: "I don't work on weekends", question: "Do you work here?" },
        { positive: "She speaks English", negative: "She doesn't speak French", question: "Does she speak Spanish?" }
      ],
      exercises: [
        {
          type: "multiple-choice",
          question: "Choose the correct form: 'He ___ to school every day.'",
          options: ["go", "goes", "going", "went"],
          answer: "goes"
        }
      ]
    },
    completed: true,
    score: 88
  },
  {
    id: 3,
    title: "Food & Restaurant Vocabulary",
    category: "Vocabulary",
    level: "Intermediate",
    duration: "25 min",
    description: "Expand your food vocabulary and learn restaurant expressions.",
    objectives: [
      "Learn food and drink vocabulary",
      "Practice ordering at restaurants",
      "Understand menu descriptions"
    ],
    content: {
      vocabulary: [
        { word: "Appetizer", pronunciation: "/ˈæpɪˌtaɪzər/", meaning: "A small dish served before the main course" },
        { word: "Entrée", pronunciation: "/ˈɑːntreɪ/", meaning: "The main course of a meal" },
        { word: "Dessert", pronunciation: "/dɪˈzɜːrt/", meaning: "Sweet course served at the end of a meal" }
      ],
      phrases: [
        "I'd like to make a reservation",
        "Could I see the menu, please?",
        "I'll have the chicken, please",
        "Could we get the check, please?"
      ],
      exercises: [
        {
          type: "matching",
          question: "Match the restaurant phrases with their meanings",
          pairs: [
            { phrase: "I'd like to make a reservation", meaning: "Book a table" },
            { phrase: "Could we get the check?", meaning: "Ask for the bill" }
          ]
        }
      ]
    },
    completed: false,
    score: null
  },
  {
    id: 4,
    title: "Past Tense Storytelling",
    category: "Grammar",
    level: "Intermediate",
    duration: "30 min",
    description: "Learn to tell stories and describe past events using past tenses.",
    objectives: [
      "Master regular and irregular past tense",
      "Practice storytelling techniques",
      "Use time expressions correctly"
    ],
    content: {
      rules: [
        "Regular verbs: add -ed (walked, talked, played)",
        "Irregular verbs: memorize forms (go-went, see-saw, have-had)",
        "Use time expressions: yesterday, last week, ago"
      ],
      exercises: [
        {
          type: "story-completion",
          question: "Complete the story using past tense verbs",
          story: "Yesterday, I ___ (go) to the park and ___ (see) my friend.",
          answers: ["went", "saw"]
        }
      ]
    },
    completed: false,
    score: null
  },
  {
    id: 5,
    title: "Business English Basics",
    category: "Professional",
    level: "Advanced",
    duration: "35 min",
    description: "Essential business vocabulary and professional communication skills.",
    objectives: [
      "Learn business vocabulary",
      "Practice formal email writing",
      "Understand meeting etiquette"
    ],
    content: {
      vocabulary: [
        { word: "Deadline", pronunciation: "/ˈdedlaɪn/", meaning: "The latest time by which something must be completed" },
        { word: "Agenda", pronunciation: "/əˈdʒendə/", meaning: "A list of items to be discussed at a meeting" }
      ],
      phrases: [
        "I'd like to schedule a meeting",
        "Could you please send me the report?",
        "Let's move on to the next item",
        "I'll get back to you on that"
      ]
    },
    completed: false,
    score: null
  },
  {
    id: 6,
    title: "Listening Comprehension: Daily Life",
    category: "Listening",
    level: "Intermediate",
    duration: "20 min",
    description: "Improve listening skills with real-life conversations and scenarios.",
    objectives: [
      "Understand natural speech patterns",
      "Practice listening for specific information",
      "Develop note-taking skills"
    ],
    content: {
      audioScripts: [
        {
          title: "At the Doctor's Office",
          script: "Patient: Good morning, I have an appointment at 10 AM. Receptionist: Yes, please take a seat. The doctor will see you shortly."
        }
      ],
      exercises: [
        {
          type: "listening-comprehension",
          question: "What time is the patient's appointment?",
          options: ["9 AM", "10 AM", "11 AM", "12 PM"],
          answer: "10 AM"
        }
      ]
    },
    completed: false,
    score: null
  }
];

export const categories = [
  { name: "Grammar", icon: "📚", color: "bg-blue-500", count: 2 },
  { name: "Vocabulary", icon: "📝", color: "bg-green-500", count: 1 },
  { name: "Speaking", icon: "🗣️", color: "bg-purple-500", count: 1 },
  { name: "Listening", icon: "👂", color: "bg-orange-500", count: 1 },
  { name: "Professional", icon: "💼", color: "bg-red-500", count: 1 }
];