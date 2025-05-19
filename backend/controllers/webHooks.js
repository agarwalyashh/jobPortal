const Webhook = require("svix");
const User = require("../models/userModel");
const AppError = require("../utils/error");

exports.clerkWebHooks = async (req, res, next) => {
  try {
    // Create an SVIX instance with Clerk Webhook secret
    const webHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    console.log(webHook);
    console.log(req.body);
    // Verify Headers

    try {
        webHook.verifyHeader(JSON.stringify(req.body), {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      });
    } catch (err) {
      return res.status(400).json({ error: "Invalid webhook signature" });
    }

    // Getting Data from req.body
    const { data, type } = req.body;

    // Switch case for different types of events
    switch (type) {
      case "user.created": {
        const user = {
          userId: data.id,
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
