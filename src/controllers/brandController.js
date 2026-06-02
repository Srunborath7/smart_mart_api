const brandService = require('../services/brandService');
const {uploadFile , deleteFile }= require('../utils/uploadToSupabase');
const {
    successResponse,
    errorResponse
} = require('../utils/response');


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

async function update(req, res) {
    try {

        const oldBrand = await brandService.show(req.params.id);

        const data = {
            name: req.body.name,
            description: req.body.description,
            is_active: req.body.is_active
        };

        if (req.file) {

            if (oldBrand.logo_path) {
                await deleteFile(oldBrand.logo_path); 
            }

            const logo = await uploadFile(req.file, "brands");

            data.logo_url = logo.url;
            data.logo_path = logo.path;
        }

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
async function destroy(req, res) {

    try {
        const brand = await brandService.show(req.params.id);
        await brandService.destroy(req.params.id);
        if (brand.logo_path) {
            await deleteFile(brand.logo_path); 
        }
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