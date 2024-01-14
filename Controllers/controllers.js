const Announcement = require("../Model/model")
const nodemailer = require("nodemailer")
// Get all annoucements

const getAll = async (req, res) => {
   try {
     const annoucement = await Announcement.find();
     res.status(200).json({ annoucement })
   } catch (error) {
    res.status(500).json({message: error.message})
   }
}


// Create annoucement
const create = async (req, res) => {
  
  
    try {
        const annoucement = await Announcement.create(req.body);
        res.status(200).json({ annoucement });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update annoucement
const update = async (req, res) => {
    try {
            const { id: announcementID } = req.params;
        
            const announcement = await Announcement.findOneAndUpdate({ _id: announcementID }, req.body, {
              new: true,
              runValidators: true,
            });
            if (!announcement) {
              return res.status(404).json({ message: "No announcement found" });
            }
            return res.status(200).json({announcement})
          } catch (error) {
            res.status(500).json({message: error.message})
          }
        };


// delete annoucement
const deleteAnnouncement = async (req, res) => {
    try {
        const { id: annoucementID } = req.params;
        const annoucement = await Announcement.findByIdAndDelete({_id: annoucementID});

        if (!annoucement) {
            return res.status(404).json({ message: "No task found" });
        }
        res.status(200).json({ annoucement });

    } catch (error) {
        res.status(200).json({message: error.message})
    }
}


// email controller



const emailController = async(req, res) => {

  const {email, name, message, phone} = req.body

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL_ID,
      pass: process.env.ADMIN_APP_PASSWORD
    }
  });

  const emailTemplate = `
  <html>
  <body>
  <h4>From: ${name}</h4>
  <h4>Phone: ${phone}</h4>
  <p>Email: ${email}</p>
  <p>${message}</p>
  </body>
  </html>
  `
  
  const mailOptions = {
    from:"process.env.ADMIN_EMAIL_ID",
    to: email,
    subject: `New email from ${name}`,
    html: emailTemplate
  }
  
  transporter.sendMail(mailOptions, (err, data) => {
    if(err){
      console.log(err)
    }else{
      res.status(200).json({message: "Email sent"})
    }
  })
}

module.exports = { getAll, create, update, deleteAnnouncement, emailController }