import {HmrContext, ModuleNode, Plugin} from "vite";

export const plugin = (): Plugin => {

	return {
		name: 'vite-darker-engine',
		enforce: 'pre',
		handleHotUpdate: async (ctx: HmrContext) => {
			if(ctx.file.indexOf('system.ts') === -1) return
			console.log(await ctx.read(), ctx.file, '<')
			
			return []
		},
		configureServer(server) {
			server.ws.on('connection', () => {
				console.log('asdasd')
				server.ws.send('my:greetings', { msg: 'hello' })
			})
		},
	}
}