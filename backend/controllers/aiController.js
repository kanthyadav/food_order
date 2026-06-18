const { GoogleGenerativeAI } = require("@google/generative-ai");

const Restaurant = require("../models/Restaurant");
const Food = require("../models/Food");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const generateRestaurants = async (req, res) => {
  try {
    const { city, count = 10 } = req.body;

    console.log("Generating restaurants for:", city);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
Generate ${count} realistic restaurants in ${city}.

Return ONLY valid JSON.

Format:

[
  {
    "name":"Restaurant Name",
    "description":"Restaurant Description",
    "address":"Area, ${city}",
    "foods":[
      {
        "name":"Food Name",
        "price":250,
        "category":"Biryani",
        "isVeg":false
      }
    ]
  }
]
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    console.log("Gemini Response:");
    console.log(text);

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const restaurants = JSON.parse(cleaned);

    for (const restaurantData of restaurants) {

      const restaurant = await Restaurant.create({
        name: restaurantData.name,
        description: restaurantData.description,
        address: restaurantData.address
      });

      for (const foodData of restaurantData.foods) {

        await Food.create({
          name: foodData.name,
          price: foodData.price,
          category: foodData.category,
          isVeg: foodData.isVeg,
          restaurant: restaurant._id
        });

      }
    }

    res.status(201).json({
      success: true,
      message: "Restaurants generated successfully",
      count: restaurants.length
    });

  } catch (error) {

    console.log("========== AI ERROR ==========");
    console.log(error);
    console.log("==============================");

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};

const foodAssistant = async (req, res) => {
  try {

    const { query } = req.body;

    const foods = await Food.find()
      .populate("restaurant");

    const foodData = foods.map(food => ({
      name: food.name,
      price: food.price,
      category: food.category,
      isVeg: food.isVeg,
      restaurant: food.restaurant?.name
    }));

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are a food recommendation assistant.

Available Foods:

${JSON.stringify(foodData)}

User Query:
${query}

Recommend foods and restaurants based only on the provided data.
`;

    const result =
      await model.generateContent(prompt);

    const response =
      result.response.text();

    res.json({
      success: true,
      answer: response
    });

  } catch (error) {

    console.log("========== FOOD AI ERROR ==========");
    console.log(error);
    console.log("===================================");

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};

module.exports = {
  generateRestaurants,
  foodAssistant
};

