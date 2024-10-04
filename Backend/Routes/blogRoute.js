const { Router } = require("express");

const { blog, blogCreate, blogDelete, blogUpdate, getById } = require("../Controller/blogController");


const router = Router();

router.get("/",blog );
router.post("/create",blogCreate );
router.delete("/delete/:id",blogDelete );
router.put("/update/:id",blogUpdate );
router.get("/:id", getById);

module.exports = router;
