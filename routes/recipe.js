const express = require("express");
const z = require("zod");
const { findAllRecipe, saveRecipe, updateRecipe, deleteRecipe } = require("../database/recipe");
const auth = require("../middleware/auth"); 

const router = express.Router();

const RecipeSchema = z.object({
    name: z.string(),
    description: z.string(),
    timePreparation: z.string(),
});

router.get("/recipe", auth, async (req,res)=>{
    const recipe = await findAllRecipe(req.userId);
    res.json({
        recipe,
    });
});

router.post("/recipe", auth, async(req,res)=>{
    try{
        const recipe = RecipeSchema.parse(req.body);
        const userId = req.userId;
        const savedRecipe = await saveRecipe(recipe, userId);
        res.status(201).json({
            recipe: savedRecipe,
        });
    }catch(error){
        if(error instanceof z.ZodError) {
            return res.status(422).json({
            message: error.errors,
            });
        }
        res.status(500).json({
            message: "Server error",
        })
    }
})

router.put("/recipe/:id", auth, async (req,res)=>{
    const id = Number(req.params.id);
    const recipe = RecipeSchema.parse(req.body);
    const updatedRecipe = await updateRecipe(id, recipe);
    res.json({
        recipe: updatedRecipe,
    })
});

router.delete("/recipe/:id", auth, async(req,res)=>{
    const id = Number(req.params.id);
    await deleteRecipe(id);
    res.status(204).send();
})

module.exports = router;