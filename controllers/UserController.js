import Controller from './Controller';
import Place from '../models/Place';

export default class extends Controller {
    me = async (req, res) => {
        try {
            return res.json({ success: true, user: req.user });
        } catch (e) {
            console.log(e);
            return res.json({ success: false, error: e.message });
        }
    }

    placeFilter = async (req, res) => {
        try {
            const query = { placeName: { $regex: `.*${req.query.filterPlaceName}.*` } };
            const filteredPlaces = await Place.find(query).sort('-createdAt');
            return res.json({ success: true, filteredPlaces });
        } catch (e) {
            console.log(e);
            return res.json({ success: false, error: e.message });
        }
    }

    places = async (req, res) => {
        try {
            let places = [];
            const placeVisited = Boolean(req.query.placeVisited);

            if (placeVisited) {
                places = await Place.find({ placeVisited: false }).sort('-createdAt');
            } else {
                places = await Place.find().sort('-createdAt');
            }

            return res.json({ success: true, places });
        } catch (e) {
            console.log(e);
            return res.json({ success: false, error: e.message });
        }
    }

    markPlace = async (req, res) => {
        try {
            const { lat, lng, placeName } = req.body;
            const place = new Place({
                lat,
                lng,
                placeName
            });

            place.save();

            return res.json({ success: true, place });
        } catch (e) {
            console.log(e);
            return res.json({ success: false, error: e.message });
        }
    }

    getPlaceById = async (req, res) => {
        try {
            const place = await Place.findById(req.query.id);
            return res.json({ success: true, place });
        } catch (e) {
            console.log(e);
            return res.json({ success: false, error: e.message });
        }
    }

    deletePlace = async (req, res) => {
        try {
            const place = await Place.findByIdAndRemove(req.params.id);
            return res.json({ success: true, place });
        } catch (e) {
            console.log(e);
            return res.json({ success: false, error: e.message });
        }
    }

    markToggleVisit = async (req, res) => {
        try {
            const place = await Place.findById(req.params.id);
            place.placeVisited = !place.placeVisited;
            place.save();
            return res.json({ success: true, place });
        } catch (e) {
            console.log(e);
            return res.json({ success: false, error: e.message });
        }
    }
}