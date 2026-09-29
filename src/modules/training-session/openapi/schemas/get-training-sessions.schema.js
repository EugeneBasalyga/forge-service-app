module.exports = {
  GetTrainingSessionsResponseBody: {
    type: 'array',
    items: {
      $ref: '#/components/schemas/TrainingSession',
    },
  },
};
