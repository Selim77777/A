import React from 'react';
import ExerciseHandler from '/src/components/ExerciseHandler.jsx'; // Using absolute path
 
const LessonContent = ({ content }) => {
  if (!content) {
 return <p>No lesson content available.</p>;
  }

  return (
 <div className="space-y-8">
      {Array.isArray(content) && content.map((item, index) => (
 <React.Fragment key={index}>
          {/* Render Rules */}
 {item.type === 'rules' && Array.isArray(item.items) && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Rules</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                {item.items.map((rule, ruleIndex) => (
                  <li key={ruleIndex}>{rule}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Render Rules (Alternative structure from 'rule' type) */}
 {item.type === 'rule' && (
 <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
 {item.title && <h3 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h3>}
 {item.description && <p className="text-gray-700 mb-3">{item.description}</p>}
 {item.examples && Array.isArray(item.examples) && item.examples.length > 0 && (
 <div className="space-y-2 text-gray-700">
 <p className="font-semibold">Examples:</p>
 <ul className="list-disc list-inside">
                      {item.examples.map((example, exampleIndex) => (
 <li key={exampleIndex}>{example}</li>
 ))}\n </ul>
 </div>
 )}\n </div>
          )}
 {/* Render Examples */}
 {item.type === 'examples' && Array.isArray(item.items) && (
 <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
 <h3 className="text-2xl font-semibold text-gray-800 mb-4">Examples</h3>
 <div className="space-y-4">
                {item.items.map((example, exampleIndex) => (
 <div key={exampleIndex} className="bg-white p-4 rounded-md border border-gray-200">
                    {example.sentence && <p>{example.sentence}</p>}
                    {example.translation && <p className="text-gray-500 text-sm mt-1">{example.translation}</p>}
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Render Vocabulary (Alternative structure from 'vocabulary' type) */}
 {item.type === 'vocabulary' && Array.isArray(item.items) && (
 <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
 {item.title && <h3 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h3>}
 {!item.title && <h3 className="text-2xl font-semibold text-gray-800 mb-4">Vocabulary</h3>} {/* Default title if not provided */}
 {item.items && Array.isArray(item.items) && item.items.length > 0 && (
 <ul className="list-disc list-inside space-y-3 text-gray-700">
                      {item.items.map((vocab, vocabIndex) => (
 <li key={vocabIndex}>
 <strong>{vocab.word}:</strong> {vocab.meaning} (
 <span className="text-gray-500">{vocab.pronunciation}</span>)
 </li>
 ))}
 </ul>
 )}
 </div>
 )}


          {/* Render Vocabulary List */}
 {item.type === 'vocabList' && Array.isArray(item.items) && (
 <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
 <h3 className="text-2xl font-semibold text-gray-800 mb-4">Vocabulary</h3>
 <ul className="list-disc list-inside space-y-3 text-gray-700">
                {item.items.map((vocab, vocabIndex) => (
 <li key={vocabIndex}>
 <strong>{vocab.word}:</strong> {vocab.meaning} (
 <span className="text-gray-500">{vocab.pronunciation}</span>)
 </li>
 ))}
 </ul>
 </div>
 )}

          {/* Render Dialogues/Reading Content */}
 {item.type === 'dialogues' && Array.isArray(item.items) && (
 <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
 <h3 className="text-2xl font-semibold text-gray-800 mb-4">Reading/Dialogue</h3>
 <div className="space-y-4">
                {item.items.map((dialogue, dialogueIndex) => (
 <div key={dialogueIndex} className="bg-white p-4 rounded-md border border-gray-200">
                    {dialogue.title && <h4 className="text-xl font-semibold text-gray-800 mb-3">{dialogue.title}</h4>}
                    {dialogue.conversation && Array.isArray(dialogue.conversation) && (
 <div className="space-y-2 text-gray-700">
                        {dialogue.conversation.map((line, lineIndex) => (
 <p key={lineIndex}><strong>{line.speaker}:</strong> {line.text}</p>
 ))}
 </div>
 )}
 </div>
 ))}
 </div>
 </div>
 )}

          {/* Render Exercises */}
 {item.type === 'exercises' && Array.isArray(item.items) && (
 <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border-l-4 border-yellow-400">
 <h3 className="text-2xl font-semibold text-gray-800 mb-6">Interactive Exercises</h3>
 {item.items && Array.isArray(item.items) && item.items.length > 0 && (
 <ExerciseHandler exercises={item.items} exerciseType={item.exerciseType} />
 )}
 </div>
 )}

          {/* Render Skills Development - Assuming skills content is structured with 'data' property */}
 {item.type === 'skills' && item.data && (
 <div className="bg-blue-50 p-6 rounded-lg shadow-sm border-l-4 border-blue-400">
 {item.title && <h3 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h3>}
 {!item.title && <h3 className="text-2xl font-semibold text-gray-800 mb-4">Skills Development</h3>} {/* Default title */}
 <div className="space-y-3 text-gray-700">
 {item.data.listening && <p><strong>Listening:</strong> {item.data.listening}</p>}\n {item.data.speaking && <p><strong>Speaking:</strong> {item.data.speaking}</p>}\n {item.data.reading && <p><strong>Reading:</strong> {item.data.reading}</p>}\n {item.data.writing && <p><strong>Writing:</strong> {item.data.writing}</p>}
 </div>
 </div>
 )}

          {/* Render IELTS Preparation - Assuming ieltsPrep content is structured with 'data' property */}
 {item.type === 'ieltsPrep' && item.data && (
 <div className="bg-purple-50 p-6 rounded-lg shadow-sm border-l-4 border-purple-400">
 {item.title && <h3 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h3>}
 {!item.title && <h3 className="text-2xl font-semibold text-gray-800 mb-4">IELTS Preparation</h3>} {/* Default title */}
 <p className="text-gray-700">{item.data}</p>
 </div>
 )}

          {/* Render Recommended Resources - Assuming resources content is structured with 'items' array */}
 {item.type === 'resources' && Array.isArray(item.items) && item.items.length > 0 && (
 <div className="bg-green-50 p-6 rounded-lg shadow-sm border-l-4 border-green-400">
 {item.title && <h3 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h3>}
 {!item.title && <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recommended Resources</h3>} {/* Default title */}
 <ul className="list-disc list-inside space-y-3 text-gray-700">
                      {item.items.map((resource, resourceIndex) => (
 <li key={resourceIndex}>
 <a
 href={resource.url}
 target="_blank"
 rel="noopener noreferrer"
 className="text-blue-600 hover:underline"
 >
                          {resource.name || resource.label || resource.url} {/* Use name, label, or url for link text */}
 </a>
 </li>
 ))}
 </ul>
 </div>
 )}

          {/* Add cases for other content types if they appear */}
          {/*
            default:
              return (
                <div key={index} className="bg-red-100 p-4 rounded-md">
                  <p className="text-red-800">Unknown content type: {item.type}</p>
                </div>
              );
          */} 
 </React.Fragment>
      ))}
      {!Array.isArray(content) && (
        <p className="text-red-500">Error: Lesson content is not in the expected array format.</p>
      )}
    </div>
  );
};
export default LessonContent;