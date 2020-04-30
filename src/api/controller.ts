import { Request, Response } from 'express';
import { Database } from '../repository/db';
import { BaseItem } from '../graphql/types/baseItem';

export class Controller {
  constructor(public db: Database) {
    this.getProvinces = this.getProvinces.bind(this);
    this.getProvinceDistrict = this.getProvinceDistrict.bind(this);
    this.getProvinceDistrictWards = this.getProvinceDistrictWards.bind(this);
    this.search = this.search.bind(this);
  }

  async getProvinces(req: Request, res: Response) {
    this.response(res, await this.db.getItems(null, null, 1));
  }

  async getProvinceDistrict(req: Request, res: Response) {
    const province = await this.db.getItem(
      null,
      null,
      req.params.provinceName,
      1
    );
    // eslint-disable-next-line no-underscore-dangle
    this.response(res, await this.db.getItems(province._id, null, 2));
  }

  async getProvinceDistrictWards(req: Request, res: Response) {
    const province = await this.db.getItem(
      null,
      null,
      req.params.provinceName,
      1
    );
    const district = await this.db.getItem(
      null,
      // eslint-disable-next-line no-underscore-dangle
      province._id,
      req.params.districtName,
      2
    );
    // eslint-disable-next-line no-underscore-dangle
    this.response(res, await this.db.getItems(district._id, null, 3));
  }
  async search(req: Request, res: Response) {
    const { q } = req.query;
    const { type } = req.params;
    this.response(res, await this.db.getItems(null, q as string, null, type));
  }
  private response(res: Response, data: BaseItem | BaseItem[]) {
    const map = ({ name, type }: BaseItem) => ({
      name,
      type,
      fullname: `${type} ${name}`,
    });
    if (Array.isArray(data)) {
      const list = data.map((x) => map(x));
      res.json(list);
      return;
    }
    res.json(map(data));
  }
}
