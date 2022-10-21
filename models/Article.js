import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const Article = new mongoose.Schema({
  title: {
    /* The title of this manga */

    type: String,
    required: [true, 'Please provide a name for this pet.'],
  },
  summary: {
    /* The summary of this manga */
    type: String,
    required: [true, "Please provide the title name"],
    maxlength: [150, "Owner's Name cannot be more than 150 characters"],
  },
  content: {
    /* excerpt of your manga */
    type: String,
    required: [true, 'Please give excerpt of your manga.'],
  
  },
  tags: {
    type:Array,
    of:String,
    enum: ["shonen","shojo","seinen","josei","yuri","yaoi"]
   
  },
})

export default mongoose.models.Article || mongoose.model('Article', Article)
