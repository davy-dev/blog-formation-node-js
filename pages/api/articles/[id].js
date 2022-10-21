import dbConnect from "../../../lib/dbConnect";
import Article from "../../../models/Article";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {

    case "GET" /* Get an article by its ID */:
      try {
        const article = await Article.findById(id);
        if (!article) {
          return res
            .status(400)
            .json({
              success: false,
              message: "there're no article for this ID",
            });
        }
        res.status(200).json({ success: true, data: article });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Oops.. Something went wrong 😒" });
      }
      break;

    case "PUT" /* Edit an article by its ID */:
      try {
        const article = await Article.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!article) {
          return res
            .status(400)
            .json({
              success: false,
              message: "there're no article for this ID",
            });
        }
        res.status(200).json({ success: true, data: article });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Oops.. Something went wrong 😒" });
      }
      break;

    case "DELETE" /* Delete an article by its ID */:
      try {
        const deletedArticle = await Article.deleteOne({ _id: id });
        if (!deletedArticle) {
          return res
            .status(400)
            .json({
              success: false,
              message: "there're no article for this ID",
            });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Oops.. Something went wrong 😒" });
      }
      break;

    default:
      res
        .status(400)
        .json({ success: false, message: "Oops.. Something went wrong 😒" });
      break;
  }
}
