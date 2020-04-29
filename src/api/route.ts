import { Router, Application } from 'express';
import { Controller } from './controller';

export class ApiRouter {
  private router: Router;
  constructor(private controller: Controller) {
    this.router = Router();
    this.registerRoutes();
  }
  private registerRoutes() {
    this.router.use('/provinces', this.controller.getProvinces);
    this.router.use('/province/:provinceName', this.controller.getProvince);
    this.router.use(
      '/province/:provinceName/:districtName',
      this.controller.getProvinceDistrict
    );
  }
  public apply(app: Application) {
    app.use('/api', this.router);
  }
}
