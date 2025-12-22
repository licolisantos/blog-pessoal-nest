import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put
} from "@nestjs/common";

import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../services/postagem.service";

@Controller("/postagens")
export class PostagemController {

    // Injeta o Service
    constructor(
        private readonly postagemService: PostagemService
    ) {}

    //  GET /postagens
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll();
    }

    //  GET /postagens/:id
    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(
        @Param("id", ParseIntPipe) id: number
    ): Promise<Postagem> {
        return this.postagemService.findById(id);
    }

    //  GET /postagens/titulo/:titulo
    @Get("/titulo/:titulo")
    @HttpCode(HttpStatus.OK)
    findByTitulo(
        @Param("titulo") titulo: string
    ): Promise<Postagem[]> {
        return this.postagemService.findByTitulo(titulo);
    }

    // POST /postagens
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(
        @Body() postagem: Postagem
    ): Promise<Postagem> {
        return this.postagemService.create(postagem);
    }

    // PUT /postagens
    @Put()
    @HttpCode(HttpStatus.OK)
    update(
        @Body() postagem: Postagem
    ): Promise<Postagem> {
        return this.postagemService.update(postagem);
    }

    //  DELETE /postagens/:id
    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(
        @Param("id", ParseIntPipe) id: number
    ): Promise<void> {
        return this.postagemService.delete(id);
    }
}