const Blog = require("../models/blogModel");
const fs = require("fs");
const transporter = require("../utils/nodemailer.js");

const getAllBlogs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Blog.countDocuments();

    const totalPages = Math.ceil(total / limit);

    if (page > totalPages) {
      res.status(404).send({ msg: "There is no page with this page number" });
      return;
    }

    //const blogs = await Blog.find().skip(skip).limit(limit);
    //const blogs = await Blog.find().skip(skip).limit(limit).sort({name: -1}) //sorting 1=desc , -1=asc
    const blogs = await Blog.find().skip(skip).limit(limit).sort({description:-1, createdAt:-1}) //show lastest one first

    res.send(blogs);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createABlog = async (req, res) => {
  try {
    const { name, description } = req.body;

    const blog = new Blog({
      name,
      description,
      blogImage: req.file.path,
    });

    await blog.save();

    // const mailOptions = {
    //   from: "phantphant6969@gmail.com",
    //   to: "yeyintthway656@gmail.com",
    //   subject: "Testing email",
    //   html: "<h1>This is heading testing br nyar</h1><img src='https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/44/1540896187-titans-dc-universe.jpg' />",
    // };

    // transporter.sendMail(mailOptions, (err, info) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }

    //   console.log("Email sent successfully");
    // });

    res.send(blog);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    fs.unlinkSync(blog.blogImage);
    const deletedBlog = await blog.remove();
    res.send(deletedBlog);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateBlog = async (req, res)=> {
  try{
    //get a blog to be updated
    const blog = await Blog.findById(req.params.id);
    //check user update an image as well
    req.body.blogImage = req.file ? req.file.path : blog.blogImage;

    if(req.file){
      fs.unlinkSync(blog.blogImage);
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    res.status(200).send(updatedBlog);

  }catch(error){
    res.sendStatus(500);
  }
}
 
module.exports = { getAllBlogs, createABlog, deleteBlog, updateBlog };