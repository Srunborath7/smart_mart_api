const brandService = require('../services/brandService');
const uploadFile = require('../utils/uploadToSupabase');
const {
    successResponse,
    errorResponse
} = require('../utils/response');

// GET ALL
async function index(req, res) {

    try {

        const brands = await brandService.index();

        return successResponse(
            res,
            "Brands fetched successfully",
            brands
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message
        );

    }
}

// CREATE
async function store(req, res) {

    try {

        let logo = null;

        if (req.file) {
            logo = await uploadFile(req.file, "brands");
        }

        const data = {
            name: req.body.name,
            description: req.body.description,
            is_active: req.body.is_active,
            user_id: req.user.id,

            logo_url: logo?.url,
            logo_path: logo?.path
        };

        const brand = await brandService.store(data);

        return successResponse(res, "Brand created successfully", brand);

    } catch (error) {

        return errorResponse(res, error.message);
    }
}

// GET BY ID
async function show(req, res) {

    try {

        const brand = await brandService.show(req.params.id);

        return successResponse(
            res,
            "Brand fetched successfully",
            brand
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message
        );

    }
}

// UPDATE
async function update(req, res) {

    try {

        const data = {
            name: req.body.name,
            description: req.body.description,
            is_active: req.body.is_active,
            logo_url: req.body.logo_url,
            logo_path: req.body.logo_path
        };

        const brand = await brandService.update(
            req.params.id,
            data
        );

        return successResponse(
            res,
            "Brand updated successfully",
            brand
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message
        );

    }
}

// DELETE
async function destroy(req, res) {

    try {

        await brandService.destroy(req.params.id);

        return successResponse(
            res,
            "Brand deleted successfully"
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message
        );

    }
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
};