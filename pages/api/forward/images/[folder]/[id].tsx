import { createHandler } from "@api/handler";
import { validateName } from "@lib/profile/data/validators";
import { validateEmail } from "@lib/user/data/validators";
import { ERROR_MESSAGES } from "@util/errors";
import axios from "axios";
const handler = createHandler();

handler.get(async (req, res) => {
  try {
    const id = req.query.id;
    const folder = req.query.folder;
    const imageUrl =
      "https://i.dummyjson.com/data/products/" + folder + "/" + id;

    // Fetch the image data
    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer", // Set the response type to arraybuffer to handle binary data
    });

    // Get the image data and content type
    const imageData = Buffer.from(imageResponse.data, "binary");
    const contentType = imageResponse.headers["content-type"];

    // Send the image as a response with the appropriate content type
    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": imageData.length,
    });
    res.end(imageData);
  } catch (error) {
    res.sendError(error);
  }
});

export default handler;
