import mongoose, { Document } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  members: string[]; // Array of user emails
  createdBy: string;
  createdAt: Date;
}

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [{
    type: String, // Store emails directly
    required: true,
  }],
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Group = mongoose.models.Group || mongoose.model<IGroup>('Group', GroupSchema);

export default Group;

