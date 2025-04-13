const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose);
const schema = mongoose.Schema;

const productSchema = new schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    image: String,
    category: String,
    rating: {
        rate: { type: Number },
        count: { type: Number }
    }
}, { timestamps: true });

productSchema.plugin(mongooseSequence, { inc_field: 'id' });

module.exports = mongoose.model('Product', productSchema);
