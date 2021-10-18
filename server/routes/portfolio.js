const express = require("express");
const router = express.Router();

const portfolioCtrl = require("../controllers/portfolio");
const authService = require("../services/auth");

const multer = require("multer");
const { upload, multi_upload } = require("../../multer").module;
const multi_upload_picturesUrl = (req, res, next) => {
  multi_upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res
        .status(500)
        .send({
          error: { message: `Multer uploading error: ${err.message}` },
        })
        .end();
      return;
    } else if (err) {
      // An unknown error occurred when uploading.
      if (err.name == "ExtensionError") {
        res
          .status(413)
          .send({ error: { message: err.message } })
          .end();
      } else {
        res
          .status(500)
          .send({
            error: { message: `unknown uploading error: ${err.message}` },
          })
          .end();
      }
      return;
    }

    // Everything went fine.
    // show file `req.files`
    // console.log(">>>>>", req.files);
    // show body `req.body`
    // res.status(200).end("Your files uploaded.");
    next();
  });
};

router.post(
  "",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  multi_upload_picturesUrl,
  portfolioCtrl.savePortfolio
);

router.get("", portfolioCtrl.getPortfolios);

router.get("/:id", portfolioCtrl.getPortfolioById);

router.patch(
  "/:id",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  portfolioCtrl.updatePortfolio
);

router.delete(
  "/:id",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  portfolioCtrl.deletePortfolio
);

module.exports = router;
