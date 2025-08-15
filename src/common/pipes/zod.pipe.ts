import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== "body") return value

    const result = this.schema.safeParse(value)

    if (!result.success) {
      const errors = result.error.flatten()
      throw new BadRequestException({ message: "Validation failed", errors })
    }

    return result.data

  }
}
