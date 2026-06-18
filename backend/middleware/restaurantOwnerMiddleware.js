const restaurantOwnerMiddleware = (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  if (req.user.role !== "restaurantOwner") {
    return res.status(403).json({
      message: "Restaurant Owner access only"
    });
  }

  next();
};

module.exports = restaurantOwnerMiddleware;