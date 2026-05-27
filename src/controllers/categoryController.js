const categoryService = require('../services/categoryService');
const { successResponse, errorResponse } = require('../utils/response');

const getAll = async (req, res) => {

    try {

        const categories = await categoryService.index();

        return successResponse(
            res,
            "Categories fetched successfully",
            categories
        );

    } catch (error) {

        return errorResponse(res, error.message);
    }
};
const store = async (req, res) => {

    try {

        const { name,is_active, description } = req.body;

        if (!name) {
            return errorResponse(res, "Category name is required");
        }

        const category = await categoryService.store({
            name,
            description,
            is_active,
            user_id: req.user.id
        });

        return successResponse(
            res,
            "Category created successfully",
            category
        );

    } catch (error) {

        return errorResponse(res, error.message);
    }
};
const update = async (req, res) => {

    try {

        const { id } = req.params;

        const { name, is_active, description } = req.body;

        const category = await categoryService.update(id, {
            name,
            description,
            is_active
        });

        return successResponse(
            res,
            "Category updated successfully",
            category
        );

    } catch (error) {

        return errorResponse(res, error.message);
    }
};
const destroy = async (req, res) => {

    try {

        const { id } = req.params;

        await categoryService.destroy(id);

        return successResponse(
            res,
            "Category deleted successfully"
        );

    } catch (error) {

        return errorResponse(res, error.message);
    }
};
module.exports = {
    getAll,
    store,
    update,
    destroy
};