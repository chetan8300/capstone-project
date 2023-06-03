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
      },
      {
        id: 'arm',
        label: 'Arm',
      },
      {
        id: 'chest',
        label: 'Chest',
      },
      {
        id: 'abs',
        label: 'Abs',
      },
      {
        id: 'leg',
        label: 'Leg',
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
      },
      {
        id: 'build_muscle',
        label: 'Gain Muscle',
      },
      {
        id: 'keep_fit',
        label: 'Stay Fit',
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
      },
      {
        id: 'intermediate',
        label: 'Intermediate (6-10 push-ups)',
      },
      {
        id: 'advanced',
        label: 'Advanced (11-20 push-ups)',
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
      },
      {
        id: 'lightly_active',
        label: 'Lightly Active',
      },
      {
        id: 'moderately_active',
        label: 'Moderately Active',
      },
      {
        id: 'very_active',
        label: 'Very Active',
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
    next: 'weight_height',
    prev: 'pushup'
  },
  {
    id: "weight_height",
    title: "Let us know you better",
    subtitle: "Let us know you better to help boost your workout results",
    prev: 'weekly_goal',
  }
]

export default preferences