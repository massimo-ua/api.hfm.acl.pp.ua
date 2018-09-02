class BaseController {
    constructor(service) {
        this.service = service;
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.updateById = this.updateById.bind(this);
        this.deleteById = this.deleteById.bind(this);
    }

    async getById(ctx) {
        const item = await this.service.findById(ctx.params.id);
        ctx.body = item;
    }

    async create(ctx) {
        const item = await this.service.create(ctx.request.body);
        ctx.body = item;
    }

    async updateById(ctx) {
        const item = await this.service.findById(ctx.params.id);
        Object.assign(item, ctx.request.body);
        await item.save();
        ctx.body = item;
    }

    async deleteById(ctx) {
        await this.service.deleteById(ctx.params.id);
        ctx.body = { success: true };
    }
    
}

module.exports = BaseController;