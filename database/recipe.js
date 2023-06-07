const prisma = require("./prisma");

const findAllRecipe = (userId) =>{
    return prisma.recipe.findMany({
        where:{
            userId
        }
    });
}

const saveRecipe = (recipe, userId) =>{
    return prisma.recipe.create({
        data:{
            name: recipe.name,
            description: recipe.description,
            timePreparation: recipe.timePreparation,
            userId: userId,
        }
    })
}

const updateRecipe = (id, recipe) =>{
    return prisma.recipe.update({
        where: {
            id,
        },
        data: recipe,
    });
};

const deleteRecipe = (id) =>{
    return prisma.recipe.delete({
        where: {
           id: id,
        },
    });
};

module.exports = {
    findAllRecipe,
    saveRecipe,
    updateRecipe,
    deleteRecipe,
}