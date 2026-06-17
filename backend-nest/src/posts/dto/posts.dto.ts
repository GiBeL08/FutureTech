import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  @MinLength(1)
  content!: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class CreateCommentDto {
  @IsString()
  @MinLength(1)
  text!: string;
}

export class DeletePostDto {
  @IsString()
  id!: string;
  @IsString()
  authorId!: string;
}