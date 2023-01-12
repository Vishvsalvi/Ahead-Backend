const Announcement = require("../Model/model")
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

module.exports = { getAll, create, update, deleteAnnouncement }