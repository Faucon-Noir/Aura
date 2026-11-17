import { Delete, Get, Patch, Post, Put, Route, Tags } from "tsoa";

@Route("hello")
@Tags("Hello")
export class HelloController {
	@Get("/")
	public async getHello(): Promise<{
		message: string;
	}> {

		return {
			message: "Hello from Aura 🚀",
		};
	}

	@Post("/")
	public async postHello() {
		console.log("post");
	}
	@Put("/")
	public async putHello() {
		console.log("put");
	}
	@Patch("/")
	public async patchHello() {
		console.log("patch");
	}
	@Delete("/")
	public async delHello() {
		console.log("delete");
	}
}
