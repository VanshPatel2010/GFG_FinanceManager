import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

