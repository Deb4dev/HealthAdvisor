import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

//import data from "../data.json" assert { type: "json" };
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
export const generate = async (req, res) => {
  try {
    const { age, weight, height, gender, goal } = req.body;
    if (!age || !weight || !height || !gender || !goal) {
      res.status(400).json({ error: "All the fields are required" });
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an expert nutritionist. A user provides the following details:
    - Age: ${age}
    - Height: ${height} cm
    - Weight: ${weight} kg
    - Gender: ${gender}
    - Goal: ${goal}

    Please generate a simple, one-day meal plan for them based on their goal ,give also their healthy status if they are overweight or not . The plan should be balanced with a good mix of protein, carbs, and healthy fats. Focus on foods that are commonly available in India. Break down the plan into Breakfast, Lunch, Dinner, and one Snack.

    all you need is to maintain the response format no need to write json above it or make it in a json just maintain the format that is all you can make it in text. Do not include any text, greetings, or explanations before or after the JSON object. The format should look exactly like this example:
    
      estimatedTotalCalories: "2200",
      Healthy:You are overweight,
      meals: 
        breakfast: 
          name: Poha with Peanuts,
          description: 1 bowl of flattened rice (poha) cooked with onions, turmeric, and peanuts.
        ,
        lunch: 
          name: Paneer Sabzi with Roti,
          description: 1 bowl of paneer curry, served with 2 whole wheat rotis and a side of cucumber-tomato salad.
        
        dinner: 
          name: Mixed Vegetable Dal with Brown Rice,
          description: 1 large bowl of lentil soup (dal) with mixed vegetables, served with 1 cup of brown rice.
        
        snack: 
          name: Apple with Peanut Butter,
          description: 1 medium-sized apple with 1 tablespoon of peanut butter.
      
      make it in a indian way
  `,
    });

    const cleanedResult = response.text.replace(/^```(text)?\s*/, "").replace(/```\s*$/, "").trim();
    res.status(200).json({ result: cleanedResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
