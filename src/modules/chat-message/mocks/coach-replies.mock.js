// Canned AI coach replies used by the mock coach provider. Plain text, no markdown
// keywords are lowercase word prefixes that select the reply for a user message on its topic
const COACH_REPLIES = [
  {
    keywords: ['warm', 'stretch', 'разминк', 'растяжк'],
    text: 'Great question! Before any strength session, spend 5 to 10 minutes warming up. Start with light cardio like brisk walking or cycling to raise your heart rate, then move on to dynamic stretches: leg swings, arm circles, hip openers and bodyweight squats. Finish with one or two light sets of your first exercise. A proper warm-up improves performance and lowers the risk of injury.',
  },
  {
    keywords: ['rest', 'recover', 'отдых', 'восстанов'],
    text: 'Rest days are part of the program, not a break from it. Your muscles grow and repair while you recover, not while you train. Aim for at least one or two full rest days a week, and keep them active if you like: a relaxed walk, some mobility work or light yoga. If you feel constantly sore, tired or your lifts stall, that is a sign you need more recovery.',
  },
  {
    keywords: ['progress', 'plateau', 'stuck', 'heavier', 'прогресс', 'плато'],
    text: 'To keep making progress, use progressive overload. Each week, try to add a little more challenge: one or two extra reps, a slightly heavier weight, an additional set or a shorter rest between sets. Change only one thing at a time and keep your form clean. Small, steady improvements add up to big results over a few months.',
  },
  {
    keywords: [
      'eat',
      'food',
      'protein',
      'diet',
      'nutrition',
      'meal',
      'пита',
      'белок',
      'белк',
      'диет',
    ],
    text: 'Nutrition matters as much as training. Aim for roughly 1.6 to 2.2 grams of protein per kilogram of body weight a day, spread across three or four meals. Build each plate around a protein source, vegetables and a portion of complex carbs. Around your workout, a meal with protein and carbs one to three hours before and after will help you perform and recover.',
  },
  {
    keywords: ['miss', 'skip', 'пропус', 'пропуст'],
    text: 'Missing a workout happens to everyone, so do not be hard on yourself. Just pick up where you left off with the next session in your program. There is no need to double up or train longer to make up for it. Consistency over weeks and months matters far more than any single session.',
  },
  {
    keywords: ['form', 'technique', 'squat', 'техник', 'присед'],
    text: 'Good form always comes before heavier weight. For squats, keep your feet about shoulder-width apart, brace your core, push your hips back and keep your chest up. Lower until your thighs are at least parallel to the floor, keeping your knees in line with your toes, then drive up through your whole foot. Recording yourself from the side is a great way to check your technique.',
  },
  {
    keywords: ['sleep', 'tired', 'сон', 'сплю', 'спать', 'высып', 'устал'],
    text: 'Sleep is one of the most powerful recovery tools you have. Try to get 7 to 9 hours a night and keep a regular schedule, even on weekends. Avoid screens and heavy meals an hour before bed, and keep your bedroom cool and dark. Better sleep means better energy, strength and focus in your workouts.',
  },
  {
    keywords: ['motivat', 'lazy', 'habit', 'мотивац', 'лень', 'лени', 'привычк'],
    text: 'Staying motivated is easier when you focus on habits instead of results. Schedule your workouts like appointments, set small weekly goals and track your progress so you can see how far you have come. On low-energy days, commit to just the warm-up. Most of the time, once you start, you will finish the whole session.',
  },
  {
    keywords: ['water', 'drink', 'hydrat', 'вода', 'воды', 'воду', 'пить'],
    text: 'Hydration has a big impact on performance. Drink water steadily throughout the day, and have a glass or two in the couple of hours before training. During the workout, take small sips every 15 to 20 minutes. If you sweat a lot or train for more than an hour, consider adding electrolytes to replace what you lose.',
  },
  {
    keywords: ['sore', 'pain', 'hurt', 'injur', 'боль', 'болит', 'болят', 'крепатур', 'травм'],
    text: 'Some muscle soreness a day or two after a new or harder workout is normal and usually fades within 72 hours. Gentle movement, stretching, good sleep and enough protein will help you recover. Sharp pain, pain in a joint or pain that gets worse during exercise is different though: stop that movement and consider seeing a professional. You can always ask me for an easier alternative exercise.',
  },
];

module.exports = COACH_REPLIES;
