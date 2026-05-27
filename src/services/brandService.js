const Brand = require("../models/brand");

// GET ALL
async function index() {

    return await Brand.findAll();

}

// CREATE
async function store(data) {

    if (!data.name) {
        throw new Error("Brand name is required");
    }

    const brand = await Brand.create({
        name: data.name,
        description: data.description,
        is_active: data.is_active,
        user_id: data.user_id,
        logo_url: data.logo_url,
        logo_path: data.logo_path
    });

    return brand;
}

// GET BY ID
async function show(id) {

    const brand = await Brand.findByPk(id);

    if (!brand) {
        throw new Error("Brand not found");
    }

    return brand;
}

// UPDATE
async function update(id, data) {

    const brand = await Brand.findByPk(id);

    if (!brand) {
        throw new Error("Brand not found");
    }

    await brand.update({
        name: data.name,
        description: data.description,
        is_active: data.is_active,
        logo_url: data.logo_url,
        logo_path: data.logo_path
    });

    return brand;
}

// DELETE
async function destroy(id) {

    const brand = await Brand.findByPk(id);

    if (!brand) {
        throw new Error("Brand not found");
    }

    await brand.destroy();

    return true;
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
};