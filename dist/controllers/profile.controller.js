import { successResponse, errorResponse } from "../utils/response";
export class ProfileController {
    profileService;
    constructor(profileService) {
        this.profileService = profileService;
        this.getMe = this.getMe.bind(this);
        this.list = this.list.bind(this);
        this.getStats = this.getStats.bind(this);
        this.remove = this.remove.bind(this);
        this.create = this.create.bind(this);
    }
    async getMe(req, res) {
        try {
            if (!req.user)
                return errorResponse(res, "Unauthorized", 401);
            const userId = req.user.id;
            const profile = await this.profileService.getByUserId(userId);
            successResponse(res, "Profil berhasil diambil", profile);
        }
        catch (error) {
            errorResponse(res, error.message || "Gagal mengambil profil", 404);
        }
    }
    async create(req, res) {
        try {
            if (!req.user)
                return errorResponse(res, "Unauthorized", 401);
            const userId = req.user.id;
            const file = req.file;
            const { name, gender, address } = req.body;
            // Validasi input manual jika tidak pakai middleware validation
            if (!name || !gender || !address) {
                return errorResponse(res, "Field name, gender, dan address wajib diisi", 400);
            }
            const profileData = {
                name: String(name),
                gender: String(gender),
                address: String(address),
                user_id: Number(userId),
                ...(file && { profile_picture_url: `/public/uploads/${file.filename}` })
            };
            // Panggil service create
            const profile = await this.profileService.create(profileData);
            return successResponse(res, "Profil berhasil dibuat", profile, null, 201);
        }
        catch (error) {
            // Error "User sudah memiliki profile" akan ditangkap di sini sebagai 400
            return errorResponse(res, error.message || "Gagal membuat profil", 400);
        }
    }
    async list(req, res) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const result = await this.profileService.list({ page, limit });
            const pagination = {
                page: result.currentPage,
                limit,
                total: result.total,
                totalPages: result.totalPages
            };
            return successResponse(res, "Daftar profil diambil (Admin)", result.profiles, pagination);
        }
        catch (error) {
            return errorResponse(res, error.message, 500);
        }
    }
    async getStats(_req, res) {
        try {
            const stats = await this.profileService.exec();
            return successResponse(res, "Statistik profil (Admin)", stats);
        }
        catch (error) {
            return errorResponse(res, error.message, 500);
        }
    }
    async remove(req, res) {
        try {
            const { id } = req.params;
            if (!id)
                return errorResponse(res, "ID profil diperlukan", 400);
            const deleted = await this.profileService.delete(id);
            return successResponse(res, "Profil dihapus (Admin)", deleted);
        }
        catch (error) {
            return errorResponse(res, error.message, 400);
        }
    }
}
//# sourceMappingURL=profile.controller.js.map