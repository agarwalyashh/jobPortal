const {Webhook} = require("svix");
const User = require("../models/userModel");
const AppError = require("../utils/error");

exports.clerkWebHooks = async (req, res, next) => {
  try {
    const payload = req.body.toString(); 
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Create an SVIX instance with Clerk Webhook secret
    const webHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify Headers
    let evt;
    try {
      evt = webHook.verify(payload, headers);
    } catch (err) {
      console.error("Invalid webhook signature", err.message);
      return res.status(400).json({ error: "Invalid webhook signature" });
    }

    // Getting Data from req.body
    const { data, type } = evt;

    // Switch case for different types of events
    switch (type) {
      case "user.created": {
        const user = { 
          userID: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.profile_image_url,
          resume: "",
        };
        await User.create(user);
        res.status(201).json({
          status: "success",
          data: user,
        });
        break;
      }
      case "user.updated": {
        const user = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.profile_image_url,
        };
        await User.findByIdAndUpdate(data.id, user);
        res.status(201).json({
          status: "success",
          data: user,
        });
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.status(204).json({
          status: "success",
          data: null,
        });
        break;
      }
      default:
        break;
    }
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};
