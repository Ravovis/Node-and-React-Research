import { ApiProperty } from '@nestjs/swagger';
export class CreateMyDocumentDTO {
@ApiProperty()
readonly text: string;
}