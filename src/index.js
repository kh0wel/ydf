import loadFiles from './utils/loadFiles.js';
import findUsedEvents from './utils/findUsedEvents.js';
import findUsedGateways from './utils/findUsedGateways.js';
import deployment from './utils/deployment.js';

export * from './structures/Configuration.js';
export * from './structures/Event.js';
export * from './structures/Service.js';
export * from './structures/ChatInputCommand.js';
export * from './structures/UserContextMenuCommand.js';
export * from './structures/MessageContextMenuCommand.js';

export default async function (configuration) {

    const loadedFiles = await loadFiles(configuration);

    const usedEvents   = findUsedEvents(loadedFiles);
    const usedGateways = findUsedGateways(loadedFiles, usedEvents);

    deployment(configuration, loadedFiles, usedEvents, usedGateways);
}
