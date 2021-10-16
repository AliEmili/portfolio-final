const express = require("express");
const router = express.Router();

const portfolioCtrl = require("../controllers/portfolio");
const authService = require("../services/auth");
const path = require("path");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "./uploads/"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage });

const multi_upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error("Only .png, .jpg and .jpeg format allowed!");
      err.name = "ExtensionError";
      return cb(err);
    }
  },
}).array("picturesUrl", 10);

router.post(
  "",
  authService.checkJWT,
  authService.checkRole("siteOwner"),
  (req, res) => {
    console.log("entered multi upload");
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
      console.log(">>>>>", req.files);
      // show body `req.body`
      res.status(200).end("Your files uploaded.");
    });
  }
  // portfolioCtrl.savePortfolio
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
