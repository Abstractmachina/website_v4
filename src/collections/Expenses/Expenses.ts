import { CollectionConfig } from 'payload'
import ExpensesListViewController from './_components/ExpensesListViewController'
import LABELS from '@/LABELS'

const Expenses: CollectionConfig = {
  slug: 'expenses',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    group: LABELS.personal,
    components: {
      views: {
        list: {
          Component: '/collections/Expenses/_components/ExpensesListViewController',
          // Component: ExpensesList,
        },
      },
      // edit: {
      //   SaveButton: SaveAndCloseButton,
      // },
    },
    pagination: {
      defaultLimit: 30,
    },
    //   views: {
    //     Edit: {
    //       // MyCustomTab: {
    //       //   Component: ExpensesDefaultView,
    //       //   path: "/test",
    //       //   Tab: TestView2,
    //       // },
    //       Default: {
    //         Component: ExpensesDefaultView,
    //       }
    //     }

    //   }
    // }
  },
  fields: [
    {
      type: 'number',
      name: 'amount',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Food',
          value: 'food',
        },
        {
          label: 'Shelter',
          value: 'shelter',
        },
        {
          label: 'Transport',
          value: 'transport',
        },
        {
          label: 'Health',
          value: 'health',
        },
        {
          label: 'Fitness',
          value: 'fitness',
        },
        {
          label: 'Education',
          value: 'education',
        },
        {
          label: 'Business',
          value: 'business',
        },
        {
          label: 'Wife',
          value: 'wife',
        },
        {
          label: 'Non-Essential',
          value: 'non-essential',
        },
      ],
    },
    {
      name: 'tag',
      type: 'relationship',
      relationTo: 'expenseTags',
      index: true,
    },
    {
      name: 'comment',
      type: 'textarea',
    },
    {
      name: 'date',
      type: 'date',
      defaultValue: new Date().toISOString(),
      required: true,
    },
  ],
}

export default Expenses
