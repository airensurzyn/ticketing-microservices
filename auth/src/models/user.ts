import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface describing the structure for a new user
interface UserAttrs {
    email: string;
    password: string;
}

// An interface that describes to TS the properties that a user model has
interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(done) {
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }

    done();
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

const user = User.build({
    email: 'test@test.com',
    password: 'asdfaslfdja'
});


export { User };