const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lookupSchema = new Schema({
    hostname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
}
);

const Lookup = mongoose.model('Lookup', lookupSchema);

module.exports = Lookup;