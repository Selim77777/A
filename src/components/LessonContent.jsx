import React from 'react';
import ExerciseHandler from '/src/components/ExerciseHandler.jsx'; // Using absolute path

const LessonContent = ({ content }) => {
  if (!content) {
    return <p>No lesson content available.</p>;
  }

  return (
    <div className="space-y-8"> {/* Added class for spacing between sections */}
      {/* Render Rules */}
      {content.rules && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm"> {/* Added styling for section container */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Rules</h3> {/* Added styling for heading */}
          <ul className="list-disc list-inside space-y-3 text-gray-700"> {/* Added styling for list */}
            {content.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Render Examples */}
      {content.examples && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm"> {/* Added styling for section container */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Examples</h3> {/* Added styling for heading */}
          <div className="space-y-4"> {/* Added spacing between examples */}
            {content.examples.map((example, index) => (
              <div key={index} className="bg-white p-4 rounded-md border border-gray-200"> {/* Added styling for example block */}
                {example.positive && <p>Positive: {example.positive}</p>}
                {example.negative && <p>Negative: {example.negative}</p>}
                {example.question && <p>Question: {example.question}</p>}
              </div>
            ))}
          </div>
        </div> 
      )}

      {/* Render Vocabulary */}
      {content.vocabulary && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm"> {/* Added styling for section container */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Vocabulary</h3> {/* Added styling for heading */}
          <ul className="list-disc list-inside space-y-3 text-gray-700"> {/* Added styling for list */}
            {content.vocabulary.map((vocab, index) => (
              <li key={index}><strong>{vocab.word}:</strong> {vocab.meaning} (<span className="text-gray-500">{vocab.pronunciation}</span>)</li> {/* Styled pronunciation */}
            ))}
          </ul>
        </div>
      )}

      {/* Render Dialogues/Reading Content */}
      {content.dialogues && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm"> {/* Added styling for section container */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Reading/Dialogue</h3> {/* Added styling for heading */}
          <div className="space-y-4"> {/* Added spacing between dialogues */}
            {content.dialogues.map((dialogue, index) => (
              <div key={index} className="bg-white p-4 rounded-md border border-gray-200"> {/* Added styling for dialogue block */}
                {dialogue.title && <h4 className="text-xl font-semibold text-gray-800 mb-3">{dialogue.title}</h4>} {/* Added styling for dialogue title */}
                {dialogue.conversation && ( {/* Added styling for conversation */}
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

      {/* Render Skills Development */}
      {content.skills && (
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm border-l-4 border-blue-400"> {/* Added styling for skills section */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Skills Development</h3> {/* Added styling for heading */}
          <div className="space-y-3 text-gray-700"> {/* Added spacing */}
            {content.skills.listening && <p><strong>Listening:</strong> {content.skills.listening}</p>}
            {content.skills.speaking && <p><strong>Speaking:</strong> {content.skills.speaking}</p>}
            {content.skills.reading && <p><strong>Reading:</strong> {content.skills.reading}</p>}
            {content.skills.writing && <p><strong>Writing:</strong> {content.skills.writing}</p>}
          </div>
        </div>
      )}

      {/* Render IELTS Preparation */}
      {content.ieltsPrep && (
        <div className="bg-purple-50 p-6 rounded-lg shadow-sm border-l-4 border-purple-400"> {/* Added styling for IELTS section */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">IELTS Preparation</h3> {/* Added styling for heading */}
          <p className="text-gray-700">{content.ieltsPrep}</p> {/* Added styling for text */}
        </div>
      )}

      {/* Render Recommended Resources */}
      {content.resources && (
        <div className="bg-green-50 p-6 rounded-lg shadow-sm border-l-4 border-green-400"> {/* Added styling for resources section */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recommended Resources</h3> {/* Added styling for heading */}
          <ul className="list-disc list-inside space-y-3 text-gray-700"> {/* Added styling for list */}
            {content.resources.map((resource, index) => (
              <li key={index}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline" // Added styling for links
                >
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Render Exercises - Basic rendering */}
      {content.exercises && (
        <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border-l-4 border-yellow-400"> {/* Added styling for exercises section */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Interactive Exercises</h3> {/* Updated heading */}
          <ExerciseHandler exercises={content.exercises} /> {/* Render ExerciseHandler */}
        </div>
      )}

      {/* Add rendering for other content types as needed */}
      {/* For example, content.skills, content.ieltsPrep, content.resources could be added here */}

    </div>
  );
};

export default LessonContent;