const preferences = [
  {
    id: "gender_select",
    title: "What's your gender?",
    subtitle: "Let us know you better",
    options: [
      {
        id: 'male',
        label: 'Male',
        image: '../../assets/preference/male.png'
      },
      {
        id: 'female',
        label: 'Female',
        image: '../../assets/preference/female.png'
      }
    ],
    next: 'focus_area'
  },
  {
    id: "focus_area",
    title: "Please choose your focus area",
    options: [
      {
        id: 'full_body',
        label: 'Full Body',
        icon: require('../../assets/preference/full_body.png'),
      },
      {
        id: 'arm',
        label: 'Arm',
        icon: require('../../assets/preference/arm.png'),
      },
      {
        id: 'chest',
        label: 'Chest',
        icon: require('../../assets/preference/chest.png'),
      },
      {
        id: 'abs',
        label: 'Abs',
        icon: require('../../assets/preference/abs.png'),
      },
      {
        id: 'leg',
        label: 'Leg',
        icon: require('../../assets/preference/leg.png'),
      },
    ],
    next: 'goal_select',
    prev: 'gender_select'
  },
  {
    id: "goal_select",
    title: "What are your main goals?",
    // subtitle: "Let us know you better",
    options: [
      {
        id: 'lose_weight',
        label: 'Lose Weight',
        icon: require('../../assets/preference/lose_weight.png'),
      },
      {
        id: 'build_muscle',
        label: 'Gain Muscle',
        icon: require('../../assets/preference/build_muscle.png'),
      },
      {
        id: 'keep_fit',
        label: 'Stay Fit',
        icon: require('../../assets/preference/keep_fit.png'),
      },
    ],
    next: 'pushup',
    prev: 'focus_area'
  },
  {
    id: "pushup",
    title: "How many pushups can you do in a row?",
    options: [
      {
        id: 'beginner',
        label: 'Beginner (3-5 push-ups)',
        icon: require('../../assets/preference/beginner_pushup.png'),
      },
      {
        id: 'intermediate',
        label: 'Intermediate (6-10 push-ups)',
        icon: require('../../assets/preference/intermediate_pushup.png'),
      },
      {
        id: 'advanced',
        label: 'Advanced (11-20 push-ups)',
        icon: require('../../assets/preference/advanced_pushup.png'),
      },
    ],
    next: 'activity_level',
    prev: 'goal_select'
  },
  {
    id: "activity_level",
    title: "What's your activity level?",
    options: [
      {
        id: 'sedentary',
        label: 'Sedentary',
        icon: require('../../assets/preference/sedentary.png'),
        helperText: "I sit at my desk all day"
      },
      {
        id: 'lightly_active',
        label: 'Lightly Active',
        icon: require('../../assets/preference/lightly_active.png'),
        helperText: "I occasionally exercise or walk for 30 minutes"
      },
      {
        id: 'moderately_active',
        label: 'Moderately Active',
        icon: require('../../assets/preference/moderately_active.png'),
        helperText: "I spend an hour or more working out every day"
      },
      {
        id: 'very_active',
        label: 'Very Active',
        icon: require('../../assets/preference/very_active.png'),
        helperText: "I love working out, and want to get more exercises"
      },
    ],
    next: 'weekly_goal',
    prev: 'pushup'
  },
  {
    id: "weekly_goal",
    title: "Set your weekly goal",
    subtitle: "We recommend training at least 3 days weekly for a better result.",
    options: [
      {
        id: '1',
        label: '1 day',
      },
      {
        id: '2',
        label: '2 days',
      },
      {
        id: '3',
        label: '3 days',
      },
      {
        id: '4',
        label: '4 days',
      },
      {
        id: '5',
        label: '5 days',
      },
      {
        id: '6',
        label: '6 days',
      },
      {
        id: '7',
        label: '7 days',
      },
    ],
    next: 'height_weight',
    prev: 'pushup'
  },
  {
    id: "height_weight",
    title: "Let us know you better",
    subtitle: "Let us know you better to help boost your workout results",
    prev: 'weekly_goal',
  }
]

export default preferences