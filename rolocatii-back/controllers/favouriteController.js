const User = require('./../models/userModel');

exports.postFavourite = async (req, res) => {
  if (!req.body.email || !req.body.favourite)
    return res.status(400).json({
      status: 'fail',
      message: 'Te rog sa verifici body-ul request-ului si sa incerci din nou.'
    });

  try {
    const user = await User.findOne({ email: req.body.email });

    if (user.email !== req.tokenEmail)
      return res.status(401).json({
        status: 'success',
        message: 'Invalid bearer token'
      });

    for (const favourite of user.favourites)
      if (favourite.id === req.body.favourite.id)
        return res.status(409).json({
          status: 'fail',
          message: 'Locatia apare deja in lista de favorite.'
        });

    const fav = req.body.favourite;
    const d = new Date();
    fav.month = d.getMonth();

    user.favourites.push(fav);
    await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'Succes!'
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: 'fail',
      message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err
    });
  }
};

exports.getFavourites = async (req, res) => {
  if (!req.query.email)
    return res.status(400).json({
      status: 'fail',
      message: 'Email-ul este necesar ca parametru ar URL-ului.'
    });

  try {
    const user = await User.findOne({ email: req.query.email });
    if (user.email !== req.tokenEmail)
      return res.status(401).json({
        status: 'success',
        message: 'Invalid bearer token'
      });

    return res.status(200).json({
      status: 'succes',
      data: user.favourites
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: 'fail',
      message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err
    });
  }
};

exports.checkFavourite = async (req, res) => {
  if (!req.params.locationId)
    return res.status(400).json({
      status: 'fail',
      message: 'Id-ul locatiei lipseste.'
    });

  const user = await User.findOne({ email: req.tokenEmail });

  for (const favourite of user.favourites)
    if (favourite.id === req.params.locationId)
      return res.status(200).json({
        status: 'success',
        data: true
      });

  return res.status(200).json({
    status: 'success',
    data: 'false'
  });
};

exports.getTop = async (req, res) => {
  try {
    const q = await User.aggregate([
      { $unwind: '$favourites' },
      { $match: { 'favourites.month': 6 } },
      { $sortByCount: '$favourites.id' },
      { $limit: 1 }
    ]);

    return res.status(200).json({
      staus: 'success',
      data: {
        topLocation: q
      }
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: 'fail',
      message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err
    });
  }
};
