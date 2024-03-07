const Instruments = require('../../Models/MarketDetailModel'); 

const fetchPaginatedData = async (exchange, page, limit) => {
  try {
    const totalCount = await Instruments.countDocuments({ exchange: exchange }).exec(); 
    const totalPages = Math.ceil(totalCount / limit); 
    const skip = (page - 1) * limit; 
    
    const data = await Instruments.find({ exchange: exchange }).skip(skip).limit(limit).exec(); 

    return {
      data: data,
      totalPages: totalPages,
      currentPage: page,
      totalCount: totalCount
    };
  } catch (error) {
    console.error('Error fetching paginated data:', error);
    throw error;
  }
};

const getPaginatedData = async (req, res) => {
  const exchange = req.params.exchange; 
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  try {
    const result = await fetchPaginatedData(exchange, page, limit); 
    res.json(result); 
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' }); 
  }
};

module.exports = {
  getPaginatedData
};
