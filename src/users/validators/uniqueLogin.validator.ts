import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsersService } from "../users.service";

@ValidatorConstraint({ name: "login", async: true })
@Injectable()
export class UniqueLoginValidator implements ValidatorConstraintInterface {
  constructor(private readonly service: UsersService) {}

  async validate(value: string): Promise<boolean> {
    const users = await this.service.getAll();

    users.forEach(user => {
        if(user.login === value) {
            throw new UnprocessableEntityException("Login already exists")
        }
    })

    return true;
  }
}