import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'Updated post title',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'The content of the post',
    example: 'Updated content of the post',
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;
}
