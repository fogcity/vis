import { vis } from '../build'
const dataset = {
  name: 'Eve',
  children: [
    {
      name: 'Cain',
    },
    {
      name: 'Seth',
      children: [
        {
          name: 'Enos',
        },
        {
          name: 'Noam',
        },
      ],
    },
    {
      name: 'Abel',
    },
    {
      name: 'Awan',
      children: [
        {
          name: 'Enoch',
        },
      ],
    },
    {
      name: 'Azura',
    },
  ],
}
vis.renderTree('root9', dataset, {})
