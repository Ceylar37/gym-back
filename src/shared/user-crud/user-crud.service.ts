import { BaseService } from "../base/base.service";
import { ReadArgs } from "../domain/model/read-params";

import { UserCrudModel } from "./user-crud.model";

type Select = {
  [key: string]: boolean | Select;
};

export class UserCrudService<T extends UserCrudModel> extends BaseService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly model: any, private readonly select: Select) {
    super();
  }

  async read(userId: string, { filter, limit, page }: ReadArgs) {
    const take = page && limit ? limit : undefined;
    const skip = page && limit ? (page - 1) * limit : undefined;

    const where = {
      ...filter,
      userId,
    };

    const content = await this.model.findMany({
      where,
      take,
      skip,
      select: this.select,
    });

    const count = await this.model.count({
      where,
    });

    return {
      content,
      meta: {
        limit,
        page,
        pages: page && limit ? Math.ceil(count / limit) : undefined,
      },
    } as {
      content: T["base"][];
      meta: {
        limit?: number | undefined;
        page?: number | undefined;
        pages?: number | undefined;
      };
    };
  }
}
