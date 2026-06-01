const Category = require("../models/category");
const User = require("../models/user");
const index = async () => {

    const categories = await Category.findAll({
        include: [
            {
                model: User,
                as: "user",
                attributes: ['id', 'name']
            }
        ],
        order: [['created_at', 'DESC']]
    });

    if (!categories) {
        throw new Error("Categories not found");
    }

    return categories;
};
const store = async (data) => {

    const category = await Category.create({
        name: data.name,
        description: data.description,
        is_active: data.is_active,
        user_id: data.user_id
    });

    return category;
};
const update = async (id, data) => {

    const category = await Category.findByPk(id);

    if (!category) {
        throw new Error("Category not found");
    }

    await category.update({
        name: data.name,
        is_active: data.is_active,
        description: data.description
    });

    return category;
};
const destroy = async (id) => {

    const category = await Category.findByPk(id);

    if (!category) {
        throw new Error("Category not found");
    }

    await category.destroy();

    return true;
};
module.exports = {
    index,
    store,
    update,
    destroy
};