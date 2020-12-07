/*
  Sources:
  https://miro.com/blog/ice-breaker-questions-for-team/
  https://www.donut.com/social-watercooler-connections/
*/

const { SETTING_LANGUAGE, DEFAULT_SETTINGS } = require("./constants");

const ACTIVITIES = "ACTIVITIES";
const ACTIVITIES_INTRO = "ACTIVITIES_INTRO";
const CREATE_BUDDIES_SETTINGS = "CREATE_BUDDIES_SETTINGS";
const CURRENT_GROUPS_ARE = "CURRENT_GROUPS_ARE";
const GENERAL_SETTINGS_TITLE = "GENERAL_SETTINGS_TITLE";
const GREETINGS = "GREETINGS";
const HOME_INTRO = "HOME_INTRO";
const NO_GROUPS = "NO_GROUPS";
const NOT_IN_GROUP = "NOT_IN_GROUP";
const QUESTION_INTRO = "QUESTION_INTRO";
const QUESTIONS = "QUESTIONS";
const REGROUP_BUDDIES_TITLE = "REGROUP_BUDDIES_TITLE";
const REGROUP_BUTTON_LABEL = "REGROUP_BUTTON_LABEL";
const SETTING_ACTIVITIES_SUGGESTION_AMOUNT_DESCRIPTION =
  "SETTING_ACTIVITIES_SUGGESTION_AMOUNT_DESCRIPTION";
const SETTING_ACTIVITIES_SUGGESTION_AMOUNT_TITLE =
  "SETTING_ACTIVITIES_SUGGESTION_AMOUNT_TITLE";
const SETTING_BUDDY_GROUP_SIZE_DESCRIPTION =
  "SETTING_BUDDY_GROUP_SIZE_DESCRIPTION";
const SETTING_BUDDY_GROUP_SIZE_TITLE = "SETTING_BUDDY_GROUP_SIZE_TITLE";
const SETTING_DAY_TO_REGENERATE_DESCRIPTION =
  "SETTING_DAY_TO_REGENERATE_DESCRIPTION";
const SETTING_DAY_TO_REGENERATE_TITLE = "SETTING_DAY_TO_REGENERATE_TITLE";
const SETTING_LANGUAGE_DESCRIPTION = "SETTING_LANGUAGE_DESCRIPTION";
const SETTING_LANGUAGE_TITLE = "SETTING_LANGUAGE_TITLE";
const SETTING_USERS_TO_IGNORE_DESCRIPTION =
  "SETTING_USERS_TO_IGNORE_DESCRIPTION";
const SETTING_USERS_TO_IGNORE_TITLE = "SETTING_USERS_TO_IGNORE_TITLE";
const SETTING_UTC_OFFSET_DESCRIPTION = "SETTING_UTC_OFFSET_DESCRIPTION";
const SETTING_UTC_OFFSET_TITLE = "SETTING_UTC_OFFSET_TITLE";
const SOMETHING_WENT_WRONG = "SOMETHING_WENT_WRONG";
const UNKNOWN_COMMAND = "UNKNOWN_COMMAND";
const WEEK = "WEEK";
const YOU_ARE_BUDDIES_FOR = "YOU_ARE_BUDDIES_FOR";
const YOU_CAN_CHAT_WITH_THEM_HERE = "YOU_CAN_CHAT_WITH_THEM_HERE";
const YOUR_ARE_BUDDIES_WITH = "YOUR_ARE_BUDDIES_WITH";

function translate(key) {
  /* @TODO: language getSettings should not be async, now changing language does not work */
  const settings = {}; // await getSettings()
  const language =
    settings[SETTING_LANGUAGE] || DEFAULT_SETTINGS[SETTING_LANGUAGE];

  const texts = {
    [ACTIVITIES]: {
      en: [
        "Go for a walk in the city.",
        "Go for a walk in the woods.",
        "Play bumperball at https://www.bumberball.tk.",
        "Share a photo of something that is close to you now.",
      ],
    },
    [GREETINGS]: {
      en: ["Hi", "Howdy", "Hello", "Hey"],
    },
    [QUESTIONS]: {
      en: [
        "What was your favorite childhood movie?",
        "What is one item you couldn’t live without?",
        "If you could only eat one food for the rest of your life, what would it be?",
        "If you were an animal, what kind would you be?",
        "If you could have dinner with anybody in history, dead or alive, who would it be, and why?",
        "What unusual or quirky thing do you do regularly?",
        "What’s your favorite 80s movie?",
        "What’s your unusual talent?",
        "If you were stranded on a desert island, what band or music would you want?",
        "If you could travel anywhere in the world, where would you go?",
        "What’s your biggest guilty pleasure?",
        "What’s the greatest challenge you overcame?",
        "What shows are you into?",
        "What’s your claim to fame?",
        "How often do you play sports?",
        "Are you usually early or late?",
        "What quirks do you have?",
        "How often do you people watch?",
        "What’s your favorite drink?",
        "What do you hope never changes?",
        "What’s your dream car?",
        "Where would you rather be from?",
        "What songs have you completely memorized?",
        "What would you rate 10 / 10?",
        "What job would you be terrible at?",
        "What are you absolutely determined to do?",
        "What skill would you like to master?",
        "What website do you visit most often?",
        "What would your perfect room look like?",
        "What movie title best describes your life?",
        "What age do you want to live to?",
        "What kind of art do you enjoy most?",
        "What takes up too much of your time?",
        "What do you wish you knew more about?",
        "What’s the best way to start the day?",
        "What mystery do you wish you knew the answer to?",
        "How different was your life one year ago?",
        "What’s the best single day on the calendar?",
        "What are some things you’ve had to unlearn?",
        "What’s your favorite genre of book or movie?",
        "What’s the farthest you’ve ever been from home?",
        "What TV or YouTube channel doesn’t exist but really should?",
        "Where is the most interesting place you’ve been?",
        "What fad or trend do you hope comes back?",
        "What city would you most like to live in?",
        "When was the last time you climbed a tree just for fun?",
        "What do you consider to be your best find?",
        "What is special about the place you grew up?",
        "What age do you wish you could permanently be?",
        "What’s worth spending more on to get the best?",
        "What are you most likely to become famous for?",
        "What fictional place would you most like to go?",
        "Where is the most relaxing place you’ve ever been to?",
        "What have you only recently formed an opinion about?",
        "What is the most heartwarming thing you’ve ever seen?",
        "What’s the most interesting piece of art you’ve seen?",
        "What’s something you like to do the old-fashioned way?",
        "Would you rather go hang gliding or whitewater rafting?",
        "Who has impressed you most with what they’ve accomplished?",
        "How do you relax after a hard day of work?",
        "What popular TV show or movie do you refuse to watch?",
        "What job do you think you’d be really good at?",
        "What pets did you have while you were growing up?",
        "Where would you spend all your time if you could?",
        "What would be the most amazing adventure to go on?",
        "What would be your ideal way to spend the weekend?",
        "What’s the best way a person can spend their time?",
        "What one thing do you really want but can’t afford yet?",
        "What is the luckiest thing that has happened to you?",
        "What are some small things that make your day better?",
        "What’s the best thing that happened to you last week?",
        "What are you looking forward to in the coming months?",
        "What’s your favorite piece of clothing you own/owned?",
        "What is the most annoying habit that other people have?",
        "What game or movie universe would you most like to live in?",
        "What is the most impressive thing you know how to do?",
        "What was the best book or series that you’ve ever read?",
        "What question would you most like to know the answer to?",
        "What are you interested in that most people haven’t heard of?",
        "Why did you decide to do the work you are doing now?",
        "What state or country do you never want to go back to?",
        "Where do you usually go when you have time off?",
        "What are you most looking forward to in the next 10 years?",
        "What is the most annoying question that people ask you regularly?",
        "If you suddenly became a master at woodworking, what would you make?",
        "What could you give a 40-minute presentation on with absolutely no",
        "What amazing thing did you do that no one was around to see?",
        "What hobby would you get into if time and money weren’t an issue?",
        "If you didn’t have to sleep, what would you do with the extra time?",
        "When people come to you for help, what do they usually want help with?",
        "What is something you think everyone should do at least once in their",
        "What’s something you’ve been meaning to try but just haven’t gotten",
        "If all jobs had the same pay and hours, what job would you like to",
        "Who’s your go-to band or artist when you can’t decide on something to",
        "If you were dictator of a small island nation, what crazy dictator",
        "What is something that most people consider to be a luxury, but you",
        "What is something that a ton of people are obsessed with, but you just",
        "If you could turn any activity into an Olympic sport, what would you",
        "What piece of entertainment do you wish you could erase from your mind",
        "If you had unlimited funds to build a house that you would live in for",
        "What gets you fired up?",
        "What makes a good life?",
        "What risks are worth taking?",
        "What do you take for granted?",
        "Who inspires you to be better?",
        "What do you have doubts about?",
        "When do you feel truly “alive”?",
        "What fact are you resigned to?",
        "What book impacted you the most?",
        "What’s the best thing about you?",
        "What would a mirror opposite of yourself be like?",
        "What irrational fear do you have?",
        "What would be your spirit animal?",
        "What would be the scariest monster you could imagine?",
        "What’s the hardest lesson you’ve learned?",
        "What’s something you are self-conscious about?",
        "What is one or two of your favorite smells?",
        "Have you ever given to any charities?",
        "What’s the last adventure you went on?",
        "What are three interesting facts about you?",
        "What was the best compliment you’ve received?",
        "What chance encounter changed your life forever?",
        "What do you want your epitaph to be?",
        "What are you really good at, but kind of embarrassed that you are good",
        "What is the “Holy Grail” of your life?",
        "What do you like most about your family?",
        "What do people think is weird about you?",
        "What is something you will NEVER do again?",
        "Who is/was your most interesting friend?",
        "What are you most likely very wrong about?",
        "What’s the most immature thing that you do?",
        "What stereotype do you completely live up to?",
        "What is the biggest lesson you NEVER learned?",
        "What dumb accomplishment are you most proud of?",
        "What was the most memorable gift you’ve received?",
        "What chapters would you separate your autobiography into?",
        "What do you hope your last words will be?",
        "What do you spend the most time thinking about?",
        "What is something you can never seem to finish?",
        "What mistake do you keep making again and again?",
        "What’s the best thing you got from your parents?",
        "What is the strangest thing you have come across?",
        "If you could make a 20-second phone call to yourself at any point in",
        "What’s the best and worst thing about getting older?",
        "If you could have a never-ending candle that smelled like anything you",
        "What is something you are certain you’ll never experience?",
        "What challenging thing are you working through these days?",
        "What’s one responsibility you really wish you didn’t have?",
        "What do you wish your brain was better at doing?",
        "If your childhood had a smell, what would it be?",
        "In your group of friends, what role do you play?",
        "Which of your scars has the best story behind it?",
        "What have you created that you are most proud of?",
        "What do you strongly suspect but have no proof of?",
        "What were some of the turning points in your life?",
        "What bends your mind every time you think about it?",
        "What’s the title of the current chapter of your life?",
        "Among your friends or family, what are you famous for?",
        "What is something that your friends wouldn’t believe was true about",
        "What’s something horrible that everyone should try at least once?",
        "If you had a personal flag, what would be on it?",
        "If your life was a book, what would its title be?",
        "As the only human left on Earth, what would you do?",
        "What stats for your life would you most like to see?",
        "What did you think you would grow out of but haven’t?",
        "What are three of the most significant numbers in your life?",
        "What are some of your personal “rules” that you never break?",
        "What’s the best and worst piece of advice you’ve ever received?",
        "What song or artist do you like but rarely admit to liking?",
        "What annoys you most about the in-groups you are a part of?",
        "What small gesture from a stranger made a big impact on you?",
        "What do you regret not doing or starting when you were younger?",
        "What’s the dumbest thing you’ve done that actually turned out pretty",
        "If you had to change your name, what would you change it to?",
        "When people look at you, what do you think they see/think?",
        "What can you not get right, no matter how many times you try?",
        "What question can you ask to find out the most about a person?",
        "As you get older, what are you becoming more and more afraid of?",
        "What lifestyle change have you been meaning to make for a while now?",
        "In what situation or place would you feel the most out of place?",
        "There are two types of people in this world. What are the two types?",
        "What personality trait do you value most, and which do you dislike the",
        "When was the last time you changed your opinion/belief about something",
        "What would you do if you knew you were going to die in one day?",
        "What are some of the events in your life that made you who you are?",
        "If life is a game like some people say, what are some of the rules?",
        "They say that everyone has a book in them. What would your book be",
        "What could you do with two million dollars to impact the most amount",
        "What would be some of the most annoying things about having yourself",
        "What do you want to be remembered for?",
        "If you could make one rule that everyone had to follow, what rule",
        "What’s something that happened or something that someone said that",
        "If you were put into solitary confinement for six months, what would",
        "If you could have a video of anyone event in your life, what event",
        "What incredibly strong opinion or belief do you have that is",
        "What are the top three things you want to accomplish before you die?",
        "If you could convince everyone in the world to do one thing at one",
        "If you had a clock that would countdown to any one event of your",
        "What do you wish you could tell yourself 10 years ago? What do you",
        "If you were forced to relive one 10-minute block of your life again",
        "Have you ever saved someone’s life?",
        "What are you addicted to?",
        "What keeps you up at night?",
        "What lie do you tell most often?",
        "What do you regret not doing?",
        "What gives your life meaning?",
        "What are you most insecure about?",
        "What bridges do you NOT regret burning?",
        "What’s the most illegal thing you’ve done?",
        "How do you get in the way of your own success?",
        "What are you afraid people see when they look at you?",
        "What’s the most surprising self-realization you’ve had?",
        "How do you hope you’ll change as a person in the future?",
        "What’s one thing you did that you really wish you could go back and",
        "What do you most often look down on people for? What do you think",
      ],
    },
    [HOME_INTRO]: {
      en:
        "This is my home :house:.\nIf you have the rights withing your organisation, you can configure my settings here.\nYou can click on 'Messages' up here to have a chat with me in private. I'd like that. :dog2:",
    },
    [SETTING_ACTIVITIES_SUGGESTION_AMOUNT_DESCRIPTION]: {
      en:
        "The amount of activities that are suggested when using the activity command.",
    },
    [SETTING_ACTIVITIES_SUGGESTION_AMOUNT_TITLE]: {
      en: "Amount of activities",
    },
    [SETTING_BUDDY_GROUP_SIZE_DESCRIPTION]: {
      en:
        "The size of the groups.\nExample: settings this to 3 in an organsation with 21 member will create 7 groups of 3 members.",
    },
    [SETTING_BUDDY_GROUP_SIZE_TITLE]: {
      en: "Buddy group size",
    },
    [SETTING_DAY_TO_REGENERATE_DESCRIPTION]: {
      en:
        "New groups will be formed every week. This is the day of the week that new groups will be formed.",
    },
    [SETTING_DAY_TO_REGENERATE_TITLE]: {
      en: "Day to regroup",
    },
    [SETTING_LANGUAGE_DESCRIPTION]: {
      en: "The language Buddy speaks.",
    },
    [SETTING_LANGUAGE_TITLE]: {
      en: "Language",
    },
    [SETTING_UTC_OFFSET_DESCRIPTION]: {
      en:
        "This UTC timezone is used to make sure that the groups are regrouped on the day in your timezone.",
    },
    [SETTING_UTC_OFFSET_TITLE]: {
      en: "Your team's timezone (UTC).",
    },
    [SETTING_USERS_TO_IGNORE_DESCRIPTION]: {
      en:
        "Select a list of users that will be excluded from the buddy making process.",
    },
    [SETTING_USERS_TO_IGNORE_TITLE]: {
      en: "Users to ignore",
    },
    [GENERAL_SETTINGS_TITLE]: {
      en: "General Settings",
    },
    [CREATE_BUDDIES_SETTINGS]: {
      en: "Buddies creation settings",
    },
    [REGROUP_BUDDIES_TITLE]: {
      en: "Regroup buddies",
    },
    [REGROUP_BUTTON_LABEL]: {
      en: "Regroup buddies now",
    },
    [YOU_ARE_BUDDIES_FOR]: {
      en: "You are buddies for",
    },
    [WEEK]: {
      en: "this week",
    },
    [ACTIVITIES_INTRO]: {
      en: "Here are some activities you could do together:",
    },
    [QUESTION_INTRO]: {
      en: "Here's a question to discuss together:",
    },
    [YOUR_ARE_BUDDIES_WITH]: {
      en: "You are currently buddies with",
    },
    [YOU_CAN_CHAT_WITH_THEM_HERE]: {
      en: "You can easily chat with them in your channel:",
    },
    [CURRENT_GROUPS_ARE]: {
      en: "The current groups of buddies are:",
    },
    [SOMETHING_WENT_WRONG]: {
      en: ":dog: Woofps, something went wrong. Please try again.",
    },
    [NOT_IN_GROUP]: {
      en: "You are not in a group at the moment.",
    },
    [NO_GROUPS]: {
      en: "There are no groups at the moment.",
    },
    [UNKNOWN_COMMAND]: {
      en: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text:
              ":dog: Woofps, I don't know what to to do with that command. Try one of the following:",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text:
              "*/buddy activity*\nPosts an activity to do with your group in the current channel.",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*/buddy group*\nShows you what your buddies currently are.",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text:
              "*/buddy groups*\nShows you all of the buddy groups in your organisation.",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text:
              "*/buddy question*\nPosts a question to answer with your group in the current channel.",
          },
        },
      ],
    },
  };

  if (!texts[key][language]) {
    console.warn(`Could not find translation for ${key}/${language}`);
  }

  return texts[key][language];
}

module.exports = {
  ACTIVITIES_INTRO,
  ACTIVITIES,
  CREATE_BUDDIES_SETTINGS,
  CURRENT_GROUPS_ARE,
  GENERAL_SETTINGS_TITLE,
  GREETINGS,
  HOME_INTRO,
  NO_GROUPS,
  NOT_IN_GROUP,
  QUESTION_INTRO,
  QUESTIONS,
  REGROUP_BUDDIES_TITLE,
  REGROUP_BUTTON_LABEL,
  SETTING_ACTIVITIES_SUGGESTION_AMOUNT_DESCRIPTION,
  SETTING_ACTIVITIES_SUGGESTION_AMOUNT_TITLE,
  SETTING_BUDDY_GROUP_SIZE_DESCRIPTION,
  SETTING_BUDDY_GROUP_SIZE_TITLE,
  SETTING_DAY_TO_REGENERATE_DESCRIPTION,
  SETTING_DAY_TO_REGENERATE_TITLE,
  SETTING_LANGUAGE_DESCRIPTION,
  SETTING_LANGUAGE_TITLE,
  SETTING_USERS_TO_IGNORE_DESCRIPTION,
  SETTING_USERS_TO_IGNORE_TITLE,
  SETTING_UTC_OFFSET_DESCRIPTION,
  SETTING_UTC_OFFSET_TITLE,
  SOMETHING_WENT_WRONG,
  translate,
  UNKNOWN_COMMAND,
  WEEK,
  YOU_ARE_BUDDIES_FOR,
  YOU_CAN_CHAT_WITH_THEM_HERE,
  YOUR_ARE_BUDDIES_WITH,
};
