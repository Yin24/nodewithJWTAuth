const {
    getAllBlogs,
    createABlog,
    deleteBlog,
    updateBlog
  } = require("../controllers/blogControllers");
  const fileUpload = require("../middlewares/fileUpload");
  
  const router = require("express").Router();
  
  router.get("/", getAllBlogs);
  router.post("/", fileUpload.single("file"), createABlog);
  router.delete("/:id", deleteBlog);
  router.put("/:id", fileUpload.single("file") ,updateBlog);
  
  module.exports = router;