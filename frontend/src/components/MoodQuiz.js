import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveMoodAssessment } from '../services/api';
import './MoodQuiz.css';

const quizQuestions = [
  {
    id: 1,
    title: "How does your overall physical and mental energy feel right now?",
    category: "Energy & Vitality",
    options: [
      { text: "Fully charged (80-100%) — Feeling vibrant and capable", score: 4, type: "thriving", icon: "⚡" },
      { text: "Steady & balanced (50-80%) — Comfortable pace, doing okay", score: 3, type: "calm", icon: "🔋" },
      { text: "Low battery (20-50%) — Moving sluggishly, feeling tired", score: 2, type: "weary", icon: "🪫" },
      { text: "Drained / Empty (<20%) — Running on fumes, need quiet recharge", score: 1, type: "overwhelmed", icon: "🔌" }
    ]
  },
  {
    id: 2,
    title: "If your emotional state were today's weather forecast, what would it look like?",
    category: "Emotional Climate",
    options: [
      { text: "Golden sunshine — Warm, bright, and radiant", score: 4, type: "thriving", icon: "☀️" },
      { text: "Mild breeze & gentle clouds — Pleasant, steady, and calm", score: 3, type: "calm", icon: "🌤️" },
      { text: "Misty & overcast — Introspective, hazy, seeking soft quiet", score: 2, type: "reflective", icon: "🌫️" },
      { text: "Stormy & turbulent — Thunderous thoughts and emotional waves", score: 1, type: "overwhelmed", icon: "⛈️" }
    ]
  },
  {
    id: 3,
    title: "How manageable has today's mental load and stress felt?",
    category: "Stress Resilience",
    options: [
      { text: "Light as a feather — Completely unburdened and free", score: 4, type: "thriving", icon: "🪶" },
      { text: "Comfortably balanced — Some demands, but well in control", score: 3, type: "calm", icon: "⚖️" },
      { text: "Carrying a heavy load — Tense at times, but pushing through", score: 2, type: "tense", icon: "🎒" },
      { text: "Overloaded & overwhelmed — Hard to keep up with everything", score: 1, type: "overwhelmed", icon: "🌊" }
    ]
  },
  {
    id: 4,
    title: "How did your mind and body feel when waking up this morning?",
    category: "Rest & Recovery",
    options: [
      { text: "Refreshed & excited — Ready to welcome the day with purpose", score: 4, type: "thriving", icon: "🌅" },
      { text: "Grounded & steady — Smooth morning after decent sleep", score: 3, type: "calm", icon: "☕" },
      { text: "Groggy & lingering — Body wanted another 2 hours of sleep", score: 2, type: "weary", icon: "🥱" },
      { text: "Restless or exhausted — Woke up feeling tense or drained", score: 1, type: "overwhelmed", icon: "🌑" }
    ]
  },
  {
    id: 5,
    title: "What kind of social connection are you feeling drawn toward today?",
    category: "Social Harmony",
    options: [
      { text: "Joyful connection — Eager to laugh, share, and hang out", score: 4, type: "thriving", icon: "💬" },
      { text: "Quiet company — Content chatting with a close trusted friend", score: 3, type: "calm", icon: "☕" },
      { text: "Solo sanctuary — Craving gentle alone time and quiet reading", score: 2, type: "reflective", icon: "📖" },
      { text: "Protective cocoon — Feeling socially depleted, need space", score: 1, type: "weary", icon: "🛡️" }
    ]
  },
  {
    id: 6,
    title: "What tone is your internal dialogue taking most often today?",
    category: "Inner Monologue",
    options: [
      { text: "Uplifting & encouraging — Seeing possibilities and cheering myself on", score: 4, type: "thriving", icon: "🌟" },
      { text: "Rational & mindful — Staying centered in what is right now", score: 3, type: "calm", icon: "🧭" },
      { text: "Deep & contemplative — Wondering, reflecting, and analyzing", score: 2, type: "reflective", icon: "💭" },
      { text: "Critical or anxious — Fast-racing worries or self-doubt", score: 1, type: "overwhelmed", icon: "🌪️" }
    ]
  },
  {
    id: 7,
    title: "How grounded and present do you feel in your body right now?",
    category: "Mindful Presence",
    options: [
      { text: "Deeply anchored — Breathing is slow, senses are clear and calm", score: 4, type: "calm", icon: "🧘" },
      { text: "Mostly present — Focused on the tasks at hand", score: 3, type: "calm", icon: "🎯" },
      { text: "Drifting & daydreaming — Mind keeps wandering elsewhere", score: 2, type: "reflective", icon: "🍃" },
      { text: "Scattered or detached — Hard to stay present or focus", score: 1, type: "overwhelmed", icon: "📴" }
    ]
  },
  {
    id: 8,
    title: "Did you encounter any moments of joy, gratitude, or wonder recently?",
    category: "Gratitude & Joy",
    options: [
      { text: "Abundant moments — Smiled multiple times, felt genuinely thankful", score: 4, type: "thriving", icon: "✨" },
      { text: "A few sweet glimmers — Enjoyed a cup of tea or a pleasant view", score: 3, type: "calm", icon: "🌱" },
      { text: "Hard to notice — Day felt mostly routine and neutral", score: 2, type: "reflective", icon: "🔍" },
      { text: "None today — It felt like an uphill emotional climb", score: 1, type: "overwhelmed", icon: "🌧️" }
    ]
  },
  {
    id: 9,
    title: "Scan your body from head to toe. Where is your physical state right now?",
    category: "Somatic Awareness",
    options: [
      { text: "Soft & relaxed — Jaw is loose, shoulders dropped, body comfortable", score: 4, type: "calm", icon: "🕊️" },
      { text: "Normal comfort — Standard physical state, no major discomfort", score: 3, type: "calm", icon: "🌿" },
      { text: "Localized tightness — Clenched jaw, tight neck, or tense shoulders", score: 2, type: "tense", icon: "⚡" },
      { text: "Heavy & exhausted — Body feels weighed down by stress or fatigue", score: 1, type: "overwhelmed", icon: "🧱" }
    ]
  },
  {
    id: 10,
    title: "If you could grant your soul one gentle wish for today, what would it be?",
    category: "Soul Need",
    options: [
      { text: "Creative spark & celebration — Let's build, express, and thrive!", score: 4, type: "thriving", icon: "🚀" },
      { text: "Gentle peace — Slow evening, cozy warmth, and zero rush", score: 3, type: "calm", icon: "🍵" },
      { text: "Kind reassurance — A reminder that I am doing my best and that's enough", score: 2, type: "reflective", icon: "🫂" },
      { text: "Deep healing sleep — Freedom to switch off and sleep without alarm", score: 1, type: "weary", icon: "🛌" }
    ]
  }
];

const moodTypeProfiles = {
  thriving: {
    name: "Luminous & Thriving",
    tagline: "Vibrant Energy • Joyful Clarity • Emotional Blossom",
    icon: "🌟",
    color: "#F59E0B",
    bgGradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.05))",
    borderColor: "rgba(245, 158, 11, 0.5)",
    summary: "Your emotional battery is flourishing with vibrant energy, joy, and clarity. You are in a harmonious space to create, share warmth, and embark on new meaningful goals.",
    meter: { energy: 95, peace: 88, positivity: 94 },
    recommendations: [
      "Share your joyful energy — text someone you appreciate and brighten their day.",
      "Channel your momentum into the 30-Day Self-Love Challenge in EMOVIA.",
      "Capture this beautiful feeling in a celebratory journal entry to look back on."
    ]
  },
  calm: {
    name: "Zen & Grounded",
    tagline: "Steady Harmony • Inner Balance • Peaceful Anchor",
    icon: "🌿",
    color: "#10B981",
    bgGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.05))",
    borderColor: "rgba(16, 185, 129, 0.5)",
    summary: "You are experiencing a serene, steady, and anchored state of mind. Your inner compass is centered, giving you emotional resilience and quiet wisdom.",
    meter: { energy: 75, peace: 94, positivity: 82 },
    recommendations: [
      "Sustain this serene state with 10 minutes of mindful breathwork or a nature stroll.",
      "Enjoy a warm cup of herbal tea without checking your phone.",
      "Reflect on what helped you feel centered today and preserve that routine."
    ]
  },
  reflective: {
    name: "Gentle & Reflective",
    tagline: "Quiet Contemplation • Soul Introspection • Soft Grace",
    icon: "🌊",
    color: "#38BDF8",
    bgGradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(2, 132, 199, 0.05))",
    borderColor: "rgba(56, 189, 248, 0.5)",
    summary: "You are in an introspective, gentle space. Your emotional energy is softly turning inward, seeking sanctuary, meaning, and personal peace.",
    meter: { energy: 55, peace: 72, positivity: 68 },
    recommendations: [
      "Express your quiet thoughts through free-writing or guided journal prompts.",
      "Put on a comforting lo-fi or ambient acoustic playlist to accompany your thoughts.",
      "Allow yourself unhurried time — not every question needs an immediate answer."
    ]
  },
  tense: {
    name: "Tense & Seeking Release",
    tagline: "High Demand • Mental Rush • Somatic Stress",
    icon: "⚡",
    color: "#FB923C",
    bgGradient: "linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(234, 88, 12, 0.05))",
    borderColor: "rgba(251, 146, 60, 0.5)",
    summary: "You are carrying physical tension and running on high mental gears. Your mind is managing many responsibilities, creating stiffness and a sense of rush.",
    meter: { energy: 62, peace: 38, positivity: 50 },
    recommendations: [
      "Physically drop your shoulders, unclench your jaw, and take 3 deep belly breaths.",
      "Practice 5-4-3-2-1 sensory grounding to bring yourself into the physical room.",
      "Step away from screens and stretch your neck and shoulders for 5 minutes."
    ]
  },
  overwhelmed: {
    name: "Overwhelmed & Seeking Peace",
    tagline: "Emotional Heaviness • Deep Fatigue • Needing Comfort",
    icon: "☁️",
    color: "#A78BFA",
    bgGradient: "linear-gradient(135deg, rgba(167, 139, 250, 0.2), rgba(124, 58, 237, 0.05))",
    borderColor: "rgba(167, 139, 250, 0.5)",
    summary: "Your emotional battery is depleted and your mind is holding heavy weight. Today has asked a lot of you, and what you need most is gentle compassion and deep rest.",
    meter: { energy: 28, peace: 32, positivity: 35 },
    recommendations: [
      "Give yourself permission to do nothing for the rest of today. You don't have to carry it all.",
      "Wrap yourself in a cozy blanket with warm water and dim ambient lighting.",
      "If you need someone to talk to confidentially, remember Tele-MANAS is free 24/7 at 14416."
    ]
  }
};

const MoodQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [resultType, setResultType] = useState(null);
  const [xp, setXp] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('emovia_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUserName(parsed.name || '');
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleSelectOption = (questionId, option) => {
    const updatedAnswers = { ...answers, [questionId]: option };
    setAnswers(updatedAnswers);
    setXp((prev) => prev + 10);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      calculateResult(updatedAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    let totalScore = 0;
    const typeCount = { thriving: 0, calm: 0, reflective: 0, tense: 0, overwhelmed: 0, weary: 0 };

    Object.values(finalAnswers).forEach((opt) => {
      totalScore += opt.score;
      if (opt.type) {
        typeCount[opt.type] = (typeCount[opt.type] || 0) + 1;
      }
    });

    let chosenProfileKey = 'calm';
    if (totalScore >= 35) {
      chosenProfileKey = 'thriving';
    } else if (totalScore >= 28) {
      chosenProfileKey = 'calm';
    } else if (totalScore >= 22) {
      chosenProfileKey = 'reflective';
    } else if (totalScore >= 16) {
      chosenProfileKey = 'tense';
    } else {
      chosenProfileKey = 'overwhelmed';
    }

    const profile = moodTypeProfiles[chosenProfileKey];
    setResultType(profile);
    setIsCompleted(true);
    setXp((prev) => prev + 50); // Bonus XP for finishing!

    // Sync to backend SQLite API and backup to localStorage!
    try {
      saveMoodAssessment(profile.name, profile.summary);
      setIsSaved(true);
    } catch (err) {
      // ignore
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
    setResultType(null);
    setXp(0);
    setIsSaved(false);
  };

  const currentQ = quizQuestions[currentStep];
  const progressPercent = Math.round(((currentStep) / quizQuestions.length) * 100);

  return (
    <div className="mood-quiz-container">
      {/* Quiz Header Bar */}
      <div className="quiz-top-bar">
        <div className="quiz-user-badge">
          <span className="user-avatar">🌱</span>
          <span>{userName ? `Welcome, ${userName}` : "Mindful Sanctuary"}</span>
        </div>
        <div className="quiz-xp-badge">
          <span>🏆</span>
          <strong>{xp} XP Earned</strong>
        </div>
      </div>

      {!isCompleted ? (
        <div className="quiz-active-card">
          {/* Progress Header */}
          <div className="quiz-progress-section">
            <div className="progress-labels">
              <span className="step-counter">
                Question <strong>{currentStep + 1}</strong> of {quizQuestions.length}
              </span>
              <span className="step-category">{currentQ.category}</span>
              <span className="progress-pct">{progressPercent}% Completed</span>
            </div>
            <div className="quiz-progress-track">
              <div 
                className="quiz-progress-fill" 
                style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Body */}
          <div className="question-content">
            <h3 className="question-text">{currentQ.title}</h3>
            <p className="question-hint">Select the response that feels truest to this moment:</p>

            <div className="quiz-options-list">
              {currentQ.options.map((opt, idx) => {
                const isSelected = answers[currentQ.id]?.text === opt.text;
                return (
                  <button
                    key={idx}
                    type="button"
                    className={`quiz-option-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(currentQ.id, opt)}
                  >
                    <span className="option-icon">{opt.icon}</span>
                    <span className="option-text">{opt.text}</span>
                    <span className="option-arrow">→</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="quiz-footer-nav">
            {currentStep > 0 && (
              <button 
                type="button" 
                className="quiz-prev-btn"
                onClick={() => setCurrentStep((prev) => prev - 1)}
              >
                ← Previous Question
              </button>
            )}
            <span className="quiz-helper-text">
              ✨ 10 questions to reveal your inner mood profile
            </span>
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="quiz-result-card" style={{ borderColor: resultType.borderColor }}>
          <div className="result-celebration-banner">
            <span className="result-confetti">🎉</span>
            <span className="result-badge-pill">Survey Completed • +150 Total XP</span>
            <span className="result-confetti">✨</span>
          </div>

          <div className="result-hero" style={{ background: resultType.bgGradient }}>
            <span className="result-icon-large">{resultType.icon}</span>
            <p className="result-eyebrow">YOUR MOOD PROFILE RESULT</p>
            <h2 className="result-name" style={{ color: resultType.color }}>
              {resultType.name}
            </h2>
            <p className="result-tagline">{resultType.tagline}</p>
          </div>

          <div className="result-body">
            <div className="result-summary-box">
              <h4>Emotional Reflection</h4>
              <p>{resultType.summary}</p>
            </div>

            {/* Emotional Resonance Meters */}
            <div className="emotional-meters">
              <h4>Energy & Balance Diagnostics</h4>
              <div className="meter-row">
                <span>Vitality & Energy</span>
                <div className="meter-bar">
                  <div className="meter-fill" style={{ width: `${resultType.meter.energy}%`, background: '#F59E0B' }}></div>
                </div>
                <strong>{resultType.meter.energy}%</strong>
              </div>
              <div className="meter-row">
                <span>Inner Peace & Stillness</span>
                <div className="meter-bar">
                  <div className="meter-fill" style={{ width: `${resultType.meter.peace}%`, background: '#10B981' }}></div>
                </div>
                <strong>{resultType.meter.peace}%</strong>
              </div>
              <div className="meter-row">
                <span>Emotional Outlook</span>
                <div className="meter-bar">
                  <div className="meter-fill" style={{ width: `${resultType.meter.positivity}%`, background: '#38BDF8' }}></div>
                </div>
                <strong>{resultType.meter.positivity}%</strong>
              </div>
            </div>

            {/* Actionable Recommendations */}
            <div className="result-recs-box">
              <h4>Recommended Nurturing Practices</h4>
              <ul className="rec-list">
                {resultType.recommendations.map((rec, i) => (
                  <li key={i}>
                    <span className="rec-bullet">✦</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {isSaved && (
              <div className="sync-success-note">
                <span>✓</span> Mood insight recorded to your journal archives!
              </div>
            )}

            {/* Action Buttons */}
            <div className="result-actions">
              <button type="button" className="action-btn retake-btn" onClick={handleReset}>
                🔄 Retake Mood Survey
              </button>
              <Link to="/journal-list" className="action-btn journal-btn">
                📖 View Journal Archives
              </Link>
              <Link to="/challenges" className="action-btn challenge-btn">
                🎯 30-Day Challenges
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodQuiz;
