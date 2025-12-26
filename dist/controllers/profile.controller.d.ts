import type { Request, Response } from "express";
import type { IProfileService } from "../services/profile.service";
export interface IProfileController {
    getMe(req: Request, res: Response): Promise<any>;
    create(req: Request, res: Response): Promise<any>;
    list(req: Request, res: Response): Promise<any>;
    getStats(req: Request, res: Response): Promise<any>;
    remove(req: Request, res: Response): Promise<any>;
}
export declare class ProfileController implements IProfileController {
    private profileService;
    constructor(profileService: IProfileService);
    getMe(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    list(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getStats(_req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=profile.controller.d.ts.map