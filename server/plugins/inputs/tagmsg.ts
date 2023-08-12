import {PluginInputHandler} from "./index";
import log from "../../log";

const commands = ["tagmsg"];

const input: PluginInputHandler = function ({irc}, chan, cmd, args) {
	log.debug(chan.name, cmd, args.join(";"));
	let tags = args.reduce((prev, tag) => {
		const [tagKey, tagValue] = tag.split("=");
		prev[tagKey] = tagValue;
		return prev;
	}, {});
	irc.tagmsg(chan.name, tags);
	return true;
};

export default {
	commands,
	input,
};
