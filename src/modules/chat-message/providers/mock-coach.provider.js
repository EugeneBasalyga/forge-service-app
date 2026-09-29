const { generateRandomInt } = require('@forge/forge-ws-common/utils/generator.util');

const { ROLE } = require('../constants');
const COACH_REPLIES = require('../mocks/coach-replies.mock');

// Pause before the first chunk, like the time an LLM takes to start answering
const THINKING_DELAY_MS = { MIN: 600, MAX: 1200 };

const CHUNK_DELAY_MS = { MIN: 80, MAX: 200 };

const WORDS_PER_CHUNK = { MIN: 1, MAX: 3 };

const generateRandomIntBetween = (min, max) => min + generateRandomInt(max - min + 1);

const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

// Answers on topic when a word of the last user message starts with one of the reply keywords,
// otherwise picks a random reply
const pickReply = (messages) => {
  const lastUserMessage = messages.findLast(({ role }) => role === ROLE.USER);
  const words = lastUserMessage?.content.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];

  const matchingReply = COACH_REPLIES.find(({ keywords }) =>
    keywords.some((keyword) => words.some((word) => word.startsWith(keyword)))
  );

  return (matchingReply ?? COACH_REPLIES[generateRandomInt(COACH_REPLIES.length)]).text;
};

// Keeps the whitespace in the chunks so that joining them restores the reply exactly
const splitIntoChunks = (text) => {
  const words = text.match(/\S+\s*/g) ?? [];
  const chunks = [];

  let index = 0;

  while (index < words.length) {
    const size = generateRandomIntBetween(WORDS_PER_CHUNK.MIN, WORDS_PER_CHUNK.MAX);

    chunks.push(words.slice(index, index + size).join(''));
    index += size;
  }

  return chunks;
};

// Stands in for an LLM until a real one is wired. A real provider keeps the same contract:
// streamReply({ messages, onChunk }) receives the conversation (oldest first, the new user
// message last), calls onChunk(text) as text arrives and resolves with the full reply
const streamReply = async ({ messages, onChunk }) => {
  const reply = pickReply(messages);

  await wait(generateRandomIntBetween(THINKING_DELAY_MS.MIN, THINKING_DELAY_MS.MAX));

  await splitIntoChunks(reply).reduce(async (previous, chunk) => {
    await previous;
    await wait(generateRandomIntBetween(CHUNK_DELAY_MS.MIN, CHUNK_DELAY_MS.MAX));

    onChunk(chunk);
  }, Promise.resolve());

  return reply;
};

module.exports = {
  streamReply,
};
