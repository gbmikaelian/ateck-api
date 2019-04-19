import mongoose, { Schema } from 'mongoose';

const placeSchema = new Schema({
    lat: Number,
    lng: Number,
    placeName: String,
    placeVisited: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Place = mongoose.model('Place', placeSchema);

export default Place;