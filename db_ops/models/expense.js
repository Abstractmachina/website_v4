import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ExpenseSchema = new Schema({
  id: { type: String, required: true },
  category: {
    type: String,
    enum: [
      'personalRecurring',
      'personalOneOff',
      'investments',
      'taxes',
      'business',
      'food',
      'shelter',
      'transport',
      'health',
      'fitness',
      'education',
      'wife',
      'non-essential',
    ],
    default: 'none',
  },
  amount: {type: Number},
  keyAreas: { type: String },
  description: { type: String },
  ambition: { type: String },
  marketImpact: { type: String },
  implementation: { type: String },
  media: [{ type: Schema.Types.ObjectId, ref: 'MediaContent' }],
  internalRef: { type: String },
  organisation: { type: String },
})

export default mongoose.model('Submission', ExpenseSchema)

// id: string;
//   amount?: number | null;
//   category:
//     | 'personalRecurring'
//     | 'personalOneOff'
//     | 'investments'
//     | 'taxes'
//     | 'business'
//     | 'food'
//     | 'shelter'
//     | 'transport'
//     | 'health'
//     | 'fitness'
//     | 'education'
//     | 'wife'
//     | 'non-essential';
//   tag?: (string | null) | ExpenseTag;
//   comment?: string | null;
//   date: string;
//   recurring?: boolean | null;
//   updatedAt: string;
//   createdAt: string;
