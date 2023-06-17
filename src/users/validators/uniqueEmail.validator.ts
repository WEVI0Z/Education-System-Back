import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsersService } from "../users.service";

@ValidatorConstraint({ name: "email", async: true })
@Injectable()
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private readonly service: UsersService) {}

  async validate(value: string): Promise<boolean> {
    const users = await this.service.getAll();

    users.forEach(user => {
        if(user.email === value) {
            throw new UnprocessableEntityException("Email already exists")
        }
    })

    return true;
  }
}