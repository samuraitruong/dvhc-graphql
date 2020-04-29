import { Database } from '../repository/db';
import express from 'express';
import { BaseItem } from '../graphql/types/baseItem';

export class Controller {
  constructor(private db: Database) {
    this.getProvinces = this.getProvinces.bind(this);
    this.getProvince = this.getProvince.bind(this);
    this.getProvinceDistrict = this.getProvinceDistrict.bind(this);
  }
  async getProvinces(req: express.Request, res: express.Response) {
    this.response(res, await this.db.getItems(null, null, 1));
  }
  async getProvince(req: express.Request, res: express.Response) {
    console.log('eq.params.provinceName', req.params.provinceName);
    const province = await this.db.getItem(
      null,
      null,
      req.params.provinceName,
      1
    );
    this.response(res, await this.db.getItems(province._id, null, 2));
  }

  async getProvinceDistrict(req: express.Request, res: express.Response) {
    const province = await this.db.getItem(
      null,
      null,
      req.params.provinceName,
      1
    );
    const district = await this.db.getItem(
      null,
      province._id,
      req.params.districtName,
      2
    );
    this.response(res, await this.db.getItems(district._id, null, 3));
  }

  private response(res: express.Response, data: BaseItem | BaseItem[]) {
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
