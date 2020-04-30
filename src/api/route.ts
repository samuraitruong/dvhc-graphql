import { Router, Application } from 'express';
import { Controller } from './controller';

export class ApiRouter {
  private router: Router;

  constructor(private controller: Controller) {
    this.router = Router();
    this.registerRoutes();
  }

  private registerRoutes() {
    this.router.get('/provinces', this.controller.getProvinces);
    this.router.get(
      '/province/:provinceName',
      this.controller.getProvinceDistrict
    );

    this.router.get(
      '/province/:provinceName/:districtName',
      this.controller.getProvinceDistrictWards
    );
    this.router.get('/search', this.controller.search);
    this.router.get('/search/:type', this.controller.search);
  }

  public apply(app: Application) {
    app.use('/api', this.router);
  }
}
