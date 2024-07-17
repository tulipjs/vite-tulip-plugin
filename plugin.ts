import {Plugin, HmrContext} from "vite";
import colors from 'picocolors'

type ComponentData = {
	url: string,
	basePath: string[],
	funcName: string
}

const getComponentObject = (currentDirName, file, content) => {
	const url = file.replace(currentDirName, '')
	const parts = url.split('/');
	
	const match = /export const (\w+Component)(?:: \w+Component)?/.exec(content)
	
	return match ? {
		url,
		basePath: parts.slice(0, -1),
		funcName: match[1],
	} : undefined;
}

export const plugin = (): Plugin => {
	let $server;
	let $isPluginLoaded = false
	
	return {
		name: 'vite-tulip',
		enforce: 'pre',
		handleHotUpdate: async (ctx: HmrContext) => {
			if(!$isPluginLoaded || ctx.file.indexOf('.component.ts') === -1) return
			
			const currentDirName = ctx.server.config.envDir.replaceAll('\\', '/') + '/'
			const componentObject = getComponentObject(currentDirName, ctx.file, await ctx.read())
			if(!componentObject || !componentObject?.funcName) return;
			
			$server.config.logger.info(colors.yellow(`component hot-reload `) + colors.dim(componentObject.funcName), {
				clear: true,
				timestamp: true,
			})
			$server.ws.send('dev:component', componentObject)
			return []
		},
		configureServer(server) {
			$server = server
			
			$server.ws.on('dev:start', () => {
				$isPluginLoaded = true
			})
		},
	}
};
export const initViteTulipPlugin = (hot: any, onSwapComponent: (componentModule: any, componentData: ComponentData) => void) => {
	if (hot) {
		hot.send('dev:start');
		hot.on('dev:component', async (componentData) => {
			const componentModule = await import(/* @vite-ignore */`/${componentData.url}?a=${Math.trunc(performance.now())}`)
			onSwapComponent(componentModule, componentData)
		})
	}
};