const isAdminMiddleware = (req, res, next) => {
  console.log("inside admin middleware");
  const currUser = req.user;
  if (currUser && currUser.isAdmin) {
    next();
  } else {
    const error = new Error("Admin access only");
    error.status = 401;
    next(error);
  }
};

const isUserMiddleware = (req, res, next) => {
  //if there is a req.user, their id should match the paramsId of the route

  if (req.user !== undefined) {
    const paramsUserId = parseInt(req.params.userId);
    if (paramsUserId === req.user.id) {
      console.log("matching ids");
      next();
    } else {
      console.log("not matching ids");
      const error = new Error("Unauthorized user");
      error.status = 401;
      next(error);
    }
  } else {
    console.log("not matching ids");
    const error = new Error("Please log in");
    error.status = 401;
    next(error);
  }
};

module.exports = {
  isAdminMiddleware,
  isUserMiddleware
};
