import { createSlice } from '@reduxjs/toolkit';

// Change these to your own questions!
const questions = [
  {
    id: 1,
    questionText:
      'In whose vault is the sword of Gryffindor believed to be hidden?',
    options: [
      'Bellatrix Lestrange',
      'Albus Dumbledore',
      'Lucius Malfoy',
      'Dolores Umbridge',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 2,
    questionText:
      'Which dragon does Fleur Delacour face in the first task of the Triwizard Tournament?',
    options: [
      'Swedish Shortsnout',
      'Hungarian Horntail',
      'Common Welsh Green',
      'Chinese Fireball',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 3,
    questionText: 'What does Professor Trelawney see in Harry’s tea leaves?',
    options: ['A dragon', 'The Grim', 'Sirius Black', 'A house elf'],
    correctAnswerIndex: 1,
  },
  {
    id: 4,
    questionText:
      'At what age will does a student receive their first Hogwarts letter?',
    options: ['9 ¾', '10', '11', '12'],
    correctAnswerIndex: 2,
  },
  {
    id: 5,
    questionText: 'How many players are there in a Quidditch team?',
    options: ['Seven', 'Eight', 'Eleven', 'Five'],
    correctAnswerIndex: 0,
  },
  {
    id: 6,
    questionText:
      'What potion does Harry take to help him extract the memory he needs from professor Slughorn?',
    options: [
      'Veritaserum',
      'Confusion Concoction',
      'Polyjuice Potion',
      'Felix Felicis',
    ],
    correctAnswerIndex: 3,
  },
  {
    id: 7,
    questionText: 'What is the name of Harry Potters best friend?',
    options: [
      'Neville Longbottom',
      'Ron Weasley',
      'Seamus Finnigan',
      'Dean Thomas',
    ],
    correctAnswerIndex: 1,
  },
];

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,
};

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          'Could not find question! Check to make sure you are passing the question id correctly.'
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex,
      });
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState;
    },
  },
});
