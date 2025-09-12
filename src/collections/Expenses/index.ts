import { CollectionConfig } from 'payload'
import LABELS from '@/LABELS'
import { authenticated } from '@/access/authenticated'

const Expenses: CollectionConfig = {
  slug: 'expenses',
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: LABELS.personal,
    components: {
      views: {
        list: {
          Component: '/collections/Expenses/_components/ExpensesListLoader/index',
        },
      },
    },
    pagination: {
      defaultLimit: 0,
    },
  },
  fields: [
    {
      type: 'number',
      name: 'amount',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
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
          label: 'Taxes',
          value: 'taxes',
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
      admin: {
        date: {
          displayFormat: 'dd/MM/YYYY',
        }
      },
      required: true,
    },
    {
      name: 'recurring',
      type: 'checkbox',
      defaultValue: false,
    }
  ],
}

export default Expenses
