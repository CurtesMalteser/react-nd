import User, { UserServer } from "./user";
import Question from "./question";

let users: { [key: string]: UserServer } = {
  sarahedo: {
    id: 'sarahedo',
    password: 'password123',
    name: 'Sarah Edo',
    avatarURL: 'sarahedo.jpg',
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionOne',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    password: 'abc321',
    name: 'Tyler McGinnis',
    avatarURL: 'tylermcginnis.jpg',
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  johndoe: {
    id: 'johndoe',
    password: 'xyz321',
    name: 'John Doe',
    avatarURL: 'johndoe.jpg',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  },
  mtsamis: {
    id: 'mtsamis',
    password: 'xyz123',
    name: 'Mike Tsamis',
    avatarURL: null,
    answers: {
      "xj352vofupe1dqz9emx14r": 'optionTwo',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p34lnez": 'optionOne',
      "8xf0y6ziyjabvozdd253nd": 'optionOne'
    },
    questions: ['6ni6ok3ym7mf1p34lnez', 'xj352vofupe1dqz9emx14r'],
  }
}

let questions: { [key: string]: Question } = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'sarahedo',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['sarahedo', 'mtsamis'],
      text: 'have horrible short term memory',
    },
    optionTwo: {
      votes: [],
      text: 'have horrible long term memory'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'johndoe',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'become a superhero',
    },
    optionTwo: {
      votes: ['johndoe', 'sarahedo'],
      text: 'become a supervillian'
    }
  },
  "6ni6ok3ym7mf1p34lnez": {
    id: '6ni6ok3ym7mf1p34lnez',
    author: 'mtsamis',
    timestamp: 1468479767190,
    optionOne: {
      votes: ['tylermcginnis', 'mtsamis'],
      text: 'become a Java developer',
    },
    optionTwo: {
      votes: ['johnDoe', 'sarahedo'],
      text: 'become a Kotlin developer'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'sarahedo',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'be telekinetic',
    },
    optionTwo: {
      votes: ['sarahedo'],
      text: 'be telepathic'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'tylermcginnis',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'be a front-end developer',
    },
    optionTwo: {
      votes: ['sarahedo'],
      text: 'be a back-end developer'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'tylermcginnis',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['tylermcginnis'],
      text: 'find $50 yourself',
    },
    optionTwo: {
      votes: ['johndoe', 'mtsamis'],
      text: 'have your best friend find $500'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'johndoe',
    timestamp: 1493579767190,  
    optionOne: {
      votes: ['johndoe'],
      text: 'write JavaScript',
    },
    optionTwo: {
      votes: ['tylermcginnis'],
      text: 'write Swift'
    }
  },
  "xj352vofupe1dqz9emx14r": {
    id: 'xj352vofupe1dqz9emx14r',
    author: 'mtsamis',
    timestamp: 1719857995449,
    optionOne: {
      votes: ['johndoe'],
      text: 'use GitHub Copilot',
    },
    optionTwo: {
      votes: ['mtsamis'],
      text: 'use Gemini Code Assist'
    }
  },
}

const mapUserServerToUser = (user: UserServer) => user as User

function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers() {
  return new Promise<{ users: { [key: string]: User } }>((resolve) => {
    setTimeout(() => {
      const mappedUsers = Object.keys(users).reduce((acc, key) => {
        acc[key] = mapUserServerToUser(users[key]);
        return acc;
      }, {} as { [key: string]: User });

      resolve({ users: mappedUsers });
    }, 1000);
  })
}

export function _performLogin(id: string, password: string) {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {

      const user = users[id];

      if (!user) {
        reject(new Error('No user found!'))
        return;
      }
      
      if (user.password !== password) {
        reject(new Error('Invalid password!'))
        return;
      }

      mapUserServerToUser(users[id])
      resolve(mapUserServerToUser(users[id]))

    }, 1000)

  })
}

export function _getQuestions() {
  return new Promise<{ questions: { [key: string]: Question } }>((resolve) => {
    setTimeout(() => resolve({ questions: { ...questions } }), 1000)
  })
}

function formatQuestion({ optionOne, optionTwo, author }: { optionOne: string, optionTwo: string, author: string }): Question {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOne,
    },
    optionTwo: {
      votes: [],
      text: optionTwo,
    }
  }
}

export function _saveQuestion(question: { optionOne: string | null, optionTwo: string | null, author: string | null }) {
  return new Promise((resolve, reject) => {
    if (question.optionOne === null || question.optionTwo === null || question.author === null) {
      reject("Please provide optionOneText, optionTwoText, and author");
      return;
    }

    if (!users[question.author!!]) {
      reject(new Error("The author is not an existing user"));
      return;
    }

    const formattedQuestion = formatQuestion({
      author: question.author as string,
      optionOne: question.optionOne as string,
      optionTwo: question.optionTwo as string,
    })

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }

      resolve(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer({ authedUser, qid, answer }: { authedUser: string, qid: string | null, answer: string | null }) {

  const isValidQID = (): boolean => typeof qid === 'string';
  const isValidOption = (): boolean => answer === 'optionOne' || answer === 'optionTwo';

  return new Promise<boolean>((resolve, reject) => {

    if (authedUser === null || !isValidQID() || !isValidOption()) {
      reject('Please provide authedUser, qid, and answer');
    }

    const questionID = qid as string;
    const option = answer === 'optionOne' ? 'optionOne' : 'optionTwo'
    const otherOption = answer === 'optionOne' ? 'optionTwo' : 'optionOne'

    setTimeout(() => {
      try {

        const hasVotedForOtherOption = questions[questionID][otherOption].votes.includes(authedUser);

        if (hasVotedForOtherOption) {
          questions = {
            ...questions,
            [questionID]: {
              ...questions[questionID],
              [otherOption]: {
                ...questions[questionID][otherOption],
                votes: questions[questionID][otherOption].votes.filter(user => user !== authedUser)
              }
            }
          };
        }


        users = {
          ...users,
          [authedUser]: {
            ...users[authedUser],
            answers: {
              ...users[authedUser].answers,
              [questionID]: option
            }
          }
        }

        questions = {
          ...questions,
          [questionID]: {
            ...questions[questionID],
            [option]: {
              ...questions[questionID][option],
              votes: questions[questionID][option].votes.concat([authedUser])
            }
          }
        }



        resolve(true)
      } catch (error) {
        reject(new Error(`There was an error saving the answer for user ${authedUser} and question ${qid}. Error: ${error}`))
      }
    }, 500)
  })
}
